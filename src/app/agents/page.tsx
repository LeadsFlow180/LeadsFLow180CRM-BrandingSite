import { redirect } from "next/navigation";

/** Exact photographic walkthrough lives at /walkthrough (same design as the ChatGPT tour). */
export default function AgentsIndexPage() {
  redirect("/walkthrough");
}
