import type { Metadata } from "next";
import "./globals.css";
import { getOptimizedImageUrl } from "./utils/imageLoader";

const R2_MEDIA_URL = (process.env.NEXT_PUBLIC_R2_MEDIA_URL || "").replace(/\/+$/, "");
const iconUrl = R2_MEDIA_URL ? `${R2_MEDIA_URL}/images/icontop.png` : "/images/icontop.png";

export const metadata: Metadata = {
  title: "Voice of Talent",
  description: "Voice of Talent Landing Page",
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
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
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
        {R2_MEDIA_URL ? (
          <>
            <link rel="preconnect" href={R2_MEDIA_URL} crossOrigin="anonymous" />
            <link rel="dns-prefetch" href={R2_MEDIA_URL} />
            <link rel="preload" as="image" href={getOptimizedImageUrl(`${R2_MEDIA_URL}/images/hero-background.png`, 1920)} />
            <link rel="preload" as="image" href={getOptimizedImageUrl(`${R2_MEDIA_URL}/images/speaker1.png`, 800)} />
            <link rel="preload" as="image" href={getOptimizedImageUrl(`${R2_MEDIA_URL}/images/speaker2.png`, 800)} />
          </>
        ) : null}
        <link
          href="https://fonts.googleapis.com/css2?family=Cal+Sans&family=Geist:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

