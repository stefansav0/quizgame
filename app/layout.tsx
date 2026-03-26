import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header"; // <-- IMPORT HEADER
import Footer from "@/components/Footer";
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
    
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0f111a] text-white flex flex-col min-h-screen`}>
        
        {/* Global Header (Sticky) */}
        <Header />

        {/* Main Content Area - Added pt-20 to account for the fixed 80px high Header */}
        <main className="flex-grow w-full pt-20">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />
        
      </body>
    </html>
  );
}