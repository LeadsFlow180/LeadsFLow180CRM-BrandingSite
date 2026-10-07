"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { integrationsFillers, type IntegrationCard } from "@/lib/integrationsFillers";
import { links } from "@/lib/site";
import { fadeUp, Reveal, stagger } from "@/components/Motion";

const BRIDGE_PANEL_ID = "bridge-panel";

const LANES = [
  { label: "Google Workspace", detail: "Sheets, Gmail, Calendar, and Drive stay synced to FLOW." },
  { label: "Leads & inbox", detail: "Facebook Lead Ads, Outlook, and Twilio bring conversations in." },
  { label: "Work & ops", detail: "Airtable and ClickUp keep projects and pipelines organized." },
  { label: "Site & commerce", detail: "WordPress and Shopify connect pages, forms, and orders." },
] as const;

const BRIDGES = [
  {
    id: "make",
    name: "Make",
    icon: "/integrations/icons/make.svg",
    tint: "#6D00CC",
    href: "https://www.make.com/en/integrations",
  },
  {
    id: "zapier",
    name: "Zapier",
    icon: "/integrations/icons/zapier.svg",
    tint: "#FF4A00",
    href: "https://zapier.com/apps",
  },
  {
    id: "n8n",
    name: "n8n",
    icon: "/integrations/icons/n8n.svg",
    tint: "#EA4B71",
    href: "https://n8n.io/integrations/",
  },
] as const;

function IntegrationLogo({ item, size = "md" }: { item: IntegrationCard; size?: "sm" | "md" }) {
  const [failed, setFailed] = useState(false);
  const box = size === "sm" ? "size-10" : "size-12";
  const img = size === "sm" ? "size-5" : "size-7";

  return (
    <div
      className={`grid ${box} place-items-center rounded-2xl bg-white ring-1 ring-black/[0.06]`}
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

function IntegrationTile({ item }: { item: IntegrationCard }) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      className="relative flex h-full flex-col overflow-hidden rounded-[22px] bg-white p-6 shadow-[0_18px_40px_-32px_rgba(15,23,42,0.35)] ring-1 ring-slate-200/80"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24"
        style={{ background: `radial-gradient(120% 80% at 20% 0%, ${item.tint}22, transparent 60%)` }}
      />
      <div className="relative">
        <IntegrationLogo item={item} />
      </div>
      <h3 className="relative mt-5 text-lg font-semibold tracking-[-0.02em] text-slate-950">{item.name}</h3>
      <p className="relative mt-2 text-[13px] leading-relaxed text-slate-600">{item.caps.join(" · ")}</p>
      <p className="relative mt-auto pt-5 text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase">
        {item.category}
      </p>
    </motion.article>
  );
}

function MoreCard({
  open,
  panelId,
  onToggle,
}: {
  open: boolean;
  panelId: string;
  onToggle: () => void;
}) {
  return (
    <motion.li variants={fadeUp} className="h-full">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className={`group relative flex h-full min-h-[220px] w-full flex-col justify-between overflow-hidden rounded-[22px] bg-[#04050f] p-6 text-left text-white shadow-[0_28px_60px_-36px_rgba(1,13,255,0.55)] ring-1 transition hover:-translate-y-1 ${
          open ? "ring-brand/50" : "ring-white/10"
        }`}
      >
        <div aria-hidden="true" className="orb -right-10 -top-10 size-40 bg-brand/50" />
        <div aria-hidden="true" className="brand-line absolute inset-x-0 top-0 h-[2px]" />
        <p className="relative text-[11px] font-bold tracking-[0.22em] text-brand-green uppercase">More</p>
        <div className="relative mt-6">
          <p className="text-3xl font-semibold tracking-[-0.04em]">+ thousands more</p>
          <p className="mt-3 text-[14px] leading-relaxed text-white/70">
            Check out your additional connections via Make, Zapier, or n8n.
          </p>
        </div>
        <span className="relative mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white">
          {open ? "Hide" : "See bridges"}
          <span
            aria-hidden="true"
            className={`inline-block transition ${open ? "rotate-90" : "group-hover:translate-x-1"}`}
          >
            →
          </span>
        </span>
      </button>
    </motion.li>
  );
}

function BridgeCards({ panelId }: { panelId: string }) {
  return (
    <div id={panelId} className="scroll-mt-28 pt-2">
      <p className="text-[13px] font-semibold tracking-[-0.01em] text-slate-800">
        Check out your additional connections
      </p>
      <ul className="mt-4 grid gap-4 sm:grid-cols-3">
        {BRIDGES.map((b) => (
          <li key={b.id}>
            <a
              href={b.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-full flex-col overflow-hidden rounded-[22px] bg-white p-6 shadow-[0_18px_40px_-32px_rgba(15,23,42,0.35)] ring-1 ring-slate-200/80 transition hover:-translate-y-1 hover:ring-slate-300"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-20"
                style={{ background: `radial-gradient(120% 80% at 20% 0%, ${b.tint}28, transparent 60%)` }}
              />
              <div
                className="relative grid size-12 place-items-center rounded-2xl bg-white ring-1 ring-black/[0.06]"
                style={{ boxShadow: `0 14px 32px -18px ${b.tint}99` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.icon} alt="" className="size-7 object-contain" />
              </div>
              <h3 className="relative mt-5 text-lg font-semibold tracking-[-0.02em] text-slate-950">{b.name}</h3>
              <p className="relative mt-2 flex-1 text-[13px] leading-relaxed text-slate-600">
                Check out all the possible connections with {b.name}.
              </p>
              <span className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                Open {b.name}
                <span aria-hidden="true" className="transition group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-[13px] leading-relaxed text-slate-500">
        You&apos;ll need your own Make, Zapier, or n8n account to authorize apps. FLOW uses those bridges so your
        stack stays connected.
      </p>
    </div>
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

/** 11 core connectors; “+ thousands more” expands Make / Zapier / n8n outbound cards. */
export function IntegrationsCenter() {
  const [open, setOpen] = useState(false);
  const [scrollToBridges, setScrollToBridges] = useState(false);
  const orbitItems = integrationsFillers.slice(0, 8);

  useEffect(() => {
    if (!open || !scrollToBridges) return;
    document.getElementById(BRIDGE_PANEL_ID)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    setScrollToBridges(false);
  }, [open, scrollToBridges]);

  function openBridges(scroll = true) {
    setOpen(true);
    if (scroll) setScrollToBridges(true);
  }

  return (
    <div>
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
              Eleven core connections your team uses most — plus thousands more through Make, Zapier, and n8n.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#core"
                className="inline-flex items-center rounded-full bg-gradient-to-b from-[#3a44ff] to-brand px-6 py-3 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_14px_28px_-12px_rgba(1,13,255,0.9)] transition hover:-translate-y-0.5"
              >
                See core connectors
              </a>
              <button
                type="button"
                onClick={() => openBridges(true)}
                className="inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold text-white/85 ring-1 ring-white/20 transition hover:bg-white/[0.06] hover:text-white"
              >
                + Thousands more
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="hidden sm:block">
            <LogoOrbit items={orbitItems} />
          </Reveal>
        </div>
      </section>

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

      <section id="core" className="scroll-mt-28 mt-16 sm:mt-20">
        <Reveal className="max-w-2xl">
          <p className="inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.28em] text-brand uppercase">
            <span className="brand-line h-[2px] w-8 rounded-full" />
            Core connectors
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">
            The eleven you&apos;ll use first.
          </h2>
        </Reveal>

        <motion.ul
          variants={stagger(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-8 grid gap-4 min-[420px]:grid-cols-2 xl:grid-cols-3"
        >
          {integrationsFillers.map((item) => (
            <li key={item.id}>
              <IntegrationTile item={item} />
            </li>
          ))}
          <MoreCard
            open={open}
            panelId={BRIDGE_PANEL_ID}
            onToggle={() => (open ? setOpen(false) : openBridges(false))}
          />
        </motion.ul>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="bridges"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-6 rounded-[22px] bg-canvas p-5 ring-1 ring-slate-200/70 sm:p-6">
                <BridgeCards panelId={BRIDGE_PANEL_ID} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <Reveal className="relative mt-16 overflow-hidden rounded-[28px] bg-[#04050f] px-6 py-12 text-white sm:mt-20 sm:rounded-[36px] sm:px-10 sm:py-14">
        <div aria-hidden="true" className="orb -right-20 -bottom-24 size-[320px] bg-brand/40" />
        <div aria-hidden="true" className="brand-line absolute inset-x-0 top-0 h-[2px]" />
        <p className="text-[11px] font-semibold tracking-[0.28em] text-brand-green uppercase">Owner control</p>
        <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
          Connectors draft. You approve.
        </h2>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-white/70">
          Ads spend, live publishing, and finance issue-and-pay stay human. Integrations feed the desk — they never
          skip your yes.
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
