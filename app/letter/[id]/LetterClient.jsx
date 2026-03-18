"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function LetterClient({ letter }) {
  const [isOpen, setIsOpen] = useState(false);

  // Split the message into paragraphs for the beautiful staggered reveal
  const paragraphs = letter.message.split('\n').filter(p => p.trim() !== '');

  // --- ANIMATIONS ---
  const envelopeVariants = {
    hover: { scale: 1.05, rotate: [-1, 1, -1], transition: { duration: 0.5, repeat: Infinity } },
    tap: { scale: 0.95 },
  };

  const letterRevealVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { type: "spring", stiffness: 80, damping: 20 } },
    exit: { opacity: 0, scale: 0.9, filter: "blur(10px)", transition: { duration: 0.3 } }
  };

  // The staggered container for the paragraphs
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.5 } // 0.3s delay between each paragraph
    }
  };

  // Individual paragraph animation
  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const floatAnimation = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center p-4 font-sans text-white overflow-hidden py-10 selection:bg-pink-500/30">
      
      {/* --- BACKGROUND GLOW --- */}
      <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-purple-600/20 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-96 h-96 bg-pink-600/20 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Floating Ambient Emojis */}
      <motion.div variants={floatAnimation} animate="animate" className="fixed top-20 left-[15%] text-4xl opacity-20 select-none hidden md:block z-0">✨</motion.div>
      <motion.div variants={floatAnimation} animate="animate" transition={{ delay: 2.5 }} className="fixed bottom-20 right-[15%] text-4xl opacity-20 select-none hidden md:block z-0">💌</motion.div>
      <motion.div variants={floatAnimation} animate="animate" transition={{ delay: 1 }} className="fixed top-[40%] right-[10%] text-2xl opacity-10 select-none hidden lg:block z-0">💖</motion.div>

      <div className="w-full max-w-2xl relative z-10 flex flex-col items-center">
        
        <AnimatePresence mode="wait">
          
          {/* ========================================== */}
          {/* STATE 0: THE SEALED ENVELOPE */}
          {/* ========================================== */}
          {!isOpen && (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => setIsOpen(true)}
            >
              <div className="mb-10 text-center">
                <p className="text-pink-400/80 font-bold tracking-[0.3em] uppercase text-xs mb-3">Secret Message For</p>
                <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-br from-white via-pink-200 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                  {letter.recipientName}
                </h1>
              </div>

              {/* The Envelope Graphic */}
              <motion.div 
                variants={envelopeVariants}
                whileHover="hover"
                whileTap="tap"
                className="relative w-72 h-48 md:w-[22rem] md:h-64 bg-gradient-to-br from-[#1a1c29] to-[#0f111a] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 flex items-center justify-center overflow-hidden"
              >
                {/* Envelope Flap Illusion */}
                <div className="absolute top-0 w-0 h-0 border-l-[144px] md:border-l-[176px] border-r-[144px] md:border-r-[176px] border-t-[110px] md:border-t-[140px] border-l-transparent border-r-transparent border-t-white/5 pointer-events-none"></div>
                
                {/* Wax Seal */}
                <div className="absolute z-10 w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(225,29,72,0.5)] border-[3px] border-pink-400/30 group-hover:shadow-[0_0_40px_rgba(225,29,72,0.8)] group-hover:border-pink-300/60 transition-all duration-500">
                  <span className="text-3xl drop-shadow-md animate-pulse">💖</span>
                </div>
              </motion.div>

              <motion.p 
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-12 text-slate-300 font-medium bg-white/5 px-8 py-3 rounded-full border border-white/10 backdrop-blur-sm shadow-xl"
              >
                Tap to open the letter...
              </motion.p>
            </motion.div>
          )}

          {/* ========================================== */}
          {/* STATE 1: THE REVEALED LETTER */}
          {/* ========================================== */}
          {isOpen && (
            <motion.div
              key="letter"
              variants={letterRevealVariants}
              initial="hidden"
              animate="visible"
              className="w-full bg-[#13151f]/80 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-14 shadow-[0_0_50px_rgba(236,72,153,0.1)] border border-pink-500/20 relative overflow-hidden"
            >
              {/* Internal Glowing Orb */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-64 bg-pink-500/10 blur-[80px] pointer-events-none" />

              {/* Animated Letter Content */}
              <motion.div 
                variants={textContainerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10"
              >
                {/* Greeting */}
                <motion.h2 variants={paragraphVariants} className="text-3xl md:text-4xl font-black text-white mb-8">
                  Dear <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">{letter.recipientName}</span>,
                </motion.h2>
                
                {/* The Staggered Paragraphs */}
                <div className="space-y-6 text-lg md:text-xl text-slate-300 leading-loose font-medium mb-12">
                  {paragraphs.map((para, index) => (
                    <motion.p key={index} variants={paragraphVariants}>
                      {para}
                    </motion.p>
                  ))}
                </div>
                
                {/* Signature */}
                <motion.div variants={paragraphVariants} className="text-right border-t border-white/10 pt-8 mt-12">
                  <p className="text-slate-400 text-lg italic mb-2">With all my love,</p>
                  <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent inline-block drop-shadow-md">
                    {letter.senderName}
                  </p>
                </motion.div>
              </motion.div>

              {/* CTA to Create Their Own */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="mt-16 bg-black/40 rounded-[2rem] p-8 border border-white/5 text-center relative z-10 backdrop-blur-md"
              >
                <p className="text-sm font-bold text-slate-400 mb-6 uppercase tracking-wider">Want to send a secret letter to someone else?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/letter/create"
                    className="flex-1 sm:flex-none bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-bold transition-colors border border-white/10"
                  >
                    Write a Letter 💌
                  </Link>
                  <Link 
                    href="/create"
                    className="flex-1 sm:flex-none bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(236,72,153,0.3)]"
                  >
                    Make a Bestie Quiz 🎯
                  </Link>
                </div>
              </motion.div>

            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}