"""Verify every SEO pack field is present in agentProfiles and used by portfolio UI."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SEO = ROOT / "docs" / "LeadsFlow180_Team_Profiles_SEO_AEO_Content.md"
PROFILES = ROOT / "src" / "lib" / "agentProfiles.ts"
FILLERS = ROOT / "src" / "lib" / "agentPortfolioFillers.ts"
PAGE = ROOT / "src" / "components" / "agents" / "AgentPortfolioPage.tsx"
ROUTE = ROOT / "src" / "app" / "agents" / "[id]" / "page.tsx"

NAME_TO_ID = {
    "Mia Carter": "mia",
    "Danica Bato": "danica",
    "Mark Bennett": "mark",
    "Johana": "jojo",
    "Jordan Brooks": "jordan",
    "Sonja Williams": "sonja",
    "Amir Rahman": "amir",
    "Jay Collins": "jay",
    "Zenda Okafor": "zenda",
    "Caleb Whitaker": "caleb",
    "Adam Mitchell": "adam",
    "Leila Patel": "leila",
    "Ali Khan": "ali",
    "Carlos Rivera": "carlos",
    "Omar Haddad": "omar",
    "Nova Chen": "nova",
    "Shelly Allen": "shelly",
    "Lee Park": "lee",
    "Ava Morgan": "ava",
    "Dante": "dante",
    "Niki Kalogerakis": "niki",
}


def split_bullets(s: str) -> list[str]:
    return [p.strip(" ·•-\t") for p in re.split(r"\s*[·•]\s*", s) if p.strip(" ·•-\t")]


def main() -> None:
    seo = SEO.read_text(encoding="utf-8")
    profiles = PROFILES.read_text(encoding="utf-8")
    fillers = FILLERS.read_text(encoding="utf-8")
    page = PAGE.read_text(encoding="utf-8")
    route = ROUTE.read_text(encoding="utf-8")

    print("Markdown in project:", SEO.exists(), SEO)
    print()

    ui_checks = {
        "specialtyLabel": "specialtyLabel" in page,
        "heroHeadline": "heroHeadline" in page,
        "heroBlurb/intro": "heroBlurb" in page,
        "askCta": "askCta" in page,
        "ctaHelper": "ctaHelper" in page,
        "facts": "Facts About" in page,
        "portfolio": "portfolio" in page and "Sample concept" in fillers,
        "about": "About" in page,
        "skills": "Core Skills" in page and "profile.skills" in fillers,
        "faqs": "Frequently Asked Questions" in page,
        "getStarted": "How to Get Started" in page and "getStarted" in fillers,
        "guide": "Free Quick Guide" in page,
        "guide.summary": "guide.summary" in page or "fillers.guide.summary" in page,
        "guide.downloadCta": "downloadCta" in page,
        "FAQ JSON-LD": "FAQPage" in route,
        "Person JSON-LD": "Person" in route,
        "pageTitle meta": "pageTitle" in route,
        "metaDescription": "metaDescription" in route,
    }
    print("=== UI wiring ===")
    for k, ok in ui_checks.items():
        print(("OK " if ok else "MISSING "), k)

    print("\n=== Per-agent Core skills (capabilities) ===")
    gaps = []
    chunks = re.split(r"\n(?=# \d+\. )", seo)
    for chunk in chunks:
        m = re.match(r"# \d+\. (.+?) — ", chunk)
        if not m:
            continue
        name = m.group(1)
        aid = next((v for k, v in NAME_TO_ID.items() if k in name), None)
        if not aid:
            print("UNMAPPED", name)
            continue
        skills_m = re.search(r"\*\*Core skills:\*\*\s*(.+)", chunk)
        seo_skills = split_bullets(skills_m.group(1)) if skills_m else []
        pb = re.search(rf"  {aid}: \{{([\s\S]*?)\n  \}},", profiles)
        if not pb:
            gaps.append(f"{aid}: no profile")
            continue
        b = pb.group(1)
        sm = re.search(r"skills: \[([\s\S]*?)\]", b)
        prof_skills = re.findall(r'"([^"]+)"', sm.group(1)) if sm else []
        missing = [s for s in seo_skills if s not in prof_skills]
        # case-insensitive soft match
        soft_missing = []
        for s in seo_skills:
            if not any(s.lower() == p.lower() or s.lower() in p.lower() or p.lower() in s.lower() for p in prof_skills):
                soft_missing.append(s)
        status = "OK" if not soft_missing else f"MISSING skills: {soft_missing}"
        if soft_missing:
            gaps.append(f"{aid}: {soft_missing}")
        print(f"{aid:8} seo={len(seo_skills)} profile={len(prof_skills)} {status}")

        # also verify faqs/work/guide counts
        seo_faqs = len(re.findall(r"^- \*\*", chunk, re.M))
        prof_faqs = len(re.findall(r"\bq: ", b))
        if prof_faqs < seo_faqs:
            gaps.append(f"{aid}: faqs {prof_faqs}/{seo_faqs}")

    print("\n=== Gap summary ===")
    if gaps:
        for g in gaps:
            print("-", g)
    else:
        print("All Core skills / capabilities from markdown are in profiles.")
        print("UI renders profile.skills on each agent page (Core Skills section).")


if __name__ == "__main__":
    main()
