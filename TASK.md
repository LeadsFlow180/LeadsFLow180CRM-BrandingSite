# Tasks

## Active

- [ ] Set canonical and Open Graph URL after the public domain is confirmed.
- [ ] Real Privacy and Terms pages or URLs (footer links point to `/privacy` and `/terms` for now).

## Done — 2026-09-26

- [x] 2026-09-26 — Team stage agent videos: Jay wired; drop `{id}.mp4` in `public/agents/videos/` (sync on dev/build) with photo fallback.
- [x] 2026-09-26 — Fixed tab favicon: square mark cropped from the FLOW target “O” (full wordmark was unreadable at 16px).
- [x] 2026-09-26 — Brand framing: Meet the WHO / FLOW is the HOW (CRM wording replaced in public copy).
- [x] 2026-09-26 — Filled feature set with all additional cards (24 total) from the provided copy.
- [x] 2026-09-26 — Create account / Sign in now point to AI Office (`office.getleadsflow180.com`), not the CRM.
- [x] 2026-09-26 — Restored closing CTA spinning mesh face ring (replaced flat 3×7 grid).
- [x] 2026-09-26 — Nav/footer “Product” → “Features”; restored previous 3D FeatureCard HOW grid and kept the new white-card FeatureSet below it.

## Done — 2026-09-25

- [x] 2026-09-25 — Closing CTA faces as 3×7 grid (all 21 agents visible); team roster uses 7 columns on md+.
- [x] 2026-09-25 — Added Ava to the roster (21 agents); refreshed portraits from the latest set.
- [x] 2026-09-25 — Closing CTA ring atmosphere: concentric orbit tracks, pulse sparks, light beams, stage glow, and floating workspace chips behind/around the face ring.
- [x] 2026-09-25 — Retired “The Zen of Lead Gen” tagline (hero pill, footer outline, copyright, metadata, alts); installed updated wordmark logo with bottom padding so descenders aren’t clipped.
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
