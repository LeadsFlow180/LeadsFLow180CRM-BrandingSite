"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "ok" | "error";

/** Reseller / partner inquiry form → /api/agency. */
export function AgencyInquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    const fd = new FormData(e.currentTarget);
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
      setStatus("ok");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not send.");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl border border-brand-green/30 bg-brand-green/10 px-5 py-6 text-sm text-slate-800">
        <p className="font-semibold text-slate-950">Thanks — we got your inquiry.</p>
        <p className="mt-1.5 text-slate-600">A partner specialist will follow up at the email you shared.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-semibold text-brand hover:underline"
        >
          Send another
        </button>
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
