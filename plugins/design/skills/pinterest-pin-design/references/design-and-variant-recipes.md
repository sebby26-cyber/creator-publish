# Pin brief template, design checklist, spec block, fresh-variant plan + two worked examples

## The promise line (write this first)
```
This pin shows [searcher] [the specific outcome on the destination page] -- found via [keyword].
-> The IMAGE shows the outcome; the OVERLAY names the keyword promise; the PAGE delivers it.
   (Keyword from pinterest-seo -- it goes in the overlay AND the title.)
```

> **creator-publish note:** pinterest-seo and pinterest-growth aren't in this library: the keyword (and title/description/board
> words) comes from keyword research done separately and supplied by the caller; cadence and spacing come from
> the caller's account strategy.

## Design checklist (evaluate before handing off the brief)
```
[ ] 2:3 ratio, 1000x1500; vertical composition that uses the height (no dead bars)
[ ] One clear focal point; lifestyle/in-context imagery showing the OUTCOME (not sterile product-on-white)
[ ] Overlay: the pinterest-seo keyword, <=~6 bold words, high contrast (band if the photo is busy)
[ ] Overlay readable at feed size (~236px / half a phone screen) -- squint test or 25% zoom
[ ] Overlay in the top third or center; nothing critical in the bottom of a tall pin (truncation)
[ ] Brand: template fonts/palette/overlay position; subtle logo/domain NOT in the bottom-right
[ ] Margins ~5-8%; nothing critical at the edges
[ ] Honest: the image promises exactly what the destination page delivers (Pin -> Board -> Page match)
[ ] Variants: 3-5 visually distinct fresh designs planned (new image + layout + overlay angle each)
```

## Spec block
```
Static pin: 2:3, 1000x1500 px, PNG/JPG, RGB. Other ratios penalized; taller than 2:3 truncates in feed.
Video pin: 9:16, 6-15s, readable without sound (overlay carries it).
Multi-slide / idea-style: awareness + saves; historically no outbound link -- verify (unifying format).
Board cover: same 2:3 template, one style per profile.
Raster created by an image/design tool (ideogram for in-image text / canva / nano-banana / a designer) -- NOT by the publishing tool.
Publish: downstream publishing step -- pin image + title (<=100) + description + board + link (<=2048).
Words (title/description/board names): pinterest-seo. Cadence (~72h same-URL spacing, 45-90d seasonal): pinterest-growth.
```

> **creator-publish note:** in this library the pin is composed by `compose:visual-composer` (or `canva:canva`) from
> imagery shot, generated (`image-gen:ideogram` for in-image text / `image-gen:nano-banana` / `image-gen:flux`)
> or made by a designer. Publishing/scheduling is a downstream step outside this skill (a future creator-publish
> posting skill); the upstream text names a specific publishing product and its board-ID field here (removed).

## Fresh-variant plan template (3–5 distinct designs per destination URL)
```
Variant 1 -- single hero: one outcome photo + keyword overlay        e.g. styled pantry + "Small Pantry Organization Ideas"
Variant 2 -- list/number: numbered promise + supporting collage      e.g. "12 Pantry Storage Ideas" + 3-photo grid
Variant 3 -- before/after: split frame, honest same-conditions pair  e.g. cluttered -> labeled bins
Variant 4 -- text-led: brand-template text card, minimal imagery     e.g. bold claim + palette + small photo
Variant 5 -- detail/close-up: the most save-worthy single detail     e.g. the label system close-up
Rule: each variant = a NEW image + layout + overlay angle (a color swap is a dupe, not a fresh pin).
Vary the overlay keyword per variant with pinterest-seo (each fresh pin can rank for a new phrase).
Spacing (~72h between pins to the same URL) and boards: pinterest-growth. Results: native Pinterest
Analytics (saves, outbound clicks, impressions) -- never fabricated.
```

## Worked example 1 — blog traffic, faceless (food blog, warm voice)
```
DESTINATION: /one-pan-fall-dinners (recipe roundup). KEYWORD (pinterest-seo): "easy fall dinner recipes".
CANVAS: 2:3 1000x1500. Hero: overhead shot of the finished skillet, steam, linen -- the outcome, in context.
OVERLAY: "Easy Fall Dinner Recipes" bold cream serif on a deep-green band, top third; sub-line "one pan, 30 min".
BRAND: template fonts + palette; domain footer bottom-center (not bottom-right). Squint-tested at feed size.
VARIANTS: single hero / "15 One-Pan Fall Dinners" collage / close-up of the crispiest dish / text-led card.
HAND-OFF: brief -> ideogram (overlay text) with canva template fallback; pin -> downstream publishing (title/description/
board/link from pinterest-seo); seasonal timing 45-90 days ahead via pinterest-growth.
```

> **creator-publish note:** with visual-composer the hand-off is brief -> spec -> `compose:visual-composer` over the
> supplied photo (`canva:canva` template fallback); the example spec is `examples/pin-overlay.json`.

## Worked example 2 — e-commerce product, lifestyle-first (home-organization brand)
```
DESTINATION: product page for acrylic pantry bins. KEYWORD: "small pantry organization ideas".
CANVAS: 2:3. Hero: the bins IN a real styled pantry (lifestyle outcome), not the packshot; one focal shelf.
OVERLAY: "Small Pantry Organization Ideas" -- 5 bold sans words on a semi-transparent white band, center.
No face (the product is the hero). Logo top-left, small. Honest: the page sells exactly these bins.
VARIANTS: styled-shelf hero / before-after (same shelf, honest) / "9 Pantry Upgrades Under $30" list /
6-15s 9:16 video pin restocking the shelf (reads without sound).
HAND-OFF: photography/designer for the raster (product accuracy > generation); AI-generated backgrounds, if
any, disclosed; publish via the downstream publishing step; outbound clicks read from native Pinterest Analytics.
```

> **creator-publish note:** here the raster is composed by `compose:visual-composer` before the downstream publishing step.

Both: 2:3 1000x1500 with one focal point; lifestyle outcome imagery; the pinterest-seo keyword bold in the
overlay AND the title; brand template with the logo out of the bottom-right; feed-size legibility checked;
3-5 genuinely distinct fresh variants; raster by an image tool/designer; published via the downstream publishing step; honest to
the destination; metrics native (never fabricated).

> **creator-publish note:** "the pinterest-seo keyword" here is the target keyword supplied by the caller; the imagery is
> composed by a renderer (`compose:visual-composer` / `canva:canva`).

