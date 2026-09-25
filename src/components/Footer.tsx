import type { ReactNode } from "react";
import { languageLine, links } from "@/lib/site";

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li>
      <a href={href} className="group inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white">
        <span
          aria-hidden="true"
          className="h-px w-0 bg-gradient-to-r from-brand to-brand-green transition-all duration-300 group-hover:w-4"
        />
        {children}
      </a>
    </li>
  );
}

function FooterColumn({ label, children }: { label: string; children: ReactNode }) {
  return (
    <nav aria-label={label}>
      <p className="text-[11px] font-semibold tracking-[0.2em] text-white/40 uppercase">{label}</p>
      <ul className="mt-5 space-y-3 text-sm">{children}</ul>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#04050f] text-white">
      <div aria-hidden="true" className="orb -bottom-40 left-1/2 size-[520px] -translate-x-1/2 bg-brand/20" />

      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6">
        <div className="rounded-[22px] bg-white/[0.03] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-white/10 backdrop-blur min-[380px]:rounded-[28px] min-[380px]:p-6 sm:p-10">
          <div className="grid gap-8 min-[380px]:gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/logo.png" alt="LeadsFlow180 — The Zen of Lead Gen" className="h-7 w-auto sm:h-10" />
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
                An agency CRM with a named AI team. AI Office is the who. The CRM is the how.
              </p>
              <a
                href={links.office}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3.5 py-2 text-xs font-semibold text-white/80 ring-1 ring-white/15 transition hover:bg-white/[0.1] hover:text-white"
              >
                <span className="size-1.5 rounded-full bg-brand-green shadow-[0_0_6px_#00ff26]" />
                office.getleadsflow180.com
              </a>
            </div>
            <FooterColumn label="Product">
              <FooterLink href="#team">Team</FooterLink>
              <FooterLink href="#features">The HOW</FooterLink>
              <FooterLink href={links.office}>AI Office</FooterLink>
              <FooterLink href={links.signup}>Create account</FooterLink>
              <FooterLink href={links.login}>Sign in</FooterLink>
            </FooterColumn>
            <FooterColumn label="Legal">
              <FooterLink href="/privacy">Privacy</FooterLink>
              <FooterLink href="/terms">Terms</FooterLink>
            </FooterColumn>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
            <p className="max-w-3xl leading-relaxed">{languageLine}</p>
            <a
              href="#top"
              className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full px-3 py-1.5 text-white/60 ring-1 ring-white/15 transition hover:text-white hover:ring-white/40 md:self-auto"
            >
              Back to top
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5">
                ↑
              </span>
            </a>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="text-outline-strong mt-8 overflow-hidden text-center text-[7vw] leading-none font-semibold tracking-[-0.05em] whitespace-nowrap select-none min-[380px]:mt-10 min-[380px]:text-[8.5vw] xl:text-[7.5rem]"
        >
          The Zen of Lead Gen
        </p>

        <p className="mt-6 text-center text-xs text-white/40">© {new Date().getFullYear()} LeadsFlow180 · The Zen of Lead Gen</p>
      </div>
    </footer>
  );
}
