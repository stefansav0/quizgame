"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import FloatingLayout from "@/components/FloatingLayout";

// Mapping themes to their specific visual styles so the letter matches the sender's vibe
const THEME_STYLES = {
  purple: { bg: "from-purple-950/40 to-[#0f111a]", glow: "bg-purple-600/30", text: "from-purple-300 via-indigo-200 to-purple-300", paper: "bg-[#1a1c29]/90", accent: "text-purple-400" },
  rose: { bg: "from-rose-950/40 to-[#0f111a]", glow: "bg-rose-600/30", text: "from-rose-300 via-pink-200 to-rose-300", paper: "bg-[#291a1e]/90", accent: "text-rose-400" },
  emerald: { bg: "from-emerald-950/40 to-[#0f111a]", glow: "bg-emerald-600/30", text: "from-emerald-300 via-teal-200 to-emerald-300", paper: "bg-[#1a2922]/90", accent: "text-emerald-400" },
  amber: { bg: "from-amber-950/40 to-[#0f111a]", glow: "bg-amber-600/30", text: "from-amber-300 via-orange-200 to-amber-300", paper: "bg-[#29221a]/90", accent: "text-amber-400" },
  cyan: { bg: "from-cyan-950/40 to-[#0f111a]", glow: "bg-cyan-600/30", text: "from-cyan-300 via-blue-200 to-cyan-300", paper: "bg-[#1a2429]/90", accent: "text-cyan-400" },
  fuchsia: { bg: "from-fuchsia-950/40 to-[#0f111a]", glow: "bg-fuchsia-600/30", text: "from-fuchsia-300 via-pink-200 to-fuchsia-300", paper: "bg-[#281a29]/90", accent: "text-fuchsia-400" },
  red: { bg: "from-red-950/40 to-[#0f111a]", glow: "bg-red-600/30", text: "from-red-300 via-rose-200 to-red-300", paper: "bg-[#291a1a]/90", accent: "text-red-400" },
};

export default function LetterClient({ letter }) {
  const [isOpened, setIsOpened] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Fallback to purple if theme is missing
  const activeStyle = THEME_STYLES[letter.theme] || THEME_STYLES["purple"];

  const handleOpenLetter = () => {
    setIsAnimating(true);
    // Add a slight delay for suspense before showing the letter
    setTimeout(() => {
      setIsOpened(true);
    }, 600);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${activeStyle.bg} flex items-center justify-center p-4 font-sans relative overflow-hidden transition-colors duration-1000`}>
      
      {/* Background Ambience */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[600px] blur-[140px] rounded-full pointer-events-none ${activeStyle.glow}`} />

      <AnimatePresence mode="wait">
        
        {/* ============================================== */}
        {/* PHASE 1: THE TEASER / UNBOXING SCREEN          */}
        {/* ============================================== */}
        {!isOpened && (
          <motion.div
            key="teaser"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative z-10 flex flex-col items-center text-center max-w-lg w-full px-6 py-12 bg-black/20 backdrop-blur-xl border border-white/10 rounded-[3rem] shadow-2xl"
          >
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="text-8xl mb-6 drop-shadow-2xl cursor-pointer select-none"
              onClick={handleOpenLetter}
            >
              💌
            </motion.div>

            <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
              Hi <span className={`bg-gradient-to-r ${activeStyle.text} bg-clip-text text-transparent`}>{letter.recipientName}</span> 👋
            </h1>
            
            <p className="text-slate-300 text-lg md:text-xl font-medium mb-8 leading-relaxed">
              <strong className="text-white">{letter.senderName}</strong> has written a secret letter just for you.
            </p>

            <button
              onClick={handleOpenLetter}
              disabled={isAnimating}
              className={`group relative px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl font-black text-white text-lg transition-all active:scale-95 overflow-hidden ${isAnimating ? "opacity-50" : ""}`}
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shine_1.5s_ease-in-out_infinite]" />
              {isAnimating ? "Unsealing..." : "Let's open it ✨"}
            </button>
          </motion.div>
        )}

        {/* ============================================== */}
        {/* PHASE 2: THE REVEAL / ACTUAL LETTER            */}
        {/* ============================================== */}
        {isOpened && (
  <motion.div
    key="letter-content"
    initial={{ opacity: 0, y: 50, rotateX: 20 }}
    animate={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{
      type: "spring",
      damping: 20,
      stiffness: 100,
      delay: 0.2,
    }}
    className="relative z-10 w-full"
  >
    <FloatingLayout activeTheme={activeStyle}>
      {/* Letter Card */}
      <div
        className={`${activeStyle.paper} max-w-2xl mx-auto backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[2rem] p-8 md:p-12 relative overflow-hidden`}
      >
        {/* Decoration */}
        <div className="absolute top-0 right-0 p-8 text-6xl opacity-5 select-none pointer-events-none">
          💌
        </div>

        {/* Heading */}
        <h1
          className={`text-4xl font-black mb-8 bg-gradient-to-r ${activeStyle.text} bg-clip-text text-transparent`}
        >
          A Letter For You
        </h1>

        {/* From */}
        <div className="mb-8">
          <p className="text-slate-400 text-sm uppercase tracking-widest">
            From
          </p>
          <p className={`text-xl font-bold ${activeStyle.accent}`}>
            {letter.senderName}
          </p>
        </div>

        {/* Letter */}
        <div className="prose prose-invert max-w-none">
          <div className="whitespace-pre-wrap text-slate-200 text-lg leading-9">
            {letter.message}
          </div>
        </div>

        {/* Signature */}
        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-slate-400 text-sm">With Love,</p>
          <p className={`text-2xl font-bold ${activeStyle.accent}`}>
            {letter.senderName} ❤️
          </p>
        </div>
      </div>

      {/* Bottom Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-8"
      >
        <Link
          href="/letter/create"
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-lg transition-all hover:scale-105 font-semibold"
        >
          💌 Create Your Own Secret Letter
        </Link>
      </motion.div>
    </FloatingLayout>
  </motion.div>
)}
      </AnimatePresence>
    </div>
  );
}