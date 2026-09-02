"use client";

import { useState, useEffect, useRef } from "react";
import AnimatedCounter from "./AnimatedCounter";

const R2_MEDIA_URL = (process.env.NEXT_PUBLIC_R2_MEDIA_URL || "").replace(/\/+$/, "");
const votaLogo = `${R2_MEDIA_URL}/images/VOTA Background White.png`;
const reelBackground = `${R2_MEDIA_URL}/images/reelThumbnail/reelthumbnail.png`;

export interface SeriesEpisode {
  id: number;
  name: string;
  role: string;
  company: string;
  duration: string;
  videoId?: string;
  videoUrl?: string;
  bannerImage: string;
}

export const seriesEpisodesData: SeriesEpisode[] = [
  {
    id: 1,
    name: "Mr. Patrick Pereira",
    role: "Vice President Learning & Development",
    company: "Aitken Spence Hotels",
    duration: "14:20",
    videoUrl: `${R2_MEDIA_URL}/videos/Mr.%20Pratrick%20Pereira.mp4`,
    bannerImage: `${R2_MEDIA_URL}/images/speaker1.png`,
  },
  {
    id: 2,
    name: "Mr. Ken Vijayakumar",
    role: "Senior General Manager, Human Resource & Sustainability",
    company: "A. Baur & Co. (Pvt) Ltd",
    duration: "12:48",
    videoUrl: `${R2_MEDIA_URL}/videos/Mr.Ken.mp4`,
    bannerImage: `${R2_MEDIA_URL}/images/speaker2.png`,
  },
  {
    id: 3,
    name: "Mr. Chamila C Perera",
    role: "Former Managing Director, Head of Human Resources",
    company: "HSBC Malaysia",
    duration: "16:15",
    videoUrl: `${R2_MEDIA_URL}/videos/Mr.%20Chamila%20C%20Perera.mp4`,
    bannerImage: `${R2_MEDIA_URL}/images/speaker3.png`,
  },
  {
    id: 4,
    name: "Ms. Thrimuthi Dhanushka",
    role: "Group Deputy General Manager, Human Resource & Administration",
    company: "Ideal Group",
    duration: "13:50",
    videoUrl: `${R2_MEDIA_URL}/videos/Ms.Thrimuthi%20Dhanushka.mp4`,
    bannerImage: `${R2_MEDIA_URL}/images/speaker4.png`,
  },
  {
    id: 5,
    name: "Ms. Surani Amarasinghe",
    role: "Director, Country People Partnering, Sri Lanka",
    company: "LSEG (London Stock Exchange Group)",
    duration: "15:30",
    videoUrl: `${R2_MEDIA_URL}/videos/Ms.%20Surani%20Amarasinghe.mp4`,
    bannerImage: `${R2_MEDIA_URL}/images/speaker5.png`,
  },
  {
    id: 6,
    name: "Mr. Arshaq Farally",
    role: "Chief People Officer, Sri Lanka",
    company: "Daraz",
    duration: "11:45",
    videoUrl: `${R2_MEDIA_URL}/videos/Mr.Arshaq%20Farally%2002.mp4`,
    bannerImage: `${R2_MEDIA_URL}/images/speaker6.png`,
  },
  {
    id: 7,
    name: "Mr. Danushka Seneth",
    role: "Head of Human Resources / AGM",
    company: "Janashakthi Insurance PLC",
    duration: "14:10",
    videoUrl: `${R2_MEDIA_URL}/videos/Mr.%20Danushka.mp4`,
    bannerImage: `${R2_MEDIA_URL}/images/speaker7.png`,
  },
  {
    id: 8,
    name: "Ms. Hasanthi De Saram",
    role: "Director / Senior HR Consultant",
    company: "(Former Director HR - Asiri Health)",
    duration: "17:05",
    videoUrl: `${R2_MEDIA_URL}/videos/Ms.%20Hasanthi.mp4`,
    bannerImage: `${R2_MEDIA_URL}/images/speaker8.png`,
  },
  {
    id: 9,
    name: "Mr. Ashan Ransilige",
    role: "Chief Executive Officer",
    company: "Link Natural Products (Pvt.) Ltd",
    duration: "15:12",
    videoUrl: `${R2_MEDIA_URL}/videos/Mr.%20Ashan%20Ransilige%2002.mp4`,
    bannerImage: `${R2_MEDIA_URL}/images/speaker9.png`,
  },
  {
    id: 10,
    name: "Mr. Indika Ranathunga",
    role: "Chief Operating Officer",
    company: "Allied Commercial Fertillizers",
    duration: "12:35",
    videoUrl: `${R2_MEDIA_URL}/videos/Mr.Indiaka%20Ranathunga%2002.mp4`,
    bannerImage: `${R2_MEDIA_URL}/images/speaker10.png`,
  },
  {
    id: 11,
    name: "Ms. Chamindra Perera",
    role: "Human Resources Director",
    company: "GRI Sri Lanka",
    duration: "14:50",
    videoUrl: `${R2_MEDIA_URL}/videos/Ms.%20Chamindra.mp4`,
    bannerImage: `${R2_MEDIA_URL}/images/speaker11.png`,
  },
  {
    id: 12,
    name: "Ms. Chandima Bambarenda",
    role: "Group Head of Human Resources",
    company: "Pyramid Wilmar Group",
    duration: "13:40",
    videoUrl: `${R2_MEDIA_URL}/videos/Ms.%20Chandima.mp4`,
    bannerImage: `${R2_MEDIA_URL}/images/speaker12.png`,
  },
  {
    id: 13,
    name: "Mr. Gehan Samuel",
    role: "Manager of Human Resources Development",
    company: "MAS Holdings Silueta",
    duration: "16:22",
    videoUrl: `${R2_MEDIA_URL}/videos/Mr.%20Gehan.mp4`,
    bannerImage: `${R2_MEDIA_URL}/images/speaker13.png`,
  },
  {
    id: 14,
    name: "Mr. Kanishka Munasinghe",
    role: "General Manager, Human Resources",
    company: "Port City BPO",
    duration: "15:05",
    videoUrl: `${R2_MEDIA_URL}/videos/Mr.%20Kanishka.mp4`,
    bannerImage: `${R2_MEDIA_URL}/images/speaker14.png`,
  },
];

export default function SeriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isManuallyClosedRef = useRef(false);

  // Default to Episode 2 (Mr. Ken Vijayakumar)
  const [selectedEpisode, setSelectedEpisode] = useState<SeriesEpisode>(
    seriesEpisodesData[1] || seriesEpisodesData[0]
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const resetControlsTimeout = () => {
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) {
        setShowControls(false);
      }
    }, 3500);
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPaused(false);
      resetControlsTimeout();
    } else {
      videoRef.current.pause();
      setIsPaused(true);
      setShowControls(true);
    }
  };

  const handleContainerClick = () => {
    if (!showControls) {
      setShowControls(true);
      resetControlsTimeout();
    } else {
      togglePlayPause();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
    resetControlsTimeout();
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && !isDragging) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 0);
      setCurrentTime(videoRef.current.currentTime || 0);
    }
  };

  // Sync mute state directly without remounting video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Auto-play/resume video when scrolled into view (desktop autoplays, mobile stays paused), pause when scrolled away
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isMobile = window.innerWidth < 1024;
        if (entry.isIntersecting) {
          if (!isManuallyClosedRef.current) {
            setIsPlaying(true);
            if (isMobile) {
              // On mobile, stay paused on entry with controls ready until user taps
              if (videoRef.current) {
                videoRef.current.pause();
                setIsPaused(true);
                setShowControls(true);
              }
            } else {
              // On desktop, auto-play / resume
              if (videoRef.current && videoRef.current.paused) {
                videoRef.current.play().catch(() => {});
                setIsPaused(false);
                resetControlsTimeout();
              }
            }
          }
        } else {
          if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
            setIsPaused(true);
            setShowControls(true);
          }
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleSelectEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{ episodeId: number }>;
      const episodeId = customEvent.detail?.episodeId;
      if (episodeId) {
        const targetEpisode = seriesEpisodesData.find((ep) => ep.id === episodeId);
        if (targetEpisode) {
          isManuallyClosedRef.current = false;
          setSelectedEpisode(targetEpisode);
          setIsPlaying(true);
          setIsMuted(false);
          setIsPaused(false);
          setShowControls(true);
          setCurrentTime(0);
          resetControlsTimeout();
        }
      }
    };

    window.addEventListener("vota-select-episode", handleSelectEvent);
    return () => window.removeEventListener("vota-select-episode", handleSelectEvent);
  }, []);

  const handleEpisodeSelect = (episode: SeriesEpisode) => {
    isManuallyClosedRef.current = false;
    setSelectedEpisode(episode);
    setIsPlaying(true);
    setIsMuted(false);
    setIsPaused(false);
    setShowControls(true);
    setCurrentTime(0);
    resetControlsTimeout();
  };

  const handlePlay = () => {
    isManuallyClosedRef.current = false;
    setIsPlaying(true);
    setIsMuted(false);
    setIsPaused(false);
    setShowControls(true);
    resetControlsTimeout();
  };

  const handleCloseVideo = () => {
    isManuallyClosedRef.current = true;
    setIsPlaying(false);
    setIsPaused(false);
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
          className="m-0 max-w-[880px] font-geist text-[26px] font-medium leading-[1.3] text-[#333] xl:text-[28px] max-[1024px]:text-[24px] max-[760px]:text-center max-[760px]:text-[22px]"
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
          <p className="m-0 font-geist text-[72px] font-semibold leading-none tracking-tight text-[#222] max-[1024px]:text-[56px] max-[760px]:text-[46px]">
            <AnimatedCounter to={150} suffix="K+" />
          </p>

          <p className="mt-3 font-geist text-[16px] font-medium uppercase tracking-widest text-[#888] max-[1024px]:text-[13px] max-[760px]:text-[10px]">
            Viewers worldwide
          </p>
        </div>
      </div>

      <div className="grid gap-8 min-[1025px]:grid-cols-[minmax(0,1fr)_420px] xl:grid-cols-[minmax(0,1fr)_460px]">
        {/* Main Featured Video / Poster */}
        <article className="group relative min-h-[500px] sm:min-h-[520px] md:min-h-[540px] xl:min-h-[560px] overflow-hidden rounded-[28px] md:rounded-[32px] bg-[#159A99] shadow-xl">
          {isPlaying ? (
            <div
              onClick={handleContainerClick}
              onMouseMove={() => {
                setShowControls(true);
                resetControlsTimeout();
              }}
              className="relative h-full w-full bg-black min-h-[500px] sm:min-h-[520px] md:min-h-[540px] xl:min-h-[560px] flex items-center justify-center cursor-pointer select-none overflow-hidden"
            >
              {selectedEpisode.videoUrl ? (
                <>
                  <video
                    ref={videoRef}
                    key={selectedEpisode.videoUrl}
                    src={selectedEpisode.videoUrl}
                    autoPlay
                    muted={isMuted}
                    loop
                    playsInline
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onPlay={() => {
                      setIsPaused(false);
                      resetControlsTimeout();
                    }}
                    onPause={() => {
                      setIsPaused(true);
                      setShowControls(true);
                    }}
                    className="absolute inset-0 h-full w-full object-contain bg-black pointer-events-none"
                  />

                  {/* Top Controls: Mute/Unmute & Close Video */}
                  <div
                    className={`absolute top-4 inset-x-4 z-20 flex items-center justify-between transition-opacity duration-300 ${
                      showControls ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    {/* Mute/Unmute toggle button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMuted((prev) => !prev);
                        resetControlsTimeout();
                      }}
                      className="flex items-center gap-1.5 rounded-full bg-black/75 px-3.5 py-2 font-geist text-xs font-semibold text-white backdrop-blur-md transition-all hover:bg-black cursor-pointer shadow-md"
                      aria-label={isMuted ? "Unmute video sound" : "Mute video sound"}
                    >
                      {isMuted ? (
                        <>
                          <svg className="h-4 w-4 text-[#159A99]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                          </svg>
                          <span>Unmute</span>
                        </>
                      ) : (
                        <>
                          <svg className="h-4 w-4 text-[#159A99]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                          </svg>
                          <span>Mute</span>
                        </>
                      )}
                    </button>

                    {/* Close Video button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCloseVideo();
                      }}
                      aria-label="Close video player"
                      className="flex items-center gap-1.5 rounded-full bg-black/70 px-4 py-2 font-geist text-xs font-semibold text-white backdrop-blur-md transition-all hover:bg-black cursor-pointer"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Close Video
                    </button>
                  </div>

                  {/* Center Play / Pause Button Overlay */}
                  <div
                    className={`absolute inset-0 z-10 flex items-center justify-center transition-all duration-300 pointer-events-none ${
                      showControls ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlayPause();
                      }}
                      className="pointer-events-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-[#159A99]/90 text-white shadow-2xl backdrop-blur-md transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                      aria-label={isPaused ? "Play video" : "Pause video"}
                    >
                      {isPaused ? (
                        <svg className="ml-1 h-8 w-8 sm:h-10 sm:w-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      ) : (
                        <svg className="h-8 w-8 sm:h-10 sm:w-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* Bottom Scrubber & Duration Control Bar */}
                  <div
                    className={`absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 sm:p-6 transition-opacity duration-300 ${
                      showControls ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Interactive Scrubber Bar */}
                    <div className="relative flex w-full items-center py-2 cursor-pointer">
                      <input
                        type="range"
                        min={0}
                        max={duration || 100}
                        step={0.1}
                        value={currentTime}
                        onChange={handleSeek}
                        onMouseDown={() => setIsDragging(true)}
                        onMouseUp={() => setIsDragging(false)}
                        onTouchStart={() => setIsDragging(true)}
                        onTouchEnd={() => setIsDragging(false)}
                        className="w-full h-1.5 sm:h-2 rounded-full appearance-none bg-white/30 accent-[#159A99] cursor-pointer focus:outline-none"
                        style={{
                          background: `linear-gradient(to right, #159A99 ${duration > 0 ? (currentTime / duration) * 100 : 0}%, rgba(255, 255, 255, 0.3) ${duration > 0 ? (currentTime / duration) * 100 : 0}%)`,
                        }}
                        aria-label="Video timeline scrubber"
                      />
                    </div>

                    {/* Bottom Row: Play/Pause Icon + Timestamps + Quick 10s Skip Buttons */}
                    <div className="mt-1 flex items-center justify-between font-geist text-xs sm:text-sm font-medium text-white">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePlayPause();
                          }}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30 transition-all active:scale-95 cursor-pointer"
                          aria-label={isPaused ? "Play video" : "Pause video"}
                        >
                          {isPaused ? (
                            <svg className="ml-0.5 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          ) : (
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                            </svg>
                          )}
                        </button>

                        <span className="tabular-nums tracking-wide text-white/90">
                          {formatTime(currentTime)} <span className="text-white/40">/</span> {formatTime(duration)}
                        </span>
                      </div>

                      {/* Quick -10s / +10s Skip */}
                      <div className="flex items-center gap-2 text-white/80">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (videoRef.current) {
                              videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
                            }
                            resetControlsTimeout();
                          }}
                          className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] sm:text-xs font-semibold hover:bg-white/20 transition-all cursor-pointer"
                          aria-label="Rewind 10 seconds"
                        >
                          -10s
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (videoRef.current) {
                              videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 10);
                            }
                            resetControlsTimeout();
                          }}
                          className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] sm:text-xs font-semibold hover:bg-white/20 transition-all cursor-pointer"
                          aria-label="Forward 10 seconds"
                        >
                          +10s
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="relative flex flex-col items-center justify-center p-8 text-center text-white pointer-events-none">
                  <p className="font-geist text-2xl font-bold">{selectedEpisode.name}</p>
                  <p className="mt-2 font-geist text-sm text-white/70">Video release coming soon</p>
                </div>
              )}
            </div>
          ) : (
            <div
              className="relative h-full w-full min-h-[500px] sm:min-h-[520px] md:min-h-[540px] xl:min-h-[560px] flex flex-col justify-between p-6 sm:p-8 md:p-10"
              style={{
                background: "radial-gradient(71.47% 191.86% at 92.83% 52.77%, rgba(21, 154, 153, 0) 0%, #159A99 100%), #FFFFFF",
              }}
            >
              {/* Speaker Photo filling the right half */}
              <img
                src={selectedEpisode.bannerImage}
                alt={selectedEpisode.name}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="absolute right-0 top-0 h-full w-[65%] max-w-[650px] object-cover object-[center_top] pointer-events-none z-0"
              />

              {/* Dark Gradient Overlay at the bottom for crystal clear text readability */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] z-[1]"
                style={{
                  background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.45) 45%, rgba(0, 0, 0, 0.88) 100%)",
                }}
              />

              {/* Top-Left: VOTA Logo Badge */}
              <div className="relative z-10">
                <img
                  src={votaLogo}
                  alt="VOTA - Voice of Talent Acquisition"
                  className="h-[44px] sm:h-[50px] w-auto max-w-[150px] rounded-[14px] sm:rounded-[18px] object-contain shadow-md"
                />
              </div>

              {/* Bottom-Left: Speaker Details & Play Button */}
              <div className="relative z-10 max-w-[85%] sm:max-w-[70%] md:max-w-[60%] pb-2">
                <h3 className="font-geist text-[26px] sm:text-[32px] md:text-[36px] font-bold leading-tight text-white drop-shadow-md">
                  {selectedEpisode.name}
                </h3>

                <p className="mt-2 font-geist text-[14px] sm:text-[15px] md:text-[16px] font-normal leading-snug text-white/90 drop-shadow">
                  {selectedEpisode.role},<br />
                  {selectedEpisode.company}
                </p>

                <div className="mt-7 sm:mt-9 flex items-center gap-4 sm:gap-5">
                  <button
                    type="button"
                    onClick={handlePlay}
                    className="flex h-[56px] w-[56px] sm:h-[60px] sm:w-[60px] items-center justify-center rounded-full bg-white shadow-xl shadow-[#159a99]/40 transition-transform duration-300 hover:scale-110 active:scale-95 group/btn cursor-pointer"
                    aria-label={`Play episode video of ${selectedEpisode.name}`}
                  >
                    <svg
                      className="ml-1 h-6 w-6 sm:h-7 sm:w-7 text-[#159a99] transition-transform duration-300 group-hover/btn:scale-110"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>

                  <div className="flex items-center gap-3 font-geist text-[15px] sm:text-[16px] font-medium text-white drop-shadow">
                    <span>Watch Video</span>
                    <span className="text-white/50">|</span>
                    <span>{selectedEpisode.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </article>

        {/* Desktop Playlist: 14 Episodes with Custom Black Scrollbar */}
        <div className="hidden max-h-[500px] sm:max-h-[520px] md:max-h-[540px] xl:max-h-[560px] flex-col gap-3.5 overflow-y-auto pr-3 min-[1025px]:flex [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar]:w-1.5">
          {seriesEpisodesData.map((episode, index) => {
            const isSelected = selectedEpisode.id === episode.id;

            return (
              <article
                key={`desktop-${episode.id}-${index}`}
                onClick={() => handleEpisodeSelect(episode)}
                className={`group flex cursor-pointer items-center gap-4 rounded-[22px] p-3 transition-all duration-300 ${isSelected
                  ? "border-[1.5px] border-[#159A99] bg-white shadow-md shadow-[#159A99]/10"
                  : "border border-transparent bg-[#F2F4F7]/70 hover:border-[#D0D7DE] hover:bg-white hover:shadow-sm"
                  }`}
              >
                {/* Thumbnail styled like the selected widget */}
                <div
                  className="relative h-[92px] w-[148px] shrink-0 overflow-hidden rounded-[16px] shadow-sm"
                  style={{
                    background: "radial-gradient(71.47% 191.86% at 92.83% 52.77%, rgba(21, 154, 153, 0) 0%, #159A99 100%), #FFFFFF",
                  }}
                >
                  {/* Speaker photo */}
                  <img
                    src={episode.bannerImage}
                    alt={episode.name}
                    className="absolute right-0 top-0 h-full w-[70%] object-cover object-[center_top] transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradient shadow */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                  {/* VOTA Logo on thumbnail */}
                  <img
                    src={votaLogo}
                    alt="VOTA"
                    className="absolute top-1.5 left-1.5 h-[16px] w-auto max-w-[50px] rounded-[5px] object-contain z-10 shadow-sm"
                  />

                  {/* Duration */}
                  <span className="absolute bottom-1.5 right-1.5 z-10 rounded-md bg-black/80 px-1.5 py-0.5 font-geist text-[10px] font-medium text-white">
                    {episode.duration}
                  </span>
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <span
                    className={`inline-block rounded-full border px-2.5 py-1 font-geist text-[8.5px] font-bold uppercase tracking-wider transition-colors ${isSelected
                      ? "border-[#159A99] bg-[#159A99] text-white"
                      : "border-gray-200 bg-white text-black group-hover:border-gray-300"
                      }`}
                  >
                    Explore VOTA
                  </span>

                  <p
                    className={`mt-1.5 font-geist text-[14px] font-bold leading-[1.3] transition-colors line-clamp-1 ${isSelected ? "text-[#159A99]" : "text-[#222] group-hover:text-[#159A99]"
                      }`}
                  >
                    {episode.name}
                  </p>

                  <p className="mt-0.5 line-clamp-2 font-geist text-[12px] font-normal leading-[1.35] text-[#666]">
                    {episode.role} · {episode.company}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Tablet/Mobile Playlist: Horizontal Swipeable 14 Episodes */}
        <div className="flex gap-4 overflow-x-auto pb-4 pt-1 min-[1025px]:hidden snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {seriesEpisodesData.map((episode, index) => {
            const isSelected = selectedEpisode.id === episode.id;

            return (
              <article
                key={`responsive-${episode.id}-${index}`}
                onClick={() => handleEpisodeSelect(episode)}
                className={`group w-[220px] shrink-0 snap-start cursor-pointer rounded-[22px] p-3 transition-all duration-300 ${isSelected
                  ? "border-[1.5px] border-[#159A99] bg-white shadow-md"
                  : "border border-transparent bg-[#F2F4F7]/80 hover:bg-white"
                  }`}
              >
                {/* Mobile Thumbnail styled like the selected widget */}
                <div
                  className="relative h-[115px] w-full overflow-hidden rounded-[16px] shadow-sm"
                  style={{
                    background: "radial-gradient(71.47% 191.86% at 92.83% 52.77%, rgba(21, 154, 153, 0) 0%, #159A99 100%), #FFFFFF",
                  }}
                >
                  {/* Speaker photo */}
                  <img
                    src={episode.bannerImage}
                    alt={episode.name}
                    className="absolute right-0 top-0 h-full w-[70%] object-cover object-[center_top] transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradient shadow */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                  {/* VOTA Logo on thumbnail */}
                  <img
                    src={votaLogo}
                    alt="VOTA"
                    className="absolute top-2 left-2 h-[18px] w-auto max-w-[55px] rounded-[5px] object-contain z-10 shadow-sm"
                  />

                  {/* Duration */}
                  <span className="absolute bottom-2 right-2 z-10 rounded-md bg-black/80 px-1.5 py-0.5 font-geist text-[10px] font-medium text-white">
                    {episode.duration}
                  </span>
                </div>

                <div className="pt-2.5">
                  <span
                    className={`inline-block rounded-full border px-2.5 py-0.5 font-geist text-[8.5px] font-bold uppercase tracking-wider ${isSelected
                      ? "border-[#159A99] bg-[#159A99] text-white"
                      : "border-gray-200 bg-white text-black"
                      }`}
                  >
                    Explore VOTA
                  </span>

                  <p
                    className={`mt-1.5 font-geist text-[13.5px] font-bold leading-tight line-clamp-1 ${isSelected ? "text-[#159A99]" : "text-[#222]"
                      }`}
                  >
                    {episode.name}
                  </p>

                  <p className="mt-1 line-clamp-2 font-geist text-[11.5px] font-normal leading-[1.35] text-[#666]">
                    {episode.role} · {episode.company}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}