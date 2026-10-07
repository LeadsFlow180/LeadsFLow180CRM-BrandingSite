/** Integration catalog — icons from Simple Icons (jsDelivr), stored locally. */
export type IntegrationCard = {
  id: string;
  name: string;
  builder: string;
  category: string;
  useCases: string[];
  caps: string[];
  recommended?: boolean;
  installed?: boolean;
  /** Fallback initials if icon fails to load */
  mark: string;
  tint: string;
  /** Local Simple Icons SVG under /integrations/icons */
  icon: string;
};

export const integrationUseCases = [
  "All Integrations",
  "Lead Capture",
  "Messaging",
  "Scheduling",
  "Productivity",
  "Website",
  "Commerce",
] as const;

export const integrationCategories = [
  "Google Workspace",
  "Communication",
  "Advertising",
  "Productivity",
  "Hosting",
  "Commerce",
] as const;

function iconPath(id: string) {
  return `/integrations/icons/${id}.svg`;
}

export const integrationsFillers: IntegrationCard[] = [
  {
    id: "google-sheets",
    name: "Google Sheets",
    builder: "LeadsFlow Built",
    category: "Google Workspace",
    useCases: ["Productivity", "Lead Capture"],
    caps: ["Sync", "Import", "Reports"],
    recommended: true,
    installed: true,
    mark: "GS",
    tint: "#34A853",
    icon: iconPath("google-sheets"),
  },
  {
    id: "gmail",
    name: "Gmail",
    builder: "LeadsFlow Built",
    category: "Google Workspace",
    useCases: ["Messaging"],
    caps: ["Inbox", "Send", "Labels"],
    recommended: true,
    installed: true,
    mark: "Gm",
    tint: "#EA4335",
    icon: iconPath("gmail"),
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    builder: "LeadsFlow Built",
    category: "Google Workspace",
    useCases: ["Scheduling"],
    caps: ["Events", "Bookings", "Sync"],
    recommended: true,
    installed: true,
    mark: "GC",
    tint: "#4285F4",
    icon: iconPath("google-calendar"),
  },
  {
    id: "google-drive",
    name: "Google Drive",
    builder: "LeadsFlow Built",
    category: "Google Workspace",
    useCases: ["Productivity"],
    caps: ["Files", "Folders", "Share"],
    recommended: true,
    mark: "GD",
    tint: "#4285F4",
    icon: iconPath("google-drive"),
  },
  {
    id: "airtable",
    name: "Airtable",
    builder: "Community Built",
    category: "Productivity",
    useCases: ["Productivity", "Lead Capture"],
    caps: ["Bases", "Views", "Sync"],
    recommended: true,
    mark: "At",
    tint: "#18BFFF",
    icon: iconPath("airtable"),
  },
  {
    id: "facebook-lead-ads",
    name: "Facebook Lead Ads",
    builder: "LeadsFlow Built",
    category: "Advertising",
    useCases: ["Lead Capture"],
    caps: ["Forms", "Leads", "Sync"],
    recommended: true,
    installed: true,
    mark: "Fb",
    tint: "#1877F2",
    icon: iconPath("facebook-lead-ads"),
  },
  {
    id: "microsoft-outlook",
    name: "Microsoft Outlook",
    builder: "LeadsFlow Built",
    category: "Communication",
    useCases: ["Messaging", "Scheduling"],
    caps: ["Mail", "Calendar", "Contacts"],
    recommended: true,
    mark: "Ol",
    tint: "#0078D4",
    icon: iconPath("microsoft-outlook"),
  },
  {
    id: "clickup",
    name: "ClickUp",
    builder: "Community Built",
    category: "Productivity",
    useCases: ["Productivity"],
    caps: ["Tasks", "Spaces", "Sync"],
    mark: "Cu",
    tint: "#7B68EE",
    icon: iconPath("clickup"),
  },
  {
    id: "wordpress",
    name: "WordPress",
    builder: "LeadsFlow Built",
    category: "Hosting",
    useCases: ["Website", "Lead Capture"],
    caps: ["Forms", "Pages", "Sync"],
    recommended: true,
    installed: true,
    mark: "W",
    tint: "#21759B",
    icon: iconPath("wordpress"),
  },
  {
    id: "twilio",
    name: "Twilio",
    builder: "LeadsFlow Built",
    category: "Communication",
    useCases: ["Messaging"],
    caps: ["SMS", "Voice", "WhatsApp"],
    recommended: true,
    installed: true,
    mark: "Tw",
    tint: "#F22F46",
    icon: iconPath("twilio"),
  },
  {
    id: "shopify",
    name: "Shopify",
    builder: "Community Built",
    category: "Commerce",
    useCases: ["Commerce", "Website"],
    caps: ["Orders", "Products", "Customers"],
    recommended: true,
    mark: "Sh",
    tint: "#96BF48",
    icon: iconPath("shopify"),
  },
];
