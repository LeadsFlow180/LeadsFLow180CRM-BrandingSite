"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { links } from "@/lib/site";
import { CHAT_DURATION_SEC } from "@/lib/talkConstants";

type Msg = { role: "user" | "assistant"; content: string };

type Props = {
  open: boolean;
  onClose: () => void;
  agentId: string;
  agentName: string;
  portraitPhoto: string;
  initialVerifyToken?: string | null;
};

/** Screenshot-style ask modal → email verify → short timed chat. */
export function AgentAskModal({
  open,
  onClose,
  agentId,
  agentName,
  portraitPhoto,
  initialVerifyToken,
}: Props) {
  const titleId = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"form" | "pending" | "chat" | "ended">("form");
  const [info, setInfo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [verifyUrl, setVerifyUrl] = useState<string | null>(null);
  const [remaining, setRemaining] = useState(CHAT_DURATION_SEC);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const verifying = useRef(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const refreshSession = useCallback(async (signal?: AbortSignal) => {
    const res = await fetch("/api/agents/chat", { signal });
    const data = (await res.json()) as { verified?: boolean; remainingSec?: number };
    if (signal?.aborted) return;
    if (data.verified && (data.remainingSec ?? 0) > 0) {
      setStatus("chat");
      setRemaining(data.remainingSec ?? 0);
      return;
    }
    if (data.verified && (data.remainingSec ?? 0) <= 0) {
      setStatus("ended");
      setRemaining(0);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const ac = new AbortController();
    void refreshSession(ac.signal).catch(() => {
      /* aborted or network — ignore */
    });
    return () => ac.abort();
  }, [open, refreshSession]);

  useEffect(() => {
    const token = initialVerifyToken?.trim();
    if (!open || !token || verifying.current) return;
    verifying.current = true;
    const ac = new AbortController();
    (async () => {
      setBusy(true);
      try {
        const res = await fetch("/api/agents/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
          signal: ac.signal,
        });
        const data = (await res.json()) as { error?: string; remainingSec?: number };
        if (ac.signal.aborted) return;
        if (!res.ok) throw new Error(data.error || "Verification failed.");
        setStatus("chat");
        setRemaining(data.remainingSec ?? CHAT_DURATION_SEC);
        setInfo("Email verified — your talk window is open.");
        const url = new URL(window.location.href);
        url.searchParams.delete("verify");
        window.history.replaceState({}, "", url.pathname + url.search);
      } catch (err) {
        if (ac.signal.aborted) return;
        setError(err instanceof Error ? err.message : "Verification failed.");
      } finally {
        if (!ac.signal.aborted) setBusy(false);
      }
    })();
    return () => ac.abort();
  }, [open, initialVerifyToken]);

  useEffect(() => {
    if (status !== "chat") return;
    const id = window.setInterval(() => {
      setRemaining((s) => {
        if (s <= 1) return 0;
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [status]);

  useEffect(() => {
    if (status === "chat" && remaining <= 0) setStatus("ended");
  }, [status, remaining]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  if (!open) return null;

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  const startTalk = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setInfo(null);
    setVerifyUrl(null);
    try {
      const res = await fetch("/api/agents/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, agentId, name }),
      });
      const data = (await res.json()) as {
        error?: string;
        message?: string;
        verifyUrl?: string;
      };
      if (!res.ok) throw new Error(data.error || "Could not start verification.");
      setStatus("pending");
      setInfo(data.message ?? "Check your email to unlock the chat.");
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
      const data = (await res.json()) as { error?: string; reply?: string; remainingSec?: number };
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

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" role="presentation">
      <button type="button" className="absolute inset-0 bg-slate-950/55 backdrop-blur-[2px]" aria-label="Close dialog" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-[81] w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-[0_40px_100px_-24px_rgba(1,13,255,0.45)] ring-1 ring-slate-200"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 grid size-9 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100"
          aria-label="Close"
        >
          ×
        </button>

        <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 pr-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={portraitPhoto} alt="" className="size-11 rounded-full object-cover object-top ring-2 ring-brand/20" />
          <div className="min-w-0">
            <h2 id={titleId} className="text-base font-semibold tracking-[-0.02em] text-slate-950 sm:text-lg">
              Ask {agentName} a Question About Your Business
            </h2>
          </div>
        </div>

        <div className="px-5 py-5 sm:px-6">
          {status === "form" && (
            <>
              <p className="text-sm leading-relaxed text-slate-600">
                Get personalized advice from {agentName}. Enjoy a free {CHAT_DURATION_SEC / 60}-minute chat after you
                verify your email.
              </p>
              <form onSubmit={startTalk} className="mt-5 space-y-3">
                <label className="block">
                  <span className="sr-only">Name</span>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="What's your name?"
                    className="w-full rounded-xl border border-slate-200 bg-canvas px-4 py-3 text-sm outline-none focus:border-brand/40 focus:ring-2 focus:ring-brand/15"
                  />
                </label>
                <label className="block">
                  <span className="sr-only">Email</span>
                  <input
                    required
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="What's your email?"
                    className="w-full rounded-xl border border-slate-200 bg-canvas px-4 py-3 text-sm outline-none focus:border-brand/40 focus:ring-2 focus:ring-brand/15"
                  />
                </label>
                <button
                  type="submit"
                  disabled={busy}
                  className="w-full rounded-xl bg-gradient-to-b from-[#3a44ff] to-brand py-3.5 text-sm font-semibold text-white shadow-[0_14px_32px_-14px_rgba(1,13,255,0.85)] disabled:opacity-70"
                >
                  {busy ? "Starting…" : `Start Talking with ${agentName}`}
                </button>
              </form>
              <ol className="mt-5 flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
                <li>1. Enter your info</li>
                <li aria-hidden="true">→</li>
                <li>2. Chat with {agentName}</li>
                <li aria-hidden="true">→</li>
                <li>3. Get next steps</li>
              </ol>
              <p className="mt-4 rounded-xl bg-[#eef2ff] px-3 py-2.5 text-xs leading-relaxed text-slate-600">
                Your information is secure. Email verification is required before the talk window opens.
              </p>
            </>
          )}

          {status === "pending" && (
            <div className="space-y-3 text-sm text-slate-700">
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
            <div>
              <div className="mb-3 flex justify-between text-xs font-bold tracking-[0.14em] text-slate-500 uppercase">
                <span>{status === "ended" ? "Window closed" : "Talk window"}</span>
                <span className="tabular-nums text-slate-800">
                  {mm}:{ss}
                </span>
              </div>
              <div className="max-h-56 space-y-2 overflow-y-auto rounded-xl bg-canvas p-3 ring-1 ring-slate-200/80">
                {messages.length === 0 && status === "chat" && (
                  <p className="text-sm text-slate-500">Say hello — {agentName} is listening.</p>
                )}
                {messages.map((m, i) => (
                  <div
                    key={`${m.role}-${i}`}
                    className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm ${
                      m.role === "user" ? "ml-auto bg-brand text-white" : "bg-white text-slate-800 ring-1 ring-slate-200"
                    }`}
                  >
                    {m.content}
                  </div>
                ))}
                <div ref={endRef} />
              </div>
              {status === "chat" ? (
                <form onSubmit={sendMessage} className="mt-3 flex gap-2">
                  <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder={`Message ${agentName}…`}
                    className="min-w-0 flex-1 rounded-full border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-brand/40"
                    disabled={busy}
                  />
                  <button type="submit" disabled={busy || !draft.trim()} className="rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
                    Send
                  </button>
                </form>
              ) : (
                <a href={links.signup} className="mt-4 inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white">
                  Continue in AI Office
                </a>
              )}
            </div>
          )}

          {error && (
            <p role="alert" className="mt-3 text-sm text-slate-600">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
