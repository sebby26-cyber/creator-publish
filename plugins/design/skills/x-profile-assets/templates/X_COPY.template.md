# {Show name}: X profile and post copy

Everything to set on the X profile, plus the drafts and checklist for every post. Image files sit next to this
file. Specs checked on {YYYY-MM-DD} (see the skill's `references/x-specs.md`; items marked unverified there are
unverified here too).

> Fill every `{...}` from the project's brand inputs and the owner's records. Never invent a handle, link,
> schedule claim or follower count. Leave a row as `TBD (owner)` when the owner has not decided.
>
> **Status: DRAFT.** Nothing here has been posted, scheduled, pinned or set on X. Every one of those is an
> owner-approved step (via `post:post` when requested).

---

## 1. Identity (Profile > Edit profile)

| Field | Value | Limit / notes | Source |
|---|---|---|---|
| Display name | {name} | 50 characters | {record} |
| Handle | @{handle} | up to 15; letters, numbers, underscore. **Flag any record that disagrees** | {record} |
| Bio | {bio} ({n} characters) | 160 characters; say what the show is, who it is for, and any AI disclosure | {record or "draft"} |
| Location | {location or blank} | optional | owner |
| Website | {link} | optional; usually the YouTube channel or show page | owner |
| AI disclosure | {wording, e.g. "Narrated by AI"} | same wording as the YouTube altered-content setting and descriptions | {record} |
| Account type | {personal / creator / Verified Organization} | Verified Organizations get a square avatar | owner |

**Conflicts for the owner:** {list every record that disagrees: handles, bios, which avatar or header is live.}

## 2. Profile uploads

| Asset | File | Official spec | Check done | State |
|---|---|---|---|---|
| Profile photo | `{file}` | 400 x 400 recommended; max 2 MB; JPG/PNG/GIF, no animation | `previews/avatar-themes.png` (40 px on Default, Dim, Lights out) | {reused / new} |
| Header | `header-1500x500.png` | 1500 x 500 recommended; JPG/PNG/GIF; 60 px top and bottom may be cropped | `previews/header-safe-areas.png`, `previews/profile-mockup.png` | {reused / new} |

File sizes and hashes (from ffprobe, `wc -c` and `shasum -a 256`):

| File | Size (px) | Bytes | sha256 | Reused or new |
|---|---|---|---|---|
| {file} | {w x h} | {bytes} | {hash} | {state} |

## 3. Pinned post (draft)

| Field | Value |
|---|---|
| Text | {text} ({n} characters) |
| Image | `pinned-post-1600x900.png` (or {other}) |
| Alt text | {what the image shows, including any words in it} ({n} characters; limit 1,000) |
| Link | {link or TBD (owner)} |
| When to refresh | {on each new episode / evergreen} |

How (owner): post it, then the post's "..." menu > Pin to your profile > Pin.

## 4. Launch post for the latest finished episode (draft)

| Field | Value |
|---|---|
| Episode | {title} ({episode number}) |
| Text | {text} ({n} characters) |
| Media | {native clip file (MP4, under 140 s) / post image / none: link card from YouTube} |
| Alt text | {alt text} |
| Link | {watch URL, or TBD (owner) until the video is public} |
| AI disclosure | {line, if the media is AI-generated} |
| When | {owner's plan, or TBD (owner)} |

## 5. Per-post checklist

1. **Media:** the final file from the package (hash matches the package record). Image inside 2:1-3:4 and under
   5 MB; video MP4 under 140 s and 512 MB (non-Premium).
2. **Text:** one idea, the hook in the first line, counted against the account's post limit; no unconfirmed
   claims.
3. **Alt text** on every image (what it shows, words in it).
4. **AI disclosure** in the text when the media is AI-generated.
5. **Link:** public (not private or unlisted by mistake); the YouTube thumbnail is final, because X shows it.
6. **Hashtags:** {owner's rule, e.g. 0-1}.
7. **Account check:** posting as @{handle}.
8. **Owner's OK** for this exact post (text, media, account, time) before it is posted or scheduled
   (`post:post`).
9. **After posting:** pin if it is the new pinned post; record the post URL and time in the package
   `status.md`.

## 6. Do / don't

{Copy the table from the skill's `references/best-practices.md` section 8 and fill in the project's facts.}

## 7. Files in this folder

| File | State |
|---|---|
| `X_COPY.md` | new |
| {file} + `.spec.json` | {new / reused in place: path} |

Previews are for review only and are never uploaded.
