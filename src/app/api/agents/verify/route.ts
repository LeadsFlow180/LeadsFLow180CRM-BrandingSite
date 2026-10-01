import { NextResponse } from "next/server";
import { recordVerifiedLead } from "@/lib/leads";
import {
  CHAT_DURATION_SEC,
  SESSION_COOKIE,
  createTalkSession,
  readVerifyToken,
} from "@/lib/talkSession";

export const runtime = "nodejs";

/** Consume magic-link token → httpOnly talk session cookie + list record. */
export async function POST(request: Request) {
  let body: { token?: string };
  try {
    body = (await request.json()) as { token?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const payload = readVerifyToken(body.token ?? "");
  if (!payload) {
    return NextResponse.json({ error: "Verification link is invalid or expired." }, { status: 400 });
  }

  await recordVerifiedLead({
    email: payload.email,
    agentId: payload.agentId,
    verifiedAt: new Date().toISOString(),
    source: "agent-talk",
  });

  const session = createTalkSession(payload.email, payload.agentId, Date.now());
  const res = NextResponse.json({
    ok: true,
    email: payload.email,
    agentId: payload.agentId,
    remainingSec: CHAT_DURATION_SEC,
  });

  res.cookies.set(SESSION_COOKIE, session, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return res;
}
