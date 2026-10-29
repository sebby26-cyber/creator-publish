## What and why

<!-- One change per pull request. What changes, and why. Link the issue if there is one. -->

## How I checked it

<!-- There is no unit-test suite: say what you ran. See CONTRIBUTING.md "Verifying a change". -->

- [ ] `claude plugin validate .` and `claude plugin validate plugins/<name>` pass
- [ ] Renderer changes: `npm ci`, `node src/cli.js health`, and a sample render of the affected spec
- [ ] Skill changes: every command added to a skill was run; a real prompt was tried from a scratch folder

## Checklist

- [ ] No secrets, personal projects, media or machine-specific paths
- [ ] Everything a plugin needs stays inside its own `plugins/<name>/` folder
- [ ] README, skill references or `CHANGELOG.md` updated if behaviour changed
- [ ] Upstream (social-media-skills) text kept; additions marked `creator-publish note:` and recorded in `NOTICE.md`
