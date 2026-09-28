# Planning

## Purpose

A standalone public marketing page for LeadsFlow180. People should understand that AI Office is the team (WHO) and the CRM is the toolset (HOW), then click through to the live products — including Launch Founders pricing via Stripe Checkout.

This site does not authenticate or call CRM APIs. Stripe Checkout is the only payment path.

## Stack

- TypeScript
- Next.js App Router
- React
- Tailwind CSS
- Framer Motion
- Stripe Checkout (`/api/checkout`)
- One marketing route: `src/app/page.tsx`

## Structure

- `src/app/layout.tsx` — font, title, description. No canonical or Open Graph URL until a domain is confirmed.
- `src/app/page.tsx` — composes the single scroll.
- `src/app/api/checkout/route.ts` — creates a Stripe Checkout Session (or redirects to `STRIPE_PAYMENT_LINK`).
- `src/components/` — `Header`, `Hero` + `CrmMock`, `TeamStage`, `Languages`, `Features`, `Pricing`, `ClosingCta`, `Footer`, shared `Motion` helpers.
- `src/lib/site.ts` — URLs, the 21 agents, the ten languages, workspace modules.
- `src/lib/pricing.ts` — Launch Founders plan + today’s bonuses.
- `src/lib/stripeCatalog.ts` — finds or creates the Launch Founders Product + monthly Price via Stripe API (`STRIPE_SECRET_KEY` only; optional `STRIPE_PRICE_ID` override).
- Motion: Framer Motion. Every animation respects `prefers-reduced-motion`.

## Visual

CRM colors: black header and dark bands, canvas `#f4f6fb`, brand blue `#010dff`, purple `#4609ae` in gradients, green `#00ff26` only on the hairline. Inter via `next/font`. Dark surfaces use `/brand/logo-dark.png`; bright surfaces use `/brand/logo-light.png`.

## Constraints

- No extra marketing routes (API routes for Stripe are allowed).
- Public pricing is the Launch Founders offer in `src/lib/pricing.ts` only — do not invent alternate tiers, trials, or “no credit card” claims.
- No “Hermes” in human-facing copy. Mia is Project Manager.
- Do not describe the product as GoHighLevel or a white-label of it.
- Creative work (Design Hub, Brand Bank) is presented as part of the CRM.
- Navbar is logo plus product CTAs and in-page jumps (Team, Features, Pricing). Privacy and Terms stay out of the navbar until real legal URLs exist.
