"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { PortfolioSample } from "@/lib/agentPortfolioSamples";

type Props = {
  sample: PortfolioSample;
  siblings: PortfolioSample[];
};

/** Same-tab sample stage on white — image, PDF, or audio play. Shared by every agent portfolio. */
export function AgentSampleViewer({ sample, siblings }: Props) {
  const first = sample.agentName.split(" ")[0] ?? sample.agentName;
  const idx = siblings.findIndex((s) => s.slug === sample.slug);
  const prev = idx > 0 ? siblings[idx - 1] : null;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  async function toggleAudio() {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      await el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  }

  return (
    <div className="min-h-[100dvh] bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-brand-green uppercase">
              Sample concept · {first}
            </p>
            <h1 className="mt-0.5 truncate text-lg font-semibold tracking-[-0.03em] text-[#0b1b4d] sm:text-xl">
              {sample.title}
            </h1>
            <p className="mt-0.5 truncate text-[13px] text-slate-500">{sample.detail}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/agents/${sample.agentId}`}
              className="inline-flex h-9 items-center rounded-full px-3.5 text-[12px] font-semibold text-brand ring-1 ring-slate-200 transition hover:bg-slate-50"
            >
              ← Back to {first}
            </Link>
            {sample.pdf ? (
              <a
                href={sample.pdf}
                download
                className="inline-flex h-9 items-center rounded-full bg-brand px-3.5 text-[12px] font-semibold text-white transition hover:bg-[#0000d6]"
              >
                Download PDF
              </a>
            ) : null}
          </div>
        </div>
        <div aria-hidden="true" className="brand-line h-[2px] w-full" />
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-8 lg:py-10">
        <aside className="order-2 space-y-4 lg:order-1">
          {sample.cover ? (
            <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm lg:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={sample.cover} alt="" className="aspect-[3/4] w-full rounded-xl object-cover object-top" />
            </div>
          ) : null}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
            <p className="text-[10px] font-semibold tracking-[0.18em] text-slate-400 uppercase">Prepared by</p>
            <p className="mt-1 text-sm font-semibold text-[#0b1b4d]">{sample.agentName}</p>
            <p className="mt-0.5 text-[12px] text-slate-500">{sample.agentTitle}</p>
          </div>
          {siblings.length > 1 ? (
            <div>
              <p className="mb-2 text-[10px] font-semibold tracking-[0.18em] text-slate-400 uppercase">All samples</p>
              <ul className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
                {siblings.map((s) => {
                  const active = s.slug === sample.slug;
                  return (
                    <li key={s.slug} className="shrink-0">
                      <Link
                        href={s.viewerHref}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center gap-2.5 rounded-xl border p-1.5 transition ${
                          active
                            ? "border-brand/30 bg-[#eef0ff]"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        {s.cover ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={s.cover} alt="" className="size-11 rounded-lg object-cover object-top sm:size-12" />
                        ) : (
                          <span className="grid size-11 place-items-center rounded-lg bg-brand text-white sm:size-12">
                            ▶
                          </span>
                        )}
                        <span className="hidden min-w-0 flex-1 pr-1 lg:block">
                          <span className="block truncate text-[12px] font-semibold text-slate-800">{s.title}</span>
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
                className="inline-flex min-h-9 flex-1 items-center justify-center rounded-full border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-700 hover:bg-slate-50"
              >
                ← Prev
              </Link>
            ) : null}
            {next ? (
              <Link
                href={next.viewerHref}
                className="inline-flex min-h-9 flex-1 items-center justify-center rounded-full border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-700 hover:bg-slate-50"
              >
                Next →
              </Link>
            ) : null}
          </div>
        </aside>

        <section className="order-1 min-w-0 lg:order-2">
          {sample.kind === "pdf" && sample.pdf ? (
            <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_24px_50px_-28px_rgba(15,23,42,0.35)]">
              <div aria-hidden="true" className="brand-line h-[2px] w-full" />
              <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2.5">
                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                <span className="size-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-2 truncate text-[11px] text-slate-500">{sample.slug}.pdf</span>
              </div>
              <iframe
                title={`${sample.title} PDF`}
                src={`${sample.pdf}#toolbar=1&navpanes=0&view=FitH`}
                className="h-[min(82dvh,960px)] w-full bg-white"
              />
            </div>
          ) : null}

          {sample.kind === "image" && sample.cover ? (
            <figure className="mx-auto max-w-3xl">
              <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white p-2 shadow-[0_24px_50px_-28px_rgba(15,23,42,0.35)] sm:p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sample.cover}
                  alt={`${sample.title} — sample`}
                  className="block w-full rounded-[14px]"
                />
              </div>
              <figcaption className="mt-4 text-center text-[13px] text-slate-500">
                Sample concept — large view of {first}’s work.
              </figcaption>
            </figure>
          ) : null}

          {sample.kind === "audio" && sample.audio ? (
            <div className="mx-auto flex max-w-lg flex-col items-center rounded-[24px] border border-slate-200 bg-slate-50 px-6 py-14 text-center shadow-sm sm:px-10">
              <p className="text-[11px] font-semibold tracking-[0.2em] text-brand-green uppercase">Voicemail sample</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#0b1b4d]">{sample.title}</h2>
              <p className="mt-2 max-w-[34ch] text-sm text-slate-500">{sample.detail}</p>
              <button
                type="button"
                onClick={() => void toggleAudio()}
                aria-pressed={playing}
                className="mt-8 inline-flex size-24 items-center justify-center rounded-full bg-brand text-white shadow-[0_18px_40px_-12px_rgba(1,13,255,0.55)] transition hover:bg-[#0000d6] hover:scale-[1.03] active:scale-[0.98]"
              >
                <span className="sr-only">{playing ? "Pause" : "Play"} voicemail</span>
                {playing ? (
                  <svg viewBox="0 0 24 24" className="size-9" fill="currentColor" aria-hidden="true">
                    <rect x="6" y="5" width="4" height="14" rx="1" />
                    <rect x="14" y="5" width="4" height="14" rx="1" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="ml-1 size-10" fill="currentColor" aria-hidden="true">
                    <path d="M8 5.5v13l11-6.5L8 5.5z" />
                  </svg>
                )}
              </button>
              <p className="mt-4 text-[12px] text-slate-400">{playing ? "Playing…" : "Tap play to listen"}</p>
              <audio
                ref={audioRef}
                src={sample.audio}
                preload="metadata"
                onEnded={() => setPlaying(false)}
                onPause={() => setPlaying(false)}
                onPlay={() => setPlaying(true)}
              />
            </div>
          ) : null}
        </section>
      </main>
    </div>
  );
}
