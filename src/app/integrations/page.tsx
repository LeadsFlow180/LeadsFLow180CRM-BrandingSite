import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { IntegrationsCenter } from "@/components/integrations/IntegrationsCenter";

export const metadata: Metadata = {
  title: "Integrations · LeadsFlow180",
  description:
    "Connect ads, inbox, bookings, payments, and websites to the LeadsFlow180 FLOW workspace — with human approval still on.",
};

/** Marketing integrations — 11 core connectors + expandable Make / Zapier / n8n bridges. */
export default function IntegrationsPage() {
  return (
    <div id="top" className="bg-white">
      <Header />
      <main className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,#000_0%,#000_55%,transparent_100%)]"
        />
        <div aria-hidden="true" className="orb top-[-8%] left-[-12%] size-[480px] bg-brand/10" />
        <div aria-hidden="true" className="orb top-[35%] right-[-14%] size-[420px] bg-brand-purple/10" />

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          <p className="mb-6 text-sm text-slate-500 sm:mb-8">
            <Link href="/#features" className="font-semibold text-brand hover:underline">
              ← Back to Features
            </Link>
          </p>
          <IntegrationsCenter />
        </div>
      </main>
      <Footer />
    </div>
  );
}
