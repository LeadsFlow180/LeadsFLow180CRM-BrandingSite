"use client";

import { useMemo, useState } from "react";
import {
  integrationCategories,
  integrationsFillers,
  integrationUseCases,
  type IntegrationCard,
} from "@/lib/integrationsFillers";
import { links } from "@/lib/site";

type Tab = "discover" | "installed";

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IntegrationTile({ item }: { item: IntegrationCard }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <article className="group flex h-full flex-col rounded-2xl bg-white p-5 ring-1 ring-slate-200/90 transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-28px_rgba(1,13,255,0.45)] hover:ring-brand/25">
      <div
        className="grid size-14 place-items-center rounded-xl ring-1 ring-slate-100"
        style={{ background: `${item.tint}14` }}
      >
        {!imgFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.icon}
            alt=""
            className="size-8 object-contain"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span className="text-sm font-bold text-slate-700" aria-hidden="true">
            {item.mark}
          </span>
        )}
      </div>
      <h3 className="mt-4 text-[15px] font-bold tracking-tight text-slate-950">{item.name}</h3>
      <p className="mt-1 text-[12px] font-medium text-slate-500">{item.builder}</p>
      <p className="mt-auto pt-4 text-[11px] font-semibold tracking-wide text-brand/80 uppercase">
        {item.caps.join(" · ")}
      </p>
      <p className="mt-2 text-[10px] font-medium text-slate-400">Filler · sample connector</p>
    </article>
  );
}

/** Marketing Integration Center — branding-site section (no app sidebar). */
export function IntegrationsCenter() {
  const [tab, setTab] = useState<Tab>("discover");
  const [query, setQuery] = useState("");
  const [useCase, setUseCase] = useState<(typeof integrationUseCases)[number]>("All Integrations");
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<"name" | "category">("name");

  const installedCount = integrationsFillers.filter((i) => i.installed).length;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = integrationsFillers.filter((i) => {
      if (tab === "installed" && !i.installed) return false;
      if (useCase !== "All Integrations" && !i.useCases.includes(useCase)) return false;
      if (category && i.category !== category) return false;
      if (!q) return true;
      return (
        i.name.toLowerCase().includes(q) ||
        i.builder.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q) ||
        i.caps.some((c) => c.toLowerCase().includes(q))
      );
    });
    list = [...list].sort((a, b) =>
      sort === "name"
        ? a.name.localeCompare(b.name)
        : a.category.localeCompare(b.category) || a.name.localeCompare(b.name),
    );
    return list;
  }, [tab, query, useCase, category, sort]);

  const recommended = useMemo(
    () => filtered.filter((i) => i.recommended).slice(0, 4),
    [filtered],
  );

  return (
    <div>
      <div className="max-w-3xl">
        <p className="inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.28em] text-brand uppercase">
          <span className="brand-line h-[2px] w-8 rounded-full" />
          Integrations
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-5xl">
          Connect the tools behind the HOW.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
          Browse filler connectors for FLOW — ads, messaging, payments, websites, and automation. Real install
          flows come later.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-6 border-b border-slate-200">
        {(
          [
            { id: "discover" as const, label: "Discover" },
            { id: "installed" as const, label: `Installed (${installedCount})` },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`relative cursor-pointer pb-3 text-sm font-semibold transition ${
              tab === t.id ? "text-brand" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {t.label}
            {tab === t.id ? (
              <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-brand" aria-hidden="true" />
            ) : null}
          </button>
        ))}
      </div>

      <label className="relative mt-8 block max-w-xl">
        <span className="sr-only">Search integrations</span>
        <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search integrations…"
          className="w-full rounded-2xl border-0 bg-white py-3.5 pr-4 pl-12 text-[15px] text-slate-800 shadow-sm ring-1 ring-slate-200/90 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-brand/35"
        />
      </label>

      <div className="mt-6 flex flex-wrap gap-2">
        {integrationUseCases.map((u) => (
          <button
            key={u}
            type="button"
            onClick={() => {
              setUseCase(u);
              setCategory(null);
            }}
            className={`cursor-pointer rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition ${
              useCase === u
                ? "bg-brand text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:text-slate-900"
            }`}
          >
            {u}
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {integrationCategories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory((prev) => (prev === c ? null : c))}
            className={`cursor-pointer rounded-full px-3 py-1 text-[11px] font-semibold transition ${
              category === c
                ? "bg-brand/10 text-brand ring-1 ring-brand/30"
                : "text-slate-500 hover:bg-white hover:text-slate-800"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {tab === "discover" && recommended.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-sm font-bold tracking-wide text-slate-800 uppercase">Recommended</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recommended.map((item) => (
              <li key={`rec-${item.id}`}>
                <IntegrationTile item={item} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-bold tracking-wide text-slate-800 uppercase">
            {tab === "installed" ? "Installed" : "All Integrations"}
            <span className="ml-2 font-semibold text-slate-400 normal-case">({filtered.length})</span>
          </h2>
          <label className="flex items-center gap-2 text-[12px] font-semibold text-slate-500">
            Sort by
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as "name" | "category")}
              className="cursor-pointer rounded-lg bg-white px-2.5 py-1.5 text-slate-800 ring-1 ring-slate-200 outline-none focus:ring-brand/40"
            >
              <option value="name">Name</option>
              <option value="category">Category</option>
            </select>
          </label>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-8 rounded-2xl bg-white px-5 py-10 text-center text-sm text-slate-500 ring-1 ring-slate-200/80">
            No filler connectors match this filter.
          </p>
        ) : (
          <ul className="mt-5 grid gap-4 min-[420px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((item) => (
              <li key={item.id}>
                <IntegrationTile item={item} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="mt-16 rounded-[28px] bg-gradient-to-br from-brand to-brand-purple p-8 text-white sm:p-10">
        <p className="text-[11px] font-bold tracking-[0.2em] text-brand-green uppercase">Coming soon</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">Custom integrations</h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
          Wire your own tools into FLOW. This band is filler until connector docs and install flows ship.
        </p>
        <a
          href={links.office}
          className="mt-6 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-bold text-brand transition hover:brightness-95"
        >
          Open AI Office
        </a>
      </div>
    </div>
  );
}
