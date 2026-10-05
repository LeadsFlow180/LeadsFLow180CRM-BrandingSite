"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AgentAskModal } from "@/components/agents/AgentAskModal";
import {
  getPortfolioFillers,
  type FactIcon,
  type PortfolioCard,
} from "@/lib/agentPortfolioFillers";
import type { AgentProfile } from "@/lib/agentProfiles";
import { officePhotoCandidates } from "@/lib/agentProfiles";
import type { Agent } from "@/lib/site";

type Props = {
  profile: AgentProfile & { agent: Agent };
  initialVerifyToken?: string | null;
};

const NAVY = "#0b1b4d";
const LIME = "#00ff26";

const cardShell: Record<PortfolioCard["tone"], { bg: string; btn: string; btnText: string }> = {
  blue: {
    bg: "linear-gradient(160deg,#1e40af 0%,#1d4ed8 40%,#0f172a 100%)",
    btn: LIME,
    btnText: "#0b1220",
  },
  green: {
    bg: "linear-gradient(160deg,#166534 0%,#15803d 45%,#052e16 100%)",
    btn: LIME,
    btnText: "#0b1220",
  },
  navy: {
    bg: "linear-gradient(160deg,#1e293b 0%,#0f172a 55%,#020617 100%)",
    btn: LIME,
    btnText: "#0b1220",
  },
  rose: {
    bg: "linear-gradient(160deg,#fb7185 0%,#e11d48 40%,#881337 100%)",
    btn: "#f5d0c5",
    btnText: "#4c0519",
  },
};

const cardTilt = [
  "-rotate-[8deg] translate-y-6 z-[1]",
  "rotate-[1deg] -translate-y-3 z-[2] scale-[1.04]",
  "rotate-[8deg] translate-y-6 z-[1]",
];

function SectionTitle({ title }: { title: string }) {
  const parts = title.split(" ");
  const first = parts[0] ?? title;
  const rest = parts.slice(1).join(" ");
  return (
    <h2 className="text-[1.7rem] font-bold tracking-[-0.03em] sm:text-[2rem]" style={{ color: NAVY }}>
      <span className="relative inline-block">
        {first}
        <span
          className="absolute -bottom-2 left-0 h-[3px] w-full rounded-full"
          style={{ background: LIME }}
          aria-hidden="true"
        />
      </span>
      {rest ? ` ${rest}` : null}
    </h2>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v7A2.5 2.5 0 0 1 16.5 16H11l-4 3.5V16H7.5A2.5 2.5 0 0 1 5 13.5v-7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 11V8a4 4 0 1 1 8 0v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function FactGlyph({ icon }: { icon: FactIcon }) {
  const s = { stroke: NAVY, strokeWidth: 1.7, fill: "none" as const };
  const c = "size-[26px] shrink-0";
  switch (icon) {
    case "soccer":
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8.5" {...s} />
          <path d="M12 7.2 14.6 9l-.7 3H10.1l-.7-3L12 7.2Z" {...s} strokeLinejoin="round" />
          <path d="m14.6 9 3.2.4-1.2 3.3-2.7-.1M9.4 9l-3.2.4 1.2 3.3 2.7-.1M13.9 12.1l1.6 3.1-3.5 1.6M10.1 12.1 8.5 15.2l3.5 1.6" {...s} strokeLinejoin="round" />
        </svg>
      );
    case "food":
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7.5 3v7M7.5 10v11M5.5 3v4.5a2 2 0 0 0 4 0V3M15.5 3v6.5c0 1.4-.9 2-1.8 2V21M15.5 3c1.8 0 2.8 1.3 2.8 3.5V10" {...s} strokeLinecap="round" />
        </svg>
      );
    case "travel":
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden="true">
          <path d="m10.5 13.5-7-2.2 1.3-1.3 5.2.6L14 4l1.6.6-1.2 6.8 4.6 3.2-.8 1.4-5.1-1.2-2.6 4.6-1.5-.5 1.5-5.4Z" {...s} strokeLinejoin="round" />
        </svg>
      );
    case "coffee":
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 9h11v5.5A3.5 3.5 0 0 1 12.5 18h-4A3.5 3.5 0 0 1 5 14.5V9Z" {...s} />
          <path d="M16 10.5h2A2.5 2.5 0 0 1 20.5 13v0A2.5 2.5 0 0 1 18 15.5h-2M8.5 4c.4.7.4 1.4 0 2.1M11.5 4c.4.7.4 1.4 0 2.1" {...s} strokeLinecap="round" />
        </svg>
      );
    case "camera":
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3.5" y="7" width="17" height="12.5" rx="2" {...s} />
          <circle cx="12" cy="13.2" r="3.2" {...s} />
          <path d="m8.2 7 1.4-2.4h4.8L15.8 7" {...s} strokeLinejoin="round" />
        </svg>
      );
    case "music":
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4.5 15a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Zm0 0V6.2L19 4v10.2" {...s} strokeLinecap="round" />
          <circle cx="19" cy="16.2" r="2.8" {...s} />
        </svg>
      );
    default:
      return (
        <svg className={c} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="7.5" {...s} />
        </svg>
      );
  }
}

function HeroWaves() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-[48%] overflow-hidden lg:block">
      <svg className="absolute top-0 right-0 h-full w-full" viewBox="0 0 520 720" fill="none" preserveAspectRatio="xMaxYMid slice">
        <path
          d="M80 0c90 70 50 160 130 230s150 70 170 160-50 150-20 240 100 90 100 90H520V0H80Z"
          fill="#dbe4ff"
          fillOpacity="0.55"
        />
        <path
          d="M180 20c70 55 35 130 100 185s130 55 150 130-35 130-15 205 80 100 80 100H520V20H180Z"
          fill="#d8ffe3"
          fillOpacity="0.55"
        />
      </svg>
    </div>
  );
}

/** Screenshot-matching agent portfolio layout (filler assets until sole bio/portfolio arrive). */
export function AgentPortfolioPage({ profile, initialVerifyToken }: Props) {
  const { agent } = profile;
  const fillers = getPortfolioFillers(profile);
  const { firstName, displayName, specialtyLabel, roleLabel, askCta, ctaHelper, heroHeadline } = fillers;
  const [askOpen, setAskOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const candidates = [...officePhotoCandidates(agent.id), profile.officePhoto, profile.portraitPhoto].filter(
    (u, i, arr) => arr.indexOf(u) === i,
  );
  const officeSrc = candidates[Math.min(photoIndex, candidates.length - 1)];

  useEffect(() => {
    if (initialVerifyToken) setAskOpen(true);
  }, [initialVerifyToken]);

  return (
    <div className="bg-white text-slate-950">
      <div className="border-b border-[#e8eef8] bg-white">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto flex max-w-6xl flex-wrap items-center gap-1.5 px-4 py-3.5 text-[12px] text-[#8aa0c4] sm:px-6"
        >
          <Link href="/" className="transition hover:text-brand">
            Home
          </Link>
          <span aria-hidden="true">›</span>
          <Link href="/#team" className="transition hover:text-brand">
            Our AI Office
          </Link>
          <span aria-hidden="true">›</span>
          <Link href="/agents" className="transition hover:text-brand">
            Meet the Team
          </Link>
          <span aria-hidden="true">›</span>
          <span className="font-medium text-[#4a5f8a]">{displayName}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <HeroWaves />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14 lg:py-16">
          <div className="overflow-hidden rounded-[20px] bg-slate-100 shadow-[0_32px_64px_-36px_rgba(11,27,77,0.5)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={officeSrc}
              alt={`${agent.name} in their LeadsFlow180 office`}
              className="aspect-[5/4] w-full object-cover object-[50%_26%]"
              onError={() => setPhotoIndex((i) => (i + 1 < candidates.length ? i + 1 : i))}
            />
          </div>

          <div className="relative max-w-md lg:max-w-lg">
            <p className="text-[11px] font-extrabold tracking-[0.22em] uppercase" style={{ color: LIME }}>
              {specialtyLabel}
            </p>
            <h1
              className="mt-3 text-[clamp(2.75rem,5.5vw,3.85rem)] leading-[1.02] font-bold tracking-[-0.048em]"
              style={{ color: NAVY }}
            >
              {displayName}
            </h1>
            <p className="mt-2 text-[1.125rem] font-semibold" style={{ color: NAVY }}>
              AI {roleLabel}
            </p>
            {heroHeadline ? (
              <p className="mt-4 text-[1.2rem] leading-snug font-semibold tracking-[-0.02em]" style={{ color: NAVY }}>
                {heroHeadline}
              </p>
            ) : null}
            <p className="mt-4 text-[15px] leading-[1.7] text-slate-600">{fillers.heroBlurb}</p>
            <button
              type="button"
              onClick={() => setAskOpen(true)}
              className="mt-8 inline-flex cursor-pointer items-center gap-2.5 rounded-full px-8 py-3.5 text-[15px] font-bold text-slate-950 shadow-[0_16px_36px_-14px_rgba(0,255,38,0.75)] transition hover:brightness-[0.97]"
              style={{ background: LIME }}
            >
              <ChatIcon className="size-[18px]" />
              {askCta}
            </button>
            <p className="mt-3.5 flex items-center gap-2 text-[12px] text-slate-500">
              <LockIcon className="size-3.5 shrink-0 opacity-70" />
              {ctaHelper}
            </p>
          </div>
        </div>
      </section>

      {/* Facts */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pt-6 pb-14 sm:px-6 sm:pt-8 sm:pb-16">
          <SectionTitle title={`Facts About ${firstName}`} />
          <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
            {fillers.facts.map((f) => (
              <li key={`${f.icon}-${f.label}`} className="flex items-start gap-3 lg:border-r lg:border-[#e6ecf5] lg:px-4 lg:[&:nth-child(6n)]:border-r-0">
                <FactGlyph icon={f.icon} />
                <span className="pt-0.5 text-[13px] leading-snug font-medium" style={{ color: NAVY }}>
                  {f.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Portfolio */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
          <SectionTitle title={`${firstName}'s Portfolio`} />
          <p className="mt-4 max-w-xl text-[15px] text-slate-500">{fillers.portfolioLead}</p>
          <div className="relative mt-14 flex flex-wrap items-center justify-center gap-3 pb-4 sm:gap-0 lg:min-h-[400px]">
            {fillers.portfolio.map((card, i) => {
              const tone = cardShell[card.tone];
              return (
                <article
                  key={card.id}
                  className={`w-[min(100%,200px)] rounded-[10px] bg-white p-2.5 shadow-[0_24px_50px_-22px_rgba(11,27,77,0.55)] ring-1 ring-black/[0.06] sm:w-[220px] lg:-mx-3 ${cardTilt[i] ?? ""}`}
                >
                  <div
                    className="relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-[6px] p-4 text-white"
                    style={{ background: tone.bg }}
                  >
                    {card.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={card.image}
                        alt=""
                        className="absolute inset-0 size-full object-cover"
                      />
                    ) : null}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background: card.image
                          ? "linear-gradient(to top, rgba(8,15,40,0.92) 0%, rgba(8,15,40,0.45) 45%, rgba(8,15,40,0.15) 100%)"
                          : "radial-gradient(circle at 25% 20%, rgba(255,255,255,0.28), transparent 42%), radial-gradient(circle at 80% 75%, rgba(0,0,0,0.28), transparent 48%)",
                      }}
                    />
                    <p className="relative text-[1.2rem] leading-[1.12] font-extrabold tracking-[-0.02em] drop-shadow-sm">
                      {card.title}
                    </p>
                    <p className="relative mt-2 line-clamp-2 text-[11px] leading-snug text-white/85">
                      {card.subtitle}
                    </p>
                    <span
                      className="relative mt-4 inline-flex w-fit rounded-md px-3 py-1.5 text-[10px] font-extrabold tracking-wide uppercase"
                      style={{ background: tone.btn, color: tone.btnText }}
                    >
                      {card.cta}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* About + Skills */}
      <section className="border-t border-[#eef2f8] bg-white">
        <div className="mx-auto grid max-w-6xl gap-14 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionTitle title={`About ${firstName}`} />
            <div className="mt-6 space-y-4 text-[15px] leading-[1.75] text-slate-600">
              {fillers.aboutParagraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
          </div>
          <div>
            <SectionTitle title={`${firstName}'s Capabilities`} />
            <p className="mt-3 text-[13px] text-slate-500">Core skills from the team profile pack — every item listed.</p>
            <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3.5 min-[420px]:grid-cols-2">
              {fillers.skills.map((skill) => (
                <li key={skill} className="flex items-center gap-2.5 text-[14px] font-medium text-slate-800">
                  <span
                    aria-hidden="true"
                    className="grid size-[18px] shrink-0 place-items-center rounded-full bg-brand text-[10px] font-bold text-white"
                  >
                    ✓
                  </span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ + Get started */}
      <section className="bg-[#f2f5fb]">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-8">
          <div className="rounded-2xl border border-[#d9e2f2] bg-white p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="flex items-center gap-2.5 text-[1.15rem] font-bold tracking-[-0.03em]" style={{ color: NAVY }}>
                <span
                  aria-hidden="true"
                  className="grid size-7 place-items-center rounded-full bg-brand text-sm font-bold text-white"
                >
                  ?
                </span>
                Frequently Asked Questions
              </h2>
              <Link href="/#pricing" className="text-[13px] font-semibold text-brand hover:underline">
                View All FAQs →
              </Link>
            </div>
            <div className="mt-5 space-y-2.5">
              {fillers.faqs.map((f) => (
                <details key={f.q} className="group rounded-xl bg-[#f3f6fb] open:bg-[#eaf0fa]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 text-[14px] font-semibold text-slate-900 marker:content-none [&::-webkit-details-marker]:hidden">
                    <span>{f.q}</span>
                    <span className="text-slate-400 transition group-open:rotate-180" aria-hidden="true">
                      ▾
                    </span>
                  </summary>
                  <p className="px-4 pb-3.5 text-[13px] leading-relaxed text-slate-600">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#d9e2f2] bg-white p-6 sm:p-8">
            <h2 className="flex items-center gap-2.5 text-[1.15rem] font-bold tracking-[-0.03em]" style={{ color: NAVY }}>
              <span aria-hidden="true" className="grid size-7 place-items-center rounded-full bg-brand/10 text-brand">
                <svg className="size-4" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5V5.5Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path d="M4 18.5h12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </span>
              How to Get Started
            </h2>
            <ol className="relative mt-8 space-y-8 before:absolute before:top-4 before:bottom-4 before:left-[15px] before:border-l before:border-dashed before:border-brand/40">
              {fillers.steps.map((step, i) => (
                <li key={step.title} className="relative flex gap-4">
                  <span className="relative z-[1] grid size-8 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-white shadow-[0_8px_18px_-8px_rgba(1,13,255,0.75)]">
                    {i + 1}
                  </span>
                  <div className="pt-0.5">
                    <p className="text-[15px] font-bold text-slate-950">{step.title}</p>
                    {step.detail ? (
                      <p className="mt-1 text-[13px] leading-relaxed text-slate-600">{step.detail}</p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Free Quick Guide */}
      {fillers.guide ? (
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
            <SectionTitle title="Free Quick Guide" />
            <div className="mt-8 rounded-2xl border border-[#d9e2f2] bg-[#f8fafc] p-6 sm:p-8">
              <h3 className="text-[1.25rem] font-bold tracking-[-0.03em]" style={{ color: NAVY }}>
                {fillers.guide.title}
              </h3>
              {fillers.guide.summary ? (
                <p className="mt-3 text-[14px] leading-relaxed text-slate-600">{fillers.guide.summary}</p>
              ) : null}
              <ol className="mt-6 space-y-3">
                {fillers.guide.steps.map((step, i) => (
                  <li key={step} className="flex gap-3 text-[14px] leading-relaxed text-slate-700">
                    <span
                      className="grid size-7 shrink-0 place-items-center rounded-full text-[12px] font-bold text-slate-950"
                      style={{ background: LIME }}
                    >
                      {i + 1}
                    </span>
                    <span className="pt-1">{step}</span>
                  </li>
                ))}
              </ol>
              {/* Reason: SEO pack forbids placeholder download links — show CTA text until a real PDF URL exists. */}
              <p className="mt-7 inline-flex rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-slate-700 ring-1 ring-[#d9e2f2]">
                {fillers.guide.downloadCta}
              </p>
              <p className="mt-2 text-[12px] text-slate-400">
                On-page guide is free to use now. PDF file will attach here when ready.
              </p>
              <p className="mt-4 text-[13px] text-slate-500">
                Prefer to talk it through?{" "}
                <button type="button" onClick={() => setAskOpen(true)} className="cursor-pointer font-semibold text-brand hover:underline">
                  {askCta}
                </button>
                {" · "}
                <Link href="/#pricing" className="font-semibold text-brand hover:underline">
                  View Launch Founders pricing
                </Link>
                {" · "}
                <Link href="/agents" className="font-semibold text-brand hover:underline">
                  Meet the Team
                </Link>
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <AgentAskModal
        open={askOpen}
        onClose={() => setAskOpen(false)}
        agentId={agent.id}
        agentName={agent.name}
        portraitPhoto={profile.portraitPhoto}
        initialVerifyToken={initialVerifyToken}
      />
    </div>
  );
}
