import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";
// @ts-ignore
import "./globals.css";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import EzoicRouteHandler from "@/components/EzoicRouteHandler";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Getknowify | How Well Do You Know Me?",
  description:
    "Create custom quizzes and secret letters for your besties and partners. Find out who really knows you best!",
  icons: {
    icon: "/favicon.ico?v=2",
    shortcut: "/favicon.ico?v=2",
    apple: "/favicon.ico?v=2",
  },

  // Google AdSense verification
  other: {
    "google-adsense-account": "ca-pub-9348579900264611",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* =====================================================
            EZOIC PRIVACY / CONSENT SCRIPTS
            Must load before Ezoic's main script
            ===================================================== */}

        <Script
          id="ezoic-cmp"
          src="https://cmp.gatekeeperconsent.com/min.js"
          strategy="beforeInteractive"
          data-cfasync="false"
        />

        <Script
          id="ezoic-cmp-2"
          src="https://the.gatekeeperconsent.com/cmp.min.js"
          strategy="beforeInteractive"
          data-cfasync="false"
        />

        {/* =====================================================
            EZOIC HEADER SCRIPT
            ===================================================== */}

        <Script
          id="ezoic-sa"
          src="https://www.ezojs.com/ezoic/sa.min.js"
          strategy="afterInteractive"
        />

        {/* Ezoic initialization */}
        <Script id="ezoic-init" strategy="afterInteractive">
          {`
            window.ezstandalone = window.ezstandalone || {};
            window.ezstandalone.cmd = window.ezstandalone.cmd || [];
          `}
        </Script>

        {/* Ezoic Analytics */}
        <Script
          id="ezoic-analytics"
          src="https://ezoicanalytics.com/analytics.js"
          strategy="afterInteractive"
        />

        {/* =====================================================
            GOOGLE ADSENSE
            ===================================================== */}

        <meta
          name="google-adsense-account"
          content="ca-pub-9348579900264611"
        />

        <Script
          id="google-adsense"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9348579900264611"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* =====================================================
            GOOGLE ANALYTICS (GA4)
            ===================================================== */}

        <Script
          id="google-analytics-script"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-9YDEEPLCYP"
        />

        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];

              function gtag(){
                dataLayer.push(arguments);
              }

              gtag('js', new Date());

              gtag('config', 'G-9YDEEPLCYP', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Ezoic route/navigation handler */}
        <EzoicRouteHandler />

        {/* Header */}
        <Header />

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer */}
        <Footer />

        {/* Existing Analytics Tracker */}
        <AnalyticsTracker />
      </body>
    </html>
  );
}