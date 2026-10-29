---
name: ideogram
description: "Prompt craft for Ideogram (Ideogram 4.0), the direct-vendor AI typography + layout image model, sibling to nano-banana under image-gen:image-prompt. Use when the user wants an Ideogram prompt where AI-rendered TEXT and LAYOUT matter inside the artwork: stylised lettering, poster or carousel-cover concepts, logo/wordmark concepts, signage, ad visuals with headlines. Direct Ideogram use needs the owner's own Ideogram API key/account (none is configured in this repo); Ideogram is not on Higgsfield. Writes the prompt (plain or structured JSON with bounding boxes and hex palettes) only. When exact copy, real fonts or real logos matter, compose the text deterministically with compose:visual-composer instead. Also covers the Ideogram app-editor workflow (Canvas, Magic Fill, Extend, Style References, Layerize Text). Honest: review rendered text, disclose AI images and sign with C2PA, never generate real identifiable people or copyrighted characters/IP/logos."
---

# Ideogram (image prompt craft)

Write prompts that get **design-grade images with correct text and deliberate layout** out of
**Ideogram** (**Ideogram 4.0**). This is the **prompt-craft** layer of a three-layer setup, and the
**typography/layout sibling to `nano-banana`** under the **image-prompt** router.

> **creator-publish note:** in this library: `image-gen:nano-banana`, router `image-gen:image-prompt`.
>
> **Access.** Ideogram is used through its own API or app with the person's key or account (or another host
> that offers it) — **none is configured in this repo**. If no key is
> available, prefer composing the text with `compose:visual-composer` (exact, deterministic) over a generated
> typographic image.

- **Connection/API** (per-image pricing, MCP, the *generate → upload to Media → attach*
  flow) → `references/tools/ideogram.md`.
- **Prompt craft** (this skill) → how to direct the right asset well.
- **Router** → `image-prompt` picks the tool for the job.

> **creator-publish note:** the *upload to Media → attach* flow is the downstream publishing step, outside this skill (a
> future creator-publish posting skill).

> This skill covers **both lanes**: *generation* prompt-craft (below) and the Ideogram
> **app-editor workflow** (Canvas, Magic Fill, Extend, Style References, Magic Prompt, Layerize) —
> for in-editor work, see `references/app-editor-and-canvas.md`. Re-verify model/specs quarterly.

## Reach for Ideogram when… (match the job)
Its real strengths: **in-image text rendering** (the standout — legible, correct typography),
**deterministic layout** (bounding-box placement), **brand-accurate color** (hex palettes), **native
2K**, and **transparency** (Background Remover). Reach **elsewhere** for **conversational edits / pure
photoreal scenes** (→ `nano-banana`) or specific **art house looks** (→ the photoreal branch). Don't
default it to every image. (Details: `references/when-and-how-to-prompt.md`.)

> **creator-publish note:** also reach elsewhere for **exact copy with real fonts/logos** (quote cards, stat cards,
> thumbnail text, pins, infographics) → `compose:visual-composer` (brief from the `design:*` skills);
> deterministic text never misspells. Conversational edits / photoreal scenes → `image-gen:nano-banana` via
> Higgsfield or other Higgsfield models (`image-gen:ai-image-editing` for edits).

## Step 0 — Read the brand + the job
Load `brand-profile.md` (palette as hex, type feel, do/don't). Identify the **job** (quote card /
carousel cover / poster / logo concept / ad / signage) and the **aspect ratio** (4:5, 9:16, 1:1).

> **creator-publish note:** brand-profile isn't in this library — use the project's brand inputs (palette, fonts, logo, voice).

## Step 1 — Direct a layout, not just a scene
Describe like a designer: **subject/scene/style · text elements (exact string + styling + placement) ·
hex palette · layout/hierarchy · format (2K, aspect)**. Don't bury copy in a vague sentence. Ground in
the brand. See `references/when-and-how-to-prompt.md`.

## Step 2 — Use the superpower: structured JSON
Ideogram 4.0 is JSON-native. For exact, repeatable **layout/text/color**, write **structured JSON**:
per-element **bounding boxes**, **hex palette** (up to ~16), and each text element's **literal string
+ visual styling**. Casual input works via **magic-prompt** (it expands to JSON). See
`references/json-prompting-and-layout.md`.

## Step 3 — Text, transparency, recipes
- **Text:** ~0.97 OCR, multilingual, multi-line, logos/signage — but **review every render.**
- **Transparency:** Background Remover → clean alpha cutout. **Layerize Text** (live, beta) turns
  rendered text into **editable layers** — restyle/rewrite copy without regenerating; works best on
  clear, straight type. **2K** output; aspect ratios in multiples of 16.
- Pick a **recipe** (quote card, carousel cover, logo concept, ad, poster). See
  `references/text-rendering-and-recipes.md`.

> **creator-publish note:** for a quote card whose copy must be exact, the deterministic route is `compose:visual-composer`
> (brief from `design:quote-cards-and-text-graphics`); use the Ideogram recipe when the lettering is part of the art.

## Step 4 — Iterate cheaply, then verify, disclose, ship
- **Iterate on Turbo / magic-prompt** to lock layout; **finalize on Quality** with refined JSON.
  Per-image pricing — **prompt/layout precision is the cost + quality lever.**
- **Verify** the rendered **text** and composition before publishing.
- **Disclose** AI images (**EU AI Act Article 50**, **California AB 853**) and sign with **C2PA**;
  never pass an AI image off as a real photo. Open weights are **non-commercial** (commercial → plan/API).
- **Ship:** generate per the integration guide → **upload to Media → attach** via
  `scheduling-and-queue`. The publishing step doesn't generate images.

> **creator-publish note:** publishing/scheduling is a downstream step outside this skill (a future creator-publish posting
> skill); scheduling-and-queue is not in this library. Finish exact logos/legal text in a composition spec
> (`compose:visual-composer`) or `canva:canva`.

## Quality bar — self-check
- Did I **match the tool to the job** (route conversational/photoreal to `nano-banana`)?
- Are **text elements typed** (exact string + styling + placement), with a **hex palette** and **2K/
  aspect** set, **brand-grounded**?
- Did I use **JSON** where layout/text precision matters (and **magic-prompt** for casual)?
- Did I plan **iterate-cheap → finalize**, and **verify the rendered text**?
- Did I handle **disclosure + C2PA**, **non-commercial license**, and **refuse real people / IP / logos**?
- Did I point to **`references/tools/ideogram.md`** for the API + publishing flow (no claim the publishing step
  generates images)?

> **creator-publish note:** also check: is an **Ideogram key available**? If not, say so and offer the composition route. Exact
> copy → compose; conversational/photoreal → Nano Banana via Higgsfield.

## Edge cases & pushback
- **"Exact headline + brand colors + placement"** → structured JSON (bounding boxes + hex palette).
- **Conversational "now change the background"** → route to `nano-banana`; Ideogram is layout-first.
- **Real person / copyrighted IP or logo / "post as a real photo"** → refuse; disclose + C2PA; offer
  an original/owned alternative.
- **"Editable text layers"** → **Layerize Text is live (beta**, all plans + API endpoint**)** — best on
  clear, straight standard type; curved/decorative text may not be detected.
- **"Generate it in the publishing tool"** → the publishing tool doesn't generate; this prompts Ideogram, then the image
  is uploaded to Media and attached.
- **Long paragraph of text in-image** → keep lines short, hierarchy clear; verify the render.

> **creator-publish note:** in this stack, a long paragraph of exact text is better composed with `compose:visual-composer`
> than generated. Also: **"Exact headline + brand colors"** where the type must be the brand's real font →
> compose it deterministically; **conversational "change the background"** → `image-gen:ai-image-editing` /
> Nano Banana (Gemini API or Higgsfield); **"Run it on another provider"** → if that provider has no Ideogram,
> pick one of its models and write the prompt from its tool schema (for Higgsfield, the optional `higgsfield`
> skill if installed).

## Related
- `references/tools/ideogram.md` — API/pricing/MCP, the upload-to-Media flow.
- `image-prompt` — the router; `nano-banana` — the conversational/photoreal image sibling.
- `brand-profile` — the visual brand; `carousel-writer`, `caption-writer`, `hook-writer` — copy that
  pairs with the asset; `veo-3` — animate a still into video (image-to-video).
- `scheduling-and-queue` — attach the image to a post and publish.

> **creator-publish note:** in this library: `image-gen:image-prompt`, `image-gen:nano-banana`, `compose:visual-composer`
> (deterministic text/layout render), `canva:canva` (editable cloud finishing). brand-profile isn't in this
> library — use the project's brand inputs (palette, fonts, logo, voice). carousel-writer, caption-writer,
> hook-writer, veo-3 and scheduling-and-queue are not in this library (copy comes from the caller's copywriting
> step; animating a still is a separate video-generation step; publishing is downstream).

## References
- `references/when-and-how-to-prompt.md` — when to reach for Ideogram vs other tools, and the prompt anatomy.
- `references/json-prompting-and-layout.md` — the 4.0 differentiator: structured JSON, bounding boxes, palettes.
- `references/text-rendering-and-recipes.md` — the text superpower, transparency/2K, social recipes.
- `references/app-editor-and-canvas.md` — the in-app editor workflow: Canvas, Magic Fill, Extend, Style References, Magic Prompt, brand models.
- `references/examples.md` — weak→strong, a JSON layout, a text-heavy card, and honest scope.

> **creator-publish note:** `references/tools/ideogram.md` — connection guide (direct vendor; owner's key required).

## Higgsfield prompting rule (creator-publish addition)

This prompt method applies to direct-vendor (Ideogram) use. If you switch the job to a Higgsfield model
instead (e.g. GPT Image or Nano Banana for in-image text), write that prompt with the optional `higgsfield`
prompting skill if it is installed: its root `SKILL.md`, `skills/higgsfield-prompt/SKILL.md` and the model
sub-skill; parameters and aspect ratios from its specs, never invented; otherwise write the prompt directly, taking parameters and aspect ratios from the provider's tool schema, never invented.

## Run it (creator-publish addition)

`publish` coordinates this skill directly from the project/package record, selected brief and exact source/reference
files or IDs. Apply this skill's craft to Ideogram; preserve explicit tool/provider/model/route/seed/quality
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

Adapted from social-media-skills v1.0.1 (github.com/social-media-skills/skills v1.0.1 skills/ideogram, MIT,
Frank Heijdenrijk); licence: [LICENSE.social-media-skills](../../LICENSE.social-media-skills); see the repo
NOTICE.md. Original author text is kept verbatim; creator-publish additions are labelled as notes or sections.
