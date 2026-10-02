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

/** Screenshot-style fact row used when personality copy is still draft. */
const DEFAULT_FACTS: PortfolioFact[] = [
  { icon: "soccer", label: "Huge soccer fan" },
  { icon: "food", label: "Favorite food: Sushi" },
  { icon: "travel", label: "Loves to travel — New cities, new food" },
  { icon: "coffee", label: "Coffee — Always" },
  { icon: "camera", label: "Enjoys photography" },
  { icon: "music", label: "Loves music and podcasts" },
];

const CARD_TONES: Array<PortfolioCard["tone"]> = ["blue", "rose", "navy"];
const CARD_CTAS = ["BOOK NOW", "SHOP NOW", "Get a Free Estimate"] as const;

/** First name for section titles like "Facts About Lee". */
export function agentFirstName(fullName: string) {
  return fullName.trim().split(/\s+/)[0] ?? fullName;
}

function buildFacts(profile: AgentProfile & { agent: Agent }): PortfolioFact[] {
  // Reason: screenshot layout needs exactly six icon+label facts.
  if (profile.id === "lee" || profile.draft) {
    return [
      { icon: "soccer", label: profile.personality[0] ? "Huge soccer fan" : DEFAULT_FACTS[0].label },
      { icon: "food", label: `Favorite food: ${profile.favoriteFood.replace(/ rolls$/i, "")}` },
      { icon: "travel", label: "Loves to travel — New cities, new food" },
      { icon: "coffee", label: "Coffee — Always" },
      { icon: "camera", label: "Enjoys photography" },
      { icon: "music", label: "Loves music and podcasts" },
    ];
  }

  const icons: FactIcon[] = ["soccer", "food", "travel", "coffee", "camera", "music"];
  const fromPersonality: PortfolioFact[] = profile.personality.slice(0, 3).map((label, i) => ({
    icon: icons[i]!,
    label,
  }));

  const extras: PortfolioFact[] = [
    { icon: "food", label: `Favorite food: ${profile.favoriteFood}` },
    { icon: "coffee", label: "Coffee — Always" },
    { icon: "travel", label: "Loves to travel — New cities, new food" },
    { icon: "camera", label: "Enjoys photography" },
    { icon: "music", label: "Loves music and podcasts" },
  ];

  const merged: PortfolioFact[] = [];
  for (const f of [...fromPersonality, ...extras]) {
    if (!merged.some((m) => m.label === f.label)) merged.push(f);
    if (merged.length === 6) break;
  }
  while (merged.length < 6) {
    merged.push(DEFAULT_FACTS[merged.length]!);
  }
  return merged;
}

function buildPortfolio(profile: AgentProfile & { agent: Agent }): PortfolioCard[] {
  if (profile.id === "lee") {
    return [
      {
        id: "plumber",
        title: "LOCAL PLUMBERS",
        subtitle: "Search + Local Services ads with call-first creative.",
        cta: "BOOK NOW",
        tone: "blue",
        image:
          "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "skincare",
        title: "Reveal Your Natural Glow",
        subtitle: "Meta carousel for a DTC beauty launch week.",
        cta: "BOOK NOW",
        tone: "rose",
        image:
          "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "home",
        title: "Protect Your Home All Year",
        subtitle: "YouTube + Google demand gen for home services.",
        cta: "Get a Free Estimate",
        tone: "navy",
        image:
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
      },
    ];
  }

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
      title: "LOCAL SERVICES",
      subtitle: "Search + call-first creative for service businesses.",
      cta: "BOOK NOW",
      tone: "blue",
    },
    {
      id: "sample-b",
      title: "NATURAL GLOW",
      subtitle: "Meta carousel for a DTC launch week.",
      cta: "SHOP NOW",
      tone: "rose",
    },
    {
      id: "sample-c",
      title: "PROTECT YOUR HOME",
      subtitle: "YouTube + demand gen for a security brand.",
      cta: "Get a Free Estimate",
      tone: "navy",
    },
  ];

  const portfolio = fromWork.length > 0 ? fromWork : fallback;
  while (portfolio.length < 3) {
    const i = portfolio.length;
    portfolio.push(fallback[i]!);
  }
  return portfolio.slice(0, 3);
}

/** Filler portfolio content derived from each agent profile until real assets arrive. */
export function getPortfolioFillers(profile: AgentProfile & { agent: Agent }) {
  const { agent } = profile;
  const first = agentFirstName(agent.name);

  const skills: PortfolioSkill[] =
    SKILLS_BY_GROUP[agent.group] ?? ["Collaboration", "Clarity", "Owner approvals", "Fast drafts"];

  const steps: GetStartedStep[] = [
    {
      title: `Tell ${first} about your business`,
      detail: "Share your goals, target audience, and what success looks like.",
    },
    {
      title: `${first} builds your strategy`,
      detail: "A custom plan with targeting, creative direction, and budget guardrails.",
    },
    {
      title: "Campaigns go live",
      detail: "Launch, optimize, and report — with your approval on spend and publish.",
    },
  ];

  const heroBlurb =
    profile.id === "lee"
      ? "I plan, create, and manage high-performing ad campaigns across Google, Meta, LinkedIn, and YouTube — so you get more leads without wasting spend."
      : profile.bio ||
        `${agent.name} is your AI ${agent.title} on the LeadsFlow180 floor — ready to help with ${agent.skill.toLowerCase()}`;

  const aboutParagraphs =
    profile.id === "lee"
      ? [
          "Lee is passionate about helping small businesses compete with bigger brands through smarter paid media. Every campaign is built for clarity, ROAS, and owner approval before spend goes live.",
          "When he is off the board you will find soccer on the shelf, a sci-fi stack nearby, and a mug that still says Good Ads Better People. Favorite food: sushi.",
        ]
      : [
          profile.bio,
          `Outside the board, ${first} keeps the floor human — ${profile.personality.slice(0, 2).join(", ").toLowerCase()}. Favorite food: ${profile.favoriteFood}.`,
        ].filter(Boolean);

  const defaultFaqs: PortfolioFaq[] = [
    {
      q: `What types of ads does ${first} manage?`,
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

  return {
    firstName: first,
    displayName: agent.id === "lee" ? "Lee Park" : agent.name,
    roleLabel: agent.id === "lee" ? "Paid Media Specialist" : agent.title,
    facts: buildFacts(profile),
    portfolio: buildPortfolio(profile),
    skills,
    steps,
    heroBlurb,
    aboutParagraphs,
    faqs: profile.faqs.length >= 3 ? profile.faqs : defaultFaqs,
  };
}
