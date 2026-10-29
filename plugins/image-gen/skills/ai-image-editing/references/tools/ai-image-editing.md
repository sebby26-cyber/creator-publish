# AI image editing — integration & engine guide

**What it is:** the edit-routing layer of the stack — inpainting, background removal, upscaling, expand,
restoration — mapped task-first to the right engine. **The engines edit; the human judges at 100%; the downstream publishing step
publishes.** Skill: `skills/ai-image-editing/`. Engines shift per release — **verify-quarterly**; test on your
own images, not benchmarks.

> **creator-publish note:** This is the upstream integration guide, kept verbatim. In this library the skill is
> `image-gen:ai-image-editing` (`../../SKILL.md`); publishing/scheduling is a downstream step outside this skill
> (a future creator-publish posting skill).

## Routes in this library (creator-publish addition)

Guidance-only; this skill names them, the tools run them. Equal choices: use whichever the person has connected.

| Route | Tasks | How |
|---|---|---|
| Higgsfield `remove_background` | background removal | Higgsfield MCP/CLI |
| Higgsfield `upscale_image` | upscaling | Higgsfield MCP/CLI; confirm faithful vs creative mode in the provider's docs |
| Higgsfield `outpaint_image`, FLUX.2 Pro Outpaint | extend / aspect-ratio expand | Higgsfield or the BFL API; `expand_*` params from the provider's schema |
| Nano Banana editing / masked inpaint, Flux Kontext | inpaint, object removal/replace, instruction edits | Gemini API, BFL API or Higgsfield; parameters from the provider's schema (for Higgsfield, the optional `higgsfield` skill if installed) |
| OpenAI image edits | restyle / edit from a reference image | OpenAI `/v1/images/edits` (the optional `openai-image` skill's `--input` mode if installed); check billing |
| Canva remove-background | background removal inside a Canva design | Canva connector via `canva:canva` |

## The engine map (route by task; verify terms per engine)
| Engine | Lane | Connection | The routing fact |
|---|---|---|---|
| FLUX Kontext / FLUX.1 Fill | complex-mask inpainting, expand, text edits | BFL/fal/Replicate APIs (see flux.md) | best raw quality on large/irregular masks; outputs-vs-service license line applies |
| Adobe Firefly Generative Fill | client/agency deliverables | Firefly API / Photoshop | trained exclusively on licensed content → **IP indemnification** |
| nano-banana (Gemini-class) | conversational multi-step edits | see nano-banana.md | iterate by instruction |
| Canva Magic Eraser/Expand/Grab | quick fixes inside designs | Canva MCP/Connect (see canva.md) | already in the workflow; don't leave it for small jobs |
| Claid-class product tools | e-commerce batch bg-removal/cleanup | vendor APIs | consistent specs across 80-image sets |
| Topaz Gigapixel / Photo AI | **faithful** upscaling, restoration, face recovery | desktop (local processing = privacy) | preserves what's there — the accuracy lane |
| Magnific (Freepik rebranded as Magnific, Apr 2026) | **creative** upscaling — art/renders only | web/API | *hallucinates* detail by design; never products/documents |
| Clipdrop (Stability → Jasper) | bundled utilities (bg, inpaint, denoise) | web/API | breadth over per-task peak quality |

> **creator-publish note:** Connections in this library: FLUX Kontext / FLUX.1 Fill → BFL/fal/Replicate APIs (the
> person's keys) or Higgsfield (the flux guide is `image-gen:flux`'s references/tools/flux.md); nano-banana → the
> Gemini API or Higgsfield (guide in `image-gen:nano-banana`'s references/tools/nano-banana.md);
> Canva → the Canva connector via `canva:canva` (guide in its references/tools/canva.md). Firefly, Claid, Topaz,
> Magnific and Clipdrop are not connected here (exact human steps only).

## The canonical chain (order matters)
Best source (reshoot beats repair) → repairs/inpainting at native res (upscale FIRST if the source is low-res)
→ background/object edits → **then** upscale (faithful for real photos; creative for art) → master as
**PNG/TIFF** → platform derivatives → `scheduling-and-queue` → **the downstream publishing step** (upload media → attach → validate → create post).
The publishing step does not edit, upscale, or remove backgrounds.

> **creator-publish note:** Publishing/scheduling is a downstream step outside this skill (a future
> creator-publish posting skill); `scheduling-and-queue` is not in this library.

## The honesty gates (the reason this file exists)
- **The upscaler split:** creative/diffusion upscalers **invent detail that wasn't in the original** — a
  misrepresentation engine if pointed at products, documents, or evidence. Faithful mode + low creativity for
  anything accuracy-critical; in-image text re-typeset, never upscaled.
- **An edited real photo is an edited claim:** no defect concealment (FTC net-impression); results/comparison
  imagery obeys `before-after-and-transformation`'s rules.

> **creator-publish note:** before-after-and-transformation isn't in this library; apply the FTC before/after
> claim rules directly.

- **People:** commercial body-shape retouching is **label-required** in several markets (France's retouch
  decree; Norway's Marketing Act incl. influencer posts; Israel's 2012 law — verify per market); face
  enhancement on real people stays conservative (identity drift); consent for edits to others' images.
- **Provenance:** no watermark removal, no metadata stripping; AI-disclosure where platform/region requires
  (EU AI Act); source-image license confirmed before editing.

## QA card (run at 100% zoom before anything ships)
Edges/halos · light + shadow direction · perspective/scale of replacements · faces (eyes/teeth/skin) ·
in-image text · batch consistency · identity vs the original on face work · provenance intact · disclosure
applied.

## Hard lines
Human judges every result · task defines the tool · faithful upscaling for accuracy-critical images · no
defect concealment, undisclosed body retouching, watermark removal, or provenance stripping · conservative
face work on real people (the person who knew them judges likeness) · never state an engine capability or term
as fact without verification · the publishing step does not edit images.

> **creator-publish note:** Also: Higgsfield edit prompts use the optional `higgsfield` skill's method if installed (otherwise the provider's tool schema).
