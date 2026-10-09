import Link from "next/link";
import type { PortfolioSample } from "@/lib/agentPortfolioSamples";

type Props = {
  sample: PortfolioSample;
  siblings: PortfolioSample[];
};

/** Cinematic same-tab sample viewer — cover stage + embedded PDF. */
export function AgentSampleViewer({ sample, siblings }: Props) {
  const first = sample.agentName.split(" ")[0] ?? sample.agentName;
  const idx = siblings.findIndex((s) => s.slug === sample.slug);
  const prev = idx > 0 ? siblings[idx - 1] : null;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null;

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[#04050f] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(1,13,255,0.28),transparent_42%),radial-gradient(ellipse_at_85%_15%,rgba(70,9,174,0.22),transparent_40%),radial-gradient(ellipse_at_50%_100%,rgba(0,255,38,0.06),transparent_45%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <header className="relative z-10 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-brand-green uppercase">
              Sample concept · {first}
            </p>
            <h1 className="mt-0.5 truncate text-lg font-semibold tracking-[-0.03em] sm:text-xl">
              {sample.title}
            </h1>
            <p className="mt-0.5 truncate text-[13px] text-white/55">{sample.detail}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/agents/${sample.agentId}`}
              className="inline-flex h-9 items-center rounded-full px-3.5 text-[12px] font-semibold text-white/85 ring-1 ring-white/20 transition hover:bg-white/10"
            >
              ← Back to {first}
            </Link>
            <a
              href={sample.pdf}
              download
              className="inline-flex h-9 items-center rounded-full bg-gradient-to-b from-[#3a44ff] to-brand px-3.5 text-[12px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_20px_-10px_rgba(1,13,255,0.85)]"
            >
              Download PDF
            </a>
          </div>
        </div>
        <div aria-hidden="true" className="brand-line h-[2px] w-full opacity-80" />
      </header>

      <main className="relative z-10 mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)] lg:items-start lg:gap-10 lg:py-12">
        <aside className="space-y-5">
          <div className="overflow-hidden rounded-[22px] bg-white/[0.04] p-2.5 shadow-[0_40px_80px_-40px_rgba(1,13,255,0.75)] ring-1 ring-white/15">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={sample.cover}
              alt=""
              className="aspect-[3/4] w-full rounded-[16px] object-cover object-top"
            />
          </div>
          <div className="rounded-[20px] bg-white/[0.04] p-4 ring-1 ring-white/10">
            <p className="text-[10px] font-semibold tracking-[0.18em] text-white/45 uppercase">Prepared by</p>
            <p className="mt-1 text-sm font-semibold text-white">
              {sample.agentName}
              <span className="font-normal text-white/50"> · {sample.agentTitle}</span>
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-white/55">
              Demonstration sample for this lane — labeled as a concept until permissioned client work replaces it.
            </p>
          </div>

          {siblings.length > 1 ? (
            <div>
              <p className="mb-2.5 text-[10px] font-semibold tracking-[0.18em] text-white/45 uppercase">
                More from {first}
              </p>
              <ul className="flex gap-2.5 overflow-x-auto pb-1">
                {siblings.map((s) => {
                  const active = s.slug === sample.slug;
                  return (
                    <li key={s.slug} className="shrink-0">
                      <Link
                        href={s.viewerHref}
                        className={`block w-[4.75rem] overflow-hidden rounded-xl ring-1 transition ${
                          active ? "ring-brand-green/70" : "ring-white/15 hover:ring-white/35"
                        }`}
                        aria-current={active ? "page" : undefined}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={s.cover} alt="" className="aspect-[3/4] w-full object-cover object-top" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}

          <div className="flex gap-2">
            {prev ? (
              <Link
                href={prev.viewerHref}
                className="inline-flex min-h-9 flex-1 items-center justify-center rounded-full bg-white/[0.06] px-3 text-[12px] font-semibold text-white ring-1 ring-white/15"
              >
                ← {prev.title}
              </Link>
            ) : null}
            {next ? (
              <Link
                href={next.viewerHref}
                className="inline-flex min-h-9 flex-1 items-center justify-center rounded-full bg-white/[0.06] px-3 text-[12px] font-semibold text-white ring-1 ring-white/15"
              >
                {next.title} →
              </Link>
            ) : null}
          </div>
        </aside>

        <section className="min-w-0">
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.2em] text-brand-green uppercase">Document stage</p>
              <p className="mt-1 text-sm text-white/60">Viewing in FLOW — same tab, full sample PDF.</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-[24px] bg-[#0b1020] shadow-[0_50px_100px_-48px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.12)]">
            <div aria-hidden="true" className="brand-line h-[2px] w-full" />
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 truncate text-[11px] text-white/45">{sample.slug}.pdf</span>
            </div>
            <iframe
              title={`${sample.title} PDF`}
              src={`${sample.pdf}#view=FitH`}
              className="h-[min(78dvh,920px)] w-full bg-[#111827]"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
