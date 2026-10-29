import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnalyticsTracker from "@/components/AnalyticsTracker";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const ADSENSE_ID = "ca-pub-9348579900264611";
const GA_ID = "G-9YDEEPLCYP";

export const metadata: Metadata = {
  metadataBase: new URL("https://getknowify.com"),

  title: {
    default: "GetKnowify | How Well Do You Know Me?",
    template: "%s | GetKnowify",
  },

  description:
    "Create custom friendship quizzes, play Never Have I Ever, and send secret letters to your best friends and partners. Discover who knows you best!",

  applicationName: "GetKnowify",

  icons: {
    icon: "/favicon.ico?v=2",
    shortcut: "/favicon.ico?v=2",
    apple: "/favicon.ico?v=2",
  },

  openGraph: {
    type: "website",
    siteName: "GetKnowify",
    title: "GetKnowify | How Well Do You Know Me?",
    description:
      "Create friendship quizzes, play Never Have I Ever, and share secret letters with your friends.",
    url: "https://getknowify.com",
  },

  robots: {
    index: true,
    follow: true,
  },

  other: {
    "google-adsense-account": ADSENSE_ID,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Mediavine Journey ad script */}
        <Script
          id="mediavine-journey"
          src="https://scripts.scriptwrapper.com/tags/4e13d665-392f-4c84-a5e0-3e7902fb9991.js"
          strategy="afterInteractive"
          data-noptimize="1"
          data-cfasync="false"
        />

        {/* Existing Google AdSense script */}
        <Script
          id="google-adsense"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />

        {/* Google Analytics 4 */}
        <Script
          id="google-analytics"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />

        <Script id="google-analytics-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function() {
              window.dataLayer.push(arguments);
            };

            window.gtag("js", new Date());
            window.gtag("config", "${GA_ID}");
          `}
        </Script>

        <Header />

        <main id="main-content">{children}</main>

        <Footer />

        <AnalyticsTracker />
      </body>
    </html>
  );
}