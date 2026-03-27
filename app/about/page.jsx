"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white selection:bg-emerald-500/30 font-sans pb-20">
      
      {/* Background Glow Effects */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[200%] md:w-[100%] h-96 bg-emerald-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 pt-24 relative z-10">
        
        {/* HERO SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm font-bold tracking-widest uppercase mb-6">
            <span>👋</span> Hello there
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-white">
            About Us
          </h1>
          <p className="text-lg text-slate-400 font-medium max-w-xl mx-auto leading-relaxed">
            A simple platform built to bring friends closer through fun, personalized quizzes and shared memories.
          </p>
        </motion.div>

        {/* CONTENT SECTIONS */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          
          {/* Section 1: Our Story */}
          <motion.div variants={itemVariants} className="bg-[#13151f]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-xl">🌱</span> How it started
            </h2>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                We built this platform because we wanted a simple, interactive way to connect with our own friends. 
              </p>
              <p>
                It began as a small project to see who remembered the little details—like our go-to coffee orders or childhood habits—and evolved into a space where anyone can share a laugh with their favorite people.
              </p>
            </div>
          </motion.div>

          {/* Section 2: Why We Do It */}
          <motion.div variants={itemVariants} className="bg-[#13151f]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-xl">💡</span> Our Goal
            </h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              In a busy digital world, we hope to make online interactions feel a bit more personal. It's not about keeping score; it's about sparking conversations, revisiting good memories, and enjoying each other's company.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <h3 className="font-bold text-emerald-400 mb-1">Connect</h3>
                <p className="text-sm text-slate-400">Bridging the gap with lighthearted, personal interactions.</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <h3 className="font-bold text-emerald-400 mb-1">Laugh</h3>
                <p className="text-sm text-slate-400">Because finding out your best friend forgot your favorite color is always funny.</p>
              </div>
            </div>
          </motion.div>

          {/* Section 3: Trust & Safety */}
          <motion.div variants={itemVariants} className="bg-emerald-950/20 backdrop-blur-xl border border-emerald-500/20 rounded-[2rem] p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-xl">🛡️</span> Privacy First
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Your trust matters to us. We don't sell your personal data, and you have full control to delete your quizzes whenever you want. Just pure, secure fun.
            </p>
            <div className="mt-5 flex gap-4">
              <Link href="/privacy" className="text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors underline underline-offset-4">
                Privacy Policy
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
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/create"
              className="bg-emerald-500 text-emerald-950 px-8 py-3.5 rounded-xl font-bold hover:bg-emerald-400 transition-colors shadow-lg active:scale-95"
            >
              Create a Quiz
            </Link>
            <Link 
              href="/contact"
              className="bg-white/10 text-white border border-white/20 px-8 py-3.5 rounded-xl font-bold hover:bg-white/20 transition-all active:scale-95"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}