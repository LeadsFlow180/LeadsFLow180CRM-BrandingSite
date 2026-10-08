"use client";

import { useMemo, useState } from "react";
import { SliderField } from "@/components/roi/SliderField";
import {
  computeMissedLeads,
  missedLeadDefaults,
  money,
  num,
  pct,
  roiConfig,
  type MissedLeadInputs,
} from "@/lib/roiMath";

function Ctas() {
  return (
    <>
      <div className="mt-5 flex flex-wrap gap-2.5">
        <a
          href={roiConfig.signup}
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl bg-white px-4 text-sm font-semibold text-brand transition hover:bg-[#eef0ff]"
        >
          Yes, open my workspace
        </a>
        <a
          href={roiConfig.talk}
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl border border-white/50 px-4 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Talk to a specialist first
        </a>
      </div>
      <p className="mt-3 text-[12.5px] text-[#cdbdf7]">
        Founders rate: {money(roiConfig.price)} a month (list price {money(roiConfig.listPrice)}). You approve ad
        spend, live publishing, and payments before anything goes out.
      </p>
    </>
  );
}

/** Missed-lead recovery calculator — same math as roi-missed-leads.html. */
export function MissedLeadCalculator() {
  const [v, setV] = useState<MissedLeadInputs>(missedLeadDefaults);
  const set = <K extends keyof MissedLeadInputs>(key: K, n: number) => setV((s) => ({ ...s, [key]: n }));
  const r = useMemo(() => computeMissedLeads(v), [v]);

  const days = r.profit > 0 ? (roiConfig.price / r.profit) * 30 : Infinity;
  const verdict =
    r.profit >= roiConfig.price
      ? `At these numbers the plan pays for itself in about ${Math.max(1, Math.round(days))} days.`
      : r.profit > 0
        ? `At these numbers you win back ${money(r.profit)} a month, which covers ${pct((r.profit / roiConfig.price) * 100)} of the ${money(roiConfig.price)} plan. Raise your call volume or job value to see where it breaks even.`
        : "Enter your numbers to see what missed calls cost you.";

  return (
    <div>
      <p className="text-[11px] font-semibold tracking-[0.2em] text-brand uppercase">Missed-lead calculator</p>
      <h3 className="mt-2 text-[clamp(1.5rem,4vw,2.15rem)] font-semibold tracking-[-0.01em] text-slate-950">
        What are missed calls and slow replies costing you every month?
      </h3>
      <p className="mt-2.5 max-w-[62ch] text-[15px] text-slate-600">
        Answer four quick questions. Every number is yours to change, and the math is shown step by step.
      </p>

      <div className="mt-6 grid items-start gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h4 className="mb-3.5 text-xs font-semibold tracking-[0.12em] text-slate-500 uppercase">Your business</h4>
          <SliderField
            id="ml-calls"
            label="Calls and inquiries per month"
            min={10}
            max={600}
            step={5}
            value={v.calls}
            hint="Phone calls, forms, chats, and quote requests."
            onChange={(n) => set("calls", n)}
          />
          <SliderField
            id="ml-late"
            label="Missed or answered late"
            suffix="%"
            min={5}
            max={70}
            step={1}
            value={v.late}
            hint="Check last month's call log on your phone. It takes a minute."
            onChange={(n) => set("late", n)}
          />
          <SliderField
            id="ml-job"
            label="Average job value"
            prefix="$"
            min={200}
            max={50000}
            step={100}
            value={v.job}
            onChange={(n) => set("job", n)}
          />
          <SliderField
            id="ml-close"
            label="Close rate on prospects you answer fast"
            suffix="%"
            min={5}
            max={80}
            step={1}
            value={v.close}
            onChange={(n) => set("close", n)}
          />

          <details className="mt-2 border-t border-slate-200 pt-3.5">
            <summary className="cursor-pointer text-sm font-semibold text-brand">Assumptions and math. Change any of them.</summary>
            <div className="mt-3.5">
              <SliderField
                id="ml-qualified"
                label="Share that are real new prospects"
                suffix="%"
                min={10}
                max={100}
                step={1}
                value={v.qualified}
                hint="Spam, wrong numbers, and existing customers don't count."
                onChange={(n) => set("qualified", n)}
              />
              <SliderField
                id="ml-anyway"
                label="Prospects who would reach you another way anyway"
                suffix="%"
                min={0}
                max={80}
                step={1}
                value={v.anyway}
                hint="They call back or book online. We take them out."
                onChange={(n) => set("anyway", n)}
              />
              <SliderField
                id="ml-revive"
                label="Of the rest, share we bring into a conversation"
                suffix="%"
                min={5}
                max={90}
                step={1}
                value={v.revive}
                hint="Our starting guess. Lower it for a tougher test."
                onChange={(n) => set("revive", n)}
              />
              <SliderField
                id="ml-rel"
                label="Those prospects close at this share of your normal rate"
                suffix="%"
                min={10}
                max={100}
                step={1}
                value={v.rel}
                hint="Late leads are colder, so we assume they close less often."
                onChange={(n) => set("rel", n)}
              />
              <SliderField
                id="ml-margin"
                label="Profit margin on a job"
                suffix="%"
                min={5}
                max={90}
                step={1}
                value={v.margin}
                onChange={(n) => set("margin", n)}
              />
            </div>
            <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-slate-600">
              <li>
                Missed or answered late:{" "}
                <b className="tabular-nums text-slate-900">
                  {num(v.calls)} × {v.late}% = {num(r.late)} a month
                </b>
              </li>
              <li>
                Real new prospects:{" "}
                <b className="tabular-nums text-slate-900">
                  {num(r.late)} × {v.qualified}% = {num(r.qual)}
                </b>
              </li>
              <li>
                Revenue at risk (exposure):{" "}
                <b className="tabular-nums text-slate-900">
                  {num(r.qual)} × {v.close}% × {money(v.job)} = {money(r.risk)}
                </b>
              </li>
              <li>
                Take out those who reach you anyway:{" "}
                <b className="tabular-nums text-slate-900">
                  {num(r.qual)} × {100 - v.anyway}% = {num(r.left)}
                </b>
              </li>
              <li>
                Brought into a conversation:{" "}
                <b className="tabular-nums text-slate-900">
                  {num(r.left)} × {v.revive}% = {num(r.back)}
                </b>
              </li>
              <li>
                Jobs won:{" "}
                <b className="tabular-nums text-slate-900">
                  {num(r.back)} × ({v.close}% × {v.rel}% = {num(r.rate * 100)}%) = {num(r.jobs)} jobs
                </b>
              </li>
              <li>
                Revenue:{" "}
                <b className="tabular-nums text-slate-900">
                  {num(r.jobs)} × {money(v.job)} = {money(r.rev)}
                </b>
              </li>
              <li>
                Profit at {v.margin}% margin: <b className="tabular-nums text-slate-900">{money(r.profit)}</b>
              </li>
              <li>
                After the {money(roiConfig.price)} plan:{" "}
                <b className="tabular-nums text-slate-900">{money(r.net)} a month</b>
              </li>
            </ol>
          </details>
        </section>

        <aside className="rounded-2xl bg-gradient-to-br from-[#1a0a3e] via-[#2a0f66] to-[#36088a] p-5 text-white sm:p-6">
          <p className="text-xs font-semibold tracking-[0.14em] text-[#cdbdf7] uppercase">Profit you could win back</p>
          <p className="mt-1.5 text-[clamp(2.3rem,7vw,3.3rem)] leading-none font-bold tracking-[-0.02em] text-brand-green tabular-nums">
            {money(r.profit)}
            <small className="ml-1.5 text-[0.36em] font-medium tracking-normal text-[#e9e2ff]">a month</small>
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-white" aria-live="polite">
            {verdict}
          </p>
          <dl className="mt-4.5 grid grid-cols-[1fr_auto] gap-x-4 gap-y-2 border-t border-white/20 pt-4 text-sm">
            <dt className="text-[#dccffb]">New prospects you miss or answer late</dt>
            <dd className="text-right font-semibold tabular-nums">{num(r.qual)}</dd>
            <dt className="text-[#dccffb]">Revenue at risk each month</dt>
            <dd className="text-right font-semibold tabular-nums">{money(r.risk)}</dd>
            <dt className="text-[#dccffb]">Extra jobs we could win back</dt>
            <dd className="text-right font-semibold tabular-nums">{num(r.jobs)}</dd>
            <dt className="text-[#dccffb]">Extra revenue each month</dt>
            <dd className="text-right font-semibold tabular-nums">{money(r.rev)}</dd>
            <dt className="text-[#dccffb]">Plan cost each month</dt>
            <dd className="text-right font-semibold tabular-nums">{money(r.price)}</dd>
            <dt className="text-[#dccffb]">Profit left after the plan</dt>
            <dd className="text-right font-semibold tabular-nums">{money(r.net)}</dd>
            <dt className="text-[#dccffb]">Left after the plan, 12 months</dt>
            <dd className="text-right font-semibold tabular-nums">{money(r.yr)}</dd>
          </dl>
          <Ctas />
        </aside>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3 sm:gap-5">
        {[
          {
            t: "Missed-call text-back",
            d: "When a call goes unanswered, the caller gets a text right away. They hear from you before they call the next company.",
          },
          {
            t: "Follow-up that starts itself",
            d: "A new lead from a form, chat, or booking page creates a follow-up task and starts your follow-up workflow.",
          },
          {
            t: "Booking in the reply",
            d: "Leads pick a time on your calendar link instead of waiting for a call back.",
          },
        ].map((p) => (
          <div key={p.t} className="border-t-2 border-brand pt-2.5">
            <h4 className="text-sm font-semibold text-slate-950">{p.t}</h4>
            <p className="mt-1 text-sm text-slate-600">{p.d}</p>
          </div>
        ))}
      </div>
      <p className="mt-4.5 max-w-[84ch] text-[12.5px] text-slate-500">
        Revenue at risk is exposure, not a proven loss. Some of those callers would have reached you another way,
        which is why the win-back math takes them out. This estimate counts profit on the first job only. It leaves
        out repeat work, referrals, and wasted ad spend. It is built from the numbers you enter and is not a promise
        of results.
      </p>
    </div>
  );
}
