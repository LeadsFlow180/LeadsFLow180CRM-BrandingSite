# Tasks

## Active

- [ ] Set canonical and Open Graph URL after the public domain is confirmed.
- [ ] Real Privacy and Terms pages or URLs (footer links point to `/privacy` and `/terms` for now).
- [ ] Replace draft agent bios in `src/lib/agentProfiles.ts` with the sole bio document (Lee + JoJo office cues already applied; stills in `public/agents/offices/`).

## Done — 2026-10-01

- [x] 2026-10-02 — “Visit {name}'s office” → `/agents/[id]` portfolio; `/agents` directory restored; walkthrough route paused (redirects to `/agents`).
- [x] 2026-10-01 — Agent portfolio redesign on `/agents/[id]`: screenshot layout (hero, facts, tilted portfolio, about/skills, FAQ + get started, ask modal); old office layout commented; filler data via `agentPortfolioFillers.ts`.
- [x] 2026-10-02 — Tighten `/agents/[id]` portfolio to match Lee mock (wave hero, 6 facts, polaroid cards, FAQ bars, get-started steps).
- [x] 2026-10-01 — Walkthrough branded to site theme (blue/purple/green, canvas) with richer CSS/JS motion; layout selectors unchanged.
- [x] 2026-10-01 — Host exact ChatGPT walkthrough at `/walkthrough/` (HTML/CSS/JS/scenes); `/agents` redirects there; Check-in dialog → `/agents/{id}#talk`; stage/footer Offices links updated.
- [x] 2026-10-01 — Desk stage matched to walkthrough: height-fit pan, white chrome, cream hotspot, dark-green stage; imported `/agents/offices/*.webp` scene stills.
- [x] 2026-10-01 — Fix walkthrough `#rooms` left clip (`justify-content: center` + overflow hid early tiles like Zenda); flex-start + scroll active into view.
- [x] 2026-10-01 — Walkthrough header uses real `/brand/logo-dark.png` (dark shell for contrast on light chrome).
- [x] 2026-10-01 — Walkthrough 3D motion: stage perspective tilt, cinematic room swaps, haze/bokeh overlays, dust, directory card tilt; Motion off respected.
- [x] 2026-10-01 — Clear muddy walkthrough overlays (removed haze/bokeh plates + transition blur) so office photos stay sharp.
- [x] 2026-10-01 — Full walkthrough redesign: black cinematic chrome, Syne/Manrope, full-bleed stage, filmstrip directory, brand line, 3D tilt (kept room/hotspot logic).
- [x] 2026-10-01 — Fix walkthrough crop: contain full office photos + blurred bleed; compact directory for more stage height.
- [x] 2026-10-01 — Walkthrough visual fix: light chrome, no photo crop (contain), bleed background, compact roster strip.
- [x] 2026-10-01 — Redesign `/agents/[id]` office pages (hero chrome, contain photo, clean bio/work/FAQ/talk) to brand 10/10.

## Done — 2026-09-30

- [x] 2026-09-30 — Office stage polish: full-bleed interactive photo, floating glass chrome, drag+inertia look-around, bright desk cards/tiles (no muddy vignettes).
- [x] 2026-09-30 — Walkthrough-style office: drag-to-look pan on the hero photo + desk card (image is the interactive element); “Drag to look across the room” hint + Check-in hotspot.
- [x] 2026-09-30 — 3D office depth: parallax office hero (blurred bleed / room / doorway planes), tilting `AgentDeskCard`, tilting `AgentOfficeTile` on `/agents`; all motion off under `prefers-reduced-motion`.
- [x] 2026-09-30 — Stage CTA: white “Visit {name}’s office” button + “Want to know more about our business?” line (replaced “Talk to {name} in AI Office”).
- [x] 2026-09-30 — Agent office pages (`/agents`, `/agents/[id]`): office hero, draft bios/personality/FAQs/work, Team stage “Visit office”, email verify + 3‑min talk + signup nudge.

## Done — 2026-09-28

- [x] 2026-09-28 — Stripe: auto-create Launch Founders Product + $697/mo Price via API (`stripeCatalog.ts`); only `STRIPE_SECRET_KEY` required.
- [x] 2026-09-28 — Pricing: enlarge Launch Founders Rate Special + Limited time / First 20 clients badges on the white card.
- [x] 2026-09-28 — Launch Founders pricing on the home page ($697/mo): today’s bonuses + countdown, Subscribe → Stripe Checkout (`/api/checkout`), success/cancel return banners; nav/footer Pricing jump.
- [x] 2026-09-28 — Header/footer use white+green wordmark (`logo-dark.png`) for black backgrounds; blue+green kept as `logo-light.png` for bright surfaces.

## Done — 2026-09-26

- [x] 2026-09-27 — Seamless sequence again: preload next clip, hold last frame until the next video paints, then cut (no photo pause between agents).
- [x] 2026-09-27 — Stage sound preference stays ON across refresh (localStorage); browsers still need one tap to unlock audio — we no longer flip the Mute button off on autoplay block.
- [x] 2026-09-27 — Mute/Unmute clickable (outside 3D layer; media ignores pointers); audio preferred on by default and re-unlocked on stage gestures.
- [x] 2026-09-27 — Stage pick performance: photo paints first, one video decoder, lighter roster (no layout anim), throttled progress/tilt, no dual-buffer wait.
- [x] 2026-09-27 — Stage portrait framing: dark fill (no white top hairline), default close-up zoom, per-agent crop for Jojo/Caleb/etc in `agentStageFrame.ts`.
- [x] 2026-09-27 — Stage sound defaults to unmuted with a Mute/Unmute toggle on the portrait; falls back to muted if the browser blocks autoplay-with-sound.
- [x] 2026-09-27 — Restored stage Unmute (compact top-left); clips autoplay muted until tapped, then audio stays on.
- [x] 2026-09-27 — Seamless stage video handoff: preload next clip, hold last frame until the next video paints (no still-photo gap); synced 13 agent videos into the manifest.
- [x] 2026-09-27 — Removed stage “Tap to play with sound” overlay; agent clips autoplay muted.
- [x] 2026-09-26 — Stage unmute control: large centered play button + “Tap to play with sound” overlay (browsers block autoplay with audio).
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
