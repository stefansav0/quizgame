"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Helper function to dynamically assign emojis and ranks based on the score
const getScoreReaction = (percentage) => {
  if (percentage === 100) return { emoji: "🏆", rank: "Flawless! You are certified besties.", color: "text-emerald-400" };
  if (percentage >= 80) return { emoji: "🔥", rank: "Amazing! You really know them well.", color: "text-rose-400" };
  if (percentage >= 60) return { emoji: "✨", rank: "Not bad! A solid friend.", color: "text-amber-400" };
  if (percentage >= 40) return { emoji: "👍", rank: "Could be better. Acquaintance level.", color: "text-blue-400" };
  if (percentage >= 20) return { emoji: "😬", rank: "Yikes... do you even talk?", color: "text-orange-400" };
  return { emoji: "🤡", rank: "Complete strangers.", color: "text-red-500" };
};

export default function ResultsClient({ quizId, creatorName, totalQuestions, results }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    navigator.clipboard.writeText(`${baseUrl}/quiz/${quizId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  // Featured Result Calculations
  const featuredResult = results.length > 0 ? results[0] : null;
  const featuredPercentage = featuredResult ? featuredResult.percentage : 0;
  const reaction = getScoreReaction(featuredPercentage);
  
  // SVG Circle calculations
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (featuredPercentage / 100) * circumference;

  return (
    <div className="min-h-screen bg-[#0f111a] text-white p-4 py-10 flex flex-col items-center font-sans selection:bg-emerald-500/30">
      
      {/* Background Ambient Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#13151f]/80 backdrop-blur-xl rounded-[2.5rem] p-6 shadow-2xl border border-white/10 pb-10 relative z-10">
        
        {/* --- HEADER CONTROLS --- */}
        <div className="flex justify-between items-center mb-6">
          <Link 
            href="/"
            className="text-slate-400 hover:text-white transition-colors text-sm font-bold flex items-center gap-2"
          >
            <span>←</span> Home
          </Link>
          
          <button 
            onClick={handleCopyLink}
            className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-emerald-400 transition-all flex items-center gap-2"
          >
            {copied ? "Copied! ✔" : "🔗 Copy Quiz Link"}
          </button>
        </div>

        {/* --- TITLE --- */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-emerald-400">
            {creatorName}'s Dashboard
          </h1>
          <p className="text-slate-400 text-sm">
            Total Questions: {totalQuestions} | Players: {results.length}
          </p>
        </div>

        {/* --- FEATURED RESULT & CELEBRATION ANIMATION --- */}
        {featuredResult && (
          <div className="flex flex-col items-center text-center mt-4">
            {/* Animated SVG Circular Score */}
            <div className="relative w-48 h-48 flex items-center justify-center mb-6">
              {/* Particle Explosion Animation */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute text-2xl z-0"
                  initial={{ opacity: 0, scale: 0.5, x: "-50%", y: "-50%" }}
                  animate={{ 
                    opacity: [0, 1, 0], 
                    scale: [0.5, 1.5, 1],
                    x: `calc(-50% + ${Math.cos((i * 45) * (Math.PI / 180)) * 120}px)`,
                    y: `calc(-50% + ${Math.sin((i * 45) * (Math.PI / 180)) * 120}px)`
                  }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                  style={{ top: "50%", left: "50%" }}
                >
                  {reaction.emoji}
                </motion.div>
              ))}

              <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 140 140">
                <circle cx="70" cy="70" r={radius} stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                <motion.circle 
                  cx="70" cy="70" r={radius} 
                  stroke="url(#gradient)" 
                  strokeWidth="12" 
                  fill="transparent" 
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                  className="drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#2dd4bf" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Score Text Inside Circle */}
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", delay: 1 }}
                className="absolute inset-0 flex items-center justify-center flex-col z-20"
              >
                <p className="text-4xl font-black text-emerald-400 drop-shadow-md tracking-tighter">
                  {featuredResult.score} <span className="text-2xl text-emerald-400/60">/ {totalQuestions}</span>
                </p>
              </motion.div>
            </div>

            {/* Dynamic Reaction Text */}
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className={`text-lg font-bold mb-8 px-4 ${reaction.color}`}
            >
              <span className="text-white">{reaction.rank}</span> {reaction.emoji}
            </motion.p>
            
            <div className="w-full h-px bg-white/10 mb-8" />
          </div>
        )}

        {/* --- EMPTY STATE (No one took it yet) --- */}
        {results.length === 0 && (
          <div className="text-center py-10">
            <div className="text-5xl mb-4 animate-pulse">👀</div>
            <h2 className="text-2xl font-bold text-white mb-2">It's quiet here...</h2>
            <p className="text-slate-400 text-sm mb-6">No one has taken your quiz yet. Copy your link and send it to your friends!</p>
            <button 
              onClick={handleCopyLink}
              className="bg-emerald-500 text-emerald-950 font-bold px-6 py-3 rounded-xl hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
            >
              {copied ? "Copied! ✔" : "Copy Link"}
            </button>
          </div>
        )}

        {/* --- LEADERBOARD SECTION --- */}
        {results.length > 0 && (
          <div className="w-full">
            <h2 className="text-xl font-bold text-center mb-5 flex items-center justify-center gap-2">
              🏆 Leaderboard
            </h2>

            <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-3">
              {results.map((r, i) => {
                const isTopPlayer = i === 0;

                return (
                  <motion.div
                    variants={itemVariants}
                    key={r.id}
                    onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                    className={`rounded-2xl p-4 cursor-pointer transition-all border ${
                      isTopPlayer 
                        ? 'bg-emerald-900/20 border-emerald-500/30 hover:border-emerald-500/50' 
                        : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    {/* Header Row */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className={`font-black text-lg ${isTopPlayer ? 'text-emerald-400' : 'text-slate-500'}`}>
                          {i + 1}.
                        </span>
                        <p className={`font-bold ${isTopPlayer ? 'text-emerald-50' : 'text-slate-200'}`}>
                          {r.playerName}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className={`font-black ${isTopPlayer ? 'text-emerald-400' : 'text-emerald-400/70'}`}>
                          {r.score} pts
                        </p>
                        <span className={`text-xs mt-0.5 transition-transform duration-300 ${isTopPlayer ? 'text-emerald-500' : 'text-slate-500'}`} style={{ transform: expandedIndex === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                          ▼
                        </span>
                      </div>
                    </div>

                    {/* ✅ EXPANDABLE ANSWERS (UPDATED VIEW) */}
                    <AnimatePresence>
                      {expandedIndex === i && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
                            {r.answers?.length > 0 ? (
                              r.answers.map((ans, idx) => (
                                <div key={idx} className="p-4 rounded-xl bg-black/40 border border-white/5 text-sm">
                                  <p className="font-semibold text-white/90 mb-3 leading-snug">
                                    {idx + 1}. {ans.question}
                                  </p>
                                  
                                  <div className="flex flex-col gap-2">
                                    {/* What the user picked */}
                                    <div className="flex items-start gap-2">
                                      <span className="mt-0.5">{ans.isCorrect ? '✅' : '❌'}</span>
                                      <span className={`font-bold ${ans.isCorrect ? "text-emerald-400" : "text-rose-400"}`}>
                                        <span className="text-slate-500 font-normal mr-1">They picked:</span>
                                        {ans.selected || ans.selectedText || "Skipped"}
                                      </span>
                                    </div>
                                    
                                    {/* Show the correct answer ONLY if they got it wrong */}
                                    {!ans.isCorrect && (ans.correct || ans.correctText) && (
                                      <div className="flex items-start gap-2 ml-6">
                                        <span className="text-emerald-400 font-bold">
                                          <span className="text-slate-500 font-normal mr-1">Correct answer:</span>
                                          {ans.correct || ans.correctText}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-500 text-xs italic text-center py-2">
                                No detailed answers available for this attempt.
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        )}

        {/* --- BOTTOM BUTTONS --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex gap-4"
        >
          <Link 
            href={`/quiz/${quizId}`}
            className="flex-1 text-center bg-slate-700/50 border border-white/10 text-white font-bold py-4 rounded-xl hover:bg-slate-600 transition-colors"
          >
            Play Quiz
          </Link>
          <Link 
            href="/create" 
            className="flex-1 text-center bg-emerald-500 text-emerald-950 font-black py-4 rounded-xl hover:bg-emerald-400 transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
          >
            Create New 🚀
          </Link>
        </motion.div>

      </div>
    </div>
  );
}