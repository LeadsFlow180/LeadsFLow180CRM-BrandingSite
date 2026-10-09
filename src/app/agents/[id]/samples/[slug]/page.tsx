import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AgentSampleViewer } from "@/components/agents/AgentSampleViewer";
import { Header } from "@/components/Header";
import {
  getAllPortfolioSampleParams,
  getAgentPortfolioSamples,
  getPortfolioSample,
} from "@/lib/agentPortfolioSamples";
import { getAgentProfile } from "@/lib/agentProfiles";

type Props = {
  params: Promise<{ id: string; slug: string }>;
};

export function generateStaticParams() {
  return getAllPortfolioSampleParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, slug } = await params;
  const sample = getPortfolioSample(id, slug);
  if (!sample) return { title: "Sample · LeadsFlow180" };
  return {
    title: `${sample.title} · ${sample.agentName} · LeadsFlow180`,
    description: sample.detail,
  };
}

/** Same-tab majestic viewer for agent portfolio sample PDFs. */
export default async function AgentSamplePage({ params }: Props) {
  const { id, slug } = await params;
  if (!getAgentProfile(id)) notFound();
  const sample = getPortfolioSample(id, slug);
  if (!sample) notFound();
  const siblings = getAgentPortfolioSamples(id);

  return (
    <div id="top">
      <Header />
      <AgentSampleViewer sample={sample} siblings={siblings} />
    </div>
  );
}
