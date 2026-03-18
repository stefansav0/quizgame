"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import AdBanner from "@/components/AdBanner"; // Ensure you created this component from the previous step!

export default function Home() {
  // --- ANIMATION VARIANTS ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
  };

  const floatingVariants: Variants = {
    animate: {
      y: [0, -15, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <div className="min-h-screen bg-[#0f111a] flex justify-center w-full mx-auto px-4 py-10 relative overflow-hidden font-sans text-white">
      
      {/* --- BACKGROUND GLOW EFFECTS --- */}
      <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-rose-500/20 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500/20 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed top-[40%] left-[50%] -translate-x-1/2 w-full max-w-2xl h-64 bg-fuchsia-500/10 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* --- FLOATING EMOJIS (Loved One Vibe) --- */}
      <motion.div variants={floatingVariants} animate="animate" className="fixed top-[15%] left-[15%] text-4xl opacity-50 hidden md:block select-none pointer-events-none z-0">💖</motion.div>
      <motion.div variants={floatingVariants} animate="animate" transition={{ delay: 1 }} className="fixed top-[20%] right-[15%] text-4xl opacity-50 hidden md:block select-none pointer-events-none z-0">✨</motion.div>
      <motion.div variants={floatingVariants} animate="animate" transition={{ delay: 2 }} className="fixed bottom-[20%] left-[20%] text-4xl opacity-50 hidden md:block select-none pointer-events-none z-0">🥺</motion.div>
      <motion.div variants={floatingVariants} animate="animate" transition={{ delay: 1.5 }} className="fixed bottom-[25%] right-[20%] text-4xl opacity-50 hidden md:block select-none pointer-events-none z-0">🔥</motion.div>

      <div className="w-full max-w-[1400px] flex gap-8 relative z-10">
        
        {/* === LEFT AD BANNER (Desktop Only) === */}
        <div className="hidden xl:block w-[300px] sticky top-10 h-[600px] flex-shrink-0">
          <p className="text-[10px] text-slate-500 text-center mb-2 uppercase tracking-widest font-bold">Advertisement</p>
          {/* Replace dataAdSlot with your actual Google AdSense slot ID */}
          <AdBanner dataAdSlot="1111111111" dataAdFormat="vertical" className="w-full h-full bg-black/40 backdrop-blur-md" />
        </div>

        {/* === MAIN CENTER CONTENT === */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex-1 flex flex-col items-center py-10"
        >
          {/* --- HERO SECTION --- */}
          <motion.div variants={itemVariants} className="text-center mb-10 max-w-2xl">
            <div className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 px-5 py-2 rounded-full text-sm font-semibold text-rose-300 mb-6 backdrop-blur-sm shadow-lg">
              <span>For Besties & Partners</span>
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-center mb-6 tracking-tight bg-gradient-to-br from-white via-rose-100 to-rose-400 bg-clip-text text-transparent drop-shadow-sm">
              How Well Do You <br className="hidden md:block" /> Know Me?
            </h1>
            
            <p className="text-center text-slate-400 text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
              Create your custom quiz in seconds and dare your friends, crush, or partner to prove their loyalty. 😜
            </p>
          </motion.div>

          {/* --- CTA BUTTONS --- */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 mb-16 w-full max-w-md sm:max-w-none sm:justify-center">
            <Link href="/create" className="group relative w-full sm:w-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
              <div className="relative bg-rose-500 hover:bg-rose-400 text-white font-black text-lg px-8 py-4 rounded-2xl text-center shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95">
                <span>🎯 Create Your Quiz</span>
              </div>
            </Link>

            <Link href="/letter/create" className="group relative w-full sm:w-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
              <div className="relative bg-[#1a1c29] border border-white/10 hover:border-purple-500/50 text-white font-black text-lg px-8 py-4 rounded-2xl text-center shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95 backdrop-blur-sm">
                <span>💌 Send a Letter</span>
              </div>
            </Link>
          </motion.div>

          {/* --- FEATURES GRID --- */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-16">
            {[
              { icon: "📝", title: "Create Instantly", desc: "Our AI helps you generate fun, personalized questions in just seconds." },
              { icon: "🚀", title: "Share Anywhere", desc: "Send your unique link via WhatsApp, Instagram, or Snapchat instantly." },
              { icon: "🏆", title: "Check the Leaderboard", desc: "Watch live as your friends compete to get the highest score on your board." }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
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
          </motion.div>

          {/* --- VIRAL BOTTOM BANNER --- */}
          <motion.div variants={itemVariants} className="w-full max-w-4xl relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-[#131722] border border-emerald-500/20 rounded-[2rem] p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-xl">
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-black mb-3 text-white">
                  Ready to test your friendships? 👀
                </h2>
                <p className="text-emerald-100/70 font-medium text-lg">
                  Stop guessing. Start testing. 100% Free.
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

        {/* === RIGHT AD BANNER (Desktop Only) === */}
        <div className="hidden xl:block w-[300px] sticky top-10 h-[600px] flex-shrink-0">
          <p className="text-[10px] text-slate-500 text-center mb-2 uppercase tracking-widest font-bold">Advertisement</p>
          {/* Replace dataAdSlot with your actual Google AdSense slot ID */}
          <AdBanner dataAdSlot="2222222222" dataAdFormat="vertical" className="w-full h-full bg-black/40 backdrop-blur-md" />
        </div>

      </div>
    </div>
  );
}