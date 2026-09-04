"use client";

import React from "react";

const R2_MEDIA_URL = (process.env.NEXT_PUBLIC_R2_MEDIA_URL || "").replace(/\/+$/, "");
const footerMobImage = `${R2_MEDIA_URL}/images/footermob.png`;
const containerImage = `${R2_MEDIA_URL}/images/Container.png`;
const artboardImage = `${R2_MEDIA_URL}/images/Artboard.svg`;

export default function VotaBannerSection() {
  return (
    <section className="w-full bg-[#F5F7FA] px-4 py-10 sm:px-8 md:px-12 lg:px-[8.7%] lg:py-24">
      <div
        className="
          vota-banner-bg
          relative
          mx-auto
          flex
          min-h-[580px]
          w-full
          max-w-[1636px]
          flex-col
          justify-between
          overflow-hidden
          rounded-[30px]
          border
          border-[1.03px]
          bg-cover
          bg-center
          px-6
          py-8
          sm:min-h-[520px]
          sm:rounded-[40px]
          sm:px-12
          sm:py-12
          lg:min-h-0
          lg:rounded-[51.25px]
          lg:px-14
          lg:py-16
        "
      >
        <style>{`
          .vota-banner-bg {
            background-image: url('${footerMobImage}');
          }
          @media (min-width: 768px) {
            .vota-banner-bg {
              background-image: url('${containerImage}');
            }
          }
        `}</style>
        {/* Subtle overlay for contrast */}
        <div className="pointer-events-none absolute inset-0 bg-black/20 md:bg-black/10" />

        <div className="relative z-10 flex h-full min-h-[500px] w-full flex-col justify-between items-start sm:min-h-0">
          {/* Career141 / VOTA Logo (Pinned at top) */}
          <img
            src={artboardImage}
            alt="Career141 and VOTA"
            loading="lazy"
            decoding="async"
            className="h-auto w-[160px] object-contain sm:w-[220px] lg:w-[400px]"
          />

          {/* Banner Content & Buttons — Vertically Centered on Mobile */}
          <div className="my-auto w-full max-sm:py-6 sm:my-0 sm:mt-12 md:mt-20">
            <h2 className="max-w-[760px] font-['Geist'] text-[24px] font-semibold leading-[1.22] tracking-[-0.03em] text-white sm:text-[32px] md:text-[38px] lg:text-[46px]">
              Sri Lanka&apos;s Talent Story Is Being Written Today.
              <br className="hidden sm:block" />{" "}
              Let The Voices Behind It Be Heard.
            </h2>

            {/* Buttons Row — Single row layout */}
            <div className="mt-12 flex flex-row flex-nowrap items-center gap-2.5 sm:mt-10 sm:gap-4 md:mt-16">
              {/* Watch VOTA Button */}
              <a
                href="#episodes"
                className="
                  inline-flex
                  h-[48px]
                  flex-1
                  items-center
                  justify-center
                  rounded-full
                  bg-[#159A99]
                  px-3
                  font-['Geist']
                  text-[13px]
                  font-semibold
                  whitespace-nowrap
                  text-white
                  transition-all
                  duration-300
                  ease-out
                  hover:scale-[1.03]
                  hover:bg-[#0F7E7D]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-white
                  sm:h-[68px]
                  sm:w-[223px]
                  sm:flex-none
                  sm:px-0
                  sm:text-[20px]
                "
              >
                Watch VOTA
              </a>

              {/* Follow the Series Button */}
              <a
                href="#full-releases"
                className="
                  inline-flex
                  h-[48px]
                  flex-1
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/80
                  bg-transparent
                  px-3
                  font-['Geist']
                  text-[13px]
                  font-semibold
                  whitespace-nowrap
                  text-white
                  transition-all
                  duration-300
                  ease-out
                  hover:scale-[1.03]
                  hover:bg-white
                  hover:text-[#159A99]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-white
                  sm:h-[68px]
                  sm:w-[251px]
                  sm:flex-none
                  sm:px-0
                  sm:text-[20px]
                "
              >
                Follow the Series
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}