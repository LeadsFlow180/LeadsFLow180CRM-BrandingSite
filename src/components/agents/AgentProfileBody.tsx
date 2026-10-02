import Link from "next/link";
import type { AgentProfile } from "@/lib/agentProfiles";
import type { Agent } from "@/lib/site";

type Props = {
  profile: AgentProfile & { agent: Agent };
};

/** Clean bio + work + FAQ — one purpose per section, brand canvas, no card clutter. */
export function AgentProfileBody({ profile }: Props) {
  const { agent } = profile;

  return (
    <div id="about" className="scroll-mt-24 bg-canvas">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:items-start">
          <div>
            <p className="text-[11px] font-bold tracking-[0.22em] text-brand uppercase">{agent.group}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Meet {agent.name}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{profile.bio}</p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {profile.personality.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-slate-200/90 bg-white px-3.5 py-1.5 text-sm text-slate-700"
                >
                  {item}
                </li>
              ))}
              <li className="rounded-full border border-slate-200/90 bg-white px-3.5 py-1.5 text-sm text-slate-700">
                Favorite: {profile.favoriteFood}
              </li>
            </ul>

            {profile.draft && (
              <p className="mt-6 text-xs text-slate-400">
                Bio is a draft — final copy arrives with the sole document.
              </p>
            )}
          </div>

          <aside className="relative overflow-hidden rounded-[28px] bg-black p-6 text-white sm:p-7">
            <div className="brand-line absolute inset-x-0 top-0 h-0.5" aria-hidden="true" />
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.portraitPhoto}
                alt=""
                className="size-16 rounded-full object-cover object-top ring-2 ring-white/20"
              />
              <div className="min-w-0">
                <p className="text-[10px] font-bold tracking-[0.2em] text-[#9eb0ff] uppercase">In their space</p>
                <p className="mt-1 text-lg font-semibold tracking-[-0.03em]">{agent.name}</p>
                <p className="mt-0.5 text-sm text-white/65">{agent.title}</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-white/75">{agent.skill}</p>
            <a
              href="#talk"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-brand-green"
            >
              Check in with {agent.name}
              <span aria-hidden="true">→</span>
            </a>
          </aside>
        </div>

        <section className="mt-16 border-t border-slate-200/90 pt-12 sm:mt-20 sm:pt-14">
          <h2 className="text-2xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-3xl">Work on the desk</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
            Sample outputs from {agent.name}&apos;s lane — proof of craft, separate from the office scene.
          </p>
          <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {profile.work.map((w) => (
              <li key={w.id} className="border-l-2 border-brand/25 pl-4">
                <p className="text-base font-semibold tracking-[-0.02em] text-slate-950">{w.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{w.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        {profile.faqs.length > 0 && (
          <section className="mt-16 border-t border-slate-200/90 pt-12 sm:mt-20 sm:pt-14">
            <h2 className="text-2xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-3xl">FAQs</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Built to help people find {agent.name} when they search for this kind of help.
            </p>
            <dl className="mt-8 divide-y divide-slate-200/90 border-y border-slate-200/90">
              {profile.faqs.map((f) => (
                <div key={f.q} className="py-5">
                  <dt className="text-base font-semibold tracking-[-0.02em] text-slate-950">{f.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <p className="mt-12 text-sm text-slate-500">
          <Link href="/agents" className="font-semibold text-brand underline-offset-2 hover:underline">
            All offices
          </Link>
        </p>
      </div>
    </div>
  );
}
