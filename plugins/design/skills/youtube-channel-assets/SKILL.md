---
name: youtube-channel-assets
description: "Make a YouTube channel's branding and upload assets: banner (2560x1440, text-safe area), profile picture (800x800 for the 98 px circle), transparent watermark, an end-screen layout guide built from the video's actual outro (start, 5-20 s window, where the video, playlist and subscribe elements go), banner/avatar preview crops, and a channel-copy doc with a per-upload checklist. Use for a YouTube banner, channel art, channel icon or avatar, watermark, end screen or end card, channel setup or a YouTube upload checklist. Reads the project brand, reuses existing channel assets first, writes specs rendered by compose:visual-composer (or canva:canva). Never uploads: Studio uploads and posting are owner-approved steps via post:post. Not for thumbnails (design:thumbnail-design) or video editing."
---

> **creator-publish note (do this first):** if the request names a project or the person has a Creator Publish
> projects folder, your **first action** is to invoke the `publish-core:publish` skill. It supplies the project's
> brand, saved defaults, locked rules and the package `status.md` where you record choices, files and the next
> action. Skip it only for a one-off asset with no project.

# youtube-channel-assets

A **design skill** for the assets a YouTube channel needs once, plus the per-upload layout and checklist. It
writes the brief, the composition specs and the channel-copy doc; `compose:visual-composer` renders the pixels;
the owner uploads in YouTube Studio. Like `design:thumbnail-design`, the method is **brief, spec, compose,
review**.

## What a finished set contains

Specs and the copy doc are saved in the package (default `<project>/packages/youtube-channel-assets/assets/`; episode
end screens can live in the episode's package). The rendered images go to the media folder `$MEDIA` (set in step 2), with a `Files live in:` pointer in `status.md`; no image is
saved in the project folder:

| File | What | Spec to start from |
|---|---|---|
| `banner-2560x1440.png` (or `.jpg`) | channel banner | `examples/banner.json` |
| `profile-picture-800.png` | channel icon | `examples/profile-picture.json` |
| `watermark-300.png` | video watermark, transparent | `examples/watermark.json` |
| `end-screen-template-1920x1080.png` | end-screen layout guide (and, optionally, a clean end card) | `examples/end-screen-template.json` |
| `previews/banner-safe-areas.png` | banner with the safe area and desktop band drawn on | `examples/banner-safe-areas.json` |
| `previews/banner-tv-full.png`, `banner-desktop-crop.png`, `banner-mobile-crop.png` | what each device shows | ffmpeg crops (below) |
| `previews/avatar-98-dark-vs-light.png` | avatar at 98 px on both page themes | `examples/avatar-preview.json` |
| `previews/end-screen-overlay.png` | slots over a frame of the real outro | `examples/end-screen-overlay.json` |
| `CHANNEL_COPY.md` | identity, branding table, About, playlists, upload fields, checklist | `templates/CHANNEL_COPY.template.md` |

Every `.json` spec is kept in the package: it is its PNG's reproducible source. Preview images are for review only and
are never uploaded.

## Specs (checked 2026-10-23)
Full table with sources, quotes and what is unverified: `references/youtube-specs.md`. In short:

| Asset | Official (YouTube Help) | Working value / unverified |
|---|---|---|
| Banner | min 2048x1152, recommended 2560x1440, 6 MB or smaller, text-safe area 1235x338 at 2048 wide | safe area 1546x423 at 2560 (derived); desktop band 2560x423 and TV = whole image (unverified) |
| Profile picture | renders at 98x98; JPG/GIF/BMP/PNG, no animation; up to 15 MB | upload 800x800 (unverified common value) |
| Watermark | square, min 150x150, under 1 MB; display: end of video (last 15 s), custom start, entire video | 300x300 transparent PNG (unverified) |
| End screen | video at least 25 s; last 5-20 s; up to 4 elements on 16:9; video or playlist, subscribe, channel, link (YPP); not on made-for-kids | element pixel sizes and a fixed grid are not published |
| Cards | up to 5; video, playlist, channel, link (YPP); not on made-for-kids | keep them out of the end-screen window |

Sources: <https://support.google.com/youtube/answer/10456525> (branding),
<https://support.google.com/youtube/answer/6388789> (end screens),
<https://support.google.com/youtube/answer/6140493> (cards). Re-check before a real upload.

## 1. Brief: read the brand, reuse what exists
1. **Brand inputs**: the project's `project.json` (`brand.name`, `brand.palette`, `brand.fonts`, `brand.logos`,
   `brand_assets[]`, and the optional `youtube` block below), plus anything the owner supplies (logo files, the
   tagline, the handle, the upload schedule). Never invent a logo, handle, schedule or claim; ask once for what
   is missing and changes the result.
2. **Existing channel assets first.** Look in the project and its packages before making anything:
   ```sh
   find "$PROJECT" -type f \( -iname '*banner*' -o -iname '*avatar*' -o -iname '*profile*' -o -iname '*logo*' -o -iname '*watermark*' -o -iname '*end*screen*' -o -iname '*endcard*' -o -iname '*channel*copy*' \) -not -path '*/node_modules/*'
   ffprobe -v error -show_entries stream=width,height -of csv=p=0 "$FILE"   # pixel size of each candidate
   wc -c < "$FILE"                                                           # bytes, for the size limits
   ```
   A supplied asset that already meets the spec is reused as-is (record it). One that is close (right art,
   wrong size) goes into a spec as an `image` layer; it is not redrawn. Only missing pieces are made.
3. **Brief** (in the package `status.md`): channel name as displayed, tagline, handle, schedule line (only if
   the owner confirmed it), palette and fonts, which supplied files are used where, and what will be new.

## 2. Specs
Folders first. `PKG` holds the specs and the copy doc; `$MEDIA` holds every rendered image. `MEDIA_ROOT` is the
media folder the person chose: a path named in the request, else `$CREATOR_PUBLISH_MEDIA`, else `media_root` in
the project's `project.json`, else `media_root` in `~/.creator-publish/config.json` plus `/<slug>` (the `publish`
skill's "Save and resume" has a resolver). If none is set, ask where media should live and stop until it is set;
there is no default location.
```sh
PKG="<project>/packages/youtube-channel-assets"                 # absolute path of the project folder, plus this set's folder
: "${MEDIA_ROOT:?media folder not set: ask where media should live}"
MEDIA="$MEDIA_ROOT/youtube-channel-assets"
```
Copy the example specs into the package and edit them; they are brand-neutral placeholders:
```sh
mkdir -p "$PKG/assets" "$MEDIA/previews"
cp "${CLAUDE_SKILL_DIR}"/examples/*.json "$PKG/assets/"
```
- **Banner**: everything that must be read (name, tagline, handle, schedule) inside the safe-area box
  x 507-2053, y 508-931; decoration outside it is desktop/TV only. Supplied art and logos are `image` layers.
- **Profile picture**: one bold mark or the supplied logo (`fit: contain`) inside the inner circle; an edge
  ring or contrasting disc so it reads on white and on near-black. No small text.
- **Watermark**: transparent canvas (no `background`), one bold shape or the logo mark, no fine text. It shows
  small in the player corner.
- **End screen**: see step 4.
- Use the project fonts if they are installed for the renderer; otherwise the bundled Anton / Inter. A missing
  font is a choice for the owner, never a silent swap.
- New imagery (an illustration for the banner, say) comes from the image skills (`image-gen:image-prompt`
  routes); a prompt sent to Higgsfield follows the optional `higgsfield` prompting skill if it is installed (otherwise write the prompt directly, taking parameters and aspect ratios from the provider's tool schema, never invented).
  The generated file then goes into the spec as an `image` layer.

## 3. Compose, size-check and preview
Load `compose:visual-composer` for the exact renderer command (`CLI` below is its
`node "<compose plugin>/renderer/src/cli.js"`), check its renderer is installed, then for each spec:
```sh
cd "$PKG/assets"
CLI validate banner.json --out "$MEDIA/banner-2560x1440.png"
CLI render banner.json --out "$MEDIA/banner-2560x1440.png" --preview
```
Same for `profile-picture.json`, `watermark.json` and `end-screen-template.json`, then the review specs, which
read the rendered files (point their `src` at `$MEDIA`): `banner-safe-areas.json`, `avatar-preview.json`,
`end-screen-overlay.json` (output into `$MEDIA/previews/`).

Device crops of the banner and the limits check (run from `$MEDIA`):
```sh
cd "$MEDIA"
B=banner-2560x1440.png
ffmpeg -v error -y -i "$B" -vf "scale=1280:720" previews/banner-tv-full.png
ffmpeg -v error -y -i "$B" -vf "crop=2560:423:0:508" previews/banner-desktop-crop.png
ffmpeg -v error -y -i "$B" -vf "crop=1546:423:507:508" previews/banner-mobile-crop.png
ffprobe -v error -show_entries stream=width,height -of csv=p=0 "$B"
test "$(wc -c < "$B")" -lt 6291456 && echo "banner under 6 MB" || echo "banner TOO BIG: export .jpg"
test "$(wc -c < watermark-300.png)" -lt 1048576 && echo "watermark under 1 MB" || echo "watermark TOO BIG"
```
A banner over 6 MB: re-render the same spec with `--out "$MEDIA/banner-2560x1440.jpg"` (quality 90 by default).

**Review (required, separate from the renderer's checks):** look at each preview. Banner: all text inside the
red box, nothing important cut on the mobile crop, readable on the TV view. Avatar: legible and edge visible at
98 px on both backgrounds. Watermark: reads at a small size, transparent corners. Fix the spec and re-render;
say what changed.

## 4. End-screen template from the actual outro
Rules for choosing the start, window and slot positions: `references/end-screen-from-outro.md`. Commands (run from
`$MEDIA`; ffmpeg 6.1 or later, tested 6.1.1 and 9.0.2; `V` is the approved video file, not its sidecar):
```sh
cd "$MEDIA"   # V is an absolute path
D=$(ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$V")
ffprobe -v error -select_streams v:0 -show_entries stream=width,height,display_aspect_ratio -of csv=p=0 "$V"
T0=$(awk -v d="$D" 'BEGIN{s=d-20; if(s<0)s=0; printf "%.3f", s}')     # start of the last 20 s
# contact sheet: one cell per second from T0, left to right, top to bottom
ffmpeg -v error -y -ss "$T0" -i "$V" -vf "fps=1,scale=384:-2,tile=5x4" -frames:v 1 outro-contact.png
# black tail, silent tail and cuts, as absolute times in seconds
ffmpeg -v info -copyts -ss "$T0" -i "$V" -vf "blackdetect=d=0.5:pix_th=0.10" -an -f null - 2>&1 | grep -o "black_start.*"
ffmpeg -v info -copyts -ss "$T0" -i "$V" -af "silencedetect=n=-50dB:d=0.5" -vn -f null - 2>&1 | grep -o "silence_[a-z]*: [0-9.]*"
ffmpeg -v info -copyts -ss "$T0" -i "$V" -vf "select='gt(scene,0.3)',showinfo" -an -f null - 2>&1 | grep -o "pts_time:[0-9.]*"
# exact frame at the chosen start S (and near the end if the picture changes) for the overlay check
ffmpeg -v error -y -ss "$S" -i "$V" -frames:v 1 -map_metadata -1 -fflags +bitexact -flags:v +bitexact outro-frame.png
```
Then: record the start and window (5-20 s, video at least 25 s), move the slots in `end-screen-template.json`
off the key picture and text, copy the same slot boxes into `end-screen-overlay.json`, set its timing label,
render both and inspect the overlay. Videos under 25 s or made for kids get no end screen: say so.

## 5. Channel-copy doc
Fill `templates/CHANNEL_COPY.template.md` (copy it to `$PKG/assets/CHANNEL_COPY.md`): identity fields, the
branding upload table with each file's measured size, bytes and sha256, the About text, playlists, the
per-episode upload fields, and the per-upload checklist with the end-screen step (start, window, which element
goes in which slot) and the watermark display option. Use the owner's facts only; mark unknowns `TBD (owner)`.

## 6. Hand off: the owner uploads
- Record outputs, hashes (`shasum -a 256` on macOS, `sha256sum` on Linux), review state and defects in the
  package `status.md`.
- **This skill never uploads.** Uploading the banner, picture and watermark in YouTube Studio, setting an end
  screen, uploading or scheduling a video, and posting are the owner's explicit-OK steps. When the owner asks
  for them, route to `post:post`, which needs the owner's OK for each exact action; otherwise the
  channel-copy checklist is the hand-off for the owner to do it in Studio.
- **Alternative:** `canva:canva` when the owner wants editable cloud designs instead of deterministic files
  (Canva has YouTube banner and icon formats; the same specs and checks apply to its exports).

## Saved defaults (optional `youtube` block in project.json)
Missing means no default. `youtube.handle` (e.g. `"@example"`), `youtube.watermark_display` (`"end"`, `"custom"`
or `"entire"`), `youtube.end_screen_seconds` (5-20), `youtube.end_screen_elements` (e.g.
`["video:best_for_viewer", "video:most_recent", "subscribe"]`). Change them only through `publish-core:publish`
("make X the default").

## Honest scope
- Makes the files, previews and the doc; does not upload, edit video, or change channel settings.
- YouTube does not publish end-screen element sizes; the slots are planning boxes, checked against the real
  outro. Figures marked unverified in `references/youtube-specs.md` are said to be unverified.
- No impersonation of another channel's branding; no invented handles, schedules, subscriber counts or links.

## Definition of done
Brand inputs and existing assets read and reused where they fit; banner, profile picture and watermark rendered
from saved specs, within the limits (sizes and bytes measured); banner text inside the safe area on the
safe-area, TV, desktop and mobile previews; avatar checked at 98 px on dark and light; end-screen start and
5-20 s window chosen from the inspected outro, with slots that cover no key picture or text on the overlay
preview; `CHANNEL_COPY.md` filled from the owner's facts with the per-upload checklist; outputs and hashes in
`status.md`; uploading and posting left to the owner (via `post:post` when requested).

## Provenance
Written for creator-publish (not adapted from social-media-skills). GPL-3.0-or-later like the repo.
