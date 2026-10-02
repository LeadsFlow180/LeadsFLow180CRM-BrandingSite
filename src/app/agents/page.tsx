import type { Metadata } from "next";
import Link from "next/link";
import { AgentOfficeTile } from "@/components/agents/AgentOfficeTile";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getAllAgentProfiles } from "@/lib/agentProfiles";

export const metadata: Metadata = {
  title: "Meet the Team · LeadsFlow180",
  description: "Visit each AI Office specialist — portfolio, skills, and a short verified talk.",
};

/** Agent directory → /agents/[id] portfolio pages. Walkthrough floor tour is paused for now. */
export default function AgentsIndexPage() {
  const profiles = getAllAgentProfiles();

  // Previous: redirect("/walkthrough");
  return (
    <div id="top" className="bg-white">
      <Header />
      <main>
        <section className="border-b border-slate-100 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <p className="text-[11px] font-bold tracking-[0.2em] text-brand-green uppercase">Our AI Office</p>
            <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[#0b1b4d] sm:text-4xl">
              Meet the Team
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Open any office to see their portfolio, skills, and ask a quick question.
            </p>
            <ul className="mt-10 grid grid-cols-1 gap-5 min-[420px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {profiles.map((p) => (
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
            <p className="mt-10 text-sm text-slate-500">
              <Link href="/#team" className="font-semibold text-brand hover:underline">
                ← Back to the home stage
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
