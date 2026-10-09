import { getAgentProfile } from "@/lib/agentProfiles";
import { agents } from "@/lib/site";

export type PortfolioSample = {
  slug: string;
  agentId: string;
  agentName: string;
  agentTitle: string;
  title: string;
  detail: string;
  cover: string;
  pdf: string;
  viewerHref: string;
};

function slugFromPath(path: string) {
  const base = path.split("/").pop() || "";
  return base.replace(/\.(pdf|jpg|jpeg|png|webp)$/i, "");
}

function pdfFromWork(image?: string, href?: string) {
  if (href?.toLowerCase().endsWith(".pdf")) return href;
  if (image) return image.replace(/\.(jpg|jpeg|png|webp)$/i, ".pdf");
  return undefined;
}

/** Sample work items that have a cover + PDF for the in-app viewer. */
export function getAgentPortfolioSamples(agentId: string): PortfolioSample[] {
  const profile = getAgentProfile(agentId);
  if (!profile) return [];
  return profile.work
    .map((w) => {
      const pdf = pdfFromWork(w.image, w.href);
      const cover = w.image;
      if (!pdf || !cover) return null;
      const slug = slugFromPath(cover);
      return {
        slug,
        agentId: profile.id,
        agentName: profile.agent.name,
        agentTitle: profile.agent.title,
        title: w.title,
        detail: w.detail.replace(/\s*\(Sample concept\.\)\s*$/i, "").trim(),
        cover,
        pdf,
        viewerHref: `/agents/${profile.id}/samples/${slug}`,
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
