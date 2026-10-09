"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from "react";
import { officePhotoCandidates } from "@/lib/agentProfiles";

type Props = {
  officePhoto: string;
  portraitPhoto: string;
  name: string;
  title: string;
  tagline: string;
  agentId: string;
};

/** Branded photographic office stage — full scene visible, drag-to-look when wider. */
export function AgentOfficeHero({ officePhoto, name, title, tagline, agentId }: Props) {
  const candidates = [...officePhotoCandidates(agentId), officePhoto].filter(
    (u, i, arr) => arr.indexOf(u) === i,
  );

  const [index, setIndex] = useState(0);
  const src = candidates[Math.min(index, candidates.length - 1)];

  const reduce = useReducedMotion() ?? false;
  const stageRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0, t: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const inertiaRaf = useRef(0);
  const [grabbing, setGrabbing] = useState(false);
  const [hintGone, setHintGone] = useState(false);
  const [pannable, setPannable] = useState(false);
  const [imgSize, setImgSize] = useState({ w: 0, h: 0 });

  const spring = { stiffness: 320, damping: 38, mass: 0.35 };
  const panX = useMotionValue(0);
  const panY = useMotionValue(0);
  const x = useSpring(panX, spring);
  const y = useSpring(panY, spring);

  const measure = () => {
    const stage = stageRef.current;
    const img = imgRef.current;
    if (!stage || !img || !img.naturalWidth) return;

    const stageW = stage.clientWidth;
    const stageH = stage.clientHeight;
    const aspect = img.naturalWidth / img.naturalHeight;

    // Reason: contain the full office photo — never crop the desk/person out of frame.
    const tallNarrow = stageW < 700 && stageH / stageW > 0.8;
    const h = Math.max(1, tallNarrow ? stageH : Math.min(stageH, stageW / aspect));
    const w = h * aspect;

    setImgSize({ w, h });
    const canPan = w > stageW + 2 || h > stageH + 2;
    setPannable(canPan && !reduce);

    const maxX = Math.max(0, (w - stageW) / 2);
    const maxY = Math.max(0, (h - stageH) / 2);
    panX.set(Math.max(-maxX, Math.min(maxX, panX.get())));
    panY.set(Math.max(-maxY, Math.min(maxY, panY.get())));
  };

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    if (stageRef.current) ro.observe(stageRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, reduce]);

  const clampPan = (nx: number, ny: number) => {
    const stage = stageRef.current;
    if (!stage || !imgSize.w) return { x: nx, y: ny };
    const maxX = Math.max(0, (imgSize.w - stage.clientWidth) / 2);
    const maxY = Math.max(0, (imgSize.h - stage.clientHeight) / 2);
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
      velocity.current.x *= 0.91;
      velocity.current.y *= 0.91;
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
    if (!pannable) return;
    if ((e.target as HTMLElement).closest("a,button")) return;
    stopInertia();
    dragging.current = true;
    setGrabbing(true);
    setHintGone(true);
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
    <section className="bg-canvas">
      <header className="relative z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
        <div className="brand-line absolute inset-x-0 bottom-0 h-0.5" aria-hidden="true" />
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3 sm:px-6">
          <Link href="/" className="shrink-0 rounded-xl bg-black px-2.5 py-2 shadow-[0_12px_28px_-14px_rgba(1,13,255,0.55)]" aria-label="LeadsFlow180 home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo-dark.png" alt="" className="h-3.5 w-auto sm:h-4" />
          </Link>

          <div className="min-w-0 flex-1 border-l border-slate-200 pl-4">
            <p className="text-[10px] font-bold tracking-[0.2em] text-brand uppercase">Personal office</p>
            <h1 className="mt-0.5 truncate text-lg font-semibold tracking-[-0.03em] text-slate-950 sm:text-xl">
              {name}&apos;s office
            </h1>
          </div>

          <nav className="flex flex-wrap items-center gap-2" aria-label="Office navigation">
            <Link href="/agents" className="text-sm font-semibold text-brand underline-offset-2 hover:underline">
              Walk the floor
            </Link>
            <Link
              href="/agents"
              className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 transition hover:border-brand/30 hover:shadow-[0_10px_24px_-16px_rgba(1,13,255,0.5)]"
            >
              Floor map
            </Link>
            <a
              href="#talk"
              className="rounded-full bg-gradient-to-b from-[#3a44ff] to-brand px-3.5 py-1.5 text-sm font-semibold text-white shadow-[0_12px_28px_-14px_rgba(1,13,255,0.75)]"
            >
              Talk with {name}
            </a>
          </nav>
        </div>
      </header>

      <div
        ref={stageRef}
        role="img"
        aria-label={`${name}'s office — drag to look across the room`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={`relative h-[min(68vh,680px)] min-h-[320px] w-full overflow-hidden bg-[#0b1020] ${
          pannable ? (grabbing ? "cursor-grabbing" : "cursor-grab") : "cursor-default"
        } ${pannable ? "touch-none" : ""} select-none`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full scale-110 object-cover opacity-80 blur-2xl brightness-50 saturate-125"
        />

        <motion.div
          style={{
            x: pannable ? x : 0,
            y: pannable ? y : 0,
            width: imgSize.w || "100%",
            height: imgSize.h || "100%",
            left: "50%",
            top: "50%",
            marginLeft: imgSize.w ? -imgSize.w / 2 : undefined,
            marginTop: imgSize.h ? -imgSize.h / 2 : undefined,
          }}
          className="absolute shadow-[0_24px_80px_rgba(0,0,0,0.4)]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src={src}
            alt={`${name} at their desk in LeadsFlow180 FLOW`}
            draggable={false}
            onLoad={measure}
            onError={() => setIndex((i) => (i + 1 < candidates.length ? i + 1 : i))}
            className="pointer-events-none size-full max-w-none"
            style={{ objectFit: "fill" }}
          />
        </motion.div>

        <Link
          href="/agents"
          className="absolute top-4 left-4 z-20 inline-flex items-center rounded-full border border-white/70 bg-white/95 px-3.5 py-2 text-sm font-semibold text-slate-800 shadow-[0_12px_32px_-14px_rgba(1,13,255,0.45)] backdrop-blur-sm transition hover:bg-white sm:top-[18px] sm:left-[22px]"
        >
          ← Back to hallway
        </Link>
        <a
          href="#about"
          className="absolute top-4 right-4 z-20 inline-flex items-center rounded-full border border-white/70 bg-white/95 px-3.5 py-2 text-sm font-semibold text-slate-800 shadow-[0_12px_32px_-14px_rgba(1,13,255,0.45)] backdrop-blur-sm transition hover:bg-white sm:top-[18px] sm:right-[22px]"
        >
          About {name}
          <span className="ml-2 text-brand" aria-hidden="true">
            ↗
          </span>
        </a>

        {pannable && !hintGone && (
          <p className="pointer-events-none absolute top-5 left-1/2 z-20 -translate-x-1/2 rounded-full bg-slate-950/80 px-3.5 py-2 text-xs font-medium text-white">
            Drag to look across the room
          </p>
        )}

        <a
          href="#talk"
          className="absolute top-[66%] left-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 rounded-full border border-white/80 bg-white/95 py-1.5 pr-4 pl-1.5 text-slate-900 shadow-[0_16px_40px_-14px_rgba(1,13,255,0.55)] backdrop-blur-sm transition hover:-translate-y-[55%] hover:bg-white"
        >
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-purple text-base leading-none text-white"
          >
            ＋
          </span>
          <span className="pr-1 text-sm font-semibold">Check in with {name}</span>
        </a>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent px-4 pt-16 pb-4 sm:px-6 sm:pb-5">
          <p className="max-w-xl text-sm text-white/95 sm:text-[15px]">{tagline}</p>
          <p className="hidden shrink-0 text-[11px] tracking-[0.14em] text-brand-green uppercase sm:block">{title}</p>
        </div>
      </div>
    </section>
  );
}
