"use client";

import { motion } from "framer-motion";

const slideVariants = {
  enter: { x: 50, opacity: 0, scale: 0.95 },
  center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
  exit: { zIndex: 0, x: -50, opacity: 0, scale: 0.95 },
};

export default function QuestionEditor({ step, setStep, questions, setQuestions, setShowBankModal, handleSaveAndShare, isSubmitting }) {
  const currentQIndex = step - 1;
  const currentQuestion = questions[currentQIndex];

  const updateQuestionText = (value) => {
    const newQuestions = [...questions];
    newQuestions[currentQIndex].statement = value;
    setQuestions(newQuestions);
  };

  const setAnswer = (value) => {
    const newQuestions = [...questions];
    newQuestions[currentQIndex].creatorAnswer = value;
    setQuestions(newQuestions);
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 10));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <motion.div
      key={`step-${step}`} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`${currentQuestion.bgColor} rounded-[2.5rem] p-6 md:p-10 shadow-xl border border-slate-200 transition-colors duration-700 relative overflow-hidden`}
    >
      <div className="absolute top-0 left-0 h-1.5 bg-slate-200 w-full">
        <motion.div initial={{ width: `${((step - 1) / 10) * 100}%` }} animate={{ width: `${(step / 10) * 100}%` }} className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
      </div>

      <div className="flex justify-between items-center mb-8 mt-2">
        <button onClick={handlePrev} className="w-12 h-12 flex items-center justify-center bg-white border border-slate-200 hover:bg-slate-50 rounded-full transition-colors text-slate-700 text-xl font-bold shadow-sm">←</button>
        <div className="bg-white border border-slate-200 px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase text-slate-600 shadow-sm">Question {step} / 10</div>
      </div>

      <div className="space-y-6 relative z-10">
        <div className="flex justify-center mb-4">
          <button onClick={() => setShowBankModal(true)} className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold py-2 px-5 rounded-full text-sm flex items-center gap-2 transition-all shadow-sm">🎲 Swap Question</button>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-white rounded-3xl blur opacity-0 group-focus-within:opacity-50 transition duration-500"></div>
          <textarea
            rows={4} value={currentQuestion.statement} onChange={(e) => updateQuestionText(e.target.value)}
            className="relative w-full bg-white border border-slate-200 text-slate-900 placeholder-slate-400 px-6 py-5 text-2xl md:text-3xl font-black outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 transition-all rounded-3xl resize-none shadow-sm text-center leading-tight"
          />
        </div>

        <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 mt-4">Have you done this?</p>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={() => setAnswer("I Have")}
            className={`flex-1 py-5 rounded-2xl font-black text-xl transition-all duration-300 flex flex-col items-center gap-2 ${
              currentQuestion.creatorAnswer === "I Have" ? "bg-emerald-100 text-emerald-800 shadow-md scale-[1.02] border border-emerald-300" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <span className="text-3xl">🙋‍♀️</span>I Have
          </button>
          <button
            onClick={() => setAnswer("Never")}
            className={`flex-1 py-5 rounded-2xl font-black text-xl transition-all duration-300 flex flex-col items-center gap-2 ${
              currentQuestion.creatorAnswer === "Never" ? "bg-rose-100 text-rose-800 shadow-md scale-[1.02] border border-rose-300" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <span className="text-3xl">🙅‍♂️</span>Never
          </button>
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        {step < 10 ? (
          <button 
            onClick={handleNext} disabled={currentQuestion.creatorAnswer === null}
            className="bg-slate-900 text-white font-black text-lg py-4 px-8 rounded-2xl hover:bg-slate-800 hover:scale-[1.02] transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
          >Next Question →</button>
        ) : (
          <button
            onClick={handleSaveAndShare} disabled={isSubmitting || currentQuestion.creatorAnswer === null}
            className="bg-emerald-500 text-white font-black text-lg py-4 px-8 rounded-2xl hover:bg-emerald-600 hover:scale-[1.02] transition-all shadow-[0_10px_20px_rgba(16,185,129,0.3)] disabled:opacity-50 h-16 min-w-[200px] justify-center flex items-center gap-2"
          >
            {isSubmitting ? <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div> : "Finish & Share 🚀"}
          </button>
        )}
      </div>
    </motion.div>
  );
}