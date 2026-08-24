"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const R2_MEDIA_URL = (process.env.NEXT_PUBLIC_R2_MEDIA_URL || "").replace(/\/+$/, "");

const arrowRightTeal = `${R2_MEDIA_URL}/icons/arrow-right-teal.svg`;

interface VoiceItem {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  bannerImage: string;
}

const voicesData: VoiceItem[] = [
  {
    id: 1,
    name: 'Shiromi de Alwis',
    role: 'Director Talent & Culture',
    company: 'WSO2',
    quote: 'Fostering continuous learning and agile mindsets enables people to excel in hyper-growth tech environments.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    bannerImage: `${R2_MEDIA_URL}/images/Pillar-01.png`,
  },
  {
    id: 2,
    name: 'James Vijayakumar',
    role: 'Director Talent & Culture',
    company: 'WSO2',
    quote: 'Empowering teams with psychological safety drives breakthrough innovations and high retention.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    bannerImage: `${R2_MEDIA_URL}/images/Pillar-01.png`,
  },
  {
    id: 3,
    name: 'Nisha de Alwis',
    role: 'Director Talent & Culture',
    company: 'WSO2',
    quote: 'Creating inclusive workspaces allows talent to bring their authentic self to work.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    bannerImage: `${R2_MEDIA_URL}/images/Pillar-01.png`,
  },
  {
    id: 4,
    name: 'Mr. Ken Vijayakumar',
    role: 'Senior General Manager, Human Resource & Sustainability',
    company: 'A. Baur & Co. (Pvt) Ltd',
    quote: 'Attracting globally-minded engineering talent means building a culture of radical autonomy from day one.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    bannerImage: `${R2_MEDIA_URL}/images/Pillar-01.png`,
  }
];

export default function VoicesSlider() {
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const listSet = [...voicesData, ...voicesData];

  const badgeClasses = "inline-flex h-[38px] md:h-[51.968px] items-center justify-center gap-[6px] md:gap-[8.338px] rounded-[25.558px] border-[1.042px] border-[#D6D6D6] bg-[#F2F2F2] px-[16px] md:px-[25.013px] py-[6px] md:py-[12.507px] text-[12px] md:text-[14.591px] font-semibold leading-normal text-black font-geist uppercase";

  const prevMobile = useCallback(() => {
    setDirection(-1);
    setActiveMobileIndex((prev) => (prev === 0 ? voicesData.length - 1 : prev - 1));
  }, []);

  const nextMobile = useCallback(() => {
    setDirection(1);
    setActiveMobileIndex((prev) => (prev === voicesData.length - 1 ? 0 : prev + 1));
  }, []);

  const goToSlide = (idx: number) => {
    setDirection(idx > activeMobileIndex ? 1 : -1);
    setActiveMobileIndex(idx);
  };

  /* ── Auto-advance on Mobile & Tablet (4s interval, pauses on touch) ── */
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextMobile();
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, nextMobile]);

  /* ── Desktop Card ── */
  const renderDesktopCard = (item: VoiceItem, key: string) => (
    <div
      key={key}
      className="
        group 
        relative
        flex 
        flex-col 
        justify-between 
        overflow-hidden 
        bg-[#F5F7FA] 
        cursor-pointer 
        w-[334px] 
        h-[510px] 
        shrink-0
        rounded-[29.98px] 
        border-[1.62px] 
        border-[#E0E0E0] 
        shadow-sm
        
        transition-all 
        duration-[700ms] 
        ease-[cubic-bezier(0.25,1,0.5,1)]
        
        hover:w-[563px] 
        hover:h-[598px] 
        hover:-translate-y-[88px] 
        hover:shadow-2xl
        hover:z-30
      "
    >
      {/* Active Hover State View */}
      <div className="
        absolute
        inset-0
        flex 
        flex-col 
        h-full 
        justify-between 
        w-full
        
        opacity-0 
        group-hover:opacity-100
        
        transition-opacity 
        duration-[600ms] 
        ease-in-out 
        delay-[200ms]
        
        z-10
        bg-[#F5F7FA]
        
        pointer-events-none
        group-hover:pointer-events-auto
      ">
        <div className="relative h-[310px] overflow-hidden bg-gradient-to-r from-teal-700 via-teal-600 to-teal-400 p-[32px] flex flex-col justify-between text-white shrink-0 rounded-[30px] border border-transparent">
          {/* Subtle dark gradient overlay to ensure text is always high contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/60 via-teal-800/30 to-transparent pointer-events-none z-[1]" />

          <div className="flex justify-between items-start z-10">
            <span className={badgeClasses}>
              EXPLORE VOTA
            </span>
          </div>

          <img
            src={item.bannerImage}
            alt={item.name}
            className="absolute right-0 bottom-0 h-[115%] w-auto max-w-[55%] object-cover object-right-bottom pointer-events-none opacity-95"
          />

          <div className="relative z-10 max-w-[58%]">
            <h3 className="mb-2 font-geist text-[35.629px] font-normal leading-normal text-white">{item.name}</h3>
            <p className="mt-1.5 font-geist text-[22.673px] font-light leading-[150%] text-white">
              {item.role},<br />{item.company}
            </p>
          </div>
        </div>

        <div className="px-[32px] pt-[32px] pb-[20px] flex-1 flex flex-col justify-center">
          <p className="font-geist text-[22px] font-normal leading-[150%] text-[#666]">
            "{item.quote}"
          </p>
        </div>

        <div className="h-[111px] shrink-0 border-t-[1.6px] border-[#E0E0E0] mx-[32px] flex items-center">
          <a href="#episodes" className="flex items-center gap-2 font-geist text-[16.513px] font-semibold leading-normal text-[#159A99] uppercase transition-all hover:gap-3">
            WATCH CONVERSATION
            <img src={arrowRightTeal} alt="Arrow Right" className="h-[18px] w-[18px] object-contain" />
          </a>
        </div>
      </div>

      {/* Normal View */}
      <div className="
        absolute
        inset-0
        flex 
        h-full 
        flex-col 
        p-8
        
        opacity-100 
        group-hover:opacity-0
        
        transition-opacity 
        duration-[500ms] 
        ease-in-out
        
        z-0
        
        pointer-events-auto
        group-hover:pointer-events-none
      ">
        <div>
          <span className={badgeClasses}>
            EXPLORE VOTA
          </span>
        </div>

        <div className="absolute inset-x-8 top-[250px]">
          <div className="flex items-center justify-between gap-2">
            <h3 className="line-clamp-2 font-geist text-[35.629px] font-normal leading-normal text-black">
              {item.name}
            </h3>
            <img
              src={item.avatar}
              alt={item.name}
              className="w-[84px] h-[84px] rounded-full object-cover flex-shrink-0"
            />
          </div>
        </div>

        <p className="absolute inset-x-8 bottom-[84px] line-clamp-2 font-geist text-[22.673px] font-light leading-[150%] text-[#666]">
          {item.role} · {item.company}
        </p>
      </div>
    </div>
  );

  const currentMobileSpeaker = voicesData[activeMobileIndex];

  return (
    <section id="speakers" className="w-full py-12 md:py-16 overflow-hidden bg-white">
      {/* Header Section */}
      <div className="text-center mb-8 md:mb-16 px-4">
        <span className="inline-flex items-center rounded-[123.833px] border-[1.238px] border-[rgba(21,154,153,0.20)] bg-[rgba(21,154,153,0.10)] px-[14.86px] py-[7.43px] font-geist text-[12px] md:text-[13.622px] font-semibold leading-normal uppercase text-[#159A99] mb-3">
          AN INDUSTRY-LED VIDEO SERIES BY CAREER141
        </span>
        <h2 className="text-center font-geist text-[28px] sm:text-[36px] md:text-[46px] font-extrabold leading-[110%] text-[#262626] capitalize">
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

      {/* ── MOBILE & IPAD / TABLET VIEW: Expanded Card Carousel (< 1367px) ── */}
      <div
        className="block min-[1367px]:hidden relative w-full px-4 pt-2 pb-6 select-none touch-pan-y"
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => {
          setTimeout(() => setIsPaused(false), 2500);
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative w-full max-w-[380px] sm:max-w-[440px] md:max-w-[480px] mx-auto min-h-[480px] flex items-center justify-center overflow-hidden">
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.div
              key={`mobile-card-${currentMobileSpeaker.id}`}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -40 || info.velocity.x < -200) {
                  nextMobile();
                } else if (info.offset.x > 40 || info.velocity.x > 200) {
                  prevMobile();
                }
              }}
              className="w-full flex flex-col justify-between overflow-hidden bg-[#F5F7FA] rounded-[28px] border-[1.5px] border-[#E0E0E0] shadow-md cursor-grab active:cursor-grabbing"
            >
              {/* Top Banner with Teal Gradient & Clear Side-by-Side Speaker Image Layout */}
              <div className="relative h-[215px] sm:h-[235px] md:h-[255px] overflow-hidden bg-gradient-to-r from-teal-700 via-teal-600 to-teal-400 p-5 sm:p-6 md:p-7 flex flex-col justify-between text-white shrink-0 rounded-[24px]">
                {/* Left gradient shading to guarantee 100% crystal-clear readable text */}
                <div className="absolute inset-0 bg-gradient-to-r from-teal-900/65 via-teal-800/35 to-transparent pointer-events-none z-[1]" />

                {/* Badge */}
                <div className="flex justify-between items-start z-10">
                  <span className="inline-flex items-center rounded-full border border-white/20 bg-[#F2F2F2] px-3.5 py-1 text-[11px] font-semibold uppercase text-black font-geist shadow-sm">
                    EXPLORE VOTA
                  </span>
                </div>

                {/* Speaker Photo on Right Half (Not zoomed over text) */}
                <img
                  src={currentMobileSpeaker.bannerImage}
                  alt={currentMobileSpeaker.name}
                  className="absolute right-0 bottom-0 h-[105%] w-auto max-w-[50%] object-cover object-right-bottom pointer-events-none z-0"
                />

                {/* Speaker Name & Role on Left Half */}
                <div className="relative z-10 max-w-[56%]">
                  <h3 className="mb-1 font-geist text-[22px] sm:text-[25px] md:text-[28px] font-medium leading-tight text-white drop-shadow-sm">
                    {currentMobileSpeaker.name}
                  </h3>
                  <p className="font-geist text-[13px] sm:text-[14px] md:text-[15px] font-light leading-snug text-white/95 mt-1">
                    {currentMobileSpeaker.role},<br />{currentMobileSpeaker.company}
                  </p>
                </div>
              </div>

              {/* Middle Quote Section */}
              <div className="px-6 sm:px-7 py-5 sm:py-6 flex-1 flex flex-col justify-center">
                <p className="font-geist text-[15px] sm:text-[16px] md:text-[17px] font-normal leading-[1.55] text-[#555]">
                  "{currentMobileSpeaker.quote}"
                </p>
              </div>

              {/* Bottom Action Section */}
              <div className="h-[58px] sm:h-[64px] shrink-0 border-t border-[#E0E0E0] mx-6 sm:mx-7 flex items-center">
                <a
                  href="#episodes"
                  className="flex items-center gap-2 font-geist text-[13px] sm:text-[14px] font-semibold uppercase text-[#159A99] tracking-wide transition-all hover:gap-3"
                >
                  WATCH CONVERSATION
                  <img src={arrowRightTeal} alt="" className="h-3.5 w-3.5 object-contain" />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Navigation Dots & Arrows */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            onClick={prevMobile}
            aria-label="Previous speaker"
            className="h-9 w-9 rounded-full bg-[#F2F2F2] border border-[#D6D6D6] flex items-center justify-center text-black active:scale-95 transition-transform"
          >
            <svg className="w-4 h-4 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="flex items-center gap-1.5">
            {voicesData.map((_, dotIdx) => (
              <button
                key={`dot-${dotIdx}`}
                onClick={() => goToSlide(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeMobileIndex === dotIdx ? "w-6 bg-[#159A99]" : "w-2 bg-[#D6D6D6]"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextMobile}
            aria-label="Next speaker"
            className="h-9 w-9 rounded-full bg-[#F2F2F2] border border-[#D6D6D6] flex items-center justify-center text-black active:scale-95 transition-transform"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}