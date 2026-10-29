#!/usr/bin/env node
// visual-composer MCP server (stdio). Thin wrapper over src/index.js — same core as the CLI.
// Tools: visual_composer_render, visual_composer_validate, visual_composer_capabilities, visual_composer_schema.
// stdout is the JSON-RPC channel: never console.log here.
import fs from 'node:fs';
import path from 'node:path';
import { McpServer, fromJsonSchema } from '@modelcontextprotocol/server';
import { StdioServerTransport } from '@modelcontextprotocol/server/stdio';
import * as core from './index.js';
import { PLUGIN_DIR, RENDERER_DIR } from './config.js';

const SPEC_INPUT = {
  spec: { type: 'object', description: 'Composition spec v1 object ({version:1, canvas, layers, output?}). Call visual_composer_schema for the full JSON Schema and rules.' },
  specPath: { type: 'string', description: 'Absolute path to a spec JSON file (alternative to spec). Relative asset paths resolve against its directory.' },
  baseDir: { type: 'string', description: 'Directory that relative asset paths in an inline spec resolve against. Absolute asset paths need no baseDir.' },
};

function loadSpec(args) {
  if (args.specPath) {
    const r = core.loadSpecFile(args.specPath);
    return { spec: r.spec, baseDir: args.baseDir || r.baseDir };
  }
  if (!args.spec) throw new Error('pass either spec (object) or specPath (absolute path)');
  return { spec: args.spec, baseDir: args.baseDir || null };
}

const json = (o) => ({ type: 'text', text: JSON.stringify(o, null, 2) });
const failure = (e) => ({ content: [json({ ok: false, errors: [{ code: 'INTERNAL', message: e.message }] })], isError: true });

const server = new McpServer({ name: 'visual-composer', version: core.VERSION });

server.registerTool('visual_composer_render', {
  title: 'Render a composition (deterministic, local)',
  description: 'Deterministic local composition/rendering of SUPPLIED assets (local image files, bundled fonts, shapes, gradients, text) into a PNG/JPEG/WebP. No generation, no network. Validates first (schema, assets, fonts, glyphs, text fit), refuses unsupported operations with structured errors and writes nothing on error; post-validates the file (decode, dimensions, format, text fit, WCAG contrast). Returns a JSON report and a preview image for visual inspection.',
  inputSchema: fromJsonSchema({
    type: 'object',
    properties: {
      ...SPEC_INPUT,
      output: { type: 'string', description: 'Output file path (.png/.jpg/.webp). Overrides spec.output.path. Relative paths resolve against the server cwd; prefer absolute.' },
      includePreview: { type: 'boolean', description: 'Attach a downscaled PNG preview (default true).' },
    },
  }),
}, async (args) => {
  try {
    const { spec, baseDir } = loadSpec(args);
    const report = await core.render(spec, { baseDir, output: args.output });
    const content = [json(report)];
    if (report.ok && report.output && args.includePreview !== false) {
      const buf = await core.previewBuffer(report.output.path, 768);
      content.push({ type: 'image', data: buf.toString('base64'), mimeType: 'image/png' });
    }
    return { content, isError: !report.ok };
  } catch (e) {
    return failure(e);
  }
});

server.registerTool('visual_composer_validate', {
  title: 'Validate a composition spec',
  description: 'Pre-render validation and routing for a visual-composer spec (schema, local assets, fonts, glyph coverage, text fit/auto-fit result, output path, required capabilities and chosen backend). Writes nothing.',
  inputSchema: fromJsonSchema({ type: 'object', properties: { ...SPEC_INPUT } }),
}, async (args) => {
  try {
    const { spec, baseDir } = loadSpec(args);
    const r = await core.validate(spec, { baseDir });
    return { content: [json(r)], isError: !r.ok };
  } catch (e) {
    return failure(e);
  }
});

server.registerTool('visual_composer_capabilities', {
  title: 'List renderer capabilities',
  description: 'Per-backend capability lists (sharp = local default, photocraft = optional stub), availability, bundled font families, opacity method and configured output directory.',
  inputSchema: fromJsonSchema({ type: 'object', properties: {} }),
}, async () => {
  try {
    const h = await core.health();
    return { content: [json({ ...core.capabilities(), fonts: h.fonts, outDir: h.config.outDir, opacity: h.opacity.method, node: h.node, sharp: h.sharp })] };
  } catch (e) {
    return failure(e);
  }
});

server.registerTool('visual_composer_schema', {
  title: 'Get the composition spec schema and rules',
  description: 'Returns the composition JSON Schema plus the composition rules reference (coordinate system, units, layer semantics, error codes, natural-language-to-spec guide). Read this before writing a spec.',
  inputSchema: fromJsonSchema({ type: 'object', properties: {} }),
}, async () => {
  const schema = fs.readFileSync(path.join(RENDERER_DIR, 'schema', 'composition.schema.json'), 'utf8');
  const rulesFile = path.join(PLUGIN_DIR, 'skills', 'visual-composer', 'references', 'composition-rules.md');
  const rules = fs.existsSync(rulesFile) ? fs.readFileSync(rulesFile, 'utf8') : '(composition-rules.md not found)';
  return { content: [{ type: 'text', text: rules }, { type: 'text', text: schema }] };
});

const transport = new StdioServerTransport();
await server.connect(transport);
process.stderr.write(`visual-composer MCP ${core.VERSION} ready (stdio)\n`);
