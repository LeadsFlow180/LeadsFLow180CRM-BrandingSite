"use client";

import { motion, useReducedMotion } from "framer-motion";
import { agents, heroFaces } from "@/lib/site";
import { ease } from "./Motion";

const faces = heroFaces.map((id) => agents.find((a) => a.id === id)!);
const remaining = agents.length - faces.length;

/**
 * Overlapping avatar stack with a name + role tooltip per face.
 * Reason: hover only transforms the hovered face (never margins/width), so the row
 * can't shift under the cursor and flicker between hover states.
 */
export function HeroFaces() {
  const reduce = useReducedMotion();

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
      <ul className="flex items-center -space-x-4 min-[380px]:-space-x-3.5">
        {faces.map((a, i) => (
          <li
            key={a.id}
            style={{ zIndex: faces.length - i }}
            className="group/face relative hover:z-30! focus-within:z-30!"
          >
            {/* Idle bob lives on its own layer so it never fights the hover transform below. */}
            <motion.span
              className="block"
              animate={reduce ? undefined : { y: [0, -4, 0] }}
              transition={{ duration: 4 + (i % 3) * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }}
            >
              <span className="block rounded-full bg-gradient-to-b from-white to-slate-200 p-[2px] shadow-[0_10px_20px_-8px_rgba(15,23,42,0.45)] transition-[translate,scale,box-shadow] duration-300 ease-out group-hover/face:-translate-y-1.5 group-hover/face:scale-110 group-hover/face:shadow-[0_18px_28px_-10px_rgba(1,13,255,0.55)] motion-reduce:transition-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={a.photo}
                  alt={`${a.name}, ${a.title}`}
                  className="size-9 rounded-full object-cover object-top min-[380px]:size-10 sm:size-12"
                />
              </span>
            </motion.span>
            <span
              role="tooltip"
              className="pointer-events-none absolute bottom-full left-1/2 mb-3 hidden -translate-x-1/2 translate-y-1 rounded-lg bg-slate-950 px-2.5 py-1.5 text-[11px] leading-tight whitespace-nowrap text-white opacity-0 shadow-xl transition duration-200 group-hover/face:translate-y-0 group-hover/face:opacity-100 sm:block"
            >
              <span className="font-semibold">{a.name}</span>
              <span className="text-white/60"> · {a.title}</span>
              <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-950" />
            </span>
          </li>
        ))}
        <li className="relative z-0">
          <span className="flex size-9 items-center justify-center rounded-full bg-slate-950 text-[11px] font-semibold text-white ring-2 ring-white min-[380px]:size-10 min-[380px]:text-xs sm:size-12 sm:text-sm">
            +{remaining}
          </span>
        </li>
      </ul>

      <a href="#team" className="group text-sm leading-tight text-slate-600 transition hover:text-brand">
        <span className="block font-semibold text-slate-900">{agents.length} specialists</span>
        Meet the team{" "}
        <motion.span
          aria-hidden="true"
          className="inline-block"
          animate={reduce ? undefined : { y: [0, 3, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease }}
        >
          ↓
        </motion.span>
      </a>
    </div>
  );
}
