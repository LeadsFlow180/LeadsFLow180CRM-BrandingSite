/** Launch Founders pricing — single home-page offer wired to Stripe Checkout. */

export const pricingPlan = {
  id: "launch-founders",
  name: "Launch Founders",
  badge: "Launch Founders Rate · Special",
  offerLabel: "Limited time · First 20 clients",
  seatsLimit: 20,
  priceMonthly: 697,
  currency: "USD",
  interval: "month" as const,
  compareAtMonthly: 997,
  tagline: "AI Office and FLOW for teams ready to ship with a full AI workforce.",
  description:
    "$697 per month Launch Founders Rate Special — limited time for the first 20 clients. One seat for the full AI Office floor and FLOW workspace.",
  cta: "Subscribe — $697/mo",
  includes: [
    "Full AI Office team access",
    "FLOW workspace desk",
    "Help in 10 languages",
    "Human approval on drafts that matter",
    "Priority Founders support",
  ],
} as const;

export type PricingBonus = {
  id: string;
  title: string;
  detail: string;
};

/** Fixed bonuses for signing up today — no daily refresh. */
export const signupTodayBonuses: PricingBonus[] = [
  {
    id: "onboarding",
    title: "Same-day Founders onboarding",
    detail: "Mia queues your kickoff and maps your first week in AI Office.",
  },
  {
    id: "rate-lock",
    title: "Founders rate lock",
    detail: "Keep $697/mo for as long as your subscription stays active.",
  },
  {
    id: "playbook",
    title: "Launch playbook pack",
    detail: "Campaign, inbox, and desk templates ready to run inside FLOW.",
  },
  {
    id: "priority",
    title: "Priority agent lane",
    detail: "Faster turns from Growth & Creative during your first 30 days.",
  },
];

export function formatMoney(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
