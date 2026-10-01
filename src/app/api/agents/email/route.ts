import { NextResponse } from "next/server";
import { agents } from "@/lib/site";
import { createVerifyToken, isValidEmail } from "@/lib/talkSession";

export const runtime = "nodejs";

function siteUrl(request: Request): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (env) return env;
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") ?? "http";
  return host ? `${proto}://${host}` : "http://localhost:3000";
}

async function sendVerifyEmail(to: string, verifyUrl: string, agentName: string): Promise<boolean> {
  const key = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  if (!key || !from) return false;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Verify your email to talk with ${agentName}`,
      html: `<p>Confirm your email to unlock a short chat with <strong>${agentName}</strong> on the LeadsFlow180 floor.</p><p><a href="${verifyUrl}">Verify email & talk</a></p><p>This link expires in 24 hours.</p>`,
    }),
  });
  return res.ok;
}

/** Start email verification for agent talk (builds the list + unlocks chat). */
export async function POST(request: Request) {
  let body: { email?: string; agentId?: string };
  try {
    body = (await request.json()) as { email?: string; agentId?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase() ?? "";
  const agentId = body.agentId?.trim() ?? "";
  const agent = agents.find((a) => a.id === agentId);

  if (!agent || !isValidEmail(email)) {
    return NextResponse.json({ error: "Enter a valid email to continue." }, { status: 400 });
  }

  const token = createVerifyToken(email, agentId);
  const origin = siteUrl(request);
  const verifyUrl = `${origin}/agents/${agentId}?verify=${encodeURIComponent(token)}`;

  let emailed = false;
  try {
    emailed = await sendVerifyEmail(email, verifyUrl, agent.name);
  } catch (err) {
    console.error("verify email send failed:", err);
  }

  // Reason: without Resend, return the link so local/dev can still complete verification.
  return NextResponse.json({
    ok: true,
    emailed,
    ...(emailed ? {} : { verifyUrl }),
    message: emailed
      ? `Check ${email} for a verification link.`
      : "Email delivery is not configured — use the verify link to continue.",
  });
}
