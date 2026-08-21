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
const backgroundImage = "/images/hero-background.png";
const microphoneImage = "/images/microphone.png";
const votaLogo = "/icons/vota-logo.png";
const arrowUpRight = "/icons/arrow-up-right.svg";
const arrowRight = "/icons/arrow-right.svg";
const arrowRightDark = "/icons/arrow-right-dark.svg";
const arrowAngle = "/icons/arrow-angle.svg";
const portraitImage = "/images/portrait.png";
const businessmanImage = "/images/businessman.png";
const businesswomanImage = "/images/businesswoman.png";


function Arrow({ source }: { source: string }) {
  return <img className="h-[17px] w-[17px] object-contain" src={source} alt="" />;
}

export default function Home() {
  return (
    <>
    <main
      className="hero-frame isolate relative min-h-[900px] overflow-hidden bg-[#050505] max-[760px]:min-h-[670px]"
      data-node-id="1:845">
      {/* Background */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          className="h-full w-full object-cover"
          src={backgroundImage}
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
        className="absolute bottom-[23%] left-1/2 z-[10] flex -translate-x-1/2 max-[760px]:bottom-[8%]"
        aria-label="Meet the people behind Voice of Talent"
      >
      <div className="mt-3 flex items-center rounded-[100px] border-2 border-white p-1">
        <div className="relative h-[46px] w-[46px] overflow-hidden rounded-full border-2 border-white bg-[rgba(0,0,0,.2)]">
          <img className="h-full w-full object-cover" src={businessmanImage} alt="" />
        </div>
        <div className="relative -ml-4 h-[46px] w-[46px] overflow-hidden rounded-full border-2 border-white bg-[rgba(0,0,0,.2)]">
          <img className="h-full w-full object-cover" src={businesswomanImage} alt="" />
        </div>
        <div className="relative -ml-4 h-[46px] w-[46px] overflow-hidden rounded-full border-2 border-white bg-[rgba(0,0,0,.2)]">
          <img className="h-full w-full object-cover" src={businessmanImage} alt="" />
        </div>
        <a
          className="relative -ml-4 flex h-[46px] w-[46px] items-center justify-center rounded-full "
          href="#speakers"
          aria-label="View speakers"
        >
          <img className="" src={arrowAngle} alt="" />
          </a>
        </div>
      </div>
    </main>

    <section
      id="mission"
      className="relative min-h-[380px] overflow-hidden bg-white px-[8.7%]  pt-[100px] text-[#202020] max-[760px]:min-h-[500px] max-[760px]:px-6 max-[760px]:pb-16 max-[760px]:pt-20"
      aria-labelledby="mission-title"
    >
      <div className="flex items-start justify-between gap-20 max-[760px]:flex-col max-[760px]:gap-12">
        <p className="m-0 shrink-0 text-[23px] font-semibold uppercase tracking-[-.02em] text-[#159a99] max-[760px]:text-[11px]">
          — The VOTA Mission
        </p>
      <div className="relative w-[min(100%,1081px)] text-right max-[760px]:w-full">
        <MissionHeadline />

        <div className="absolute left-[30%] top-[60px] z-[2] h-[150px] w-[150px] rotate-[-8deg] overflow-hidden rounded-[6px]  max-[760px]:left-[18%] max-[760px]:top-[148px]">
          <img
            className="h-full w-full object-cover"
            src={portraitImage}
            alt="A member of the Voice of Talent community"
          />
        </div>
      </div>
      </div>

    </section>

    <SeriesSection />
    <SpeakerSection />
    <CoreConversationThemes/>
    <FullReleasesSection />
    <IndustryVoicesSection/>
    <BuiltForEveryoneSection/>
    <VotaBannerSection/>
    <Footer/>
    </>
  );
}

