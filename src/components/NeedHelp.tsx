"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { AgentAskModal } from "@/components/agents/AgentAskModal";
import { fadeUp, stagger } from "@/components/Motion";
import { needHelpSlots, type NeedHelpSlot } from "@/lib/needHelpSlots";
import { CHAT_DURATION_SEC } from "@/lib/talkConstants";

/** Hero specialist picker — click a problem to open the free Ask / talk session. */
export function NeedHelpPanel() {
  const [active, setActive] = useState<NeedHelpSlot | null>(null);

  return (
    <>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="relative overflow-hidden rounded-[28px] bg-white p-4 shadow-[0_40px_90px_-48px_rgba(1,13,255,0.55)] ring-1 ring-slate-200/90 sm:rounded-[32px] sm:p-5 lg:p-6"
      >
        <div aria-hidden="true" className="brand-line absolute inset-x-0 top-0 h-[2px]" />

        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold tracking-[0.22em] text-slate-400 uppercase sm:text-[11px]">
              Talk free
            </p>
            <h2 className="mt-1.5 text-[1.2rem] leading-tight font-semibold tracking-[-0.03em] text-slate-950 sm:text-[1.35rem] lg:text-[1.5rem]">
              What does your business need help with?
            </h2>
            <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500 sm:text-sm">
              Choose a specialist — free {CHAT_DURATION_SEC / 60}-minute consultation.
            </p>
          </div>
          <span
            aria-hidden="true"
            className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-canvas text-brand ring-1 ring-slate-200/80 sm:size-10"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path
                d="M8 10h.01M12 10h.01M16 10h.01M7 16h6l3 3v-3h1a3 3 0 003-3V8a3 3 0 00-3-3H7a3 3 0 00-3 3v5a3 3 0 003 3z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        <motion.ul
          variants={stagger(0.05)}
          initial="hidden"
          animate="show"
          className="mt-4 grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-3"
        >
          {needHelpSlots.map((slot) => (
            <motion.li key={slot.id} variants={fadeUp}>
              <button
                type="button"
                onClick={() => setActive(slot)}
                className="group flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white text-left ring-1 ring-slate-200/90 transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-24px_rgba(1,13,255,0.5)] hover:ring-brand/30"
              >
                <div className="relative aspect-[5/4] overflow-hidden bg-slate-100 sm:aspect-[4/3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slot.photo}
                    alt=""
                    className="size-full object-cover object-top transition duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex min-h-[7.5rem] flex-1 flex-col px-2.5 py-2.5 sm:min-h-[8rem] sm:px-3 sm:py-3">
                  <p className="text-[13px] leading-snug font-semibold tracking-[-0.02em] text-slate-950 sm:text-[14px]">
                    {slot.need}
                  </p>
                  <p className="mt-1 line-clamp-2 min-h-[2.4em] text-[11px] leading-snug text-slate-500 sm:text-[12px]">
                    {slot.title}
                  </p>
                  <p className="mt-auto pt-2 text-[12px] font-semibold text-brand sm:text-[13px]">
                    {slot.talkLabel}
                  </p>
                </div>
              </button>
            </motion.li>
          ))}
        </motion.ul>

        <p className="mt-3 text-[11px] leading-relaxed text-slate-400 sm:text-[12px]">
          Click a card to start talking. Meet all 21 specialists below.
        </p>
      </motion.div>

      <AgentAskModal
        open={Boolean(active)}
        onClose={() => setActive(null)}
        agentId={active?.agentId ?? needHelpSlots[0].agentId}
        agentName={active?.agentName ?? needHelpSlots[0].agentName}
        portraitPhoto={active?.photo ?? needHelpSlots[0].photo}
      />
    </>
  );
}
