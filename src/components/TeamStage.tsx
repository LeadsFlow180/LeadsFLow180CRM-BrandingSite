"use client";

import { useMotionValue, useReducedMotion } from "framer-motion";
import { startTransition, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getAgentVideo } from "@/lib/agentVideos";
import { agents, type Filter } from "@/lib/site";
import { LanguageChips } from "./Languages";
import { Reveal } from "./Motion";
import { StageCard } from "./team/StageCard";
import { TeamRoster } from "./team/TeamRoster";

const PHOTO_ROTATE_MS = 5000;
const SOUND_PREF_KEY = "lf180-stage-sound";

export function TeamStage() {
  const reduce = useReducedMotion() ?? false;
  const [filter, setFilter] = useState<Filter>("Everyone");
  const [activeId, setActiveId] = useState(agents[0].id);
  const [playing, setPlaying] = useState(true);
  // Reason: agents with a clip drive rotate via onEnded; photo-only agents use the timed loop.
  const [waitForVideo, setWaitForVideo] = useState(() => Boolean(getAgentVideo(agents[0].id)));
  // Reason: user preference defaults to sound ON and survives refresh; browsers still need one gesture before audio can start.
  const [soundOn, setSoundOn] = useState(true);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const audioUnlockedRef = useRef(false);
  const progress = useMotionValue(0);
  const elapsed = useRef(0);
  const stageRef = useRef<HTMLDivElement>(null);

  const unlockAudio = useCallback(() => {
    audioUnlockedRef.current = true;
    setAudioUnlocked(true);
  }, []);

  useEffect(() => {
    try {
      if (localStorage.getItem(SOUND_PREF_KEY) === "0") setSoundOn(false);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(SOUND_PREF_KEY, soundOn ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [soundOn]);

  // Reason: Chrome/Safari block unmuted autoplay on every fresh load — first tap unlocks audio.
  useEffect(() => {
    const unlock = () => unlockAudio();
    window.addEventListener("pointerdown", unlock, { once: true, passive: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [unlockAudio]);

  const toggleSound = useCallback(() => {
    // Reason: after refresh the button may still say “listen” — first tap must turn sound ON, not toggle preference off.
    if (!audioUnlockedRef.current) {
      unlockAudio();
      setSoundOn(true);
      return;
    }
    setSoundOn((s) => !s);
  }, [unlockAudio]);

  const list = useMemo(
    () => (filter === "Everyone" ? agents : agents.filter((a) => a.group === filter)),
    [filter],
  );
  const index = Math.max(0, list.findIndex((a) => a.id === activeId));
  const active = list[index] ?? list[0];
  const autoplay = playing && !reduce;

  const goTo = useCallback(
    (id: string) => {
      elapsed.current = 0;
      progress.set(0);
      startTransition(() => {
        setWaitForVideo(Boolean(getAgentVideo(id)));
        setActiveId(id);
      });
    },
    [progress],
  );

  const step = useCallback(
    (dir: 1 | -1) => goTo(list[(index + dir + list.length) % list.length].id),
    [goTo, index, list],
  );

  const userStep = useCallback(
    (dir: 1 | -1) => {
      unlockAudio();
      step(dir);
    },
    [step, unlockAudio],
  );

  const changeFilter = (f: Filter) => {
    setFilter(f);
    const next = f === "Everyone" ? agents : agents.filter((a) => a.group === f);
    if (!next.some((a) => a.id === activeId)) goTo(next[0].id);
  };

  const onVideoProgress = useCallback(
    (ratio: number) => {
      if (waitForVideo) progress.set(Math.min(1, ratio));
    },
    [progress, waitForVideo],
  );

  const onVideoEnded = useCallback(() => {
    if (!autoplay || list.length < 2) return;
    step(1);
  }, [autoplay, list.length, step]);

  const onVideoUnavailable = useCallback(() => {
    setWaitForVideo(false);
  }, []);

  useEffect(() => {
    // Timed rotate only for still portraits (or when the clip failed to load).
    if (!autoplay || list.length < 2 || waitForVideo) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      elapsed.current += now - last;
      last = now;
      progress.set(Math.min(1, elapsed.current / PHOTO_ROTATE_MS));
      if (elapsed.current >= PHOTO_ROTATE_MS) {
        step(1);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [autoplay, step, progress, list.length, activeId, waitForVideo]);

  // Reason: roster sits below the stage — only scroll when the stage is off-screen (avoids jank on every tap).
  const pickFromRoster = (id: string) => {
    unlockAudio();
    goTo(id);
    const el = stageRef.current;
    if (!el) return;
    const header = document.querySelector("header")?.getBoundingClientRect().height ?? 72;
    const rect = el.getBoundingClientRect();
    if (rect.top >= header + 8 && rect.top < window.innerHeight * 0.55) return;
    const top = rect.top + window.scrollY - header - 16;
    window.scrollTo({ top, behavior: "auto" });
  };

  return (
    <section id="team" className="relative scroll-mt-20 overflow-hidden bg-white py-16 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(15,23,42,0.08)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_45%_at_50%_0%,#000,transparent)]"
      />
      <div aria-hidden="true" className="orb top-10 right-[-15%] size-[480px] bg-brand-purple/10" />
      <div aria-hidden="true" className="orb top-[30%] left-[-20%] size-[420px] bg-brand/10" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-end gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <Reveal>
            <p className="inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.28em] text-brand uppercase">
              <span className="brand-line h-[2px] w-8 rounded-full" />
              The WHO
            </p>
            <h2 className="mt-4 text-3xl leading-[1.02] font-semibold tracking-[-0.035em] text-slate-950 min-[380px]:text-4xl sm:text-6xl">
              Meet the team that <span className="text-brand-gradient">talks with you.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              FLOW is who you speak with and the desk they already work from. The stage keeps
              moving. Tap a face to put them on stage — rotation stays on Play. The same agents can help in 10
              languages.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[20px] bg-white/80 p-4 shadow-[0_24px_50px_-30px_rgba(1,13,255,0.45)] ring-1 ring-slate-200/80 backdrop-blur min-[380px]:rounded-3xl min-[380px]:p-5">
              <p className="mb-3 inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] text-brand-purple uppercase">
                <span className="size-1.5 rounded-full bg-brand-green shadow-[0_0_6px_#00ff26]" />
                10 languages
              </p>
              <LanguageChips compact />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div ref={stageRef} className="mt-12">
            <StageCard
              active={active}
              index={index}
              list={list}
              progress={progress}
              autoplay={autoplay}
              playing={playing}
              reduce={reduce}
              onStep={userStep}
              onToggle={() => {
                unlockAudio();
                setPlaying((p) => !p);
              }}
              onPick={(id) => {
                unlockAudio();
                goTo(id);
              }}
              onVideoProgress={onVideoProgress}
              onVideoEnded={onVideoEnded}
              onVideoUnavailable={onVideoUnavailable}
              soundOn={soundOn && audioUnlocked}
              playbackSoundOn={soundOn && audioUnlocked}
              onToggleSound={toggleSound}
            />
          </div>
        </Reveal>

        <TeamRoster filter={filter} list={list} activeId={active.id} onFilter={changeFilter} onPick={pickFromRoster} />
      </div>
    </section>
  );
}
