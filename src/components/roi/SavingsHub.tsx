"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MissedLeadCalculator } from "@/components/roi/MissedLeadCalculator";
import { SeatCostCalculator } from "@/components/roi/SeatCostCalculator";

export type SavingsCalc = "missed" | "seats";

const tools: {
  id: SavingsCalc;
  eye: string;
  title: string;
  body: string;
}[] = [
  {
    id: "missed",
    eye: "Missed-lead calculator",
    title: "What missed leads cost you",
    body: "Four quick questions about calls, reply speed, job value, and close rate. Step-by-step math you can change.",
  },
  {
    id: "seats",
    eye: "Seat cost calculator",
    title: "What empty seats cost you",
    body: "Tick the roles you still need to fill, enter monthly cost, and compare hiring yourself with the AI Office team.",
  },
];

function parseCalc(v: string | null): SavingsCalc | null {
  if (v === "missed" || v === "missed-leads") return "missed";
  if (v === "seats" || v === "seat" || v === "seats-cost") return "seats";
  return null;
}

/** Savings hub: pick a card → calculator expands on this page below. */
export function SavingsHub() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<SavingsCalc | null>(() => parseCalc(searchParams.get("calc")));

  useEffect(() => {
    setActive(parseCalc(searchParams.get("calc")));
  }, [searchParams]);

  useEffect(() => {
    if (!active || !panelRef.current) return;
    panelRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [active]);

  const open = (id: SavingsCalc) => {
    setActive(id);
    router.replace(`/savings?calc=${id}`, { scroll: false });
  };

  return (
    <>
      <p className="mb-6 text-sm text-slate-500 sm:mb-8">
        <Link href="/#savings" className="font-semibold text-brand hover:underline">
          ← Back to home
        </Link>
      </p>
      <p className="text-[11px] font-semibold tracking-[0.2em] text-brand uppercase">Savings</p>
      <h1 className="mt-2 max-w-[20ch] text-[clamp(1.75rem,4vw,2.6rem)] font-semibold tracking-[-0.02em] text-slate-950 text-balance">
        Calculate your savings
      </h1>
      <p className="mt-3 max-w-[54ch] text-[15px] text-slate-600">
        Two tools for numbers-first owners. Same Founders plan price as Pricing. Choose a calculator — it opens
        below on this page. No pop-ups.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2" role="tablist" aria-label="Savings calculators">
        {tools.map((t) => {
          const on = active === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls="savings-calculator"
              onClick={() => open(t.id)}
              className={`group flex flex-col rounded-2xl border bg-white p-6 text-left transition ${
                on
                  ? "border-brand shadow-[0_12px_40px_-24px_rgba(1,13,255,0.45)] ring-2 ring-brand/20"
                  : "border-slate-200 hover:border-brand/35 hover:shadow-[0_12px_40px_-24px_rgba(1,13,255,0.35)]"
              }`}
            >
              <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">{t.eye}</p>
              <p className="mt-2 text-xl font-semibold tracking-[-0.02em] text-slate-950">{t.title}</p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{t.body}</p>
              <span className="mt-5 text-sm font-semibold text-brand">
                {on ? "Open below ↓" : "Open calculator →"}
              </span>
            </button>
          );
        })}
      </div>

      {active ? (
        <div
          id="savings-calculator"
          ref={panelRef}
          role="tabpanel"
          className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10"
        >
          {active === "missed" ? <MissedLeadCalculator /> : <SeatCostCalculator />}
        </div>
      ) : null}
    </>
  );
}
