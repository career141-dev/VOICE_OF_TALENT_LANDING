"use client";

import React from "react";

export default function VotaBannerSection() {
  return (
    <section className="w-full bg-[#F5F7FA] px-6 py-16 md:px-12 lg:px-[8.7%] lg:py-24">
      <div
className="
  relative
  mx-auto
  flex
  h-auto
  min-h-[420px]
  w-full
  max-w-[1636px]
  overflow-hidden
  rounded-[30px]
  border
  border-[1.03px]
  bg-cover
  bg-center
  px-7
  py-8
  sm:min-h-[500px]
  sm:rounded-[40px]
  sm:px-12
  sm:py-12
  lg:min-h-0
  lg:rounded-[51.25px]
  lg:px-14
  lg:py-16
"
        style={{
          backgroundImage: "url('/images/Container.png')",
        }}
      >
        {/* Subtle overlay for readable white text */}
        <div className="pointer-events-none absolute inset-0 bg-black/10" />

        <div className="relative z-10 flex w-full flex-col items-start">
          {/* Career141 / VOTA logo */}
          <img
            src="/images/Artboard.png"
            alt="Career141 and VOTA"
            className="h-auto w-[150px] object-contain sm:w-[190px] lg:w-[400px]"
          />

          {/* Lower-left banner content */}
          <div className="mt-20 mb-20">
            <h2 className="max-w-[760px] font-['Geist'] text-[27px] font-semibold leading-[1.13] tracking-[-0.03em] text-white sm:text-[36px] lg:text-[46px]">
              Sri Lanka&apos;s Talent Story Is Being Written Today.
              <br />
              Let The Voices Behind It Be Heard.
            </h2>

            <div className="mt-16 flex flex-wrap items-center gap-4">
              {/* Watch VOTA button — 223px × 68px */}
              <a
                href="#watch-vota"
                className="
                  inline-flex
                  h-[68px]
                  w-[223px]
                  shrink-0
                  items-center
                  justify-center
                  gap-[11.55px]
                  rounded-[34.66px]
                  bg-[#159A99]
                  p-[11.55px]
                  font-['Geist']
                  text-[20px]
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  ease-out
                  hover:scale-[1.03]
                  hover:bg-[#0F7E7D]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-white
                  focus:ring-offset-2
                  focus:ring-offset-[#0B171A]
                "
              >
                Watch VOTA
              </a>

              {/* Follow the Series button — 251px × 68px */}
              <a
                href="#follow-series"
                className="
                  inline-flex
                  h-[68px]
                  w-[251px]
                  shrink-0
                  items-center
                  justify-center
                  gap-[11.55px]
                  rounded-[34.66px]
                  border-[1.16px]
                  border-white
                  bg-transparent
                  p-[11.55px]
                  font-['Geist']
                  text-[20px]
                  font-semibold
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
                  focus:ring-offset-2
                  focus:ring-offset-[#0B171A]
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