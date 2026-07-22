"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { itemVariants } from "@/lib/animations";

export default function HeroSection() {
  return (
    <>
      <header className="text-center mb-16 max-w-4xl pt-12 mx-auto flex flex-col items-center px-4">
        
        {/* --- ANIMATED LOGO --- */}
        {/* Adjusted sizes: smaller on mobile (w-64) and max-w-full to prevent horizontal scrolling */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05, rotate: -6 }}
          className="mb-8 relative w-64 h-20 sm:w-80 sm:h-24 md:w-[400px] md:h-[120px] z-10 -rotate-3 max-w-full"
        >
          <Image 
            src="/favicon.ico" 
            alt="GetKnowify Logo" 
            fill
            sizes="(max-width: 640px) 256px, 400px"
            className="object-contain drop-shadow-md"
            priority
          />
        </motion.div>

        

        {/* --- MAIN HEADING --- */}
        {/* Lowered mobile size to text-4xl, and removed "whitespace-nowrap" so it can safely wrap on tiny screens */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-7xl font-black text-center mb-6 tracking-tight text-slate-900 drop-shadow-sm leading-[1.2]"
        >
          How Well Do You <br className="hidden md:block" />
          <span className="relative inline-block mt-2">
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

      {/* --- CTA BUTTONS --- */}
      <motion.div 
        variants={itemVariants} 
        className="flex flex-col lg:flex-row flex-wrap gap-5 mb-24 w-full max-w-4xl mx-auto justify-center items-center px-4"
      >
        {/* Primary Action */}
        <Link href="/create" className="group relative w-full sm:w-auto z-10" aria-label="Create a Friendship Quiz">
          <div className="absolute -inset-1 bg-indigo-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
          <div className="relative bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg px-8 py-5 rounded-2xl text-center shadow-xl shadow-indigo-200 transition-all flex items-center justify-center gap-3 active:scale-95 group-hover:-translate-y-1">
            <svg className="w-6 h-6 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Create Your Quiz</span>
          </div>
        </Link>

        {/* Secondary Actions Group */}
        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
          <Link href="/nhie" className="group relative w-full sm:w-auto" aria-label="Create a Never Have I Ever Game">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 hover:brightness-110 text-slate-900 font-extrabold text-lg px-8 py-5 rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 group-hover:-translate-y-1 border border-orange-300/50">
              <span>Never Have I Ever</span>
            </div>
          </Link>

          <Link href="/letter/create" className="group relative w-full sm:w-auto" aria-label="Send a Secret Letter">
            <div className="relative bg-white border-2 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-slate-700 font-bold text-lg px-8 py-5 rounded-2xl text-center shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-3 active:scale-95 group-hover:-translate-y-1">
              <span>Secret Letter</span>
            </div>
          </Link>
        </div>
      </motion.div>
    </>
  );
}