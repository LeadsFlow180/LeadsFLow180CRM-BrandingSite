"""Parse SEO content pack and rewrite agentProfiles + site names/titles."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(r"C:\Users\PMLS\OneDrive - Higher Education Commission\Desktop\LeadsFlow180\LeadsFLow180CRM-BrandingSite")
SEO = ROOT / "docs" / "LeadsFlow180_Team_Profiles_SEO_AEO_Content.md"
PROFILES = ROOT / "src" / "lib" / "agentProfiles.ts"
SITE = ROOT / "src" / "lib" / "site.ts"

# Heading name fragment -> agent id
NAME_TO_ID = {
    "Mia Carter": "mia",
    "Danica Bato": "danica",
    "Mark Bennett": "mark",
    'Johana "JoJo" Alvarez': "jojo",
    "Johana “JoJo” Alvarez": "jojo",
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
    "Dante' Price": "dante",
    "Dante’ Price": "dante",
    "Niki Kalogerakis": "niki",
}

DISPLAY_NAMES = {
    "mia": "Mia Carter",
    "danica": "Danica Bato",
    "mark": "Mark Bennett",
    "jojo": "JoJo Alvarez",
    "jordan": "Jordan Brooks",
    "sonja": "Sonja Williams",
    "amir": "Amir Rahman",
    "jay": "Jay Collins",
    "zenda": "Zenda Okafor",
    "caleb": "Caleb Whitaker",
    "adam": "Adam Mitchell",
    "leila": "Leila Patel",
    "ali": "Ali Khan",
    "carlos": "Carlos Rivera",
    "omar": "Omar Haddad",
    "nova": "Nova Chen",
    "shelly": "Shelly Allen",
    "lee": "Lee Park",
    "ava": "Ava Morgan",
    "dante": "Dante' Price",
    "niki": "Niki Kalogerakis",
}

# Keep office-cue personality extras for agents with rich office stills (merged, not skipped).
OFFICE_EXTRA = {
    "adam": [
        "Mug motto: Better Processes Brighter People",
        "People Process Progress on the wall",
        "Desk stack: Operational Excellence, The Toyota Way, Process Mapping, Good to Great",
        "Operations whiteboard: Plan → Improve → Execute → Measure",
        "Goals on glass: Simplify, Standardize, Scale, People First",
    ],
    "ali": [
        "Whiteboard: Build Smarter Together — Scalable, Reliable, Human-Centered, Big Opportunities",
        "Sci-fi stack: Dune, Project Hail Mary, The Expanse",
        "Family photo on the desk",
        "People Process Progress on the wall",
    ],
    "ava": [
        "Mug motto: Good Stories Drive Growth",
        "Media & PR board: Pitch / In Progress / Placed",
        "Board quote: Bigger Stories Brighter People",
        "Tennis racket and MEDIA badge on the shelf",
    ],
    "carlos": [
        "Mug motto: Good Sites Build Business",
        "Build Optimize Grow on the wall",
        "WordPress dashboard on the monitor",
        "Dominoes box on the desk",
    ],
    "dante": [
        "Financial Overview dashboard on the monitor",
        "People Process Progress on the wall",
        "Side table: A Brighter Financial Future",
    ],
    "nova": [
        "AI Automation board: Data → LLM → Agents → Tools / Workflows / Outcomes",
        "Shelf sign: Build Automate Scale",
        "Katana and anime art on the shelf",
        "Desk stack: Clean Architecture, Designing LLM Systems, AI Automation Playbook",
    ],
    "shelly": [
        "Mug motto: Good Strategy Better Days",
        "People Develop People on the wall",
        "Board note: More Opportunities for More People",
        "Tote: Stronger People Brighter Tomorrows",
    ],
    "lee": [
        "Soccer on the shelf after work",
        "Mug motto: Good Ads Better People",
        "Sci-fi stack: Dune, The Martian, Project Hail Mary",
    ],
    "jojo": [
        "Desk stack: Atomic Habits, Dare to Lead, Big Magic, The Midnight Library",
        "Mug motto: Good Copy Brighter Days",
    ],
    "danica": [
        "Desk sign: Progress People Possibilities",
        "Wall print: A Calmer More Productive You",
        "Corkboard: Good Food Brighter Days",
        "Atomic Habits on the shelf",
    ],
    "niki": [
        "Mug motto: Good Frames Brighter Days",
        "Video timeline on the monitor",
        "Volleyball and camera on the cabinet",
        "Cooking book on the desk",
    ],
    "jay": [
        "Q3 Email Campaigns board: Welcome Series, Customer Spotlight, and more",
        "Desk stack: Email Strategy, Audience Growth, Small Business Big Opportunities",
        "Golf bag in the corner",
        "Board note: Build relationships. Create opportunities. Repeat.",
    ],
    "jordan": [
        "Sales Pipeline board on the monitor",
        "Q4 Sales Pipeline whiteboard",
        "Tumbler: Better Conversations Bigger Opportunities",
        "Shelf stack: The Mamba Mentality, Shoe Dog, Atomic Habits",
        "Board quote: Discipline Creates Opportunity",
    ],
    "caleb": [
        "Search Strategy board: Content, Authority, Visibility → Growth",
        "Mug motto: Good Search Better Business",
        "Poster: SEARCH / AI VISIBILITY / REAL GROWTH",
        "People Process Progress pen cup",
        "Guitar beside the desk",
        "Sci-fi stack: Dune, Project Hail Mary, The Expanse",
    ],
    "leila": [
        "Fabric swatches and sketchbook on the desk",
        "Desk stack: The Art of Everyday Things, Creative Spaces",
        "Architectural prints on the wall",
    ],
    "amir": [
        "Operations Overview dashboard on the monitor",
        "Whiteboard: Operations KPIs + Create Lead → Qualify → Process → Report",
        "Pen cup: Good Data Better People",
        "Systems People Progress on the wall",
        "Desk stack: Measure What Matters, The Lean Startup, Atomic Habits",
    ],
}


def split_bullets(s: str) -> list[str]:
    parts = [p.strip(" ·•-\t") for p in re.split(r"\s*[·•]\s*|\s*;\s*", s) if p.strip(" ·•-\t")]
    return [p for p in parts if p]


def clean_text(s: str) -> str:
    # Reason: SEO md uses curly quotes/dashes that mojibake in some shells; normalize for TS strings.
    return (
        s.replace("\u201c", '"')
        .replace("\u201d", '"')
        .replace("\u2018", "'")
        .replace("\u2019", "'")
        .replace("\u2014", "—")
        .replace("\u2013", "-")
        .replace("\ufeff", "")
        .replace("\ufffd", "'")
    )


def ts_str(s: str) -> str:
    s = clean_text(s)
    return '"' + s.replace("\\", "\\\\").replace('"', '\\"').replace("\n", " ") + '"'


def parse_seo(text: str) -> dict[str, dict]:
    # Split on "# N. Name — Role"
    chunks = re.split(r"\n(?=# \d+\. )", text)
    out: dict[str, dict] = {}
    for chunk in chunks:
        m = re.match(r"# \d+\. (.+?) — (.+)\n", chunk)
        if not m:
            continue
        full_name = m.group(1).strip()
        role_line = m.group(2).strip()
        agent_id = None
        for key, aid in NAME_TO_ID.items():
            if key in full_name or full_name in key:
                agent_id = aid
                break
        if not agent_id:
            # fuzzy
            for key, aid in NAME_TO_ID.items():
                if key.split()[0] in full_name and key.split()[-1] in full_name:
                    agent_id = aid
                    break
        if not agent_id:
            print("SKIP unmapped", full_name)
            continue

        def field(label: str) -> str:
            mm = re.search(rf"\*\*{re.escape(label)}:\*\*\s*(.+)", chunk)
            return mm.group(1).strip() if mm else ""

        specialty = field("Specialty label")
        page_title = field("Page title")
        meta = field("Meta description")
        hero = field("Hero headline")
        intro = field("Intro")
        about = field("About " + DISPLAY_NAMES[agent_id].split()[0])
        if not about:
            # About Mia / About JoJo / About Dante’
            mm = re.search(r"\*\*About [^:]+:\*\*\s*(.+)", chunk)
            about = mm.group(1).strip() if mm else ""
        facts_raw = field(f"Facts about {DISPLAY_NAMES[agent_id].split()[0]}")
        if not facts_raw:
            mm = re.search(r"\*\*Facts about [^:]+:\*\*\s*(.+)", chunk)
            facts_raw = mm.group(1).strip() if mm else ""
        skills_raw = field("Core skills")
        facts = split_bullets(facts_raw)
        skills = split_bullets(skills_raw)

        # Portfolio
        work = []
        port = re.search(r"\*\*Portfolio concepts[^*]*:\*\*\s*\n((?:.+\n)+?)(?:\n\*\*About|\n\*\*Core)", chunk)
        if port:
            for i, line in enumerate(port.group(1).strip().splitlines()):
                lm = re.match(r"\d+\.\s+\*\*(.+?)\*\*\s*[—-]\s*(.+)", line.strip())
                if lm:
                    work.append(
                        {
                            "id": f"p{i+1}",
                            "title": lm.group(1).strip(),
                            "detail": lm.group(2).strip() + " (Sample concept.)",
                        }
                    )

        # FAQs
        faqs = []
        faq_block = re.search(r"\*\*FAQs\*\*\s*\n((?:- \*\*.+\n)+)", chunk)
        if faq_block:
            for line in faq_block.group(1).strip().splitlines():
                fm = re.match(r"- \*\*(.+?)\*\*\s*(.+)", line.strip())
                if fm:
                    faqs.append({"q": fm.group(1).strip(), "a": fm.group(2).strip()})

        # How to get started
        started = field("How to get started")
        steps = []
        if started:
            parts = re.split(r"\s*\d+\)\s*", started)
            parts = [p.strip(" .") for p in parts if p.strip()]
            for p in parts[:3]:
                # Reason: SEO steps are often one sentence — keep full text as title.
                steps.append({"title": p.strip(), "detail": ""})

        # Guide — title is italic (*Title*), optional summary lines, numbered steps, Download CTA
        guide_title = ""
        guide_summary = ""
        guide_steps: list[str] = []
        download = ""
        gm = re.search(
            r"\*\*Free quick guide:\*\*\s*\*(.+?)\*\s*\n([\s\S]*?)(?:\*\*Download CTA:\*\*\s*(.+?))(?:\n|$)",
            chunk,
        )
        if gm:
            guide_title = gm.group(1).strip()
            summary_lines = []
            for line in gm.group(2).strip().splitlines():
                stripped = line.strip()
                sm = re.match(r"\d+\.\s+(.+)", stripped)
                if sm:
                    guide_steps.append(sm.group(1).strip())
                elif stripped:
                    summary_lines.append(stripped)
            guide_summary = " ".join(summary_lines).strip()
            download = (gm.group(3) or "").strip()

        ask_cta = field("CTA") or f"Ask {DISPLAY_NAMES[agent_id].split()[0]} about your business"
        cta_helper = field("CTA helper") or "Free 5-minute chat. No obligation."

        # Merge office extras into personality without duplicates
        personality = list(facts)
        for extra in OFFICE_EXTRA.get(agent_id, []):
            if extra not in personality:
                personality.append(extra)

        # favorite food heuristic
        fav = "TBD"
        for f in personality:
            if "sushi" in f.lower():
                fav = "Sushi"
            if "coffee" in f.lower() and fav == "TBD":
                fav = "Coffee"

        out[agent_id] = {
            "displayName": DISPLAY_NAMES[agent_id],
            "roleLine": role_line,
            "specialtyLabel": specialty,
            "pageTitle": page_title,
            "metaDescription": meta,
            "tagline": hero,
            "intro": intro,
            "bio": about,
            "askCta": ask_cta,
            "ctaHelper": cta_helper,
            "personality": personality,
            "favoriteFood": fav if agent_id != "lee" else "Sushi rolls",
            "skills": skills,
            "work": work,
            "faqs": faqs,
            "steps": steps,
            "guideTitle": guide_title,
            "guideSummary": guide_summary,
            "guideSteps": guide_steps,
            "downloadCta": download,
        }
    return out


def emit_profile_ts(parsed: dict[str, dict]) -> str:
    # Preserve order from site agents list roughly
    order = [
        "mia",
        "adam",
        "sonja",
        "danica",
        "jay",
        "ava",
        "mark",
        "lee",
        "zenda",
        "jojo",
        "shelly",
        "caleb",
        "leila",
        "niki",
        "jordan",
        "ali",
        "carlos",
        "omar",
        "nova",
        "amir",
        "dante",
    ]
    blocks = []
    for aid in order:
        p = parsed[aid]
        pers = ",\n".join(f"      {ts_str(x)}" for x in p["personality"])
        skills = ",\n".join(f"      {ts_str(x)}" for x in p["skills"])
        faqs = ",\n".join(
            "      {\n"
            f"        q: {ts_str(f['q'])},\n"
            f"        a: {ts_str(f['a'])},\n"
            "      }"
            for f in p["faqs"]
        )
        work = ",\n".join(
            "      {\n"
            f"        id: {ts_str(w['id'])},\n"
            f"        title: {ts_str(w['title'])},\n"
            f"        detail: {ts_str(w['detail'])},\n"
            "      }"
            for w in p["work"]
        )
        steps = ",\n".join(
            "      {\n"
            f"        title: {ts_str(s['title'])},\n"
            f"        detail: {ts_str(s['detail'])},\n"
            "      }"
            for s in p["steps"]
        )
        gsteps = ",\n".join(f"        {ts_str(s)}" for s in p["guideSteps"])
        blocks.append(
            f"""  {aid}: {{
    tagline: {ts_str(p['tagline'])},
    bio: {ts_str(p['bio'])},
    intro: {ts_str(p['intro'])},
    specialtyLabel: {ts_str(p['specialtyLabel'])},
    pageTitle: {ts_str(p['pageTitle'])},
    metaDescription: {ts_str(p['metaDescription'])},
    askCta: {ts_str(p['askCta'])},
    ctaHelper: {ts_str(p['ctaHelper'])},
    personality: [
{pers}
    ],
    favoriteFood: {ts_str(p['favoriteFood'])},
    skills: [
{skills}
    ],
    faqs: [
{faqs}
    ],
    work: [
{work}
    ],
    getStarted: [
{steps}
    ],
    guide: {{
      title: {ts_str(p['guideTitle'])},
      summary: {ts_str(p['guideSummary'])},
      steps: [
{gsteps}
      ],
      downloadCta: {ts_str(p['downloadCta'])},
    }},
  }},"""
        )
    return "\n".join(blocks)


def patch_profiles_file(profile_block: str) -> None:
    text = PROFILES.read_text(encoding="utf-8")
    # Collapse any duplicated Guide/GetStarted type blocks from prior runs
    text = re.sub(
        r"(?:export type AgentGuide = \{[\s\S]*?\n\};\n\nexport type AgentGetStarted = \{ title: string; detail: string \};\n\n)+",
        "export type AgentGuide = {\n  title: string;\n  /** Optional blurb under the guide title from the SEO pack. */\n"
        "  summary?: string;\n  steps: string[];\n  downloadCta: string;\n};\n\n"
        "export type AgentGetStarted = { title: string; detail: string };\n\n",
        text,
        count=1,
    )
    if "summary?: string;" not in text:
        text = text.replace(
            "export type AgentGuide = {\n  title: string;\n  steps: string[];",
            "export type AgentGuide = {\n  title: string;\n  /** Optional blurb under the guide title from the SEO pack. */\n"
            "  summary?: string;\n  steps: string[];",
        )
    # Ensure AgentProfile has SEO fields (idempotent)
    if "specialtyLabel?: string;" not in text:
        text = text.replace(
            "  bio: string;\n  personality: string[];",
            "  bio: string;\n"
            "  /** Hero supporting paragraph from SEO pack. */\n"
            "  intro?: string;\n"
            "  specialtyLabel?: string;\n"
            "  pageTitle?: string;\n"
            "  metaDescription?: string;\n"
            "  personality: string[];",
        )
    if "getStarted?: AgentGetStarted[];" not in text:
        text = text.replace(
            "  skills?: string[];\n  /** True when copy is draft",
            "  skills?: string[];\n"
            "  getStarted?: AgentGetStarted[];\n"
            "  guide?: AgentGuide;\n"
            "  /** True when copy is draft",
        )
    # Replace PROFILE_BY_ID body
    text = re.sub(
        r"const PROFILE_BY_ID: Record<\s*string,\s*Omit<AgentProfile, \"id\" \| \"officePhoto\" \| \"portraitPhoto\" \| \"draft\">\s*> = \{[\s\S]*?\n\};",
        "const PROFILE_BY_ID: Record<\n  string,\n  Omit<AgentProfile, \"id\" | \"officePhoto\" | \"portraitPhoto\" | \"draft\">\n> = {\n"
        + profile_block
        + "\n};",
        text,
        count=1,
    )
    # Prefer png then jpg
    text = text.replace(
        "return `/agents/offices/${agent.id}.jpg`;",
        "return `/agents/offices/${agent.id}.png`;",
    )
    text = text.replace(
        """  return [
    `/agents/offices/${id}.jpg`,
    `/agents/offices/${id}.webp`,
    `/agents/offices/${id}.png`,
    `/agents/offices/${id}.jpeg`,
  ];""",
        """  return [
    `/agents/offices/${id}.png`,
    `/agents/offices/${id}.jpg`,
    `/agents/offices/${id}.webp`,
    `/agents/offices/${id}.jpeg`,
  ];""",
    )
    # draft: false when SEO present
    text = text.replace("draft: true,", "draft: false,", 1)  # only in fallback? careful
    # Fix getAgentProfile to set draft false for PROFILE_BY_ID entries
    text = re.sub(
        r"return \{\n    id,\n    agent,\n    officePhoto: officePhotoFor\(agent\),\n    portraitPhoto: agent\.photo,\n    \.\.\.base,\n    draft: true,\n  \};",
        "return {\n    id,\n    agent,\n    officePhoto: officePhotoFor(agent),\n    portraitPhoto: agent.photo,\n    ...base,\n    draft: false,\n  };",
        text,
        count=1,
    )
    PROFILES.write_text(text, encoding="utf-8")


def patch_site(parsed: dict[str, dict]) -> None:
    text = SITE.read_text(encoding="utf-8")
    # Map specialty label to a concise title (use SEO role line after em dash from heading)
    title_map = {
        "mia": "Project Manager & AI Office Orchestrator",
        "danica": "Executive Assistant",
        "mark": "Director of Market & Prospect Intelligence",
        "jojo": "Content, Copywriting & Personalization",
        "jordan": "Director of Sales & Business Development",
        "sonja": "Community & Customer Support",
        "amir": "Operations, Reporting & KPI Management",
        "jay": "Email Marketing, Lifecycle, Deliverability & Outbound",
        "zenda": "Social Media & Community Content",
        "caleb": "Director of Search & AI Visibility",
        "adam": "Operations Process Improvement",
        "leila": "Lead Product & Visual Designer",
        "ali": "Lead Full Stack Engineer",
        "carlos": "WordPress Specialist",
        "omar": "Platform, DevOps, Infrastructure, Cloud",
        "nova": "Chief AI Architect",
        "shelly": "Director of Marketing Strategy & Growth",
        "lee": "Paid Media Specialist",
        "ava": "Director of Media",
        "dante": "Finance Director",
        "niki": "Video Designer",
    }
    for aid, name in DISPLAY_NAMES.items():
        text = re.sub(
            rf'(id: "{aid}",\s*name: ")[^"]+(")',
            rf"\g<1>{name}\2",
            text,
            count=1,
        )
        text = re.sub(
            rf'(id: "{aid}",\s*name: "[^"]+",\s*title: ")[^"]+(")',
            rf"\g<1>{title_map[aid]}\2",
            text,
            count=1,
        )
    SITE.write_text(text, encoding="utf-8")


def main() -> None:
    seo = SEO.read_text(encoding="utf-8")
    parsed = parse_seo(seo)
    missing = [k for k in DISPLAY_NAMES if k not in parsed]
    if missing:
        raise SystemExit(f"Missing agents in parse: {missing}")
    print("Parsed", len(parsed), "agents")
    block = emit_profile_ts(parsed)
    patch_profiles_file(block)
    patch_site(parsed)
    # Write JSON side-file for fillers helpers (optional) — skip
    print("Updated agentProfiles.ts and site.ts")


if __name__ == "__main__":
    main()
