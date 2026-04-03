import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header"; 
import Footer from "@/components/Footer";
import Script from "next/script";
// @ts-ignore
import "./globals.css";

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
  description: "Create custom quizzes and secret letters for your besties and partners. Find out who really knows you best!",
  icons: {
    icon: "/favicon.ico?v=2",
    shortcut: "/favicon.ico?v=2",
    apple: "/favicon.ico?v=2",
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

        {/* ✅ GOOGLE ANALYTICS (GA4) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-9YDEEPLCYP"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-9YDEEPLCYP');
            `,
          }}
        />

        {/* ✅ GOOGLE ADSENSE (IMPORTANT) */}
        <Script
          id="adsense-script"
          strategy="afterInteractive"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9348579900264611"
          crossOrigin="anonymous"
        />

      </head>
      
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0f111a] text-white flex flex-col min-h-screen`}>
        
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-grow w-full pt-20">
          {children}
        </main>

        {/* Footer */}
        <Footer />
        
      </body>
    </html>
  );
}