---
name: post
description: "Post or schedule a finished file (\"post it to YouTube and TikTok\", \"schedule the cover video on Instagram tomorrow 9am\", \"where should I post this?\"): recommends platform, format, caption, title and hashtags per post, checks the file against the platform's specs, then uses the selected available publishing connector or browser route. Missing connections are reported; explicit route/account choices are preserved. Its one stop: the owner's explicit OK for each post (what, where, when), ready project or not. Records each post in the package status.md."
---

# Post

## For the owner

**How you talk to it.** "Post it to YouTube and TikTok." "Schedule the final video on Instagram tomorrow 9am."
"Where should this go?" "Shorter caption, no hashtags on LinkedIn." Plain words; notes about captions and hashtags go
into the post they are about.

**What it does.** For each post it recommends the platform and format (and why), writes the caption, title and
hashtags the way that platform works in 2026, checks the file against the platform's limits (size, shape, length,
caption length) and fixes or flags what does not fit. Then it posts or schedules the way that works on your setup:
the selected available connector or browser route. A missing connection is reported with a resumable next action; a pinned tool/account/route is never replaced automatically.

**What it asks you.** One thing, every time: your OK for each post, shown as *what* (file, caption, title,
hashtags, cover), *where* (platform and account) and *when* (now, a time with timezone, or as a draft). Nothing is
posted without it, even on a project you marked ready. Afterwards the post (link or id, time, caption) is recorded
in the package `status.md`.

## For Claude

### Run
1. **The file.** A file path the owner names or the output of this run (a cover, a graphic); for a package, read
   it through the `Files live in:` pointer in its `status.md` (media lives in the media folder set by
   `media_root`, never in the project folder). Plus its optional
   `<file>.json` sidecar (described in the `publish` skill's output-sidecar reference). With a sidecar, post only
   `approved` files unless the owner says otherwise. `publish` hands over exact selected media and package status; prepare one reviewable draft per requested platform/account directly.
   For still frames (e.g. a cover), grab them from the video file itself with ffmpeg, never from its `.json`
   sidecar (command in the `publish` skill, "Commands").
2. **Recommend** (one draft per platform: format, caption, title, hashtags, when, why): read
   `references/choosing-platform-and-format.md`, `references/captions-and-hooks.md`, `references/hashtags.md`.
   Native per platform, never one caption pasted everywhere. Fold in the owner's notes. Include `why` (one line).
   Disclose AI-generated media where the platform requires it (`references/publishing-and-scheduling.md`).
   If the project's `output.platforms` lists default targets and the owner named none, use those and say so.
3. **Check** every draft against the platform's limits before asking for the OK. Measure the file, then compare:
   ```sh
   ffprobe -v error -print_format json -show_streams -show_format "$FILE"   # width, height, avg_frame_rate, duration
   stat -c %s "$FILE"            # bytes (macOS: stat -f %z "$FILE")
   printf %s "$CAPTION" | wc -m  # caption characters; same for the title and description
   ```
   Limits are in `${CLAUDE_SKILL_DIR}/references/platforms.json`. Find the platform by `id`, `name` or an entry in
   its `aliases`; the format is the one the owner asked for, else the platform's `default_format`; then check
   every field the format entry has: `media` (image vs video), `extensions` (file extension), `max_bytes`,
   `aspect_ratios` (width/height within 2% of any listed ratio), `min_width`/`min_height`/`max_width`/`max_height`,
   `min_duration_s`/`max_duration_s` and `min_fps`/`max_fps` (video only). From the platform's `text` entry check
   `title_max_chars`, `caption_max_chars`, `description_max_chars` and `hashtags_max` against your counts.
   **A field that is absent is not checked. Never fill a gap with a remembered number.** Report each check as
   PASS, FAIL or UNKNOWN (a figure you could not measure) with the measured value and the limit. FAIL: fix it first
   (re-export, trim, crop, shorten), or tell the owner and recommend the version that fits (e.g. a vertical short
   for TikTok when only a 16:9 final exists).
4. **Ask for the OK, per post.** One message per post (or one list with a separate yes/no per line): what, where,
   when. A project marked ready does NOT skip this, and an OK for other work does NOT cover posting. An
   explicit OK naming those exact details counts, including one already given. A changed file/caption/account/time needs approval of the changed post; do not ask again for unchanged approved details.
5. **Post** using the selected available connector or browser route after the exact post is approved. First read
   the package `status.md`: if it already records a post of the same file on the same platform, stop and ask the
   owner instead of posting again (this is the duplicate-post guard). Read its current schema; verify account/format/scheduling/cover support. Config and reference limits are snapshots, not proof of live capability. If login/connection is missing, save the next action; do not silently change provider, account or route. Use available browser tools only when that route fits the user's choices. For the existing Higgsfield TikTok flow, the owner submits the prepared form; preserve that boundary. Poll uncertain submissions before retrying to avoid duplicate posts.
6. **Record** right away under `Posting` in the package `status.md`: file, platform and account, status
   (published, scheduled, draft or submitted), URL or post ID, time with timezone, caption as posted, route and
   the owner's approval time. Never record something as posted that was not.

### Hard rules
- Never post, schedule or submit anything without the owner's explicit OK for that post. Never auto-post.
- Never invent account ids, board ids, privacy options or limits: discover them from the connector, or read them
  from `references/platforms.json`.
- Never edit the source file's folder or any other tool's vault; posts are recorded in the package `status.md`.

## Provenance (creator-publish addition)
The guidance in `references/` is adapted (condensed and rewritten) from social-media-skills v1.0.1 by Frank
Heijdenrijk (MIT): caption-writer, hook-writer, hashtag-strategy, platform-specs-and-validation,
scheduling-and-queue, cross-platform-repurposing and the platform publishing skills. Licence text:
`plugins/post/LICENSE.social-media-skills`; details in `NOTICE.md`.

Save package status with exact draft/media IDs, approval details, submitted job and confirmed result/timezone. Preparing a thumbnail or workflow does not authorize publishing, scheduling, uploading or native A/B testing.
