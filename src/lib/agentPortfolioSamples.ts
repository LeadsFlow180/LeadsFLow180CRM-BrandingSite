import { getAgentProfile, type AgentWorkSampleKind } from "@/lib/agentProfiles";
import { agents } from "@/lib/site";

export type PortfolioSample = {
  slug: string;
  agentId: string;
  agentName: string;
  agentTitle: string;
  title: string;
  detail: string;
  kind: AgentWorkSampleKind;
  cover?: string;
  pdf?: string;
  audio?: string;
  viewerHref: string;
};

function slugFromHrefOrAsset(href?: string, image?: string, audio?: string, pdf?: string) {
  const path = href || pdf || audio || image || "";
  const base = path.split("/").pop() || "";
  return base.replace(/\.(pdf|jpg|jpeg|png|webp|mp3|wav|m4a|ogg)$/i, "");
}

/** Sample work items that open in the in-app viewer (image, PDF, or audio). */
export function getAgentPortfolioSamples(agentId: string): PortfolioSample[] {
  const profile = getAgentProfile(agentId);
  if (!profile) return [];
  return profile.work
    .map((w) => {
      const kind: AgentWorkSampleKind =
        w.kind || (w.audio ? "audio" : w.pdf || w.href?.endsWith(".pdf") ? "pdf" : w.image ? "image" : "image");
      const hasViewer = Boolean(w.href?.includes("/samples/") || w.image || w.pdf || w.audio);
      if (!hasViewer) return null;
      // Skip text-only SEO placeholders with no media.
      if (!w.image && !w.pdf && !w.audio && !w.href?.includes("/samples/")) return null;

      const slug = slugFromHrefOrAsset(w.href, w.image, w.audio, w.pdf);
      if (!slug) return null;

      const pdf =
        w.pdf ||
        (kind === "pdf" && w.image ? w.image.replace(/\.(jpg|jpeg|png|webp)$/i, ".pdf") : undefined) ||
        (w.href?.toLowerCase().endsWith(".pdf") ? w.href : undefined);

      return {
        slug,
        agentId: profile.id,
        agentName: profile.agent.name,
        agentTitle: profile.agent.title,
        title: w.title,
        detail: w.detail.replace(/\s*\(Sample concept\.\)\s*$/i, "").trim(),
        kind,
        cover: w.image,
        pdf: kind === "pdf" ? pdf : undefined,
        audio: w.audio,
        viewerHref: w.href?.includes("/samples/") ? w.href : `/agents/${profile.id}/samples/${slug}`,
      } satisfies PortfolioSample;
    })
    .filter((s): s is PortfolioSample => Boolean(s));
}

export function getPortfolioSample(agentId: string, slug: string): PortfolioSample | null {
  return getAgentPortfolioSamples(agentId).find((s) => s.slug === slug) ?? null;
}

export function getAllPortfolioSampleParams() {
  return agents.flatMap((a) =>
    getAgentPortfolioSamples(a.id).map((s) => ({ id: a.id, slug: s.slug })),
  );
}
