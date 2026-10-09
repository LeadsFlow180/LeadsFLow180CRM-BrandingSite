"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type PointerEvent, type RefObject } from "react";
import { createPortal } from "react-dom";
import { agents, links } from "@/lib/site";
import { groupTone } from "./team/groupTone";
import { ease } from "./Motion";

const navItems = [
  { id: "team", label: "Team", href: "/#team" },
  { id: "features", label: "Features", href: "/#features" },
  { id: "integrations", label: "Integrations", href: "/integrations" },
  { id: "savings", label: "Savings", href: "/savings" },
  { id: "agency", label: "Agency", href: "/agency" },
  { id: "pricing", label: "Pricing", href: "/#pricing" },
] as const;

type NavId = (typeof navItems)[number]["id"];
type SectionId = "team" | "features" | "pricing";

const sectionIds: SectionId[] = ["team", "features", "pricing"];
const TEAM_CLOSE_MS = 220;

function firstName(full: string) {
  return full.split(" ")[0] ?? full;
}

function useActiveSection() {
  const [active, setActive] = useState<SectionId | null>(null);
  useEffect(() => {
    const seen = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e.isIntersecting));
        const current = sectionIds.find((id) => seen.get(id));
        setActive(current ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

function TiltLogo() {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-16, 16]), { stiffness: 200, damping: 16 });
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 16 });

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <a
      href="/"
      aria-label="LeadsFlow180 home"
      onPointerMove={onMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="group relative shrink-0 [perspective:700px]"
    >
      <motion.span style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative block">
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 scale-110 rounded-full bg-brand-green/0 blur-xl transition duration-500 group-hover:bg-brand-green/20"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/logo-dark.png"
          alt="LeadsFlow180"
          className="h-[15px] w-auto drop-shadow-[0_6px_14px_rgba(0,255,38,0.18)] sm:h-[17px] lg:h-[18px]"
        />
      </motion.span>
    </a>
  );
}

function TeamOfficesPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="rounded-[20px] bg-[#0b1020] shadow-[0_32px_70px_-20px_rgba(0,0,0,0.85)] ring-1 ring-white/15">
      <div aria-hidden="true" className="brand-line h-[2px] w-full rounded-t-[20px]" />
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-3 py-2.5 sm:px-4">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.22em] text-brand-green uppercase">Team offices</p>
          <p className="mt-0.5 text-[11px] text-white/50 sm:text-[12px]">
            Scroll sideways · {agents.length} specialists
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/#team"
            role="menuitem"
            onClick={onClose}
            className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] font-semibold text-white ring-1 ring-white/12"
          >
            Meet the team
          </Link>
          <Link
            href="/agents"
            role="menuitem"
            onClick={onClose}
            className="rounded-full px-2.5 py-1 text-[11px] font-semibold text-brand-green"
          >
            Directory →
          </Link>
        </div>
      </div>

      <div className="relative">
        {/* Reason: keep edge fades thinner/shorter than padding so Mia (first card) isn’t clipped. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-3 bg-gradient-to-r from-[#0b1020] to-transparent sm:w-4"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-3 bg-gradient-to-l from-[#0b1020] to-transparent sm:w-4"
        />
        <ul className="scrollbar-none flex snap-x snap-mandatory gap-2.5 overflow-x-auto overscroll-x-contain scroll-ps-4 px-4 py-3 sm:gap-3 sm:scroll-ps-5 sm:px-5 sm:py-3.5">
          {agents.map((a) => {
            const tone = groupTone[a.group];
            return (
              <li key={a.id} className="snap-start shrink-0 first:scroll-ml-0">
                <Link
                  href={`/agents/${a.id}`}
                  role="menuitem"
                  onClick={onClose}
                  title={`${a.name} — ${a.title}`}
                  className="group flex w-[6.5rem] flex-col rounded-2xl bg-white/[0.04] p-2 ring-1 ring-white/10 transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.09] hover:ring-white/25 sm:w-[7.75rem] sm:p-2.5"
                >
                  <span className="relative block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={a.photo}
                      alt=""
                      className="aspect-[4/5] w-full rounded-xl object-cover object-top ring-1 ring-white/15"
                    />
                    <span
                      aria-hidden="true"
                      className={`absolute right-1.5 bottom-1.5 size-2 rounded-full ring-2 ring-[#0b1020] ${tone.dot}`}
                    />
                  </span>
                  <span className="mt-2 truncate text-[12px] font-semibold text-white">{firstName(a.name)}</span>
                  <span className="mt-0.5 line-clamp-2 min-h-[2.1em] text-[10px] leading-snug text-white/45">
                    {a.title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/**
 * Portaled Team menu — never nest under header perspective / overflow-hidden,
 * which was clipping the right edge of the offices strip on desktop.
 */
function TeamDropdown({
  open,
  onClose,
  onKeepOpen,
  onScheduleClose,
  mode,
  anchorRef,
}: {
  open: boolean;
  onClose: () => void;
  onKeepOpen?: () => void;
  onScheduleClose?: () => void;
  mode: "desktop" | "mobile";
  anchorRef?: RefObject<HTMLElement | null>;
}) {
  const listId = useId();
  const [mounted, setMounted] = useState(false);
  const [top, setTop] = useState(64);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const place = () => {
      const el = anchorRef?.current;
      if (el) {
        setTop(Math.round(el.getBoundingClientRect().bottom + 8));
        return;
      }
      const header = document.querySelector("header");
      setTop(header ? Math.round(header.getBoundingClientRect().bottom + 8) : 64);
    };
    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [open, anchorRef]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div key={`team-${mode}`} className={mode === "mobile" ? "md:hidden" : "hidden md:block"}>
          {mode === "mobile" ? (
            <motion.button
              type="button"
              aria-label="Close team menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[85] bg-black/45"
              onClick={onClose}
            />
          ) : null}
          <motion.div
            id={listId}
            role="menu"
            aria-label="Team offices"
            data-team-root
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease }}
            style={{ top }}
            className={
              mode === "mobile"
                ? "fixed inset-x-2 z-[90]"
                : "fixed left-1/2 z-[90] w-[min(96vw,880px)] max-w-[calc(100vw-1rem)] -translate-x-1/2"
            }
            onMouseEnter={mode === "desktop" ? onKeepOpen : undefined}
            onMouseLeave={mode === "desktop" ? onScheduleClose : undefined}
          >
            <TeamOfficesPanel onClose={onClose} />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion() === true;
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<NavId | null>(null);
  const [teamOpen, setTeamOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileTeamOpen, setMobileTeamOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const teamAnchorRef = useRef<HTMLLIElement>(null);
  const sectionActive = useActiveSection();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const mobileMenuId = useId();

  const openTeam = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setTeamOpen(true);
  };

  const scheduleCloseTeam = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setTeamOpen(false), TEAM_CLOSE_MS);
  };

  useEffect(() => {
    const unsub = scrollY.on("change", (y) => setScrolled(y > 24));
    setScrolled(scrollY.get() > 24);
    return unsub;
  }, [scrollY]);

  useEffect(() => {
    if (!teamOpen) return;
    let remove: (() => void) | undefined;
    // Reason: defer so the opening tap isn't treated as an outside click.
    const t = window.setTimeout(() => {
      const onDoc = (e: Event) => {
        const el = e.target as Element | null;
        if (!el?.closest?.("[data-team-root]")) setTeamOpen(false);
      };
      document.addEventListener("pointerdown", onDoc);
      remove = () => document.removeEventListener("pointerdown", onDoc);
    }, 10);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setTeamOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      remove?.();
      document.removeEventListener("keydown", onKey);
    };
  }, [teamOpen]);

  useEffect(() => {
    setTeamOpen(false);
    setMobileMenuOpen(false);
    setMobileTeamOpen(false);
  }, [pathname]);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  // Lock body scroll when mobile sheet is open
  useEffect(() => {
    if (!teamOpen && !mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    const mq = window.matchMedia("(max-width: 767px)");
    if (mq.matches) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [teamOpen, mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setMobileTeamOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  const onAgents = pathname.startsWith("/agents");
  const onSavings = pathname.startsWith("/savings");
  const onAgency = pathname.startsWith("/agency");
  const active: NavId | null =
    pathname === "/integrations"
      ? "integrations"
      : onSavings
        ? "savings"
        : onAgency
          ? "agency"
          : onAgents
            ? "team"
            : sectionActive;
  const highlight = hovered ?? active;

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileTeamOpen(false);
  };

  return (
    <header className="sticky top-0 z-50">
      <motion.div
        initial={reduce ? false : { y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease }}
        className={`mx-auto transition-[max-width,padding] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled ? "max-w-6xl px-1.5 pt-2 sm:px-4 sm:pt-3" : "max-w-[2400px] px-0 pt-0"
        }`}
      >
        <div className="md:[perspective:1400px]">
          <div
            className={`relative text-white transition-[border-radius,background-color,box-shadow,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              teamOpen || mobileMenuOpen ? "overflow-visible" : "overflow-hidden"
            } ${
              scrolled
                ? "rounded-[22px] bg-black/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-1px_0_rgba(255,255,255,0.04),0_24px_48px_-20px_rgba(1,13,255,0.55),0_30px_60px_-28px_rgba(0,0,0,0.85)] backdrop-blur-2xl backdrop-saturate-150"
                : "rounded-none bg-black shadow-none"
            }`}
          >
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.07] to-transparent transition-opacity duration-700 ${
                scrolled ? "opacity-100" : "opacity-0"
              }`}
            />

            <div
              className={`relative mx-auto flex max-w-7xl items-center justify-between gap-2 transition-[padding] duration-700 ${
                scrolled ? "px-2.5 py-2 sm:px-4 sm:py-2.5" : "px-3 py-2.5 sm:px-5 sm:py-3.5"
              }`}
            >
              <TiltLogo />

              <nav aria-label="Primary" className="flex shrink-0 items-center gap-1.5 lg:gap-2">
                {/* Desktop pill nav */}
                <ul
                  onMouseLeave={() => setHovered(null)}
                  className="relative hidden items-center gap-0.5 rounded-full bg-white/[0.04] p-0.5 ring-1 ring-white/10 md:flex"
                >
                  {navItems.map((item) => {
                    const isActive = active === item.id;
                    const isTeam = item.id === "team";
                    return (
                      <li
                        key={item.id}
                        ref={isTeam ? teamAnchorRef : undefined}
                        className="relative"
                        {...(isTeam ? { "data-team-root": true } : {})}
                        onMouseEnter={() => {
                          setHovered(item.id);
                          if (isTeam) openTeam();
                        }}
                        onMouseLeave={() => {
                          if (isTeam) scheduleCloseTeam();
                        }}
                      >
                        {isTeam ? (
                          <>
                            <button
                              type="button"
                              aria-expanded={teamOpen}
                              aria-haspopup="menu"
                              onClick={() => setTeamOpen((v) => !v)}
                              className={`relative z-10 flex items-center gap-1 rounded-full px-2 py-1.5 text-[13px] font-medium whitespace-nowrap transition-colors duration-300 xl:px-2.5 xl:text-sm ${
                                highlight === item.id || teamOpen ? "text-white" : "text-white/65 hover:text-white"
                              }`}
                            >
                              <span
                                aria-hidden="true"
                                className={`size-1.5 shrink-0 rounded-full transition-all duration-500 ${
                                  isActive || teamOpen
                                    ? "scale-100 bg-brand-green shadow-[0_0_8px_#00ff26]"
                                    : "w-0 scale-0 overflow-hidden bg-white/40"
                                }`}
                              />
                              {item.label}
                              <svg
                                aria-hidden="true"
                                viewBox="0 0 12 12"
                                className={`size-2.5 opacity-70 transition duration-300 ${teamOpen ? "rotate-180" : ""}`}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                              >
                                <path d="M2.5 4.5L6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                            <TeamDropdown
                              open={teamOpen}
                              onClose={() => setTeamOpen(false)}
                              onKeepOpen={openTeam}
                              onScheduleClose={scheduleCloseTeam}
                              mode="desktop"
                              anchorRef={teamAnchorRef}
                            />
                          </>
                        ) : (
                          <a
                            href={item.href}
                            onMouseEnter={() => setHovered(item.id)}
                            aria-current={isActive ? "page" : undefined}
                            className={`relative z-10 flex items-center gap-1 rounded-full px-2 py-1.5 text-[13px] font-medium whitespace-nowrap transition-colors duration-300 xl:px-2.5 xl:text-sm ${
                              highlight === item.id ? "text-white" : "text-white/65 hover:text-white"
                            }`}
                          >
                            <span
                              aria-hidden="true"
                              className={`size-1.5 shrink-0 rounded-full transition-all duration-500 ${
                                isActive
                                  ? "scale-100 bg-brand-green shadow-[0_0_8px_#00ff26]"
                                  : "w-0 scale-0 overflow-hidden bg-white/40"
                              }`}
                            />
                            {item.label}
                          </a>
                        )}
                        {(highlight === item.id || (isTeam && teamOpen)) && (
                          <motion.span
                            layoutId="nav-highlight"
                            className="absolute inset-0 rounded-full bg-white/[0.1] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_18px_-8px_rgba(1,13,255,0.6)]"
                            transition={{ type: "spring", stiffness: 420, damping: 34 }}
                          />
                        )}
                      </li>
                    );
                  })}
                </ul>

                {/* Mobile: Menu + Sign up only — full links live in the sheet */}
                <button
                  type="button"
                  aria-expanded={mobileMenuOpen}
                  aria-controls={mobileMenuId}
                  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                  onClick={() => {
                    setMobileMenuOpen((v) => !v);
                    setMobileTeamOpen(false);
                  }}
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 transition md:hidden ${
                    mobileMenuOpen
                      ? "bg-white/[0.12] text-white ring-white/30"
                      : "text-white ring-white/20"
                  }`}
                >
                  <span className="relative block size-4">
                    <span
                      className={`absolute left-0 block h-[1.5px] w-4 rounded-full bg-current transition ${
                        mobileMenuOpen ? "top-[7px] rotate-45" : "top-[3px]"
                      }`}
                    />
                    <span
                      className={`absolute top-[7px] left-0 block h-[1.5px] w-4 rounded-full bg-current transition ${
                        mobileMenuOpen ? "opacity-0" : "opacity-100"
                      }`}
                    />
                    <span
                      className={`absolute left-0 block h-[1.5px] w-4 rounded-full bg-current transition ${
                        mobileMenuOpen ? "top-[7px] -rotate-45" : "top-[11px]"
                      }`}
                    />
                  </span>
                </button>

                <a
                  href={links.signup}
                  className="inline-flex h-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#3a44ff] to-brand px-3.5 text-xs font-semibold whitespace-nowrap text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_20px_-10px_rgba(1,13,255,0.85)] xl:px-4 xl:text-sm"
                >
                  <span className="xl:hidden">Sign up</span>
                  <span className="hidden xl:inline">Create account</span>
                </a>

                <a
                  href={links.login}
                  className="hidden h-9 shrink-0 items-center justify-center rounded-full px-3 text-xs font-semibold whitespace-nowrap text-white/85 ring-1 ring-white/15 md:inline-flex xl:px-3.5 xl:text-sm"
                >
                  Sign in
                </a>
              </nav>
            </div>

            {/* Mobile full menu — every tab readable, no clipped pills */}
            <AnimatePresence>
              {mobileMenuOpen ? (
                <motion.div
                  key="mobile-menu"
                  id={mobileMenuId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease }}
                  className="overflow-hidden border-t border-white/10 md:hidden"
                >
                  <div className="px-3 py-3 sm:px-4">
                    <ul className="space-y-0.5">
                      {navItems.map((item) => {
                        const isActive = active === item.id;
                        const isTeam = item.id === "team";
                        if (isTeam) {
                          return (
                            <li key={item.id}>
                              <button
                                type="button"
                                aria-expanded={mobileTeamOpen}
                                onClick={() => setMobileTeamOpen((v) => !v)}
                                className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-semibold ${
                                  isActive || mobileTeamOpen ? "bg-white/[0.08] text-white" : "text-white/80"
                                }`}
                              >
                                <span className="flex items-center gap-2">
                                  <span
                                    aria-hidden="true"
                                    className={`size-1.5 rounded-full ${
                                      isActive || mobileTeamOpen ? "bg-brand-green shadow-[0_0_8px_#00ff26]" : "bg-white/30"
                                    }`}
                                  />
                                  Team
                                </span>
                                <svg
                                  aria-hidden="true"
                                  viewBox="0 0 12 12"
                                  className={`size-3 opacity-70 transition ${mobileTeamOpen ? "rotate-180" : ""}`}
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.8"
                                >
                                  <path d="M2.5 4.5L6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </button>
                              <AnimatePresence>
                                {mobileTeamOpen ? (
                                  <motion.div
                                    key="mobile-team"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.22, ease }}
                                    className="overflow-hidden"
                                  >
                                    <div className="pb-2 pl-1">
                                      <TeamOfficesPanel onClose={closeMobileMenu} />
                                    </div>
                                  </motion.div>
                                ) : null}
                              </AnimatePresence>
                            </li>
                          );
                        }
                        return (
                          <li key={item.id}>
                            <a
                              href={item.href}
                              onClick={closeMobileMenu}
                              aria-current={isActive ? "page" : undefined}
                              className={`flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold ${
                                isActive ? "bg-white/[0.08] text-white" : "text-white/80"
                              }`}
                            >
                              <span
                                aria-hidden="true"
                                className={`size-1.5 rounded-full ${
                                  isActive ? "bg-brand-green shadow-[0_0_8px_#00ff26]" : "bg-white/30"
                                }`}
                              />
                              {item.label}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="mt-3 flex gap-2 border-t border-white/10 pt-3">
                      <a
                        href={links.login}
                        onClick={closeMobileMenu}
                        className="inline-flex h-10 flex-1 items-center justify-center rounded-full text-sm font-semibold text-white/90 ring-1 ring-white/20"
                      >
                        Sign in
                      </a>
                      <a
                        href={links.signup}
                        onClick={closeMobileMenu}
                        className="inline-flex h-10 flex-1 items-center justify-center rounded-full bg-gradient-to-b from-[#3a44ff] to-brand text-sm font-semibold text-white"
                      >
                        Sign up
                      </a>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div aria-hidden="true" className="relative h-[2px] bg-white/10">
              <div className="brand-line absolute inset-0 opacity-40" />
              <motion.div className="brand-line absolute inset-0 origin-left" style={{ scaleX: progress }} />
            </div>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
