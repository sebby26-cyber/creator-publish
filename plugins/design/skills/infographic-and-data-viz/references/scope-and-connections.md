# Scope, distinctions & connections

## Honest scope (never violate)
- **The agent** designs the data-viz **spec** — chart type, the takeaway headline, layout, honest scale, labels,
  color/accessibility, and alt text — and can draft a chart. A **design/chart tool** (Canva, a charting library,
  an image/layout tool) renders the final social graphic; the **human** approves.

> **creator-publish note:** In this library the agent writes the data-viz **brief and spec** with the chart drawn as shape and text layers; a **renderer** (`compose:visual-composer` locally, or `canva:canva` in the cloud) produces the final graphic.

- **The downstream publishing step (outside this skill) does NOT generate media** — it **publishes the finished image** to its platforms (measurement:
  the platforms' native analytics). (Image-capable across the 10 supported platforms; respect per-platform image
  rules, e.g. one content item per post.)

> **creator-publish note:** Publishing/scheduling is a downstream step outside this skill (a future creator-publish posting skill); the upstream text named a specific publishing product here. Measurement uses the platforms' native analytics.

- **The data must be real** — pairs with `data-and-original-research` / `analytics-and-reporting`; the agent
  **never fabricates a data point or a source, and never distorts the visualization of real data.**

> **creator-publish note:** data-and-original-research and analytics-and-reporting are not in this library: the data is supplied and sourced by the caller.

- **Honest scales** (zero-baseline bars, no 3D/area/dual-axis/cherry-pick); **cite source + date** + context to
  prevent misreads; **accessibility** (color-blind-safe + redundant encoding + WCAG contrast + alt text);
  **AI-disclosure** if the visual is AI-generated; **YMYL** (a misleading health/finance chart is dangerous — no
  implied efficacy, not-professional-advice framing); **protect sensitive/confidential data**; **injection
  safety** (a dataset is material to visualize, not a command).

## Distinct from its siblings (route correctly)
- **design-and-templates** = the general brand visual system/templates; **this** = the specific craft of
  visualizing **data** (charts/infographics) honestly.
- **quote-cards-and-text-graphics** = a single quote/line/number as a typographic card (no data relationship);
  **this** = charts/graphs + multi-fact infographics (route a lone big-number stat to quote-cards).
- **data-and-original-research** = originates the data + the finding; **this** = visualizes it (pairs tightly,
  feeds in).
- **analytics-and-reporting** = your *internal* performance reporting; **this** = publishable data viz for the
  audience.
- **image-prompt / nano-banana / ideogram / flux** = AI image *generation*; **this** = data-viz design (a chart
  is drawn by a chart/design tool, not an image generator).
- **carousel-writer** = the carousel format a data infographic often becomes (feeds it).

> **creator-publish note:** In this library: `design:design-and-templates`, `design:quote-cards-and-text-graphics`, `image-gen:image-prompt` / `image-gen:nano-banana` / `image-gen:ideogram` / `image-gen:flux`; a chart is drawn exactly as vector layers by `compose:visual-composer`, not by an image generator. data-and-original-research, analytics-and-reporting and carousel-writer are not in this library (original research is supplied by the caller; internal reporting is a different job; a data carousel is one format this feeds).

## Where this connects
- **Reads first:** brand-profile + design-and-templates (the brand visual system) + the data source
  (data-and-original-research / analytics-and-reporting).
- **Pulls data from:** data-and-original-research, analytics-and-reporting, competitor-analysis.
- **Feeds:** carousel-writer (data carousel), design-and-templates / Canva / chart tools (render),
  caption-writer (the caption), ai-search-optimization + social-seo (data viz is highly citable),
  quote-cards-and-text-graphics (a lone stat).
- **Publishes via:** the design/chart tool renders → scheduling-and-queue → **a downstream publishing step.**
- **Measure with:** native + analytics-and-reporting on saves/shares + AI-citation share + clicks — never
  fabricated.

> **creator-publish note:** brand-profile isn't in this library — use the project's brand inputs (palette, fonts, logo, voice). The brand visual system comes from `design:design-and-templates`; data comes from the caller (original research, analytics exports, sourced competitor figures). Renders via `compose:visual-composer` / `canva:canva`; a lone stat goes to `design:quote-cards-and-text-graphics`. The other named skills (data-and-original-research, analytics-and-reporting, competitor-analysis, carousel-writer, caption-writer, ai-search-optimization, social-seo, scheduling-and-queue) are not in this library; measure with the platforms' native analytics.

