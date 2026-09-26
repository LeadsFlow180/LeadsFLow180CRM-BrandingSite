import type { ReactNode } from "react";

export type FeatureItem = {
  title: string;
  body: string;
  icon: ReactNode;
};

/** Exact icon set from the feature-set mock — lavender tile + indigo stroke. */
function Icon({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex size-11 items-center justify-center rounded-xl bg-[#ece8ff]">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-5 text-[#3b2f8a]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
    </span>
  );
}

/** Feature cards — append more entries as needed; grid stays responsive. */
export const featureSet: FeatureItem[] = [
  {
    title: "Sales pipeline",
    body: "Move deals from first touch to close with stages, tasks, and proposals in one place.",
    icon: (
      <Icon>
        <rect x="4" y="10" width="4" height="10" rx="1" />
        <rect x="10" y="4" width="4" height="16" rx="1" />
        <rect x="16" y="8" width="4" height="12" rx="1" />
      </Icon>
    ),
  },
  {
    title: "Unified inbox",
    body: "Email, SMS, and chat stay on the contact — so the next reply is never a scavenger hunt.",
    icon: (
      <Icon>
        <path d="M9 14l-4-4 4-4" />
        <path d="M5 10h9a4 4 0 010 8h-2" />
      </Icon>
    ),
  },
  {
    title: "Marketing & social",
    body: "Campaigns, funnels, and social publishing run from the same workspace you sell from.",
    icon: (
      <Icon>
        <path d="M3 11v2a1 1 0 001 1h2l5 4V6L6 10H4a1 1 0 00-1 1z" />
        <path d="M16 8.5a4.5 4.5 0 010 7M18.5 6a8 8 0 010 12" />
      </Icon>
    ),
  },
  {
    title: "Automation",
    body: "Follow-ups, tags, and hand-offs run in the background after you set the rules once.",
    icon: (
      <Icon>
        <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
      </Icon>
    ),
  },
  {
    title: "Appointments",
    body: "Booking pages and calendars create contacts automatically when someone books a call.",
    icon: (
      <Icon>
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M8 3v4M16 3v4M4 10h16" />
      </Icon>
    ),
  },
  {
    title: "Tasks & team desk",
    body: "Owners, due dates, and internal work stay attached to the deal — not a side spreadsheet.",
    icon: (
      <Icon>
        <path d="M5 7h14M5 12h14M5 17h14" />
      </Icon>
    ),
  },
  {
    title: "Dashboard & reports",
    body: "See lead sources, sales, funnels, and team activity from one clear dashboard.",
    icon: (
      <Icon>
        <path d="M4 4h7v7H4zM13 4h7v4h-7zM13 10h7v10h-7zM4 13h7v7H4z" />
      </Icon>
    ),
  },
  {
    title: "Business phone",
    body: "Track calls, send missed-call texts, and keep every follow-up connected to the contact.",
    icon: (
      <Icon>
        <path d="M6 3h4l1.5 5-2.5 1.5a11 11 0 005.5 5.5L16 12.5l5 1.5v4a2 2 0 01-2 2A16 16 0 014 5a2 2 0 012-2z" />
      </Icon>
    ),
  },
  {
    title: "Company mail",
    body: "Write, schedule, send, and organize business email across your team’s shared mailboxes.",
    icon: (
      <Icon>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 7 9-7" />
      </Icon>
    ),
  },
  {
    title: "AI teammates",
    body: "Put AI teammates to work on conversations, follow-up, research, and everyday tasks.",
    icon: (
      <Icon>
        <path d="M12 3a4 4 0 014 4v1h1a3 3 0 010 6h-1v1a4 4 0 01-8 0v-1H7a3 3 0 010-6h1V7a4 4 0 014-4z" />
        <path d="M9.5 10h.01M14.5 10h.01M9.5 14h5" />
      </Icon>
    ),
  },
  {
    title: "Partners & affiliates",
    body: "Manage referral partners, affiliates, relationships, and opportunities from one connected workspace.",
    icon: (
      <Icon>
        <path d="M9 11a3 3 0 100-6 3 3 0 000 6zM17 11a2.5 2.5 0 100-5M3 20a6 6 0 0112 0M16 14a5 5 0 015 6" />
      </Icon>
    ),
  },
  {
    title: "Email marketing",
    body: "Build, send, schedule, and track email campaigns without jumping between marketing tools.",
    icon: (
      <Icon>
        <path d="M4 6h16v12H4z" />
        <path d="M4 8l8 6 8-6" />
        <path d="M8 18l2-3M16 18l-2-3" />
      </Icon>
    ),
  },
  {
    title: "Advertising",
    body: "Manage campaigns, creative, connections, and performance across your paid advertising channels.",
    icon: (
      <Icon>
        <path d="M4 12h3l2-6 3 12 2-6h6" />
      </Icon>
    ),
  },
  {
    title: "Websites & apps",
    body: "Build and manage websites, landing pages, and apps without leaving your workspace.",
    icon: (
      <Icon>
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M3 8h18M8 21h8" />
      </Icon>
    ),
  },
  {
    title: "SEO & AI visibility",
    body: "Track rankings, local SEO, backlinks, site health, and visibility across search and AI.",
    icon: (
      <Icon>
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3M8 11h6M11 8v6" />
      </Icon>
    ),
  },
  {
    title: "Content & media",
    body: "Manage blogs, podcasts, press, and news content from one organized publishing workspace.",
    icon: (
      <Icon>
        <path d="M4 5h12a2 2 0 012 2v12H6a2 2 0 01-2-2V5z" />
        <path d="M8 9h8M8 13h6" />
      </Icon>
    ),
  },
  {
    title: "Lead capture",
    body: "Turn visitors into contacts with forms, booking pages, and connected lead capture tools.",
    icon: (
      <Icon>
        <path d="M12 3v12M8 11l4 4 4-4" />
        <path d="M5 19h14" />
      </Icon>
    ),
  },
  {
    title: "Funnels",
    body: "Build step-by-step journeys that move prospects from first click to booked customer.",
    icon: (
      <Icon>
        <path d="M4 5h16l-5 7v6l-6 2v-8L4 5z" />
      </Icon>
    ),
  },
  {
    title: "Design studio",
    body: "Create and organize graphics, videos, brand files, and marketing assets in one place.",
    icon: (
      <Icon>
        <path d="M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3z" />
      </Icon>
    ),
  },
  {
    title: "Reviews",
    body: "Request, monitor, compare, and showcase customer reviews across the platforms that matter.",
    icon: (
      <Icon>
        <path d="M12 3l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 15.9 7.2 18l.9-5.4L4.2 8.7l5.4-.8L12 3z" />
      </Icon>
    ),
  },
  {
    title: "Contacts & records",
    body: "Keep customer details, conversations, activity, and business records connected in one profile.",
    icon: (
      <Icon>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 8h6M9 12h6M9 16h4" />
      </Icon>
    ),
  },
  {
    title: "Billing & finance",
    body: "Manage invoices, sales, expenses, receipts, taxes, loans, and bookkeeping from one workspace.",
    icon: (
      <Icon>
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M3 10h18M7 14h2M12 14h2" />
      </Icon>
    ),
  },
  {
    title: "Agency workspace",
    body: "Manage client accounts, plans, AI teammates, branding, files, messages, and onboarding.",
    icon: (
      <Icon>
        <path d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-5h6v5M9 11h.01M15 11h.01" />
      </Icon>
    ),
  },
  {
    title: "Client portal",
    body: "Give clients one place for files, messages, checklists, updates, and everything they need.",
    icon: (
      <Icon>
        <path d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-5v-6H10v6H5a1 1 0 01-1-1v-9z" />
      </Icon>
    ),
  },
];
