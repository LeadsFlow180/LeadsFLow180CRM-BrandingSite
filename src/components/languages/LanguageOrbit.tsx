"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, type PointerEvent } from "react";
import { languages } from "@/lib/site";

const codes: Record<(typeof languages)[number], string> = {
  English: "EN",
  Spanish: "ES",
  French: "FR",
  Chinese: "ZH",
  Tagalog: "TL",
  Vietnamese: "VI",
  Arabic: "AR",
  Korean: "KO",
  "Haitian Creole": "HT",
  Russian: "RU",
};

const STEP = 360 / languages.length;
const DEG_PER_MS = 0.012;
const round = (n: number) => Math.round(n * 1000) / 1000;

type OrbitCardProps = {
  angle: MotionValue<number>;
  radius: MotionValue<number>;
  i: number;
  name: (typeof languages)[number];
};

function OrbitCard({ angle, radius, i, name }: OrbitCardProps) {
  // Reason: positions are computed per frame (not via a rotating parent) so every card stays facing the viewer.
  const rad = useTransform(angle, (a) => ((a + i * STEP) * Math.PI) / 180);
  const depth = useTransform(rad, (r) => (Math.cos(r) + 1) / 2);
  // Rounded so server- and client-rendered styles serialize identically (avoids hydration mismatches).
  const left = useTransform([rad, radius], ([r, rx]: number[]) => `${round(50 + Math.sin(r) * rx)}%`);
  const top = useTransform(rad, (r) => `${round(50 + Math.cos(r) * 17)}%`);
  const scale = useTransform(depth, (d) => round(0.7 + d * 0.35));
  const opacity = useTransform(depth, (d) => round(0.28 + d * 0.72));
  const zIndex = useTransform(depth, (d) => Math.round(d * 100));
  const filter = useTransform(depth, (d) => `blur(${((1 - d) * 1.6).toFixed(2)}px)`);

  return (
    <motion.li
      style={{ left, top, scale, opacity, zIndex, filter, x: "-50%", y: "-50%" }}
      className="absolute flex max-w-[46vw] items-center gap-1.5 rounded-2xl bg-white/[0.07] py-1.5 pr-2.5 pl-1.5 whitespace-nowrap shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_18px_40px_-18px_rgba(1,13,255,0.9)] ring-1 ring-white/15 backdrop-blur-md min-[380px]:max-w-none min-[380px]:gap-2.5 min-[380px]:py-2 min-[380px]:pr-4 min-[380px]:pl-2"
    >
      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-b from-[#3a44ff] to-brand text-[10px] font-bold tracking-wider text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] min-[380px]:size-8 min-[380px]:rounded-xl min-[380px]:text-[11px] sm:size-9">
        {codes[name]}
      </span>
      <span className="truncate text-xs font-semibold text-white min-[380px]:text-sm sm:text-base">{name}</span>
    </motion.li>
  );
}

/** 3D orbit of the ten languages around a glowing core; pauses on hover, static under reduced motion. */
export function LanguageOrbit() {
  const reduce = useReducedMotion();
  const angle = useMotionValue(0);
  const radius = useMotionValue(38);
  const paused = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  // Reason: side cards are ~170px wide, so narrow screens need a tighter orbit to stay inside the frame.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      radius.set(w < 360 ? 26 : w < 460 ? 30 : 38);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [radius]);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 18 });

  useAnimationFrame((_, delta) => {
    if (reduce || paused.current) return;
    angle.set(angle.get() + delta * DEG_PER_MS);
  });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={() => (paused.current = true)}
      onPointerLeave={() => {
        paused.current = false;
        px.set(0);
        py.set(0);
      }}
      className="relative mx-auto h-[300px] w-full max-w-[560px] overflow-hidden [perspective:1200px] min-[380px]:h-[340px] sm:h-[440px] sm:overflow-visible"
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="absolute inset-0">
        {/* Orbit trails */}
        <div aria-hidden="true" className="absolute inset-0 [transform-style:preserve-3d]">
          {[
            "inset-x-[6%] inset-y-[30%] border-white/15",
            "inset-x-[18%] inset-y-[37%] border-dashed border-white/10",
            "inset-x-[-2%] inset-y-[24%] border-brand/25",
          ].map((c) => (
            <div key={c} className={`absolute rounded-[100%] border ${c}`} />
          ))}
        </div>

        {/* Core sits at z-50 so back-half cards (z < 50) pass behind it and front-half cards in front. */}
        <div className="absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
          <div aria-hidden="true" className="pulse-glow absolute inset-0 rounded-full" />
          <div className="relative flex size-24 flex-col items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_25%,#5b64ff,#010dff_45%,#1a0660_100%)] text-center shadow-[inset_0_2px_10px_rgba(255,255,255,0.35),inset_0_-12px_24px_rgba(0,0,0,0.5),0_30px_80px_-10px_rgba(1,13,255,0.9)] min-[380px]:size-32 sm:size-40">
            <span className="text-4xl leading-none font-semibold tracking-tight text-white min-[380px]:text-5xl sm:text-6xl">10</span>
            <span className="mt-1 text-[10px] font-semibold tracking-[0.24em] text-white/75 uppercase">Languages</span>
            <span aria-hidden="true" className="absolute top-3 left-6 h-6 w-12 rotate-[-25deg] rounded-full bg-white/25 blur-md" />
          </div>
        </div>

        <ul aria-label="Languages the AI team can help in" className="absolute inset-0">
          {languages.map((l, i) => (
            <OrbitCard key={l} angle={angle} radius={radius} i={i} name={l} />
          ))}
        </ul>
      </motion.div>

      <div aria-hidden="true" className="absolute inset-x-[15%] bottom-2 h-10 rounded-[100%] bg-brand/40 blur-2xl" />
    </div>
  );
}
