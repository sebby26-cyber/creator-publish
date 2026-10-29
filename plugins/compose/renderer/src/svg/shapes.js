// Vector shapes and gradients as SVG, rasterised by sharp (librsvg) at density 72 => 1 SVG unit = 1 px.
import { box, num, svgColor } from '../util.js';

/** Linear/radial gradient element. CSS-like angle: 0 = to top, 90 = to right, 180 = to bottom (default). */
export function gradientDef(id, g) {
  const stops = g.stops.map((s) => {
    const c = svgColor(s.color, s.opacity ?? 1);
    return `<stop offset="${num(s.offset)}" stop-color="${c.color}" stop-opacity="${c.opacity}"/>`;
  }).join('');
  if (g.type === 'radial') {
    const cx = g.cx ?? 0.5, cy = g.cy ?? 0.5, r = g.r ?? 0.5;
    return `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}" fx="${g.fx ?? cx}" fy="${g.fy ?? cy}">${stops}</radialGradient>`;
  }
  const a = ((g.angle ?? 180) * Math.PI) / 180;
  let dx = Math.sin(a), dy = -Math.cos(a);
  const m = Math.max(Math.abs(dx), Math.abs(dy));
  dx /= m; dy /= m; // corner-to-corner on diagonals (bbox units)
  return `<linearGradient id="${id}" x1="${num(0.5 - dx / 2)}" y1="${num(0.5 - dy / 2)}" x2="${num(0.5 + dx / 2)}" y2="${num(0.5 + dy / 2)}">${stops}</linearGradient>`;
}

/** fill="..." attrs for a colour string or gradient object (pushes gradient into defs). */
export function paintAttrs(fill, id, defs, attr = 'fill') {
  if (fill === undefined || fill === null || fill === 'none') return `${attr}="none"`;
  if (typeof fill === 'string') {
    const c = svgColor(fill);
    return `${attr}="${c.color}" ${attr}-opacity="${c.opacity}"`;
  }
  defs.push(gradientDef(id, fill));
  return `${attr}="url(#${id})"`;
}

function strokeAttrs(stroke, line = false) {
  if (!stroke) return '';
  const c = svgColor(stroke.color);
  const dash = stroke.dash ? ` stroke-dasharray="${stroke.dash.join(' ')}"` : '';
  return ` stroke="${c.color}" stroke-opacity="${c.opacity}" stroke-width="${stroke.width}"${dash}${line ? ' stroke-linecap="round"' : ' stroke-linejoin="round"'}`;
}

/** Rotation centre for a layer: explicit origin, else box centre, else canvas centre. */
export function rotationCentre(layer, canvas, b) {
  if (layer.origin) return { x: layer.origin[0], y: layer.origin[1] };
  if (layer.type === 'shape' && layer.shape === 'polygon') {
    const xs = layer.points.map((p) => p[0]), ys = layer.points.map((p) => p[1]);
    return { x: (Math.min(...xs) + Math.max(...xs)) / 2, y: (Math.min(...ys) + Math.max(...ys)) / 2 };
  }
  if (layer.type === 'shape' && layer.shape === 'line') {
    return { x: (b.x + layer.x2) / 2, y: (b.y + layer.y2) / 2 };
  }
  if (b && b.width !== undefined && b.height !== undefined) return { x: b.x + b.width / 2, y: b.y + b.height / 2 };
  return { x: canvas.width / 2, y: canvas.height / 2 };
}

/** SVG body (+defs) for shape and gradient layers, in canvas coordinates. */
export function shapeSvg(layer, canvas, id) {
  const defs = [];
  const full = { x: 0, y: 0, width: canvas.width, height: canvas.height };
  const b = layer.type === 'gradient' ? box(layer, canvas, full) : box(layer, canvas);
  if (layer.type === 'gradient') {
    const p = paintAttrs(layer.fill, `${id}-g`, defs);
    return { defs: defs.join(''), body: `<rect x="${num(b.x)}" y="${num(b.y)}" width="${num(b.width)}" height="${num(b.height)}" ${p}/>`, box: b };
  }
  const fill = paintAttrs(layer.fill ?? (layer.stroke ? 'none' : '#000000'), `${id}-g`, defs);
  const st = strokeAttrs(layer.stroke, layer.shape === 'line');
  let body;
  switch (layer.shape) {
    case 'rect':
      body = `<rect x="${num(b.x)}" y="${num(b.y)}" width="${num(b.width)}" height="${num(b.height)}" rx="${num(layer.radius ?? 0)}" ${fill}${st}/>`;
      break;
    case 'ellipse':
      body = `<ellipse cx="${num(b.x + b.width / 2)}" cy="${num(b.y + b.height / 2)}" rx="${num(b.width / 2)}" ry="${num(b.height / 2)}" ${fill}${st}/>`;
      break;
    case 'circle': {
      const r = Math.min(b.width, b.height) / 2;
      body = `<circle cx="${num(b.x + b.width / 2)}" cy="${num(b.y + b.height / 2)}" r="${num(r)}" ${fill}${st}/>`;
      break;
    }
    case 'line':
      body = `<line x1="${num(b.x)}" y1="${num(b.y)}" x2="${num(layer.x2)}" y2="${num(layer.y2)}"${st || strokeAttrs({ color: '#000000', width: 1 }, true)}/>`;
      break;
    case 'polygon':
      body = `<polygon points="${layer.points.map((p) => `${num(p[0])},${num(p[1])}`).join(' ')}" ${fill}${st}/>`;
      break;
    case 'path':
      body = `<path d="${layer.d}" ${fill}${st}/>`;
      break;
    default:
      throw new Error(`unknown shape ${layer.shape}`);
  }
  return { defs: defs.join(''), body, box: b };
}

/** Full SVG document of canvas size. */
export function svgDoc(width, height, defs, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><defs>${defs}</defs>${body}</svg>`;
}

/** Clip shape (white on transparent) in box-local coordinates, for dest-in masking. */
export function clipSvg(clip, w, h) {
  let el;
  if (clip.shape === 'ellipse') el = `<ellipse cx="${w / 2}" cy="${h / 2}" rx="${w / 2}" ry="${h / 2}" fill="#fff"/>`;
  else if (clip.shape === 'path') el = `<path d="${clip.d}" fill="#fff"/>`;
  else el = `<rect x="0" y="0" width="${w}" height="${h}" rx="${clip.radius ?? 0}" fill="#fff"/>`;
  return svgDoc(w, h, '', el);
}
