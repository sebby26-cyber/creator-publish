# Output sidecar (optional)

A finished file may have a small JSON sidecar saved next to it, named `<file>.json`
(e.g. `episode.mp4` -> `episode.mp4.json`). Publish works with or without one.

```json
{ "file": "episode.mp4", "kind": "final video", "status": "draft | pending_review | approved | rejected",
  "sha256": "…", "project": "<slug>", "production": "<id>", "made_with": ["filmcraft", "audio-master"],
  "created_at": "…", "notes": "" }
```

- `kind` is plain words, not a type ID. `sha256` comes from `sha256sum <file>` (macOS: `shasum -a 256 <file>`).
- Publish reads it for kind, status and hash, and records the source file (and project/production, if given) in
  the package `status.md`. If the hash does not match the file, say so before using it.
- Post only files whose status is `approved`, unless the owner says otherwise.
- The sidecar is never edited by publish, and nothing validates it.
- Pass the file itself, not the `.json` sidecar, to `ffmpeg` and `ffprobe` (frame grabs, spec checks).
