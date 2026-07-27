"use client";

import { motion } from "framer-motion";

export default function InfoSection({ activeTheme = "dark" }) {
  // Check if theme is light or dark
  const isStringTheme = typeof activeTheme === "string";
  const isLight = isStringTheme
    ? activeTheme === "light"
    : (!activeTheme?.bg || activeTheme.bg.includes("50") || activeTheme.bg.includes("white") || activeTheme.bg.includes("100"));

  // Dynamic Tailwind styling matching the glassmorphism style
  const cardBgClass = isLight
    ? "bg-white/80 border-slate-200 shadow-xl text-slate-800"
    : "bg-white/10 border-white/10 shadow-2xl text-white";

  const headingClass = isLight ? "text-slate-900" : "text-white";
  const bodyTextClass = isLight ? "text-slate-600" : "text-slate-300";
  const highlightClass = isLight ? "text-emerald-600" : "text-emerald-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="w-full max-w-5xl mt-16 mb-10 px-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CARD 1: ABOUT */}
        <div className={`rounded-3xl p-8 border backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] ${cardBgClass}`}>
          <h3 className={`text-2xl font-black mb-4 ${headingClass}`}>
            About 💖
          </h3>
          <p className={`text-sm md:text-base leading-relaxed ${bodyTextClass}`}>
            The <strong className={highlightClass}>Ultimate Quiz</strong> is here! Create a personalized quiz all about you, share it with your friends, and find out who truly pays attention and knows you best.
          </p>
        </div>

        {/* CARD 2: HOW IT WORKS */}
        <div className={`rounded-3xl p-8 border backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] ${cardBgClass}`}>
          <h3 className={`text-2xl font-black mb-4 ${headingClass}`}>
            How It Works 
          </h3>
          <ol className={`space-y-3 text-sm md:text-base font-medium ${bodyTextClass}`}>
            <li className="flex items-start gap-2">
              <span className={`font-black ${highlightClass}`}>1.</span>
              <span>Enter your name & language.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className={`font-black ${highlightClass}`}>2.</span>
              <span>Select the right answers to 10 fun questions about yourself.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className={`font-black ${highlightClass}`}>3.</span>
              <span>Swap or edit questions to make it 100% unique.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className={`font-black ${highlightClass}`}>4.</span>
              <span>Share the link and see your friends' scores on your dashboard!</span>
            </li>
          </ol>
        </div>

        {/* CARD 3: FAQ */}
        <div className={`rounded-3xl p-8 border backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] ${cardBgClass}`}>
          <h3 className={`text-2xl font-black mb-4 ${headingClass}`}>
            FAQ 
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className={`font-bold text-sm md:text-base mb-1 ${headingClass}`}>
                Is this quiz free to play?
              </h4>
              <p className={`text-xs md:text-sm leading-relaxed ${bodyTextClass}`}>
                Yes, Create, share, and track endless quizzes without ever needing an account.
              </p>
            </div>
            <div>
              <h4 className={`font-bold text-sm md:text-base mb-1 ${headingClass}`}>
                Can I delete my quiz?
              </h4>
              <p className={`text-xs md:text-sm leading-relaxed ${bodyTextClass}`}>
                Yes! You can delete your active quiz and completely wipe your scoreboard directly from this device at any time.
              </p>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}