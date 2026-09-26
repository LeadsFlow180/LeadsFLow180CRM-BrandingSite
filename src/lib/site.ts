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

export type Group = "Chair" | "Revenue" | "Marketing" | "Creative & web" | "Ops";

export type Agent = {
  id: string;
  name: string;
  title: string;
  skill: string;
  group: Group;
  photo: string;
};

export const agents: Agent[] = [
  {
    id: "mia",
    name: "Mia",
    title: "Project Manager & Meeting Chair",
    skill: "First person you talk to. Assigns work, chairs meetings, keeps every job moving in AI Office.",
    group: "Chair",
    photo: "/agents/mia.png",
  },
  {
    id: "jordan",
    name: "Jordan",
    title: "Sales",
    skill: "Pipeline, funnels, lead capture, proposals, partners, affiliates. First touch to close.",
    group: "Revenue",
    photo: "/agents/jordan.png",
  },
  {
    id: "jay",
    name: "Jay",
    title: "Email Marketing",
    skill: "Nurture sequences and campaigns.",
    group: "Revenue",
    photo: "/agents/jay.png",
  },
  {
    id: "mark",
    name: "Mark",
    title: "Lead & Prospect Research",
    skill: "Research and prospecting so Jordan has real leads.",
    group: "Revenue",
    photo: "/agents/mark.png",
  },
  {
    id: "lee",
    name: "Lee Park",
    title: "Ads",
    skill: "Paid campaigns. Spend stays under approval.",
    group: "Revenue",
    photo: "/agents/lee.png",
  },
  {
    id: "zenda",
    name: "Zenda",
    title: "Social Media",
    skill: "Drafts and schedules.",
    group: "Marketing",
    photo: "/agents/zenda.png",
  },
  {
    id: "jojo",
    name: "JoJo",
    title: "Shared Content",
    skill: "Content across channels so the story stays consistent.",
    group: "Marketing",
    photo: "/agents/jojo.png",
  },
  {
    id: "shelly",
    name: "Shelly",
    title: "Campaigns",
    skill: "Week-level campaign planning.",
    group: "Marketing",
    photo: "/agents/shelly.png",
  },
  {
    id: "caleb",
    name: "Caleb",
    title: "SEO / AEO / GEO",
    skill: "Search and AI visibility. Not a single fake SEO score.",
    group: "Marketing",
    photo: "/agents/caleb.png",
  },
  {
    id: "leila",
    name: "Leila",
    title: "Graphic Design & Presentations",
    skill: "Brand graphics and slides. Lands in Done for approval.",
    group: "Creative & web",
    photo: "/agents/leila.jpg",
  },
  {
    id: "niki",
    name: "Niki",
    title: "Video Design",
    skill: "Brand video / motion for campaigns.",
    group: "Creative & web",
    photo: "/agents/niki.png",
  },
  {
    id: "carlos",
    name: "Carlos",
    title: "Web Design",
    skill: "Websites and pages with Ali.",
    group: "Creative & web",
    photo: "/agents/carlos.png",
  },
  {
    id: "ali",
    name: "Ali",
    title: "Web Design",
    skill: "Websites and pages with Carlos.",
    group: "Creative & web",
    photo: "/agents/ali.png",
  },
  {
    id: "ava",
    name: "Ava",
    title: "Copywriting & Brand Voice",
    skill: "On-brand website and campaign copy. Lands in Done for approval.",
    group: "Creative & web",
    photo: "/agents/ava.png",
  },
  {
    id: "sonja",
    name: "Sonja",
    title: "Customer Support",
    skill: "Inbox, phone, reviews.",
    group: "Ops",
    photo: "/agents/sonja.png",
  },
  {
    id: "danica",
    name: "Danica",
    title: "Calendar & Executive Coordination",
    skill: "Bookings, calendars, official schedule.",
    group: "Ops",
    photo: "/agents/danica.png",
  },
  {
    id: "omar",
    name: "Omar",
    title: "Automation & System Health",
    skill: "Workflows that follow up while you work the next lead.",
    group: "Ops",
    photo: "/agents/omar.png",
  },
  {
    id: "nova",
    name: "Nova",
    title: "AI Assessment & Research",
    skill: "Research and assessments that feed the team.",
    group: "Ops",
    photo: "/agents/nova.png",
  },
  {
    id: "adam",
    name: "Adam",
    title: "Strategy Analysis",
    skill: "Where to focus next, on real FLOW data.",
    group: "Ops",
    photo: "/agents/adam.png",
  },
  {
    id: "amir",
    name: "Amir",
    title: "Reports & KPI",
    skill: "Pipeline health and readable KPIs.",
    group: "Ops",
    photo: "/agents/amir.png",
  },
  {
    id: "dante",
    name: "Dante",
    title: "CFO / Finance",
    skill: "Finance books as drafts. The owner issues and pays. No bank logins.",
    group: "Ops",
    photo: "/agents/dante.png",
  },
];

export const filters = ["Everyone", "Chair", "Revenue", "Marketing", "Creative & web", "Ops"] as const;
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
