"use client";

import { useState } from "react";
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
const microphoneImage = getOptimizedImageUrl(`${R2_MEDIA_URL}/images/microphone.webp`, 900);
const votaLogo = `${R2_MEDIA_URL}/icons/vota-logo.png`;
const arrowUpRight = `${R2_MEDIA_URL}/icons/arrow-up-right.svg`;
const arrowRight = `${R2_MEDIA_URL}/icons/arrow-right.svg`;
const arrowRightDark = `${R2_MEDIA_URL}/icons/arrow-right-dark.svg`;
const arrowAngle = `${R2_MEDIA_URL}/icons/arrow-angle.svg`;
const portraitImage = getOptimizedImageUrl(`${R2_MEDIA_URL}/images/portrait.png`, 500);
const speakerImage1 = `${R2_MEDIA_URL}/images/speaker1.png`;
const speakerImage2 = `${R2_MEDIA_URL}/images/speaker2.png`;
const speakerImage4 = `${R2_MEDIA_URL}/images/speaker4.png`;


function Arrow({ source }: { source: string }) {
  return <img className="h-[17px] w-[17px] object-contain" src={source} alt="" />;
}

export default function Home() {
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
        className="hero-frame isolate relative min-h-[900px] overflow-hidden bg-[#050505] bg-[radial-gradient(ellipse_at_center,rgba(21,154,153,0.22)_0%,#050505_75%)] max-[760px]:min-h-[670px]"
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
          className="pointer-events-none absolute left-[calc(25%+27px)] top-[26%] z-[4] h-[108.2%] w-[min(46.82vw,899px)] overflow-hidden [--microphone-shift:0%] animate-[microphone-rise_1.5s_cubic-bezier(.22,1,.36,1)_both] max-[760px]:left-[20%] max-[760px]:top-[34%] max-[760px]:h-[92%]"
          aria-hidden="true"
        >
          <img
            className="absolute left-[-19.25%] top-[-32%] h-[130%] w-[119.22%] max-w-none object-cover blur-[2px]"
            src={microphoneImage}
            loading="eager"
            decoding="async"
            alt=""
          />
        </div>

        {/* Navbar */}
        <Navbar />
        <HeroTitle />
        <div
          className="absolute left-1/2 top-[43%] z-[5] w-[min(92%,935px)] -translate-x-1/2 text-center max-[760px]:top-[45%]"
        >
          <p className="mx-auto mt-4 max-w-[781px] text-[clamp(14px,1.35vw,22px)] leading-[1.6] text-white max-[760px]:px-3 max-[760px]:text-[14px]">
            The voices shaping Sri Lanka&apos;s talent story. Meet the people connecting talent with opportunity, building stronger organizations, and shaping the<br />future of work in Sri Lanka.
          </p>

          <HeroCTAs />
        </div>

        {/* People */}
        <div
          className="absolute bottom-[7%] left-1/2 z-[10] flex -translate-x-1/2 max-[760px]:bottom-[4%]"
          aria-label="Meet the people behind Voice of Talent"
        >
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
      </main>

      <section
        id="mission"
        className="relative overflow-hidden bg-white px-6 min-[1367px]:px-[8.7%] pt-14 pb-0 min-[1367px]:pt-[100px] min-[1367px]:pb-16 text-[#202020]"
        aria-labelledby="mission-title"
      >
        <div className="flex items-start justify-between gap-6 min-[1367px]:gap-20 flex-col min-[1367px]:flex-row">
          <p className="m-0 shrink-0 text-[15px] sm:text-[18px] md:text-[20px] min-[1367px]:text-[23px] font-semibold uppercase tracking-[-.02em] text-[#159a99]">
            — The VOTA Mission
          </p>
          <div className="relative w-full min-[1367px]:w-[min(100%,1081px)] text-left min-[1367px]:text-right">
            <MissionHeadline />

            <div className="block -mt-7 sm:-mt-5 md:-mt-3 relative min-[1367px]:absolute min-[1367px]:left-[46%] min-[1367px]:top-[68px] min-[1367px]:mt-0 z-[2] w-[145px] sm:w-[170px] md:w-[190px] min-[1367px]:w-[210px] pointer-events-none">
              <img
                className="w-full h-auto object-contain"
                src={portraitImage}
                loading="lazy"
                decoding="async"
                alt="A member of the Voice of Talent community"
              />
            </div>
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

