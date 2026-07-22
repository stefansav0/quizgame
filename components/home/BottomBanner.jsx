"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { itemVariants } from "@/lib/animations";

export default function BottomBanner() {
  return (
    <motion.div variants={itemVariants} className="w-full max-w-4xl relative group mb-10">
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-[3rem] blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

      <div className="relative bg-slate-900 rounded-[2.5rem] p-10 md:p-14 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]"></div>

        <div className="text-center md:text-left relative z-10">
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">
            Ready to create your friendship quiz? 👀
          </h2>
          <p className="text-indigo-200 font-medium text-lg max-w-md">
            Create a fun personalized quiz, share it with friends, and see who knows you best.
          </p>
        </div>

        <Link
          href="/create"
          className="relative z-10 bg-indigo-500 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-indigo-400 transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] whitespace-nowrap active:scale-95"
        >
          Create Quiz 
        </Link>
      </div>
    </motion.div>
  );
}