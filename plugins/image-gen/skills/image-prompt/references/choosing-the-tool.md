# Choosing the Tool

The router. Match the job to the model, then hand off to that tool's mini-skill for the model-specific
craft. This is a decision layer, not a tool tutorial.

> Fast-moving landscape — re-verify the "best for X" picks quarterly. The principle (match the job to
> the tool) is stable; the specific winners shift.

> **creator-publish note:** providers here are equal choices, used through whatever the person has connected:
> the Google Gemini API (Nano Banana), OpenAI (GPT Image), Black Forest Labs (FLUX), Ideogram, Higgsfield (hosts
> several of these), or another host. There is no default provider; vendor APIs need the person's own keys. Midjourney, Recraft and veo-3 are tools outside this library. How each
> route below resolves here: see "Routes in this stack" after the tree.

## The decision tree

Pick by the **dominant requirement** of the image:

- **In-image TEXT / typographic design** (quote graphics, posters, logos, packaging, text-heavy
  layouts) → **`ideogram`** or **`nano-banana`**. Both are excellent at text now — **pick by
  tooling/ecosystem**, not a fake "best text" claim (Ideogram = design tooling, structured layout
  control; Nano Banana = Gemini reasoning, multi-image consistency, editing). Honest either-way.
- **Photoreal human portraits / luxury product realism** → **`nano-banana`** or **`flux`** (Midjourney externally). Avoid
  Ideogram for real faces.
- **Surreal / painterly / editorial art** → **Midjourney**-class (more artistic range).
- **Search-grounded infographics / accurate scenes / conversational editing**
  → **`nano-banana`** (Gemini reasoning + references up to ~14 + Magic-Fill-style editing).
- **Editing an existing image** ("change one thing, keep the rest" / inpaint/outpaint/fix) →
  **`nano-banana`** (conversational editing) or **`flux`** (Kontext instruction-based edits).
- **A consistent character/product across a set** → reference-image models (**`nano-banana`**
  references up to ~14, or **`flux`** multi-reference).
- **Brand-exact colors (hex parameters) / license control / open weights you can run/tune** →
  **`flux`** (or Ideogram's open weights).
- **Vector / SVG for brand work** → **Recraft** (vector-native).
- **Moving image / video** → **`veo-3`** (and animate a still via the image→video pipeline).

## Routes in this stack (creator-publish addition)

- **Text-heavy / typographic design** (quote cards, stat cards, thumbnail text, Pinterest pins,
  infographics, posters, anything with exact copy or a real logo) → **`compose:visual-composer`**:
  a deterministic local render from a composition spec (exact text, bundled fonts, real logo files, same
  pixels every time). The `design:*` skills write the brief/spec. If the design needs a picture behind the
  text, generate only a **text-free background** (next bullet) and compose the text on top.
- **Photoreal / general generation** (products, lifestyle scenes, backgrounds, illustration, consistent
  sets) → any connected provider: the **Gemini API** (Nano Banana), **OpenAI** (GPT Image), **BFL** (FLUX),
  **Higgsfield** (Nano Banana, FLUX, GPT Image, Seedream, Soul) or another host. Use the one the request or
  project names; otherwise ask.
  - Optional helper skills: `higgsfield` (prompting method for Higgsfield) and `openai-image` (OpenAI
    images), each only if installed. Without them, write the prompt directly from the provider's tool schema;
    parameters and aspect ratios always come from that schema, never invented.
  - Model-specific craft to inform the brief: `image-gen:nano-banana` (multi-image consistency,
    conversational edits), `image-gen:flux` (hex-exact colour, multi-reference, Kontext edits).
- **In-image AI typography when composition is not enough** (stylised lettering fused into the art,
  logo-like type treatments) → **`image-gen:ideogram`** (needs the person's Ideogram key/account). If not, compose
  the text instead.
- **FLUX** → the BFL API (or open weights), Higgsfield, or another host the person has connected.
- **Editing an existing image** (remove background, upscale, outpaint/extend, inpaint, restyle, fix one
  thing) → **`image-gen:ai-image-editing`**, which routes to the connected provider's edit tools
  (Higgsfield, OpenAI image edits, Gemini editing, FLUX Kontext) or Canva background removal.
- **Editable cloud layouts / brand-kit templates / team handoff** → **`canva:canva`** (an alternative renderer
  to `compose:visual-composer`: cloud and editable vs deterministic and local).
- **Nano Banana** → the Gemini API / Google AI Studio / Vertex with the person's key, or a host such as
  Higgsfield.
- **Vector / SVG for brand work** → Recraft is outside this library; or draw it as shapes in a composition spec.
- **Moving image / video** → veo-3 is outside this library (a separate video-generation step).

## Honest "which of two?" calls

When two tools both fit (common with text graphics), **say both work and pick by the deciding factor** —
the workflow you're already in, the controls you need (Style References vs reference images vs editing),
the ecosystem (Gemini vs Ideogram), cost, or open-weights/MCP access. Don't manufacture a clean winner
where there isn't one.

> **creator-publish note:** here the deciding factor is often which providers the person has connected and whether the text must be exact (then compose it).

## Then hand off

Once routed, **hand off to the tool's mini-skill** for the model-specific craft:
- `nano-banana` — Gemini image prompt craft (text, consistency, editing).
- `ideogram` — typography/layout prompt craft (exact text in quotes, structured layout).
- `flux` — variant + license picks, instruction-based edits, multi-reference consistency, hex colors.
- `veo-3` — video prompt craft (audio, camera, image-to-video).

> **creator-publish note:** in this library the hand-offs are `image-gen:nano-banana` (destination Higgsfield),
> `image-gen:ideogram`, `image-gen:flux`, `image-gen:ai-image-editing` (edit plans and engine routing),
> `compose:visual-composer` (composition spec and render for text-led designs) and `higgsfield` (installed
> separately; writes the final prompt for any Higgsfield destination). veo-3 is not in this library.

The **connection/API** for each lives in references/tools/<tool>.md. After generation, the image/
video is **uploaded to Media and attached to the post** via `scheduling-and-queue` —
**the publishing step publishes; it doesn't generate.**

> **creator-publish note:** publishing/scheduling is a downstream step outside this skill (a future creator-publish posting
> skill); scheduling-and-queue is not in this library. This skill has no references/tools/ folder; the
> connection guides live in `image-gen:ideogram`, `image-gen:flux`, `image-gen:nano-banana` and
> `image-gen:ai-image-editing`.

## If no tool fits

If the best answer is a **real photo, screenshot, chart, or UGC** (see `the-image-brief.md`), route
there instead of forcing generation.
