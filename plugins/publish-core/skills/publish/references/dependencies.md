# Dependencies

The agent checks every row it needs before the first step that uses it, installs what is missing, and reports the
result. The person only signs in, pays, and approves connectors.

## Who does what

- **Agent**: runs the check command; if it fails, runs the install command.
- **Agent asks your OK first** for anything that needs `sudo`, a global install, or a write outside the project
  folder (this includes `npm ci` into a plugin folder). One OK covers that one install; say what will be written
  and where.
- **Only the human** signs in, pays, creates API keys, and approves connectors.
- **Pinned**: install only the versions and sources in this table or in a lockfile. Never run an install script
  fetched from a URL that is not named here (no `curl ... | sh`). If something not listed is needed, ask.
- Never print a secret. Check a key with `test -n "$NAME" && echo set || echo missing`.

## Table

`<compose>` below is the folder of the `compose` plugin (the renderer ships inside it). The variable
`${CLAUDE_PLUGIN_ROOT}` is only expanded inside a `SKILL.md`, not in this file, so for the renderer rows load the
`visual-composer` skill and run its "Before the first render" block, which already has the absolute paths, or
take the "Base directory for this skill" line it prints and go up two levels.

| Dependency | Needed by | Check command | Install command | Who does it |
|---|---|---|---|---|
| Node.js >= 20.9 (tested 22.22.0; also verified on 26.3.1, macOS arm64) | `visual-composer` (renderer) | `command -v node && node --version` (prints nothing and exits non-zero when Node is missing) | Install Node 22 LTS from <https://nodejs.org/en/download> or your OS package manager (`brew install node@22`, `sudo apt-get install -y nodejs` on a distro that ships >= 20.9) | Agent after your OK (global install), or you |
| Renderer packages: `sharp` 0.35.5, `opentype.js` 2.0.0, `ajv` 8.20.0, `@modelcontextprotocol/server` 2.3.1 (pinned by `renderer/package-lock.json`) | `visual-composer` | `test -d "<compose>/renderer/node_modules/sharp" && echo installed \|\| echo MISSING` | `cd "<compose>/renderer" && npm ci --no-audit --no-fund` | Agent after your OK (writes inside the plugin folder, outside the project) |
| Renderer self-test | `visual-composer` | `node "<compose>/renderer/src/cli.js" health` (must print `"ok": true`) | none: fix the rows above | Agent |
| ffmpeg and ffprobe 6.1 or later (tested 6.1.1 and 9.0.2) | frame grabs from a video; spec checks on video; `youtube-channel-assets` (outro inspection, banner device crops, size checks); `apple-podcasts-assets` (alpha and size checks, PNG flatten); `spotify-show-assets` (cover and thumbnail size checks, video-spec probe); `x-profile-assets` (size checks) | `ffmpeg -version \| head -1 && ffprobe -version \| head -1` | macOS `brew install ffmpeg`; Debian/Ubuntu `sudo apt-get install -y ffmpeg`; Windows `winget install Gyan.FFmpeg` | Agent after your OK (sudo/global), or you. Optional: only needed for video |
| `curl`, `sha256sum` (or `shasum -a 256` on macOS) | saving a provider's result file, hashing outputs | `curl --version \| head -1 && (sha256sum --version \| head -1 \|\| shasum --version)` | preinstalled on macOS and Linux | none |
| `higgsfield` skill v3.40.0 (optional; prompt method for Higgsfield routes) | `nano-banana`, `flux`, `image-prompt` when the destination is Higgsfield | `test -f ~/.claude/skills/higgsfield/SKILL.md && echo installed \|\| echo MISSING` | `mkdir -p ~/.claude/skills && git clone --depth 1 --branch v3.40.0 https://github.com/OSideMedia/higgsfield-ai-prompt-skill ~/.claude/skills/higgsfield` (if `~/.claude/skills/higgsfield` already exists, move it aside first, e.g. rename it with a date suffix; never delete it) | Agent after your OK (writes outside the project), or you |
| Provider connector: Higgsfield, Canva, WoopSocial (only the ones you chose) | `nano-banana`, `flux`, `ai-image-editing`, `canva`, `post` | look for the connector's tools in the current session | Connect it in Claude's connector settings | **You** (sign-in and approval) |
| Provider API key: `GEMINI_API_KEY`, `OPENAI_API_KEY`, `IDEOGRAM_API_KEY`, `BFL_API_KEY` (only for the direct routes you chose) | `nano-banana`, `ideogram`, `flux`, `ai-image-editing`, `image-prompt` direct routes | `test -n "$IDEOGRAM_API_KEY" && echo set \|\| echo missing` | Create the key with the provider and export it in your shell profile | **You** (account and billing) |
| Claude in Chrome (only for browser routes) | `post` browser route, browser-only tools | look for the browser tools in the current session | Install the extension and sign in | **You** |
| Claude Desktop MCP entry (optional; Desktop only) | `visual_composer_*` MCP tools | open Desktop's MCP settings | add the server config from the README, with the absolute path to `renderer/src/mcp.js` | **You** (edits Desktop's config) |

## Notes

- In a cloud or sandboxed session the shell may only reach package registries and GitHub. If a download is
  refused, say so plainly and ask the person to attach the file; do not retry with another tool.
- Platform limits in `skills/post/references/platforms.json` are snapshots, not a dependency to install.
- Run the Node and renderer checks again after a plugin update: an update replaces the plugin folder and can
  remove `node_modules`.
- A fresh install has no `node_modules` either: the marketplace copy of `compose` ships without `sharp` and the
  other renderer packages (seen 2026-10-23 on compose 0.2.0 in `~/.claude/plugins/cache/...` and
  `~/.claude/plugins/marketplaces/...`). The renderer check above reports `MISSING`; run the pinned `npm ci` in
  that plugin's `renderer/` after the person's OK. Never install `sharp` globally to work around it.
