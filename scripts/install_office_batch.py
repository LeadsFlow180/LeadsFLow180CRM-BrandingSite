"""Install newly attached office stills into public/agents/offices."""
from __future__ import annotations

import shutil
from pathlib import Path

ASSETS = Path(
    r"C:\Users\PMLS\.cursor\projects\c-Users-PMLS-OneDrive-Higher-Education-Commission-Desktop-LeadsFlow180-LeadsFLow180CRM-BrandingSite\assets"
)
DST = Path(
    r"C:\Users\PMLS\OneDrive - Higher Education Commission\Desktop\LeadsFlow180\LeadsFLow180CRM-BrandingSite\public\agents\offices"
)

# uuid fragment from attached image_files -> agent id
MAP = {
    "c8930af9-0dcb-43c4-be8b-f9d985bc6c12": "danica",
    "801564cc-f88c-43f2-95c0-6087b4fd31e5": "niki",
    "36ab042e-35b9-4c5d-a5ab-d2dcaa6f2540": "jay",
    "2d6e5e21-22f2-44b9-aa03-c780ef941ef4": "ali",
    "d08660a3-94d1-45ea-a38a-061ce17ae8cd": "jordan",
    "3bb6f7b9-5ae8-4613-b35e-fae617fdb07d": "caleb",
    "c8c93cc0-8f61-42fe-98c3-3ffee7e5b79e": "nova",
    "105e3dfc-a5e9-40a4-b70e-badb5bc1c20b": "leila",
    "d62fa036-1a80-4c3c-be99-e79162354e0c": "amir",
    "ddcd22a7-db57-48c0-8ff6-7687d5c470ab": "adam",
}


def main() -> None:
    files = list(ASSETS.rglob("*"))
    print("asset files scanned", len(files))
    for frag, aid in MAP.items():
        matches = [p for p in files if frag in p.name and p.is_file()]
        if not matches:
            print("MISSING", aid, frag)
            continue
        src = max(matches, key=lambda p: p.stat().st_size)
        # Prefer png as primary (officePhotoCandidates lists png first)
        dest = DST / f"{aid}.png"
        # Read via bytes to avoid OneDrive cloud-placeholder CopyFile issues
        data = src.read_bytes()
        dest.write_bytes(data)
        # Sideline older jpg/webp so png is used
        for ext in (".jpg", ".jpeg", ".webp"):
            old = DST / f"{aid}{ext}"
            if old.exists():
                bak = DST / f"{aid}{ext}.bak"
                if bak.exists():
                    bak.unlink()
                old.rename(bak)
        print(f"OK {aid}: {src.name} ({len(data)} bytes) -> {dest.name}")


if __name__ == "__main__":
    main()
