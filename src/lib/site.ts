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

/** Titles match the AI Office floor. Mia stays “Project Manager” per brand request. */
export const agents: Agent[] = [
  {
    id: "mia",
    name: "Mia",
    title: "Project Manager",
    skill: "First person you talk to. Assigns work, chairs meetings, keeps every job moving in AI Office.",
    group: "Leadership & Executive Operations",
    photo: "/agents/mia.png",
  },
  {
    id: "carlos",
    name: "Carlos",
    title: "WordPress Specialist",
    skill: "Websites and pages with Ali.",
    group: "Engineering & Automation",
    photo: "/agents/carlos.png",
  },
  {
    id: "jay",
    name: "Jay",
    title: "Email Marketing, Lifecycle, Deliverability & Outbound",
    skill: "Nurture sequences and campaigns.",
    group: "Growth & Client Success",
    photo: "/agents/jay.png",
  },
  {
    id: "mark",
    name: "Mark",
    title: "Director of Market & Prospect Intelligence",
    skill: "Research and prospecting so Jordan has real leads.",
    group: "Growth & Client Success",
    photo: "/agents/mark.png",
  },
  {
    id: "lee",
    name: "Lee",
    title: "Paid Media & Performance Advertising Specialist",
    skill: "Paid campaigns. Spend stays under approval.",
    group: "Growth & Client Success",
    photo: "/agents/lee.png",
  },
  {
    id: "zenda",
    name: "Zenda",
    title: "Social Media & Community Content",
    skill: "Drafts and schedules.",
    group: "Growth & Client Success",
    photo: "/agents/zenda.png",
  },
  {
    id: "jojo",
    name: "JoJo",
    title: "Content, Copywriting & Personalization",
    skill: "Content across channels so the story stays consistent.",
    group: "Creative & Content",
    photo: "/agents/jojo.png",
  },
  {
    id: "shelly",
    name: "Shelly",
    title: "Director of Marketing Strategy & Growth",
    skill: "Week-level campaign planning.",
    group: "Growth & Client Success",
    photo: "/agents/shelly.png",
  },
  {
    id: "caleb",
    name: "Caleb",
    title: "Director of Search & AI Visibility",
    skill: "Search and AI visibility. Not a single fake SEO score.",
    group: "Engineering & Automation",
    photo: "/agents/caleb.png",
  },
  {
    id: "leila",
    name: "Leila",
    title: "Lead Product & Visual Designer",
    skill: "Brand graphics and slides. Lands in Done for approval.",
    group: "Creative & Content",
    photo: "/agents/leila.jpg",
  },
  {
    id: "niki",
    name: "Niki",
    title: "Video Designer",
    skill: "Brand video / motion for campaigns.",
    group: "Creative & Content",
    photo: "/agents/niki.png",
  },
  {
    id: "jordan",
    name: "Jordan",
    title: "Director of Sales & Business Development",
    skill: "Pipeline, funnels, lead capture, proposals, partners, affiliates. First touch to close.",
    group: "Growth & Client Success",
    photo: "/agents/jordan.png",
  },
  {
    id: "ali",
    name: "Ali",
    title: "Lead Full Stack Engineer",
    skill: "Websites and pages with Carlos.",
    group: "Engineering & Automation",
    photo: "/agents/ali.png",
  },
  {
    id: "ava",
    name: "Ava",
    title: "Director of Media Communications & PR",
    skill: "On-brand website and campaign copy. Lands in Done for approval.",
    group: "Creative & Content",
    photo: "/agents/ava.png",
  },
  {
    id: "sonja",
    name: "Sonja",
    title: "Community & Customer Support",
    skill: "Inbox, phone, reviews.",
    group: "Growth & Client Success",
    photo: "/agents/sonja.png",
  },
  {
    id: "danica",
    name: "Danica",
    title: "Executive Assistant to Michelle",
    skill: "Bookings, calendars, official schedule.",
    group: "Leadership & Executive Operations",
    photo: "/agents/danica.png",
  },
  {
    id: "omar",
    name: "Omar",
    title: "Platform, DevOps, Infrastructure, Cloud",
    skill: "Workflows that follow up while you work the next lead.",
    group: "Engineering & Automation",
    photo: "/agents/omar.png",
  },
  {
    id: "nova",
    name: "Nova",
    title: "AI Systems & Automation / Chief AI Architect",
    skill: "Research and assessments that feed the team.",
    group: "Engineering & Automation",
    photo: "/agents/nova.png",
  },
  {
    id: "adam",
    name: "Adam",
    title: "Six Sigma Business Strategy",
    skill: "Where to focus next, on real FLOW data.",
    group: "Leadership & Executive Operations",
    photo: "/agents/adam.png",
  },
  {
    id: "amir",
    name: "Amir",
    title: "Operations, Reporting & KPI Management",
    skill: "Pipeline health and readable KPIs.",
    group: "Engineering & Automation",
    photo: "/agents/amir.png",
  },
  {
    id: "dante",
    name: "Dante",
    title: "Finance Director / Controller & CFO Strategy",
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
