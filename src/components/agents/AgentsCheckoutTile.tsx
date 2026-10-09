import Link from "next/link";
import { formatMoney, pricingPlan } from "@/lib/pricing";

/** Same footprint as AgentOfficeTile — Founders CTA in the empty slot beside Dante → home Pricing. */
export function AgentsCheckoutTile() {
  return (
    <a
      href="/#pricing"
      className="group block overflow-hidden rounded-[22px] bg-gradient-to-br from-[#0b1020] via-[#1a0a3e] to-[#36088a] shadow-[0_20px_44px_-28px_rgba(1,13,255,0.55)] ring-1 ring-white/15 transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_56px_-28px_rgba(1,13,255,0.55)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden p-3.5 sm:p-4">
        <p className="text-[10px] font-semibold tracking-[0.18em] text-brand-green uppercase">
          {pricingPlan.offerLabel}
        </p>
        <p className="mt-1.5 line-clamp-2 text-sm font-semibold tracking-[-0.02em] text-white sm:text-[15px]">
          {pricingPlan.name}
        </p>
        <p className="mt-3 text-[clamp(1.6rem,4vw,2rem)] leading-none font-bold tracking-tight text-brand-green tabular-nums">
          {formatMoney(pricingPlan.priceMonthly)}
          <span className="ml-1 text-[11px] font-medium text-white/55">/mo</span>
        </p>
        <p className="mt-1 text-[11px] text-white/45 line-through">
          List {formatMoney(pricingPlan.compareAtMonthly)}/mo
        </p>
        <span className="absolute inset-x-3.5 bottom-3.5 inline-flex min-h-9 items-center justify-center rounded-full bg-white px-3 text-[12px] font-semibold text-brand transition group-hover:bg-[#eef0ff] sm:inset-x-4 sm:bottom-4">
          {pricingPlan.cta} →
        </span>
      </div>
    </a>
  );
}

/** Small top-of-page back control used on marketing subpages. */
export function PageBackLink({ href, label }: { href: string; label: string }) {
  return (
    <p className="mb-6 text-sm text-slate-500 sm:mb-8">
      <Link href={href} className="font-semibold text-brand hover:underline">
        ← {label}
      </Link>
    </p>
  );
}
