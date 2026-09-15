"use client";

import { useState, useEffect, useRef } from "react";
import AnimatedCounter from "./AnimatedCounter";

const R2_MEDIA_URL = (process.env.NEXT_PUBLIC_R2_MEDIA_URL || "").replace(/\/+$/, "");
const votaLogo = `${R2_MEDIA_URL}/images/VOTA Background White.svg`;
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
  thumbnail: string;
}

const SERIES_THUMBNAIL_BASE = "https://talentsuite.career141.com/images/seriesSection";

export const seriesEpisodesData: SeriesEpisode[] = [
  {
    id: 1,
    name: "Mr. Patrick Pereira",
    role: "Vice President Learning & Development",
    company: "Aitken Spence Hotels",
    duration: "14:20",
    videoUrl: "https://media.career141.com/new%20reels/Mr.%20Patrick/Mr.%20Patrick.mp4",
    bannerImage: `${R2_MEDIA_URL}/images/speaker1.png`,
    thumbnail: `${SERIES_THUMBNAIL_BASE}/Pillar-01.svg`,
  },
  {
    id: 2,
    name: "Mr. Ken Vijayakumar",
    role: "Senior General Manager, Human Resource & Sustainability",
    company: "A. Baur & Co. (Pvt) Ltd",
    duration: "12:48",
    videoUrl: "https://media.career141.com/new%20reels/Mr.%20Ken/Mr.%20Ken.mp4",
    bannerImage: `${R2_MEDIA_URL}/images/speaker2.png`,
    thumbnail: `${SERIES_THUMBNAIL_BASE}/Pillar-02.svg`,
  },
  {
    id: 3,
    name: "Mr. Chamila C Perera",
    role: "Former Managing Director, Head of Human Resources",
    company: "HSBC Malaysia",
    duration: "16:15",
    videoUrl: "https://media.career141.com/new%20reels/Mr.%20Chamila%20C%20Perera/Mr.%20Chamila%20C%20Perera.mp4",
    bannerImage: `${R2_MEDIA_URL}/images/speaker3.png`,
    thumbnail: `${SERIES_THUMBNAIL_BASE}/Pillar-03.svg`,
  },
  {
    id: 4,
    name: "Ms. Thrimuthi Dhanushka",
    role: "Group Deputy General Manager, Human Resource & Administration",
    company: "Ideal Group",
    duration: "13:50",
    videoUrl: "https://media.career141.com/new%20reels/Ms.Thrimuthi/Ms.Thrimuthi.mp4",
    bannerImage: `${R2_MEDIA_URL}/images/speaker4.png`,
    thumbnail: `${SERIES_THUMBNAIL_BASE}/Pillar-04.svg`,
  },
  {
    id: 5,
    name: "Ms. Surani Amarasinghe",
    role: "Director, Country People Partnering, Sri Lanka",
    company: "LSEG (London Stock Exchange Group)",
    duration: "15:30",
    videoUrl: "https://media.career141.com/new%20reels/Ms.%20Surani/Ms.%20Surani.mp4",
    bannerImage: `${R2_MEDIA_URL}/images/speaker5.png`,
    thumbnail: `${SERIES_THUMBNAIL_BASE}/Pillar-05.svg`,
  },
  {
    id: 6,
    name: "Mr. Arshaq Farally",
    role: "Chief People Officer, Sri Lanka",
    company: "Daraz",
    duration: "11:45",
    videoUrl: "https://media.career141.com/new%20reels/Mr.%20Arshaq/Mr.%20Arshaq.mp4",
    bannerImage: `${R2_MEDIA_URL}/images/speaker6.png`,
    thumbnail: `${SERIES_THUMBNAIL_BASE}/Pillar-06.svg`,
  },
  {
    id: 7,
    name: "Mr. Danushka Seneth",
    role: "Head of Human Resources / AGM",
    company: "Janashakthi Insurance PLC",
    duration: "14:10",
    videoUrl: "https://media.career141.com/new%20reels/Mr.%20Danushaka/Mr.%20Danushaka.mp4",
    bannerImage: `${R2_MEDIA_URL}/images/speaker7.png`,
    thumbnail: `${SERIES_THUMBNAIL_BASE}/Pillar-07.svg`,
  },
  {
    id: 8,
    name: "Ms. Hasanthi De Saram",
    role: "Director / Senior HR Consultant",
    company: "(Former Director HR - Asiri Health)",
    duration: "17:05",
    videoUrl: "https://media.career141.com/new%20reels/Ms.%20Hasanthi/Ms.%20Hasanthi.mp4",
    bannerImage: `${R2_MEDIA_URL}/images/speaker8.png`,
    thumbnail: `${SERIES_THUMBNAIL_BASE}/Pillar-08.svg`,
  },
  {
    id: 9,
    name: "Mr. Ashan Ransilige",
    role: "Chief Executive Officer",
    company: "Link Natural Products (Pvt.) Ltd",
    duration: "15:12",
    videoUrl: "https://media.career141.com/new%20reels/Mr%20Ashan/Mr%20Ashan.mp4",
    bannerImage: `${R2_MEDIA_URL}/images/speaker9.png`,
    thumbnail: `${SERIES_THUMBNAIL_BASE}/Pillar-09.svg`,
  },
  {
    id: 10,
    name: "Mr. Indika Ranathunga",
    role: "Chief Operating Officer",
    company: "Allied Commercial Fertilizers",
    duration: "12:35",
    videoUrl: "https://media.career141.com/new%20reels/Mr.%20Indika/Mr.%20Indika.mp4",
    bannerImage: `${R2_MEDIA_URL}/images/speaker10.png`,
    thumbnail: `${SERIES_THUMBNAIL_BASE}/Pillar-10.svg`,
  },
  {
    id: 11,
    name: "Ms. Chamindra Perera",
    role: "Human Resources Director",
    company: "GRI Sri Lanka",
    duration: "14:50",
    videoUrl: "https://media.career141.com/new%20reels/Ms.%20Chamindra/Ms.%20Chamindra.mp4",
    bannerImage: `${R2_MEDIA_URL}/images/speaker11.png`,
    thumbnail: `${SERIES_THUMBNAIL_BASE}/Pillar-11.svg`,
  },
  {
    id: 12,
    name: "Ms. Chandima Bambarenda",
    role: "Group Head of Human Resources",
    company: "Pyramid Wilmar Group",
    duration: "13:40",
    videoUrl: "https://media.career141.com/new%20reels/Ms.%20Chandima/Ms.%20Chandima.mp4",
    bannerImage: `${R2_MEDIA_URL}/images/speaker12.png`,
    thumbnail: `${SERIES_THUMBNAIL_BASE}/Pillar-12.svg`,
  },
  {
    id: 13,
    name: "Mr. Gehan Samuel",
    role: "Manager of Human Resources Development",
    company: "MAS Holdings Silueta",
    duration: "16:22",
    videoUrl: "https://media.career141.com/new%20reels/Mr.%20Gehan/Mr.%20Gehan.mp4",
    bannerImage: `${R2_MEDIA_URL}/images/speaker13.png`,
    thumbnail: `${SERIES_THUMBNAIL_BASE}/Pillar-13.svg`,
  },
  {
    id: 14,
    name: "Mr. Kanishka Munasinghe",
    role: "General Manager, Human Resources",
    company: "Port City BPO",
    duration: "15:05",
    videoUrl: "https://media.career141.com/new%20reels/Mr.%20Kanishka/Mr.%20Kanishka.mp4",
    bannerImage: `${R2_MEDIA_URL}/images/speaker14.png`,
    thumbnail: `${SERIES_THUMBNAIL_BASE}/Pillar-14.svg`,
  },
];

export const findEpisodeByParam = (param: string): SeriesEpisode | undefined => {
  if (!param) return undefined;
  const num = parseInt(param, 10);
  if (!isNaN(num) && num >= 1 && num <= seriesEpisodesData.length) {
    const found = seriesEpisodesData.find((ep) => ep.id === num);
    if (found) return found;
  }

  // Support slugs / names like "patrick", "mr-patrick", "ken", "chamila", etc.
  const normalized = param.toLowerCase().replace(/[-_.]/g, " ").trim();
  return seriesEpisodesData.find((ep) => {
    const epName = ep.name.toLowerCase().replace(/[^a-z0-9 ]/g, "");
    return epName.includes(normalized) || normalized.includes(epName);
  });
};

export default function SeriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isManuallyClosedRef = useRef(false);
  const isManuallyPausedRef = useRef(false);
  const wasPlayingBeforeScrollOutRef = useRef(true);

  // Default to Episode 1 (Mr. Patrick Pereira)
  const [selectedEpisode, setSelectedEpisode] = useState<SeriesEpisode>(
    seriesEpisodesData[0]
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [episodeDurations, setEpisodeDurations] = useState<Record<number, string>>({});
  const [contextMenu, setContextMenu] = useState<{
    isOpen: boolean;
    x: number;
    y: number;
    episode: SeriesEpisode | null;
  }>({
    isOpen: false,
    x: 0,
    y: 0,
    episode: null,
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleItemContextMenu = (e: React.MouseEvent, episode: SeriesEpisode) => {
    if (e.shiftKey) return;
    e.preventDefault();
    e.stopPropagation();
    const x = Math.min(e.clientX, window.innerWidth - 300);
    const y = Math.min(e.clientY, window.innerHeight - 200);
    setContextMenu({
      isOpen: true,
      x: Math.max(10, x),
      y: Math.max(10, y),
      episode,
    });
  };

  const handleCopyEpisodeLink = (e: React.MouseEvent | null, episode: SeriesEpisode) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/?speaker=${episode.id}#episodes`;
      navigator.clipboard.writeText(url).then(() => {
        setToastMessage(`Copied direct video link for ${episode.name}!`);
        setTimeout(() => setToastMessage(null), 3000);
      });
    }
    setContextMenu((prev) => ({ ...prev, isOpen: false }));
  };

  useEffect(() => {
    const handleCloseMenu = () => {
      setContextMenu((prev) => (prev.isOpen ? { ...prev, isOpen: false } : prev));
    };
    window.addEventListener("click", handleCloseMenu);
    window.addEventListener("scroll", handleCloseMenu, true);
    return () => {
      window.removeEventListener("click", handleCloseMenu);
      window.removeEventListener("scroll", handleCloseMenu, true);
    };
  }, []);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds <= 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Preload actual video durations for all playlist episodes
  useEffect(() => {
    const videoElements: HTMLVideoElement[] = [];

    seriesEpisodesData.forEach((episode) => {
      if (episode.videoUrl) {
        const vid = document.createElement("video");
        vid.preload = "metadata";
        vid.src = episode.videoUrl;
        vid.onloadedmetadata = () => {
          if (vid.duration && !isNaN(vid.duration) && vid.duration > 0) {
            setEpisodeDurations((prev) => ({
              ...prev,
              [episode.id]: formatTime(vid.duration),
            }));
          }
        };
        videoElements.push(vid);
      }
    });

    return () => {
      videoElements.forEach((vid) => {
        vid.src = "";
        vid.removeAttribute("src");
        vid.load();
      });
    };
  }, []);

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
      isManuallyPausedRef.current = false;
      wasPlayingBeforeScrollOutRef.current = true;
      videoRef.current.play().catch(() => { });
      setIsPaused(false);
      resetControlsTimeout();
    } else {
      isManuallyPausedRef.current = true;
      wasPlayingBeforeScrollOutRef.current = false;
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

  // Ensure newly mounted video starts playing if entered while not manually paused
  useEffect(() => {
    if (isPlaying && videoRef.current && !isManuallyPausedRef.current) {
      videoRef.current.play().catch(() => { });
      setIsPaused(false);
      resetControlsTimeout();
    }
  }, [isPlaying, selectedEpisode]);

  // Auto-play video when scrolled into this section, stop/pause when scrolled away
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Play video when user enters this section (if not manually closed/paused)
          if (!isManuallyClosedRef.current && !isManuallyPausedRef.current && wasPlayingBeforeScrollOutRef.current) {
            setIsPlaying(true);
            if (videoRef.current) {
              videoRef.current.play().catch(() => { });
              setIsPaused(false);
              resetControlsTimeout();
            }
          }
        } else {
          // Immediately stop/pause video when user scrolls away from this section
          if (videoRef.current && !videoRef.current.paused) {
            wasPlayingBeforeScrollOutRef.current = true;
            videoRef.current.pause();
            setIsPaused(true);
            setShowControls(true);
          } else if (videoRef.current && videoRef.current.paused) {
            wasPlayingBeforeScrollOutRef.current = false;
          }
        }
      },
      {
        threshold: 0.25,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Smooth scroll helper to episode video player section
  const scrollToEpisodesContainer = (smooth = true) => {
    const target =
      (document.querySelector("#episodes > div") as HTMLElement | null) ||
      document.getElementById("episodes");
    if (target) {
      target.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
    }
  };

  // URL Deep Linking: Detect ?speaker=X, ?episode=X, or #speaker-X on load and hash/popstate
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkUrlTarget = (isInitial = false) => {
      const urlParams = new URLSearchParams(window.location.search);
      const speakerQuery =
        urlParams.get("speaker") ||
        urlParams.get("episode") ||
        urlParams.get("id") ||
        urlParams.get("v");

      const hash = window.location.hash.toLowerCase();
      let matchedEpisode: SeriesEpisode | undefined;

      if (speakerQuery) {
        matchedEpisode = findEpisodeByParam(speakerQuery);
      } else if (hash.includes("speaker") || hash.includes("episode")) {
        const cleanedHash = hash.replace(/^[#?]+/, "");
        const hashParams = new URLSearchParams(cleanedHash);
        const hashVal =
          hashParams.get("speaker") ||
          hashParams.get("episode") ||
          hash.replace(/[^0-9]/g, "");
        if (hashVal) {
          matchedEpisode = findEpisodeByParam(hashVal);
        }
      }

      if (matchedEpisode) {
        isManuallyClosedRef.current = false;
        isManuallyPausedRef.current = false;
        wasPlayingBeforeScrollOutRef.current = true;
        setSelectedEpisode(matchedEpisode);
        setIsPlaying(true);
        setIsMuted(false);
        setIsPaused(false);
        setShowControls(true);
        setCurrentTime(0);

        // Scroll to document.querySelector("#episodes > div")
        const delay = isInitial ? 350 : 50;
        setTimeout(() => {
          scrollToEpisodesContainer(true);
        }, delay);
      } else if (window.location.hash === "#episodes") {
        setTimeout(() => {
          scrollToEpisodesContainer(true);
        }, isInitial ? 350 : 50);
      }
    };

    checkUrlTarget(true);

    const handlePopState = () => checkUrlTarget(false);
    const handleHashChange = () => checkUrlTarget(false);

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    const handleSelectEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{ episodeId: number }>;
      const episodeId = customEvent.detail?.episodeId;
      if (episodeId) {
        const targetEpisode = seriesEpisodesData.find((ep) => ep.id === episodeId);
        if (targetEpisode) {
          isManuallyClosedRef.current = false;
          isManuallyPausedRef.current = false;
          wasPlayingBeforeScrollOutRef.current = true;
          setSelectedEpisode(targetEpisode);
          setIsPlaying(true);
          setIsMuted(false);
          setIsPaused(false);
          setShowControls(true);
          setCurrentTime(0);
          resetControlsTimeout();

          if (typeof window !== "undefined") {
            const url = new URL(window.location.href);
            url.searchParams.set("speaker", targetEpisode.id.toString());
            window.history.replaceState(null, "", url.toString());
          }
        }
      }
    };

    window.addEventListener("vota-select-episode", handleSelectEvent);
    return () => window.removeEventListener("vota-select-episode", handleSelectEvent);
  }, []);

  const handleEpisodeSelect = (episode: SeriesEpisode) => {
    isManuallyClosedRef.current = false;
    isManuallyPausedRef.current = false;
    wasPlayingBeforeScrollOutRef.current = true;
    setSelectedEpisode(episode);
    setIsPlaying(true);
    setIsMuted(false);
    setIsPaused(false);
    setShowControls(true);
    setCurrentTime(0);
    resetControlsTimeout();

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("speaker", episode.id.toString());
      window.history.replaceState(null, "", url.toString());
    }
  };

  const handlePlay = () => {
    isManuallyClosedRef.current = false;
    isManuallyPausedRef.current = false;
    wasPlayingBeforeScrollOutRef.current = true;
    setIsPlaying(true);
    setIsMuted(false);
    setIsPaused(false);
    setShowControls(true);
    resetControlsTimeout();
  };

  const handleCloseVideo = () => {
    isManuallyClosedRef.current = true;
    isManuallyPausedRef.current = true;
    wasPlayingBeforeScrollOutRef.current = false;
    setIsPlaying(false);
    setIsPaused(false);
  };

  return (
    <section
      id="episodes"
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#f8f9fa] px-6 sm:px-10 md:px-12 lg:px-[8.7%] py-16 md:py-20 lg:py-24 text-[#202020]"
      aria-labelledby="series-title"
    >
      <div className="mx-auto w-full max-w-[1600px]">
        {/* Header */}
        <div className="mb-12 flex items-center justify-between gap-8 xl:gap-24 max-[760px]:flex-col max-[760px]:items-center max-[760px]:gap-6">
          <p
            id="series-title"
            className="m-0 max-w-[880px] font-geist text-[26px] font-medium leading-[1.3] text-[#333] xl:text-[28px] max-[1024px]:text-[24px] max-[760px]:text-center max-[760px]:text-[22px]"
          >
            This is more than a video series — It is a platform for leaders to{" "}
            <br className="hidden xl:block" />
            share, young professionals to{" "}
            <span className="text-[#159a99]">
              learn, and the entire industry to{" "}
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

        <div className="w-full grid gap-5 xl:gap-[26px] min-[1025px]:grid-cols-[minmax(0,1128fr)_minmax(0,482fr)]">
        {/* Main Featured Video / Poster */}
        <article
          onContextMenu={(e) => handleItemContextMenu(e, selectedEpisode)}
          className="group relative w-full min-h-[500px] sm:min-h-[520px] min-[1025px]:min-h-0 min-[1025px]:aspect-[1128/660] overflow-hidden rounded-[24px] sm:rounded-[30px] max-[760px]:shadow-none max-[760px]:border-0 max-[760px]:ring-0 shadow-xl border-none outline-none bg-transparent"
        >
          {isPlaying ? (
            <div
              onClick={handleContainerClick}
              onMouseMove={() => {
                setShowControls(true);
                resetControlsTimeout();
              }}
              className="relative h-full w-full min-h-[500px] sm:min-h-[520px] min-[1025px]:min-h-0 flex items-center justify-center cursor-pointer select-none overflow-hidden bg-black border-none outline-none"
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
                    onDurationChange={handleLoadedMetadata}
                    onCanPlay={handleLoadedMetadata}
                    onPlay={() => {
                      setIsPaused(false);
                      resetControlsTimeout();
                    }}
                    onPause={() => {
                      setIsPaused(true);
                      setShowControls(true);
                    }}
                    className="absolute inset-0 h-full w-full object-contain min-[1025px]:object-cover pointer-events-none border-none outline-none"
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
              className="relative h-full w-full min-h-[500px] sm:min-h-[520px] min-[1025px]:min-h-0 flex flex-col justify-between p-6 sm:p-8 md:p-10 overflow-hidden"
            >
              {/* Speaker Pillar SVG Thumbnail Image */}
              <img
                src={selectedEpisode.thumbnail}
                alt={selectedEpisode.name}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-cover max-[760px]:object-[92%_center] max-[1024px]:object-[80%_center] min-[1025px]:object-center pointer-events-none z-0"
              />

              {/* Top-Left: VOTA Logo Badge */}
              <div className="relative z-10 pt-1 sm:pt-3 md:pt-4">
                <img
                  src={votaLogo}
                  alt="VOTA - Voices of Talent Acquisition"
                  className="h-[42px] sm:h-[60px] md:h-[88px] xl:h-[96px] w-auto max-w-[170px] sm:max-w-[220px] md:max-w-[280px] rounded-[12px] sm:rounded-[16px] md:rounded-[22px] object-contain shadow-md"
                />
              </div>

              {/* Bottom-Left: Speaker Details & Play Button */}
              <div className="relative z-10 max-w-full sm:max-w-[70%] md:max-w-[60%] pb-2">
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
                    <span>{episodeDurations[selectedEpisode.id] || selectedEpisode.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </article>

        {/* Desktop Playlist: 14 Episodes with Custom Black Scrollbar */}
        <div className="hidden min-[1025px]:block relative h-full min-h-0">
          <div className="absolute inset-0 flex flex-col gap-3 xl:gap-[19px] overflow-y-auto pr-2 xl:pr-3 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar]:w-1.5">
            {seriesEpisodesData.map((episode, index) => {
              const isSelected = selectedEpisode.id === episode.id;

              return (
                <a
                  key={`desktop-${episode.id}-${index}`}
                  href={`/?speaker=${episode.id}#episodes`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleEpisodeSelect(episode);
                  }}
                  onContextMenu={(e) => handleItemContextMenu(e, episode)}
                  className={`no-underline text-inherit group flex cursor-pointer items-center gap-3 xl:gap-4 rounded-[18px] xl:rounded-[22px] p-2.5 xl:p-3 shrink-0 h-[calc((100%-36px)/4)] xl:h-[calc((100%-57px)/4)] transition-all duration-300 ${isSelected
                    ? "border-[1.5px] border-[#159A99] bg-white shadow-md shadow-[#159A99]/10"
                    : "border border-transparent bg-[#F2F4F7]/70 hover:border-[#D0D7DE] hover:bg-white hover:shadow-sm"
                    }`}
                >
                  {/* Thumbnail styled like the selected widget (Figma: width 239, height 150.32, radius 21.63px) */}
                  <div
                    className="relative h-full aspect-[239/150.32] shrink-0 overflow-hidden rounded-[14px] xl:rounded-[21.63px] shadow-sm"
                    style={{
                      background: "radial-gradient(71.47% 191.86% at 92.83% 52.77%, rgba(21, 154, 153, 0) 0%, #159A99 100%), #FFFFFF",
                    }}
                  >
                    {/* Speaker thumbnail */}
                    <img
                      src={episode.thumbnail || episode.bannerImage}
                      alt={episode.name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Gradient shadow */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                    {/* VOTA Logo on thumbnail */}
                    <img
                      src={votaLogo}
                      alt="VOTA"
                      className="absolute top-1.5 left-1.5 xl:top-2 xl:left-2 h-[15px] xl:h-[18px] w-auto max-w-[55px] rounded-[5px] xl:rounded-[6px] object-contain z-10 shadow-sm"
                    />

                    {/* Duration */}
                    <span className="absolute bottom-1.5 right-1.5 xl:bottom-2 xl:right-2 z-10 rounded-md bg-black/80 px-1.5 xl:px-2 py-0.5 font-geist text-[9.5px] xl:text-[10.5px] font-medium text-white">
                      {episodeDurations[episode.id] || episode.duration}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1 flex flex-col justify-center">
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-block w-fit rounded-full border px-2 xl:px-2.5 py-0.5 xl:py-1 font-geist text-[8px] xl:text-[8.5px] font-bold uppercase tracking-wider transition-colors ${isSelected
                          ? "border-[#159A99] bg-[#159A99] text-white"
                          : "border-gray-200 bg-white text-black group-hover:border-gray-300"
                          }`}
                      >
                        Explore VOTA
                      </span>

                      <button
                        type="button"
                        onClick={(e) => handleCopyEpisodeLink(e, episode)}
                        title={`Copy direct link for ${episode.name}`}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-[#159A99]/15 rounded-full text-gray-500 hover:text-[#159A99] cursor-pointer"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>

                    <p
                      className={`mt-1 font-geist text-[13px] xl:text-[15px] font-bold leading-[1.25] xl:leading-[1.3] transition-colors line-clamp-1 ${isSelected ? "text-[#159A99]" : "text-[#222] group-hover:text-[#159A99]"
                        }`}
                    >
                      {episode.name}
                    </p>

                    <p className="mt-0.5 line-clamp-1 xl:line-clamp-2 font-geist text-[11px] xl:text-[12.5px] font-normal leading-tight xl:leading-[1.35] text-[#666]">
                      {episode.role} · {episode.company}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Tablet/Mobile Playlist: Horizontal Swipeable 14 Episodes */}
        <div className="flex gap-4 overflow-x-auto pb-4 pt-1 min-[1025px]:hidden snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {seriesEpisodesData.map((episode, index) => {
            const isSelected = selectedEpisode.id === episode.id;

            return (
              <a
                key={`responsive-${episode.id}-${index}`}
                href={`/?speaker=${episode.id}#episodes`}
                onClick={(e) => {
                  e.preventDefault();
                  handleEpisodeSelect(episode);
                }}
                onContextMenu={(e) => handleItemContextMenu(e, episode)}
                className={`no-underline text-inherit block group w-[220px] shrink-0 snap-start cursor-pointer rounded-[22px] p-3 transition-all duration-300 ${isSelected
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
                  {/* Speaker thumbnail */}
                  <img
                    src={episode.thumbnail || episode.bannerImage}
                    alt={episode.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                    {episodeDurations[episode.id] || episode.duration}
                  </span>
                </div>

                <div className="pt-2.5">
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-block rounded-full border px-2.5 py-0.5 font-geist text-[8.5px] font-bold uppercase tracking-wider ${isSelected
                        ? "border-[#159A99] bg-[#159A99] text-white"
                        : "border-gray-200 bg-white text-black"
                        }`}
                    >
                      Explore VOTA
                    </span>

                    <button
                      type="button"
                      onClick={(e) => handleCopyEpisodeLink(e, episode)}
                      title={`Copy direct link for ${episode.name}`}
                      className="p-1 hover:bg-[#159A99]/15 rounded-full text-gray-500 hover:text-[#159A99] cursor-pointer"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>

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
              </a>
            );
          })}
        </div>
      </div>
    </div>

    {/* Custom Right-Click Context Menu */}
    {contextMenu.isOpen && contextMenu.episode && (
      <div
        style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
        onClick={(e) => e.stopPropagation()}
        className="fixed z-[9999] w-[290px] overflow-hidden rounded-2xl border border-gray-200/90 bg-white/95 p-2 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="px-3 py-2 border-b border-gray-100">
          <p className="font-geist text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
            Share Video Link
          </p>
          <p className="font-geist text-xs font-bold text-gray-900 truncate mt-0.5">
            {contextMenu.episode.name}
          </p>
        </div>

        <div className="py-1 flex flex-col gap-0.5">
          <button
            type="button"
            onClick={() => handleCopyEpisodeLink(null, contextMenu.episode!)}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left font-geist text-xs font-semibold text-gray-800 hover:bg-[#159A99] hover:text-white transition-all cursor-pointer group"
          >
            <svg className="h-4 w-4 text-[#159A99] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>Copy Direct Video Link</span>
          </button>

          <button
            type="button"
            onClick={() => {
              handleEpisodeSelect(contextMenu.episode!);
              setContextMenu((prev) => ({ ...prev, isOpen: false }));
            }}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left font-geist text-xs font-semibold text-gray-800 hover:bg-[#159A99] hover:text-white transition-all cursor-pointer group"
          >
            <svg className="h-4 w-4 text-[#159A99] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>Play Video Now</span>
          </button>

          <a
            href={`/?speaker=${contextMenu.episode.id}#episodes`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setContextMenu((prev) => ({ ...prev, isOpen: false }))}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left font-geist text-xs font-semibold text-gray-800 hover:bg-[#159A99] hover:text-white transition-all cursor-pointer group no-underline"
          >
            <svg className="h-4 w-4 text-[#159A99] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span>Open in New Tab</span>
          </a>
        </div>
      </div>
    )}

    {/* Floating Success Toast */}
    {toastMessage && (
      <div className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2.5 rounded-2xl bg-gray-900 px-4 py-3 text-white shadow-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-5 duration-200">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#159A99] text-white shrink-0">
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="font-geist text-xs font-semibold">{toastMessage}</span>
      </div>
    )}
  </section>
);
}