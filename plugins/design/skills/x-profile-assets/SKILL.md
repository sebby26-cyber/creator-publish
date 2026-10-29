---
name: x-profile-assets
description: "Make an X (Twitter) account's profile and post assets: header 1500x500 (60 px crop bands, the profile-photo overlap and a text-safe box), profile photo 400x400 checked as a circle on the white, dim and black themes, single-image post images (16:9, 1:1) that survive the multi-image crops, a pinned-post image, link-card images (2:1), video-post export specs, bio and display-name limits, alt text, AI labelling, and an X copy doc with a per-post checklist and a do/don't list. Use for an X or Twitter header, banner, profile picture or avatar, post image, pinned post, link card, X bio or an X launch post. Reads the project brand, reuses YouTube and brand art first, writes specs rendered by compose:visual-composer (or canva:canva). Never posts or edits the profile: posting goes through post:post with the owner's OK. Not for thumbnails (design:thumbnail-design), video editing or X growth strategy."
---

> **creator-publish note (do this first):** if the request names a project or the person has a Creator Publish
> projects folder, your **first action** is to invoke the `publish-core:publish` skill. It supplies the project's
> brand, saved defaults, locked rules and the package `status.md` where you record choices, files and the next
> action. Skip it only for a one-off asset with no project.

# x-profile-assets

A **design skill** for the images and copy an X account needs once (header, profile photo, bio, pinned post) and
per post (post images, alt text, the per-post checklist). It writes the brief, the composition specs and the X
copy doc; `compose:visual-composer` renders the pixels; the owner (or `post:post`, with the owner's OK) puts them
on X. The method is **brief, spec, compose, review**, like `design:youtube-channel-assets`.

## What a finished set contains

Specs and `X_COPY.md` are saved next to the project's other platform sets (default `<project>/x-assets/`, or
`<project>/packages/x-profile-assets/assets/`). The rendered images go to the media folder `$MEDIA` (set in step 2), with a `Files live in:` pointer in `status.md`; no image is
saved in the project folder:

| File | What | Spec to start from |
|---|---|---|
| `header-1500x500.png` | profile header | `examples/header.json` |
| `profile-photo-400.png` | profile photo (or the reused brand avatar, recorded in place) | `examples/profile-photo.json` |
| `pinned-post-1600x900.png` | pinned-post image | `examples/pinned-post.json` |
| `post-image-1600x900.png`, `post-image-1200x1200.png` | episode or quote post images | `examples/post-image-16x9.json`, `examples/post-image-1x1.json` |
| `link-card-1200x600.png` | only for a page the owner controls | `examples/link-card.json` |
| `previews/header-safe-areas.png` | header with crop bands, avatar box, corners and text-safe box | `examples/header-safe-areas.json` |
| `previews/profile-mockup.png` | header + photo as the desktop and phone profile show them | `examples/profile-mockup.json` |
| `previews/avatar-themes.png` | photo at about 134 px and 40 px on the three themes | `examples/avatar-preview.json` |
| `previews/feed-crops.png` | a post image alone and in 2- and 4-image crops | `examples/feed-crops.json` |
| `X_COPY.md` | identity, bio, upload table, pinned and launch drafts, per-post checklist, do/don't | `templates/X_COPY.template.md` |

Every `.json` spec is kept in `$OUT` as its PNG's reproducible source. Previews are for review only and are never
uploaded.

## Specs (checked 2026-10-23)
Full table with sources, quotes and what is unverified: `references/x-specs.md`. X's Help Center blocks
automated reads, so it was read through archived copies of the official pages; re-check live before a real
upload. In short:

| Asset | Official (X Help / docs) | Working value / unverified |
|---|---|---|
| Header | 1500x500 recommended; JPG/PNG/GIF, no animation; 60 px top and bottom may be cropped | 5 MB limit; avatar box x 0-400, y 300-500; corners 120 px; text-safe x 420-1440, y 80-420 |
| Profile photo | 400x400 recommended; max 2 MB; JPG/PNG/GIF, no animation | shown as a circle (square for Verified Organizations); ~40 px in the timeline |
| Display name / bio / handle | 50 / 160 / up to 15 (letters, numbers, underscore) | location 30; handle minimum 4 or 5 |
| Post images | up to 4 photos (or 1 GIF or 1 video); photos 5 MB; GIF 5 MB mobile, 15 MB web; 2:1 to 3:4 shows in full | 1600x900, 1200x1200, 1080x1350; multi-image crops ~7:8 (2-up), ~7:4 (4-up) |
| Video | non-Premium up to 140 s and 512 MB; web up to 1920x1200, 40 fps, aspect 1:2.39-2.39:1 | MP4 H.264 + AAC as the container for organic posts |
| Link card | summary_large_image 2:1, min 300x157, under 5 MB; summary 1:1, min 144x144 | headline no longer shown (press reports) |
| Alt text | 1,000 characters per image | |
| Pinned post | "..." > Pin to your profile | one at a time (implied) |

## Best practices
The full rules, each with its source, and the do/don't checklist template are in `references/best-practices.md`:
legibility at small sizes, the header safe zones, consistency with the YouTube branding without copying the
YouTube banner, alt text, no misleading imagery, AI-content labelling, cadence and pinned-post conventions. Apply
them in every step below and copy the checklist into `X_COPY.md`.

## 1. Brief: read the brand and the records, reuse what exists
1. **Brand inputs**: `project.json` (`brand.name`, `brand.palette`, `brand.fonts`, `brand.logos`,
   `brand_assets[]`, the optional `x` block below), plus the owner's records about X: handle, live profile
   (what avatar, header and bio are set), X strategy or posting plan, posting receipts. Never invent a handle,
   schedule or claim; flag records that disagree (two handles, two bios) for the owner.
2. **Existing assets first.** Look in the project, its packages and the brand folders, including the YouTube
   set if one exists:
   ```sh
   find "$PROJECT" -type f \( -iname '*x-*' -o -iname '*twitter*' -o -iname '*header*' -o -iname '*banner*' -o -iname '*avatar*' -o -iname '*profile*' -o -iname '*logo*' -o -iname '*pinned*' -o -iname '*x_copy*' \) -not -path '*/node_modules/*'
   ffprobe -v error -show_entries stream=width,height -of csv=p=0 "$FILE"   # pixel size
   wc -c < "$FILE"                                                           # bytes (photo 2 MB, images 5 MB)
   ```
   A supplied asset that meets the spec is reused as-is (record it, with its hash). One with the right art but
   the wrong size goes into a spec as an `image` layer. The YouTube banner is never downscaled into the header:
   re-compose its **source** art at 3:1. Only missing pieces are made.
3. **Brief** (in the package `status.md` or the copy doc): display name, handle, bio, tagline, palette and fonts,
   which supplied files are used where, what will be new, and the open owner decisions.

## 2. Specs
Folders first. `OUT` holds the specs and the copy doc; `$MEDIA` holds every rendered image. `MEDIA_ROOT` is the
media folder the person chose: a path named in the request, else `$CREATOR_PUBLISH_MEDIA`, else `media_root` in
the project's `project.json`, else `media_root` in `~/.creator-publish/config.json` plus `/<slug>` (the `publish`
skill's "Save and resume" has a resolver). If none is set, ask where media should live and stop until it is set;
there is no default location.
```sh
OUT="<project>/x-assets"                 # absolute path of the project folder, plus this set's folder
: "${MEDIA_ROOT:?media folder not set: ask where media should live}"
MEDIA="$MEDIA_ROOT/x-assets"
```
Copy the example specs into `$OUT` and edit them; they are brand-neutral placeholders:
```sh
mkdir -p "$OUT" "$MEDIA/previews"
cp "${CLAUDE_SKILL_DIR}"/examples/*.json "$OUT/"
```
- **Header**: all words inside x 420-1440, y 80-420; the subject on the right or centre; nothing that matters in
  the avatar box (x 0-400, y 300-500), the top and bottom 60 px, or the top corners.
- **Profile photo**: the same mark as the YouTube avatar where it reads at 40 px; otherwise a variant made for
  the small circle (a ring or a contrasting disc so the edge shows on white, navy and black). No small text.
- **Post and pinned images**: 16:9 or 1:1 (inside 2:1-3:4); few, large words; subject and words in the centre
  half so a multi-image crop keeps them. Episode art goes in as an `image` layer.
- **Link card**: only for the owner's own page; YouTube links use YouTube's thumbnail.
- **Video posts** are exported by the video tools, not here: give them the working export from
  `references/x-specs.md` (MP4 H.264 + AAC, under 140 s and 512 MB for non-Premium accounts).
- Use the project fonts if they are installed for the renderer (put the font files in a folder and pass it in
  `CREATOR_PUBLISH_FONT_DIRS`); otherwise the bundled Anton / Inter / DejaVu Sans. A missing font is a choice for
  the owner, never a silent swap.
- New imagery comes from the image skills (`image-gen:image-prompt` routes); any prompt sent to Higgsfield is
  written with the optional `higgsfield` prompting skill if it is installed (otherwise write the prompt directly, taking parameters and aspect ratios from the provider's tool schema, never invented). This skill itself makes no paid calls.

## 3. Compose, size-check and review
Load `compose:visual-composer` for the exact renderer command (`CLI` below is its
`node "<compose plugin>/renderer/src/cli.js"`) and check its renderer is installed. Then, from `$OUT`:
```sh
cd "$OUT"
CLI validate header.json --out "$MEDIA/header-1500x500.png"
CLI render header.json --out "$MEDIA/header-1500x500.png" --preview
```
Same for `profile-photo.json`, `pinned-post.json`, `post-image-16x9.json`, `post-image-1x1.json` (and
`link-card.json`), then the review specs, which read the rendered files (point their `src` at `$MEDIA`):
`header-safe-areas.json`, `profile-mockup.json`, `avatar-preview.json`, `feed-crops.json` (output into
`$MEDIA/previews/`). When a reused avatar is
not called `profile-photo-400.png`, point the review specs' `src` at it.

Limits check (run from `$MEDIA`):
```sh
cd "$MEDIA"
ffprobe -v error -show_entries stream=width,height -of csv=p=0 header-1500x500.png      # 1500,500
test "$(wc -c < header-1500x500.png)" -lt 5242880 && echo "header under 5 MB" || echo "header TOO BIG: export .jpg"
test "$(wc -c < profile-photo-400.png)" -lt 2097152 && echo "photo under 2 MB" || echo "photo TOO BIG"
for f in pinned-post-1600x900.png post-image-1600x900.png post-image-1200x1200.png link-card-1200x600.png; do
  [ -f "$f" ] || continue
  test "$(wc -c < "$f")" -lt 5242880 && echo "$f under 5 MB" || echo "$f TOO BIG: export .jpg"
done
```
A file over its limit: re-render the same spec with `--out "$MEDIA/<name>.jpg"` (quality 90 by default).

**Renderer caveat.** compose renderer 0.2.0 (as 0.1.0 before it) has been seen to drop glyphs silently with some fonts at some sizes
(seen with Lora at 100, 116 and 120 px) while reporting `ok: true`, and with `maxLines: 1` to clip an over-wide
line instead of raising `TEXT_OVERFLOW`. The workaround: give brand-font text layers `"fit": "none"` at sizes
you have checked by eye, leave out `maxLines: 1`, and look at every render, not just the report.

**Review (required, separate from the renderer's checks):** look at each render and preview. Header: every word
inside the green box, nothing under the avatar on the profile mock-up, readable on the phone mock-up. Photo:
edge and mark visible at 40 px on all three themes. Post images: words legible in the feed-crop preview. Fix the
spec and re-render; say what changed.

## 4. X copy doc
Fill `templates/X_COPY.template.md` (copy it to `$OUT/X_COPY.md`):
- **Identity**: display name (50), handle (as the records give it; flag conflicts), bio (160, counted), location
  and website (owner), AI disclosure wording.
- **Upload table**: each file's pixel size, bytes and sha256 (`shasum -a 256` on macOS, `sha256sum` on Linux),
  and whether it was reused or made new.
- **Pinned post** and a **launch post** for the latest finished episode: text (counted against the post limit
  the owner's account has; 280 for non-Premium accounts is **unverified** here), image or clip, alt text, link.
  Use only facts from the records; unknown links stay `TBD (owner)`.
- **Per-post checklist** and the **do/don't checklist** from `references/best-practices.md`.

## 5. Hand off: the owner posts
- Record outputs, hashes, review state and open decisions in `status.md` or the copy doc.
- **This skill never posts and never changes the profile.** Uploading the header or photo, editing the bio,
  posting, scheduling and pinning are the owner's explicit-OK steps. When the owner asks for them, route to
  `post:post`, which needs the owner's OK for each exact action (what, which account, when); otherwise the copy
  doc is the hand-off for the owner to do it by hand.
- **Alternative:** `canva:canva` when the owner wants editable cloud designs (Canva has X header and post
  formats; the same specs and review checks apply to its exports).

## Saved defaults (optional `x` block in project.json)
Missing means no default. `x.handle` (e.g. `"@example"`), `x.display_name`, `x.bio`, `x.pinned_post`
(`"latest_episode"` or `"start_here"`). Change them only through `publish-core:publish` ("make X the default").

## Honest scope
- Makes the files, previews and the doc; does not post, schedule, pin, edit the profile or edit video.
- X publishes no avatar-overlap, mobile-crop or multi-image figures; those boxes are working values and are said
  to be unverified, as is everything marked so in `references/x-specs.md`.
- No impersonation of another account's branding; no invented handles, schedules, follower counts or links;
  no AI-generated human face presented as a real person.

## Definition of done
Brand inputs, X records and existing assets read and reused where they fit; header, profile photo and pinned-post
image rendered from saved specs (or reused and recorded), within the limits (sizes and bytes measured); header
words inside the text-safe box on the safe-area and profile mock-up previews; photo checked at 40 px on the three
themes; post images checked in the feed-crop preview; `X_COPY.md` filled from the owner's facts, with alt text for
every image and the per-post and do/don't checklists; posting left to the owner (via `post:post` when requested).

## Provenance
Written for creator-publish (not adapted from social-media-skills). GPL-3.0-or-later like the repo.
