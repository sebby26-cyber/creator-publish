---
name: spotify-show-assets
description: "Make a Spotify podcast's artwork and setup copy (Spotify for Creators or any RSS host): the square show cover (1:1, 3000x3000 working target, RGB JPG/PNG), optional square episode art, the 16:9 video-podcast thumbnail (suggested 1920x1080), small-size previews at 300/160/64 px on dark and light, and a show-copy doc (route, name, description, category, explicit, show type, trailer, artwork table with sha256, video notes, per-episode checklist with Spotify's chapter format, latest-episode fields, do/don't list, owner setup steps). Applies Spotify's delivery spec, help pages and content rules, with sources. Use for Spotify show art, Spotify podcast cover, video podcast thumbnail, Spotify for Creators setup, a Spotify trailer, or 'the Spotify version of my YouTube channel assets'. Reuses the feed's existing cover (for example from design:apple-podcasts-assets) instead of making a near-duplicate. Writes specs rendered by compose:visual-composer (or canva:canva). Never uploads or publishes: Spotify for Creators, the RSS host and posting are owner steps. Not for audio or video production, Canvas (music only), YouTube channel art (design:youtube-channel-assets) or YouTube thumbnails (design:thumbnail-design)."
---

> **creator-publish note (do this first):** if the request names a project or the person has a Creator Publish
> projects folder, your **first action** is to invoke the `publish-core:publish` skill. It supplies the project's
> brand, saved defaults, locked rules and the package `status.md` where you record choices, files and the next
> action. Skip it only for a one-off asset with no project.

# spotify-show-assets

A **design skill** for what a show needs on Spotify: the cover once, plus per-episode art, video thumbnails and a
checklist. It writes the brief, the composition specs and the show-copy doc; `compose:visual-composer` renders the
pixels; the owner uploads in Spotify for Creators or at the RSS host. The method is **brief, spec, compose,
review**, like `design:youtube-channel-assets`.

## What a finished set contains

Specs and `SHOW_COPY.md` are saved at the project level next to the other platform sets (default
`<project>/spotify-assets/`). The rendered images go to the media folder `$MEDIA` (set in step 2), with a `Files live in:` pointer in `status.md`; no image is
saved in the project folder:

| File | What | Spec to start from |
|---|---|---|
| show cover | the feed's square cover. **Reused** if the project already has one (an Apple Podcasts set, the RSS host, brand files); new only if none exists | `examples/show-cover.json` |
| `previews/cover-small-sizes.png` | cover at 300/160/64 px on dark and light (skip if an equivalent preview of the same file exists) | `examples/cover-small-sizes.json` |
| `epNN-video-thumbnail-1920x1080.png` | video podcasts only: 16:9 thumbnail | `examples/video-thumbnail.json`, or the YouTube thumbnail spec scaled 1.5x |
| episode art (optional) | square, only if the show uses per-episode art; reuse an existing square episode file | `examples/show-cover.json` layout |
| `SHOW_COPY.md` | route, identity, description, artwork table, video notes, trailer, per-episode checklist, latest-episode fields, do/don't, owner setup | `templates/SHOW_COPY.template.md` |

Every rendered image keeps its `.spec.json` in `$SET`. Previews are for review only and never uploaded.

## Specs (checked 2026-10-23)
Full table with sources, quotes and what is unverified: `references/spotify-specs.md`. In short:

| Asset | Official (Spotify) | Working value / unverified |
|---|---|---|
| Show cover | 1:1; highest resolution available; TIFF, PNG or JPEG (delivery spec); imported feeds: .jpg/.png/.gif, no more than 3000x3000 (help); 1400-3000 px recommended (Spotify for Creators guide) | 3000x3000 RGB JPG/PNG, no alpha; file-size cap not stated |
| Episode art | defaults to the show cover; custom art on Spotify for Creators web only; not shown on all platforms; 1:1 | same size as the cover |
| Video | MP4 (MOV ok), H.264/H.265, 16:9, 1080p+, 24-60 fps progressive, AAC-LC/PCM/FLAC 128 kbps+; under 10 GB and 4 h recommended | - |
| Video thumbnail | horizontal 16:9, suggested 1920x1080; or a frame picked from the video | PNG or JPG |
| Clips | 15-90 s, at least 768x1024, MP4/MOV, up to 1 GB, vertical recommended | - |
| Canvas | music only (Spotify for Artists); not for podcasts | - |
| Titles / descriptions | no hard limits published; ~20 characters show in most clients; first 250 characters of the description matter | - |
| Chapters | "(00:00) Title" lines in the description; first at 00:00; at least 3; 30 s apart | - |

Primary sources: <https://support.spotify.com/us/creators/article/podcast-specification-doc/>,
<https://support.spotify.com/us/creators/article/video-specs/>,
<https://support.spotify.com/us/creators/article/thumbnails/>,
<https://creators.spotify.com/resources/dos-donts-showart>. Re-check before a real upload.

## 1. Brief: route, brand, reuse
1. **Route.** Read the project records for a Spotify plan (Spotify for Creators, Anchor, an RSS host, video
   podcasts). Record: hosting (Spotify for Creators or which RSS host, or `TBD (owner)`), audio or video, and the
   other directories on the same feed. With no plan on record, say what you assumed.
2. **Brand inputs**: the project's `project.json` (`brand.name`, `brand.palette`, `brand.fonts`, `brand.logos`,
   `brand_assets[]`, the optional `spotify` block below), the YouTube channel set if there is one, and anything
   the owner supplies. Never invent a show name, host, schedule, category or claim.
3. **Existing art first.** One RSS feed carries one cover, so look before making anything:
   ```sh
   find "$PROJECT" -type f \( -iname '*cover*' -o -iname '*show*art*' -o -iname '*podcast*' -o -iname '*episode*art*' -o -iname '*logo*' -o -iname '*avatar*' -o -iname '*thumbnail*' \) -not -path '*/node_modules/*'
   ffprobe -v error -show_entries stream=width,height,pix_fmt -of csv=p=0 "$FILE"   # size and colour (rgba = has alpha)
   wc -c < "$FILE"
   ```
   A square cover that meets the spec (1:1, at least 1400 px, ideally 3000; RGB; JPG or PNG) is **reused by
   reference**, never copied or redrawn; if there are options (A/B), the Spotify set points at the same options.
   Art that is close (right image, wrong shape) goes into a spec as an `image` layer. A small image is never
   stretched past its size: redraw a flat mark as vector shapes, or use a larger source.
4. **Brief** (in the package `status.md`): show name as displayed, route, palette and fonts, which existing files
   are reused, what will be new.

## 2. Specs
Folders first. `SET` holds the specs and the copy doc; `$MEDIA` holds every rendered image. `MEDIA_ROOT` is the
media folder the person chose: a path named in the request, else `$CREATOR_PUBLISH_MEDIA`, else `media_root` in
the project's `project.json`, else `media_root` in `~/.creator-publish/config.json` plus `/<slug>` (the `publish`
skill's "Save and resume" has a resolver). If none is set, ask where media should live and stop until it is set;
there is no default location.
```sh
SET="<project>/spotify-assets"                 # absolute path of the project folder, plus this set's folder
: "${MEDIA_ROOT:?media folder not set: ask where media should live}"
MEDIA="$MEDIA_ROOT/spotify-assets"
```
Copy only the example specs you need; they are brand-neutral placeholders:
```sh
mkdir -p "$SET/previews" "$MEDIA/previews"
cp "${CLAUDE_SKILL_DIR}"/examples/show-cover.json "$SET/show-cover-3000.spec.json"            # only if no cover exists
cp "${CLAUDE_SKILL_DIR}"/examples/cover-small-sizes.json "$SET/previews/cover-small-sizes.spec.json"
cp "${CLAUDE_SKILL_DIR}"/examples/video-thumbnail.json "$SET/ep01-video-thumbnail-1920x1080.spec.json"   # video only
```
- **Cover**: one mark and the show name, large; at most one short descriptor that is part of the name. A block of
  colour behind the name if it sits on a photo. No tagline, episode numbers, schedule or URL. Same palette, type
  and mark as the YouTube channel, but **not** a crop of the banner (`references/best-practices.md` section 4).
- **Small-size preview**: point its `src` layers at the cover in use (a reused file can be referenced by path).
- **Video thumbnail**: if the project has a YouTube thumbnail spec and its source still is at least 1920 px wide,
  scale that spec's `x`, `y`, `width`, `height`, `size` and `letterSpacing` by 1.5 and set the canvas to
  1920x1080: the same approved design at Spotify's suggested size. Otherwise start from the example.
- Fonts: the project's fonts if they are available to the renderer (`CREATOR_PUBLISH_FONT_DIRS`), else the
  bundled Anton / Inter / DejaVu Sans. A missing font is a choice for the owner, never a silent swap.
- New imagery comes from the image skills; a prompt sent to Higgsfield follows the optional `higgsfield`
  prompting skill if it is installed (otherwise write the prompt directly, taking parameters and aspect ratios from the provider's tool schema, never invented).

## 3. Compose, check and preview
Load `compose:visual-composer` for the renderer command (`CLI` below is its
`node "<compose plugin>/renderer/src/cli.js"`), check it is installed, then for each spec:
```sh
cd "$SET"
CLI validate show-cover-3000.spec.json --out "$MEDIA/show-cover-3000.jpg"
CLI render show-cover-3000.spec.json --out "$MEDIA/show-cover-3000.jpg" --preview
CLI render previews/cover-small-sizes.spec.json --out "$MEDIA/previews/cover-small-sizes.png"
```
Limits check (run from `$MEDIA`):
```sh
cd "$MEDIA"
C=show-cover-3000.jpg
ffprobe -v error -show_entries stream=width,height,pix_fmt -of csv=p=0 "$C"   # want 3000,3000; no alpha (not rgba); JPG reports yuvj444p
test -f "$C" && test "$(wc -c < "$C")" -lt 1048576 && echo "cover under 1 MB" || echo "cover missing or over 1 MB: check the host's limit or lower JPG quality"
T=ep01-video-thumbnail-1920x1080.png
ffprobe -v error -show_entries stream=width,height -of csv=p=0 "$T"            # want 1920,1080
```
**Review (required):** look at the small-size preview. At 64 px the mark and the name's shape are recognisable;
at 160 px the name is readable; the edge does not vanish on the dark page. Look at the thumbnail at full size and
small. Fix the spec and re-render; say what changed. Observed with renderer 0.1.0: a `clip` on a rotated vector
layer lands in canvas axes (after the rotation), not in the layer box as documented; draw partial rotated
ellipses as `path` arcs (`A rx ry angle ...`) instead.

## 4. Video podcasts
Measure the source before promising video:
```sh
ffprobe -v error -show_entries format=duration:stream=codec_name,width,height,r_frame_rate,sample_rate,channels -of compact "$V"
```
Compare with `references/spotify-specs.md` (16:9, 1080p+, H.264/H.265, AAC, 24-60 fps). Note the route: a
Spotify-hosted show uploads on the web; a show on another host uses a partner host's video distribution or
replaces the audio episode with video in Spotify for Creators (no Spotify monetization on replaced episodes).
This skill never re-encodes video; if the file does not meet the specs, say what is off and hand it back to the
production.

## 5. Show-copy doc
Fill `templates/SHOW_COPY.template.md` as `$SET/SHOW_COPY.md`: route, identity, a description draft (first 250
characters carry it; disclosures in plain words), the artwork table with each file's measured size, bytes and
sha256 (reused files referenced in place), video notes, trailer, the per-episode checklist with Spotify's chapter
format, the latest finished episode's fields, the do/don't list from `references/best-practices.md`, and the
setup the owner still needs. Owner facts only; unknowns are `TBD (owner)`.

## 6. Hand off: the owner uploads
- Record outputs, hashes (`shasum -a 256` on macOS, `sha256sum` on Linux), review state and defects in the
  package `status.md`.
- **This skill never uploads, submits or publishes.** Creating the Spotify for Creators account, claiming the
  show, setting the cover, uploading episodes or video, setting the trailer and publishing are the owner's
  explicit-OK steps. When asked, route posting to `post:post`, which needs the owner's OK for each exact action;
  otherwise the checklist is the hand-off.
- **Alternative:** `canva:canva` for editable cloud designs; the same specs and checks apply to its exports.

## Saved defaults (optional `spotify` block in project.json)
Missing means no default. `spotify.hosting` (`"spotify-for-creators"` or the RSS host's name), `spotify.video`
(`true`/`false`), `spotify.trailer` (the episode or file used as the trailer). The feed-level fields are shared
with every directory, so read them from the `apple_podcasts` block when it is set (`show_title`, `category`,
`category_secondary`, `explicit`, `type`) rather than keeping a second copy. Change them only through
`publish-core:publish` ("make X the default").

## Honest scope
- Makes the files, previews and the doc; does not upload, encode audio or video, or change account settings.
- Spotify publishes no display sizes, page colours, cover file-size cap or title/description limits; those are
  marked unverified in `references/spotify-specs.md`.
- No impersonation of another show's branding or a real person's likeness; no invented names, hosts, schedules,
  listener counts or links.

## Definition of done
Route and brand read; the feed's existing cover reused by reference if it meets the spec (or a new cover rendered
from a saved spec, 1:1, 3000x3000, RGB, measured); small-size preview checked on dark and light; video thumbnail
at 1920x1080 for video shows; `SHOW_COPY.md` filled from the owner's facts with sources, sha256 and the
per-episode checklist; outputs and hashes in `status.md`; uploading and publishing left to the owner.

## Provenance
Written for creator-publish (not adapted from social-media-skills). GPL-3.0-or-later like the repo.
