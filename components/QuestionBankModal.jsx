import { motion } from "framer-motion";

export default function QuestionBankModal({ questionBank, swapQuestion, setShowBankModal, modalVariants }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-[#1a1c29] border border-white/10 rounded-[2rem] w-full max-w-xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20">
          <h3 className="text-xl font-black text-white">Question Bank 📚</h3>
          <button 
            onClick={() => setShowBankModal(false)}
            className="w-10 h-10 bg-white/5 hover:bg-rose-500/20 text-white hover:text-rose-400 rounded-full flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-4 overflow-y-auto custom-scrollbar flex-1 space-y-3">
          {questionBank.map((bankQ, idx) => (
            <button
              key={idx}
              onClick={() => swapQuestion(bankQ)}
              className="w-full text-left p-5 bg-white/5 hover:bg-emerald-500/20 border border-white/5 hover:border-emerald-500/50 rounded-2xl transition-all group"
            >
              <p className="font-bold text-white mb-2 group-hover:text-emerald-300">{bankQ.question}</p>
              <div className="flex flex-wrap gap-2">
                {bankQ.options.map((opt, i) => (
                  <span key={i} className="text-xs bg-black/40 px-2 py-1 rounded text-slate-400">
                    {opt}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}