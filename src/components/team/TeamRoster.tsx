"use client";

import { AnimatePresence, motion } from "framer-motion";
import { agents, filters, type Agent, type Filter } from "@/lib/site";
import { ease } from "../Motion";
import { groupTone } from "./groupTone";

const counts = Object.fromEntries(
  filters.map((f) => [f, f === "Everyone" ? agents.length : agents.filter((a) => a.group === f).length]),
) as Record<Filter, number>;

type Props = {
  filter: Filter;
  list: Agent[];
  activeId: string;
  onFilter: (f: Filter) => void;
  onPick: (id: string) => void;
};

/** Group filter tabs + the full roster grid; picking a face puts that agent on stage. */
export function TeamRoster({ filter, list, activeId, onFilter, onPick }: Props) {
  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="-mx-4 max-w-[calc(100%+2rem)] overflow-x-auto px-4 py-1 [scrollbar-width:none] [mask-image:linear-gradient(90deg,#000_85%,transparent)] sm:mx-0 sm:max-w-full sm:px-0 lg:[mask-image:none] [&::-webkit-scrollbar]:hidden">
          <div
            role="tablist"
            aria-label="Filter team"
            className="flex w-max gap-1 rounded-full bg-slate-100 p-1 shadow-[inset_0_1px_2px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70"
          >
            {filters.map((f) => {
              const selected = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => onFilter(f)}
                  className={`relative inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors min-[380px]:gap-2 min-[380px]:px-4 min-[380px]:py-2 min-[380px]:text-sm ${
                    selected ? "text-white" : "text-slate-600 hover:text-slate-950"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_8px_18px_-8px_rgba(15,23,42,0.8)]"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">{f}</span>
                  <span
                    className={`relative rounded-full px-1.5 text-[10px] font-semibold tabular-nums ${
                      selected ? "bg-white/15 text-white" : "bg-white text-slate-500 ring-1 ring-slate-200"
                    }`}
                  >
                    {counts[f]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <p className="hidden text-sm text-slate-500 lg:block">Tap a face to put them on stage.</p>
      </div>

      <motion.ul layout className="mt-6 grid grid-cols-3 gap-2 min-[380px]:gap-2.5 sm:grid-cols-4 md:grid-cols-7 md:gap-3">
        <AnimatePresence mode="popLayout">
          {list.map((a) => {
            const isActive = a.id === activeId;
            const tone = groupTone[a.group];
            return (
              <motion.li
                key={a.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease }}
                className={`rounded-[18px] p-[2px] transition-shadow duration-300 ${
                  isActive ? "brand-line shadow-[0_16px_30px_-12px_rgba(1,13,255,0.6)]" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => onPick(a.id)}
                  aria-label={`Put ${a.name} on stage`}
                  aria-current={isActive ? "true" : undefined}
                  className="group relative block w-full overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_-14px_rgba(15,23,42,0.55)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.photo}
                    alt=""
                    loading="lazy"
                    className={`aspect-[4/5] w-full object-cover object-top transition duration-500 group-hover:scale-105 ${
                      isActive ? "" : "saturate-[0.85] group-hover:saturate-100"
                    }`}
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-2 pt-8 pb-2 text-left">
                    <span className="flex items-center gap-1.5">
                      <span className={`size-1.5 shrink-0 rounded-full ${tone.dot}`} />
                      <span className="truncate text-xs font-semibold text-white">{a.name}</span>
                    </span>
                    <span className="mt-0.5 block max-h-0 truncate text-[10px] text-white/70 opacity-0 transition-all duration-300 group-hover:max-h-4 group-hover:opacity-100">
                      {a.title}
                    </span>
                  </span>
                  {isActive && (
                    <span className="absolute top-1.5 right-1.5 inline-flex items-center gap-1 rounded-full bg-brand px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-white uppercase shadow-[0_4px_10px_-2px_rgba(1,13,255,0.8)]">
                      <span className="size-1 animate-pulse rounded-full bg-brand-green motion-reduce:animate-none" />
                      Now
                    </span>
                  )}
                </button>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
