# Tasks

## Active

- [ ] Set canonical and Open Graph URL after the public domain is confirmed.
- [ ] Real Privacy and Terms pages or URLs (footer links point to `/privacy` and `/terms` for now).

## Done — 2026-09-25

- [x] Official logo in the header, footer, and favicon.
- [x] 2026-09-25 — 3D glass navbar: tilting logo, sliding nav highlight with active-section dot, raised Create account button, floating pill on scroll, scroll-progress line.
- [x] 2026-09-25 — Hero redesign: 3D perspective grid floor + pointer spotlight (`HeroBackdrop`), 3D word-flip headline with shimmer "WHO." and drawn underline, glass language card, 3D raised CTAs, fanning avatar stack with tooltips (`HeroFaces`), lit stage under the CRM mock.
- [x] 2026-09-25 — Team section redesign, split into `team/StageCard.tsx`, `team/TeamRoster.tsx`, `team/groupTone.ts`: 3D tilting portrait with glare, per-group accent colours, outlined index number, Up next picks, "Talk to {name} in AI Office" link, Play/Pause with progress ring, filter tabs with counts, richer roster tiles.
- [x] 2026-09-25 — Fixed stage text lagging behind the photo/roster (old `mode="wait"` crossfade); text now crossfades in place.
- [x] 2026-09-25 — Multilingual band redesign: 3D language orbit (`languages/LanguageOrbit.tsx`) with ISO-code cards around a glowing "10" core, pointer tilt, pause on hover; shimmer headline; gradient-framed language line; two-row tilted marquee (solid + outline, opposite directions).
- [x] 2026-09-25 — HOW + Workspace redesign: bento grid of 3D tilt cards (`features/FeatureCard.tsx`) with cursor glow, agent photos, and animated mini product previews (`features/FeatureVisuals.tsx`); dark human-approval card; Workspace modules as raised keycaps on a tilted glass deck (`features/WorkspaceDeck.tsx`).
- [x] 2026-09-25 — Closing CTA + footer redesign: turning 3D ring of all 20 agents, glowing perspective floor, shimmer headline, 3D raised CTAs; footer glass panel with animated link columns, AI Office pill, back-to-top, and large outlined tagline.
- [x] 2026-09-25 — Fixed hero avatar hover glitch: removed the margin-based fan-out (row resized under the cursor and looped hover on/off); hover now only lifts/scales the hovered face on its own layer. Also fixed raised buttons snapping instead of easing (Tailwind v4 uses `translate`/`scale` properties, so transitions now list those).
- [x] 2026-09-25 — Full-page small-screen polish: tighter header logo/CTAs at 320px, scaled hero/CRM mock, smaller stage/orbit/closing ring, abbreviated pipeline labels, denser feature/footer padding; verified no horizontal scroll at 320, 390, and 768.
- [x] Cinematic rebuild: Framer Motion, 3D CRM mock in the hero, 20-agent auto-rotating team stage, languages strip, HOW cards, workspace chips, closing band.
- [x] Multilingual line and ten language chips on the hero, team, languages strip, and footer.

## Done — 2026-09-24

- [x] Scaffold TypeScript + Next.js App Router + Tailwind one-page site.
