# Composition rules (spec v1)

The renderer is deterministic: the same spec, the same asset files and the same renderer version give the same
pixels. Anything it cannot do exactly is refused with a structured error. It never approximates or skips.

## Document

```json
{
  "version": 1,
  "name": "optional, used in auto file names",
  "canvas": { "width": 1080, "height": 1350, "background": "#101418" },
  "output": { "path": "/abs/out.png", "format": "png", "quality": 90, "lossless": false, "background": "#ffffff", "overwrite": true },
  "checks": { "contrast": 4.5 },
  "layers": [ ... ]
}
```

- `canvas.width/height`: integer px, 1..10000. `background`: a colour, a gradient object, or omitted (transparent).
- `output.path`: absolute, or relative to the configured output dir (`$CREATOR_PUBLISH_OUT` or `out_dir` in
  `~/.creator-publish/config.json`). With no path, an out dir is required and the file is named
  `<name>-<12-hex spec hash>.<ext>`. Format comes from the extension (`.png .jpg/.jpeg .webp`) or `format`; a
  mismatch is an error. JPEG has no alpha: transparent areas are flattened onto `output.background`, else the
  solid canvas background, else white. `quality` (1-100, default 90) applies to JPEG and lossy WebP;
  `lossless: true` gives lossless WebP. Metadata (EXIF/XMP/ICC) is never written.

## Coordinates and units

- Origin top-left, x to the right, y down, 1 unit = 1 output pixel.
- Lengths (`x`, `y`, `width`, `height`) are numbers (px) or strings `"NN%"`: x and width are % of canvas
  width; y and height are % of canvas height. Font sizes, stroke widths, radii and blur are px numbers.
- Every layer has a **box** `x, y, width, height`. Layers are painted in array order (first = bottom).
- `rotate`: degrees clockwise about the box centre, or about `origin: [x, y]` (canvas px). Rotated rasters
  grow to fit their corners; the corners are transparent.
- Anything outside the canvas is clipped.

## Colours and paints

- Colour: `#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`, `rgb(r,g,b)`, `rgba(r,g,b,a)` or `black white red green blue
  yellow gray grey orange transparent`.
- Gradient (anywhere a fill is accepted, and for `canvas.background`):
  `{ "type": "linear", "angle": 90, "stops": [{ "offset": 0, "color": "#000" }, { "offset": 1, "color": "rgba(0,0,0,0)" }] }`.
  Angle is CSS-like: 0 = to top, 90 = to right, 180 = to bottom (default), 270 = to left; diagonals run corner to
  corner of the layer box. Radial: `{ "type": "radial", "cx": 0.5, "cy": 0.5, "r": 0.5, "stops": [...] }`
  (fractions of the box). Each stop may add `opacity` (multiplied with the colour alpha).

## Common layer properties

| key | meaning |
|---|---|
| `id` | name used in reports and errors (default `#<index>`) |
| `visible` | `false` skips the layer |
| `opacity` | 0..1, applied to the whole layer after effects and masks |
| `blend` | `over` (default), `multiply`, `screen`, `overlay`, `darken`, `lighten`, `color-dodge`, `color-burn`, `hard-light`, `soft-light`, `difference`, `exclusion`, `add`, `saturate`, Porter-Duff (`xor`, `atop`, `in`, `out`, `dest-*`, `source`, `dest`, `clear`). `hue`, `saturation`, `color`, `luminosity` are **refused** (`UNSUPPORTED_CAPABILITY`). |
| `effects` | `blur` (sigma px), `brightness`, `saturation` (multipliers, 1 = unchanged), `hue` (degrees), `lightness` (additive), `contrast` (multiplier around mid-grey), `grayscale` (bool), `tint` (colour), `sharpen` (bool) |
| `clip` | `{ "shape": "rect", "radius": 24 }`, `{ "shape": "ellipse" }` or `{ "shape": "path", "d": "M0 0 ..." }` in box-local px |
| `mask` | `{ "src": "/abs/mask.png", "mode": "luminance" or "alpha", "fit": "fill", "invert": false }` or `{ "gradient": {...} }` (white / opaque = visible). Mask covers the layer box. |

Per-layer order of operations: rasterise -> (images: crop -> resize/fit -> flip) -> effects -> clip -> mask ->
opacity -> rotate -> place -> blend onto everything below.
Image layers clip/mask in their own (fitted) raster, so masks rotate with the image. Vector layers
(text, shape, gradient) clip/mask on the unrotated layer box.

## Layer types

### image
`{ "type": "image", "src": "/abs/photo.jpg", "x": 0, "y": 0, "width": 1080, "height": 1080, "fit": "cover", "position": "center" }`
- `src`: local file only (PNG, JPEG, WebP, GIF, TIFF, AVIF/HEIF if supported by libvips, SVG). Relative paths
  resolve against the spec file's directory (CLI) or `baseDir` (MCP). URLs are refused. If asset roots are
  configured, the real path (symlinks resolved) must be inside one of them.
- `fit`: `cover` (fill box, crop overflow; `position` picks the kept part: `center top bottom left right
  top-left top-right bottom-left bottom-right attention entropy`), `contain` (letterbox, transparent padding),
  `fill` (stretch), `inside` / `outside` (keep aspect, no padding; aligned in the box by `position`).
- Missing width/height: natural size; one given: the other follows the aspect ratio.
- `crop: {x, y, width, height}` in source pixels (before fit). `flip` = vertical mirror, `flop` = horizontal.
- `radius`: shortcut for a rounded-rect clip.
- SVG sources are rasterised at the density matching the box (crisp logos).

### text
```json
{ "type": "text", "text": "Hello\nworld", "font": { "family": "Inter", "weight": 700 },
  "size": 96, "minSize": 24, "fit": "shrink", "color": "#ffffff",
  "x": 80, "y": 80, "width": 920, "height": 300, "align": "left", "valign": "top",
  "lineHeight": 1.15, "letterSpacing": 0, "maxLines": 3, "transform": "uppercase",
  "stroke": { "color": "#000", "width": 3 }, "shadow": { "x": 0, "y": 4, "blur": 8, "color": "rgba(0,0,0,0.5)" },
  "background": { "color": "#ffd23f", "padding": [10, 16], "radius": 8 }, "overflow": "error" }
```
- Glyphs are drawn as vector outlines from the font file (opentype.js), never via system fonts, so text is
  identical on every machine. Fonts: the bundled `renderer/fonts` inside this plugin (Anton 400; Inter 400, 700; DejaVu Sans 400,
  700) plus configured font dirs. Family + weight + style must match exactly; there is no fallback.
- Wrapping: greedy on spaces inside `width`; `\n` forces a line break; runs of spaces collapse to one.
- `size` is the maximum. With `fit: "shrink"` (default) the size steps down 1 px at a time until the text fits
  `width`, `height` and `maxLines`, but not below `minSize` (default max(6, size/4)). `fit: "none"` keeps `size`.
- Fit is measured on the **ink box** (actual glyph outlines plus stroke). If it still does not fit:
  `TEXT_OVERFLOW` error, nothing rendered (`overflow: "warn"` renders anyway and reports a warning).
- `align` positions each line horizontally by its advance width. `valign` positions the **ink box** in the layer
  box: `top` means the tallest glyph touches `y`. Without `height`, the text starts at `y`.
- `lineHeight` is a multiple of the font size (baseline to baseline). `letterSpacing` is px added between characters.
- `stroke.width` is the visible outline outside the glyph edge (px). `shadow` is an offset, blurred copy.
  `background` draws a box around the ink box, padded `[vertical, horizontal]`.
- `fill` (colour or gradient) overrides `color`.
- Not supported (refused): colour emoji (`text.color-emoji`), scripts that need shaping such as Arabic, Hebrew,
  Indic, Thai (`text.complex-script`). Characters missing from the font: `MISSING_GLYPH`. Ligatures are not
  applied. Kerning comes from the font's kern table / plain GPOS pair tables (Anton and DejaVu; Inter's kerning
  lives in GPOS extension lookups that opentype.js cannot read, so Inter renders unkerned).
- Contrast: after rendering, the text colour is compared (WCAG 2) with the pixels under its ink box. Below 4.5
  (3 for >= 24 px, or >= 18.66 px bold) gives a `LOW_CONTRAST` warning; a stroke with enough contrast or a solid
  `background` box counts. Override per layer with `contrast: { "min": 7 }` or `{ "skip": true }`.

### shape
`{ "type": "shape", "shape": "rect", "x": 60, "y": 60, "width": 300, "height": 120, "radius": 24, "fill": "#ff5a36", "stroke": { "color": "#000", "width": 2, "dash": [8, 4] } }`
- `rect` (with `radius`), `ellipse` (fills the box), `circle` (radius = half the shorter box side, centred),
  `line` (`x, y` to `x2, y2`, needs `stroke`), `polygon` (`points: [[x, y], ...]` in canvas px), `path`
  (`d`: SVG path data in canvas px; rotating a path needs a box or `origin`).
- `fill`: colour or gradient (default black, or none when only a stroke is given).

### gradient
`{ "type": "gradient", "fill": { "type": "linear", "angle": 90, "stops": [...] } }`: a rectangle of gradient; the
box defaults to the whole canvas. Use it for scrims ("darken the left side").

## Errors (structured, nothing written)

Every error is `{ code, message, path?, layer?, detail? }`; all problems found are reported together.

| code | meaning |
|---|---|
| `SCHEMA_INVALID` | spec does not match the schema (unknown key, wrong type...); `path` is a JSON pointer |
| `ASSET_NOT_FOUND`, `ASSET_UNREADABLE` | file missing / not decodable |
| `ASSET_REMOTE_UNSUPPORTED` | a URL was given; only local files |
| `ASSET_PATH_RELATIVE` | relative path with no base directory (MCP inline spec without `baseDir`) |
| `ASSET_OUTSIDE_ROOTS` | file outside the configured asset roots (after resolving `..` and symlinks) |
| `CROP_OUT_OF_BOUNDS`, `ROTATION_ORIGIN_REQUIRED`, `MASK_BOX_REQUIRED` | geometry problems |
| `FONT_NOT_FOUND`, `FONT_VARIANT_NOT_FOUND` | family / weight+style not installed in the font dirs (message lists what is) |
| `MISSING_GLYPH` | a character has no glyph in the chosen font (code points listed) |
| `TEXT_OVERFLOW`, `TEXT_OUTSIDE_CANVAS` | text cannot fit its box at `minSize` / spills off the canvas |
| `UNSUPPORTED_CAPABILITY` | no backend can do it; `detail.capability`, `detail.usedAt`, `detail.hint` |
| `BACKEND_UNAVAILABLE`, `NO_SINGLE_BACKEND` | routing could not find an available backend |
| `OUTPUT_PATH_REQUIRED`, `OUTPUT_FORMAT_UNKNOWN`, `OUTPUT_FORMAT_MISMATCH`, `OUTPUT_EXISTS` | output problems |
| `RENDER_FAILED`, `POST_VALIDATION_FAILED`, `INTERNAL` | render or post-render check failed (no file kept) |

Warnings (render still delivered): `TEXT_SHRUNK`, `LOW_CONTRAST`, `TEXT_OVERFLOW` (with `overflow: "warn"`),
`CHECK_WARNING`.

## Natural language to spec

1. **Canvas.** Map the destination to px: Instagram post 1080x1350 (portrait) or 1080x1080; story/reel cover
   1080x1920; X/Twitter header 1500x500; X post 1600x900; LinkedIn post 1200x627; YouTube thumbnail 1280x720;
   Open Graph 1200x630; podcast cover 3000x3000. Unknown destination: ask.
2. **Layers bottom to top.** Background (canvas colour/gradient or a full-bleed `image` with `fit: cover`), then
   scrims (`gradient` layers) where text sits on a photo, then supporting images/logos, then shapes that hold text
   (pills, cards), then text.
3. **Text roles.** One layer per role. Give each a box from the layout, a generous max `size`, and let auto-fit
   shrink. Typical sizes at 1080 px wide: title 80-140 (Anton reads best uppercase at `lineHeight` 1.0-1.05),
   body 28-40 (Inter, `lineHeight` 1.3-1.4), kicker/label 22-32 bold with `letterSpacing` 2-6.
   Margins: about 6-8 % of the canvas width.
4. **Phrases.** "darken the left side" = gradient layer angle 90, stops dark at 0 to transparent at ~0.6.
   "fade the photo into the background" = image `mask.gradient`. "rounded photo" = image `radius`. "button" =
   rounded rect + text with the same box, `align: center, valign: middle`. "outline text" = `stroke`.
   "blurred background" = image `effects.blur`. "black and white" = `effects.grayscale`.
5. **Assets.** Only files the user supplied, by absolute path. Never invent a logo or a photo.
6. **Validate, render, inspect** (SKILL.md steps 4-6).

### Worked example

Request: *"Instagram post from ~/photos/beach.jpg, headline 'Summer menu is here', small label 'NEW',
our logo ~/brand/logo.svg bottom right, brand orange #ff5a36. Save it as summer.png in the output dir."*

```json
{
  "version": 1, "name": "summer-menu",
  "canvas": { "width": 1080, "height": 1350, "background": "#000000" },
  "output": { "path": "summer.png" },
  "layers": [
    { "type": "image", "src": "~/photos/beach.jpg", "x": 0, "y": 0, "width": 1080, "height": 1350, "fit": "cover", "position": "center" },
    { "type": "gradient", "y": 675, "height": 675, "fill": { "type": "linear", "angle": 180, "stops": [ { "offset": 0, "color": "rgba(0,0,0,0)" }, { "offset": 1, "color": "rgba(0,0,0,0.8)" } ] } },
    { "id": "label", "type": "text", "text": "NEW", "font": { "family": "Inter", "weight": 700 }, "size": 28, "letterSpacing": 4, "color": "#ffffff",
      "x": 80, "y": 900, "width": 400, "background": { "color": "#ff5a36", "padding": [10, 16], "radius": 6 } },
    { "id": "headline", "type": "text", "text": "Summer menu is here", "font": { "family": "Anton" }, "size": 150, "transform": "uppercase",
      "lineHeight": 1.0, "color": "#ffffff", "x": 80, "y": 960, "width": 760, "height": 300, "valign": "bottom" },
    { "type": "image", "src": "~/brand/logo.svg", "x": 900, "y": 1170, "width": 100, "height": 100, "fit": "contain" }
  ]
}
```

Why: full-bleed photo with `cover`; a bottom scrim so white text passes contrast; the label uses the brand colour as
a padded box; the headline box ends at y 1260 with `valign: bottom` so wraps grow upward; the logo sits in the
margin the headline box leaves free. Then render it (`render summer.json --out /abs/summer.png --preview`, command in `SKILL.md`), look at the preview, adjust.
