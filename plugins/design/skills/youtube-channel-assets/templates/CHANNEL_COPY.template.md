# {Channel name}: channel copy and setup

Everything to paste into YouTube Studio, plus the checklist for every upload. Image files sit next to this file.
Specs checked against YouTube Help on {YYYY-MM-DD} (see the skill's `references/youtube-specs.md`).

> Fill every `{...}` from the project's brand inputs and the owner's answers. Never invent a handle, link,
> schedule claim or sponsor. Leave a row as `TBD (owner)` when the owner has not decided.

---

## 1. Identity (Studio > Customization > Profile; Settings > Channel)

| Field | Value | Notes |
|---|---|---|
| Channel name | {name} | Plain text, the way people will search for it |
| Handle | @{handle} | Check availability in Studio before announcing it; list a fallback |
| Tagline | {one line} | Same line as on the banner |
| Default category (Settings > Upload defaults) | {category} | |
| Audience | {Yes / No} made for kids | A legal setting: answer truthfully. "Yes" turns off end screens and cards |
| Language | {language} | |
| Altered or synthetic content (per upload) | {default answer and when it changes} | Set it per video in the upload flow |

## 2. Branding uploads (Studio > Customization > Branding)

| Asset | File | Official spec | Check done |
|---|---|---|---|
| Profile picture | `profile-picture-800.png` | Renders at 98 x 98; JPG/GIF/BMP/PNG, no animation; up to 15 MB | Preview `previews/avatar-98-dark-vs-light.png` |
| Banner | `banner-2560x1440.{png,jpg}` | Min 2048 x 1152, recommended 2560 x 1440, 16:9, 6 MB or smaller; text safe area 1235 x 338 at 2048 wide (1546 x 423 at 2560) | Previews `previews/banner-safe-areas.png`, `banner-tv-full.png`, `banner-desktop-crop.png`, `banner-mobile-crop.png` |
| Video watermark | `watermark-300.png` | Square, at least 150 x 150, under 1 MB | Display: {End of video (last 15 s) / Custom start time / Entire video} |

File sizes and dimensions (from ffprobe and `wc -c`):

| File | Size (px) | Bytes | sha256 |
|---|---|---|---|
| {file} | {w x h} | {bytes} | {hash} |

## 3. About (channel description)

> {2-4 short paragraphs: what the channel is, who it is for, what a viewer gets and how often. Plain claims
> only; every number or schedule is one the owner confirmed. Disclosures the channel needs (AI narration,
> sponsorship, "not advice") go here.}

**Links:** {only links the owner supplied; otherwise "none yet"}
**Channel keywords (Settings > Channel):** {comma-separated, from the owner's topics}
**Contact email (optional):** {owner-supplied or blank}

## 4. Playlists

| Playlist | Description |
|---|---|
| {series or topic} | {one or two sentences} |

## 5. Per-episode upload fields

Copy this block for each upload into the episode's package `status.md` or upload notes.

| Field | Value |
|---|---|
| File | `{exact video file}` (sha256 {hash}) |
| Title | {title} |
| Description | {from the description template below} |
| Chapters | {00:00 first chapter, ...} (YouTube needs at least 3, each at least 10 s, the first at 00:00) |
| Thumbnail | `{thumbnail file}` (from `design:thumbnail-design`) |
| Tags | {few, specific} |
| Playlist | {playlist} |
| Audience | {made for kids: Yes / No} |
| Altered or synthetic content | {Yes / No, and why} |
| Visibility and time | {private / unlisted / public / scheduled at ...}: owner decides |
| End screen | {start 00:MM:SS.s, window N s}; elements: {slot 1 = ..., slot 2 = ..., slot 3 = ...} |
| Cards (optional) | {time, type, target} or none |
| Pinned comment | {text} |

### Description template

```
{One or two sentences: what this video answers or shows.}

Chapters
00:00 {first}
{MM:SS} {next}
{MM:SS} {next}

{Sources, credits, disclosures as needed.}
```

## 6. Per-upload checklist

1. Video file is the approved cut; length {>= 25 s for an end screen}.
2. Title, description, chapters and tags from section 5.
3. Thumbnail uploaded (Test & Compare if the owner wants it).
4. Audience and altered-content answers set.
5. **End screen**: in Studio > Content > {video} > End screen, set the elements from {start} to the end
   ({N} s) and drag them over the slots in `end-screen-template-1920x1080.png`
   ({slot 1}, {slot 2}, {slot 3}). Check the result in Studio's preview against
   `previews/end-screen-overlay.png`.
6. **Watermark**: confirm it is on ({display option}); it applies channel-wide.
7. Cards, if any, outside the end-screen window.
8. Playlist added; Shorts get a Related video link to the long version.
9. Visibility or schedule set **only after the owner's OK** for this exact upload.
10. Pinned comment posted after the video is live.

Uploading, scheduling and posting are owner-approved steps (routed to `post:post`); this document is the
checklist, not the upload.
