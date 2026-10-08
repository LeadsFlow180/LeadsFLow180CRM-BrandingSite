import type { ReactNode } from "react";

/** Mini UI thumbnails for Savings cards — decorative only. */

function WindowChrome({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-[0_18px_50px_-28px_rgba(15,23,42,0.45)] ring-1 ring-black/5">
      <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-3 py-2">
        <span className="size-1.5 rounded-full bg-slate-300" />
        <span className="size-1.5 rounded-full bg-slate-300" />
        <span className="size-1.5 rounded-full bg-slate-300" />
      </div>
      {children}
    </div>
  );
}

function SliderRow({ label, value, fill }: { label: string; value: string; fill: string }) {
  return (
    <div className="mb-2.5">
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="truncate text-[8px] font-semibold text-slate-700">{label}</span>
        <span className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[8px] font-semibold tabular-nums text-slate-800">
          {value}
        </span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-brand" style={{ width: fill }} />
      </div>
    </div>
  );
}

function Kv({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-2 text-[7.5px]">
      <span className="truncate text-[#dccffb]">{label}</span>
      <span className="shrink-0 font-semibold tabular-nums text-white">{value}</span>
    </div>
  );
}

/** Compact missed-lead calculator chrome. */
export function MissedLeadPreview() {
  return (
    <WindowChrome>
      <div className="grid grid-cols-[1.05fr_0.95fr] gap-2 bg-[#f8f9fc] p-2.5 sm:gap-2.5 sm:p-3">
        <div className="rounded-lg border border-slate-200 bg-white p-2 sm:p-2.5">
          <p className="mb-2 text-[7px] font-semibold tracking-[0.14em] text-slate-400 uppercase">Your business</p>
          <SliderRow label="Calls per month" value="100" fill="18%" />
          <SliderRow label="Missed or late" value="30%" fill="38%" />
          <SliderRow label="Average job value" value="$4500" fill="12%" />
          <SliderRow label="Close rate" value="25%" fill="28%" />
        </div>
        <div className="rounded-lg bg-gradient-to-br from-[#1a0a3e] via-[#2a0f66] to-[#36088a] p-2.5 text-white sm:p-3">
          <p className="text-[7px] font-semibold tracking-[0.12em] text-[#cdbdf7] uppercase">Profit you could win back</p>
          <p className="mt-1 text-[17px] leading-none font-bold tracking-tight text-brand-green tabular-nums sm:text-[20px]">
            $1,361
            <span className="ml-1 text-[8px] font-medium text-[#e9e2ff]">a month</span>
          </p>
          <div className="mt-2.5 space-y-1 border-t border-white/15 pt-2">
            <Kv label="Prospects late" value="18" />
            <Kv label="Revenue at risk" value="$20,250" />
            <Kv label="Extra jobs" value="0.9" />
            <Kv label="After the plan" value="$664" />
          </div>
        </div>
      </div>
    </WindowChrome>
  );
}

/** Compact seat-cost calculator chrome. */
export function SeatCostPreview() {
  const rows = [
    { name: "Marketing coordinator", on: true, pay: "$3500" },
    { name: "Email marketer", on: false, pay: "$2500" },
    { name: "Admin & scheduling", on: true, pay: "$3000" },
    { name: "Software you pay today", on: true, pay: "$550" },
  ];

  return (
    <WindowChrome>
      <div className="grid grid-cols-[1.05fr_0.95fr] gap-2 bg-[#f8f9fc] p-2.5 sm:gap-2.5 sm:p-3">
        <div className="rounded-lg border border-slate-200 bg-white p-2 sm:p-2.5">
          <p className="mb-2 text-[7px] font-semibold tracking-[0.14em] text-slate-400 uppercase">Seats to fill</p>
          <div className="space-y-1.5">
            {rows.map((r) => (
              <div key={r.name} className={`flex items-center justify-between gap-2 ${r.on ? "" : "opacity-45"}`}>
                <div className="flex min-w-0 items-center gap-1.5">
                  <span
                    className={`size-2.5 shrink-0 rounded-[3px] border ${
                      r.on ? "border-brand bg-brand" : "border-slate-300 bg-white"
                    }`}
                  />
                  <span className="truncate text-[8px] font-semibold text-slate-800">{r.name}</span>
                </div>
                <span className="shrink-0 rounded border border-slate-200 px-1 py-0.5 text-[7.5px] font-semibold tabular-nums text-slate-700">
                  {r.pay}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-[#1a0a3e] via-[#2a0f66] to-[#36088a] p-2.5 text-white sm:p-3">
          <p className="text-[7px] font-semibold tracking-[0.12em] text-[#cdbdf7] uppercase">You keep, after the plan</p>
          <p className="mt-1 text-[17px] leading-none font-bold tracking-tight text-brand-green tabular-nums sm:text-[20px]">
            $3,157
            <span className="ml-1 text-[8px] font-medium text-[#e9e2ff]">a month</span>
          </p>
          <div className="mt-2.5 space-y-1.5">
            <div>
              <div className="mb-0.5 flex justify-between text-[7px] text-[#dccffb]">
                <span>Yourself</span>
                <span className="font-semibold text-white">$8,025</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
                <div className="h-full w-full rounded-full bg-[#cdbdf7]" />
              </div>
            </div>
            <div>
              <div className="mb-0.5 flex justify-between text-[7px] text-[#dccffb]">
                <span>With LF180</span>
                <span className="font-semibold text-white">$4,868</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
                <div className="h-full w-[61%] rounded-full bg-brand-green" />
              </div>
            </div>
          </div>
          <div className="mt-2 space-y-1 border-t border-white/15 pt-2">
            <Kv label="Handled by specialists" value="$4,288" />
            <Kv label="Kept over 12 months" value="$37,886" />
          </div>
        </div>
      </div>
    </WindowChrome>
  );
}
