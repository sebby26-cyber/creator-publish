// sharp/libvips backend. Every layer is rasterised to an RGBA buffer through a chain of single-purpose
// pipelines (raw buffer between stages: sharp applies at most one rotation per pipeline, in a fixed internal
// order, so stages are never merged). Order per layer:
//   raster -> (image: crop -> resize/fit -> flip) -> effects -> clip/mask (dest-in) -> opacity -> rotate -> place
//   -> composite onto the accumulator with the layer's blend mode.
import sharp from 'sharp';
import { getRegistry } from '../fonts.js';
import { clipSvg, rotationCentre, shapeSvg, svgDoc } from '../svg/shapes.js';
import { textSvg } from '../svg/text.js';
import { box, contrastRatio, err, layerId, num, parseColor, relLuminance, svgColor, ComposerError } from '../util.js';

sharp.cache(false); // never serve stale decoded assets between renders

export const NAME = 'sharp';
export const RANK = 1;
const BLENDS = ['over', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light',
  'soft-light', 'difference', 'exclusion', 'add', 'saturate', 'xor', 'atop', 'in', 'out', 'dest-over', 'dest-in',
  'dest-out', 'dest-atop', 'source', 'dest', 'clear'];
export const UNSUPPORTED = ['blend.hue', 'blend.saturation', 'blend.color', 'blend.luminosity', 'text.color-emoji', 'text.complex-script'];
export const CAPABILITIES = new Set([
  'canvas.transparent', 'canvas.background.solid', 'canvas.background.gradient.linear', 'canvas.background.gradient.radial',
  'layer.image', 'image.fit.cover', 'image.fit.contain', 'image.fit.fill', 'image.fit.inside', 'image.fit.outside',
  'image.crop', 'image.flip', 'image.svg-input',
  'layer.text', 'text.outline-paths', 'text.wrap', 'text.autofit', 'text.stroke', 'text.shadow', 'text.background',
  'text.letter-spacing', 'text.fill.solid', 'text.fill.gradient.linear', 'text.fill.gradient.radial',
  'shape.rect', 'shape.ellipse', 'shape.circle', 'shape.line', 'shape.polygon', 'shape.path',
  'shape.fill.solid', 'shape.fill.gradient.linear', 'shape.fill.gradient.radial', 'shape.stroke', 'shape.stroke.dash',
  'layer.gradient.linear', 'layer.gradient.radial',
  'effect.blur', 'effect.brightness', 'effect.saturation', 'effect.hue', 'effect.lightness', 'effect.contrast',
  'effect.grayscale', 'effect.tint', 'effect.sharpen',
  'layer.opacity', 'layer.rotate', 'mask.gradient', 'mask.alpha', 'mask.luminance', 'clip.rect', 'clip.ellipse', 'clip.path',
  ...BLENDS.map((b) => `blend.${b}`),
  'output.png', 'output.jpeg', 'output.webp',
]);

export function available() {
  return { ok: true };
}

// ---------------------------------------------------------------- raw helpers
const RAW = (r) => ({ raw: { width: r.width, height: r.height, channels: r.channels || 4 } });
const from = (r) => sharp(r.data, RAW(r));
async function toRaw(img) {
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height, channels: info.channels };
}
const transparent = (w, h) => toRaw(sharp({ create: { width: w, height: h, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }));
const rasterSvg = (svg) => toRaw(sharp(Buffer.from(svg), { density: 72 }).ensureAlpha());

// ---------------------------------------------------------------- opacity (method detected once, by pixel test)
let opacityMethod = null;
const OPACITY = {
  // one pipeline: scale only the alpha band. Requires the input to already HAVE alpha (ours always does:
  // ensureAlpha+linear in a single pipeline fails on RGB input with "Band expansion using linear is unsupported").
  linear: async (r, a) => toRaw(from(r).linear([1, 1, 1, a], [0, 0, 0, 0])),
  // fallback: split alpha, scale it, re-join. Each step is its own pipeline: extractChannel(3).linear() in one
  // pipeline silently drops the linear, and linear on a 1-band image outputs 3 bands unless forced to b-w.
  channels: async (r, a) => {
    const a1 = await toRaw(from(r).extractChannel(3));
    const alpha = await toRaw(from(a1).linear(a, 0).toColourspace('b-w'));
    const rgb = await toRaw(from(r).removeAlpha());
    return toRaw(from(rgb).joinChannel(alpha.data, RAW(alpha)));
  },
};
export async function detectOpacityMethod() {
  if (opacityMethod) return opacityMethod;
  const probe = await toRaw(sharp({ create: { width: 2, height: 2, channels: 4, background: { r: 200, g: 100, b: 50, alpha: 1 } } }));
  const results = {};
  for (const [name, fn] of Object.entries(OPACITY)) {
    try {
      const o = await fn(probe, 0.5);
      const px = [...o.data.slice(0, 4)];
      results[name] = { pixel: px, ok: o.channels === 4 && px[0] === 200 && px[1] === 100 && px[2] === 50 && Math.abs(px[3] - 127.5) <= 1 };
    } catch (e) {
      results[name] = { ok: false, error: e.message };
    }
  }
  const chosen = Object.keys(OPACITY).find((k) => results[k].ok);
  if (!chosen) throw new Error(`no working opacity method: ${JSON.stringify(results)}`);
  opacityMethod = { method: chosen, probe: results };
  return opacityMethod;
}
async function applyOpacity(r, a) {
  const m = await detectOpacityMethod();
  return OPACITY[m.method](r, a);
}

// ---------------------------------------------------------------- effects / masks
async function applyEffects(r, e, executed) {
  if (!e) return r;
  const mod = {};
  for (const k of ['brightness', 'saturation', 'hue', 'lightness']) {
    if (e[k] !== undefined) { mod[k] = k === 'hue' ? Math.round(e[k]) : e[k]; executed.add(`effect.${k}`); }
  }
  if (Object.keys(mod).length) r = await toRaw(from(r).modulate(mod));
  if (e.contrast !== undefined) {
    const c = e.contrast;
    r = await toRaw(from(r).linear([c, c, c, 1], [128 * (1 - c), 128 * (1 - c), 128 * (1 - c), 0]));
    executed.add('effect.contrast');
  }
  if (e.grayscale) {
    const w = [0.2126, 0.7152, 0.0722];
    r = await toRaw(from(r).recomb([w, w, w]));
    executed.add('effect.grayscale');
  }
  if (e.tint) {
    const t = parseColor(e.tint);
    r = await toRaw(from(r).tint({ r: t.r, g: t.g, b: t.b }));
    executed.add('effect.tint');
  }
  if (e.blur) { r = await toRaw(from(r).blur(e.blur)); executed.add('effect.blur'); }
  if (e.sharpen) { r = await toRaw(from(r).sharpen()); executed.add('effect.sharpen'); }
  if (r.channels !== 4) r = await toRaw(from(r).ensureAlpha());
  return r;
}

const FIT_MASK = { fill: 'fill', cover: 'cover', contain: 'contain' };
/** RGBA (white, alpha = mask) at w x h for a mask spec. */
async function buildMask(mask, file, w, h, executed) {
  const mode = mask.mode || 'luminance';
  let a;
  if (mask.gradient) {
    const g = shapeSvg({ type: 'gradient', fill: mask.gradient }, { width: w, height: h }, 'mask');
    const r = await rasterSvg(svgDoc(w, h, g.defs, g.body));
    a = mode === 'alpha'
      ? await toRaw(from(r).extractChannel(3))
      : await toRaw(from(r).flatten({ background: '#000000' }).toColourspace('b-w'));
    executed.add('mask.gradient');
  } else if (mode === 'luminance') {
    a = await toRaw(sharp(file).resize(w, h, { fit: FIT_MASK[mask.fit || 'fill'], background: '#000000' }).flatten({ background: '#000000' }).toColourspace('b-w'));
  } else {
    a = await toRaw(sharp(file).resize(w, h, { fit: FIT_MASK[mask.fit || 'fill'], background: { r: 0, g: 0, b: 0, alpha: 0 } }).ensureAlpha().extractChannel(3));
  }
  if (a.channels !== 1) a = await toRaw(from(a).extractChannel(0));
  if (mask.invert) a = await toRaw(from(a).negate());
  executed.add(`mask.${mode}`);
  return toRaw(sharp({ create: { width: w, height: h, channels: 3, background: '#ffffff' } }).joinChannel(a.data, RAW(a)));
}
const destIn = async (r, m) => toRaw(from(r).composite([{ input: m.data, ...RAW(m), blend: 'dest-in' }]));

/** Clip + mask in raster-local space (r is w x h). */
async function applyMasks(r, L, assets, executed) {
  const clip = L.clip || (L.radius ? { shape: 'rect', radius: L.radius } : null);
  if (clip) {
    r = await destIn(r, await rasterSvg(clipSvg(clip, r.width, r.height)));
    executed.add(`clip.${clip.shape}`);
  }
  if (L.mask) r = await destIn(r, await buildMask(L.mask, L.mask.src && assets[L.mask.src].file, r.width, r.height, executed));
  return r;
}

/** Same as applyMasks but for a full-canvas plane whose mask is defined on the layer box. */
async function applyMasksOnPlane(plane, L, b, assets, canvas, executed) {
  if (!L.clip && !L.mask) return plane;
  const w = Math.max(1, Math.round(b.width)), h = Math.max(1, Math.round(b.height));
  let m = await toRaw(sharp({ create: { width: w, height: h, channels: 4, background: '#ffffff' } }));
  m = await applyMasks(m, { clip: L.clip, mask: L.mask }, assets, executed);
  let full = await transparent(canvas.width, canvas.height);
  const placed = await place(m, Math.round(b.x), Math.round(b.y), canvas);
  if (placed) full = await toRaw(from(full).composite([{ input: placed.data, ...RAW(placed), left: placed.left, top: placed.top }]));
  return destIn(plane, full);
}

/** Crop a raster to the canvas intersection; returns {data,width,height,left,top} or null. */
async function place(r, left, top, canvas) {
  const x0 = Math.max(0, left), y0 = Math.max(0, top);
  const x1 = Math.min(canvas.width, left + r.width), y1 = Math.min(canvas.height, top + r.height);
  if (x1 <= x0 || y1 <= y0) return null;
  if (x0 === left && y0 === top && x1 - x0 === r.width && y1 - y0 === r.height) return { ...r, left, top };
  const c = await toRaw(from(r).extract({ left: x0 - left, top: y0 - top, width: x1 - x0, height: y1 - y0 }));
  return { ...c, left: x0, top: y0 };
}

// ---------------------------------------------------------------- layer rasterisers
const POSITION = {
  center: 'centre', centre: 'centre', top: 'top', bottom: 'bottom', left: 'left', right: 'right',
  'top-left': 'left top', 'top-right': 'right top', 'bottom-left': 'left bottom', 'bottom-right': 'right bottom',
  attention: sharp.strategy.attention, entropy: sharp.strategy.entropy,
};

function rotatePoint(p, o, deg) {
  const a = (deg * Math.PI) / 180;
  const dx = p.x - o.x, dy = p.y - o.y;
  return { x: o.x + dx * Math.cos(a) - dy * Math.sin(a), y: o.y + dx * Math.sin(a) + dy * Math.cos(a) };
}

async function imageLayer(L, asset, canvas, assets, executed) {
  executed.add('layer.image');
  const isSvg = asset.format === 'svg';
  let srcW = L.crop ? L.crop.width : asset.width;
  let srcH = L.crop ? L.crop.height : asset.height;
  let b = box(L, canvas);
  if (b.width === undefined && b.height === undefined) { b.width = srcW; b.height = srcH; }
  else if (b.width === undefined) b.width = (b.height * srcW) / srcH;
  else if (b.height === undefined) b.height = (b.width * srcH) / srcW;
  const bw = Math.max(1, Math.round(b.width)), bh = Math.max(1, Math.round(b.height));

  // S0 decode (+EXIF auto-orient, the only rotation in this pipeline); SVG rasterised at a density that
  // matches the target size so vector logos stay crisp.
  const density = isSvg ? Math.min(2400, Math.max(72, Math.ceil(72 * Math.max(bw / srcW, bh / srcH)))) : undefined;
  let r = await toRaw(sharp(asset.file, density ? { density } : {}).autoOrient().ensureAlpha());
  if (isSvg) executed.add('image.svg-input');
  // S1 crop (in source pixels; for SVG scaled by the density factor)
  if (L.crop) {
    const k = r.width / asset.width;
    r = await toRaw(from(r).extract({ left: Math.round(L.crop.x * k), top: Math.round(L.crop.y * k), width: Math.round(L.crop.width * k), height: Math.round(L.crop.height * k) }));
    executed.add('image.crop');
  }
  // S2 resize/fit
  const fit = L.fit || 'cover';
  r = await toRaw(from(r).resize(bw, bh, { fit, position: POSITION[L.position || 'center'], background: { r: 0, g: 0, b: 0, alpha: 0 }, kernel: 'lanczos3' }));
  executed.add(`image.fit.${fit}`);
  // inside/outside keep aspect and do not fill the box: align within the box by position
  const pos = L.position || 'center';
  const ax = /left/.test(pos) ? 0 : /right/.test(pos) ? 1 : 0.5;
  const ay = /top/.test(pos) ? 0 : /bottom/.test(pos) ? 1 : 0.5;
  let ox = b.x + (bw - r.width) * ax, oy = b.y + (bh - r.height) * ay;
  // S3 flip/flop
  if (L.flip || L.flop) {
    let img = from(r);
    if (L.flip) img = img.flip();
    if (L.flop) img = img.flop();
    r = await toRaw(img);
    executed.add('image.flip');
  }
  r = await applyEffects(r, L.effects, executed); // S4
  r = await applyMasks(r, L, assets, executed); // S5
  if (L.opacity !== undefined && L.opacity < 1) { r = await applyOpacity(r, L.opacity); executed.add('layer.opacity'); } // S6
  // S7 rotate (own pipeline; canvas expands, transparent corners)
  if (L.rotate) {
    const centre = { x: ox + r.width / 2, y: oy + r.height / 2 };
    const origin = L.origin ? { x: L.origin[0], y: L.origin[1] } : { x: b.x + bw / 2, y: b.y + bh / 2 };
    const c2 = rotatePoint(centre, origin, L.rotate);
    r = await toRaw(from(r).rotate(L.rotate, { background: { r: 0, g: 0, b: 0, alpha: 0 } }));
    ox = c2.x - r.width / 2; oy = c2.y - r.height / 2;
    executed.add('layer.rotate');
  }
  return place(r, Math.round(ox), Math.round(oy), canvas);
}

async function vectorLayer(L, i, canvas, ctx, executed) {
  const id = `l${i}`;
  let frag;
  let b;
  if (L.type === 'text') {
    const layout = ctx.layouts[layerId(L, i)];
    frag = textSvg(L, layout, id, canvas);
    b = layout.box.height === undefined ? { ...layout.box, height: layout.inkBox.y + layout.inkBox.height - layout.box.y } : layout.box;
    executed.add('layer.text'); executed.add('text.outline-paths'); executed.add('text.wrap');
    if ((L.fit || 'shrink') === 'shrink') executed.add('text.autofit');
    if (L.stroke) executed.add('text.stroke');
    if (L.shadow) executed.add('text.shadow');
    if (L.background) executed.add('text.background');
    if (L.letterSpacing) executed.add('text.letter-spacing');
    const f = L.fill ?? L.color ?? '#000';
    executed.add(typeof f === 'string' ? 'text.fill.solid' : `text.fill.gradient.${f.type}`);
  } else {
    frag = shapeSvg(L, canvas, id);
    b = frag.box;
    if (L.type === 'gradient') executed.add(`layer.gradient.${L.fill.type}`);
    else {
      executed.add(`shape.${L.shape}`);
      if (L.fill) executed.add(typeof L.fill === 'string' ? 'shape.fill.solid' : `shape.fill.gradient.${L.fill.type}`);
      if (L.stroke) executed.add('shape.stroke');
      if (L.stroke && L.stroke.dash) executed.add('shape.stroke.dash');
    }
  }
  let body = frag.body;
  if (L.rotate) {
    const c = rotationCentre(L, canvas, b);
    body = `<g transform="rotate(${num(L.rotate)} ${num(c.x)} ${num(c.y)})">${body}</g>`;
    executed.add('layer.rotate');
  }
  let plane = await rasterSvg(svgDoc(canvas.width, canvas.height, frag.defs, body));
  plane = await applyEffects(plane, L.effects, executed);
  plane = await applyMasksOnPlane(plane, L, b, ctx.assets, canvas, executed);
  if (L.opacity !== undefined && L.opacity < 1) { plane = await applyOpacity(plane, L.opacity); executed.add('layer.opacity'); }
  return { ...plane, left: 0, top: 0 };
}

// ---------------------------------------------------------------- contrast sampling
function sampleContrast(acc, L, layout, canvas, threshold) {
  const ib = layout.inkBox;
  let x0 = ib.x, y0 = ib.y, x1 = ib.x + ib.width, y1 = ib.y + ib.height;
  if (L.rotate) {
    const c = rotationCentre(L, canvas, layout.box.height === undefined ? { ...layout.box, height: ib.y + ib.height - layout.box.y } : layout.box);
    const pts = [[x0, y0], [x1, y0], [x0, y1], [x1, y1]].map(([x, y]) => rotatePoint({ x, y }, c, L.rotate));
    x0 = Math.min(...pts.map((p) => p.x)); x1 = Math.max(...pts.map((p) => p.x));
    y0 = Math.min(...pts.map((p) => p.y)); y1 = Math.max(...pts.map((p) => p.y));
  }
  x0 = Math.max(0, Math.floor(x0)); y0 = Math.max(0, Math.floor(y0));
  x1 = Math.min(canvas.width, Math.ceil(x1)); y1 = Math.min(canvas.height, Math.ceil(y1));
  const fill = L.fill ?? L.color ?? '#000000';
  const stops = typeof fill === 'string' ? [fill] : fill.stops.map((s) => s.color);
  const fc = stops.map(parseColor);
  const tc = { r: fc.reduce((s, c) => s + c.r, 0) / fc.length, g: fc.reduce((s, c) => s + c.g, 0) / fc.length, b: fc.reduce((s, c) => s + c.b, 0) / fc.length };
  if (x1 <= x0 || y1 <= y0) return { status: 'skip', note: 'text outside canvas' };
  let solidBg = null;
  if (L.background) {
    const bg = parseColor(L.background.color);
    if (bg.a >= 0.999) solidBg = bg;
  }
  const lums = [];
  let sr = 0, sg = 0, sb = 0, n = 0, transparentPx = 0;
  const step = Math.max(1, Math.floor(Math.sqrt(((x1 - x0) * (y1 - y0)) / 40000))); // <= ~40k samples
  for (let y = y0; y < y1; y += step) {
    for (let x = x0; x < x1; x += step) {
      const o = (y * canvas.width + x) * 4;
      const a = acc.data[o + 3] / 255;
      if (a < 0.5) transparentPx += 1;
      // composite over white for transparent regions (a viewer default); flagged below
      const r = acc.data[o] * a + 255 * (1 - a), g = acc.data[o + 1] * a + 255 * (1 - a), bl = acc.data[o + 2] * a + 255 * (1 - a);
      sr += r; sg += g; sb += bl; n += 1;
      lums.push(relLuminance(r, g, bl));
    }
  }
  const tl = relLuminance(tc.r, tc.g, tc.b);
  const mean = solidBg || { r: sr / n, g: sg / n, b: sb / n };
  const ratio = contrastRatio(tl, relLuminance(mean.r, mean.g, mean.b));
  const per = solidBg ? [ratio] : lums.map((l) => contrastRatio(tl, l)).sort((a, b) => a - b);
  const p10 = per[Math.floor(per.length * 0.1)];
  let strokeRatio = null;
  if (L.stroke && L.stroke.width >= 1) {
    const s = parseColor(L.stroke.color);
    strokeRatio = num(contrastRatio(tl, relLuminance(s.r, s.g, s.b)), 2);
  }
  const ok = ratio >= threshold || (strokeRatio !== null && strokeRatio >= threshold);
  return {
    status: ok ? 'pass' : 'warn',
    ratio: num(ratio, 2), p10: num(p10, 2), threshold, strokeRatio,
    against: solidBg ? 'text background box' : 'pixels under the text ink box',
    sampleBox: { x: x0, y: y0, width: x1 - x0, height: y1 - y0 },
    note: transparentPx > n / 2 ? 'background mostly transparent: measured against white' : undefined,
  };
}

// ---------------------------------------------------------------- main
export async function render(spec, ctx) {
  const { canvas } = spec;
  const executed = new Set();
  const textChecks = [];
  const W = canvas.width, H = canvas.height;
  // background
  let acc;
  if (!canvas.background) { acc = await transparent(W, H); executed.add('canvas.transparent'); }
  else if (typeof canvas.background === 'string') {
    const c = svgColor(canvas.background);
    const p = parseColor(canvas.background);
    acc = await toRaw(sharp({ create: { width: W, height: H, channels: 4, background: { r: p.r, g: p.g, b: p.b, alpha: c.opacity } } }));
    executed.add('canvas.background.solid');
  } else {
    const g = shapeSvg({ type: 'gradient', fill: canvas.background }, canvas, 'bg');
    acc = await rasterSvg(svgDoc(W, H, g.defs, g.body));
    executed.add(`canvas.background.gradient.${canvas.background.type}`);
  }

  for (const [i, L] of spec.layers.entries()) {
    if (L.visible === false) continue;
    const lid = layerId(L, i);
    let placed;
    try {
      placed = L.type === 'image'
        ? await imageLayer(L, ctx.assets[L.src], canvas, ctx.assets, executed)
        : await vectorLayer(L, i, canvas, ctx, executed);
    } catch (e) {
      throw new ComposerError([err('RENDER_FAILED', `layer ${lid}: ${e.message}`, { layer: lid, path: `/layers/${i}` })]);
    }
    if (L.type === 'text') {
      const layout = ctx.layouts[lid];
      const threshold = (L.contrast && L.contrast.min) || (layout.large ? 3 : ((spec.checks && spec.checks.contrast) || 4.5));
      textChecks.push({
        layer: lid,
        producedPath: Boolean(layout.pathData) || layout.visibleChars === 0,
        glyphs: layout.glyphCount, visibleChars: layout.visibleChars,
        font: { file: ctx.fonts[lid], size: layout.size, maxSize: layout.maxSize, shrunk: layout.shrunk },
        lines: layout.lines.map((l) => l.text),
        box: layout.box, inkBox: layout.inkBox, fitsBox: layout.fitsBox, inCanvas: layout.inCanvas,
        contrast: L.contrast && L.contrast.skip ? { status: 'skip', note: 'disabled by spec' } : sampleContrast(acc, L, layout, canvas, threshold),
      });
    }
    if (!placed) continue; // fully off-canvas
    const blend = L.blend || 'over';
    acc = await toRaw(from(acc).composite([{ input: placed.data, ...RAW(placed), left: placed.left, top: placed.top, blend }]));
    executed.add(`blend.${blend.replace('colour', 'color')}`);
  }

  // encode
  const o = spec.output || {};
  const format = ctx.format;
  let img = from(acc);
  const bg = o.background || (format === 'jpeg' ? (typeof canvas.background === 'string' ? canvas.background : '#ffffff') : null);
  if (bg) { const p = parseColor(bg); img = img.flatten({ background: { r: p.r, g: p.g, b: p.b } }); }
  if (format === 'png') img = img.png({ compressionLevel: 9, adaptiveFiltering: false, palette: false });
  else if (format === 'jpeg') img = img.jpeg({ quality: o.quality ?? 90, chromaSubsampling: (o.quality ?? 90) >= 90 ? '4:4:4' : '4:2:0', mozjpeg: false });
  else if (format === 'webp') img = img.webp({ quality: o.quality ?? 90, lossless: Boolean(o.lossless), effort: 4 });
  const encoded = await img.toBuffer(); // metadata is not copied (sharp default): EXIF/XMP/ICC stripped
  executed.add(`output.${format}`);
  return { encoded, executed, textChecks, opacity: await detectOpacityMethod() };
}

export { getRegistry };
