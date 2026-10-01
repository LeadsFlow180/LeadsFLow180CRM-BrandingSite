"use client";

import { useState } from "react";
import { officePhotoCandidates } from "@/lib/agentProfiles";

type Props = {
  agentId: string;
  name: string;
  title: string;
  officePhoto: string;
  portraitPhoto: string;
};

/** Clean directory doorway — bright office still + portrait badge, no muddy overlays. */
export function AgentOfficeTile({ agentId, name, title, officePhoto, portraitPhoto }: Props) {
  const candidates = [officePhoto, ...officePhotoCandidates(agentId).filter((u) => u !== officePhoto), portraitPhoto];
  const [index, setIndex] = useState(0);
  const src = candidates[Math.min(index, candidates.length - 1)];

  return (
    <a
      href={`/walkthrough#${agentId}`}
      className="group block overflow-hidden rounded-[22px] bg-white shadow-[0_20px_44px_-28px_rgba(15,23,42,0.4)] ring-1 ring-slate-200/90 transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_56px_-28px_rgba(1,13,255,0.35)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
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
    </a>
  );
}
