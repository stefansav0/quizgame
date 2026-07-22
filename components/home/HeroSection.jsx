"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { itemVariants } from "@/lib/animations";

export default function HeroSection() {
  return (
    <>
      {/* 
        REDUCED GAP: 
        - Changed mobile top padding to pt-2 (was pt-6/12). 
        - Changed mobile bottom margin to mb-4. 
      */}
      <header className="text-center mb-4 sm:mb-8 max-w-4xl pt-2 sm:pt-12 mx-auto flex flex-col items-center px-4">
        
        {/* --- ANIMATED LOGO --- */}
        {/* 
          LARGER LOGO & TIGHTER GAP:
          - Increased mobile size to w-[300px] h-[85px] (was w-64 h-16).
          - Reduced bottom margin to mb-1 on mobile so the heading sits closer.
        */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05, rotate: -6 }}
          className="mb-1 sm:mb-8 relative w-[300px] h-[85px] sm:w-[450px] sm:h-[140px] md:w-[600px] md:h-[180px] z-10 -rotate-3 max-w-full"
        >
          <Image 
            src="/favicon.ico" 
            alt="GetKnowify Logo" 
            fill
            sizes="(max-width: 640px) 300px, (max-width: 768px) 450px, 600px"
            className="object-contain drop-shadow-md"
            priority
          />
        </motion.div>

        {/* --- MAIN HEADING --- */}
        {/* Tightened the bottom margin on mobile to mb-3 */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-7xl font-black text-center mb-3 sm:mb-6 tracking-tight text-slate-900 drop-shadow-sm leading-[1.2]"
        >
          How Well Do You <br className="hidden md:block" />
          <span className="relative inline-block mt-1 sm:mt-2">
            <span className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-violet-600 blur-lg opacity-20 rounded-lg"></span>
            <span className="relative bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Really Know Me?
            </span>
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-center text-slate-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium"
        >
          Create your own customized friendship quiz in seconds. Share it with friends, classmates, or your partner, and discover who truly pays attention!
        </motion.p>
      </header>

      {/* --- HERO SHOWCASE IMAGE --- */}
      <motion.div 
        variants={itemVariants}
        className="w-full max-w-3xl mx-auto mb-6 sm:mb-10 px-4 relative z-10"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-full flex justify-center"
        >
          <Image
            src="/frind-removebg-preview.png"
            alt="Friends hanging out"
            width={800}
            height={500}
            className="w-full h-auto max-h-[280px] sm:max-h-[350px] md:max-h-[450px] object-contain drop-shadow-2xl"
            priority
          />
        </motion.div>
      </motion.div>

      {/* --- CTA BUTTONS --- */}
      <motion.div 
        variants={itemVariants} 
        className="flex flex-col lg:flex-row flex-wrap gap-4 sm:gap-5 mb-16 sm:mb-24 w-full max-w-4xl mx-auto justify-center items-center px-4"
      >
        {/* Primary Action */}
        <Link href="/create" className="group relative w-full sm:w-auto z-10" aria-label="Create a Friendship Quiz">
          <div className="absolute -inset-1 bg-indigo-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
          <div className="relative bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg px-8 py-4 sm:py-5 rounded-2xl text-center shadow-xl shadow-indigo-200 transition-all flex items-center justify-center gap-3 active:scale-95 group-hover:-translate-y-1">
            <svg className="w-6 h-6 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Create Your Quiz</span>
          </div>
        </Link>

        {/* Secondary Actions Group */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto">
          <Link href="/nhie" className="group relative w-full sm:w-auto" aria-label="Create a Never Have I Ever Game">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 hover:brightness-110 text-slate-900 font-extrabold text-lg px-8 py-4 sm:py-5 rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 group-hover:-translate-y-1 border border-orange-300/50">
              <span>Never Have I Ever</span>
            </div>
          </Link>

          <Link href="/letter/create" className="group relative w-full sm:w-auto" aria-label="Send a Secret Letter">
            <div className="relative bg-white border-2 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-slate-700 font-bold text-lg px-8 py-4 sm:py-5 rounded-2xl text-center shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-3 active:scale-95 group-hover:-translate-y-1">
              <span>Secret Letter</span>
            </div>
          </Link>
        </div>
      </motion.div>
    </>
  );
}