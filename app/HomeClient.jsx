"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";

export default function HomeClient() {
  // --- ANIMATION VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
  };

  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <main className="min-h-screen bg-[#0f111a] flex justify-center w-full mx-auto px-4 py-10 relative overflow-hidden font-sans text-white">
      
      {/* --- BACKGROUND GLOW EFFECTS --- */}
      <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-rose-500/20 blur-[120px] rounded-full pointer-events-none z-0" aria-hidden="true" />
      <div className="fixed bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500/20 blur-[120px] rounded-full pointer-events-none z-0" aria-hidden="true" />
      <div className="fixed top-[40%] left-[50%] -translate-x-1/2 w-full max-w-2xl h-64 bg-fuchsia-500/10 blur-[100px] rounded-full pointer-events-none z-0" aria-hidden="true" />

      {/* --- FLOATING EMOJIS --- */}
      <motion.div variants={floatingVariants} animate="animate" className="fixed top-[15%] left-[15%] text-4xl opacity-50 hidden md:block select-none pointer-events-none z-0" aria-hidden="true">💖</motion.div>
      <motion.div variants={floatingVariants} animate="animate" transition={{ delay: 1 }} className="fixed top-[20%] right-[15%] text-4xl opacity-50 hidden md:block select-none pointer-events-none z-0" aria-hidden="true">✨</motion.div>
      <motion.div variants={floatingVariants} animate="animate" transition={{ delay: 2 }} className="fixed bottom-[20%] left-[20%] text-4xl opacity-50 hidden md:block select-none pointer-events-none z-0" aria-hidden="true">🥺</motion.div>
      <motion.div variants={floatingVariants} animate="animate" transition={{ delay: 1.5 }} className="fixed bottom-[25%] right-[20%] text-4xl opacity-50 hidden md:block select-none pointer-events-none z-0" aria-hidden="true">🔥</motion.div>

      {/* Main Container */}
      <div className="w-full max-w-5xl relative z-10 flex flex-col items-center">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full flex flex-col items-center py-10"
        >
          {/* --- HERO SECTION --- */}
          <section className="text-center mb-16 max-w-3xl">
            <motion.div variants={itemVariants} className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 px-5 py-2 rounded-full text-sm font-semibold text-rose-300 mb-6 backdrop-blur-sm shadow-lg">
              <span>For Besties, Couples & Partners</span>
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black text-center mb-6 tracking-tight bg-gradient-to-br from-white via-rose-100 to-rose-400 bg-clip-text text-transparent drop-shadow-sm">
              How Well Do You <br className="hidden md:block" /> Know Me?
            </motion.h1>
            
            <motion.h2 variants={itemVariants} className="text-center text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Create your custom friendship quiz in seconds. Dare your best friends, crush, or partner to take the ultimate friendship test and prove their loyalty on the live leaderboard.
            </motion.h2>
          </section>

          {/* --- CTA BUTTONS --- */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 mb-20 w-full max-w-md sm:max-w-none sm:justify-center">
            <Link href="/create" className="group relative w-full sm:w-auto" aria-label="Create a Friendship Quiz">
              <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
              <div className="relative bg-rose-500 hover:bg-rose-400 text-white font-black text-lg px-8 py-4 rounded-2xl text-center shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95">
                <span>🎯 Create Your Quiz</span>
              </div>
            </Link>

            <Link href="/letter/create" className="group relative w-full sm:w-auto" aria-label="Send a Secret Letter">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
              <div className="relative bg-[#1a1c29] border border-white/10 hover:border-purple-500/50 text-white font-black text-lg px-8 py-4 rounded-2xl text-center shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95 backdrop-blur-sm">
                <span>💌 Send a Letter</span>
              </div>
            </Link>
          </motion.div>

          {/* --- FEATURES GRID (SEO Optimized) --- */}
          <section className="w-full max-w-4xl mb-24">
            <motion.div variants={itemVariants} className="text-center mb-10">
              <h2 className="text-3xl font-black text-white">How The Best Friend Quiz Works</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: "📝", title: "1. Create Instantly", desc: "Our smart AI quiz maker generates fun, highly personal questions about your life in just seconds." },
                { icon: "🚀", title: "2. Share Anywhere", desc: "Copy your unique quiz link and paste it on your Instagram Story, Snapchat, or WhatsApp group chat." },
                { icon: "🏆", title: "3. Check the Leaderboard", desc: "Watch live as your friends take the test. Find out who your real best friend is based on their score." }
              ].map((feature, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md shadow-2xl hover:bg-white/10 transition-colors"
                >
                  <div className="text-4xl mb-4 bg-white/10 w-16 h-16 flex items-center justify-center rounded-2xl shadow-inner">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed font-medium">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* --- SEO FAQ SECTION --- */}
          <section className="w-full max-w-3xl mb-24">
            <motion.div variants={itemVariants} className="text-center mb-10">
              <h2 className="text-3xl font-black text-white">Frequently Asked Questions</h2>
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="bg-[#131722]/80 border border-white/10 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-emerald-400 mb-2">Is the "How Well Do You Know Me" quiz free?</h3>
                <p className="text-slate-400">Yes! Creating a quiz, sharing it, and checking your leaderboard is 100% free forever. There are no hidden fees.</p>
              </div>
              <div className="bg-[#131722]/80 border border-white/10 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-emerald-400 mb-2">Can I use this as a Couples Quiz?</h3>
                <p className="text-slate-400">Absolutely. While it's popular as a BFF test, many users send their quiz link to their boyfriend, girlfriend, or crush to test relationship compatibility.</p>
              </div>
              <div className="bg-[#131722]/80 border border-white/10 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-emerald-400 mb-2">Are my quiz answers private?</h3>
                <p className="text-slate-400">Your privacy is our priority. Your secret dashboard is only accessible to you, and you can delete your quiz and data from our servers at any time.</p>
              </div>
            </motion.div>
          </section>

          {/* --- VIRAL BOTTOM BANNER --- */}
          <motion.div variants={itemVariants} className="w-full max-w-4xl relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-[#131722] border border-emerald-500/20 rounded-[2rem] p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-xl">
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-black mb-3 text-white">
                  Ready to test your friendships? 👀
                </h2>
                <p className="text-emerald-100/70 font-medium text-lg">
                  Stop guessing. Start testing. Build your online quiz today.
                </p>
              </div>
              <Link 
                href="/create"
                className="bg-emerald-500 text-emerald-950 px-8 py-4 rounded-2xl font-black text-lg hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] whitespace-nowrap active:scale-95"
              >
                Start Now 🚀
              </Link>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </main>
  );
}
