"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { agents, links } from "@/lib/site";
import { fadeUp, stagger } from "./Motion";

const STEP = 360 / agents.length;

/** All twenty agents on a slowly turning 3D ring (CSS-driven; stops under reduced motion). */
function FaceRing() {
  return (
    <div aria-hidden="true" className="relative mx-auto h-28 w-full overflow-hidden [perspective:900px] min-[380px]:h-36 sm:h-44">
      <div className="absolute inset-0 flex items-center justify-center [transform:rotateX(-20deg)] [transform-style:preserve-3d]">
        <div className="face-ring relative size-0 [--r:105px] [transform-style:preserve-3d] min-[380px]:[--r:140px] sm:[--r:230px] lg:[--r:340px]">
          {agents.map((a, i) => (
            <div
              key={a.id}
              className="absolute -top-4 -left-4 size-8 min-[380px]:-top-5 min-[380px]:-left-5 min-[380px]:size-10 sm:-top-6 sm:-left-6 sm:size-12 lg:-top-7 lg:-left-7 lg:size-14"
              style={{ transform: `rotateY(${i * STEP}deg) translateZ(var(--r))` } as CSSProperties}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={a.photo}
                alt=""
                loading="lazy"
                className="size-full rounded-2xl object-cover object-top shadow-[0_18px_30px_-12px_rgba(1,13,255,0.8)] ring-2 ring-white/20"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ClosingCta() {
  return (
    <section className="grain relative overflow-hidden bg-[#04050f] text-white">
      <div className="brand-line h-[2px]" aria-hidden="true" />
      <div aria-hidden="true" className="orb top-[-35%] left-1/2 size-[680px] -translate-x-1/2 bg-brand/35" />
      <div aria-hidden="true" className="orb bottom-[-30%] left-[10%] size-[380px] bg-brand-purple/30" />
      <div aria-hidden="true" className="orb right-[5%] bottom-[-20%] size-[300px] bg-brand-green/10" />

      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[55%] [perspective:700px]">
        <div className="floor-grid-dark absolute inset-x-[-40%] top-0 -bottom-1/2 origin-top [transform:rotateX(68deg)]" />
      </div>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-[42%] h-px bg-gradient-to-r from-transparent via-brand/70 to-transparent blur-[1px]" />

      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="relative mx-auto max-w-4xl px-4 pt-14 pb-20 text-center sm:px-6 sm:pt-24 sm:pb-36"
      >
        <motion.div variants={fadeUp}>
          <FaceRing />
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
