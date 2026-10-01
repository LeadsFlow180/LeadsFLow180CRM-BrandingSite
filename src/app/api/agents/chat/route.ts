import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAgentProfile } from "@/lib/agentProfiles";
import { links } from "@/lib/site";
import {
  CHAT_DURATION_SEC,
  SESSION_COOKIE,
  remainingChatSeconds,
  readTalkSession,
} from "@/lib/talkSession";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

/** Timed agent Q&A (requires verified talk cookie). */
export async function POST(request: Request) {
  const jar = await cookies();
  const session = readTalkSession(jar.get(SESSION_COOKIE)?.value);
  if (!session) {
    return NextResponse.json({ error: "Verify your email to talk with this agent." }, { status: 401 });
  }

  const left = remainingChatSeconds(session);
  if (left <= 0) {
    return NextResponse.json(
      {
        error: "Your talk window has ended.",
        remainingSec: 0,
        signupUrl: links.signup,
      },
      { status: 403 },
    );
  }

  let body: { agentId?: string; messages?: ChatMessage[] };
  try {
    body = (await request.json()) as { agentId?: string; messages?: ChatMessage[] };
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const agentId = body.agentId?.trim() ?? session.agentId;
  const profile = getAgentProfile(agentId);
  if (!profile) {
    return NextResponse.json({ error: "Agent not found." }, { status: 404 });
  }

  const messages = (body.messages ?? [])
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-12);

  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser?.content.trim()) {
    return NextResponse.json({ error: "Say something to continue." }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY?.trim();
  const model = process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";

  const system = [
    `You are ${profile.agent.name}, ${profile.agent.title} on the LeadsFlow180 AI Office floor.`,
    profile.bio,
    `Personality: ${profile.personality.join("; ")}. Favorite food: ${profile.favoriteFood}.`,
    "Keep answers short (2–4 sentences). Be warm and immersive. You are AI — do not pretend to be human.",
    "Near the end of short answers, gently invite them to create an AI Office account to work with you more.",
    `Signup URL: ${links.signup}`,
    `Do not invent pricing tiers, free trials, or credit-card claims. Launch Founders is the public offer on the marketing site.`,
    `The visitor has about ${left} seconds left in this talk window.`,
  ].join("\n");

  if (!apiKey) {
    // Reason: keep the UX testable without a model key; still enforce the timer.
    const reply = `Hey — I'm ${profile.agent.name}. ${profile.tagline} Ask me about ${profile.agent.skill.toLowerCase()} I've got roughly ${left} seconds with you here. When you're ready to go deeper, create your AI Office account and I'll meet you on the floor: ${links.signup}`;
    return NextResponse.json({
      reply,
      remainingSec: left,
      mock: true,
    });
  }

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.7,
        max_tokens: 220,
        messages: [{ role: "system", content: system }, ...messages],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("openai chat failed:", res.status, errText.slice(0, 300));
      return NextResponse.json({ error: "Chat is temporarily unavailable." }, { status: 502 });
    }

    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const reply = data.choices?.[0]?.message?.content?.trim() || "I'm here — ask me another question.";

    return NextResponse.json({
      reply,
      remainingSec: remainingChatSeconds(session),
      durationSec: CHAT_DURATION_SEC,
    });
  } catch (err) {
    console.error("agent chat failed:", err);
    return NextResponse.json({ error: "Chat is temporarily unavailable." }, { status: 500 });
  }
}

/** Session status for the talk panel. */
export async function GET() {
  const jar = await cookies();
  const session = readTalkSession(jar.get(SESSION_COOKIE)?.value);
  if (!session) {
    return NextResponse.json({ verified: false, remainingSec: 0 });
  }
  return NextResponse.json({
    verified: true,
    email: session.email,
    agentId: session.agentId,
    remainingSec: remainingChatSeconds(session),
    durationSec: CHAT_DURATION_SEC,
  });
}
