# {Show name}: Spotify show copy and setup

Everything to enter in Spotify for Creators (or in the RSS host that feeds Spotify), plus the checklist for every
episode. Image files sit next to this file or are referenced in place. Specs checked against Spotify's pages on
{YYYY-MM-DD} (see the skill's `references/spotify-specs.md`).

> Fill every `{...}` from the project's brand inputs and the owner's answers. Never invent a show name, host,
> link, schedule, category or sponsor. Leave a row as `TBD (owner)` when the owner has not decided.

- **Status:** DRAFT. Nothing here has been uploaded, submitted or published. Every change on Spotify or the RSS
  host needs the owner's explicit OK.

---

## 1. Route (how the show reaches Spotify)

| Question | Answer | Notes |
|---|---|---|
| Hosting | {Spotify for Creators / RSS host name / TBD (owner)} | One feed serves Spotify, Apple and the rest |
| Audio or video | {audio only / video podcast} | Video plays on Spotify only; the feed carries the audio |
| Video route (if video) | {Spotify-hosted upload / partner host / replace audio episode with video in Spotify for Creators} | Replaced episodes cannot use Spotify monetization |
| Other directories on the same feed | {Apple Podcasts, ...} | Same cover file everywhere |

## 2. Identity

| Field | Value | Notes |
|---|---|---|
| Show name | {name} | 3-4 words, honest keyword; ~20 characters show before truncation |
| Author / publisher | {name} | |
| Category (primary, sub) | {Apple category} > {subcategory} | Drives recommendations |
| Language | {language} | |
| Explicit (show) | {No / Yes / Clean} | Answer truthfully |
| Show type | {episodic / serial} | |
| Disclosures | {AI voice / AI imagery / sponsorship ...} | Plain words, in the description |

### Show description (draft for the owner)

> {2-4 short paragraphs. The first 250 characters say what it is, who it is for and what a listener gets. Plain
> claims only; every number or schedule is one the owner confirmed. No keyword lists or hashtags.}

({N} characters; first 250 characters end at "{...}".)

## 3. Artwork

| Asset | File | Spec | State |
|---|---|---|---|
| Show cover | `{file}` | 1:1; 1400-3000 px recommended, max 3000x3000 for imported feeds; JPG/PNG (TIFF/PNG/JPEG in the delivery spec), RGB | {reused / new}; preview `{previews/...}` |
| Episode art (optional) | `{file}` or "show cover (default)" | 1:1; Spotify for Creators web only; not shown everywhere | |
| Video thumbnail (video only) | `{file}` | horizontal 16:9, suggested 1920x1080 | |

Measured (ffprobe and `wc -c`; `shasum -a 256` on macOS, `sha256sum` on Linux):

| File | Size (px) | Bytes | sha256 |
|---|---|---|---|
| {file} | {w x h} | {bytes} | {hash} |

## 4. Video-podcast notes
- {Source video, its resolution, codecs and duration; how it meets the video specs; which thumbnail; or "audio
  only: why".}

## 5. Trailer
- {Which episode or clip is the trailer, its length and when it is set; or TBD (owner).}

## 6. Per-episode checklist
1. **Audio / video file:** the approved master, matching its sha256.
2. **Title:** {convention}.
3. **Description:** 3-4 sentences, then chapters as "(00:00) Title" (first at 00:00, 3+, 30 s apart, plain text),
   then credits and disclosures.
4. **Episode number / season / type:** {full / trailer / bonus}.
5. **Explicit:** {No / Yes / Clean}.
6. **Episode art:** show cover by default; custom art only if the show uses it.
7. **Video only:** thumbnail 16:9 1920x1080 (or a picked frame); check the auto thumbnail is not a black frame.
8. **Schedule:** {day, time, time zone}; publishing needs the owner's explicit OK.
9. **Record:** episode URL, date and fields in the package `status.md`.

## 7. Latest finished episode: {title}

| Field | Value |
|---|---|
| File | {path, sha256, duration} |
| Title | {title} |
| Description | {text or pointer} |
| Chapters | {block} |
| Episode type / number | {full, N} |
| Explicit | {No} |
| Episode art | {file or default} |
| Video + thumbnail | {file or n/a} |

## 8. Do / don't
{Copy the table from `references/best-practices.md` section 5, adjusted to this show.}

## 9. Setup the owner still needs
- {Spotify for Creators account and show claim, RSS host choice, verification, category, trailer, ...}

## 10. Files in this folder
| File | State |
|---|---|
| {file} | {new / reused in place} |
