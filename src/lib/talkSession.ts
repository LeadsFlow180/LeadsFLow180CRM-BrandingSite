import { createHmac, timingSafeEqual } from "crypto";
import { CHAT_DURATION_SEC } from "@/lib/talkConstants";

export { CHAT_DURATION_SEC };
export const VERIFY_TTL_SEC = 60 * 60 * 24;
export const SESSION_COOKIE = "lf180_talk";

function secret(): string {
  return (
    process.env.AGENT_TALK_SECRET?.trim() ||
    process.env.STRIPE_SECRET_KEY?.trim() ||
    "dev-only-agent-talk-secret"
  );
}

function b64url(input: Buffer | string): string {
  const buf = typeof input === "string" ? Buffer.from(input, "utf8") : input;
  return buf.toString("base64url");
}

function fromB64url(input: string): Buffer {
  return Buffer.from(input, "base64url");
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

function pack<T extends object>(data: T): string {
  const body = b64url(JSON.stringify(data));
  return `${body}.${sign(body)}`;
}

function unpack<T extends object>(token: string): T | null {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = sign(body);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    return JSON.parse(fromB64url(body).toString("utf8")) as T;
  } catch {
    return null;
  }
}

export type VerifyPayload = {
  email: string;
  agentId: string;
  exp: number;
};

export type TalkSession = {
  email: string;
  agentId: string;
  /** Unix ms when the timed chat window started (set on first chat unlock). */
  startedAt: number;
  exp: number;
};

export function createVerifyToken(email: string, agentId: string): string {
  const payload: VerifyPayload = {
    email: email.trim().toLowerCase(),
    agentId,
    exp: Math.floor(Date.now() / 1000) + VERIFY_TTL_SEC,
  };
  return pack(payload);
}

export function readVerifyToken(token: string): VerifyPayload | null {
  const data = unpack<VerifyPayload>(token);
  if (!data?.email || !data.agentId || !data.exp) return null;
  if (data.exp * 1000 < Date.now()) return null;
  return data;
}

export function createTalkSession(email: string, agentId: string, startedAt = Date.now()): string {
  const session: TalkSession = {
    email: email.trim().toLowerCase(),
    agentId,
    startedAt,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 12,
  };
  return pack(session);
}

export function readTalkSession(token: string | undefined): TalkSession | null {
  if (!token) return null;
  const data = unpack<TalkSession>(token);
  if (!data?.email || !data.startedAt || !data.exp) return null;
  if (data.exp * 1000 < Date.now()) return null;
  return data;
}

export function remainingChatSeconds(session: TalkSession): number {
  const elapsed = (Date.now() - session.startedAt) / 1000;
  return Math.max(0, Math.floor(CHAT_DURATION_SEC - elapsed));
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
