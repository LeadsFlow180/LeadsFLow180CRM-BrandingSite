# LeadsFlow180 branding site

A cinematic one-page promotional site for LeadsFlow180. AI Office is the WHO. FLOW is the HOW.

## Stack

TypeScript, Next.js App Router, React, Tailwind CSS, Framer Motion. One route: `/`. No backend.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Sections

Header, hero with the 3D CRM mock, team stage (21 agents, auto-rotating), languages strip, the HOW feature cards, workspace modules, closing call to action, footer.

## Assets

- Logo: `public/brand/logo.png` (favicon: `src/app/icon.png`)
- Agent portraits: `public/agents/<id>.png` (`leila.jpg`)
- Agent stage videos (optional): drop `{id}.mp4` into `public/agents/videos/` (e.g. `jay.mp4`). `npm run dev` / `npm run build` syncs them; missing videos fall back to the portrait.

Agent names, titles, skills, and the ten languages live in `src/lib/site.ts`.
