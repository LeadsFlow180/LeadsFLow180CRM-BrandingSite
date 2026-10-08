"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { MissedLeadPreview, SeatCostPreview } from "@/components/roi/CalculatorPreviews";
import { Reveal } from "@/components/Motion";

function TextCard({
  eye,
  title,
  body,
}: {
  eye: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-[#f4f6fb] p-5 transition group-hover:border-brand/25 group-hover:bg-[#eef1f8] sm:p-6">
      <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">{eye}</p>
      <p className="mt-2 text-xl font-semibold tracking-[-0.02em] text-slate-950 sm:text-[1.35rem]">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand transition group-hover:gap-2.5">
        Open calculator
        <span aria-hidden>→</span>
      </span>
    </div>
  );
}

function PreviewFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative transition duration-300 group-hover:-translate-y-0.5 group-hover:scale-[1.01]">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-3 rounded-[1.35rem] bg-gradient-to-br from-brand/10 via-transparent to-brand-purple/10 opacity-0 blur-xl transition group-hover:opacity-100"
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/** Standalone home section above Multilingual — staggered cards + calculator thumbnails. */
export function SavingsCards() {
  return (
    <section
      id="savings"
      aria-labelledby="savings-title"
      className="relative scroll-mt-24 overflow-hidden border-y border-slate-200/80 bg-white py-14 sm:py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_0%,rgba(1,13,255,0.05),transparent_45%),radial-gradient(ellipse_at_95%_40%,rgba(70,9,174,0.06),transparent_40%)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.28em] text-brand uppercase">
            <span className="size-1.5 rounded-full bg-brand" />
            Calculate your savings
          </p>
          <h2
            id="savings-title"
            className="mt-3 max-w-[22ch] text-2xl font-semibold tracking-[-0.03em] text-slate-950 min-[380px]:text-3xl sm:text-4xl"
          >
            Run the numbers before you decide
          </h2>
          <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-slate-600">
            For owners who want the math first. Open a calculator on the Savings page — no pop-ups.
          </p>
        </Reveal>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-14">
          {/* Left: text → preview */}
          <Reveal>
            <Link href="/savings/missed-leads" className="group grid gap-5 outline-none">
              <TextCard
                eye="Missed-lead calculator"
                title="Missed leads"
                body="What unanswered calls and slow replies cost you every month — with your numbers."
              />
              <PreviewFrame>
                <MissedLeadPreview />
              </PreviewFrame>
            </Link>
          </Reveal>

          {/* Right: preview → text (staggered down on desktop) */}
          <Reveal delay={0.1}>
            <Link href="/savings/seats" className="group grid gap-5 outline-none lg:mt-16 xl:mt-24">
              <PreviewFrame>
                <SeatCostPreview />
              </PreviewFrame>
              <TextCard
                eye="Seat cost calculator"
                title="Empty seats"
                body="What it costs to fill the roles you are missing, versus the LeadsFlow180 team."
              />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
