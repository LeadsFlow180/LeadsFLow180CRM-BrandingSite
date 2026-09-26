"use client";

import { motion } from "framer-motion";
import { languageLine, languages } from "@/lib/site";
import { LanguageOrbit } from "./languages/LanguageOrbit";
import { ease, fadeUp, Reveal, stagger } from "./Motion";

export function LanguageChips({ compact = false }: { compact?: boolean }) {
  return (
    <motion.ul
      variants={stagger(0.05)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="flex flex-wrap gap-2"
      aria-label="Languages the AI team can help in"
    >
      {languages.map((l) => (
        <motion.li
          key={l}
          variants={fadeUp}
          className={`rounded-full border text-sm font-medium ${
            compact
              ? "border-slate-200 bg-canvas px-2.5 py-1 text-xs text-slate-700 min-[380px]:px-3 min-[380px]:py-1.5 min-[380px]:text-sm"
              : "border-white/15 bg-white/[0.06] px-4 py-2 text-white backdrop-blur"
          }`}
        >
          {l}
        </motion.li>
      ))}
    </motion.ul>
  );
}

function MarqueeRow({ reverse = false, outline = false }: { reverse?: boolean; outline?: boolean }) {
  const loop = [...languages, ...languages];
  return (
    <div className="marquee overflow-hidden py-3">
      <div className={`marquee-track flex w-max gap-10 ${reverse ? "marquee-reverse" : ""}`}>
        {loop.map((l, i) => (
          <span
            key={i}
            className={`flex items-center gap-6 text-2xl font-semibold tracking-tight whitespace-nowrap min-[380px]:gap-10 min-[380px]:text-4xl sm:text-6xl ${
              outline ? "text-outline-strong" : "text-white/15"
            }`}
          >
            {l}
            <span className="size-2 rounded-full bg-gradient-to-r from-brand to-brand-green shadow-[0_0_12px_rgba(0,255,38,0.6)] min-[380px]:size-2.5" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function LanguagesStrip() {
  return (
    <section aria-labelledby="languages-title" className="grain relative overflow-hidden bg-[#04050f] py-16 text-white sm:py-28">
      <div aria-hidden="true" className="orb -top-40 left-[-10%] size-[520px] bg-brand/35" />
      <div aria-hidden="true" className="orb right-[-10%] bottom-[-30%] size-[480px] bg-brand-purple/35" />
      <div aria-hidden="true" className="orb top-1/3 left-1/2 size-[220px] bg-brand-green/10" />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_60%_60%_at_70%_40%,#000,transparent)]"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:gap-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
        <Reveal>
          <p className="inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.28em] text-brand-green uppercase">
            <span className="size-1.5 rounded-full bg-brand-green shadow-[0_0_8px_#00ff26]" />
            Multilingual
          </p>
          <h2 id="languages-title" className="mt-4 text-4xl leading-[0.98] font-semibold tracking-[-0.04em] min-[380px]:text-5xl sm:text-7xl">
            One team.
            <br />
            <span className="text-shimmer-light">Ten languages.</span>
          </h2>

          <div className="mt-6 rounded-2xl bg-gradient-to-r from-brand/60 via-brand-purple/50 to-brand-green/50 p-px min-[380px]:mt-8">
            <p className="rounded-[15px] bg-[#070925]/90 px-4 py-3.5 text-base leading-relaxed text-white/90 backdrop-blur-xl min-[380px]:px-5 min-[380px]:py-4 min-[380px]:text-lg sm:text-xl">
              {languageLine}
            </p>
          </div>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60">
            Talk to the team in the language you already use. The same agents. The same FLOW desk. FLOW and AI
            Office are multilingual — this page simply stays in English.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <LanguageOrbit />
        </Reveal>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease, delay: 0.3 }}
        className="relative mt-16 [perspective:900px]"
        aria-hidden="true"
      >
        <div className="border-y border-white/10 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)] [transform:rotateX(18deg)_rotateZ(-2deg)]">
          <MarqueeRow />
          <MarqueeRow reverse outline />
        </div>
      </motion.div>
    </section>
  );
}
