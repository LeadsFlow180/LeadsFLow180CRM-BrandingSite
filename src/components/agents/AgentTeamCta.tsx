import { links } from "@/lib/site";

type Props = {
  agentName: string;
};

/** Bottom-of-portfolio CTA — sits above Pricing/footer, never overlapping the footer. */
export function AgentTeamCta({ agentName }: Props) {
  const first = agentName.split(" ")[0] ?? agentName;

  return (
    <section
      aria-labelledby="agent-team-cta-title"
      className="relative border-t border-slate-200/80 bg-[#f4f6fb] py-14 sm:py-16"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-[22px] bg-gradient-to-br from-[#0b1020] via-[#1a0a3e] to-[#36088a] px-6 py-8 text-white shadow-[0_24px_60px_-36px_rgba(1,13,255,0.55)] ring-1 ring-white/10 sm:px-10 sm:py-10">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-brand-green uppercase">Ready when you are</p>
          <h2
            id="agent-team-cta-title"
            className="mt-2 max-w-[22ch] text-[clamp(1.4rem,3.5vw,2rem)] font-semibold tracking-[-0.02em] text-balance"
          >
            Put {first} — and the full floor — on your desk
          </h2>
          <p className="mt-2.5 max-w-[52ch] text-[15px] leading-relaxed text-white/65">
            Open FLOW, meet the team, and keep human approval on every draft that matters.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={links.signup}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-brand transition hover:bg-[#eef0ff]"
            >
              Create account
            </a>
            <a
              href="/agents"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/40 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Meet the full team
            </a>
            <a
              href="#pricing"
              className="inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-semibold text-brand-green transition hover:bg-white/10"
            >
              View pricing ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
