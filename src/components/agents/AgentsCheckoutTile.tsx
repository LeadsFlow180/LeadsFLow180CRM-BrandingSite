import Link from "next/link";
import { formatMoney, pricingPlan } from "@/lib/pricing";
import { links } from "@/lib/site";

/**
 * Fills leftover grid cells beside Dante — ClosingCta shimmer headline +
 * handsome Founders pricing visual on the right.
 */
export function AgentsCheckoutTile() {
  return (
    <div className="relative flex h-full min-h-[12rem] overflow-hidden rounded-[22px] bg-gradient-to-br from-[#04050f] via-[#0b1020] to-[#1a0a3e] shadow-[0_20px_44px_-28px_rgba(1,13,255,0.55)] ring-1 ring-white/15">
      <div className="relative z-[1] flex min-w-0 flex-1 flex-col justify-center p-4 sm:p-5 lg:max-w-[58%] lg:p-6">
        <p className="text-[10px] font-semibold tracking-[0.18em] text-brand-green uppercase">
          {pricingPlan.offerLabel}
        </p>
        <p className="mt-2 text-[clamp(1.15rem,2.4vw,1.65rem)] leading-[1.15] font-semibold tracking-[-0.03em] text-white text-balance">
          Ready to open your <span className="text-shimmer-light">workspace?</span>
        </p>
        <p className="mt-2 text-[13px] font-semibold tracking-[-0.02em] text-white/90 sm:text-sm">
          Meet the team. Open your desk.
        </p>
        <p className="mt-1.5 text-[12px] leading-relaxed text-white/55 sm:text-[13px]">
          Founders rate {formatMoney(pricingPlan.priceMonthly)}/mo — full FLOW team and workspace.
        </p>
        <div className="mt-3.5 flex flex-wrap gap-2">
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

      {/* Reason: Right-side Founders card fills the empty span beside Dante. */}
      <div className="pointer-events-none relative hidden min-h-[11rem] w-[42%] shrink-0 lg:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/pricing/founders-card.jpg"
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover object-[58%_42%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0b1020] to-transparent"
        />
      </div>

      {/* Compact mobile/tablet preview under copy */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[38%] opacity-40 sm:opacity-50 lg:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/pricing/founders-card.jpg"
          alt=""
          loading="lazy"
          decoding="async"
          className="size-full object-cover object-[70%_40%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#04050f] via-[#04050f]/75 to-transparent"
        />
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
