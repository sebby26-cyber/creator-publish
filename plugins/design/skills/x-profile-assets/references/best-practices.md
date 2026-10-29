# X profile and post assets: best practices

Practical rules for the header, profile photo and post images, each with where it comes from. "X" means X's own
pages (see `x-specs.md` for URLs and snapshot dates); anything else is named. Where X gives no rule, the rule
here is a working practice and says so.

## 1. Legibility at small sizes
- **The profile photo is seen at about 40 px** in the timeline (unverified display size). One bold mark, no
  words, no thin lines. Check it at 40 px on all three themes (Default white, Dim navy, Lights out black): an
  edge that vanishes on black or white needs a ring or a contrasting disc.
  Source: X business basics, "Choose an image that is recognizable to your brand"; the 40 px check is a working
  practice.
- **The header is seen at about 390-600 px wide** on phones and in the web column. Text below about 40 px tall
  at 1500 wide becomes unreadable on a phone. Keep header text to the name and one short line, or none.
  Source: working practice (the header is shown at 3:1 in a column 390-600 px wide).
- **Post images are seen at about 500 px wide in the feed.** Words on an image should be few and large; X itself
  advises to "Avoid images with heavy text". Source: X organic best practices.

## 2. Header safe zones
- **Top and bottom 60 px may be cropped** (official). Keep text and key subjects in y 80-420 at 1500 x 500.
- **The profile photo covers the lower-left** of the header (unverified figure): keep x 0-400, y 300-500 free
  of text and faces. Put the subject on the right or centre.
- **The apps draw back, search and more buttons over the top corners** (unverified): keep 120 px corners clear.
- Working text-safe box: **x 420-1440, y 80-420**. Always render `previews/header-safe-areas.png` and the
  desktop and phone profile mock-ups and look at them.
- "Use it like a billboard to share what's new or timely" (X business basics): the header may change with a
  season or launch, but the profile photo should stay stable so people recognise the account.

## 3. Consistent with the YouTube (and podcast) branding, not a copy of it
- **Same identity:** the same profile mark (or a variant made for the circle at 40 px), the same palette, the same
  fonts and the same tagline wording as the YouTube channel. People who follow from YouTube should know at once
  that it is the same show.
- **Native layout:** do not downscale or letterbox the 2560 x 1440 YouTube banner into 1500 x 500. Its safe
  area (1546 x 423) is a different shape, and its text would land under the X avatar or be cropped. Re-compose
  from the same source art (the banner's source image, an episode still, the brand pattern) at 3:1.
- **Handles:** list a handle only if the owner's records confirm it. If the YouTube and X handles differ (or a
  record disagrees), flag it; never "fix" a handle silently.
- Source: working practice; YouTube's banner spec is in `design:youtube-channel-assets`.

## 4. Alt text
- Write alt text for **every** image in every post, including the pinned post (X: up to 1,000 characters,
  "+Alt" on mobile, "Add description" on web).
- Describe what is in the image and why it is there, in one or two plain sentences (usually under 250
  characters). Include any words that appear in the image. Do not start with "Image of".
- Do not stuff hashtags or keywords into alt text. It is read aloud by screen readers.
- Source: X image-descriptions pages; W3C WAI images tutorial, <https://www.w3.org/WAI/tutorials/images/>.

## 5. No misleading imagery
- The image must match what the link or video actually contains: no thumbnails of scenes that are not in the
  episode, no fake "LIVE" or "BREAKING" badges, no fake play buttons on still images, no fake notification
  badges or UI.
- No other show's or person's branding, face or logo, and no look-alike of another account (X Authenticity
  policy: impersonation and deceptive identities).
- Do not imply endorsement or a partnership that does not exist.
- Source: X Authenticity policy and X Rules.

## 6. AI-content labelling
- If narration, voices or visuals are AI-generated, say so where X readers see it: in the bio (for example
  "Narrated by AI") and in each post that carries AI imagery or audio. X has no dedicated AI toggle for organic
  posts (unverified); it "may label posts containing synthetic and manipulated media" (X Rules).
- Never use an AI-generated human face as the profile photo of an account that presents as a real person (X
  Authenticity policy: "AI-generated profile photos ... for the purpose of deceiving others").
- Keep the wording consistent with the YouTube altered-content setting and the episode descriptions.
- Realistic AI depictions of real places or events (a real city under a fake sky) need the label in the post
  text, not only in the bio.

## 7. Post cadence and pinned-post conventions
- **Cadence:** X says "Post consistently" and to schedule posts and use day-of-week themes (X business basics,
  organic best practices). X gives no number. Use the owner's own plan when it exists; otherwise start with a
  fixed weekly rhythm built around each episode (an announcement on release day, one or two follow-up posts that
  stand on their own) and review after four weeks. Never post in bursts, and never post to fill a slot.
- **Timing:** third-party data only (Sprout Social 2026: weekdays 12-6 p.m. local,
  <https://sproutsocial.com/insights/best-times-to-post-on-twitter/>). The owner's own analytics win over any
  benchmark; small samples are directional only.
- **Video:** X advises short videos ("Keep videos to 15 seconds or less" for ads-style clips). For a show, a
  native clip (uploaded to X) usually reads better in the feed than a bare link.
- **Pinned post:** pin one post that a new visitor should see first. For a show: the latest episode (image or
  clip + one-line promise + link) or an evergreen "start here" post. Refresh it when a new episode ships; keep
  the pinned image legible at feed size, with alt text. Only one post can be pinned (implied by X's wording).
- **Links:** a post with a link shows the linked page's card. For YouTube, that is the video thumbnail, so the
  thumbnail must be final before the post goes out.

## 8. Do / don't checklist (template)

Copy into the X copy doc and tick per post. Replace the bracketed parts with the project's facts.

| | Do | Don't |
|---|---|---|
| Profile | Same mark as [YouTube]; checked at 40 px on white, navy and black | Small text, thin lines, a mark that vanishes on one theme |
| Header | Text inside x 420-1440, y 80-420; subject clear of the avatar box | Downscale the YouTube banner; put text under the avatar or in the top/bottom 60 px |
| Bio | Under 160 characters; what the show is, who it is for, AI disclosure if any | Unconfirmed schedule, follower claims, hashtag stuffing |
| Post image | 16:9 or 1:1 inside 2:1-3:4; few, large words; subject in the centre half | Heavy text, fake UI, fake badges, a scene that is not in the episode |
| Alt text | Every image; what it shows, words in it; under about 250 characters | Empty, "image", keyword or hashtag stuffing |
| Video | Native MP4, under 140 s, captions burned in or attached | A bare link where a clip would serve better; a loud first second |
| AI | Disclose AI voice or visuals in the bio and the post | Present AI imagery as real footage or a real person |
| Links | Thumbnail final before posting; link checked | Link to a private or unlisted video by mistake |
| Pinned | The latest episode or a start-here post, refreshed on release | A stale pin, a pin with no alt text |
| Cadence | The owner's rhythm; reply to genuine comments | Bursts, engagement bait, follow-for-follow |
| Posting | Owner's explicit OK per post via `post:post` | Posting, scheduling or changing the profile from this skill |
