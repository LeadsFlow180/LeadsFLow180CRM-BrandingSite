"use client";

import { useMemo, useState } from "react";
import { SliderField } from "@/components/roi/SliderField";
import {
  computeSeatCost,
  money,
  num,
  roiConfig,
  seatCostDefaults,
  seatDefaults,
  type SeatCostInputs,
  type SeatRow,
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

/** Seat-cost savings calculator — same math as roi-savings.html. */
export function SeatCostCalculator() {
  const [seats, setSeats] = useState<SeatRow[]>(() => seatDefaults.map((s) => ({ ...s })));
  const [v, setV] = useState<SeatCostInputs>(seatCostDefaults);
  const setNum = <K extends keyof SeatCostInputs>(key: K, n: number) =>
    setV((s) => ({ ...s, [key]: n }));

  const r = useMemo(() => computeSeatCost(seats, v), [seats, v]);
  const barMax = Math.max(r.today, r.withLF, 1);

  const verdict =
    r.n === 0
      ? "Tick at least one seat you need to fill."
      : r.net > 0
        ? `Filling these seats yourself would cost about ${money(r.today)} a month. With LeadsFlow180 you spend about ${money(r.withLF)} and keep ${money(r.net)} a month, or ${money(r.yr)} a year.`
        : `At these numbers LeadsFlow180 would cost you ${money(-r.net)} more each month. Tick only the seats you really need, or lower your review time, and check again.`;

  return (
    <div>
      <p className="text-[11px] font-semibold tracking-[0.2em] text-brand uppercase">Seat cost calculator</p>
      <h3 className="mt-2 text-[clamp(1.5rem,4vw,2.15rem)] font-semibold tracking-[-0.01em] text-slate-950">
        What does it cost to fill the seats your business is missing?
      </h3>
      <p className="mt-2.5 max-w-[62ch] text-[15px] text-slate-600">
        Tick the roles you need but have not filled, or only have part-time. Enter what each would cost you a month.
        We compare that with the LeadsFlow180 team and charge you for your own review time.
      </p>

      <div className="mt-6 grid items-start gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h4 className="mb-3.5 text-xs font-semibold tracking-[0.12em] text-slate-500 uppercase">Seats to fill</h4>
          <div>
            {seats.map((seat, i) => (
              <div
                key={seat.id}
                className={`grid grid-cols-1 items-center gap-2.5 border-t border-slate-200 py-3 first:border-t-0 first:pt-0 sm:grid-cols-[1fr_auto] sm:gap-3.5 ${
                  seat.on ? "" : "opacity-55"
                }`}
              >
                <label className="flex cursor-pointer items-start gap-2.5" htmlFor={`seat-on-${seat.id}`}>
                  <input
                    id={`seat-on-${seat.id}`}
                    type="checkbox"
                    checked={seat.on}
                    onChange={(e) => {
                      const on = e.target.checked;
                      setSeats((rows) => rows.map((row, j) => (j === i ? { ...row, on } : row)));
                    }}
                    className="mt-0.5 size-[18px] accent-brand"
                  />
                  <span>
                    <b className="block text-sm font-semibold text-slate-950">{seat.name}</b>
                    <em className="mt-0.5 block text-[12.5px] not-italic text-slate-500">{seat.who}</em>
                  </span>
                </label>
                <div className={`pl-7 sm:pl-0 ${seat.on ? "" : "opacity-45"}`}>
                  <label htmlFor={`seat-pay-${seat.id}`} className="grid gap-1 text-[11px] font-semibold text-slate-500">
                    Cost a month
                    <span className="inline-flex h-[34px] items-center gap-1 rounded-lg border border-slate-300 bg-white px-2 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/15">
                      <span className="text-sm font-semibold text-slate-500">$</span>
                      <input
                        id={`seat-pay-${seat.id}`}
                        type="number"
                        inputMode="decimal"
                        min={0}
                        max={50000}
                        step={50}
                        value={seat.pay}
                        onChange={(e) => {
                          const pay = Math.min(50000, Math.max(0, parseFloat(e.target.value) || 0));
                          setSeats((rows) => rows.map((row, j) => (j === i ? { ...row, pay } : row)));
                        }}
                        className="w-[4.4em] border-0 bg-transparent p-0 text-right text-sm font-semibold tabular-nums text-slate-900 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                    </span>
                  </label>
                </div>
              </div>
            ))}
          </div>

          <h4 className="mt-5.5 mb-3.5 text-xs font-semibold tracking-[0.12em] text-slate-500 uppercase">Your own time</h4>
          <SliderField
            id="sc-hrs"
            label="Hours a week you spend reviewing drafts"
            min={0}
            max={20}
            step={0.5}
            value={v.hrs}
            hint="Two hours is our starting guess."
            onChange={(n) => setNum("hrs", n)}
          />
          <SliderField
            id="sc-rate"
            label="What an hour of your time is worth"
            prefix="$"
            min={0}
            max={300}
            step={5}
            value={v.rate}
            onChange={(n) => setNum("rate", n)}
          />

          <details className="mt-2 border-t border-slate-200 pt-3.5">
            <summary className="cursor-pointer text-sm font-semibold text-brand">Assumptions and math. Change any of them.</summary>
            <div className="mt-3.5">
              <SliderField
                id="sc-burden"
                label="Extra cost on top of pay (taxes, benefits, equipment)"
                suffix="%"
                min={0}
                max={50}
                step={1}
                value={v.burden}
                hint="Applies to seats only, not software."
                onChange={(n) => setNum("burden", n)}
              />
              {seats
                .filter((s) => !s.software)
                .map((seat) => (
                  <SliderField
                    key={seat.id}
                    id={`sc-cover-${seat.id}`}
                    label={`${seat.name}: share your specialist handles`}
                    suffix="%"
                    min={0}
                    max={100}
                    step={5}
                    value={v.covers[seat.id] ?? seat.cover}
                    onChange={(n) =>
                      setV((s) => ({
                        ...s,
                        covers: { ...s.covers, [seat.id]: n },
                      }))
                    }
                  />
                ))}
            </div>
            <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-slate-600">
              <li>
                Cost to fill the ticked seats (pay plus {v.burden}% extra, software at face value):{" "}
                <b className="tabular-nums text-slate-900">{money(r.today)}</b>
              </li>
              <li>
                Handled by your specialists (each seat cost × its share):{" "}
                <b className="tabular-nums text-slate-900">{money(r.saved)}</b>
              </li>
              <li>
                Still done by your people:{" "}
                <b className="tabular-nums text-slate-900">
                  {money(r.today)} − {money(r.saved)} = {money(r.left)}
                </b>
              </li>
              <li>
                Plan: <b className="tabular-nums text-slate-900">{money(r.price)}</b>
              </li>
              <li>
                Your review time:{" "}
                <b className="tabular-nums text-slate-900">
                  {num(v.hrs)} hours × 4.33 weeks × {money(v.rate)} = {money(r.review)}
                </b>
              </li>
              <li>
                With LeadsFlow180:{" "}
                <b className="tabular-nums text-slate-900">
                  {money(r.left)} + {money(r.price)} + {money(r.review)} = {money(r.withLF)}
                </b>
              </li>
              <li>
                You keep:{" "}
                <b className="tabular-nums text-slate-900">
                  {money(r.today)} − {money(r.withLF)} = {money(r.net)} a month
                </b>
              </li>
            </ol>
          </details>
        </section>

        <aside className="rounded-2xl bg-gradient-to-br from-[#1a0a3e] via-[#2a0f66] to-[#36088a] p-5 text-white sm:p-6">
          <p className="text-xs font-semibold tracking-[0.14em] text-[#cdbdf7] uppercase">You keep, after the plan</p>
          <p
            className={`mt-1.5 text-[clamp(2.3rem,7vw,3.3rem)] leading-none font-bold tracking-[-0.02em] tabular-nums ${
              r.net < 0 ? "text-[#ffb4a2]" : "text-brand-green"
            }`}
          >
            {money(r.net)}
            <small className="ml-1.5 text-[0.36em] font-medium tracking-normal text-[#e9e2ff]">a month</small>
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-white" aria-live="polite">
            {verdict}
          </p>

          <div className="mt-4.5 grid gap-3">
            <div className="grid gap-1.5 text-[13px]">
              <div className="flex justify-between gap-3 text-[#dccffb]">
                <span>Filling the seats yourself</span>
                <b className="font-semibold text-white tabular-nums">{money(r.today)}</b>
              </div>
              <div className="h-3.5 overflow-hidden rounded-full bg-white/14">
                <div
                  className="h-full rounded-full bg-[#cdbdf7] transition-[width] duration-250"
                  style={{ width: `${(r.today / barMax) * 100}%` }}
                />
              </div>
            </div>
            <div className="grid gap-1.5 text-[13px]">
              <div className="flex justify-between gap-3 text-[#dccffb]">
                <span>With LeadsFlow180</span>
                <b className="font-semibold text-white tabular-nums">{money(r.withLF)}</b>
              </div>
              <div className="h-3.5 overflow-hidden rounded-full bg-white/14">
                <div
                  className="h-full rounded-full bg-brand-green transition-[width] duration-250"
                  style={{ width: `${(r.withLF / barMax) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <dl className="mt-4.5 grid grid-cols-[1fr_auto] gap-x-4 gap-y-2 border-t border-white/20 pt-4 text-sm">
            <dt className="text-[#dccffb]">Handled by your specialists</dt>
            <dd className="text-right font-semibold tabular-nums">{money(r.saved)}</dd>
            <dt className="text-[#dccffb]">Still done by your people</dt>
            <dd className="text-right font-semibold tabular-nums">{money(r.left)}</dd>
            <dt className="text-[#dccffb]">Plan cost</dt>
            <dd className="text-right font-semibold tabular-nums">{money(r.price)}</dd>
            <dt className="text-[#dccffb]">Your review time</dt>
            <dd className="text-right font-semibold tabular-nums">{money(r.review)}</dd>
            <dt className="text-[#dccffb]">Kept over 12 months</dt>
            <dd className="text-right font-semibold tabular-nums">{money(r.yr)}</dd>
          </dl>
          <Ctas />
        </aside>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3 sm:gap-5">
        {[
          {
            t: "21 specialists, one workspace",
            d: "Sales, email, ads, social, content, research, and ops each have a named specialist who drafts the work.",
          },
          {
            t: "You approve what matters",
            d: "Ad spend, live publishing, and payments wait for your yes. That is why the plan counts your review time.",
          },
          {
            t: "The tools are already inside",
            d: "Pipeline, inbox, email, funnels, booking, reviews, and a client portal come with the workspace.",
          },
        ].map((p) => (
          <div key={p.t} className="border-t-2 border-brand pt-2.5">
            <h4 className="text-sm font-semibold text-slate-950">{p.t}</h4>
            <p className="mt-1 text-sm text-slate-600">{p.d}</p>
          </div>
        ))}
      </div>
      <p className="mt-4.5 max-w-[84ch] text-[12.5px] text-slate-500">
        A specialist does not fill a seat the way a full-time hire does. Your specialists draft and run routine work,
        and you approve it. The shares in the assumptions are our estimates of how much of each seat they handle. They
        are not measured results, so set them to what you believe. The pay you enter is a monthly cost to you.
      </p>
    </div>
  );
}
