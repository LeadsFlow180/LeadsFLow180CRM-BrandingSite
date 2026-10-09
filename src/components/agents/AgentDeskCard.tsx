"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { officePhotoCandidates } from "@/lib/agentProfiles";

type Props = {
  agentId: string;
  name: string;
  officePhoto: string;
  portraitPhoto: string;
  skill: string;
};

const LOOK_SCALE = 1.18;

/** Bright desk peek — same drag-to-look language as the hero, without muddy overlays. */
export function AgentDeskCard({ agentId, name, officePhoto, portraitPhoto, skill }: Props) {
  const candidates = [officePhoto, ...officePhotoCandidates(agentId).filter((u) => u !== officePhoto), portraitPhoto];
  const [index, setIndex] = useState(0);
  const src = candidates[Math.min(index, candidates.length - 1)];

  const reduce = useReducedMotion() ?? false;
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0, t: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const inertiaRaf = useRef(0);
  const [grabbing, setGrabbing] = useState(false);

  const spring = { stiffness: 280, damping: 30, mass: 0.4 };
  const panX = useMotionValue(0);
  const panY = useMotionValue(0);
  const x = useSpring(panX, spring);
  const y = useSpring(panY, spring);

  const clampPan = (nx: number, ny: number) => {
    const frame = frameRef.current;
    if (!frame) return { x: nx, y: ny };
    const { width, height } = frame.getBoundingClientRect();
    const maxX = ((LOOK_SCALE - 1) * width) / 2;
    const maxY = ((LOOK_SCALE - 1) * height) / 2;
    return {
      x: Math.max(-maxX, Math.min(maxX, nx)),
      y: Math.max(-maxY, Math.min(maxY, ny)),
    };
  };

  const stopInertia = () => {
    if (inertiaRaf.current) cancelAnimationFrame(inertiaRaf.current);
    inertiaRaf.current = 0;
  };

  const coast = () => {
    stopInertia();
    const tick = () => {
      velocity.current.x *= 0.9;
      velocity.current.y *= 0.9;
      if (Math.hypot(velocity.current.x, velocity.current.y) < 0.3) {
        inertiaRaf.current = 0;
        return;
      }
      const next = clampPan(panX.get() + velocity.current.x, panY.get() + velocity.current.y);
      panX.set(next.x);
      panY.set(next.y);
      inertiaRaf.current = requestAnimationFrame(tick);
    };
    inertiaRaf.current = requestAnimationFrame(tick);
  };

  useEffect(() => () => stopInertia(), []);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    stopInertia();
    dragging.current = true;
    setGrabbing(true);
    last.current = { x: e.clientX, y: e.clientY, t: performance.now() };
    velocity.current = { x: 0, y: 0 };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const now = performance.now();
    const dt = Math.max(8, now - last.current.t);
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    velocity.current = { x: (dx / dt) * 16, y: (dy / dt) * 16 };
    last.current = { x: e.clientX, y: e.clientY, t: now };
    const next = clampPan(panX.get() + dx, panY.get() + dy);
    panX.set(next.x);
    panY.set(next.y);
  };

  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    setGrabbing(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
    if (!reduce) coast();
  };

  return (
    <div className="overflow-hidden rounded-[24px] bg-white shadow-[0_28px_60px_-36px_rgba(15,23,42,0.35)] ring-1 ring-slate-200/90">
      <div
        ref={frameRef}
        role="img"
        aria-label={`${name}'s desk — drag to look around`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={`relative aspect-[16/10] touch-none overflow-hidden bg-slate-100 select-none ${
          grabbing ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <motion.div
          style={
            reduce
              ? { inset: 0 }
              : {
                  x,
                  y,
                  width: `${LOOK_SCALE * 100}%`,
                  height: `${LOOK_SCALE * 100}%`,
                  left: `${((1 - LOOK_SCALE) / 2) * 100}%`,
                  top: `${((1 - LOOK_SCALE) / 2) * 100}%`,
                }
          }
          className={`absolute ${reduce ? "inset-0" : ""}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={src}
            src={src}
            alt={`${name}'s desk`}
            loading="lazy"
            decoding="async"
            draggable={false}
            onError={() => setIndex((i) => (i + 1 < candidates.length ? i + 1 : i))}
            className="pointer-events-none size-full object-cover object-[50%_42%]"
          />
        </motion.div>
      </div>

      <div className="flex items-start gap-3 border-t border-slate-100 px-4 py-4 sm:px-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={portraitPhoto}
          alt=""
          loading="lazy"
          decoding="async"
          className="mt-0.5 size-10 shrink-0 rounded-full object-cover object-top ring-2 ring-slate-100"
        />
        <div className="min-w-0">
          <p className="text-[10px] font-semibold tracking-[0.22em] text-slate-400 uppercase">At the desk</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-700">{skill}</p>
          {!reduce && <p className="mt-2 text-[11px] text-slate-400">Drag the photo to look around</p>}
        </div>
      </div>
    </div>
  );
}
