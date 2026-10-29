---
name: apple-podcasts-assets
description: "Make an Apple Podcasts show's artwork and setup copy: show cover (3000x3000 JPG/PNG, RGB, no alpha), optional episode art (square, no text), small-size legibility previews at 200/120/80/60/55 px on dark and light pages, a bottom-fifth UI check, a brand-family check against the YouTube channel, and a show-copy doc (title, author, description, category, explicit, type, trailer, AI disclosure, artwork upload table with sha256, per-episode fields and checklist, do/don't list, owner setup steps). Applies Apple's artwork policies and metadata rules plus podcast packaging best practice, with sources. Use for Apple Podcasts cover art, podcast artwork, episode art, Podcasts Connect setup, a podcast RSS show listing, or 'the Apple version of my YouTube channel assets'. Reads the project brand, reuses existing art first, writes specs rendered by compose:visual-composer (or canva:canva). Never uploads or submits: Podcasts Connect, the RSS host and posting are owner steps. Not for audio production, YouTube channel art (design:youtube-channel-assets) or thumbnails (design:thumbnail-design)."
---

> **creator-publish note (do this first):** if the request names a project or the person has a Creator Publish
> projects folder, your **first action** is to invoke the `publish-core:publish` skill. It supplies the project's
> brand, saved defaults, locked rules and the package `status.md` where you record choices, files and the next
> action. Skip it only for a one-off asset with no project.

# apple-podcasts-assets

A **design skill** for the artwork and listing copy an Apple Podcasts show needs once, plus the per-episode art
and checklist. It writes the brief, the composition specs and the show-copy doc; `compose:visual-composer`
renders the pixels; the owner submits the feed in Podcasts Connect. Same method as
`design:youtube-channel-assets`: **brief, spec, compose, review**.

## What a finished set contains

Specs and `SHOW_COPY.md` are saved in the package (default `<project>/packages/apple-podcasts-assets/assets/`; a
project may keep it at `<project>/apple-podcasts-assets/` next to its YouTube set). The rendered images go to
the media folder `$MEDIA` (set in step 2), with a `Files live in:` pointer in `status.md`; no image is
saved in the project folder:

| File | What | Spec to start from |
|---|---|---|
| `show-cover-3000-a.jpg`, `show-cover-3000-b.jpg` | show cover, two variants; the owner picks one | `examples/show-cover.json` |
| `episode-art/ep<NN>-episode-art-<size>.jpg` | optional episode art, no text or logo | `examples/episode-art.json` |
| `previews/cover-<v>-small-sizes-dark-light.png` | cover at 200/120/80/60/55 px on dark and light | `examples/cover-small-sizes.json` |
| `previews/cover-<v>-ui-zones.png` | cover with the bottom fifth shaded | `examples/cover-ui-zones.json` |
| `previews/brand-family.png` | cover beside the YouTube icon, banner and a thumbnail | renderer `contact-sheet` (below) |
| `SHOW_COPY.md` | identity, description, artwork table, do/don't, episode fields, checklist, owner setup | `templates/SHOW_COPY.template.md` |

Every `.json` spec is kept in the package as its image's reproducible source (`<name>.spec.json`). Previews are for
review only and are never uploaded.

## Specs (checked 2026-10-23)
Full table with sources, quotes and what is unverified: `references/apple-podcasts-specs.md`. In short:

| Asset | Official (Apple) | Unverified / working |
|---|---|---|
| Show Cover (required) | 3000x3000 (RSS accepts 1400-3000, largest preferred); square; JPG or PNG; RGB; 72 dpi; no transparency or alpha channel; no Apple logos, hardware or terms; no blurry or pixelated art; title clear and legible at scale | no file-size limit on Apple's pages (hosts cap, often ~500 KB); "bottom fifth" UI band; 55-60 px small size; corner radius |
| Episode Art (optional) | 3000x3000 (RSS 1400-3000); square; same format rules; no text or logo; fill the frame; falls back to the show cover | |
| Showcase Hero | 4320x1080 layered PSD, only if Apple featuring is requested | this skill renders flat files only |
| Channel art | icon 3000x3000, logo 3000x750 PNG with transparency, background 4320x3240 PSD: only for an Apple **channel** (a group of shows) | a single show needs none; there is no separate show banner or show background |
| Metadata | title: name, no keyword lists, no episode number; author: a name; show description up to 4000 bytes; episode description up to 10,000 characters; tags 255 characters; chapter titles 45 characters or fewer; explicit true/false; RSS reads the first category; type episodic/serial; episode type full/trailer/bonus; AI-generated content disclosed in show and episode metadata | title under ~60 characters |

Sources: <https://podcasters.apple.com/support/5514-show-cover-template>,
<https://podcasters.apple.com/support/5516-episode-art-template>, <https://podcasters.apple.com/5510-artwork-policies>,
<https://help.apple.com/itc/podcasts_connect/en.lproj/itcb54353390.html>,
<https://podcasters.apple.com/support/891-content-and-subscription-guidelines>,
<https://podcasters.apple.com/support/1691-apple-podcasts-categories>. Re-check before a real submission.

## Best practices
Applied to every set; full list with sources in `references/best-practices.md`:
- **Artwork (Apple):** title clear, prominent and legible at scale; limited extra text; contrast; no Apple logos,
  badges, hardware or terms; nothing explicit or misleading; no pixelation; solid background, not pure black
  or white. Check legibility at full size **and at 60 and 55 px** on dark and light pages.
- **Titles and descriptions (Apple):** show title = the name (one true descriptor at most), author = a name,
  no keyword stuffing, no episode numbers in titles (use the episode-number field), metadata that accurately
  describes the content, AI disclosure in show and episode metadata when it applies.
- **Category, explicit, trailer (Apple):** the category that best fits, best one first in the feed; explicit
  is a truthful flag; a trailer is `episodeType trailer`, only for a show that is or will be on Apple.
- **Consistency (practice):** same palette, type and mark as the YouTube channel, composed for a square;
  never a cropped YouTube banner. Episode art from the episode's real key art.
- Copy the do/don't list (`references/best-practices.md` section 6) into each `SHOW_COPY.md`.

## 1. Brief: read the brand, reuse what exists
1. **Brand inputs**: `project.json` (`brand.name`, `brand.palette`, `brand.fonts`, `brand.logos`, `brand_assets[]`,
   the optional `apple_podcasts` block below), the project's brand guide, and the YouTube set if one exists
   (profile picture, banner, thumbnails). Never invent a host, feed, category answer, schedule or claim; ask
   once for what is missing and changes the result.
2. **Existing art first.** Look for square art and high-resolution sources before making anything:
   ```sh
   find "$PROJECT" -type f \( -iname '*cover*' -o -iname '*podcast*' -o -iname '*avatar*' -o -iname '*profile*' -o -iname '*logo*' -o -iname '*still*' \) -not -path '*/node_modules/*'
   ffprobe -v error -show_entries stream=width,height,pix_fmt -of csv=p=0 "$FILE"   # size and alpha (rgba = has alpha)
   wc -c < "$FILE"
   ```
   A file that already meets the spec and the best practices (3000 px square, no alpha, title legible at
   55 px, on-brand) is reused as-is: record it. Art that is close goes into a spec as an `image` layer.
   Check that an older cover still follows the current brand guide before reusing it, and say why if not.
3. **Source resolution.** Record each raster source's size and the scale factor it gets. Keep upscaling to
   about 1.3x; if a source is too small, use vector shapes for the mark or render that file at 1400-2000 px
   (Apple accepts 1400-3000 via RSS) rather than blowing it up.
4. **Brief** (in the package `status.md`): show title as it will appear in the feed, author, descriptor (if
   any), palette and fonts, the mark, which supplied files are used where, what is new, and the two variants.

## 2. Specs
Folders first. `PKG` holds the specs and the copy doc; `$MEDIA` holds every rendered image. `MEDIA_ROOT` is the
media folder the person chose: a path named in the request, else `$CREATOR_PUBLISH_MEDIA`, else `media_root` in
the project's `project.json`, else `media_root` in `~/.creator-publish/config.json` plus `/<slug>` (the `publish`
skill's "Save and resume" has a resolver). If none is set, ask where media should live and stop until it is set;
there is no default location.
```sh
PKG="<project>/packages/apple-podcasts-assets"                 # absolute path of the project folder, plus this set's folder
: "${MEDIA_ROOT:?media folder not set: ask where media should live}"
MEDIA="$MEDIA_ROOT/apple-podcasts-assets"
```
Copy the examples into the package and edit them; they are brand-neutral placeholders:
```sh
mkdir -p "$PKG/assets/previews" "$MEDIA/previews" "$MEDIA/episode-art"
cp "${CLAUDE_SKILL_DIR}"/examples/show-cover.json "${CLAUDE_SKILL_DIR}"/examples/episode-art.json "$PKG/assets/"
cp "${CLAUDE_SKILL_DIR}"/examples/cover-small-sizes.json "${CLAUDE_SKILL_DIR}"/examples/cover-ui-zones.json "$PKG/assets/previews/"
```
- **Show cover**: output `format: "jpeg"` (no alpha). Title as large as one or two lines allow: capitals
  about 300 px tall or more on the 3000 canvas. One mark or one hero image. Title and key art above y 2400
  (the bottom fifth) and clear of the corners. Background not pure black or white.
- **Variants**: make two that differ in one decision (hero image, or title-only vs title plus descriptor).
- **Episode art**: one image layer, square crop of the episode's key art (`crop` in source pixels), no text,
  no logo. Canvas = the largest size the source allows at about 1.3x or less, between 1400 and 3000.
- **Fonts**: the project fonts if the renderer has them (a font file the project ships can be added with
  `CREATOR_PUBLISH_FONT_DIRS`); otherwise bundled Anton / Inter / DejaVu Sans. A missing font is a choice for
  the owner, never a silent swap. Long single-line titles: the renderer wraps when a line is wider than its
  box, so read `TEXT_OVERFLOW` details and lower `size` until it fits on the intended number of lines.
- **New imagery** comes from the image skills (`image-gen:image-prompt` routes; prompts for Higgsfield use
  the optional `higgsfield` prompting skill if installed, otherwise write the prompt directly, taking parameters and aspect ratios from the provider's tool schema, never invented) only with the owner's OK for any paid step; the file then becomes an
  `image` layer.

## 3. Compose, check and preview
Load `compose:visual-composer` for the renderer command (`CLI` below is its
`node "<compose plugin>/renderer/src/cli.js"`), check its renderer is installed, then:
```sh
cd "$PKG/assets"
CLI validate show-cover.json --out "$MEDIA/show-cover-3000-a.jpg"
CLI render show-cover.json --out "$MEDIA/show-cover-3000-a.jpg"
```
Same for variant b and each episode-art spec, then the review specs in `previews/` (they read
`../show-cover-3000.jpg`: point `src` at the variant being checked in `$MEDIA` and render one preview per variant
into `$MEDIA/previews/`).

Format and limit checks (run in `$MEDIA`):
```sh
cd "$MEDIA"
F=show-cover-3000-a.jpg
ffprobe -v error -show_entries stream=width,height,pix_fmt -of csv=p=0 "$F"   # 3000,3000 and no 'a' in pix_fmt
file "$F"                       # JPEG ... components 3 (RGB); PNG must say RGB, not RGBA
wc -c < "$F"                    # bytes: compare with the host's cap
```
- The renderer writes **PNG as RGBA** even when every pixel is opaque, and Apple refuses an alpha channel.
  Use JPG, or flatten a PNG: `ffmpeg -v error -i cover-rgba.png -pix_fmt rgb24 cover.png` (only for an
  opaque design).
- JPG files carry no density tag; tools read that as 72 dpi (Apple's figure). Do not re-save to add one.
- Over the host's size cap: re-render the same spec with a lower `output.quality` (e.g. 80) and re-check.

Brand-family sheet (cover beside the YouTube icon, banner and a recent thumbnail):
```sh
CLI contact-sheet "$MEDIA/show-cover-3000-a.jpg" "<youtube profile picture>" "<youtube banner>" "<recent thumbnail>" --out "$MEDIA/previews/brand-family.png"
```

**Review (required, separate from the renderer's checks):** look at each preview. Small sizes: the title
reads at 60 and 55 px on both pages and the cover edge is visible on both. UI zones: nothing important in the
band. Full size: no pixelation, no Apple marks, no stray text. Brand family: clearly the same show as the
YouTube channel, not a banner crop. Fix the spec and re-render; say what changed and which variant you
recommend and why.

## 4. Show-copy doc
Fill `templates/SHOW_COPY.template.md` (copy it to `$PKG/assets/SHOW_COPY.md`): identity (title, author,
category, explicit, type, AI disclosure), the show description (count bytes with `wc -c`), the artwork upload
table with measured size, bytes and sha256 (`shasum -a 256` on macOS, `sha256sum` on Linux), the do/don't list,
the per-episode fields for the latest finished episode (episode title without show name or number; number in
its own field), the per-episode checklist, and the owner's one-time setup (RSS host, Podcasts Connect, feed
submission). Use the owner's facts only; mark unknowns `TBD (owner)`. Carry over decisions already recorded
for other platforms (AI disclosure wording, audience) and say where they came from.

## 5. Hand off: the owner submits
- Record outputs, hashes, the recommended variant, review state and defects in the package `status.md`.
- **This skill never uploads or submits.** Creating the show on an RSS host, uploading artwork or audio,
  submitting the feed in Podcasts Connect and publishing an episode are the owner's explicit-OK steps. When the
  owner asks for them, route to `post:post`; otherwise `SHOW_COPY.md` is the hand-off.
- **Alternative:** `canva:canva` for editable cloud designs; the same specs and preview checks apply to its
  exports (export JPG or a flattened PNG).

## Saved defaults (optional `apple_podcasts` block in project.json)
Missing means no default. `apple_podcasts.show_title`, `apple_podcasts.author`, `apple_podcasts.category`
(e.g. `"Science > Astronomy"`), `apple_podcasts.category_secondary`, `apple_podcasts.explicit` (`true` or
`false`), `apple_podcasts.type` (`"episodic"` or `"serial"`), `apple_podcasts.host` (the RSS host's name).
Change them only through `publish-core:publish` ("make X the default").

## Honest scope
- Makes the artwork, previews and the doc; does not produce audio, host a feed, or touch Podcasts Connect.
- Apple publishes no thumbnail pixel size, file-size cap or safe-area numbers on the pages checked: the
  55-60 px check, the bottom-fifth band and host caps are working rules and are called that.
- Showcase Hero and channel art need layered PSD templates from Apple; flat drafts only, and only on request.
- No impersonation of another show; no Apple marks; no invented hosts, feeds, ratings, chart positions or links.

## Definition of done
Brand inputs and existing art read and reused where they meet the spec and the best practices; two show-cover
variants rendered from saved specs at 3000x3000, RGB, no alpha (measured with ffprobe/`file`, bytes recorded);
title legible at 60 and 55 px on dark and light previews; nothing important in the bottom fifth; brand-family
check against the YouTube set; episode art (if made) square, no text, sources upscaled no more than about
1.3x; `SHOW_COPY.md` filled from the owner's facts with the artwork table and sha256, do/don't list,
per-episode fields for the latest finished episode, checklist and owner setup; uploading and submitting left
to the owner.

## Provenance
Written for creator-publish (not adapted from social-media-skills). GPL-3.0-or-later like the repo.
