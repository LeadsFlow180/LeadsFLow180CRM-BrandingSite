import { redirect } from "next/navigation";

/** Deep link → hub with missed-lead calculator open below. */
export default function MissedLeadsSavingsPage() {
  redirect("/savings?calc=missed");
}
