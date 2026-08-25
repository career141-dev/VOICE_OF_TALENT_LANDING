"use client";

import React, { useRef, useState, useEffect } from "react";

const R2_MEDIA_URL = (process.env.NEXT_PUBLIC_R2_MEDIA_URL || "").replace(/\/+$/, "");
const reelBackground = `${R2_MEDIA_URL}/images/reelThumbnail/reelthumbnail.png`;

type Episode = {
  id: number;
  number: string;
  guest: string;
  role: string;
  company: string;
  duration: string;
  videoId?: string;
  videoUrl?: string;
};

const episodes: Episode[] = [
  {
    id: 1,
    number: "01",
    guest: "MR. PATRICK PEREIRA",
    role: "Vice President Learning & Development",
    company: "Aitken Spence Hotels",
    duration: "14 MIN",
    videoUrl: `${R2_MEDIA_URL}/videos/Mr.%20Pratrick%20Pereira.mp4`,
  },
  {
    id: 2,
    number: "02",
    guest: "MR. KEN VIJAYAKUMAR",
    role: "Senior General Manager, Human Resource & Sustainability",
    company: "A. Baur & Co. (Pvt) Ltd",
    duration: "12 MIN",
    videoUrl: `${R2_MEDIA_URL}/videos/Mr.Ken.mp4`,
  },
  {
    id: 3,
    number: "03",
    guest: "MR. CHAMILA C PERERA",
    role: "Former Managing Director, Head of Human Resources",
    company: "HSBC Malaysia",
    duration: "16 MIN",
    videoUrl: `${R2_MEDIA_URL}/videos/Mr.%20Chamila%20C%20Perera.mp4`,
  },
  {
    id: 4,
    number: "04",
    guest: "MS. THRIMUTHI DHANUSHKA",
    role: "Group Deputy General Manager, Human Resource & Administration",
    company: "Ideal Group",
    duration: "13 MIN",
    videoUrl: `${R2_MEDIA_URL}/videos/Ms.Thrimuthi%20Dhanushka.mp4`,
  },
  {
    id: 5,
    number: "05",
    guest: "MS. SURANI AMARASINGHE",
    role: "Director, Country People Partnering, Sri Lanka",
    company: "LSEG (London Stock Exchange Group)",
    duration: "15 MIN",
    videoUrl: `${R2_MEDIA_URL}/videos/Ms.%20Surani%20Amarasinghe.mp4`,
  },
  {
    id: 6,
    number: "06",
    guest: "MR. ARSHAQ FARALLY",
    role: "Chief People Officer, Sri Lanka",
    company: "Daraz",
    duration: "11 MIN",
    videoUrl: `${R2_MEDIA_URL}/videos/Mr.%20Arshaq%20Farally.mp4`,
  },
  {
    id: 7,
    number: "07",
    guest: "MR. DANUSHKA SENETH",
    role: "Head of Human Resources / AGM",
    company: "Janashakthi Insurance PLC",
    duration: "14 MIN",
    videoId: "aqz-KE-bpKQ",
  },
  {
    id: 8,
    number: "08",
    guest: "MS. HASANTHI DE SARAM",
    role: "Director / Senior HR Consultant",
    company: "(Former Director HR - Asiri Health)",
    duration: "17 MIN",
    videoUrl: `${R2_MEDIA_URL}/videos/Ms.%20Hasanthi.mp4`,
  },
  {
    id: 9,
    number: "09",
    guest: "MR. ASHAN RANSILIGE",
    role: "Chief Executive Officer",
    company: "Link Natural Products (Pvt.) Ltd",
    duration: "15 MIN",
    videoUrl: `${R2_MEDIA_URL}/videos/Mr.%20Ashan%20Ransilige.mp4`,
  },
  {
    id: 10,
    number: "10",
    guest: "MR. INDIKA RANATHUNGA",
    role: "Chief Operating Officer",
    company: "Allied Commercial Fertillizers",
    duration: "12 MIN",
    videoId: "aqz-KE-bpKQ",
  },
  {
    id: 11,
    number: "11",
    guest: "MS. CHAMINDRA PERERA",
    role: "Human Resources Director",
    company: "GRI Sri Lanka",
    duration: "14 MIN",
    videoId: "aqz-KE-bpKQ",
  },
  {
    id: 12,
    number: "12",
    guest: "MS. CHANDIMA BAMBARENDA",
    role: "Group Head of Human Resources",
    company: "Pyramid Wilmar Group",
    duration: "13 MIN",
    videoId: "aqz-KE-bpKQ",
  },
  {
    id: 13,
    number: "13",
    guest: "MR. GEHAN SAMUEL",
    role: "Manager of Human Resources Development",
    company: "MAS Holdings Silueta",
    duration: "16 MIN",
    videoId: "aqz-KE-bpKQ",
  },
  {
    id: 14,
    number: "14",
    guest: "MR. KANISHKA MUNASINGHE",
    role: "General Manager, Human Resources",
    company: "Port City BPO",
    duration: "15 MIN",
    videoId: "aqz-KE-bpKQ",
  },
];

export default function FullReleasesSection() {
  const [selectedEpisode, setSelectedEpisode] = useState(episodes[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const maxScroll = scrollHeight - clientHeight;
    if (maxScroll > 0) {
      setScrollProgress(scrollTop / maxScroll);
    }
  };

  useEffect(() => {
    const handleSelectEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{ episodeId: number }>;
      const episodeId = customEvent.detail?.episodeId;
      if (episodeId) {
        const targetEpisode = episodes.find((ep) => ep.id === episodeId);
        if (targetEpisode) {
          setSelectedEpisode(targetEpisode);
          setIsPlaying(true);
        }
      }
    };

    window.addEventListener("vota-select-episode", handleSelectEvent);
    return () => window.removeEventListener("vota-select-episode", handleSelectEvent);
  }, []);

  const selectEpisode = (episode: Episode) => {
    setSelectedEpisode(episode);
    setIsPlaying(false);
  };

  // Height configurations for the scroll track & thumb
  const trackHeight = 628; // Total height of the track container (660px - 32px margins)
  const thumbHeight = 90; // Height of the black scroll handle

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
        <div className="relative flex h-[480px] sm:h-[560px] min-[1100px]:h-[660px] w-full min-[1100px]:w-[688px] max-w-full overflow-hidden rounded-[30px] bg-[#F5F7FA]">
          {/* Custom Scrollbar Track */}
          <div className="relative my-4 ml-4 flex h-[calc(100%-32px)] w-[5px] shrink-0 rounded-full bg-[#E2E5E8] overflow-hidden">
            {/* Custom Black Scroll Thumb */}
            <div
              className="absolute w-[5px] rounded-full bg-black transition-transform duration-75 ease-out"
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
            className="h-full w-full overflow-y-auto px-4 sm:px-6 py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex flex-col gap-4">
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
                        flex
                        h-[143px]
                        w-full
                        shrink-0
                        items-center
                        overflow-hidden
                        rounded-[30px]
                        bg-white
                        px-6
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
                    {/* Episode Number */}
                    <div className="relative h-full w-[150px] shrink-0 overflow-hidden">
                      <span
                        className={[
                          "absolute left-0 top-[24px] z-10 rounded-[4px] px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide text-white transition-colors duration-300",
                          isSelected ? "bg-[#159A99]" : "bg-[#B6B8BB] group-hover:bg-[#159A99]",
                        ].join(" ")}
                      >
                        Episode
                      </span>

                      <p
                        className={[
                          "absolute -bottom-[20px] -left-[4px] font-geist text-[86px] font-bold leading-none tracking-[-0.08em] transition-colors duration-300 select-none",
                          isSelected ? "text-[#202020]" : "text-[#E2E3E5] group-hover:text-[#CBD1D6]",
                        ].join(" ")}
                      >
                        {episode.number}
                      </p>
                    </div>

                    {/* Guest & Role Info */}
                    <div className="ml-auto flex min-w-0 flex-1 flex-col justify-center pl-4 text-right">
                      <p
                        className={[
                          "line-clamp-1 font-geist text-[15px] font-bold uppercase tracking-wide transition-colors duration-300",
                          isSelected ? "text-[#159A99]" : "text-[#202020] group-hover:text-[#159A99]",
                        ].join(" ")}
                      >
                        {episode.guest}
                      </p>

                      <p
                        className={[
                          "mt-1.5 line-clamp-2 font-geist text-[13px] leading-snug transition-colors duration-300",
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

        {/* Video Player Section with Reel Thumbnail Poster */}
        <article className="relative mx-auto h-[380px] sm:h-[460px] md:h-[540px] min-[1100px]:h-[660px] w-full min-[1100px]:w-[887px] max-w-full overflow-hidden rounded-[24px] sm:rounded-[30px] border-[1.62px] border-[#E0E0E0] bg-black shadow-lg opacity-100">
          {isPlaying ? (
            <div className="relative h-full w-full bg-black flex items-center justify-center">
              {selectedEpisode.videoUrl ? (
                <video
                  key={selectedEpisode.videoUrl}
                  src={selectedEpisode.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="absolute inset-0 h-full w-full object-contain bg-black"
                />
              ) : (
                <iframe
                  key={`${selectedEpisode.id}-${selectedEpisode.videoId}`}
                  src={`https://www.youtube.com/embed/${selectedEpisode.videoId || "aqz-KE-bpKQ"}?autoplay=1&mute=0&controls=1&rel=0&playsinline=1`}
                  title={`${selectedEpisode.guest} — ${selectedEpisode.role}`}
                  className="absolute inset-0 h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              )}

              {/* Close Video button */}
              <button
                type="button"
                onClick={() => setIsPlaying(false)}
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
              onClick={() => setIsPlaying(true)}
              className="relative h-full w-full bg-cover bg-center overflow-hidden flex flex-col justify-between p-8 sm:p-10 cursor-pointer group"
              style={{
                backgroundImage: `url('${reelBackground}')`,
              }}
            >
              {/* 1. Back Photo: Big, Grayscale, Upper-Left (Desktop only) */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden hidden min-[1100px]:block">
                <img
                  src={`${R2_MEDIA_URL}/images/reelThumbnail/speaker${selectedEpisode.id}reel.png`}
                  alt=""
                  className="absolute -top-[2%] sm:-top-[2.5%] -left-[10%] sm:-left-[5%] h-[118%] w-[110%] object-cover object-[center_top] grayscale contrast-125 brightness-105 opacity-50 select-none transition-transform duration-700 group-hover:scale-105"
                  style={{
                    maskImage: "linear-gradient(180deg, rgba(0,0,0,1) 48%, rgba(0,0,0,0) 88%)",
                    WebkitMaskImage: "linear-gradient(180deg, rgba(0,0,0,1) 48%, rgba(0,0,0,0) 88%)",
                  }}
                />
              </div>

              {/* 2. Front Photo: Full Color */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <img
                  src={`${R2_MEDIA_URL}/images/reelThumbnail/speaker${selectedEpisode.id}reel.png`}
                  alt={selectedEpisode.guest}
                  className="absolute -bottom-[6%] right-[2%] sm:right-[6%] h-[75%] w-[65%] sm:w-[58%] object-cover object-[center_bottom] select-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Bottom Row: Circular Teal Play Button (Bottom-Left) & Teal Duration Pill (Bottom-Right) */}
              <div className="relative z-10 flex items-center justify-between mt-auto w-full">
                {/* Circular Teal Play Button (Bottom-Left) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlaying(true);
                  }}
                  aria-label={`Play episode ${selectedEpisode.number}`}
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
                  {selectedEpisode.duration}
                </span>
              </div>
            </div>
          )}
        </article>
      </div>
    </section>
  );
}