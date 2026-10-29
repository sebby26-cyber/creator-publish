Adapted from social-media-skills v1.0.1 (skills/platform-specs-and-validation, skills/scheduling-and-queue, skills/caption-writer, skills/tiktok-video-publishing, skills/tiktok-photo-mode, skills/youtube-publishing-and-metadata, skills/youtube-shorts, skills/instagram-reels-publishing, skills/threads-post, skills/linkedin-post-writer, skills/pinterest-seo, skills/hashtag-strategy; spec figures also from skills/thumbnail-design, skills/pinterest-pin-design, skills/story-writer, skills/text-post-and-microblog, skills/x-growth, skills/facebook-strategy, skills/instagram-growth, the upstream WoopSocial integration guide) by Frank Heijdenrijk, MIT; condensed for creator-publish.

# Platform specs (media + text limits)

The machine-readable copy of these figures is `platforms.json` in this folder (absent field = not checked). Every
figure below carries its source tag. Upstream marks all of it **volatile: re-verify quarterly**; where
upstream itself says "verify" or "~", the row says **re-verify**. Do not fill gaps with remembered numbers:
an empty cell means upstream gives none.

**Source tags:** PSV = platform-specs-and-validation/references/woopsocial-publish-spec.md ·
SQ = scheduling-and-queue/references/platform-publishing.md · CW = caption-writer/references/platforms.md ·
TVP = tiktok-video-publishing/references/video-publishing-2026-reality.md ·
TPM = tiktok-photo-mode/references/photo-mode-2026-reality.md ·
YPM = youtube-publishing-and-metadata/references/youtube-metadata-2026-reality.md ·
YS = youtube-shorts/references/{shorts-algorithm-2026, hooks-retention-and-captions}.md ·
IRP = instagram-reels-publishing/references/reels-publishing-2026-reality.md ·
TP = threads-post/references/threads-2026-reality.md · PSEO = pinterest-seo/references/* ·
TD = thumbnail-design/references/design-and-test-recipes.md ·
PPD = pinterest-pin-design/references/design-and-variant-recipes.md ·
SW = story-writer/references/stories-2026-reality.md · TXT = text-post-and-microblog ·
XG = x-growth/references/x-2026-reality.md · IGG = instagram-growth/references/format-and-diagnosis.md ·
FBS = facebook-strategy/references/facebook-2026-reality.md ·
HS = hashtag-strategy/references/platform-playbook.md · LPW = linkedin-post-writer/references/linkedin-mechanics.md · WS = the upstream WoopSocial integration guide ·
HF = Higgsfield `tiktok_prepare_publish` tool schema (2026-10-08; not upstream).

## Media

| Platform / format | Aspect | Resolution | Duration | File | Other | Source |
|---|---|---|---|---|---|---|
| YouTube long-form video | 16:9 | - | - | - | - | SQ |
| YouTube Short | vertical or square (9:16 / 1:1) | - | up to 3 min (the 60 s rule ended Oct 2024) | - | no thumbnail/click surface; burned-in captions ~2 lines, 32-42 chars/line | YPM, YS |
| YouTube thumbnail | 16:9 | 1280x720 | - | JPG/PNG; cap 50 MB since early 2026 (was 2 MB) | uploaded natively in Studio (no scheduler field); legible at ~168x94 | TD (re-verify) |
| TikTok video | 9:16 | 1080x1920 recommended; below 540x960 is upscaled/blurry | default cap 3 min, 10 min for eligible accounts; per-account cap from `maxVideoPostDurationSec` | MP4/MOV, <=1 GB | cover = 1080x1920 title card, key text centred | TVP, WS (re-verify) |
| TikTok video (Higgsfield connector) | - | >=360 px both sides | 3-600 s | MP4/WebM/MOV, <=1 GB | 23-60 FPS | HF |
| TikTok Photo Mode | 9:16 | 1080x1920 | - | - | 5-7 slides sweet spot, native max 35; native photo post beats an MP4 slideshow | TPM (re-verify) |
| TikTok photos (Higgsfield connector) | - | within 1920x1080 or 1080x1920 | - | JPEG/WebP only, <=20 MB each | up to 35 | HF |
| Instagram Reel | 9:16 (0.5625; anything else crops or letterboxes) | 1080x1920; >=720p (1080 ideal) | ~90 s historically; up to 3 min in-app; up to ~15 min via third-party tools | MP4/MOV, H.264, <=4 GB; export ~15-20 Mbps VBR | 30 or 60 fps; safe zone: top ~250 px and bottom ~350 px are UI; feed shows 4:5 crop, grid shows 3:4 (1080x1440); cover chosen before publish, cannot be edited after | IRP (re-verify length) |
| Instagram feed (image / carousel) | 1:1, 4:5 | - | - | - | carousels up to ~20 slides | SQ, IGG (re-verify) |
| Instagram / Facebook Story | 9:16 | 1080x1920; safe zone 1080x1420 | video segments up to 60 s (longer auto-split); photos show ~5 s | images <4 MB, video <30 MB (scheduler limits) | Stories require media | SW, PSV (re-verify) |
| Facebook | - | - | longer 3-8 min video now also boosted | - | all videos are Reels (mid-2025); cannot mix images + video in one post | FBS, PSV |
| LinkedIn | - | - | - | - | image, document (PDF carousel), video or text-only | SQ |
| X | - | - | - | - | media supported | SQ |
| Threads | - | - | video up to 5 min | - | photos, video, polls (<=4 options), GIFs, voice notes; via scheduler API only text + one image/video | TP, PSV |
| Pinterest pin | 2:3 (other ratios penalized; taller than 2:3 truncates) | 1000x1500 | - | PNG/JPG | **single** image or single video per pin; needs a board and a destination link | PPD, PSV, SQ |
| Bluesky | - | - | - | - | optional media | SQ |

## Text

| Platform | Caption / body | Title | Description | Hashtags | Links | Source |
|---|---|---|---|---|---|---|
| YouTube | - | max 100 (keyword in first ~40, ~50-60 best) | max 5,000 | a few; first ~3 show above the title | clickable | YPM, CW, HS |
| TikTok | max 4,000 (first ~100-150 shown) | 150 (Higgsfield field) | 4,000 (Higgsfield field) | 3-5 as keywords (Photo Mode 1-2, never >5) | bio only | TVP, CW, TPM, HF |
| Instagram | ~2,200 (preview ~125) | - | - | 3-5, hard cap 5 | bio only | CW, HS (re-verify) |
| LinkedIn | ~3,000 (preview ~140 mobile / ~210 desktop) | - | - | 3-5 | body links suppress reach; first comment | CW, TXT, LPW |
| X | 280 free; up to 25,000 with Premium | - | - | 0-2 | clickable | CW, XG |
| Threads | 500 | - | - | 1 topic tag | clickable, inline | TP, SQ |
| Facebook | ~63,206 (preview ~80) | - | - | 1-2 | clickable | CW |
| Pinterest | - | <=100 | ~500 (natural copy ~100-200) | 0-2 (keywords instead) | destination link <=2048 | PSV, CW, PSEO |
| Bluesky | ~300 | - | - | a few | clickable | SQ, CW, PSV (re-verify: "verify exact fields against the live spec") |

## Rules a validator or reviewer should catch

- **Facebook:** no images + video in one post. **Instagram:** Stories need media; publishing needs a
  Business/Creator account. **Pinterest:** single media, a board, a link. **Threads:** single post only (no
  chain, poll, voice or GIF through the API). (PSV, SQ)
- **TikTok field applicability:** `cover`, duet, stitch apply to VIDEO; `autoAddMusic` applies to PHOTO only.
  Branded content cannot be private. (PSV, TVP)
- **YouTube:** `madeForKids` is a COPPA/FTC legal declaration, set truthfully; thumbnail and A/B title tests
  are native Studio steps. (YPM)
- **Remove other-platform watermarks** before re-posting video. (IRP)
- **X plan caps:** some scheduler tiers cap X posts per month (e.g. ~200/mo); Threads and Bluesky have no
  caps there. (WS)
- **Declarations are not validation knobs:** never flip a disclosure or kids flag to clear an error. (PSV)

> **creator-publish note:** the Higgsfield rows are the limits of the Higgsfield TikTok connector's
> `tiktok_prepare_publish` schema as read on 2026-10-08; they bind only when that route is used and are
> stricter than upstream TikTok figures in places (JPEG/WebP-only photos, 3-600 s, 23-60 FPS).
