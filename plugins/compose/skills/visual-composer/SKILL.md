---
name: visual-composer
description: "Deterministic local composition/rendering of supplied assets: lays out existing images, logos, bundled fonts, text, shapes and gradients from a JSON composition spec into a validated PNG/JPEG/WebP at exact pixel sizes (social posts, banners, covers, cards). Same spec = same pixels. Use when the user wants assets they already have placed, overlaid, cropped, masked or typeset into a finished graphic, or hands you a composition spec. Not for generating imagery (use a generation skill), not for thumbnail/quote-card creative strategy or branding decisions (use those guidance skills first, then this to render)."
---

# visual-composer

**Scope: deterministic composition only.** You place what already exists (local image files, logos, the bundled
fonts) plus vector shapes, gradients and text, and render one file. No image generation, no branding decisions,
no content strategy, no network. If the user needs a new photo or illustration, produce it with a generation skill
first and pass the file in. If they need a concept (what the thumbnail should say), decide that with the relevant
guidance skill, then render here.

Everything is driven by a **composition spec** (JSON). Full reference: `references/composition-rules.md`
(coordinates, units, every layer type, error codes, NL-to-spec guide with a worked example). Schema:
`${CLAUDE_PLUGIN_ROOT}/renderer/schema/composition.schema.json`. Examples: `examples/*.json`.

## Before the first render (you do this, the user does not)
The renderer is Node code shipped inside this plugin. Check it, and install it if it is missing:

```sh
node --version                                                  # needs >= 20.9
test -d "${CLAUDE_PLUGIN_ROOT}/renderer/node_modules/sharp" && echo installed || echo MISSING
cd "${CLAUDE_PLUGIN_ROOT}/renderer" && npm ci --no-audit --no-fund   # only if MISSING: pinned versions from the lockfile
node "${CLAUDE_PLUGIN_ROOT}/renderer/src/cli.js" health          # must print "ok": true
```

`npm ci` writes `node_modules/` inside the plugin folder, which is outside the user's project: ask for their OK
first unless they already gave it. Never use `sudo` and never install globally. If Node is missing or too old, say
so, and tell the user to install Node themselves (the `publish` skill's dependencies reference lists the
supported sources).

## Mode A: the user gives a spec
1. Validate: `node "${CLAUDE_PLUGIN_ROOT}/renderer/src/cli.js" validate spec.json --out /abs/path/out.png`
   (Desktop: `visual_composer_validate`). Pass the same `--out` you will render with: a spec whose
   `output.path` is relative fails with `OUTPUT_PATH_REQUIRED` until an output path or output folder is known.
   Fix every error; never "work around" an `UNSUPPORTED_CAPABILITY` by silently dropping the operation. Tell the
   user what is unsupported and propose the hinted alternative.
2. Render (step 5 below), inspect (step 6).

## Mode B: the user describes the graphic in words
1. Pin down what you must not guess: **canvas size** (platform preset or explicit px), **output format/path**,
   the **exact text**, and which **supplied files** to use (absolute paths). Use the exact approved copy/assets from the upstream brief when supplied; ask only for missing information that changes the result. Never
   invent source copy or assets.
2. Translate to a spec with the guide in `references/composition-rules.md` ("Natural language to spec"): layers
   bottom-to-top; backgrounds first; scrims/gradients under text that sits on photos; one text layer per text
   role (kicker, title, body, CTA) with a box (`x, y, width, height`) and a max `size` (auto-fit shrinks).
   Use only bundled font families (Anton, Inter 400/700, DejaVu Sans 400/700) unless `visual_composer_capabilities`
   / `health` lists more.
3. Write the spec to a file next to the output (keep it: it is the reproducible source of the image).
4. Validate (Mode A step 1). Text that does not fit is an error (`TEXT_OVERFLOW`): shorten copy, enlarge the box
   or lower `minSize`; do not set `overflow: "warn"` unless the user accepts clipped text.
5. **Render**
   - Claude Code (CLI): `node "${CLAUDE_PLUGIN_ROOT}/renderer/src/cli.js" render spec.json --out /abs/path/out.png --preview`
     (prints a JSON report; exit 0 = ok, 2 = refused/failed and nothing written).
   - Claude Desktop (MCP): call `visual_composer_render` with `{spec}` (inline, absolute asset paths) or
     `{specPath}`; optional `output`. The result includes the JSON report and a preview image.
   - Read the report: `ok`, `output.path`, `checks[]` (any `fail` = not delivered), `warnings[]`
     (`LOW_CONTRAST`, `TEXT_SHRUNK`).
6. **Visual inspection (required, subjective, separate from the deterministic checks).** Look at the preview
   (CLI `--preview` writes `<out>.preview.png`; MCP returns it inline; several renders:
   `node "${CLAUDE_PLUGIN_ROOT}/renderer/src/cli.js" contact-sheet a.png b.png --out sheet.png`). Check: text legible at the target display
   size, nothing important under UI overlays or cropped by `fit: cover`, hierarchy reads in the intended order,
   logo not distorted, no accidental overlaps. Fix the spec and re-render; say what you changed.
7. Deliver: output path, dimensions/format, and any warnings you accepted. Same spec re-renders identically.

## Command reference
Every command prints a JSON report. `CLI` below is `node "${CLAUDE_PLUGIN_ROOT}/renderer/src/cli.js"`.

| Command | What |
|---|---|
| `CLI validate SPEC [--out FILE]` | checks only, writes nothing |
| `CLI render SPEC --out FILE [--preview]` | render (exit 0 ok, 2 refused); `SPEC` may be `-` for stdin with `--base-dir DIR` |
| `CLI batch DIR --contact-sheet sheet.png` | many specs plus a review sheet |
| `CLI contact-sheet A.png B.png --out sheet.png` | thumbnail grid of existing images |
| `CLI capabilities` / `CLI health` | backend capabilities / Node, sharp, fonts, config |

- Per-user settings live in `~/.creator-publish/config.json` (`out_dir`, `font_dirs[]`, `asset_roots[]`);
  environment variables override them: `CREATOR_PUBLISH_OUT`, `CREATOR_PUBLISH_FONT_DIRS` (`:`-separated),
  `CREATOR_PUBLISH_ASSET_ROOTS`, `CREATOR_PUBLISH_CONFIG` (path to another config file). With no output folder
  configured, always pass `--out`.
- MCP tools (Claude Desktop or any MCP client; see the repository README for the server config):
  `visual_composer_render`, `visual_composer_validate`, `visual_composer_capabilities`,
  `visual_composer_schema` (returns the schema + rules for writing specs without the files).
- Unsupported (always refused with a structured error, never skipped): hue/saturation/color/luminosity blend
  modes, colour emoji, complex scripts needing shaping (Arabic, Hebrew, Indic, Thai...), remote URLs, fonts not
  in the font dirs.

## Creator Publish handoff
`publish` supplies package/variant identity, selected brief, exact imagery/logo/font references and requested
export settings. Run this renderer directly. Keep the saved spec and exact input files with output
dimensions/format, sha256 (`sha256sum`), checks, visual review state and defects, and return those saved
references to the coordinator for the package `status.md`. Change only affected layers for a revision, then
recheck the export. Missing fonts or unsupported operations require a resolved choice, not silent substitution.
Thumbnail/title layouts are inspected at mobile size as well as full size. This stage does not upload/post.
