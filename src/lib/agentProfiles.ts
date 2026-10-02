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
  /** Core skills from office markup / sole bio — used on portfolio when present. */
  skills?: string[];
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
    tagline: "Better processes. Brighter people.",
    bio: "Adam Mitchell leads Operations Process Improvement on the LeadsFlow180 floor. His glass board runs Plan → Improve → Execute → Measure, with Simplify, Standardize, Scale, and People First underneath. He spots bottlenecks on real FLOW data and points the team at the next highest-leverage move — always with owner approval on the changes that matter.",
    personality: [
      "Mug motto: Better Processes Brighter People",
      "People Process Progress on the wall",
      "Desk stack: Operational Excellence, The Toyota Way, Process Mapping, Good to Great",
      "Shelf: A Stronger Smaller Business, Built to Last",
      "Operations whiteboard: Plan → Improve → Execute → Measure",
      "Goals on glass: Simplify, Standardize, Scale, People First",
      "Globe and plant on the bookshelf",
    ],
    favoriteFood: "Grilled steak and roasted vegetables",
    faqs: [
      {
        q: "What does Operations Process Improvement cover?",
        a: "Adam maps how work actually flows — handoffs, bottlenecks, and wasted steps — then drafts a clearer path for owners to approve.",
      },
      {
        q: "How does process improvement help a sales team?",
        a: "He trims funnel friction: fewer handoff gaps, clearer KPIs, and focus on the steps that create revenue.",
      },
      {
        q: "What is Plan → Improve → Execute → Measure?",
        a: "Adam’s operating loop on the Operations board — diagnose, redesign, run the change, then prove it with numbers before you scale.",
      },
      {
        q: "Do process changes go live without me?",
        a: "No. Adam drafts the map and recommendations; you approve anything that changes how the business runs.",
      },
      {
        q: "What books shape Adam’s approach?",
        a: "His desk stack includes Operational Excellence, The Toyota Way, Process Mapping, and Good to Great — practical ops, not vanity theory.",
      },
    ],
    work: [
      { id: "funnel", title: "Funnel friction audit", detail: "Mapped drop-offs from lead to booked call with clear next fixes." },
      { id: "kpi", title: "Owner KPI one-pager", detail: "Readable metrics without vanity noise." },
      { id: "loop", title: "Plan-Improve-Execute-Measure pack", detail: "A one-page operating loop for the week’s highest-leverage change." },
    ],
    skills: [
      "Operations Process Improvement",
      "Process mapping",
      "Plan → Improve → Execute → Measure",
      "Simplify / Standardize / Scale",
      "People First operating design",
      "Funnel friction audits",
      "KPI design",
      "Lean / Toyota Way methods",
      "Operational Excellence",
      "Owner briefings",
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
    tagline: "Bigger stories. Brighter people.",
    bio: "Ava Morgan is Director of Media on the LeadsFlow180 floor. She runs a Media & PR board — Pitch, In Progress, Placed — and shapes stories that sound like you: press angles, podcast talking points, and campaign copy. Media Creates Opportunity is on the wall; Good Stories Drive Growth sits on the desk. Drafts move fast; publishing waits for your approval.",
    personality: [
      "Mug motto: Good Stories Drive Growth",
      "Media Creates Opportunity on the wall",
      "STRATEGY FOCUS GROWTH IMPACT poster",
      "PEOPLE STORIES BRANDS IMPACT on the shelf",
      "Board quote: Bigger Stories, Brighter People",
      "Media & PR — Pitch: Forbes AI in SMB, Inc. Growth Series, Entrepreneur Founder Story",
      "Media & PR — In Progress: Fast Company Lead Gen, CNBC SMB Tools, Spotify Podcast",
      "Media & PR — Placed: Business Insider Q2, Yahoo Finance Expert Quote, Local NBC Segment",
      "Desk stack: Dare to Lead, Talking to Strangers, The Creative Act",
      "Tennis racket, tennis ball, and MEDIA badge on the shelf",
      "Studio mic ready for podcast and PR takes",
    ],
    favoriteFood: "Mediterranean bowl",
    faqs: [
      {
        q: "What does a Director of Media handle?",
        a: "Ava covers media communications and PR — pitches, placements, show notes, and on-brand talking points across channels.",
      },
      {
        q: "How can AI help with podcasting and PR?",
        a: "She drafts show notes, guest briefs, and press angles so your media lane stays consistent without a blank page.",
      },
      {
        q: "What is on Ava’s Media & PR board?",
        a: "Three columns — Pitch, In Progress, and Placed — tracking outlets and stories from idea to live placement.",
      },
      {
        q: "Does Ava publish without approval?",
        a: "No. Media drafts and angles land for your review before anything represents the brand publicly.",
      },
      {
        q: "Which outlets does Ava think about?",
        a: "Her board tracks real placement targets — trade, business, and podcast surfaces — always tailored to your story.",
      },
    ],
    work: [
      { id: "podcast", title: "Podcast episode outline", detail: "Hooks, segments, and CTA for a founder show." },
      { id: "pr", title: "PR angle sheet", detail: "Three story angles for local and trade press." },
      { id: "board", title: "Pitch-to-placed tracker", detail: "Media board snapshot: what is pitched, live, and next." },
    ],
    skills: [
      "Media pitching",
      "PR placements",
      "Podcast production talking points",
      "Press kit drafts",
      "Brand storytelling",
      "Pitch / In Progress / Placed tracking",
      "Outlet targeting (Forbes, Inc., CNBC, Spotify, and more)",
      "Campaign messaging",
      "STRATEGY FOCUS GROWTH IMPACT planning",
      "Owner-approved publishing",
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
    tagline: "Good strategy. Better days.",
    bio: "Shelly Allen is Director of Marketing Strategy & Growth. She sets the week-level plan the floor executes — brand awareness, thought leadership, demand generation, strategic partnerships, and community growth. People Develop People is on the wall; More Opportunities for More People sits at the bottom of her Marketing Strategy board. Strategy Drives Growth on the desk. You approve the plan before the team runs it.",
    personality: [
      "Mug motto: Good Strategy Better Days",
      "Pen cup: Strategy Drives Growth",
      "People Develop People on the wall",
      "Marketing Strategy board: Brand Awareness, Thought Leadership, Demand Generation, Strategic Partnerships, Community & Growth",
      "Board note: More Opportunities for More People",
      "Desk stack: Dare to Lead, Atomic Habits, The Coaching Habit",
      "Tote: Stronger People Brighter Tomorrows",
      "Family photos and globe on the shelf",
    ],
    favoriteFood: "Thai green curry",
    faqs: [
      {
        q: "What does a Director of Marketing Strategy & Growth plan?",
        a: "Shelly sets campaign themes, channel mix, and weekly priorities so specialists are not improvising alone.",
      },
      {
        q: "What is on Shelly’s Marketing Strategy board?",
        a: "Brand Awareness, Thought Leadership, Demand Generation, Strategic Partnerships, and Community & Growth — checked against the week’s plan.",
      },
      {
        q: "How does strategy connect to the rest of the floor?",
        a: "Shelly’s week plan routes work to paid, content, social, sales, and media — with clear owners and success metrics.",
      },
      {
        q: "Do campaigns launch without my OK?",
        a: "No. Shelly drafts the strategy and calendar; spend and publish wait for your approval.",
      },
      {
        q: "What books shape Shelly’s coaching style?",
        a: "Dare to Lead, Atomic Habits, and The Coaching Habit sit on her desk — people development next to growth math.",
      },
    ],
    work: [
      { id: "week", title: "Growth week plan", detail: "Themes, owners, and success metrics for the floor." },
      { id: "offer", title: "Offer narrative", detail: "Positioning for a Founders-style launch." },
      { id: "board", title: "Strategy board snapshot", detail: "Awareness → demand → partnerships checklist for the week." },
    ],
    skills: [
      "Brand Awareness",
      "Thought Leadership",
      "Demand Generation",
      "Strategic Partnerships",
      "Community & Growth",
      "Week-level growth plans",
      "Offer narrative",
      "Channel mix",
      "People Develop People coaching",
      "Strategy Drives Growth planning",
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
    tagline: "Build smarter together.",
    bio: "Ali Khan is Lead Full Stack Engineer. He ships site and product pages with Carlos — scalable, reliable, and human-centered. His Build Smarter Together board checks Scalable, Reliable, Human-Centered, and Big Opportunities. Sci-fi stack on the desk, family photo nearby, controller for after ship. Changes land for review before they go live.",
    personality: [
      "Whiteboard: Build Smarter Together",
      "Checked: Scalable, Reliable, Human-Centered, Big Opportunities",
      "People Process Progress on the wall",
      "Sci-fi stack: Dune, Project Hail Mary, The Expanse",
      "Family photo on the desk",
      "Game controller after deploy",
      "Partners with Carlos on WordPress and pages",
    ],
    favoriteFood: "Shawarma plate",
    faqs: [
      {
        q: "What does a Lead Full Stack Engineer do here?",
        a: "Ali builds and fixes websites and product pages with Carlos — production-ready work that holds up under real traffic.",
      },
      {
        q: "What is Build Smarter Together?",
        a: "Ali's quality bar on glass: Scalable, Reliable, Human-Centered, and aimed at Big Opportunities — not throwaway demos.",
      },
      {
        q: "Does code ship without approval?",
        a: "No. Ali drafts and implements; launches and production changes wait for your review.",
      },
      {
        q: "How does Ali work with Carlos?",
        a: "Ali owns full-stack delivery; Carlos specializes in WordPress — together they keep sites fast, editable, and on brand.",
      },
      {
        q: "What is on Ali's desk for downtime?",
        a: "Dune, Project Hail Mary, The Expanse, a family photo, and a controller — human-centered work includes humans.",
      },
    ],
    work: [
      { id: "page", title: "Marketing page build", detail: "Fast, accessible section layout ready for review." },
      { id: "form", title: "Lead form hardening", detail: "Validation and thank-you flow that does not drop leads." },
      { id: "bar", title: "Build Smarter checklist", detail: "Scalable / Reliable / Human-Centered pass before ship." },
    ],
    skills: [
      "Full-stack delivery",
      "Scalable architecture",
      "Reliable production systems",
      "Human-Centered product work",
      "Big Opportunities roadmap",
      "Marketing page builds",
      "Lead form hardening",
      "Performance checks",
      "Partner handoffs with Carlos",
      "Build Smarter Together QA",
    ],
  },
  carlos: {
    tagline: "Good sites build business.",
    bio: "Carlos Rivera is the WordPress Specialist. He partners with Ali on websites and pages — especially WordPress builds owners can still run. Welcome to WordPress stays on the glass; Good Sites Build Business sits on the mug; Build Optimize Grow is on the wall. Dominoes and a motorcycle print remind you the craft has personality. Updates ship with clear handoff notes.",
    personality: [
      "Mug motto: Good Sites Build Business",
      "Build Optimize Grow on the wall",
      "WordPress dashboard on the monitor",
      "WordPress W cap on the shelf",
      "Dominoes box on the desk",
      "Vintage motorcycle print",
      "Desk stack: The Grilling Bible, Motor Trend",
      "Globe on the bookshelf — builds that travel well",
    ],
    favoriteFood: "Empanadas",
    faqs: [
      {
        q: "What does a WordPress Specialist handle?",
        a: "Carlos drafts theme polish, landing sections, and maintainable WP updates so your site stays fast and editable.",
      },
      {
        q: "Can AI maintain a WordPress site?",
        a: "Yes — with handoff notes. Carlos prepares the change; you approve before it goes live.",
      },
      {
        q: "How does Carlos work with Ali?",
        a: "Carlos owns the WordPress craft; Ali covers full-stack delivery. Together they keep marketing pages production-ready.",
      },
      {
        q: "What does Build Optimize Grow mean?",
        a: "Carlos's wall motto: ship the page, tighten performance, then grow traffic and conversions — in that order.",
      },
      {
        q: "Will my site stay editable?",
        a: "That is the point. Carlos avoids plugin sprawl and leaves clear notes so owners are not locked out of their own site.",
      },
    ],
    work: [
      { id: "theme", title: "Theme polish pass", detail: "Spacing, type, and mobile fixes on a live WP theme." },
      { id: "landing", title: "WP landing section", detail: "Campaign block ready to publish after approval." },
      { id: "handoff", title: "Owner handoff notes", detail: "How to edit, where assets live, what not to break." },
    ],
    skills: [
      "WordPress builds",
      "Theme polish",
      "Landing sections",
      "Build Optimize Grow",
      "Owner handoff notes",
      "Plugin minimalism",
      "Mobile fixes",
      "Maintainable updates",
      "Performance pass",
      "Good Sites Build Business craft",
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
    tagline: "Data → LLM → Agents → Outcomes.",
    bio: "Nova Chen is Chief AI Architect. She designs how agents share context and tools so work compounds instead of restarting every chat. Her AI Automation board maps Data → LLM → Agents → Tools, Workflows, and Outcomes. Clean Architecture, Designing LLM Systems, and the AI Automation Playbook sit on the desk. Katana and anime on the shelf — serious systems, human taste. Research feeds the floor; you still approve what ships.",
    personality: [
      "AI Automation board: Data → LLM → Agents → Tools / Workflows / Outcomes",
      "Shelf sign: Build Automate Scale",
      "Desk stack: Clean Architecture, Designing LLM Systems, AI Automation Playbook",
      "LF180 water bottle on the desk",
      "Katana on the shelf",
      "Anime figurines and framed art by the window",
      "Code on the monitor — architecture in the open",
    ],
    favoriteFood: "Miso soup and rice",
    faqs: [
      {
        q: "What does a Chief AI Architect do in an AI office?",
        a: "Nova designs how agents share context, tools, and handoffs so the floor compounds work instead of restarting every conversation.",
      },
      {
        q: "What is on the AI Automation board?",
        a: "Data feeds the LLM, which powers Agents, which then use Tools and Workflows to drive Outcomes — Nova’s operating diagram.",
      },
      {
        q: "Does Nova change production systems alone?",
        a: "No. She drafts architecture and automation plans; you approve anything that changes how the business or customer data is handled.",
      },
      {
        q: "How does Nova help the rest of the team?",
        a: "She feeds research and shared tooling into Growth, Creative, and Ops so specialists work from the same context.",
      },
      {
        q: "What books shape Nova’s stack?",
        a: "Clean Architecture, Designing LLM Systems, and AI Automation Playbook — practical systems design for AI teams.",
      },
    ],
    work: [
      { id: "map", title: "Agent workflow map", detail: "Who hands off to whom, and when." },
      { id: "eval", title: "Quality assessment", detail: "Checks before drafts hit Done." },
      { id: "flow", title: "Data-LLM-Agents diagram", detail: "Automation path from input to owner-ready outcomes." },
    ],
    skills: [
      "AI architecture",
      "Data → LLM → Agents design",
      "Tools / Workflows / Outcomes automation",
      "Designing LLM systems",
      "Clean Architecture",
      "AI Automation playbooks",
      "Agent workflow maps",
      "Quality evaluations",
      "Build Automate Scale",
      "Owner-safe change plans",
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
    tagline: "A brighter financial future.",
    bio: "Dante' Price is Finance Director. He drafts books, forecasts, and CFO-style strategy notes — Financial Overview on the glass, Corporate Finance / Investment Strategies / Wealth Management on the desk. People Process Progress is on the wall; travel books and skyline photos remind you money serves a life. The owner issues and pays. No bank logins. Ever.",
    personality: [
      "Financial Overview: Revenue Trend, Expense Breakdown, cash & forecast metrics",
      "People Process Progress on the wall",
      "Desk stack: Corporate Finance, Investment Strategies, Wealth Management",
      "Shelf: Financial Planning, Behavioral Finance, The Intelligent Investor",
      "Travel books and photos: Dubai, London, Eiffel Tower, Burj Khalifa",
      "Side table: A Brighter Financial Future",
      "LEADSFLOW180 mug on the desk",
    ],
    favoriteFood: "Seared salmon",
    faqs: [
      {
        q: "What does a Finance Director do in AI Office?",
        a: "Dante drafts books, forecasts, and finance checklists. You keep banking credentials and approve anything that moves money.",
      },
      {
        q: "How can AI help with finance safely?",
        a: "Drafts and recommendations only — no bank logins. Dante prepares; you issue, pay, and approve.",
      },
      {
        q: "What is on Dante’s Financial Overview?",
        a: "Owner-readable charts — line, bar, and mix views — so cash and performance are clear without vanity noise.",
      },
      {
        q: "What books shape Dante’s advice?",
        a: "Corporate Finance, Investment Strategies, Wealth Management on the desk; Behavioral Finance and The Intelligent Investor on the shelf.",
      },
      {
        q: "Will Dante access my bank?",
        a: "Never. Finance work here is draft-only. Credentials and payments stay with you.",
      },
    ],
    work: [
      { id: "forecast", title: "Cash forecast draft", detail: "Simple forward look for owners." },
      { id: "books", title: "Monthly books checklist", detail: "What to review before close." },
      { id: "overview", title: "Financial Overview pack", detail: "One-page chart narrative: what moved and why." },
    ],
    skills: [
      "Financial Overview dashboards",
      "Cash forecasts",
      "Expense breakdown analysis",
      "Revenue trend reporting",
      "Books checklists",
      "Corporate Finance",
      "Investment Strategies",
      "Wealth Management",
      "Behavioral Finance literacy",
      "Zero bank-login policy",
    ],
  },
};

function officePhotoFor(agent: Agent): string {
  // Reason: newest office stills ship as jpg; keep webp/png as fallbacks.
  return `/agents/offices/${agent.id}.jpg`;
}

/** Resolve office still URL for the hero (jpg first for latest stills). */
export function officePhotoCandidates(id: string): string[] {
  return [
    `/agents/offices/${id}.jpg`,
    `/agents/offices/${id}.webp`,
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
