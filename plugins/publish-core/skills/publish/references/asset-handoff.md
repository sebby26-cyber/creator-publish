# Asset-package status and handoff

Prefer an existing suitable campaign/episode record. Otherwise adapt this Markdown record at `<project>/packages/<package-id>/status.md`. It is a content checklist, not a schema/database/state machine. Link profiles, templates and asset manifests rather than duplicating them. The coordinator owns updates.

```markdown
# <existing package/campaign/episode identity or new label>
Project: <slug and exact profile path>
Source: <exact source file path, plus its optional `<file>.json` sidecar (kind, status, sha256, project/production)>
Files live in: <absolute media folder holding this package's files ($MEDIA, from `media_root`); no media is kept in the project folder>
Request / outputs: <thumbnail, pin, card, banner or other variants; platforms/formats>
Stage / review state: <current work>
Explicit choices: <tool/provider/model/route/seed/quality, reference IDs, exact copy, brand/template/account; scope>
Choices in effect: <one line per setting: `setting: value (from <source>)`, where <source> is exactly one of: explicit request | run notes | project rule | project default | skill guidance>
Run notes: <choices for this package only ("just this time"); these never go into project.json>
Selected drafts: <concept/variant -> artifact ID/file, draft/take/version and review state>
Editable sources: <spec file, selected imagery/frame timecode, template/Canva design ID>
Outstanding fixes: <affected variants and required review>
Authorization / spend: <existing owner decisions/gates/caps, actual costs and unknown amounts>
Next action: <bounded action with exact inputs; missing connector/input if applicable>
Posting: <only if requested; exact media/copy/account/timezone, approval time and actual result (platform, URL/ID)>
```

`Choices in effect` and `Run notes` implement the precedence in [project-defaults.md](project-defaults.md): a saved default is only written to `project.json` when the owner says "make X the default".

Each handoff identifies project/package/source production, concept/variant, exact output artifact/file, draft/take/version and generated/selected/approved/rejected/superseded state. Include model/provider/route, seed support, settings, reference/character/template IDs, provider job/result/design ID, actual dimensions/format, defects and next action. Match outputs by their job/result/variant bindings, not names or download order. Keep measured frame timestamps when relevant.

A final variant records its selected source draft, layout re-render versus enhancement/upscale versus regeneration, requested/applied settings, exact output, QC and review state. Keep unchanged selected assets and old lineage. A new size needs crop/text/safe-area review; resizing is not proof that the layout still works.

Before any posting approval, prepare a reviewable post with exact output/copy, account/platform and time/timezone. Record the actual user decision; never infer it from visual approval or ready status. Keep confirmed published/scheduled IDs/URLs separately from intended actions or submitted jobs; poll existing jobs before retrying uncertain submissions.
