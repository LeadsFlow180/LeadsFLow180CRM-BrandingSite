"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";
import { agents } from "@/lib/site";

type Props = {
  title: string;
  body: string;
  who: string;
  agentIds: string[];
  icon: ReactNode;
  visual: ReactNode;
  className?: string;
};

/** Bento card: pointer tilt, cursor-following glow, a floating product preview, and the agents who own it. */
export function FeatureCard({ title, body, who, agentIds, icon, visual, className = "" }: Props) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(x, [0, 1], [-6, 6]), { stiffness: 150, damping: 18 });
  const rotateX = useSpring(useTransform(y, [0, 1], [6, -6]), { stiffness: 150, damping: 18 });
  const glow = useMotionTemplate`radial-gradient(420px circle at ${useTransform(x, (v) => v * 100)}% ${useTransform(
    y,
    (v) => v * 100,
  )}%, rgba(1,13,255,0.12), transparent 65%)`;
  const team = agentIds.map((id) => agents.find((a) => a.id === id)!).filter(Boolean);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  };

  return (
    <div
      className={`h-full [perspective:1400px] ${className}`}
      onPointerMove={onMove}
      onPointerLeave={() => {
        x.set(0.5);
        y.set(0.5);
      }}
    >
      <motion.article
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative flex h-full flex-col overflow-hidden rounded-[22px] bg-white p-4 shadow-[0_1px_0_rgba(15,23,42,0.04),0_24px_48px_-32px_rgba(15,23,42,0.35)] ring-1 ring-slate-200/80 transition-shadow duration-500 hover:shadow-[0_50px_90px_-40px_rgba(1,13,255,0.5)] min-[380px]:rounded-[28px] min-[380px]:p-6 sm:p-7"
      >
        <motion.div aria-hidden="true" style={{ background: glow }} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div aria-hidden="true" className="brand-line absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100" />

        <div className="relative flex items-start justify-between gap-4">
          <span
            style={{ transform: "translateZ(40px)" }}
            className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-b from-[#3a44ff] to-brand text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_4px_0_#0008a8,0_14px_28px_-12px_rgba(1,13,255,0.8)]"
          >
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              {icon}
            </svg>
          </span>
          <ul className="flex -space-x-2" aria-label={`Handled by ${who}`}>
            {team.map((a) => (
              <li key={a.id} title={`${a.name} · ${a.title}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={a.photo}
                  alt={a.name}
                  className="size-8 rounded-full object-cover object-top ring-2 ring-white transition-transform duration-300 group-hover:-translate-y-0.5"
                />
              </li>
            ))}
          </ul>
        </div>

        <h3 className="relative mt-5 text-lg font-semibold tracking-tight text-slate-950 min-[380px]:mt-6 min-[380px]:text-xl">{title}</h3>
        <p className="relative mt-2 text-sm leading-relaxed text-slate-600 min-[380px]:mt-2.5 min-[380px]:text-[15px]">{body}</p>

        <div style={{ transform: "translateZ(30px)" }} className="relative mt-6 flex flex-1 flex-col justify-end">
          {visual}
        </div>

        <p className="relative mt-5 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-brand-purple">
          <span className="size-1.5 rounded-full bg-brand-green shadow-[0_0_6px_#00ff26]" />
          {who}
        </p>
      </motion.article>
    </div>
  );
}
