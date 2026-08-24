"use client";

import React, { useRef, useState, useEffect } from "react";

const R2_MEDIA_URL = (process.env.NEXT_PUBLIC_R2_MEDIA_URL || "").replace(/\/+$/, "");

const videoPoster = `${R2_MEDIA_URL}/images/video.png`;

type Episode = {
  id: number;
  number: string;
  guest: string;
  title: string;
  duration: string;
  videoId: string;
};

const episodes: Episode[] = [
  {
    id: 1,
    number: "01",
    guest: "RANIL JAYASEKARA",
    title: "The Shift to Strategic Capability Sourcing",
    duration: "18 MIN",
    videoId: "aqz-KE-bpKQ",
  },
  {
    id: 2,
    number: "02",
    guest: "RANIL JAYASEKARA",
    title: "The Shift to Strategic Capability Sourcing",
    duration: "18 MIN",
    videoId: "aqz-KE-bpKQ",
  },
  {
    id: 3,
    number: "03",
    guest: "RANIL JAYASEKARA",
    title: "The Shift to Strategic Capability Sourcing",
    duration: "18 MIN",
    videoId: "aqz-KE-bpKQ",
  },
  {
    id: 4,
    number: "04",
    guest: "RANIL JAYASEKARA",
    title: "The Shift to Strategic Capability Sourcing",
    duration: "18 MIN",
    videoId: "aqz-KE-bpKQ",
  },
  {
    id: 5,
    number: "05",
    guest: "RANIL JAYASEKARA",
    title: "The Shift to Strategic Capability Sourcing",
    duration: "18 MIN",
    videoId: "aqz-KE-bpKQ",
  },
  {
    id: 6,
    number: "06",
    guest: "RANIL JAYASEKARA",
    title: "The Shift to Strategic Capability Sourcing",
    duration: "18 MIN",
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

  const selectEpisode = (episode: Episode) => {
    setSelectedEpisode(episode);
    setIsPlaying(false);
  };

  // Height configurations for the scroll track & thumb
  const trackHeight = 628; // Total height of the track container (660px - 32px margins)
  const thumbHeight = 110; // Increased length of the black scroll handle

  return (
    <section
      id="full-releases"
      className="w-full overflow-hidden bg-[#F5F7FA] px-6 py-20 text-[#262626] md:px-12 lg:px-[8.7%] lg:py-28">
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
      <div className="mx-auto flex w-full max-w-[1595px] flex-col-reverse gap-8 min-[1100px]:flex-row min-[1100px]:items-start">
        {/* Episode Playlist with Custom Scroll Indicator */}
        <div className="relative mx-auto flex h-[660px] w-[688px] max-w-full rounded-[30px] bg-[#F5F7FA]">

          {/* Custom Scrollbar Track */}
          <div className="relative my-4 ml-4 flex h-[calc(100%-32px)] w-[5px] shrink-0 items-center justify-center rounded-full bg-[#E2E5E8]">
            {/* Custom Black Scroll Thumb */}
            <div
              className="absolute w-[5px] rounded-full bg-black transition-transform duration-75 ease-out"
              style={{
                height: `${thumbHeight}px`,
                top: "0px",
                transform: `translateY(${scrollProgress * (trackHeight - thumbHeight)}px)`,
              }}
            />
          </div>

          {/* Scrollable List Container */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="
              h-full
              w-full
              overflow-y-auto
              px-6
              py-1
              [-ms-overflow-style:none]
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
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
                        h-[135px]
                        w-full
                        shrink-0
                        items-center
                        overflow-hidden
                        rounded-[26px]
                        bg-white
                        px-6
                        text-left
                        cursor-pointer
                        transition-all
                        duration-300
                        ease-out
                        hover:-translate-y-1
                        active:scale-[0.985]
                      `,
                      isSelected
                        ? "border-[1.5px] border-[#159A99]/50 shadow-[0_12px_28px_rgba(21,154,153,0.08),0_4px_12px_rgba(0,0,0,0.04)]"
                        : "border border-[#EAECEE] hover:border-[#159A99]/40 hover:shadow-[0_12px_24px_-4px_rgba(0,0,0,0.06)]",
                    ].join(" ")}
                  >
                    {/* Episode Number */}
                    <div className="relative h-full w-[150px] shrink-0 overflow-hidden">
                      <span
                        className={[
                          "absolute left-0 top-[22px] z-10 rounded-[4px] px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide text-white transition-colors duration-300",
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

                    {/* Guest & Title Info */}
                    <div className="ml-auto flex min-w-0 flex-1 flex-col justify-center pl-4 text-right">
                      <p
                        className={[
                          "line-clamp-1 font-geist text-[15px] font-bold uppercase tracking-wide transition-colors duration-300",
                          isSelected ? "text-[#159A99]" : "text-[#8D9296] group-hover:text-[#159A99]",
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
                        {episode.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Video Player Section */}
        <article className="relative mx-auto h-[660px] w-[887px] max-w-full overflow-hidden rounded-[30px] border border-[#E0E0E0] bg-black">
          {isPlaying ? (
            <iframe
              key={`${selectedEpisode.id}-${selectedEpisode.videoId}`}
              src={`https://www.youtube.com/embed/${selectedEpisode.videoId}?autoplay=1&mute=0&controls=1&rel=0&playsinline=1`}
              title={`${selectedEpisode.guest} — ${selectedEpisode.title}`}
              className="absolute inset-0 h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <>
              <img
                src={videoPoster}
                alt={selectedEpisode.guest}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                aria-label={`Play episode ${selectedEpisode.number}`}
                className="absolute left-1/2 top-1/2 flex h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#159A99] text-white shadow-xl transition-transform duration-300 hover:scale-110"
              >
                <svg
                  className="ml-1 h-8 w-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>

              <div className="absolute bottom-6 right-6">
                <span className="inline-block rounded-full bg-[#159A99] px-5 py-2.5 font-geist text-[14px] font-bold tracking-wide text-white shadow-md">
                  {selectedEpisode.duration}
                </span>
              </div>
            </>
          )}
        </article>
      </div>
    </section>
  );
}