# {Show name}: Apple Podcasts show copy and setup

Everything to enter in Podcasts Connect and the RSS host, plus the checklist for every episode. Image files sit
next to this file. Specs and best practices checked against Apple's pages on {YYYY-MM-DD} (see the skill's
`references/apple-podcasts-specs.md` and `references/best-practices.md`).

> Fill every `{...}` from the project's brand inputs and the owner's answers. Never invent a host, feed URL,
> schedule, category answer or claim. Leave a row as `TBD (owner)` when the owner has not decided.
> Nothing in this document has been uploaded or submitted.

---

## 1. Identity (RSS host show settings; Podcasts Connect > show)

| Field | Value | Notes |
|---|---|---|
| Show title (`<title>`) | {name} | The name, plus at most one true descriptor; no keyword lists, no episode number |
| Author (`<itunes:author>`) | {person / company / network} | A name only |
| Owner name and email (`<itunes:owner>`) | {owner} | Used by Apple to verify the feed; not shown publicly |
| Language | {ISO 639 code, e.g. en} | |
| Primary category / subcategory | {Category > Subcategory} | First in the feed; Apple's RSS reads only the first |
| Secondary category / subcategory (Podcasts Connect) | {Category > Subcategory or none} | |
| Explicit (`<itunes:explicit>`) | {true / false} | Truthful content flag; flag explicit episodes individually |
| Show type (`<itunes:type>`) | {episodic / serial} | |
| AI disclosure | {wording, or "not applicable"} | Required in show and episode metadata when AI makes a material part of the audio |
| Website / link | {owner-supplied or none} | |
| Copyright line | {owner-supplied} | |

## 2. Show description (up to 4000 bytes)

> {First one or two sentences: what the show is, for whom, what an episode gives the listener. Then format,
> length, schedule only if confirmed, and disclosures. Plain claims only.}

Bytes: {n} (`printf '%s' "$TEXT" | wc -c`), characters: {n} (`wc -m`).

## 3. Artwork upload table

| Asset | File | Size (px) | Bytes | sha256 | Status |
|---|---|---|---|---|---|
| Show Cover (chosen) | `{file}` | 3000 x 3000 | {bytes} | {hash} | {new / reused}; RGB, no alpha |
| Show Cover (alternate) | `{file}` | 3000 x 3000 | {bytes} | {hash} | not for upload unless chosen |
| Episode Art, ep {N} | `{file}` | {w x h} | {bytes} | {hash} | optional; no text or logo |
| Showcase Hero | not made | 4320 x 1080 PSD | | | only if Apple featuring is requested |

Official spec: Show Cover 3000 x 3000 (RSS accepts 1400-3000), JPG or PNG, RGB, 72 dpi, no transparency or alpha
channel. Host file-size cap: {host's figure or TBD (owner)}. Previews checked: `previews/...small-sizes...png`
(200/120/80/60/55 px on dark and light), `previews/...ui-zones.png` (bottom fifth). Brand family check:
`previews/brand-family.png` (cover beside the YouTube icon and banner).

## 4. Do / don't

{Copy section 6 of the skill's `references/best-practices.md` and add any project-specific line.}

## 5. Per-episode fields

Copy this block per episode into the episode's package `status.md`.

| Field | Value |
|---|---|
| Audio file | `{exact master or release file}` (sha256 {hash}) |
| Episode title (`<title>`) | {title without show name or number} |
| Episode number / season | {N} / {S or none} |
| Episode type | {full / trailer / bonus} |
| Description | {first line = the promise; chapters; disclosures} |
| Episode art | `{file}` or "use show cover" |
| Explicit | {true / false} |
| Chapters | {mm:ss title (45 chars max), ...} or none |
| AI disclosure | {spoken in the audio: yes/no; metadata line} |
| Publish date and time | {owner decides} |
| GUID | set by the host; never change it |

## 6. Per-episode checklist

1. Audio is the approved master; the release file format is the one the owner chose.
2. Title has no show name and no episode number; number set in the episode-number field.
3. Description starts with the episode's promise; disclosures present.
4. Episode art (if any) is square, 1400-3000 px, no text, no alpha.
5. Explicit flag and episode type set truthfully.
6. Feed validates on the host; Apple preview checked in Podcasts Connect.
7. Publish or schedule **only after the owner's OK** for this exact episode.

## 7. Owner setup (one-time)

| Step | State |
|---|---|
| RSS host chosen and account created | {host or TBD (owner)} |
| Show created on the host with section 1 and 2 | {state} |
| Podcasts Connect sign-in with the owner's Apple Account | {state} |
| Feed URL submitted in Podcasts Connect and validated | {state} |
| Apple review passed; show live | {state} |
| Same feed submitted to other directories (Spotify, others) if planned | {state} |
