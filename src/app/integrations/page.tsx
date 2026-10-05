import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { IntegrationsCenter } from "@/components/integrations/IntegrationsCenter";

export const metadata: Metadata = {
  title: "Integrations · LeadsFlow180",
  description:
    "Browse filler connectors for the LeadsFlow180 FLOW workspace — ads, messaging, payments, websites, and automation.",
};

/** Marketing integrations section — same site chrome as home/agents; filler catalog only. */
export default function IntegrationsPage() {
  return (
    <div id="top" className="bg-white">
      <Header />
      <main className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(15,23,42,0.06)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_40%_at_50%_0%,#000,transparent)]"
        />
        <div aria-hidden="true" className="orb top-0 left-[-15%] size-[420px] bg-brand/10" />
        <div aria-hidden="true" className="orb bottom-0 right-[-15%] size-[380px] bg-brand-purple/10" />

        <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <IntegrationsCenter />
          <p className="mt-10 text-sm text-slate-500">
            <Link href="/#features" className="font-semibold text-brand hover:underline">
              ← Back to Features
            </Link>
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
