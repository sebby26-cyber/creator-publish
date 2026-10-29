# X (Twitter) profile and post asset specs

Checked on **2026-10-23**. X changes these often and without notice: re-check the pages below before a real
upload, and update this file (with the new date) when a figure moves.

**How the pages were read.** `help.x.com` and `business.x.com` answer automated fetches with a bot challenge
(HTTP 403), so on 2026-10-23 they were read through Internet Archive copies of the official pages, captured
between Aug and Oct 2026 (snapshot date in brackets). `docs.x.com` was read live. The developer Cards pages are no
longer on the live docs site (the old `developer.x.com` Cards URLs redirect to the docs home), so they were read
from archived copies too. Open the live page in a browser before relying on a figure for a real upload.

Each figure is marked:
- **official**: X's own wording on the X page named in its row (live, or an archived copy of that page);
- **derived**: calculated from an official figure (the calculation is shown);
- **unverified**: a widely used working value that no X page states. Use it, but say so.

## Sources

| Short name | Page | URL [archived snapshot] |
|---|---|---|
| Upload issues | Help with common profile photo and header upload issues | <https://help.x.com/en/managing-your-account/common-issues-when-uploading-profile-photo> [2026-10-07] |
| Customize | How to customize your profile | <https://help.x.com/en/managing-your-account/how-to-customize-your-profile> [2026-09-25] |
| Handle | How to change your username / display name | <https://help.x.com/en/managing-your-account/change-x-handle> [2026-10-12] |
| Username rules | Username rules | <https://help.x.com/en/managing-your-account/x-username-rules> [2026-09-19] |
| Images | How to post photos or GIFs | <https://help.x.com/en/using-x/posting-gifs-and-pictures> [2026-08-29] |
| Videos | How to share and watch videos | <https://help.x.com/en/using-x/x-videos> [2026-10-11] |
| Media API | Media best practices (X API) | <https://docs.x.com/x-api/media/quickstart/best-practices> (live) |
| Image descriptions | How to make images accessible | <https://help.x.com/en/using-x/picture-descriptions> [2026-10-13]; <https://help.x.com/en/using-x/write-image-descriptions> [2026-02-21] |
| Cards | Summary card with large image / Summary card / Cards markup (developer docs) | <https://developer.x.com/en/docs/x-for-websites/cards/overview/summary-card-with-large-image> [2026-02-04]; `.../cards/overview/summary` [2026-01-28]; `.../cards/overview/markup` [2026-02-01] |
| Ad specs | Creative ad specifications | <https://business.x.com/en/help/campaign-setup/creative-ad-specifications> [2026-09-27] |
| Authenticity | Authenticity policy (synthetic media, impersonation, fake personas) | <https://help.x.com/en/rules-and-policies/authenticity> [2026-10-14] |
| X Rules | The X Rules | <https://help.x.com/en/rules-and-policies/x-rules> [2026-10-17] |
| Verified Orgs | Verified Organizations | <https://help.x.com/en/using-x/verified-organizations> [2025-09-08, older snapshot] |
| Business basics | Get your business started / organic best practices | <https://business.x.com/en/basics/get-your-business-started-with-x> [2026-09-22]; <https://business.x.com/en/basics/organic-best-practices> [2026-08-22] |

## Header (banner) image

| Spec | Value | Status |
|---|---|---|
| Recommended size | 1500 x 500 px (3:1): "Recommended dimensions for header images are 1500x500 pixels." | official (Upload issues) |
| Formats | "JPG, GIF, or PNG" and "X does not support animated GIFs for profile or header/banner images" | official (Customize) |
| Crop | "60 pixels on the top and bottom could be cropped" depending on monitor and browser | official (Upload issues) |
| File size | 5 MB | **unverified** (third-party guides; no X page found states a header limit) |
| Profile photo overlap | The profile photo sits over the lower-left of the header on the profile page | **unverified**: X publishes no figure. Working keep-clear box at 1500 x 500: **x 0-400, y 300-500** (from measuring the web and app layouts: about a 134 px circle at 16 px from the left of a 600 x 200 header on web, scaled 2.5x, with margin) |
| Mobile app overlays | Back, search and more buttons sit over the top corners of the header in the apps | **unverified**: working keep-clear corners **120 x 120 px** at top-left and top-right |
| Text-safe box (working) | **x 420-1440, y 80-420** | derived from the rows above: inside the official 60 px crop bands, right of the avatar box, clear of the top corners. Not an X figure |

## Profile photo

| Spec | Value | Status |
|---|---|---|
| Recommended size | 400 x 400 px: "recommended dimensions of 400x400 pixels" | official (Upload issues) |
| File size | "Maximum file size for profile photos is 2MB." | official (Upload issues) |
| Formats | JPEG, GIF or PNG; no animated GIF | official (Upload issues, Customize) |
| Shape | Circle for personal and creator accounts | **unverified** (no X text; visible on every X surface) |
| Square avatar | Verified Organizations: "businesses also receive a square avatar" | official (Verified Orgs, 2025 snapshot) |
| Display sizes | about 134 px on the desktop profile, 40 px in the timeline, smaller in notifications | **unverified** (measured layout values) |
| Page themes | Default #FFFFFF, Dim #15202B, Lights out #000000 | **unverified** (the app's theme colours; preview on all three) |

## Profile text fields

| Field | Limit | Status |
|---|---|---|
| Display name | "Your display name can be up to 50 characters long." | official (Handle) |
| Bio | "Bio (maximum 160 characters)" | official (Customize) |
| Username (handle) | up to 15 characters; "letters, numbers, and underscores—no spaces"; may not contain "X" or "Admin" unless official | official (Handle, Username rules). Minimum length: X's pages say both "more than 4 characters" and that names "shorter than 4 characters" are not allowed, so the minimum (4 or 5) is **unverified** |
| Location | field exists; 30 characters | field official (Customize); limit **unverified** |
| Website | field exists; no limit stated | official field; limit **unverified** |

## Images in posts

| Spec | Value | Status |
|---|---|---|
| Count | "up to 4 photos, 1 animated GIF or 1 video in a Post"; "Animated GIFs can't be included in Posts with multiple images." | official (Media API, Images) |
| File size | photos up to 5 MB; GIFs up to 5 MB on mobile and 15 MB on web | official (Images) |
| Formats | GIF, JPEG, PNG (Help); JPG, PNG, GIF, WEBP (API) | official (Images, Media API) |
| Single image shown uncropped | "images with standard aspect ratios (between 2:1 and 3:4) will display in full" | official (Images) |
| Working sizes, single image | 16:9 at 1600 x 900 (or 1200 x 675); 1:1 at 1200 x 1200; 4:5 at 1080 x 1350 | **unverified** organic sizes; all three sit inside the official 2:1-3:4 range, so they show uncropped |
| Multi-image layout | 2 images: side by side, each cropped to about 7:8. 3 images: one tall left (about 7:8) plus two stacked right (about 7:4). 4 images: a 2 x 2 grid, each about 7:4. Crops are centred; tapping opens the full image | **unverified** (third-party; guides disagree). Keep the subject and any text in the centre 50% of each image |
| Ads only | single-image ads 1200 x 1200 (1:1) or 1200 x 628 (1.91:1), max 5 MB | official (Ad specs); for paid ads, not organic posts |

## Video in posts

The three X sources disagree; the organic upload limit that applies to most accounts is the Help Center one.

| Spec | Value | Status |
|---|---|---|
| Length and size, non-Premium | "up to 140 seconds long with a maximum file size of 512MB" | official (Videos) |
| Length and size, Premium | under 4 hours, up to 16 GB (1080p; 720p for 2-4 hours) | official (Videos) |
| Web upload limits | 32 x 32 to 1920 x 1200; aspect 1:2.39 to 2.39:1; "Maximum frame rate: 40 fps"; up to 25 Mbps | official (Videos) |
| API recommendation | H.264 High Profile, AAC-LC; recommended 1280 x 720, 720 x 1280 or 720 x 720; up to 60 fps; YUV 4:2:0 | official (Media API) |
| Container | MP4 or MOV | official for ads (Ad specs); the Help video page does not name containers: **unverified** for organic posts |
| Working export | MP4 (H.264 + AAC), 1920 x 1080 or 1080 x 1080 or 1080 x 1350, 30 fps, under 140 s, under 512 MB | derived from the rows above |

## Link cards (the preview X draws for a URL)

X builds the card from the linked page's `twitter:*` (or Open Graph) tags. For a YouTube link, the card image
is YouTube's own thumbnail; nothing is uploaded to X. A card image is only made for a page the owner controls.

| Spec | Value | Status |
|---|---|---|
| summary_large_image | aspect 2:1, min 300 x 157, max 4096 x 4096, under 5 MB; JPG, PNG, WEBP, GIF (first frame only) | official (Cards, archived) |
| summary | aspect 1:1, min 144 x 144, "cropped to a square on all platforms" | official (Cards, archived) |
| Markup | title up to 70 characters, description up to 200, image alt up to 420; SVG not supported | official (Cards, archived) |
| Working card image | 1200 x 600 PNG or JPG, key content in the centre | derived (2:1) |
| How it shows today | the image with a small domain label; the headline was dropped from link previews in Oct 2023 | **unverified** (press reports, e.g. TechCrunch 2023-08-22; no X doc) |

## Alt text (image descriptions)

| Spec | Value | Status |
|---|---|---|
| Limit | "X has a character limit of 1,000." | official (Image descriptions) |
| Where | iOS/Android: "+Alt" on the attached image; web: "Add description" | official (Image descriptions) |
| Per image | "You can add a description to each image in a post." | official (Image descriptions) |
| Card image alt | `twitter:image:alt`, up to 420 characters | official (Cards, archived) |

## Pinned post

| Spec | Value | Status |
|---|---|---|
| How | the post's "..." menu > "Pin to your profile" > "Pin" | official (Customize) |
| What it does | "when others visit your profile, it is the first post they will see" | official (Customize) |
| One at a time | pinning a new post replaces the old pin | **unverified** (implied by the singular wording, not stated) |

## Synthetic media, impersonation and AI labels

| Rule | Value | Status |
|---|---|---|
| Synthetic media | "You may not deceptively share synthetic or manipulated media that are likely to cause harm. In addition, we may label posts containing synthetic and manipulated media" | official (X Rules, Authenticity) |
| AI profile photos | Fake personas include "using stock, stolen or AI-generated profile photos ... for the purpose of deceiving others" | official (Authenticity) |
| Impersonation | "You may not impersonate other identities"; parody, commentary and fan accounts must say so in the name or bio | official (Authenticity) |
| A dedicated "AI-generated" label | none found in X's text; X "may label" synthetic media | **unverified**: disclose in the bio and post text instead |

## Not covered here
Ads creative (beyond the rows marked "Ad specs"), Spaces, Communities, Lists, and the X API itself.
