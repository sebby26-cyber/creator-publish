# Text rendering, transparency & social recipes

How to use Ideogram's defining strength — **legible in-image text** — plus transparency, resolution,
and the common social jobs.

> Re-verify feature/limit specifics quarterly.

## The text-rendering superpower
Ideogram leads on in-image typography (~0.97 English OCR; the best of any open-weight model at its
size), with multilingual support, multi-line text, varied font weights, and reliable handling of
logos, signage, captions, and watermarks. To get the most out of it:
- Put the **exact words** in a typed text element; give the **styling** separately (font feel, weight,
  case, color).
- Keep each line **short**; specify **hierarchy** (hero vs support).
- **Always review** the render — even at 0.97, dense or complex typography can slip a character.

## Transparency & resolution
- **Background Remover** → a clean **alpha cutout** from any 4.0 output (logos, stickers, icons drop
  onto new backdrops without masking). **Layerize Text** (live, **beta**; all plans + an API endpoint)
  extracts rendered text as **editable layers** (string, font, color, position) — rewrite/restyle/
  localize copy without regenerating. Works best on clear, straight standard typography; curved or
  decorative text may not be detected.
- Native **2K (2048px)**; any aspect ratio **256–2048, multiples of 16**. Pick the social ratio up
  front (4:5 / 9:16 / 1:1).

## Social recipes (ground in brand-profile; verify text + disclose before publishing)
- **Quote / stat card:** hero line + small attribution; brand palette; lots of negative space. 4:5.
- **Carousel cover:** bold title element + subtle index ("1/7"); consistent template across slides
  (lock the JSON, swap strings). → pairs with `carousel-writer`.
- **Logo / wordmark concept:** typed wordmark + simple mark; export via Background Remover for
  transparency. (Concept exploration — not a final trademarked identity.)
- **Ad with headline + offer:** headline element + product + small legal/disclosure; verify any claim.
- **Poster / event:** title, date, venue as distinct typed elements with bounding boxes; signage feel.

> **creator-publish note:** brand-profile isn't in this library — use the project's brand inputs (palette, fonts, logo, voice).
> For exact quotes in brand fonts, compose instead: `design:quote-cards-and-text-graphics` →
> `compose:visual-composer`. carousel-writer is not in this library (slide copy comes from the caller).

## Worked recipe — quote card (brand: calm SaaS, terminal-green accent)
```
JSON: off-white bg; palette ["#0B0B0B","#F4F4F0","#1FAA59"];
  text "Post less. Reach more." (bold geometric sans, near-black, top-left box);
  text "a weekly batch beats daily scrambling" (light grey sans, lower box);
  aspect 4:5, 2K.
REVIEW: confirm both lines render exactly. DISCLOSURE: AI-generated label on publish.
```

## Ship it
Generate per `references/tools/ideogram.md` → **upload the image to Media → attach to the
post** via `scheduling-and-queue`. The publishing step publishes; it does **not** generate images. Motion
version of a still → `veo-3` (image-to-video). Router: `image-prompt`.

> **creator-publish note:** publishing/scheduling is a downstream step outside this skill (a future creator-publish posting
> skill); scheduling-and-queue is not in this library.
> veo-3 is not in this library (a motion version is a separate video-generation step). The owner's Ideogram
> key is required; exact copy can be composited in `compose:visual-composer`. Router here:
> `image-gen:image-prompt`.

