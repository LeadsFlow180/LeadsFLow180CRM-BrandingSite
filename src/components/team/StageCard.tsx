"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { getAgentVideo } from "@/lib/agentVideos";
import { type Agent } from "@/lib/site";
import { ease } from "../Motion";
import { AgentStageMedia } from "./AgentStageMedia";
import { groupTone } from "./groupTone";

const pad = (n: number) => String(n).padStart(2, "0");

type Props = {
  active: Agent;
  index: number;
  list: Agent[];
  progress: MotionValue<number>;
  autoplay: boolean;
  playing: boolean;
  reduce: boolean;
  onStep: (dir: 1 | -1) => void;
  onToggle: () => void;
  onPick: (id: string) => void;
  onVideoProgress?: (ratio: number) => void;
  onVideoEnded?: () => void;
  onVideoUnavailable?: () => void;
  soundOn?: boolean;
  /** Actual element unmute (false until the browser has a user gesture). */
  playbackSoundOn?: boolean;
  onToggleSound?: () => void;
};

/** Cinematic black stage: 3D portrait frame on the left, agent story + controls on the right. */
export function StageCard({
  active,
  index,
  list,
  progress,
  autoplay,
  playing,
  reduce,
  onStep,
  onToggle,
  onPick,
  onVideoProgress,
  onVideoEnded,
  onVideoUnavailable,
  soundOn = true,
  playbackSoundOn = false,
  onToggleSound,
}: Props) {
  // Reason: hold the outgoing clip until the next video has a painted frame (no photo pause between agents).
  const [displayed, setDisplayed] = useState(active);
  const activeIdRef = useRef(active.id);
  activeIdRef.current = active.id;

  const tone = groupTone[displayed.group];
  const status = reduce ? "Manual" : playing ? "Rotating" : "Paused";
  const displayIndex = Math.max(0, list.findIndex((a) => a.id === displayed.id));
  const upNext = Array.from({ length: Math.min(3, list.length - 1) }, (_, i) => list[(displayIndex + i + 1) % list.length]);

  useEffect(() => {
    if (active.id === displayed.id) return;
    if (!getAgentVideo(active.id) || reduce) {
      setDisplayed(active);
      return;
    }
    // Reason: never leave the stage stuck if decode stalls.
    const failSafe = window.setTimeout(() => {
      if (activeIdRef.current === active.id) setDisplayed(active);
    }, 2200);
    return () => window.clearTimeout(failSafe);
  }, [active, displayed.id, reduce]);

  // Reason: warm the upcoming file while the current one plays so the cut is already buffered.
  useEffect(() => {
    const next = list[(index + 1) % list.length];
    const src = next ? getAgentVideo(next.id) : undefined;
    if (!src) return;
    const warm = document.createElement("video");
    warm.preload = "auto";
    warm.muted = true;
    warm.playsInline = true;
    warm.src = src;
    warm.load();
    return () => {
      warm.removeAttribute("src");
      warm.load();
    };
  }, [index, list]);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-6, 6]), { stiffness: 120, damping: 22 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [5, -5]), { stiffness: 120, damping: 22 });
  const glareX = useTransform(px, [-0.5, 0.5], ["0%", "100%"]);
  const moveRaf = useRef(0);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const target = e.currentTarget;
    const cx = e.clientX;
    const cy = e.clientY;
    // Reason: pointer tilt at 60fps is expensive next to video decode — coalesce to one rAF.
    if (moveRaf.current) return;
    moveRaf.current = requestAnimationFrame(() => {
      moveRaf.current = 0;
      const r = target.getBoundingClientRect();
      px.set((cx - r.left) / r.width - 0.5);
      py.set((cy - r.top) / r.height - 0.5);
    });
  };
  const onLeave = () => {
    if (moveRaf.current) cancelAnimationFrame(moveRaf.current);
    moveRaf.current = 0;
    px.set(0);
    py.set(0);
  };

  return (
    <div className="grain relative overflow-hidden rounded-[22px] bg-[#04050f] text-white shadow-[0_60px_120px_-40px_rgba(1,13,255,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-white/10 sm:rounded-[32px]">
      <motion.div
        aria-hidden="true"
        className="orb -top-40 left-[10%] size-[460px]"
        animate={{ backgroundColor: tone.glow }}
        transition={{ duration: 0.6, ease }}
      />
      <div aria-hidden="true" className="orb right-[-10%] bottom-[-35%] size-[420px] bg-brand-purple/30" />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_30%_40%,#000,transparent_70%)]"
      />

      <div className="relative grid md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          className="relative flex items-center justify-center px-4 pt-6 pb-2 [perspective:1200px] sm:px-10 sm:pt-10 md:py-12 md:pr-4 md:pl-12"
        >
          <span
            aria-hidden="true"
            className="text-outline pointer-events-none absolute -top-1 left-2 text-[5.5rem] leading-none font-bold tracking-tighter tabular-nums select-none min-[380px]:text-[7rem] sm:left-4 sm:text-[12rem] md:top-4 md:left-6"
          >
            {pad(displayIndex + 1)}
          </span>

          <div className="relative w-full max-w-[220px] min-[380px]:max-w-[280px] sm:max-w-[340px] md:max-w-[380px]">
            <motion.div
              style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative"
            >
              <div
                aria-hidden="true"
                className="absolute inset-4 rounded-[28px] blur-2xl transition-colors duration-500"
                style={{ backgroundColor: tone.glow, transform: "translateZ(-60px) translateY(32px)" }}
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-[#070812] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/15">
                {Array.from(
                  new Map<string, Agent>([
                    [displayed.id, displayed],
                    [active.id, active],
                  ]).values(),
                ).map((agent) => {
                  const isDisplayed = agent.id === displayed.id;
                  const isTarget = agent.id === active.id;
                  const isIncoming = isTarget && !isDisplayed;
                  return (
                    <div
                      key={agent.id}
                      className={`absolute inset-0 ${isDisplayed ? "z-10 opacity-100" : "z-0 opacity-0"}`}
                      aria-hidden={!isDisplayed}
                    >
                      <AgentStageMedia
                        id={agent.id}
                        name={agent.name}
                        title={agent.title}
                        photo={agent.photo}
                        playing={playing && !reduce && isTarget}
                        soundOn={playbackSoundOn && isDisplayed}
                        onProgress={isDisplayed && !isIncoming ? onVideoProgress : undefined}
                        onEnded={isDisplayed && !isIncoming ? onVideoEnded : undefined}
                        onReady={() => {
                          if (activeIdRef.current === agent.id && !isDisplayed) setDisplayed(agent);
                        }}
                        onUnavailable={() => {
                          if (activeIdRef.current !== agent.id) return;
                          if (!isDisplayed) setDisplayed(agent);
                          onVideoUnavailable?.();
                        }}
                      />
                    </div>
                  );
                })}
                <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.16)_50%,transparent_65%)] bg-[length:250%_100%]"
                  style={{ backgroundPositionX: glareX }}
                />
                <span className="pointer-events-none absolute top-4 right-4 z-30 inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 text-[10px] font-semibold tracking-[0.2em] uppercase ring-1 ring-white/15">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-green opacity-70 motion-reduce:animate-none" />
                    <span className="relative inline-flex size-2 rounded-full bg-brand-green" />
                  </span>
                  Live
                </span>
              </div>

              <div
                style={{ transform: "translateZ(50px)" }}
                className="pointer-events-none absolute -right-3 bottom-6 hidden items-center gap-2 rounded-2xl bg-white/10 px-3 py-2 text-[11px] font-medium ring-1 ring-white/20 sm:flex"
              >
                <span className={`size-2 rounded-full ${tone.dot}`} />
                {displayed.group}
              </div>
            </motion.div>

            {Boolean(getAgentVideo(displayed.id)) && (
              <button
                type="button"
                aria-label={playbackSoundOn ? "Mute video" : "Unmute video"}
                aria-pressed={playbackSoundOn}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleSound?.();
                }}
                onPointerDown={(e) => e.stopPropagation()}
                className="absolute top-3 left-3 z-50 inline-flex items-center gap-2 rounded-full bg-black/85 px-3.5 py-2.5 text-[11px] font-semibold tracking-wide text-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.8)] ring-1 ring-white/30 transition hover:bg-black"
              >
                {playbackSoundOn ? (
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 5L6 9H3v6h3l5 4V5z" />
                    <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                    <path d="M18 6a8 8 0 0 1 0 12" />
                  </svg>
                ) : (
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 5L6 9H3v6h3l5 4V5z" />
                    <path d="M15 9l6 6M21 9l-6 6" />
                  </svg>
                )}
                {playbackSoundOn ? "Mute" : "Tap for sound"}
              </button>
            )}
          </div>
        </div>

        <div className="relative flex min-w-0 flex-col justify-between gap-6 p-4 min-[380px]:p-6 sm:gap-8 sm:p-10 md:py-12 md:pr-12 md:pl-6">
          {/* Reason: fixed card size — Carlos trial swaps icon for office still without growing the chip. */}
          <a
            href={`/agents/${displayed.id}`}
            className="group absolute top-3 right-3 z-20 flex w-[6.75rem] flex-col items-center gap-1.5 rounded-2xl bg-white p-2 text-center shadow-[0_12px_28px_-14px_rgba(0,0,0,0.55)] ring-1 ring-white/80 transition hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-12px_rgba(1,13,255,0.35)] min-[380px]:top-5 min-[380px]:right-5 sm:top-8 sm:right-8 sm:w-[7.25rem] sm:p-2.5"
            aria-label={`Go to ${displayed.name.split(" ")[0]}'s office`}
          >
            <span
              className={`relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-xl ring-1 ring-slate-200/80 sm:size-11 ${
                displayed.id === "carlos"
                  ? "bg-slate-100"
                  : "bg-canvas text-brand transition group-hover:bg-brand group-hover:text-white group-hover:ring-brand"
              }`}
            >
              {displayed.id === "carlos" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/agents/offices/carlos.png"
                  alt=""
                  className="absolute inset-0 size-full object-cover object-[center_18%] transition duration-300 group-hover:scale-[1.04]"
                />
              ) : (
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                  <path d="M4 10h16v8H4z" strokeLinejoin="round" />
                  <path d="M7 10V8a2 2 0 012-2h6a2 2 0 012 2v2" strokeLinecap="round" />
                  <path d="M12 14v2M4 14h16" strokeLinecap="round" />
                </svg>
              )}
            </span>
            <span className="text-[10px] leading-tight font-semibold text-slate-800 sm:text-[11px]">
              Go to {displayed.name.split(" ")[0]}&apos;s office
            </span>
          </a>

          <div className="grid pr-24 min-[380px]:pr-28 sm:pr-32" aria-live={autoplay ? "off" : "polite"}>
            <AnimatePresence initial={false}>
              <motion.div
                key={displayed.id}
                className="[grid-area:1/1]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease }}
              >
                <p className={`inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.24em] uppercase ${tone.text}`}>
                  <span className={`size-1.5 rounded-full ${tone.dot}`} />
                  {displayed.group}
                </p>
                <h3 className="mt-3 text-4xl leading-none font-semibold tracking-[-0.04em] min-[380px]:mt-4 min-[380px]:text-5xl sm:text-7xl">{displayed.name}</h3>
                <p className="mt-3 bg-gradient-to-r from-[#a5aaff] to-[#d5c2ff] bg-clip-text text-base font-medium text-transparent min-[380px]:mt-4 min-[380px]:text-lg sm:text-xl">
                  {displayed.title}
                </p>
                <p className="mt-4 max-w-md border-l-2 border-white/15 pl-3 text-sm leading-relaxed text-white/75 min-[380px]:mt-5 min-[380px]:pl-4 min-[380px]:text-base sm:text-lg">
                  {displayed.skill}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div>
            {upNext.length > 0 && (
              <div className="mb-6">
                <p className="text-[10px] font-semibold tracking-[0.24em] text-white/40 uppercase">Up next</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {upNext.map((a) => (
                    <li key={a.id}>
                      <button
                        type="button"
                        onClick={() => onPick(a.id)}
                        aria-label={`Put ${a.name} on stage`}
                        className="flex items-center gap-2 rounded-full bg-white/[0.06] py-1 pr-3.5 pl-1 text-xs font-medium text-white/80 ring-1 ring-white/10 transition hover:bg-white/[0.12] hover:text-white"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={a.photo} alt="" className="size-7 rounded-full object-cover object-top" loading="lazy" decoding="async" />
                        {a.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-end justify-between gap-4">
              <p className="font-mono text-sm tracking-wider text-white/50 tabular-nums">
                <span className="text-3xl font-semibold text-white">{pad(displayIndex + 1)}</span> / {pad(list.length)}
              </p>
              <p className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-white/50 uppercase">
                <span className={`size-1.5 rounded-full ${playing && !reduce ? "animate-pulse bg-brand-green" : "bg-white/40"}`} />
                {status}
              </p>
            </div>
            <div className="mt-3 h-[3px] overflow-hidden rounded-full bg-white/10">
              <motion.div className="brand-line h-full origin-left" style={{ scaleX: autoplay ? progress : 0 }} />
            </div>

            <div className="mt-6 flex items-center gap-3">
              <StageButton label="Previous agent" onClick={() => onStep(-1)}>
                <path d="M15 18l-6-6 6-6" />
              </StageButton>
              {!reduce && (
                <button
                  type="button"
                  onClick={onToggle}
                  aria-label={playing ? "Pause" : "Play"}
                  className="relative inline-flex size-14 items-center justify-center rounded-full bg-white text-black shadow-[0_4px_0_#c7cbe0,0_16px_30px_-10px_rgba(1,13,255,0.6)] transition active:translate-y-[2px] active:shadow-[0_1px_0_#c7cbe0]"
                >
                  <svg aria-hidden="true" viewBox="0 0 56 56" className="absolute inset-[-4px] size-[64px] -rotate-90">
                    <circle cx="28" cy="28" r="26" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
                    <motion.circle
                      cx="28"
                      cy="28"
                      r="26"
                      fill="none"
                      stroke="url(#ring-grad)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      style={{ pathLength: autoplay ? progress : 0, opacity: autoplay ? 1 : 0 }}
                    />
                    <defs>
                      <linearGradient id="ring-grad" x1="0" x2="1">
                        <stop offset="0%" stopColor="#010dff" />
                        <stop offset="100%" stopColor="#00ff26" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="currentColor">
                    {playing ? <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /> : <path d="M8 5.5v13l10.5-6.5z" />}
                  </svg>
                </button>
              )}
              <StageButton label="Next agent" onClick={() => onStep(1)}>
                <path d="M9 18l6-6-6-6" />
              </StageButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StageButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-white/[0.04] text-white ring-1 ring-white/15 transition hover:bg-white/10 hover:ring-white/40"
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </button>
  );
}
