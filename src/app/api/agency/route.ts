import { mkdir, appendFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

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

/** Accept reseller / partner inquiries. */
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

  try {
    await mkdir(DATA_DIR, { recursive: true });
    await appendFile(FILE, `${JSON.stringify(record)}\n`, "utf8");
  } catch (err) {
    console.error("agency inquiry write failed:", err);
    return NextResponse.json({ error: "Could not save inquiry." }, { status: 500 });
  }

  const webhook = process.env.LEADS_WEBHOOK_URL?.trim();
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
    } catch (err) {
      console.error("agency webhook failed:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
