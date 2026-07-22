"use client";

import { motion } from "framer-motion";

export default function FloatingBackground() {
  // --- NEW FALLING ANIMATION ---
  // Items will fall from -15vh (above screen) to 115vh (below screen)
  // They will drift slightly on the X-axis and slowly rotate as they fall.
  const fallingVariants = {
    animate: (custom) => ({
      y: ["-15vh", "115vh"],
      x: [0, custom.drift, -custom.drift, 0],
      rotate: [0, custom.rot],
      opacity: [0, 1, 1, 0], // Fades in at the top, stays visible, fades out at the bottom
      transition: {
        y: { duration: custom.dur, repeat: Infinity, ease: "linear", delay: custom.delay },
        x: { duration: custom.dur * 0.6, repeat: Infinity, ease: "easeInOut", delay: custom.delay },
        rotate: { duration: custom.dur, repeat: Infinity, ease: "linear", delay: custom.delay },
        opacity: { duration: custom.dur, repeat: Infinity, ease: "linear", delay: custom.delay },
      },
    }),
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      
      {/* --- RESPONSIVE AMBIENT GRADIENTS --- */}
      <div className="absolute top-[-5%] left-[-10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-indigo-300/20 blur-[100px] md:blur-[120px] rounded-full" />
      <div className="absolute bottom-[-5%] right-[-10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-violet-300/20 blur-[100px] md:blur-[120px] rounded-full" />

      {/* --- FALLING LIFESTYLE LINE-ART ICONS --- */}
      
      {/* 1. Hand / High-Five */}
      <motion.div 
        custom={{ dur: 22, rot: 120, drift: 30, delay: 0 }}
        variants={fallingVariants} animate="animate" initial={{ opacity: 0 }}
        className="absolute left-[5%] text-indigo-400/30 w-10 h-10 md:w-14 md:h-14"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 10V6a2 2 0 1 0-4 0v8"/><path d="M14 10V4a2 2 0 1 0-4 0v8"/><path d="M10 10V5a2 2 0 1 0-4 0v8"/><path d="M6 14v-2a2 2 0 1 0-4 0v7a8 8 0 0 0 16 0v-5a2 2 0 1 0-4 0v3"/>
        </svg>
      </motion.div>

      {/* 2. Pizza Slice */}
      <motion.div 
        custom={{ dur: 26, rot: -90, drift: -40, delay: 4 }}
        variants={fallingVariants} animate="animate" initial={{ opacity: 0 }}
        className="absolute left-[15%] text-violet-400/30 w-12 h-12 md:w-16 md:h-16"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 11h.01"/><path d="M11 15h.01"/><path d="M16 16h.01"/><path d="m2 16 20 6-6-20A20 20 0 0 0 2 16Z"/>
        </svg>
      </motion.div>

      {/* 3. Camera */}
      <motion.div 
        custom={{ dur: 20, rot: 45, drift: 25, delay: 8 }}
        variants={fallingVariants} animate="animate" initial={{ opacity: 0 }}
        className="absolute left-[28%] text-indigo-400/20 w-10 h-10 md:w-14 md:h-14"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
        </svg>
      </motion.div>

      {/* 4. Friends / People */}
      <motion.div 
        custom={{ dur: 28, rot: -30, drift: -20, delay: 2 }}
        variants={fallingVariants} animate="animate" initial={{ opacity: 0 }}
        className="absolute left-[40%] text-violet-400/30 w-12 h-12 md:w-16 md:h-16"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="7" r="4"/><path d="M10 15H6a4 4 0 0 0-4 4v2"/><circle cx="17" cy="11" r="3"/><path d="M21 21v-2a4 4 0 0 0-4-4h-2.5"/>
        </svg>
      </motion.div>

      {/* 5. Music Note */}
      <motion.div 
        custom={{ dur: 24, rot: 110, drift: 35, delay: 12 }}
        variants={fallingVariants} animate="animate" initial={{ opacity: 0 }}
        className="absolute left-[55%] text-indigo-400/20 w-10 h-10 md:w-12 md:h-12"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
        </svg>
      </motion.div>

      {/* 6. Gamepad */}
      <motion.div 
        custom={{ dur: 25, rot: -100, drift: -30, delay: 6 }}
        variants={fallingVariants} animate="animate" initial={{ opacity: 0 }}
        className="absolute right-[30%] text-violet-400/30 w-12 h-12 md:w-14 md:h-14"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h4m-2-2v4m4-2h.01M16 12h.01"/>
        </svg>
      </motion.div>

      {/* 7. Coffee Cup */}
      <motion.div 
        custom={{ dur: 21, rot: 80, drift: 40, delay: 1 }}
        variants={fallingVariants} animate="animate" initial={{ opacity: 0 }}
        className="absolute right-[15%] text-indigo-400/30 w-10 h-10 md:w-14 md:h-14"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/>
        </svg>
      </motion.div>

      {/* 8. Gift Box */}
      <motion.div 
        custom={{ dur: 27, rot: -60, drift: -25, delay: 9 }}
        variants={fallingVariants} animate="animate" initial={{ opacity: 0 }}
        className="absolute right-[5%] text-violet-400/20 w-12 h-12 md:w-16 md:h-16"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="8" width="18" height="14" rx="2"/><path d="M12 5a3 3 0 1 0-3 3m6 0a3 3 0 1 0-3-3m0 0v17M3 8h18"/>
        </svg>
      </motion.div>

      {/* 9. Heart */}
      <motion.div 
        custom={{ dur: 19, rot: 45, drift: 20, delay: 5 }}
        variants={fallingVariants} animate="animate" initial={{ opacity: 0 }}
        className="absolute left-[75%] text-indigo-400/30 w-8 h-8 md:w-12 md:h-12 hidden sm:block"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </motion.div>

      {/* 10. Smiley Face */}
      <motion.div 
        custom={{ dur: 29, rot: -120, drift: -30, delay: 15 }}
        variants={fallingVariants} animate="animate" initial={{ opacity: 0 }}
        className="absolute left-[85%] text-violet-400/20 w-12 h-12 md:w-16 md:h-16 hidden sm:block"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/>
        </svg>
      </motion.div>

    </div>
  );
}