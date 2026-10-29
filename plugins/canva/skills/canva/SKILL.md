---
name: canva
description: "The Canva craft skill: execute on-brand social graphics, carousels, quote cards, infographics and thumbnails in Canva via the Canva connector (create, generate, resize, export, brand kits, background removal), at scale and without the 'Canva look', using the SCALE framework. Use when someone wants to design in Canva, set up or use a Canva Brand Kit, batch-produce graphics (Bulk Create), resize one design for every platform (Magic Resize), use Canva's AI (Magic Studio), or asks why their posts look like a template. Canva is the cloud, editable-design alternative to compose:visual-composer (deterministic local render from a JSON spec). Needs the owner's connected Canva account; otherwise writes exact steps for the human. The human approves every visual. Never strips watermarks, impersonates another brand, or uses unpermitted likeness; AI-disclosure + accessibility floor apply. Not for writing the brief (design:* skills), image generation or video editing."
---

# canva

The **on-brand-at-scale design tool skill** — start from the Brand Kit, customize past the template, automate the
repeatable, layer in AI while keeping it editable, and export right. The agent specs (and can drive Canva via its
connector), the **human approves every visual**, and **a downstream publishing step publishes** the finished file. (Ships with
`references/tools/canva.md`.)

> **creator-publish note:** the upstream text names a specific publishing product throughout; in this library
> publishing/scheduling is a downstream step outside this skill (a future creator-publish posting skill). The
> agent drives Canva via the Canva connector only where the owner has connected it.

## The POV: Canva's job is on-brand volume — the enemy is the "Canva look"
Canva in 2026 is not a template toy; it's a five-surface design platform (editor, Sheets, Code, Video 2.0,
Affinity) whose AI reads your **Brand Kit** before it generates — and the agent can operate it directly through
its **MCP connector**. Two top-1% moves separate expert use from everyone else's. **(1) Brand Kit first:** locking
colors/fonts/logos/voice before generating is the difference between ~20% and ~80% on-brand *first drafts* — most
users skip it and hand-fix every design forever. **(2) The automation layer is where the leverage is:** **Bulk
Create** (one master template + a CSV = 60 graphics in one run) is the most underrated feature in the product —
"almost nobody uses" it. And the craft edge: **templates are scaffolding, not the finished design** — the
recognizable "Canva look" (untouched layout, default fonts, familiar stock) is the tell that costs you
credibility, and de-templating (swap the stock, change the bones, apply the brand) is the fix. Honest trade-off
throughout: dedicated generators beat Dream Lab on pure image quality; Canva wins on the integrated brand-aware
workflow.

## Read these first
1. **brand-profile** + **design-and-templates** — the brand system this executes.
2. **voice-builder** — any copy on the designs (Magic Write is a second-pass editor, not the voice).

> **creator-publish note:** brand-profile isn't in this library — use the project's brand inputs (palette, fonts, logo, voice).
> voice-builder isn't in this library either: the brand voice comes from the same inputs. In this library
> design-and-templates is `design:design-and-templates`.

## Canva vs visual-composer (creator-publish addition)
Two renderers for the same briefs; pick per job:
- **`canva:canva` (this)**: cloud, **editable** designs the owner or team can keep tweaking in Canva; Brand Kits,
  templates, Magic tools (Resize, Switch, Bulk Create, Dream Lab, Magic Layers). Operated through the Canva
  connector tools `create-design`, `generate-design`, `resize-design`, `export-design`, `list-brand-kits` and
  `remove-background` (plus the rest of the connector's tools where present). **Guidance-only here:** every Canva
  action needs the owner's connected Canva account; without it, write exact in-app steps for the human.
- **`compose:visual-composer`**: **deterministic, local** rendering from a JSON composition spec: exact pixel
  sizes, bundled fonts, same spec = same pixels, no account or network, the spec is a reproducible file in the
  repo. Best for repeatable series, exact specs and automation; not an editable design file.
Common split: design the system/brief once (`design:*`), render repeatable formats with visual-composer, and use
Canva where humans need to edit, collaborate or use Canva's Magic tools.

## The framework: SCALE
(Depth: `references/the-scale-framework.md`.)
- **S — Start from the Brand Kit:** lock colors/fonts/logos/voice before generating; on Teams, lock templates +
  approvals so scale can't drift.
- **C — Customize past the template:** replace every stock element, change the layout bones, apply brand type +
  color, strip decorations — if a stranger can name the template, keep going.
- **A — Automate the repeatable:** Bulk Create (CSV → variants), Magic Resize (one master → every size), Magic
  Switch (formats + 150+ languages), Connect APIs/MCP for direct agent operation.
- **L — Layer in AI, keep it editable:** Dream Lab / Canva AI 2.0 / Magic Layers as editable material; Magic
  Write as second-pass; dedicated generators (→ image-prompt) when pure quality matters; AI-disclosure where
  required.

> **creator-publish note:** in this library image-prompt is `image-gen:image-prompt`.

- **E — Export right + hand to publish:** correct format/size per platform, legibility floor, alt text → the
  finished file → scheduling-and-queue → downstream publishing.

> **creator-publish note:** scheduling-and-queue isn't in this library; publishing/scheduling is a downstream step outside
> this skill (a future creator-publish posting skill).

## The reality (verify-quarterly)
2026 Canva: **Canva AI 2.0** (Apr 2026; editable design objects; the Canva Design Model + partner models),
**Magic Layers** (Mar 2026; AI image → editable layers; ~9M uses in month one; US/UK/CA/AU rollout), Dream Lab
(Leonardo-powered), Bulk Create, Magic Resize/Switch (150+ languages), Sheets/Charts, Video 2.0, and the unified
**Affinity app free** (since Oct 2025; AI features behind Pro).
**The agent can operate Canva** via the MCP server / AI Connector (Claude since Jul 2025; **Brand-Kit-aware since
Jan 2026**; also ChatGPT/Copilot) and the Connect APIs (Design Editing GA, Resize, Data Connectors). Plans: Pro ≈
$12–15/mo; **credit figures conflict across sources — check the in-app tracker** (added Mar 2026). Honest
trade-offs: Midjourney-class tools beat Dream Lab on image quality; pro prepress still needs Adobe. **Attribute
all; verify-quarterly.** Full detail: `references/canva-2026-reality.md`. The weekly loop, the Bulk Create
pattern, the de-templating checklist, and two worked examples: `references/workflows-and-templates.md`.

## Honest scope (never violate)
- **The agent** specs/drafts and — **where the Canva MCP/Connect APIs are connected** — creates/resizes/adapts
  directly; otherwise exact steps for the human. **The human approves every visual** (the agent never fabricates
  "that looks great"). **Canva renders; a downstream publishing step publishes** the finished export (10 platforms, validation,
  queue; measurement: the platforms' native analytics); Canva's own Content Planner exists — the split is a
  stack choice, stated honestly.
  **The publishing step does not generate or edit designs.**

> **creator-publish note:** the upstream parenthetical (10 platforms, validation, queue) described its own publishing product;
> in this library publishing/scheduling is a downstream step outside this skill, and whether to use Canva's
> Content Planner is the owner's stack choice. Agent operation here uses the Canva connector tools
> (`create-design`, `generate-design`, `resize-design`, `export-design`, `list-brand-kits`,
> `remove-background`) where connected.

- **Licensing/IP:** no watermark-stripping, template-ripping, brand impersonation, or unpermitted likeness (real
  or AI lookalike); **AI-disclosure** (EU AI Act; C2PA) for generated visuals; **accessibility floor** (WCAG
  contrast, sizes, ≤2 fonts, alt text); **never fabricate** credits, capabilities, or metrics — verify in-app.
  (Full scope: `references/scope-and-connections.md`.)

## Distinct from its siblings (route correctly)
**canva (this)** = the brand-aware design workflow/tool craft · **design-and-templates** = the brand visual
*system* this executes · **image-prompt / ideogram / nano-banana / flux** = dedicated image
generation (drops into this workflow) · **ai-image-editing** = the edit router (Magic Eraser/Expand/
Grab are the in-Canva equivalents) · **infographic-and-data-viz / quote-cards-and-text-graphics /
carousel-writer / thumbnail-design** = the format crafts this renders · **capcut / descript** = serious video
editing (Video 2.0 covers simple motion).

> **creator-publish note:** in this library the IDs are `canva:canva`, `design:design-and-templates`,
> `image-gen:image-prompt` / `image-gen:ideogram` / `image-gen:nano-banana` / `image-gen:flux`,
> `image-gen:ai-image-editing` (the connector's `remove-background` is another in-Canva equivalent),
> `design:infographic-and-data-viz` / `design:quote-cards-and-text-graphics` / `design:thumbnail-design` /
> `design:pinterest-pin-design`; `compose:visual-composer` is the deterministic local renderer (see Canva vs
> visual-composer above). carousel-writer, capcut and descript are not in this library.

## Where this connects
Reads first: **brand-profile** + **design-and-templates** + **voice-builder.** Renders for: **quote-cards-and-
text-graphics**, **infographic-and-data-viz**, **carousel-writer**, **thumbnail-design**, **before-after-and-
transformation**, **story-writer.** Pairs with: **image-prompt** + the image tools (hero imagery), **content-
recycling** (one master → many cuts), Magic Switch (localization). Publishes via: export → **scheduling-and-queue
→ downstream publishing.** Tool file: **`references/tools/canva.md`.** Measure with: native + **analytics-and-reporting**
— never fabricated.

> **creator-publish note:** brand-profile isn't in this library — use the project's brand inputs (palette, fonts, logo, voice).
> In this library Canva renders for `design:quote-cards-and-text-graphics`, `design:infographic-and-data-viz`,
> `design:thumbnail-design`, `design:pinterest-pin-design`, carousels and stories; voice-builder,
> carousel-writer, before-after-and-transformation, story-writer, content-recycling, scheduling-and-queue and
> analytics-and-reporting are not in this library (measure with the platforms' native analytics).

## Definition of done
On-brand Canva output produced through the system, not around it: Brand Kit locked first (colors/fonts/logos/
voice; templates + approvals locked on team tiers), templates used as scaffolding and customized past recognition
(stock replaced, bones changed, brand type/color applied — a stranger can't name the template), the repeatable
automated (Bulk Create for batches with a QA pass on overflow; Magic Resize for the platform set; Magic Switch
QA'd for localization), AI layered as editable material with honest trade-offs (dedicated generators for pure
quality; Magic Write as second-pass only) and AI-disclosure where required, and exports correct per platform with
the legibility floor held (contrast, sizes, ≤2 fonts, safe zones, alt text); agent operation via MCP/Connect APIs
only where actually connected (exact human steps otherwise), the human approving every visual, and the finished
file published via the downstream publishing step; licensing/IP clean (no watermark-stripping, template-ripping, impersonation, or
unpermitted likeness); **no fabricated credits, capabilities, or metrics**; and correctly distinguished from
design-and-templates, the image-generation tools, ai-image-editing, and the video editors.

> **creator-publish note:** also distinguished from `compose:visual-composer` (the deterministic local renderer).

## Run it (creator-publish addition)

`publish` supplies project/package identity, the selected brief, imagery, exact copy, brand/template IDs and
requested formats. Run the Canva work directly through the available Canva connector, reading its actual
schema before using brand kits, design creation, edits, resize or export. A listed connector does not prove
current capability: check the schema, not memory.

Preserve selected design/template/brand IDs and draft/final settings. Check supported route cost and existing
authorization/project caps; unknown price is not zero or unlimited authorization. If Canva is unavailable, save
the missing connection as next action; changing to local composition requires a resolved tool choice.

Persist exports with exact Canva design/job/result references and parent brief/image IDs. Retain the editable
design reference and selected draft/version for targeted edits. Inspect actual exports for copy, crop, brand and
legibility at each size, preserving existing human review. Hand the selected files/IDs, settings, review state,
defects and next action to `publish`; export does not authorize posting. Background removal may also be used by
`ai-image-editing` when Canva is the selected provider.

## Provenance (creator-publish addition)
Adapted from social-media-skills v1.0.1 (github.com/social-media-skills/skills, MIT, Frank Heijdenrijk);
licence: [LICENSE.social-media-skills](../../LICENSE.social-media-skills); see the repo NOTICE.md.
