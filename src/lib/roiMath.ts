import { links } from "@/lib/site";
import { pricingPlan } from "@/lib/pricing";

export const roiConfig = {
  price: pricingPlan.priceMonthly,
  listPrice: pricingPlan.compareAtMonthly,
  signup: links.signup,
  talk: "/#team",
} as const;

export const money = (n: number) =>
  `${n < 0 ? "-$" : "$"}${Math.round(Math.abs(n)).toLocaleString("en-US")}`;

export const num = (n: number) => String(Math.round(n * 10) / 10);

export const pct = (n: number) => `${Math.round(n)}%`;

export type MissedLeadInputs = {
  calls: number;
  late: number;
  job: number;
  close: number;
  qualified: number;
  anyway: number;
  revive: number;
  rel: number;
  margin: number;
};

export const missedLeadDefaults: MissedLeadInputs = {
  calls: 100,
  late: 30,
  job: 4500,
  close: 25,
  qualified: 60,
  anyway: 20,
  revive: 40,
  rel: 60,
  margin: 35,
};

export function computeMissedLeads(v: MissedLeadInputs, price = roiConfig.price) {
  const late = (v.calls * v.late) / 100;
  const qual = (late * v.qualified) / 100;
  const risk = ((qual * v.close) / 100) * v.job;
  const left = qual * (1 - v.anyway / 100);
  const back = (left * v.revive) / 100;
  const rate = (v.close / 100) * (v.rel / 100);
  const jobs = back * rate;
  const rev = jobs * v.job;
  const profit = (rev * v.margin) / 100;
  const net = profit - price;
  return { late, qual, risk, left, back, rate, jobs, rev, profit, price, net, yr: net * 12 };
}

export type SeatRow = {
  id: string;
  name: string;
  who: string;
  pay: number;
  cover: number;
  on: boolean;
  software?: boolean;
};

export const seatDefaults: SeatRow[] = [
  {
    id: "marketing",
    name: "Marketing coordinator",
    who: "Zenda and JoJo draft social posts and content. You approve.",
    pay: 3500,
    cover: 50,
    on: true,
  },
  {
    id: "email",
    name: "Email marketer",
    who: "Jay writes and schedules campaigns and nurture emails.",
    pay: 2500,
    cover: 60,
    on: false,
  },
  {
    id: "sales",
    name: "Sales follow-up or appointment setter",
    who: "Jordan works the pipeline, follow-ups, and proposals.",
    pay: 3500,
    cover: 40,
    on: false,
  },
  {
    id: "admin",
    name: "Admin and scheduling assistant",
    who: "Mia assigns work and keeps every job moving.",
    pay: 3000,
    cover: 50,
    on: true,
  },
  {
    id: "ads",
    name: "Ads manager",
    who: "Lee Park builds campaigns. Ad spend stays under your approval.",
    pay: 2000,
    cover: 30,
    on: false,
  },
  {
    id: "research",
    name: "Lead researcher",
    who: "Mark finds and qualifies prospects for Jordan.",
    pay: 2500,
    cover: 50,
    on: false,
  },
  {
    id: "software",
    name: "Software you pay for today",
    who: "CRM, email tool, funnels, forms, scheduler, reviews. The workspace includes them.",
    pay: 550,
    cover: 100,
    on: true,
    software: true,
  },
];

export type SeatCostInputs = {
  hrs: number;
  rate: number;
  burden: number;
  covers: Record<string, number>;
};

export const seatCostDefaults: SeatCostInputs = {
  hrs: 2,
  rate: 50,
  burden: 15,
  covers: Object.fromEntries(seatDefaults.filter((s) => !s.software).map((s) => [s.id, s.cover])),
};

export function computeSeatCost(
  seats: SeatRow[],
  v: SeatCostInputs,
  price = roiConfig.price,
) {
  let today = 0;
  let saved = 0;
  let left = 0;
  let n = 0;
  for (const r of seats) {
    if (!r.on) continue;
    n += 1;
    const cost = r.software ? r.pay : r.pay * (1 + v.burden / 100);
    const share = r.software ? 1 : (v.covers[r.id] ?? r.cover) / 100;
    today += cost;
    saved += cost * share;
    left += cost * (1 - share);
  }
  const review = ((v.hrs * 52) / 12) * v.rate;
  const withLF = left + price + review;
  const net = today - withLF;
  return { today, saved, left, review, withLF, net, yr: net * 12, price, n };
}
