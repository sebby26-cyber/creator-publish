# Best practices for a Spotify show's assets and copy

Each rule names its source (short names from `spotify-specs.md`, plus the Platform Rules below). Where a rule is
house practice rather than Spotify's own words, it says so.

| Short name | URL |
|---|---|
| Platform Rules | <https://www.spotify.com/us/safetyandprivacy/platform-rules> |
| Community guidelines | <https://support.spotify.com/us/creators/article/spotify-for-creators-community-guidelines/> |
| Impersonation | <https://support.spotify.com/us/creators/article/impersonation-policy/> |

## 1. Spotify's content and artwork rules
- **No impersonation.** The Platform Rules forbid "replicating the same name, image, and/or description as another
  existing creator" and "posing as another person, brand, or organization in a misleading manner". Never borrow
  another show's art style so closely it reads as theirs, and never use a real person's likeness without consent
  (Platform Rules; Impersonation).
- **Synthetic media.** The Platform Rules cover "audio or visual media artificially created through the use of
  technology that's purported to be true". If a show uses an AI voice or AI imagery, say so plainly in the show
  description and episode notes; never present a synthetic scene as real (Platform Rules). A disclosure line is
  house practice; Spotify has no podcast AI-label field on the pages checked (unverified).
- **No sexual or graphic imagery** in show or episode art (Community guidelines; Platform Rules).
- **No spam.** "Content made solely to improve SEO or promote a product or service" is not allowed (Community
  guidelines). This is the rule behind "no keyword stuffing" below.
- **Clips** may not be "overly promotional", recycle watermarked content, or send listeners to websites or social
  follows (Clips).
- **Rights.** Use only art, photos, fonts and music you have the rights to (Clips; Platform Rules). Record the
  licence of any font you bundle.

## 2. Legibility at small sizes
Spotify: design "with large and small sizes in mind"; "Use simple, high-contrast imagery"; text "clear, prominent,
and minimal"; don't "Use tiny text or additional text alongside your podcast title"; "If you're having trouble with
legibility, try using a block of color behind the text"; don't "Stretch photos that are too small"; feature the
show's logo, which should carry only the show name (Show art guide).

How to check (house practice):
- Render the cover at **300, 160 and 64 px** on a **dark (#121212)** and a **light (#ffffff)** page with
  `examples/cover-small-sizes.json` (sizes and colours are unverified working values; Spotify does not publish
  them). At 64 px the mark and the show name's shape should still be recognisable; at 160 px the name should be
  readable.
- One focal mark, the show name, and at most one short descriptor that is part of the show's name. No episode
  numbers, schedules, URLs, host lists or badges.
- A cover whose background matches the dark page (near-black) loses its edge in dark mode: keep the mark and
  type bright, or add a subtle lighter field.
- Keep important type out of the very edges; some surfaces round the corners (unverified).

## 3. Titles and descriptions: clear, keyword-true, no stuffing
- **Show title:** short, "three to four words", with the keyword that reflects the content (SEO guide). Most
  surfaces show about 20 characters before truncating (Delivery spec 4.3), so the distinctive word goes first.
- **Show description:** "Make the first 250 characters count": what it is, who it is for, what a listener gets
  (SEO guide). State the core topic once, "not stuffed in, but clearly stated" (SEO guide). No keyword lists, no
  hashtags, no other shows' names (Community guidelines: spam; Platform Rules: impersonation).
- **Episode title:** phrased the way a listener would search, not repeated from the show title (SEO guide).
- **Episode description:** "Three to four sentences are usually enough", picking up where the title leaves off
  (SEO guide; Descriptions guide). Then chapters (format in `spotify-specs.md`), credits and disclosures.
- **Episode numbers** belong in the episode-number field, not the title, unless the show's naming convention puts
  them there (house practice; Spotify-hosted shows have season and episode fields under Additional details: Audio
  episodes).
- **Categories:** pick the honest primary category; it drives recommendations (Delivery spec 5.11).
- **Explicit:** answer truthfully per show and per episode; when in doubt, label it (Clips; Delivery spec).

## 4. Consistency with the YouTube channel, without copying the banner
- **Same identity system:** the same name spelling, palette, typeface and mark as the YouTube channel, so a
  listener who knows one recognises the other (Show art guide: "Define your podcast's visual identity").
- **Different composition:** a square cover is not a crop of the 2560x1440 banner. Banners are wide, carry a
  tagline and a schedule, and rely on a centre safe area; a cover needs one bold mark and the name filling the
  square. Build the cover from the brand's mark or a square-friendly hero image, then check it small (house
  practice, following the Show art guide's "one size fits all" don't).
- **The avatar is a good starting point, not the answer:** a YouTube profile picture is a circle at 98 px with no
  text; the Spotify cover is a square with the show name. Reuse the mark, add the name.
- **One feed, one cover:** if the show is also on Apple Podcasts (or any other directory) through the same RSS
  feed, the cover is the same file everywhere. Reuse it; do not make a near-duplicate Spotify-only cover (house
  practice; the feed carries one `<itunes:image>`: Delivery spec 5.9).
- **Video thumbnails** can reuse the YouTube thumbnail design, rendered at Spotify's suggested 1920x1080 from the
  same spec when the source art is large enough (Thumbnails). Never upscale a small still to get there.

## 5. Short do / don't list (copy into SHOW_COPY.md)
| Do | Don't |
|---|---|
| One square cover, 3000x3000, RGB JPG/PNG, shared with every directory | Stretch a small image up to 3000 px |
| Show name large; one mark; strong contrast | Tiny text, taglines, episode numbers, URLs on the cover |
| Check the cover at 64 / 160 / 300 px on dark and light | Judge the cover only at full size |
| 3-4 word show title with the honest keyword | Keyword lists, hashtags, other shows' names |
| First 250 characters of the description say what it is and for whom | Repeat the title in the description |
| Chapters as "(00:00) Title", 3+, 30 s apart | Emoji or HTML in chapter titles |
| Disclose AI voice or AI imagery in plain words | Present synthetic scenes as real |
| Same palette, type and mark as the YouTube channel | Crop the YouTube banner into the cover |
