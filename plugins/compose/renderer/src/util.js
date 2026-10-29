// Small shared helpers: colours, units, hashing, structured errors.
import crypto from 'node:crypto';

export class ComposerError extends Error {
  /** @param {Array<{code:string,message:string,path?:string,layer?:string|number,detail?:any}>} errors */
  constructor(errors) {
    super(errors.map((e) => `${e.code}: ${e.message}`).join('; '));
    this.errors = errors;
  }
}

export const err = (code, message, extra = {}) => ({ code, message, ...extra });

// ---------------------------------------------------------------- colours
const NAMED = {
  black: '#000000', white: '#ffffff', red: '#ff0000', green: '#008000', blue: '#0000ff',
  yellow: '#ffff00', gray: '#808080', grey: '#808080', orange: '#ffa500', transparent: '#00000000',
};

/** Parse "#rgb", "#rgba", "#rrggbb", "#rrggbbaa", "rgb(r,g,b)", "rgba(r,g,b,a)" or a few names. */
export function parseColor(input) {
  if (typeof input !== 'string') return null;
  let s = input.trim().toLowerCase();
  if (NAMED[s]) s = NAMED[s];
  let m = s.match(/^#([0-9a-f]{3,8})$/);
  if (m) {
    let h = m[1];
    if (h.length === 3 || h.length === 4) h = h.split('').map((c) => c + c).join('');
    if (h.length !== 6 && h.length !== 8) return null;
    const n = (i) => parseInt(h.slice(i, i + 2), 16);
    return { r: n(0), g: n(2), b: n(4), a: h.length === 8 ? n(6) / 255 : 1 };
  }
  m = s.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)$/);
  if (m) {
    const c = (v) => Math.max(0, Math.min(255, Math.round(Number(v))));
    const a = m[4] === undefined ? 1 : Math.max(0, Math.min(1, Number(m[4])));
    return { r: c(m[1]), g: c(m[2]), b: c(m[3]), a };
  }
  return null;
}

export const COLOR_PATTERN =
  '^(#[0-9a-fA-F]{3,4}|#[0-9a-fA-F]{6}|#[0-9a-fA-F]{8}|rgba?\\(\\s*[\\d.]+\\s*,\\s*[\\d.]+\\s*,\\s*[\\d.]+\\s*(,\\s*[\\d.]+\\s*)?\\)|black|white|red|green|blue|yellow|gray|grey|orange|transparent)$';

/** SVG paint attrs for a colour: rgb() + separate opacity (librsvg-safe). */
export function svgColor(c, extraOpacity = 1) {
  const p = parseColor(c);
  if (!p) throw new Error(`bad colour ${c}`);
  return { color: `rgb(${p.r},${p.g},${p.b})`, opacity: +(p.a * extraOpacity).toFixed(4) };
}

/** WCAG relative luminance from 0-255 sRGB. */
export function relLuminance(r, g, b) {
  const f = (v) => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
export const contrastRatio = (l1, l2) => (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

// ---------------------------------------------------------------- units
/** number (px) or "NN%" of ref. */
export function len(v, ref, dflt) {
  if (v === undefined || v === null) return dflt;
  if (typeof v === 'number') return v;
  const m = String(v).match(/^(-?[\d.]+)%$/);
  if (m) return (Number(m[1]) / 100) * ref;
  const m2 = String(v).match(/^(-?[\d.]+)(px)?$/);
  if (m2) return Number(m2[1]);
  throw new Error(`bad length ${v}`);
}

/** Resolve a layer's box against the canvas. Missing width/height -> undefined unless defaults given. */
export function box(layer, canvas, defaults = {}) {
  const x = len(layer.x, canvas.width, defaults.x ?? 0);
  const y = len(layer.y, canvas.height, defaults.y ?? 0);
  const width = len(layer.width, canvas.width, defaults.width);
  const height = len(layer.height, canvas.height, defaults.height);
  return { x, y, width, height };
}

// ---------------------------------------------------------------- hashing / misc
export const sha256 = (buf) => crypto.createHash('sha256').update(buf).digest('hex');

/** Stable JSON stringify (sorted keys) for spec hashing. */
export function stableStringify(v) {
  if (Array.isArray(v)) return `[${v.map(stableStringify).join(',')}]`;
  if (v && typeof v === 'object') {
    return `{${Object.keys(v).sort().map((k) => `${JSON.stringify(k)}:${stableStringify(v[k])}`).join(',')}}`;
  }
  return JSON.stringify(v);
}

export const num = (n, d = 3) => +Number(n).toFixed(d);

export const layerId = (layer, i) => (layer && layer.id) || `#${i}`;

export const escXml = (s) => String(s).replace(/[<>&"']/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[c]);
