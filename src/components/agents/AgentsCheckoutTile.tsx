import Link from "next/link";
import { formatMoney, pricingPlan } from "@/lib/pricing";
import { links } from "@/lib/site";

/**
 * Fills leftover grid cells beside Dante — height matches profile cards (row stretch),
 * width spans the open white space.
 */
export function AgentsCheckoutTile() {
  return (
    <div className="flex h-full min-h-[12rem] flex-col overflow-hidden rounded-[22px] bg-gradient-to-br from-[#0b1020] via-[#1a0a3e] to-[#36088a] p-4 shadow-[0_20px_44px_-28px_rgba(1,13,255,0.55)] ring-1 ring-white/15 sm:p-5">
      <p className="text-[10px] font-semibold tracking-[0.18em] text-brand-green uppercase">
        {pricingPlan.offerLabel}
      </p>
      <p className="mt-1.5 text-base font-semibold tracking-[-0.02em] text-white sm:text-lg">
        Meet the team. Open your desk.
      </p>
      <p className="mt-1.5 line-clamp-2 flex-1 text-[13px] leading-relaxed text-white/60">
        Founders rate {formatMoney(pricingPlan.priceMonthly)}/mo — full FLOW team and workspace.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <a
          href="/#pricing"
          className="inline-flex min-h-9 flex-1 items-center justify-center rounded-full bg-white px-3 text-[12px] font-semibold text-brand transition hover:bg-[#eef0ff] sm:flex-none sm:px-4"
        >
          {pricingPlan.cta} →
        </a>
        <a
          href={links.signup}
          className="inline-flex min-h-9 flex-1 items-center justify-center rounded-full border border-white/35 px-3 text-[12px] font-semibold text-white transition hover:bg-white/10 sm:flex-none sm:px-4"
        >
          Create account
        </a>
      </div>
    </div>
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
