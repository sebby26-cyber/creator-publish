# Security policy

## Supported versions

Only the latest release on `main` gets security fixes. Each plugin is versioned on its own (see
`.claude-plugin/marketplace.json`); update with `/plugin marketplace update creator-publish` before reporting.

| Version | Supported |
|---|---|
| Marketplace 0.6.x (latest `main`) | Yes |
| Anything older | No |

## Reporting a vulnerability

Please do **not** open a public issue for a security problem.

Report it privately through GitHub: open the repository's **Security** tab and choose **Report a vulnerability**
(GitHub private vulnerability reporting). Include what is affected (plugin, skill or renderer file), how to
reproduce it, and the impact you expect.

You should get a first reply within 7 days. Fixes are released on `main` and noted in [CHANGELOG.md](CHANGELOG.md);
reporters are credited unless they ask not to be.

## Scope

In scope: the skills' instructions (for example a command that could leak a secret or write outside the folders
the person chose), the compose renderer (`plugins/compose/renderer/`) and its MCP server, and the manifests.

Out of scope: third-party connectors and providers (Higgsfield, Canva, Google, OpenAI, Black Forest Labs,
Ideogram and others) and Claude Code itself; report those to their owners.

Never paste API keys or tokens into an issue or report. Keys are read from the environment only and never belong
in this repo.
