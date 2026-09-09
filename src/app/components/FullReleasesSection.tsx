"use client";

import React, { useRef, useState } from "react";

const R2_MEDIA_URL = (process.env.NEXT_PUBLIC_R2_MEDIA_URL || "").replace(/\/+$/, "");
const SPEAKER_SECTION_IMG_BASE = "https://talentsuite.career141.com/images/speakerSection";
const FULL_RELEASE_IMG_BASE = "https://talentsuite.career141.com/images/fullRelease";
const reelBackground = `${R2_MEDIA_URL}/images/reelThumbnail/reelthumbnail.png`;

type Episode = {
  id: number;
  number: string;
  guest: string;
  role: string;
  company: string;
  reels: string[];
  reelDurations?: string[];
  videoUrl?: string;
};

const episodes: Episode[] = [
  {
    id: 1,
    number: "01",
    guest: "MR. PATRICK PEREIRA",
    role: "Vice President Learning & Development",
    company: "Aitken Spence Hotels",
    videoUrl: `${R2_MEDIA_URL}/videos/Mr.%20Pratrick%20Pereira.mp4`,
    reels: [
      `${R2_MEDIA_URL}/videos/reels/01%20Mr%20Patrick%20Pereira.mp4`,
      `${R2_MEDIA_URL}/videos/reels/02%20Mr%20Patrick%20Pereira.mp4`,
    ],
    reelDurations: ["1 MIN", "45 SEC"],
  },
  {
    id: 2,
    number: "02",
    guest: "MR. KEN VIJAYAKUMAR",
    role: "Senior General Manager, Human Resource & Sustainability",
    company: "A. Baur & Co. (Pvt) Ltd",
    videoUrl: `${R2_MEDIA_URL}/videos/Mr.Ken.mp4`,
    reels: [
      `${R2_MEDIA_URL}/videos/reels/01%20Mr.%20Ken.mp4`,
      `${R2_MEDIA_URL}/videos/reels/02%20Mr.%20Ken.mp4`,
    ],
    reelDurations: ["50 SEC", "55 SEC"],
  },
  {
    id: 3,
    number: "03",
    guest: "MR. CHAMILA C PERERA",
    role: "Former Managing Director, Head of Human Resources",
    company: "HSBC Malaysia",
    videoUrl: `${R2_MEDIA_URL}/videos/Mr.%20Chamila%20C%20Perera.mp4`,
    reels: [
      `${R2_MEDIA_URL}/videos/reels/01%20Mr.%20Chamila%20C%20Perera.mp4`,
      `${R2_MEDIA_URL}/videos/reels/02%20Mr.%20Chamila%20C%20Perera.mp4`,
    ],
    reelDurations: ["45 SEC", "1 MIN"],
  },
  {
    id: 4,
    number: "04",
    guest: "MS. THRIMUTHI DHANUSHKA",
    role: "Group Deputy General Manager, Human Resource & Administration",
    company: "Ideal Group",
    videoUrl: `${R2_MEDIA_URL}/videos/Ms.Thrimuthi%20Dhanushka.mp4`,
    reels: [
      `${R2_MEDIA_URL}/videos/reels/01%20Ms.Thrimuthi.mp4`,
      `${R2_MEDIA_URL}/videos/reels/02%20Ms.Thrimuthi.mp4`,
    ],
    reelDurations: ["1 MIN", "40 SEC"],
  },
  {
    id: 5,
    number: "05",
    guest: "MS. SURANI AMARASINGHE",
    role: "Director, Country People Partnering, Sri Lanka",
    company: "LSEG (London Stock Exchange Group)",
    videoUrl: `${R2_MEDIA_URL}/videos/Ms.%20Surani%20Amarasinghe.mp4`,
    reels: [
      `${R2_MEDIA_URL}/videos/reels/01%20Ms.%20Surani.mp4`,
      `${R2_MEDIA_URL}/videos/reels/02%20Ms.%20Surani.mp4`,
    ],
    reelDurations: ["55 SEC", "50 SEC"],
  },
  {
    id: 6,
    number: "06",
    guest: "MR. ARSHAQ FARALLY",
    role: "Chief People Officer, Sri Lanka",
    company: "Daraz",
    videoUrl: `${R2_MEDIA_URL}/videos/Mr.Arshaq%20Farally%2002.mp4`,
    reels: [
      `${R2_MEDIA_URL}/videos/reels/01%20Mr.%20Arshaq.mp4`,
      `${R2_MEDIA_URL}/videos/reels/02%20Mr.%20Arshaq.mp4`,
    ],
    reelDurations: ["45 SEC", "1 MIN"],
  },
  {
    id: 7,
    number: "07",
    guest: "MR. DANUSHKA SENETH",
    role: "Head of Human Resources / AGM",
    company: "Janashakthi Insurance PLC",
    videoUrl: `${R2_MEDIA_URL}/videos/Mr.%20Danushka.mp4`,
    reels: [
      `${R2_MEDIA_URL}/videos/reels/01%20Mr.%20Danushka.mp4`,
      `${R2_MEDIA_URL}/videos/reels/02%20Mr.%20Danushka.mp4`,
    ],
    reelDurations: ["1 MIN", "45 SEC"],
  },
  {
    id: 8,
    number: "08",
    guest: "MS. HASANTHI DE SARAM",
    role: "Director / Senior HR Consultant",
    company: "(Former Director HR - Asiri Health)",
    videoUrl: `${R2_MEDIA_URL}/videos/Ms.%20Hasanthi.mp4`,
    reels: [
      `${R2_MEDIA_URL}/videos/reels/Ms.%20Hasanthi.mp4`,
      `${R2_MEDIA_URL}/videos/reels/2%20Ms.%20Hasanthi.mp4`,
    ],
    reelDurations: ["50 SEC", "55 SEC"],
  },
  {
    id: 9,
    number: "09",
    guest: "MR. ASHAN RANSILIGE",
    role: "Chief Executive Officer",
    company: "Link Natural Products (Pvt.) Ltd",
    videoUrl: `${R2_MEDIA_URL}/videos/Mr.%20Ashan%20Ransilige%2002.mp4`,
    reels: [
      `${R2_MEDIA_URL}/videos/reels/01%20Mr.%20Ashan.mp4`,
      `${R2_MEDIA_URL}/videos/reels/02%20Mr.%20Ashan.mp4`,
    ],
    reelDurations: ["45 SEC", "1 MIN"],
  },
  {
    id: 10,
    number: "10",
    guest: "MR. INDIKA RANATHUNGA",
    role: "Chief Operating Officer",
    company: "Allied Commercial Fertilizers",
    videoUrl: `${R2_MEDIA_URL}/videos/Mr.Indiaka%20Ranathunga%2002.mp4`,
    reels: [
      `${R2_MEDIA_URL}/videos/reels/01%20Mr.%20Indika.mp4`,
      `${R2_MEDIA_URL}/videos/reels/02%20Mr.%20Indika.mp4`,
    ],
    reelDurations: ["1 MIN", "50 SEC"],
  },
  {
    id: 11,
    number: "11",
    guest: "MS. CHAMINDRA PERERA",
    role: "Human Resources Director",
    company: "GRI Sri Lanka",
    videoUrl: `${R2_MEDIA_URL}/videos/Ms.%20Chamindra.mp4`,
    reels: [
      `${R2_MEDIA_URL}/videos/reels/01%20Ms%20.%20Chamindra.mp4`,
      `${R2_MEDIA_URL}/videos/reels/02%20Ms%20.%20Chamindra.mp4`,
    ],
    reelDurations: ["55 SEC", "45 SEC"],
  },
  {
    id: 12,
    number: "12",
    guest: "MS. CHANDIMA BAMBARENDA",
    role: "Group Head of Human Resources",
    company: "Pyramid Wilmar Group",
    videoUrl: `${R2_MEDIA_URL}/videos/Ms.%20Chandima.mp4`,
    reels: [
      `${R2_MEDIA_URL}/videos/reels/01%20Ms.%20Chandima.mp4`,
      `${R2_MEDIA_URL}/videos/reels/02%20Chandima.mp4`,
    ],
    reelDurations: ["45 SEC", "1 MIN"],
  },
  {
    id: 13,
    number: "13",
    guest: "MR. GEHAN SAMUEL",
    role: "Manager of Human Resources Development",
    company: "MAS Holdings Silueta",
    videoUrl: `${R2_MEDIA_URL}/videos/Mr.%20Gehan.mp4`,
    reels: [
      `${R2_MEDIA_URL}/videos/reels/01%20Mr.%20Gehan.mp4`,
      `${R2_MEDIA_URL}/videos/reels/02%20Mr.%20Gehan.mp4`,
    ],
    reelDurations: ["1 MIN", "55 SEC"],
  },
  {
    id: 14,
    number: "14",
    guest: "MR. KANISHKA MUNASINGHE",
    role: "General Manager, Human Resources",
    company: "Port City BPO",
    videoUrl: `${R2_MEDIA_URL}/videos/Mr.%20Kanishka.mp4`,
    reels: [
      `${R2_MEDIA_URL}/videos/reels/01%20Mr.%20Kanishka.mp4`,
      `${R2_MEDIA_URL}/videos/reels/02%20Mr.%20Kanishka.mp4`,
    ],
    reelDurations: ["50 SEC", "45 SEC"],
  },
];

export default function FullReleasesSection() {
  const [selectedEpisode, setSelectedEpisode] = useState(episodes[0]);
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const reelSliderRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const touchStartTime = useRef<number>(0);
  const isSwiping = useRef<boolean>(false);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPaused(false);
    } else {
      videoRef.current.pause();
      setIsPaused(true);
    }
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const maxScroll = scrollHeight - clientHeight;
    if (maxScroll > 0) {
      setScrollProgress(scrollTop / maxScroll);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = Date.now();
    isSwiping.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const diffX = Math.abs(e.touches[0].clientX - touchStartX.current);
    const diffY = Math.abs(e.touches[0].clientY - touchStartY.current);
    if (diffX > 10 && diffX > diffY) {
      isSwiping.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    const deltaTime = Date.now() - touchStartTime.current;

    const isHorizontalSwipe =
      Math.abs(deltaX) > Math.abs(deltaY) &&
      (Math.abs(deltaX) > 35 || (Math.abs(deltaX) > 20 && deltaTime < 300));

    if (isHorizontalSwipe) {
      if (deltaX < 0 && activeReelIndex === 0) {
        scrollToReel(1);
      } else if (deltaX > 0 && activeReelIndex === 1) {
        scrollToReel(0);
      }
    }
  };

  const handleReelScroll = () => {
    if (!reelSliderRef.current) return;
    const { scrollLeft, clientWidth } = reelSliderRef.current;
    if (clientWidth === 0) return;
    const newIndex = Math.round(scrollLeft / clientWidth);
    if (newIndex !== activeReelIndex && (newIndex === 0 || newIndex === 1)) {
      setActiveReelIndex(newIndex);
    }
  };

  const scrollToReel = (index: number) => {
    setActiveReelIndex(index);
    if (reelSliderRef.current) {
      const width = reelSliderRef.current.clientWidth;
      reelSliderRef.current.scrollTo({
        left: index * width,
        behavior: "smooth",
      });
    }
  };


  const selectEpisode = (episode: Episode) => {
    setSelectedEpisode(episode);
    scrollToReel(0);
    setIsPlaying(false);
    setIsPaused(false);
  };

  const currentReels = selectedEpisode.reels && selectedEpisode.reels.length > 0
    ? selectedEpisode.reels
    : [selectedEpisode.videoUrl || "", selectedEpisode.videoUrl || ""];

  return (
    <section
      id="full-releases"
      className="w-full overflow-hidden bg-[#F5F7FA] px-6 py-20 text-[#262626] md:px-12 lg:px-[8.7%] lg:py-28"
    >
      {/* Heading */}
      <div className="mb-12 text-center lg:mb-16">
        <span className="mb-3 inline-flex items-center rounded-full border border-[#159A99]/20 bg-[#159A99]/10 px-4 py-1.5 font-geist text-xs font-semibold uppercase tracking-wider text-[#159A99]">
          Full Releases
        </span>

        <h2 className="mt-4 font-geist text-3xl font-bold tracking-tight text-[#262626] md:text-4xl lg:text-[46px]">
          Watch. Learn. Be Inspired.
        </h2>
      </div>

      {/* Main Container */}
      <div className="mx-auto flex w-full max-w-[1595px] flex-col-reverse gap-6 min-[1100px]:gap-8 min-[1100px]:flex-row min-[1100px]:items-start">
        {/* Episode Playlist with Custom Scroll Indicator */}
        <div className="relative flex h-[441px] sm:h-[660px] w-full min-[1100px]:w-[688px] max-w-full overflow-hidden rounded-[24px] sm:rounded-[30px] bg-[#F5F7FA]">
          {/* Custom Scrollbar Track */}
          <div className="relative my-3 sm:my-4 ml-2.5 sm:ml-4 flex h-[calc(100%-24px)] sm:h-[calc(100%-32px)] w-[4px] sm:w-[5px] shrink-0 rounded-full bg-[#E2E5E8] overflow-hidden">
            {/* Custom Black Scroll Thumb */}
            <div
              className="absolute w-full rounded-full bg-black transition-transform duration-75 ease-out"
              style={{
                height: "80px",
                top: `${scrollProgress * 100}%`,
                transform: `translateY(-${scrollProgress * 100}%)`,
              }}
            />
          </div>

          {/* Scrollable List Container */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="h-full w-full overflow-y-auto px-2.5 sm:px-6 py-1.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex flex-col gap-3 sm:gap-4">
              {episodes.map((episode) => {
                const isSelected = selectedEpisode.id === episode.id;

                return (
                  <button
                    key={episode.id}
                    type="button"
                    onClick={() => selectEpisode(episode)}
                    aria-pressed={isSelected}
                    className={[
                      `
                        group
                        relative
                        flex
                        h-[135px]
                        sm:h-[150px]
                        w-full
                        shrink-0
                        items-center
                        overflow-hidden
                        rounded-[26px]
                        sm:rounded-[30px]
                        bg-white
                        px-4
                        sm:px-6
                        text-left
                        cursor-pointer
                        transition-all
                        duration-300
                        ease-out
                        hover:-translate-y-1
                        active:scale-[0.985]
                        opacity-100
                      `,
                      isSelected
                        ? "border-[1.62px] border-[#159A99]/50 shadow-[0_12px_28px_rgba(21,154,153,0.08),0_4px_12px_rgba(0,0,0,0.04)]"
                        : "border-[1.62px] border-[#EAECEE] hover:border-[#159A99]/40 hover:shadow-[0_12px_24px_-4px_rgba(0,0,0,0.06)]",
                    ].join(" ")}
                  >
                    {/* Episode Badge (Top-Left) */}
                    <span
                      className={[
                        "absolute left-4 sm:left-6 top-[18px] sm:top-[22px] z-10 rounded-[4px] px-2 py-0.5 text-[7.5px] sm:text-[8px] font-bold uppercase tracking-wide text-white transition-colors duration-300 pointer-events-none",
                        isSelected ? "bg-[#159A99]" : "bg-[#B6B8BB] group-hover:bg-[#159A99]",
                      ].join(" ")}
                    >
                      Episode
                    </span>

                    {/* Giant Partially-Hidden Number (Bottom-Left - Cropped at bottom border like original) */}
                    <p
                      className={[
                        "absolute -bottom-[20px] left-2.5 sm:left-4 z-0 font-geist text-[86px] font-bold leading-none tracking-[-0.08em] transition-colors duration-300 select-none pointer-events-none",
                        isSelected ? "text-[#202020]" : "text-[#E2E3E5] group-hover:text-[#CBD1D6]",
                      ].join(" ")}
                    >
                      {episode.number}
                    </p>

                    {/* Guest & Role Info (Right-Aligned with plenty of room) */}
                    <div className="relative z-10 ml-auto flex min-w-0 max-w-[66%] sm:max-w-[68%] flex-col justify-center text-right">
                      <p
                        className={[
                          "font-geist text-[13px] sm:text-[15px] font-bold uppercase tracking-tight sm:tracking-wide leading-tight sm:leading-snug transition-colors duration-300 line-clamp-2 sm:line-clamp-1",
                          isSelected ? "text-[#159A99]" : "text-[#202020] group-hover:text-[#159A99]",
                        ].join(" ")}
                      >
                        {episode.guest}
                      </p>

                      <p
                        className={[
                          "mt-1 sm:mt-1.5 font-geist text-[11px] sm:text-[13px] leading-[1.35] sm:leading-snug transition-colors duration-300 line-clamp-3 sm:line-clamp-2",
                          isSelected
                            ? "font-medium text-[#202020]"
                            : "font-normal text-[#71767B] group-hover:text-[#333333]",
                        ].join(" ")}
                      >
                        {episode.role} · {episode.company}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Video Player Section with Reel Thumbnail Poster & Swipeable 2-Reel Slider */}
        <div className="mx-auto flex w-full min-[1100px]:w-[887px] min-[1100px]:h-[660px] max-w-full flex-col items-center min-[1100px]:justify-between">
          <div
            ref={reelSliderRef}
            onScroll={handleReelScroll}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative flex h-[380px] sm:h-[460px] md:h-[540px] min-[1100px]:h-auto min-[1100px]:flex-1 min-[1100px]:min-h-0 w-full max-w-full overflow-x-auto overflow-y-hidden rounded-[24px] sm:rounded-[30px] border-[1.62px] border-[#E0E0E0] bg-black shadow-lg opacity-100 snap-x snap-mandatory snap-always overscroll-x-contain touch-pan-y [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {/* Render 2 Reel Slides (Reel 1 & Reel 2) */}
            {[0, 1].map((reelIdx) => {
              const reelUrl = currentReels[reelIdx];
              const isCurrentSlideActive = activeReelIndex === reelIdx;
              const isCurrentSlidePlaying = isPlaying && isCurrentSlideActive;

              return (
                <article
                  key={reelIdx}
                  className="relative h-full w-full shrink-0 snap-start overflow-hidden bg-black select-none cursor-pointer"
                >
                  {isCurrentSlidePlaying ? (
                    <div
                      onClick={togglePlayPause}
                      className="relative h-full w-full bg-black flex items-center justify-center select-none cursor-pointer"
                    >
                      {reelUrl ? (
                        <>
                          <video
                            ref={isCurrentSlideActive ? videoRef : null}
                            key={`${selectedEpisode.id}-${reelIdx}-${reelUrl}`}
                            src={reelUrl}
                            autoPlay
                            playsInline
                            onPlay={() => setIsPaused(false)}
                            onPause={() => setIsPaused(true)}
                            className="absolute inset-0 h-full w-full object-contain bg-black pointer-events-none"
                          />

                          {/* Center Pause/Play Indicator Overlay */}
                          {isPaused && (
                            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/35 backdrop-blur-[1px] transition-all pointer-events-none">
                              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-[#159A99] text-white shadow-2xl transition-transform hover:scale-110">
                                <svg className="ml-1 h-8 w-8 sm:h-10 sm:w-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="relative flex flex-col items-center justify-center p-8 text-center text-white pointer-events-none">
                          <p className="font-geist text-2xl font-bold">{selectedEpisode.guest}</p>
                          <p className="mt-2 font-geist text-sm text-white/70">Reel release coming soon</p>
                        </div>
                      )}

                      {/* Close Video button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPlaying(false);
                          setIsPaused(false);
                        }}
                        aria-label="Close video player"
                        className="absolute top-4 right-4 z-20 flex items-center gap-1.5 rounded-full bg-black/70 px-4 py-2 font-geist text-xs font-semibold text-white backdrop-blur-md transition-all hover:bg-black cursor-pointer"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Close Video
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        if (isSwiping.current) return;
                        scrollToReel(reelIdx);
                        setIsPlaying(true);
                        setIsPaused(false);
                      }}
                      className="relative h-full w-full bg-cover bg-center overflow-hidden flex flex-col justify-between p-8 sm:p-10 group cursor-pointer"
                      style={{
                        backgroundImage: `url('${reelBackground}')`,
                      }}
                    >
                      {/* 1. Mobile Front Photo over reel background */}
                      <div className="pointer-events-none absolute inset-0 overflow-hidden min-[1100px]:hidden">
                        <img
                          src={`${SPEAKER_SECTION_IMG_BASE}/r${selectedEpisode.id}.svg`}
                          alt={selectedEpisode.guest}
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 right-auto h-[85%] sm:h-[88%] w-auto max-w-none object-contain object-bottom select-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* 2. Desktop Full Cover Thumbnail Image */}
                      <div className="pointer-events-none absolute inset-0 overflow-hidden hidden min-[1100px]:block">
                        <img
                          src={`${FULL_RELEASE_IMG_BASE}/reelspeaker${selectedEpisode.id}.png`}
                          alt={selectedEpisode.guest}
                          className="h-full w-full object-cover object-[center_top] select-none transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Bottom Row: Circular Teal Play Button (Bottom-Left) & Teal Duration Pill (Bottom-Right) */}
                      <div className="relative z-10 flex items-center justify-between mt-auto w-full">
                        {/* Circular Teal Play Button (Bottom-Left) */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isSwiping.current) return;
                            scrollToReel(reelIdx);
                            setIsPlaying(true);
                            setIsPaused(false);
                          }}
                          aria-label={`Play Reel ${reelIdx + 1} of ${selectedEpisode.guest}`}
                          className="flex h-[58px] w-[58px] sm:h-[64px] sm:w-[64px] items-center justify-center rounded-full bg-[#159A99] text-white shadow-xl shadow-[#159A99]/40 transition-transform duration-300 hover:scale-110 active:scale-95 group/btn cursor-pointer"
                        >
                          <svg
                            className="ml-1 h-7 w-7 text-white transition-transform duration-300 group-hover/btn:scale-110"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </button>

                        {/* Teal Duration Pill (Bottom-Right) */}
                        <span className="inline-block rounded-full bg-[#159A99] px-5 py-2 font-geist text-[13px] sm:text-[14px] font-bold tracking-wide text-white shadow-md">
                          REEL 0{reelIdx + 1} · {selectedEpisode.reelDurations?.[reelIdx] || "1 MIN"}
                        </span>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          {/* Navigation Controls: < (1) (2) > */}
          <div className="mt-5 flex shrink-0 items-center justify-center gap-3">
            {/* Previous Arrow (<) */}
            <button
              type="button"
              onClick={() => {
                scrollToReel(0);
              }}
              aria-label="Previous Reel"
              disabled={activeReelIndex === 0}
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all cursor-pointer ${activeReelIndex === 0
                ? "border-[#E0E0E0] text-[#B0B0B0] opacity-40 cursor-not-allowed"
                : "border-[#159A99] bg-white text-[#159A99] hover:bg-[#159A99] hover:text-white active:scale-95 shadow-sm"
                }`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Circle 1 */}
            <button
              type="button"
              onClick={() => {
                scrollToReel(0);
              }}
              aria-label="Switch to Reel 1"
              className={`flex h-9 w-9 items-center justify-center rounded-full font-geist text-[14px] font-bold transition-all cursor-pointer ${activeReelIndex === 0
                ? "bg-[#159A99] text-white shadow-md shadow-[#159A99]/30 scale-105"
                : "border border-[#D0D7DE] bg-white text-[#555] hover:border-[#159A99] hover:text-[#159A99]"
                }`}
            >
              1
            </button>

            {/* Circle 2 */}
            <button
              type="button"
              onClick={() => {
                scrollToReel(1);
              }}
              aria-label="Switch to Reel 2"
              className={`flex h-9 w-9 items-center justify-center rounded-full font-geist text-[14px] font-bold transition-all cursor-pointer ${activeReelIndex === 1
                ? "bg-[#159A99] text-white shadow-md shadow-[#159A99]/30 scale-105"
                : "border border-[#D0D7DE] bg-white text-[#555] hover:border-[#159A99] hover:text-[#159A99]"
                }`}
            >
              2
            </button>

            {/* Next Arrow (>) */}
            <button
              type="button"
              onClick={() => {
                scrollToReel(1);
              }}
              aria-label="Next Reel"
              disabled={activeReelIndex === 1}
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all cursor-pointer ${activeReelIndex === 1
                ? "border-[#E0E0E0] text-[#B0B0B0] opacity-40 cursor-not-allowed"
                : "border-[#159A99] bg-white text-[#159A99] hover:bg-[#159A99] hover:text-white active:scale-95 shadow-sm"
                }`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}