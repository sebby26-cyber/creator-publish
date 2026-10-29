# Apple Podcasts show and episode asset specs

Checked against Apple's own pages on **2026-10-23**. Apple changes these without notice, and none of the pages
carries a "last updated" date (only "Copyright 2026 Apple Inc."). Re-check the pages below before a real
submission and update this file, with the new date, when a figure moves.

Each figure is marked:
- **official**: quoted or closely paraphrased from the Apple page named in its row;
- **derived**: follows from an official figure (the reasoning is shown);
- **unverified**: a widely used working value or third-party figure that no Apple page checked here states.
  Use it, but say so.

## Sources

| Short name | Page | URL |
|---|---|---|
| Artwork guide | Artwork guide (Apple Podcasts for Creators) | <https://podcasters.apple.com/support/896-artwork-requirements> |
| Show Cover | Show Cover template ("Specs and more") | <https://podcasters.apple.com/support/5514-show-cover-template> |
| Episode Art | Episode Art template | <https://podcasters.apple.com/support/5516-episode-art-template> |
| Artwork policies | Artwork policies | <https://podcasters.apple.com/5510-artwork-policies> |
| Showcase Hero | Show Showcase Hero template | <https://podcasters.apple.com/support/5522-show-hero-template> |
| Channel Icon / Logo / Background / Hero | Channel templates | <https://podcasters.apple.com/support/5518-channel-icon-template>, <https://podcasters.apple.com/support/5517-channel-logo-template>, <https://podcasters.apple.com/support/5521-channel-background-template>, <https://podcasters.apple.com/support/5524-channel-hero-template> |
| Promotional artwork | Promotional requests and artwork | <https://podcasters.apple.com/support/866-promotional-artwork> |
| RSS guide | A Podcaster's Guide to RSS (Podcasts Connect help) | <https://help.apple.com/itc/podcasts_connect/en.lproj/itcb54353390.html> |
| RSS requirements | Podcast RSS feed requirements | <https://podcasters.apple.com/support/823-podcast-requirements> |
| Content guidelines | Content requirements (content and subscription guidelines) | <https://podcasters.apple.com/support/891-content-and-subscription-guidelines> |
| Categories | Apple Podcasts categories | <https://podcasters.apple.com/support/1691-apple-podcasts-categories> |

## Show Cover (required)

| Spec | Value | Status |
|---|---|---|
| Size | 3000 x 3000 px; via RSS Apple accepts 1400 x 1400 to 3000 x 3000, "The largest size is preferred" | official (Show Cover) |
| Shape | square | official (RSS guide; Show Cover template) |
| File type | PNG or JPG (`.png`, `.jpg`) | official (Show Cover; RSS guide) |
| Colour | RGB colour space | official (RSS guide) |
| Transparency | none: "cannot contain transparency and should not contain an alpha channel"; use a solid background | official (Show Cover; RSS guide) |
| Resolution tag | 72 dpi | official (RSS guide). A file with no density tag is read as 72 dpi by most tools (macOS `sips` reports 72); pixel size is what matters. Whether Apple checks the tag is **unverified** |
| File size | no limit stated on the Apple pages checked | **unverified**: hosts set their own caps (third-party guides quote about 500-512 KB for some hosts); check the host |
| Safe area | the downloadable template marks an art safe area so elements are not "cropped or obstructed by user interface elements"; the numbers are only in the template file | official that it exists; the pixel box is **unverified** here |
| Bottom fifth | "avoid important artwork elements at the bottom fifth" | **unverified**: seen quoted in search results, not on the Show Cover page fetched 2026-10-23. Keep title and key art out of it anyway |
| Placements | "Everywhere" | official (Show Cover) |
| Rounded corners in the app | shown with rounded corners | **unverified** (visible in the app; no published radius). Previews use 6% |

## Episode Art (optional)

| Spec | Value | Status |
|---|---|---|
| Size | 3000 x 3000 px; via RSS 1400 x 1400 to 3000 x 3000, largest preferred | official (Episode Art) |
| Shape | "appears in a square format" | official (Episode Art) |
| File type, colour, alpha | PNG or JPG; no transparency or alpha channel; same rules as show art | official (Episode Art; RSS guide) |
| Text and logo | "Avoid using your podcast logo or any text in the artwork"; titles are shown beneath it in the UI | official (Episode Art) |
| Fill | "Fill the entire template with art" | official (Episode Art) |
| Consistency | keep palette, typeface and element placement consistent; vary the imagery | official (Episode Art) |
| Fallback | without Episode Art, Apple shows the Show Cover | official (Episode Art) |
| Placements | Now Playing, Lock Screen, Control Center, Home, show and episode pages | official (Episode Art) |
| Delivery | through the RSS host (`<itunes:image>` on the item) | official that it goes via RSS (Episode Art); the tag name is from the RSS guide |

## Promotional and channel art (only in these cases)

| Asset | Spec | When | Status |
|---|---|---|---|
| Show Showcase Hero | 4320 x 1080 px, layered PSD, no transparency; title treatment = the show name exactly as in the feed, no other copy, logo centred in the safe area | only if the show is submitted for featuring ("All featured shows require a Showcase Hero"); Apple decides on featuring | official (Showcase Hero) |
| Channel Icon | 3000 x 3000 px, PNG or JPG, no transparency; shown as a circle | required to create a channel | official (Channel Icon) |
| Channel Logo | 3000 x 750 px PNG, must contain transparency, horizontal logos only | required for a channel | official (Channel Logo) |
| Channel Background | 4320 x 3240 px, layered PSD, no transparency; optional (defaults to the colour you pick) | channel page | official (Channel Background) |
| Channel Showcase Hero | 4320 x 1080 px, layered PSD | featured channels | official (Channel Hero) |
| Channel cover | "should express your channel brand and display your channel name" | optional | official (Artwork guide); size **unverified** (a garbled search snippet said 3000 x 3000) |

A **channel** groups several shows (and carries Apple Podcasts Subscriptions). One show does not need one;
whether a free channel needs Podcasters Program enrolment is **unverified**. There is **no separate "show
banner" or "show page background"** for a single show in the current Apple pages: the show page uses the Show
Cover, and the only wide show art is the Showcase Hero for featuring (checked 2026-10-23). The renderer writes
flat PNG/JPEG, not layered PSD, so Showcase Hero and Channel Background files from this skill are flat drafts
for a designer to rebuild in Apple's PSD template.

## Artwork content rules

| Rule | Status |
|---|---|
| No visual representations of Apple: logos, hardware, or the terms Apple Inc., Apple Podcasts, Apple Music, iTunes Store, iTunes | official (Artwork policies; Show Cover) |
| Only images you have the rights to; stock licensed for commercial use and watermark-free | official (Artwork policies) |
| Avoid explicit, harmful or objectionable language and content (profanity, violence, illegal drugs, self-harm) | official (Artwork policies) |
| Depict the show you publish; no reference to content not available on Apple Podcasts | official (Artwork policies) |
| Blurry, misaligned, pixelated or poor-quality images not part of a deliberate style may be rejected | official (Artwork policies) |
| Make the title clear and prominent, legible and recognisable at scale; limit extra text and logos; contrast text with its background | official (Show Cover best practices) |
| On a black or white background, "consider using a slightly different color value" | official (Show Cover) |
| No impersonation; do not reuse another show's artwork, description or metadata without permission | official (Content guidelines) |
| Legibility at the small thumbnail size, about 55-60 px | **unverified** size: Apple publishes no thumbnail pixel size. Check at 60 and 55 px anyway |

## Show and episode metadata (RSS and Podcasts Connect)

| Field | Rule | Status |
|---|---|---|
| Show title (`<title>`) | clear, concise name; a long list of keywords "in an attempt to game podcast search" can get the show removed; no episode or season number in it | official (RSS guide) |
| Author (`<itunes:author>`) | "most often refers to the parent company or network"; a name, not keywords | official (RSS guide) for the meaning; "no keywords" follows from the search-gaming rule (derived) |
| Show description | up to 4000 bytes (bytes, not characters: accented letters and emoji take more) | official (RSS guide) |
| Episode title (`<title>`, `<itunes:title>`) | do not put the episode or season number in it; use `<itunes:episode>` / `<itunes:season>` | official (RSS guide) |
| Episode number | optional for episodic shows, mandatory for serial shows | official (RSS guide) |
| Episode description | up to 10,000 characters | official (RSS guide) |
| Other tags | 255 characters unless stated otherwise | official (RSS guide) |
| Chapter titles | 45 characters or fewer recommended | official (RSS guide) |
| Title length for search display | under about 60 characters | **unverified** (third-party figure) |
| Metadata accuracy | titles, descriptions and language "must always accurately represent" the content; no inaccurate or inappropriate terms to influence search; spell words out (no self-censoring, Apple censors itself) | official (Content guidelines) |
| Explicit (`<itunes:explicit>`) | `true` shows the Explicit badge; flag every explicit episode | official (RSS guide; Content guidelines) |
| Category (`<itunes:category>`) | in the RSS feed Apple "only recognizes the first category and subcategory"; in Podcasts Connect up to two (primary and secondary) with subcategories; the primary decides category pages and charts | official (RSS guide; Categories). The two pages differ: put the best category first in the feed |
| Type (`<itunes:type>`) | `episodic` (any order) or `serial` (in order) | official (RSS guide) |
| Episode type (`<itunes:episodeType>`) | `full`, `trailer` ("a short, promotional piece of content") or `bonus` ("extra content") | official (RSS guide) |
| Trailers | do not publish trailer or sample episodes for a show that is not, or soon will not be, on Apple Podcasts | official (Content guidelines) |
| AI-generated content | if AI generates a material part of the audio or video (synthetic voice, AI host), "prominently disclose this to audiences in the content and metadata for each episode and show" | official (Content guidelines §1.11) |
| GUID | unique per episode, never changes | official (RSS requirements; RSS guide) |
| Language | ISO 639 code | official (RSS guide) |
| Feed | RSS 2.0, public, hosting supports HEAD and byte-range requests | official (RSS requirements) |
| Episodes shown | latest 2000 | official (RSS guide) |

## Not covered here
Audio specs (loudness, codec, bitrate), the Podcasts Connect account flow, subscriptions pricing, and
transcripts. They are the host's and the owner's setup, listed only as checklist items in the show-copy
template.
