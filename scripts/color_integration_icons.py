"""Color Simple Icons SVGs with brand tints for integration cards."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "public" / "integrations" / "icons"

TINTS = {
    "google-ads": "#4285F4",
    "meta-ads": "#0866FF",
    "stripe": "#635BFF",
    "gmail": "#EA4335",
    "slack": "#4A154B",
    "calendly": "#006BFF",
    "wordpress": "#21759B",
    "zapier": "#FF4A00",
    "hubspot": "#FF7A59",
    "mailchimp": "#FFE01B",
    "linkedin": "#0A66C2",
    "youtube": "#FF0000",
    "twilio": "#F22F46",
    "google-analytics": "#E37400",
    "shopify": "#96BF48",
    "instagram": "#E4405F",
    "facebook": "#1877F2",
    "zoom": "#2D8CFF",
    "quickbooks": "#2CA01C",
    "make": "#6D00CC",
}


def main() -> None:
    for path in sorted(ROOT.glob("*.svg")):
        tint = TINTS.get(path.stem, "#010dff")
        text = path.read_text(encoding="utf-8")
        text = re.sub(r'fill="#[0-9A-Fa-f]{3,8}"', f'fill="{tint}"', text)
        if "fill=" not in text:
            text = text.replace("<svg", f'<svg fill="{tint}"', 1)
            text = text.replace("<path", f'<path fill="{tint}"', 1)
        path.write_text(text, encoding="utf-8")
        print(f"{path.name} -> {tint}")


if __name__ == "__main__":
    main()
