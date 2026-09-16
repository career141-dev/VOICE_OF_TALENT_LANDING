"use client";

import React, { useRef, useState, useEffect } from "react";

const R2_MEDIA_URL = (process.env.NEXT_PUBLIC_R2_MEDIA_URL || "").replace(/\/+$/, "");
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
  posterImage?: string;
};

const episodes: Episode[] = [
  {
    id: 1,
    number: "01",
    guest: "MR. PATRICK PEREIRA",
    role: "Vice President Learning & Development",
    company: "Aitken Spence Hotels",
    videoUrl: "https://media.career141.com/new%20reels/Mr.%20Patrick/Mr.%20Patrick.mp4",
    posterImage: `${FULL_RELEASE_IMG_BASE}/patrickreel.png`,
    reels: [
      "https://media.career141.com/new%20reels/Mr.%20Patrick/01%20Reel%20Mr.%20Patrick.mp4",
      "https://media.career141.com/new%20reels/Mr.%20Patrick/02%20Reel%20Mr.%20Patrick.mp4",
    ],
    reelDurations: ["1 MIN", "45 SEC"],
  },
  {
    id: 2,
    number: "02",
    guest: "MR. KEN VIJAYAKUMAR",
    role: "Senior General Manager, Human Resource & Sustainability",
    company: "A. Baur & Co. (Pvt) Ltd",
    videoUrl: "https://media.career141.com/new%20reels/Mr.%20Ken/Mr.%20Ken.mp4",
    reels: [
      "https://media.career141.com/new%20reels/Mr.%20Ken/01%20Reel%20Mr.%20Ken.mp4",
      "https://media.career141.com/new%20reels/Mr.%20Ken/02%20Reel%20Mr.%20Ken.mp4",
    ],
    reelDurations: ["50 SEC", "55 SEC"],
  },
  {
    id: 3,
    number: "03",
    guest: "MR. CHAMILA C PERERA",
    role: "Former Managing Director, Head of Human Resources",
    company: "HSBC Malaysia",
    videoUrl: "https://media.career141.com/new%20reels/Mr.%20Chamila%20C%20Perera/Mr.%20Chamila%20C%20Perera.mp4",
    reels: [
      "https://media.career141.com/new%20reels/Mr.%20Chamila%20C%20Perera/01%20Reel%20Mr.%20Chamila%20C%20Perera.mp4",
      "https://media.career141.com/new%20reels/Mr.%20Chamila%20C%20Perera/02%20Reel%20Mr.%20Chamila%20C%20Perera.mp4",
    ],
    reelDurations: ["45 SEC", "1 MIN"],
  },
  {
    id: 4,
    number: "04",
    guest: "MS. THRIMUTHI DHANUSHKA",
    role: "Group Deputy General Manager, Human Resource & Administration",
    company: "Ideal Group",
    videoUrl: "https://media.career141.com/new%20reels/Ms.Thrimuthi/Ms.Thrimuthi.mp4",
    reels: [
      "https://media.career141.com/new%20reels/Ms.Thrimuthi/01%20Reel%20Ms.Thrimuthi.mp4",
      "https://media.career141.com/new%20reels/Ms.Thrimuthi/02%20Reel%20Ms.Thrimuthi.mp4",
    ],
    reelDurations: ["1 MIN", "40 SEC"],
  },
  {
    id: 5,
    number: "05",
    guest: "MS. SURANI AMARASINGHE",
    role: "Director, Country People Partnering, Sri\u00A0Lanka",
    company: "LSEG (London Stock Exchange Group)",
    videoUrl: "https://media.career141.com/new%20reels/Ms.%20Surani/Ms.%20Surani.mp4",
    reels: [
      "https://media.career141.com/new%20reels/Ms.%20Surani/01%20Reel%20Ms.%20Surani.mp4",
      "https://media.career141.com/new%20reels/Ms.%20Surani/02%20Reel%20Ms.%20Surani.mp4",
    ],
    reelDurations: ["55 SEC", "50 SEC"],
  },
  {
    id: 6,
    number: "06",
    guest: "MR. ARSHAQ FARALLY",
    role: "Chief People Officer, Sri\u00A0Lanka",
    company: "Daraz",
    videoUrl: "https://media.career141.com/new%20reels/Mr.%20Arshaq/Mr.%20Arshaq.mp4",
    reels: [
      "https://media.career141.com/new%20reels/Mr.%20Arshaq/01%20Reel%20Arshaq.mp4",
      "https://media.career141.com/new%20reels/Mr.%20Arshaq/02%20Reel%20Arshaq.mp4",
    ],
    reelDurations: ["45 SEC", "1 MIN"],
  },
  {
    id: 7,
    number: "07",
    guest: "MR. DANUSHKA SENETH",
    role: "Head of Human Resources / AGM",
    company: "Janashakthi Insurance PLC",
    videoUrl: "https://media.career141.com/new%20reels/Mr.%20Danushaka/Mr.%20Danushaka.mp4",
    reels: [
      "https://media.career141.com/new%20reels/Mr.%20Danushaka/Reel%2001%20Mr.%20Danushaka.mp4",
      "https://media.career141.com/new%20reels/Mr.%20Danushaka/Reel%2002%20Mr.%20Danushaka.mp4",
    ],
    reelDurations: ["1 MIN", "45 SEC"],
  },
  {
    id: 8,
    number: "08",
    guest: "MS. HASANTHI DE SARAM",
    role: "Director / Senior HR Consultant",
    company: "(Former Director HR - Asiri Health)",
    videoUrl: "https://media.career141.com/new%20reels/Ms.%20Hasanthi/Ms.%20Hasanthi.mp4",
    posterImage: `${FULL_RELEASE_IMG_BASE}/hasanthireel.png`,
    reels: [
      "https://media.career141.com/new%20reels/Ms.%20Hasanthi/01%20Reel%20Ms.%20Hasanthi.mp4",
      "https://media.career141.com/new%20reels/Ms.%20Hasanthi/02%20Reel%20Ms.%20Hasanthi.mp4",
    ],
    reelDurations: ["50 SEC", "55 SEC"],
  },
  {
    id: 9,
    number: "09",
    guest: "MR. ASHAN RANSILIGE",
    role: "Chief Executive Officer",
    company: "Link Natural Products (Pvt.) Ltd",
    videoUrl: "https://media.career141.com/new%20reels/Mr%20Ashan/Mr%20Ashan.mp4",
    reels: [
      "https://media.career141.com/new%20reels/Mr%20Ashan/01%20Reel%20Mr%20Ashan.mp4",
      "https://media.career141.com/new%20reels/Mr%20Ashan/02%20Reel%20Mr%20Ashan.mp4",
    ],
    reelDurations: ["45 SEC", "1 MIN"],
  },
  {
    id: 10,
    number: "10",
    guest: "MR. INDIKA RANATHUNGA",
    role: "Chief Operating Officer",
    company: "Allied Commercial Fertilizers",
    videoUrl: "https://media.career141.com/new%20reels/Mr.%20Indika/Mr.%20Indika.mp4",
    reels: [
      "https://media.career141.com/new%20reels/Mr.%20Indika/Reel%201%20Mr.%20Indika.mp4",
      "https://media.career141.com/new%20reels/Mr.%20Indika/Reel%202%20Mr.%20Indika.mp4",
    ],
    reelDurations: ["1 MIN", "50 SEC"],
  },
  {
    id: 11,
    number: "11",
    guest: "MS. CHAMINDRA PERERA",
    role: "Human Resources Director",
    company: "GRI Sri\u00A0Lanka",
    videoUrl: "https://media.career141.com/new%20reels/Ms.%20Chamindra/Ms.%20Chamindra.mp4",
    reels: [
      "https://media.career141.com/new%20reels/Ms.%20Chamindra/1%20Reel%20Ms.%20Chamindra.mp4",
      "https://media.career141.com/new%20reels/Ms.%20Chamindra/2%20Reel%20Ms.%20Chamindra.mp4",
    ],
    reelDurations: ["55 SEC", "45 SEC"],
  },
  {
    id: 12,
    number: "12",
    guest: "MS. CHANDIMA BAMBARENDA",
    role: "Group Head of Human Resources",
    company: "Pyramid Wilmar Group",
    videoUrl: "https://media.career141.com/new%20reels/Ms.%20Chandima/Ms.%20Chandima.mp4",
    reels: [
      "https://media.career141.com/new%20reels/Ms.%20Chandima/1%20Reel%20Ms.%20Chandima.mp4",
      "https://media.career141.com/new%20reels/Ms.%20Chandima/2%20Reel%20Ms.%20Chandima.mp4",
    ],
    reelDurations: ["45 SEC", "1 MIN"],
  },
  {
    id: 13,
    number: "13",
    guest: "MR. GEHAN SAMUEL",
    role: "Manager of Human Resources Development",
    company: "MAS Holdings Silueta",
    videoUrl: "https://media.career141.com/new%20reels/Mr.%20Gehan/Mr.%20Gehan.mp4",
    reels: [
      "https://media.career141.com/new%20reels/Mr.%20Gehan/01%20Reel%20Mr.%20Gehan.mp4",
      "https://media.career141.com/new%20reels/Mr.%20Gehan/02%20Reel%20Mr.%20Gehan.mp4",
    ],
    reelDurations: ["1 MIN", "55 SEC"],
  },
  {
    id: 14,
    number: "14",
    guest: "MR. KANISHKA MUNASINGHE",
    role: "General Manager, Human Resources",
    company: "Port City BPO",
    videoUrl: "https://media.career141.com/new%20reels/Mr.%20Kanishka/Mr.%20Kanishka.mp4",
    reels: [
      "https://media.career141.com/new%20reels/Mr.%20Kanishka/01%20Reel%20Mr.%20Kanishka.mp4",
      "https://media.career141.com/new%20reels/Mr.%20Kanishka/02%20Reel%20Mr.%20Kanishka.mp4",
    ],
    reelDurations: ["50 SEC", "45 SEC"],
  },
];

export default function FullReleasesSection() {
  const [selectedEpisode, setSelectedEpisode] = useState(episodes[0]);
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [reelDurations, setReelDurations] = useState<Record<string, string>>({});

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const reelSliderRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /* Touch Swiping Refs */
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchStartTime = useRef<number>(0);
  const isSwipingTouch = useRef<boolean>(false);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds <= 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Preload actual video durations for all reel episodes
  useEffect(() => {
    const videoElements: HTMLVideoElement[] = [];

    episodes.forEach((episode) => {
      const reels = episode.reels && episode.reels.length > 0
        ? episode.reels
        : [episode.videoUrl || "", episode.videoUrl || ""];

      reels.forEach((reelUrl, idx) => {
        if (reelUrl) {
          const vid = document.createElement("video");
          vid.preload = "metadata";
          vid.src = reelUrl;
          vid.onloadedmetadata = () => {
            if (vid.duration && !isNaN(vid.duration) && vid.duration > 0) {
              setReelDurations((prev) => ({
                ...prev,
                [`${episode.id}-${idx}`]: formatTime(vid.duration),
              }));
            }
          };
          videoElements.push(vid);
        }
      });
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
      videoRef.current.play().catch(() => { });
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
      const dur = videoRef.current.duration || 0;
      setDuration(dur);
      setCurrentTime(videoRef.current.currentTime || 0);
      if (dur > 0) {
        setReelDurations((prev) => ({
          ...prev,
          [`${selectedEpisode.id}-${activeReelIndex}`]: formatTime(dur),
        }));
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
      mozFullScreenElement?: Element;
      msFullscreenElement?: Element;
    };
    const video = videoRef.current as (HTMLVideoElement & {
      webkitDisplayingFullscreen?: boolean;
    }) | null;

    return Boolean(
      doc.fullscreenElement ||
      doc.webkitFullscreenElement ||
      doc.webkitCurrentFullScreenElement ||
      doc.webkitIsFullScreen ||
      doc.mozFullScreenElement ||
      doc.msFullscreenElement ||
      video?.webkitDisplayingFullscreen
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
      webkitDisplayingFullscreen?: boolean;
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
      } catch {
        // ignore
      }
    }
    setIsFullscreen(false);
  };

  const toggleFullscreen = () => {
    const container = playerContainerRef.current as (HTMLDivElement & {
      requestFullscreen?: () => Promise<void>;
      webkitRequestFullscreen?: () => void;
      webkitRequestFullScreen?: () => void;
      mozRequestFullScreen?: () => void;
      msRequestFullscreen?: () => void;
    }) | null;

    const video = videoRef.current as (HTMLVideoElement & {
      webkitSupportsFullscreen?: boolean;
      webkitDisplayingFullscreen?: boolean;
      webkitEnterFullscreen?: () => void;
      webkitEnterFullScreen?: () => void;
      webkitExitFullscreen?: () => void;
      webkitExitFullScreen?: () => void;
    }) | null;

    if (!container && !video) return;

    const isCurrentlyFullscreen = checkIsFullscreen();

    if (!isCurrentlyFullscreen) {
      if (container && container.requestFullscreen) {
        container.requestFullscreen().catch(() => {
          if (video && typeof video.webkitEnterFullscreen === "function") {
            video.webkitEnterFullscreen();
          } else if (video && typeof video.webkitEnterFullScreen === "function") {
            video.webkitEnterFullScreen();
          }
        });
      } else if (container && container.webkitRequestFullscreen) {
        try {
          container.webkitRequestFullscreen();
        } catch {
          if (video && typeof video.webkitEnterFullscreen === "function") {
            video.webkitEnterFullscreen();
          }
        }
      } else if (container && container.webkitRequestFullScreen) {
        try {
          container.webkitRequestFullScreen();
        } catch {
          if (video && typeof video.webkitEnterFullScreen === "function") {
            video.webkitEnterFullScreen();
          }
        }
      } else if (video && typeof video.webkitEnterFullscreen === "function") {
        video.webkitEnterFullscreen();
      } else if (video && typeof video.webkitEnterFullScreen === "function") {
        video.webkitEnterFullScreen();
      }
    } else {
      exitAllFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(checkIsFullscreen());
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && checkIsFullscreen()) {
        exitAllFullscreen();
      }
    };

    const handleWebkitBegin = () => setIsFullscreen(true);
    const handleWebkitEnd = () => setIsFullscreen(false);

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);
    window.addEventListener("keydown", handleKeyDown);

    const videoEl = videoRef.current;
    if (videoEl) {
      videoEl.addEventListener("webkitbeginfullscreen", handleWebkitBegin);
      videoEl.addEventListener("webkitendfullscreen", handleWebkitEnd);
    }

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
      window.removeEventListener("keydown", handleKeyDown);
      if (videoEl) {
        videoEl.removeEventListener("webkitbeginfullscreen", handleWebkitBegin);
        videoEl.removeEventListener("webkitendfullscreen", handleWebkitEnd);
      }
    };
  }, [isPlaying, selectedEpisode, activeReelIndex]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const maxScroll = scrollHeight - clientHeight;
    if (maxScroll > 0) {
      setScrollProgress(scrollTop / maxScroll);
    }
  };

  const handleReelScroll = () => {
    if (!reelSliderRef.current || isProgrammaticScroll.current) return;
    const { scrollLeft, clientWidth } = reelSliderRef.current;
    if (clientWidth === 0) return;
    const newIndex = Math.round(scrollLeft / clientWidth);
    if (newIndex !== activeReelIndex && (newIndex === 0 || newIndex === 1)) {
      setActiveReelIndex(newIndex);
    }
  };

  const scrollToReel = (index: number) => {
    setActiveReelIndex(index);
    setCurrentTime(0);
    setIsPlaying(false);
    setIsPaused(false);
    setShowControls(true);

    if (reelSliderRef.current) {
      isProgrammaticScroll.current = true;
      const width = reelSliderRef.current.clientWidth;
      reelSliderRef.current.scrollTo({
        left: index * width,
        behavior: "smooth",
      });
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 500);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (reelSliderRef.current) {
        const width = reelSliderRef.current.clientWidth;
        reelSliderRef.current.scrollLeft = activeReelIndex * width;
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeReelIndex]);

  const selectEpisode = (episode: Episode) => {
    setSelectedEpisode(episode);
    setActiveReelIndex(0);
    if (reelSliderRef.current) {
      reelSliderRef.current.scrollLeft = 0;
    }
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentTime(0);
    setShowControls(true);
  };

  /* ── Mobile Touch Swiping Handlers ── */
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isPlaying) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = Date.now();
    isSwipingTouch.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isPlaying || touchStartX.current === null || touchStartY.current === null) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = Math.abs(currentX - touchStartX.current);
    const diffY = Math.abs(currentY - touchStartY.current);
    if (diffX > 8 && diffX > diffY) {
      isSwipingTouch.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isPlaying || touchStartX.current === null || touchStartY.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const endY = e.changedTouches[0]?.clientY ?? touchStartY.current;
    const diffX = endX - touchStartX.current;
    const diffY = endY - touchStartY.current;
    const elapsed = Date.now() - touchStartTime.current;
    const speedX = Math.abs(diffX) / Math.max(elapsed, 1);

    if ((Math.abs(diffX) > 25 || (Math.abs(diffX) > 12 && speedX > 0.15)) && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        scrollToReel(1);
      } else {
        scrollToReel(0);
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
    setTimeout(() => {
      isSwipingTouch.current = false;
    }, 150);
  };

  const currentReels = selectedEpisode.reels && selectedEpisode.reels.length > 0
    ? selectedEpisode.reels
    : [selectedEpisode.videoUrl || "", selectedEpisode.videoUrl || ""];

  return (
    <section
      id="full-releases"
      className="w-full overflow-hidden bg-[#F5F7FA] px-6 sm:px-10 md:px-12 lg:px-[8.7%] py-16 md:py-20 lg:py-24 text-[#262626]"
    >
      <div className="mx-auto w-full max-w-[1600px]">
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
        <div className="w-full flex flex-col-reverse gap-6 min-[1100px]:gap-8 min-[1100px]:grid min-[1100px]:grid-cols-[minmax(0,688fr)_minmax(0,887fr)] min-[1100px]:items-start">
          {/* Episode Playlist with Custom Scroll Indicator */}
          <div className="relative flex h-[441px] sm:h-[660px] w-full max-w-full overflow-hidden rounded-[24px] sm:rounded-[30px] bg-[#F5F7FA]">
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
                    <div className="relative z-10 ml-auto flex min-w-0 max-w-[82%] sm:max-w-[85%] min-[1100px]:max-w-[86%] xl:max-w-[88%] flex-col justify-center text-right">
                      <p
                        className={[
                          "font-geist text-[13px] sm:text-[14.5px] md:text-[15.5px] lg:text-[16px] xl:text-[16.5px] font-bold uppercase tracking-tight sm:tracking-wide leading-tight sm:leading-snug transition-colors duration-300 truncate",
                          isSelected ? "text-[#159A99]" : "text-[#202020] group-hover:text-[#159A99]",
                        ].join(" ")}
                        title={episode.guest}
                      >
                        {episode.guest}
                      </p>

                      <div
                        className={[
                          "mt-0.5 sm:mt-1 font-geist text-[10px] sm:text-[11px] md:text-[11.5px] lg:text-[12px] xl:text-[12.5px] font-medium leading-[1.25] sm:leading-[1.3] transition-colors duration-300",
                          isSelected
                            ? "text-[#202020]"
                            : "text-[#555555] group-hover:text-[#202020]",
                        ].join(" ")}
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
                        className={[
                          "mt-0.5 font-geist text-[9.5px] sm:text-[10px] md:text-[10.5px] lg:text-[11px] xl:text-[11.5px] font-normal leading-tight transition-colors duration-300 truncate",
                          isSelected
                            ? "text-[#666666]"
                            : "text-[#7A828A] group-hover:text-[#444444]",
                        ].join(" ")}
                        title={episode.company}
                      >
                        {episode.company}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Video Player Section with Reel Thumbnail Poster & Swipeable 2-Reel Slider */}
        <div className="flex w-full min-[1100px]:h-[660px] max-w-full flex-col items-center min-[1100px]:justify-between">
          <div
            ref={reelSliderRef}
            onScroll={handleReelScroll}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative flex h-[380px] sm:h-[460px] md:h-[540px] min-[1100px]:h-auto min-[1100px]:flex-1 min-[1100px]:min-h-0 w-full max-w-full overflow-x-auto min-[1100px]:overflow-x-hidden overflow-y-hidden rounded-[24px] sm:rounded-[30px] border-[1.62px] border-[#E0E0E0] bg-black shadow-lg opacity-100 snap-x min-[1100px]:snap-none snap-mandatory snap-always overscroll-x-contain touch-pan-x touch-pan-y [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              touchAction: "pan-x pan-y",
            }}
          >
            {/* Render 2 Reel Slides (Reel 1 & Reel 2) */}
            {[0, 1].map((reelIdx) => {
              const reelUrl = currentReels[reelIdx];
              const isCurrentSlideActive = activeReelIndex === reelIdx;
              const isCurrentSlidePlaying = isPlaying && isCurrentSlideActive;

              return (
                <article
                  key={reelIdx}
                  className="relative h-full w-full min-w-full shrink-0 snap-start snap-always overflow-hidden bg-black select-none cursor-pointer"
                  style={{
                    scrollSnapAlign: "start",
                    scrollSnapStop: "always",
                  }}
                >
                  {isCurrentSlidePlaying ? (
                    <div
                      ref={isCurrentSlideActive ? playerContainerRef : null}
                      onClick={handleContainerClick}
                      onMouseMove={() => {
                        setShowControls(true);
                        resetControlsTimeout();
                      }}
                      className="relative h-full w-full bg-black flex items-center justify-center select-none cursor-pointer overflow-hidden"
                    >
                      {reelUrl ? (
                        <>
                          <video
                            ref={isCurrentSlideActive ? videoRef : null}
                            key={`${selectedEpisode.id}-${reelIdx}-${reelUrl}`}
                            src={reelUrl}
                            autoPlay
                            muted={isMuted}
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
                              aria-label={isMuted ? "Unmute reel sound" : "Mute reel sound"}
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

                            {/* Top Right Action Buttons: Exit Fullscreen + Close Video */}
                            <div className="flex items-center gap-2">
                              {isFullscreen && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    exitAllFullscreen();
                                    resetControlsTimeout();
                                  }}
                                  aria-label="Exit Fullscreen"
                                  className="flex items-center gap-1.5 rounded-full bg-[#159A99] px-3.5 py-2 font-geist text-xs font-bold text-white shadow-lg backdrop-blur-md transition-all hover:bg-[#128281] active:scale-95 cursor-pointer"
                                >
                                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 9L4 4m0 5h5V4m6 6l5-5m-5 5V4h5M9 15l-5 5m5-5H4v5m11-5l5 5m-5-5h5v5" />
                                  </svg>
                                  Exit Fullscreen
                                </button>
                              )}

                              {/* Close Video button */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  exitAllFullscreen();
                                  setIsPlaying(false);
                                  setIsPaused(false);
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
                          </div>

                          {/* Center Pause/Play Indicator Overlay */}
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
                              aria-label={isPaused ? "Play reel" : "Pause reel"}
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
                                aria-label="Reel timeline scrubber"
                              />
                            </div>

                            {/* Bottom Row: Play/Pause Icon + Timestamps + Quick 10s Skip Buttons + Fullscreen */}
                            <div className="mt-1 flex items-center justify-between font-geist text-xs sm:text-sm font-medium text-white">
                              <div className="flex items-center gap-3">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    togglePlayPause();
                                  }}
                                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30 transition-all active:scale-95 cursor-pointer"
                                  aria-label={isPaused ? "Play reel" : "Pause reel"}
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

                                {/* Fullscreen Button */}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFullscreen();
                                    resetControlsTimeout();
                                  }}
                                  className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full ${
                                    isFullscreen ? "bg-[#159A99] text-white" : "bg-white/10 text-white hover:bg-white/20"
                                  } transition-all active:scale-95 cursor-pointer ml-1`}
                                  aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                                  title={isFullscreen ? "Exit Fullscreen" : "Full Screen"}
                                >
                                  {isFullscreen ? (
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 9L4 4m0 5h5V4m6 6l5-5m-5 5V4h5M9 15l-5 5m5-5H4v5m11-5l5 5m-5-5h5v5" />
                                    </svg>
                                  ) : (
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                    </svg>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="relative flex flex-col items-center justify-center p-8 text-center text-white pointer-events-none">
                          <p className="font-geist text-2xl font-bold">{selectedEpisode.guest}</p>
                          <p className="mt-2 font-geist text-sm text-white/70">Reel release coming soon</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        if (isSwipingTouch.current) return;
                        scrollToReel(reelIdx);
                        setIsPlaying(true);
                        setIsPaused(false);
                      }}
                      className="relative h-full w-full bg-cover bg-center overflow-hidden flex flex-col justify-between p-8 sm:p-10 group cursor-pointer"
                      style={{
                        backgroundImage: `url('${reelBackground}')`,
                      }}
                    >
                      {/* Full Cover Thumbnail Image (Unified for Mobile & Desktop) */}
                      <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        <img
                          src={
                            selectedEpisode.posterImage || `${FULL_RELEASE_IMG_BASE}/reelspeaker${selectedEpisode.id}.png`
                          }
                          alt={selectedEpisode.guest}
                          draggable={false}
                          className="h-full w-full object-cover object-[center_top] select-none pointer-events-none transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Bottom Row: Circular Teal Play Button (Bottom-Left) & Teal Duration Pill (Bottom-Right) */}
                      <div className="relative z-10 flex items-center justify-between mt-auto w-full">
                        {/* Circular Teal Play Button (Bottom-Left) */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isSwipingTouch.current) return;
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
                        <span className="inline-block rounded-full bg-[#159A99] px-5 py-2 font-geist text-[13px] sm:text-[14px] font-bold tracking-wide text-white shadow-md tabular-nums">
                          REEL 0{reelIdx + 1} · {reelDurations[`${selectedEpisode.id}-${reelIdx}`] || selectedEpisode.reelDurations?.[reelIdx] || "00:00"}
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
    </div>
  </section>
  );
}