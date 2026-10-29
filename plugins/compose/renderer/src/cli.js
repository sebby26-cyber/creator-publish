#!/usr/bin/env node
// visual-renderer CLI: thin wrapper over src/index.js. Prints JSON; exit 0 ok, 2 validation/render refusal, 1 crash.
import fs from 'node:fs';
import path from 'node:path';
import * as core from './index.js';

const USAGE = `visual-renderer <command> [options]

  render <spec.json|->   [--out FILE] [--preview] [--report FILE]
                         Validate, render, post-validate and write. "-" reads the spec from stdin
                         (relative asset paths then resolve against --base-dir or the cwd).
  validate <spec.json|-> Pre-render validation + routing only (writes nothing).
  capabilities           Per-backend capability lists and availability.
  health                 Node/sharp/libvips versions, fonts, config, opacity method, backends.
  batch <spec...|dir>    [--contact-sheet FILE]  Render several specs; optional contact sheet.
  contact-sheet <img...> --out FILE  Thumbnail grid of existing images (visual review).

  Common: --base-dir DIR (asset root for stdin specs), --compact (one-line JSON), --json (accepted; output is always JSON)
  Env: CREATOR_PUBLISH_OUT, CREATOR_PUBLISH_FONT_DIRS, CREATOR_PUBLISH_ASSET_ROOTS, PHOTOCRAFT_CLI`;

function parse(argv) {
  const pos = [];
  const flags = {};
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const k = a.slice(2);
      if (['preview', 'compact', 'json', 'help'].includes(k)) flags[k] = true;
      else { flags[k] = argv[i + 1]; i += 1; }
    } else pos.push(a);
  }
  return { pos, flags };
}

function readSpec(arg, flags) {
  if (arg === '-' || arg === undefined) {
    const spec = JSON.parse(fs.readFileSync(0, 'utf8'));
    return { spec, baseDir: flags['base-dir'] ? path.resolve(flags['base-dir']) : process.cwd() };
  }
  const r = core.loadSpecFile(arg);
  return { spec: r.spec, baseDir: flags['base-dir'] ? path.resolve(flags['base-dir']) : r.baseDir };
}

async function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  const { pos, flags } = parse(rest);
  const print = (o) => process.stdout.write(`${JSON.stringify(o, null, flags.compact ? 0 : 2)}\n`);
  if (!cmd || cmd === 'help' || flags.help) { process.stdout.write(`${USAGE}\n`); return 0; }
  switch (cmd) {
    case 'render': {
      const { spec, baseDir } = readSpec(pos[0], flags);
      const r = await core.render(spec, { baseDir, output: flags.out, preview: flags.preview });
      if (flags.report) fs.writeFileSync(flags.report, `${JSON.stringify(r, null, 2)}\n`);
      print(r);
      return r.ok ? 0 : 2;
    }
    case 'validate': {
      const { spec, baseDir } = readSpec(pos[0], flags);
      const r = await core.validate(spec, { baseDir, output: flags.out });
      print(r);
      return r.ok ? 0 : 2;
    }
    case 'capabilities': print(core.capabilities()); return 0;
    case 'health': { const h = await core.health(); print(h); return h.ok ? 0 : 2; }
    case 'batch': {
      let files = [];
      for (const p of pos) {
        if (fs.statSync(p).isDirectory()) files.push(...fs.readdirSync(p).filter((f) => f.endsWith('.json')).sort().map((f) => path.join(p, f)));
        else files.push(p);
      }
      const items = files.map((f) => { const r = core.loadSpecFile(f); return { spec: r.spec, baseDir: r.baseDir, name: path.basename(f) }; });
      const r = await core.batch(items, { contactSheet: flags['contact-sheet'] });
      print(r);
      return r.ok ? 0 : 2;
    }
    case 'contact-sheet': {
      if (!flags.out) throw new Error('--out FILE is required');
      print({ ok: true, contactSheet: await core.contactSheet(pos, flags.out) });
      return 0;
    }
    default:
      process.stderr.write(`unknown command "${cmd}"\n\n${USAGE}\n`);
      return 2;
  }
}

main().then((code) => { process.exitCode = code; }).catch((e) => {
  process.stdout.write(`${JSON.stringify({ ok: false, errors: [{ code: 'INTERNAL', message: e.message }] }, null, 2)}\n`);
  process.exitCode = 1;
});
