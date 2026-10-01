import { mkdir, appendFile, readFile } from "fs/promises";
import path from "path";

export type LeadRecord = {
  email: string;
  agentId: string;
  verifiedAt: string;
  source: "agent-talk";
};

const DATA_DIR = path.join(process.cwd(), ".data");
const LEADS_FILE = path.join(DATA_DIR, "leads.jsonl");

/** Persist a verified email for the list (local JSONL + optional webhook). */
export async function recordVerifiedLead(lead: LeadRecord): Promise<void> {
  try {
    await mkdir(DATA_DIR, { recursive: true });
    await appendFile(LEADS_FILE, `${JSON.stringify(lead)}\n`, "utf8");
  } catch (err) {
    console.error("lead file write failed:", err);
  }

  const webhook = process.env.LEADS_WEBHOOK_URL?.trim();
  if (!webhook) return;
  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
  } catch (err) {
    console.error("leads webhook failed:", err);
  }
}

export async function countLeads(): Promise<number> {
  try {
    const raw = await readFile(LEADS_FILE, "utf8");
    return raw.split("\n").filter(Boolean).length;
  } catch {
    return 0;
  }
}
