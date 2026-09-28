# LeadsFlow180 branding site

A cinematic one-page promotional site for LeadsFlow180. AI Office is the WHO. FLOW is the HOW. Launch Founders pricing checks out through Stripe.

## Stack

TypeScript, Next.js App Router, React, Tailwind CSS, Framer Motion, Stripe Checkout. One marketing route: `/`. Checkout API: `POST /api/checkout`.

## Run

```bash
npm install
cp .env.example .env.local
# fill Stripe keys (see below)
npm run dev
```

Open `http://localhost:3000`.

## Stripe setup

1. Put in `.env.local`:
   - `STRIPE_SECRET_KEY` (test or live)
   - `NEXT_PUBLIC_SITE_URL` (e.g. `http://localhost:3000` or your live domain)
2. Click **Subscribe** — the API finds or creates the Launch Founders Product + $697/mo Price from `src/lib/pricing.ts`.
3. Optional: set `STRIPE_PRICE_ID` to pin a Dashboard price, or `STRIPE_PAYMENT_LINK` as a zero-code fallback.

Subscribe on `#pricing` opens Stripe Checkout, then returns to `/?checkout=success#pricing` or `/?checkout=canceled#pricing`. See `docs/STRIPE-SETUP.md`.

## Sections

Header, hero with the 3D CRM mock, team stage (21 agents, auto-rotating), languages strip, the HOW feature cards, workspace modules, **Launch Founders pricing**, closing call to action, footer.

## Assets

- Logos: `public/brand/logo-dark.png` (white+green, for black/dark UI), `public/brand/logo-light.png` (blue+green, for bright surfaces). Favicon: `src/app/icon.png`.
- Agent portraits: `public/agents/<id>.png` (Sonja: `sonja.jpeg`)
- Agent stage videos (optional): drop `{id}.mp4` into `public/agents/videos/` (e.g. `jay.mp4`). `npm run dev` / `npm run build` syncs them; missing videos fall back to the portrait.

Agent names, titles, skills, and the ten languages live in `src/lib/site.ts`. Plan copy and today’s bonuses live in `src/lib/pricing.ts`.
