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
import { useEffect, useId, useRef, useState, type PointerEvent } from "react";
import { createPortal } from "react-dom";
import { agents, links } from "@/lib/site";
import { groupTone } from "./team/groupTone";
import { ease } from "./Motion";

const navItems = [
  { id: "team", label: "Team", href: "/#team" },
  { id: "features", label: "Features", href: "/#features" },
  { id: "integrations", label: "Integrations", href: "/integrations" },
  { id: "savings", label: "Savings", href: "/savings" },
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
          className="h-[15px] w-auto drop-shadow-[0_6px_14px_rgba(0,255,38,0.18)] sm:h-[18px] md:h-5"
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
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-[#0b1020] to-transparent sm:w-8"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-[#0b1020] to-transparent sm:w-8"
        />
        <ul className="scrollbar-none flex snap-x snap-mandatory gap-2.5 overflow-x-auto overscroll-x-contain px-3 py-3 sm:gap-3 sm:px-4 sm:py-3.5">
          {agents.map((a) => {
            const tone = groupTone[a.group];
            return (
              <li key={a.id} className="snap-start shrink-0">
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

/** Desktop: anchored under Team. Mobile: portaled sheet (avoids overflow/perspective clip). */
function TeamDropdown({
  open,
  onClose,
  mode,
}: {
  open: boolean;
  onClose: () => void;
  mode: "desktop" | "mobile";
}) {
  const listId = useId();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const panel = (
    <AnimatePresence>
      {open && (
        <motion.div
          id={listId}
          role="menu"
          aria-label="Team offices"
          data-team-root
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease }}
          className={
            mode === "mobile"
              ? "fixed inset-x-2 top-[3.75rem] z-[90] sm:top-[4.25rem]"
              : "absolute top-full left-1/2 z-[70] w-[min(96vw,880px)] -translate-x-1/2 pt-2"
          }
        >
          <TeamOfficesPanel onClose={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (mode === "mobile") {
    if (!mounted) return null;
    return createPortal(
      <AnimatePresence>
        {open ? (
          <motion.div key="mobile-team" className="md:hidden">
            <motion.button
              type="button"
              aria-label="Close team menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[85] bg-black/45"
              onClick={onClose}
            />
            <motion.div
              id={listId}
              role="menu"
              aria-label="Team offices"
              data-team-root
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease }}
              className="fixed inset-x-2 top-[3.75rem] z-[90] sm:top-[4.25rem]"
            >
              <TeamOfficesPanel onClose={onClose} />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>,
      document.body,
    );
  }

  return panel;
}

export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion() === true;
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<NavId | null>(null);
  const [teamOpen, setTeamOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionActive = useActiveSection();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

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
  }, [pathname]);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  // Lock body scroll when mobile team sheet is open
  useEffect(() => {
    if (!teamOpen) return;
    const prev = document.body.style.overflow;
    const mq = window.matchMedia("(max-width: 767px)");
    if (mq.matches) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [teamOpen]);

  const onAgents = pathname.startsWith("/agents");
  const onSavings = pathname.startsWith("/savings");
  const active: NavId | null =
    pathname === "/integrations"
      ? "integrations"
      : onSavings
        ? "savings"
        : onAgents
          ? "team"
          : sectionActive;
  const highlight = hovered ?? active;

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
              teamOpen ? "overflow-visible" : "overflow-hidden"
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
                scrolled ? "px-2.5 py-2 sm:px-5 sm:py-2.5" : "px-3 py-2.5 sm:px-6 sm:py-4"
              }`}
            >
              <TiltLogo />

              <nav aria-label="Primary" className="flex min-w-0 items-center gap-1.5 sm:gap-3">
                {/* Mobile Team — click only (no hover leave, which closes on touch) */}
                <div data-team-root className="md:hidden">
                  <button
                    type="button"
                    aria-expanded={teamOpen}
                    aria-haspopup="menu"
                    onClick={() => setTeamOpen((v) => !v)}
                    className={`inline-flex h-9 items-center gap-1 rounded-full px-3 text-xs font-semibold ring-1 transition ${
                      teamOpen
                        ? "bg-white/[0.12] text-white ring-white/30"
                        : "text-white ring-white/20"
                    }`}
                  >
                    Team
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 12 12"
                      className={`size-3 opacity-80 transition duration-300 ${teamOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M2.5 4.5L6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <TeamDropdown open={teamOpen} onClose={() => setTeamOpen(false)} mode="mobile" />
                </div>

                <ul
                  onMouseLeave={() => setHovered(null)}
                  className="relative hidden items-center gap-1 rounded-full bg-white/[0.04] p-1 ring-1 ring-white/10 md:flex"
                >
                  {navItems.map((item) => {
                    const isActive = active === item.id;
                    const isTeam = item.id === "team";
                    return (
                      <li
                        key={item.id}
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
                              className={`relative z-10 flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-colors duration-300 lg:px-4 ${
                                highlight === item.id || teamOpen ? "text-white" : "text-white/65 hover:text-white"
                              }`}
                            >
                              <span
                                aria-hidden="true"
                                className={`size-1.5 rounded-full transition-all duration-500 ${
                                  isActive || teamOpen
                                    ? "scale-100 bg-brand-green shadow-[0_0_8px_#00ff26]"
                                    : "scale-0 bg-white/40"
                                }`}
                              />
                              {item.label}
                              <svg
                                aria-hidden="true"
                                viewBox="0 0 12 12"
                                className={`size-3 opacity-70 transition duration-300 ${teamOpen ? "rotate-180" : ""}`}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                              >
                                <path d="M2.5 4.5L6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                            <TeamDropdown open={teamOpen} onClose={() => setTeamOpen(false)} mode="desktop" />
                          </>
                        ) : (
                          <a
                            href={item.href}
                            onMouseEnter={() => setHovered(item.id)}
                            aria-current={isActive ? "page" : undefined}
                            className={`relative z-10 flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors duration-300 lg:px-4 ${
                              highlight === item.id ? "text-white" : "text-white/65 hover:text-white"
                            }`}
                          >
                            <span
                              aria-hidden="true"
                              className={`size-1.5 rounded-full transition-all duration-500 ${
                                isActive ? "scale-100 bg-brand-green shadow-[0_0_8px_#00ff26]" : "scale-0 bg-white/40"
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

                <a
                  href={links.signup}
                  className="inline-flex h-9 items-center rounded-full bg-gradient-to-b from-[#3a44ff] to-brand px-3.5 text-xs font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_20px_-10px_rgba(1,13,255,0.85)] sm:h-auto sm:px-5 sm:py-2 sm:text-sm"
                >
                  <span className="md:hidden">Join</span>
                  <span className="hidden md:inline">Create account</span>
                </a>

                <a
                  href={links.login}
                  className="hidden h-9 items-center rounded-full px-3 text-xs font-semibold text-white/85 ring-1 ring-white/15 min-[400px]:inline-flex sm:h-auto sm:px-4 sm:py-2 sm:text-sm"
                >
                  Sign in
                </a>
              </nav>
            </div>

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
