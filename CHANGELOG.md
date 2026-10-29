# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow
[Semantic Versioning](https://semver.org/spec/v2.0.0.html). The version is the marketplace version in
`.claude-plugin/marketplace.json`; each plugin also carries its own version.

## [Unreleased]

### Added

- Repository health files: `SECURITY.md`, `CODE_OF_CONDUCT.md`, this changelog, issue and pull request
  templates, a `validate` GitHub Actions workflow, Dependabot and `.gitattributes`.
- Plugin listing icons for all six plugins (`plugins/<plugin>/.claude-plugin/icon.png`, sources in
  `assets/brand/icons/`).

## [0.6.0] - 2026-10-29

Initial public release of the Creator Publish plugin marketplace for Claude Code.

### Added

- **publish-core 0.3.0** (`publish`): first-run tour and setup, saved per-project defaults in `project.json`,
  coordination of the other skills, resumable package `status.md`, and a user-chosen media folder
  (`media_root`) so media never lands in the projects folder.
- **compose 0.2.0** (`visual-composer`): deterministic local rendering of supplied assets from a JSON spec, with
  the Node renderer (CLI and MCP server), schema and bundled Anton, Inter and DejaVu Sans fonts.
- **design 0.2.0**: briefs and composition specs for thumbnails, quote cards and text graphics, infographics and
  data viz, Pinterest pins, a brand template system, and full asset sets for YouTube channels, Apple Podcasts,
  Spotify shows and X profiles.
- **image-gen 0.1.1**: image prompt routing plus Nano Banana, FLUX, Ideogram and AI image editing, for whichever
  provider you connect, with no default provider.
- **canva 0.1.1** (`canva`): Canva execution through the Canva connector.
- **post 0.2.0** (`post`, optional): per-post platform, caption and hashtag recommendations, spec checks, and
  posting only after your explicit OK for each post.

[Unreleased]: https://github.com/sebby26-cyber/creator-publish/compare/v0.6.0...HEAD
[0.6.0]: https://github.com/sebby26-cyber/creator-publish/releases/tag/v0.6.0
