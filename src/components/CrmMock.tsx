"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { ease } from "./Motion";

const tabs = ["Dashboard", "Inbox", "Sales", "Marketing", "Automation"];

const metrics = [
  { label: "Contacts", value: 128, format: (n: number) => `${n}` },
  { label: "Open deals", value: 14, format: (n: number) => `${n}` },
  { label: "Pipeline", value: 48, format: (n: number) => `$${n}k` },
  { label: "Tasks", value: 9, format: (n: number) => `${n}` },
];

const columns = [
  {
    title: "New Lead",
    dot: "bg-slate-400",
    deals: [
      { name: "Harbor Dental", value: "$4,200", tag: "Web form" },
      { name: "Oak Roofing", value: "$7,800", tag: "Call" },
    ],
  },
  {
    title: "Qualified",
    dot: "bg-brand",
    deals: [
      { name: "Bright Smiles Co.", value: "$12,500", tag: "Proposal" },
      { name: "Metro HVAC", value: "$6,100", tag: "Meeting" },
    ],
  },
  {
    title: "Won",
    dot: "bg-brand-green",
    deals: [{ name: "Summit Plumbing", value: "$9,400", tag: "Signed" }],
  },
];

function Counter({ to, format, start }: { to: number; format: (n: number) => string; start: boolean }) {
  const [n, setN] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!start || reduce) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease,
      delay: 0.6,
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [start, to, reduce]);
  return <>{format(reduce ? to : n)}</>;
}

export function CrmMock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-12, 4]), { stiffness: 120, damping: 20 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [8, -4]), { stiffness: 120, damping: 20 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div ref={ref} className="relative [perspective:1600px]" onPointerMove={onMove} onPointerLeave={onLeave}>
      <motion.div
        initial={{ opacity: 0, x: 60, rotateY: -18 }}
        animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : undefined}
        transition={{ duration: 1.1, ease, delay: 0.2 }}
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative lg:[transform:rotateY(-6deg)_rotateX(4deg)]"
        >
          <div className="overflow-hidden rounded-[22px] border border-white/60 bg-white shadow-[0_50px_100px_-30px_rgba(1,13,255,0.35),0_30px_60px_-30px_rgba(15,23,42,0.45)] ring-1 ring-slate-900/5">
            <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2.5">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 min-w-0 flex-1 truncate rounded-md bg-white px-3 py-1 text-[11px] text-slate-500 ring-1 ring-slate-200">
                app.leadsflow180.com/crm
              </span>
            </div>
            <div className="flex items-center justify-between bg-black px-4 py-2.5">
              <span className="text-[11px] font-bold tracking-[0.2em] text-white">LEADSFLOW180</span>
              <span className="flex items-center gap-1.5 text-[10px] text-white/60">
                <span className="size-1.5 animate-pulse rounded-full bg-brand-green" />
                Live
              </span>
            </div>
            <div className="brand-line h-[2px]" />
            <div className="flex gap-1 overflow-hidden border-b border-slate-200 px-3 pt-2">
              {tabs.map((t, i) => (
                <span
                  key={t}
                  className={`relative shrink-0 rounded-t-lg px-2.5 py-2 text-[11px] font-medium sm:text-xs ${
                    i === 0 ? "text-brand" : "text-slate-500"
                  }`}
                >
                  {t}
                  {i === 0 && (
                    <motion.span
                      className="absolute inset-x-1 -bottom-px h-[2px] rounded-full bg-brand"
                      animate={reduce ? undefined : { boxShadow: ["0 0 0px #010dff", "0 0 10px #010dff", "0 0 0px #010dff"] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}
                </span>
              ))}
            </div>
            <div className="bg-canvas p-3 sm:p-4">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {metrics.map((m) => (
                  <div key={m.label} className="rounded-xl bg-white p-2.5 ring-1 ring-slate-200/80 sm:p-3">
                    <p className="text-[10px] text-slate-500 sm:text-[11px]">{m.label}</p>
                    <p className="mt-0.5 text-lg font-semibold tracking-tight text-slate-900 tabular-nums sm:text-xl">
                      <Counter to={m.value} format={m.format} start={inView} />
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {columns.map((col, ci) => (
                  <div key={col.title} className="min-w-0 rounded-xl bg-white/70 p-2 ring-1 ring-slate-200/70">
                    <p className="flex items-center gap-1.5 truncate px-1 text-[10px] font-semibold text-slate-600 sm:text-[11px]">
                      <span className={`size-1.5 shrink-0 rounded-full ${col.dot}`} />
                      {col.title}
                    </p>
                    <div className="mt-2 space-y-1.5">
                      {col.deals.map((d, di) => (
                        <motion.div
                          key={d.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={inView ? { opacity: 1, y: 0 } : undefined}
                          transition={{ duration: 0.6, ease, delay: 0.9 + ci * 0.15 + di * 0.1 }}
                          className="rounded-lg bg-white p-2 shadow-sm ring-1 ring-slate-200"
                        >
                          <p className="truncate text-[10px] font-semibold text-slate-900 sm:text-[11px]">{d.name}</p>
                          <p className="mt-0.5 flex items-center justify-between gap-1 text-[9px] text-slate-500 sm:text-[10px]">
                            <span className="tabular-nums">{d.value}</span>
                            <span className="hidden truncate rounded bg-slate-100 px-1 sm:inline">{d.tag}</span>
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <motion.div
            aria-hidden="true"
            style={{ transform: "translateZ(60px)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, ease, delay: 1.5 }}
            className="absolute -bottom-5 -left-3 hidden items-center gap-2 rounded-2xl bg-black px-3.5 py-2.5 text-white shadow-2xl sm:flex"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/agents/jordan.png" alt="" className="size-8 rounded-full object-cover object-top" />
            <span className="text-[11px] leading-tight">
              <span className="block font-semibold">Jordan moved a deal</span>
              <span className="text-white/60">Qualified → Proposal</span>
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
