Adapted from social-media-skills v1.0.1 (skills/caption-writer, skills/hook-writer, skills/tiktok-video-publishing, skills/youtube-publishing-and-metadata, skills/youtube-shorts, skills/threads-post, skills/linkedin-post-writer, skills/pinterest-seo, skills/text-post-and-microblog, skills/x-growth) by Frank Heijdenrijk, MIT; condensed for creator-publish.

# Captions and hooks

A caption is not a description of the asset; it is the part of the post that does the work. Two rules run
through everything:

1. **The first line is the whole game.** Every platform truncates. If line one does not earn the "...more"
   tap inside the preview cutoff, nothing after it exists.
2. **Every caption serves one goal**, with exactly **one CTA** matched to it. Two asks split the action.

Before writing, read the project's brand/voice inputs; a clever line in the wrong voice still fails.

## Hooks: open a gap the content actually closes

A hook works by opening a gap (curiosity, tension, stakes, recognition) that the reader must keep going to
close. It is a **promise**: extract it from the strongest true element of the content (the most surprising
fact, the highest stakes, the most specific number, the sharpest point of view, the most relatable moment).
Never bolt on a hook the content cannot pay off; the bounce costs more reach than the tap earned.

### Mechanisms (generate across several, keep the best)

| Mechanism | Shape | Failure mode |
|---|---|---|
| Curiosity gap | "The reason this outperformed has nothing to do with the photo." | vague tease, no payoff |
| Contrarian | "Posting every day is hurting your account." | edgy for its own sake |
| Stakes / cost | "This one contract line cost us $40,000." | invented stakes |
| Specificity / number | "We deleted 80% of our features. Revenue went up." | fake precision |
| Identity / callout | "If you're a founder doing your own payroll, stop." | addressing "everyone" |
| In-media-res story | "It's 11pm and I'm refreshing Stripe again." | starting with backstory |
| Mistake | "I've been writing hooks wrong for three years." | negativity with no lesson |
| Transformation | "From 200 to 40,000 followers without posting daily." | reads as a scam |
| Question | "What's the one task you open 14 tabs to avoid?" | yes/no or generic |
| Timeliness | "Everyone's switching to X this week. Mostly hype." | fake urgency |
| Authority / proof | "After 1,000 of our posts, one pattern explained the top 5%." | vague authority |

Mechanism by goal: reach -> contrarian, story, relatable specificity; comments -> question, contrarian;
saves -> specificity, authority, mistake-lesson; conversion -> transformation, authority with real proof.

### Select

Draft 5-10 candidates across different mechanisms, score each 0-2 on **gap, specificity, truth, fit (inside
the cutoff), voice, pull**. **Truth and pull are pass/fail.** Offer 2-3 distinct options and recommend one
with a one-line reason tied to the goal.

Delete on sight: greetings ("Hey everyone", "Happy Monday"), throat-clearing ("In today's video..."),
describing the asset, leading with hashtags or @mentions, giving the payoff away in line one, "Agree?" bait.

### Hooks by format

| Format | Cutoff | Channels |
|---|---|---|
| Caption line 1 | ~125 chars Instagram, ~140 LinkedIn mobile, ~80 Facebook | text |
| Short video (Reels, TikTok, Shorts) | first 1-3 s | first frame + first spoken words + on-screen text, all working **muted** |
| Carousel / Photo Mode slide 1 | a glance | a few words + visual, legible at thumbnail size; promise the swipe |
| YouTube | title + thumbnail together | title tells, thumbnail shows; never repeat each other |
| Thread opener | the first post (<=280 on X) | promise the through-line |

## Caption frameworks

**Spine:** hook (line 1) -> body (pay off the promise) -> one CTA.

| Goal | Format that fits | CTA shape |
|---|---|---|
| Reach | story, relatable | "send this to someone who..." |
| Comments | hot take, question | "what would you add?" (a real question, never "comment YES") |
| Saves | value/how-to, list | "save this for your next..." |
| Clicks | tease value, withhold the full payoff | "full breakdown in bio / link below" (match the platform's link rule) |
| Community | behind-the-scenes, question | "tell me I'm not the only one" |
| Conversion | social proof, announcement (benefit-led) | "try it free" (only where honest) |

Other formats: carousel intro (pull into slide 1), announcement (lead with the benefit, never "thrilled to
announce"), testimonial (verifiable proof only). A resonant last line with no ask is a valid close for
high-authority voices.

Length follows platform and goal: short (1-3 lines) on X, Threads, Bluesky and TikTok; medium (3-6 short
paragraphs) on Instagram, LinkedIn, Facebook; long only when the first line earns it.

## Per-platform caption shape

Limits are approximate upstream figures; re-verify quarterly. Machine-readable limits: `platforms.json` (this folder).

| Platform | Limit | Preview cutoff | Shape | Links |
|---|---|---|---|---|
| Instagram | ~2,200 | ~125 chars | hook, body with line breaks, one CTA, 3-5 tags | not clickable: "link in bio" |
| TikTok | ~4,000 | first ~100-150 chars | **keyword-led**: primary search phrase first, then a value line, then secondary keywords + niche tags; mirror the keyword in on-screen text and first spoken line | bio |
| YouTube title | max 100 | ~40 chars on mobile | primary keyword in the first ~40 chars, ~50-60 total; rank + click; clarity over cleverness | - |
| YouTube description | max 5,000 | first ~150 chars / 2-3 lines | line 1 value, keyword in lines 2-3, 300-500 natural words, keyword-named chapters, 3-7 links with affiliate disclosure | clickable |
| YouTube Shorts | (same fields) | - | keyword-rich title for Shorts search; burned-in captions ~2 lines, 32-42 chars/line | description |
| LinkedIn | ~3,000 | ~140 mobile / ~210 desktop | hook, 1-2 line paragraphs for dwell, genuine question close; depth posts ~1,300-1,900 chars, takes <500 | body links suppress reach: first comment |
| X | 280 free (Premium up to 25,000) | - | the point first, cut the rest | inline |
| Threads | ~500 | - | take or question, 1-2 lines of context, a genuine reply prompt, one topic tag | inline (rewarded) |
| Bluesky | ~300 | - | lead with the point | inline |
| Facebook | ~63,206 | ~80 chars | short-medium, conversational | clickable |
| Pinterest | title <=100; description ~500 | - | title `[Primary keyword] \| [Benefit] \| [Context]`; description natural, keyword-rich, ~100-200 chars, no stuffing | destination link (<=2048) |

Platform notes that change the copy:

- **TikTok**: write for what people type (long-tail beats broad). Put **#ad / #sponsored at the start** of
  paid content.
- **TikTok Photo Mode**: caption = a question plus context (question in caption lifts comments; asking for
  likes backfires); overlay text on slides is indexed by search.
- **Instagram Reels**: keyword caption; hook in the first 3 s; burned-in captions inside the safe zone.
- **LinkedIn**: post from a person for thought leadership; no broetry (one dramatic fragment per line), no
  fabricated parables, no engagement bait; whitespace for readability only.
- **Threads**: conversation starter, not a broadcast; no press-release tone; the replies (a human job) win
  the reach.
- **Pinterest**: Pin -> Board -> Page reinforce the same keyword phrase; the page must deliver the pin's
  promise.
- **Disclosure**: AI-generated media and paid partnerships are disclosed per platform rules and the brand's
  compliance guardrails (YouTube Altered Content toggle for realistic AI; TikTok AI labels).

> **creator-publish note:** voice and brand inputs come from the project's brand files in the vault, not an
> upstream brand-profile skill. Sibling names (hook-writer, caption-writer, instagram-seo, thread-writer)
> are kept as plain text; this reference carries what the post recommender needs from them.
