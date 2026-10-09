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
  /** PDF or URL opened when the card image is clicked. */
  href?: string;
};
export type PortfolioSkill = string;
export type GetStartedStep = { title: string; detail: string };
export type PortfolioFaq = { q: string; a: string };

const FACT_ICONS: FactIcon[] = ["soccer", "food", "travel", "coffee", "camera", "music", "book", "target"];

const CARD_TONES: Array<PortfolioCard["tone"]> = ["blue", "rose", "navy", "green"];

/** Optional demo images keyed by portfolio title keywords (Lee reference stills). */
const PORTFOLIO_IMAGE_BY_HINT: Array<{ match: RegExp; image: string }> = [
  {
    match: /plumber|local plumber/i,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
  },
  {
    match: /med spa|glow|skincare|beauty/i,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80",
  },
  {
    match: /home service|retarget|protect your home/i,
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
 * Build the facts row from ALL personality cues (+ favorite food).
 * Reason: SEO pack + office markup — never drop extras just to fit six cells.
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

  if (facts.length === 0) {
    push("target", `${agentFirstName(profile.agent.name)}'s lane: ${profile.agent.title}`);
    push("book", profile.tagline);
  }

  return facts;
}

function imageForWorkTitle(title: string): string | undefined {
  return PORTFOLIO_IMAGE_BY_HINT.find((h) => h.match.test(title))?.image;
}

/** Use every SEO portfolio concept; label as Sample concept per publishing notes. */
function buildPortfolio(profile: AgentProfile & { agent: Agent }): PortfolioCard[] {
  const fromWork: PortfolioCard[] = profile.work.map((w, i) => ({
    id: w.id,
    title: w.title.toUpperCase(),
    // Reason: strip trailing sample label from detail — CTA badge carries it.
    subtitle: w.detail.replace(/\s*\(Sample concept\.\)\s*$/i, "").trim(),
    cta: w.href ? "Open sample" : "Sample concept",
    tone: CARD_TONES[i % CARD_TONES.length]!,
    image: w.image || imageForWorkTitle(w.title),
    href: w.href,
  }));

  if (fromWork.length > 0) return fromWork;

  return [
    {
      id: "sample-a",
      title: `${profile.agent.name.toUpperCase()} SAMPLE A`,
      subtitle: profile.tagline,
      cta: "Sample concept",
      tone: "blue",
    },
    {
      id: "sample-b",
      title: `${profile.agent.name.toUpperCase()} SAMPLE B`,
      subtitle: profile.intro || profile.agent.skill,
      cta: "Sample concept",
      tone: "rose",
    },
    {
      id: "sample-c",
      title: `${profile.agent.name.toUpperCase()} SAMPLE C`,
      subtitle: "Owner-approved drafts from this lane.",
      cta: "Sample concept",
      tone: "navy",
    },
  ];
}

/** Portfolio content derived from each agent profile — uses every SEO field available. */
export function getPortfolioFillers(profile: AgentProfile & { agent: Agent }) {
  const { agent } = profile;
  const first = agentFirstName(agent.name);

  const skills: PortfolioSkill[] =
    profile.skills && profile.skills.length > 0
      ? profile.skills
      : ["Collaboration", "Clarity", "Owner approvals", "Fast drafts"];

  const defaultSteps: GetStartedStep[] = [
    {
      title: `Tell ${first} about your business`,
      detail: "Share your goals, target audience, and what success looks like.",
    },
    {
      title: `${first} builds your strategy`,
      detail: "A custom plan with clear owners and next steps for this lane.",
    },
    {
      title: "You review and approve",
      detail: "Drafts move fast — spend, publish, and payments stay with you.",
    },
  ];
  const steps: GetStartedStep[] =
    profile.getStarted && profile.getStarted.length > 0 ? profile.getStarted : defaultSteps;

  const heroHeadline = profile.tagline?.trim() || "";
  const heroBlurb =
    (profile.intro && profile.intro.trim()) ||
    `${agent.name} is your AI ${agent.title} on the LeadsFlow180 floor — ready to help with ${agent.skill.toLowerCase()}`;

  // Reason: About uses full SEO bio; office cues already listed under Facts.
  const aboutParagraphs = [profile.bio].filter((p): p is string => Boolean(p && p.trim()));

  const specialtyLabel = (profile.specialtyLabel || agent.title).trim();
  const roleLabel = agent.title;
  const askCta = (profile.askCta && profile.askCta.trim()) || `Ask ${first} about your business`;
  const ctaHelper =
    (profile.ctaHelper && profile.ctaHelper.trim()) || "Free 5-minute chat. No obligation.";

  const portfolioLead =
    "Sample concepts for this lane — labeled as demonstrations until real, permissioned work replaces them.";

  const guide = profile.guide?.title
    ? {
        title: profile.guide.title,
        summary: profile.guide.summary?.trim() || "",
        steps: profile.guide.steps ?? [],
        downloadCta: profile.guide.downloadCta || `Download the free guide from ${first}`,
      }
    : null;

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
      q: "Is this a free trial of FLOW?",
      a: "No. This page offers a short verified talk. Paid access uses Launch Founders pricing on the home page.",
    },
  ];

  const faqs: PortfolioFaq[] = profile.faqs.length > 0 ? profile.faqs : defaultFaqs;

  return {
    firstName: first,
    displayName: agent.name,
    specialtyLabel,
    roleLabel,
    heroHeadline,
    askCta,
    ctaHelper,
    facts: buildFacts(profile),
    portfolio: buildPortfolio(profile),
    portfolioLead,
    skills,
    steps,
    heroBlurb,
    aboutParagraphs,
    faqs,
    guide,
  };
}
