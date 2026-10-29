---
name: ai-image-editing
description: "The AI image-editing router — inpainting/object removal, background removal, upscaling, outpainting/extend, restoration and retouch, routed task-first to a named engine. Use when someone wants to remove an object/person, cut out a background, upscale, extend to new aspect ratios, restore an old photo, fix a generated image, or asks which editing tool to use. Uses the TOUCH framework. Guidance-only: names the task, picks the route and writes the edit spec; routes are equal choices among connected providers: Higgsfield (remove_background, upscale_image, outpaint_image, FLUX.2 Pro Outpaint, Nano Banana masked inpaint), OpenAI image edits, the Gemini API (Nano Banana editing), BFL (FLUX Kontext), and Canva remove-background via canva:canva. The HUMAN judges every result at 100%. Honesty: creative upscalers hallucinate detail (never on products/documents), no defect concealment, retouch disclosure honored, no watermark/provenance stripping. Distinct from the generation skills (image-gen:image-prompt and siblings)."
---

# ai-image-editing

The **edit router** — name the task, route the engine, one change at a time, uphold the real, check the seams,
hand off with rights. The agent routes + specs; the **human judges every result at 100%**; **the downstream publishing step
publishes**. (Ships with `references/tools/ai-image-editing.md`.)

> **creator-publish note:** Publishing/scheduling is a downstream step outside this skill (a future
> creator-publish posting skill); it does not edit.

## Higgsfield prompting rule (creator-publish addition)

**Higgsfield prompts.** Edit prompts for direct vendors follow this skill's method. When the route is
**Higgsfield** (any generative edit: Nano Banana masked inpaint, FLUX.2 Pro Outpaint, Flux Kontext instruction
edits, reframes), write the prompt with the optional `higgsfield` prompting skill if it is installed: its root
`SKILL.md`, `skills/higgsfield-prompt/SKILL.md` and the model sub-skill; parameters (masks, `expand_*`,
resolutions, aspect ratios) come from its specs, never invented; otherwise write the prompt directly, taking parameters and aspect ratios from the provider's tool schema, never invented.

## Routes available here (creator-publish addition)

Guidance-only; named options. The providers are equal choices: use whichever the request or project names, or
the person has connected; otherwise ask.

| Task | Named option(s) | Notes |
|---|---|---|
| Background removal | **Higgsfield `remove_background`**; **Canva remove-background** (via `canva:canva`, inside a Canva design); any other connected remover | Hair/glass QA at 100%. |
| Upscale | **Higgsfield `upscale_image`** or another connected upscaler | Check which upscaler/mode it runs in the provider's docs: faithful for real photos/products, creative only for art. |
| Extend / outpaint to a new aspect ratio | **Higgsfield `outpaint_image`**, **FLUX.2 Pro Outpaint** (BFL API or Higgsfield; per-side `expand_*`), or Gemini/OpenAI image edits | Expanded regions are generated: fine for backgrounds, never for product/claim elements. |
| Masked inpaint / object removal / replace | **Nano Banana** editing (Gemini API, or masked inpaint on Higgsfield with `mask` + `is_inpaint`), **Flux Kontext** instruction edits (BFL API or Higgsfield), OpenAI image edits | Parameters from the chosen provider's schema (for Higgsfield, the optional `higgsfield` skill if installed). |
| Restyle / instruction edit from a reference | **OpenAI image edits** (`/v1/images/edits`; the optional `openai-image` skill's `--input` mode if installed, otherwise call the endpoint per its schema), Nano Banana via the Gemini API, or Higgsfield models | Check the provider's billing before relying on it; never pass images the owner has not authorised to leave the machine. |
| Text over the edited image | **`compose:visual-composer`** | Never upscale or regenerate text — re-typeset it deterministically. |
| Engines not connected here (Firefly, Topaz, Magnific, Claid, Clipdrop) | Exact human steps only | Covered in the references as craft knowledge; no connection in this repo. |

No route is executed by this skill: it writes the edit spec and names the route; the person's connected tools
(for example Higgsfield MCP/CLI, the OpenAI or Gemini API, the Canva connector) run it.

## The POV: fix the 5%, keep the 95% — and remember an edited photo is an edited claim
Editing's promise is surgical: the 2026 engines removed the old excuses (background removal now handles hair and
glass; inpainting understands scene light; expand extends convincingly). The top-1% operator holds three lines
the tool marketing won't. **(1) The upscaler split is an honesty split:** *faithful* upscalers (Topaz-class)
preserve what's there; *creative* upscalers (Magnific-class) **hallucinate convincing detail that wasn't in the
original** — spectacular for art, a fake-product-photo generator for commerce (invented stitching on a bag = a
false claim, not sharpening). In-image text gets mangled — re-typeset it; no upscaler beats a reshoot.
**(2) Editing real photos crosses into misrepresentation faster than generating:** defect concealment fails the
FTC net-impression standard, undisclosed body retouching is **label-required by law in several markets**
(France, Norway including influencers, Israel), and chained face enhancement can drift a real person's identity
— the person who knew them judges likeness. **(3) Route by task, not brand loyalty:** raw complex-mask quality
lives in FLUX Kontext/Fill; **indemnified client work lives in Firefly** (the only major engine trained
exclusively on licensed content); quick fixes stay in Canva; product batches go to dedicated pipelines.

> **creator-publish note:** Routes in this library: complex masks → FLUX Kontext / Nano Banana masked inpaint
> via Higgsfield; quick fixes inside a design → Canva via `canva:canva`; Firefly, Topaz, Magnific, Claid and
> Clipdrop are not connected here (exact human steps only). See the route table above.

## Read these first
1. **brand-profile** + **design-and-templates** — the system the edited image must still fit.
2. **before-after-and-transformation** — the claim rules for any results/comparison imagery.

> **creator-publish note:** brand-profile isn't in this library — use the project's brand inputs (palette, fonts, logo, voice) supplied by the caller or the project brand file.
> before-after-and-transformation isn't in this library either: apply the FTC before/after claim rules directly
> (an edited "after" is a fabricated result). `design-and-templates` is `design:design-and-templates` here.

## The framework: TOUCH
(Depth: `references/the-touch-framework.md`.)
- **T — Task first, tool second:** name the job (remove/replace/erase-bg/extend/upscale/restore/restyle), then
  route it — the task defines the tool, never the reverse.
- **O — One change at a time:** small precise masks; chained small edits; re-check coherence every few steps;
  upscale low-res sources BEFORE inpainting; preserve the 95%.
- **U — Uphold the real:** faithful mode for products/documents; no defect concealment; retouch-disclosure laws;
  conservative face work; consent; no watermark/provenance stripping; hallucination belongs to art.
- **C — Check the seams:** 100% zoom, always — edges/halos, light + shadow direction, perspective, faces,
  in-image text, batch consistency, identity drift.
- **H — Hand off with rights:** source license + engine terms (Firefly indemnification vs FLUX
  outputs-vs-service) + disclosure labels; master as PNG/TIFF.

> **creator-publish note:** Route terms here also include Higgsfield's and OpenAI's terms. The master then goes
> to the downstream publishing step (publishing/scheduling is outside this skill).

## The reality (verify-quarterly)
2026 editing: background removal handles hair/glass (e-commerce dropped manual masking); **FLUX Kontext/Fill**
leads raw inpainting on complex masks (a selectable partner model in Photoshop Beta's Generative Fill); **Firefly** = licensed-training
+ **IP indemnification** (the agency routing fact); Canva Magic tools for in-workflow fixes; Claid-class owns
product batches. **Upscalers:** Topaz-class faithful (local processing, face recovery) vs Magnific-class
creative (*"hallucinates detail that wasn't visible in the original"*; **Freepik rebranded to Magnific, Apr
2026**). Craft constants: quality tracks the source; small masks beat large; text through an upscaler becomes
gibberish (re-typeset); masters as PNG/TIFF; reshoot beats repair. Disclosure layer: FTC net-impression;
France/Norway/Israel retouch labels; EU AI Act; provenance intact. *"The editing lane still rewards judgment
over blind automation."* **Attribute all; verify-quarterly.** Full detail:
`references/ai-image-editing-2026-reality.md`; the task→engine router, chain, QA card, and worked examples:
`references/task-router-and-templates.md`.

> **creator-publish note:** Of these, FLUX Kontext (and FLUX.2 Pro Outpaint) and Nano Banana masked inpaint are
> reachable via Higgsfield here; Canva Magic tools via `canva:canva`; Firefly, Topaz, Magnific and Claid are craft
> knowledge only (not connected).

## Honest scope (never violate)
- **The agent** names the task, routes the engine, writes the spec (masks/prompts/settings/chain order), and
  calls APIs **where connected** (exact human steps otherwise); the **human judges every result at 100%** (no
  fabricated "the seams are clean"; the person who knew them judges a restored face); **the downstream publishing step publishes**
  the finished images — it does **not** edit, upscale, or remove backgrounds.
- **The honesty spine:** an edited real photo is an edited claim — no defect concealment, faithful upscaling for
  accuracy-critical images, retouch-disclosure laws honored (verify per market), conservative face work,
  consent for others' images, no watermark removal or provenance stripping, AI-disclosure where required,
  source licenses confirmed. **Never fabricate** engine capabilities, benchmarks, or terms — test on your own
  images; counsel for high-stakes claims. (Full scope: `references/scope-and-connections.md`.)

> **creator-publish note:** Here the agent runs an edit only through a connected route (for example
> Higgsfield, the OpenAI or Gemini API, the Canva connector); otherwise it writes exact human steps.

## Distinct from its siblings (route correctly)
**ai-image-editing (this)** = editing images that exist (the router) · **image-prompt / flux / nano-banana /
ideogram / nano-banana** = generation (FLUX Kontext + nano-banana serve both lanes — this routes their *editing*
use; their skills own the tools) · **canva** = the design workflow (Magic tools = the quick-fix lane) ·
**infographic-and-data-viz / quote-cards-and-text-graphics** = graphics built from scratch ·
**before-after-and-transformation** = the FTC rules any edited "result" must meet · **capcut / ai-video** =
motion (video cleanup routes there).

> **creator-publish note:** Library IDs: `image-gen:image-prompt`, `image-gen:flux`, `image-gen:nano-banana`,
> `image-gen:ideogram`, `canva:canva`, `design:infographic-and-data-viz`, `design:quote-cards-and-text-graphics`.
> before-after-and-transformation, capcut and ai-video are not in this library (video cleanup is a
> video-editing step outside this plugin).

## Where this connects
Reads first: **brand-profile** + **design-and-templates** + **before-after-and-transformation** (results
imagery). Pulls sources from: real photography, **flux**/the generators (fixing generated images is half the
2026 workload), archives (restoration). Feeds: **canva** (edited assets into layouts), **thumbnail-design** /
**carousel-writer** / **pinterest-pin-design**, the **platform publishing skills.** Publishes via: master +
derivatives → **scheduling-and-queue → the downstream publishing step.** Tool file: **`references/tools/ai-image-editing.md`.**
Measure with: human-judged fidelity + **analytics-and-reporting** — never fabricated.

> **creator-publish note:** In this library: reads the project's brand inputs + `design:design-and-templates`;
> pulls from `image-gen:flux` / the generators; feeds `compose:visual-composer` / `canva:canva`,
> `design:thumbnail-design`, `design:pinterest-pin-design` and carousel slides. carousel-writer,
> scheduling-and-queue and analytics-and-reporting are not in this library: publishing/scheduling is a downstream
> step outside this skill; measure with the platforms' native analytics. Engine guide:
> `references/tools/ai-image-editing.md`.

## Definition of done
An edit routed task-first (the job named precisely, the engine chosen for it — complex masks to Kontext/Fill,
indemnified client work to Firefly, quick fixes in-workflow, product batches to dedicated pipelines, faithful
upscaling for real photos and creative only for art), executed one change at a time from the best source
(upscale-before-inpaint on low-res; the canonical chain ordered repairs → edits → upscale → PNG/TIFF master →
derivatives), held to the honesty spine (no hallucinated product detail, no defect concealment, retouch labels
where law requires, conservative identity-safe face work, consent, watermarks and provenance intact,
AI-disclosure where required), seam-checked at 100% (edges, light, perspective, faces, text, batch consistency),
and handed off with rights confirmed; the human judging every result and the downstream publishing step publishing the finished
image; **no fabricated capabilities or benchmarks**; and correctly distinguished from the generation skills,
canva, and before-after-and-transformation.

> **creator-publish note:** Routes here (equal choices, whichever is connected): background removal → Higgsfield
> `remove_background` or Canva; upscaling → Higgsfield `upscale_image` or another upscaler (faithful for real
> photos, creative only for art); extend → Higgsfield `outpaint_image` / FLUX.2 Pro Outpaint; complex masks → Nano
> Banana editing (Gemini API or Higgsfield) / Flux Kontext (BFL or Higgsfield); restyles → OpenAI image edits,
> Gemini or Higgsfield.

## Run it (creator-publish addition)

`publish` coordinates this skill directly from the project/package record, selected brief and exact source/reference
files or IDs. Apply this skill's craft to the chosen edit model; preserve explicit tool/provider/model/route/seed/quality
choices. Use the project's saved defaults (see the `publish` skill's project-defaults reference) only where no
explicit choice exists.

Write the provider-ready prompt/edit instructions with the selected specialist method (for Higgsfield, the optional
`higgsfield` prompting skill if installed; otherwise the provider's tool schema). Read current tool/model schemas for controls, references and limits. Prompt-only work ends at its saved prompt/brief handoff; authorized generation/edit work calls
the available connector/CLI/browser route directly and polls its job. Respect existing authorization, review
conditions and spending caps; preflight cost when supported. Report missing connection/installation or unsupported
controls, save the next action, and do not switch providers silently. No provider is preferred over another.

Persist every result promptly into the package's media folder, `MEDIA="$MEDIA_ROOT/packages/<package-id>"`,
never into the projects folder. `MEDIA_ROOT` is a folder the person chose: a path named in the request, else
`$CREATOR_PUBLISH_MEDIA`, else `media_root` in the project's `project.json`, else `media_root` in
`~/.creator-publish/config.json` plus `/<slug>` (details: the `publish` skill's "Save and resume"). If none is
set, ask where media should live before saving anything; there is no default location. Download the
result URL the chosen provider returned with `curl -fsSL -o <file> "<url>"` (never a URL that did not come from that
provider), or copy a durable local file there, then run `sha256sum <file>`. Record a `Files live in:` line with
the absolute `$MEDIA` path, and the file, hash, provider and job id, and the prompt/source files it came from in the package `status.md` (format: the `publish` skill's
asset-handoff reference). Bind each result to its concept/variant/take, exact source/reference IDs and provider
job/result. Record settings, seed support, version,
review state and defects; generation is not selection or approval. Selected imagery goes to composition/review.
A targeted edit preserves unrelated selected inputs. Final upscaling/enhancement is distinct from regeneration;
save the exact source draft and applied operation. Return a concise saved-output handoff to `publish`.

## Provenance (creator-publish addition)

Adapted from social-media-skills v1.0.1 (github.com/social-media-skills/skills skills/ai-image-editing, MIT,
Frank Heijdenrijk); licence: [LICENSE.social-media-skills](../../LICENSE.social-media-skills); see the repo
NOTICE.md. Original text is kept verbatim; local additions are marked **creator-publish note** or
*(creator-publish addition)*.
