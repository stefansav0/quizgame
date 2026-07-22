"use client";

import { motion } from "framer-motion";
import { containerVariants } from "@/lib/animations";
import FloatingBackground from "@/components/home/FloatingBackground";
import HeroSection from "@/components/home/HeroSection";
import LatestBlogs from "@/components/LatestBlogs";
import {
  WhatIsGetKnowify,
  WhyPopular,
  WhoCanUse,
  PopularWays,
  DigitalAge,
  PrivacyMatters,
  QuizIdeas,
  ContentPromise,
  QuizTips,
  PopularQuestions
} from "@/components/home/Articles";
import {
  BenefitsGrid,
  WhyChooseGrid,
  TrustGrid,
  QuickFactsGrid,
  HowItWorksGrid
} from "@/components/home/Grids";
import FAQSection from "@/components/home/FAQSection";
import BottomBanner from "@/components/home/BottomBanner";

export default function HomeClient() {
  return (
    <main className="min-h-screen bg-slate-50 flex justify-center w-full mx-auto px-4 py-12 relative overflow-hidden font-sans text-slate-900">
      <FloatingBackground />

      {/* Main Container */}
      <div className="w-full max-w-5xl relative z-10 flex flex-col items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full flex flex-col items-center"
        >
          <HeroSection />
          
          <WhatIsGetKnowify />
          <LatestBlogs />
          <WhyPopular />
          
          <BenefitsGrid />
          <WhoCanUse />
          <WhyChooseGrid />
          <PopularWays />
          <DigitalAge />
          <PrivacyMatters />
          
          <TrustGrid />
          
          <QuizIdeas />
          <ContentPromise />
          
          <QuickFactsGrid />
          <HowItWorksGrid />
          
          <QuizTips />
          <PopularQuestions />
          
          <FAQSection />
          <BottomBanner />
        </motion.div>
      </div>
    </main>
  );
}