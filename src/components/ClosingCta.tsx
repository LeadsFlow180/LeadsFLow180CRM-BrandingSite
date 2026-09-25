"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { agents, links } from "@/lib/site";
import { fadeUp, stagger } from "./Motion";

const SPARKS = [
  { top: "8%", left: "6%", size: 3, delay: "0s" },
  { top: "14%", left: "92%", size: 2, delay: "0.6s" },
  { top: "88%", left: "10%", size: 2, delay: "1.2s" },
  { top: "82%", left: "90%", size: 3, delay: "0.3s" },
  { top: "4%", left: "48%", size: 2, delay: "1.8s" },
  { top: "94%", left: "52%", size: 2, delay: "0.9s" },
] as const;

/** Soft stage props behind the face grid — glow, sparks, and light beams. */
function GridAtmosphere() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-visible">
      <div className="absolute top-1/2 left-1/2 size-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/35 blur-[70px] sm:size-[420px] sm:blur-[90px]" />
      <div className="absolute top-1/2 left-1/2 size-[140px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-[28px] sm:size-[200px]" />
      <div className="absolute -bottom-2 left-1/2 h-10 w-[80%] max-w-lg -translate-x-1/2 rounded-[100%] bg-brand/30 blur-2xl" />
      <div className="absolute top-[5%] left-[12%] h-[90%] w-px rotate-6 bg-gradient-to-b from-transparent via-brand/25 to-transparent sm:left-[8%]" />
      <div className="absolute top-[5%] right-[12%] h-[90%] w-px -rotate-6 bg-gradient-to-b from-transparent via-brand-purple/20 to-transparent sm:right-[8%]" />
      {SPARKS.map((s) => (
        <span
          key={`${s.top}-${s.left}`}
          className="spark-pulse absolute rounded-full bg-white shadow-[0_0_8px_rgba(143,149,255,0.8)]"
          style={
            {
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              animationDelay: s.delay,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

/** All agents in three rows of seven. */
function FaceGrid() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-3xl">
      <GridAtmosphere />
      <div className="relative grid grid-cols-7 gap-1 min-[380px]:gap-1.5 sm:gap-2.5">
        {agents.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: Math.min(i * 0.03, 0.45), ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-xl ring-1 ring-white/20 shadow-[0_12px_24px_-10px_rgba(1,13,255,0.7)] transition duration-300 hover:-translate-y-1 hover:ring-white/40 min-[380px]:rounded-2xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={a.photo}
              alt=""
              loading="lazy"
              className="aspect-[4/5] w-full object-cover object-top"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function ClosingCta() {
  return (
    <section className="grain relative bg-[#04050f] text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="brand-line absolute inset-x-0 top-0 h-[2px]" />
        <div className="orb top-[-35%] left-1/2 size-[680px] -translate-x-1/2 bg-brand/35" />
        <div className="orb bottom-[-30%] left-[10%] size-[380px] bg-brand-purple/30" />
        <div className="orb right-[5%] bottom-[-20%] size-[300px] bg-brand-green/10" />
        <div className="absolute inset-x-0 bottom-0 h-[55%] [perspective:700px]">
          <div className="floor-grid-dark absolute inset-x-[-40%] top-0 -bottom-1/2 origin-top [transform:rotateX(68deg)]" />
        </div>
        <div className="absolute inset-x-0 bottom-[42%] h-px bg-gradient-to-r from-transparent via-brand/70 to-transparent blur-[1px]" />
      </div>

      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="relative mx-auto max-w-4xl px-4 pt-14 pb-20 text-center sm:px-6 sm:pt-24 sm:pb-36"
      >
        <motion.div variants={fadeUp}>
          <FaceGrid />
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-white/70 uppercase ring-1 ring-white/10 backdrop-blur"
        >
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-brand-green/70 motion-reduce:animate-none" />
            <span className="relative size-2 rounded-full bg-brand-green" />
          </span>
          {agents.length} specialists ready
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="mt-6 text-3xl leading-[1] font-semibold tracking-[-0.04em] min-[380px]:text-4xl sm:text-6xl lg:text-7xl"
        >
          Ready to open your <span className="text-shimmer-light">workspace?</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/70 min-[380px]:mt-6 min-[380px]:text-base sm:text-lg">
          Your AI team is waiting in AI Office — and it speaks your customers’ language, in ten of them.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-8 flex flex-col justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center">
          <a
            href={links.signup}
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-b from-[#3a44ff] to-brand px-6 py-3.5 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_4px_0_#0008a8,0_20px_44px_-10px_rgba(1,13,255,0.95)] transition-[translate,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_6px_0_#0008a8,0_28px_54px_-10px_rgba(1,13,255,1)] active:translate-y-[3px] active:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_1px_0_#0008a8,0_8px_18px_-8px_rgba(1,13,255,0.8)] sm:px-8 sm:py-4 sm:text-base"
          >
            <span
              aria-hidden="true"
              className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-[320%]"
            />
            <span className="relative">Create account</span>
            <svg aria-hidden="true" viewBox="0 0 16 16" className="relative size-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" />
            </svg>
          </a>
          <a
            href={links.login}
            className="inline-flex items-center justify-center rounded-full bg-white/[0.06] px-6 py-3.5 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_4px_0_rgba(255,255,255,0.08)] ring-1 ring-white/20 backdrop-blur transition-[translate,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:bg-white/[0.1] hover:ring-white/40 active:translate-y-[3px] active:shadow-none sm:px-8 sm:py-4 sm:text-base"
          >
            Sign in
          </a>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-7">
          <a
            href={links.office}
            className="group inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
          >
            Or talk in AI Office
            <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
