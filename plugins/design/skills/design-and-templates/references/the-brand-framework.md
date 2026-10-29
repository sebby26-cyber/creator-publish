# The BRAND framework — a reusable on-brand template system

A small system + a brand kit lets a non-designer ship consistent on-brand graphics fast. The agent **designs
the system**; a **design tool** (Canva/Adobe Express/Figma) or the **image tools** produce the graphics; the
**finished asset goes on to publishing/scheduling, a downstream step outside this skill.**

> **creator-publish note:** In this library a **renderer or design tool** (`compose:visual-composer`, Canva, Adobe Express, Figma) or the image tools produce the graphics. Publishing/scheduling is a downstream step outside this skill (a future creator-publish posting skill); the upstream text named a specific publishing product here.

## B — Build the brand kit
- Lock the **design tokens:** **colors** (primary/secondary/accent + text), **fonts** (heading/body pairing),
  **logo** (+ clear-space), **spacing** (margins/grid). The consistency anchor. **Brand-kit-first = ~80%
  on-brand first drafts vs ~20%.**

## R — Reusable templates, a small set
- Cover the **recurring formats only** (quote card, list/carousel frame, announcement, Reel cover, Pin) —
  ~5–7, each mapped to a real recurring need. **Don't over-build** a library nobody maintains.

## A — Anchor each in hierarchy + legibility
- **One focal point**, a **type scale** (clear H/sub/body), **contrast** (text passes on the busiest
  background), **safe zones** (platform UI), **mobile-first** legibility (readable at thumb size).

## N — Name + systematize for speed
- A non-designer fills it in **minutes**: swap **text/image**, keep the **frame.** **Name + organize** the
  templates; use **Brand Kit + Magic Switch/Resize** (one design → all sizes). Boring + systematic wins.

> **creator-publish note:** With visual-composer: keep a **tokens file + one template per size**; in Canva: Brand Kit + Magic Switch/Resize.

## D — Deploy on-brand at scale
- Brief the **image tools** (`image-prompt`) for any generated imagery (or Dream Lab/Firefly); the **finished
  graphic goes on to publishing** (downstream) as post/Pin/cover/carousel media; keep **consistency across the grid**;
  a **human eye finishes the hero pieces** (tools hit ~70–80%).

> **creator-publish note:** `image-prompt` is `image-gen:image-prompt`; the finished graphic is rendered (visual-composer or Canva) before the publishing step.

## The brand-kit + template spec a request should fill
```
BRAND KIT: colors (primary/secondary/accent/text) | fonts (heading + body) | logo (+ clear-space) | spacing/grid
TEMPLATE SET (~5-7): quote card | carousel frame | announcement | Reel cover | Pin | <your recurring need>
PER TEMPLATE: aspect ratio (destination) | one focal point | type scale | contrast | safe zones | swap-fields (text/image)
WORKFLOW: brand kit -> pick template -> swap text/image -> resize (Magic Switch) -> export -> into the downstream publishing step
TOOLS: Canva (default) / Adobe Express+Firefly (premium, indemnified) / Figma (master system); image tools for generated imagery
TRUTH: tools hit ~70-80% on-brand (human finishes hero); raw AI gens may not be copyrightable (add human edits); never fabricate
```

> **creator-publish note:** visual-composer variant: WORKFLOW = brand kit (tokens) -> pick template -> swap text/image -> fill + validate + render (visual-composer); TOOLS add visual-composer (deterministic local) alongside Canva (default editable).

