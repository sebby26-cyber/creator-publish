# Scope, distinctions + connections

thumbnail-design is a **design-craft skill** — it writes the promise, designs the concept + text, produces
the **brief**, and plans the **A/B test**. The agent **designs + briefs + critiques + plans**; a **human or
image tool makes the raster**; the **YouTube thumbnail is uploaded + tested natively** (no publishing-tool field).

> **creator-publish note:** the upstream text names a specific publishing product here; in this library publishing/scheduling is a
> downstream step outside this skill (a future creator-publish posting skill). This skill also writes a
> composition spec; the raster is rendered by `compose:visual-composer` (or `canva:canva`, an image tool or a
> designer).

## Honest scope (never violate)
- **The agent** writes the **promise**, the **concept**, the **text**, and the **design brief**, and can
  **critique a mockup** — but a **HUMAN or an image/design tool** (`nano-banana`/`ideogram`/Canva/a designer)
  **creates the final raster.** The agent doesn't render the pixels.

> **creator-publish note:** pixels come from `compose:visual-composer` (deterministic local render), `canva:canva`, an image
> tool (`image-gen:nano-banana` / `image-gen:ideogram`, or the optional `higgsfield-youtube-thumbnail` skill if
> installed, for the background/face image; without it, write the prompt directly from the provider's tool schema) or a designer; the agent writes the composition spec; a **human approves.**

- **The YouTube custom thumbnail is uploaded NATIVELY in YouTube Studio** — and **Test & Compare is native** (a scheduler can't run it). The agent plans the test; a **human
  uploads + runs** it.
- **TikTok / IG-Reel covers are different:** those are a frame/card set via **the publishing step's `cover` field**,
  owned by `tiktok-video-publishing` / the IG format skill — not this skill's native-upload path.

> **creator-publish note:** Shorts / Reel covers are a frame or card (1080x1920) set at publish time. tiktok-video-publishing is
> not in this library; publishing/scheduling is a downstream step outside this skill.

- **No clickbait** — the thumbnail must keep the video's promise (the watch-time A/B test punishes
  deception). **No unconsented real-person faces or deepfakes.** **Never fabricate a CTR** — real testing/
  native analytics only. **Verify-quarterly** (specs + features move).

## Distinct from its siblings
- **thumbnail-design (this)** — the **thumbnail design craft + brief + A/B plan.**
- **youtube-publishing-and-metadata** — the **title/description/tags/category metadata**; it **points here**
  for the thumbnail (which it can't set via the API).
- **nano-banana** / **ideogram** — **generate the raster** this skill briefs (ideogram especially for in-image
  text).

> **creator-publish note:** in this library the IDs are `design:thumbnail-design`, `image-gen:nano-banana`,
> `image-gen:ideogram`; a Higgsfield prompt follows the optional `higgsfield` prompting skill if it is installed, otherwise it is written
> directly from the provider's tool schema.
> `compose:visual-composer` renders the spec deterministically (exact pixels, local).
> youtube-publishing-and-metadata, tiktok-video-publishing, hook-writer and caption-writer are not in this
> library (the video's metadata is a separate publishing step).

- **tiktok-video-publishing** — owns the **TikTok `cover` field** (a video frame, not a designed YouTube
  thumbnail).
- **hook-writer** / **caption-writer** — supply **text lines**; this skill decides the thumbnail's words +
  composition.

## Where this connects
- **Reads first:** `brand-profile` (style/template) + the **video and its title** (often from
  `youtube-publishing-and-metadata` / `youtube-long-form` / `youtube-shorts`).

> **creator-publish note:** brand-profile isn't in this library — use the project's brand inputs (palette, fonts, logo, voice).
> The video and title are supplied by the caller; the youtube-* skills are not in this library.

- **Pairs with:** `nano-banana`/`ideogram` (render the brief), `hook-writer` (the thumbnail words),
  `youtube-publishing-and-metadata` (title designed as a unit with the thumbnail), `experimentation-and-ab-testing` (the
  A/B discipline), `competitor-analysis` (preview against ranking thumbnails for the keyword).
- **Hands to:** a **human** to render (or an image tool), **upload the YouTube thumbnail natively**, and run
  **Test & Compare**; `analytics-and-reporting` reads CTR/watch-time back. **The raster, the native upload,
  and the native A/B test stay outside the publishing step.**

> **creator-publish note:** in this library: pairs with `image-gen:nano-banana` / `image-gen:ideogram` (imagery from the
> brief); hands to `compose:visual-composer` to render, then a human uploads natively and runs Test & Compare;
> CTR/watch-time are read back from YouTube Studio analytics. hook-writer, experimentation-and-ab-testing,
> competitor-analysis and analytics-and-reporting are not in this library. The upstream text names a specific
> publishing product in the last sentence.

