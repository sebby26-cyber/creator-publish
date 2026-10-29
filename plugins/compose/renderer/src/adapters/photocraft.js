// PhotoCraft backend (https://github.com/storytold/photocraft) — OPTIONAL, never a dependency.
// Availability: $PHOTOCRAFT_CLI (or config photocraftCli) pointing at an executable, else `photocraft-cli` on PATH.
// Status: documented stub. Capabilities are declared for routing/inspection, but render() refuses to run.
// Spike 2026-10-08 (photocraft-cli 0.5.0 macOS universal, notarised): headless `run --new` -> file.placeEmbedded
// -> type.create{box} -> PNG export works (~40 ms) and two runs were byte-identical. NOT wired because an unknown
// font family is silently substituted (no error) and fonts resolve from the system font set, which breaks this
// renderer's no-silent-fallback / portable-output rules. Revisit if PhotoCraft gains a strict font mode.
import fs from 'node:fs';
import path from 'node:path';
import { ComposerError, err } from '../util.js';

export const NAME = 'photocraft';
export const RANK = 2;
export const WIRED = false;
// Declared (unverified) capability surface: a layered editor with typed text boxes and embedded images.
// Deliberately a subset of what the sharp backend covers, so the router never prefers it today.
export const CAPABILITIES = new Set([
  'canvas.transparent', 'canvas.background.solid',
  'layer.image', 'image.fit.cover', 'image.fit.contain', 'image.fit.fill',
  'layer.text', 'text.wrap', 'text.fill.solid',
  'shape.rect', 'shape.ellipse', 'shape.fill.solid',
  'layer.opacity', 'blend.over', 'blend.multiply', 'blend.screen', 'blend.overlay',
  'output.png', 'output.jpeg',
]);
export const UNSUPPORTED = [];

function isExec(p) {
  try { fs.accessSync(p, fs.constants.X_OK); return fs.statSync(p).isFile(); } catch { return false; }
}

export function locate(ctx = {}) {
  const configured = ctx.config && ctx.config.photocraftCli;
  if (configured) return isExec(configured) ? configured : null;
  for (const dir of (process.env.PATH || '').split(path.delimiter)) {
    const p = path.join(dir, 'photocraft-cli');
    if (dir && isExec(p)) return p;
  }
  return null;
}

export function available(ctx = {}) {
  const cli = locate(ctx);
  if (!cli) return { ok: false, reason: 'photocraft-cli not found (set PHOTOCRAFT_CLI or put photocraft-cli on PATH)' };
  if (!WIRED) return { ok: false, reason: `photocraft-cli found at ${cli} but the adapter is a stub (not wired to execute)` };
  return { ok: true, cli };
}

export async function render(spec, ctx) {
  const a = available(ctx);
  throw new ComposerError([err('BACKEND_UNAVAILABLE', `photocraft: ${a.reason || 'not wired'}`)]);
}
