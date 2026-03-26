"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white selection:bg-emerald-500/30 font-sans pb-20">
      
      {/* Background Glow Effects */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[200%] md:w-[100%] h-96 bg-emerald-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 pt-24 relative z-10">
        
        {/* HERO SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold tracking-widest uppercase mb-6">
            <span>👋</span> Welcome to the club
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight bg-gradient-to-r from-white via-emerald-100 to-emerald-400 bg-clip-text text-transparent">
            We Test Friendships. <br className="hidden md:block" />
            <span className="text-white">Literally.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            We are the creators of the internet's favorite "Who Knows Me Best" quiz. Our mission is simple: bring people together through fun, slightly chaotic, and totally revealing quizzes.
          </p>
        </motion.div>

        {/* CONTENT SECTIONS */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          
          {/* Section 1: Our Story */}
          <motion.div variants={itemVariants} className="bg-[#13151f]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-2xl">
                📖
              </div>
              <h2 className="text-2xl md:text-3xl font-black">Our Story</h2>
            </div>
            <div className="space-y-4 text-slate-300 leading-relaxed text-lg">
              <p>
                It all started in a late-night group chat. We realized that despite texting every single day, some of our closest friends didn't know our favorite food, our biggest fears, or our weirdest habits. 
              </p>
              <p>
                We wanted a fun way to "expose" who was actually paying attention. So, we built a simple quiz platform. Within days, the links were being shared across Instagram, WhatsApp, and TikTok. Millions of questions later, we've become the go-to platform for testing the bonds of friendship.
              </p>
            </div>
          </motion.div>

          {/* Section 2: Why We Do It */}
          <motion.div variants={itemVariants} className="bg-[#13151f]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/20 flex items-center justify-center text-2xl">
                ❤️
              </div>
              <h2 className="text-2xl md:text-3xl font-black">Why We Do It</h2>
            </div>
            <p className="text-slate-300 leading-relaxed text-lg mb-6">
              In a world dominated by passive scrolling and double-taps, we believe in active connection. Quizzes are more than just a game; they are a psychological mirror. They spark deep conversations, trigger nostalgic memories, and give you an excuse to roast your best friend for getting your coffee order wrong.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-black/30 p-5 rounded-2xl border border-white/5">
                <h3 className="font-bold text-emerald-400 mb-2">1. Connect</h3>
                <p className="text-sm text-slate-400">Bridging the digital gap with real, personal interactions.</p>
              </div>
              <div className="bg-black/30 p-5 rounded-2xl border border-white/5">
                <h3 className="font-bold text-emerald-400 mb-2">2. Laugh</h3>
                <p className="text-sm text-slate-400">Because finding out your friend thinks your favorite color is brown is hilarious.</p>
              </div>
              <div className="bg-black/30 p-5 rounded-2xl border border-white/5">
                <h3 className="font-bold text-emerald-400 mb-2">3. Secure</h3>
                <p className="text-sm text-slate-400">We prioritize your privacy. No shady data selling. Just pure fun.</p>
              </div>
            </div>
          </motion.div>

          {/* Section 3: Trust & Safety (Crucial for AdSense) */}
          <motion.div variants={itemVariants} className="bg-gradient-to-br from-[#13151f] to-emerald-950/20 backdrop-blur-xl border border-emerald-500/20 rounded-[2rem] p-8 md:p-12 shadow-xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-2xl">
                🛡️
              </div>
              <h2 className="text-2xl md:text-3xl font-black">Committed to Your Privacy</h2>
            </div>
            <p className="text-slate-300 leading-relaxed text-lg">
              We know that friendship quizzes require you to share personal details. That's why we have built our platform with privacy at its core. Your quiz data is securely stored, never sold to third parties, and you have full control to delete your quizzes and leaderboards at any time. 
            </p>
            <div className="mt-6 flex gap-4">
              <Link href="/privacy" className="text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors underline underline-offset-4">
                Read our Privacy Policy
              </Link>
              <span className="text-slate-600">•</span>
              <Link href="/terms" className="text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors underline underline-offset-4">
                Terms of Service
              </Link>
            </div>
          </motion.div>

        </motion.div>

        {/* CTA / CONTACT SECTION */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-black mb-6">Ready to test your friends?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/"
              className="bg-emerald-500 text-emerald-950 px-8 py-4 rounded-2xl font-black hover:bg-emerald-400 transition-colors shadow-[0_0_30px_rgba(52,211,153,0.3)] hover:scale-105 active:scale-95"
            >
              Create Your Quiz Now 🚀
            </Link>
            <Link 
              href="/contact"
              className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all hover:scale-105 active:scale-95"
            >
              Contact Support ✉️
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}