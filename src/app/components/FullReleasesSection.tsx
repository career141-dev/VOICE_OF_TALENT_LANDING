"use client";

import React, { useState } from "react";

const videoPoster = "/images/video.png";

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

  const selectEpisode = (episode: Episode) => {
    setSelectedEpisode(episode);
    setIsPlaying(false);
  };

  return (
    <section className="w-full overflow-hidden bg-[#F5F7FA] px-6 py-20 text-[#262626] md:px-12 lg:px-[8.7%] lg:py-28">
      {/* Heading */}
      <div className="mb-12 text-center lg:mb-16">
        <span className="inline-flex items-center rounded-[123.833px] border-[1.238px] border-[rgba(21,154,153,0.20)] bg-[rgba(21,154,153,0.10)] px-[14.86px] py-[7.43px] font-['Geist'] text-[13.622px] font-semibold leading-normal uppercase text-[#159A99] mb-3">
          Full Releases
        </span>

        <h2 className="mt-4 font-['Geist'] text-3xl font-bold tracking-tight text-[#262626] md:text-4xl lg:text-[46px]">
          Watch. Learn. Be Inspired.
        </h2>
      </div>

      {/* Centered layout with exact desktop sizes */}
      <div className="mx-auto flex w-full max-w-[1595px] flex-col gap-8 min-[1100px]:flex-row min-[1100px]:items-start">
        {/* Episode playlist */}
        <div
          className="
            relative
            mx-auto
            w-[688px]
            max-w-full
            overflow-hidden
            rounded-[30px]
            bg-[#F5F7FA]
          "
        >
          <div
            className="
              h-[660px]
              min-w-0
              overflow-y-auto
              pl-3

              max-[1099px]:h-auto
              max-[1099px]:max-h-[660px]

              [direction:rtl]

              [&::-webkit-scrollbar]:w-[6px]
              [&::-webkit-scrollbar-track]:rounded-full
              [&::-webkit-scrollbar-track]:bg-[#D9DDE2]
              [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar-thumb]:bg-black
            "
          >
            <div className="flex flex-col gap-[18px] py-1 pl-6 pr-1 [direction:ltr]">
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
                        w-[688px]
                        max-w-full
                        shrink-0
                        items-center
                        overflow-hidden
                        rounded-[30px]
                        bg-white
                        px-[32px]
                        text-left
                        transition-all
                        duration-300
                        ease-out
                      `,
                      isSelected
                        ? "border-[1.62px] border-[#E0E0E0] shadow-[0_10px_28px_rgba(0,0,0,0.05)]"
                        : "border border-transparent hover:border-[#E0E0E0] hover:shadow-[0_8px_20px_rgba(0,0,0,0.04)]",
                    ].join(" ")}
                  >
                    {/* Number is cropped only within this panel */}
                    <div className="relative h-full w-[190px] shrink-0 overflow-hidden">
                      <span
                        className={[
                          "absolute left-0 top-[28px] z-10 rounded-[4px] px-2 py-1 text-[8px] font-bold uppercase tracking-wide text-white",
                          isSelected ? "bg-[#4F4F4F]" : "bg-[#B6B8BB]",
                        ].join(" ")}
                      >
                        Episode
                      </span>

                      <p
                        className={[
                          "absolute -bottom-[25px] -left-[4px] font-['Geist'] text-[96px] font-bold leading-none tracking-[-0.08em]",
                          isSelected ? "text-[#202020]" : "text-[#E2E3E5]",
                        ].join(" ")}
                      >
                        {episode.number}
                      </p>
                    </div>

                    {/* Details */}
                    <div className="ml-auto flex min-w-0 flex-1 flex-col justify-center pr-2 text-right">
                      <p
                        className={[
                          "truncate font-['Geist'] text-[16px] font-bold uppercase tracking-wide",
                          isSelected ? "text-[#159A99]" : "text-[#B9BBBE]",
                        ].join(" ")}
                      >
                        {episode.guest}
                      </p>

                      <p
                        className={[
                          "mt-2 truncate font-['Geist'] text-[13px] leading-normal",
                          isSelected
                            ? "font-medium text-[#202020]"
                            : "font-normal text-[#AEB0B3]",
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

        {/* Video widget */}
        <article
          className="
            relative
            mx-auto
            h-[660px]
            w-[887px]
            max-w-full
            overflow-hidden
            rounded-[29.98px]
            border-[1.62px]
            border-[#E0E0E0]
            bg-black
          "
        >
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
                <span className="inline-block rounded-full bg-[#159A99] px-5 py-2.5 text-[14px] font-bold tracking-wide text-white shadow-md">
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