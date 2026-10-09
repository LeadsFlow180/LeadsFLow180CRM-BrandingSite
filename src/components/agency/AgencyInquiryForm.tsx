"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "ok" | "error";

/** Reseller / partner inquiry form → /api/agency. */
export function AgencyInquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<{ name: string; email: string } | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    // Reason: React nulls e.currentTarget after await — keep the form ref.
    const form = e.currentTarget;
    const fd = new FormData(form);
    const body = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      company: String(fd.get("company") || "").trim(),
      website: String(fd.get("website") || "").trim(),
      interest: String(fd.get("interest") || "").trim(),
      message: String(fd.get("message") || "").trim(),
    };
    try {
      const res = await fetch("/api/agency", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Could not send. Try again.");
      form.reset();
      setSubmitted({ name: body.name.split(" ")[0] || body.name, email: body.email });
      setStatus("ok");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not send.");
    }
  }

  if (status === "ok") {
    const first = submitted?.name || "there";
    const email = submitted?.email;
    return (
      <div
        role="status"
        aria-live="polite"
        className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_44px_-32px_rgba(1,13,255,0.35)] sm:p-8"
      >
        <div aria-hidden="true" className="brand-line absolute inset-x-0 top-0 h-[2px]" />
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
          <span
            aria-hidden="true"
            className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
          >
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-brand-green uppercase">Inquiry received</p>
            <h3 className="mt-1.5 text-xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-2xl">
              Thank you{first !== "there" ? `, ${first}` : ""}. We have your inquiry.
            </h3>
            <p className="mt-2 max-w-[42ch] text-[15px] leading-relaxed text-slate-600">
              A partner specialist will review your note and reply
              {email ? (
                <>
                  {" "}
                  at <span className="font-semibold text-slate-800">{email}</span>
                </>
              ) : (
                " by email"
              )}
              , typically within one business day.
            </p>
            <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-5 text-sm text-slate-600">
              <li className="flex gap-2.5">
                <span aria-hidden="true" className="mt-0.5 size-1.5 shrink-0 rounded-full bg-brand" />
                Keep an eye on your inbox (and spam) for our reply.
              </li>
              <li className="flex gap-2.5">
                <span aria-hidden="true" className="mt-0.5 size-1.5 shrink-0 rounded-full bg-brand" />
                Ready to explore FLOW now? Open your workspace anytime.
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <a
                href="/"
                className="inline-flex min-h-10 items-center justify-center rounded-full bg-brand px-5 text-sm font-semibold text-white transition hover:bg-[#0000d6]"
              >
                Back to homepage
              </a>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(null);
                  setStatus("idle");
                }}
                className="inline-flex min-h-10 items-center justify-center rounded-full border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                Submit another inquiry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const field =
    "mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-brand focus:ring-2 focus:ring-brand/15";

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-800">
          Your name
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block text-sm font-semibold text-slate-800">
          Work email
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
        <label className="block text-sm font-semibold text-slate-800">
          Company
          <input name="company" required autoComplete="organization" className={field} />
        </label>
        <label className="block text-sm font-semibold text-slate-800">
          Website
          <input name="website" type="url" placeholder="https://" autoComplete="url" className={field} />
        </label>
      </div>
      <fieldset>
        <legend className="text-sm font-semibold text-slate-800">I am interested in</legend>
        <div className="mt-2 flex flex-wrap gap-3">
          {[
            { v: "reseller", l: "Reseller" },
            { v: "partner", l: "Partner" },
            { v: "managed", l: "Managed desks" },
          ].map((o) => (
            <label key={o.v} className="inline-flex items-center gap-2 text-sm text-slate-700">
              <input
                type="radio"
                name="interest"
                value={o.v}
                required
                defaultChecked={o.v === "reseller"}
                className="accent-brand"
              />
              {o.l}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="block text-sm font-semibold text-slate-800">
        How can we help?
        <textarea name="message" required rows={4} className={`${field} resize-y`} placeholder="Clients, regions, volume, timeline…" />
      </label>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand px-6 text-sm font-semibold text-white transition hover:bg-[#0000d6] disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Submit inquiry"}
      </button>
    </form>
  );
}
