export const links = {
  signup: "https://office.getleadsflow180.com/signup",
  login: "https://office.getleadsflow180.com/login",
  crm: "https://app.leadsflow180.com",
  office: "https://office.getleadsflow180.com",
} as const;

export const languages = [
  "English",
  "Spanish",
  "French",
  "Chinese",
  "Tagalog",
  "Vietnamese",
  "Arabic",
  "Korean",
  "Haitian Creole",
  "Russian",
] as const;

export const languageLine =
  "Our AI team can help in English, Spanish, French, Chinese, Tagalog, Vietnamese, Arabic, Korean, Haitian Creole, and Russian.";

export type Group =
  | "Leadership & Executive Operations"
  | "Growth & Client Success"
  | "Creative & Content"
  | "Engineering & Automation";

export type Agent = {
  id: string;
  name: string;
  title: string;
  skill: string;
  group: Group;
  photo: string;
};

/** Titles match the FLOW floor. Mia stays “Project Manager” per brand request. */
export const agents: Agent[] = [
  {
    id: "mia",
    name: "Mia Carter",
    title: "Project Manager & FLOW Orchestrator",
    skill: "First person you talk to. Assigns work, chairs meetings, keeps every job moving in FLOW.",
    group: "Leadership & Executive Operations",
    photo: "/agents/mia.png",
  },
  {
    id: "carlos",
    name: "Carlos Rivera",
    title: "WordPress Specialist",
    skill: "Websites and pages with Ali.",
    group: "Engineering & Automation",
    photo: "/agents/carlos.png",
  },
  {
    id: "jay",
    name: "Jay Collins",
    title: "Email Marketing, Lifecycle, Deliverability & Outbound",
    skill: "Nurture sequences and campaigns.",
    group: "Growth & Client Success",
    photo: "/agents/jay.png",
  },
  {
    id: "mark",
    name: "Mark Bennett",
    title: "Director of Market & Prospect Intelligence",
    skill: "Research and prospecting so Jordan has real leads.",
    group: "Growth & Client Success",
    photo: "/agents/mark.png",
  },
  {
    id: "lee",
    name: "Lee Park",
    title: "Paid Media Specialist",
    skill: "Paid campaigns. Spend stays under approval.",
    group: "Growth & Client Success",
    photo: "/agents/lee.png",
  },
  {
    id: "zenda",
    name: "Zenda Okafor",
    title: "Social Media & Community Content",
    skill: "Drafts and schedules.",
    group: "Growth & Client Success",
    photo: "/agents/zenda.png",
  },
  {
    id: "jojo",
    name: "JoJo Alvarez",
    title: "Content, Copywriting & Personalization",
    skill: "Content across channels so the story stays consistent.",
    group: "Creative & Content",
    photo: "/agents/jojo.png",
  },
  {
    id: "shelly",
    name: "Shelly Allen",
    title: "Director of Marketing Strategy & Growth",
    skill: "Week-level campaign planning.",
    group: "Growth & Client Success",
    photo: "/agents/shelly.png",
  },
  {
    id: "caleb",
    name: "Caleb Whitaker",
    title: "Director of Search & AI Visibility",
    skill: "Search and AI visibility. Not a single fake SEO score.",
    group: "Engineering & Automation",
    photo: "/agents/caleb.png",
  },
  {
    id: "leila",
    name: "Leila Patel",
    title: "Lead Product & Visual Designer",
    skill: "Brand graphics and slides. Lands in Done for approval.",
    group: "Creative & Content",
    photo: "/agents/leila.png",
  },
  {
    id: "niki",
    name: "Niki Kalogerakis",
    title: "Video Designer",
    skill: "Brand video / motion for campaigns.",
    group: "Creative & Content",
    photo: "/agents/niki.png",
  },
  {
    id: "jordan",
    name: "Jordan Brooks",
    title: "Director of Sales & Business Development",
    skill: "Pipeline, funnels, lead capture, proposals, partners, affiliates. First touch to close.",
    group: "Growth & Client Success",
    photo: "/agents/jordan.png",
  },
  {
    id: "ali",
    name: "Ali Khan",
    title: "Lead Full Stack Engineer",
    skill: "Websites and pages with Carlos.",
    group: "Engineering & Automation",
    photo: "/agents/ali.png",
  },
  {
    id: "ava",
    name: "Ava Morgan",
    title: "Director of Media",
    skill: "On-brand website and campaign copy. Lands in Done for approval.",
    group: "Creative & Content",
    photo: "/agents/ava.png",
  },
  {
    id: "sonja",
    name: "Sonja Williams",
    title: "Community & Customer Support",
    skill: "Inbox, phone, reviews.",
    group: "Growth & Client Success",
    photo: "/agents/sonja.jpeg",
  },
  {
    id: "danica",
    name: "Danica Bato",
    title: "Executive Assistant",
    skill: "Bookings, calendars, official schedule.",
    group: "Leadership & Executive Operations",
    photo: "/agents/danica.png",
  },
  {
    id: "omar",
    name: "Omar Haddad",
    title: "Platform, DevOps, Infrastructure, Cloud",
    skill: "Workflows that follow up while you work the next lead.",
    group: "Engineering & Automation",
    photo: "/agents/omar.png",
  },
  {
    id: "nova",
    name: "Nova Chen",
    title: "Chief AI Architect",
    skill: "Research and assessments that feed the team.",
    group: "Engineering & Automation",
    photo: "/agents/nova.png",
  },
  {
    id: "adam",
    name: "Adam Mitchell",
    title: "Operations Process Improvement",
    skill: "Where to focus next, on real FLOW data.",
    group: "Leadership & Executive Operations",
    photo: "/agents/adam.png",
  },
  {
    id: "amir",
    name: "Amir Rahman",
    title: "Operations, Reporting & KPI Management",
    skill: "Pipeline health and readable KPIs.",
    group: "Engineering & Automation",
    photo: "/agents/amir.png",
  },
  {
    id: "dante",
    name: "Dante' Price",
    title: "Finance Director",
    skill: "Finance books as drafts. The owner issues and pays. No bank logins.",
    group: "Leadership & Executive Operations",
    photo: "/agents/dante.png",
  },
];

export const filters = [
  "Everyone",
  "Leadership & Executive Operations",
  "Growth & Client Success",
  "Creative & Content",
  "Engineering & Automation",
] as const;
export type Filter = (typeof filters)[number];

export const heroFaces = ["mia", "jordan", "zenda", "leila", "sonja", "caleb", "danica", "nova"];

export const workspaceModules = [
  "Dashboard",
  "Inbox",
  "Phone",
  "Sales",
  "Tasks",
  "Appointments",
  "Marketing",
  "Automation",
  "Team Desk",
  "Agency",
] as const;
