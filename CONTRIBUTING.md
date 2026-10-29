# Contributing to creator-publish

Thanks for helping. Fixes, skill improvements, new example specs and documentation changes are all welcome.

## Before you start

- For anything larger than a small fix, open an issue first.
- Keep the repo generic: **no personal projects, brand assets, media, secrets or machine-specific paths** in
  commits. User content lives in the user's own projects folder, outside this repo.
- Never commit secrets. API keys are read from the environment only.

## How the repo is built

The repo is a Claude Code plugin marketplace. Only `plugins/<name>/` is copied when someone installs a plugin,
so **everything a plugin needs must live inside its own folder**. A skill may not point at `../` or at the repo root.

```
.claude-plugin/marketplace.json     lists the six plugins
plugins/<name>/.claude-plugin/plugin.json
plugins/<name>/skills/<skill>/SKILL.md   (+ references/, templates/, examples/)
plugins/compose/renderer/           the Node renderer (CLI + MCP), shipped inside the compose plugin
```

Rules that keep it working:

- `${CLAUDE_PLUGIN_ROOT}` and `${CLAUDE_SKILL_DIR}` are substituted **only inside `SKILL.md`**, not in files under
  `references/`, and are not exported to the shell. Put commands that need a path in `SKILL.md`, or tell the
  reader to take the path from the skill's "Base directory" line.
- Commands in skills are plain tools (`ffmpeg`, `ffprobe`, `curl`, `sha256sum`, `node`). Run every command you
  write into a skill before committing it.
- Saved defaults live in `plugins/publish-core/skills/publish/templates/project.template.json`. To add a key,
  follow "Adding keys later" in `plugins/publish-core/skills/publish/references/project-defaults.md`: optional, missing = no default, never rename.
- Every tool a skill needs is listed in `plugins/publish-core/skills/publish/references/dependencies.md` with a check and an install command. Pin
  versions; never add an install script fetched from a URL.
- Skills adapted from social-media-skills keep the upstream text. Mark additions as `creator-publish note:` and
  record them in `NOTICE.md`. Keep every license file.

## Renderer

- Keep output deterministic (same spec, same bytes) and keep the no-silent-fallback rule: unsupported features
  and missing fonts are refused with an error code, never approximated.
- Pin dependency versions exactly and update `package-lock.json` with `npm install`.

## Verifying a change

There is no unit-test suite. In your pull request, say how you checked the change. Useful checks:

```sh
claude plugin validate .                 # marketplace
claude plugin validate plugins/compose   # each plugin
cd plugins/compose/renderer && npm ci && node src/cli.js health
node src/cli.js validate ../skills/visual-composer/examples/quote-card.json --out /tmp/check.png
```

For skill changes, run a real prompt with `claude -p --plugin-dir plugins/<name> ...` from a scratch folder with a
clean `HOME`, and check the files it wrote, not just its reply.

## Pull requests

1. Fork and create a topic branch.
2. One change per pull request, with what and why.
3. Update the README or the skill's references when behaviour changes.

## License

By contributing you agree your work is licensed under GPL-3.0-or-later, like the project (see `LICENSE`).

## Visuals

Banners, icons and graphics follow [BRAND.md](BRAND.md): one accent per repo, the shared palette and type, and SVG
with text outlined to paths. PNG and other media stay out of git; upload the social preview in the repo settings.
