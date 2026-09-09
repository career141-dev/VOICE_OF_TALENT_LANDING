"use client";

import { useState, useEffect } from "react";
import SeriesSection from "./components/SeriesSection";
import SpeakerSection from "./components/SpeakerSection";
import CoreConversationThemes from "./components/CoreConversationThemes";
import FullReleasesSection from "./components/FullReleasesSection";
import Navbar from "./components/Navbar";
import HeroTitle from "./components/HeroTitle";
import HeroCTAs from "./components/HeroCTAs";
import MissionHeadline from "./components/MissionHeadline";
import Footer from "./components/footer";
import { IndustryVoicesSection } from "./components/Industry";
import BuiltForEveryoneSection from "./components/BuiltForEveryoneSection";
import VotaBannerSection from "./components/VotaBanner";
import { getOptimizedImageUrl } from "./utils/imageLoader";
const R2_MEDIA_URL = (process.env.NEXT_PUBLIC_R2_MEDIA_URL || "").replace(/\/+$/, "");

const backgroundImage = getOptimizedImageUrl(`${R2_MEDIA_URL}/images/hero-background.webp`, 1920);
const microphoneImage = getOptimizedImageUrl(`${R2_MEDIA_URL}/images/heromic.webp`, 900);
const votaLogo = `${R2_MEDIA_URL}/icons/vota-logo.png`;
const arrowUpRight = `${R2_MEDIA_URL}/icons/arrow-up-right.svg`;
const arrowRight = `${R2_MEDIA_URL}/icons/arrow-right.svg`;
const arrowRightDark = `${R2_MEDIA_URL}/icons/arrow-right-dark.svg`;
const arrowAngle = `${R2_MEDIA_URL}/icons/arrow-angle.svg`;
const speakerImage1 = `${R2_MEDIA_URL}/images/speaker1.png`;
const speakerImage2 = `${R2_MEDIA_URL}/images/speaker2.png`;
const speakerImage4 = `${R2_MEDIA_URL}/images/speaker4.png`;


function Arrow({ source }: { source: string }) {
  return <img className="h-[17px] w-[17px] object-contain" src={source} alt="" />;
}

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined" && (window.location.hash === "#top" || window.location.hash === "#hero")) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  const scrollToSpeakers = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("speakers");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <main
        className="hero-frame isolate relative min-h-[710px] sm:min-h-[730px] md:min-h-[750px] lg:min-h-[780px] xl:min-h-[850px] overflow-hidden bg-[#050505] bg-[radial-gradient(ellipse_at_center,rgba(21,154,153,0.22)_0%,#050505_75%)]"
        data-node-id="1:845">
        {/* Background */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <img
            className="h-full w-full object-cover"
            src={backgroundImage}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            sizes="100vw"
            alt=""
          />
        </div>

        {/* Background shade */}
        <div
          className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(0,0,0,.42),transparent_81%)]"
          aria-hidden="true"
        />

        {/* Microphone */}
        <div
          className="pointer-events-none absolute inset-x-0 top-[30%] z-[4] flex justify-center overflow-visible max-[760px]:top-[33%] max-[760px]:z-[1]"
          aria-hidden="true"
        >
          <div className="relative flex w-[clamp(420px,38vw,560px)] max-[760px]:w-[290px] justify-center animate-[microphone-rise_1.5s_cubic-bezier(.22,1,.36,1)_both]">
            <img
              className="h-auto w-full object-contain pointer-events-none select-none blur-[2px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              src={microphoneImage}
              loading="eager"
              decoding="async"
              alt=""
            />
          </div>
        </div>

        {/* Navbar */}
        <Navbar />
        <HeroTitle />
        <div
          className="absolute left-1/2 top-[41%] z-[5] w-[min(92%,935px)] -translate-x-1/2 text-center max-[760px]:top-[38%]"
        >
          <p className="mx-auto mt-4 max-w-[781px] text-[clamp(14px,1.35vw,22px)] leading-[1.6] text-white max-[760px]:px-3 max-[760px]:text-[14px]">
            The voices shaping Sri Lanka&apos;s talent story. Meet the people connecting talent with opportunity, building stronger organizations, and shaping the{" "}<br />future of work in Sri Lanka.
          </p>

          <HeroCTAs />

          {/* People - Identical Gap */}
          <div className="mt-[clamp(34px,3.5vw,50px)] flex justify-center max-[760px]:mt-[34px]" aria-label="Meet the people behind Voices of Talent Acquisition">
            <a
              href="#speakers"
              onClick={scrollToSpeakers}
              className="group flex items-center rounded-[100px] border-2 border-white/80 bg-black/30 p-1 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white hover:bg-black/50 cursor-pointer shadow-lg"
            >
              <div className="relative h-[38px] w-[38px] sm:h-[46px] sm:w-[46px] overflow-hidden rounded-full border-2 border-white bg-[#159A99]/30">
                <img className="h-full w-full object-cover object-top" src={speakerImage1} alt="Mr. Patrick Pereira" />
              </div>
              <div className="relative -ml-3 sm:-ml-4 h-[38px] w-[38px] sm:h-[46px] sm:w-[46px] overflow-hidden rounded-full border-2 border-white bg-[#159A99]/30">
                <img className="h-full w-full object-cover object-top" src={speakerImage4} alt="Ms. Thrimuthi Dhanushka" />
              </div>
              <div className="relative -ml-3 sm:-ml-4 h-[38px] w-[38px] sm:h-[46px] sm:w-[46px] overflow-hidden rounded-full border-2 border-white bg-[#159A99]/30">
                <img className="h-full w-full object-cover object-top" src={speakerImage2} alt="Mr. Ken Vijayakumar" />
              </div>
              <div
                className="relative -ml-3 sm:-ml-4 flex h-[38px] w-[38px] sm:h-[46px] sm:w-[46px] items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45"
              >
                <img className="h-full w-full object-contain" src={arrowAngle} alt="Go to speakers" />
              </div>
            </a>
          </div>

          {/* Powered by Career141 - Identical Gap */}
          <div className="mt-[clamp(34px,3.5vw,50px)] flex w-full justify-center max-[760px]:mt-[34px]">
            <div
              className="flex w-max flex-row flex-nowrap items-center justify-center gap-2 sm:gap-3 md:gap-4"
            >
              {/* Powered by Text Wrapper Div */}
              <div className="flex h-[42px] sm:h-[56px] md:h-[72px] lg:h-[86px] shrink-0 items-center justify-center">
                <span className="whitespace-nowrap font-['Quicksand'] text-[15px] sm:text-[20px] md:text-[24px] lg:text-[28px] font-normal leading-none text-white select-none drop-shadow translate-y-[3px] sm:translate-y-[5px] md:translate-y-[8px] lg:translate-y-[10px]">
                  Powered by
                </span>
              </div>

              {/* Logo Wrapper Div - Same Size */}
              <div className="flex h-[42px] sm:h-[56px] md:h-[72px] lg:h-[86px] shrink-0 items-center justify-center">
                <img
                  src="https://talentsuite-southernchapter.career141.com/IMAGES/Artboard%205%402x%204.svg"
                  alt="Career141 | 20 Years of Excellence"
                  className="h-full w-auto object-contain drop-shadow -translate-y-[4px] sm:-translate-y-[4px] md:-translate-y-[5px] lg:-translate-y-[5px]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <section
        id="mission"
        className="relative overflow-hidden bg-white px-6 sm:px-10 md:px-12 lg:px-[8.7%] pt-14 pb-14 sm:pb-16 md:pt-[70px] md:pb-[100px] min-[1025px]:pt-[100px] min-[1025px]:pb-[150px] text-[#202020]"
        aria-labelledby="mission-title"
      >
        <div className="flex items-start justify-between gap-6 min-[1025px]:gap-20 flex-col min-[1025px]:flex-row">
          <p className="m-0 shrink-0 text-[15px] sm:text-[18px] md:text-[20px] lg:text-[22px] min-[1025px]:text-[23px] font-semibold uppercase tracking-[-.02em] text-[#159a99]">
            — The VOTA Mission
          </p>
          <div className="relative w-full min-[1025px]:w-[min(100%,1081px)] text-left min-[1025px]:text-right">
            <MissionHeadline />
          </div>
        </div>
      </section>

      <SeriesSection />
      <SpeakerSection />
      <CoreConversationThemes />
      <FullReleasesSection />
      <IndustryVoicesSection />
      <BuiltForEveryoneSection />
      <VotaBannerSection />
      <Footer />
    </>
  );
}

