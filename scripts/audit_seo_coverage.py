"""Audit SEO pack vs agentProfiles + report gaps."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SEO = ROOT / "docs" / "LeadsFlow180_Team_Profiles_SEO_AEO_Content.md"
PROFILES = ROOT / "src" / "lib" / "agentProfiles.ts"

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


def main() -> None:
    seo = SEO.read_text(encoding="utf-8")
    profiles = PROFILES.read_text(encoding="utf-8")
    chunks = re.split(r"\n(?=# \d+\. )", seo)
    print("=== SEO pack inventory ===")
    for chunk in chunks:
        m = re.match(r"# \d+\. (.+?) — (.+)\n", chunk)
        if not m:
            continue
        name = m.group(1)
        aid = next((v for k, v in NAME_TO_ID.items() if k in name), None)
        if not aid:
            print("UNMAPPED", name)
            continue
        facts = re.search(r"\*\*Facts about [^:]+:\*\*\s*(.+)", chunk)
        skills = re.search(r"\*\*Core skills:\*\*\s*(.+)", chunk)
        faqs = len(re.findall(r"^- \*\*", chunk, re.M))
        port = len(re.findall(r"^\d+\.\s+\*\*", chunk, re.M))
        gsteps = len(re.findall(r"^\d+\.\s+", chunk, re.M)) - port  # rough
        guide = re.search(r"\*\*Free quick guide:\*\*\s*\*(.+?)\*", chunk)
        cta = re.search(r"\*\*CTA:\*\*\s*(.+)", chunk)
        hero = re.search(r"\*\*Hero headline:\*\*\s*(.+)", chunk)
        intro = re.search(r"\*\*Intro:\*\*\s*(.+)", chunk)
        about = re.search(r"\*\*About [^:]+:\*\*\s*(.+)", chunk)
        started = re.search(r"\*\*How to get started:\*\*\s*(.+)", chunk)
        dl = re.search(r"\*\*Download CTA:\*\*\s*(.+)", chunk)
        # profile block
        pb = re.search(rf"  {aid}: \{{([\s\S]*?)\n  \}},", profiles)
        if not pb:
            print(aid, "MISSING PROFILE BLOCK")
            continue
        b = pb.group(1)
        p_faqs = len(re.findall(r"\bq: ", b))
        p_work = len(re.findall(r"\bid: \"p", b))
        p_skills = len(re.findall(r"^\s+\"[^\"]+\",?$", re.search(r"skills: \[([\s\S]*?)\]", b).group(1), re.M)) if "skills:" in b else 0
        p_pers = len(re.findall(r"^\s+\"[^\"]+\",?$", re.search(r"personality: \[([\s\S]*?)\]", b).group(1), re.M)) if "personality:" in b else 0
        p_gsteps = len(re.findall(r"^\s+\"[^\"]+\",?$", re.search(r"steps: \[([\s\S]*?)\]", b).group(1), re.M)) if re.search(r"guide: \{[\s\S]*?steps:", b) else 0
        gaps = []
        if not re.search(r'tagline: "[^"]+"', b):
            gaps.append("tagline")
        if not re.search(r'intro: "[^"]+"', b):
            gaps.append("intro")
        if not re.search(r'bio: "[^"]+"', b):
            gaps.append("bio")
        if p_faqs < faqs:
            gaps.append(f"faqs {p_faqs}/{faqs}")
        if p_work < 3:
            gaps.append(f"work {p_work}")
        if p_skills < 3:
            gaps.append(f"skills {p_skills}")
        if p_gsteps < 3:
            gaps.append(f"guideSteps {p_gsteps}")
        if not re.search(r'downloadCta: "[^"]+"', b):
            gaps.append("download")
        seo_facts_n = len(re.split(r"\s*[·•]\s*", facts.group(1))) if facts else 0
        print(
            f"{aid:8} faqs={p_faqs}/{faqs} work={p_work} skills={p_skills} facts={p_pers}/{seo_facts_n} "
            f"guide={p_gsteps} cta={bool(cta)} hero={bool(hero)} intro={bool(intro)} about={bool(about)} "
            f"started={bool(started)} dl={bool(dl)} guideTitle={bool(guide)} "
            f"{'GAPS '+','.join(gaps) if gaps else 'OK'}"
        )

    print("\n=== UI usage notes (manual) ===")
    print("- Hero headline (tagline): must appear on page, not only intro")
    print("- Portfolio CTAs should say Sample concept")
    print("- FAQPage JSON-LD when FAQs visible")
    print("- Guide download CTA as button (no fake href)")
    print("- Office cues for rich stills should remain in facts/about")


if __name__ == "__main__":
    main()
