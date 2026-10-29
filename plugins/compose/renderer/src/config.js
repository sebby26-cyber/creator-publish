// Machine-local configuration. Nothing machine-specific is committed:
//   env CREATOR_PUBLISH_OUT            default output directory
//   env CREATOR_PUBLISH_FONT_DIRS      extra font dirs (":"-separated)
//   env CREATOR_PUBLISH_ASSET_ROOTS    if set, assets must resolve inside one of these (":"-separated)
//   env PHOTOCRAFT_CLI                 path to photocraft-cli (optional backend, never required)
//   env CREATOR_PUBLISH_CONFIG         path to a JSON config (default ~/.creator-publish/config.json)
// Env wins over the config file. The file is the same per-user config the skills use (see the publish skill's
// first-run reference): keys out_dir, font_dirs[], asset_roots[], photocraft_cli (camelCase outDir/fontDirs/
// assetRoots/photocraftCli are still read). Other keys (e.g. vault_root) are ignored here. Nothing is read from
// inside the plugin folder, so installed plugins and the MCP server need no env block.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const RENDERER_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const PLUGIN_DIR = path.resolve(RENDERER_DIR, '..');
export const BUNDLED_FONTS_DIR = path.join(RENDERER_DIR, 'fonts');

const expand = (p) => (p && p.startsWith('~') ? path.join(os.homedir(), p.slice(1)) : p);
const list = (s) => (s ? s.split(':').map((x) => x.trim()).filter(Boolean).map(expand) : []);

export function loadConfig(env = process.env) {
  const configPath = env.CREATOR_PUBLISH_CONFIG || path.join(os.homedir(), '.creator-publish', 'config.json');
  let file = {};
  let fileError = null;
  if (fs.existsSync(configPath)) {
    try {
      file = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (e) {
      fileError = `cannot parse ${configPath}: ${e.message}`;
    }
  }
  const outDir = expand(env.CREATOR_PUBLISH_OUT || file.out_dir || file.outDir || '') || null;
  const fontDirs = [BUNDLED_FONTS_DIR, ...(file.font_dirs || file.fontDirs || []).map(expand), ...list(env.CREATOR_PUBLISH_FONT_DIRS)];
  const assetRoots = env.CREATOR_PUBLISH_ASSET_ROOTS !== undefined
    ? list(env.CREATOR_PUBLISH_ASSET_ROOTS)
    : (file.asset_roots || file.assetRoots || []).map(expand);
  const photocraftCli = expand(env.PHOTOCRAFT_CLI || file.photocraft_cli || file.photocraftCli || '') || null;
  return {
    configPath: fs.existsSync(configPath) ? configPath : null,
    fileError,
    outDir: outDir ? path.resolve(outDir) : null,
    fontDirs: [...new Set(fontDirs.map((d) => path.resolve(d)))],
    assetRoots: assetRoots.map((d) => path.resolve(d)),
    photocraftCli,
  };
}
