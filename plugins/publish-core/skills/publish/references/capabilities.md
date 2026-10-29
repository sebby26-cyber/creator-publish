# Capabilities briefing (what to tell the user)

Read this when someone asks "what can you do?", "how does this work?", "set up", or is using Creator Publish for
the first time. Say it in your own words and keep it short: about ten lines unless they ask for more. Lead with
what they can make, not with how the plugins are organised. Don't recite file paths or skill names.

## What it can do

Turns a finished video, photo or idea into publish-ready graphics and posts:

| They want | What happens |
|---|---|
| A YouTube thumbnail, cover or banner | A brief with the exact title and layout, then a rendered image at exact pixel size. A real frame can be grabbed from their video. |
| YouTube channel art and setup | Banner, profile picture and watermark at YouTube's sizes with TV, desktop and mobile previews; an end-screen guide placed over the video's real outro; a channel-copy doc with the upload checklist. Uploading stays with them. |
| Apple Podcasts show art and setup | Two 3000 px show covers checked at small sizes on dark and light, text-free episode art, and a show-copy doc with Apple's title, category, explicit and AI-disclosure rules and the per-episode checklist. Submitting the feed stays with them. |
| Spotify show art and setup | The feed's square cover reused (or made) and checked at small sizes on dark and light, a 1920x1080 thumbnail for video episodes, and a show-copy doc with Spotify's specs, chapter format, trailer and per-episode checklist. Hosting, claiming and publishing stay with them. |
| X (Twitter) profile and post images | A 1500x500 header checked against X's crop bands and the profile-photo overlap, a profile photo checked at small size on X's light, dim and dark themes, pinned-post and post images, and an X copy doc with bio, alt text, launch-post draft and per-post checklist. Posting stays with them. |
| Quote cards, stat cards, infographics, Pinterest pins | Designed from their brand colours and fonts and rendered locally, so text is exact and the same spec gives the same pixels. |
| New imagery (backgrounds, scenes, edits) | A well-written prompt for the tool they choose (Nano Banana, FLUX, Ideogram, others) and, with their OK, the generation itself. Also background removal, upscale, extend. |
| An editable cloud design | Built in Canva through their Canva connector. |
| Captions, titles, hashtags per platform | A native draft for each platform, checked against that platform's size and length limits. |
| Posting or scheduling | Only after they approve each post. |

Everything is recorded in a package folder with a `status.md` (the media files themselves live in a media folder
you choose once), so work can be resumed ("keep version two, change
only the title").

## Example requests to offer

- "Make three thumbnail drafts for this video, bold title *I Tried It for 30 Days*."
- "Make a 1080x1350 quote card that says *Ship small, ship often.* in my brand colours."
- "Use Nano Banana Pro for the background; keep the brand colours."
- "Set up my YouTube channel art and the end screen for episode 3."
- "Make the Apple Podcasts cover and show listing, same look as my YouTube channel."
- "Get the show ready for Spotify, with video episodes."
- "Make my X header and pinned post to match the YouTube channel."
- "Keep version two, change only the headline."
- "Recommend captions for YouTube and TikTok."
- "What defaults does this project use?" and "Make Nano Banana Pro the default."

## Approvals and spending

- Anything that costs money (generation, edits, upscaling) is confirmed first, with the price when it can be
  checked. A project can set spend ceilings and can allow paid steps without asking, but only when the price is
  known and under the ceilings. An unknown price is never treated as free.
- **Posting always needs a yes for each post**, showing what (file and caption), where (platform and account)
  and when. Making graphics never counts as permission to post.
- "Make X the default" saves a choice to the project; "just this time" does not. Nothing else changes saved
  defaults.
- The agent installs missing tools itself and asks first only for `sudo`, global installs and writes outside the
  project folder.

## What the user has to do

- Pick where their projects folder lives (first run only).
- Sign in to and approve any connectors they want (Higgsfield, Canva, WoopSocial), and create API keys for any
  direct providers. The agent can't do those.
- Supply their own assets (logos, photos, fonts, video). Nothing is invented: a missing logo, face or source
  copy is asked for, not made up.
- Approve each post and any paid step.

## Honest limits

- Local rendering only places things that exist: it does not generate images. Generation needs a connector or key
  and costs money.
- Bundled fonts are Anton, Inter (400/700) and DejaVu Sans; other fonts need a font folder. A missing font stops
  the render rather than being swapped.
- Not supported (refused with a clear error, never approximated): HSL blend modes, colour emoji, complex scripts
  that need shaping (Arabic, Hebrew, Indic, Thai), remote image URLs.
- Platform size and length limits are snapshots and are re-checked before a real upload. Contrast checks are a
  heuristic warning.
- No analytics: it can't tell how a post performed.
- A cloud or sandboxed session may not reach the internet or the user's own folders; say so and ask for the file.
- Needs Node 20.9+ for rendering and ffmpeg for video. The agent checks and offers to install them.

## Ending the tour

Finish with a single next step: if the projects folder is not set, ask where it should live (see `first-run.md`);
otherwise offer to make something, using one of the example requests.
