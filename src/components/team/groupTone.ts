import type { Group } from "@/lib/site";

/** Accent per agent group, tuned for both the dark stage and the light roster. */
export const groupTone: Record<Group, { dot: string; text: string; glow: string }> = {
  "Leadership & Executive Operations": {
    dot: "bg-brand-green",
    text: "text-brand-green",
    glow: "rgba(0,255,38,0.35)",
  },
  "Growth & Client Success": {
    dot: "bg-[#4d57ff]",
    text: "text-[#8f95ff]",
    glow: "rgba(1,13,255,0.55)",
  },
  "Creative & Content": {
    dot: "bg-[#8b5cf6]",
    text: "text-[#c4b5fd]",
    glow: "rgba(139,92,246,0.5)",
  },
  "Engineering & Automation": {
    dot: "bg-[#22d3ee]",
    text: "text-[#67e8f9]",
    glow: "rgba(34,211,238,0.4)",
  },
};
