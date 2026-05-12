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
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
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
            <span>👋</span>
            <span>Hello there</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-white">
            About Us
          </h1>

          <p className="text-lg text-slate-400 font-medium max-w-xl mx-auto leading-relaxed">
            A simple platform designed to help friends, classmates, couples,
            and families connect through fun quizzes, conversations, and
            shared memories.
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
          <motion.div
            variants={itemVariants}
            className="bg-[#13151f]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-xl">🌱</span>
              <span>How It Started</span>
            </h2>

            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                GetKnowify started as a small idea between friends who wanted
                a more personal and interactive way to stay connected online.
              </p>

              <p>
                What began as simple friendship quizzes slowly evolved into a
                platform where people can share laughs, memories, and fun
                conversations with the people who matter most to them.
              </p>

              <p>
                From best friends and classmates to couples and long-distance
                friendships, our goal is to make online interactions feel a
                little more meaningful and enjoyable.
              </p>
            </div>
          </motion.div>

          {/* Section 2: Our Goal */}
          <motion.div
            variants={itemVariants}
            className="bg-[#13151f]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-xl">💡</span>
              <span>Our Goal</span>
            </h2>

            <p className="text-slate-300 leading-relaxed mb-6">
              In a fast-moving digital world, we believe small interactions can
              still create meaningful moments. Whether it is a friendship quiz,
              a fun challenge, or a shared memory, our platform is designed to
              encourage lighthearted conversations and genuine connections.
            </p>

            <p className="text-slate-300 leading-relaxed">
              It is not about keeping score. It is about creating moments that
              make people smile, reconnect, and enjoy spending time together.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

              <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <h3 className="font-bold text-emerald-400 mb-1">
                  Connect
                </h3>

                <p className="text-sm text-slate-400">
                  Creating fun ways for friends and family to stay connected.
                </p>
              </div>

              <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <h3 className="font-bold text-emerald-400 mb-1">
                  Laugh
                </h3>

                <p className="text-sm text-slate-400">
                  Because finding out your best friend forgot your favorite
                  color is always funny.
                </p>
              </div>

            </div>
          </motion.div>

          {/* Section 3: Privacy & Transparency */}
          <motion.div
            variants={itemVariants}
            className="bg-emerald-950/20 backdrop-blur-xl border border-emerald-500/20 rounded-[2rem] p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-xl">🛡️</span>
              <span>Privacy & Transparency</span>
            </h2>

            <p className="text-slate-300 leading-relaxed">
              Your trust matters to us. We aim to keep GetKnowify simple,
              respectful, and user-friendly. You can manage or delete your
              quizzes anytime through your account or dashboard.
            </p>

            <p className="text-slate-300 leading-relaxed mt-4">
              We also encourage users to review our policies to better
              understand how the platform works and how information is handled.
            </p>

            <div className="mt-5 flex gap-4">
              <Link
                href="/privacy"
                className="text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors underline underline-offset-4"
              >
                Privacy Policy
              </Link>

              <span className="text-slate-600">•</span>

              <Link
                href="/terms"
                className="text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors underline underline-offset-4"
              >
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