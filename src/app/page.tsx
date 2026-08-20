import SeriesSection from "./components/SeriesSection";
import SpeakerSection from "./components/SpeakerSection";
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
        className="absolute left-[calc(25%+27px)] top-[34.8%] z-[3] h-[108.2%] w-[min(46.82vw,899px)] overflow-hidden [--microphone-shift:0%] animate-[microphone-rise_1.5s_cubic-bezier(.22,1,.36,1)_both] opacity-[.96] blur-[2px] max-[760px]:top-[42%] max-[760px]:h-[92%]"
        aria-hidden="true"
      >
        <img
          className="absolute left-[-19.25%] top-[-32%] h-[130%] w-[119.22%] max-w-none object-cover"
          src={microphoneImage}
          alt=""
        />
      </div>

      {/* Navbar */}
      <nav
        className="absolute left-[6.3%] right-[6.3%] top-[29px] z-[10] flex items-center justify-between max-[760px]:left-5 max-[760px]:right-5 max-[760px]:top-[18px]"
        aria-label="Primary navigation"
      >
        <a
          className="relative block h-[70px] w-[206px] max-[760px]:origin-top-left max-[760px]:scale-[.72]"
          href="#top"
          aria-label="Voice of Talent home"
        >
          <img
            className="block h-[70px] w-[206px] object-contain object-left-top"
            src={votaLogo}
            alt="VOTA - Voice of Talent Acquisition"
          />
        </a>

        <div className="flex items-center gap-7 rounded-[42px] border border-[rgba(255,255,255,.08)] bg-[rgba(255,255,255,.04)] px-7 py-2 pl-2 backdrop-blur-[14px] max-[760px]:hidden">
          <a
            className="rounded-[28px] bg-[#159a99] px-[21px] py-2.5 text-[20px] font-semibold text-white no-underline"
            href="#top"
          >
            Home
          </a>

          <a
            className="text-[20px] text-[#a0a0a0] no-underline"
            href="#speakers"
          >
            Speakers
          </a>

          <a
            className="text-[20px] text-[#a0a0a0] no-underline"
            href="#episodes"
          >
            Episodes
          </a>

          <a
            className="text-[20px] text-[#a0a0a0] no-underline"
            href="#partners"
          >
            Partners
          </a>
        </div>

        <a
          className="inline-flex items-center gap-2 rounded-[140px] bg-[#159a99] px-[27px] py-[15px] text-[18px] font-semibold text-white no-underline max-[760px]:px-4 max-[760px]:py-3 max-[760px]:text-[10px]"
          href="#episodes"
        >
          Watch Now
          <img
            className="h-[18px] w-[18px] object-contain"
            src={arrowUpRight}
            alt=""
          />
        </a>
      </nav>
      <h1
        id="top"
        className="absolute left-1/2 top-[24%] z-[2] m-0 w-[min(92%,935px)] -translate-x-1/2 text-center font-cal text-[clamp(48px,6.3vw,95px)] font-normal uppercase leading-[1.1] text-white max-[760px]:top-[25%] max-[760px]:text-[clamp(42px,12vw,64px)]"
      >
        Voices of Talent
        <br />
        Acquisition
      </h1>
      <div
        className="absolute left-1/2 top-[46%] z-[5] w-[min(92%,935px)] -translate-x-1/2 text-center max-[760px]:top-[48%]"
      >
        <p className="mx-auto max-w-[781px] text-[clamp(14px,1.35vw,22px)] leading-[1.6] text-white max-[760px]:px-3 max-[760px]:text-[14px]">
          The voices shaping Sri Lanka&apos;s talent story. Meet the people
          connecting talent with opportunity, building stronger organizations,
          and shaping the future of work in Sri Lanka.
        </p>

        <div className="mt-[clamp(25px,3.5vw,50px)] flex justify-center gap-[19px] max-[760px]:mx-auto max-[760px]:mt-[34px] max-[760px]:w-max max-[760px]:flex-col">
          <a
            className="inline-flex h-[60px] items-center justify-center gap-2 rounded-[30px] bg-[#159a99] px-[29px] text-[17px] font-semibold uppercase text-white shadow-[0_5px_10px_rgba(21,154,153,.3)] no-underline max-[760px]:h-[52px]"
            href="#episodes"
          >
            Watch the Series
            <Arrow source={arrowRight} />
          </a>

          <a
            className="inline-flex h-[60px] items-center justify-center gap-2 rounded-[30px] border border-[#e0e0e0] bg-white px-[29px] text-[17px] font-semibold uppercase text-black no-underline max-[760px]:h-[52px]"
            href="#partners"
          >
            Explore VOTA
            <Arrow source={arrowRightDark} />
          </a>
        </div>
      </div>

      {/* People */}
      <div
        className="absolute bottom-[18%] left-1/2 z-[10] flex -translate-x-1/2 max-[760px]:bottom-[5%]"
        aria-label="Meet the people behind Voice of Talent"
      >
      <div className="flex items-center rounded-[100px] border-2 border-white p-1">
        <div className="relative h-[60px] w-[60px] overflow-hidden rounded-full border-2 border-white bg-[rgba(0,0,0,.2)]">
          <img className="h-full w-full object-cover" src={businessmanImage} alt="" />
        </div>
        <div className="relative -ml-5 h-[60px] w-[60px] overflow-hidden rounded-full border-2 border-white bg-[rgba(0,0,0,.2)]">
          <img className="h-full w-full object-cover" src={businesswomanImage} alt="" />
        </div>
        <div className="relative -ml-5 h-[60px] w-[60px] overflow-hidden rounded-full border-2 border-white bg-[rgba(0,0,0,.2)]">
          <img className="h-full w-full object-cover" src={businessmanImage} alt="" />
        </div>
        <a
          className="relative -ml-5 flex h-[60px] w-[60px] items-center justify-center rounded-full "
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
      <div className="relative w-[min(68%,820px)] text-right max-[760px]:w-full">
        <h2
          id="mission-title"
          className="m-0 font-geist text-[clamp(25px,2.1vw,36px)] font-medium leading-[1.22] tracking-[-.03em] text-right max-[760px]:text-[27px]"
        >
          <span className="text-[#202020]">
            Behind every great organization, successful team and
          </span>{" "}
          <span className="text-[#969696]">
            life-changing career opportunity is someone who recognized potential.
          </span>
        </h2>

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
    </>
  );
}

