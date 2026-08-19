export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-24 px-8 bg-white dark:bg-black text-center sm:text-left">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          {/* Hero Heading: Cal Sans Only */}
          <h1 className="hero-heading text-5xl font-bold tracking-tight text-black dark:text-zinc-50 sm:text-6xl">
            Voice of Talent
          </h1>
          
          {/* Subheading & Body: Geist Font */}
          <h2 className="font-geist text-2xl font-medium text-zinc-700 dark:text-zinc-300">
            Empowering the next generation of creators and talent.
          </h2>

          <p className="font-geist max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Welcome to Voice of Talent. All headings and body text use the clean Geist font, while the primary Hero heading exclusively uses Cal Sans.
          </p>
        </div>
      </main>
    </div>
  );
}

