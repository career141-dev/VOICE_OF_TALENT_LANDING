"use client";

import { useEffect, useRef, useState } from "react";

const portraitImage = "/images/portrait.png";

const primaryWords = "Behind every great organization, successful team and".split(" ");
const secondaryWords = "life-changing career opportunity is someone who recognized potential.".split(" ");

export default function MissionSection() {
  const [isActive, setIsActive] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Check if element is already in viewport on immediate mount/refresh
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 150 && rect.bottom > 0) {
      setIsActive(true);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.05,
        rootMargin: "150px 0px 0px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="mission"
      ref={sectionRef}
      className={`relative min-h-[380px] overflow-hidden bg-white px-[8.7%] pt-[100px] text-[#202020] max-[760px]:min-h-[500px] max-[760px]:px-6 max-[760px]:pb-16 max-[760px]:pt-20 ${
        isActive ? "mission-active" : ""
      }`}
      aria-labelledby="mission-title"
    >
      <div className="flex items-start justify-between gap-20 max-[760px]:flex-col max-[760px]:gap-12">
        {/* Left Subtitle */}
        <p className="mission-subtitle m-0 shrink-0 text-[23px] font-semibold uppercase tracking-[-.02em] text-[#159a99] max-[760px]:text-[11px]">
          — The VOTA Mission
        </p>

        {/* Right Heading with Instant GPU-Accelerated Word Reveal */}
        <div className="relative w-[min(68%,820px)] text-right max-[760px]:w-full">
          <h2
            id="mission-title"
            className="m-0 font-geist text-[clamp(25px,2.1vw,36px)] font-medium leading-[1.28] tracking-[-.03em] text-right max-[760px]:text-[27px]"
          >
            {/* Primary Dark Words */}
            <span className="text-[#202020]">
              {primaryWords.map((word, index) => (
                <span
                  key={`primary-${index}`}
                  className="mission-word inline-block whitespace-nowrap mr-[0.28em]"
                  style={{
                    transitionDelay: `${index * 22}ms`,
                  }}
                >
                  {word}
                </span>
              ))}
            </span>{" "}
            {/* Secondary Muted Words */}
            <span className="text-[#969696]">
              {secondaryWords.map((word, index) => (
                <span
                  key={`secondary-${index}`}
                  className="mission-word inline-block whitespace-nowrap mr-[0.28em]"
                  style={{
                    transitionDelay: `${(primaryWords.length + index) * 22}ms`,
                  }}
                >
                  {word}
                </span>
              ))}
            </span>
          </h2>

          {/* Floating Portrait Image with smooth entrance */}
          <div className="mission-portrait absolute left-[30%] top-[60px] z-[2] h-[150px] w-[150px] overflow-hidden rounded-[6px] shadow-lg max-[760px]:left-[18%] max-[760px]:top-[148px]">
            <img
              className="h-full w-full object-cover"
              src={portraitImage}
              alt="A member of the Voice of Talent community"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
