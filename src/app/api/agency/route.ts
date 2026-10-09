import { mkdir, appendFile } from "fs/promises";
import path from "path";
import { after, NextResponse } from "next/server";

type Body = {
  name?: string;
  email?: string;
  company?: string;
  website?: string;
  interest?: string;
  message?: string;
};

const DATA_DIR = path.join(process.cwd(), ".data");
const FILE = path.join(DATA_DIR, "agency-inquiries.jsonl");

/** LeadsFlow180 CRM workflow inbound webhook (Agency inquiry form). */
const DEFAULT_AGENCY_WEBHOOK =
  "https://leadsflow180crm.vercel.app/api/webhooks/workflow/deb2cd833a3653b60727361745ebcd54";

function agencyWebhookUrl() {
  return (
    process.env.AGENCY_WEBHOOK_URL?.trim() ||
    process.env.LEADS_WEBHOOK_URL?.trim() ||
    DEFAULT_AGENCY_WEBHOOK
  );
}

async function postAgencyWebhook(record: Record<string, unknown>) {
  const webhook = agencyWebhookUrl();
  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      ...record,
      // Common CRM form aliases for workflow mapping
      full_name: record.name,
      work_email: record.email,
      company_name: record.company,
      company_website: record.website,
      inquiry_type: record.interest,
      how_can_we_help: record.message,
    }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`webhook ${res.status}: ${text.slice(0, 400)}`);
  }
  return res.json().catch(() => ({ ok: true }));
}

/** Accept reseller / partner inquiries → CRM workflow webhook (+ optional local log). */
export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const company = String(body.company || "").trim();
  const website = String(body.website || "").trim();
  const interest = String(body.interest || "").trim();
  const message = String(body.message || "").trim();

  if (!name || !email || !company || !interest || !message) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid work email." }, { status: 400 });
  }

  const record = {
    source: "agency-inquiry" as const,
    name,
    email,
    company,
    website,
    interest,
    message,
    at: new Date().toISOString(),
  };

  // Reason: Vercel FS is ephemeral/read-only — local JSONL is best-effort only.
  try {
    await mkdir(DATA_DIR, { recursive: true });
    await appendFile(FILE, `${JSON.stringify(record)}\n`, "utf8");
  } catch (err) {
    console.error("agency inquiry local write skipped:", err);
  }

  // Reason: CRM workflow can take ~60–90s; finish after response so the form stays snappy.
  after(async () => {
    try {
      const result = await postAgencyWebhook(record);
      console.log("agency webhook ok:", result);
    } catch (err) {
      console.error("agency webhook failed:", err);
    }
  });

  return NextResponse.json({ ok: true });
}
