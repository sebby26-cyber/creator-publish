# YouTube channel and upload asset specs

Checked against the official YouTube Help pages on **2026-10-23**. YouTube changes these without notice: re-check
the pages below before a real upload and update this file (with the new date) when a figure moves.

Each figure is marked:
- **official**: quoted from the YouTube Help page named in its row;
- **derived**: calculated from an official figure (the calculation is shown);
- **unverified**: a widely used working value that the official page does not state. Use it, but say so.

## Sources

| Short name | Page | URL |
|---|---|---|
| Branding | Manage your channel branding (YouTube Help) | <https://support.google.com/youtube/answer/10456525> |
| End screens | Add end screens to videos (YouTube Help) | <https://support.google.com/youtube/answer/6388789> |
| Cards | Add info cards to videos (YouTube Help) | <https://support.google.com/youtube/answer/6140493> |
| Chapters | Video Chapters (YouTube Help) | <https://support.google.com/youtube/answer/9884579> |

## Banner image (Studio > Customization > Branding)

| Spec | Value | Status |
|---|---|---|
| Minimum upload size | 2048 x 1152 px, 16:9 | official (Branding) |
| Recommended size | 2560 x 1440 px ("especially for TV") | official (Branding) |
| File size | 6 MB or smaller | official (Branding) |
| Text and logo safe area | 1235 x 338 px at the minimum dimension (2048 wide) | official (Branding) |
| Same image on every device | "The same banner image is used across computer, mobile, and TV displays, but it shows differently depending on your device." | official (Branding) |
| Safe area at 2560 x 1440 | 1546 x 423 px, centred (x 507-2053, y 508-931) | derived: 1235 x 338 x 1.25 = 1544 x 423; 1546 x 423 is the figure YouTube's older banner template used, kept here as the working box (1 px wider each side) |
| Desktop crop | full width x the safe-area height: 2560 x 423 at 2560 wide, centred vertically | unverified (older YouTube guidance; the current page shows only a diagram) |
| TV | the whole 2560 x 1440 image | unverified (follows from "recommended, especially for TV") |
| Accepted file formats | not listed on the page; JPG and PNG are accepted in practice | unverified |

Practical rules that follow: name, tagline, handle and schedule go **inside** the safe area; decoration outside
it is a bonus that only desktop and TV show. Keep the file under 6 MB (export JPG at quality 90 if a PNG is too
big).

## Profile picture

| Spec | Value | Status |
|---|---|---|
| Display size | "renders at 98 X 98 px" | official (Branding) |
| Formats | "JPG, GIF, BMP, or PNG file (no animated GIFs)" | official (Branding) |
| File size | "should not exceed 15 MB" | official (Branding) |
| Upload size | 800 x 800 px square | unverified: the common recommendation; the current page gives only the 98 px render size |
| Shape | shown as a circle | unverified on the page text, visible in every YouTube surface |

Design for the 98 px circle: one bold mark, no small text, an edge that stays visible on both the dark-mode
(#0f0f0f) and light-mode (#ffffff) page backgrounds (page colours are a working assumption, not official).

## Video watermark (Studio > Customization > Branding > Video watermark)

| Spec | Value | Status |
|---|---|---|
| Size | "Minimum 150x150 pixels" | official (Branding) |
| Shape and file size | "Square image less than 1 MB in size" | official (Branding) |
| Display time | **End of video** (the last 15 seconds), **Custom start time**, or **Entire video** | official (Branding) |
| Clickable | "not clickable on mobile" | official (Branding) |
| Formats | not listed; transparent PNG is the usual choice | unverified |
| Working size | 300 x 300 px transparent PNG | unverified (comfortably above the 150 px minimum) |

## End screens (Studio > Content > a video > End screen)

| Spec | Value | Status |
|---|---|---|
| Video length | "at least 25 seconds long to have an end screen" | official (End screens) |
| Window | "the last 5–20 seconds of a video" | official (End screens) |
| Maximum elements | "up to four elements ... for videos with standard 16:9 aspect ratio"; other ratios may allow fewer | official (End screens) |
| Element types | Video or playlist, Subscribe, Channel, Link (Link needs YouTube Partner Program membership) | official (End screens) |
| Video element options | most recent upload; "best for viewer" (YouTube picks); a specific video or playlist (public or unlisted, any channel) | official (End screens) |
| Placement | drag in the player; a grid overlay with "Snap to grid" and "Snap to element" | official (End screens) |
| Templates | Studio offers templates (element groupings) to start from | official (End screens) |
| Custom image (Channel element) | at least 300 x 300 px recommended | official (End screens) |
| Not shown | videos set as made for kids, YouTube Music and YouTube Kids apps, mobile web (except iPad), 360 videos; viewers can hide end screens | official (End screens) |
| Element pixel sizes and a fixed placement grid | not published. Studio draws the elements and lets you resize them | **unverified**: the slots in `examples/end-screen-template.json` are planning boxes |
| Shorts | the page does not mention Shorts; Shorts use the Related video link instead | unverified |

## Cards (optional, mid-video)

| Spec | Value | Status |
|---|---|---|
| Maximum | "up to 5 cards to one video" | official (Cards) |
| Types | Video, Playlist, Channel, Link (Link needs YouTube Partner Program) | official (Cards) |
| Made for kids | "Cards aren't available on videos set as made for kids" | official (Cards) |
| Interaction with end screens | not stated; do not time a card into the end-screen window | unverified (practical rule) |

Cards are not an image asset: they are set in Studio per video. This skill only lists them in the per-upload
checklist (time, type, target) when the owner wants them.

## Chapters (per-upload description field)

| Spec | Value | Status |
|---|---|---|
| First timestamp | "starts with 00:00" | official (Chapters) |
| Count | "at least three timestamps listed in ascending order" | official (Chapters) |
| Length | "The minimum length for video chapters is 10 seconds." | official (Chapters) |

## Not covered here
Thumbnails (1280 x 720, see `design:thumbnail-design`) and title, description and tags metadata.
