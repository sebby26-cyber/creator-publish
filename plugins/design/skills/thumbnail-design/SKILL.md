---
name: thumbnail-design
description: "Design YouTube video thumbnails that earn the click (mobile-legible, one focal point, honest) and write the thumbnail BRIEF/SPEC: promise, concept, 0-4 words, contrast, safe zones, and the native A/B test plan, using the CLICK framework. Use when someone wants to design or brief a YouTube thumbnail, improve CTR, choose thumbnail text, or plan thumbnail A/B testing; also Shorts/Reel cover concepts. This skill writes the brief and a composition spec; rendering is done by compose:visual-composer (deterministic local) or canva:canva (cloud, editable); background/face imagery can come from an image generator first. The YouTube custom thumbnail is uploaded and A/B-tested natively in YouTube Studio. No clickbait, no unconsented real-person or deepfake faces, CTR never fabricated. Not for rendering pixels itself, and not for the video's title/description metadata."
---

> **creator-publish note (do this first):** if the request names a project (for example "for Harbor Bakery") or
> the person has a Creator Publish projects folder, your **first action** is to invoke the `publish-core:publish`
> skill, before reading further or building anything. It supplies the project's saved defaults and locked rules
> and the package `status.md` where you record `Choices in effect`, run notes and outputs. Skip it only for a
> one-off graphic with no project.

# thumbnail-design

A **design-craft skill** — write the promise, design the concept + text, produce the **brief**, and plan the
**A/B test**. The agent **designs + briefs + plans**; a **human or image tool makes the raster**; the
**YouTube thumbnail is uploaded + tested natively** (no publishing-tool field).

> **creator-publish note:** the upstream text names a specific publishing product here; in this library
> publishing/scheduling is a downstream step outside this skill (`post:post`, when requested). This
> skill also writes a composition spec, and the raster can be rendered by `compose:visual-composer`
> (deterministic local) or `canva:canva` (see the Render section below).

## The POV: a promise, not a poster — designed as a unit with the title
A thumbnail drives **~70–80% of click decisions**, and the viewer decides in **under a second** — so its job
is the **click that leads to a watch.** Two rules anchor everything: the **thumbnail + title are one unit**
(the thumbnail **shows**, the title **tells** — they never repeat), and it's a **promise, not a poster.**
That second rule is enforced by the platform: YouTube's native A/B test picks the winner by **watch-time
share, not raw CTR**, so a misleading high-click thumbnail **loses** to an honest one. Design for **mobile
first** — most viewing is on a phone, where simplicity and contrast win.

## Read these first
1. **brand-profile** — channel style/template (for consistency).
2. the **video and its title** (often from **youtube-publishing-and-metadata**/**youtube-long-form**/
   **youtube-shorts**).

> **creator-publish note:** brand-profile isn't in this library — use the project's brand inputs (palette,
> fonts, logo, voice) supplied by the caller or the project brand file; `design:design-and-templates` holds the
> reusable system. youtube-publishing-and-metadata, youtube-long-form and youtube-shorts are not in this
> library either; the video and title are supplied by the caller.

## The framework: CLICK
(Depth: `references/the-click-framework.md`.)
- **C — Clarify the promise:** one-sentence promise; thumbnail + title as a unit (show vs tell, never
  repeat); promise not poster.
- **L — Lead with one focal point:** one/two hero elements, minimal background, parseable in <1s; one
  directional element.
- **I — Invoke genuine emotion:** expressive genuine face + gaze if it adds context (skip it otherwise);
  match the expression to the content.
- **C — Contrast + concise text:** complementary high contrast (avoid YouTube red/white, 60-30-10, B&W
  test, light+dark); 0–4 bold sans-serif words + outline, not a title duplicate; mobile-legible at ~168×94;
  safe zones; 1280×720, 16:9.
- **K — Keep testing:** 3 meaningfully-different concepts, one variable; native Test & Compare picks by
  watch-time share (not Shorts, needs traffic); a human uploads + runs it; keep a log; brand-consistent
  template.

## The reality (verify-quarterly)
Promise-not-poster + thumbnail+title-as-unit + watch-time A/B punishes clickbait; the three principles
(simplicity/contrast/emotion); faces (+20–30%, genuine, gaze, unknown-face-can-hurt); contrast/color
(complementary, avoid YT red/white, 60-30-10, B&W test); text (0–4 words, bold sans-serif, no title
duplicate); mobile-first + safe zones + specs (1280×720; 50MB cap since early 2026); brand consistency; native
Test & Compare (watch-time-share winner, also tests titles/combos, not Shorts, traffic-dependent):
`references/thumbnail-2026-reality.md`.
The promise template, design checklist, spec block, A/B plan + worked examples:
`references/design-and-test-recipes.md`.

## Render with visual-composer (creator-publish addition)
The brief becomes a visual-composer (`compose:visual-composer`) composition spec
(`compose:visual-composer`; layer and error reference:
`compose:visual-composer`, `references/composition-rules.md`).
- **Canvas:** YouTube thumbnail **1280x720**; Shorts / Reel cover **1080x1920** (keep the subject and words in
  the centre band; the cover itself is set at publish time, downstream).
- **Layers bottom to top:** background (gradient or the supplied hero/face photo as an `image` layer with
  `fit: "cover"`), a scrim `gradient` where text sits on a photo, the hero element, a directional element,
  then the 2-4 word headline in **Anton** (uppercase, `lineHeight` ~1.0, dark `stroke` for the outline).
  Keep the **bottom-right ~180x80 px** (duration badge) and the bottom 15% free of anything critical.
- **Imagery:** the background/face image can come from the optional `higgsfield-youtube-thumbnail` skill if
  it is installed (otherwise from the `image-gen:*` skills, with the prompt written directly from the provider's
  tool schema); a prompt sent to Higgsfield follows the optional `higgsfield` prompting skill
  if it is installed (otherwise write the prompt directly, taking parameters and aspect ratios from the provider's tool schema, never invented). The generated file is then composited here as an `image` layer; this skill never
  invents or fakes a real person's face.
- **Run:** `validate spec.json --out /abs/out.png`, then `render spec.json --out /abs/out.png --preview` (exact commands: the `compose:visual-composer` skill; Claude Desktop: the
  `visual_composer_validate` / `visual_composer_render` MCP tools). Inspect the preview at full size **and**
  shrunk to ~168x94; fix and re-render. For 3 A/B variants, write 3 specs that differ in one variable.
- **Alternative:** `canva:canva` when the owner wants a cloud, editable design instead of a deterministic file.

Minimal example (vector stand-in for the hero; in production a supplied photo goes in as an `image` layer
above the background). Same content as `examples/thumbnail.json`:

```json
{
 "version": 1,
 "name": "thumbnail",
 "description": "YouTube thumbnail, 1280x720. Vector stand-in: in production a supplied face/hero photo goes in as an image layer (fit cover) above the background. Bottom-right timestamp corner left clear.",
 "canvas": { "width": 1280, "height": 720, "background": { "type": "linear", "angle": 135, "stops": [ { "offset": 0, "color": "#141a3a" }, { "offset": 1, "color": "#05060f" } ] } },
 "output": { "path": "thumbnail.png" },
 "layers": [
  { "id": "glow", "type": "shape", "shape": "circle", "x": 700, "y": 40, "width": 560, "height": 560, "fill": { "type": "radial", "stops": [ { "offset": 0, "color": "rgba(124,92,255,0.55)" }, { "offset": 1, "color": "rgba(124,92,255,0)" } ] } },
  { "id": "hero-card", "type": "shape", "shape": "rect", "x": 780, "y": 130, "width": 400, "height": 400, "radius": 28, "fill": "#f4f1ea", "rotate": 6 },
  { "id": "hero-bar-1", "type": "shape", "shape": "rect", "x": 830, "y": 200, "width": 300, "height": 36, "radius": 8, "fill": "#7c5cff", "rotate": 6 },
  { "id": "hero-bar-2", "type": "shape", "shape": "rect", "x": 830, "y": 270, "width": 220, "height": 36, "radius": 8, "fill": "#c9c3f5", "rotate": 6 },
  { "id": "hero-bar-3", "type": "shape", "shape": "rect", "x": 830, "y": 340, "width": 260, "height": 36, "radius": 8, "fill": "#c9c3f5", "rotate": 6 },
  { "id": "arrow", "type": "shape", "shape": "polygon", "points": [ [655, 340], [715, 340], [715, 305], [775, 355], [715, 405], [715, 370], [655, 370] ], "fill": "#ffd23f" },
  { "id": "headline", "type": "text", "text": "20 MIN\nSETUP", "font": { "family": "Anton" }, "size": 205, "minSize": 120, "lineHeight": 0.98, "transform": "uppercase", "color": "#ffd23f", "stroke": { "color": "#000000", "width": 8 }, "x": 70, "y": 90, "width": 580, "height": 520, "valign": "middle" }
 ]
}
```

## Honest scope (never violate)
- **The agent** writes the promise/concept/text/**brief** and can **critique a mockup** — but a **HUMAN or
  image tool** (`nano-banana`/`ideogram`/Canva/a designer) **creates the final raster.**
- **The YouTube custom thumbnail is uploaded NATIVELY in Studio** — and
  **Test & Compare is native** (a human uploads + runs it). **TikTok/IG-Reel covers** are different: those
  use **the publishing step's `cover` field** via `tiktok-video-publishing`/the IG skill.
- **No clickbait** (the thumbnail must keep the promise — the watch-time test punishes deception); **no
  unconsented real-person/deepfake faces**; **never fabricate a CTR** (real testing/native analytics only).
  (Scope, distinctions + connections: `references/scope-and-connections.md`.)

> **creator-publish note:** the agent also writes the composition spec; the raster can be rendered by
> `compose:visual-composer`, `canva:canva`, an image tool (`image-gen:nano-banana` / `image-gen:ideogram` for
> imagery) or a designer, and a **human approves** it. Publishing/scheduling (incl. any Shorts/Reel cover
> field) is a downstream step outside this skill (`post:post`, when requested);
> tiktok-video-publishing is not in this library.

## Distinct from its siblings (route correctly)
**thumbnail-design (this)** = the thumbnail design craft + brief + A/B plan · **youtube-publishing-and-
metadata** = the title/description/tags metadata (points HERE for the thumbnail) · **nano-banana**/**ideogram** =
generate the raster this briefs · **tiktok-video-publishing** = the TikTok `cover` field · **hook-writer**/
**caption-writer** = text lines.

> **creator-publish note:** in this library the IDs are `design:thumbnail-design`, `image-gen:nano-banana`,
> `image-gen:ideogram`; the optional `higgsfield-youtube-thumbnail` skill, if installed, can also generate imagery this
> briefs, and `compose:visual-composer` renders the spec. youtube-publishing-and-metadata,
> tiktok-video-publishing, hook-writer and caption-writer are not in this library.

## Where this connects
Reads first: **brand-profile** + the **video/title** (**youtube-publishing-and-metadata**/**youtube-long-
form**/**youtube-shorts**). Pairs with: **nano-banana**/**ideogram** (render the brief), **hook-writer** (the
thumbnail words), **youtube-publishing-and-metadata** (title as a unit with the thumbnail),
**experimentation** (A/B discipline), **competitor-analysis** (preview against ranking thumbnails). Hands to:
a **human** to render + **upload the YouTube thumbnail natively** + run **Test & Compare**;
**analytics-and-reporting** reads CTR/watch-time back. The raster, native upload, and native A/B test stay
outside the publishing step.

> **creator-publish note:** in this library: Pairs with `image-gen:image-prompt` / `image-gen:nano-banana` /
> `image-gen:ideogram` (imagery from the brief). Hands to `compose:visual-composer` to render, then a human
> uploads natively + runs Test & Compare; CTR/watch-time are read back from YouTube Studio analytics. The
> other named skills (experimentation, competitor-analysis, analytics-and-reporting, hook-writer,
> youtube-*) are not in this library. The upstream last sentence names a publishing product; here it is the
> downstream publishing step.

## Definition of done
A one-sentence promise written and the thumbnail designed as a unit with the title (show vs tell, no
repetition); one focal point with minimal background; a genuine face + gaze where it adds context (or none);
high contrast (complementary, not YouTube red/white, 60-30-10, passes the B&W test) legible in light and dark;
0–4 bold words with an outline that don't duplicate the title; mobile-legible at ~168×94 with safe zones and
1280×720 specs; an A/B plan of 3 meaningfully-different concepts changing one variable, scored natively by
watch-time share; the raster left to an image tool/designer and the YouTube upload + test left to native
Studio; no clickbait, no unconsented faces, no fabricated CTR; correctly distinguished from
youtube-publishing-and-metadata and nano-banana/ideogram.

> **creator-publish note:** also done here: a composition spec that validates (`compose:visual-composer`
> `validate`), when the raster is rendered with `compose:visual-composer`.

## Selected thumbnail variants (creator-publish addition)
Use the selected video/title or brief, not invented source content. The LLM can coordinate the entire asset task:
brief -> frame/photo selection or needed imagery generation -> saved composition/design -> reviewed export.
ffmpeg can extract candidate frames (the `publish` skill has the tested command); inspect and record the selected exact frame/timecode. Keep selected
imagery when revising headline/layout. Suggest A/B concepts when useful, but generate only the requested batch;
asset creation does not authorize native upload or testing. Native platform capabilities/specs in references
are snapshots to verify before actual upload. Final promotion uses exact selected drafts and records whether
it re-renders the layout, enhances an image or regenerates it.

## Run it (creator-publish addition)

`publish` coordinates this skill directly using the project's brand/rules, package status, selected source assets
and requested formats. This skill writes the design brief and, when local composition is selected, its
composition spec. Capture exact copy/data, concept/variant identity, references, dimensions and review state.
The LLM identifies missing imagery and hands only that work to the selected image skill.

Render through the selected `compose:visual-composer` or `canva:canva` route; preserve tool/model/template choices.
For local work, run the `compose:visual-composer` commands (validate, then render) on the saved spec. Validate and inspect the actual export, including mobile legibility, safe areas and crop. Record
selected draft/spec/asset IDs, defects and next action in package status. Revisions change only affected sources
and exports; final promotion distinguishes layout re-render, enhancement and regeneration. Missing connections
are reported rather than triggering an automatic tool substitution. Existing owner review/spending rules apply.

## Provenance (creator-publish addition)
Adapted from social-media-skills v1.0.1 (github.com/social-media-skills/skills, MIT, Frank Heijdenrijk);
licence: [LICENSE.social-media-skills](../../LICENSE.social-media-skills); see the repo NOTICE.md.
