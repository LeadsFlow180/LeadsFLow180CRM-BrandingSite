import { agents } from "@/lib/site";

export type NeedHelpSlot = {
  id: string;
  need: string;
  agentId: string;
  talkLabel: string;
  photo: string;
  agentName: string;
  title: string;
};

/**
 * Hero picker grid — top row Jordan / Ava / Jay, bottom Lee / Shelly / Caleb.
 * Titles come from `agents` in site.ts.
 */
const SLOT_DEFS = [
  { id: "sales", need: "Grow my sales", agentId: "jordan" },
  { id: "media", need: "Podcast & media", agentId: "ava" },
  { id: "email", need: "Improve my email marketing", agentId: "jay" },
  { id: "ads", need: "Scale my paid ads", agentId: "lee" },
  { id: "marketing", need: "Improve my marketing", agentId: "shelly" },
  { id: "seo", need: "Get found online", agentId: "caleb" },
] as const;

function firstName(full: string) {
  return full.split(" ")[0] ?? full;
}

export const needHelpSlots: NeedHelpSlot[] = SLOT_DEFS.map((slot) => {
  const agent = agents.find((a) => a.id === slot.agentId);
  if (!agent) {
    throw new Error(`Need-help slot missing agent: ${slot.agentId}`);
  }
  const short = firstName(agent.name);
  return {
    id: slot.id,
    need: slot.need,
    agentId: agent.id,
    talkLabel: `Talk to ${short}`,
    photo: agent.photo,
    agentName: short,
    title: agent.title,
  };
});
