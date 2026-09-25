"use client";

import { motion, useMotionValue, useReducedMotion, type Variants } from "framer-motion";
import type { PointerEvent } from "react";
import { languageLine, links } from "@/lib/site";
import { CrmMock } from "./CrmMock";
import { HeroBackdrop } from "./HeroBackdrop";
import { HeroFaces } from "./HeroFaces";
import { ease, fadeUp, stagger } from "./Motion";

const flipWord: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: -85 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 1, ease } },
};

function Headline() {
  return (
    <motion.h1
      variants={stagger(0.12)}
      className="mt-6 text-[2.35rem] leading-[0.95] font-semibold tracking-[-0.045em] text-slate-950 [perspective:800px] min-[380px]:text-[2.9rem] sm:text-7xl lg:text-[5.5rem]"
    >
      {["Meet", "the"].map((w) => (
        <motion.span key={w} variants={flipWord} className="mr-[0.22em] inline-block origin-bottom">
          {w}
        </motion.span>
      ))}
      <motion.span variants={flipWord} className="relative inline-block origin-bottom">
        <span className="text-shimmer">WHO.</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 220 20"
          preserveAspectRatio="none"
          className="absolute -bottom-[0.14em] left-0 h-[0.2em] w-full overflow-visible"
        >
          <motion.path
            d="M4 14 C 60 4, 150 4, 216 11"
            fill="none"
            stroke="url(#who-stroke)"
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, ease, delay: 1 }}
          />
          <defs>
            <linearGradient id="who-stroke" x1="0" x2="1">
              <stop offset="0%" stopColor="#010dff" />
              <stop offset="60%" stopColor="#4609ae" />
              <stop offset="100%" stopColor="#00ff26" />
            </linearGradient>
          </defs>
        </svg>
      </motion.span>
    </motion.h1>
  );
}

function LanguageCard() {
  return (
    <motion.div
      variants={fadeUp}
      className="mt-7 max-w-xl rounded-2xl bg-gradient-to-r from-brand/40 via-brand-purple/30 to-brand-green/40 p-px shadow-[0_18px_40px_-24px_rgba(1,13,255,0.5)]"
    >
      <div className="flex items-start gap-2.5 rounded-[15px] bg-white/85 px-3 py-3 backdrop-blur-xl min-[380px]:gap-3 min-[380px]:px-4 min-[380px]:py-3.5">
        <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-xl bg-gradient-to-b from-[#3a44ff] to-brand text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_6px_14px_-6px_rgba(1,13,255,0.8)] min-[380px]:size-8">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-3.5 min-[380px]:size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
          </svg>
        </span>
        <p className="min-w-0 text-[13px] leading-relaxed text-slate-700 min-[380px]:text-sm">
          <span className="mr-2 inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.18em] text-brand-purple uppercase">
            <span className="size-1.5 rounded-full bg-brand-green shadow-[0_0_6px_#00ff26]" />
            10 languages
          </span>
          {languageLine}
        </p>
      </div>
    </motion.div>
  );
}

function Ctas() {
  return (
    <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
      <a
        href={links.signup}
        className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-b from-[#3a44ff] to-brand px-7 py-4 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_4px_0_#0008a8,0_18px_36px_-10px_rgba(1,13,255,0.8)] transition-[translate,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_6px_0_#0008a8,0_24px_44px_-10px_rgba(1,13,255,0.9)] active:translate-y-[3px] active:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_1px_0_#0008a8,0_8px_18px_-8px_rgba(1,13,255,0.8)]"
      >
        <span
          aria-hidden="true"
          className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-[320%]"
        />
        <span className="relative">Create account</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="relative size-4 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" />
        </svg>
      </a>
      <a
        href={links.office}
        className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-white/80 px-7 py-4 text-sm font-semibold text-slate-900 shadow-[inset_0_1px_0_#fff,0_4px_0_#dfe3ec,0_14px_30px_-14px_rgba(15,23,42,0.35)] ring-1 ring-slate-200 backdrop-blur transition-[translate,box-shadow] duration-200 hover:-translate-y-0.5 hover:ring-slate-300 active:translate-y-[3px] active:shadow-[inset_0_1px_0_#fff,0_1px_0_#dfe3ec]"
      >
        <span className="relative flex size-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-brand-green/70 motion-reduce:animate-none" />
          <span className="relative size-2 rounded-full bg-brand-green" />
        </span>
        Talk in AI Office
        <span aria-hidden="true" className="text-slate-400 transition group-hover:text-brand">
          ↗
        </span>
      </a>
    </motion.div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.3);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  return (
    <section onPointerMove={onMove} className="grain relative overflow-hidden">
      <HeroBackdrop px={px} py={py} />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pt-10 pb-16 sm:gap-16 sm:px-6 sm:pt-16 sm:pb-24 lg:grid-cols-[1fr_1.08fr] lg:gap-10 lg:pt-24 lg:pb-32">
        <motion.div
          variants={stagger(0.1, 0.1)}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="min-w-0"
        >
          <motion.p
            variants={fadeUp}
            className="inline-flex items-center gap-2.5 rounded-full bg-white/70 py-1.5 pr-4 pl-1.5 text-[11px] font-semibold tracking-[0.24em] text-brand uppercase shadow-[0_8px_24px_-14px_rgba(1,13,255,0.6)] ring-1 ring-brand/15 backdrop-blur"
          >
            <span className="brand-line flex h-5 w-8 items-center justify-center rounded-full">
              <span className="size-1.5 rounded-full bg-white" />
            </span>
            The Zen of Lead Gen
          </motion.p>

          <Headline />

          <motion.p variants={fadeUp} className="mt-5 text-xl font-medium tracking-tight text-slate-400 min-[380px]:text-2xl sm:text-4xl">
            The CRM is the <span className="text-slate-900">HOW.</span>
          </motion.p>
          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Twenty named AI specialists work for you in AI Office. You talk, they draft, you approve — and
            the work lands in the LeadsFlow180 CRM. The whole team is multilingual.
          </motion.p>

          <LanguageCard />
          <Ctas />

          <motion.div variants={fadeUp} className="mt-10">
            <HeroFaces />
          </motion.div>
        </motion.div>

        <div className="relative min-w-0 overflow-hidden px-1 sm:overflow-visible sm:px-0">
          <div
            aria-hidden="true"
            className="absolute inset-x-[8%] -bottom-10 h-16 rounded-[100%] bg-brand/30 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="absolute -inset-6 -z-0 hidden rounded-[40px] bg-gradient-to-br from-brand/15 via-transparent to-brand-purple/15 blur-xl sm:block"
          />
          <div className="relative mx-auto w-full max-w-[520px] origin-top scale-[0.92] sm:max-w-none sm:scale-100">
            <CrmMock />
          </div>
        </div>
      </div>
    </section>
  );
}
