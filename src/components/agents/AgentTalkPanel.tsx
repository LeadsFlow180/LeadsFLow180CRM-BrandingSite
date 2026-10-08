"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { links } from "@/lib/site";
import { CHAT_DURATION_SEC } from "@/lib/talkConstants";

type Msg = { role: "user" | "assistant"; content: string };

type Props = {
  agentId: string;
  agentName: string;
  /** Magic-link token from ?verify= when landing from email. */
  initialVerifyToken?: string | null;
};

/** Email gate → verified timed chat → signup nudge. */
export function AgentTalkPanel({ agentId, agentName, initialVerifyToken }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"gate" | "pending" | "chat" | "ended">("gate");
  const [info, setInfo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [verifyUrl, setVerifyUrl] = useState<string | null>(null);
  const [remaining, setRemaining] = useState(CHAT_DURATION_SEC);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const verifying = useRef(false);

  const refreshSession = useCallback(async () => {
    const res = await fetch("/api/agents/chat");
    const data = (await res.json()) as {
      verified?: boolean;
      remainingSec?: number;
      agentId?: string;
    };
    if (data.verified && (data.remainingSec ?? 0) > 0) {
      setStatus("chat");
      setRemaining(data.remainingSec ?? 0);
      return true;
    }
    if (data.verified && (data.remainingSec ?? 0) <= 0) {
      setStatus("ended");
      setRemaining(0);
      return true;
    }
    return false;
  }, []);

  useEffect(() => {
    void refreshSession();
  }, [refreshSession]);

  useEffect(() => {
    const token = initialVerifyToken?.trim();
    if (!token || verifying.current) return;
    verifying.current = true;
    (async () => {
      setBusy(true);
      setError(null);
      try {
        const res = await fetch("/api/agents/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = (await res.json()) as { error?: string; remainingSec?: number };
        if (!res.ok) throw new Error(data.error || "Verification failed.");
        setStatus("chat");
        setRemaining(data.remainingSec ?? CHAT_DURATION_SEC);
        setInfo("Email verified — your talk window is open.");
        // Reason: drop token from the URL so refresh does not re-POST verify.
        const url = new URL(window.location.href);
        url.searchParams.delete("verify");
        window.history.replaceState({}, "", url.pathname + url.search);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Verification failed.");
      } finally {
        setBusy(false);
      }
    })();
  }, [initialVerifyToken]);

  useEffect(() => {
    if (status !== "chat") return;
    const id = window.setInterval(() => {
      setRemaining((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [status]);

  useEffect(() => {
    if (status === "chat" && remaining <= 0) setStatus("ended");
  }, [status, remaining]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  const requestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setInfo(null);
    setVerifyUrl(null);
    try {
      const res = await fetch("/api/agents/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, agentId }),
      });
      const data = (await res.json()) as {
        error?: string;
        message?: string;
        emailed?: boolean;
        verifyUrl?: string;
      };
      if (!res.ok) throw new Error(data.error || "Could not start verification.");
      setStatus("pending");
      setInfo(data.message ?? "Check your email.");
      if (data.verifyUrl) setVerifyUrl(data.verifyUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start verification.");
    } finally {
      setBusy(false);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = draft.trim();
    if (!content || busy || status !== "chat") return;
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setDraft("");
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/agents/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId, messages: next }),
      });
      const data = (await res.json()) as {
        error?: string;
        reply?: string;
        remainingSec?: number;
        signupUrl?: string;
      };
      if (res.status === 403) {
        setStatus("ended");
        setRemaining(0);
        setError(data.error ?? "Talk window ended.");
        return;
      }
      if (!res.ok) throw new Error(data.error || "Chat failed.");
      setMessages([...next, { role: "assistant", content: data.reply || "…" }]);
      if (typeof data.remainingSec === "number") setRemaining(data.remainingSec);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Chat failed.");
    } finally {
      setBusy(false);
    }
  };

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  return (
    <section id="talk" className="scroll-mt-24 border-t border-slate-200/90 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16">
        <p className="text-[11px] font-bold tracking-[0.22em] text-brand uppercase">Check in with {agentName}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
          Talk for {CHAT_DURATION_SEC / 60} minutes
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600">
          Verify a real email to unlock a short window with {agentName}. Afterward, continue in AI Office.
        </p>

        {status === "gate" && (
          <form onSubmit={requestEmail} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-stretch">
            <label className="sr-only" htmlFor="talk-email">
              Email
            </label>
            <input
              id="talk-email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="min-w-0 flex-1 rounded-full border border-slate-200 bg-canvas px-5 py-3.5 text-sm text-slate-900 outline-none focus:border-brand/40 focus:ring-2 focus:ring-brand/20"
            />
            <button
              type="submit"
              disabled={busy}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#3a44ff] to-brand px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_32px_-14px_rgba(1,13,255,0.85)] disabled:opacity-70"
            >
              {busy ? "Sending…" : "Verify"}
            </button>
          </form>
        )}

        {status === "pending" && (
          <div className="mt-8 space-y-3 border-l-2 border-brand/30 pl-4 text-sm text-slate-700">
            {info && <p>{info}</p>}
            {verifyUrl && (
              <p>
                Dev verify link:{" "}
                <a href={verifyUrl} className="font-semibold text-brand underline-offset-2 hover:underline">
                  open chat
                </a>
              </p>
            )}
          </div>
        )}

        {(status === "chat" || status === "ended") && (
          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between gap-3 text-xs font-bold tracking-[0.14em] text-slate-500 uppercase">
              <span>{status === "ended" ? "Window closed" : "Talk window"}</span>
              <span className={`tabular-nums ${remaining <= 30 ? "text-brand" : "text-slate-800"}`}>
                {mm}:{ss}
              </span>
            </div>

            <div className="max-h-72 space-y-3 overflow-y-auto rounded-2xl bg-canvas p-4 ring-1 ring-slate-200/80">
              {messages.length === 0 && status === "chat" && (
                <p className="text-sm text-slate-500">Say hello — {agentName} is listening.</p>
              )}
              {messages.map((m, i) => (
                <div
                  key={`${m.role}-${i}`}
                  className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "ml-auto bg-brand text-white"
                      : "bg-white text-slate-800 ring-1 ring-slate-200/80"
                  }`}
                >
                  {m.content}
                </div>
              ))}
              <div ref={endRef} />
            </div>

            {status === "chat" ? (
              <form onSubmit={sendMessage} className="mt-3 flex flex-col gap-2 sm:flex-row">
                <input
                  type="text"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={`Message ${agentName}…`}
                  className="min-w-0 flex-1 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand/40 focus:ring-2 focus:ring-brand/20"
                  disabled={busy}
                />
                <button
                  type="submit"
                  disabled={busy || !draft.trim()}
                  className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
                >
                  {busy ? "…" : "Send"}
                </button>
              </form>
            ) : (
              <div className="mt-5 border-l-2 border-brand-green/60 pl-4">
                <p className="text-sm text-slate-700">
                  I&apos;d love to work with you more. Create your AI Office account and pick up with {agentName} on the
                  floor.
                </p>
                <a
                  href={links.signup}
                  className="mt-4 inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white"
                >
                  Create AI Office account
                </a>
              </div>
            )}
          </div>
        )}

        {error && (
          <p role="alert" className="mt-4 text-sm text-slate-600">
            {error}
          </p>
        )}
        {info && status === "chat" && <p className="mt-3 text-sm text-emerald-700">{info}</p>}
      </div>
    </section>
  );
}
