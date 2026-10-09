"use client";

import { CrmMock } from "@/components/CrmMock";
import { Reveal } from "@/components/Motion";
import { links } from "@/lib/site";

/** Relocated CRM mock — product visual below the hero (mock left, copy right). */
export function FlowShowcase() {
  return (
    <section
      id="flow"
      className="scroll-mt-28 relative overflow-hidden border-y border-slate-200/70 bg-[#0b1020] py-16 text-white sm:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000,transparent)]"
      />
      <div aria-hidden="true" className="orb -left-20 top-[-15%] size-[420px] bg-brand/35" />
      <div aria-hidden="true" className="orb -right-16 bottom-[-20%] size-[380px] bg-brand-purple/30" />
      <div aria-hidden="true" className="brand-line absolute inset-x-0 top-0 h-[2px] opacity-80" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <Reveal className="relative order-2 min-w-0 lg:order-1">
          <div
            aria-hidden="true"
            className="absolute inset-x-[10%] -bottom-8 h-14 rounded-[100%] bg-brand/40 blur-2xl"
          />
          <div className="relative mx-auto w-full max-w-[560px] origin-top scale-[0.94] sm:max-w-none sm:scale-100">
            <CrmMock />
          </div>
        </Reveal>

        <Reveal delay={0.08} className="order-1 max-w-lg lg:order-2 lg:justify-self-end">
          <p className="inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.28em] text-brand-green uppercase">
            <span className="brand-line h-[2px] w-8 rounded-full" />
            FLOW · the HOW
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">
            Work lands in your CRM — ready to move.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
            Specialists draft deals, messages, and tasks in FLOW. You approve — and it lands live on your desk.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={links.crm}
              className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:brightness-95"
            >
              Open FLOW
            </a>
            <a
              href="/#features"
              className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-white/85 ring-1 ring-white/20 transition hover:bg-white/[0.06]"
            >
              See features
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
