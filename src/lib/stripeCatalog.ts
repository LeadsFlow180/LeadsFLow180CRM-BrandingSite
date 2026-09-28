import Stripe from "stripe";
import { pricingPlan } from "@/lib/pricing";

const PLAN_META = { plan: pricingPlan.id, offer: "launch-founders" } as const;

/** True when env still has .env.example placeholders like sk_test_... / price_... */
export function isConfiguredSecret(value: string | undefined): boolean {
  const v = value?.trim();
  if (!v) return false;
  if (v.includes("...")) return false;
  if (v === "sk_test_..." || v === "sk_live_..." || v === "price_...") return false;
  return true;
}

/** Cents for Stripe unit_amount (USD). */
function monthlyAmountCents(): number {
  return Math.round(pricingPlan.priceMonthly * 100);
}

/**
 * Resolve the recurring Launch Founders Price.
 * Prefers STRIPE_PRICE_ID when set; otherwise finds or creates Product + Price via API.
 */
export async function resolveLaunchFoundersPriceId(stripe: Stripe): Promise<string> {
  const configured = process.env.STRIPE_PRICE_ID?.trim();
  if (configured && isConfiguredSecret(configured)) return configured;

  const product = await findOrCreateProduct(stripe);
  const existing = await findMatchingPrice(stripe, product.id);
  if (existing) return existing.id;

  const price = await stripe.prices.create({
    product: product.id,
    currency: pricingPlan.currency.toLowerCase(),
    unit_amount: monthlyAmountCents(),
    recurring: { interval: "month" },
    metadata: PLAN_META,
  });
  return price.id;
}

async function findOrCreateProduct(stripe: Stripe): Promise<Stripe.Product> {
  const found = await findProductByPlanMeta(stripe);
  if (found) return found;

  return stripe.products.create({
    name: `LeadsFlow180 ${pricingPlan.name}`,
    description: pricingPlan.description,
    metadata: PLAN_META,
  });
}

async function findProductByPlanMeta(stripe: Stripe): Promise<Stripe.Product | null> {
  try {
    const result = await stripe.products.search({
      query: `active:'true' AND metadata['plan']:'${pricingPlan.id}'`,
      limit: 1,
    });
    if (result.data[0]) return result.data[0];
  } catch {
    // Reason: some accounts lack Search; fall back to a short list scan.
  }

  const listed = await stripe.products.list({ active: true, limit: 100 });
  return listed.data.find((p) => p.metadata?.plan === pricingPlan.id) ?? null;
}

async function findMatchingPrice(
  stripe: Stripe,
  productId: string,
): Promise<Stripe.Price | null> {
  const amount = monthlyAmountCents();
  const currency = pricingPlan.currency.toLowerCase();
  const prices = await stripe.prices.list({
    product: productId,
    active: true,
    limit: 100,
  });

  return (
    prices.data.find(
      (p) =>
        p.currency === currency &&
        p.unit_amount === amount &&
        p.recurring?.interval === "month" &&
        p.type === "recurring",
    ) ?? null
  );
}

export function createStripeClient(secretKey: string): Stripe {
  return new Stripe(secretKey);
}
