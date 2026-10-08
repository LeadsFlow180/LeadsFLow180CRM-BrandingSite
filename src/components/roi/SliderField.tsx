"use client";

type Props = {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  hint?: string;
  onChange: (n: number) => void;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/** Synced number box + range slider (matches original calculator fields). */
export function SliderField({ id, label, value, min, max, step, prefix, suffix, hint, onChange }: Props) {
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold text-slate-900">
          {label}
        </label>
        <div className="inline-flex h-9 items-center gap-1 rounded-lg border border-slate-300 bg-white px-2 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/15">
          {prefix ? <span className="text-sm font-semibold text-slate-500">{prefix}</span> : null}
          <input
            id={id}
            type="number"
            inputMode="decimal"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => {
              const x = parseFloat(e.target.value);
              onChange(Number.isNaN(x) ? min : clamp(x, min, max));
            }}
            className="w-[5.5em] border-0 bg-transparent p-0 text-right text-sm font-semibold tabular-nums text-slate-900 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          {suffix ? <span className="text-sm font-semibold text-slate-500">{suffix}</span> : null}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="mt-2.5 h-6 w-full accent-brand"
      />
      {hint ? <p className="mt-1 text-[12.5px] text-slate-500">{hint}</p> : null}
    </div>
  );
}
