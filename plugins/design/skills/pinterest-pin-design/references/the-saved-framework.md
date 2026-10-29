# The SAVED framework — design a pin that gets found, saved, and clicked

A pin is a **search result, not a post** — it competes in a two-column mobile feed at roughly half a phone
screen wide, and its job is the **save and the outbound click**, repeated for months. SAVED gets there. The
agent **designs + briefs + plans the variants**; a **human or image tool makes the raster**; **the downstream
publishing step publishes the finished pin** (image + title + description + board + link).

> **creator-publish note:** the upstream text names a specific publishing product here; in this library
> publishing/scheduling is a downstream step outside this skill (a future creator-publish posting skill). The
> agent also writes the composition spec; a **renderer composes the pin** (`compose:visual-composer`, or
> `canva:canva`) from supplied imagery.

## S — Stop the scroll on a 2:3 canvas
- **2:3 ratio, 1000×1500** — non-negotiable (other ratios are penalized; pins taller than 2:3 get truncated
  in the feed). **One focal point**, vertical composition that uses the height (subject up top, overlay
  band, breathing room). **Lifestyle / in-context imagery** beats sterile product-on-white — show the
  outcome (the styled room, the plated dish, the finished project). Must parse at **feed size** (~236px
  desktop, half a phone screen).

## A — Anchor the keyword overlay
- The **pinterest-seo keyword rendered ON the image** — Pinterest OCR-reads overlay text, so the overlay is
  a ranking surface, not decoration. **≤~6 words**, bold (a strong sans-serif or the brand's display face),
  **high contrast** against its background (solid/semi-transparent band if the photo is busy). Place it in
  the **top third or center** — never only in the bottom of an extra-tall pin. It states the pin's promise;
  it doesn't duplicate the description word-for-word.

> **creator-publish note:** "the pinterest-seo keyword" is, in this library, the target keyword from keyword research done
> separately and supplied by the caller.

## V — Visual brand system
- A **pin template family** (built with **design-and-templates**): locked fonts, palette, overlay position,
  logo treatment — so your pins are recognizable on a crowded search page. **Subtle logo or domain**, and
  **never in the bottom-right corner** (Pinterest overlays its own icons there). A "family" look, not
  identical clones — clone-stamped pins read as spam and defeat the fresh-pin test.

> **creator-publish note:** in this library the template family is built with `design:design-and-templates`.

## E — Every URL gets fresh variants
- **3–5 visually distinct designs per destination URL.** "Fresh" = a **new image + new layout + new overlay
  angle** — NOT a repin, and not the same design with a swapped color. Each fresh design gets its own
  few-day test window and is a **new chance to rank for a new phrase** (vary the overlay keyword per
  variant, with pinterest-seo). Fresh designs drive **~90% of Pinterest website traffic.** Cadence and the
  ~72h same-URL spacing belong to **pinterest-growth**; this skill makes the variants genuinely different.

> **creator-publish note:** pinterest-seo and pinterest-growth aren't in this library: vary the keyword with the caller's
> keyword research; cadence and spacing belong to the caller's account strategy.

## D — Decide the format + hand off
- **Static pin** = the **traffic workhorse** (carries the link; most outbound clicks). **Video pin** (9:16,
  6–15s, readable without sound) = engagement/attention. **Multi-slide / idea-style** = awareness and saves
  (historically no outbound link — being folded into the unified pin format; verify). **Board covers** set
  the shelf: one consistent cover style per board so the profile reads as a curated catalog. Then: brief →
  `ideogram`/`canva`/`nano-banana`/a designer → the finished pin publishes via **the downstream publishing step**.

> **creator-publish note:** in this library the hand-off is brief → spec → `compose:visual-composer` (imagery from
> `image-gen:ideogram` / `image-gen:nano-banana` / a designer; or `canva:canva`) → human approval → downstream
> publishing.

## The pin brief a request should fill
```
DESTINATION: the page the pin links to; the visual must promise what it delivers (Pin -> Board -> Page match)
KEYWORD: from pinterest-seo -- goes in the overlay AND the title
CANVAS: 2:3, 1000x1500; one focal point; lifestyle/in-context; parseable at ~236px
OVERLAY: <=~6 bold high-contrast words, top-third/center, OCR-readable; band if the photo is busy
BRAND: template fonts/palette/layout; subtle logo NOT bottom-right
VARIANTS: 3-5 visually distinct fresh designs (new image + layout + overlay angle each)
FORMAT: static (traffic) / video 9:16 6-15s (engagement) / multi-slide (awareness); board cover style
HAND-OFF: raster by image tool/designer; publish downstream; metrics native (never fabricated)
```

> **creator-publish note:** in this library KEYWORD comes from keyword research (supplied by the caller), and HAND-OFF is
> spec -> `compose:visual-composer` (or `canva:canva`); publishing is downstream.

