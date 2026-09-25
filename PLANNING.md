# Planning

## Purpose

A standalone public marketing page for LeadsFlow180. People should understand that AI Office is the team (WHO) and the CRM is the toolset (HOW), then click through to the live products.

This site does not authenticate, store data, or call CRM APIs.

## Stack

- TypeScript
- Next.js App Router
- React
- Tailwind CSS
- One route: `src/app/page.tsx`

## Structure

- `src/app/layout.tsx` — font, title, description. No canonical or Open Graph URL until a domain is confirmed.
- `src/app/page.tsx` — composes the single scroll.
- `src/components/` — `Header`, `Hero` + `CrmMock`, `TeamStage`, `Languages`, `Features` (HOW cards + workspace chips), `ClosingCta`, `Footer`, shared `Motion` helpers.
- `src/lib/site.ts` — URLs, the 20 agents, the ten languages, workspace modules.
- Motion: Framer Motion. Every animation respects `prefers-reduced-motion`.

## Visual

CRM colors: black header and dark bands, canvas `#f4f6fb`, brand blue `#010dff`, purple `#4609ae` in gradients, green `#00ff26` only on the hairline. Inter via `next/font`.

## Constraints

- No extra routes.
- No invented logo, pricing, trial, or “no credit card” claims.
- No “Hermes” in human-facing copy. Mia is Project Manager & Meeting Chair.
- Do not describe the product as GoHighLevel or a white-label of it.
- Creative work (Design Hub, Brand Bank) is presented as part of the CRM.
- Navbar is logo plus product CTAs and an in-page Product jump. Privacy and Terms stay out of the navbar until real legal URLs exist; they are omitted so this site stays one route.
