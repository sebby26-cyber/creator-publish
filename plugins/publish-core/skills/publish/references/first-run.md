# First run

Run this when the person says "set up", "get started" or "what can you do", or when a request needs the projects
folder and none is configured. Do the steps in order and keep each message short.

## 1. Find out whether this is a first run

Resolve the **projects folder** in this order and use the first that is set:

1. the environment variable `CREATOR_PUBLISH_VAULT`;
2. a path the person named in their request;
3. `vault_root` in the per-user config file `~/.creator-publish/config.json`
   (or the file named by `CREATOR_PUBLISH_CONFIG`).

```sh
echo "env: ${CREATOR_PUBLISH_VAULT:-<unset>}"
cat "${CREATOR_PUBLISH_CONFIG:-$HOME/.creator-publish/config.json}" 2>/dev/null || echo "no config file"
```

If one is set and the folder exists, it is not a first run: skip to step 4 (and to the tour only if they asked
"what can you do?").

## 2. Tour

Give the short tour from `capabilities.md`: what it can make, example requests, how approvals and spending work,
what they need to do, honest limits. Do not paste the whole file.

## 3. Ask where the projects folder should live, and save it

Ask **one** question: where should your Creator Publish folder live? Suggest `~/CreatorPublishProjects` as the default (not `~/creator-publish`, which is a common place to check out this repo).
Projects will live under `<folder>/projects/<slug>/`. It should not be inside a git repository you publish, and it
may be in a synced folder (it holds only JSON and markdown; media goes in the media folder below).

- If `CREATOR_PUBLISH_VAULT` is set, use it, do not save anything, and tell them the variable wins.
- If their request named a path, use that and save it without asking again.
- Otherwise ask, and use their answer.
- If nobody can answer (a scheduled or unattended run): do not guess a folder. Do step 4, report that the folder
  is not set, and stop before creating any project.

Save it. Expand `~` to an absolute path; never store a relative path. Keep any other keys already in the file:

```sh
mkdir -p "$HOME/.creator-publish" "<folder>/projects"
# then write or merge {"vault_root": "<absolute folder>"} into ~/.creator-publish/config.json
node -e "JSON.parse(require('fs').readFileSync(process.argv[1],'utf8'))" "$HOME/.creator-publish/config.json"
```

Then ask **one** more question: where should media files (renders, generated images, previews) live? Each
project gets a subfolder `<folder>/<slug>/`. It must be outside the projects folder and any git repository. There
is no default: use their answer, or a path their request named. If `CREATOR_PUBLISH_MEDIA` is set, it wins and
nothing is saved. Save it with their OK as `media_root` in the same config file:

```sh
mkdir -p "<media folder>"
# then write or merge {"media_root": "<absolute media folder>"} into ~/.creator-publish/config.json
```

If nobody can answer (unattended), leave it unset; any step that would save media stops and reports that the
media folder is not set. A single project can use another folder with `media_root` in its `project.json`.

Say plainly what was created and where (the projects folder, the media folder, and `~/.creator-publish/config.json`). The same config file
can also hold the renderer's `out_dir`, `font_dirs[]` and `asset_roots[]`; add them only if the person asks.

Offer, once, an optional user-level defaults file (`~/.creator-publish/defaults.json`, copied from
`templates/user-defaults.example.json`) that seeds every new project. Create it only if they say yes.

## 4. Environment check

Run the checks in `dependencies.md` for what they are likely to use now (Node and the renderer first; ffmpeg only
if they have video; connectors and keys only for tools they name). Show a short table: dependency, found or
missing. Install what is missing following the rules in that file (ask first for `sudo`, global installs and
writes outside the project). Re-run the check after installing and report the result. Tell them which connectors
or keys only they can set up.

## 5. Offer a first project

Ask for a project name, and optionally brand colours and fonts. Create it by seeding from the template
(`project-defaults.md`, "Seeding a new project"). Then offer one example request to try on it.

## 6. Finish

Summarise in a few lines: where the folder is, which defaults the project has, what is installed, what is still
for them to do, and one thing to try next.
