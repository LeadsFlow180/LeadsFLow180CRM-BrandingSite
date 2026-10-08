import type { Metadata } from "next";
import { MissedLeadCalculator } from "@/components/roi/MissedLeadCalculator";
import { SavingsShell } from "@/components/roi/SavingsShell";

export const metadata: Metadata = {
  title: "Missed-lead calculator · LeadsFlow180",
  description:
    "Estimate what missed calls and slow replies cost you every month — then see profit you could win back.",
};

export default function MissedLeadsSavingsPage() {
  return (
    <SavingsShell>
      <MissedLeadCalculator />
    </SavingsShell>
  );
}
