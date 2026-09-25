"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useState, type PointerEvent } from "react";
import { links } from "@/lib/site";
import { ease } from "./Motion";

const navItems = [
  { id: "team", label: "Team" },
  { id: "features", label: "Product" },
] as const;

type SectionId = (typeof navItems)[number]["id"];

function useActiveSection() {
  const [active, setActive] = useState<SectionId | null>(null);
  useEffect(() => {
    const seen = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e.isIntersecting));
        const current = navItems.find((n) => seen.get(n.id));
        setActive(current ? current.id : null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navItems.forEach((n) => {
      const el = document.getElementById(n.id);
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
      href="#top"
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
          src="/brand/logo.png"
          alt="LeadsFlow180"
          className="h-[22px] w-auto drop-shadow-[0_6px_14px_rgba(0,255,38,0.18)] min-[360px]:h-[26px] sm:h-9"
        />
      </motion.span>
    </a>
  );
}

export function Header() {
  const reduce = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<SectionId | null>(null);
  const active = useActiveSection();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

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
        <div className="[perspective:1400px]">
          <div
            className={`relative overflow-hidden text-white transition-[border-radius,background-color,box-shadow,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
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
            <div aria-hidden="true" className="pointer-events-none absolute -top-10 left-1/3 h-20 w-1/3 rounded-full bg-brand/25 blur-3xl" />

            <div
              className={`relative mx-auto flex max-w-7xl items-center justify-between gap-1.5 transition-[padding] duration-700 min-[380px]:gap-2 sm:gap-4 ${
                scrolled ? "px-2.5 py-2 sm:px-5 sm:py-2.5" : "px-3 py-3 min-[380px]:px-4 sm:px-6 sm:py-4"
              }`}
            >
              <TiltLogo />

              <nav aria-label="Primary" className="flex min-w-0 shrink items-center gap-1 sm:gap-3">
                <ul
                  onMouseLeave={() => setHovered(null)}
                  className="relative hidden items-center gap-1 rounded-full bg-white/[0.04] p-1 ring-1 ring-white/10 md:flex"
                >
                  {navItems.map((item) => {
                    const isActive = active === item.id;
                    return (
                      <li key={item.id} className="relative">
                        <a
                          href={`#${item.id}`}
                          onMouseEnter={() => setHovered(item.id)}
                          aria-current={isActive ? "location" : undefined}
                          className={`relative z-10 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
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
                        {highlight === item.id && (
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

                <span aria-hidden="true" className="hidden h-6 w-px bg-white/15 md:block" />

                <a
                  href={links.signup}
                  className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-b from-[#3a44ff] to-brand px-3 py-1.5 text-[11px] font-semibold whitespace-nowrap text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_3px_0_#0008a8,0_12px_24px_-8px_rgba(1,13,255,0.85)] transition-[translate,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_5px_0_#0008a8,0_18px_34px_-8px_rgba(1,13,255,0.95)] active:translate-y-[2px] active:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_1px_0_#0008a8,0_6px_14px_-6px_rgba(1,13,255,0.8)] min-[380px]:px-3.5 min-[380px]:py-2 min-[380px]:text-xs sm:px-5 sm:text-sm"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-[320%]"
                  />
                  <span className="relative md:hidden">Join</span>
                  <span className="relative hidden md:inline">Create account</span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className="relative hidden size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 md:block"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" />
                  </svg>
                </a>

                <a
                  href={links.login}
                  className="inline-flex items-center rounded-full px-2.5 py-1.5 text-[11px] font-semibold whitespace-nowrap text-white/85 ring-1 ring-white/15 transition hover:bg-white/[0.08] hover:text-white hover:ring-white/40 min-[380px]:px-3 min-[380px]:py-2 min-[380px]:text-xs sm:px-4 sm:text-sm"
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
