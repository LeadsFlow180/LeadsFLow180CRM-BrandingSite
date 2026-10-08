import Link from "next/link";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

type Props = {
  children: ReactNode;
  backLabel?: string;
  backHref?: string;
};

/** Shared chrome for Savings calculator pages. */
export function SavingsShell({ children, backLabel = "All savings tools", backHref = "/savings" }: Props) {
  return (
    <div id="top" className="bg-[#f4f6fb]">
      <Header />
      <main className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(1,13,255,0.06),transparent_45%),radial-gradient(ellipse_at_90%_20%,rgba(70,9,174,0.07),transparent_40%)]"
        />
        <div className="relative mx-auto max-w-[1040px] px-4 py-10 sm:px-6 sm:py-14">
          {children}
          <p className="mt-10 text-sm text-slate-500">
            <Link href={backHref} className="font-semibold text-brand hover:underline">
              ← {backLabel}
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
