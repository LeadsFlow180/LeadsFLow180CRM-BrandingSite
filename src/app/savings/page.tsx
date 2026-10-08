import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Savings calculators · LeadsFlow180",
  description:
    "Calculate what missed leads and empty seats cost your business — then see what you keep with LeadsFlow180.",
};

const tools = [
  {
    href: "/savings/missed-leads",
    eye: "Missed-lead calculator",
    title: "What missed leads cost you",
    body: "Four quick questions about calls, reply speed, job value, and close rate. Step-by-step math you can change.",
  },
  {
    href: "/savings/seats",
    eye: "Seat cost calculator",
    title: "What empty seats cost you",
    body: "Tick the roles you still need to fill, enter monthly cost, and compare hiring yourself with the AI Office team.",
  },
] as const;

/** Hub: pick a savings calculator (full pages — no pop-ups). */
export default function SavingsPage() {
  return (
    <div id="top" className="bg-[#f4f6fb]">
      <Header />
      <main className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(1,13,255,0.06),transparent_45%),radial-gradient(ellipse_at_90%_20%,rgba(70,9,174,0.07),transparent_40%)]"
        />
        <div className="relative mx-auto max-w-[1040px] px-4 py-10 sm:px-6 sm:py-14">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-brand uppercase">Savings</p>
          <h1 className="mt-2 max-w-[20ch] text-[clamp(1.75rem,4vw,2.6rem)] font-semibold tracking-[-0.02em] text-slate-950 text-balance">
            Calculate your savings
          </h1>
          <p className="mt-3 max-w-[54ch] text-[15px] text-slate-600">
            Two tools for numbers-first owners. Same Founders plan price as Pricing. No pop-ups — each calculator
            opens on its own page.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {tools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-brand/35 hover:shadow-[0_12px_40px_-24px_rgba(1,13,255,0.35)]"
              >
                <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">{t.eye}</p>
                <p className="mt-2 text-xl font-semibold tracking-[-0.02em] text-slate-950">{t.title}</p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{t.body}</p>
                <span className="mt-5 text-sm font-semibold text-brand transition group-hover:underline">
                  Open calculator →
                </span>
              </Link>
            ))}
          </div>

          <p className="mt-12 text-sm text-slate-500">
            <Link href="/#savings" className="font-semibold text-brand hover:underline">
              ← Back to home
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
