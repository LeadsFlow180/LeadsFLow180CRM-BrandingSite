"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";
import { workspaceModules } from "@/lib/site";
import { fadeUp, stagger } from "../Motion";

const icons: Record<(typeof workspaceModules)[number], ReactNode> = {
  Dashboard: <path d="M4 4h7v7H4zM13 4h7v4h-7zM13 10h7v10h-7zM4 13h7v7H4z" />,
  Inbox: <path d="M4 13l2.5-8h11L20 13v6H4zM4 13h5l1 2h4l1-2h5" />,
  Phone: <path d="M6 3h4l1.5 5-2.5 1.5a11 11 0 005.5 5.5L16 12.5l5 1.5v4a2 2 0 01-2 2A16 16 0 014 5a2 2 0 012-2z" />,
  Sales: <path d="M4 19V9M10 19V5M16 19v-7M22 19H2" />,
  Tasks: <path d="M9 6h11M9 12h11M9 18h11M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2" />,
  Appointments: <path d="M5 6h14v14H5zM5 10h14M9 3v4M15 3v4" />,
  Marketing: <path d="M4 10v4l11 5V5L4 10zM15 9a3 3 0 010 6M7 14l1 5" />,
  Automation: <path d="M13 3L5 14h6l-1 7 8-11h-6l1-7z" />,
  "Team Desk": <path d="M9 11a3 3 0 100-6 3 3 0 000 6zM17 11a2.5 2.5 0 100-5M3 20a6 6 0 0112 0M16 14a5 5 0 015 6" />,
  Agency: <path d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-5h6v5M9 11h.01M15 11h.01" />,
};

/** The ten CRM modules as raised keycaps on a tilted glass deck. */
export function WorkspaceDeck() {
  const reduce = useReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(x, [0, 1], [-5, 5]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(y, [0, 1], [14, 6]), { stiffness: 120, damping: 18 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  };

  return (
    <div
      className="relative [perspective:1400px]"
      onPointerMove={onMove}
      onPointerLeave={() => {
        x.set(0.5);
        y.set(0.5);
      }}
    >
      <div aria-hidden="true" className="absolute inset-x-[10%] -bottom-6 h-14 rounded-[100%] bg-brand/25 blur-2xl" />
      <motion.div
        style={{ rotateX: reduce ? 8 : rotateX, rotateY: reduce ? 0 : rotateY, transformStyle: "preserve-3d" }}
        className="relative rounded-[20px] bg-gradient-to-b from-white/90 to-white/60 p-2.5 shadow-[inset_0_1px_0_#fff,0_40px_80px_-40px_rgba(1,13,255,0.45),0_20px_40px_-30px_rgba(15,23,42,0.5)] ring-1 ring-slate-200/80 backdrop-blur-xl min-[380px]:rounded-[28px] min-[380px]:p-3 sm:p-4"
      >
        <div className="mb-3 flex items-center gap-2 px-1">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 truncate text-[11px] font-medium text-slate-500">app.leadsflow180.com</span>
        </div>
        <motion.ul
          variants={stagger(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 gap-2.5 min-[420px]:grid-cols-3 sm:grid-cols-5 sm:gap-3"
          style={{ transformStyle: "preserve-3d" }}
        >
          {workspaceModules.map((m) => (
            <motion.li key={m} variants={fadeUp} style={{ transformStyle: "preserve-3d" }}>
              <div className="group flex h-full flex-col items-center gap-2 rounded-2xl bg-gradient-to-b from-white to-slate-50 px-2 py-4 text-center shadow-[inset_0_1px_0_#fff,0_4px_0_#dfe3ec,0_10px_18px_-10px_rgba(15,23,42,0.35)] ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-[inset_0_1px_0_#fff,0_6px_0_#c9cff5,0_20px_30px_-12px_rgba(1,13,255,0.45)] hover:ring-brand/30">
                <span className="flex size-10 items-center justify-center rounded-xl bg-canvas text-slate-700 ring-1 ring-slate-200 transition group-hover:bg-gradient-to-b group-hover:from-[#3a44ff] group-hover:to-brand group-hover:text-white group-hover:ring-transparent">
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {icons[m]}
                  </svg>
                </span>
                <span className="text-xs font-semibold text-slate-800 sm:text-[13px]">{m}</span>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
}
