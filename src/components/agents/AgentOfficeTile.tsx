"use client";

import Link from "next/link";
import { useState } from "react";
import { agentCallPageHref, agentFirstName } from "@/lib/agentCall";
import { officePhotoCandidates } from "@/lib/agentProfiles";

type Props = {
  agentId: string;
  name: string;
  title: string;
  officePhoto: string;
  portraitPhoto: string;
};

/** Clean directory doorway — office still + portrait; Talk to goes to full-page call iframe. */
export function AgentOfficeTile({ agentId, name, title, officePhoto, portraitPhoto }: Props) {
  const candidates = [officePhoto, ...officePhotoCandidates(agentId).filter((u) => u !== officePhoto), portraitPhoto];
  const [index, setIndex] = useState(0);
  const src = candidates[Math.min(index, candidates.length - 1)];
  const first = agentFirstName(name);

  return (
    <div className="group relative h-full overflow-hidden rounded-[22px] bg-white shadow-[0_20px_44px_-28px_rgba(15,23,42,0.4)] ring-1 ring-slate-200/90 transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_56px_-28px_rgba(1,13,255,0.35)]">
      <Link href={`/agents/${agentId}`} className="block h-full">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={src}
            src={src}
            alt=""
            loading="lazy"
            decoding="async"
            onError={() => setIndex((i) => (i + 1 < candidates.length ? i + 1 : i))}
            className="size-full object-cover object-[50%_42%] transition duration-500 group-hover:scale-[1.04]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-2.5 p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={portraitPhoto}
              alt=""
              loading="lazy"
              decoding="async"
              className="size-9 shrink-0 rounded-full object-cover object-top ring-2 ring-white/80"
            />
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-white">{name}</span>
              <span className="mt-0.5 block truncate text-[11px] text-white/75">{title}</span>
            </span>
          </div>
        </div>
      </Link>

      {/* Reason: portfolio stays on card click; Talk to opens /call/[id] full page. */}
      <Link
        href={agentCallPageHref(agentId)}
        className="absolute top-3 right-3 z-10 inline-flex min-h-9 items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[12px] font-bold text-slate-950 shadow-[0_10px_24px_-10px_rgba(15,23,42,0.55)] ring-1 ring-white/90 backdrop-blur-sm transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
      >
        <PhoneIcon className="size-3.5 text-brand" />
        Talk to {first}
      </Link>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden bg-slate-950/30 opacity-0 transition duration-300 sm:block sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
      />
    </div>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path
        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
