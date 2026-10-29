---
name: design-and-templates
description: "The reusable on-brand template-SYSTEM skill: design a brand kit (tokens for colours, fonts, logo, spacing) plus a small set of reusable templates so a non-designer can produce consistent on-brand graphics fast across formats, using the BRAND framework. Use when someone wants templates, a brand kit, a consistent visual system, or help choosing/using a design tool (Canva/Adobe Express/Figma). This skill WRITES the system and the template specs (visual-composer spec files with brand tokens as variables); rendering is done by compose:visual-composer (deterministic local) or canva:canva (cloud, editable). Honest about the ~70-80% on-brand ceiling and AI copyright limits. Not for rendering pixels itself, not for single-format craft (design:thumbnail-design, design:pinterest-pin-design, design:quote-cards-and-text-graphics, design:infographic-and-data-viz use templates from this system), and not for image generation (image-gen:image-prompt)."
---

> **creator-publish note (do this first):** if the request names a project (for example "for Harbor Bakery") or
> the person has a Creator Publish projects folder, your **first action** is to invoke the `publish-core:publish`
> skill, before reading further or building anything. It supplies the project's saved defaults and locked rules
> and the package `status.md` where you record `Choices in effect`, run notes and outputs. Skip it only for a
> one-off graphic with no project.

# design-and-templates

The reusable on-brand **template-system** skill — a **brand kit** + a small set of reusable templates + the
rules + the workflow that let a non-designer ship consistent on-brand graphics fast. The agent **designs the
system**; a **design tool** or the **image tools** produce the graphics; the **finished asset goes on to
publishing/scheduling, a downstream step outside this skill.**

> **creator-publish note:** In this library the agent also writes the template specs; `compose:visual-composer` (deterministic local), `canva:canva` or another design tool renders the graphics; image tools supply generated imagery. Publishing/scheduling is a downstream step outside this skill (a future creator-publish posting skill); the upstream text named a specific publishing product here.

## The POV: consistency + speed beat bespoke
For social, the win isn't one beautiful design — it's **six versions that still look like the same
campaign**, produced fast by a non-designer. The lever is a **small reusable template system anchored in a
brand kit**, which prevents both **brand drift** and generic **"template energy."** **Brand-kit-first makes
the first draft ~80% on-brand instead of ~20%.** The honest ceiling: tools get you **~70–80% on-brand** — a
**human eye finishes the hero work.** The agent designs the **system**; a design tool (Canva/Adobe Express/
Figma) or the image tools **produce** the graphics; **a downstream publishing step (outside this skill) publishes the finished asset.**

## Read these first
1. **brand-profile** — the identity source this operationalizes.

> **creator-publish note:** brand-profile isn't in this library — use the project's brand inputs (palette, fonts, logo, voice). Those inputs are supplied by the caller or the project brand file.

2. the **recurring content needs** — what you actually post.

## The framework: BRAND
(Depth: `references/the-brand-framework.md`.)
- **B — Build the brand kit:** lock the tokens (colors, fonts, logo, spacing) — the consistency anchor
  (brand-kit-first = ~80% on-brand drafts).
- **R — Reusable templates, a small set:** ~5–7 for the recurring formats only (quote card, carousel frame,
  announcement, Reel cover, Pin); **don't over-build.**
- **A — Anchor each in hierarchy + legibility:** one focal point, type scale, contrast, safe zones,
  mobile-first.
- **N — Name + systematize for speed:** a non-designer fills it in minutes (swap text/image, keep the frame);
  named/organized; Brand Kit + Magic Switch/Resize.

> **creator-publish note:** With visual-composer: a tokens file + one template per format (see the Render section below); in Canva: Brand Kit + Magic Switch/Resize.

- **D — Deploy on-brand at scale:** brief the image tools (`image-prompt`) for generated imagery; the finished
  graphic goes on to publishing (a downstream step outside this skill); consistency across the grid; a human finishes the hero pieces.

> **creator-publish note:** `image-prompt` is `image-gen:image-prompt` in this library; after the imagery is in, render (visual-composer or Canva).

## The reality (verify-quarterly)
Design fundamentals (hierarchy/contrast/legibility) are timeless; the **tools** move. **Canva (Magic
Studio)** = social-first default (Brand Kit, Magic Design, Magic Switch/Resize, Dream Lab, Bulk Create; Pro
~$15/mo; ~70% "Canva-style" ceiling + AI credit limits; raw AI generally not copyrightable; Canva Shield
indemnification Enterprise-only). **Adobe Express+Firefly** = premium, **brand-safe** licensed AI + **IP
indemnification**. **Figma** = master design systems/governance (not daily social). Combine by strength zone;
brief the image tools (`image-prompt`) or Dream Lab/Firefly for generated imagery: `references/design-tools-
2026-reality.md`. The brand-kit spec, the starter template set + specs, the hierarchy/legibility rules, the
production workflow + worked examples: `references/building-the-system.md`.

> **creator-publish note:** Added tool: **visual-composer** (`compose:visual-composer`) = deterministic local rendering from versioned spec files (same spec = same pixels, no account needed). Use it for reproducible template output; Canva stays the editable cloud option.

## Render with visual-composer (creator-publish addition)
Templates are reusable visual-composer (`compose:visual-composer`) spec files
(`compose:visual-composer`; layer reference: `compose:visual-composer`, `references/composition-rules.md`) with the brand
kit as **variables**:
- **Tokens file** (`brand-tokens.json`): a flat JSON object, token name -> string value (colours, font
  families, copy). One per brand; it *is* the brand kit in machine form.
- **Template file** (`<format>.template.json`): a normal spec in which every brand- or copy-dependent value is an
  **entire JSON string** of the form `"{{token.name}}"` (strings only: colours, font family, text; numbers and
  geometry stay literal). One template per format: e.g. `post-1080x1350`, `square-1080x1080`, `story-1080x1920`,
  `pin-1000x1500`, `thumb-1280x720`. A "resize" is a sibling template with its own geometry and the same tokens.
- **Fill:** replace each `"{{k}}"` string with the token's value (JSON-escaped); no `{{` may remain. Save the
  filled spec next to the output (it is the reproducible source of that image).
- **Run:** `validate filled.json --out /abs/out.png`, then `render filled.json --out /abs/out.png --preview` (exact commands: the `compose:visual-composer` skill; Claude Desktop: the
  `visual_composer_validate` / `visual_composer_render` MCP tools). Inspect the preview; if copy overflows,
  shorten it or adjust the template box, not the brand tokens.
- Fonts must exist in the renderer's font dirs (bundled: Anton 400; Inter 400/700; DejaVu Sans 400/700; add
  brand fonts via `font_dirs` in `~/.creator-publish/config.json` or `CREATOR_PUBLISH_FONT_DIRS`). Logos/photos are `image` layers with absolute paths to supplied files.
- **Alternative:** `canva:canva` (cloud, editable designs from a Canva Brand Kit) when the team edits in Canva.

Minimal example: `examples/brand-post.template.json` (1080x1350 announcement), filled from
`examples/brand-tokens.example.json`:

```json
{
 "version": 1,
 "name": "brand-post",
 "description": "Reusable 1080x1350 announcement template. Placeholder strings (double-brace token names) are filled from a brand tokens file before validate/render.",
 "canvas": { "width": 1080, "height": 1350, "background": "{{brand.bg}}" },
 "output": { "path": "brand-post.png" },
 "layers": [
  { "id": "accent-bar", "type": "shape", "shape": "rect", "x": 80, "y": 120, "width": 120, "height": 14, "radius": 7, "fill": "{{brand.accent}}" },
  { "id": "kicker", "type": "text", "text": "{{copy.kicker}}", "font": { "family": "{{brand.font.body}}", "weight": 700 }, "size": 30, "letterSpacing": 4, "transform": "uppercase", "color": "{{brand.accent}}", "x": 80, "y": 170, "width": 920 },
  { "id": "headline", "type": "text", "text": "{{copy.headline}}", "font": { "family": "{{brand.font.display}}" }, "size": 150, "minSize": 72, "lineHeight": 1.02, "transform": "uppercase", "color": "{{brand.text}}", "x": 80, "y": 240, "width": 920, "height": 460, "valign": "top" },
  { "id": "body", "type": "text", "text": "{{copy.body}}", "font": { "family": "{{brand.font.body}}", "weight": 400 }, "size": 40, "minSize": 28, "lineHeight": 1.35, "color": "{{brand.text.muted}}", "x": 80, "y": 750, "width": 880, "height": 220 },
  { "id": "cta", "type": "text", "text": "{{copy.cta}}", "font": { "family": "{{brand.font.body}}", "weight": 700 }, "size": 34, "color": "{{brand.on.primary}}", "x": 108, "y": 1130, "width": 560, "background": { "color": "{{brand.primary}}", "padding": [18, 28], "radius": 40 } },
  { "id": "handle", "type": "text", "text": "{{copy.handle}}", "font": { "family": "{{brand.font.body}}", "weight": 400 }, "size": 28, "align": "right", "color": "{{brand.text.muted}}", "x": 600, "y": 1140, "width": 400 }
 ]
}
```

Tokens:

```json
{
 "brand.bg": "#101418",
 "brand.primary": "#ff5a36",
 "brand.on.primary": "#101418",
 "brand.accent": "#ffd23f",
 "brand.text": "#ffffff",
 "brand.text.muted": "#c9ced6",
 "brand.font.display": "Anton",
 "brand.font.body": "Inter",
 "copy.kicker": "New this week",
 "copy.headline": "The spring menu is here",
 "copy.body": "Twelve new plates, built around what the market had this morning.",
 "copy.cta": "Book a table",
 "copy.handle": "@yourstudio"
}
```

## Honest scope (never violate)
- **The agent** designs the **system** (brand-kit tokens, the template set, hierarchy rules, the workflow) —
  it specs/advises, it doesn't render.
- **A design tool** (Canva/Adobe Express/Figma) or **the image tools** produce the graphics; **the finished
  asset goes on to publishing/scheduling**, a downstream step outside this skill (publishing does **NOT** design,
  template, or generate).
- **Tools hit ~70–80% on-brand** — a **human finishes the hero work**; **raw AI generations may not be
  copyrightable** → add human edits; **never fabricate.** (Scope, distinctions + connections:
  `references/scope-and-connections.md`.)

> **creator-publish note:** The agent writes the template specs (visual-composer spec files with brand tokens as variables); rendering is `compose:visual-composer` (deterministic local), `canva:canva` or another design tool.

## Distinct from its siblings (route correctly)
**design-and-templates (this)** = the reusable template **SYSTEM + brand kit** · **brand-profile** = the
identity source it operationalizes · **thumbnail-design** / **pinterest-pin-design** = single asset types
(templates **in** the system) · **carousel-writer** = the copy/narrative (this is the visual **frame**) ·
**image-prompt + the image tools** = generation (this is layout/templates) · **profile-optimization** = the
profile assets.

> **creator-publish note:** In this library: `design:thumbnail-design`, `design:pinterest-pin-design`, `design:quote-cards-and-text-graphics`, `design:infographic-and-data-viz` = single asset types (templates in the system); `image-gen:image-prompt` + the image tools = generation; `compose:visual-composer` = the renderer. brand-profile, carousel-writer and profile-optimization are not in this library (use the project's brand inputs; carousel copy and profile assets are separate jobs).

## Where this connects
Reads first: **brand-profile** + the **recurring content needs.** Feeds the format siblings: **thumbnail-
design**, **pinterest-pin-design**, **instagram-reels-publishing** (cover), **carousel-writer** (the frame its
copy fills), **story-writer** — each a template in the system. Briefs for imagery: **image-prompt** →
**ideogram**/**flux**/**nano-banana** (or Dream Lab/Firefly). Publishes via: the **finished
asset** → **scheduling-and-queue →** a downstream publishing step outside this skill (post/Pin/cover/carousel media). Design + generation stay in
the design tool / image tools; publishing only publishes.

> **creator-publish note:** In this library: feeds `design:thumbnail-design`, `design:pinterest-pin-design`, `design:quote-cards-and-text-graphics`, `design:infographic-and-data-viz`; imagery via `image-gen:image-prompt` → `image-gen:ideogram` / `image-gen:flux` / `image-gen:nano-banana`; renders via `compose:visual-composer` or `canva:canva`. instagram-reels-publishing, carousel-writer, story-writer and scheduling-and-queue are not in this library.

## Definition of done
A reusable system: a brand kit (locked colors/fonts/logo/spacing) plus a small set (~5–7) of named templates
mapped to the real recurring formats, each with one focal point, a clear type scale, contrast, safe zones,
and mobile-first legibility; a non-designer production workflow (swap text/image → resize → export → into the
downstream publishing step) using the right tool for the team (Canva default / Adobe Express+Firefly for premium,
indemnified imagery / Figma for the master system), with generated imagery briefed to the image tools via
image-prompt; the honest ceiling stated (tools hit ~70–80% on-brand, a human finishes the hero work, raw AI
generations may not be copyrightable); the finished assets handed to the downstream publishing step; nothing fabricated;
correctly distinguished from brand-profile, thumbnail-design/pinterest-pin-design, carousel-writer, and
image-prompt.

> **creator-publish note:** With visual-composer the brand kit is a tokens file and each template fills from the tokens and validates; the non-designer workflow is fill tokens + copy → validate → render → inspect (or the Canva equivalent), with generated imagery briefed via `image-gen:image-prompt`.

## Run it (creator-publish addition)

`publish` coordinates this skill directly using the project's brand/rules, package status, selected source assets
and requested formats. This skill writes the design brief and, when local composition is selected, its
composition spec. Capture exact copy/data, concept/variant identity, references, dimensions and review state.
The LLM identifies missing imagery and hands only that work to the selected image skill.

Render through the selected `compose:visual-composer` or `canva:canva` route; preserve tool/model/template choices.
For local work, run the `compose:visual-composer` commands (validate, then render) on the saved spec. Validate and inspect the actual export, including mobile legibility, safe areas and crop. Record
selected draft/spec/asset IDs, defects and next action in package status. Revisions change only affected sources
and exports; final promotion distinguishes layout re-render, enhancement and regeneration. Missing connections
are reported rather than triggering an automatic tool substitution. Existing owner review/spending rules apply.

## Provenance (creator-publish addition)
Adapted from social-media-skills v1.0.1 (github.com/social-media-skills/skills, MIT, Frank Heijdenrijk);
licence: [LICENSE.social-media-skills](../../LICENSE.social-media-skills); see the repo NOTICE.md.
