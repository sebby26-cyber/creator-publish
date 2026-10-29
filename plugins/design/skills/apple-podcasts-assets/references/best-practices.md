# Best practices for an Apple Podcasts show

Apple's own guidance plus proven podcast packaging practice. Checked 2026-10-23. Labels:
- **Apple**: from an Apple page listed in `apple-podcasts-specs.md` (short names below match its Sources table);
- **practice**: common packaging practice, not an Apple rule. Third-party sources are named where one was
  used; where none was checked, the item is marked **unverified**.

Apply every section to each set and copy the do/don't list at the end into the show-copy doc.

## 1. Show cover

1. **Title first, legible at scale.** Make the show title clear and prominent and limit other text and logos
   (Apple, Show Cover). Check it at full size, at 200/120/80 px, and at **60 and 55 px**, the small-thumbnail
   range (size **unverified**: Apple gives no pixel figure). At 55 px a 3000 px cover is shrunk about 55
   times, so the title's capital letters need to be at least about 300 px tall on the 3000 px canvas to stay
   about 5-6 px high (derived).
2. **One focal image, simple shapes, strong contrast.** Text must contrast with what is behind it (Apple, Show
   Cover). Practice: one subject, two or three colours, no thin strokes or fine detail that turns to mush when
   small.
3. **No Apple anything.** No Apple logos, badges ("Listen on Apple Podcasts"), hardware, or the terms Apple
   Podcasts, Apple Music, iTunes (Apple, Artwork policies). Badges belong on your website, never in the cover.
4. **Nothing misleading or explicit.** Depict the show you publish; no explicit or objectionable imagery; no
   other show's look (Apple, Artwork policies; Content guidelines).
5. **No pixelation.** Start from art at 3000 px or vector shapes. Blurry or pixelated art "may be rejected"
   (Apple, Artwork policies). Practice: keep raster upscaling to about 1.3x or less, and record the factor. A
   source too small for 3000 px is better at 1400-2000 px, which Apple accepts via RSS, than blown up.
6. **Solid background, no alpha.** Export JPG (no alpha channel by design) or a flattened RGB PNG (Apple,
   Show Cover; RSS guide). Not pure black or pure white: Apple suggests a slightly different value so the
   cover does not melt into the dark or light page.
7. **Keep the title out of the edges and the bottom fifth.** UI can cover parts of the art (Apple, template
   safe area); the "bottom fifth" figure is **unverified**. Rounded corners clip the corners in the app.
8. **Same family as the YouTube channel, not a copy of the banner.** Use the same palette, typefaces, mark and
   hero motif as the YouTube icon and thumbnails, composed for a square. A 16:9 banner cropped to a square
   loses its text-safe area and usually its subject (practice). The cover and the YouTube profile picture
   should be recognisable as the same show side by side.
9. **Variants.** Make two, pick one, and do not change the cover often: it is the show's identity in search
   and in listeners' libraries (practice, **unverified** as an Apple ranking factor).

## 2. Episode art

- No logo and no text: the title is shown under it (Apple, Episode Art). Fill the square with art.
- Consistent treatment across episodes (palette, crop style), different image each time (Apple, Episode Art).
- Optional. Without it the show cover is shown, which is a fine default when good square art is not
  available (Apple, Episode Art).
- Use the episode's real key art (the still or frame the video or thumbnail uses), so it depicts the episode.

## 3. Titles, author and descriptions

- **Show title**: the name, clear and concise. A short descriptor that is literally true ("Sleep Stories",
  "a science podcast") is fine; a string of keywords is not and can get the show removed (Apple, RSS guide).
- **Author**: the person, company or network name only (Apple, RSS guide). No keywords, no "podcast".
- **Show description**: up to 4000 bytes (Apple, RSS guide). Practice: the first one or two sentences show in
  previews, so say what the show is, for whom, and what one episode gives the listener; then format, length,
  schedule (only if real) and disclosures. Natural keywords, no keyword lists, no claims that are not true
  (Apple, Content guidelines: metadata must accurately represent the content).
- **Episode titles**: no episode or season number in the title; set `<itunes:episode>` and
  `<itunes:season>` instead (Apple, RSS guide). Practice: lead with what the episode is about, keep the show
  name out of the episode title (Apple already shows it), and stay under about 60 characters (**unverified**
  figure). A YouTube title pattern such as "<Title> | Show Ep. N" is changed for Apple to just "<Title>".
- **Episode descriptions**: up to 10,000 characters (Apple, RSS guide). Practice: first line = the episode's
  promise; then chapters if any (chapter titles 45 characters or fewer, Apple), sources and disclosures.
- **Spell it out**: no self-censoring with symbols (Apple, Content guidelines).

## 4. Category, explicit flag, type, trailer

- **Category**: the one that best reflects the show, with a subcategory when one fits (Apple, Categories).
  Podcasts Connect takes a primary and a secondary; the RSS feed counts only the first, so list the best one
  first (Apple, RSS guide). Do not pick a category for its chart size if it misdescribes the show.
- **Explicit**: `true` only if any episode has explicit content, and then flag those episodes; otherwise
  `false` (Apple, Content guidelines). It is a truthful content flag, not a marketing choice.
- **Type**: `episodic` when episodes stand alone, `serial` when they must be heard in order (Apple, RSS guide).
- **Trailer**: a short promotional episode with `<itunes:episodeType>trailer</itunes:episodeType>` (Apple, RSS
  guide), only for a show that is or soon will be on Apple Podcasts (Apple, Content guidelines). Practice:
  30-90 seconds, in the show's real voice, what it is and when episodes come; Apple features the trailer on
  the show page (placement **unverified**).
- **Bonus** episodes (compilations, extras) use `bonus` (Apple, RSS guide).

## 5. Show page and launch

- **AI disclosure**: if a synthetic voice or AI host makes a material part of the audio, say so in the
  content (spoken) and in the metadata of the show and every episode (Apple, Content guidelines §1.11).
- **Consistency**: same name, cover and description everywhere the feed goes (Apple, Spotify, others), so
  listeners and search treat it as one show (practice).
- **Launch with more than one episode** where possible, so a new listener can keep going (practice,
  **unverified** as an Apple ranking factor).
- **Featuring** is Apple's editorial choice; a Showcase Hero is needed only if it is requested (Apple,
  Showcase Hero).
- **Do not** put "Apple Podcasts" badges or links inside the artwork or the show title (Apple, Artwork
  policies). Use Apple's official badges only on your own website and social posts.

## 6. Do / don't checklist (copy into SHOW_COPY.md)

**Do**
- Title clear and big; check it at 60 and 55 px on a dark and a light page.
- One focal image or mark; strong contrast; solid background, not pure black or white.
- 3000 x 3000 JPG or flattened RGB PNG, no alpha; record size, bytes and sha256.
- Same palette, type and mark as the YouTube channel, composed for a square.
- Episode art without text or logo, cropped from the episode's real key art.
- Plain show name and author; true, specific description; disclosures in show and episode metadata.
- Episode numbers in `<itunes:episode>`, not in the title; set type, category and explicit truthfully.

**Don't**
- No Apple logos, badges, hardware or the words Apple Podcasts / iTunes in the art.
- No keyword lists in the title, author or description; no self-censoring.
- No pixelated upscales, thin strokes or small text that vanishes at thumbnail size.
- No title or key art in the bottom fifth or the corners.
- No cropped YouTube banner as the cover; no other show's look.
- No trailer for a show that is not coming to Apple Podcasts.
