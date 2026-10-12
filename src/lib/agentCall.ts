/** Host for embedded voice/call UI (`/call?name={agentId}`). */
export const AI_OFFICE_CALL_HOST =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_AI_OFFICE_URL?.trim()) ||
  "https://ai-office-trial.vercel.app";

/** In-site full page that hosts the call iframe. */
export function agentCallPageHref(agentId: string) {
  return `/call/${agentId.trim().toLowerCase()}`;
}

/** External AI Office call URL embedded in the iframe. */
export function agentCallUrl(agentId: string) {
  const id = agentId.trim().toLowerCase();
  const base = AI_OFFICE_CALL_HOST.replace(/\/$/, "");
  return `${base}/call?name=${encodeURIComponent(id)}`;
}

export function agentFirstName(fullName: string) {
  return fullName.trim().split(/\s+/)[0]?.replace(/['’]$/, "") || fullName;
}
