"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { FeatureCard } from "./features/FeatureCard";
import {
  AutomationVisual,
  CalendarVisual,
  InboxVisual,
  MarketingVisual,
  PipelineVisual,
  TasksVisual,
} from "./features/FeatureVisuals";
import { WorkspaceDeck } from "./features/WorkspaceDeck";
import { fadeUp, Reveal, stagger } from "./Motion";

type Feature = {
  title: string;
  body: string;
  who: string;
  agentIds: string[];
  icon: ReactNode;
  visual: ReactNode;
  span: string;
};

const features: Feature[] = [
  {
    title: "Sales pipeline",
    body: "Deals, proposals, and stages in one board. Jordan moves the lead from first touch to close.",
    who: "Jordan · Mark",
    agentIds: ["jordan", "mark"],
    icon: <path d="M4 5h16M4 12h10M4 19h6" />,
    visual: <PipelineVisual />,
    span: "sm:col-span-2",
  },
  {
    title: "Unified inbox",
    body: "Email, SMS, and chat in a single thread per contact. Sonja keeps every reply on time.",
    who: "Sonja",
    agentIds: ["sonja"],
    icon: <path d="M4 6h16v10H8l-4 4V6z" />,
    visual: <InboxVisual />,
    span: "",
  },
  {
    title: "Marketing & social",
    body: "Email, social, ads, SEO, and design from the same desk. Spend and publishing wait for your yes.",
    who: "Jay · Zenda · Lee · Caleb",
    agentIds: ["jay", "zenda", "lee", "caleb"],
    icon: <path d="M4 14l4-4 4 4 8-8M14 6h6v6" />,
    visual: <MarketingVisual />,
    span: "",
  },
  {
    title: "Automation",
    body: "Workflows that follow up while you work the next lead. Omar keeps them healthy.",
    who: "Omar",
    agentIds: ["omar"],
    icon: <path d="M13 3L5 14h6l-1 7 8-11h-6l1-7z" />,
    visual: <AutomationVisual />,
    span: "",
  },
  {
    title: "Appointments",
    body: "Calendars, bookings, and the official schedule — without the back-and-forth.",
    who: "Danica",
    agentIds: ["danica"],
    icon: <path d="M5 6h14v14H5zM5 10h14M9 3v4M15 3v4" />,
    visual: <CalendarVisual />,
    span: "",
  },
  {
    title: "Tasks & team desk",
    body: "Who owns what, and by when. Mia chairs the work; Amir makes the numbers readable.",
    who: "Mia · Amir",
    agentIds: ["mia", "amir"],
    icon: <path d="M5 12l4 4 10-10" />,
    visual: <TasksVisual />,
    span: "sm:col-span-2",
  },
];

function ApprovalCard() {
  return (
    <article className="grain relative flex h-full flex-col justify-between overflow-hidden rounded-[22px] bg-[#04050f] p-4 text-white shadow-[0_40px_80px_-40px_rgba(1,13,255,0.6)] ring-1 ring-white/10 min-[380px]:rounded-[28px] min-[380px]:p-6 sm:p-7">
      <div aria-hidden="true" className="orb -top-20 -right-16 size-[260px] bg-brand/40" />
      <div className="relative">
        <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur min-[380px]:size-12">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6 text-brand-green" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6l8-3z" />
            <path d="M8.5 12l2.5 2.5 4.5-5" />
          </svg>
        </span>
        <p className="mt-5 text-lg leading-snug font-semibold tracking-tight min-[380px]:mt-6 min-[380px]:text-xl">
          Human approval stays on for ads spend, live publishing, and finance issue and pay.
        </p>
      </div>
      <ul aria-hidden="true" className="relative mt-5 space-y-2 min-[380px]:mt-6">
        {["Ads spend", "Live publishing", "Finance issue & pay"].map((t) => (
          <li key={t} className="flex items-center justify-between gap-2 rounded-xl bg-white/[0.06] px-3 py-2 text-xs ring-1 ring-white/10 min-[380px]:px-3.5 min-[380px]:py-2.5 min-[380px]:text-sm">
            <span className="min-w-0 truncate">{t}</span>
            <span className="inline-flex shrink-0 items-center gap-1.5 text-[9px] font-semibold tracking-[0.14em] text-brand-green uppercase min-[380px]:text-[10px] min-[380px]:tracking-[0.16em]">
              <span className="size-1.5 rounded-full bg-brand-green shadow-[0_0_6px_#00ff26]" />
              You approve
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function Features() {
  return (
    <section id="features" className="relative scroll-mt-20 overflow-hidden py-16 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(15,23,42,0.08)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_40%_at_50%_0%,#000,transparent)]"
      />
      <div aria-hidden="true" className="orb top-0 left-[-15%] size-[460px] bg-brand/10" />
      <div aria-hidden="true" className="orb bottom-0 right-[-15%] size-[420px] bg-brand-purple/10" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-3xl">
          <p className="inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.28em] text-brand uppercase">
            <span className="brand-line h-[2px] w-8 rounded-full" />
            The HOW
          </p>
          <h2 className="mt-4 text-3xl leading-[1.02] font-semibold tracking-[-0.035em] text-slate-950 min-[380px]:text-4xl sm:text-6xl">
            The tools are <span className="text-brand-gradient">already in place.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            One login. One CRM. Agencies and growing teams run sub-accounts inside the same workspace, and the AI
            team works from the same desk you do. Creative work lives here too.
          </p>
        </Reveal>

        <motion.ul
          variants={stagger(0.09)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
        >
          {features.map((f) => (
            <motion.li key={f.title} variants={fadeUp} className={f.span}>
              <FeatureCard {...f} />
            </motion.li>
          ))}
          <motion.li variants={fadeUp} className="sm:col-span-2 lg:col-span-1">
            <ApprovalCard />
          </motion.li>
        </motion.ul>
      </div>
    </section>
  );
}

export function Workspace() {
  return (
    <section className="relative overflow-hidden border-t border-slate-200/80 bg-canvas-2 py-16 sm:py-28">
      <div aria-hidden="true" className="orb top-[-20%] right-[10%] size-[420px] bg-brand/10" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <Reveal>
          <p className="inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.28em] text-brand uppercase">
            <span className="brand-line h-[2px] w-8 rounded-full" />
            Workspace
          </p>
          <h2 className="mt-4 text-3xl leading-[1.05] font-semibold tracking-[-0.035em] text-slate-950 sm:text-5xl">
            The same modules you use after you sign in.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <WorkspaceDeck />
        </Reveal>
      </div>
    </section>
  );
}
