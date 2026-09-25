"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/** Small illustrative product previews for each feature card (decorative, aria-hidden). */

const chip = "rounded-md bg-white px-1.5 py-1 text-[9px] font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 min-[380px]:rounded-lg min-[380px]:px-2 min-[380px]:py-1.5 min-[380px]:text-[10px]";

const pipeline = [
  { t: "New", full: "New Lead", d: "bg-slate-400", deals: ["Harbor Dental", "Oak Roofing"] },
  { t: "Qual.", full: "Qualified", d: "bg-brand", deals: ["Bright Smiles Co."] },
  { t: "Prop.", full: "Proposal", d: "bg-brand-purple", deals: [] as string[] },
  { t: "Won", full: "Won", d: "bg-brand-green", deals: ["Summit Plumbing"] },
];

export function PipelineVisual() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-40px" });
  const [moved, setMoved] = useState(false);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = window.setInterval(() => setMoved((m) => !m), 2600);
    return () => window.clearInterval(id);
  }, [reduce, inView]);

  const movingCol = moved ? "Prop." : "Qual.";

  return (
    <div ref={ref} aria-hidden="true" className="grid grid-cols-4 gap-1 rounded-2xl bg-canvas p-2 ring-1 ring-slate-200/70 min-[380px]:gap-2 min-[380px]:p-2.5">
      {pipeline.map((c) => (
        <div key={c.full} className="min-w-0 space-y-1.5">
          <p className="flex items-center gap-1 truncate px-0.5 text-[8px] font-semibold text-slate-500 min-[380px]:text-[9px] sm:text-[10px]">
            <span className={`size-1.5 shrink-0 rounded-full ${c.d}`} />
            <span className="min-[380px]:hidden">{c.t}</span>
            <span className="hidden min-[380px]:inline">{c.full}</span>
          </p>
          {c.deals.map((d) => (
            <p key={d} className={`${chip} truncate`}>
              {d}
            </p>
          ))}
          {c.t === movingCol && (
            <motion.p
              layoutId="pipeline-moving-deal"
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className={`${chip} truncate shadow-[0_10px_20px_-8px_rgba(1,13,255,0.55)] ring-brand/40`}
            >
              Metro HVAC
            </motion.p>
          )}
        </div>
      ))}
    </div>
  );
}

export function InboxVisual() {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden="true" className="space-y-2 rounded-2xl bg-canvas p-3 ring-1 ring-slate-200/70">
      {[
        { tag: "Email", text: "Can we move Thursday?", me: false },
        { tag: "SMS", text: "Yes — 2pm works.", me: true },
        { tag: "Chat", text: "Thanks! See you then.", me: false },
      ].map((m) => (
        <div key={m.tag} className={`flex items-center gap-2 ${m.me ? "flex-row-reverse" : ""}`}>
          <span className="rounded-md bg-white px-1.5 py-0.5 text-[9px] font-semibold text-slate-500 ring-1 ring-slate-200">{m.tag}</span>
          <span
            className={`rounded-2xl px-3 py-1.5 text-[11px] ${
              m.me ? "rounded-br-sm bg-brand text-white" : "rounded-bl-sm bg-white text-slate-700 ring-1 ring-slate-200"
            }`}
          >
            {m.text}
          </span>
        </div>
      ))}
      <div className="flex items-center gap-1 pl-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="size-1.5 rounded-full bg-slate-400"
            animate={reduce ? undefined : { opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}

export function MarketingVisual() {
  return (
    <div aria-hidden="true" className="rounded-2xl bg-canvas p-3 ring-1 ring-slate-200/70">
      <div className="flex flex-wrap gap-1.5">
        {["Email", "Social", "Ads", "SEO", "Design"].map((c) => (
          <span key={c} className={chip}>
            {c}
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between gap-2 rounded-xl bg-white px-3 py-2 ring-1 ring-slate-200">
        <span className="text-[11px] font-medium text-slate-700">Waiting for your yes</span>
        <span className="relative h-5 w-9 rounded-full bg-slate-200">
          <span className="absolute top-0.5 left-0.5 size-4 rounded-full bg-white shadow" />
        </span>
      </div>
    </div>
  );
}

export function AutomationVisual() {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden="true" className="relative rounded-2xl bg-canvas p-3 ring-1 ring-slate-200/70">
      <div className="relative flex items-center justify-between gap-1">
        <div className="absolute inset-x-6 top-1/2 h-px bg-gradient-to-r from-brand/40 via-brand-purple/40 to-brand-green/60" />
        <motion.span
          className="absolute top-1/2 left-6 size-2 -translate-y-1/2 rounded-full bg-brand shadow-[0_0_10px_#010dff]"
          animate={reduce ? undefined : { left: ["6%", "90%"] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
        {["Trigger", "Wait", "Follow-up"].map((s) => (
          <span key={s} className={`${chip} relative`}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export function CalendarVisual() {
  const booked = new Set([1, 5, 9]);
  return (
    <div aria-hidden="true" className="rounded-2xl bg-canvas p-3 ring-1 ring-slate-200/70">
      <div className="grid grid-cols-5 gap-1 text-center text-[9px] font-semibold text-slate-400">
        {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="mt-1.5 grid grid-cols-5 gap-1">
        {Array.from({ length: 10 }, (_, i) => (
          <span
            key={i}
            className={`h-5 rounded-md ${booked.has(i) ? "bg-gradient-to-b from-[#3a44ff] to-brand shadow-[0_4px_10px_-4px_rgba(1,13,255,0.7)]" : "bg-white ring-1 ring-slate-200"}`}
          />
        ))}
      </div>
    </div>
  );
}

export function TasksVisual() {
  const rows = [
    { t: "Send proposal to Metro HVAC", who: "/agents/jordan.png", done: true },
    { t: "Weekly KPI report", who: "/agents/amir.png", done: false },
    { t: "Chair Monday planning", who: "/agents/mia.png", done: false },
  ];
  return (
    <div aria-hidden="true" className="space-y-1.5 rounded-2xl bg-canvas p-2.5 ring-1 ring-slate-200/70">
      {rows.map((r) => (
        <div key={r.t} className="flex items-center gap-2.5 rounded-xl bg-white px-2.5 py-2 ring-1 ring-slate-200">
          <span
            className={`flex size-4 shrink-0 items-center justify-center rounded-md ${
              r.done ? "bg-brand-green text-black" : "ring-1 ring-slate-300"
            }`}
          >
            {r.done && (
              <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 12l4 4 10-10" />
              </svg>
            )}
          </span>
          <span className={`min-w-0 flex-1 truncate text-[11px] ${r.done ? "text-slate-400 line-through" : "text-slate-700"}`}>{r.t}</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={r.who} alt="" className="size-5 shrink-0 rounded-full object-cover object-top" />
        </div>
      ))}
    </div>
  );
}
