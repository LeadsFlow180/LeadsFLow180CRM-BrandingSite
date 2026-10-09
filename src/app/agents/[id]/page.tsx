import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AgentPortfolioPage } from "@/components/agents/AgentPortfolioPage";
import { AgentTeamCta } from "@/components/agents/AgentTeamCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Pricing } from "@/components/pricing/Pricing";
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
    title: profile.pageTitle ?? `${profile.agent.name} — ${profile.agent.title} · LeadsFlow180`,
    description: profile.metaDescription ?? profile.intro ?? profile.bio,
  };
}

export default async function AgentPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { verify } = await searchParams;
  const profile = getAgentProfile(id);
  if (!profile) notFound();

  // Reason: FAQPage JSON-LD only mirrors Q&A already visible on the page (SEO pack note).
  const faqJsonLd =
    profile.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: profile.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.a,
            },
          })),
        }
      : null;

  const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.agent.name,
    jobTitle: profile.agent.title,
    description: profile.metaDescription ?? profile.intro ?? profile.bio,
    worksFor: {
      "@type": "Organization",
      name: "LeadsFlow180",
    },
    knowsAbout: profile.skills ?? [],
  };

  return (
    <div id="top" className="bg-white">
      <Header />
      <main>
        {faqJsonLd ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
        />
        <AgentPortfolioPage profile={profile} initialVerifyToken={verify ?? null} />
        <AgentTeamCta agentName={profile.agent.name} />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
