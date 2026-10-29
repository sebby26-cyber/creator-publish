// Font registry: bundled fonts + configured dirs. Families resolve exactly (case-insensitive) with an exact
// weight/style match. There is NO fallback: an unknown family or variant is an error.
import fs from 'node:fs';
import path from 'node:path';
import opentype from 'opentype.js';

const FONT_EXT = new Set(['.ttf', '.otf', '.woff']);
const caches = new Map(); // key: dirs joined -> registry

function parseFile(file, lowMemory) {
  const buf = fs.readFileSync(file);
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength), { lowMemory });
}

function namesOf(font) {
  const out = new Set();
  for (const table of Object.values(font.names || {})) {
    for (const key of ['fontFamily', 'preferredFamily', 'typographicFamily']) {
      const v = table && table[key];
      if (v) for (const s of Object.values(v)) out.add(String(s));
    }
  }
  return [...out];
}

export class FontRegistry {
  constructor(dirs) {
    this.dirs = dirs;
    this.entries = []; // {family, weight, style, file}
    this.errors = [];
    this.loaded = new Map(); // file -> opentype Font
    for (const dir of dirs) {
      if (!fs.existsSync(dir)) {
        this.errors.push(`font dir not found: ${dir}`);
        continue;
      }
      for (const name of fs.readdirSync(dir).sort()) {
        const file = path.join(dir, name);
        if (!FONT_EXT.has(path.extname(name).toLowerCase())) continue;
        try {
          const f = parseFile(file, true);
          const os2 = f.tables.os2 || {};
          const weight = os2.usWeightClass || 400;
          const italic = Boolean((os2.fsSelection & 1) || ((f.tables.head || {}).macStyle & 2));
          for (const family of namesOf(f)) {
            this.entries.push({ family, weight, style: italic ? 'italic' : 'normal', file });
          }
        } catch (e) {
          this.errors.push(`cannot parse font ${file}: ${e.message}`);
        }
      }
    }
  }

  families() {
    const m = new Map();
    for (const e of this.entries) {
      const k = e.family;
      if (!m.has(k)) m.set(k, new Set());
      m.get(k).add(`${e.weight}${e.style === 'italic' ? 'i' : ''}`);
    }
    return [...m.entries()].sort().map(([family, v]) => ({ family, variants: [...v].sort() }));
  }

  /** @returns {{ok:true, file:string, font:any} | {ok:false, code:string, message:string}} */
  resolve(family, weight = 400, style = 'normal') {
    const fam = String(family || '').toLowerCase();
    const same = this.entries.filter((e) => e.family.toLowerCase() === fam);
    if (!same.length) {
      return {
        ok: false, code: 'FONT_NOT_FOUND',
        message: `font family "${family}" not found (available: ${this.families().map((f) => f.family).join(', ')})`,
      };
    }
    const hit = same.find((e) => e.weight === weight && e.style === style);
    if (!hit) {
      return {
        ok: false, code: 'FONT_VARIANT_NOT_FOUND',
        message: `font "${family}" has no weight ${weight} ${style} (available: ${[...new Set(same.map((e) => `${e.weight} ${e.style}`))].join(', ')})`,
      };
    }
    if (!this.loaded.has(hit.file)) this.loaded.set(hit.file, parseFile(hit.file, false));
    return { ok: true, file: hit.file, font: this.loaded.get(hit.file) };
  }
}

export function getRegistry(dirs) {
  const key = dirs.join('\0');
  if (!caches.has(key)) caches.set(key, new FontRegistry(dirs));
  return caches.get(key);
}
