"""Color the 11 integration SVGs with brand tints."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "public" / "integrations" / "icons"

TINTS = {
    "google-sheets": "#34A853",
    "gmail": "#EA4335",
    "google-calendar": "#4285F4",
    "google-drive": "#4285F4",
    "airtable": "#18BFFF",
    "facebook-lead-ads": "#1877F2",
    "microsoft-outlook": "#0078D4",
    "clickup": "#7B68EE",
    "wordpress": "#21759B",
    "twilio": "#F22F46",
    "shopify": "#96BF48",
}


def main() -> None:
    for stem, tint in TINTS.items():
        path = ROOT / f"{stem}.svg"
        if not path.exists():
            print("MISSING", stem)
            continue
        text = path.read_text(encoding="utf-8")
        text = re.sub(r'fill="#[0-9A-Fa-f]{3,8}"', f'fill="{tint}"', text)
        if "fill=" not in text:
            text = text.replace("<svg", f'<svg fill="{tint}"', 1)
            text = text.replace("<path", f'<path fill="{tint}"', 1)
        path.write_text(text, encoding="utf-8")
        print(f"{stem} -> {tint}")


if __name__ == "__main__":
    main()
