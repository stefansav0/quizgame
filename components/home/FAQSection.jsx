"use client";

import { motion } from "framer-motion";
import { itemVariants } from "@/lib/animations";

export default function FAQSection() {
  return (
    <section className="w-full max-w-4xl mb-24">
      <motion.div variants={itemVariants} className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900">Frequently Asked Questions</h2>
        <p className="text-slate-600 mt-4 text-lg">Answers to some common questions about the platform.</p>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-indigo-50 via-white to-violet-50 border border-indigo-100 rounded-[2.5rem] shadow-sm p-8 hover:shadow-md transition-shadow">
          <h3 className="text-xl font-bold text-slate-900 mb-3">Is the quiz free to use?</h3>
          <p className="text-slate-600 leading-relaxed">Yes. You can create quizzes, share them with friends, and view scores without paying any fees.</p>
        </div>

        <div className="bg-slate-100 border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-bold text-slate-900 mb-3">Can I create custom questions?</h3>
          <p className="text-slate-600 leading-relaxed">Yes. You can write your own questions and answers to personalize your friendship quiz and make it more unique.</p>
        </div>

        <div className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-bold text-slate-900 mb-3">Are my quiz results private?</h3>
          <p className="text-slate-600 leading-relaxed">Your quiz and leaderboard are only accessible through your shared quiz link or dashboard. For more details, please review our privacy policy.</p>
        </div>

        <div className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-bold text-slate-900 mb-3">How many people can join my quiz?</h3>
          <p className="text-slate-600 leading-relaxed">You can share your quiz with as many friends, classmates, or followers as you want.</p>
        </div>
      </motion.div>
    </section>
  );
}