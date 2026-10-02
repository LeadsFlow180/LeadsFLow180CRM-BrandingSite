import type { AgentProfile } from "@/lib/agentProfiles";
import type { Agent } from "@/lib/site";

export type FactIcon = "soccer" | "food" | "travel" | "coffee" | "camera" | "music" | "book" | "target";
export type PortfolioFact = { icon: FactIcon; label: string };
export type PortfolioCard = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  tone: "blue" | "green" | "navy" | "rose";
  /** Optional filler photo URL for polaroid-style ads. */
  image?: string;
};
export type PortfolioSkill = string;
export type GetStartedStep = { title: string; detail: string };
export type PortfolioFaq = { q: string; a: string };

/** Role-specific skills when available — otherwise fall back to group skills. */
const SKILLS_BY_ID: Record<string, string[]> = {
  lee: [
    "Google Ads",
    "Meta Ads",
    "YouTube Ads",
    "LinkedIn Ads",
    "Ad Strategy & Planning",
    "Audience Targeting",
    "Campaign Management",
    "Creative Development",
    "Conversion Tracking",
    "Analytics & Reporting",
    "Budget Optimization",
  ],
  ava: [
    "Media pitching",
    "PR angle development",
    "Podcast outlines",
    "Press kit drafts",
    "Talking points",
    "Campaign messaging",
    "Placement tracking",
    "Brand voice for media",
  ],
  adam: [
    "Process mapping",
    "Funnel friction audits",
    "KPI design",
    "Operating loops",
    "Standard work",
    "Handoff redesign",
    "Owner briefings",
    "Continuous improvement",
  ],
  shelly: [
    "Week-level growth plans",
    "Brand awareness",
    "Thought leadership",
    "Demand generation",
    "Strategic partnerships",
    "Community growth",
    "Offer narrative",
    "Channel mix",
  ],
  ali: [
    "Full-stack delivery",
    "Marketing page builds",
    "Lead form hardening",
    "Accessibility basics",
    "Performance checks",
    "Production hygiene",
    "Partner handoffs with Carlos",
    "Human-centered UX",
  ],
  carlos: [
    "WordPress builds",
    "Theme polish",
    "Landing sections",
    "Owner handoff notes",
    "Plugin minimalism",
    "Mobile fixes",
    "Maintainable updates",
    "Performance pass",
  ],
  nova: [
    "AI architecture",
    "Agent workflow maps",
    "LLM system design",
    "Tooling & integrations",
    "Automation playbooks",
    "Quality evaluations",
    "Context sharing across agents",
    "Owner-safe change plans",
  ],
  dante: [
    "Cash forecasts",
    "Books checklists",
    "Financial overviews",
    "Owner-ready narratives",
    "Budget guardrails",
    "Close prep",
    "CFO-style strategy notes",
    "Zero bank-login policy",
  ],
};

const SKILLS_BY_GROUP: Record<string, string[]> = {
  "Leadership & Executive Operations": [
    "Meeting facilitation",
    "Priority routing",
    "Owner briefings",
    "Approval workflows",
    "KPI rollups",
    "Cross-team handoffs",
    "Agenda design",
    "Status reporting",
  ],
  "Growth & Client Success": [
    "Google Ads",
    "Meta Ads",
    "YouTube Ads",
    "LinkedIn Ads",
    "Ad Strategy & Planning",
    "Audience Targeting",
    "Campaign Management",
    "Creative Development",
    "Conversion Tracking",
    "Analytics & Reporting",
    "Budget Optimization",
  ],
  "Creative & Content": [
    "Brand systems",
    "Pitch decks",
    "Social crops",
    "Motion concepts",
    "Landing copy",
    "Campaign kits",
    "Storyboards",
    "Asset systems",
  ],
  "Engineering & Automation": [
    "WordPress builds",
    "CRM workflows",
    "Automations",
    "Integrations",
    "QA checklists",
    "Deploy hygiene",
    "API wiring",
    "Monitoring",
  ],
};

const FACT_ICONS: FactIcon[] = ["soccer", "food", "travel", "coffee", "camera", "music", "book", "target"];

const CARD_TONES: Array<PortfolioCard["tone"]> = ["blue", "rose", "navy", "green"];
const CARD_CTAS = ["BOOK NOW", "SHOP NOW", "Get a Free Estimate", "LEARN MORE"] as const;

const LEE_PORTFOLIO: PortfolioCard[] = [
  {
    id: "plumber",
    title: "LOCAL PLUMBERS",
    subtitle: "Search + Local Services ads with call-first creative.",
    cta: "BOOK NOW",
    tone: "blue",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "skincare",
    title: "Reveal Your Natural Glow",
    subtitle: "Meta carousel for a DTC beauty launch week.",
    cta: "BOOK NOW",
    tone: "rose",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "home",
    title: "Protect Your Home All Year",
    subtitle: "YouTube + Google demand gen for home services.",
    cta: "Get a Free Estimate",
    tone: "navy",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
  },
];

/** First name for section titles like "Facts About Lee". */
export function agentFirstName(fullName: string) {
  const cleaned = fullName.trim().replace(/^["“]|["”]$/g, "");
  // Reason: Dante' Price → Dante'; JoJo stays JoJo.
  if (cleaned.toLowerCase().startsWith("dante")) return "Dante";
  return cleaned.split(/\s+/)[0] ?? cleaned;
}

function iconForLabel(label: string, index: number): FactIcon {
  const l = label.toLowerCase();
  if (/soccer|ball|sport|tennis|racket/.test(l)) return "soccer";
  if (/food|sushi|steak|ramen|pizza|bowl|wrap|salad|salmon|shawarma|empanada|curry|croissant|latte|miso|falafel/.test(l))
    return "food";
  if (/travel|dubai|london|eiffel|skyline|globe|cities/.test(l)) return "travel";
  if (/coffee|mug|tumbler|bottle/.test(l)) return "coffee";
  if (/photo|camera|monitor|dashboard|whiteboard|board|poster/.test(l)) return "camera";
  if (/music|podcast|mic|playlist|controller|game/.test(l)) return "music";
  if (/book|stack|architecture|finance|dune|habit|lead|playbook/.test(l)) return "book";
  return FACT_ICONS[index % FACT_ICONS.length]!;
}

/**
 * Build the facts row from ALL available personality + favorite food.
 * Shows up to 6 (screenshot layout); never invents fake facts when real ones exist.
 */
function buildFacts(profile: AgentProfile & { agent: Agent }): PortfolioFact[] {
  const facts: PortfolioFact[] = [];
  const seen = new Set<string>();

  const push = (icon: FactIcon, label: string) => {
    const key = label.trim().toLowerCase();
    if (!key || seen.has(key)) return;
    seen.add(key);
    facts.push({ icon, label: label.trim() });
  };

  profile.personality.forEach((label, i) => push(iconForLabel(label, i), label));
  if (profile.favoriteFood && profile.favoriteFood !== "TBD") {
    push("food", `Favorite food: ${profile.favoriteFood}`);
  }

  // Reason: layout expects six cells; only pad when we truly lack copy.
  let i = 0;
  while (facts.length < 6) {
    const pad = [
      { icon: "target" as const, label: `${agentFirstName(profile.agent.name)}'s lane: ${profile.agent.title}` },
      { icon: "book" as const, label: profile.tagline },
      { icon: "coffee" as const, label: "Always learning on the floor" },
    ];
    const next = pad[i % pad.length]!;
    push(next.icon, next.label);
    i += 1;
    if (i > 10) break;
  }

  return facts.slice(0, 6);
}

/** Use every work sample; pad to 3 only if short. Lee keeps screenshot ad creatives. */
function buildPortfolio(profile: AgentProfile & { agent: Agent }): PortfolioCard[] {
  if (profile.id === "lee") return LEE_PORTFOLIO;

  const fromWork: PortfolioCard[] = profile.work.map((w, i) => ({
    id: w.id,
    title: w.title.toUpperCase(),
    subtitle: w.detail,
    cta: CARD_CTAS[i % CARD_CTAS.length]!,
    tone: CARD_TONES[i % CARD_TONES.length]!,
  }));

  const fallback: PortfolioCard[] = [
    {
      id: "sample-a",
      title: `${profile.agent.name.toUpperCase()} SAMPLE A`,
      subtitle: profile.tagline,
      cta: "LEARN MORE",
      tone: "blue",
    },
    {
      id: "sample-b",
      title: `${profile.agent.name.toUpperCase()} SAMPLE B`,
      subtitle: profile.agent.skill,
      cta: "LEARN MORE",
      tone: "rose",
    },
    {
      id: "sample-c",
      title: `${profile.agent.name.toUpperCase()} SAMPLE C`,
      subtitle: "Owner-approved drafts from this lane.",
      cta: "LEARN MORE",
      tone: "navy",
    },
  ];

  const portfolio = fromWork.length > 0 ? [...fromWork] : [...fallback];
  while (portfolio.length < 3) {
    portfolio.push(fallback[portfolio.length]!);
  }
  // Reason: show all real work samples (not capped at 3 when more exist).
  return portfolio;
}

/** Filler portfolio content derived from each agent profile — uses every field available. */
export function getPortfolioFillers(profile: AgentProfile & { agent: Agent }) {
  const { agent } = profile;
  const first = agentFirstName(agent.name);

  const skills: PortfolioSkill[] =
    SKILLS_BY_ID[agent.id] ?? SKILLS_BY_GROUP[agent.group] ?? ["Collaboration", "Clarity", "Owner approvals", "Fast drafts"];

  const steps: GetStartedStep[] = [
    {
      title: `Tell ${first} about your business`,
      detail: "Share your goals, target audience, and what success looks like.",
    },
    {
      title: `${first} builds your strategy`,
      detail: "A custom plan with targeting, creative direction, and clear guardrails for this lane.",
    },
    {
      title: "Work goes live with your OK",
      detail: "Drafts move fast — spend, publish, and payments stay with you.",
    },
  ];

  const heroBlurb =
    profile.id === "lee"
      ? "I plan, create, and manage high-performing ad campaigns across Google, Meta, LinkedIn, and YouTube — so you get more leads without wasting spend."
      : [profile.tagline, profile.bio].filter(Boolean).join(" ") ||
        `${agent.name} is your AI ${agent.title} on the LeadsFlow180 floor — ready to help with ${agent.skill.toLowerCase()}`;

  // Reason: about uses the full bio plus every personality cue + favorite food — nothing skipped.
  const aboutParagraphs =
    profile.id === "lee"
      ? [
          "Lee is passionate about helping small businesses compete with bigger brands through smarter paid media. Every campaign is built for clarity, ROAS, and owner approval before spend goes live.",
          "When he is off the board you will find soccer on the shelf, a sci-fi stack nearby, and a mug that still says Good Ads Better People. Favorite food: sushi.",
        ]
      : [
          profile.bio,
          profile.personality.length > 0
            ? `Around the office: ${profile.personality.join(". ")}.`
            : null,
          profile.favoriteFood && profile.favoriteFood !== "TBD"
            ? `Favorite food: ${profile.favoriteFood}.`
            : null,
          agent.skill ? `Lane focus: ${agent.skill}` : null,
        ].filter((p): p is string => Boolean(p));

  const defaultFaqs: PortfolioFaq[] = [
    {
      q: `What does ${first} handle?`,
      a: `${agent.name} drafts in the ${agent.title} lane — ${agent.skill}`,
    },
    {
      q: `How does ${first} stay safe with spend and publishing?`,
      a: "Drafts and recommendations come fast; spend, publish, and payments wait for your approval.",
    },
    {
      q: `How quickly can work launch with ${first}?`,
      a: "Drafts can move same-day once goals are clear — go-live still needs your approval.",
    },
    {
      q: "Is this a free trial of AI Office?",
      a: "No. This page offers a short verified talk. Paid access uses Launch Founders pricing on the home page.",
    },
    {
      q: "What happens after the chat?",
      a: "You can open AI Office to keep working with the full team — same lane, clearer handoffs.",
    },
  ];

  // Reason: never drop profile FAQs — use all of them; only fall back when empty.
  const faqs: PortfolioFaq[] = profile.faqs.length > 0 ? profile.faqs : defaultFaqs;

  return {
    firstName: first,
    displayName: agent.name,
    roleLabel: agent.title,
    facts: buildFacts(profile),
    portfolio: buildPortfolio(profile),
    skills,
    steps,
    heroBlurb,
    aboutParagraphs,
    faqs,
  };
}
