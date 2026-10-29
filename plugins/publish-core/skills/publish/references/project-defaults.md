# Project defaults

Each project keeps its saved choices in one file, `<projects folder>/projects/<slug>/project.json`. This reference
says which value wins, how a new project is seeded, when the file may be changed, and how to add keys later.

## Which value wins

From strongest to weakest:

1. **Explicit request**: what the person said in this conversation, including a choice they made earlier in it.
2. **Current run notes**: the `Run notes` section of the package `status.md` (this package only).
3. **Project file** `project.json`:
   - a key listed in `locked` is a **rule**: run notes and skill guidance cannot override it. Only an explicit
     request that names the rule can ("ignore the palette lock this time"). If a request only implies a
     different value ("make it red" while `brand.palette` is locked), say so in one line and ask once.
   - every other key is a **default**: used when nothing stronger says otherwise.
4. **Skill guidance**: what the design and image skills recommend when nothing above decides.

A missing key, or a key set to `null`, means **no default**: fall through to the next level, and ask only if the
choice changes cost or the result a lot. The user-level defaults file is not a level here: it only seeds new
projects (below), so a project file is always complete on its own.

**Say where each choice came from.** In the package `status.md`, under `Choices in effect`, write each setting
with its source in exactly this form: `image model: nano-banana-pro (from project default)`. The five possible
endings are `(from explicit request)`, `(from run notes)`, `(from project rule)`, `(from project default)` and
`(from skill guidance)`. Write one line per setting; do not merge several settings into one source tag.

## What the project file holds

Start from `templates/project.template.json` (next to `SKILL.md`). All keys are optional except `slug` and `name`.

| Key | Meaning | Missing / `null` means |
|---|---|---|
| `project_version` | schema version of the file (currently `2`) | treat as `1`: still valid |
| `slug`, `name` | folder name and display name | required |
| `notes` | standing notes the agent reads every run (voice, do/don't) | no notes |
| `brand` | `name`, `palette{primary,accent,ink,paper,...}`, `fonts{display,body}`, `logos[]` (names from `brand_assets`) | no brand: ask for the colours and fonts that matter |
| `brand_assets[]` | `{name, path, type?}` for logos, photos, templates; paths are absolute | none |
| `models` | `image`, `edit`: the model or tool name to use for generation or edits | no default model |
| `tools` | `prefer[]`, `avoid[]`: plain tool, provider or model names applied when they fit | no preference |
| `providers` | `default`: provider/connector name to use first | no default provider |
| `budget` | `<unit>.per_step_max`, `<unit>.per_run_max` (unit is `credits`, `USD`, ...): spend ceilings | no cap set (a paid step with unknown price still needs an OK) |
| `approvals` | `paid_steps`: `ask` or `within_caps` | `ask` |
| `media_root` | absolute folder for this project's media (renders, generated and downloaded images, previews), outside the projects folder and any git repo. Overrides `media_root` in `~/.creator-publish/config.json` (the parent for every project, `<it>/<slug>`); `CREATOR_PUBLISH_MEDIA` overrides both | use the config file's `media_root`; if that is unset too, ask (no default location) |
| `output` | `formats[]` (`png`, `jpg`, `webp`), `variants` (default take count), `platforms[]` (default targets), `dir` (export folder) | `png`, ask how many variants, no platform, export into the package's media folder (resolved from `media_root`) |
| `youtube` | `handle` (e.g. `"@example"`), `watermark_display` (`end`, `custom` or `entire`), `end_screen_seconds` (5-20), `end_screen_elements[]` (e.g. `"video:best_for_viewer"`, `"video:most_recent"`, `"playlist"`, `"subscribe"`); read by `youtube-channel-assets` | no handle on file (ask), no watermark or end-screen default (choose from the video) |
| `apple_podcasts` | `show_title`, `author`, `category` (e.g. `"Science > Astronomy"`), `category_secondary`, `explicit` (`true`/`false`), `type` (`episodic` or `serial`), `host` (RSS host name); read by `apple-podcasts-assets` | nothing on file: ask, and mark `TBD (owner)` in the show copy |
| `spotify` | `hosting` (`"spotify-for-creators"` or the RSS host's name), `video` (`true`/`false`: video podcast on Spotify), `trailer` (the episode or file used as the trailer); read by `spotify-show-assets`, which takes the shared feed fields (title, category, explicit, type) from `apple_podcasts` | nothing on file: take the route from the owner's records or ask; mark `TBD (owner)` in the show copy |
| `x` | `handle` (e.g. `"@example"`), `display_name` (up to 50 characters), `bio` (up to 160), `pinned_post` (`latest_episode` or `start_here`); read by `x-profile-assets` | nothing on file: take the handle from the owner's records or ask; draft the bio and mark it for the owner |
| `locked` | list of dotted key paths that are rules, e.g. `["brand.palette","budget"]` | nothing is locked |

Notes:
- `approvals.paid_steps = "within_caps"` lets a paid step run without asking only when its cost is **known** and
  within both caps. Unknown cost, no caps, or anything over a cap: ask. Posting never has a setting: it always
  needs the person's OK for each post.
- `budget` is a ceiling, not an authorization. It never makes an unknown price free.

## Seeding a new project

When a request needs a project that does not exist (or the person asks to create one):

1. Resolve the projects folder (see `first-run.md`). Create `<folder>/projects/<slug>/` (slug: lowercase letters,
   digits and dashes).
2. Read `templates/project.template.json`. Set `slug` and `name`.
3. If `~/.creator-publish/defaults.json` exists, merge it over the template: an object merges key by key; an
   array or a scalar from the user file **replaces** the template's value; never take `slug`, `name`,
   `brand_assets` or `locked` from that file. A key the template does not know is kept.
4. Apply anything the person said about this project (brand colours, fonts, caps) on top.
5. Write the result as `project.json`, then tell the person which keys came from their user-level defaults.
6. Check the file parses: `node -e "JSON.parse(require('fs').readFileSync(process.argv[1],'utf8'))" project.json`.

The optional user-level file `~/.creator-publish/defaults.json` has the same shape as the template's
default-bearing keys (`templates/user-defaults.example.json`). Create it only when the person asks for it.

## Saving a choice

- **"Make X the default"** (or "always X for this project", "remember X"): edit **only the one key** it maps to
  in `project.json`. Read the file, change that single value in place with an exact-text edit, never rewrite the
  file from memory, and leave every other key, including keys you do not recognise, byte-for-byte as it was.
  Check it still parses (command above) and say which key changed from what to what. If no existing key fits,
  add one new key following the rules below and say so. If it is ambiguous which key is meant, ask once.
- **"Just this time"**, "only for this one", "for this package": write it in the package `status.md` under
  `Run notes`. **Do not touch `project.json`.**
- **"Lock it"** or "never change X": add the key path to `locked`.
- A choice the person makes without either phrase is a run note, not a saved default. Do not offer to save
  defaults unprompted more than once per project.
- Never edit `project.json` for any other reason, and never claim the owner approved something they did not.

## Adding keys later without breaking old projects

- A new key is optional and "missing = no default". Code and skills must work when it is absent.
- Never rename a key or change what an existing key means. Add a new key instead and mark the old one
  deprecated here. Bump `project_version` only if an existing key's meaning must change, and write the migration
  steps in this file.
- Add the new key to `templates/project.template.json` (as `null` or an empty value) so new projects get it. Do
  **not** rewrite existing projects automatically: add it to an old project only when the person asks.
- When editing a project file, preserve unknown keys. A file from an older version is valid as-is.
- Keys written by older versions of this tool (`default_mode`, `recipes`, `characters`, `wardrobe`, `scenes`,
  `voices`, `autonomy`) are kept untouched and not acted on. `gates[]` entries are the owner's own written review
  stops: honour their text.

## Answering "what defaults does this project use?"

Read `project.json` and the current package `status.md`, and answer with a short table: setting, value, source
(`project default`, `project rule`, `run notes`, or `not set`), plus whether `~/.creator-publish/defaults.json`
exists. Do not change anything.
