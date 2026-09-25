"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { agents, links } from "@/lib/site";
import { fadeUp, stagger } from "./Motion";

const STEP = 360 / agents.length;

const SPARKS = [
  { top: "18%", left: "12%", size: 3, delay: "0s" },
  { top: "28%", left: "82%", size: 2, delay: "0.6s" },
  { top: "62%", left: "8%", size: 2, delay: "1.2s" },
  { top: "70%", left: "88%", size: 3, delay: "0.3s" },
  { top: "12%", left: "48%", size: 2, delay: "1.8s" },
  { top: "78%", left: "42%", size: 2, delay: "0.9s" },
  { top: "40%", left: "6%", size: 2, delay: "2.1s" },
  { top: "46%", left: "93%", size: 3, delay: "1.4s" },
] as const;

const FLOATERS = [
  { label: "Inbox", className: "top-[8%] left-[6%]", delay: "0s" },
  { label: "Sales", className: "top-[14%] right-[4%]", delay: "0.8s" },
  { label: "Automation", className: "bottom-[18%] left-[2%]", delay: "1.4s" },
  { label: "Team Desk", className: "bottom-[12%] right-[3%]", delay: "2s" },
] as const;

function OrbitNodes({
  degrees,
  radiusVar,
  nodeClass,
}: {
  degrees: number[];
  radiusVar: string;
  nodeClass: string;
}) {
  return (
    <>
      {degrees.map((deg) => (
        <span
          key={deg}
          className={`absolute top-1/2 left-1/2 rounded-full ${nodeClass}`}
          style={
            {
              // Reason: margin-centers the dot on the parent midpoint so rotate+translateY orbits the track.
              marginLeft: "-3px",
              marginTop: "-3px",
              transform: `rotate(${deg}deg) translateY(calc(-1 * var(${radiusVar})))`,
            } as CSSProperties
          }
        />
      ))}
    </>
  );
}

/** Soft stage props behind the spinning faces — rings, sparks, and module chips. */
function RingAtmosphere() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-visible">
      {/* Core glow */}
      <div className="absolute top-1/2 left-1/2 size-[220px] -translate-x-1/2 -translate-y-[58%] rounded-full bg-brand/40 blur-[60px] min-[380px]:size-[280px] sm:size-[360px] sm:blur-[80px]" />
      <div className="absolute top-1/2 left-1/2 size-[120px] -translate-x-1/2 -translate-y-[58%] rounded-full bg-white/10 blur-[30px] sm:size-[160px]" />

      {/* Inner orbit track + green nodes */}
      <div className="absolute top-1/2 left-1/2 size-[200px] -translate-x-1/2 -translate-y-[58%] [--rr:100px] sm:size-[300px] sm:[--rr:150px] lg:size-[380px] lg:[--rr:190px]">
        <div className="ring-orbit absolute inset-0">
          <div className="absolute inset-0 rounded-full border border-dashed border-brand/35" />
          <div className="absolute inset-[12%] rounded-full border border-brand/20" />
          <OrbitNodes
            degrees={[0, 72, 144, 216, 288]}
            radiusVar="--rr"
            nodeClass="size-1.5 bg-brand-green shadow-[0_0_10px_#00ff26]"
          />
        </div>
      </div>

      {/* Outer orbit track + blue nodes */}
      <div className="absolute top-1/2 left-1/2 size-[280px] -translate-x-1/2 -translate-y-[58%] [--rr:140px] sm:size-[420px] sm:[--rr:210px] lg:size-[520px] lg:[--rr:260px]">
        <div className="ring-orbit-rev absolute inset-0">
          <div className="absolute inset-0 rounded-full border border-white/[0.08]" />
          <div className="absolute inset-[18%] rounded-full border border-dashed border-brand-purple/25" />
          <OrbitNodes
            degrees={[30, 150, 270]}
            radiusVar="--rr"
            nodeClass="size-1 bg-brand/80"
          />
        </div>
      </div>

      {/* Soft elliptical stage under the ring */}
      <div className="absolute bottom-[8%] left-1/2 h-8 w-[70%] max-w-md -translate-x-1/2 rounded-[100%] bg-brand/25 blur-2xl sm:h-12 sm:w-[55%]" />
      <div className="absolute bottom-[14%] left-1/2 h-px w-[55%] max-w-sm -translate-x-1/2 bg-gradient-to-r from-transparent via-brand/60 to-transparent" />

      {/* Side light beams */}
      <div className="absolute top-[10%] left-[18%] h-[55%] w-px rotate-12 bg-gradient-to-b from-transparent via-brand/30 to-transparent sm:left-[22%]" />
      <div className="absolute top-[10%] right-[18%] h-[55%] w-px -rotate-12 bg-gradient-to-b from-transparent via-brand-purple/25 to-transparent sm:right-[22%]" />

      {/* Sparks */}
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

      {/* Floating workspace chips — sm+ so phones stay clear */}
      {FLOATERS.map((f) => (
        <span
          key={f.label}
          className={`float-drift absolute hidden rounded-full bg-white/[0.05] px-2.5 py-1 text-[10px] font-medium tracking-wide text-white/45 ring-1 ring-white/10 backdrop-blur-sm sm:inline-flex ${f.className}`}
          style={{ animationDelay: f.delay } as CSSProperties}
        >
          {f.label}
        </span>
      ))}
    </div>
  );
}

/** All twenty agents on a slowly turning 3D ring (CSS-driven; stops under reduced motion). */
function FaceRing() {
  return (
    // Reason: no mask/overflow on this box — CSS masks clip 3D overflow and were slicing the front row.
    <div aria-hidden="true" className="relative mx-auto w-full [perspective:1100px]">
      <RingAtmosphere />

      <div className="relative mx-auto flex h-[260px] items-center justify-center overflow-visible pb-2 min-[380px]:h-[300px] sm:h-[340px] lg:h-[380px]">
        <div className="absolute inset-0 flex items-center justify-center overflow-visible [transform:rotateX(-6deg)] [transform-style:preserve-3d]">
          <div className="face-ring relative size-0 overflow-visible [--r:105px] [transform-style:preserve-3d] min-[380px]:[--r:130px] sm:[--r:190px] lg:[--r:240px]">
            {agents.map((a, i) => (
              <div
                key={a.id}
                className="absolute -top-5 -left-5 size-10 min-[380px]:-top-6 min-[380px]:-left-6 min-[380px]:size-12 sm:size-12 lg:-top-7 lg:-left-7 lg:size-14"
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
      {/* Soft edge fades that don't clip the 3D stage */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#04050f] to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#04050f] to-transparent sm:w-16" />
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
