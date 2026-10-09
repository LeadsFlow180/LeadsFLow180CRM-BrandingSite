import Link from "next/link";
import type { PortfolioSample } from "@/lib/agentPortfolioSamples";

type Props = {
  sample: PortfolioSample;
  siblings: PortfolioSample[];
};

/** Same-tab majestic viewer — thumbs open the real sample PDF on stage. */
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

      <header className="relative z-10 border-b border-white/10 bg-black/45 backdrop-blur-xl">
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

      <main className="relative z-10 mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-8 lg:py-10">
        <aside className="order-2 space-y-4 lg:order-1">
          <div className="hidden overflow-hidden rounded-2xl bg-white p-1.5 shadow-xl ring-1 ring-white/15 lg:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={sample.cover} alt="" className="aspect-[3/4] w-full rounded-xl object-cover object-top" />
          </div>
          <div className="rounded-2xl bg-white/[0.04] p-3.5 ring-1 ring-white/10">
            <p className="text-[10px] font-semibold tracking-[0.18em] text-white/45 uppercase">Prepared by</p>
            <p className="mt-1 text-sm font-semibold text-white">{sample.agentName}</p>
            <p className="mt-0.5 text-[12px] text-white/50">{sample.agentTitle}</p>
          </div>
          {siblings.length > 1 ? (
            <div>
              <p className="mb-2 text-[10px] font-semibold tracking-[0.18em] text-white/45 uppercase">All samples</p>
              <ul className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
                {siblings.map((s) => {
                  const active = s.slug === sample.slug;
                  return (
                    <li key={s.slug} className="shrink-0">
                      <Link
                        href={s.viewerHref}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center gap-2.5 rounded-xl p-1.5 ring-1 transition ${
                          active ? "bg-white/10 ring-brand-green/60" : "ring-white/10 hover:bg-white/[0.06]"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={s.cover} alt="" className="size-11 rounded-lg object-cover object-top sm:size-12" />
                        <span className="hidden min-w-0 flex-1 pr-1 lg:block">
                          <span className="block truncate text-[12px] font-semibold text-white">{s.title}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
          <div className="flex flex-wrap gap-2">
            {prev ? (
              <Link
                href={prev.viewerHref}
                className="inline-flex min-h-9 flex-1 items-center justify-center rounded-full bg-white/[0.06] px-3 text-[12px] font-semibold ring-1 ring-white/15"
              >
                ← Prev
              </Link>
            ) : null}
            {next ? (
              <Link
                href={next.viewerHref}
                className="inline-flex min-h-9 flex-1 items-center justify-center rounded-full bg-white/[0.06] px-3 text-[12px] font-semibold ring-1 ring-white/15"
              >
                Next →
              </Link>
            ) : null}
          </div>
        </aside>

        <section className="order-1 min-w-0 lg:order-2">
          <div className="overflow-hidden rounded-[24px] bg-[#0b1020] shadow-[0_50px_100px_-48px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.12)]">
            <div aria-hidden="true" className="brand-line h-[2px] w-full" />
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 truncate text-[11px] text-white/45">{sample.slug}.pdf</span>
            </div>
            {/* Reason: embed the real PDF binary — thumbs are covers only. */}
            <iframe
              title={`${sample.title} PDF`}
              src={`${sample.pdf}#toolbar=1&navpanes=0&view=FitH`}
              className="h-[min(82dvh,960px)] w-full bg-[#111827]"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
