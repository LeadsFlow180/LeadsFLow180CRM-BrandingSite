"use client";

import { useMotionValue, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { agents, type Filter } from "@/lib/site";
import { LanguageChips } from "./Languages";
import { Reveal } from "./Motion";
import { StageCard } from "./team/StageCard";
import { TeamRoster } from "./team/TeamRoster";

const ROTATE_MS = 5000;

export function TeamStage() {
  const reduce = useReducedMotion() ?? false;
  const [filter, setFilter] = useState<Filter>("Everyone");
  const [activeId, setActiveId] = useState(agents[0].id);
  const [playing, setPlaying] = useState(true);
  const progress = useMotionValue(0);
  const elapsed = useRef(0);
  const stageRef = useRef<HTMLDivElement>(null);

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
      setActiveId(id);
    },
    [progress],
  );

  const step = useCallback(
    (dir: 1 | -1) => goTo(list[(index + dir + list.length) % list.length].id),
    [goTo, index, list],
  );

  const changeFilter = (f: Filter) => {
    setFilter(f);
    const next = f === "Everyone" ? agents : agents.filter((a) => a.group === f);
    if (!next.some((a) => a.id === activeId)) goTo(next[0].id);
  };

  useEffect(() => {
    if (!autoplay || list.length < 2) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      elapsed.current += now - last;
      last = now;
      progress.set(Math.min(1, elapsed.current / ROTATE_MS));
      if (elapsed.current >= ROTATE_MS) {
        step(1);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [autoplay, step, progress, list.length, activeId]);

  // Reason: roster tiles sit below the stage, so picking one scrolls the stage back under the sticky header.
  const pickFromRoster = (id: string) => {
    goTo(id);
    const el = stageRef.current;
    if (el) {
      const header = document.querySelector("header")?.getBoundingClientRect().height ?? 72;
      const top = el.getBoundingClientRect().top + window.scrollY - header - 16;
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    }
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
              AI Office is who you speak with. FLOW is the desk they already work from. The stage keeps
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
              onStep={step}
              onToggle={() => setPlaying((p) => !p)}
              onPick={goTo}
            />
          </div>
        </Reveal>

        <TeamRoster filter={filter} list={list} activeId={active.id} onFilter={changeFilter} onPick={pickFromRoster} />
      </div>
    </section>
  );
}
