"use client";

const audiences = [
  {
    number: "01",
    title: "TA Professionals",
    description:
      "Connect with peers, access practical insights, and build stronger talent acquisition capability.",
  },
  {
    number: "02",
    title: "Emerging Talent Professionals",
    description:
      "Fast-track your functional maturity by learning from established, world-class practices across diverse sectors.",
  },
  {
    number: "03",
    title: "Business Leaders",
    description:
      "Build a more strategic, effective approach to attracting, developing, and retaining the talent your business needs.",
  },
  {
    number: "04",
    title: "The Wider HR Community",
    description:
      "Join a shared conversation that connects people, practices, and the future of work.",
  },
];

export default function BuiltForEveryoneSection() {
  return (
    <section className="w-full overflow-hidden bg-white px-6 pb-20 pt-20 text-[#262626] md:px-12 lg:px-[7.4%] lg:pb-28 lg:pt-20">
      {/* Heading */}
      <div className="mx-auto mb-14 text-center lg:mb-20">
        <span className="inline-flex items-center rounded-[123.833px] border-[1.238px] border-[rgba(21,154,153,0.20)] bg-[rgba(21,154,153,0.10)] px-[14.86px] py-[7.43px] font-['Geist'] text-[13.622px] font-semibold leading-normal uppercase text-[#159A99] mb-3">
          For Whom
        </span>

        <h2 className="mt-4 font-['Geist'] text-3xl font-bold tracking-[-0.04em] text-[#262626] md:text-4xl lg:text-[46px]">
          Built For Everyone Shaping The Future Of Talent
        </h2>
      </div>

      {/* Audience cards */}
      <div className="mx-auto grid max-w-[1632px] grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {audiences.map((audience) => (
          <article
            key={audience.number}
            className="
              group
              relative
              h-[510px]
              w-[387px]
              max-w-full
              shrink-0
              overflow-hidden
              rounded-[29.98px]
              border-[1.62px]
              border-[#E0E0E0]
              bg-[#F5F7FA]
              p-6
              transition-colors
              duration-500
              ease-out
              hover:border-[#159A99]
              hover:bg-[#159A99]
              
            "
          >
            {/* Number exits upward on hover */}
            <span
              className="
                absolute
                left-6
                top-10
                font-['Geist']
                text-[108px]
                font-bold
                leading-none
                tracking-[-0.08em]
                text-[#D9D9D9]
                transition-all
                duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover:-translate-y-12
                group-hover:opacity-0
              "
            >
              {audience.number}
            </span>

            {/* Title travels to top on hover */}
            <h3
              className="
                absolute
                left-6
                right-6
                top-[365px]
                font-['Geist']
                text-[30px]
                font-normal
                leading-[1.2]
                tracking-[-0.03em]
                text-black
                transition-all
                duration-700
                ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover:top-10
                group-hover:text-white
              "
            >
              {audience.title}
            </h3>

            {/* Description appears on hover */}
            <p
              className="
                absolute
                bottom-16
                left-6
                right-8
                translate-y-6
                font-['Geist']
                text-[18px]
                leading-[1.7]
                text-white/85
                opacity-0
                transition-all
                delay-150
                duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover:translate-y-0
                group-hover:opacity-100
              "
            >
              {audience.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}