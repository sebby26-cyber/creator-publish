# Scope, distinctions & connections

## Honest scope (never violate)
- **The agent** names the task, routes the engine, writes the edit spec (masks, prompts, settings, the chain
  order), and — **where an engine's API is connected** (FLUX endpoints, Firefly API, product-tool APIs) — can
  execute edits programmatically. Where it isn't, exact steps for the human. No pretended automation.

> **creator-publish note:** Routes here, as equal choices (whichever the person has connected): **Higgsfield**
> (`remove_background`, `upscale_image`, `outpaint_image`, FLUX.2 Pro Outpaint, Nano Banana masked inpaint, Flux
> Kontext), the **OpenAI** image-edit API (optionally via the `openai-image` skill if installed), the **Gemini
> API** (Nano Banana editing), the **BFL API** (FLUX Kontext/Fill), and **Canva** remove-background (via
> `canva:canva`). Other
> engines (Firefly, Topaz, Magnific, Claid, Clipdrop): exact steps for the human.

- **The human judges every result at 100% zoom** — the agent can't see pixels and never fabricates "the seams
  are clean"; on face restoration of real people, the person who knew them judges likeness.
- **The downstream publishing step publishes** the finished images (measurement: the platforms' native analytics); it does **not** edit, upscale, or
  remove backgrounds.

> **creator-publish note:** Publishing/scheduling is a downstream step outside this skill (a future
> creator-publish posting skill).

- **The honesty spine (editing-specific):** an edited real photo is an edited **claim** — no defect
  concealment (FTC net-impression), no hallucinated product detail (faithful upscaling for accuracy-critical
  images), **label-required body retouching honored** (France / Norway incl. influencers / Israel — verify per
  market), conservative face work on real people (identity drift), consent for edits to others' images, **no
  watermark removal or provenance stripping**, AI-disclosure where platform/region requires (EU AI Act), and
  source-image licenses confirmed (you can only edit what you're licensed to edit).
- **Never fabricate** engine capabilities, benchmarks, or terms — engines shift per release; test on your own
  images; counsel for high-stakes claims (not legal advice).

## Distinct from its siblings (route correctly)
- **image-prompt / flux / nano-banana / ideogram** = image **generation** (new images from prompts);
  **this** = editing images that already exist. FLUX Kontext and nano-banana serve BOTH lanes — this skill
  routes their *editing* use; their skills own the tools.
- **canva** = the design workflow (its Magic Eraser/Expand/Grab are the in-workflow quick fixes this routes
  to for small jobs).
- **infographic-and-data-viz / quote-cards-and-text-graphics** = designed graphics built from scratch (not
  photo edits).
- **before-after-and-transformation** = owns the FTC rules any edited "result" photo must meet.
- **design-and-templates** = the brand system the edited image must still fit.
- **ai-video / capcut** = motion (this is stills; video cleanup routes there).

> **creator-publish note:** Library IDs: `image-gen:image-prompt` / `image-gen:flux` / `image-gen:nano-banana` /
> `image-gen:ideogram`; `canva:canva` (also remove-background); `design:infographic-and-data-viz` /
> `design:quote-cards-and-text-graphics` (their text renders with `compose:visual-composer`);
> `design:design-and-templates`. before-after-and-transformation, ai-video and capcut are not in this library:
> apply the FTC before/after claim rules directly; video cleanup is a video-editing step outside this plugin.

## Where this connects
- **Reads first:** the source's context (brand-profile + design-and-templates) and, for results imagery,
  before-after-and-transformation (the claim rules).
- **Pulls sources from:** real photography, flux / the image generators (fixing generated images is half the
  2026 workload), user archives (restoration).
- **Feeds:** canva (edited assets into layouts), carousel-writer / thumbnail-design / pinterest-pin-design
  (the finished visuals), the platform publishing skills.
- **Publishes via:** master + derivatives → scheduling-and-queue → **the downstream publishing step.**
- **Tool file:** `references/tools/ai-image-editing.md` (the engine map, API layers, the honesty gates).
- **Measure with:** human-judged fidelity + native post performance via analytics-and-reporting — never
  fabricated.

> **creator-publish note:** brand-profile isn't in this library — use the project's brand inputs (palette, fonts, logo, voice) supplied by the caller or the project brand file.
> In this library: feeds `compose:visual-composer` / `canva:canva`, `design:thumbnail-design` /
> `design:pinterest-pin-design` / carousel slides; carousel-writer, scheduling-and-queue and
> analytics-and-reporting are not in this library (publishing/scheduling is a downstream step outside this skill;
> measure with the platforms' native analytics). The tool file covers the engine map, the routes here, and the
> honesty gates.
