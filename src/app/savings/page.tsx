import type { Metadata } from "next";
import { Suspense } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SavingsHub } from "@/components/roi/SavingsHub";

export const metadata: Metadata = {
  title: "Savings calculators · LeadsFlow180",
  description:
    "Calculate what missed leads and empty seats cost your business — then see what you keep with LeadsFlow180.",
};

/** Hub: pick a card → calculator opens on the same page below. */
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
          <Suspense fallback={<p className="text-sm text-slate-500">Loading savings tools…</p>}>
            <SavingsHub />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
