"use client";

import React, { useState, useRef, useEffect } from "react";
import AnimatedCounter from "./AnimatedCounter";
import { DEFAULT_EPISODE_VIDEO_URL, seriesEpisodesData, SeriesEpisode } from "../data/episode";
import { withVersion } from "../utils/imageLoader";

export { seriesEpisodesData };
export type { SeriesEpisode } from "../data/episode";

const R2_MEDIA_URL = (process.env.NEXT_PUBLIC_R2_MEDIA_URL || "").replace(/\/+$/, "");
const votaLogo = withVersion(`${R2_MEDIA_URL}/images/VOTA Background White.svg`);

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
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const isFirstMountRef = useRef(true);
  const isManuallyClosedRef = useRef(false);
  const isManuallyPausedRef = useRef(false);

  // Default to Episode 1 (Mr. Patrick Pereira)
  const [selectedEpisode, setSelectedEpisode] = useState<SeriesEpisode>(seriesEpisodesData[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Default muted without sound for scroll autoplay
  const [isPaused, setIsPaused] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [episodeDurations, setEpisodeDurations] = useState<Record<number, string>>({});
  const [isFullscreen, setIsFullscreen] = useState(false);
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

  const resetControlsTimeout = () => {
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) {
        setShowControls(false);
      }
    }, 3500);
  };

  const safePlay = () => {
    if (!videoRef.current) return;
    const playPromise = videoRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPaused(false);
          resetControlsTimeout();
        })
        .catch(() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current
              .play()
              .then(() => {
                setIsPaused(false);
                resetControlsTimeout();
              })
              .catch(() => {
                setIsPaused(true);
                setShowControls(true);
              });
          }
        });
    }
  };

  const handlePlay = () => {
    isManuallyClosedRef.current = false;
    isManuallyPausedRef.current = false;
    setIsPlaying(true);
    setIsPaused(false);
    setShowControls(true);
    setTimeout(() => {
      safePlay();
    }, 60);
  };

  const handleEpisodeSelect = (episode: SeriesEpisode) => {
    isManuallyClosedRef.current = false;
    isManuallyPausedRef.current = false;
    setSelectedEpisode(episode);
    setIsPlaying(true);
    setIsMuted(false);
    setIsPaused(false);
    setCurrentTime(0);
    setShowControls(true);
    resetControlsTimeout();
    setTimeout(() => {
      safePlay();
    }, 60);

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("speaker", episode.id.toString());
      window.history.replaceState(null, "", url.toString());
    }
  };

  const handleCloseVideo = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    exitAllFullscreen();
    isManuallyClosedRef.current = true;
    isManuallyPausedRef.current = true;
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setIsPaused(false);
    setShowControls(true);
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      isManuallyPausedRef.current = false;
      safePlay();
      setIsPaused(false);
      resetControlsTimeout();
    } else {
      isManuallyPausedRef.current = true;
      videoRef.current.pause();
      setIsPaused(true);
      setShowControls(true);
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
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
      const dur = videoRef.current.duration || 0;
      setDuration(dur);
      setCurrentTime(videoRef.current.currentTime || 0);
      if (isPlaying && !isManuallyPausedRef.current) {
        safePlay();
      }
    }
  };

  const checkIsFullscreen = () => {
    if (typeof document === "undefined") return false;
    const doc = document as unknown as {
      fullscreenElement?: Element;
      webkitFullscreenElement?: Element;
      webkitCurrentFullScreenElement?: Element;
      webkitIsFullScreen?: boolean;
      webkitIsFullscreen?: boolean;
      mozFullScreenElement?: Element;
      msFullscreenElement?: Element;
    };
    const video = videoRef.current as (HTMLVideoElement & {
      webkitDisplayingFullscreen?: boolean;
      webkitPresentationMode?: string;
    }) | null;
    return Boolean(
      doc.fullscreenElement ||
      doc.webkitFullscreenElement ||
      doc.webkitCurrentFullScreenElement ||
      doc.webkitIsFullScreen ||
      doc.webkitIsFullscreen ||
      doc.mozFullScreenElement ||
      doc.msFullscreenElement ||
      video?.webkitDisplayingFullscreen ||
      (video?.webkitPresentationMode && video.webkitPresentationMode === "fullscreen")
    );
  };

  const exitAllFullscreen = () => {
    if (typeof document === "undefined") return;
    const doc = document as unknown as {
      exitFullscreen?: () => Promise<void>;
      webkitExitFullscreen?: () => void;
      webkitCancelFullScreen?: () => void;
      mozCancelFullScreen?: () => void;
      msExitFullscreen?: () => void;
    };
    const video = videoRef.current as (HTMLVideoElement & {
      webkitExitFullscreen?: () => void;
      webkitExitFullScreen?: () => void;
      webkitSetPresentationMode?: (mode: string) => void;
      webkitPresentationMode?: string;
    }) | null;

    try {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      } else if (doc.webkitCancelFullScreen) {
        doc.webkitCancelFullScreen();
      } else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen();
      } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
      }
    } catch {
      // ignore
    }

    if (video) {
      try {
        if (typeof video.webkitExitFullscreen === "function") {
          video.webkitExitFullscreen();
        } else if (typeof video.webkitExitFullScreen === "function") {
          video.webkitExitFullScreen();
        }
        if (typeof video.webkitSetPresentationMode === "function") {
          video.webkitSetPresentationMode("inline");
        }
      } catch {
        // ignore
      }
    }
    setIsFullscreen(false);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current as (HTMLVideoElement & {
      webkitSupportsFullscreen?: boolean;
      webkitEnterFullscreen?: () => void;
      webkitEnterFullScreen?: () => void;
      webkitExitFullscreen?: () => void;
      webkitExitFullScreen?: () => void;
      webkitSetPresentationMode?: (mode: string) => void;
      webkitPresentationMode?: string;
      webkitDisplayingFullscreen?: boolean;
    }) | null;
    const container = playerContainerRef.current as (HTMLDivElement & {
      requestFullscreen?: () => Promise<void>;
      webkitRequestFullscreen?: () => void;
      webkitRequestFullScreen?: () => void;
      mozRequestFullScreen?: () => void;
      msRequestFullscreen?: () => void;
    }) | null;

    if (checkIsFullscreen() || isFullscreen) {
      exitAllFullscreen();
      return;
    }

    if (container && container.requestFullscreen) {
      container
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(() => {
          if (video && typeof video.webkitSetPresentationMode === "function") {
            try {
              video.webkitSetPresentationMode("fullscreen");
              setIsFullscreen(true);
            } catch {}
          } else if (video && typeof video.webkitEnterFullscreen === "function") {
            video.webkitEnterFullscreen();
            setIsFullscreen(true);
          } else if (video && typeof video.webkitEnterFullScreen === "function") {
            video.webkitEnterFullScreen();
            setIsFullscreen(true);
          }
        });
    } else if (container && container.webkitRequestFullscreen) {
      try {
        container.webkitRequestFullscreen();
        setIsFullscreen(true);
      } catch {
        if (video && typeof video.webkitSetPresentationMode === "function") {
          try {
            video.webkitSetPresentationMode("fullscreen");
            setIsFullscreen(true);
          } catch {}
        } else if (video && typeof video.webkitEnterFullscreen === "function") {
          video.webkitEnterFullscreen();
          setIsFullscreen(true);
        }
      }
    } else if (container && container.webkitRequestFullScreen) {
      try {
        container.webkitRequestFullScreen();
        setIsFullscreen(true);
      } catch {
        if (video && typeof video.webkitSetPresentationMode === "function") {
          try {
            video.webkitSetPresentationMode("fullscreen");
            setIsFullscreen(true);
          } catch {}
        } else if (video && typeof video.webkitEnterFullScreen === "function") {
          video.webkitEnterFullScreen();
          setIsFullscreen(true);
        }
      }
    } else if (video && typeof video.webkitSetPresentationMode === "function") {
      try {
        video.webkitSetPresentationMode("fullscreen");
        setIsFullscreen(true);
      } catch {
        if (typeof video.webkitEnterFullscreen === "function") {
          video.webkitEnterFullscreen();
          setIsFullscreen(true);
        }
      }
    } else if (video && typeof video.webkitEnterFullscreen === "function") {
      video.webkitEnterFullscreen();
      setIsFullscreen(true);
    } else if (video && typeof video.webkitEnterFullScreen === "function") {
      video.webkitEnterFullScreen();
      setIsFullscreen(true);
    }
  };

  // Scroll In/Out Observer: Autoplays default Patrick video muted when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // If not manually closed or paused by user, automatically play muted
          if (!isManuallyClosedRef.current && !isManuallyPausedRef.current) {
            setIsPlaying(true);
            setIsPaused(false);
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              const playPromise = videoRef.current.play();
              if (playPromise !== undefined) {
                playPromise.catch(() => {});
              }
            }
          }
        } else {
          // Scrolled out of view: pause playback
          if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
            setIsPaused(true);
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
        if (!isInitial) {
          isManuallyClosedRef.current = false;
          isManuallyPausedRef.current = false;
          setSelectedEpisode(matchedEpisode);
          setIsPlaying(true);
          setIsMuted(false);
          setIsPaused(false);
          setShowControls(true);
          setCurrentTime(0);

          setTimeout(() => {
            scrollToEpisodesContainer(true);
          }, 50);
        } else {
          // On initial page load / refresh: select episode state without scrolling away from hero
          setSelectedEpisode(matchedEpisode);
        }
      } else if (window.location.hash === "#episodes") {
        if (!isInitial) {
          setTimeout(() => {
            scrollToEpisodesContainer(true);
          }, 50);
        }
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

  // Listen for external episode select events
  useEffect(() => {
    const handleSelectEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{ episodeId: number }>;
      const episodeId = customEvent.detail?.episodeId;
      if (episodeId) {
        const targetEpisode = seriesEpisodesData.find((ep) => ep.id === episodeId);
        if (targetEpisode) {
          handleEpisodeSelect(targetEpisode);
        }
      }
    };

    window.addEventListener("vota-select-episode", handleSelectEvent);
    return () => window.removeEventListener("vota-select-episode", handleSelectEvent);
  }, []);

  // Ensure playback starts smoothly when selected episode changes while already playing
  useEffect(() => {
    if (isPlaying && !isManuallyPausedRef.current) {
      safePlay();
    }
  }, [selectedEpisode.id, isPlaying]);

  // Automatically scroll playlist to active episode whenever selectedEpisode changes
  useEffect(() => {
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      return;
    }

    const timer = setTimeout(() => {
      const activeDesktop = document.getElementById(`desktop-playlist-item-${selectedEpisode.id}`);
      if (activeDesktop && activeDesktop.parentElement) {
        const container = activeDesktop.parentElement;
        const targetTop = activeDesktop.offsetTop - container.offsetTop;
        container.scrollTo({ top: targetTop, behavior: "smooth" });
      }

      const activeMobile = document.getElementById(`mobile-playlist-item-${selectedEpisode.id}`);
      if (activeMobile && activeMobile.parentElement) {
        const container = activeMobile.parentElement;
        const targetLeft =
          activeMobile.offsetLeft -
          container.offsetLeft -
          container.clientWidth / 2 +
          activeMobile.clientWidth / 2;
        container.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [selectedEpisode.id]);

  // Keep video muted state synchronized
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Handle fullscreen changes across all platforms (Desktop, Android, iOS Safari)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(checkIsFullscreen());
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        exitAllFullscreen();
      }
    };

    const handleWebkitBegin = () => setIsFullscreen(true);
    const handleWebkitEnd = () => setIsFullscreen(false);

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);
    window.addEventListener("fullscreenchange", handleFullscreenChange);
    window.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    window.addEventListener("resize", handleFullscreenChange);
    window.addEventListener("keydown", handleKeyDown);

    const videoEl = videoRef.current;
    if (videoEl) {
      videoEl.addEventListener("webkitbeginfullscreen", handleWebkitBegin);
      videoEl.addEventListener("webkitendfullscreen", handleWebkitEnd);
      videoEl.addEventListener("webkitpresentationmodechanged", handleFullscreenChange);
    }

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
      window.removeEventListener("fullscreenchange", handleFullscreenChange);
      window.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      window.removeEventListener("resize", handleFullscreenChange);
      window.removeEventListener("keydown", handleKeyDown);
      if (videoEl) {
        videoEl.removeEventListener("webkitbeginfullscreen", handleWebkitBegin);
        videoEl.removeEventListener("webkitendfullscreen", handleWebkitEnd);
        videoEl.removeEventListener("webkitpresentationmodechanged", handleFullscreenChange);
      }
    };
  }, [isPlaying, selectedEpisode.id]);

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
            className="m-0 max-w-[880px] font-geist text-[26px] font-medium leading-[1.3] text-[#333] xl:text-[28px] max-lg:text-[24px] max-[760px]:text-center max-[760px]:text-[22px]"
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
            <p className="m-0 font-geist text-[72px] font-semibold leading-none tracking-tight text-[#222] max-lg:text-[56px] max-[760px]:text-[46px]">
              <AnimatedCounter to={150} suffix="K+" />
            </p>

            <p className="mt-3 font-geist text-[16px] font-medium uppercase tracking-widest text-[#888] max-lg:text-[13px] max-[760px]:text-[10px]">
              Viewers worldwide
            </p>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="w-full grid gap-5 xl:gap-[26px] lg:grid-cols-[minmax(0,960fr)_minmax(0,620fr)] xl:grid-cols-[minmax(0,1000fr)_minmax(0,580fr)] 2xl:grid-cols-[minmax(0,1050fr)_minmax(0,550fr)] items-stretch">
          {/* Main Featured Video / Episode Widget */}
          <article
            onContextMenu={(e) => handleItemContextMenu(e, selectedEpisode)}
            className="group relative w-full aspect-[4/5] min-[480px]:aspect-[3/4] sm:aspect-[16/9.5] md:aspect-[16/9] overflow-hidden rounded-[28px] md:rounded-[32px] max-[760px]:shadow-none max-[760px]:border-0 max-[760px]:ring-0 shadow-xl border-none outline-none bg-black sm:bg-transparent isolate select-none [transform:translateZ(0)] [-webkit-mask-image:-webkit-radial-gradient(white,black)]"
          >
            {isPlaying ? (
              <div
                ref={playerContainerRef}
                onClick={handleContainerClick}
                onMouseMove={() => {
                  setShowControls(true);
                  resetControlsTimeout();
                }}
                onMouseEnter={() => {
                  setShowControls(true);
                  resetControlsTimeout();
                }}
                onMouseLeave={() => {
                  if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
                  setShowControls(false);
                }}
                className="relative h-full w-full flex items-center justify-center cursor-pointer select-none overflow-hidden bg-black sm:bg-transparent border-none outline-none"
              >
                {/* Video Element */}
                <video
                  ref={videoRef}
                  key={selectedEpisode.videoUrl || DEFAULT_EPISODE_VIDEO_URL}
                  src={selectedEpisode.videoUrl || DEFAULT_EPISODE_VIDEO_URL}
                  muted={isMuted}
                  controls={false}
                  playsInline
                  autoPlay
                  preload="auto"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={() => {
                    setIsPaused(true);
                    setShowControls(true);
                  }}
                  className="absolute inset-0 h-full w-full object-contain sm:object-cover rounded-[24px] sm:rounded-[32px] border-0 outline-none bg-black sm:bg-transparent cursor-pointer"
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
                    onClick={toggleMute}
                    className="flex items-center gap-1.5 rounded-full bg-black/75 px-3.5 py-2 font-geist text-xs font-semibold text-white backdrop-blur-md transition-all hover:bg-black cursor-pointer shadow-md border border-white/10 hover:scale-105 active:scale-95"
                    aria-label={isMuted ? "Unmute video sound" : "Mute video sound"}
                  >
                    {isMuted ? (
                      <>
                        <svg className="h-4 w-4 text-[#159A99]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.2"
                            d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                          />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                        </svg>
                        <span>Unmute</span>
                      </>
                    ) : (
                      <>
                        <svg className="h-4 w-4 text-[#159A99]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.2"
                            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                          />
                        </svg>
                        <span>Mute</span>
                      </>
                    )}
                  </button>

                  {/* Top Right Action Buttons: Close Video */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCloseVideo}
                      aria-label="Close video player"
                      className="flex items-center gap-1.5 rounded-full bg-black/70 px-4 py-2 font-geist text-xs font-semibold text-white backdrop-blur-md transition-all hover:bg-black cursor-pointer shadow-md border border-white/10 hover:scale-105 active:scale-95 touch-manipulation"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Close Video</span>
                    </button>
                  </div>
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
                        background: `linear-gradient(to right, #159A99 ${
                          duration > 0 ? (currentTime / duration) * 100 : 0
                        }%, rgba(255, 255, 255, 0.3) ${duration > 0 ? (currentTime / duration) * 100 : 0}%)`,
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

                    {/* Quick -10s / +10s Skip & Fullscreen Button */}
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

                      {/* Fullscreen / Minimize Toggle Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFullscreen();
                          resetControlsTimeout();
                        }}
                        className={`flex h-8 w-8 sm:h-8 sm:w-8 items-center justify-center rounded-full ${
                          isFullscreen
                            ? "bg-[#159A99] text-white shadow-md shadow-[#159A99]/30"
                            : "bg-white/10 text-white hover:bg-white/20"
                        } transition-all active:scale-95 cursor-pointer ml-1 touch-manipulation`}
                        aria-label={isFullscreen ? "Exit Fullscreen / Minimize" : "Enter Fullscreen"}
                        title={isFullscreen ? "Exit Fullscreen / Minimize" : "Enter Fullscreen"}
                      >
                        {isFullscreen ? (
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2.2"
                              d="M4 14h6m0 0v6m0-6L3 21m17-7h-6m0 0v6m0-6l7 7M14 10h6m-6 0V4m0 6l7-7M10 10H4m6 0V4m0 6L3 3"
                            />
                          </svg>
                        ) : (
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2.2"
                              d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Thumbnail / Preview State (Exact previous design) */
              <div
                onClick={handlePlay}
                className="relative h-full w-full flex flex-col justify-between p-6 sm:p-8 lg:p-7 xl:p-8 2xl:p-10 overflow-hidden cursor-pointer group"
              >
                {/* Speaker Pillar SVG Thumbnail Image */}
                <img
                  src={selectedEpisode.thumbnail || selectedEpisode.bannerImage}
                  alt={selectedEpisode.name}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="absolute inset-0 h-full w-full scale-[1.015] object-cover max-[760px]:object-[92%_center] max-lg:object-[80%_center] lg:object-center pointer-events-none z-0 transition-transform duration-500 group-hover:scale-105"
                />

                {/* Top-Left: VOTA Logo Badge */}
                <div className="relative z-10 pt-1 sm:pt-3 md:pt-4">
                  <img
                    src={votaLogo}
                    alt="VOTA - Voices of Talent Acquisition"
                    className="h-[42px] sm:h-[60px] md:h-[80px] lg:h-[84px] xl:h-[96px] w-auto max-w-[170px] sm:max-w-[220px] md:max-w-[260px] lg:max-w-[280px] rounded-[12px] sm:rounded-[16px] md:rounded-[22px] object-contain shadow-md"
                  />
                </div>

                {/* Bottom-Left: Speaker Details & Play Button */}
                <div className="relative z-10 max-w-full sm:max-w-[70%] md:max-w-[65%] pb-2">
                  <h3 className="font-geist text-[26px] sm:text-[30px] md:text-[34px] lg:text-[36px] font-bold leading-tight text-white drop-shadow-md">
                    {selectedEpisode.name}
                  </h3>

                  <p className="mt-2 font-geist text-[14px] sm:text-[15px] md:text-[16px] font-normal leading-snug text-white/90 drop-shadow">
                    {selectedEpisode.role},<br />
                    {selectedEpisode.company}
                  </p>

                  <div className="mt-7 sm:mt-9 flex items-center gap-4 sm:gap-5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlay();
                      }}
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

          {/* Desktop Playlist: 14 Episodes (3 visible at 100% scale, 4 visible when zoomed out / 2xl) with Custom Black Scrollbar */}
          <div className="hidden lg:block relative h-full min-h-0">
            <div className="absolute inset-0 flex flex-col gap-2.5 xl:gap-3 2xl:gap-3 overflow-y-auto pr-1.5 xl:pr-2 2xl:pr-2.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar]:w-1.5 xl:[&::-webkit-scrollbar]:w-2">
              {seriesEpisodesData.map((episode, index) => {
                const isSelected = selectedEpisode.id === episode.id;

                return (
                  <article
                    id={`desktop-playlist-item-${episode.id}`}
                    key={`desktop-${episode.id}-${index}`}
                    onClick={() => handleEpisodeSelect(episode)}
                    className={`group flex cursor-pointer items-center gap-2.5 xl:gap-3 2xl:gap-3.5 rounded-[16px] xl:rounded-[20px] 2xl:rounded-[22px] p-2.5 xl:p-3 2xl:p-3 shrink-0 h-[calc((100%-20px)/3)] xl:h-[calc((100%-24px)/3)] 2xl:h-[calc((100%-36px)/4)] transition-all duration-300 ${
                      isSelected
                        ? "border-[1.5px] border-[#159A99] bg-white shadow-md shadow-[#159A99]/10"
                        : "border border-transparent bg-[#F2F4F7]/70 hover:border-[#D0D7DE] hover:bg-white hover:shadow-sm"
                    }`}
                  >
                    {/* Compact thumbnail maintaining perfect native SVG aspect ratio */}
                    <div
                      className="relative w-[90px] min-[1150px]:w-[100px] xl:w-[112px] 2xl:w-[125px] aspect-[239/150.32] shrink-0 overflow-hidden rounded-[10px] xl:rounded-[13px] 2xl:rounded-[16px] shadow-sm"
                      style={{
                        background:
                          "radial-gradient(71.47% 191.86% at 92.83% 52.77%, rgba(21, 154, 153, 0) 0%, #159A99 100%), #FFFFFF",
                      }}
                    >
                      {/* Speaker thumbnail */}
                      <img
                        src={episode.thumbnail || episode.bannerImage}
                        alt={episode.name}
                        className="absolute inset-0 h-full w-full object-cover object-right transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Gradient shadow */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                      {/* VOTA Logo on thumbnail */}
                      <img
                        src={votaLogo}
                        alt="VOTA"
                        className="absolute top-1.5 left-1.5 xl:top-2 xl:left-2 h-[11px] xl:h-[13px] 2xl:h-[15px] w-auto max-w-[38px] xl:max-w-[46px] 2xl:max-w-[52px] rounded-[3px] object-contain z-10 shadow-sm"
                      />

                      {/* Duration */}
                      <span className="absolute bottom-1.5 right-1.5 xl:bottom-2 xl:right-2 z-10 rounded-md bg-black/80 px-1.5 xl:px-2 py-0.5 font-geist text-[8px] xl:text-[8.5px] 2xl:text-[9.5px] font-medium text-white shadow-sm">
                        {episode.duration}
                      </span>
                    </div>

                    {/* Info - Fully displayed text without any truncation or ellipsis */}
                    <div className="min-w-0 flex-1 flex flex-col justify-center">
                      <span
                        className={`inline-block w-fit rounded-full border px-2 xl:px-2.5 py-0.5 font-geist text-[7.5px] min-[1150px]:text-[8px] xl:text-[8.5px] 2xl:text-[9px] font-bold uppercase tracking-wider transition-colors ${
                          isSelected
                            ? "border-[#159A99] bg-[#159A99] text-white"
                            : "border-gray-200 bg-white text-black group-hover:border-gray-300"
                        }`}
                      >
                        Explore VOTA
                      </span>

                      <p
                        className={`mt-1 font-geist text-[12px] min-[1150px]:text-[13px] xl:text-[14px] 2xl:text-[15px] font-bold leading-tight whitespace-nowrap transition-colors ${
                          isSelected ? "text-[#159A99]" : "text-[#222] group-hover:text-[#159A99]"
                        }`}
                      >
                        {episode.name}
                      </p>

                      <div className="mt-0.5 font-geist text-[9px] min-[1150px]:text-[9.5px] xl:text-[10px] 2xl:text-[10.5px] font-medium leading-[1.25] text-[#555]">
                        {episode.role.includes(",") ? (
                          <>
                            <span className="block">{episode.role.split(",")[0].trim()},</span>
                            <span className="block">{episode.role.split(",").slice(1).join(",").trim()}</span>
                          </>
                        ) : (
                          <span className="block">{episode.role}</span>
                        )}
                      </div>

                      <p className="mt-0.5 font-geist text-[8.5px] min-[1150px]:text-[9px] xl:text-[9.5px] 2xl:text-[10px] font-normal leading-tight text-[#777] whitespace-nowrap">
                        {episode.company}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Tablet/Mobile Playlist: Horizontal Swipeable 14 Episodes */}
          <div className="flex gap-4 overflow-x-auto pb-4 pt-1 lg:hidden snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {seriesEpisodesData.map((episode, index) => {
              const isSelected = selectedEpisode.id === episode.id;

              return (
                <a
                  id={`mobile-playlist-item-${episode.id}`}
                  key={`responsive-${episode.id}-${index}`}
                  href={`/?speaker=${episode.id}#episodes`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleEpisodeSelect(episode);
                  }}
                  onContextMenu={(e) => handleItemContextMenu(e, episode)}
                  className={`no-underline text-inherit block group w-[225px] sm:w-[245px] shrink-0 snap-start cursor-pointer rounded-[22px] p-3 transition-all duration-300 ${
                    isSelected
                      ? "border-[1.5px] border-[#159A99] bg-white shadow-md shadow-[#159A99]/10"
                      : "border border-transparent bg-[#F2F4F7]/80 hover:bg-white hover:shadow-sm"
                  }`}
                >
                  {/* Mobile Thumbnail styled like the selected widget */}
                  <div
                    className="relative h-[115px] w-full overflow-hidden rounded-[16px] shadow-sm"
                    style={{
                      background:
                        "radial-gradient(71.47% 191.86% at 92.83% 52.77%, rgba(21, 154, 153, 0) 0%, #159A99 100%), #FFFFFF",
                    }}
                  >
                    {/* Speaker photo / thumbnail */}
                    <img
                      src={episode.thumbnail || episode.bannerImage}
                      alt={episode.name}
                      className="absolute inset-0 h-full w-full object-cover object-right transition-transform duration-500 group-hover:scale-105"
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
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-block rounded-full border px-2.5 py-0.5 font-geist text-[8.5px] font-bold uppercase tracking-wider ${
                          isSelected
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
                      className={`mt-1.5 font-geist text-[13px] sm:text-[14px] font-bold leading-tight line-clamp-1 ${
                        isSelected ? "text-[#159A99]" : "text-[#222]"
                      }`}
                      title={episode.name}
                    >
                      {episode.name}
                    </p>

                    <div
                      className="mt-1 font-geist text-[10.5px] sm:text-[11px] font-medium leading-[1.3] text-[#555]"
                      title={episode.role}
                    >
                      {episode.role.includes(",") ? (
                        <>
                          <span className="block truncate">{episode.role.split(",")[0].trim()},</span>
                          <span className="block truncate">{episode.role.split(",").slice(1).join(",").trim()}</span>
                        </>
                      ) : (
                        <span className="block truncate">{episode.role}</span>
                      )}
                    </div>

                    <p
                      className="mt-0.5 font-geist text-[9.5px] sm:text-[10px] font-normal leading-tight text-[#888] truncate"
                      title={episode.company}
                    >
                      {episode.company}
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