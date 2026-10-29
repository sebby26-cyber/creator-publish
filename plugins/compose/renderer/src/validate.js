// Pre-render validation: schema, assets, fonts, glyph coverage, text fit, output resolution.
// Everything here is deterministic and runs before any pixel is produced; any error => nothing is written.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import sharp from 'sharp';
import { getRegistry } from './fonts.js';
import { layoutText, scanText } from './svg/text.js';
import { box, err, layerId, stableStringify, sha256 } from './util.js';

const require = createRequire(import.meta.url);
const Ajv = require('ajv');
const schema = require('../schema/composition.schema.json');
const ajv = new Ajv({ allErrors: true, strict: false });
const schemaValidate = ajv.compile(schema);

const EXT_FORMAT = { '.png': 'png', '.jpg': 'jpeg', '.jpeg': 'jpeg', '.webp': 'webp' };
export const FORMATS = ['png', 'jpeg', 'webp'];

export function schemaErrors(spec) {
  if (schemaValidate(spec)) return [];
  // drop the generic if/then wrapper noise, keep the specific messages
  const out = [];
  const seen = new Set();
  for (const e of schemaValidate.errors) {
    if (e.keyword === 'if') continue;
    const msg = `${e.instancePath || '/'} ${e.message}${e.params && e.params.additionalProperty ? ` ('${e.params.additionalProperty}')` : ''}${e.params && e.params.allowedValues ? ` (${e.params.allowedValues.join('|')})` : ''}`;
    if (seen.has(msg)) continue;
    seen.add(msg);
    out.push(err('SCHEMA_INVALID', msg, { path: e.instancePath || '/' }));
  }
  return out;
}

function within(file, roots) {
  return roots.some((r) => file === r || file.startsWith(r.endsWith(path.sep) ? r : r + path.sep));
}

/** Resolve a local asset path safely. */
export function resolveAsset(src, ctx) {
  if (/^[a-z][a-z0-9+.-]*:/i.test(src) && !/^[a-z]:[\\/]/i.test(src)) {
    return { error: err('ASSET_REMOTE_UNSUPPORTED', `only local files are supported, got "${src}"`) };
  }
  let p = src.startsWith('~') ? path.join(process.env.HOME || '', src.slice(1)) : src;
  if (!path.isAbsolute(p)) {
    if (!ctx.baseDir) return { error: err('ASSET_PATH_RELATIVE', `relative asset path "${src}" needs a baseDir (or use an absolute path)`) };
    p = path.resolve(ctx.baseDir, p);
  }
  if (!fs.existsSync(p)) return { error: err('ASSET_NOT_FOUND', `asset not found: ${p}`) };
  const real = fs.realpathSync(p);
  if (!fs.statSync(real).isFile()) return { error: err('ASSET_NOT_FOUND', `asset is not a file: ${p}`) };
  if (ctx.config.assetRoots.length) {
    const roots = ctx.config.assetRoots.map((r) => (fs.existsSync(r) ? fs.realpathSync(r) : r));
    if (!within(real, roots)) {
      return { error: err('ASSET_OUTSIDE_ROOTS', `asset ${real} is outside the allowed roots (${roots.join(', ')})`) };
    }
  }
  return { file: real };
}

/** Resolve output path + format. */
export function resolveOutput(spec, ctx) {
  const o = spec.output || {};
  let p = ctx.outputOverride || o.path;
  const errors = [];
  if (!p) {
    if (!ctx.config.outDir) {
      return { errors: [err('OUTPUT_PATH_REQUIRED', 'no output path: set output.path, pass --out, or configure CREATOR_PUBLISH_OUT or out_dir in ~/.creator-publish/config.json')] };
    }
    const fmt = o.format || 'png';
    const name = `${(spec.name || 'composite').replace(/[^a-zA-Z0-9._-]+/g, '-')}-${sha256(stableStringify(spec)).slice(0, 12)}.${fmt === 'jpeg' ? 'jpg' : fmt}`;
    p = path.join(ctx.config.outDir, name);
  } else if (!path.isAbsolute(p)) {
    if (ctx.outputOverride) p = path.resolve(p); // CLI --out: relative to cwd
    else if (ctx.config.outDir) p = path.join(ctx.config.outDir, p);
    else return { errors: [err('OUTPUT_PATH_REQUIRED', `relative output.path "${p}" needs a configured output dir (CREATOR_PUBLISH_OUT) or an absolute path`)] };
  }
  const extFmt = EXT_FORMAT[path.extname(p).toLowerCase()];
  const format = o.format || extFmt;
  if (!format) errors.push(err('OUTPUT_FORMAT_UNKNOWN', `cannot infer format from "${p}"; use .png/.jpg/.webp or output.format`));
  else if (extFmt && extFmt !== format) errors.push(err('OUTPUT_FORMAT_MISMATCH', `output.format "${format}" does not match extension of ${p}`));
  else if (!extFmt) errors.push(err('OUTPUT_FORMAT_MISMATCH', `output path ${p} must end in .png, .jpg/.jpeg or .webp`));
  if (o.overwrite === false && fs.existsSync(p)) errors.push(err('OUTPUT_EXISTS', `output exists and overwrite=false: ${p}`));
  return { path: p, format, errors };
}

const isLarge = (layout, weight) => layout.size >= 24 || (layout.size >= 18.66 && (weight || 400) >= 700);

/**
 * Full pre-render validation. Returns {errors, warnings, assets, fonts, layouts, output}.
 * ctx: {config, baseDir, outputOverride}
 */
export async function preValidate(spec, ctx) {
  const errors = schemaErrors(spec);
  const warnings = [];
  if (errors.length) return { errors, warnings };
  const canvas = spec.canvas;
  const reg = getRegistry(ctx.config.fontDirs);
  const assets = {};
  const fonts = {};
  const layouts = {};

  const checkAsset = async (src, where, lid) => {
    const r = resolveAsset(src, ctx);
    if (r.error) { errors.push({ ...r.error, path: where, layer: lid }); return; }
    try {
      const meta = await sharp(r.file).metadata();
      assets[src] = { file: r.file, width: meta.width, height: meta.height, format: meta.format, channels: meta.channels };
    } catch (e) {
      errors.push(err('ASSET_UNREADABLE', `cannot decode ${r.file}: ${e.message}`, { path: where, layer: lid }));
    }
  };

  for (const [i, L] of spec.layers.entries()) {
    const lid = layerId(L, i);
    const where = `/layers/${i}`;
    if (L.type === 'image') {
      await checkAsset(L.src, `${where}/src`, lid);
      const a = assets[L.src];
      if (a && L.crop && (L.crop.x + L.crop.width > a.width || L.crop.y + L.crop.height > a.height)) {
        errors.push(err('CROP_OUT_OF_BOUNDS', `crop ${JSON.stringify(L.crop)} exceeds source ${a.width}x${a.height}`, { path: `${where}/crop`, layer: lid }));
      }
    }
    if (L.mask && L.mask.src) await checkAsset(L.mask.src, `${where}/mask/src`, lid);
    if (L.type === 'shape' && L.rotate && L.shape === 'path' && !L.origin && (L.width === undefined || L.height === undefined)) {
      errors.push(err('ROTATION_ORIGIN_REQUIRED', 'rotating a path needs origin [x,y] or a box (x,y,width,height)', { path: where, layer: lid }));
    }
    if ((L.mask || L.clip) && L.type !== 'gradient' && (L.width === undefined || L.height === undefined) && L.type !== 'image') {
      errors.push(err('MASK_BOX_REQUIRED', 'mask/clip needs the layer box (x, y, width, height)', { path: where, layer: lid }));
    }
    if (L.type === 'text') {
      const f = reg.resolve(L.font.family, L.font.weight ?? 400, L.font.style ?? 'normal');
      if (!f.ok) { errors.push(err(f.code, f.message, { path: `${where}/font`, layer: lid })); continue; }
      fonts[lid] = f.file;
      const scan = scanText(L.text, f.font);
      if (scan.missing.length) {
        errors.push(err('MISSING_GLYPH', `font "${L.font.family}" has no glyph for ${scan.missing.map((c) => `"${c}" (U+${c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')})`).join(', ')}`, { path: `${where}/text`, layer: lid }));
        continue;
      }
      if (scan.emoji.length || scan.complex.length) continue; // reported by the router as unsupported capabilities
      const b = box(L, canvas);
      const layout = layoutText(L, f.font, canvas, b);
      layouts[lid] = layout;
      const sev = L.overflow === 'warn' ? warnings : errors;
      if (!layout.fitsBox) {
        const why = [layout.overflow.width && 'width', layout.overflow.height && 'height', layout.overflow.lines && `maxLines ${L.maxLines}`].filter(Boolean).join(', ') || 'ink box outside layer box';
        sev.push(err('TEXT_OVERFLOW', `text does not fit its box at minSize ${layout.minSize}px (${why})${layout.overflow.words.length ? `; words wider than the box: ${layout.overflow.words.join(', ')}` : ''}`, { path: where, layer: lid, detail: { box: b, inkBox: layout.inkBox, size: layout.size } }));
      } else if (!layout.inCanvas && !L.rotate) {
        sev.push(err('TEXT_OUTSIDE_CANVAS', 'text ink box extends beyond the canvas (clipped)', { path: where, layer: lid, detail: { inkBox: layout.inkBox } }));
      }
      if (layout.shrunk) warnings.push(err('TEXT_SHRUNK', `auto-fit reduced size ${layout.maxSize}px -> ${layout.size}px`, { layer: lid }));
      layout.large = isLarge(layout, L.font.weight);
    }
  }
  const output = resolveOutput(spec, ctx);
  errors.push(...output.errors);
  return { errors, warnings, assets, fonts, layouts, output };
}
