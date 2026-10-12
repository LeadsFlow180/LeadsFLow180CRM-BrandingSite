import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { agentCallUrl, agentFirstName } from "@/lib/agentCall";
import { getAgentProfile } from "@/lib/agentProfiles";
import { agents } from "@/lib/site";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return agents.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const profile = getAgentProfile(id);
  if (!profile) return { title: "Call · LeadsFlow180" };
  const first = agentFirstName(profile.agent.name);
  return {
    title: `Call ${first} · LeadsFlow180`,
    description: `Talk live with ${profile.agent.name}, ${profile.agent.title}.`,
  };
}

/** Full-page iframe host for the AI Office call UI (no popup). */
export default async function AgentCallPage({ params }: Props) {
  const { id } = await params;
  const profile = getAgentProfile(id);
  if (!profile) notFound();

  const first = agentFirstName(profile.agent.name);
  const src = agentCallUrl(profile.id);

  return (
    <div className="flex h-dvh flex-col bg-white">
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-2.5 sm:px-5">
        <Link
          href={`/agents/${profile.id}`}
          className="text-[13px] font-semibold text-brand hover:underline"
        >
          ← Back to {first}
        </Link>
        <p className="truncate text-[13px] font-semibold tracking-[-0.02em] text-slate-950">
          Call {first}
        </p>
        <Link href="/agents" className="text-[13px] font-semibold text-slate-500 hover:text-brand hover:underline">
          Meet the Team
        </Link>
      </header>
      <iframe
        src={src}
        title={`Call ${first}`}
        className="min-h-0 w-full flex-1 border-0"
        allow="microphone; autoplay; camera"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
