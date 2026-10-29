#!/usr/bin/env python3
"""Repo checks run by .github/workflows/validate.yml (and by hand from the repo root):
JSON-parse every tracked .json, check manifest names/versions/paths, SKILL.md frontmatter, and relative links."""
import json, os, re, subprocess, sys

errors = []
files = subprocess.check_output(["git", "ls-files"], text=True).split()
tracked = set(files)

# 1. Every tracked JSON file parses.
for f in (x for x in files if x.endswith(".json")):
    try:
        json.load(open(f, encoding="utf-8"))
    except Exception as e:
        errors.append(f"invalid JSON: {f}: {e}")

# 2. Marketplace entries match each plugin.json, and every plugin path exists.
market = json.load(open(".claude-plugin/marketplace.json", encoding="utf-8"))
for p in market["plugins"]:
    pj_path = os.path.join(p["source"], ".claude-plugin", "plugin.json")
    if not os.path.isfile(pj_path):
        errors.append(f"missing plugin manifest: {pj_path}")
        continue
    pj = json.load(open(pj_path, encoding="utf-8"))
    if pj.get("name") != p["name"]:
        errors.append(f"name mismatch: marketplace {p['name']} vs {pj_path} {pj.get('name')}")
    if pj.get("version") != p.get("version"):
        errors.append(f"version mismatch for {p['name']}: {p.get('version')} vs {pj.get('version')}")
    icon = pj.get("icon")
    if icon and not os.path.isfile(os.path.join(p["source"], icon)):
        errors.append(f"icon not found for {p['name']}: {icon}")

# 3. Every SKILL.md has frontmatter with name (matching its folder) and description.
skills = [f for f in files if f.endswith("/SKILL.md")]
for f in skills:
    text = open(f, encoding="utf-8").read()
    m = re.match(r"---\n(.*?)\n---\n", text, re.S)
    if not m:
        errors.append(f"no frontmatter: {f}")
        continue
    name = re.search(r"^name:\s*(\S.*)$", m.group(1), re.M)
    if not name or not re.search(r"^description:\s*\S", m.group(1), re.M):
        errors.append(f"frontmatter needs name and description: {f}")
    elif name.group(1).strip() != os.path.basename(os.path.dirname(f)):
        errors.append(f"skill name {name.group(1).strip()!r} does not match folder: {f}")

# 4. Relative links and src= references in Markdown resolve to tracked files or folders.
links = 0
for f in (x for x in files if x.endswith(".md")):
    for m in re.finditer(r"\]\(([^)\s]+)\)|src=\"([^\"]+)\"", open(f, encoding="utf-8").read()):
        target = (m.group(1) or m.group(2)).split("#")[0]
        if not target or re.match(r"[a-z]+:", target):
            continue
        links += 1
        path = os.path.normpath(os.path.join(os.path.dirname(f), target))
        if path not in tracked and not any(t.startswith(path + "/") for t in tracked):
            errors.append(f"broken link in {f}: {target}")

print(f"{sum(1 for f in files if f.endswith('.json'))} JSON files, {len(market['plugins'])} plugins, "
      f"{len(skills)} skills, {links} relative links checked")
for e in errors:
    print("ERROR:", e)
sys.exit(1 if errors else 0)
