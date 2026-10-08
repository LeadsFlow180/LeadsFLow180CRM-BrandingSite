import { redirect } from "next/navigation";

/** Deep link → hub with seat-cost calculator open below. */
export default function SeatCostSavingsPage() {
  redirect("/savings?calc=seats");
}
