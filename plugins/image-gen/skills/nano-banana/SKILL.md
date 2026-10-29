---
name: nano-banana
description: "Prompt craft for Nano Banana (Google's image model family: Nano Banana Pro, Nano Banana 2) through the Gemini API, Higgsfield or another connected provider. Use when the user wants a Nano Banana image prompt for social (carousel slide, product shot, lifestyle scene, background, ad visual), multi-image character/product consistency, or conversational image editing via Nano Banana. Writes the prompt brief and provider-ready prompt (for Higgsfield, the optional higgsfield prompting skill can write the final prompt if installed). Strengths: multi-image consistency (references), conversational edits, legible short in-image text. Text-heavy layouts (quote cards, thumbnails' text, pins, infographics) render deterministically with compose:visual-composer instead. Honest: SynthID watermark + AI disclosure; no real identifiable people or copyrighted characters/logos; verify spelling/data."
---

# Nano Banana (image prompt craft)

> **creator-publish note:** **Routes (read first).** Nano Banana can be reached through any provider the person
> has connected, as equal choices: the **Gemini API** (Google AI Studio or Vertex, with their own key; guide in
> `references/tools/nano-banana.md`), **Higgsfield** (Nano Banana Pro, Nano Banana 2), or another host. Use the
> route the request or project names; otherwise ask. For Higgsfield, the optional `higgsfield` prompting skill
> (pinned install in publish-core's `dependencies.md`) can write the final prompt if installed; without it, write
> the prompt directly from the provider's tool schema. Never invent model ids or parameters.

Write prompts that get studio-quality images out of **Nano Banana** — Google's Gemini image model
(**Nano Banana Pro = Gemini 3 Pro Image**; the Flash variant is faster/cheaper). This is the
**prompt-craft** layer of a three-layer setup:

- **Connection/API** (model IDs, auth, the *generate → upload to the publishing step's Media → attach* flow) →
  `references/tools/nano-banana.md`.
- **Prompt craft** (this skill) → how to ask for the right image well.
- **In-skill application** → e.g. `carousel-writer`'s image-prompt-pack.

> **creator-publish note:** In this library the layers are: **connection** → whichever provider is connected (the
> Gemini API per `references/tools/nano-banana.md`, Higgsfield, or another host); **prompt craft** → this skill;
> **final prompt** → written from this craft and the provider's tool schema (for Higgsfield, the optional
> `higgsfield` skill if installed). Publishing/scheduling is a
> downstream step outside this skill (a future creator-publish posting skill). `carousel-writer`,
> `scheduling-and-queue`, `reels-script`, `caption-writer` and `hook-writer` are upstream skills not in this
> library; copy comes from the caller's copywriting step.

> Fast-moving area — re-verify model names/capabilities quarterly.

## Reach for Nano Banana when… (match the job)

Its real strengths: **legible in-image text** (best in class), **multi-image/character consistency**,
**conversational editing**, and **Search-grounded infographics**. Reach **elsewhere** for
**typography/layout-led design** (→ `ideogram`) or **surreal/fine-art** aesthetics (Midjourney).
(**Imagen**, the former photoreal sibling, is **deprecated** — Gemini API shutdown Aug 17, 2026 — so
Google-side photoreal work now lands here.) Don't default it to every job. (Details:
`references/when-and-how-to-prompt.md`.)

> **creator-publish note:** Routing in this library: **text-led design** (quote cards, stat cards, thumbnail text,
> pins, infographics) → lay it out deterministically with `compose:visual-composer` (brief from the `design:*`
> skills) and generate at most a text-free background here; **stylised AI typography** → `image-gen:ideogram`
> (needs an Ideogram key); **hex-exact colour / FLUX-specific control** → `image-gen:flux`; for masked
> inpaint and other edit tools see `image-gen:ai-image-editing`. Midjourney is outside this library.

## Step 0 — Read the brand + the job

Load `brand-profile.md` (colours, visual style, do/don't). Identify the **job** (quote graphic /
carousel / thumbnail / infographic / product shot / background / ad / edit) and the **platform
aspect ratio**.

> **creator-publish note:** brand-profile isn't in this library — use the project's brand inputs (palette, fonts, logo, voice) supplied by the caller or the project brand file.
> Check that the platform aspect ratio is allowed for the chosen Higgsfield model in the `higgsfield` specs.

## Step 1 — Write the prompt (natural language, not keyword spam)

Describe, don't pad. Include **subject · composition/camera · action/context · lighting/atmosphere ·
style/medium · constraints + exact text**. Drop "4k, masterpiece, trending on artstation" tokens —
modern Gemini models reason over natural language. Bake in the **brand** palette/style. Set the
**aspect ratio**. Iterate cheap at 1K, finalize at 2K/4K. See `references/when-and-how-to-prompt.md`.

> **creator-publish note:** Resolutions and costs come from the chosen provider's schema and pricing (on
> Higgsfield, also the optional `higgsfield` skill's specs); iterate at the lowest resolution the chosen model
> offers and finalize higher.

## Step 2 — Use the superpowers deliberately

- **Text:** put the **exact words in quotes** + font + placement; settle the **copy first** (the
  text-first approach), keep it short, and **verify the spelling** in the output.

> **creator-publish note:** Keep in-model text short (a few words). Anything longer, exact or brand-critical
> → compose it with `compose:visual-composer` (deterministic text never misspells).

- **Consistency:** use **reference images** and a **locked style description**; generate a set **one at
  a time** ("everything the same except X"); hold the aspect ratio; review for drift.
- **Editing:** natural-language changes to a hero image for locale/seasonal/A-B variants.

> **creator-publish note:** For masked inpaint and other edit tools see `image-gen:ai-image-editing`.

See `references/text-and-consistency.md`.

## Step 3 — Pick the recipe

Adapt a pattern for the job (quote graphic, carousel set, thumbnail, infographic, product/lifestyle,
background, ad), with the right aspect ratio and brand grounding. See `references/social-recipes.md`.

> **creator-publish note:** For quote graphics, thumbnails' text and infographics the preferred route here is
> `compose:visual-composer` (exact text), with Nano Banana generating at most a text-free background.

## Step 4 — Verify, disclose, ship

- **Verify** rendered text and any infographic **data** before publishing (the model can misspell /
  misplace facts).
- **Disclose** AI generation per platform/region (Meta "Made with AI", EU AI Act); every image carries
  a **SynthID** watermark (+ C2PA) — don't strip it or pass the image off as a non-AI photo.
- **Ship:** generate per the integration guide → **upload bytes to the publishing step's Media → attach to the
  post** via `scheduling-and-queue`. The publishing step doesn't generate images.

> **creator-publish note:** Upstream this step named a specific publishing product (removed here). Here the image goes
> to composition (`compose:visual-composer`) or straight to use; publishing/scheduling is a downstream step
> outside this skill (a future creator-publish posting skill).

## Quality bar — self-check

- Did I **match the tool to the job** (and say when to use another model)?
- Is the prompt **natural-language and specific** (subject/composition/lighting/style/text), **brand-
  grounded**, with the **right aspect ratio**?
- For text: **exact words in quotes** + font + placement, **copy-first**, **spelling verified**?
- For sets: **references + locked style**, one-at-a-time, reviewed for drift?
- Did I handle **SynthID + disclosure**, **verify text/data**, and **refuse real people / IP**?

> **creator-publish note:** Also: did text-led layouts go to `compose:visual-composer`, and did the final
> prompt use an aspect ratio and parameters the chosen provider's model allows?

- Did I point to **`references/tools/nano-banana.md`** for the API + publishing hand-off (no claim that
  the publishing step generates images)?

## Edge cases & pushback

- **Photoreal headshot / surreal art** → suggest the better-fit model; don't force Nano Banana.
- **"logo, 4k, masterpiece, trending…"** → rewrite into a specific scene description; drop token spam.
- **Real person / copyrighted character / brand style** → refuse; offer an original alternative.
- **"Post it as a normal photo"** → SynthID + disclosure; don't disguise AI imagery.
- **Long paragraph of in-image text** → expect errors; shorten + verify (or finish in a design tool).

> **creator-publish note:** Here: don't generate it; compose it with `compose:visual-composer`.

- **"Generate it in the scheduler"** → the publishing step doesn't generate; this skill prompts the model, then the
  image is uploaded to Media and attached.

> **creator-publish note:** Also: **"Use my Gemini API key / AI Studio"** → fine: call the Gemini API with their
> key (setup in `references/tools/nano-banana.md`); never ask them to paste the key into chat.

## Related

- `references/tools/nano-banana.md` — API/model IDs, auth, pricing, the upload-to-publishing hand-off.
- `carousel-writer` (image-prompt-pack), `reels-script` — consuming skills; `ideogram` — typography sibling.
- `brand-profile` — the visual brand; `caption-writer`/`hook-writer` — the in-image copy.
- `scheduling-and-queue` — attach the image to a post and publish.

> **creator-publish note:** In this library: `higgsfield` (optional, installed separately; without it write the prompt directly from the provider's tool
> schema) — a final-prompt method for Higgsfield; `image-gen:image-prompt` — the router; `image-gen:ideogram`, `image-gen:flux` — siblings;
> `image-gen:ai-image-editing` — edit tasks; `compose:visual-composer` — deterministic text/layout render;
> `design:*` — the briefs for it. brand-profile isn't in this library — use the project's brand inputs (palette, fonts, logo, voice) supplied by the caller or the project brand file. `carousel-writer`, `reels-script`,
> `caption-writer`, `hook-writer` and `scheduling-and-queue` are upstream skills not in this library;
> publishing/scheduling is a downstream step outside this skill.

## References

- `references/when-and-how-to-prompt.md` — when to reach for it vs other models, and the prompt anatomy.
- `references/text-and-consistency.md` — the two superpowers: legible in-image text and multi-image consistency/editing.
- `references/social-recipes.md` — adaptable prompt patterns per social job + aspect ratios.
- `references/examples.md` — weak→strong prompts, a consistent carousel, an edit, and honest scope.

> **creator-publish note:** `references/tools/nano-banana.md` — the Gemini API integration guide, with the
> other routes noted at the top.

## Run it (creator-publish addition)

`publish` coordinates this skill directly from the project/package record, selected brief and exact source/reference
files or IDs. Apply this skill's craft to Nano Banana; preserve explicit tool/provider/model/route/seed/quality
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

Adapted from social-media-skills v1.0.1 (github.com/social-media-skills/skills skills/nano-banana, MIT, Frank
Heijdenrijk); licence: [LICENSE.social-media-skills](../../LICENSE.social-media-skills); see the repo NOTICE.md.
Original text is kept verbatim; local additions are marked **creator-publish note** or *(creator-publish addition)*.
