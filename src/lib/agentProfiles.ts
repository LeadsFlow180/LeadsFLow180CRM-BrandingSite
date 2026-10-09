import { agents, type Agent } from "@/lib/site";

export type AgentFaq = { q: string; a: string };

export type AgentWorkSampleKind = "image" | "pdf" | "audio";

export type AgentWorkSample = {
  id: string;
  title: string;
  detail: string;
  /** Cover / polaroid image for the portfolio card. */
  image?: string;
  /** In-app sample viewer route (preferred) or direct asset URL. */
  href?: string;
  /** How the sample opens: large image, PDF stage, or audio player. */
  kind?: AgentWorkSampleKind;
  /** Voice / voicemail sample URL when kind is audio. */
  audio?: string;
  /** Explicit PDF path when different from the cover image stem. */
  pdf?: string;
};

export type AgentGuide = {
  title: string;
  /** Optional blurb under the guide title from the SEO pack. */
  summary?: string;
  steps: string[];
  downloadCta: string;
};

export type AgentGetStarted = { title: string; detail: string };

export type AgentProfile = {
  id: string;
  /** Full-bleed office / desk scene path (may 404 until stills land — UI falls back to portrait). */
  officePhoto: string;
  portraitPhoto: string;
  tagline: string;
  bio: string;
  /** Hero supporting paragraph from SEO pack. */
  intro?: string;
  specialtyLabel?: string;
  pageTitle?: string;
  metaDescription?: string;
  /** Exact Ask CTA from SEO pack (e.g. "Ask Ava about your story"). */
  askCta?: string;
  /** Line under the Ask button (e.g. "Free 5-minute chat. No obligation."). */
  ctaHelper?: string;
  personality: string[];
  favoriteFood: string;
  faqs: AgentFaq[];
  work: AgentWorkSample[];
  /** Core skills from SEO pack / office markup. */
  skills?: string[];
  getStarted?: AgentGetStarted[];
  guide?: AgentGuide;
  /** True when copy is draft until the sole bio document is pasted in. */
  draft: boolean;
};




/** Role-flavored SEO + personality scaffolds. Replace when the sole bio doc arrives. */
const PROFILE_BY_ID: Record<
  string,
  Omit<AgentProfile, "id" | "officePhoto" | "portraitPhoto" | "draft">
> = {
  mia: {
    tagline: "Clear plans. Clear owners. Work that keeps moving.",
    bio: "I bring order to complex work without adding unnecessary process. I clarify the goal, find the right people to involve, and make sure the team leaves with decisions and next actions.",
    intro: "I help organize projects, coordinate the right specialists, and keep decisions, approvals, owners, and next steps visible. You can work with me directly or go straight to any specialist on the team.",
    specialtyLabel: "PROJECT MANAGEMENT & TEAM COORDINATION",
    pageTitle: "Mia Carter | AI Project Manager for Small Business",
    metaDescription: "Meet Mia, the LeadsFlow180 AI project manager who organizes priorities, coordinates specialists, tracks decisions, and turns complex work into clear next steps.",
    askCta: "Ask Mia about your business",
    ctaHelper: "Free 5-minute chat. No obligation.",
    personality: [
      "Organized project plans",
      "Meeting and action-item follow-up",
      "Cross-team coordination",
      "Decision tracking",
      "Calm, concise updates"
    ],
    favoriteFood: "TBD",
    skills: [
      "Project planning",
      "Meeting facilitation",
      "Work breakdown",
      "Cross-functional coordination",
      "Risk and dependency tracking",
      "Status reporting"
    ],
    faqs: [
      {
        q: "What does an AI project manager do?",
        a: "An AI project manager helps organize tasks, deadlines, owners, and updates. Mia can structure a project and coordinate team work; a person should approve important business decisions and commitments.",
      },
      {
        q: "How do I organize a project with multiple people?",
        a: "Start with one outcome, divide it into deliverables, assign one owner and due date to each, identify dependencies, and review open risks on a regular schedule.",
      },
      {
        q: "How can I keep meetings from wasting time?",
        a: "Share the decision needed before the meeting, use a short agenda, capture decisions and owners, and end by confirming the next steps.",
      },
      {
        q: "Can Mia work with one specialist instead of the whole team?",
        a: "Yes. You can ask Mia to coordinate a project or contact any specialist directly when you already know what help you need.",
      },
      {
        q: "How do I track project delays?",
        a: "Record the blocker, who can resolve it, the impact on the timeline, and the next check-in. Update the plan instead of hiding a missed date.",
      }
    ],
    work: [
      {
        id: "p1",
        title: "30-Day Launch Plan",
        detail: "Belle Med Spa — sample timeline with milestones, owners, dependencies, and approval points. (Sample concept.)",
        image: "/agents/portfolio/mia/30-day-launch-plan.jpg",
        href: "/agents/mia/samples/30-day-launch-plan",
        kind: "pdf",
        pdf: "/agents/portfolio/mia/30-day-launch-plan.pdf",
      },
      {
        id: "p2",
        title: "Meeting-to-Action Brief",
        detail: "BrightLine Commercial Cleaning — sample agenda, decision log, action list, due dates, and unresolved questions. (Sample concept.)",
        image: "/agents/portfolio/mia/meeting-to-action-brief.jpg",
        href: "/agents/mia/samples/meeting-to-action-brief",
        kind: "pdf",
        pdf: "/agents/portfolio/mia/meeting-to-action-brief.pdf",
      },
      {
        id: "p3",
        title: "Project Rescue Plan",
        detail: "Kings of Cool HVAC — sample recovery plan with owners, blockers, and next decisions. (Sample concept.)",
        image: "/agents/portfolio/mia/project-rescue-plan.jpg",
        href: "/agents/mia/samples/project-rescue-plan",
        kind: "pdf",
        pdf: "/agents/portfolio/mia/project-rescue-plan.pdf",
      },
    ],
    getStarted: [
      {
        title: "Tell Mia the result you want and the deadline",
        detail: "",
      },
      {
        title: "Mia outlines work, owners, and decisions needed",
        detail: "",
      },
      {
        title: "You review the plan and approve the next steps",
        detail: "",
      }
    ],
    guide: {
      title: "The Small-Business Project Plan: From Idea to Done",
      summary: "Use this on-page guide and offer a matching PDF download.",
      steps: [
        "Write the outcome in one sentence and define what \"done\" means.",
        "List the deliverables; break each into tasks small enough to assign.",
        "Give every task one owner, a due date, and a clear status.",
        "Mark dependencies and decisions that could hold up the work.",
        "Review progress weekly; change the plan when evidence or priorities change."
      ],
      downloadCta: "Download the free project planning checklist.",
    },
  },
  adam: {
    tagline: "Find the bottleneck before adding more effort.",
    bio: "Sustainable improvement starts by understanding the current process and the people doing the work. I help identify the real constraint and design a change small enough to test and strong enough to measure.",
    intro: "I help examine how work actually moves through a business. We establish a baseline, find friction and root causes, then test practical improvements that can be measured and sustained.",
    specialtyLabel: "PROCESS IMPROVEMENT & BUSINESS OPERATIONS",
    pageTitle: "Adam Mitchell | AI Process Improvement Specialist",
    metaDescription: "Meet Adam, the LeadsFlow180 process specialist who helps small businesses find bottlenecks, reduce avoidable rework, and improve workflows with measurable changes.",
    askCta: "Ask Adam about your business",
    ctaHelper: "Free 5-minute chat. No obligation.",
    personality: [
      "Workflow mapping",
      "Root-cause analysis",
      "Baseline measures",
      "Waste reduction",
      "Improvement plans",
      "Mug motto: Better Processes Brighter People",
      "People Process Progress on the wall",
      "Desk stack: Operational Excellence, The Toyota Way, Process Mapping, Good to Great",
      "Operations whiteboard: Plan → Improve → Execute → Measure",
      "Goals on glass: Simplify, Standardize, Scale, People First"
    ],
    favoriteFood: "TBD",
    skills: [
      "Process mapping",
      "Root-cause analysis",
      "Six Sigma methods",
      "Workflow improvement",
      "Measurement planning",
      "Change support"
    ],
    faqs: [
      {
        q: "What is process improvement for a small business?",
        a: "It is a structured way to make everyday work more reliable, efficient, and useful to customers by understanding the current process and testing improvements.",
      },
      {
        q: "How do I find bottlenecks in my business?",
        a: "Map each step from request to completion, measure wait and work time, identify rework and queues, and ask the people involved where work gets stuck.",
      },
      {
        q: "What is the 5 Whys method?",
        a: "It is a simple root-cause technique that asks why a problem occurred repeatedly until the team reaches a cause it can investigate. It should be supported with evidence, not used to assign blame.",
      },
      {
        q: "How do I reduce wasted time at work?",
        a: "Identify repeated delays, duplicate entry, unclear approvals, and avoidable rework. Test one change and compare the result with a baseline.",
      },
      {
        q: "Do small businesses need Six Sigma?",
        a: "They may benefit from its focus on process and evidence without adopting a large formal program. Use only the methods that help solve the actual problem.",
      }
    ],
    work: [
      {
        id: "p1",
        title: "Lead Response Process Map",
        detail: "fictional current-state and future-state workflow with handoffs and wait points. (Sample concept.)",
      },
      {
        id: "p2",
        title: "Root-Cause Analysis Brief",
        detail: "sample fishbone/5 Whys analysis for missed appointments, clearly marked as illustrative. (Sample concept.)",
      },
      {
        id: "p3",
        title: "90-Day Improvement Scorecard",
        detail: "sample measures, owners, tests, and review cadence; no promised savings or outcomes. (Sample concept.)",
      }
    ],
    getStarted: [
      {
        title: "Describe the recurring problem and who it affects",
        detail: "",
      },
      {
        title: "Adam maps the workflow and baseline",
        detail: "",
      },
      {
        title: "Agree on one improvement test, owner, and review date",
        detail: "",
      }
    ],
    guide: {
      title: "Find and Fix One Business Bottleneck",
      summary: "",
      steps: [
        "Pick a repeated problem customers or staff can describe.",
        "Map the steps from start to finish and note handoffs.",
        "Measure where work waits, repeats, or gets returned for correction.",
        "Ask why the largest delay occurs and verify the answer with records and staff.",
        "Test one change, compare it with the baseline, and keep or revise it based on evidence."
      ],
      downloadCta: "Download the free workflow mapping worksheet.",
    },
  },
  sonja: {
    tagline: "Support that listens, clarifies, and follows through.",
    bio: "I start by understanding the customer's concern, then help find a clear and respectful way forward. Good support combines empathy with accurate information, realistic expectations, and follow-through.",
    intro: "I help small businesses respond to customers with care and clarity. I can organize support workflows, draft replies, and spot patterns in customer questions so teams can improve the experience.",
    specialtyLabel: "CUSTOMER SUPPORT & COMMUNITY CARE",
    pageTitle: "Sonja Williams | AI Customer Support Specialist",
    metaDescription: "Meet Sonja, the LeadsFlow180 AI support specialist who helps organize customer questions, write clear responses, and improve service follow-through.",
    askCta: "Ask Sonja about your business",
    ctaHelper: "Free 5-minute chat. No obligation.",
    personality: [
      "Customer response drafts",
      "Support workflows",
      "Issue summaries",
      "Community responses",
      "Feedback themes"
    ],
    favoriteFood: "TBD",
    skills: [
      "Customer communication",
      "Support triage",
      "Response templates",
      "Feedback analysis",
      "Community moderation",
      "Escalation notes"
    ],
    faqs: [
      {
        q: "How should a small business respond to a customer complaint?",
        a: "Acknowledge the concern, ask for needed details, explain what you can verify, offer a realistic next step, and follow through. Avoid arguing or making promises you cannot keep.",
      },
      {
        q: "What should a customer support process include?",
        a: "Include intake channels, issue categories, urgency rules, owners, response expectations, escalation paths, and a way to record resolution.",
      },
      {
        q: "How quickly should a business answer customer messages?",
        a: "Set a response target your team can meet consistently. Publish the hours and expectations, then prioritize urgent safety or service issues appropriately.",
      },
      {
        q: "How do I handle a negative online review?",
        a: "Respond calmly, protect private information, acknowledge the experience, and invite the reviewer to a suitable private channel to resolve details.",
      },
      {
        q: "Can AI answer my customer support messages?",
        a: "AI can draft or help organize replies, but a person should review sensitive, financial, safety-related, or unusual issues and approve messages according to business policy.",
      }
    ],
    work: [
      {
        id: "p1",
        title: "Customer Support Response Library",
        detail: "sample empathetic replies for delays, returns, scheduling, and complaints. (Sample concept.)",
      },
      {
        id: "p2",
        title: "Support Request Tracker",
        detail: "fictional dashboard showing category, urgency, owner, status, and next update. (Sample concept.)",
      },
      {
        id: "p3",
        title: "Customer Feedback Theme Report",
        detail: "sample anonymized review analysis with recurring themes and practical service improvements. (Sample concept.)",
      }
    ],
    getStarted: [
      {
        title: "Share common questions and your support policies",
        detail: "",
      },
      {
        title: "Sonja drafts response tools and an escalation flow",
        detail: "",
      },
      {
        title: "Your team reviews and uses them, then improves them from real feedback",
        detail: "",
      }
    ],
    guide: {
      title: "A Simple Customer Complaint Response Framework",
      summary: "",
      steps: [
        "Listen without interrupting or arguing.",
        "Restate the concern to confirm what happened.",
        "Check records and policy before explaining options.",
        "Give one realistic next step, owner, and update time.",
        "Close the loop and record what the business can learn."
      ],
      downloadCta: "Download the free customer support response checklist.",
    },
  },
  danica: {
    tagline: "A more prepared day starts with a clearer plan.",
    bio: "I help turn a crowded day into a workable plan. I gather what matters, surface conflicts early, and prepare drafts and reminders so you can make decisions with less scrambling.",
    intro: "I help business owners protect their time and stay ready for what is next. I can organize a daily plan, prepare meeting briefs, draft proposals, and track follow-ups for your review.",
    specialtyLabel: "EXECUTIVE SUPPORT & DAILY PLANNING",
    pageTitle: "Danica Bato | AI Executive Assistant for Small Business",
    metaDescription: "Meet Danica, the LeadsFlow180 AI executive assistant who helps prepare schedules, briefs, proposals, task lists, and follow-ups.",
    askCta: "Ask Danica about your business",
    ctaHelper: "Free 5-minute chat. No obligation.",
    personality: [
      "Calendar and task organization",
      "Meeting preparation",
      "Proposal and document drafts",
      "Follow-up tracking",
      "Warm, efficient communication",
      "Desk sign: Progress People Possibilities",
      "Wall print: A Calmer More Productive You",
      "Corkboard: Good Food Brighter Days",
      "Atomic Habits on the shelf"
    ],
    favoriteFood: "TBD",
    skills: [
      "Calendar review",
      "Task prioritization",
      "Brief preparation",
      "Proposal drafting",
      "Follow-up tracking",
      "Executive summaries"
    ],
    faqs: [
      {
        q: "What can an AI executive assistant do for a small business?",
        a: "An AI executive assistant can organize schedules, prepare briefs, draft documents, and track follow-ups. The business owner should review drafts and approve changes or messages before they are sent.",
      },
      {
        q: "How do I plan my workday as a business owner?",
        a: "Choose three priority outcomes, group similar tasks, protect time for focused work, add realistic buffers, and leave room for urgent customer needs.",
      },
      {
        q: "Can an AI assistant write a business proposal?",
        a: "It can draft a proposal from your scope, pricing, timeline, and terms. Review every detail for accuracy and approve it before sending.",
      },
      {
        q: "What should a meeting brief include?",
        a: "Include the purpose, participants, background, decisions needed, relevant documents, and questions to resolve. Afterward, record decisions, owners, and due dates.",
      },
      {
        q: "How do I stop forgetting client follow-ups?",
        a: "Record each promised action in one tracker with an owner and due date, then review overdue and upcoming items daily.",
      }
    ],
    work: [
      {
        id: "p1",
        title: "Calendar Management",
        detail: "Your day, clearly planned — Danica books and prepares appointments for owner approval. (Sample concept.)",
        image: "/agents/portfolio/danica/calendar-management.png",
        href: "/agents/danica/samples/calendar-management",
        kind: "image",
      },
      {
        id: "p2",
        title: "Event Planning Proposal",
        detail: "Elevated Moments — sample corporate anniversary proposal (sample concept until live CRM proposals replace it).",
        image: "/agents/portfolio/danica/event-planning-cover.png",
        href: "/agents/danica/samples/event-planning-proposal",
        kind: "pdf",
        pdf: "/agents/portfolio/danica/event-planning-proposal.pdf",
      },
      {
        id: "p3",
        title: "Appointment Confirmation",
        detail: "Hear Danica’s appointment-confirmation voicemail sample. (Sample concept.)",
        href: "/agents/danica/samples/appointment-confirmation",
        kind: "audio",
        audio: "/agents/portfolio/danica/appointment-confirmation.mp3",
      },
    ],
    getStarted: [
      {
        title: "Share your goals, schedule, and commitments",
        detail: "",
      },
      {
        title: "Danica prepares a proposed plan or draft",
        detail: "",
      },
      {
        title: "Review and approve anything that changes a calendar, record, or message",
        detail: "",
      }
    ],
    guide: {
      title: "The Business Owner's Weekly Planning Kit",
      summary: "",
      steps: [
        "Review the next two weeks before adding new commitments.",
        "Choose three outcomes that matter most this week.",
        "Block preparation and follow-up time around meetings.",
        "Turn every promise into an owner, action, and due date.",
        "End each day by moving unfinished work deliberately—not by letting it disappear."
      ],
      downloadCta: "Download the free weekly planning worksheet.",
    },
  },
  jay: {
    tagline: "Send the right message at the right stage of the relationship.",
    bio: "I treat email as a relationship channel and a technical system. Good campaigns are relevant and well-timed; good deliverability depends on permission, list quality, sound setup, and careful monitoring.",
    intro: "I help plan email campaigns around customer needs and timing. I can map welcome and follow-up sequences, review campaign performance, and help investigate deliverability issues responsibly.",
    specialtyLabel: "EMAIL MARKETING & CUSTOMER LIFECYCLE",
    pageTitle: "Jay Collins | AI Email Marketing and Deliverability Specialist",
    metaDescription: "Meet Jay, the LeadsFlow180 email specialist who plans lifecycle campaigns, improves email processes, and helps protect sending reputation and deliverability.",
    askCta: "Ask Jay about your business",
    ctaHelper: "Free 5-minute chat. No obligation.",
    personality: [
      "Lifecycle email planning",
      "Campaign copy review",
      "Segmentation",
      "Deliverability checks",
      "Testing and reporting",
      "Q3 Email Campaigns board: Welcome Series, Customer Spotlight, and more",
      "Desk stack: Email Strategy, Audience Growth, Small Business Big Opportunities",
      "Golf bag in the corner",
      "Board note: Build relationships. Create opportunities. Repeat."
    ],
    favoriteFood: "TBD",
    skills: [
      "Lifecycle strategy",
      "Email campaign planning",
      "Segmentation",
      "Deliverability review",
      "A/B testing",
      "Campaign analysis"
    ],
    faqs: [
      {
        q: "How do I improve email deliverability?",
        a: "Use a properly authenticated sending domain, mail people who expect your messages, keep lists current, honor unsubscribes, and monitor bounces and complaints. Follow current provider requirements.",
      },
      {
        q: "What emails should a small business send to new customers?",
        a: "Start with a useful welcome or confirmation, explain what happens next, provide relevant help, and invite a suitable follow-up. Send only messages allowed by the person's preferences and applicable rules.",
      },
      {
        q: "How often should a business email its customers?",
        a: "Use a cadence that matches customer expectations and the value of the content. Watch engagement and complaints, and make preferences and unsubscribe options easy to find.",
      },
      {
        q: "What is email segmentation?",
        a: "Segmentation groups subscribers by relevant characteristics or behavior so messages are more useful. Use only data you have a legitimate reason to use and avoid sensitive or surprising targeting.",
      },
      {
        q: "Why are my marketing emails going to spam?",
        a: "Possible causes include weak authentication, poor list quality, unexpected volume changes, spam complaints, or content and reputation issues. Diagnose the sending domain and provider reports before increasing volume.",
      }
    ],
    work: [
      {
        id: "p1",
        title: "New Customer Welcome Journey",
        detail: "sample three-message sequence with timing, purpose, audience rules, and suppression notes. (Sample concept.)",
      },
      {
        id: "p2",
        title: "Deliverability Health Checklist",
        detail: "illustrative audit template for authentication, list hygiene, complaint signals, and sending practices. (Sample concept.)",
      },
      {
        id: "p3",
        title: "Campaign Test Report",
        detail: "mock comparison of subject-line or content tests with sample-size caveats and next steps; no fabricated lift claims. (Sample concept.)",
      }
    ],
    getStarted: [
      {
        title: "Explain your audience, email goal, and current platform",
        detail: "",
      },
      {
        title: "Jay proposes a sequence and checks the sending fundamentals",
        detail: "",
      },
      {
        title: "Review permissions, copy, and test plan before launch",
        detail: "",
      }
    ],
    guide: {
      title: "Small-Business Email Health Checklist",
      summary: "",
      steps: [
        "Confirm your sending domain and current authentication status with your provider.",
        "Send to people who have a valid basis to receive your messages.",
        "Remove invalid addresses and honor unsubscribes and preferences promptly.",
        "Monitor delivery, bounce, complaint, and engagement trends.",
        "Change one major campaign variable at a time and document the result."
      ],
      downloadCta: "Download the free email campaign and deliverability checklist.",
    },
  },
  ava: {
    tagline: "Find the story your audience will remember.",
    bio: "A strong story gives people a reason to listen and something useful to carry away. I help find that structure without forcing a message or changing what the speaker actually means.",
    intro: "I help shape interviews, podcast episodes, and media messages around a clear audience takeaway. We find the strongest story, prepare thoughtfully, and protect accuracy while making the content engaging.",
    specialtyLabel: "MEDIA, PUBLIC RELATIONS & PODCASTING",
    pageTitle: "Ava Morgan | AI Podcast Producer and Media Strategist",
    metaDescription: "Meet Ava, the LeadsFlow180 media specialist who helps shape podcast episodes, interviews, public relations messages, and audience-focused stories.",
    askCta: "Ask Ava about your story",
    ctaHelper: "Free 5-minute chat. No obligation.",
    personality: [
      "Podcast planning",
      "Interview preparation",
      "Episode structure",
      "Media messaging",
      "Story development",
      "Mug motto: Good Stories Drive Growth",
      "Media & PR board: Pitch / In Progress / Placed",
      "Board quote: Bigger Stories Brighter People",
      "Tennis racket and MEDIA badge on the shelf"
    ],
    favoriteFood: "TBD",
    skills: [
      "Podcast production planning",
      "Interview questions",
      "Media preparation",
      "Story structure",
      "Episode repurposing",
      "Audience development"
    ],
    faqs: [
      {
        q: "How do I start a business podcast?",
        a: "Define the audience and purpose, choose a repeatable format, plan a short season, prepare guests and recording, and set a realistic production schedule.",
      },
      {
        q: "What makes a good podcast interview?",
        a: "A clear topic, thoughtful open questions, active listening, accurate context, and an ending that gives the audience a useful takeaway.",
      },
      {
        q: "How long should a podcast episode be?",
        a: "Long enough to deliver the episode's promise without unnecessary repetition. Choose length based on subject, format, and audience behavior.",
      },
      {
        q: "How can a small business get media attention?",
        a: "Offer a timely, relevant story with credible details and a clear public value. Build a focused media list and personalize a concise pitch; coverage cannot be guaranteed.",
      },
      {
        q: "How do I repurpose a podcast episode?",
        a: "Identify a few self-contained insights, get appropriate permissions, create short clips or summaries, and link them back to the full episode with accurate context.",
      }
    ],
    work: [
      {
        id: "p1",
        title: "Podcast Episode Blueprint",
        detail: "sample concept, audience promise, guest brief, question arc, and closing takeaway. (Sample concept.)",
      },
      {
        id: "p2",
        title: "Founder Media Kit",
        detail: "sample short bio, company overview, talking points, and press-ready facts for a fictional business. (Sample concept.)",
      },
      {
        id: "p3",
        title: "Repurposing Map",
        detail: "sample plan turning one interview into an episode, short clips, quote cards, and an article with consent and review steps. (Sample concept.)",
      }
    ],
    getStarted: [
      {
        title: "Share your audience, topic, and intended outcome",
        detail: "",
      },
      {
        title: "Ava develops a story or episode plan",
        detail: "",
      },
      {
        title: "Review facts, permissions, and production needs before recording or pitching",
        detail: "",
      }
    ],
    guide: {
      title: "Plan a Podcast Episode People Want to Finish",
      summary: "",
      steps: [
        "Promise one clear benefit to a defined audience.",
        "Build an outline with a strong opening, useful middle, and meaningful close.",
        "Prepare questions that invite examples instead of yes/no answers.",
        "Record clean audio and confirm guest permissions and names.",
        "Edit for clarity, verify claims, and create a useful next step for listeners."
      ],
      downloadCta: "Download the free podcast episode planner.",
    },
  },
  mark: {
    tagline: "Make your next business decision with better evidence.",
    bio: "I investigate before I recommend. My work helps you understand what is known, what is only a signal, and what information would strengthen a decision.",
    intro: "I research markets, companies, competitors, and potential customers. I separate verified facts from assumptions, so you can see what the evidence supports—and what still needs checking.",
    specialtyLabel: "MARKET RESEARCH & PROSPECT INTELLIGENCE",
    pageTitle: "Mark Bennett | AI Market Research and Prospect Intelligence",
    metaDescription: "Meet Mark, the LeadsFlow180 research specialist who verifies market, company, competitor, and prospect information to support better business decisions.",
    askCta: "Ask Mark about your business",
    ctaHelper: "Free 5-minute chat. No obligation.",
    personality: [
      "Source-based research",
      "Competitor reviews",
      "Prospect qualification",
      "Market signals",
      "Clear confidence and unknowns"
    ],
    favoriteFood: "TBD",
    skills: [
      "Market research",
      "Company and prospect research",
      "Competitor analysis",
      "ICP evidence",
      "Source evaluation",
      "Research briefs"
    ],
    faqs: [
      {
        q: "How do I research my competitors?",
        a: "Compare their offers, target audiences, pricing when public, customer feedback, and how clearly they explain their value. Use dated sources and distinguish what you observe from what you infer.",
      },
      {
        q: "What is an ideal customer profile?",
        a: "An ideal customer profile describes the types of businesses or people most likely to benefit from your offer, based on fit, need, ability to buy, and evidence from current customers.",
      },
      {
        q: "How can I find qualified business prospects?",
        a: "Define fit criteria first, identify organizations that meet them, verify relevant details from reliable sources, and prioritize prospects based on evidence rather than volume alone.",
      },
      {
        q: "What should a competitor analysis include?",
        a: "Include competitors' services, audience, positioning, customer experience, strengths, weaknesses, and sources. Focus on useful differences instead of copying their messaging.",
      },
      {
        q: "How do I know if market research is reliable?",
        a: "Check who published it, when it was published, how the data was collected, and whether other credible sources support the finding.",
      }
    ],
    work: [
      {
        id: "p1",
        title: "Local Competitor Snapshot",
        detail: "sample comparison of services, positioning, reviews, and visible customer experience using cited public sources. (Sample concept.)",
      },
      {
        id: "p2",
        title: "Ideal Customer Evidence Map",
        detail: "sample table connecting target-customer criteria to evidence, confidence, and open questions. (Sample concept.)",
      },
      {
        id: "p3",
        title: "Prospect Research Brief",
        detail: "fictional company profile showing verified facts, likely fit, and next research steps. (Sample concept.)",
      }
    ],
    getStarted: [
      {
        title: "Tell Mark the decision you need to make",
        detail: "",
      },
      {
        title: "Define the market, customer, or competitor scope",
        detail: "",
      },
      {
        title: "Review findings with sources, confidence, and recommended next questions",
        detail: "",
      }
    ],
    guide: {
      title: "A Practical Competitor Research Checklist",
      summary: "",
      steps: [
        "Name the business decision this research should inform.",
        "Select three to five direct competitors and explain why each is comparable.",
        "Record public offers, audience, positioning, proof, and customer feedback with source dates.",
        "Separate facts from interpretations; note missing information.",
        "Choose one useful market gap to test with customers."
      ],
      downloadCta: "Download the free competitor research worksheet.",
    },
  },
  lee: {
    tagline: "Put ad spend behind a clear plan—and measure what it brings back.",
    bio: "I help small businesses grow through smart, results-driven advertising. I focus on finding creative ways to reach new customers and turn clicks into real opportunities. When I'm not optimizing ad campaigns, I'm probably watching soccer, trying new restaurants, or planning my next travel adventure.",
    intro: "I plan and manage paid campaigns designed to bring qualified leads and customers to your business. I work on strategy, targeting, creative, tracking, and optimization so you can make better decisions about your budget.",
    specialtyLabel: "PAID MEDIA SPECIALIST",
    pageTitle: "Lee Park | AI Paid Media and Performance Advertising Specialist",
    metaDescription: "Meet Lee, the LeadsFlow180 paid media specialist who plans, manages, and evaluates advertising campaigns across Google, Meta, YouTube, and LinkedIn.",
    askCta: "Ask Lee about your business",
    ctaHelper: "Free 5-minute chat. No obligation.",
    personality: [
      "Soccer",
      "Travel and new foods",
      "Coffee",
      "Photography",
      "Music and podcasts",
      "Soccer on the shelf after work",
      "Mug motto: Good Ads Better People",
      "Sci-fi stack: Dune, The Martian, Project Hail Mary"
    ],
    favoriteFood: "Sushi rolls",
    skills: [
      "Google Ads",
      "Meta Ads (Facebook and Instagram)",
      "YouTube Ads",
      "LinkedIn Ads",
      "Ad strategy and planning",
      "Audience targeting",
      "Campaign management",
      "Creative development",
      "Conversion tracking",
      "Analytics and reporting",
      "Budget optimization"
    ],
    faqs: [
      {
        q: "What types of ads does Lee manage?",
        a: "Lee plans and manages campaigns across Google Ads, Meta platforms such as Facebook and Instagram, YouTube, and LinkedIn, depending on the audience and business goal.",
      },
      {
        q: "Do I need a big budget to get started with advertising?",
        a: "Not always, but a budget must be large enough to test the audience, offer, and conversion path. Start with a defined test budget and stop conditions; never spend money you cannot afford to test.",
      },
      {
        q: "How long does it take to see results from ads?",
        a: "Timing varies with competition, budget, tracking, offer, and sales process. Early data can inform adjustments, but it may take time to collect enough evidence for a reliable decision.",
      },
      {
        q: "Can you help with ad creatives?",
        a: "Yes. Lee can plan creative concepts and coordinate copy and design with the team. Ads should match the landing page and use accurate, policy-compliant claims.",
      },
      {
        q: "Do you work with specific industries?",
        a: "The team can adapt campaigns to different industries, including home services and local businesses. Strategy depends on the market, platform rules, customer, and offer.",
      }
    ],
    work: [
      {
        id: "p1",
        title: "Local Plumber Search Campaign",
        detail: "sample ad and landing-page concept focused on emergency and scheduled service, with a measurement plan. (Sample concept.)",
      },
      {
        id: "p2",
        title: "Med Spa Meta Campaign",
        detail: "sample offer creative and audience assumptions; include required terms and avoid unsupported health claims. (Sample concept.)",
      },
      {
        id: "p3",
        title: "Home Services Retargeting Concept",
        detail: "sample creative sequence and consent/privacy notes. Present all three as demonstrations, not client results. (Sample concept.)",
      }
    ],
    getStarted: [
      {
        title: "Tell Lee about your business, goals, audience, and current marketing",
        detail: "",
      },
      {
        title: "Lee builds a plan with targeting, budget recommendations, tracking, and creative needs",
        detail: "",
      },
      {
        title: "After your approval, campaigns can launch; results are monitored and optimized",
        detail: "",
      }
    ],
    guide: {
      title: "Before You Spend on Online Ads",
      summary: "",
      steps: [
        "Choose one goal: calls, booked appointments, qualified leads, or sales.",
        "Make sure the offer, service area, landing page, and follow-up process are ready.",
        "Set a test budget, timeframe, and rules for pausing or changing the campaign.",
        "Confirm conversion tracking works before spending.",
        "Review lead quality and business outcomes—not clicks alone."
      ],
      downloadCta: "Download the free paid advertising readiness checklist.",
    },
  },
  zenda: {
    tagline: "Show up consistently with content that sounds like you.",
    bio: "I pay attention to how people communicate on each platform, while keeping the business's own voice intact. Trends are useful only when they make sense for your audience and goals.",
    intro: "I help businesses plan useful social content and respond to their community in a voice that fits the brand. We focus on what your audience cares about, what each platform supports, and what you can sustain.",
    specialtyLabel: "SOCIAL MEDIA CONTENT & COMMUNITY",
    pageTitle: "Zenda Okafor | AI Social Media Content Specialist",
    metaDescription: "Meet Zenda, the LeadsFlow180 social media specialist who helps small businesses plan platform-aware content, engage their community, and learn from performance.",
    askCta: "Ask Zenda about your business",
    ctaHelper: "Free 5-minute chat. No obligation.",
    personality: [
      "Social content calendars",
      "Platform-aware writing",
      "Community engagement",
      "Trend evaluation",
      "Performance learning"
    ],
    favoriteFood: "TBD",
    skills: [
      "Social content planning",
      "Platform adaptation",
      "Community responses",
      "Trend assessment",
      "Content calendars",
      "Engagement review"
    ],
    faqs: [
      {
        q: "What should a small business post on social media?",
        a: "Share helpful advice, real examples, customer questions, team or process stories, and offers that fit the audience. Choose formats you can produce consistently.",
      },
      {
        q: "How often should a small business post?",
        a: "Pick a schedule you can maintain with quality. Consistency and audience relevance matter more than an arbitrary daily posting target.",
      },
      {
        q: "How do I create a social media content calendar?",
        a: "Choose a goal, define a few recurring content themes, map posts to audience questions and business events, assign an owner, and leave room for timely updates.",
      },
      {
        q: "Should my business use every social media platform?",
        a: "No. Start where your customers are active and where your team can create useful content. Review results before adding more channels.",
      },
      {
        q: "How do I know if a social media trend fits my brand?",
        a: "Check whether the trend suits your audience, values, timing, and ability to participate naturally. Skip it if it distracts from your message or creates risk.",
      }
    ],
    work: [
      {
        id: "p1",
        title: "30-Day Local Business Content Calendar",
        detail: "sample mix of education, proof, people, offers, and community prompts. (Sample concept.)",
      },
      {
        id: "p2",
        title: "One Idea, Three Platforms",
        detail: "sample adaptation of a home-maintenance tip for Instagram, Facebook, and LinkedIn. (Sample concept.)",
      },
      {
        id: "p3",
        title: "Community Response Playbook",
        detail: "sample response patterns for questions, praise, criticism, and escalation. (Sample concept.)",
      }
    ],
    getStarted: [
      {
        title: "Share your audience, platforms, and business goal",
        detail: "",
      },
      {
        title: "Zenda maps content themes and a realistic calendar",
        detail: "",
      },
      {
        title: "Approve posts and review audience response to refine the plan",
        detail: "",
      }
    ],
    guide: {
      title: "A 30-Minute Social Content Planning Routine",
      summary: "",
      steps: [
        "Write down the three questions customers ask most often.",
        "Turn each question into a tip, short video, and story or post.",
        "Add one proof point and one clear offer, if appropriate.",
        "Adapt wording and format to the platform instead of copying blindly.",
        "Review saves, meaningful replies, clicks, and inquiries—not likes alone."
      ],
      downloadCta: "Download the free social content calendar.",
    },
  },
  jojo: {
    tagline: "Words that sound like your business—and speak to your customer.",
    bio: "I look for the human need behind the message. Clear copy should help people understand who you serve, what problem you solve, and what they can do next—without making claims you cannot support.",
    intro: "I help turn what you do into clear, human messaging. From website copy to campaign emails and scripts, I shape the message around your audience, your brand, and the next action you want readers to take.",
    specialtyLabel: "COPYWRITING & CUSTOMER MESSAGING",
    pageTitle: "JoJo Alvarez | AI Copywriter for Small Business",
    metaDescription: "Meet JoJo, the LeadsFlow180 AI copywriter who creates clear, audience-aware website, email, campaign, and sales content grounded in verified information.",
    askCta: "Ask JoJo about your business",
    ctaHelper: "Free 5-minute chat. No obligation.",
    personality: [
      "Website and landing-page copy",
      "Email campaigns",
      "Sales materials",
      "Brand voice",
      "Audience-focused messaging",
      "Desk stack: Atomic Habits, Dare to Lead, Big Magic, The Midnight Library",
      "Mug motto: Good Copy Brighter Days"
    ],
    favoriteFood: "TBD",
    skills: [
      "Website copy",
      "Email copy",
      "Campaign messaging",
      "Scripts",
      "Personalization",
      "Brand voice"
    ],
    faqs: [
      {
        q: "What should a small-business website say on its homepage?",
        a: "Explain who you help, what problem you solve, where you work if relevant, why customers can trust you, and the next step to take.",
      },
      {
        q: "How do I write copy that attracts customers?",
        a: "Start with a specific audience and need, explain your offer in plain language, support claims with proof, and use one clear call to action.",
      },
      {
        q: "What is a brand voice?",
        a: "Brand voice is the consistent way a business sounds in its writing. It should fit the company's values, audience, and service—not imitate a trend.",
      },
      {
        q: "Can AI write my website and email copy?",
        a: "AI can draft and revise copy using your approved facts and brand guidance. A person should verify claims, pricing, terms, and any personal details before publication.",
      },
      {
        q: "How long should a landing page be?",
        a: "Long enough to answer the audience's key questions and support the decision. Remove sections that repeat information or do not help the reader act.",
      }
    ],
    work: [
      {
        id: "p1",
        title: "Homepage Message Refresh",
        detail: "sample before-and-after hero, service summary, proof points, and CTA for a fictional home service company. (Sample concept.)",
      },
      {
        id: "p2",
        title: "Three-Email Welcome Sequence",
        detail: "sample welcome, helpful advice, and next-step emails with clear purpose and consent-conscious language. (Sample concept.)",
      },
      {
        id: "p3",
        title: "Service Page Copy Set",
        detail: "sample service description, benefits, process, FAQs, and booking CTA. (Sample concept.)",
      }
    ],
    getStarted: [
      {
        title: "Share your audience, offer, and goal",
        detail: "",
      },
      {
        title: "JoJo drafts the content and explains the message choices",
        detail: "",
      },
      {
        title: "You review voice, facts, and claims before anything goes live",
        detail: "",
      }
    ],
    guide: {
      title: "Five Steps to Clearer Small-Business Website Copy",
      summary: "",
      steps: [
        "Write one sentence describing your best-fit customer.",
        "Name the problem they are trying to solve in the words they use.",
        "Explain your service, location, process, and point of difference plainly.",
        "Add proof you can verify: reviews, examples, credentials, or clear policies.",
        "Give each page one main next step and make it easy to find."
      ],
      downloadCta: "Download the free website copy planner.",
    },
  },
  shelly: {
    tagline: "Focus your marketing on the growth lever that matters now.",
    bio: "I look at marketing as a connected system. The right plan depends on the customer, the offer, what the business can deliver, and which growth opportunity deserves attention first.",
    intro: "I help connect your audience, offer, and marketing channels into a focused plan. We choose priorities based on your business goals and capacity, then test and learn instead of spreading effort everywhere.",
    specialtyLabel: "MARKETING STRATEGY & BUSINESS GROWTH",
    pageTitle: "Shelly Allen | AI Marketing Strategy and Growth Specialist",
    metaDescription: "Meet Shelly, the LeadsFlow180 marketing strategist who helps small businesses choose priorities, connect channels, and build a measurable growth plan.",
    askCta: "Ask Shelly about your business",
    ctaHelper: "Free 5-minute chat. No obligation.",
    personality: [
      "Marketing strategy",
      "Audience and positioning",
      "Channel planning",
      "Growth experiments",
      "Prioritization",
      "Mug motto: Good Strategy Better Days",
      "People Develop People on the wall",
      "Board note: More Opportunities for More People",
      "Tote: Stronger People Brighter Tomorrows"
    ],
    favoriteFood: "TBD",
    skills: [
      "Marketing strategy",
      "Positioning",
      "Customer journey planning",
      "Channel prioritization",
      "Growth experiments",
      "Performance review"
    ],
    faqs: [
      {
        q: "How do I create a marketing strategy for a small business?",
        a: "Define the business goal, best-fit audience, offer, proof, channels, budget, and measures. Choose a manageable set of actions and review results regularly.",
      },
      {
        q: "Which marketing channel should my small business use first?",
        a: "Start with where your target customers seek help and where your business can deliver useful communication consistently. Use current evidence rather than channel popularity alone.",
      },
      {
        q: "How much should a small business spend on marketing?",
        a: "There is no single correct percentage. Consider cash flow, margin, growth goals, capacity, and the cost to acquire and serve a customer; test spending in stages.",
      },
      {
        q: "What is a 90-day marketing plan?",
        a: "It is a short planning period with a defined goal, priority actions, owners, budget, and review dates. It should be adjustable as results and conditions change.",
      },
      {
        q: "How do I measure marketing results?",
        a: "Connect channel activity to qualified inquiries, sales, retention, or another business outcome. Include cost and capacity so activity is not mistaken for growth.",
      }
    ],
    work: [
      {
        id: "p1",
        title: "90-Day Growth Plan",
        detail: "sample objectives, audience, channel roles, experiments, budget assumptions, owners, and review dates. (Sample concept.)",
      },
      {
        id: "p2",
        title: "Customer Journey Map",
        detail: "fictional awareness-to-retention path with touchpoints and gaps. (Sample concept.)",
      },
      {
        id: "p3",
        title: "Channel Priority Matrix",
        detail: "sample comparison of opportunity, effort, cost, evidence, and business fit. (Sample concept.)",
      }
    ],
    getStarted: [
      {
        title: "Share your business goal, audience, offer, and current marketing",
        detail: "",
      },
      {
        title: "Shelly identifies priorities and a testable plan",
        detail: "",
      },
      {
        title: "Approve the plan, assign owners, and review results on schedule",
        detail: "",
      }
    ],
    guide: {
      title: "Build a Focused 90-Day Marketing Plan",
      summary: "",
      steps: [
        "Pick one measurable business outcome.",
        "Describe the audience and why the offer fits their need.",
        "Select two or three channels that match customer behavior and team capacity.",
        "Plan specific actions, costs, owners, and measures.",
        "Review monthly; stop, adjust, or expand based on qualified results."
      ],
      downloadCta: "Download the free 90-day marketing planner.",
    },
  },
  caleb: {
    tagline: "Help customers find clear, trustworthy answers about your business.",
    bio: "I look for the real question behind a search and help the business answer it clearly. SEO and answer-engine visibility depend on many factors, so I focus on sound foundations, useful content, and transparent measurement.",
    intro: "I review how your website, local listings, and content serve real search questions. My work focuses on technical access, useful information, local accuracy, and measurable improvements—not guaranteed rankings.",
    specialtyLabel: "SEARCH, ANSWER ENGINE & AI VISIBILITY",
    pageTitle: "Caleb Whitaker | SEO, AEO and GEO Specialist",
    metaDescription: "Meet Caleb, the LeadsFlow180 search specialist who helps improve technical SEO, local visibility, helpful content, and eligibility to be understood by answer and AI search systems.",
    askCta: "Ask Caleb about your business",
    ctaHelper: "Free 5-minute chat. No obligation.",
    personality: [
      "Technical SEO reviews",
      "Local search foundations",
      "Search-intent research",
      "AEO and GEO content",
      "Measurement and reporting",
      "Search Strategy board: Content, Authority, Visibility → Growth",
      "Mug motto: Good Search Better Business",
      "Poster: SEARCH / AI VISIBILITY / REAL GROWTH",
      "People Process Progress pen cup",
      "Guitar beside the desk",
      "Sci-fi stack: Dune, Project Hail Mary, The Expanse"
    ],
    favoriteFood: "TBD",
    skills: [
      "Technical SEO",
      "Local SEO",
      "Search intent",
      "AEO/GEO content planning",
      "On-page audits",
      "Search reporting"
    ],
    faqs: [
      {
        q: "What is the difference between SEO, AEO, and GEO?",
        a: "SEO helps content be discovered and understood in search. AEO focuses on clear answers to questions. GEO is a newer term for improving how content may be represented in generative or AI search experiences; practices and systems continue to change.",
      },
      {
        q: "How can a small business improve local SEO?",
        a: "Keep business details accurate, create helpful pages for real services and locations, earn genuine customer reviews, make the website easy to use, and monitor relevant search and call outcomes.",
      },
      {
        q: "How do I get my business into AI search results?",
        a: "There is no guaranteed placement method. Make accurate business information and useful, well-structured content available on accessible pages, use trustworthy sources and clear expertise signals, and monitor how platforms represent you.",
      },
      {
        q: "What should a local service business include on its website?",
        a: "Explain each service, who it helps, where it is offered, what the process involves, how to request service, and what proof supports the business's claims.",
      },
      {
        q: "How long does SEO take to work?",
        a: "Timing varies by competition, site condition, authority, content, and search system changes. Track improvements over time; no responsible specialist can promise a specific ranking or date.",
      }
    ],
    work: [
      {
        id: "p1",
        title: "Local Search Visibility Audit",
        detail: "sample audit covering crawl/index checks, business details, service pages, internal links, and measurement. (Sample concept.)",
      },
      {
        id: "p2",
        title: "Customer Question Content Map",
        detail: "sample search-question map grouped by intent and matched to useful page types. (Sample concept.)",
      },
      {
        id: "p3",
        title: "Before-and-After Service Page Structure",
        detail: "illustrative page outline with headings, service area, process, proof, and concise answers; no ranking claims. (Sample concept.)",
      }
    ],
    getStarted: [
      {
        title: "Share your website, service area, and customer goals",
        detail: "",
      },
      {
        title: "Caleb audits the search foundations and customer questions",
        detail: "",
      },
      {
        title: "Review prioritized fixes and a measurement plan",
        detail: "",
      }
    ],
    guide: {
      title: "Local SEO and AEO Starter Checklist for Small Businesses",
      summary: "",
      steps: [
        "Make your name, address/service area, phone, hours, and services consistent.",
        "Create a useful page for each important service; include process, location, proof, and next step.",
        "Answer genuine customer questions directly, with enough context to be trustworthy.",
        "Check that important pages can be crawled, load well, and work on mobile.",
        "Measure calls, forms, qualified leads, and search visibility; rankings alone do not equal revenue."
      ],
      downloadCta: "Download the free Local SEO and AEO checklist.",
    },
  },
  leila: {
    tagline: "Design that helps people see what matters first.",
    bio: "Good design helps people understand and act. I balance visual appeal with hierarchy, accessibility, brand fit, and the real needs of the people using the page or graphic.",
    intro: "I turn business goals into clear visual experiences. I consider hierarchy, brand, accessibility, and the user's next step so design looks purposeful and works in context.",
    specialtyLabel: "PRODUCT DESIGN & VISUAL COMMUNICATION",
    pageTitle: "Leila Patel | AI Product and Graphic Designer",
    metaDescription: "Meet Leila, the LeadsFlow180 designer who helps make websites, interfaces, graphics, and marketing materials clear, useful, and consistent with a brand.",
    askCta: "Ask Leila about your business",
    ctaHelper: "Free 5-minute chat. No obligation.",
    personality: [
      "Visual identity",
      "Web and interface design",
      "Marketing graphics",
      "Layout and hierarchy",
      "Design systems",
      "Fabric swatches and sketchbook on the desk",
      "Desk stack: The Art of Everyday Things, Creative Spaces",
      "Architectural prints on the wall"
    ],
    favoriteFood: "TBD",
    skills: [
      "Graphic design",
      "UI/UX design",
      "Web layout",
      "Visual systems",
      "Brand consistency",
      "Accessibility-aware design"
    ],
    faqs: [
      {
        q: "How can graphic design help a small business attract customers?",
        a: "Clear graphics help a business communicate its offer, look consistent, and make the next step easy to see. Design supports a strong offer; it cannot guarantee customer response by itself.",
      },
      {
        q: "What makes a good website design?",
        a: "A good website is easy to understand, navigate, and use on mobile. It presents relevant information in a clear order and supports the visitor's main task.",
      },
      {
        q: "How do I make a flyer look professional?",
        a: "Use one main message, readable type, consistent brand colors, strong contrast, accurate details, and a clear contact or response step. Leave enough space for the content to breathe.",
      },
      {
        q: "What is visual hierarchy in design?",
        a: "Visual hierarchy guides attention through size, placement, contrast, spacing, and typography so the viewer can tell what matters first.",
      },
      {
        q: "Can you redesign my existing logo or website?",
        a: "A designer can review the current work, understand what must stay, and propose improvements. Scope and deliverables should be agreed before design begins.",
      }
    ],
    work: [
      {
        id: "p1",
        title: "Service Business Brand Starter",
        detail: "sample color, type, logo usage, and graphic direction for a fictional local company. (Sample concept.)",
      },
      {
        id: "p2",
        title: "Landing Page Wireframe to Visual Design",
        detail: "sample page showing hierarchy, trust elements, and a clear CTA. (Sample concept.)",
      },
      {
        id: "p3",
        title: "Campaign Graphic Set",
        detail: "three coordinated social/email graphics with accessible text contrast and platform crops. (Sample concept.)",
      }
    ],
    getStarted: [
      {
        title: "Share the audience, goal, brand assets, and examples you like",
        detail: "",
      },
      {
        title: "Leila proposes a visual direction or layout",
        detail: "",
      },
      {
        title: "Review a draft and approve refinements before final files are prepared",
        detail: "",
      }
    ],
    guide: {
      title: "Make a Small-Business Graphic Easier to Notice and Understand",
      summary: "",
      steps: [
        "Choose one audience and one message for the graphic.",
        "Make the main benefit or event the strongest visual element.",
        "Use readable type and high contrast, including on a phone screen.",
        "Add only the details people need to act; verify dates and contact information.",
        "Test the design at its actual size and include alt text when publishing online."
      ],
      downloadCta: "Download the free graphic design checklist.",
    },
  },
  niki: {
    tagline: "Make the first seconds count—and give viewers a reason to stay.",
    bio: "I think in images, movement, and moments. I help find the visual approach that makes a message feel memorable while keeping the story clear, accurate, and right for the audience.",
    intro: "I help shape business ideas into visual stories, from short social videos to explainers and commercials. I plan the opening, pacing, imagery, sound, and message so every creative choice supports the audience and the goal.",
    specialtyLabel: "VIDEO DESIGN & VISUAL STORYTELLING",
    pageTitle: "Niki Kalogerakis | AI Video Design Specialist",
    metaDescription: "Meet Niki, the LeadsFlow180 video designer who helps small businesses plan engaging videos, commercials, explainers, and social content with a clear audience and message.",
    askCta: "Ask Niki about your video",
    ctaHelper: "Free 5-minute chat. No obligation.",
    personality: [
      "Video concepts and storyboards",
      "Short-form video",
      "Explainers and commercials",
      "Visual pacing",
      "Creative collaboration",
      "Mug motto: Good Frames Brighter Days",
      "Video timeline on the monitor",
      "Volleyball and camera on the cabinet",
      "Cooking book on the desk"
    ],
    favoriteFood: "TBD",
    skills: [
      "Video concepts",
      "Storyboarding",
      "Short-form content",
      "Commercials",
      "Explainer video planning",
      "Visual direction",
      "Accessibility-aware captions"
    ],
    faqs: [
      {
        q: "How do I make a business video that gets attention?",
        a: "Open with a relevant visual or question, make the audience and benefit clear, keep the story focused, use captions, and end with one useful next step. Attention cannot be guaranteed.",
      },
      {
        q: "How long should a social media video be?",
        a: "Use the time needed to deliver one clear idea and check the platform's current format limits. A shorter video is not automatically better if it leaves out needed context.",
      },
      {
        q: "What should a 30-second commercial include?",
        a: "A clear opening, the customer need, what the business offers, a credible reason to trust it, and one direct call to action.",
      },
      {
        q: "Do I need professional equipment to make a marketing video?",
        a: "Not always. Clear audio, good lighting, a stable frame, and a focused message often matter more than expensive equipment. Production needs depend on the use and brand.",
      },
      {
        q: "How do I plan an explainer video?",
        a: "Define the audience and learning goal, write a concise script, match visuals to each point, add captions, and test whether viewers understand the intended takeaway.",
      }
    ],
    work: [
      {
        id: "p1",
        title: "30-Second Home Service Commercial",
        detail: "sample storyboard with a strong opening, problem, service proof, and clear booking action. (Sample concept.)",
      },
      {
        id: "p2",
        title: "Social Video Series",
        detail: "three short-video concepts showing a useful tip, behind-the-scenes process, and customer question. (Sample concept.)",
      },
      {
        id: "p3",
        title: "Explainer Video Treatment",
        detail: "sample script, shot list, motion notes, captions, and sound plan for a fictional product. (Sample concept.)",
      }
    ],
    getStarted: [
      {
        title: "Tell Niki the audience, message, platform, and desired action",
        detail: "",
      },
      {
        title: "Niki creates a concept, storyboard, or production plan",
        detail: "",
      },
      {
        title: "Review the script and visuals before production begins",
        detail: "",
      }
    ],
    guide: {
      title: "Design a Business Video That Holds Attention",
      summary: "",
      steps: [
        "Choose one viewer and one outcome for the video.",
        "Put the most relevant moment, question, or benefit in the opening.",
        "Use each shot to explain, prove, or advance the message.",
        "Keep spoken lines concise; add accurate captions and readable on-screen text.",
        "End with one clear action and check the finished video on a phone with sound off."
      ],
      downloadCta: "Download the free video planning and storyboard worksheet.",
    },
  },
  jordan: {
    tagline: "Better sales conversations start by understanding the real need.",
    bio: "I focus on the customer's problem and the business's ability to solve it. A good sales process helps both sides decide whether there is a fit and what should happen next.",
    intro: "I help you prepare for customer conversations, ask better questions, and identify a practical next step. The goal is a good-fit customer and a clear decision—not pressure for its own sake.",
    specialtyLabel: "SALES CONVERSATIONS & BUSINESS DEVELOPMENT",
    pageTitle: "Jordan Brooks | AI Sales and Business Development Coach",
    metaDescription: "Meet Jordan, the LeadsFlow180 AI sales specialist who helps small businesses qualify leads, prepare conversations, and create a clear follow-up process.",
    askCta: "Ask Jordan about your business",
    ctaHelper: "Free 5-minute chat. No obligation.",
    personality: [
      "Lead qualification",
      "Discovery questions",
      "Sales scripts",
      "Objection preparation",
      "Follow-up planning",
      "Sales Pipeline board on the monitor",
      "Q4 Sales Pipeline whiteboard",
      "Tumbler: Better Conversations Bigger Opportunities",
      "Shelf stack: The Mamba Mentality, Shoe Dog, Atomic Habits",
      "Board quote: Discipline Creates Opportunity"
    ],
    favoriteFood: "TBD",
    skills: [
      "Lead qualification",
      "Discovery calls",
      "Sales enablement",
      "Follow-up systems",
      "Objection handling",
      "Pipeline review"
    ],
    faqs: [
      {
        q: "How do I qualify a sales lead?",
        a: "Confirm the person's need, fit with your service, timing, decision process, and willingness to take a next step. Avoid treating interest alone as a guaranteed sale.",
      },
      {
        q: "What questions should I ask on a discovery call?",
        a: "Ask what prompted the conversation, what outcome they want, what they have tried, what constraints matter, and how they will evaluate a solution.",
      },
      {
        q: "How often should I follow up with a prospect?",
        a: "Set a reasonable cadence based on the conversation and channel permissions. Make each follow-up useful, respect requests to stop, and do not send messages just to fill a quota.",
      },
      {
        q: "How do I handle \"I need to think about it\"?",
        a: "Ask what information would help them decide and agree on whether and when to reconnect. Do not pressure someone who is not ready.",
      },
      {
        q: "What makes a sales script effective?",
        a: "It gives structure and key questions while leaving room for a natural conversation. It should not force claims or make every prospect sound the same.",
      }
    ],
    work: [
      {
        id: "p1",
        title: "Discovery Call Playbook",
        detail: "sample opening, needs questions, fit checks, and close for a fictional service business. (Sample concept.)",
      },
      {
        id: "p2",
        title: "Lead Follow-Up Sequence",
        detail: "sample call, email, and reminder cadence with opt-out and consent considerations. (Sample concept.)",
      },
      {
        id: "p3",
        title: "Sales Pipeline Review",
        detail: "mock pipeline with stage definitions, next actions, and sample coaching notes; no invented results. (Sample concept.)",
      }
    ],
    getStarted: [
      {
        title: "Explain your offer and current sales challenge",
        detail: "",
      },
      {
        title: "Jordan maps the conversation and follow-up needs",
        detail: "",
      },
      {
        title: "Practice the approach, then review what customers actually say",
        detail: "",
      }
    ],
    guide: {
      title: "The 10-Minute Discovery Call Planner",
      summary: "",
      steps: [
        "State the purpose and ask permission to learn about the customer's needs.",
        "Ask open questions about the problem, impact, and desired outcome.",
        "Confirm fit, timeline, decision factors, and any constraints.",
        "Summarize what you heard and check that you understood correctly.",
        "Offer a relevant next step—or say clearly when the fit is not right."
      ],
      downloadCta: "Download the free discovery call planner.",
    },
  },
  ali: {
    tagline: "Practical software built around clear requirements.",
    bio: "Reliable software starts with clear requirements. I ask what users need to accomplish, then build the simplest maintainable solution that meets those needs and can be tested.",
    intro: "I help turn a defined business need into a working web experience. I focus on understanding requirements, choosing a maintainable approach, and making sure the finished feature is tested against the goal.",
    specialtyLabel: "WEB APPLICATIONS & SOFTWARE DEVELOPMENT",
    pageTitle: "Ali Khan | AI Full-Stack Web Developer",
    metaDescription: "Meet Ali, the LeadsFlow180 full-stack engineering specialist who helps plan and build reliable web applications, websites, and software features.",
    askCta: "Ask Ali about your business",
    ctaHelper: "Free 5-minute chat. No obligation.",
    personality: [
      "Front-end and back-end development",
      "Web applications",
      "API integration",
      "Requirements clarification",
      "Testing and maintenance",
      "Whiteboard: Build Smarter Together — Scalable, Reliable, Human-Centered, Big Opportunities",
      "Sci-fi stack: Dune, Project Hail Mary, The Expanse",
      "Family photo on the desk",
      "People Process Progress on the wall"
    ],
    favoriteFood: "TBD",
    skills: [
      "Full-stack development",
      "Front-end interfaces",
      "Back-end services",
      "API integration",
      "Data modeling",
      "Debugging and testing"
    ],
    faqs: [
      {
        q: "What is full-stack web development?",
        a: "Full-stack development covers the user-facing parts of a web product and the server, data, and integrations that support them.",
      },
      {
        q: "How much does it cost to build a web application?",
        a: "Cost depends on scope, integrations, security, design, and ongoing support. Define the first useful version and request a scoped estimate before development.",
      },
      {
        q: "How long does it take to build a website or app?",
        a: "Timelines vary with requirements, content, design, integrations, and review. A small, clear first release is usually easier to estimate than a broad feature list.",
      },
      {
        q: "What should I prepare before hiring a developer?",
        a: "Explain the users, problem, key tasks, required data, integrations, examples, budget range, and what success should look like.",
      },
      {
        q: "How do I keep custom software maintainable?",
        a: "Use clear requirements, understandable code, version control, testing, documentation, secure access, and a plan for updates and ownership.",
      }
    ],
    work: [
      {
        id: "p1",
        title: "Small-Business Booking Web App",
        detail: "functional demo concept with service selection, availability, and confirmation states; use sample data only. (Sample concept.)",
      },
      {
        id: "p2",
        title: "Customer Portal Dashboard",
        detail: "sample responsive interface for appointments, documents, and account updates. (Sample concept.)",
      },
      {
        id: "p3",
        title: "API-Connected Lead Intake",
        detail: "demo form-to-CRM flow with validation, error states, and privacy-conscious data handling. (Sample concept.)",
      }
    ],
    getStarted: [
      {
        title: "Explain the user problem and required outcome",
        detail: "",
      },
      {
        title: "Ali clarifies scope and proposes a technical approach",
        detail: "",
      },
      {
        title: "Review milestones, test criteria, and ownership before building",
        detail: "",
      }
    ],
    guide: {
      title: "Plan Your First Useful Web App Version",
      summary: "",
      steps: [
        "Name the user and the task they need to complete.",
        "List only the features required for that task.",
        "Identify data, permissions, integrations, and failure cases.",
        "Sketch the main screens and define acceptance criteria.",
        "Plan testing, hosting, maintenance, and who owns the code and accounts."
      ],
      downloadCta: "Download the free web app planning brief.",
    },
  },
  carlos: {
    tagline: "A WordPress site that works well behind the scenes, too.",
    bio: "I look under the hood before recommending changes. A WordPress site should be stable, useful, and manageable for the business—not weighed down by unnecessary plugins or quick fixes that create future problems.",
    intro: "I help small businesses improve WordPress websites, from fixing practical issues to building service pages and improving performance. I check the foundation before adding more tools or visual polish.",
    specialtyLabel: "WORDPRESS WEBSITES & SITE IMPROVEMENT",
    pageTitle: "Carlos Rivera | AI WordPress Website Specialist",
    metaDescription: "Meet Carlos, the LeadsFlow180 WordPress specialist who helps build, repair, improve, and maintain practical WordPress websites.",
    askCta: "Ask Carlos about your website",
    ctaHelper: "Free 5-minute chat. No obligation.",
    personality: [
      "WordPress troubleshooting",
      "Page building",
      "Performance review",
      "Plugin and theme checks",
      "Site maintenance",
      "Mug motto: Good Sites Build Business",
      "Build Optimize Grow on the wall",
      "WordPress dashboard on the monitor",
      "Dominoes box on the desk"
    ],
    favoriteFood: "TBD",
    skills: [
      "WordPress setup and maintenance",
      "Theme and plugin review",
      "Website repair",
      "Page design",
      "Performance basics",
      "Content structure"
    ],
    faqs: [
      {
        q: "How much does a WordPress website cost?",
        a: "Price depends on design, content, page count, integrations, hosting, and maintenance. Agree on scope, ownership, and ongoing costs before work begins.",
      },
      {
        q: "Why is my WordPress website slow?",
        a: "Causes can include hosting limits, large images, inefficient plugins or themes, scripts, or configuration. Measure first, then fix the largest verified problems.",
      },
      {
        q: "How often should I update WordPress plugins?",
        a: "Keep WordPress, themes, and plugins maintained with backups and a tested update process. Timing depends on security notices and compatibility; do not ignore critical updates.",
      },
      {
        q: "How do I secure a WordPress website?",
        a: "Use supported software, strong unique credentials, least-privilege accounts, backups, HTTPS, reputable hosting, and a recovery plan. No single plugin guarantees security.",
      },
      {
        q: "Do I need a plugin for every website feature?",
        a: "No. Each plugin adds maintenance and possible compatibility or security concerns. Use a plugin when it is maintained, necessary, and appropriate for the site.",
      }
    ],
    work: [
      {
        id: "p1",
        title: "Local Contractor Website Refresh",
        detail: "sample home, service, about, and contact pages for a fictional business. (Sample concept.)",
      },
      {
        id: "p2",
        title: "WordPress Speed and Stability Report",
        detail: "sample findings with prioritized fixes and measurement notes; no invented speed scores. (Sample concept.)",
      },
      {
        id: "p3",
        title: "Service Area Landing Page Set",
        detail: "three sample page layouts with unique, useful information rather than duplicate city-name pages. (Sample concept.)",
      }
    ],
    getStarted: [
      {
        title: "Share your site address and the issue or goal",
        detail: "",
      },
      {
        title: "Carlos reviews the relevant setup and scope",
        detail: "",
      },
      {
        title: "Approve a fix or improvement plan with backup and testing steps",
        detail: "",
      }
    ],
    guide: {
      title: "WordPress Website Health Check for Owners",
      summary: "",
      steps: [
        "Confirm hosting, domain, admin access, and renewal ownership.",
        "Check that WordPress, themes, and plugins are supported and maintained.",
        "Confirm recent backups can be restored and access is limited to the right people.",
        "Test key pages and forms on mobile; remove tools that are no longer needed.",
        "Record baseline performance and resolve the highest-impact issue first."
      ],
      downloadCta: "Download the free WordPress site health checklist.",
    },
  },
  omar: {
    tagline: "Build a safer, more reliable foundation for your technology.",
    bio: "Reliability comes from knowing what is running, what can fail, and how to recover. I take a measured approach: assess the environment, explain risk in plain language, and recommend changes with a rollback or recovery plan.",
    intro: "I help assess the infrastructure behind your business systems. We look at access, backups, updates, monitoring, and recovery so you can understand practical risks and plan responsible improvements.",
    specialtyLabel: "CLOUD INFRASTRUCTURE & SECURITY",
    pageTitle: "Omar Haddad | AI Cloud Infrastructure and Security Specialist",
    metaDescription: "Meet Omar, the LeadsFlow180 infrastructure specialist who helps review cloud setup, reliability, access controls, backups, and security practices.",
    askCta: "Ask Omar about your infrastructure",
    ctaHelper: "Free 5-minute chat. No obligation.",
    personality: [
      "Cloud and server planning",
      "Deployment reliability",
      "Access control review",
      "Backup and recovery planning",
      "Security posture reporting"
    ],
    favoriteFood: "TBD",
    skills: [
      "Cloud infrastructure",
      "DevOps",
      "Network administration",
      "Access controls",
      "Backup and recovery",
      "Security reviews"
    ],
    faqs: [
      {
        q: "What is a cloud security assessment?",
        a: "It is a structured review of cloud assets, identities, access, configuration, updates, monitoring, and recovery practices to identify risks and prioritize fixes.",
      },
      {
        q: "How do I protect a small business server?",
        a: "Keep software updated, restrict access, use unique credentials and multifactor authentication, monitor logs, maintain tested backups, and document how to recover.",
      },
      {
        q: "How often should I back up my business data?",
        a: "Set frequency based on how much data you can afford to lose and how quickly you need recovery. Test restores regularly; an untested backup may not be usable.",
      },
      {
        q: "What is the difference between a backup and disaster recovery?",
        a: "A backup is a copy of data. Disaster recovery is the broader plan to restore systems, access, and business operations after an incident.",
      },
      {
        q: "How do I know if my cloud setup is secure?",
        a: "Review identity permissions, exposed services, software updates, encryption, logging, backup and restore tests, and incident procedures. Security is ongoing and cannot be guaranteed by one scan.",
      }
    ],
    work: [
      {
        id: "p1",
        title: "Cloud Security Posture Snapshot",
        detail: "illustrative report with asset inventory, access review, patch status, backup evidence, and prioritized findings. Do not expose real IPs, credentials, or vulnerabilities. (Sample concept.)",
      },
      {
        id: "p2",
        title: "Backup and Recovery Runbook",
        detail: "sample recovery objectives, backup schedule, restore test, owners, and escalation steps. (Sample concept.)",
      },
      {
        id: "p3",
        title: "Deployment and Rollback Diagram",
        detail: "demo architecture showing staging, production, monitoring, and safe rollback path. (Sample concept.)",
      }
    ],
    getStarted: [
      {
        title: "Describe your systems and main concern; do not send passwords in chat",
        detail: "",
      },
      {
        title: "Omar scopes a safe review and evidence needed",
        detail: "",
      },
      {
        title: "Review prioritized findings and approve a remediation and recovery plan",
        detail: "",
      }
    ],
    guide: {
      title: "Small-Business Cybersecurity Foundation Checklist",
      summary: "",
      steps: [
        "List important accounts, systems, devices, and who owns them.",
        "Turn on multifactor authentication and remove unused access.",
        "Patch supported systems and protect admin accounts.",
        "Back up critical information and test restoring it.",
        "Write down who to contact and what to do if an account or system is compromised."
      ],
      downloadCta: "Download the free cybersecurity foundation checklist.",
    },
  },
  nova: {
    tagline: "Use AI where it solves a real business problem.",
    bio: "I'm curious about new technology, but I test it against the job it needs to do. A useful AI system should improve a workflow in a measurable way while fitting the business's cost, privacy, and review requirements.",
    intro: "I help evaluate AI systems and automation with practical tests. We compare quality, reliability, cost, speed, and risks so new technology earns its place in your workflow instead of adding complexity.",
    specialtyLabel: "AI SYSTEMS & BUSINESS AUTOMATION",
    pageTitle: "Nova Chen | AI Automation and Systems Architect",
    metaDescription: "Meet Nova, the LeadsFlow180 AI systems specialist who evaluates automation and AI tools against business needs, quality, reliability, latency, and cost.",
    askCta: "Ask Nova about AI for your business",
    ctaHelper: "Free 5-minute chat. No obligation.",
    personality: [
      "AI tool evaluation",
      "Workflow automation",
      "Model comparisons",
      "Cost and latency reviews",
      "Pilot planning",
      "AI Automation board: Data → LLM → Agents → Tools / Workflows / Outcomes",
      "Shelf sign: Build Automate Scale",
      "Katana and anime art on the shelf",
      "Desk stack: Clean Architecture, Designing LLM Systems, AI Automation Playbook"
    ],
    favoriteFood: "TBD",
    skills: [
      "AI system design",
      "Automation planning",
      "Model evaluation",
      "Workflow mapping",
      "Cost and latency analysis",
      "Human-in-the-loop design"
    ],
    faqs: [
      {
        q: "How can a small business use AI automation?",
        a: "Start with a repeated, well-defined task such as sorting inquiries or drafting routine responses. Set human review, privacy, error handling, and a way to measure whether the workflow improves.",
      },
      {
        q: "Which AI tool is best for my business?",
        a: "The best fit depends on the task, data, quality needs, integrations, cost, privacy, and support. Test options with representative examples before committing.",
      },
      {
        q: "How much does AI automation cost?",
        a: "Costs may include software, usage, setup, integration, monitoring, and human review. Estimate the full workflow cost, not only the model price.",
      },
      {
        q: "Can AI make business decisions without human review?",
        a: "Some low-risk tasks may be automated with safeguards. High-impact, sensitive, financial, or customer-specific decisions should have appropriate human oversight.",
      },
      {
        q: "How do I know if an AI pilot is working?",
        a: "Set a baseline and success measures before launch, test representative cases, track errors and review time, and compare total cost and quality with the current process.",
      }
    ],
    work: [
      {
        id: "p1",
        title: "AI Vendor Evaluation Scorecard",
        detail: "sample comparison across task quality, privacy, integration, reliability, cost, and human review needs. (Sample concept.)",
      },
      {
        id: "p2",
        title: "Automated Lead Intake Workflow",
        detail: "demo flow with validation, consent, error handling, and human handoff. (Sample concept.)",
      },
      {
        id: "p3",
        title: "AI Pilot Results Brief",
        detail: "fictional test plan and reporting template; clearly separate measured results from hypotheses. (Sample concept.)",
      }
    ],
    getStarted: [
      {
        title: "Describe the task, volume, and current process",
        detail: "",
      },
      {
        title: "Nova maps risks and test criteria",
        detail: "",
      },
      {
        title: "Run a limited pilot and review measured quality, cost, and time saved",
        detail: "",
      }
    ],
    guide: {
      title: "A Small-Business AI Pilot Scorecard",
      summary: "",
      steps: [
        "State the task and the problem it causes today.",
        "Define quality, speed, cost, and safety measures before testing.",
        "Test normal cases, edge cases, and failure cases using non-sensitive data where possible.",
        "Record human review time, errors, and integration effort.",
        "Continue only if the full workflow beats the current approach and risks are manageable."
      ],
      downloadCta: "Download the free AI pilot scorecard.",
    },
  },
  amir: {
    tagline: "Know what the numbers mean—and what to do next.",
    bio: "I want every number to have a definition and a purpose. A useful report makes it clear what changed, how confident we are in the data, who owns the next step, and when we will review it.",
    intro: "I help turn business activity into useful operating information. We define measures clearly, review the source data, and connect performance changes to decisions and owners.",
    specialtyLabel: "BUSINESS OPERATIONS & KPI REPORTING",
    pageTitle: "Amir Rahman | AI Operations and KPI Reporting Specialist",
    metaDescription: "Meet Amir, the LeadsFlow180 operations specialist who helps define business KPIs, build clear dashboards, and connect numbers to owners and next steps.",
    askCta: "Ask Amir about your business",
    ctaHelper: "Free 5-minute chat. No obligation.",
    personality: [
      "KPI definitions",
      "Weekly reporting",
      "Operations dashboards",
      "Data quality checks",
      "Owner and action tracking",
      "Operations Overview dashboard on the monitor",
      "Whiteboard: Operations KPIs + Create Lead → Qualify → Process → Report",
      "Pen cup: Good Data Better People",
      "Systems People Progress on the wall",
      "Desk stack: Measure What Matters, The Lean Startup, Atomic Habits"
    ],
    favoriteFood: "TBD",
    skills: [
      "KPI design",
      "Dashboard planning",
      "Operations reporting",
      "Process tracking",
      "Data validation",
      "Action ownership"
    ],
    faqs: [
      {
        q: "What KPIs should a small business track?",
        a: "Track measures tied to current goals, such as qualified leads, conversion, response time, repeat business, delivery capacity, margin, and cash flow. The right set depends on the business model.",
      },
      {
        q: "How do I build a KPI dashboard?",
        a: "Define each metric, identify its data source and owner, set a useful review period, show trend and target where appropriate, and highlight actions—not just numbers.",
      },
      {
        q: "What is the difference between a KPI and a metric?",
        a: "A metric measures activity or an outcome. A KPI is a measure selected because it is important to a specific business goal.",
      },
      {
        q: "Why do my reports show different numbers?",
        a: "Common causes include different date ranges, duplicate records, inconsistent definitions, delayed updates, or different source systems. Reconcile definitions and sources before acting.",
      },
      {
        q: "How often should a small business review KPIs?",
        a: "Review operational measures often enough to act on them—weekly for many workflows—and financial or strategic measures on an appropriate monthly or quarterly schedule.",
      }
    ],
    work: [
      {
        id: "p1",
        title: "Small-Business KPI Scorecard",
        detail: "mock weekly view of leads, bookings, response time, completed jobs, and cash collected, with definitions and data notes. (Sample concept.)",
      },
      {
        id: "p2",
        title: "Operations Health Report",
        detail: "sample report showing targets, actuals, trend, variance, likely cause, and next action; clearly label sample data. (Sample concept.)",
      },
      {
        id: "p3",
        title: "Lead-to-Cash Process Map",
        detail: "fictional workflow showing handoffs, timing measures, and where data should be recorded. (Sample concept.)",
      }
    ],
    getStarted: [
      {
        title: "Choose the business outcome you want to improve",
        detail: "",
      },
      {
        title: "Amir defines the measures, sources, and review rhythm",
        detail: "",
      },
      {
        title: "Review a sample report and assign the actions it reveals",
        detail: "",
      }
    ],
    guide: {
      title: "The Small-Business KPI Starter Kit",
      summary: "",
      steps: [
        "Choose one business goal for the next 90 days.",
        "Select a small set of measures that show progress and quality.",
        "Write a plain-language definition and source for each measure.",
        "Name the person responsible for data quality and review.",
        "Discuss the trend, cause, and next action—not just whether a target was hit."
      ],
      downloadCta: "Download the free KPI dashboard planning sheet.",
    },
  },
  dante: {
    tagline: "See the financial picture before you make the next move.",
    bio: "Good financial planning starts by making assumptions visible. I help compare options and understand cash timing, costs, risks, and potential upside so business owners can make informed decisions.",
    intro: "I help organize business financial information into clear budgets, cash-flow views, and planning scenarios. My work supports better questions and decisions; it does not replace a licensed accountant, tax professional, or financial adviser.",
    specialtyLabel: "FINANCE, CASH FLOW & BUSINESS PLANNING",
    pageTitle: "Dante' Price | AI Finance and Business Planning Specialist",
    metaDescription: "Meet Dante', the LeadsFlow180 finance specialist who helps organize budgets, cash-flow views, forecasts, and decision scenarios for small businesses.",
    askCta: "Ask Dante' about your business",
    ctaHelper: "Free 5-minute chat. No obligation.",
    personality: [
      "Budget planning",
      "Cash-flow forecasting",
      "Scenario analysis",
      "Financial reporting",
      "Assumption review",
      "Financial Overview dashboard on the monitor",
      "People Process Progress on the wall",
      "Side table: A Brighter Financial Future"
    ],
    favoriteFood: "TBD",
    skills: [
      "Budgeting",
      "Cash-flow planning",
      "Forecasting",
      "Scenario analysis",
      "Pricing support",
      "Management reporting"
    ],
    faqs: [
      {
        q: "How do I create a cash-flow forecast for a small business?",
        a: "List expected cash receipts and payments by week or month, use realistic timing, identify assumptions, and update the forecast as actuals arrive.",
      },
      {
        q: "What is the difference between profit and cash flow?",
        a: "Profit compares revenue and expenses over a period under accounting rules. Cash flow tracks when money actually enters and leaves the business; the timing can differ.",
      },
      {
        q: "How much should my business keep in an emergency fund?",
        a: "The right reserve depends on fixed costs, revenue stability, obligations, access to credit, and risk. Model several months of expenses and discuss the target with your financial professional.",
      },
      {
        q: "How do I know if I can afford to hire an employee?",
        a: "Estimate total employment cost, expected workload and revenue, cash timing, and downside scenarios. Confirm legal and tax details with qualified professionals.",
      },
      {
        q: "Can an AI finance assistant give tax or investment advice?",
        a: "AI can help organize information and explain general concepts, but tax, legal, investment, and accounting decisions should be reviewed with qualified professionals familiar with your circumstances.",
      }
    ],
    work: [
      {
        id: "p1",
        title: "13-Week Cash-Flow Forecast",
        detail: "sample template with clearly labeled fictional figures, expected receipts, obligations, and assumptions. (Sample concept.)",
      },
      {
        id: "p2",
        title: "Service Pricing and Margin Model",
        detail: "illustrative calculator showing labor, materials, overhead assumptions, and contribution margin. (Sample concept.)",
      },
      {
        id: "p3",
        title: "Growth Investment Scenario Brief",
        detail: "sample best/base/worst-case comparison for hiring or advertising, with risks and break-even assumptions. (Sample concept.)",
      }
    ],
    getStarted: [
      {
        title: "Share the business decision and relevant, non-sensitive figures",
        detail: "",
      },
      {
        title: "Dante' organizes assumptions and scenarios",
        detail: "",
      },
      {
        title: "Review the analysis with your accountant or adviser before acting where needed",
        detail: "",
      }
    ],
    guide: {
      title: "Build a Simple 13-Week Cash-Flow View",
      summary: "",
      steps: [
        "Record the starting cash balance from a verified source.",
        "Estimate receipts by the week you expect to collect them—not just invoice date.",
        "Schedule payroll, bills, taxes, debt, and other known outflows.",
        "Mark uncertain assumptions and model a conservative scenario.",
        "Update actuals weekly and investigate gaps early."
      ],
      downloadCta: "Download the free cash-flow planning worksheet.",
    },
  },
};

/** Agents whose latest office still is jpg (others ship as png). */
const OFFICE_JPG = new Set([
  "mia",
  "mark",
  "lee",
  "zenda",
  "jojo",
  "leila",
  "niki",
  "sonja",
  "omar",
]);

function officePhotoFor(agent: Agent): string {
  // Reason: prefer the extension that actually exists so tiles don't flash a broken .jpg.
  const ext = OFFICE_JPG.has(agent.id) ? "jpg" : "png";
  return `/agents/offices/${agent.id}.${ext}`;
}

/** Resolve office still URL — primary ext first, then the rest + portrait handled by callers. */
export function officePhotoCandidates(id: string): string[] {
  const primary = OFFICE_JPG.has(id) ? "jpg" : "png";
  const rest = (["jpg", "jpeg", "png", "webp"] as const).filter((e) => e !== primary);
  return [`/agents/offices/${id}.${primary}`, ...rest.map((e) => `/agents/offices/${id}.${e}`)];
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
      personality: ["Part of the FLOW floor"],
      favoriteFood: "TBD",
      faqs: [],
      work: [],
      draft: false,
    };
  }
  return {
    id,
    agent,
    officePhoto: officePhotoFor(agent),
    portraitPhoto: agent.photo,
    ...base,
    draft: false,
  };
}

export function getAllAgentProfiles() {
  return agents.map((a) => getAgentProfile(a.id)!);
}

export function agentPagePath(id: string) {
  return `/agents/${id}`;
}
