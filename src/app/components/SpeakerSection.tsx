"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';

const R2_MEDIA_URL = (process.env.NEXT_PUBLIC_R2_MEDIA_URL || "").replace(/\/+$/, "");

const arrowRightTeal = `${R2_MEDIA_URL}/icons/arrow-right-teal.svg`;

interface VoiceItem {
  id: number;
  name: string;
  role: string;
  company: string;
  quote?: string;
  bulletPoints?: string[];
  avatar: string;
  bannerImage: string;
}

const SPEAKER_SECTION_IMG_BASE = "https://talentsuite.career141.com/images/speakerSection";
const SERIES_SECTION_IMG_BASE = "https://talentsuite.career141.com/images/seriesSection";

const voicesData: VoiceItem[] = [
  {
    id: 1,
    name: 'Mr. Patrick Pereira',
    role: 'Vice President Learning & Development',
    company: 'Aitken Spence Hotels',
    bulletPoints: [
      'What makes Talent Acquisition a future ready career path?',
      'How do you see Talent Acquisition contributing to overall business success?',
    ],
    avatar: `${SPEAKER_SECTION_IMG_BASE}/patrickspeaker.webp`,
    bannerImage: `${SERIES_SECTION_IMG_BASE}/Pillar-01.webp`,
  },
  {
    id: 2,
    name: 'Mr. Ken Vijayakumar',
    role: 'Senior General Manager, Human Resource & Sustainability',
    company: 'A. Baur & Co. (Pvt) Ltd',
    bulletPoints: [
      'How do you define Talent Acquisition in today’s context?',
      'How do you see Talent Acquisition contributing to overall business success?',
    ],
    avatar: `${SPEAKER_SECTION_IMG_BASE}/r2png.webp`,
    bannerImage: `${SERIES_SECTION_IMG_BASE}/Pillar-02.webp`,
  },
  {
    id: 3,
    name: 'Mr. Chamila C Perera',
    role: 'Former Managing Director, Head of Human Resources',
    company: 'HSBC Malaysia',
    bulletPoints: [
      'What makes Talent Acquisition a future ready career path?',
      'In your opinion, why is there a growing need for skilled Talent Acquisition professionals in Sri Lanka?',
    ],
    avatar: `${SPEAKER_SECTION_IMG_BASE}/r3png.webp`,
    bannerImage: `${SERIES_SECTION_IMG_BASE}/Pillar-03.webp`,
  },
  {
    id: 4,
    name: 'Ms. Thrimuthi Dhanushka',
    role: 'Group Deputy General Manager, Human Resource & Administration',
    company: 'Ideal Group',
    bulletPoints: [
      'How do you define Talent Acquisition in today’s context?',
      'In your view, why is Talent Acquisition becoming increasingly important for organizations?',
    ],
    avatar: `${SPEAKER_SECTION_IMG_BASE}/r4png.webp`,
    bannerImage: `${SERIES_SECTION_IMG_BASE}/Pillar-04.webp`,
  },
  {
    id: 5,
    name: 'Ms. Surani Amarasinghe',
    role: 'Director, Country People Partnering, Sri\u00A0Lanka',
    company: 'LSEG (London Stock Exchange Group)',
    bulletPoints: [
      'How do you define Talent Acquisition in today’s context?',
      'What key skills do you believe are essential to succeed in Talent Acquisition?',
    ],
    avatar: `${SPEAKER_SECTION_IMG_BASE}/r5png.webp`,
    bannerImage: `${SERIES_SECTION_IMG_BASE}/Pillar-05.webp`,
  },
  {
    id: 6,
    name: 'Mr. Arshaq Farally',
    role: 'Chief People Officer, Sri\u00A0Lanka',
    company: 'Daraz',
    bulletPoints: [
      'How does Talent Acquisition contribute to building and strengthening organizational culture?',
      'How does a career in Talent Acquisition support individuals in achieving their broader career aspirations?',
    ],
    avatar: `${SPEAKER_SECTION_IMG_BASE}/r6png.webp`,
    bannerImage: `${SERIES_SECTION_IMG_BASE}/Pillar-06.webp`,
  },
  {
    id: 7,
    name: 'Mr. Danushka Seneth',
    role: 'Head of Human Resources / AGM',
    company: 'Janashakthi Insurance PLC',
    bulletPoints: [
      'How important is the Talent Acquisition function within an organization?',
      "How does working in Talent Acquisition help broaden an individual's mindset?",
    ],
    avatar: `${SPEAKER_SECTION_IMG_BASE}/r7png.webp`,
    bannerImage: `${SERIES_SECTION_IMG_BASE}/Pillar-07.webp`,
  },
  {
    id: 8,
    name: 'Ms. Hasanthi De Saram',
    role: 'Director / Senior HR Consultant',
    company: '(Former Director HR - Asiri Health)',
    bulletPoints: [
      'How do you see Talent Acquisition contributing to overall business success?',
      'What message would you like to share with the next generation aspiring to build a career in Talent Acquisition?',
    ],
    avatar: `${SPEAKER_SECTION_IMG_BASE}/hasanthispeaker.webp`,
    bannerImage: `${SERIES_SECTION_IMG_BASE}/Pillar-08.webp`,
  },
  {
    id: 9,
    name: 'Mr. Ashan Ransilige',
    role: 'Chief Executive Officer',
    company: 'Link Natural Products (Pvt.) Ltd',
    bulletPoints: [
      'How does Talent Acquisition contribute to building and strengthening organizational culture?',
      'How does a career in Talent Acquisition support individuals in achieving their broader career aspirations?',
    ],
    avatar: `${SPEAKER_SECTION_IMG_BASE}/r9png.webp`,
    bannerImage: `${SERIES_SECTION_IMG_BASE}/Pillar-09.webp`,
  },
  {
    id: 10,
    name: 'Mr. Indika Ranathunga',
    role: 'Chief Operating Officer',
    company: 'Allied Commercial Fertilizers',
    bulletPoints: [
      'How do you see Talent Acquisition contributing to overall business success?',
      'From your perspective, how does Talent Acquisition differ from traditional HR roles?',
    ],
    avatar: `${SPEAKER_SECTION_IMG_BASE}/r10png.webp`,
    bannerImage: `${SERIES_SECTION_IMG_BASE}/Pillar-10.webp`,
  },
  {
    id: 11,
    name: 'Ms. Chamindra Perera',
    role: 'Human Resources Director',
    company: 'GRI Sri\u00A0Lanka',
    bulletPoints: [
      'How do you see Talent Acquisition contributing to overall business success?',
      'What advice would you offer to someone considering a career in Talent Acquisition?',
    ],
    avatar: `${SPEAKER_SECTION_IMG_BASE}/r11png.webp`,
    bannerImage: `${SERIES_SECTION_IMG_BASE}/Pillar-11.webp`,
  },
  {
    id: 12,
    name: 'Ms. Chandima Bambarenda',
    role: 'Group Head of Human Resources',
    company: 'Pyramid Wilmar Group',
    bulletPoints: [
      'How does Talent Acquisition contribute to building and strengthening organizational culture?',
      'What makes Talent Acquisition a future ready career path?',
    ],
    avatar: `${SPEAKER_SECTION_IMG_BASE}/r12png.webp`,
    bannerImage: `${SERIES_SECTION_IMG_BASE}/Pillar-12.webp`,
  },
  {
    id: 13,
    name: 'Mr. Gehan Samuel',
    role: 'Manager of Human Resources Development',
    company: 'MAS Holdings Silueta',
    bulletPoints: [
      'In your opinion, why is there a growing need for skilled Talent Acquisition professionals in Sri Lanka?',
      'What is your perspective on developing Talent Acquisition professionals who are globally competitive?',
    ],
    avatar: `${SPEAKER_SECTION_IMG_BASE}/r13png.webp`,
    bannerImage: `${SERIES_SECTION_IMG_BASE}/Pillar-13.webp`,
  },
  {
    id: 14,
    name: 'Mr. Kanishka Munasinghe',
    role: 'General Manager, Human Resources',
    company: 'Port City BPO',
    bulletPoints: [
      'How important is hands-on experience in building a successful career in Talent Acquisition?',
      'In your opinion, why is there a growing need for skilled Talent Acquisition professionals in Sri Lanka?',
    ],
    avatar: `${SPEAKER_SECTION_IMG_BASE}/r14png.webp`,
    bannerImage: `${SERIES_SECTION_IMG_BASE}/Pillar-14.webp`,
  },
];

const extendedVoices: VoiceItem[] = [
  voicesData[voicesData.length - 1], // Index 0: Clone of last speaker (14)
  ...voicesData,                     // Index 1..14: Real speakers (1..14)
  voicesData[0],                     // Index 15: Clone of first speaker (1)
];

export default function VoicesSlider() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [touchOffset, setTouchOffset] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isDraggingMobile = useRef(false);
  const isSwiping = useRef(false);
  const listSet = [...voicesData, ...voicesData];

  const badgeClasses = "inline-flex h-[38px] md:h-[51.968px] items-center justify-center gap-[6px] md:gap-[8.338px] rounded-[25.558px] border-[1.042px] border-[#D6D6D6] bg-[#F2F2F2] px-[16px] md:px-[25.013px] py-[6px] md:py-[12.507px] text-[12px] md:text-[14.591px] font-semibold leading-normal text-black font-geist uppercase";

  // Compute real 0-indexed active index (0..13) for dots and action buttons
  const activeRealIndex =
    currentIndex === 0
      ? voicesData.length - 1
      : currentIndex === extendedVoices.length - 1
        ? 0
        : currentIndex - 1;

  const nextMobile = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      if (prev >= extendedVoices.length - 1) return prev;
      return prev + 1;
    });
  }, []);

  const prevMobile = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      if (prev <= 0) return prev;
      return prev - 1;
    });
  }, []);

  const goToSlide = (realIdx: number) => {
    setIsTransitioning(true);
    setCurrentIndex(realIdx + 1);
  };

  // Auto-play interval: advances every 4 seconds seamlessly
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextMobile();
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, nextMobile]);

  // Seamless infinite wrap reset when transition completes
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || e.propertyName !== "transform") return;
    if (currentIndex === extendedVoices.length - 1) {
      // Reached clone of first slide (index 15) -> seamlessly snap to real first slide (index 1)
      setIsTransitioning(false);
      setCurrentIndex(1);
    } else if (currentIndex === 0) {
      // Reached clone of last slide (index 0) -> seamlessly snap to real last slide (index 14)
      setIsTransitioning(false);
      setCurrentIndex(voicesData.length);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    // If currently at clone boundary, snap instantly before starting drag
    if (currentIndex === extendedVoices.length - 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    } else if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(voicesData.length);
    }

    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setTouchOffset(0);
    isSwiping.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - touchStartX.current;
    const diffY = currentY - touchStartY.current;

    // Determine horizontal swipe
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 8) {
      isSwiping.current = true;
      isDraggingMobile.current = true;
      setTouchOffset(diffX);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const diffX = endX - touchStartX.current;

    if (Math.abs(diffX) > 40) {
      if (diffX < 0) {
        nextMobile();
      } else {
        prevMobile();
      }
    } else {
      // Snap back if threshold not met
      setIsTransitioning(true);
    }

    touchStartX.current = null;
    touchStartY.current = null;
    setTouchOffset(0);

    setTimeout(() => {
      isDraggingMobile.current = false;
      isSwiping.current = false;
      setIsPaused(false);
    }, 200);
  };

  const handleWatchConversation = (e?: React.MouseEvent | React.TouchEvent, speakerId?: number) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    const targetId = speakerId ?? voicesData[activeRealIndex]?.id ?? 1;
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("vota-select-episode", {
          detail: { episodeId: targetId },
        })
      );
      const episodesSection = document.getElementById("episodes");
      if (episodesSection) {
        episodesSection.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.location.hash = "episodes";
      }
    }
  };

  /* ── Desktop Card ── */
  const renderDesktopCard = (item: VoiceItem, key: string) => (
    <div
      key={key}
      onClick={(e) => handleWatchConversation(e, item.id)}
      style={{ transform: "translateZ(0)" }}
      className="
        group 
        relative
        flex 
        flex-col 
        justify-between 
        overflow-hidden 
        bg-[#F5F7FA] 
        cursor-pointer 
        w-[325px]
        min-[1400px]:w-[334px] 
        h-[385px] 
        shrink-0
        rounded-[28px] 
        border-[1.62px] 
        border-[#E0E0E0] 
        shadow-sm
        
        transition-all 
        duration-700 
        ease-[cubic-bezier(0.22,1,0.36,1)]
        will-change-[width,height,transform]
        
        hover:w-[540px]
        min-[1400px]:hover:w-[563px] 
        hover:h-[570px] 
        hover:-translate-y-[92px] 
        hover:shadow-2xl
        hover:z-30
      "
    >
      {/* Active Hover State View - Fixed dimensions prevent text reflow and eliminate jitter/shaking */}
      <div className="
        absolute
        left-0
        top-0
        w-[540px]
        min-[1400px]:w-[563px]
        h-[570px]
        flex 
        flex-col 
        justify-between 
        
        opacity-0 
        pointer-events-none
        
        transition-opacity 
        duration-200 
        ease-out
        
        group-hover:opacity-100
        group-hover:pointer-events-auto
        group-hover:duration-400
        group-hover:delay-150
        
        z-10
        bg-[#F5F7FA]
      ">
        <div
          className="relative h-[290px] overflow-hidden p-[26px] lg:p-[30px] flex flex-col justify-between text-white shrink-0 rounded-[28px] border border-transparent"
        >
          {/* Speaker Pillar SVG Banner */}
          <img
            src={item.bannerImage}
            alt={item.name}
            className="absolute inset-0 h-full w-full object-cover object-top pointer-events-none z-0"
          />

          <div className="flex justify-between items-start z-10">
            <span className="inline-flex h-[36px] md:h-[40px] items-center justify-center rounded-full border border-white/20 bg-white px-4 py-1 text-[11px] md:text-[12px] font-bold leading-normal text-black font-geist uppercase shadow-sm">
              EXPLORE VOTA
            </span>
          </div>

          <div className="relative z-10 max-w-[62%] lg:max-w-[65%] pb-1">
            <h3 className="font-geist text-[21px] lg:text-[25px] font-bold leading-[1.2] text-white drop-shadow-md">{item.name}</h3>
            <div className="mt-1.5 font-geist text-[12px] lg:text-[13px] font-normal leading-snug text-white/90 drop-shadow">
              {item.role.includes(",") ? (
                <>
                  <span className="block">{item.role.split(",")[0].trim()},</span>
                  <span className="block">{item.role.split(",").slice(1).join(",").trim()}</span>
                </>
              ) : (
                <span className="block">{item.role}</span>
              )}
              <span className="block mt-0.5 text-white/80">{item.company}</span>
            </div>
          </div>
        </div>

        <div className="px-[28px] pt-[20px] pb-[12px] flex-1 flex flex-col justify-center">
          {item.bulletPoints && item.bulletPoints.length > 0 ? (
            <ul className="flex flex-col gap-3.5 font-geist text-[#555]">
              {item.bulletPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[16px] lg:text-[18px] font-normal leading-[1.45]">
                  <span className="text-[#777] text-[18px] leading-[1.1] select-none shrink-0">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-geist text-[20px] font-normal leading-[150%] text-[#666]">
              "{item.quote}"
            </p>
          )}
        </div>

        <div className="h-[90px] shrink-0 border-t-[1.6px] border-[#E0E0E0] mx-[28px] flex items-center">
          <a
            href="#episodes"
            onClick={(e) => handleWatchConversation(e, item.id)}
            className="flex items-center gap-2 font-geist text-[15.5px] font-semibold leading-normal text-[#159A99] uppercase transition-all hover:gap-3 cursor-pointer"
          >
            WATCH CONVERSATION
            <img src={arrowRightTeal} alt="Arrow Right" className="h-[18px] w-[18px] object-contain" />
          </a>
        </div>
      </div>

      {/* Normal View - Locked to resting card width (334px) so text NEVER reflows or shakes during shrink/expand */}
      <div className="
        absolute
        left-0
        top-0
        w-[325px]
        min-[1400px]:w-[334px]
        h-[385px]
        flex 
        flex-col 
        justify-between
        p-7
        xl:p-8
        
        opacity-100 
        pointer-events-auto
        
        transition-opacity 
        duration-300 
        ease-in-out
        delay-100
        
        group-hover:opacity-0
        group-hover:pointer-events-none
        group-hover:duration-200
        group-hover:delay-0
        
        z-0
      ">
        <div>
          <span className={badgeClasses}>
            EXPLORE VOTA
          </span>
        </div>

        {/* Content Block: Uniform horizontal baseline alignment across 2-line & 3-line cards */}
        <div className="mt-auto flex flex-col gap-2.5 xl:gap-3">
          <div className="flex items-center justify-between gap-3 min-h-[54px] xl:min-h-[58px]">
            <h3 className="font-geist text-[22px] xl:text-[24px] font-normal leading-[1.2] text-black">
              {item.name}
            </h3>
            <div className="w-[72px] h-[72px] xl:w-[76px] xl:h-[76px] rounded-full bg-[#159A99] overflow-hidden shrink-0 shadow-md flex items-center justify-center">
              <img
                src={item.avatar}
                alt={item.name}
                className={`w-full h-full object-cover ${item.id === 6 ? "scale-125 origin-center" : ""
                  }`}
              />
            </div>
          </div>

          <div className="min-h-[72px] xl:min-h-[76px] font-geist text-[14px] xl:text-[15px] font-light leading-[1.35] text-[#666666] flex flex-col justify-end">
            {item.role.includes(",") ? (
              <>
                <span className="block">{item.role.split(",")[0].trim()},</span>
                <span className="block">{item.role.split(",").slice(1).join(",").trim()}</span>
              </>
            ) : (
              <span className="block">{item.role}</span>
            )}
            <span className="block text-[#888] font-normal text-[13px] xl:text-[14px] mt-0.5">{item.company}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="speakers" className="w-full py-16 md:py-20 lg:py-24 overflow-hidden bg-white px-6 sm:px-10 md:px-12 lg:px-[8.7%]">
      <div className="mx-auto w-full max-w-[1600px]">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-16">
          <span className="inline-flex items-center rounded-[123.833px] border-[1.238px] border-[rgba(21,154,153,0.20)] bg-[rgba(21,154,153,0.10)] px-[14.86px] py-[7.43px] font-geist text-[12px] sm:text-[13.62px] font-semibold leading-[100%] tracking-normal uppercase text-[#159A99] mb-3">
            AN INDUSTRY-LED VIDEO SERIES BY CAREER141
          </span>
          <h2 className="text-center font-cal font-normal text-[26px] sm:text-[36px] md:text-[50px] leading-[110%] tracking-normal text-[#262626] capitalize">
            Meet The Voices Behind The Industry
          </h2>
        </div>

        {/* ── DESKTOP VIEW: Pure CSS Infinite Marquee Track (Only on Desktop 1367px+) ── */}
        <div className="hidden min-[1367px]:block marquee-container pt-24 pb-8">
          <div className="marquee-track flex items-center">
            <div className="flex shrink-0 items-center gap-6 pr-6">
              {listSet.map((item, index) => renderDesktopCard(item, `set1-${item.id}-${index}`))}
            </div>
            <div className="flex shrink-0 items-center gap-6 pr-6" aria-hidden="true">
              {listSet.map((item, index) => renderDesktopCard(item, `set2-${item.id}-${index}`))}
            </div>
          </div>
        </div>

        {/* ── MOBILE & TABLET / IPAD VIEW: Expanded Card Infinite Loop Carousel (< 1367px) ── */}
        <div
          className="block min-[1367px]:hidden relative w-full pt-2 pb-6 select-none touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Outer Card Window */}
          <div className="relative w-full max-w-[480px] sm:max-w-[620px] md:max-w-[780px] min-[900px]:max-w-[880px] lg:max-w-[1060px] mx-auto overflow-hidden rounded-[28px] border-[1.5px] border-[#E0E0E0] shadow-md bg-[#F5F7FA]">
            {/* Smooth Infinite Sliding Track */}
            <div
              onTransitionEnd={handleTransitionEnd}
              className="flex w-full items-stretch"
              style={{
                transform: `translate3d(calc(-${currentIndex * 100}% + ${touchOffset}px), 0, 0)`,
                transition: isSwiping.current
                  ? "none"
                  : isTransitioning
                    ? "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)"
                    : "none",
                willChange: "transform",
              }}
            >
              {extendedVoices.map((speaker, index) => (
                <div
                  key={`mobile-speaker-card-${speaker.id}-${index}`}
                  className="w-full shrink-0 flex flex-col justify-between overflow-hidden cursor-pointer"
                  onClick={(e) => {
                    if (!isDraggingMobile.current) {
                      handleWatchConversation(e, speaker.id);
                    }
                  }}
                >
                  {/* Top Banner with Pillar SVG */}
                  <div
                    className="relative h-[220px] sm:h-[260px] md:h-[290px] min-[900px]:h-[320px] lg:h-[350px] overflow-hidden p-5 sm:p-6 md:p-8 flex flex-col justify-between text-white shrink-0 rounded-[24px]"
                  >
                    {/* Speaker Pillar SVG banner image */}
                    <img
                      src={speaker.bannerImage}
                      alt={speaker.name}
                      className="absolute inset-0 h-full w-full object-cover object-top max-[760px]:object-[85%_top] pointer-events-none z-0"
                    />

                    {/* Badge */}
                    <div className="flex justify-between items-start z-10">
                      <span className="inline-flex items-center rounded-full border border-white/20 bg-white px-3.5 py-1 text-[11px] sm:text-[12px] font-bold uppercase text-black font-geist shadow-sm">
                        EXPLORE VOTA
                      </span>
                    </div>

                    {/* Speaker Name & Role on Left Half */}
                    <div className="relative z-10 max-w-[62%] sm:max-w-[58%] pb-1">
                      <h3 className="mb-1 font-geist text-[17px] sm:text-[21px] md:text-[25px] min-[900px]:text-[28px] font-bold leading-[1.2] text-white drop-shadow-md">
                        {speaker.name}
                      </h3>
                      <div className="font-geist text-[11.5px] sm:text-[13px] md:text-[14.5px] min-[900px]:text-[15.5px] font-normal leading-snug text-white/90 mt-1 drop-shadow">
                        {speaker.role.includes(",") ? (
                          <>
                            <span className="block">{speaker.role.split(",")[0].trim()},</span>
                            <span className="block">{speaker.role.split(",").slice(1).join(",").trim()}</span>
                          </>
                        ) : (
                          <span className="block">{speaker.role}</span>
                        )}
                        <span className="block mt-0.5 text-white/80">{speaker.company}</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle Quote / Bullet Section */}
                  <div className="px-6 sm:px-8 md:px-10 py-5 sm:py-7 flex-1 flex flex-col justify-center min-h-[140px] sm:min-h-[160px]">
                    {speaker.bulletPoints && speaker.bulletPoints.length > 0 ? (
                      <ul className="flex flex-col gap-3 font-geist text-[#555]">
                        {speaker.bulletPoints.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-[13.5px] sm:text-[15px] md:text-[16.5px] font-normal leading-[1.45]">
                            <span className="text-[#777] text-[16px] leading-[1.1] select-none shrink-0">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="font-geist text-[15px] sm:text-[17px] md:text-[19px] font-normal leading-[1.55] text-[#555]">
                        "{speaker.quote}"
                      </p>
                    )}
                  </div>

                  {/* Bottom Action Section */}
                  <div className="h-[58px] sm:h-[66px] md:h-[72px] shrink-0 border-t border-[#E0E0E0] mx-6 sm:mx-8 md:mx-10 flex items-center">
                    <a
                      href="#episodes"
                      onClick={(e) => handleWatchConversation(e, speaker.id)}
                      className="flex items-center gap-2 font-geist text-[13px] sm:text-[14.5px] md:text-[15.5px] font-semibold uppercase text-[#159A99] tracking-wide transition-all hover:gap-3 cursor-pointer"
                    >
                      WATCH CONVERSATION
                      <img src={arrowRightTeal} alt="" className="h-3.5 w-3.5 object-contain" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Dots & Arrows (Dynamic 5-Dot Window) */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              type="button"
              onClick={prevMobile}
              aria-label="Previous speaker"
              className="h-9 w-9 rounded-full bg-[#F2F2F2] border border-[#D6D6D6] flex items-center justify-center text-black active:scale-95 transition-transform cursor-pointer"
            >
              <svg className="w-4 h-4 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="flex items-center gap-1.5 h-3">
              {(() => {
                const total = voicesData.length;
                const maxVisible = 5;
                const half = Math.floor(maxVisible / 2);
                let start = activeRealIndex - half;
                if (start < 0) start = 0;
                if (start + maxVisible > total) start = Math.max(0, total - maxVisible);
                const visibleIndices = Array.from({ length: Math.min(total, maxVisible) }, (_, i) => start + i);

                return visibleIndices.map((dotIdx) => {
                  const isActive = activeRealIndex === dotIdx;
                  const isEdgeSmall =
                    (dotIdx === start && start > 0) ||
                    (dotIdx === start + maxVisible - 1 && start + maxVisible < total);

                  return (
                    <button
                      key={`dot-${dotIdx}`}
                      type="button"
                      onClick={() => goToSlide(dotIdx)}
                      aria-label={`Go to slide ${dotIdx + 1}`}
                      className={`rounded-full transition-all duration-300 cursor-pointer ${isActive
                        ? "w-6 h-2 bg-[#159A99]"
                        : isEdgeSmall
                          ? "w-1.5 h-1.5 bg-[#D6D6D6]"
                          : "w-2 h-2 bg-[#D6D6D6] hover:bg-[#B0B0B0]"
                        }`}
                    />
                  );
                });
              })()}
            </div>

            <button
              type="button"
              onClick={nextMobile}
              aria-label="Next speaker"
              className="h-9 w-9 rounded-full bg-[#F2F2F2] border border-[#D6D6D6] flex items-center justify-center text-black active:scale-95 transition-transform cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}