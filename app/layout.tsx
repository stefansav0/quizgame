import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Footer from "@/components/Footer"; // <-- IMPORT YOUR NEW FOOTER
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
  title: "findmeway | How Well Do You Know Me?",
  description: "Create custom quizzes and secret letters for your besties and partners. Find out who really knows you best!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense Global Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      {/* Added flex column layout to keep the footer at the bottom! */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0f111a] text-white flex flex-col min-h-screen`}>
        
        {/* Main Content Area */}
        <main className="flex-grow w-full">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />
        
      </body>
    </html>
  );
}