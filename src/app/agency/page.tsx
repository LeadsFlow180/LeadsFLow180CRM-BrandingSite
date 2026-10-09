import type { Metadata } from "next";
import Link from "next/link";
import { AgencyInquiryForm } from "@/components/agency/AgencyInquiryForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Agency & partners · LeadsFlow180",
  description:
    "Reseller and partner inquiries for LeadsFlow180 — bring FLOW to your clients.",
};

/** Partner / reseller inquiry page. */
export default function AgencyPage() {
  return (
    <div id="top" className="bg-[#f4f6fb]">
      <Header />
      <main className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(1,13,255,0.06),transparent_45%),radial-gradient(ellipse_at_90%_20%,rgba(70,9,174,0.07),transparent_40%)]"
        />
        <div className="relative mx-auto max-w-[920px] px-4 py-10 sm:px-6 sm:py-14">
          <p className="mb-6 text-sm text-slate-500 sm:mb-8">
            <Link href="/" className="font-semibold text-brand hover:underline">
              ← Back to homepage
            </Link>
          </p>

          <p className="text-[11px] font-semibold tracking-[0.2em] text-brand uppercase">Agency</p>
          <h1 className="mt-2 max-w-[18ch] text-[clamp(1.75rem,4vw,2.6rem)] font-semibold tracking-[-0.02em] text-slate-950 text-balance">
            Partner with LeadsFlow180
          </h1>
          <p className="mt-3 max-w-[54ch] text-[15px] text-slate-600">
            For resellers and partners who want to offer FLOW to their clients. Tell us about your book of business —
            we will follow up.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { t: "Reseller", d: "Refer or resell seats. You own the client relationship." },
              { t: "Partner", d: "Grow together with co-selling support and shared playbooks." },
              { t: "Managed desks", d: "Run multiple client accounts from one agency workspace." },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm font-semibold text-slate-950">{c.t}</p>
                <p className="mt-1 text-sm text-slate-600">{c.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <h2 className="text-lg font-semibold tracking-[-0.02em] text-slate-950">Send an inquiry</h2>
            <p className="mt-1 text-sm text-slate-600">No pop-ups. We reply by email.</p>
            <div className="mt-5">
              <AgencyInquiryForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
