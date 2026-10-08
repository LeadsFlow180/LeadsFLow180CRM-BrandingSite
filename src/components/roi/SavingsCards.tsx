"use client";

import Link from "next/link";
import { Reveal } from "@/components/Motion";

const cards = [
  {
    href: "/savings/missed-leads",
    eye: "Missed-lead calculator",
    title: "Missed leads",
    body: "What unanswered calls and slow replies cost you every month — with your numbers.",
  },
  {
    href: "/savings/seats",
    eye: "Seat cost calculator",
    title: "Empty seats",
    body: "What it costs to fill the roles you are missing, versus the LeadsFlow180 team.",
  },
] as const;

/** Standalone home section above Multilingual — two links into Savings pages (no pop-ups). */
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
            For owners who want the math first. Open a calculator — full page, no pop-ups.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5">
          {cards.map((c, i) => (
            <Reveal key={c.href} delay={0.08 * (i + 1)}>
              <Link
                href={c.href}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-[#f4f6fb] p-5 transition hover:border-brand/35 hover:bg-white hover:shadow-[0_16px_40px_-28px_rgba(1,13,255,0.45)] sm:p-6"
              >
                <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">{c.eye}</p>
                <p className="mt-2 text-xl font-semibold tracking-[-0.02em] text-slate-950">{c.title}</p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{c.body}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand transition group-hover:gap-2.5">
                  Open calculator
                  <span aria-hidden>→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
