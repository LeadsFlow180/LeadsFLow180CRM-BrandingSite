import { NextResponse } from "next/server";
import { pricingPlan } from "@/lib/pricing";
import {
  createStripeClient,
  isConfiguredSecret,
  resolveLaunchFoundersPriceId,
} from "@/lib/stripeCatalog";

export const runtime = "nodejs";

function siteUrl(request: Request): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (env) return env;
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") ?? "http";
  return host ? `${proto}://${host}` : "http://localhost:3000";
}

/** Creates a Stripe Checkout Session for the Launch Founders monthly subscription. */
export async function POST(request: Request) {
  // Reason: Payment Link is a zero-code fallback until the secret key is wired.
  const paymentLink = process.env.STRIPE_PAYMENT_LINK?.trim();
  if (paymentLink) {
    return NextResponse.json({ url: paymentLink });
  }

  const secret = process.env.STRIPE_SECRET_KEY?.trim();
  if (!isConfiguredSecret(secret)) {
    console.error("Stripe checkout missing a real STRIPE_SECRET_KEY (placeholder or empty).");
    return NextResponse.json(
      { error: "Checkout is temporarily unavailable. Please try again shortly." },
      { status: 503 },
    );
  }

  const stripe = createStripeClient(secret!);
  const origin = siteUrl(request);

  try {
    const priceId = await resolveLaunchFoundersPriceId(stripe);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/?checkout=success#pricing`,
      cancel_url: `${origin}/?checkout=canceled#pricing`,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      metadata: {
        plan: pricingPlan.id,
        offer: "launch-founders",
      },
      subscription_data: {
        metadata: {
          plan: pricingPlan.id,
          offer: "launch-founders",
        },
      },
    });

    if (!session.url) {
      return NextResponse.json({ error: "Checkout session missing redirect URL." }, { status: 500 });
    }

    return NextResponse.json({ url: session.url, id: session.id });
  } catch (err) {
    console.error("Stripe checkout failed:", err);
    return NextResponse.json(
      { error: "Checkout is temporarily unavailable. Please try again shortly." },
      { status: 500 },
    );
  }
}
