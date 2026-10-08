# Planning

## Purpose

A standalone public marketing site for LeadsFlow180. People should understand that AI Office is the team (WHO) and the CRM is the toolset (HOW), then click through to the live products — including Launch Founders pricing via Stripe Checkout and per-agent office pages.

This site does not authenticate into CRM APIs. Stripe Checkout is the paid path. Agent talk uses verified email + a short timed chat (optional OpenAI).

## Stack

- TypeScript
- Next.js App Router
- React
- Tailwind CSS
- Framer Motion
- Stripe Checkout (`/api/checkout`)
- Agent talk APIs (`/api/agents/email`, `/verify`, `/chat`)
- Marketing routes: `/`, `/agents`, `/agents/[id]`, `/integrations` (11 core + expandable Make/Zapier/n8n bridges), `/savings` (+ `/missed-leads`, `/seats`)

## Structure

- `src/app/layout.tsx` — font, title, description. No canonical or Open Graph URL until a domain is confirmed.
- `src/app/page.tsx` — home scroll.
- `src/app/agents/page.tsx` — floor directory.
- `src/app/agents/[id]/page.tsx` — screenshot-style portfolio (hero, facts, tilted cards, about/skills, FAQ + get-started, ask modal).
- `src/app/integrations/page.tsx` — Integration Center (Discover/Installed, search, filters) with filler connectors; LeadsFlow theme.
- `src/app/savings/page.tsx` — Savings hub; `/savings/missed-leads` + `/savings/seats` full calculator pages (no pop-ups).
- `src/lib/integrationsFillers.ts` — filler integration catalog.
- `src/app/api/agents/*` — email verify + timed chat.
- `src/components/` — `Header`, `Hero` (right panel = NeedHelp picker), `FlowShowcase` (relocated CrmMock), `TeamStage`, `SavingsCards` (above Multilingual), `Languages`, `Features`, `roi/*`, `Pricing`, `ClosingCta`, `Footer`, `agents/*`, shared `Motion`.
- `src/lib/site.ts` — URLs, the 21 agents, languages, workspace modules.
- `src/lib/roiMath.ts` — shared ROI formatters + missed-lead / seat-cost math (plan price from `pricing.ts`).
- `src/lib/needHelpSlots.ts` — six filler need→agent mappings for the home picker.
- `src/lib/agentProfiles.ts` — bios, personality, FAQs, work samples, office photo paths.
- `src/lib/pricing.ts` — Launch Founders plan + today’s bonuses.
- `src/lib/stripeCatalog.ts` — Product + Price via Stripe API.
- `src/lib/talkSession.ts` / `talkConstants.ts` / `leads.ts` — verify tokens, chat window, list capture.
- Motion: Framer Motion. Every animation respects `prefers-reduced-motion`.

## Visual

CRM colors: black header and dark bands, canvas `#f4f6fb`, brand blue `#010dff`, purple `#4609ae` in gradients, green `#00ff26` only on the hairline. Inter via `next/font`. Dark surfaces use `/brand/logo-dark.png`; bright surfaces use `/brand/logo-light.png`.

Agent pages: `/agents` is the team directory; each `/agents/[id]` uses `AgentPortfolioPage` + `AgentAskModal` (fillers in `agentPortfolioFillers.ts`). Photographic walkthrough in `public/walkthrough/` is paused (old `/walkthrough` URLs redirect to `/agents`). Office stills: `/agents/offices/{id}.webp`.

## Constraints

- Marketing routes: home + `/agents` directory + `/agents/[id]` portfolio/talk pages + `/integrations` + `/savings` calculators. Walkthrough floor tour (`public/walkthrough/`) is paused.
- Public pricing is the Launch Founders offer in `src/lib/pricing.ts` only — do not invent alternate tiers, trials, or “no credit card” claims. Agent chat may soft-CTA to AI Office signup.
- No “Hermes” in human-facing copy. Mia is Project Manager.
- Do not describe the product as GoHighLevel or a white-label of it.
- Creative work (Design Hub, Brand Bank) is presented as part of the CRM.
- Navbar is logo plus product CTAs and jumps (Team dropdown → agent profiles + Meet the team, Features, Integrations → `/integrations`, Savings → `/savings`, Pricing). Home places Savings cards as their own section above Multilingual (missed leads / empty seats). Privacy and Terms stay out of the navbar until real legal URLs exist.
- Agent portfolio copy comes from `docs/LeadsFlow180_Team_Profiles_SEO_AEO_Content.md` (wired via `scripts/wire_seo_profiles.py`). Every pack field is used on `/agents/[id]`: specialty, hero headline, intro, ask CTA + helper, all facts, sample-concept portfolio, about, skills, FAQs (+ FAQPage JSON-LD), get-started, free guide (summary/steps/download CTA text), Person JSON-LD, page title + meta. Portfolio concepts stay labeled “Sample concept” until real work replaces them. No placeholder PDF links until files exist.
