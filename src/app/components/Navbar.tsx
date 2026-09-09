"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const R2_MEDIA_URL = (process.env.NEXT_PUBLIC_R2_MEDIA_URL || "").replace(/\/+$/, "");

const votaLogo = "https://talentsuite.career141.com/images/HeaderLogo.svg";
const arrowUpRight = `${R2_MEDIA_URL}/icons/arrow-up-right.svg`;

const NAV_ITEMS = [
  { label: "Home", href: "/", section: "hero" },
  { label: "Speakers", href: "#speakers", section: "speakers" },
  { label: "Episodes", href: "#episodes", section: "episodes" },
  { label: "Reels", href: "#full-releases", section: "full-releases" },
];

const PILL_DURATION = 320; // ms — pill animates first, then scroll happens

export default function Navbar() {
  const [active, setActive] = useState(NAV_ITEMS[0].label);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number } | null>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const pillContainerRef = useRef<HTMLDivElement | null>(null);
  const isClickNav = useRef(false); // suppress IntersectionObserver during click

  /* ── Compute pill position for a given section index ── */
  const computePill = useCallback((idx: number) => {
    const linkEl = linkRefs.current[idx];
    const containerEl = pillContainerRef.current;
    if (!linkEl || !containerEl) return;
    const containerRect = containerEl.getBoundingClientRect();
    const linkRect = linkEl.getBoundingClientRect();
    setPillStyle({ left: linkRect.left - containerRect.left, width: linkRect.width });
  }, []);

  /* ── Initial pill position after mount & hash cleanup ── */
  useEffect(() => {
    computePill(0);
    if (typeof window !== "undefined" && window.location.hash === "#top") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, [computePill]);

  /* ── Close mobile menu on desktop resize ── */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ── Intersection Observer — only fires when NOT clicking ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickNav.current) return; // skip during click-driven scroll
        let best: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!best || entry.intersectionRatio > best.intersectionRatio) best = entry;
          }
        }
        if (best) {
          const id = (best.target as HTMLElement).id;
          const idx = NAV_ITEMS.findIndex((i) => i.section === id);
          if (idx >= 0) {
            setActive(NAV_ITEMS[idx].label);
            computePill(idx);
          }
        }
      },
      { threshold: [0.15, 0.3, 0.5] }
    );

    NAV_ITEMS.forEach(({ section }) => {
      const el = document.getElementById(section);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [computePill]);

  /* ── Click handler: animate pill first, then scroll ── */
  const handleClick = useCallback(
    (e: React.MouseEvent, item: typeof NAV_ITEMS[0], idx: number) => {
      e.preventDefault();

      // 1️⃣ Immediately move the pill
      setActive(item.label);
      computePill(idx);

      // 2️⃣ Block IntersectionObserver during scroll
      isClickNav.current = true;

      // 3️⃣ After pill animation finishes → scroll to section
      setTimeout(() => {
        if (item.section === "top" || item.section === "hero") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const target = document.getElementById(item.section);
          if (target) target.scrollIntoView({ behavior: "smooth" });
        }

        // Re-enable observer after scroll settles (~800ms)
        setTimeout(() => { isClickNav.current = false; }, 800);
      }, PILL_DURATION);
    },
    [computePill]
  );

  return (
    <>
      <header className="absolute inset-x-0 top-[20px] md:top-[30px] lg:top-[36px] z-[20] w-full px-6 sm:px-10 md:px-12 lg:px-[8.7%]">
        <div className="mx-auto w-full max-w-[1600px]">
          <nav
            className="flex w-full items-center justify-between"
            aria-label="Primary navigation"
          >
            {/* Logo */}
            <a
              className="relative flex items-center w-[140px] sm:w-[160px] md:w-[185px] lg:w-[210px] h-auto cursor-pointer shrink-0"
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setActive(NAV_ITEMS[0].label);
                computePill(0);
                setIsMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-label="Voices of Talent Acquisition home"
            >
              <img
                className="block w-full h-auto object-contain object-left"
                src={votaLogo}
                alt="VOTA - Voices of Talent Acquisition"
              />
            </a>

            {/* Desktop Nav pill with sliding indicator */}
            <div
              ref={pillContainerRef}
              className="relative hidden min-[1025px]:flex items-center gap-1 rounded-[34px] border border-[rgba(255,255,255,.08)] bg-[rgba(255,255,255,.04)] p-1.5 backdrop-blur-[14px]"
            >
              {/* Animated sliding background pill */}
              {pillStyle && (
                <span
                  className="pointer-events-none absolute top-[6px] rounded-[22px] bg-[#159a99] transition-all ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{
                    left: pillStyle.left,
                    width: pillStyle.width,
                    height: "calc(100% - 12px)",
                    transitionDuration: `${PILL_DURATION}ms`,
                  }}
                  aria-hidden="true"
                />
              )}

              {NAV_ITEMS.map((item, i) => (
                <a
                  key={item.label}
                  ref={(el) => { linkRefs.current[i] = el; }}
                  href={item.href}
                  onClick={(e) => handleClick(e, item, i)}
                  className={`relative z-[1] flex items-center justify-center rounded-[22px] px-[18px] py-2 text-[15px] leading-normal no-underline transition-colors ease-[cubic-bezier(0.4,0,0.2,1)] ${active === item.label
                    ? "font-semibold text-white"
                    : "font-normal text-[#a0a0a0] hover:text-white"
                    }`}
                  style={{ transitionDuration: `${PILL_DURATION}ms` }}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Desktop Watch Now CTA */}
            <a
              className="hidden min-[1025px]:inline-flex items-center justify-center gap-2 rounded-[140px] bg-[#159a99] px-[22px] py-[10px] text-[15px] font-semibold leading-normal text-white no-underline transition-all duration-300 hover:bg-[#128281] hover:shadow-lg hover:shadow-[#159a99]/25 active:scale-95 shrink-0"
              href="#episodes"
            >
              <span>Watch Now</span>
              <img
                className="h-3.5 w-3.5 object-contain"
                src={arrowUpRight}
                alt=""
              />
            </a>

            {/* Mobile / Tablet Actions: Watch CTA + Hamburger Menu Toggle */}
            <div className="flex items-center gap-2 min-[1025px]:hidden">
              <a
                className="inline-flex items-center justify-center gap-1 rounded-[140px] bg-[#159a99] px-3.5 py-1.5 text-[12px] font-semibold text-white no-underline shadow-md active:scale-95"
                href="#episodes"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Watch</span>
                <img className="h-3 w-3 object-contain" src={arrowUpRight} alt="" />
              </a>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all active:scale-90 cursor-pointer shadow-md"
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile / Tablet Menu Dropdown / Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm min-[1025px]:hidden"
            />

            {/* Menu Drawer Panel */}
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.96 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed inset-x-4 sm:inset-x-8 md:inset-x-12 top-[70px] md:top-[80px] z-50 rounded-[24px] border border-white/15 bg-[#081212]/95 p-5 shadow-2xl backdrop-blur-xl min-[1025px]:hidden max-w-[480px] sm:mx-auto"
            >
              <div className="flex flex-col gap-1.5">
                {NAV_ITEMS.map((item, i) => {
                  const isActive = active === item.label;
                  return (
                    <a
                      key={`mobile-nav-${item.label}`}
                      href={item.href}
                      onClick={(e) => {
                        handleClick(e, item, i);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center justify-between rounded-[16px] px-4 py-3 font-geist text-[15px] font-medium transition-all ${isActive
                        ? "bg-[#159a99] text-white shadow-md shadow-[#159a99]/30 font-semibold"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                        }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="h-2 w-2 rounded-full bg-white shadow-sm" />
                      )}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
