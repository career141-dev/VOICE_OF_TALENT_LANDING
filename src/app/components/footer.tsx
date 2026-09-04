"use client";

import React from "react";

const R2_MEDIA_URL = (process.env.NEXT_PUBLIC_R2_MEDIA_URL || "").replace(/\/+$/, "");
const footerLogo = `${R2_MEDIA_URL}/images/footer.png`;
const artboardImage = "https://talentsuite-southernchapter.career141.com/IMAGES/Artboard%204%402x%205%201.svg";

const seriesLinks = [
  { label: "About", href: "#mission" },
  { label: "Speakers", href: "#speakers" },
  { label: "Episodes", href: "#episodes" },
  { label: "Partners", href: "#full-releases" },
];

// Swapped string image URLs for actual inline SVG paths to guarantee flawless hover colors
const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://lk.linkedin.com/company/career-consultants-pvt-ltd",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@career141_",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://web.facebook.com/career141/",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/career141.official/",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.46 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="w-full overflow-hidden bg-white">
      {/* Main footer */}
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-[8.7%]">
        <div
          className="
            flex
            w-full
            flex-col
            items-center
            gap-12
            py-10
            text-center
            md:flex-row
            md:items-start
            md:justify-between
            md:gap-10
            md:py-16
            md:text-left
            lg:py-14
          "
        >
          {/* Logo */}
          <div className="flex shrink-0 justify-center md:justify-start">
            <img
              src={footerLogo}
              alt="VOTA — Voice of Talent Acquisition"
              className="h-auto w-[240px] sm:w-[300px] md:w-[300px] lg:w-[400px] xl:w-[460px] max-w-full object-contain"
            />
          </div>

          {/* Series map */}
          <nav aria-label="Series map" className="flex flex-col items-center md:items-start shrink-0">
            <h2 className="font-['Geist'] text-[18px] font-bold uppercase leading-none text-[#262626]">
              Series Map
            </h2>

            <ul className="mt-7 space-y-5">
              {seriesLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-['Geist'] text-[17px] leading-none text-[#666666] transition-colors duration-200 hover:text-[#159A99]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social links & Partner Logo */}
          <div className="flex flex-col items-center md:items-start shrink-0">
            <h2 className="font-['Geist'] text-[18px] font-bold uppercase leading-none text-[#262626]">
              Follow Us
            </h2>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-4 md:justify-start">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Follow VOTA on ${social.label}`}
                  className="
                    group
                    flex
                    h-[42px]
                    w-[42px]
                    shrink-0
                    items-center
                    justify-center
                    rounded-[8px]
                    
                    /* Base State */
                    bg-white
                    border
                    border-[#E0E0E0]
                    text-[#555555] /* Icon color when inactive */
                    
                    /* Hover State */
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-[#159A99]
                    hover:border-[#159A99]
                    hover:text-white /* Icon turns purely white instantly */
                    hover:shadow-md
                  "
                >
                  {/* Renders the inline SVG perfectly without filter glitches */}
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Career141 / VOTA Logo */}
            <div className="mt-6 md:mt-7 flex justify-center md:justify-start">
              <img
                src={artboardImage}
                alt="Career141 and VOTA"
                loading="lazy"
                decoding="async"
                className="h-auto w-[160px] sm:w-[190px] md:w-[200px] lg:w-[240px] xl:w-[270px] max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom teal bar */}
      <div className="w-full bg-[#159A99] px-4 sm:px-8 md:px-12 lg:px-[8.7%]">
        <div
          className="
            flex
            min-h-[85px]
            w-full
            flex-col
            items-center
            justify-center
            gap-4
            py-5
            text-center
            text-white
            md:flex-row
            md:items-center
            md:justify-between
            md:py-0
            md:text-left
          "
        >
          <p className="font-['Geist'] text-[16px]">
            © 2026 VOTA. Powered by Career141. All rights reserved.
          </p>

          <div className="flex items-center justify-center gap-7">
            <span className="font-['Geist'] text-[16px]">
              Privacy Strategy
            </span>

            <span className="font-['Geist'] text-[16px]">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}