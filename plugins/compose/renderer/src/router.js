// Router: spec -> required capabilities -> simplest available backend that covers ALL of them.
// Never silently skips: if nothing covers the set, a structured error lists the uncovered capabilities.
import { scanText } from './svg/text.js';
import { err, layerId } from './util.js';
import * as sharpAdapter from './adapters/sharp.js';
import * as photocraftAdapter from './adapters/photocraft.js';

export const BACKENDS = [sharpAdapter, photocraftAdapter]; // ordered simplest first (rank)

const blendCap = (b) => `blend.${b === 'colour-dodge' ? 'color-dodge' : b === 'colour-burn' ? 'color-burn' : b === 'centre' ? 'center' : b}`;

function paintCaps(fill, prefix, out) {
  if (!fill) return;
  if (typeof fill === 'string') out.add(`${prefix}.solid`);
  else out.add(`${prefix}.gradient.${fill.type}`);
}

function effectCaps(L, out) {
  const e = L.effects || {};
  for (const k of Object.keys(e)) if (e[k] !== undefined && e[k] !== false) out.add(`effect.${k}`);
  if (L.opacity !== undefined && L.opacity < 1) out.add('layer.opacity');
  if (L.rotate) out.add('layer.rotate');
  if (L.mask) out.add(`mask.${L.mask.mode || 'luminance'}`);
  if (L.mask && L.mask.gradient) out.add('mask.gradient');
  if (L.clip) out.add(`clip.${L.clip.shape}`);
  out.add(blendCap(L.blend || 'over'));
}

/** Capability set a spec needs (sorted array). Per-capability provenance in `where`. */
export function analyse(spec) {
  const out = new Set();
  const where = {};
  const add = (cap, loc) => { out.add(cap); (where[cap] ||= []).push(loc); };
  const c = spec.canvas || {};
  if (c.background) {
    const s = new Set(); paintCaps(c.background, 'canvas.background', s);
    for (const cap of s) add(cap, '/canvas/background');
  } else add('canvas.transparent', '/canvas');
  (spec.layers || []).forEach((L, i) => {
    if (L.visible === false) return;
    const loc = `/layers/${i} (${layerId(L, i)})`;
    const s = new Set();
    if (L.type === 'image') {
      s.add('layer.image');
      s.add(`image.fit.${L.fit || 'cover'}`);
      if (L.crop) s.add('image.crop');
      if (L.flip || L.flop) s.add('image.flip');
      if (L.radius) s.add('clip.rect');
      if (/\.svg$/i.test(L.src || '')) s.add('image.svg-input');
    } else if (L.type === 'text') {
      s.add('layer.text');
      s.add('text.outline-paths');
      if (L.width !== undefined) s.add('text.wrap');
      if ((L.fit || 'shrink') === 'shrink') s.add('text.autofit');
      if (L.stroke) s.add('text.stroke');
      if (L.shadow) s.add('text.shadow');
      if (L.background) s.add('text.background');
      if (L.letterSpacing) s.add('text.letter-spacing');
      paintCaps(L.fill ?? L.color ?? '#000', 'text.fill', s);
      const scan = scanText(String(L.text || ''), null);
      if (scan.emoji.length) s.add('text.color-emoji');
      if (scan.complex.length) s.add('text.complex-script');
    } else if (L.type === 'shape') {
      s.add(`shape.${L.shape}`);
      paintCaps(L.fill, 'shape.fill', s);
      if (L.stroke) s.add('shape.stroke');
      if (L.stroke && L.stroke.dash) s.add('shape.stroke.dash');
    } else if (L.type === 'gradient') {
      s.add(`layer.gradient.${L.fill.type}`);
    }
    effectCaps(L, s);
    for (const cap of s) add(cap, loc);
  });
  const fmt = (spec.output && spec.output.format) || null;
  if (fmt) add(`output.${fmt}`, '/output/format');
  return { capabilities: [...out].sort(), where };
}

/** Pick a backend. Returns {backend, capabilities} or {errors}. */
export function route(spec, ctx, formatHint) {
  const { capabilities, where } = analyse(spec);
  const caps = new Set(capabilities);
  if (formatHint) caps.add(`output.${formatHint}`);
  const considered = [];
  for (const be of BACKENDS) {
    const missing = [...caps].filter((c) => !be.CAPABILITIES.has(c));
    const avail = be.available(ctx);
    considered.push({ backend: be.NAME, available: avail.ok, reason: avail.reason, missing });
    if (!missing.length && avail.ok) return { backend: be, capabilities: [...caps].sort(), considered };
  }
  // nothing covered it: explain precisely
  const coverable = considered.find((c) => !c.missing.length);
  if (coverable) {
    return { errors: [err('BACKEND_UNAVAILABLE', `only backend "${coverable.backend}" covers this spec and it is unavailable: ${coverable.reason}`, { detail: { considered } })] };
  }
  const uncovered = [...caps].filter((c) => !BACKENDS.some((b) => b.CAPABILITIES.has(c)));
  const errors = uncovered.map((c) => err('UNSUPPORTED_CAPABILITY', `no backend supports "${c}"`, { path: (where[c] || [])[0], detail: { capability: c, usedAt: where[c] || [], hint: HINTS[c] } }));
  if (!errors.length) {
    errors.push(err('NO_SINGLE_BACKEND', 'no single available backend covers all required capabilities', { detail: { considered } }));
  }
  return { errors, considered };
}

const HINTS = {
  'blend.hue': 'libvips has no HSL blend modes; use effects.hue on the layer, or multiply/overlay/soft-light',
  'blend.saturation': 'use effects.saturation on the layer instead',
  'blend.color': 'use effects.tint or blend "overlay"/"soft-light"',
  'blend.luminosity': 'use effects.grayscale + blend "overlay"',
  'text.color-emoji': 'colour emoji glyphs are not rendered; supply the emoji as an image layer (PNG/SVG)',
  'text.complex-script': 'complex scripts (Arabic, Hebrew, Indic, Thai, ...) need OpenType shaping, which this renderer does not do',
};

export function capabilitiesReport(ctx) {
  return BACKENDS.map((b) => {
    const a = b.available(ctx);
    return { backend: b.NAME, rank: b.RANK, available: a.ok, reason: a.reason || null, capabilities: [...b.CAPABILITIES].sort(), unsupported: b.UNSUPPORTED || [] };
  });
}
