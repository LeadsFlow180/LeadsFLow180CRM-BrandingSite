import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AgentPortfolioPage } from "@/components/agents/AgentPortfolioPage";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getAgentProfile } from "@/lib/agentProfiles";
import { agents } from "@/lib/site";

// Previous office walkthrough-style layout (kept for reference):
// import { AgentOfficeHero } from "@/components/agents/AgentOfficeHero";
// import { AgentOfficeTile } from "@/components/agents/AgentOfficeTile";
// import { AgentProfileBody } from "@/components/agents/AgentProfileBody";
// import { AgentTalkPanel } from "@/components/agents/AgentTalkPanel";
// import { getAllAgentProfiles } from "@/lib/agentProfiles";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ verify?: string }>;
};

export function generateStaticParams() {
  return agents.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const profile = getAgentProfile(id);
  if (!profile) return { title: "Agent · LeadsFlow180" };
  return {
    title: `${profile.agent.name} — ${profile.agent.title} · LeadsFlow180`,
    description: profile.bio,
  };
}

export default async function AgentPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { verify } = await searchParams;
  const profile = getAgentProfile(id);
  if (!profile) notFound();

  // const others = getAllAgentProfiles().filter((p) => p.id !== id).slice(0, 8);

  return (
    <div id="top" className="bg-white">
      <Header />
      <main>
        <AgentPortfolioPage profile={profile} initialVerifyToken={verify ?? null} />

        {/*
        <AgentOfficeHero
          agentId={profile.id}
          officePhoto={profile.officePhoto}
          portraitPhoto={profile.portraitPhoto}
          name={profile.agent.name}
          title={profile.agent.title}
          tagline={profile.tagline}
        />
        <AgentProfileBody profile={profile} />
        <AgentTalkPanel
          agentId={profile.id}
          agentName={profile.agent.name}
          initialVerifyToken={verify ?? null}
        />
        <section className="border-t border-slate-200/90 bg-canvas">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
            <h2 className="text-2xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-3xl">
              More offices on this floor
            </h2>
            <ul className="mt-8 grid grid-cols-1 gap-5 min-[420px]:grid-cols-2 lg:grid-cols-4">
              {others.map((p) => (
                <li key={p.id}>
                  <AgentOfficeTile
                    agentId={p.id}
                    name={p.agent.name}
                    title={p.agent.title}
                    officePhoto={p.officePhoto}
                    portraitPhoto={p.portraitPhoto}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
        */}
      </main>
      <Footer />
    </div>
  );
}
