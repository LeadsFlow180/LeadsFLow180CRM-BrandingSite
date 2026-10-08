import type { Metadata } from "next";
import { SeatCostCalculator } from "@/components/roi/SeatCostCalculator";
import { SavingsShell } from "@/components/roi/SavingsShell";

export const metadata: Metadata = {
  title: "Seat cost calculator · LeadsFlow180",
  description:
    "Compare the monthly cost of filling empty seats yourself with what you keep using LeadsFlow180.",
};

export default function SeatCostSavingsPage() {
  return (
    <SavingsShell>
      <SeatCostCalculator />
    </SavingsShell>
  );
}
