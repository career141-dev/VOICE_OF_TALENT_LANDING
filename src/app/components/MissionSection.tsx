import React from "react";

const portraitImage = "/images/portrait.png";

export default function MissionSection() {
  return (
    <section
      id="mission"
      className="relative min-h-[380px] overflow-hidden bg-white px-[8.7%] pt-[100px] text-[#202020] max-[760px]:min-h-[500px] max-[760px]:px-6 max-[760px]:pb-16 max-[760px]:pt-20"
      aria-labelledby="mission-title"
    >
      <div className="flex items-start justify-between gap-20 max-[760px]:flex-col max-[760px]:gap-12">
        {/* Left Subtitle */}
        <p className="m-0 shrink-0 text-[23px] font-semibold uppercase tracking-[-.02em] text-[#159a99] max-[760px]:text-[11px]">
          — The VOTA Mission
        </p>

        {/* Right Heading - Instantly visible with zero delay */}
        <div className="relative w-[min(68%,820px)] text-right max-[760px]:w-full">
          <h2
            id="mission-title"
            className="m-0 font-geist text-[clamp(25px,2.1vw,36px)] font-medium leading-[1.28] tracking-[-.03em] text-right max-[760px]:text-[27px]"
          >
            <span className="text-[#202020]">
              Behind every great organization, successful team and{" "}
            </span>
            <span className="text-[#969696]">
              life-changing career opportunity is someone who recognized potential.
            </span>
          </h2>

          {/* Floating Portrait Image */}
          <div className="absolute left-[30%] top-[60px] z-[2] h-[150px] w-[150px] rotate-[-8deg] overflow-hidden rounded-[6px] shadow-lg max-[760px]:left-[18%] max-[760px]:top-[148px]">
            <img
              className="h-full w-full object-cover"
              src={portraitImage}
              alt="A member of the Voice of Talent community"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
