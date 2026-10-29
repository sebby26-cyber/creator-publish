// visual-composer core API. The CLI (src/cli.js) and the MCP server (src/mcp.js) are thin wrappers over this
// module; there is no other render path.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { loadConfig, PLUGIN_DIR } from './config.js';
import { getRegistry } from './fonts.js';
import { analyse, capabilitiesReport, route } from './router.js';
import { detectOpacityMethod } from './adapters/sharp.js';
import { layoutText } from './svg/text.js';
import { preValidate } from './validate.js';
import { ComposerError, err, sha256, stableStringify } from './util.js';

export const VERSION = '0.2.0';
const MIME = { png: 'image/png', jpeg: 'image/jpeg', webp: 'image/webp' };

function context(opts = {}) {
  const config = opts.config || loadConfig(opts.env);
  return { config, baseDir: opts.baseDir ? path.resolve(opts.baseDir) : null, outputOverride: opts.output || null };
}

/** Read a spec file; relative asset paths then resolve against its directory. */
export function loadSpecFile(file) {
  const abs = path.resolve(file);
  const spec = JSON.parse(fs.readFileSync(abs, 'utf8'));
  return { spec, baseDir: path.dirname(abs), file: abs };
}

const textSummary = (layouts) => Object.entries(layouts || {}).map(([layer, l]) => ({
  layer, size: l.size, maxSize: l.maxSize, shrunk: l.shrunk, lines: l.lines.map((x) => x.text), box: l.box, inkBox: l.inkBox, fitsBox: l.fitsBox,
}));

async function prepare(spec, opts = {}) {
  const ctx = context(opts);
  const pre = await preValidate(spec, ctx);
  const result = { ok: false, stage: 'pre-render', specSha256: specHash(spec), errors: pre.errors, warnings: pre.warnings };
  if (pre.errors.some((e) => e.code === 'SCHEMA_INVALID')) return { result, pre };
  const r = route(spec, ctx, pre.output && pre.output.format);
  if (r.errors) result.errors = [...result.errors, ...r.errors];
  result.capabilities = r.capabilities || analyse(spec).capabilities;
  result.backend = r.backend ? r.backend.NAME : null;
  result.considered = r.considered;
  result.output = pre.output ? { path: pre.output.path, format: pre.output.format } : null;
  result.text = textSummary(pre.layouts);
  result.ok = result.errors.length === 0;
  return { result, pre, route: r, ctx };
}

/** Pre-render validation + routing (schema, assets, fonts, glyphs, text fit, output, backend). Never writes. */
export async function validate(spec, opts = {}) {
  return (await prepare(spec, opts)).result;
}

/** Validate + render + post-validate + write. Returns a JSON-serialisable report. */
export async function render(spec, opts = {}) {
  const v = await prepare(spec, opts);
  const { result, pre } = v;
  if (!result.ok) return { ...result, written: false };
  const backend = v.route.backend;
  let out;
  try {
    out = await backend.render(spec, { ...v.ctx, assets: pre.assets, fonts: pre.fonts, layouts: pre.layouts, format: pre.output.format });
  } catch (e) {
    const errors = e instanceof ComposerError ? e.errors : [err('RENDER_FAILED', e.message)];
    return { ...result, ok: false, stage: 'render', errors, written: false };
  }

  // ---------------- post-render checks on the encoded bytes (before anything touches disk)
  const checks = [];
  const add = (id, status, detail) => checks.push({ id, status, ...(detail === undefined ? {} : { detail }) });
  const { format, path: outPath } = pre.output;
  let meta = null;
  let pixelSha = null;
  try {
    meta = await sharp(out.encoded).metadata();
    const { data, info } = await sharp(out.encoded).raw().toBuffer({ resolveWithObject: true });
    pixelSha = sha256(Buffer.concat([Buffer.from(`${info.width}x${info.height}x${info.channels}:`), data]));
    add('decode', 'pass');
  } catch (e) {
    add('decode', 'fail', e.message);
  }
  if (meta) {
    add('dimensions', meta.width === spec.canvas.width && meta.height === spec.canvas.height ? 'pass' : 'fail', `${meta.width}x${meta.height} (expected ${spec.canvas.width}x${spec.canvas.height})`);
    add('format', meta.format === format ? 'pass' : 'fail', `${meta.format} (expected ${format})`);
    const leaked = ['exif', 'xmp', 'iptc', 'icc'].filter((k) => meta[k]);
    add('metadata-stripped', leaked.length ? 'fail' : 'pass', leaked.length ? `present: ${leaked.join(', ')}` : undefined);
  }
  for (const t of out.textChecks) {
    add(`text-path:${t.layer}`, t.producedPath ? 'pass' : 'fail', `${t.glyphs} glyph outlines for ${t.visibleChars} visible chars`);
    const overflowSev = (spec.layers.find((L, i) => (L.id || `#${i}`) === t.layer) || {}).overflow === 'warn' ? 'warn' : 'fail';
    add(`text-fit:${t.layer}`, t.fitsBox && t.inCanvas ? 'pass' : overflowSev, { box: t.box, inkBox: t.inkBox, size: t.font.size, inCanvas: t.inCanvas });
    add(`text-contrast:${t.layer}`, t.contrast.status, t.contrast);
  }
  const skipped = v.result.capabilities.filter((c) => !out.executed.has(c));
  add('no-skipped-capabilities', skipped.length ? 'fail' : 'pass', skipped.length ? { skipped } : { executed: out.executed.size });

  const failed = checks.filter((c) => c.status === 'fail');
  const warnings = [...result.warnings, ...checks.filter((c) => c.status === 'warn').map((c) => err(c.id.startsWith('text-contrast') ? 'LOW_CONTRAST' : 'CHECK_WARNING', `${c.id}: ${typeof c.detail === 'string' ? c.detail : JSON.stringify(c.detail)}`))];
  const report = {
    ok: failed.length === 0,
    stage: 'post-render',
    backend: backend.NAME,
    specSha256: specHash(spec),
    capabilities: { required: v.result.capabilities, executed: [...out.executed].sort() },
    opacityMethod: out.opacity.method,
    checks,
    text: out.textChecks,
    warnings,
    errors: failed.map((c) => err('POST_VALIDATION_FAILED', `${c.id}: ${typeof c.detail === 'string' ? c.detail : JSON.stringify(c.detail)}`)),
    written: false,
  };
  if (!report.ok) return report;

  // ---------------- write atomically, then verify the file on disk
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  const tmp = `${outPath}.tmp-${process.pid}`;
  fs.writeFileSync(tmp, out.encoded);
  fs.renameSync(tmp, outPath);
  const disk = fs.readFileSync(outPath);
  const fileSha = sha256(disk);
  const diskMeta = await sharp(outPath).metadata();
  const fileOk = fileSha === sha256(out.encoded) && diskMeta.width === spec.canvas.width && diskMeta.format === format;
  checks.push({ id: 'file-written', status: fileOk ? 'pass' : 'fail', detail: outPath });
  report.ok = fileOk;
  report.written = true;
  report.output = { path: outPath, format, mime: MIME[format], width: meta.width, height: meta.height, bytes: disk.length, sha256: fileSha, pixelSha256: pixelSha };
  report.artifact = toArtifact(report);
  if (opts.preview) report.preview = await writePreview(outPath, opts.preview === true ? undefined : opts.preview);
  return report;
}

/** Content identity of a spec: everything except where the file is written. */
export function specHash(spec) {
  const { output, ...rest } = spec;
  const o = { ...(output || {}) };
  delete o.path;
  return sha256(stableStringify({ ...rest, output: o }));
}

/** Machine-readable summary of a finished render (kind, uri, hash, size). */
export function toArtifact(report) {
  const o = report.output;
  return {
    type: 'image.composite@1',
    uri: `file://${o.path}`, sha256: o.sha256, bytes: o.bytes, mime: o.mime, durable: true,
    width: o.width, height: o.height, format: o.format,
    backend: report.backend, spec_sha256: report.specSha256, pixel_sha256: o.pixelSha256,
    validation: { ok: report.ok, failed: report.checks.filter((c) => c.status === 'fail').map((c) => c.id), warnings: report.warnings.map((w) => w.message) },
  };
}

/** Downscaled PNG preview next to the output (for visual inspection). */
export async function writePreview(file, maxSide = 768) {
  const p = file.replace(/\.(png|jpe?g|webp)$/i, '') + '.preview.png';
  await sharp(file).resize(maxSide, maxSide, { fit: 'inside', withoutEnlargement: true }).png().toFile(p);
  return p;
}

/** In-memory preview (MCP image content). */
export async function previewBuffer(file, maxSide = 768) {
  return sharp(file).resize(maxSide, maxSide, { fit: 'inside', withoutEnlargement: true }).png().toBuffer();
}

export function capabilities(opts = {}) {
  const ctx = context(opts);
  return { version: VERSION, backends: capabilitiesReport(ctx) };
}

export async function health(opts = {}) {
  const ctx = context(opts);
  const reg = getRegistry(ctx.config.fontDirs);
  const op = await detectOpacityMethod();
  const nodeOk = (() => { const [a, b] = process.versions.node.split('.').map(Number); return a > 20 || (a === 20 && b >= 9); })();
  const out = {
    ok: nodeOk && reg.entries.length > 0 && !ctx.config.fileError,
    version: VERSION,
    node: process.versions.node, nodeOk,
    sharp: sharp.versions.sharp, libvips: sharp.versions.vips, librsvg: sharp.versions.rsvg,
    platform: `${process.platform}-${process.arch}`,
    plugin: PLUGIN_DIR,
    config: { file: ctx.config.configPath, error: ctx.config.fileError, outDir: ctx.config.outDir, outDirExists: ctx.config.outDir ? fs.existsSync(ctx.config.outDir) : false, fontDirs: ctx.config.fontDirs, assetRoots: ctx.config.assetRoots },
    fonts: reg.families(), fontErrors: reg.errors,
    opacity: op,
    backends: capabilitiesReport(ctx).map(({ backend, available, reason }) => ({ backend, available, reason })),
  };
  return out;
}

/** Render a list of {spec, baseDir, output?}; optional contact sheet of the successes. */
export async function batch(items, opts = {}) {
  const results = [];
  for (const it of items) {
    const r = await render(it.spec, { ...opts, baseDir: it.baseDir ?? opts.baseDir, output: it.output });
    results.push({ name: it.name || it.spec.name || null, ...r });
  }
  const res = { ok: results.every((r) => r.ok), results };
  if (opts.contactSheet) {
    const files = results.filter((r) => r.ok && r.output).map((r) => r.output.path);
    if (files.length) res.contactSheet = await contactSheet(files, opts.contactSheet, opts);
  }
  return res;
}

/** Grid of thumbnails with file-name labels (labels rendered with the bundled Inter via the text engine). */
export async function contactSheet(files, outFile, opts = {}) {
  const thumb = opts.thumb || 360;
  const cols = opts.cols || Math.min(4, files.length);
  const rows = Math.ceil(files.length / cols);
  const pad = 16, label = 28;
  const W = cols * (thumb + pad) + pad, H = rows * (thumb + label + pad) + pad;
  const ctx = context(opts);
  const font = getRegistry(ctx.config.fontDirs).resolve('Inter', 400).font;
  const comps = [];
  const pathsSvg = [];
  for (const [i, f] of files.entries()) {
    const cx = pad + (i % cols) * (thumb + pad), cy = pad + Math.floor(i / cols) * (thumb + label + pad);
    const buf = await sharp(f).resize(thumb, thumb, { fit: 'contain', background: { r: 40, g: 40, b: 40, alpha: 1 } }).png().toBuffer();
    comps.push({ input: buf, left: cx, top: cy });
    const name = path.basename(f);
    const lay = layoutText({ text: name.length > 48 ? `${name.slice(0, 45)}...` : name, size: 14, minSize: 8, fit: 'shrink', align: 'center' }, font, { width: W, height: H }, { x: cx, y: cy + thumb + 8, width: thumb, height: 16 });
    pathsSvg.push(`<path d="${lay.pathData}" fill="#dddddd"/>`);
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${pathsSvg.join('')}</svg>`;
  comps.push({ input: Buffer.from(svg), left: 0, top: 0 });
  fs.mkdirSync(path.dirname(path.resolve(outFile)), { recursive: true });
  await sharp({ create: { width: W, height: H, channels: 4, background: { r: 24, g: 24, b: 24, alpha: 1 } } }).composite(comps).png().toFile(outFile);
  return path.resolve(outFile);
}

export { analyse, loadConfig };
