# Nano Banana (Gemini Image) — integration guide

> **creator-publish note:** **Routes (read first).** This is the upstream integration guide for the direct
> **Gemini API**, one of the equal routes to Nano Banana here. The others: **Higgsfield** (Nano Banana Pro,
> Nano Banana 2 and edit/relight variants; model ids and parameters in its tool schema, or in the optional
> `higgsfield` skill's specs if installed) or another host. Use the route the request or project names;
> otherwise ask. Take parameters from the chosen provider's schema; never invent them. Re-check the Gemini model
> IDs and endpoints below against Google's current docs before use.

The canonical reference for any skill that generates **images** with Nano Banana — Google's native
image generation in the Gemini models. Shared infrastructure: image skills point here instead of
restating API details. (`carousel-writer` bundles a Nano Banana / Ideogram prompt pack; this guide
is the connection layer behind it.)

> Models, IDs, and pricing move fast — re-verify quarterly against the official docs, which are the
> source of truth: `https://ai.google.dev/gemini-api/docs` (image generation). This guide captures
> the durable surface and how skills use it, not every parameter.

## What it is

"Nano Banana" is **not a separate product** — it's the name for **Gemini's native image
generation**, a small family of image-capable Gemini models. As of mid-2026 (verify):

- **Nano Banana** — `gemini-2.5-flash-image`. Fast, cheap, high-volume.
- **Nano Banana 2** — `gemini-3.1-flash-image` (GA; a `-preview` variant also exists). Launched Feb 2026; adds
  up to 4K; the high-efficiency default for most work.
- **Nano Banana Pro** — `gemini-3-pro-image` (GA June 2026). Best **legible in-image text**
  (multilingual), multi-image composition (blend up to ~14 reference images), complex-instruction
  following, up to 4K. Use when text fidelity or brand consistency matters.

## Access

Treat "Nano Banana API" as a **Gemini API** question:

- **Gemini API** — `https://generativelanguage.googleapis.com/v1beta`, `@google/genai` SDK
  (`generateContent`). The programmatic path. Image returns as base64 `inline_data` inside
  `candidates[0].content.parts` — iterate parts, don't assume an index.
- **Google AI Studio** — testing surface; a free tier (~500 images/day, verify) for prototyping.
- **Gemini Enterprise Agent Platform** (formerly Vertex AI) — enterprise/scaled use.
- **Gemini app / Workspace / Google Ads** — no-code surfaces.

API key from **Google AI Studio** or **Google Cloud Console** (enable the Gemini API; new Cloud
accounts often get trial credit).

> **creator-publish note:** the person creates the key and exports it in their shell profile (for example
> `GEMINI_API_KEY`); never put it in a project file, the repo or the chat.

## Capabilities relevant to social

- **Text-to-image** for posts, carousel slides, thumbnails, quote graphics, backgrounds.
- **Legible in-image text** (Pro is best-in-class, multilingual) — useful for slides/captions
  baked into the image.
- **Multi-image composition & brand consistency** — blend reference images; keep a product/character
  consistent across a set (key for a cohesive carousel).
- **Conversational editing** — iterate ("change the background", "make the headline bigger").
- **Up to 4K**; Search-grounding for factual/real-world accuracy.

> **creator-publish note:** Here, longer or exact in-image copy is composed with `compose:visual-composer`;
> resolutions available per model are in the chosen provider's schema.

## How skills use it

A skill produces the **slide/image text + a design brief**, fills the prompt skeleton (see
`carousel-writer/references/image-prompt-pack.md`), and either hands the user a ready-to-paste
prompt or, in an agentic setup, calls the API. For a consistent set, reuse one prompt skeleton +
the model's reference/consistency features. Then **hand the media to the downstream publishing step**: download the
output and upload via the publishing tool's **Media** domain (raw-bytes upload) to attach to a post.

> **creator-publish note:** Here: download the output, verify it, then use it directly or as a layer in a
> composition spec (`compose:visual-composer`). Publishing/scheduling is a downstream step outside this skill (a
> future creator-publish posting skill). `carousel-writer` (and its image-prompt pack) is not in this library.

## Compliance — AI-disclosure

All Nano Banana output carries an invisible (and often visible) **SynthID watermark** — it is
AI-generated media. Some publishing tools **auto-disclose on TikTok**; for other platforms, follow each
platform's AI-content rules and the brand's disclosure policy. Never bake **fabricated stats** into
an image.

> **creator-publish note:** Nano Banana output also carries C2PA credentials. Disclosure at publish time is handled
> by the downstream publishing step.

## Relationship to other pieces

- **This guide** = the connection/API layer (shared).
- **`nano-banana` mini-skill** (Tier 2, under the `image-prompt` router) = prompt craft / driving
  the model well.

> **creator-publish note:** In this library the prompt-craft layer is `image-gen:nano-banana` (under the
> `image-gen:image-prompt` router) and the connection layer is whichever provider is connected (this Gemini API guide,
> Higgsfield or another host).

- **A skill's bundled pack** (e.g., `carousel-writer`) = how that skill applies it.

## Skills that use it

`carousel-writer` (and `image-prompt`, `thumbnail-design`, `quote-cards-and-text-graphics`,
`infographic-and-data-viz`). Alternative text-in-image engine: `integrations/ideogram.md`.

> **creator-publish note:** In this library: `image-gen:image-prompt`, `design:thumbnail-design`,
> `design:quote-cards-and-text-graphics`, `design:infographic-and-data-viz`; the Ideogram guide is
> the `image-gen:ideogram` skill's references/tools/ideogram.md. `carousel-writer` is not in this library.
