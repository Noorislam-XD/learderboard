import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/src/components/layout/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://meryt.app"),
  title: {
    default: "MERYT — Global Verified Talent Rankings",
    template: "%s · MERYT",
  },
  description:
    "Global verified talent ranking platform. Dynamic proof-of-work NI Score for students, researchers, builders, creators, and professionals worldwide. Not social credit scoring.",
  keywords: ["talent rankings", "NI Score", "verified credentials", "leaderboard", "merit", "proof of work", "students", "researchers", "developers"],
  authors: [{ name: "MERYT" }],
  creator: "MERYT",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://meryt.app",
    siteName: "MERYT",
    title: "MERYT — Global Verified Talent Rankings",
    description: "The NI Score — proof-of-work identity graph for students, researchers, builders, and creators. 28,400 verified profiles across 142 countries.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "MERYT — Global Verified Talent Rankings" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MERYT — Global Verified Talent Rankings",
    description: "The NI Score — proof-of-work identity graph. 28,400 verified profiles across 142 countries.",
    images: ["/opengraph-image"],
    creator: "@merytapp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏆</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400;500&family=Bricolage+Grotesque:opsz,wght@12..60,400;12..60,500;12..60,600;12..60,700;12..60,800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
