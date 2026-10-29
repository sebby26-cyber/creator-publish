# Building the end-screen template from the video's actual outro

An end screen is set in YouTube Studio: Studio draws the elements (video, playlist, subscribe, channel, link) over
the last 5-20 seconds of the video. The template this skill makes is a **layout guide**: it shows the owner
where to drag each element so nothing important in the outro is covered. It is never burned into the video
unless the owner asks for a clean branded end card for the editor (see "Clean end card" below).

The commands are in `SKILL.md` ("Inspect the outro"). This file holds the decision rules.

## 1. Measure the video

- **Duration** below 25 s: no end screen is possible. Say so and stop the end-screen part.
- **Aspect ratio** not 16:9: YouTube may allow fewer than 4 elements. Keep to 2-3 and say so.
- **Made for kids**: no end screens and no cards. Leave them out of the checklist.

## 2. Read the last 20 seconds

From the contact sheet (one cell per second, read left to right, top to bottom; cell `i` is
`T0 + i` seconds, where `T0 = duration - 20`) and the detector output, write down:

| What | Where it comes from |
|---|---|
| Where the story ends (last line of narration or the final beat) | the contact sheet, plus the script or transcript if supplied |
| Branded end card or outro sequence, if any, and when it starts | the contact sheet; a scene cut (`pts_time`) near it |
| Black or near-black tail | `black_start` / `black_end` |
| Silent tail | `silence_start` / `silence_end` |
| Areas of the frame that hold key picture or text in the window (faces, the subject, on-screen text, logos, captions) | the frames you grabbed |

All times from the commands are absolute (seconds from the start of the video) because they run with `-copyts`.

## 3. Pick the start time and window

1. Never start before the story ends: an end screen over the last spoken line or the payoff hides it and
   invites viewers to leave early.
2. If the video has a branded end card or outro, start at its first frame (round to 0.1 s).
3. Otherwise start at the end of the last line of narration or the final beat.
4. The window is from the start to the end of the video. It must be **5 to 20 s**:
   - shorter than 5 s: the video needs a longer outro (a hold on the final frame or an end card). Recommend
     the editor extends it; do not move the start into the content.
   - longer than 20 s: start at `duration - 20`.
5. A long black or silent tail is dead air: recommend trimming it, or note that elements over pure black
   read as an empty end card (acceptable if the owner wants it).
6. Record the choice as `end screen: 00:MM:SS.s to 00:MM:SS.s (N.N s), reason: ...`.

## 4. Place the elements

- Default set for a channel with a back catalogue: **Video: best for viewer**, **Video: most recent** (or a
  chosen video or playlist) and **Subscribe**. A new channel with one video: **Subscribe** plus a playlist or
  the one other video once it exists. At most 4 elements on 16:9.
- Keep elements off the areas you noted in step 2. If the outro has a fixed layout (an end card), put the slots
  over its empty areas; if the subject moves, check frames at the start, middle and end of the window.
- Keep clear of the frame edges (about 5% each side) and the bottom ~10% where the player controls and
  progress bar appear on hover. This is practical guidance, not a published YouTube rule.
- Leave room between elements; Studio snaps to its grid and to other elements.
- The slot boxes in `examples/end-screen-template.json` (video 760 x 428, video 512 x 288, subscribe circle
  200 px, on 1920 x 1080) are planning sizes. YouTube does not publish element pixel sizes; the real element
  is whatever Studio draws. Adjust the slots to the outro, keep them identical in the template spec and the
  overlay spec, and re-render both.
- Note which element goes in which slot (left to right, top to bottom) in the channel-copy checklist.

## 5. Check it on the real frames

Render the overlay spec over a frame at the chosen start, and again over a frame near the end of the window if
the picture changes. Look for: a slot covering a face, the subject, on-screen text, captions or a logo; slots
touching each other or the edges; the timing label matching the recorded window. Fix the slots and re-render.

## Clean end card (optional)

If the video has no outro and the owner wants one, the same template spec renders a branded end card: set every
layer whose `id` starts with `guide-` to `"visible": false`, render it, and give the PNG to the editor to hold for
the end-screen window (5-20 s). The editor adds it to the video; this skill does not edit video.
