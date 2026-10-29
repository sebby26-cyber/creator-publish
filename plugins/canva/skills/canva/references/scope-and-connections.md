# Scope, distinctions & connections

## Honest scope (never violate)
- **The agent** designs the specs (layout intent, copy, fields, sizes), writes the Bulk Create data, and — where
  the **Canva MCP / AI Connector or Connect APIs are connected** — can create, resize, and adapt designs directly
  (Brand-Kit-aware). Where no connector is available, the agent writes exact steps/specs and the **human executes
  in Canva.** No pretended automation.
- **The human approves every visual** before it ships — the agent doesn't judge visual quality it can't see, and
  never fabricates "that looks great."
- **Canva renders; a downstream publishing step publishes.** In this stack the finished export goes to scheduling-and-queue →
  downstream publishing (10 platforms, per-platform validation, one queue; measurement: the platforms' native analytics).
  Canva's own Content
  Planner exists — present the split as a stack choice, not a fabricated limitation. **The publishing step does not
  generate or edit designs.**

> **creator-publish note:** the upstream text names a specific publishing product here; in this library publishing/scheduling is a
> downstream step outside this skill (a future creator-publish posting skill). The
> upstream parenthetical (10 platforms, per-platform validation, one queue) described that product; whether to
> use Canva's Content Planner instead is the owner's stack choice. The Canva connector here is the owner's
> connected Canva account (MCP / AI Connector).

- **Licensing + IP:** use assets within Canva's license tiers; never strip watermarks, rip premium
  templates/assets, or impersonate another brand's look/logo/trade dress; no real-person likeness (real or AI
  lookalike) without permission.
- **AI-disclosure** for AI-generated visuals where platform/region requires (EU AI Act; C2PA); **accessibility
  floor** (contrast, sizes, alt text); **never fabricate** a metric, a credit allowance, or a capability —
  credits/features shift, check in-app (verify-quarterly).

## Distinct from its siblings (route correctly)
- **design-and-templates** = the brand visual *system* (what your brand looks like); **this** = executing that
  system in Canva at scale (how it gets produced).
- **image-prompt / ideogram / nano-banana / flux** = dedicated image *generation* (better pure
  quality); **this** = the brand-aware design workflow those images drop into.
- **ai-image-editing** = the inpaint/upscale/bg-removal router; Canva's Magic Eraser/Expand/Grab are
  its in-Canva equivalents.
- **infographic-and-data-viz / quote-cards-and-text-graphics** = what to make (the format craft + honesty
  rules); **this** = the tool that renders them.
- **capcut / descript** = video editing crafts; Canva Video 2.0 overlaps for simple motion — route
  serious video editing there.
- **canva (this)** also underpins **carousel-writer**, **thumbnail-design**, **story-writer** visuals.

> **creator-publish note:** in this library the IDs are `design:design-and-templates`, `image-gen:image-prompt` /
> `image-gen:ideogram` / `image-gen:nano-banana` / `image-gen:flux`, `image-gen:ai-image-editing` (the connector's
> `remove-background` is another in-Canva equivalent), `design:infographic-and-data-viz` /
> `design:quote-cards-and-text-graphics`, `design:thumbnail-design`. Also distinct: `compose:visual-composer` =
> deterministic local rendering from a JSON spec (exact, reproducible, not editable); **this** = cloud, editable
> designs. capcut, descript, carousel-writer and story-writer are not in this library (dedicated video editors
> handle serious video editing).

## Where this connects
- **Reads first:** brand-profile + design-and-templates (the system) + voice-builder (any copy).
- **Renders for:** quote-cards-and-text-graphics, infographic-and-data-viz, carousel-writer, thumbnail-design,
  before-after-and-transformation, story-writer, design-and-templates.
- **Pairs with:** image-prompt (+ the image tools) for hero imagery; Magic Switch for localization;
  content-recycling (one master → many cuts).
- **Publishes via:** export → scheduling-and-queue → **downstream publishing.**
- **Tool file:** `references/tools/canva.md` (connection layers, APIs/MCP, plan gates).
- **Measure with:** native + analytics-and-reporting on the published posts — never fabricated.

> **creator-publish note:** brand-profile isn't in this library — use the project's brand inputs (palette, fonts, logo, voice).
> In this library Canva renders for `design:quote-cards-and-text-graphics`, `design:infographic-and-data-viz`,
> `design:thumbnail-design`, `design:pinterest-pin-design`, `design:design-and-templates`, carousels and stories;
> voice-builder, carousel-writer, before-after-and-transformation, story-writer, content-recycling,
> scheduling-and-queue and analytics-and-reporting are not in this library (the voice comes from the brand
> inputs; measure with the platforms' native analytics). the upstream text names a specific publishing product here; in this library publishing/scheduling is a
> downstream step outside this skill (a future creator-publish posting skill).

