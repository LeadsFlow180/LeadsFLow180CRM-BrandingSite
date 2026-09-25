"use client";

import { motion, useMotionTemplate, useSpring, useTransform, type MotionValue } from "framer-motion";

/** Layered hero background: pointer spotlight, parallax orbs, and a 3D perspective grid floor. */
export function HeroBackdrop({ px, py }: { px: MotionValue<number>; py: MotionValue<number> }) {
  const sx = useSpring(px, { stiffness: 60, damping: 20 });
  const sy = useSpring(py, { stiffness: 60, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${useTransform(sx, (v) => v * 100)}% ${useTransform(
    sy,
    (v) => v * 100,
  )}%, rgba(1,13,255,0.10), transparent 70%)`;
  const orbX = useTransform(sx, [0, 1], [-30, 30]);
  const orbY = useTransform(sy, [0, 1], [-20, 20]);
  const orbX2 = useTransform(sx, [0, 1], [24, -24]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        style={{ x: orbX, y: orbY }}
        className="orb -top-48 -left-40 size-[360px] bg-brand/15 sm:size-[560px] sm:bg-brand/20"
      />
      <motion.div
        style={{ x: orbX2, y: orbY }}
        className="orb top-10 right-[-12%] size-[320px] bg-brand-purple/15 sm:size-[500px] sm:bg-brand-purple/20"
      />
      <div className="orb bottom-[-25%] left-[35%] size-[420px] bg-brand-green/10" />

      <motion.div style={{ background: spotlight }} className="absolute inset-0" />

      <div className="absolute inset-x-0 bottom-0 h-[58%] [perspective:900px]">
        <div className="hero-grid absolute inset-x-[-30%] top-0 -bottom-1/2 origin-top [transform:rotateX(64deg)]" />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-canvas to-transparent" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
    </div>
  );
}
