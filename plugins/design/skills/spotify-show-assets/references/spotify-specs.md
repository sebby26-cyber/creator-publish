# Spotify show and episode asset specs (podcasts and video podcasts)

Checked against Spotify's official pages on **2026-10-23**. Spotify changes these without notice and several help
pages carry no date: re-check the pages below before a real upload and update this file (with the new date) when
a figure moves.

Each figure is marked:
- **official**: stated on the Spotify page named in its row;
- **guide**: from Spotify's own creator-education articles (official source, but advice rather than a hard rule);
- **unverified**: a working value no Spotify page states. Use it, but say so.

## Sources

| Short name | Page | URL |
|---|---|---|
| Delivery spec | Podcast Delivery Specification v1.10 (May 2025), linked from the "Podcast specification doc" help page | <https://support.spotify.com/us/creators/article/podcast-specification-doc/> (PDF via <https://providersupport.spotify.com/article/podcast-delivery-specification-1-9>) |
| Cover art | Uploading cover art (Spotify for Creators Help) | <https://support.spotify.com/us/creators/article/uploading-cover-art/> |
| Import | Importing your episodes from another host | <https://support.spotify.com/us/creators/article/importing-your-episodes-from-another-host/> |
| Show art guide | The dos and don'ts of show art (Spotify for Creators, 2019-08-02) | <https://creators.spotify.com/resources/dos-donts-showart> |
| Video specs | Video specs | <https://support.spotify.com/us/creators/article/video-specs/> |
| Publishing videos | Publishing videos | <https://support.spotify.com/us/creators/article/publishing-videos/> |
| Video elsewhere | Publishing video episodes if you're not hosted with Spotify | <https://support.spotify.com/us/creators/article/video-episodes-for-shows-not-hosted-with-spotify/> |
| Thumbnails | Thumbnails | <https://support.spotify.com/us/creators/article/thumbnails/> |
| Clips | Clips content policy | <https://support.spotify.com/us/creators/article/clips-content-policy/> |
| Canvas | Canvas guidelines (Spotify for Artists) | <https://support.spotify.com/us/artists/article/canvas-guidelines/> |
| Audio episodes | Publishing audio episodes in Spotify for Creators | <https://support.spotify.com/us/creators/article/publishing-audio-episodes/> |
| Trailers | Uploading a trailer | <https://support.spotify.com/us/creators/article/trailers/> |
| Chapters | Episode chapters | <https://support.spotify.com/us/creators/article/episode-chapters/> |
| Categories | Changing podcast or show categories on Spotify | <https://support.spotify.com/us/creators/article/changing-podcast-show-categories-on-spotify/> |
| SEO guide | Words matter: how to get your podcast SEO right (2022-12-07) | <https://creators.spotify.com/resources/podcast-seo> |
| Descriptions guide | How to write episode descriptions (2022-02-11) | <https://creators.spotify.com/resources/create/podcast-episode-descriptions> |

## Show cover art (one image per feed)

| Spec | Value | Status |
|---|---|---|
| Aspect ratio | "fully squared (1:1)" | official (Delivery spec 4.2) |
| Resolution | "the highest resolution available to allow for all Spotify screen sizes" | official (Delivery spec 4.2) |
| Formats | "TIFF, PNG or JPEG", in that order of preference | official (Delivery spec 4.2) |
| Formats and maximum (shows imported from another host) | ".jpg, .png or .gif format, and no more than 3000 x 3000px" | official (Import) |
| Recommended dimensions | "between 1400x1400 to 3000x3000 pixels, keeping a ratio of 1:1" | guide (Show art guide) |
| Working target | 3000 x 3000 px, RGB, JPG or PNG, no transparency | unverified as a single Spotify rule: it is the largest size the Import page allows, the top of the guide's range, and what Apple Podcasts asks for, so one file serves every directory |
| File-size limit | not stated by Spotify | unverified: the RSS host or the Spotify for Creators uploader sets it. A JPG at quality 90 is usually well under 1 MB |
| Where it is set | Spotify-hosted: Settings > Update show art, or the mobile app. Elsewhere: the RSS host (`<itunes:image>` / `<image>`) | official (Cover art; Delivery spec 5.7, 5.9) |
| Update delay | "typically reflect within 24 hours" | official (Cover art) |
| Display sizes in the apps | not published | unverified working values for previews: 300, 160 and 64 px |
| App page colours | not published | unverified working values: dark #121212, light #ffffff |

Spotify's music cover-art page (Spotify for Artists: 640-10000 px, lossless) is for albums, not podcasts.

## Episode art

| Spec | Value | Status |
|---|---|---|
| Default | "By default, your episodes use the same cover art as your show." | official (Cover art) |
| Custom episode art | allowed; "You can only update episode cover art on Spotify for Creators web"; "Not all platforms display individual episode artwork" | official (Cover art) |
| Removing it | cannot be removed; to go back, upload the show art to the episode | official (Cover art) |
| Shape | "a 1:1 dimensioned image in high resolution" (`<itunes:image>` on the item) | official (Delivery spec 5.34) |
| Size | not stated; use the show-art working target | unverified |

## Video podcasts

| Spec | Value | Status |
|---|---|---|
| Container | MP4 recommended, MOV accepted (Publishing videos also lists MPG); one video and one audio track of the same duration | official (Video specs; Publishing videos) |
| Video codec | H.264 or H.265 recommended | official (Video specs) |
| Resolution | "1080p or higher" recommended; 180p or higher accepted | official (Video specs) |
| Aspect ratio | 16:9 recommended; others accepted but may be letterboxed or pillarboxed | official (Video specs) |
| Frame rate | 24, 25, 30, 50 or 60 fps; progressive only | official (Video specs) |
| Bitrate | 25 Mbit/s CBR for 1080p, 35 Mbit/s for 4K recommended; any bitrate accepted within the size range | official (Video specs) |
| Audio | AAC-LC, PCM or FLAC; 128 kbps or higher; stereo recommended (mono is upmixed) | official (Video specs) |
| Size and length | under 10 GB recommended (up to 60 GB accepted); under 4 h recommended (up to 12 h accepted) | official (Video specs) |
| Upload | web only; account verification needed before the first video | official (Publishing videos) |
| Shows hosted elsewhere | partner hosts distribute video ("Audioboom, Audiomeans, Buzzsprout, Flightcast, Libsyn, Podigee, and Podspace", "for some or all creators"); otherwise replace an existing audio episode with video in Spotify for Creators. Replaced episodes cannot use Spotify's monetization options | official (Video elsewhere) |
| Where video plays | Spotify only; the RSS feed carries the audio | official (Publishing videos) |
| Conflict to flag | the "Publishing videos" page banner says video is for shows hosted with Spotify; the "Video elsewhere" page describes the routes above | official pages disagree: confirm in Spotify for Creators |

### Video thumbnail

| Spec | Value | Status |
|---|---|---|
| Shape | "Horizontal", "16:9 aspect ratio" | official (Thumbnails) |
| Resolution | "Suggested resolution of 1920 x 1080" | official (Thumbnails) |
| Auto thumbnails | taken from the beginning, middle and end of the video; or pick a frame, or upload an image | official (Thumbnails) |
| Formats and file size | not stated | unverified: PNG or JPG |

## Clips (short videos attached to episodes)

| Spec | Value | Status |
|---|---|---|
| Length | 15 to 90 seconds | official (Clips) |
| Resolution | at least 768 x 1024 px; vertical recommended, horizontal supported | official (Clips) |
| File | .MP4 or .MOV, no bigger than 1 GB, with audio | official (Clips) |
| Rules | no selling or recycled watermarked content; don't send listeners to websites, URLs or social follows; mark profanity, violence, drugs, sexual content or sensitive topics as Explicit | official (Clips) |

## Canvas

Canvas (3-8 s vertical loop) is a Spotify for **Artists** feature for music tracks. The Canvas page does not
mention podcasts: there is no Canvas for shows or episodes (official: Canvas).

## Titles, descriptions and chapters

| Spec | Value | Status |
|---|---|---|
| Hard length limits for show or episode title and description | not published on the help pages | unverified |
| Display length | "the consumer facing elements should not exceed 20 characters to ensure a good fit in all Spotify clients" (descriptions excepted); longer text is truncated per device | official (Delivery spec 4.3) |
| Show title | "Keep it short (three to four words)" and include a keyword that reflects the content | guide (SEO guide) |
| Show description | "Make the first 250 characters count": the part shown before "more" and in search snippets | guide (SEO guide) |
| Episode description | "Three to four sentences are usually enough"; don't repeat the title | guide (SEO guide; Descriptions guide) |
| Show notes formatting | rich text or HTML in the episode description | official (Audio episodes; "Formatting your show notes") |
| Chapters (manual) | one per line in the episode description, "timestamp title", e.g. "(00:00) Intro"; first at 00:00; chronological; at least three; at least 30 s apart; plain text, no emoji or HTML. Shows hosted elsewhere can use Podlove chapters in the feed | official (Chapters) |
| Automatic chapters | generated from the transcript, English only; manual chapters override them | official (Chapters) |

## Categories, explicit flag, show type and trailer

| Spec | Value | Status |
|---|---|---|
| Categories | come from the feed's `<itunes:category>` (Apple Podcasts category list); Spotify-hosted shows set them in settings; Spotify's editors also curate; "Chart categories are different to podcast categories elsewhere in the app" | official (Categories; Delivery spec 5.11) |
| Why they matter | "While not mandatory ... the categorization is needed for Spotify to perform recommendations" | official (Delivery spec 5.11) |
| Explicit (show) | yes/true, no/false or clean; yes = parental guidance recommended for parts | official (Delivery spec 5.10) |
| Explicit (episode) | yes/true = not suitable for minors; no/false = suitable, unedited; clean = edited to be suitable. Spotify-hosted: "Content checks" on upload | official (Delivery spec 5.30; Audio episodes) |
| Show type | `episodic` (newest first) or `serial` (oldest to newest) | official (Delivery spec 5.12) |
| Trailer | an episode whose type is Trailer; it "appears at the top of your show page". Shows hosted elsewhere pick an existing episode in Settings > Select your trailer. No length rule; short works best | official (Trailers; Delivery spec 5.33) |
| Audio files | MP3, M4A or WAV (Spotify-hosted upload); feeds: MP3 128 kbps+ or AAC-LC in MP4, up to 12 h | official (Audio episodes; Delivery spec 4.1) |
| Polls | one poll per episode, 2-7 answers; for shows hosted with Spotify and shows hosted elsewhere once claimed in Spotify for Creators | official (<https://support.spotify.com/us/creators/article/how-to-use-polls/>) |
| Q&A | retired: "replaced by Comments"; no new Q&As can be made | official (<https://support.spotify.com/us/creators/article/how-to-use-q-a/>) |
| Claiming a show hosted elsewhere | claim it in Spotify for Creators; a show can be claimed once | official (<https://support.spotify.com/us/creators/article/claiming-your-podcast-on-spotify-for-creators/>) |
