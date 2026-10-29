# Scope, distinctions + connections

design-and-templates builds a **reusable on-brand template system** — a brand kit + a small set of reusable
templates + the rules + the workflow that let a non-designer ship consistent on-brand graphics fast. The
agent **designs the system**; a **design tool** (Canva/Adobe Express/Figma) or the **image tools** produce
the graphics; the **finished asset goes on to publishing/scheduling, a downstream step outside this skill.**

> **creator-publish note:** In this library the agent also writes the template specs; a **renderer or design tool** (`compose:visual-composer`, `canva:canva`, Adobe Express, Figma) or the image tools produce the graphics. Publishing/scheduling is a downstream step outside this skill (a future creator-publish posting skill); the upstream text named a specific publishing product here.

## Honest scope (never violate)
- **The agent** designs the **SYSTEM:** the brand-kit tokens, the small template set, the hierarchy/legibility
  rules, and the fast production workflow. It **advises/specs** — it doesn't render the graphics itself.

> **creator-publish note:** Its specs are template spec files with brand tokens as variables; it doesn't draw the pixels itself.

- **A design tool** (Canva Magic Studio / Adobe Express+Firefly / Figma) or **the image tools** (`image-prompt`
  → ideogram/flux/nano-banana; or Dream Lab/Firefly) **produce** the actual graphics.

> **creator-publish note:** `compose:visual-composer` renders deterministic local output; `image-prompt` is `image-gen:image-prompt`.

- **The finished asset goes on to publishing/scheduling** as post/Pin/cover/carousel media, a downstream step outside
  this skill. **Publishing** handles it like any image — it does **NOT** design, template, or generate.
- **Tools hit ~70–80% on-brand** — a **human eye finishes the hero work** (template tools produce recognizable
  "template energy" at the ceiling). **Raw AI generations may not be copyrightable** → **add human edits.**
  **Brand-kit-first** (80% vs 20% on-brand drafts). **Never fabricate.** **Verify-quarterly** (tool features).

## Distinct from its siblings
- **design-and-templates (this)** — the reusable **template SYSTEM + brand kit** (across asset types).
- **brand-profile** — the **brand identity/voice** (the **source** this operationalizes into a kit).
- **thumbnail-design** — **YouTube thumbnails** (one asset type — a template **in** the system).
- **pinterest-pin-design** — **Pinterest pins** (one asset type — a template **in** the system).
- **carousel-writer** — the carousel **copy/narrative** (this is the visual **frame** the copy fills).
- **image-prompt + the image tools** — **generation** of images (this is **layout/templates**; it briefs them
  when a template needs a generated image).
- **profile-optimization** — the **profile assets** (avatar/banner) — design touches these but
  profile-optimization owns the profile.

> **creator-publish note:** In this library: `design:thumbnail-design`, `design:pinterest-pin-design`, `design:quote-cards-and-text-graphics`, `design:infographic-and-data-viz` (templates in the system); `image-gen:image-prompt` + the image tools (generation). brand-profile isn't in this library — use the project's brand inputs (palette, fonts, logo, voice). carousel-writer and profile-optimization are not in this library either (carousel copy and profile assets are separate jobs).

## Where this connects
- **Reads first:** `brand-profile` (the identity source), the **recurring content needs.**
- **Feeds the format siblings:** `thumbnail-design`, `pinterest-pin-design`, `instagram-reels-publishing`
  (cover), `carousel-writer` (the frame its copy fills), `story-writer` — each is a **template in the system.**
- **Briefs for imagery:** `image-prompt` → `ideogram`/`flux`/`nano-banana` (or Dream Lab/
  Firefly) when a template needs a generated image.
- **Publishes via:** the **finished asset** → `scheduling-and-queue →` a downstream publishing step (post/Pin/cover/carousel
  media). **Design + generation stay in the design tool / image tools; publishing only publishes.**

> **creator-publish note:** In this library: feeds `design:thumbnail-design`, `design:pinterest-pin-design`, `design:quote-cards-and-text-graphics`, `design:infographic-and-data-viz`; briefs `image-gen:image-prompt` → `image-gen:ideogram` / `image-gen:flux` / `image-gen:nano-banana`; **renders via** `compose:visual-composer` (deterministic local) or `canva:canva` (cloud, editable). instagram-reels-publishing, carousel-writer, story-writer and scheduling-and-queue are not in this library.

