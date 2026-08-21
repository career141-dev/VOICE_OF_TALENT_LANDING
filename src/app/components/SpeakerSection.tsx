"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

const arrowRightTeal = "/icons/arrow-right-teal.svg";

interface VoiceItem {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  bannerImage: string;
}

const voicesData: VoiceItem[] = [
  {
    id: 1,
    name: 'Mr. Ken Vijayakumar',
    role: 'Senior General Manager, Human Resource & Sustainability',
    company: 'A. Baur & Co. (Pvt) Ltd',
    quote: 'Attracting globally-minded engineering talent means building a culture of radical autonomy from day one.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    bannerImage: '/images/Pillar-01.png',
  },
  {
    id: 2,
    name: 'Shiromi de Alwis',
    role: 'Director Talent & Culture',
    company: 'WSO2',
    quote: 'Fostering continuous learning and agile mindsets enables people to excel in hyper-growth tech environments.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    bannerImage: '/images/Pillar-01.png',
  },
  {
    id: 3,
    name: 'James Vijayakumar ',
    role: 'Director Talent & Culture',
    company: 'WSO2',
    quote: 'Empowering teams with psychological safety drives breakthrough innovations and high retention.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    bannerImage: '/images/Pillar-01.png',
  },
  {
    id: 4,
    name: 'Nisha de Alwis',
    role: 'Director Talent & Culture',
    company: 'WSO2',
    quote: 'Creating inclusive workspaces allows talent to bring their authentic self to work.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    bannerImage: '/images/Pillar-01.png',
  }
];

export default function VoicesSlider() {
  const extendedData = [...voicesData, ...voicesData, ...voicesData];

  const badgeClasses = "inline-flex h-[51.968px] items-center justify-center gap-[8.338px] rounded-[25.558px] border-[1.042px] border-[#D6D6D6] bg-[#F2F2F2] px-[25.013px] py-[12.507px] text-[14.591px] font-semibold leading-normal text-black [font-family:Geist,sans-serif] uppercase hover:rounded-[25.558px] hover:border-[#D6D6D6] hover:bg-[#F2F2F2]";

  return (
    <section id="speakers" className="w-full py-16 overflow-hidden bg-white">
      {/* Header Section */}
      <div className="text-center mb-[136px] px-4">
        <span className="inline-flex items-center rounded-[123.833px] border-[1.238px] border-[rgba(21,154,153,0.20)] bg-[rgba(21,154,153,0.10)] px-[14.86px] py-[7.43px] font-['Geist'] text-[13.622px] font-semibold leading-normal uppercase text-[#159A99] mb-3">
          AN INDUSTRY-LED VIDEO SERIES BY CAREER141
        </span>
        <h2 className="text-center font-['Geist'] text-[46px] font-extrabold leading-[110%] text-[#262626] capitalize">
          Meet The Voices Behind The Industry
        </h2>
      </div>

      {/* Swiper Full-Width Carousel */}
      <div className="w-full">
        <Swiper
          modules={[Autoplay]}
          slidesPerView="auto"
          spaceBetween={24}
          loop={true}
          speed={300}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          className="!overflow-visible flex items-center py-6 px-4 md:px-12"
        >
          {extendedData.map((item, index) => (
            <SwiperSlide
              key={`${item.id}-${index}`}
              className="
                group 
                !flex 
                flex-col 
                justify-between 
                overflow-hidden 
                bg-[#F5F7FA] 
                cursor-pointer 
                !w-[334px] 
                !h-[510px] 
                rounded-[29.98px] 
                border-[1.62px] 
                border-[#E0E0E0] 
                shadow-sm
                
                transition-all 
                duration-[900ms] 
                ease-[cubic-bezier(0.25,1,0.5,1)]
                
                hover:!w-[563px] 
                hover:!h-[598px] 
                hover:-translate-y-[88px] 
                hover:shadow-xl
              "
            >
              {/* --- 1. ACTIVE / HOVER STATE VIEW --- */}
              <div className="
                absolute
                inset-0
                flex 
                flex-col 
                h-full 
                justify-between 
                w-full
                
                opacity-0 
                group-hover:opacity-100
                
                transition-opacity 
                duration-[800ms] 
                ease-in-out 
                delay-[250ms]
                
                z-10
                bg-[#F5F7FA]
                
                pointer-events-none
                group-hover:pointer-events-auto
              ">
                
                <div className="relative h-[310px] overflow-hidden bg-gradient-to-r from-teal-700 via-teal-600 to-teal-400 p-[32px] flex flex-col justify-between text-white shrink-0 rounded-[30px] border border-transparent">
                  <div className="flex justify-between items-start z-10">
                    <span className={badgeClasses}>
                      EXPLORE VOTA
                    </span>
                  </div>

                  <img
                    src={item.bannerImage}
                    alt={item.name}
                    className="absolute right-0 bottom-0 h-[115%] w-auto object-cover object-right pointer-events-none opacity-90"
                  />

                  <div className="relative z-10 max-w-[60%]">
                    <h3 className="mb-2 font-geist text-[35.629px] font-normal leading-normal text-white">{item.name}</h3>
                    <p className="mt-1.5 font-geist text-[22.673px] font-light leading-[150%] text-white">
                      {item.role},<br />{item.company}
                    </p>
                  </div>
                </div>

                {/* Middle Quote Section */}
                <div className="px-[32px] pt-[32px] pb-[20px] flex-1 flex flex-col justify-center">
                  <p className="font-geist text-[22px] font-normal leading-[150%] text-[#666]">
                    "{item.quote}"
                  </p>
                </div>

                {/* Bottom Fixed-Height Action Section */}
                <div className="h-[111px] shrink-0 border-t-[1.6px] border-[#E0E0E0] mx-[32px] flex items-center">
                  <button className="flex items-center gap-2 font-geist text-[16.513px] font-semibold leading-normal text-[#159A99] uppercase transition-all hover:gap-3">
                    WATCH CONVERSATION 
                    <img src={arrowRightTeal} alt="Arrow Right" className="h-[18px] w-[18px] object-contain" />
                  </button>
                </div>
              </div>

              {/* --- 2. INACTIVE / NORMAL STATE VIEW --- */}
              <div className="
                absolute
                inset-0
                flex 
                h-full 
                flex-col 
                p-8
                
                opacity-100 
                group-hover:opacity-0
                
                transition-opacity 
                duration-[700ms] 
                ease-in-out
                
                z-0
                
                pointer-events-auto
                group-hover:pointer-events-none
              ">
                
                {/* Reusable Badge */}
                <div>
                  <span className={badgeClasses}>
                    EXPLORE VOTA
                  </span>
                </div>

                {/* Bottom Profile Details */}
                <div className="absolute inset-x-8 top-[250px]">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="line-clamp-2 font-geist text-[35.629px] font-normal leading-normal text-black">
                      {item.name}
                    </h3>
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-[84px] h-[84px] rounded-full object-cover flex-shrink-0"
                    />
                  </div>
                  
                </div>

                <p className="absolute inset-x-8 bottom-[84px] line-clamp-2 font-geist text-[22.673px] font-light leading-[150%] text-[#666]">
                  {item.role} · {item.company}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}