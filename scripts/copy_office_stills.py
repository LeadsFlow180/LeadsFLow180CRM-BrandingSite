"""Copy largest office still per agent from Cursor assets into public/agents/offices."""
from __future__ import annotations

import re
import shutil
from pathlib import Path

ASSETS = Path(
    r"C:\Users\PMLS\.cursor\projects\c-Users-PMLS-OneDrive-Higher-Education-Commission-Desktop-LeadsFlow180-LeadsFLow180CRM-BrandingSite\assets"
)
DST = Path(
    r"C:\Users\PMLS\OneDrive - Higher Education Commission\Desktop\LeadsFlow180\LeadsFLow180CRM-BrandingSite\public\agents\offices"
)

# Prefer these exact attached filenames (from chat image_files) when present.
ATTACHED = {
    "adam": "5772316c-7796-440d-b0c2-bb0ee085e05f",
    "ali": "a84bb546-9391-4c74-b0c8-d1e0fc92a734",
    "ava": "2a1689c1-6a88-4060-a057-9b6c28817572",
    "carlos": "01e1b9b7-1e24-48cb-b4ff-b65f619990df",
    "dante": "d0aba36a-c65a-46e5-9d2d-f97ef0e04416",
    "shelly": "5eb6cb7d-ddbc-47f0-90d0-5564e74a5432",
    "nova": "7ff0c7a8-4b75-489a-8cee-e6818ce71677",
}

NAME_HINTS = {
    "adam": [r"(?i)adam", r"11_38_03_AM-11"],
    "ali": [r"(?i)[\\/_-]ali[-_]", r"(?i)_ali-"],
    "ava": [r"(?i)ava", r"11_38_08_AM-17"],
    "carlos": [r"(?i)carlos", r"11_38_04_AM-12"],
    "dante": [r"(?i)dante", r"11_38_09_AM-18"],
    "shelly": [r"(?i)shelly", r"11_38_06_AM-15"],
    "nova": [r"(?i)nova", r"11_38_05_AM-14"],
}


def main() -> None:
    files = [p for p in ASSETS.iterdir() if p.is_file() and p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}]
    print(f"assets image files: {len(files)}")
    for aid, uuid_frag in ATTACHED.items():
        by_uuid = [p for p in files if uuid_frag in p.name]
        if by_uuid:
            src = max(by_uuid, key=lambda p: p.stat().st_size)
        else:
            candidates = []
            for hint in NAME_HINTS[aid]:
                candidates.extend([p for p in files if re.search(hint, p.name)])
            # de-dupe
            seen = set()
            uniq = []
            for p in candidates:
                if p not in seen:
                    seen.add(p)
                    uniq.append(p)
            if not uniq:
                print(f"NO MATCH {aid}")
                continue
            src = max(uniq, key=lambda p: p.stat().st_size)
        # Prefer jpg for these latest stills (png candidates first will fall through if missing)
        dest = DST / f"{aid}.jpg"
        shutil.copy2(src, dest)
        print(f"{aid}: {src.name} ({src.stat().st_size}) -> {dest.name} ({dest.stat().st_size})")
        # Also remove stale tiny png that would win over jpg in candidates order
        png = DST / f"{aid}.png"
        if png.exists() and png.stat().st_size < dest.stat().st_size:
            # If png is smaller/older placeholder, rename aside so jpg wins
            # Actually candidates prefer png first - so delete/rename smaller png
            if png.stat().st_size < 500_000 or png.stat().st_size < dest.stat().st_size:
                backup = DST / f"{aid}.png.bak"
                if backup.exists():
                    backup.unlink()
                png.rename(backup)
                print(f"  sidelined smaller {aid}.png -> .png.bak")


if __name__ == "__main__":
    main()
