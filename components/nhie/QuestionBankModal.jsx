"use client";

import { motion, AnimatePresence } from "framer-motion";

const modalVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 25 } },
  exit: { opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }
};

export default function QuestionBankModal({ showBankModal, setShowBankModal, questionBank, step, questions, setQuestions }) {
  const swapQuestion = (bankQuestionText) => {
    const newQuestions = [...questions];
    newQuestions[step - 1] = {
      ...newQuestions[step - 1],
      statement: bankQuestionText,
      creatorAnswer: null 
    };
    setQuestions(newQuestions);
    setShowBankModal(false);
  };

  return (
    <AnimatePresence>
      {showBankModal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit" className="bg-white border border-slate-200 rounded-[2rem] w-full max-w-xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-black text-slate-900">Question Bank 📚</h3>
              <button onClick={() => setShowBankModal(false)} className="w-10 h-10 bg-slate-200 hover:bg-rose-100 text-slate-600 hover:text-rose-600 rounded-full flex items-center justify-center transition-colors">✕</button>
            </div>
            <div className="p-4 overflow-y-auto custom-scrollbar flex-1 space-y-3">
              {questionBank.map((bankQText, idx) => (
                <button key={idx} onClick={() => swapQuestion(bankQText)} className="w-full text-left p-5 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 rounded-2xl transition-all group shadow-sm">
                  <p className="font-bold text-slate-700 group-hover:text-emerald-700">{bankQText}</p>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}