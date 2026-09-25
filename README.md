# LeadsFlow180 branding site

A cinematic one-page promotional site for LeadsFlow180. AI Office is the WHO. The CRM is the HOW.

## Stack

TypeScript, Next.js App Router, React, Tailwind CSS, Framer Motion. One route: `/`. No backend.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Sections

Header, hero with the 3D CRM mock, team stage (20 agents, auto-rotating), languages strip, the HOW feature cards, workspace modules, closing call to action, footer.

## Assets

- Logo: `public/brand/logo.png` (favicon: `src/app/icon.png`)
- Agent portraits: `public/agents/<name>.png` (`leila.jpg`)

Agent names, titles, skills, and the ten languages live in `src/lib/site.ts`.
