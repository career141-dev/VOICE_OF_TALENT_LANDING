"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const votaLogo = "/icons/vota-logo.png";
const arrowUpRight = "/icons/arrow-up-right.svg";

const NAV_ITEMS = [
  { label: "Home",     href: "#top",      section: "top" },
  { label: "Speakers", href: "#speakers", section: "speakers" },
  { label: "Episodes", href: "#episodes", section: "episodes" },
  { label: "Partners", href: "#partners", section: "partners" },
];

const PILL_DURATION = 320; // ms — pill animates first, then scroll happens

export default function Navbar() {
  const [active, setActive]       = useState("top");
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number } | null>(null);
  const linkRefs        = useRef<(HTMLAnchorElement | null)[]>([]);
  const pillContainerRef = useRef<HTMLDivElement | null>(null);
  const isClickNav      = useRef(false); // suppress IntersectionObserver during click

  /* ── Compute pill position for a given section index ── */
  const computePill = useCallback((idx: number) => {
    const linkEl      = linkRefs.current[idx];
    const containerEl = pillContainerRef.current;
    if (!linkEl || !containerEl) return;
    const containerRect = containerEl.getBoundingClientRect();
    const linkRect      = linkEl.getBoundingClientRect();
    setPillStyle({ left: linkRect.left - containerRect.left, width: linkRect.width });
  }, []);

  /* ── Initial pill position after mount ── */
  useEffect(() => {
    computePill(0);
  }, [computePill]);

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
          const id  = (best.target as HTMLElement).id;
          const idx = NAV_ITEMS.findIndex((i) => i.section === id);
          if (idx >= 0) {
            setActive(id);
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
      setActive(item.section);
      computePill(idx);

      // 2️⃣ Block IntersectionObserver during scroll
      isClickNav.current = true;

      // 3️⃣ After pill animation finishes → scroll to section
      setTimeout(() => {
        const target = document.getElementById(item.section);
        if (target) target.scrollIntoView({ behavior: "smooth" });

        // Re-enable observer after scroll settles (~800ms)
        setTimeout(() => { isClickNav.current = false; }, 800);
      }, PILL_DURATION);
    },
    [computePill]
  );

  return (
    <nav
      className="absolute left-[6.3%] right-[6.3%] top-[62px] z-[10] flex items-center justify-between max-[760px]:left-5 max-[760px]:right-5 max-[760px]:top-[26px]"
      aria-label="Primary navigation"
    >
      {/* Logo */}
      <a
        className="relative block h-[54px] w-[160px] max-[760px]:origin-top-left max-[760px]:scale-[.72]"
        href="#top"
        aria-label="Voice of Talent home"
      >
        <img
          className="block h-[54px] w-[160px] object-contain object-left-top"
          src={votaLogo}
          alt="VOTA - Voice of Talent Acquisition"
        />
      </a>

      {/* Nav pill with sliding indicator */}
      <div
        ref={pillContainerRef}
        className="relative flex items-center gap-5 rounded-[34px] border border-[rgba(255,255,255,.08)] bg-[rgba(255,255,255,.04)] px-5 py-1.5 pl-1.5 backdrop-blur-[14px] max-[760px]:hidden"
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
            key={item.section}
            ref={(el) => { linkRefs.current[i] = el; }}
            href={item.href}
            onClick={(e) => handleClick(e, item, i)}
            className={`relative z-[1] rounded-[22px] px-[16px] py-2 text-[15px] no-underline transition-colors ease-[cubic-bezier(0.4,0,0.2,1)] ${
              active === item.section
                ? "font-semibold text-white"
                : "font-normal text-[#a0a0a0]"
            }`}
            style={{ transitionDuration: `${PILL_DURATION}ms` }}
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Watch Now CTA */}
      <a
        className="inline-flex items-center gap-1.5 rounded-[140px] bg-[#159a99] px-[20px] py-[10px] text-[14px] font-semibold text-white no-underline max-[760px]:px-3 max-[760px]:py-2 max-[760px]:text-[10px]"
        href="#episodes"
      >
        Watch Now
        <img
          className="h-[14px] w-[14px] object-contain"
          src={arrowUpRight}
          alt=""
        />
      </a>
    </nav>
  );
}
