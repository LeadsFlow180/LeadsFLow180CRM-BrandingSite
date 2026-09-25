import type { Group } from "@/lib/site";

/** Accent per agent group, tuned for both the dark stage and the light roster. */
export const groupTone: Record<Group, { dot: string; text: string; glow: string }> = {
  Chair: { dot: "bg-brand-green", text: "text-brand-green", glow: "rgba(0,255,38,0.35)" },
  Revenue: { dot: "bg-[#4d57ff]", text: "text-[#8f95ff]", glow: "rgba(1,13,255,0.55)" },
  Marketing: { dot: "bg-[#8b5cf6]", text: "text-[#c4b5fd]", glow: "rgba(139,92,246,0.5)" },
  "Creative & web": { dot: "bg-[#22d3ee]", text: "text-[#67e8f9]", glow: "rgba(34,211,238,0.4)" },
  Ops: { dot: "bg-[#e2e8f0]", text: "text-slate-300", glow: "rgba(148,163,184,0.45)" },
};
