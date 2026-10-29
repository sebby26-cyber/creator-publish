---
name: publish
description: "Creator Publish entry point and each project's saved defaults. Use for: \"set up\", \"get started\", \"what can you do\", \"how does this work\"; \"new project\"; \"what defaults does this project use\", \"make X the default\" (saves one setting to the project), \"just this time\" (this package only), \"lock it\"; and making publish-ready graphics from a project and package status: thumbnails, covers, quote cards, pins, banners, YouTube channel art, watermarks and end screens, Apple Podcasts cover art and show setup, Spotify show art, video-podcast thumbnails and Spotify for Creators setup, X (Twitter) headers, profile photos, pinned-post and post images, infographics, image generation and edits, composition, review and final exports through the other Creator Publish skills and the connectors you have. Any change to a Creator Publish project's project.json goes through this skill. Choices stay resumable. Posting is separate and needs your explicit OK for each post."
---

# Publish

The LLM understands the request and coordinates the other skills directly: no planner, no phrase parsing. Work
is saved in files (a project folder, a package `status.md`) so it can be resumed on any device.

## First time, or "what can you do?"
Read [capabilities.md](references/capabilities.md) and give the person the short tour. If the projects folder is
not set up yet, or they said "set up" or "get started", follow [first-run.md](references/first-run.md). Missing
tools are listed in [dependencies.md](references/dependencies.md): check them, install what is missing under the
rules there, and only the person signs in, pays or approves connectors.

## Resolve the folder, the project and the current work
1. **Projects folder** (where `projects/<slug>/` live), in this order: `$CREATOR_PUBLISH_VAULT`, then a path the
   person named in the request, then `vault_root` in `~/.creator-publish/config.json` (or the file named by
   `$CREATOR_PUBLISH_CONFIG`). Output location alone is not a projects folder. If none is set, run the first-run
   flow; do not infer a folder from a cache or copy projects into the plugin.
2. **Project**: from the request or the current package; ask only if ambiguous. If it does not exist yet, create
   it from the template ([project-defaults.md](references/project-defaults.md), "Seeding a new project"). Read
   its `project.json` (brand, assets, defaults, locked rules), `workflow.md` if present, and the package status.
   On switching projects reload that project's defaults and references; never carry another brand, account or
   character across.
3. **Package**: reuse a suitable existing episode/campaign/package record, else use
   `<project>/packages/<package-id>/status.md`. Keep existing identities; a new label is only for new work. Read
   [asset-handoff.md](references/asset-handoff.md) when creating or updating status or resuming a handoff.
4. **Inputs**: any file the owner names or a finished output. If a `<file>.json` sidecar sits next to it, read it
   for kind, status and hash ([output-sidecar.md](references/output-sidecar.md)) and post only approved files
   unless the owner says otherwise. Treat a source file's folder as read-only and record the source file in the
   package. Resolve "that video" or "that thumbnail" to an exact selected file; never assume newest or download
   order means selected.

## Defaults and choices
Full rules: [project-defaults.md](references/project-defaults.md). In short:
- **Order**: explicit request, then run notes (this package), then the project file (a key in `locked` is a rule,
  any other key a default), then skill guidance. A missing key means "no default".
- Record each setting in the package `status.md` under `Choices in effect`, one line per setting, with its
  source in exactly this form: `image model: nano-banana-pro (from project default)`.
- **"Make X the default"**: change only that one key in `project.json`, in place, and say what changed.
  **"Just this time" / "for this package"**: write it under `Run notes`; never touch `project.json`.
- **"What defaults does this project use?"**: answer from `project.json` and the package status with a short
  table (setting, value, source); change nothing.
- Preserve the chosen model, tool/provider, route, platform, account, seed, quality, reference IDs, copy, brand
  tokens and template. Resolve conflicts with a locked rule or a supported control explicitly; never substitute
  silently.

## Connectors, spending and authorization
- The LLM chooses only the skills needed to supply missing assets. Reuse supplied photos, frames, logos and
  templates; generate imagery only when the brief needs it. Text and data layouts render locally without
  generation.
- Use installed specialist skills, connectors, CLIs or the signed-in browser. Tool names in specialist guidance
  describe the original environment, so read the actual tool schemas and supported model controls before calling
  them. Do not build replacement integrations.
- If the chosen connector, login or key is absent, name it and save the next action. A pinned route or tool is
  never swapped automatically; a different one needs the owner's choice.
- **Spend**: ask before any paid step not already authorized. Preflight the cost without billing when the tool
  supports it and track the running total against the project's `budget` caps. A step runs without asking only if
  the project sets `approvals.paid_steps` to `within_caps`, the price is known, and it is within both caps.
  Unknown price is never zero and never authorization. Poll slow jobs instead of resubmitting; keep the
  requested take count.
- Making assets never authorizes posting. Use `post` only for requested posting; it needs the owner's exact OK
  for each post. A prior approval of those exact details carries forward; changed media, copy, account or time
  needs a new one. Do not edit owner-set project settings or claim approval the owner did not give.

## Stage navigation
Choose stages for the request, including batches and single revisions; no fixed all-skills pipeline.

| Stage | Skills/tools (load only what is needed) | Minimum handoff |
|---|---|---|
| Brief and brand | `thumbnail-design`, `youtube-channel-assets`, `apple-podcasts-assets`, `spotify-show-assets`, `x-profile-assets`, `quote-cards-and-text-graphics`, `pinterest-pin-design`, `infographic-and-data-viz`, `design-and-templates` | Package identity, content promise, exact copy/data, brand/template, formats |
| Select or generate imagery | `image-prompt`, `nano-banana`, `flux`, `ideogram`, `ai-image-editing`; installed provider skills | Exact frame/photo/reference or generated take, model/route/settings/seed support, review state |
| Compose and export | `visual-composer`, `canva` | Selected inputs, saved spec or design ID, actual export and dimensions |
| Review and final variants | The design skill plus a visual check of the export | Mobile and full-size checks, selected drafts, defects, final format decisions |
| Persist and hand off | Save files into the media folder (see Save and resume) and update `status.md` (commands below) | Durable outputs, hashes, QC, next action |
| Optional posting | `post` | Exact media/copy/account/time, validated format, per-post approval, actual result |

## Thumbnails and asset packages
For a thumbnail, read the selected video/title or supplied brief plus the project brand. Use `thumbnail-design`
for the content promise, concept and copy. If a frame is needed, grab candidates from the video with ffmpeg
(pass the video file itself, not its `.json` sidecar), inspect them, and record the exact frame and timecode you
select. If new imagery is needed, use the chosen image specialist, then save the result and bind it to its
concept and take. Do not invent a person's face, a missing logo or source content.

Compose selected imagery and exact text with `visual-composer` (local spec) or `canva` (editable cloud design),
respecting the user's tool choice. Save sources, spec and design IDs so "make the title bolder" revises the
layout without regenerating approved imagery. Use installed fonts and real template IDs; never substitute
silently.

Inspect actual exports at full size and at mobile size for copy, crop, safe areas, hierarchy, brand and
legibility. Renderer validation is separate from visual and user review. Platform sizes and limits in the
references are snapshots; verify current requirements before a real upload. Generate the requested variants; a
suggested A/B plan neither mandates paid batches nor authorizes native testing.

## YouTube channel assets
For a YouTube banner, profile picture, watermark, end screen or channel setup, use `youtube-channel-assets`: it
reads the project brand, reuses existing channel assets, writes the specs for `visual-composer`, builds the
end-screen guide from the video's actual outro, makes device and avatar previews and fills a channel-copy doc
with the per-upload checklist. Uploading to YouTube Studio is the owner's step (via `post` when asked), never
part of making the assets.

## Apple Podcasts show assets
For Apple Podcasts cover art, episode art, a podcast listing or Podcasts Connect setup, use
`apple-podcasts-assets`: it reads the project brand and the YouTube set, reuses existing art, writes the specs for
`visual-composer`, checks the cover at 60 and 55 px on dark and light, applies Apple's artwork and metadata rules
and fills a show-copy doc with the per-episode checklist. Hosting the feed and submitting it in Podcasts Connect
are the owner's steps (via `post` when asked), never part of making the assets.

## Spotify show assets
For Spotify show art, a Spotify video-podcast thumbnail, Spotify for Creators setup or a Spotify trailer, use
`spotify-show-assets`: it reads the project's Spotify route and brand, reuses the feed's existing cover (for
example from the Apple Podcasts set) instead of making a near-duplicate, writes the specs for `visual-composer`,
checks the cover at 64 to 300 px on dark and light, renders 1920x1080 video thumbnails and fills a show-copy doc
with Spotify's chapter format and the per-episode checklist. Hosting, claiming the show, uploading and
publishing are the owner's steps (via `post` when asked), never part of making the assets.

## X profile and post assets
For an X (Twitter) header, profile photo, bio, pinned post, post images or link-card images, use
`x-profile-assets`: it reads the project brand, the owner's X records and the YouTube set, reuses existing art,
writes the specs for `visual-composer`, checks the header against the crop bands and the avatar overlap and the
photo at 40 px on X's three themes, and fills an X copy doc with alt text, launch and pinned drafts and the per-post
checklist. Changing the profile, posting and pinning are the owner's steps (via `post` when asked), never part of
making the assets.

## Drafts, targeted revisions and finals
Record concept/variant/take/version and generated/selected/approved/rejected/superseded state. "Keep version
two; change only the headline" preserves that variant's imagery, settings and identity, revises the affected
spec and export, and rechecks that output. Leave unrelated approved variants selected.

Final promotion uses exact selected drafts. Distinguish re-rendering the saved layout at final size, faithful
enhancement or upscaling, and regeneration under new settings. Record source and operation, supported seed
controls and the settings actually applied; a reused seed does not promise identical content. Explain
unsupported routes instead of substituting. Keep old files and IDs; supersede an asset only when its
replacement is selected.

## Commands (tested, run as needed)
These replace the old helper CLI. `V` is a video file, `OUT` an output path inside `$MEDIA` (see Save and resume).

```sh
# 1. Video length in seconds, then still frames at chosen times (default: 15%, 50%, 85% of the length)
ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$V"
ffmpeg -v error -y -ss 4.500 -i "$V" -frames:v 1 -map_metadata -1 -fflags +bitexact -flags:v +bitexact "$OUT.png"
#    name frames <video-stem>-frame-<seconds, 9 chars>s.png (e.g. episode-12-frame-0004.500s.png) so a re-run is the same file

# 2. Save a provider's result into $MEDIA (only a URL that provider returned), then hash it
curl -fsSL -o "$OUT" "<result url>"
sha256sum "$OUT"            # macOS: shasum -a 256 "$OUT"

# 3. Check a sidecar's hash against its file (sidecar field "sha256")
sha256sum "$FILE"           # compare with the sidecar; if they differ, say so before using the file

# 4. Measure any image or video (width, height, fps, duration, bytes)
ffprobe -v error -print_format json -show_streams -show_format "$FILE"
```

## Save and resume
Media files (every image, audio or video file) never go in the projects folder: a project folder holds only
`project.json`, `workflow.md`, specs, markdown and `status.md`. Media goes in the **media folder**, a path the
person chooses. Resolve it like the projects folder, using the first that is set:

1. a path the person named in the request;
2. the environment variable `CREATOR_PUBLISH_MEDIA`;
3. `media_root` in the project's `project.json` (this project's media folder);
4. `media_root` in `~/.creator-publish/config.json` (or the file named by `$CREATOR_PUBLISH_CONFIG`), plus
   `/<slug>`.

If none is set, there is no default: ask where media should live (step 3 of
[first-run.md](references/first-run.md)) and, with their OK, save it as `media_root`. In an unattended run, stop
before the first save and report "media folder not set: add `media_root` to ~/.creator-publish/config.json or set
CREATOR_PUBLISH_MEDIA". Never infer a location, and refuse one inside the projects folder or a git repository.

```sh
P="<projects folder>/projects/<slug>"; SLUG="<slug>"
MEDIA_ROOT=$(node -e 'const fs=require("fs"),os=require("os"),path=require("path");
const [p,c,s,env]=process.argv.slice(1);
const get=f=>{try{return JSON.parse(fs.readFileSync(f,"utf8")).media_root||null}catch{return null}};
const home=v=>v.replace(/^~(?=\/|$)/,os.homedir());
const pr=get(path.join(p,"project.json")), cr=get(c);
console.log(env?home(env):pr?home(pr):cr?path.join(home(cr),s):"");' \
  "$P" "${CREATOR_PUBLISH_CONFIG:-$HOME/.creator-publish/config.json}" "$SLUG" "${CREATOR_PUBLISH_MEDIA:-}")
if [ -n "$MEDIA_ROOT" ]; then MEDIA="$MEDIA_ROOT/packages/<package-id>"; mkdir -p "$MEDIA"
else MEDIA=""; echo "media folder not set: ask the person (first-run step 3); save nothing yet"; fi
```

Save provider outputs promptly into `$MEDIA` (a design skill that makes a platform set uses its own subfolder of
`MEDIA_ROOT`, named in that skill). Record in `status.md` a `Files live in:` line with the absolute `$MEDIA`
path, plus each file's path, its sha256, the provider, the provider's job/result ID, and the files it came from.
Use a linked sidecar or `status.md` for package, variant and settings fields. Registration is just that record:
files are referenced in place, so save them durably first.

The coordinator updates the shared status after important choices and outputs and before leaving a stage or
pausing. Delegated work gets bounded inputs, settings and an exact output request, and returns saved files;
workers do not overwrite shared status. End with output locations, selected and review state, defects and the
next action. Record only actual provider costs and label unknown amounts. Do not commit media, project files,
secrets or machine paths to any repository.
