import { motion } from "framer-motion";

export default function QuestionStep({
  step,
  currentQuestion,
  handlePrev,
  handleNext,
  updateQuestion,
  updateOption,
  setShowBankModal,
  handleSaveAndShare,
  isSubmitting
}) {
  return (
    <>
      {/* Glowing Top Progress Bar */}
      <div className="absolute top-0 left-0 h-1.5 bg-white/20 w-full">
        <motion.div 
          initial={{ width: `${((step - 1) / 10) * 100}%` }}
          animate={{ width: `${(step / 10) * 100}%` }}
          className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]" 
        />
      </div>

      <div className="flex justify-between items-center mb-8 mt-2">
        <button onClick={handlePrev} className="w-12 h-12 flex items-center justify-center bg-black/20 hover:bg-black/40 rounded-full transition-colors text-white/70 text-xl font-bold">
          ←
        </button>
        <div className="bg-black/20 px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase text-white/80 border border-white/5">
          Question {step} / 10
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        <div className="flex justify-center mb-4">
          <button 
            onClick={() => setShowBankModal(true)}
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-2 px-5 rounded-full text-sm flex items-center gap-2 transition-all shadow-lg backdrop-blur-sm"
          >
            🎲 Pick a different question
          </button>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-white/20 rounded-3xl blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
          <textarea
            rows={3}
            value={currentQuestion.question}
            onChange={(e) => updateQuestion(step - 1, "question", e.target.value)}
            className="relative w-full bg-black/20 border border-white/10 text-white placeholder-white/30 px-6 py-5 text-2xl md:text-3xl font-black outline-none focus:border-white/50 focus:bg-black/40 transition-all rounded-3xl resize-none shadow-inner text-center leading-tight"
          />
        </div>

        <p className="text-center text-xs font-bold uppercase tracking-widest text-white/50 mb-2 mt-4">Tap the circle to mark the correct answer</p>

        <div className="space-y-3">
          {currentQuestion.options.map((opt, optIndex) => {
            const isCorrect = currentQuestion.correctAnswer === optIndex;
            return (
              <div key={optIndex} className={`flex items-center gap-3 relative p-2 rounded-2xl transition-all duration-300 ${isCorrect ? "bg-white/20 border-white/50 shadow-lg scale-[1.02]" : "bg-black/20 border-transparent hover:bg-black/30"} border`}>
                <button
                  onClick={() => updateQuestion(step - 1, "correctAnswer", optIndex)}
                  className={`w-12 h-12 ml-1 rounded-xl flex-shrink-0 flex items-center justify-center transition-all duration-300 ${isCorrect ? "bg-emerald-400 text-emerald-950 shadow-[0_0_20px_rgba(52,211,153,0.6)]" : "bg-white/10 text-transparent hover:bg-white/20"}`}
                >
                  <span className="text-xl font-black">✔</span>
                </button>
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => updateOption(step - 1, optIndex, e.target.value)}
                  className={`w-full bg-transparent text-white px-4 py-3 outline-none font-bold text-lg placeholder-white/30 transition-all ${isCorrect ? "opacity-100" : "opacity-80 focus:opacity-100"}`}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        {step < 10 ? (
          <button onClick={handleNext} className="bg-white text-slate-900 font-black text-lg py-4 px-8 rounded-2xl hover:bg-slate-200 hover:scale-[1.02] transition-all shadow-xl flex items-center gap-2">
            Next Question →
          </button>
        ) : (
          <button
            onClick={handleSaveAndShare}
            disabled={isSubmitting}
            className="bg-emerald-400 text-emerald-950 font-black text-lg py-4 px-8 rounded-2xl hover:bg-emerald-300 hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(52,211,153,0.5)] disabled:opacity-50 disabled:scale-100 flex items-center gap-2 h-16 min-w-[200px] justify-center"
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-4 border-emerald-950 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Finish & Share 🚀"
            )}
          </button>
        )}
      </div>
    </>
  );
}