from pathlib import Path
import re

t = Path("src/lib/agentProfiles.ts").read_text(encoding="utf-8")
titles = re.findall(r'guide: \{\n      title: "([^"]*)"', t)
print("guides", len(titles))
print("nonempty", sum(1 for x in titles if x))
print("empty", sum(1 for x in titles if not x))
print("samples", [x for x in titles if x][:3])
m = re.search(r"mia: \{[\s\S]*?guide: \{([\s\S]*?)\n    \},", t)
print("mia guide block:\n", m.group(1) if m else "MISSING")
