---
name: flux
description: "The FLUX craft skill (Black Forest Labs: FLUX.2, Kontext) — write prompts and edit instructions for on-brand images with the right variant, route and license. Use when someone wants to generate images with FLUX/FLUX.2/Kontext, edit a generated image by instruction, keep a character or product consistent across a campaign via multi-reference, render legible text in images, get brand-exact hex colors, pick between FLUX variants, or asks whether their FLUX use is commercially licensed. Uses the PIXEL framework. Routes: any connected FLUX provider (BFL API, Higgsfield, fal, Replicate, Together, self-host) as equal choices; for Higgsfield the optional higgsfield prompting skill can write the final prompt if installed. Writes prompts only; text-heavy layouts render with compose:visual-composer. The human judges every image. Never use unpermitted likeness, clone trade dress, strip provenance, or invent stats. Distinct from image-gen:image-prompt (router), the sibling image tools, and image-gen:ai-image-editing."
---

# flux

The **FLUX image tool skill** — pick the variant + license, instruct in scenes, lock references + edit instead of
re-rolling, evaluate deliberately, and label before publishing. The agent prompts (and can call the API where
connected); the **human judges every image**; **the publishing step publishes**. (Ships with `references/tools/flux.md`.)

> **creator-publish note:** **Routes.** FLUX (FLUX.2, Flux Kontext, FLUX.2 Pro Outpaint) through the BFL API, Higgsfield, fal, Replicate, Together or self-host, as equal choices, using whichever the person has connected (vendor APIs need their own keys).
> No route is the default: use the one the request or project names, otherwise ask. Ids, parameters and allowed
> aspect ratios come from the chosen provider's schema. **No key is configured in this repo.** Publishing/scheduling is a downstream step outside this skill (a future creator-publish posting skill).
> Text-heavy layouts render with `compose:visual-composer` (exact text) rather than generated typography.

## The POV: control is the product — and the license is the trap
FLUX's 2026 edge isn't just quality; it's **control**: multi-reference consistency (up to ~8–10 images in one
call — a campaign-consistent character or product with **no fine-tuning**), in-context editing ("change the
jacket, keep everything else"), **hex-code brand colors** as parameters, 32k-token scene prompts, and typography
clean enough that ad headlines are production-viable. Two top-1% edges most users miss. **(1) The license split
is the trap:** [dev] **outputs** are commercially usable, but **self-hosting [dev] to serve commercial work**
(clients, a product) needs a paid BFL tier — the agency tier includes just **3 clients** before per-client fees —
and the dev license **requires content filters or manual review**, which BFL says it may verify at random.
Apache-2.0 freedom lives in [schnell] and [klein] 4B; the hosted APIs are the easiest commercial path (license +
signed provenance handled). **(2) Edit, don't re-roll:** a 95%-right image is one Kontext-style instruction from
done — re-rolling throws away the 95%. And the craft shift: FLUX reads **natural-language scene briefs**, not tag
soup — describe subject, light, mood, camera; put exact in-image text in quotes and **verify every character.**

> **creator-publish note:** the license split applies to the self-host and direct-API routes; on Higgsfield verify that
> route's own terms. Where in-image text must be exact, compose it deterministically with `compose:visual-composer`
> instead.

## Read these first
1. **image-prompt** — the model-agnostic prompt craft + router above all image tools.
2. **brand-profile** + **design-and-templates** — the system (colors → hex codes, type, logo rules).

> **creator-publish note:** brand-profile isn't in this library — use the project's brand inputs (palette, fonts, logo, voice). In this library: `image-gen:image-prompt`,
> `design:design-and-templates`.

## The framework: PIXEL
(Depth: `references/the-pixel-framework.md`.)
- **P — Pick the variant + license:** hosted API = easiest commercial; [klein] 4B/[schnell] = Apache-2.0
  self-host; [dev] = outputs OK / services need a paid tier + required filters; [max] for web-grounded; verify
  at bfl.ai.

> **creator-publish note:** the routes are equal choices (BFL API, Higgsfield or another host);
> verify the chosen route's own terms too.

- **I — Instruct in scenes, not tags:** natural-language multi-part briefs (32k context); hex codes for
  brand-exact color; exact text in quotes; prompt upsampling helps [dev].

> **creator-publish note:** Higgsfield destination: shape the final prompt with the optional `higgsfield` skill's method if installed (otherwise the provider's tool schema) (see the rule
> below).

- **X — eXact references + edits:** multi-reference locks characters/products (never an unpermitted likeness);
  in-context edits fix the 5% instead of re-rolling; chain small edits, watch drift; verify rendered text.
- **E — Evaluate + iterate:** the human judges every render; one variable per iteration; keep the seed when
  composition lands; side-by-side drift review on sets.
- **L — License + label:** rights confirmed for the variant actually used; AI-disclosure where required; never
  strip the signed provenance metadata; then the publishing step publishes.

> **creator-publish note:** confirm rights for the route actually used as well as the variant. Publishing/scheduling is a downstream step outside this skill (a future creator-publish posting skill).

## The reality (verify-quarterly)
FLUX.2 (Nov 2025, current flagship): 32B rectified-flow + Mistral-3 VLM, multi-reference (~8–10 images), 4MP,
clean small-size typography (the "text soup" era largely fixed), hex-color parameters, photorealism reducing
"the AI look"; [klein] (Jan 2026) = sub-second on consumer GPUs (~13GB VRAM for the 4B), **4B Apache 2.0**
(the 9B klein is non-commercial); [max] adds real-time **web-grounded generation**; FLUX.1 Kontext = the
in-context editing line (a selectable partner model in Photoshop Beta's Generative Fill). Licensing (bfl.ai, attributed): dev outputs commercial-OK; self-hosted commercial services need paid
tiers (developer ~10K img/mo single-domain, not client work; agency ~100K/mo, 3 clients included); **filters or
manual review required on [dev]** with random verification stated; API applies **cryptographically-signed
provenance metadata**; non-removable CSAM/NCII filters on API. Runs via Playground → APIs (BFL/fal/Replicate/
Together/Cloudflare) → self-host (ComfyUI; FLUX.2 [dev] quantized on an RTX 4090). **Attribute all;
verify-quarterly.** Full detail: `references/flux-2026-reality.md`. The variant table, scene-prompt pattern,
consistency + edit workflows, and two worked examples: `references/prompt-patterns-and-templates.md`.

> **creator-publish note:** routes here, as equal choices: Higgsfield, direct APIs (BFL/fal/Replicate/Together/
> Cloudflare, the person's keys), or self-host (ComfyUI). The signed provenance metadata applies to the BFL API.

## Honest scope (never violate)
- **The agent** prompts, plans references/edits, and calls the API **where connected** (exact human steps
  otherwise); the **human judges every image** (no fabricated "that looks great"; side-by-side set reviews);
  **the publishing step publishes** finished exports — it does **not** generate or edit media.
- **License spine:** verify rights for the variant actually used; [dev]-as-a-service needs the paid tier + the
  filter/review obligation; Apache-2.0 = [schnell]/[klein] 4B; high-stakes → counsel (not legal advice).
  **Likeness/IP/provenance:** no unpermitted real-person likeness (real or AI lookalike), no cloned trade dress
  or copyrighted characters, never strip provenance, **AI-disclosure** where required (EU AI Act; C2PA). **Data
  honesty:** never invent stats (data viz → infographic-and-data-viz). **Never fabricate** benchmarks/prices/
  capabilities. (Full scope: `references/scope-and-connections.md`.)

> **creator-publish note:** "where connected" here means whichever provider the person has connected (Higgsfield, the BFL API or
> another host), with no default. Publishing/scheduling is a downstream step outside this skill (a future creator-publish posting skill). infographic-and-data-viz is `design:infographic-and-data-viz` in this library.

## Distinct from its siblings (route correctly)
**flux (this)** = the FLUX-specific lane (photorealism + typography + multi-reference + editing + open-weight
control) · **image-prompt** = the model-agnostic router/craft (read first) · **ideogram** = graphic-design/
text-layout lane · Midjourney = distinct aesthetic lane (external — no skill in this library) ·
**nano-banana** = its documented lane (
strengths shift per release — test, don't trust leaderboards) · **ai-image-editing** = the edit router FLUX
editing will serve · **canva** = the design workflow output drops into · **ai-video / veo-3 / kling** = video
(BFL's video model is announced — verify before claiming).

> **creator-publish note:** in this library: `image-gen:flux`, `image-gen:image-prompt`, `image-gen:ideogram` (direct
> vendor), `image-gen:nano-banana` (via Higgsfield), `image-gen:ai-image-editing`, `canva:canva` and
> `compose:visual-composer` (layout and type over the imagery). Midjourney, ai-video, veo-3 and kling are not in
> this library (video is a separate video-generation step).

## Where this connects
Reads first: **image-prompt** + **brand-profile** + **design-and-templates.** Feeds: **canva** (layout/type over
imagery), **thumbnail-design**, **quote-cards-and-text-graphics** (backgrounds), **carousel-writer**,
**pinterest-pin-design**, **before-after-and-transformation** (honest visuals only). Publishes via: export →
**scheduling-and-queue → the publishing step.** Tool file: **`references/tools/flux.md`.** Measure with: native +
**analytics-and-reporting** — never fabricated.

> **creator-publish note:** brand-profile isn't in this library — use the project's brand inputs (palette, fonts, logo, voice).
> In this library: `design:design-and-templates`, `design:thumbnail-design`,
> `design:quote-cards-and-text-graphics`, `design:pinterest-pin-design`, `canva:canva`, `compose:visual-composer`.
> carousel-writer, before-after-and-transformation, scheduling-and-queue and analytics-and-reporting are not in
> this library. Publishing/scheduling is a downstream step outside this skill (a future creator-publish posting skill). Measure with the platforms' native analytics.

## Definition of done
A FLUX workflow that is on-brand and on-license: the variant chosen with its actual rights verified (hosted API
for easy commercial; Apache-2.0 [schnell]/[klein] 4B for free self-host; [dev] outputs-vs-service line respected
with the filter/review obligation met; paid tiers for client/product self-hosting), prompts written as
natural-language scene briefs with hex-exact brand color and quoted in-image text, consistency achieved by
multi-reference (original/consented characters only) and near-misses fixed by in-context edits rather than
re-rolls, every render human-judged with one-variable iteration and side-by-side set drift review, all rendered
text character-verified, and the shipped image labeled honestly (AI-disclosure where required; provenance
metadata intact) then published via the downstream publishing step; **no unpermitted likeness, no cloned trade dress, no stripped
provenance, no invented stats, no fabricated benchmarks/capabilities**; and correctly distinguished from
image-prompt, the sibling image tools, ai-image-editing, and canva.

> **creator-publish note:** the route is part of the choice: Higgsfield or a hosted API with the person's keys (no
> default); rights are verified for the variant **and** the route.

## Higgsfield prompting rule (creator-publish addition)

The prompt method above applies to direct-vendor use. When the destination is Higgsfield, write the final
prompt with the optional `higgsfield` prompting skill if it is installed: load it, read its root `SKILL.md`,
`skills/higgsfield-prompt/SKILL.md` and the model sub-skill its routing table names; parameters and aspect
ratios come from its specs, never invented; otherwise write the prompt directly, taking parameters and aspect ratios from the provider's tool schema, never invented. Use PIXEL to shape the brief.

## Run it (creator-publish addition)

`publish` coordinates this skill directly from the project/package record, selected brief and exact source/reference
files or IDs. Apply this skill's craft to FLUX; preserve explicit tool/provider/model/route/seed/quality
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

Adapted from social-media-skills v1.0.1 (github.com/social-media-skills/skills v1.0.1 skills/flux, MIT,
Frank Heijdenrijk); licence: [LICENSE.social-media-skills](../../LICENSE.social-media-skills); see the repo
NOTICE.md. Original author text is kept verbatim; creator-publish additions are labelled as notes or sections.
