# Notices

creator-publish, Copyright (C) 2026 sebby26-cyber, is licensed under the GNU General Public License v3.0 or
later (see `LICENSE`). The third-party material listed below keeps its own license.

## social-media-skills (MIT)

The skills below are adapted from **social-media-skills** release **1.0.1**
(upstream: <https://github.com/social-media-skills/skills>), Copyright (c) 2026 Frank Heijdenrijk,
licensed under the MIT License. The full licence text ships next to each plugin that contains them:
`plugins/design/LICENSE.social-media-skills`, `plugins/image-gen/LICENSE.social-media-skills`,
`plugins/canva/LICENSE.social-media-skills`.

| Plugin | Skill | Upstream path | Author | Licence |
|---|---|---|---|---|
| design | design-and-templates | `skills/design-and-templates` | Frank Heijdenrijk | MIT |
| design | quote-cards-and-text-graphics | `skills/quote-cards-and-text-graphics` | Frank Heijdenrijk | MIT |
| design | infographic-and-data-viz | `skills/infographic-and-data-viz` | Frank Heijdenrijk | MIT |
| design | thumbnail-design | `skills/thumbnail-design` | Frank Heijdenrijk | MIT |
| design | pinterest-pin-design | `skills/pinterest-pin-design` | Frank Heijdenrijk | MIT |
| image-gen | image-prompt | `skills/image-prompt` | Frank Heijdenrijk | MIT |
| image-gen | nano-banana | `skills/nano-banana` + `tools/integrations/nano-banana.md` | Frank Heijdenrijk | MIT |
| image-gen | ideogram | `skills/ideogram` + `tools/integrations/ideogram.md` | Frank Heijdenrijk | MIT |
| image-gen | flux | `skills/flux` + `tools/integrations/flux.md` | Frank Heijdenrijk | MIT |
| image-gen | ai-image-editing | `skills/ai-image-editing` + `tools/integrations/ai-image-editing.md` | Frank Heijdenrijk | MIT |
| canva | canva | `skills/canva` + `tools/integrations/canva.md` | Frank Heijdenrijk | MIT |

`design:youtube-channel-assets` is not adapted from social-media-skills: it was written for this repo and is
licensed GPL-3.0-or-later like the rest of the project.

`design:apple-podcasts-assets` is not adapted from social-media-skills either: it was written for this repo and
is licensed GPL-3.0-or-later. Its spec and best-practice references summarise Apple's public Apple Podcasts for
Creators and Podcasts Connect help pages (linked in the files); no Apple text or template file is copied.

`design:spotify-show-assets` is not adapted from social-media-skills either: it was written for this repo and is
licensed GPL-3.0-or-later. Its spec and best-practice references summarise Spotify's public Spotify for Creators
help pages, creator-education articles, Platform Rules and Podcast Delivery Specification (linked in the files,
with short attributed quotes); no Spotify text, logo or template file is copied.

`design:x-profile-assets` is not adapted from social-media-skills either: it was written for this repo and is
licensed GPL-3.0-or-later. Its spec and best-practice references summarise X's public Help Center, developer and
business pages (linked in the files, with short attributed quotes); no X text, logo or template file is copied.

**Modifications** (copied 2026-10-08): the upstream author text of every SKILL.md, reference file and
`evals/evals.json` is kept verbatim; this repo's context is added beside it as blockquotes labelled
`creator-publish note:` or as sections headed `(creator-publish addition)` (visual-composer render hand-off with
example spec, Canva vs visual-composer, optional Higgsfield prompting rule and neutral provider route tables, how to save a provider result into a package, Provenance). The only removals: SKILL.md frontmatter
reduced to `name` + `description` (descriptions tightened); WoopSocial publishing/product wording replaced with
a neutral "publishing/scheduling is a downstream step outside this skill" phrase and WoopSocial-only fields
(e.g. `pinterestBoardId`) and links dropped; links to upstream skills that are not imported here kept as
plain-text names; integration guides moved from `tools/integrations/<x>.md` to each skill's
`references/tools/<x>.md` (paths updated). The `examples/` folders are additions.

## social-media-skills (MIT) - post plugin

The `post` plugin's reference files and `references/platforms.json` are adapted from **social-media-skills**
release **1.0.1** (upstream: <https://github.com/social-media-skills/skills>), Copyright (c) 2026 Frank
Heijdenrijk, licensed under the MIT License. The full licence text ships at
`plugins/post/LICENSE.social-media-skills`.

| Plugin | Output | Upstream path | Author | Licence |
|---|---|---|---|---|
| post | `references/choosing-platform-and-format.md` | `skills/cross-platform-repurposing` (+ `skills/caption-writer`, `skills/tiktok-photo-mode`, `skills/youtube-shorts`, `skills/threads-post`, `skills/linkedin-post-writer`, `skills/pinterest-seo`, `skills/instagram-reels-publishing`) | Frank Heijdenrijk | MIT |
| post | `references/captions-and-hooks.md` | `skills/caption-writer` + `skills/hook-writer` (+ `skills/tiktok-video-publishing`, `skills/youtube-publishing-and-metadata`, `skills/youtube-shorts`, `skills/threads-post`, `skills/linkedin-post-writer`, `skills/pinterest-seo`, `skills/text-post-and-microblog`, `skills/x-growth`) | Frank Heijdenrijk | MIT |
| post | `references/hashtags.md` | `skills/hashtag-strategy` (+ `skills/caption-writer`, `skills/threads-post`, `skills/pinterest-seo`, `skills/tiktok-photo-mode`, `skills/youtube-publishing-and-metadata`) | Frank Heijdenrijk | MIT |
| post | `references/platform-specs.md`, `references/platforms.json` | `skills/platform-specs-and-validation` + `skills/scheduling-and-queue` + `skills/caption-writer` + `skills/tiktok-video-publishing` + `skills/tiktok-photo-mode` + `skills/youtube-publishing-and-metadata` + `skills/youtube-shorts` + `skills/instagram-reels-publishing` + `skills/threads-post` + `skills/linkedin-post-writer` + `skills/pinterest-seo` + `skills/hashtag-strategy`; spec figures also from `skills/thumbnail-design`, `skills/pinterest-pin-design`, `skills/story-writer`, `skills/text-post-and-microblog`, `skills/x-growth`, `skills/facebook-strategy`, `skills/instagram-growth`, `tools/integrations/woopsocial.md` | Frank Heijdenrijk | MIT |
| post | `references/publishing-and-scheduling.md` | `skills/scheduling-and-queue` + `tools/integrations/woopsocial.md` (+ `skills/platform-specs-and-validation`, `skills/tiktok-video-publishing`, `skills/tiktok-photo-mode`, `skills/youtube-publishing-and-metadata`, `skills/youtube-shorts`, `skills/instagram-reels-publishing`, `skills/threads-post`) | Frank Heijdenrijk | MIT |

**Modifications:** unlike the design/image-gen/canva entries above, no upstream file is kept verbatim here.
Each reference is a condensed rewrite of the listed skills' SKILL.md and `references/*.md` for a per-post
recommender, opening with a one-line attribution; upstream `evals/evals.json`, worked examples, frameworks
acronyms and "where this connects" sections are dropped. Links to upstream sibling skills are kept as
plain-text names. Repo context is added as blockquotes labelled `creator-publish note:`. Upstream presents
WoopSocial as the single publishing bridge; here it is described neutrally as the first of three publish
routes, followed by creator-publish additions: the platform's own connector (Higgsfield TikTok:
upload, `tiktok_prepare_publish` publish form submitted by the owner, `tiktok_publish_status`), the owner's
browser via Claude in Chrome or a headless browser agent, and a per-post record in the package status. `references/platforms.json` is a
new machine-readable file: every figure is taken from the upstream text listed in its per-format `source`
field, except the Higgsfield TikTok limits, which are marked as coming from the
`tiktok_prepare_publish` tool schema (2026-10-08); fields upstream gives no figure for are omitted.

## Bundled fonts

Shipped in `plugins/compose/renderer/fonts/`, each with its licence file next to it:

| Font | Licence | File |
|---|---|---|
| Anton | SIL Open Font License 1.1 | `Anton-OFL.txt` |
| Inter | SIL Open Font License 1.1 | `Inter-OFL.txt` |
| DejaVu Sans | Bitstream Vera / DejaVu licence (free, permissive) | `DejaVu-LICENSE.txt` |

## Node packages (installed from the lockfile, not shipped)

`sharp` (Apache-2.0), `opentype.js` (MIT), `ajv` (MIT) and `@modelcontextprotocol/server` (Apache-2.0) are installed with
`npm ci` from `plugins/compose/renderer/package-lock.json`; each keeps its own licence inside `node_modules`.
