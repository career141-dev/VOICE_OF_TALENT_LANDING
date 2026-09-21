import type { Metadata } from "next";
import "./globals.css";
import { getOptimizedImageUrl, withVersion } from "./utils/imageLoader";

const R2_MEDIA_URL = (process.env.NEXT_PUBLIC_R2_MEDIA_URL || "").replace(/\/+$/, "");
const iconUrl = R2_MEDIA_URL ? withVersion(`${R2_MEDIA_URL}/images/icontop.png`) : "/images/icontop.png";

export const metadata: Metadata = {
  title: "Voices of Talent Acquisition",
  description: "Voices of Talent Landing Page",
  openGraph: {
    title: "Voices of Talent Acquisition",
    description: "Voices of Talent Acquisition — The voices shaping Sri Lanka's talent story.",
    siteName: "Voices of Talent Acquisition",
    type: "website",
  },
  icons: {
    icon: iconUrl,
    shortcut: iconUrl,
    apple: iconUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href={iconUrl} />
        <link rel="shortcut icon" type="image/png" href={iconUrl} />
        <link rel="apple-touch-icon" href={iconUrl} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              window.addEventListener('beforeunload', function() {
                window.scrollTo(0, 0);
              });
            `,
          }}
        />
        <link rel="preconnect" href="https://talentsuite.career141.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://talentsuite.career141.com" />
        <link rel="preload" as="image" href="https://talentsuite.career141.com/images/herobottom.webp" fetchPriority="high" />
        <link rel="preload" as="image" href="https://talentsuite.career141.com/images/mobile.webp" fetchPriority="high" />
        {/* media.career141.com hosts every episode/reel video. Without this,
            the DNS lookup + TCP + TLS handshake for that host only starts the
            moment someone clicks play, adding a few hundred ms of pure
            connection setup before the video can even begin buffering. */}
        <link rel="preconnect" href="https://media.career141.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://media.career141.com" />
        {R2_MEDIA_URL ? (
          <>
            <link rel="preconnect" href={R2_MEDIA_URL} crossOrigin="anonymous" />
            <link rel="dns-prefetch" href={R2_MEDIA_URL} />
            <link rel="preload" as="image" href={getOptimizedImageUrl(`${R2_MEDIA_URL}/images/hero-background.webp`, 1920)} />
            <link rel="preload" as="image" href={withVersion(`${R2_MEDIA_URL}/images/speaker1.webp`)} />
            <link rel="preload" as="image" href={withVersion(`${R2_MEDIA_URL}/images/speaker2.webp`)} />
          </>
        ) : null}
        <link
          href="https://fonts.googleapis.com/css2?family=Cal+Sans&family=Geist:ital,wght@0,100..900;1,100..900&family=Quicksand:wght@400;500;600;700&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

