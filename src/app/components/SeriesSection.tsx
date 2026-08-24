"use client";

import { useEffect, useRef, useState } from "react";
import AnimatedCounter from "./AnimatedCounter";

const video = "/images/video.png";

const episodeImages = [video, video, video, video, video];

export default function SeriesSection() {
  const [isInView, setIsInView] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState("aqz-KE-bpKQ");

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(section);

    return () => observer.unobserve(section);
  }, []);

  const handleVideoSelect = (videoId = "aqz-KE-bpKQ") => {
    setSelectedVideoId(videoId);
  };

  return (
    <section
      id="episodes"
      ref={sectionRef}
      className="bg-[#f8f9fa] px-[8.7%] pt-14 pb-[88px] text-[#202020] max-[760px]:px-6 max-[760px]:pt-10 max-[760px]:pb-16"
      aria-labelledby="series-title"
    >
      {/* Header */}
      <div className="mb-12 flex items-center justify-between gap-8 xl:gap-24 max-[760px]:flex-col max-[760px]:items-center max-[760px]:gap-6">
        <p
          id="series-title"
          className="m-0 max-w-[880px] text-[26px] font-medium leading-[1.3] text-[#333] xl:text-[28px] max-[1024px]:text-[24px] max-[760px]:text-center max-[760px]:text-[22px]"
        >
          This is more than a video series — It is a platform for leaders to
          <br className="hidden xl:block" />
          share, young professionals to{" "}
          <span className="text-[#159a99]">
            learn, and the entire industry to
            <br className="hidden xl:block" />
            move forward together.
          </span>
        </p>

        {/* Counter Block Centered on Mobile View */}
        <div className="shrink-0 text-right max-[760px]:w-full max-[760px]:text-center">
          <p className="m-0 text-[72px] font-semibold leading-none tracking-tight text-[#222] max-[1024px]:text-[56px] max-[760px]:text-[46px]">
            <AnimatedCounter to={150} suffix="K+" />
          </p>

          <p className="mt-3 text-[16px] font-medium uppercase tracking-widest text-[#888] max-[1024px]:text-[13px] max-[760px]:text-[10px]">
            Viewers worldwide
          </p>
        </div>
      </div>

      <div className="grid gap-8 min-[1025px]:grid-cols-[minmax(0,1fr)_400px]">
        {/* Main Video */}
        <article className="group relative min-h-[500px] overflow-hidden rounded-[24px] bg-[#202020] text-white max-[1024px]:min-h-[440px] max-[760px]:min-h-[330px]">
          {isInView ? (
            <iframe
              key={selectedVideoId}
              className="absolute inset-0 h-full w-full border-0"
              src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1&mute=1&controls=1&rel=0&playsinline=1`}
              title="Featured Voice of Talent video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <>
              <img
                src={video}
                alt="Featured voice of talent"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-10 max-[760px]:p-6">
                <p className="m-0 text-[24px] font-bold tracking-wide">
                  Mr. Chathura Sampath
                </p>

                <p className="mt-2 text-[14px] text-white/70">
                  Korem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>

                <div className="mt-8 flex items-center gap-5">
                  <button
                    type="button"
                    onClick={() => handleVideoSelect()}
                    className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-white shadow-lg shadow-[#159a99]/30 transition-transform hover:scale-105"
                    aria-label="Play video"
                  >
                    <svg
                      className="ml-1 h-6 w-6 text-[#159a99]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>

                  <div className="flex items-center gap-3 text-[14px] font-medium text-white">
                    <span>Watch Video</span>
                    <span className="text-white/40">|</span>
                    <span>12:48</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </article>

        {/* Desktop Playlist */}
        <div className="hidden max-h-[500px] flex-col gap-5 overflow-y-auto pr-6 min-[1025px]:flex [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar]:w-1.5">
          {episodeImages.map((image, index) => (
            <EpisodeCard
              key={`desktop-${index}`}
              image={image}
              index={index}
              onSelect={handleVideoSelect}
              desktop
            />
          ))}
        </div>

        {/* Tablet/Mobile Playlist */}
        <div className="flex gap-4 overflow-x-auto pb-3 min-[1025px]:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {episodeImages.map((image, index) => (
            <EpisodeCard
              key={`responsive-${index}`}
              image={image}
              index={index}
              onSelect={handleVideoSelect}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function EpisodeCard({
  image,
  index,
  onSelect,
  desktop = false,
}: {
  image: string;
  index: number;
  onSelect: (videoId?: string) => void;
  desktop?: boolean;
}) {
  return (
    <article
      onClick={() => onSelect("aqz-KE-bpKQ")}
      className={
        desktop
          ? "group flex cursor-pointer items-center gap-5"
          : "group w-[190px] shrink-0 cursor-pointer"
      }
    >
      <div className="relative shrink-0 overflow-hidden rounded-[16px]">
        <img
          src={image}
          alt={`Episode ${index + 1}`}
          className={
            desktop
              ? "h-[110px] w-[180px] object-cover transition-transform duration-500 group-hover:scale-105"
              : "h-[118px] w-[190px] object-cover transition-transform duration-500 group-hover:scale-105"
          }
        />

        <span className="absolute bottom-2 right-2 rounded-md bg-black/80 px-1.5 py-0.5 text-[10px] font-medium text-white">
          12:48
        </span>
      </div>

      <div className={desktop ? "min-w-0 flex-1" : "pt-3"}>
        <span className="inline-block rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[8px] font-bold uppercase tracking-wider text-black">
          Explore VOTA
        </span>

        <p
          className={
            desktop
              ? "mt-3 text-[14px] font-medium leading-[1.4] text-[#444] transition-colors group-hover:text-black"
              : "mt-2 line-clamp-3 text-[13px] font-medium leading-[1.4] text-[#444] transition-colors group-hover:text-black"
          }
        >
          Qorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </article>
  );
}