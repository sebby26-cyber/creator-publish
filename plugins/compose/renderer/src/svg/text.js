// Text -> SVG <path> outlines via opentype.js. No SVG <text>, no fontconfig: what you measure is what renders.
//
// Layout model (documented in references/composition-rules.md):
//  - Box: x, y, width (wrap width), optional height. Lines wrap greedily on spaces; "\n" forces a break.
//  - size is the MAX font size; with fit "shrink" (default) the size steps down 1px at a time until the text fits
//    (width, height, maxLines) or minSize is reached. Fit is decided on the measured INK box (glyph outlines + stroke).
//  - Horizontal align uses advance widths per line; vertical align (top|middle|bottom) uses the INK box,
//    so y is where the ink starts for valign top.
//  - Manual layout: cmap lookup + pairwise kerning from the font's kern table / GPOS PairPos (no GSUB shaping:
//    no ligatures, no complex scripts — those are rejected upstream as unsupported capabilities).
import { escXml, num, svgColor } from '../util.js';
import { paintAttrs } from './shapes.js';

const EMOJI = /\p{Extended_Pictographic}/u;
const IGNORABLE = /[‍︎️]/u; // ZWJ + variation selectors
const COMPLEX = /[\p{Script=Arabic}\p{Script=Hebrew}\p{Script=Syriac}\p{Script=Thaana}\p{Script=Devanagari}\p{Script=Bengali}\p{Script=Gurmukhi}\p{Script=Gujarati}\p{Script=Oriya}\p{Script=Tamil}\p{Script=Telugu}\p{Script=Kannada}\p{Script=Malayalam}\p{Script=Sinhala}\p{Script=Thai}\p{Script=Lao}\p{Script=Tibetan}\p{Script=Myanmar}\p{Script=Khmer}\p{Script=Mongolian}]/u;

export function transformText(layer) {
  const t = String(layer.text ?? '');
  if (layer.transform === 'uppercase') return t.toUpperCase();
  if (layer.transform === 'lowercase') return t.toLowerCase();
  return t;
}

/** Classify characters: emoji (colour glyphs unsupported), complex-script (needs shaping), missing glyphs. */
export function scanText(text, font) {
  const emoji = [];
  const complex = [];
  const missing = [];
  for (const ch of Array.from(text)) {
    if (ch === '\n' || ch === ' ' || IGNORABLE.test(ch)) continue;
    if (EMOJI.test(ch)) { emoji.push(ch); continue; }
    if (COMPLEX.test(ch)) { complex.push(ch); continue; }
    if (font && font.charToGlyph(ch).index === 0) missing.push(ch);
  }
  const uniq = (a) => [...new Set(a)];
  return { emoji: uniq(emoji), complex: uniq(complex), missing: uniq(missing) };
}

const metricsCache = new WeakMap();
function metrics(font) {
  if (!metricsCache.has(font)) metricsCache.set(font, { glyph: new Map(), kern: new Map() });
  const m = metricsCache.get(font);
  const glyph = (ch) => {
    if (!m.glyph.has(ch)) {
      const g = font.charToGlyph(ch);
      const bb = g.getPath(0, 0, font.unitsPerEm).getBoundingBox(); // y-down, font units
      const empty = !(bb.x2 > bb.x1 || bb.y2 > bb.y1) || !Number.isFinite(bb.x1);
      m.glyph.set(ch, { g, adv: g.advanceWidth || 0, bb: empty ? null : bb });
    }
    return m.glyph.get(ch);
  };
  const kern = (a, b) => {
    const k = `${a.g.index},${b.g.index}`;
    if (!m.kern.has(k)) {
      let v = 0;
      try { v = font.getKerningValue(a.g, b.g) || 0; } catch { v = 0; }
      m.kern.set(k, v);
    }
    return m.kern.get(k);
  };
  return { glyph, kern };
}

/** Pen positions + ink extents of one line at a given size (relative to x=0, baseline=0). */
function shapeLine(str, font, size, letterSpacing) {
  const M = metrics(font);
  const scale = size / font.unitsPerEm;
  const chars = Array.from(str).filter((c) => !IGNORABLE.test(c));
  const glyphs = [];
  let x = 0;
  let prev = null;
  let inkL = Infinity, inkR = -Infinity, inkT = Infinity, inkB = -Infinity;
  chars.forEach((ch, i) => {
    const gm = M.glyph(ch);
    if (prev) x += M.kern(prev, gm) * scale;
    glyphs.push({ ch, gm, x });
    if (gm.bb) {
      inkL = Math.min(inkL, x + gm.bb.x1 * scale);
      inkR = Math.max(inkR, x + gm.bb.x2 * scale);
      inkT = Math.min(inkT, gm.bb.y1 * scale);
      inkB = Math.max(inkB, gm.bb.y2 * scale);
    }
    x += gm.adv * scale + (i < chars.length - 1 ? letterSpacing : 0);
    prev = gm;
  });
  const hasInk = inkL !== Infinity;
  return { glyphs, width: x, ink: hasInk ? { l: inkL, r: inkR, t: inkT, b: inkB } : null };
}

function wrap(text, font, size, letterSpacing, maxWidth) {
  const lines = [];
  const overlong = [];
  for (const para of text.split('\n')) {
    const words = para.split(/ +/);
    let line = '';
    for (const w of words) {
      if (maxWidth !== undefined && w && shapeLine(w, font, size, letterSpacing).width > maxWidth + 0.01) overlong.push(w);
      const cand = line ? `${line} ${w}` : w;
      if (!line || maxWidth === undefined || shapeLine(cand, font, size, letterSpacing).width <= maxWidth + 0.01) {
        line = cand;
      } else {
        lines.push(line);
        line = w;
      }
    }
    lines.push(line);
  }
  return { lines, overlong };
}

/**
 * Lay out one text layer. Returns everything validation and rendering need; never throws on overflow
 * (overflow is reported in `fits`/`overflow`).
 */
export function layoutText(layer, font, canvas, b) {
  const text = transformText(layer);
  const maxSize = layer.size;
  const minSize = Math.min(layer.minSize ?? Math.max(6, Math.round(maxSize * 0.25)), maxSize);
  const fitMode = layer.fit || 'shrink';
  const lh = layer.lineHeight ?? 1.2;
  const ls = layer.letterSpacing ?? 0;
  const strokeW = layer.stroke ? layer.stroke.width : 0;
  const availW = b.width === undefined ? undefined : b.width - 2 * strokeW;
  const availH = b.height === undefined ? undefined : b.height - 2 * strokeW;
  const maxLines = layer.maxLines;

  const attempt = (size) => {
    const { lines, overlong } = wrap(text, font, size, ls, availW);
    const lhPx = size * lh;
    const shaped = lines.map((s, i) => ({ text: s, baseline: i * lhPx, ...shapeLine(s, font, size, ls) }));
    let t = Infinity, bt = -Infinity;
    for (const l of shaped) if (l.ink) { t = Math.min(t, l.baseline + l.ink.t); bt = Math.max(bt, l.baseline + l.ink.b); }
    const inkH = t === Infinity ? 0 : bt - t;
    const maxW = Math.max(0, ...shaped.map((l) => l.width));
    const overflow = {
      width: overlong.length > 0 || (availW !== undefined && maxW > availW + 0.01),
      height: availH !== undefined && inkH > availH + 0.01,
      lines: maxLines !== undefined && lines.length > maxLines,
      words: overlong,
    };
    return { size, lhPx, shaped, inkTop: t === Infinity ? 0 : t, inkH, overflow, ok: !overflow.width && !overflow.height && !overflow.lines };
  };

  let res = attempt(maxSize);
  if (!res.ok && fitMode === 'shrink') {
    for (let s = Math.floor(maxSize) - (Number.isInteger(maxSize) ? 1 : 0); s >= minSize; s -= 1) {
      res = attempt(s);
      if (res.ok) break;
    }
  }

  // horizontal placement per line (advance widths), vertical placement on the ink box
  const align = layer.align || 'left';
  const valign = layer.valign || 'top';
  let dy;
  const top = b.y + strokeW;
  if (b.height === undefined || valign === 'top') dy = top - res.inkTop;
  else if (valign === 'middle') dy = b.y + (b.height - res.inkH) / 2 - res.inkTop;
  else dy = b.y + b.height - strokeW - res.inkH - res.inkTop;

  const lines = res.shaped.map((l) => {
    let x0 = b.x + strokeW;
    if (b.width !== undefined) {
      if (align === 'center') x0 = b.x + (b.width - l.width) / 2;
      else if (align === 'right') x0 = b.x + b.width - strokeW - l.width;
    }
    return { ...l, x: x0, baseline: l.baseline + dy };
  });

  let L = Infinity, R = -Infinity, T = Infinity, B = -Infinity;
  for (const l of lines) {
    if (!l.ink) continue;
    L = Math.min(L, l.x + l.ink.l); R = Math.max(R, l.x + l.ink.r);
    T = Math.min(T, l.baseline + l.ink.t); B = Math.max(B, l.baseline + l.ink.b);
  }
  const hasInk = L !== Infinity;
  const inkBox = hasInk
    ? { x: num(L - strokeW), y: num(T - strokeW), width: num(R - L + 2 * strokeW), height: num(B - T + 2 * strokeW) }
    : { x: b.x, y: b.y, width: 0, height: 0 };

  // final fit check on the measured ink box (1px tolerance for antialiasing/rounding)
  const tol = 1;
  const inBox = (b.width === undefined || (inkBox.x >= b.x - tol && inkBox.x + inkBox.width <= b.x + b.width + tol))
    && (b.height === undefined || (inkBox.y >= b.y - tol && inkBox.y + inkBox.height <= b.y + b.height + tol));
  const inCanvas = inkBox.x >= -tol && inkBox.y >= -tol
    && inkBox.x + inkBox.width <= canvas.width + tol && inkBox.y + inkBox.height <= canvas.height + tol;

  // outlines
  const parts = [];
  let glyphCount = 0;
  for (const l of lines) {
    for (const g of l.glyphs) {
      if (!g.gm.bb) continue;
      const d = g.gm.g.getPath(l.x + g.x, l.baseline, res.size).toPathData(2);
      if (d) { parts.push(d); glyphCount += 1; }
    }
  }
  const visibleChars = Array.from(text).filter((c) => !/\s/u.test(c) && !IGNORABLE.test(c)).length;
  return {
    text,
    size: res.size,
    maxSize,
    minSize,
    shrunk: res.size < maxSize,
    lineHeightPx: num(res.lhPx),
    lines: lines.map((l) => ({ text: l.text, x: num(l.x), baseline: num(l.baseline), width: num(l.width) })),
    box: b,
    inkBox,
    overflow: res.overflow,
    fitsBox: res.ok && inBox,
    inCanvas,
    pathData: parts.join(''),
    glyphCount,
    visibleChars,
  };
}

/** SVG fragment (defs + body) for a laid-out text layer. Rotation is applied by the caller's group. */
export function textSvg(layer, layout, id, canvas) {
  const defs = [];
  const body = [];
  if (layer.background) {
    const bg = layer.background;
    const pad = Array.isArray(bg.padding) ? bg.padding : [bg.padding ?? 0, bg.padding ?? 0];
    const c = svgColor(bg.color);
    const ib = layout.inkBox;
    body.push(`<rect x="${num(ib.x - pad[1])}" y="${num(ib.y - pad[0])}" width="${num(ib.width + 2 * pad[1])}" height="${num(ib.height + 2 * pad[0])}" rx="${bg.radius ?? 0}" fill="${c.color}" fill-opacity="${c.opacity}"/>`);
  }
  if (!layout.pathData) return { defs: defs.join(''), body: body.join('') };
  if (layer.shadow) {
    const s = layer.shadow;
    const c = svgColor(s.color ?? 'rgba(0,0,0,0.6)');
    if (s.blur) {
      defs.push(`<filter id="${id}-sh" filterUnits="userSpaceOnUse" x="0" y="0" width="${canvas.width}" height="${canvas.height}"><feGaussianBlur stdDeviation="${s.blur}"/></filter>`);
    }
    body.push(`<path d="${layout.pathData}" transform="translate(${s.x ?? 0},${s.y ?? 0})" fill="${c.color}" fill-opacity="${c.opacity}"${s.blur ? ` filter="url(#${id}-sh)"` : ''}/>`);
  }
  const paint = paintAttrs(layer.fill ?? layer.color ?? '#000000', `${id}-fill`, defs);
  let stroke = '';
  if (layer.stroke) {
    const c = svgColor(layer.stroke.color);
    // stroke.width = visible outline OUTSIDE the glyph edge; paint-order puts the fill over the inner half
    stroke = ` stroke="${c.color}" stroke-opacity="${c.opacity}" stroke-width="${layer.stroke.width * 2}" stroke-linejoin="round" paint-order="stroke"`;
  }
  body.push(`<path d="${layout.pathData}" ${paint}${stroke}><title>${escXml(layout.text.slice(0, 80))}</title></path>`);
  return { defs: defs.join(''), body: body.join('') };
}
