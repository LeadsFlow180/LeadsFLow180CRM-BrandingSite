"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { formatMoney, pricingPlan, signupTodayBonuses } from "@/lib/pricing";
import { links } from "@/lib/site";
import { Reveal, ease } from "../Motion";

type CheckoutStatus = "success" | "canceled" | null;

function readCheckoutStatus(): CheckoutStatus {
  if (typeof window === "undefined") return null;
  const v = new URLSearchParams(window.location.search).get("checkout");
  if (v === "success" || v === "canceled") return v;
  return null;
}

/** Home pricing band: Launch Founders $697/mo → Stripe Checkout (white-dominant). */
export function Pricing() {
  const reduce = useReducedMotion() ?? false;
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<CheckoutStatus>(null);

  useEffect(() => {
    const s = readCheckoutStatus();
    setStatus(s);
    if (!s) return;
    // Reason: drop the query so a refresh does not keep flashing the banner.
    const url = new URL(window.location.href);
    url.searchParams.delete("checkout");
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash || "#pricing"}`);
  }, []);

  const startCheckout = useCallback(async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Checkout could not start. Try again in a moment.");
      }
      window.location.assign(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout could not start.");
      setBusy(false);
    }
  }, []);

  return (
    <section id="pricing" className="relative scroll-mt-24 overflow-hidden bg-white py-16 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(15,23,42,0.06)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000,transparent)]"
      />
      <div aria-hidden="true" className="orb top-10 right-[-12%] size-[420px] bg-brand/10" />
      <div aria-hidden="true" className="orb bottom-[-20%] left-[-15%] size-[380px] bg-brand-green/10" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.28em] text-brand uppercase">
            <span className="brand-line h-[2px] w-8 rounded-full" />
            Pricing
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl leading-[1.05] font-semibold tracking-[-0.035em] text-slate-950 min-[380px]:text-4xl sm:text-6xl">
            Launch Founders rate.{" "}
            <span className="text-brand-gradient">One desk. Full floor.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">{pricingPlan.tagline}</p>
        </Reveal>

        <AnimatePresence>
          {status && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease }}
              role="status"
              className={`mt-8 rounded-2xl px-4 py-3 text-sm ring-1 sm:px-5 ${
                status === "success"
                  ? "bg-emerald-50 text-slate-800 ring-brand-green/40"
                  : "bg-slate-50 text-slate-600 ring-slate-200"
              }`}
            >
              {status === "success" ? (
                <p>
                  Payment received. Next step:{" "}
                  <a href={links.signup} className="font-semibold text-brand underline-offset-2 hover:underline">
                    create your AI Office account
                  </a>{" "}
                  and we will map your Founders onboarding.
                </p>
              ) : (
                <p>Checkout canceled — your Founders offer is still open. Subscribe whenever you are ready.</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-10 grid items-start gap-6 lg:mt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <Reveal delay={0.08}>
            <div className="relative overflow-hidden rounded-[28px] bg-white p-5 shadow-[0_30px_60px_-36px_rgba(1,13,255,0.45)] ring-1 ring-slate-200/90 sm:p-8">
              <div aria-hidden="true" className="brand-line absolute inset-x-0 top-0 h-[2px]" />
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-stretch">
                <span className="inline-flex items-center justify-center rounded-2xl bg-brand px-4 py-2.5 text-sm font-semibold tracking-[0.08em] text-white uppercase shadow-[0_12px_28px_-12px_rgba(1,13,255,0.85)] sm:px-5 sm:py-3 sm:text-base sm:tracking-[0.1em]">
                  {pricingPlan.badge}
                </span>
                <span className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-emerald-50 px-4 py-2.5 text-sm font-semibold tracking-[0.06em] text-emerald-800 uppercase ring-1 ring-emerald-200 sm:px-5 sm:py-3 sm:text-base sm:tracking-[0.08em]">
                  <span className="size-2.5 shrink-0 animate-pulse rounded-full bg-brand-green motion-reduce:animate-none" />
                  {pricingPlan.offerLabel}
                </span>
              </div>

              <div className="mt-6 flex flex-wrap items-end gap-3">
                <p className="text-5xl font-semibold tracking-[-0.04em] text-slate-950 tabular-nums sm:text-6xl">
                  {formatMoney(pricingPlan.priceMonthly)}
                </p>
                <div className="pb-1.5">
                  <p className="text-sm font-medium text-slate-400 line-through">{formatMoney(pricingPlan.compareAtMonthly)}/mo</p>
                  <p className="text-sm font-semibold text-slate-600">per month</p>
                </div>
              </div>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">{pricingPlan.description}</p>

              <ul className="mt-7 space-y-3">
                {pricingPlan.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-800 sm:text-base">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[10px] text-emerald-700 ring-1 ring-emerald-200"
                    >
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={startCheckout}
                  disabled={busy}
                  className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-b from-[#3a44ff] to-brand px-6 py-3.5 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_4px_0_#0008a8,0_18px_36px_-12px_rgba(1,13,255,0.9)] transition-[translate,box-shadow,opacity] duration-200 hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_6px_0_#0008a8,0_22px_40px_-10px_rgba(1,13,255,0.95)] active:translate-y-[2px] active:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_1px_0_#0008a8] disabled:cursor-wait disabled:opacity-70 sm:w-auto"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-[320%]"
                  />
                  <span className="relative">{busy ? "Opening checkout…" : pricingPlan.cta}</span>
                  {!busy && (
                    <svg aria-hidden="true" viewBox="0 0 16 16" className="relative size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" />
                    </svg>
                  )}
                </button>
              </div>

              {error && (
                <p role="alert" className="mt-4 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600 ring-1 ring-slate-200">
                  {error}
                </p>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="rounded-[28px] bg-[#f4f6fb] p-5 ring-1 ring-slate-200/80 sm:p-7">
              <p className="text-[11px] font-semibold tracking-[0.22em] text-brand uppercase">
                Bonuses for signing up today
              </p>

              <ul className="mt-6 space-y-3">
                {signupTodayBonuses.map((bonus, i) => (
                  <motion.li
                    key={bonus.id}
                    initial={reduce ? false : { opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, ease, delay: 0.05 * i }}
                    className="rounded-2xl bg-white p-4 shadow-[0_12px_30px_-20px_rgba(15,23,42,0.35)] ring-1 ring-slate-200/80"
                  >
                    <p className="text-sm font-semibold text-slate-950">{bonus.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{bonus.detail}</p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
