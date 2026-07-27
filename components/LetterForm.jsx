"use client";
import { motion } from "framer-motion";
import { TEMPLATES } from "../constants/letterData";

export const slideVariants = {
  enter: { y: 50, opacity: 0, scale: 0.95 },
  center: { zIndex: 1, y: 0, opacity: 1, scale: 1 },
  exit: { zIndex: 0, y: -50, opacity: 0, scale: 0.95 },
};

export default function LetterForm({
  letterData,
  handleChange,
  activeTheme,
  activeTemplate,
  applyTemplate,
  handleSealEnvelope,
  isSubmitting,
}) {
  return (
    <motion.div
      key="step-0"
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-[#13151f]/60 backdrop-blur-3xl rounded-[2.5rem] p-6 md:p-10 shadow-2xl border border-white/10 relative overflow-hidden"
    >
      <div className="text-center mb-10 relative z-10">
        <h1 className={`text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r ${activeTheme.text} bg-clip-text text-transparent transition-all duration-700 tracking-tight drop-shadow-lg`}>
          Write a Secret Letter
        </h1>
        <p className="text-slate-300 font-medium">
          Pour your heart out. We'll seal it in a digital envelope.
        </p>
      </div>

      <div className="space-y-8 relative z-10">
        {/* To / From Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className={`text-xs font-bold ${activeTheme.label} ml-2 uppercase tracking-widest transition-colors duration-500`}>To (Recipient)</label>
            <input
              type="text"
              name="recipientName"
              placeholder="E.g. Sarah 💖"
              value={letterData.recipientName}
              onChange={handleChange}
              className={`w-full bg-black/40 border border-white/10 text-white px-5 py-4 rounded-2xl outline-none ${activeTheme.border} focus:bg-black/60 transition-all font-medium placeholder:text-slate-600 shadow-inner`}
            />
          </div>
          <div className="space-y-2">
            <label className={`text-xs font-bold ${activeTheme.label} ml-2 uppercase tracking-widest transition-colors duration-500`}>From (You)</label>
            <input
              type="text"
              name="senderName"
              placeholder="E.g. Alex ✨"
              value={letterData.senderName}
              onChange={handleChange}
              className={`w-full bg-black/40 border border-white/10 text-white px-5 py-4 rounded-2xl outline-none ${activeTheme.border} focus:bg-black/60 transition-all font-medium placeholder:text-slate-600 shadow-inner`}
            />
          </div>
        </div>

        {/* Templates Selector */}
        <div className="pt-4 border-t border-white/10">
          <label className="text-xs font-bold text-slate-300 ml-2 uppercase tracking-widest flex items-center gap-2 mb-4">
            <span>✨ Pick a Vibe & Template</span>
          </label>
          <div className="grid grid-flow-col auto-cols-[110px] grid-rows-2 gap-3 overflow-x-auto pb-4 custom-scrollbar snap-x px-2">
            {TEMPLATES.map((template) => (
              <button
                key={template.id}
                onClick={() => applyTemplate(template.id, template.theme)}
                className={`flex flex-col items-center justify-center p-3 h-[90px] rounded-2xl font-bold transition-all border snap-center ${
                  activeTemplate === template.id
                    ? `bg-gradient-to-br ${activeTheme.button} border-transparent text-white scale-[1.05] shadow-[0_0_20px_rgba(255,255,255,0.2)]`
                    : `bg-black/40 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white hover:border-white/20`
                }`}
              >
                <span className="text-3xl mb-1 drop-shadow-md">{template.icon}</span>
                <span className="text-[10px] tracking-wide uppercase text-center">{template.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Message Area */}
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <label className={`text-xs font-bold ${activeTheme.label} ml-2 uppercase tracking-widest transition-colors duration-500`}>Your Message</label>
            <span className="text-xs font-bold text-slate-400 mr-2 bg-black/30 px-2 py-1 rounded-md">{letterData.message.split(' ').filter(w => w.length > 0).length} words</span>
          </div>
          <div className="relative group">
            <div className={`absolute -inset-1 bg-gradient-to-r ${activeTheme.button} rounded-[2rem] blur opacity-20 group-focus-within:opacity-40 transition duration-500`}></div>
            <textarea
              name="message"
              rows={10}
              placeholder="I just wanted to tell you..."
              value={letterData.message}
              onChange={handleChange}
              className={`relative w-full bg-[#0a0b10]/80 backdrop-blur-sm border border-white/10 text-white px-6 py-6 rounded-[1.5rem] outline-none ${activeTheme.border} transition-all text-lg leading-relaxed placeholder:text-slate-600 resize-none shadow-inner custom-scrollbar font-medium`}
            />
          </div>
        </div>
      </div>

      <div className="mt-10 relative z-10">
        <button
          onClick={handleSealEnvelope}
          disabled={!letterData.recipientName || !letterData.senderName || !letterData.message || isSubmitting}
          className={`w-full bg-gradient-to-r ${activeTheme.button} text-white font-black text-xl py-5 px-6 rounded-2xl hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-center gap-2 border border-white/20`}
        >
          {isSubmitting ? (
            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            "Seal Envelope 💌"
          )}
        </button>
      </div>
    </motion.div>
  );
}