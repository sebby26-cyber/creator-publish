---
name: image-prompt
description: "Foundation and router for any image a post needs: turn a social need into a clear image brief, describe it with model-agnostic prompt craft, and route to the right production path. Use when the user says \"I need a visual/image for this post\", \"what image should I use\", \"help me prompt an image\", or is unsure which image tool/model to use. Includes a \"should this even be AI-generated?\" gate (a real photo, screenshot or chart often wins), accessibility, and honest scope (disclose AI, no real identifiable people or copyrighted IP, verify text/data). Writes the brief and prompt only; it does not render. Routing: text-heavy/typographic layouts -> compose:visual-composer (deterministic render); photoreal/general generation -> any connected provider as equal choices (Gemini API, OpenAI, BFL, Higgsfield or another host; optional helper skills higgsfield and openai-image if installed); in-image AI typography -> image-gen:ideogram; edits -> image-gen:ai-image-editing; editable cloud layouts -> canva:canva. Direct Gemini is not a provider here."
---

# Image Prompt (brief · craft · router)

The **foundation of the visual cluster.** When a post needs an image, this skill decides **what** image
(the brief), describes it with **model-agnostic** craft, and routes to the **right tool** — then hands
off. It sits *above* the tool-specific mini-skills (`nano-banana`, `ideogram`, `flux`,
`veo-3`), which own their model's specific tricks.

> **creator-publish note:** in this library the tool skills are `image-gen:nano-banana`, `image-gen:ideogram`,
> `image-gen:flux` and `image-gen:ai-image-editing`; `canva:canva` covers cloud editable layouts. veo-3 is not
> in this library (video generation is a separate step outside this plugin).

Think of it as the visual equivalent of `brand-profile`/`content-pillars`: the shared decision layer
the tool skills assume you've already worked through.

> **creator-publish note:** brand-profile isn't in this library — use the project's brand inputs (palette,
> fonts, logo, voice). content-pillars is not in this library either.

## Higgsfield prompting rule (creator-publish addition)

The prompt craft here applies to direct-vendor use. When the destination is **Higgsfield** (any model on it:
Nano Banana, FLUX, GPT Image, Seedream, Soul...), write the final prompt with the optional `higgsfield` prompting skill if it is installed: load it, read its root `SKILL.md`, `skills/higgsfield-prompt/SKILL.md` and the model
sub-skill its routing table names; take model parameters, presets and aspect ratios from its specs, never
invented. Without it, write the prompt from this skill's brief, taking parameters and aspect ratios from the
provider's tool schema. Use this skill's brief as the input either way.

## Step 0 — Gate: should this even be AI-generated?

AI generation is one option, not the default. A **real photo** (your actual product/space/team), a
**screenshot**, **UGC**, or a **chart** often wins on authenticity and clarity — and AI must never
fabricate your real people/place. Reach for generation when you need something that doesn't exist, must
match a brand look, needs legible in-image text, or a consistent series — and no real asset fits. If a
real asset is better, **say so.** (See `references/the-image-brief.md`.)

> **creator-publish note:** if the image is mostly **text** (a quote, a stat, a headline card) and the copy must
> be exact, lay it out deterministically with `compose:visual-composer` instead of generating it (generate at
> most a text-free background). Use generated in-image text only when the lettering must be integrated into the
> art (Step 3).

## Step 1 — Write the brief

Read `brand-profile.md`, then answer four things: **job/purpose** (hero / explainer / quote graphic /
product / lifestyle / thumbnail / background / ad), **the one thing it must convey**, **format/aspect
ratio** for the destination, and the **brand look**. Output a one-line brief. See
`references/the-image-brief.md`.

> **creator-publish note:** brand-profile.md is not part of this library; read the project's brand inputs
> (palette, fonts, logo, voice) supplied by the caller or the project brand file.

## Step 2 — Describe it (model-agnostic)

Turn the brief into a **specific, natural-language** prompt — **subject · composition · lighting ·
colour · style · mood · detail · constraints** — and **drop quality-token spam** ("4k, masterpiece").
Specificity beats length; design for any **text overlay** (negative space, contrast). See
`references/prompt-anatomy.md`.

## Step 3 — Route to the tool

Pick by the image's **dominant requirement**:

- **Text / typographic** → `ideogram` or `nano-banana` (both strong — honest pick by tooling).
- **Photoreal portrait/product** → `nano-banana` or `flux` (Midjourney external). **Surreal/painterly** → Midjourney.
- **Editing** ("change one thing, keep the rest") → `nano-banana` (conversational) or `flux` (Kontext).
- **Consistent character/product set** → `nano-banana` (multi-image references) or `flux` (multi-reference).
- **Search-grounded infographics** → `nano-banana`. **Brand-exact hex / open weights / license control** → `flux`.
- **Vector/SVG** → Recraft. **Video** → `veo-3`.

When two fit, **say both work and pick by the deciding factor** — don't fake a winner. See
`references/choosing-the-tool.md`.

> **creator-publish note:** how these routes resolve here (see the route table below): exact text →
> `compose:visual-composer`; every generation model is reached through whichever provider the person has
> connected (Higgsfield, the vendor's own API, or another host), with no default provider; Midjourney, Recraft and
> veo-3 are tools outside this library.

### Route table in this stack (creator-publish addition)

| Need | Route | Notes |
|---|---|---|
| Text-heavy / typographic design (quote cards, stat cards, thumbnail text, pins, infographics, exact copy, real logos) | **`compose:visual-composer`** — deterministic local render from a composition spec | Exact text, real fonts, real logo files, same pixels every time. If a picture is needed behind the text, generate only a **text-free background** (row below) and compose the text on top. Brief/spec craft: the `design:*` skills. |
| Photoreal / general generation (people-free scenes, products, lifestyle, backgrounds, illustration) | Any connected provider, as equal choices: **Google Gemini API** (Nano Banana), **OpenAI** (GPT Image; the optional `openai-image` skill if installed), **Black Forest Labs** (FLUX), **Higgsfield** (Nano Banana, FLUX, GPT Image, Seedream, Soul; the optional `higgsfield` prompting skill if installed), or another host | Model-specific craft: `image-gen:nano-banana`, `image-gen:flux`. Use the provider the request or project names (`providers.default`, `models.image`); otherwise ask. Without an optional helper skill, write the prompt directly from the provider's tool schema. |
| In-image AI typography when composition is not enough (stylised lettering integrated into the art) | `image-gen:ideogram` (Ideogram API or app) | Needs the person's Ideogram key/account. Otherwise prefer composition. |
| FLUX specifically (hex-exact colour, multi-reference, Kontext edits) | FLUX via the BFL API, Higgsfield or another host the person has connected | Craft: `image-gen:flux`. |
| Editing an existing image (remove background, upscale, outpaint, inpaint, restyle) | `image-gen:ai-image-editing` | Routes to the connected provider's edit tools (Higgsfield, OpenAI image edits, Gemini editing, FLUX Kontext) or Canva background removal. |
| Editable cloud layouts, brand-kit templates, team handoff | `canva:canva` | Alternative renderer to `compose:visual-composer` (cloud, editable vs deterministic local). |
| Moving image / video | Outside this plugin | A video-generation step handles it. |

## Step 4 — Hand off, then ship

**Hand off to the tool's mini-skill** for model-specific craft (and references/tools/<tool>.md for
the API). After generation: **verify** in-image text/data, **disclose** AI per platform/region, then
**upload to Media → attach** via `scheduling-and-queue`. The publishing step publishes; it **doesn't
generate**.

> **creator-publish note:** the API/connection guide for each tool lives in that tool skill's
> references/tools/<tool>.md (e.g. `image-gen:ideogram`, `image-gen:flux`). Higgsfield destinations: the optional
> `higgsfield` skill can write the final prompt if installed (otherwise use the provider's tool schema). Publishing/scheduling is a downstream step outside this skill (a
> future creator-publish posting skill); upstream named a specific publishing product and the
> scheduling-and-queue skill here (not in this library). Publishing does not generate images.

## Cross-cutting (always)

- **Disclose AI** per platform/region (Meta "Made with AI", EU AI Act). **Watermark behaviour varies by
  tool** (SynthID on Google tools; none enforced on Ideogram) — don't rely on it for disclosure.
- **No real people / no IP** — no real identifiable individuals, copyrighted characters, or trademarked
  logos; original directions only.
- **Verify** in-image text and data before publishing.
- **Accessibility** — contrast + legibility on mobile; leave room for overlays.

## Quality bar — self-check

- Did I **gate** (real asset vs AI) before generating?
- Did I write a **brief** (job + the one thing + format + brand) and a **specific, natural-language**
  prompt (no token spam)?
- Did I **route by the dominant requirement** with an honest which-tool read, and **hand off**?
- Did I design for **overlays/accessibility**, and cover **disclosure, IP, and verification**?
- Did I keep the publishing step honest (publishes via Media; doesn't generate)?

> **creator-publish note:** also check: text-led and exact copy → `compose:visual-composer`, not generation; if
> the destination is Higgsfield, do the prompt's parameters match the chosen provider's schema (for Higgsfield, via the optional `higgsfield` skill if installed)?

## Edge cases & pushback

- **"Just write a cool image prompt"** → build the brief first; purpose before prompt.
- **"4k masterpiece ultra-detailed"** → rewrite into a specific scene; drop quality tokens.
- **"Generate my real cafe/staff"** → use a real photo; don't fabricate real people/place.
- **"Base it on [studio]'s characters" / a real person** → refuse IP/real people; original direction.
- **"Which model — A or B?"** → honest, tooling-based answer; both can be right.
- **"Generate it in the publishing tool"** → the publishing tool doesn't generate; route to a tool, then upload + attach.

> **creator-publish note:** two more cases in this stack: **"Generate a quote card with this exact text"** →
> compose it with `compose:visual-composer`; generate at most the background. **"Use Gemini / my AI Studio
> key"** → fine: Nano Banana through the Gemini API with their key (see `image-gen:nano-banana`).

## Related

- `nano-banana`, `ideogram`, `flux`, `veo-3` — the tool-specific mini-skills this routes/hands off to.
- `references/tools/*` — the connection/API for each tool; `brand-profile` — the visual brand.
- `carousel-writer`, `reels-script`, `caption-writer`/`hook-writer` — consumers (image-prompt-pack / overlay copy).
- `scheduling-and-queue` — upload the asset to Media and attach to a post.

> **creator-publish note:** in this library: `image-gen:nano-banana`, `image-gen:ideogram`, `image-gen:flux`,
> `image-gen:ai-image-editing`, `canva:canva` (cloud editable layouts), `compose:visual-composer` (deterministic
> render of text-led designs; the `design:*` skills write those briefs); `higgsfield` and `openai-image` are
> optional third-party skills, not part of this library; without them, write the prompt directly from the
> provider's tool schema. veo-3, brand-profile, carousel-writer, reels-script, caption-writer,
> hook-writer and scheduling-and-queue are not in this library; `references/tools/*` means each tool skill's
> own references/tools/ guide (this skill has none). Publishing/scheduling is a downstream step outside this
> skill.

## References

- `references/the-image-brief.md` — the "should this be AI?" gate and the four-question brief.
- `references/prompt-anatomy.md` — the universal, model-agnostic anatomy of a strong prompt.
- `references/choosing-the-tool.md` — the router/decision tree and honest which-tool calls.
- `references/examples.md` — end-to-end flows, weak→strong, the don't-generate gate, and honest scope.

## Run it (creator-publish addition)

`publish` coordinates this skill directly from the project/package record, selected brief and exact source/reference
files or IDs. Apply this skill's craft to the chosen image model; preserve explicit tool/provider/model/route/seed/quality
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

Adapted from social-media-skills v1.0.1 (github.com/social-media-skills/skills v1.0.1 skills/image-prompt, MIT,
Frank Heijdenrijk); licence: [LICENSE.social-media-skills](../../LICENSE.social-media-skills); see the repo
NOTICE.md. Original author text is kept verbatim; creator-publish additions are labelled as notes or sections.
