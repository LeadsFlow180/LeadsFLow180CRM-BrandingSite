import { agents, type Agent } from "@/lib/site";

export type AgentFaq = { q: string; a: string };

export type AgentWorkSample = {
  id: string;
  title: string;
  detail: string;
};

export type AgentProfile = {
  id: string;
  /** Full-bleed office / desk scene path (may 404 until stills land — UI falls back to portrait). */
  officePhoto: string;
  portraitPhoto: string;
  tagline: string;
  bio: string;
  personality: string[];
  favoriteFood: string;
  faqs: AgentFaq[];
  work: AgentWorkSample[];
  /** True when copy is draft until the sole bio document is pasted in. */
  draft: boolean;
};

/** Role-flavored SEO + personality scaffolds. Replace when the sole bio doc arrives. */
const PROFILE_BY_ID: Record<
  string,
  Omit<AgentProfile, "id" | "officePhoto" | "portraitPhoto" | "draft">
> = {
  mia: {
    tagline: "A clear plan. A comfortable place to check in.",
    bio: "Mia is the first person you meet on the floor. She assigns work, chairs meetings, and keeps every job moving so the rest of the team can ship.",
    personality: ["Loves a tidy board", "Morning coffee before standups", "Remembers every deadline"],
    favoriteFood: "Iced oat latte and a warm croissant",
    faqs: [
      {
        q: "What does an AI Project Manager actually do?",
        a: "Mia routes requests to the right specialist, tracks status, and brings drafts back for your approval before anything goes live.",
      },
      {
        q: "How do I start work with the AI Office?",
        a: "Talk to Mia first. She opens the job, picks the lane, and keeps humans in the loop on approvals that matter.",
      },
    ],
    work: [
      { id: "kickoff", title: "Founders kickoff map", detail: "Week-one desk plan across Growth, Creative, and Ops." },
      { id: "standup", title: "Daily standup briefs", detail: "Short status packs so owners stay unblocked." },
    ],
  },
  adam: {
    tagline: "Where to focus next — on real FLOW data.",
    bio: "Adam brings Six Sigma clarity to the business. He spots bottlenecks and points the floor at the next highest-leverage move.",
    personality: ["Loves to golf on weekends", "Quiet competitor", "Whiteboard thinker"],
    favoriteFood: "Grilled steak and roasted vegetables",
    faqs: [
      {
        q: "How does process improvement help a sales team?",
        a: "Adam trims waste in the funnel — fewer handoff gaps, clearer KPIs, and focus on the steps that actually create revenue.",
      },
    ],
    work: [
      { id: "funnel", title: "Funnel friction audit", detail: "Mapped drop-offs from lead to booked call." },
      { id: "kpi", title: "Owner KPI one-pager", detail: "Readable metrics without vanity noise." },
    ],
  },
  sonja: {
    tagline: "Inbox, phone, and reviews — with a human tone.",
    bio: "Sonja keeps community and customer support warm. She handles the inbox and phone so customers feel heard.",
    personality: ["Mom of two boys", "Patient listener", "Weekend soccer sidelines"],
    favoriteFood: "Homemade lasagna",
    faqs: [
      {
        q: "Can AI handle customer support without sounding robotic?",
        a: "Sonja drafts replies in your brand voice and escalates anything that needs a human decision.",
      },
    ],
    work: [
      { id: "inbox", title: "Support inbox pack", detail: "Templates for FAQs, refunds, and review replies." },
      { id: "voice", title: "Phone greeting scripts", detail: "Short, friendly openings in multiple languages." },
    ],
  },
  danica: {
    tagline: "Calendars, bookings, and the official schedule.",
    bio: "Danica is Michelle’s executive assistant on the floor — bookings, calendars, and keeping the day on rails.",
    personality: ["Husband and two little boys at home", "Early riser", "Color-coded calendar"],
    favoriteFood: "Chicken taco salad",
    faqs: [
      {
        q: "How does an AI executive assistant help founders?",
        a: "Danica protects focus time, confirms meetings, and keeps the official schedule accurate so leadership is not buried in logistics.",
      },
    ],
    work: [
      { id: "calendar", title: "Executive week layout", detail: "Blocked focus, meetings, and follow-ups." },
      { id: "booking", title: "Booking confirmation flow", detail: "Clean confirmations with prep notes." },
    ],
  },
  jay: {
    tagline: "Nurture sequences and campaigns that land.",
    bio: "Jay owns email marketing, lifecycle, deliverability, and outbound — so the right message hits the right inbox.",
    personality: ["Subject-line tinkerer", "Metrics nerd", "Playlist for deep work"],
    favoriteFood: "Spicy ramen",
    faqs: [
      {
        q: "What makes email marketing work with AI?",
        a: "Jay builds sequences, watches deliverability, and keeps human approval on offers that touch your brand.",
      },
    ],
    work: [
      { id: "nurture", title: "Launch nurture sequence", detail: "Five-touch Founders welcome series." },
      { id: "outbound", title: "Outbound starter pack", detail: "Cold + warm templates with clear CTAs." },
    ],
  },
  ava: {
    tagline: "On-brand media, PR, and campaign copy.",
    bio: "Ava leads media communications and PR. She shapes stories that sound like you — including podcast-ready talking points.",
    personality: ["Podcast binge-listener", "Story-first thinker", "Quiet stage presence"],
    favoriteFood: "Mediterranean bowl",
    faqs: [
      {
        q: "How can AI help with podcasting and PR?",
        a: "Ava drafts show notes, guest briefs, and press angles so your media lane stays consistent without starting from a blank page.",
      },
      {
        q: "What is AI media communications?",
        a: "It is on-brand messaging across site, campaigns, and PR — drafted by Ava, approved by you before it publishes.",
      },
    ],
    work: [
      { id: "podcast", title: "Podcast episode outline", detail: "Hooks, segments, and CTA for a founder show." },
      { id: "pr", title: "PR angle sheet", detail: "Three story angles for local and trade press." },
    ],
  },
  mark: {
    tagline: "Research and prospecting so Jordan has real leads.",
    bio: "Mark digs into markets and prospects so sales is never guessing.",
    personality: ["Curious researcher", "Spreadsheet comfort", "Late-night rabbit holes"],
    favoriteFood: "BBQ brisket sandwich",
    faqs: [
      {
        q: "What is AI prospect intelligence?",
        a: "Mark finds fit signals and account context so outreach is specific, not spray-and-pray.",
      },
    ],
    work: [
      { id: "icp", title: "ICP research brief", detail: "Who buys, why now, and where they hang out." },
      { id: "list", title: "Prospect shortlist", detail: "Qualified accounts ready for Jordan." },
    ],
  },
  lee: {
    tagline: "Same audience. Bigger opportunities.",
    bio: "Lee Park runs paid media with a clear board and calm spend discipline. Google, Meta, LinkedIn, and YouTube stay on the glass — and every dollar waits for your approval.",
    personality: [
      "Soccer on the shelf after work",
      "Sci-fi stack: Dune, The Martian, Project Hail Mary",
      "Mug motto: Good Ads Better People",
    ],
    favoriteFood: "Sushi rolls",
    faqs: [
      {
        q: "What types of ads does Lee manage?",
        a: "Paid performance across Google Ads, Meta, LinkedIn, and YouTube — tracked on one performance board.",
      },
      {
        q: "How does AI paid media stay safe?",
        a: "Lee drafts campaigns and creative tests, but spend and final launches wait for your approval.",
      },
      {
        q: "How quickly can campaigns launch?",
        a: "Drafts can move same-day once goals and guardrails are clear — go-live still needs your approval.",
      },
      {
        q: "Do I need a big budget to start?",
        a: "Lee plans around the budget you set. Small tests come first; scale waits for proof and your OK.",
      },
      {
        q: "What happens after the free chat?",
        a: "Continue in AI Office with Launch Founders access — same lane, clearer handoffs across the floor.",
      },
    ],
    work: [
      { id: "plumber", title: "Local Plumber", detail: "Search + Local Services ads with call-first creative." },
      { id: "skincare", title: "Clean Skincare", detail: "Meta carousel for a DTC beauty launch week." },
      { id: "home", title: "Home Protection", detail: "YouTube + Google demand gen for a security brand." },
    ],
  },
  zenda: {
    tagline: "Drafts and schedules for social and community.",
    bio: "Zenda keeps social and community content moving — drafts, schedules, and a consistent voice.",
    personality: ["Trend scout", "Caption craftsman", "Weekend hike reset"],
    favoriteFood: "Veggie wrap",
    faqs: [
      {
        q: "Can AI manage social media content?",
        a: "Zenda drafts and schedules posts; you approve anything that represents the brand publicly.",
      },
    ],
    work: [
      { id: "calendar", title: "Two-week social calendar", detail: "Posts mapped to campaign themes." },
      { id: "hooks", title: "Hook pack", detail: "Ten scroll-stopping openers." },
    ],
  },
  jojo: {
    tagline: "Better stories build brighter businesses.",
    bio: "Johana “JoJo” Alvarez writes and personalizes content so every channel tells the same story — from landing pages to the lines that make a campaign feel human.",
    personality: [
      "Desk stack: Atomic Habits, Dare to Lead, Big Magic, The Midnight Library",
      "Mug motto: Good Copy Brighter Days",
      "Grateful for the good people — family photo on the shelf",
    ],
    favoriteFood: "Margherita pizza",
    faqs: [
      {
        q: "How does AI copywriting stay on brand?",
        a: "JoJo drafts from your voice notes and brand bank; final publishing waits for approval.",
      },
      {
        q: "What is content personalization?",
        a: "JoJo adapts the same core story for segments and channels so it still sounds like you.",
      },
    ],
    work: [
      { id: "landing", title: "Landing page draft", detail: "Hero, proof, and CTA in one pass." },
      { id: "personal", title: "Personalization snippets", detail: "Segment-aware lines for email and ads." },
    ],
  },
  shelly: {
    tagline: "Week-level campaign planning.",
    bio: "Shelly directs marketing strategy and growth — the week-level plan the floor executes.",
    personality: ["Big-picture planner", "Sticky-note walls", "Friday retros"],
    favoriteFood: "Thai green curry",
    faqs: [
      {
        q: "What does an AI marketing director plan?",
        a: "Shelly sets campaign themes, channel mix, and weekly priorities so specialists are not improvising alone.",
      },
    ],
    work: [
      { id: "week", title: "Growth week plan", detail: "Themes, owners, and success metrics." },
      { id: "offer", title: "Offer narrative", detail: "Positioning for Founders launch." },
    ],
  },
  caleb: {
    tagline: "Search and AI visibility — not a fake SEO score.",
    bio: "Caleb improves how you show up in search and AI answers with real visibility work.",
    personality: ["SERP watcher", "Technical calm", "Dark mode forever"],
    favoriteFood: "Burrito bowl",
    faqs: [
      {
        q: "How does AI help with SEO and AI visibility?",
        a: "Caleb structures pages, FAQs, and topical coverage so people — and AI systems — can find and cite you.",
      },
    ],
    work: [
      { id: "audit", title: "Visibility audit", detail: "Gaps in topics, titles, and internal links." },
      { id: "faq", title: "FAQ cluster", detail: "Questions that win featured and AI answers." },
    ],
  },
  leila: {
    tagline: "Brand graphics and slides that land in Done.",
    bio: "Leila is lead product and visual designer — brand graphics and decks ready for your approval.",
    personality: ["Color perfectionist", "Gallery hopper", "Quiet focus hours"],
    favoriteFood: "Avocado toast",
    faqs: [
      {
        q: "Can AI design brand graphics?",
        a: "Leila drafts visuals and slides into Done for approval so creative moves fast without skipping your taste.",
      },
    ],
    work: [
      { id: "deck", title: "Pitch deck visuals", detail: "Clean slides aligned to brand." },
      { id: "kit", title: "Campaign creative kit", detail: "Hero, social crops, and icons." },
    ],
  },
  niki: {
    tagline: "Brand video and motion for campaigns.",
    bio: "Niki designs video and motion so campaigns feel alive without losing the brand.",
    personality: ["Frame-by-frame patience", "Soundtrack hunter", "Golden-hour shooter"],
    favoriteFood: "Fish tacos",
    faqs: [
      {
        q: "How does AI help with brand video?",
        a: "Niki drafts motion concepts and cuts that match campaign briefs; final publish waits for approval.",
      },
    ],
    work: [
      { id: "reel", title: "Campaign reel concept", detail: "15-second hook for paid and organic." },
      { id: "motion", title: "Logo motion study", detail: "Subtle brand intro for video opens." },
    ],
  },
  jordan: {
    tagline: "First touch to close — pipeline, funnels, partners.",
    bio: "Jordan directs sales and business development: pipeline, funnels, proposals, partners, and affiliates.",
    personality: ["Relationship builder", "Follow-up discipline", "Friday pipeline review"],
    favoriteFood: "Cheeseburger and fries",
    faqs: [
      {
        q: "How does an AI sales director work with humans?",
        a: "Jordan drafts outreach, proposals, and next steps — you approve offers and close the relationship.",
      },
    ],
    work: [
      { id: "pipeline", title: "Pipeline stage map", detail: "From lead capture to signed deal." },
      { id: "proposal", title: "Proposal outline", detail: "Problem, plan, pricing, next step." },
    ],
  },
  ali: {
    tagline: "Websites and pages with Carlos.",
    bio: "Ali is lead full-stack engineer — shipping site and product pages that hold up in production.",
    personality: ["Keyboard shortcuts forever", "Clean PRs", "Late deploy snacks"],
    favoriteFood: "Shawarma plate",
    faqs: [
      {
        q: "What does AI full-stack engineering look like here?",
        a: "Ali builds and fixes pages with Carlos; changes land for review before they go live.",
      },
    ],
    work: [
      { id: "page", title: "Marketing page build", detail: "Fast, accessible section layout." },
      { id: "fix", title: "Lead form hardening", detail: "Validation and thank-you flow." },
    ],
  },
  carlos: {
    tagline: "WordPress specialist — sites that stay maintainable.",
    bio: "Carlos partners with Ali on websites and pages, especially WordPress builds that owners can still run.",
    personality: ["Plugin minimalist", "Performance checker", "Sunday site tidy"],
    favoriteFood: "Empanadas",
    faqs: [
      {
        q: "Can AI maintain a WordPress site?",
        a: "Carlos drafts updates and page builds with clear handoff notes so your site stays fast and editable.",
      },
    ],
    work: [
      { id: "theme", title: "Theme polish pass", detail: "Spacing, type, and mobile fixes." },
      { id: "landing", title: "WP landing section", detail: "Campaign block ready to publish." },
    ],
  },
  omar: {
    tagline: "Workflows that follow up while you work the next lead.",
    bio: "Omar covers platform, DevOps, infrastructure, and cloud — the pipes that keep automation reliable.",
    personality: ["Uptime pride", "Runbook writer", "Night-owl deploys"],
    favoriteFood: "Chicken biryani",
    faqs: [
      {
        q: "How does AI DevOps help a small team?",
        a: "Omar keeps workflows, hosting, and follow-ups stable so marketing and sales tools do not fall over mid-campaign.",
      },
    ],
    work: [
      { id: "flow", title: "Follow-up automation", detail: "Trigger → wait → nudge, with guards." },
      { id: "health", title: "Infra health checklist", detail: "What to watch before a launch." },
    ],
  },
  nova: {
    tagline: "Research and assessments that feed the team.",
    bio: "Nova is Chief AI Architect — systems and automation that feed research into the rest of the floor.",
    personality: ["Systems thinker", "Experiment log", "Quiet intensity"],
    favoriteFood: "Miso soup and rice",
    faqs: [
      {
        q: "What does a Chief AI Architect do in an AI office?",
        a: "Nova designs how agents share context and tools so work compounds instead of restarting every chat.",
      },
    ],
    work: [
      { id: "map", title: "Agent workflow map", detail: "Who hands off to whom, and when." },
      { id: "eval", title: "Quality assessment", detail: "Checks before drafts hit Done." },
    ],
  },
  amir: {
    tagline: "Pipeline health and readable KPIs.",
    bio: "Amir owns operations, reporting, and KPI management — numbers founders can actually use.",
    personality: ["Dashboard gardener", "Precision over flash", "Morning metrics scan"],
    favoriteFood: "Falafel plate",
    faqs: [
      {
        q: "What KPIs should a lead-gen team watch?",
        a: "Amir focuses on pipeline health, conversion by stage, and capacity — not vanity charts.",
      },
    ],
    work: [
      { id: "dash", title: "Ops dashboard sketch", detail: "Weekly owner view of pipeline health." },
      { id: "report", title: "KPI narrative", detail: "What moved, why, and what to do." },
    ],
  },
  dante: {
    tagline: "Finance books as drafts. You issue and pay.",
    bio: "Dante is Finance Director — drafts the books and strategy notes. The owner issues and pays. No bank logins.",
    personality: ["Numbers calm", "Never rushes a close", "Weekend markets walk"],
    favoriteFood: "Seared salmon",
    faqs: [
      {
        q: "How can AI help with finance safely?",
        a: "Dante prepares drafts and forecasts; banking credentials stay with you, and you approve anything that moves money.",
      },
    ],
    work: [
      { id: "forecast", title: "Cash forecast draft", detail: "Simple forward look for owners." },
      { id: "books", title: "Monthly books checklist", detail: "What to review before close." },
    ],
  },
};

function officePhotoFor(agent: Agent): string {
  // Reason: walkthrough desk stills ship as webp; fall back to jpg/png doorway shots.
  return `/agents/offices/${agent.id}.webp`;
}

/** Resolve office still URL for the hero (webp desk stills first). */
export function officePhotoCandidates(id: string): string[] {
  return [
    `/agents/offices/${id}.webp`,
    `/agents/offices/${id}.jpg`,
    `/agents/offices/${id}.png`,
    `/agents/offices/${id}.jpeg`,
  ];
}

export function getAgentProfile(id: string): (AgentProfile & { agent: Agent }) | null {
  const agent = agents.find((a) => a.id === id);
  if (!agent) return null;
  const base = PROFILE_BY_ID[id];
  if (!base) {
    return {
      id,
      agent,
      officePhoto: officePhotoFor(agent),
      portraitPhoto: agent.photo,
      tagline: agent.skill,
      bio: agent.skill,
      personality: ["Part of the AI Office floor"],
      favoriteFood: "TBD",
      faqs: [],
      work: [],
      draft: true,
    };
  }
  return {
    id,
    agent,
    officePhoto: officePhotoFor(agent),
    portraitPhoto: agent.photo,
    ...base,
    draft: true,
  };
}

export function getAllAgentProfiles() {
  return agents.map((a) => getAgentProfile(a.id)!);
}

export function agentPagePath(id: string) {
  return `/agents/${id}`;
}
