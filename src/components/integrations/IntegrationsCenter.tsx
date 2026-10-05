"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  integrationsFillers,
  integrationUseCases,
  type IntegrationCard,
} from "@/lib/integrationsFillers";
import { links } from "@/lib/site";
import { ease, fadeUp, Reveal, stagger } from "@/components/Motion";

type Tab = "discover" | "installed";

const LANES = [
  { label: "Ads & spend", detail: "Google, Meta, LinkedIn, YouTube — spend waits for your OK." },
  { label: "Inbox & phone", detail: "Gmail, Slack, Twilio keep conversations in one FLOW desk." },
  { label: "Book & pay", detail: "Calendly, Stripe, QuickBooks for schedule and money loops." },
  { label: "Site & automate", detail: "WordPress, Zapier, Make wire pages and follow-ups." },
] as const;

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IntegrationLogo({ item, size = "md" }: { item: IntegrationCard; size?: "sm" | "md" | "lg" }) {
  const [failed, setFailed] = useState(false);
  const box = size === "lg" ? "size-16" : size === "sm" ? "size-10" : "size-12";
  const img = size === "lg" ? "size-9" : size === "sm" ? "size-5" : "size-7";

  return (
    <div
      className={`grid ${box} place-items-center rounded-2xl bg-white shadow-[0_12px_28px_-16px_rgba(15,23,42,0.45)] ring-1 ring-black/[0.06]`}
      style={{ boxShadow: `0 14px 32px -18px ${item.tint}99` }}
    >
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.icon} alt="" className={`${img} object-contain`} onError={() => setFailed(true)} />
      ) : (
        <span className="text-xs font-bold text-slate-700">{item.mark}</span>
      )}
    </div>
  );
}

function IntegrationTile({ item, featured = false }: { item: IntegrationCard; featured?: boolean }) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={featured ? { y: -6 } : { y: -4 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-[22px] bg-white p-6 ring-1 ring-slate-200/80 ${
        featured
          ? "shadow-[0_28px_60px_-36px_rgba(1,13,255,0.55)] sm:p-7"
          : "shadow-[0_18px_40px_-32px_rgba(15,23,42,0.35)]"
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-80"
        style={{
          background: `radial-gradient(120% 80% at 20% 0%, ${item.tint}22, transparent 60%)`,
        }}
      />
      <div className="relative flex items-start justify-between gap-3">
        <IntegrationLogo item={item} size={featured ? "lg" : "md"} />
        {item.installed ? (
          <span className="rounded-full bg-brand-green/15 px-2.5 py-1 text-[10px] font-bold tracking-wide text-[#0a7a1c] uppercase">
            Live
          </span>
        ) : (
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold tracking-wide text-slate-500 uppercase">
            Sample
          </span>
        )}
      </div>
      <h3 className="relative mt-5 text-lg font-semibold tracking-[-0.02em] text-slate-950">{item.name}</h3>
      <p className="relative mt-1 text-[13px] font-medium text-slate-500">{item.builder}</p>
      <p className="relative mt-4 text-[13px] leading-relaxed text-slate-600">
        {item.caps.join(" · ")} — wired into FLOW for owner-approved work.
      </p>
      <div className="relative mt-auto flex items-center justify-between gap-3 pt-6">
        <span className="text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase">{item.category}</span>
        <span className="text-[12px] font-semibold text-brand opacity-0 transition group-hover:opacity-100">
          View details →
        </span>
      </div>
    </motion.article>
  );
}

function LogoOrbit({ items }: { items: IntegrationCard[] }) {
  const reduce = useReducedMotion();
  const ring = items.slice(0, 8);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      <div
        aria-hidden="true"
        className="absolute inset-[18%] rounded-full bg-gradient-to-br from-brand/30 to-brand-purple/20 blur-2xl"
      />
      <div className="absolute inset-[28%] grid place-items-center rounded-full bg-white/[0.06] ring-1 ring-white/15 backdrop-blur-md">
        <div className="text-center">
          <p className="text-[10px] font-bold tracking-[0.28em] text-brand-green uppercase">FLOW</p>
          <p className="mt-1 text-sm font-semibold text-white">Connected desk</p>
        </div>
      </div>
      {ring.map((item, i) => {
        const angle = (i / ring.length) * Math.PI * 2 - Math.PI / 2;
        const r = 42;
        const x = 50 + Math.cos(angle) * r;
        const y = 50 + Math.sin(angle) * r;
        return (
          <motion.div
            key={item.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
            animate={reduce ? undefined : { y: [0, i % 2 === 0 ? -6 : 6, 0] }}
            transition={{ duration: 4.2 + i * 0.15, repeat: Infinity, ease: "easeInOut" }}
          >
            <IntegrationLogo item={item} size="sm" />
          </motion.div>
        );
      })}
    </div>
  );
}

/** Premium marketing Integrations page — brand atmosphere + interactive catalog. */
export function IntegrationsCenter() {
  const [tab, setTab] = useState<Tab>("discover");
  const [query, setQuery] = useState("");
  const [useCase, setUseCase] = useState<(typeof integrationUseCases)[number]>("All Integrations");

  const installedCount = integrationsFillers.filter((i) => i.installed).length;
  const orbitItems = useMemo(
    () => integrationsFillers.filter((i) => i.recommended).slice(0, 8),
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return integrationsFillers
      .filter((i) => {
        if (tab === "installed" && !i.installed) return false;
        if (useCase !== "All Integrations" && !i.useCases.includes(useCase)) return false;
        if (!q) return true;
        return (
          i.name.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q) ||
          i.caps.some((c) => c.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [tab, query, useCase]);

  const featured = useMemo(
    () => (tab === "discover" ? filtered.filter((i) => i.recommended).slice(0, 3) : []),
    [filtered, tab],
  );

  return (
    <div>
      {/* Hero — one composition */}
      <section className="relative overflow-hidden rounded-[28px] bg-[#04050f] text-white shadow-[0_40px_90px_-48px_rgba(1,13,255,0.7)] ring-1 ring-white/10 sm:rounded-[36px]">
        <div aria-hidden="true" className="brand-line absolute inset-x-0 top-0 h-[2px] opacity-90" />
        <div aria-hidden="true" className="orb -top-24 left-[-10%] size-[420px] bg-brand/35" />
        <div aria-hidden="true" className="orb top-[30%] right-[-15%] size-[380px] bg-brand-purple/30" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000,transparent)]"
        />

        <div className="relative grid items-center gap-10 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-20">
          <Reveal>
            <p className="inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.28em] text-brand-green uppercase">
              <span className="brand-line h-[2px] w-8 rounded-full" />
              Integrations
            </p>
            <h1 className="mt-5 text-[clamp(2.4rem,5vw,3.75rem)] leading-[1.02] font-semibold tracking-[-0.045em]">
              One FLOW desk.
              <span className="text-brand-gradient"> Every tool in reach.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
              Connect ads, inbox, bookings, payments, and websites to the same workspace your AI team already
              works from — with human approval still on for spend and publishing.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#catalog"
                className="inline-flex items-center rounded-full bg-gradient-to-b from-[#3a44ff] to-brand px-6 py-3 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_14px_28px_-12px_rgba(1,13,255,0.9)] transition hover:-translate-y-0.5"
              >
                Browse connectors
              </a>
              <a
                href={links.office}
                className="inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold text-white/85 ring-1 ring-white/20 transition hover:bg-white/[0.06] hover:text-white"
              >
                Open AI Office
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="hidden sm:block">
            <LogoOrbit items={orbitItems} />
          </Reveal>
        </div>
      </section>

      {/* Lanes */}
      <motion.ul
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {LANES.map((lane) => (
          <motion.li
            key={lane.label}
            variants={fadeUp}
            className="rounded-[22px] bg-canvas px-5 py-5 ring-1 ring-slate-200/70"
          >
            <p className="text-[13px] font-bold tracking-tight text-slate-950">{lane.label}</p>
            <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{lane.detail}</p>
          </motion.li>
        ))}
      </motion.ul>

      {/* Catalog */}
      <section id="catalog" className="scroll-mt-28 mt-16 sm:mt-20">
        <Reveal className="max-w-2xl">
          <p className="inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.28em] text-brand uppercase">
            <span className="brand-line h-[2px] w-8 rounded-full" />
            Connector catalog
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">
            Pick a lane. Find the wire.
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Sample connectors for layout and storytelling — install flows ship with the live product.
          </p>
        </Reveal>

        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-2 rounded-full bg-slate-100/80 p-1 ring-1 ring-slate-200/80">
            {(
              [
                { id: "discover" as const, label: "Discover" },
                { id: "installed" as const, label: `Connected (${installedCount})` },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition ${
                  tab === t.id
                    ? "bg-slate-950 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <label className="relative w-full max-w-md">
            <span className="sr-only">Search integrations</span>
            <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Google Ads, Stripe, Slack…"
              className="w-full rounded-full border-0 bg-white py-3 pr-4 pl-11 text-sm text-slate-800 shadow-[0_12px_30px_-20px_rgba(15,23,42,0.45)] ring-1 ring-slate-200/90 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-brand/35"
            />
          </label>
        </div>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {integrationUseCases.map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => setUseCase(u)}
              className={`shrink-0 cursor-pointer rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition ${
                useCase === u
                  ? "bg-brand text-white"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:text-slate-950"
              }`}
            >
              {u === "All Integrations" ? "All" : u}
            </button>
          ))}
        </div>

        {featured.length > 0 ? (
          <div className="mt-12">
            <h3 className="text-[13px] font-bold tracking-[0.16em] text-slate-500 uppercase">Featured</h3>
            <motion.ul
              key={`feat-${tab}-${useCase}-${query}`}
              variants={stagger(0.07)}
              initial="hidden"
              animate="show"
              className="mt-4 grid gap-4 lg:grid-cols-3"
            >
              {featured.map((item) => (
                <li key={`f-${item.id}`}>
                  <IntegrationTile item={item} featured />
                </li>
              ))}
            </motion.ul>
          </div>
        ) : null}

        <div className="mt-12">
          <div className="flex items-end justify-between gap-3">
            <h3 className="text-[13px] font-bold tracking-[0.16em] text-slate-500 uppercase">
              {tab === "installed" ? "Connected" : "Full catalog"}
            </h3>
            <p className="text-sm font-medium text-slate-400">{filtered.length} connectors</p>
          </div>

          {filtered.length === 0 ? (
            <p className="mt-8 rounded-[22px] bg-canvas px-6 py-12 text-center text-sm text-slate-500 ring-1 ring-slate-200/70">
              Nothing matches that search. Try another lane or clear the filter.
            </p>
          ) : (
            <motion.ul
              key={`all-${tab}-${useCase}-${query}`}
              variants={stagger(0.05, 0.05)}
              initial="hidden"
              animate="show"
              className="mt-5 grid gap-4 min-[420px]:grid-cols-2 xl:grid-cols-3"
            >
              {filtered.map((item) => (
                <li key={item.id}>
                  <IntegrationTile item={item} />
                </li>
              ))}
            </motion.ul>
          )}
        </div>
      </section>

      {/* Closing band */}
      <Reveal className="relative mt-16 overflow-hidden rounded-[28px] bg-[#04050f] px-6 py-12 text-white sm:mt-20 sm:rounded-[36px] sm:px-10 sm:py-14">
        <div aria-hidden="true" className="orb -right-20 -bottom-24 size-[320px] bg-brand/40" />
        <div aria-hidden="true" className="brand-line absolute inset-x-0 top-0 h-[2px]" />
        <p className="text-[11px] font-semibold tracking-[0.28em] text-brand-green uppercase">Owner control</p>
        <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
          Connectors draft. You approve.
        </h2>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-white/70">
          Ads spend, live publishing, and finance issue-and-pay stay human. Integrations feed the desk — they
          never skip your yes.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={links.signup}
            className="inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:brightness-95"
          >
            Create account
          </a>
          <a
            href="/#pricing"
            className="inline-flex rounded-full px-5 py-2.5 text-sm font-semibold text-white/85 ring-1 ring-white/20 transition hover:bg-white/[0.06]"
          >
            View Launch Founders
          </a>
        </div>
      </Reveal>
    </div>
  );
}
