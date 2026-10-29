Adapted from social-media-skills v1.0.1 (skills/cross-platform-repurposing, skills/caption-writer, skills/tiktok-photo-mode, skills/youtube-shorts, skills/threads-post, skills/linkedin-post-writer, skills/pinterest-seo, skills/instagram-reels-publishing) by Frank Heijdenrijk, MIT; condensed for creator-publish.

# Choosing the platform and format

The recommender's first job for a finished asset: which platform(s), which native format on each, and
whether the piece should travel at all. Machine-readable formats and limits live in
`platforms.json` (this folder); this file is the judgement layer.

## Start from the asset and the goal

Pin four inputs before recommending anything: **the asset** (video, image, carousel, text), **the goal**
(reach, comments, saves, clicks, community, conversion), **the core idea** (the one point it lands), and
**the account's audience** on each candidate platform. The goal picks the format more often than the
platform does.

| Atom / asset | Best-fit platform + format | Why |
|---|---|---|
| A moment, story, demo (vertical video) | Instagram Reel, TikTok video, YouTube Short | Short vertical video is the discovery surface on all three |
| A how-to, list, framework | Instagram carousel (feed), TikTok Photo Mode, LinkedIn document/PDF carousel | Swipe formats earn saves and dwell |
| A single strong point or take | X post, Threads post, Bluesky post, LinkedIn text post | The text is the post; lead with the point |
| A searchable, evergreen how-to with a destination link | Pinterest pin (2:3) | Visual search engine; the link is the point |
| A long, searchable explainer (horizontal video) | YouTube long-form | Search + recommendations; metadata is the launchpad |
| A personal/professional lesson | LinkedIn text post from a person, not a page | Personal profiles out-reach company pages |
| A question or opinion meant to start a conversation | Threads | Replies outweigh likes there |
| Community, local, older-skewing audience | Facebook (Reels for discovery, photos for feed engagement) | Groups and Reels carry reach |

### Per-platform "best for" (one line each)

- **YouTube** - search-driven video that compounds for years; Shorts are a separate discovery engine
  (decoupled from long-form since late 2025), measured by viewed-vs-swiped, not CTR.
- **TikTok** - a search engine: the caption is search, the first 2 seconds decide the swipe. Photo Mode is a
  high-ceiling but niche-dependent format (video still gets far more views on average); never promise
  virality.
- **Instagram** - Reels for reach, carousels for saves/authority, Stories for retention, single photos for
  low discovery. Reels display at 9:16 in the Reels tab, 4:5 in the feed and 3:4 on the profile grid.
- **LinkedIn** - dwell time and early, genuine comments; text posts and document carousels; links in the
  body suppress reach.
- **X** - short, punchy single posts; the post is the caption; hashtags 0-2.
- **Threads** - conversation-first; one topic tag; links inline are rewarded.
- **Bluesky** - short (~300 chars), casual, community-forward; links clickable and welcome.
- **Facebook** - community and local; all videos are Reels; photos lead feed engagement.
- **Pinterest** - keywords and relevance rank, not followers; 2:3 pins; saves and long clicks.

## When NOT to post somewhere

- Platform-specific content (an in-joke, a native trend, a reply) reads wrong elsewhere; say so.
- A single light idea earns one or two native versions, not a forced post on every platform.
- If two platforms share most of the audience, vary the **angle**, not just the formatting.
- Reddit is not a supported publish target: draft for it if asked, but the human posts natively.

## One post per platform, native, not copy-paste

**Repurposing is not reposting.** Pasting one caption everywhere fits no platform, looks like spam to anyone
following on two, and several platforms down-rank obvious cross-posts (for example a Reel carrying another
app's watermark). The method is **atomize, then adapt**:

1. **Atomize** - extract the core idea (the atom). A single post has one; a long piece (blog, podcast, 20-min
   video) has several, each strong enough to stand alone. Pull atoms; do not summarize.
2. **Adapt** - rebuild the atom for each target.

| Stays constant | Changes per platform |
|---|---|
| The atom (core idea) | The hook |
| Brand voice | Format (Reel / carousel / thread / post / pin) |
| Facts / truth | Length and structure |
| Brand guardrails | CTA |
| | Mechanics: hashtags, links (bio vs inline vs comment), tags |
| | Register (LinkedIn more formal, TikTok looser) |

If two versions differ only in hashtags, nothing that matters changed: re-hook, re-format, re-length.

### Transform recipes (same atom, native everywhere)

| Platform | Native form | Length | Hook | Links | Register |
|---|---|---|---|---|---|
| Instagram | Reel / carousel / image | short-medium | visual + on-screen text; caption line 1 inside ~125 chars | bio | warm |
| TikTok | short 9:16 video (or Photo Mode) | short | frame one; keyword-led caption | bio | casual |
| LinkedIn | text post / document carousel | medium-long | first line inside ~140 chars + whitespace | first comment | authority |
| X | single post (thread for multi-atom ideas) | short | the point | inline | conversational |
| Threads | single post | short (<=500) | the take or question | inline | casual |
| Bluesky | short post | short (~300) | the take | inline | casual-warm |
| Facebook | text + media post / Reel | short-medium | relatable line | inline | personal |
| YouTube Shorts | short vertical video | short | a searchable title line | description | clear |
| Pinterest | pin + link | short | keyword | clickable destination | descriptive |

Cross-medium: video to text pulls the spoken insights as written atoms (never a transcript); text to video
is rebuilt as a script (never a caption read aloud).

### Quality gate before recommending a fan-out

- Each version **stands alone** (no "as I said on LinkedIn").
- Each version **feels native**: if you can tell it was relocated, rebuild it.
- **Space the posts out**; do not fire the same idea everywhere in the same minute.
- **Remove other-platform watermarks** from video before re-posting it.
- Design vertical media for the strictest crop it will meet (TikTok/Reels 9:16 with centred safe zone; Photo
  Mode 9:16 first, then crop to 4:5 for Instagram).

> **creator-publish note:** sibling skills named in the upstream text (hook-writer, caption-writer,
> reels-script, thread-writer, carousel-writer, content-recycling) are not all part of this library; they
> are kept as plain names. In creator-publish the per-platform variants are recommended here and handed to
> the publish step described in `publishing-and-scheduling.md`.
