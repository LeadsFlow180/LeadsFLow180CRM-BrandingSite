# LeadsFlow180 branding site

Promotional site for LeadsFlow180. AI Office is the WHO. FLOW is the HOW. Launch Founders pricing checks out through Stripe. Each AI teammate has an office page with bio, work, FAQs, and a short email-verified talk.

## Stack

TypeScript, Next.js App Router, React, Tailwind CSS, Framer Motion, Stripe Checkout. Routes: `/`, `/agents`, `/agents/[id]`, `/integrations`. APIs: `POST /api/checkout`, `/api/agents/email`, `/api/agents/verify`, `/api/agents/chat`.

## Run

```bash
npm install
cp .env.example .env.local
# fill Stripe (+ optional Resend / OpenAI) keys
npm run dev
```

Open `http://localhost:3000`.

## Stripe setup

1. Put in `.env.local`:
   - `STRIPE_SECRET_KEY` (test or live)
   - `NEXT_PUBLIC_SITE_URL` (e.g. `http://localhost:3000` or your live domain)
2. Click **Subscribe** — the API finds or creates the Launch Founders Product + $697/mo Price from `src/lib/pricing.ts`.
3. Optional: set `STRIPE_PRICE_ID` to pin a Dashboard price, or `STRIPE_PAYMENT_LINK` as a zero-code fallback.

See `docs/STRIPE-SETUP.md`.

## Agent offices

- Directory: `/agents`
- Profile: `/agents/[id]` — portfolio layout (specialty, intro, facts, tilted sample portfolio, about/skills, FAQs, get started, free quick guide, ask modal)
- Copy / capabilities: `docs/LeadsFlow180_Team_Profiles_SEO_AEO_Content.md` → `src/lib/agentProfiles.ts` (re-run `python scripts/wire_seo_profiles.py` after pack edits). Each `/agents/[id]` page shows every Core skill as Capabilities.
- Office stills: `public/agents/offices/{id}.png` (then `.jpg` / `.webp`; falls back to portrait)
- Talk: verify email → 3-minute chat → soft CTA to AI Office signup
  - Optional `RESEND_API_KEY` + `RESEND_FROM_EMAIL` to send magic links (without them, the API returns a verify URL for local testing)
  - Optional `OPENAI_API_KEY` for live replies (`OPENAI_MODEL` defaults to `gpt-4o-mini`; without a key, a mock reply is used)
  - Optional `LEADS_WEBHOOK_URL` + local `.data/leads.jsonl` for the email list

## Sections (home)

Header, hero with Need Help picker, Flow showcase (CRM mock), team stage (21 agents), Savings cards (above Multilingual → `/savings/*`), languages strip, HOW feature cards, workspace modules, Launch Founders pricing, closing CTA, footer. Savings calculators: `/savings`, `/savings/missed-leads`, `/savings/seats` (`src/lib/roiMath.ts` + `src/components/roi/`).

## Assets

- Logos: `public/brand/logo-dark.png`, `public/brand/logo-light.png`. Favicon: `src/app/icon.png`.
- Agent portraits: `public/agents/<id>.png` (Sonja: `sonja.jpeg`)
- Stage videos (optional): `public/agents/videos/{id}.mp4`

Agent roster: `src/lib/site.ts`. Pricing: `src/lib/pricing.ts`.
