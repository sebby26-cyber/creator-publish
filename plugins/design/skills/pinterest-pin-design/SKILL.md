---
name: pinterest-pin-design
description: "Writes the design brief and composition spec for Pinterest pins: the visual half that pairs with the pin's keyword (chosen by separate keyword research). Use when someone wants to design a pin, a Pinterest pin image, a pin text overlay, fresh pin variations for an existing URL, or board covers. Designs and briefs the 2:3 (1000x1500) vertical pin: one focal point, a keyword text overlay readable at feed size, brand-consistent template, safe zones, and 3-5 visually distinct FRESH designs per destination URL. Uses the SAVED framework. Output is a brief plus a spec; rendering is done by compose:visual-composer (deterministic local) or canva:canva, with imagery from image-gen skills or a designer. No misleading pins, no repin-as-fresh dupes, engagement never fabricated. Distinct from Pinterest keyword/SEO and account strategy, design:design-and-templates (the template system) and design:thumbnail-design (YouTube)."
---

> **creator-publish note (do this first):** if the request names a project (for example "for Harbor Bakery") or
> the person has a Creator Publish projects folder, your **first action** is to invoke the `publish-core:publish`
> skill, before reading further or building anything. It supplies the project's saved defaults and locked rules
> and the package `status.md` where you record `Choices in effect`, run notes and outputs. Skip it only for a
> one-off graphic with no project.

# pinterest-pin-design

A **design-craft skill** — design the pin's concept + composition + overlay, produce the **brief**, and plan
the **fresh-pin variants**. The agent **designs + briefs + critiques**; a **human or image tool makes the
raster**; **a downstream publishing step publishes the finished pin** (image + title + description + board + link).

> **creator-publish note:** the upstream text names a specific publishing product throughout; in this library
> publishing/scheduling is a downstream step outside this skill (a future creator-publish posting skill), and the
> pin's title, description, board and link travel with it there. This skill also writes the composition spec;
> **`compose:visual-composer` renders** the pin from supplied imagery (or `canva:canva`, or a designer).

## The POV: a search result, not a post — designed to be found, saved, and clicked
A pin is a **search result in a two-column mobile feed**, competing at roughly **half a phone screen wide**
(~236px in the desktop grid). Its job is the **save and the outbound click**, and it keeps doing that job for
**months** (~4-month lifespan) — so a pin is an **asset, not a post.** Two rules anchor everything: the
**visual and the keyword are one unit** (this skill owns the visual; **pinterest-seo** owns the keyword — the
keyword goes in the **overlay AND the title**), and **fresh beats frequent reposting** — a "fresh pin" is a
**new image/layout/overlay for the same URL**, not a repin, and fresh designs drive **~90% of Pinterest
website traffic.** Design **mobile-first at feed size**, always in **2:3 (1000×1500)** — other ratios are
penalized.

> **creator-publish note:** pinterest-seo isn't in this library; Pinterest keyword research is done separately and the
> keyword is supplied by the caller.

## Read these first
1. **brand-profile** — palette/fonts/style (pins are a brand surface that must stay recognizable).
2. the **destination** — the page the pin links to (the visual must promise what the page delivers).
3. the **keyword** — from **pinterest-seo** (it goes in the overlay and the title).

> **creator-publish note:** brand-profile isn't in this library — use the project's brand inputs (palette, fonts, logo, voice).
> The keyword is supplied by the caller from Pinterest keyword research.

## The framework: SAVED
(Depth: `references/the-saved-framework.md`.)
- **S — Stop the scroll on a 2:3 canvas:** 1000×1500, 2:3 mandatory (other ratios penalized/cropped); one
  focal point; vertical composition; lifestyle/in-context imagery beats sterile product-on-white; parseable
  at feed size.
- **A — Anchor the keyword overlay:** the pinterest-seo keyword rendered large on the image (Pinterest
  OCR-reads it); ≤~6 words, bold, high contrast, readable at ~236px; top-third or center; not a caption
  duplicate.

> **creator-publish note:** in this library "the pinterest-seo keyword" is the target keyword supplied by the caller.

- **V — Visual brand system:** a pin template family (from **design-and-templates**) — consistent fonts/
  palette/layout; subtle logo/URL, **never bottom-right** (Pinterest's own icons overlay that corner).

> **creator-publish note:** in this library the template family comes from `design:design-and-templates`.

- **E — Every URL gets fresh variants:** 3–5 **visually distinct** designs per destination (different image
  + layout + overlay angle — not a color swap); each is a new chance to rank.
- **D — Decide the format + hand off:** static pin = the traffic workhorse (has the link); video pin (9:16,
  6–15s) = engagement; multi-slide/idea-style = awareness (historically no outbound link); board covers set
  the shelf aesthetic; brief → image tool → downstream publishing.

> **creator-publish note:** in this library the hand-off is brief → spec → render (`compose:visual-composer` or
> `canva:canva`) → human approval → downstream publishing (outside this skill).

## The reality (verify-quarterly)
Feed-size mobile-first (two-column feed, ~236px, ~85% mobile); 2:3 1000×1500 mandatory (other ratios
penalized, tall pins truncated); overlay text OCR-read (keyword on the image); lifestyle/in-context imagery;
faces optional (product/idea is usually the hero — unlike YouTube thumbnails); safe zones (margins, logo not
bottom-right, nothing critical in the bottom of extra-tall pins); fresh-pin economics (~90% of traffic,
3–5 distinct designs/URL, few-day test window); video 9:16 6–15s; idea pins folding into the unified format;
brand consistency without clone-stamping: `references/pin-design-2026-reality.md`. The pin brief template,
design checklist, spec block, fresh-variant plan + worked examples: `references/design-and-variant-recipes.md`.

## Honest scope (never violate)
- **The agent** designs the concept/composition/overlay text, writes the **brief**, plans the **fresh
  variants**, and can **critique a mockup** — but a **HUMAN or an image/design tool** (`ideogram` for
  in-image text / `canva` / `nano-banana` / a designer) **creates the final raster.**

> **creator-publish note:** in this library the agent also writes the composition spec; the pixels come from a renderer
> (`compose:visual-composer`, or `canva:canva`) composing supplied imagery, which is shot, generated
> (`image-gen:image-prompt` → `image-gen:ideogram` for in-image text / `image-gen:nano-banana` /
> `image-gen:flux`), or made by a designer.

- **The downstream publishing step publishes** the finished pin — **image + title + description + board +
  link** — it does **NOT** design, render, or generate the visual, and analytics are **native Pinterest
  Analytics**, not the publishing tool.

> **creator-publish note:** the upstream names its publishing product's board-ID field here; that tool-specific field is
> removed — the board travels with the pin to the downstream publishing step.

- **No misleading pins** — the visual must promise what the page delivers (**Pin → Board → Page must
  match**; long clicks rank you, bounces punish you). **No repin-as-fresh dupes** (a color swap is not a
  fresh pin). **Disclose AI imagery** (Pinterest lets users filter GenAI). **Never fabricate saves/clicks/
  impressions.** (Scope, distinctions + connections: `references/scope-and-connections.md`.)

## Distinct from its siblings (route correctly)
**pinterest-pin-design (this)** = the pin's VISUAL craft + brief + fresh-variant plan · **pinterest-seo** =
the keyword/search-RANKING layer (they **PAIR** — the keyword goes in the overlay AND the title) ·
**pinterest-growth** = the account strategy/cadence (boards, 72h same-URL spacing, seasonal timing) ·
**design-and-templates** = the brand template SYSTEM (the pin template is one asset in it) · **ideogram**/
**canva**/**nano-banana** = render the raster this briefs · **thumbnail-design** = the same craft for YouTube's
16:9 click decision (different job: click-to-watch vs save-and-click-out).

> **creator-publish note:** in this library the IDs are `design:pinterest-pin-design`, `design:design-and-templates`,
> `design:thumbnail-design`, `image-gen:ideogram` / `image-gen:nano-banana` / `image-gen:flux` (imagery) and
> `canva:canva`; `compose:visual-composer` renders the pin this specs. pinterest-seo and pinterest-growth are not
> in this library (keyword research and account strategy are done separately).

## Where this connects
Reads first: **brand-profile** + the **destination** + the keyword from **pinterest-seo**. Pairs with:
**pinterest-seo** (keyword in the overlay + title), **image-prompt** → **ideogram** (in-image overlay text)/
**nano-banana**/**flux** (backgrounds), **canva** (template production), **ai-image-editing** (crops/cleanup),
**design-and-templates** (the pin template in the brand system). Routes to/from: **pinterest-growth**
(strategy/cadence), **content-recycling** (which URLs deserve fresh variants), **seasonal-and-moment-marketing**
(45–90-day seasonal lead). Publishes via: **scheduling-and-queue → the downstream publishing step** (image + title + description
+ board + link) + **platform-specs-and-validation**. Measures with: native **Pinterest Analytics** +
**analytics-and-reporting** (saves, outbound clicks, impressions). The raster stays with the image tools/
designer; the words stay with pinterest-seo.

> **creator-publish note:** in this library: pairs with `image-gen:image-prompt` → `image-gen:ideogram` /
> `image-gen:nano-banana` / `image-gen:flux`, `canva:canva`, `image-gen:ai-image-editing`,
> `design:design-and-templates`, and `compose:visual-composer` (render). pinterest-seo, pinterest-growth,
> content-recycling, seasonal-and-moment-marketing, scheduling-and-queue, platform-specs-and-validation and
> analytics-and-reporting are not in this library: strategy inputs come from the caller, publishing/scheduling
> is a downstream step outside this skill, and the 2:3 spec check is done by `validate` in `compose:visual-composer` on
> the canvas size.

## Render with visual-composer (creator-publish addition)
The brief becomes a visual-composer (`compose:visual-composer`) composition spec
(`compose:visual-composer`; layer and fit rules: `compose:visual-composer`, `references/composition-rules.md`).
- **Canvas:** **1000x1500** (2:3) for static pins and board covers. Never taller (truncated in feed).
- **Layers:** the supplied lifestyle photo as a full-bleed `image` layer (`fit: cover`, `position` on the focal
  point) or in a framed area; a solid or semi-transparent overlay band (or a `gradient` scrim) in the top third;
  the keyword overlay as a bold text layer (≤~6 words, Anton or Inter 700, `align: center`); an optional sub-line;
  the domain or logo bottom-centre or top-left, **never bottom-right**. Margins ~5–8% (50–80 px).
- **Variants:** write one spec per fresh variant (new image + layout + overlay angle), not a colour swap of one
  spec; render them with the `batch specs/ --contact-sheet sheet.png` command of `compose:visual-composer` and compare at feed size.
- **Validate, render, inspect:** `validate spec.json --out /abs/out.png`, then `render spec.json --out /abs/out.png --preview` (exact commands: the `compose:visual-composer` skill; Claude Desktop: `visual_composer_validate`
  / `visual_composer_render`). Squint-test the preview at ~236 px wide.
- **Alternative:** `canva:canva` for an editable cloud design or a Canva brand template.

Example (vector-only stand-in, validates as-is; also at `examples/pin-overlay.json`). In production replace the
dashed placeholder rect and its note with an `image` layer pointing at the supplied photo (absolute path):

```json
{
 "version": 1,
 "name": "pin-overlay",
 "description": "Pinterest pin 1000x1500 (2:3), vector-only stand-in. In production the bottom layer is the supplied lifestyle photo (image layer, fit cover); the keyword overlay band sits in the top third; domain footer bottom-centre (never bottom-right).",
 "canvas": { "width": 1000, "height": 1500, "background": { "type": "linear", "angle": 180, "stops": [ { "offset": 0, "color": "#d9cbb3" }, { "offset": 1, "color": "#8c6f4e" } ] } },
 "output": { "path": "pin-example.png" },
 "layers": [
  { "id": "photo-placeholder", "type": "shape", "shape": "rect", "x": 60, "y": 660, "width": 880, "height": 680, "radius": 24, "fill": "#b59a78", "stroke": { "color": "#f4efe6", "width": 4, "dash": [16, 10] } },
  { "id": "photo-note", "type": "text", "text": "supplied lifestyle photo goes here", "font": { "family": "Inter", "weight": 400 }, "size": 32, "color": "#2b241c", "x": 60, "y": 660, "width": 880, "height": 680, "align": "center", "valign": "middle" },
  { "id": "overlay-band", "type": "shape", "shape": "rect", "x": 0, "y": 140, "width": 1000, "height": 460, "fill": "#24452f" },
  { "id": "keyword-overlay", "type": "text", "text": "Easy Fall Dinner Recipes", "font": { "family": "Anton" }, "size": 140, "minSize": 70, "lineHeight": 1.02, "transform": "uppercase", "color": "#f4efe6", "x": 70, "y": 190, "width": 860, "height": 290, "align": "center", "valign": "middle" },
  { "id": "sub-line", "type": "text", "text": "one pan · 30 minutes", "font": { "family": "Inter", "weight": 700 }, "size": 40, "color": "#f2c14e", "x": 70, "y": 515, "width": 860, "align": "center" },
  { "id": "footer-band", "type": "shape", "shape": "rect", "x": 0, "y": 1390, "width": 1000, "height": 110, "fill": "#24452f" },
  { "id": "domain", "type": "text", "text": "yourblog.com", "font": { "family": "Inter", "weight": 700 }, "size": 34, "color": "#f4efe6", "x": 0, "y": 1390, "width": 1000, "height": 110, "align": "center", "valign": "middle" }
 ]
}
```

## Definition of done
A 2:3 (1000×1500) vertical concept with one focal point in lifestyle/in-context imagery, parseable at feed
size; the pinterest-seo keyword rendered as a bold, high-contrast overlay (≤~6 words, OCR-readable, no
caption duplicate); brand-consistent template (fonts/palette/layout) with the logo out of the bottom-right;
safe margins and nothing critical lost to tall-pin truncation; 3–5 visually distinct fresh designs planned
per destination URL (new image + layout + overlay angle, never a repin/color swap); the right format chosen
(static for traffic, video 9:16 6–15s for engagement, multi-slide for awareness) and board covers consistent;
the raster briefed to an image tool/designer and the finished pin published via the downstream publishing step (image + title +
description + board + link); the visual honest to the destination; AI imagery disclosed; no fabricated
engagement; correctly paired with pinterest-seo and distinguished from pinterest-growth, design-and-templates,
and the image tools.

> **creator-publish note:** also done here: a spec that validates, rendered by `compose:visual-composer` (or `canva:canva`)
> and approved by the human.

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
Adapted from social-media-skills v1.0.1 (github.com/social-media-skills/skills, MIT, Frank Heijdenrijk); licence:
[LICENSE.social-media-skills](../../LICENSE.social-media-skills); see the repo NOTICE.md.
