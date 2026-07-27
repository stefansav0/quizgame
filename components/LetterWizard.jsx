"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TEMPLATES } from "@/constants/letterData"; 

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 50 : -50,
    opacity: 0,
    scale: 0.95,
  }),
};

export default function LetterWizard({
  letterData,
  handleChange,
  activeTheme,
  activeTemplate,
  applyTemplate,
  handleSealEnvelope,
  isSubmitting,
}) {
  const [wizardStep, setWizardStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextStep = () => {
    setDirection(1);
    setWizardStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setDirection(-1);
    setWizardStep((prev) => prev - 1);
  };

  const handleKeyDown = (e, nextAction) => {
    if (e.key === "Enter" && !e.shiftKey && canProceed()) {
      e.preventDefault();
      nextAction();
    }
  };

  const canProceed = () => {
    if (wizardStep === 0) return letterData.senderName.trim().length > 0;
    if (wizardStep === 1) return letterData.recipientName.trim().length > 0;
    if (wizardStep === 2) return activeTemplate !== "";
    if (wizardStep === 3) return letterData.message.trim().length > 0;
    return false;
  };

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* ==================================== */}
      {/* THE MAIN WIZARD BOX                  */}
      {/* ==================================== */}
      <div className="bg-[#13151f]/80 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl border border-white/10 relative overflow-hidden flex flex-col w-full max-w-4xl mx-auto transition-all duration-500 min-h-[400px]">
        
        {/* Progress Bar (Hidden on Step 0) */}
        {wizardStep > 0 && (
          <div className="absolute top-0 left-0 h-1 bg-white/10 w-full z-20">
            <div
              className={`h-full bg-gradient-to-r ${activeTheme.button} transition-all duration-500`}
              style={{ width: `${((wizardStep) / 3) * 100}%` }}
            />
          </div>
        )}

        <div className="flex-grow relative overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait" custom={direction}>
            
            {/* STEP 0: HERO & SENDER NAME (Inside Box) */}
            {wizardStep === 0 && (
              <motion.div
                key="step-0"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="p-8 md:p-12 space-y-10 flex flex-col justify-center min-h-[400px]"
              >
                <div className="text-center">
                  <h1 className={`text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r ${activeTheme.text} bg-clip-text text-transparent tracking-tight drop-shadow-lg`}>
                    Secret Letters
                  </h1>
                  <p className="text-lg text-slate-300 font-medium max-w-xl mx-auto">
                    Seal your unspoken feelings in a digital envelope. A safe, beautiful, and private way to say what's on your mind.
                  </p>
                </div>

                <div className="max-w-md mx-auto w-full">
                  <label className={`block text-center text-xs font-bold ${activeTheme.label} mb-4 uppercase tracking-widest`}>
                    Ready? Enter your name to begin
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="senderName"
                      placeholder="E.g. Alex ✨"
                      value={letterData.senderName}
                      onChange={handleChange}
                      onKeyDown={(e) => handleKeyDown(e, nextStep)}
                      className={`w-full bg-black/40 border border-white/10 text-white px-6 py-5 rounded-2xl outline-none ${activeTheme.border} focus:bg-black/60 transition-all text-lg font-medium placeholder:text-slate-600 shadow-inner`}
                    />
                    {letterData.senderName.trim() && (
                      <button
                        onClick={nextStep}
                        className={`absolute right-2 top-2 bottom-2 px-6 rounded-xl font-bold bg-gradient-to-r ${activeTheme.button} text-white shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all`}
                      >
                        Start →
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 1: RECIPIENT NAME */}
            {wizardStep === 1 && (
              <motion.div
                key="step-1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="p-6 md:p-10 flex flex-col items-center justify-center min-h-[500px] text-center space-y-8"
              >
                <div>
                  <span className="text-6xl mb-4 block drop-shadow-xl">💌</span>
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Who is this letter for?</h2>
                  <p className="text-slate-400 text-lg">Enter the name of the lucky recipient.</p>
                </div>

                <div className="w-full max-w-md space-y-2 text-left">
                  <label className={`text-xs font-bold ${activeTheme.label} ml-2 uppercase tracking-widest`}>Recipient's Name</label>
                  <input
                    type="text"
                    name="recipientName"
                    placeholder="E.g. Sarah 💖"
                    value={letterData.recipientName}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, nextStep)}
                    className={`w-full bg-black/40 border border-white/10 text-white px-6 py-5 rounded-2xl outline-none ${activeTheme.border} focus:bg-black/60 transition-all text-lg font-medium placeholder:text-slate-600 shadow-inner`}
                    autoFocus
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 2: VIBE & TEMPLATE */}
            {wizardStep === 2 && (
              <motion.div
                key="step-2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="p-6 md:p-10 flex flex-col min-h-[500px]"
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Pick a Vibe</h2>
                  <p className="text-slate-400 text-lg">Choose a template to set the tone for your letter.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-5xl mx-auto w-full">
                  {TEMPLATES.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => applyTemplate(template.id, template.theme)}
                      className={`flex flex-col items-center justify-center p-5 rounded-2xl font-bold transition-all border ${
                        activeTemplate === template.id
                          ? `bg-gradient-to-br ${activeTheme.button} border-transparent text-white scale-[1.05] shadow-[0_0_25px_rgba(255,255,255,0.2)] z-10`
                          : `bg-black/40 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white hover:border-white/20 active:scale-95`
                      }`}
                    >
                      <span className="text-4xl mb-3 drop-shadow-md">{template.icon}</span>
                      <span className="text-xs tracking-wider uppercase text-center">{template.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 3: COMPOSE & SEAL */}
            {wizardStep === 3 && (
              <motion.div
                key="step-3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="p-6 md:p-10 flex flex-col min-h-[500px]"
              >
                <div className="text-center mb-8">
                  <h2 className={`text-3xl md:text-4xl font-black mb-3 bg-gradient-to-r ${activeTheme.text} bg-clip-text text-transparent`}>
                    Write Your Heart Out
                  </h2>
                  <p className="text-slate-400 text-lg">Tweak the generated template or write from scratch.</p>
                </div>

                <div className="relative group max-w-3xl mx-auto w-full flex-grow flex flex-col">
                  <div className={`absolute -inset-1 bg-gradient-to-r ${activeTheme.button} rounded-[2rem] blur opacity-20 group-focus-within:opacity-40 transition duration-500`}></div>
                  <textarea
                    name="message"
                    value={letterData.message}
                    onChange={handleChange}
                    className={`relative w-full flex-grow min-h-[300px] bg-[#0a0b10]/90 backdrop-blur-md border border-white/10 text-white px-8 py-8 rounded-[1.5rem] outline-none ${activeTheme.border} transition-all text-lg leading-relaxed placeholder:text-slate-600 resize-none shadow-inner custom-scrollbar font-medium`}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Persistent Navigation Footer (Steps 1, 2, 3) */}
        {wizardStep > 0 && (
          <div className="p-6 border-t border-white/10 flex justify-between items-center bg-black/30 backdrop-blur-xl rounded-b-[2.5rem]">
            <button
              onClick={prevStep}
              className="px-6 py-3 font-bold text-slate-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-xl flex items-center gap-2"
            >
              ← Back
            </button>

            {wizardStep < 3 ? (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
                  canProceed()
                    ? `bg-gradient-to-r ${activeTheme.button} text-white shadow-lg hover:scale-[1.02] active:scale-[0.98]`
                    : `bg-white/5 text-slate-500 cursor-not-allowed`
                }`}
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={handleSealEnvelope}
                disabled={!canProceed() || isSubmitting}
                className={`px-8 py-4 rounded-xl font-black text-lg transition-all flex items-center gap-2 ${
                  canProceed() && !isSubmitting
                    ? `bg-gradient-to-r ${activeTheme.button} text-white shadow-[0_5px_20px_rgba(0,0,0,0.4)] hover:scale-[1.02] active:scale-[0.98]`
                    : `bg-white/5 text-slate-500 cursor-not-allowed`
                }`}
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  "Seal Envelope 💌"
                )}
              </button>
            )}
          </div>
        )}
      </div>

      {/* ==================================== */}
      {/* CONTENT OUTSIDE THE BOX (Step 0 only)*/}
      {/* ==================================== */}
      <AnimatePresence>
        {wizardStep === 1, 2,3 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-10 max-w-5xl w-full px-4 pb-12"
          >
            {/* About Box */}
            <div className="bg-black/20 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-xl hover:bg-black/30 transition-colors">
              <div className="text-3xl mb-4"></div>
              <h3 className={`font-bold mb-3 text-xl ${activeTheme.label}`}>About</h3>
              <p className="text-slate-300 leading-relaxed font-medium">
                Secret Letters is a digital canvas for vulnerability. Whether it's a heartfelt confession, a lingering apology, or just a random reminder of love, we help you find the perfect words to express your true feelings.
              </p>
            </div>

            {/* How to Create Box */}
            <div className="bg-black/20 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-xl hover:bg-black/30 transition-colors">
              <div className="text-3xl mb-4"></div>
              <h3 className={`font-bold mb-3 text-xl ${activeTheme.label}`}>How It Works</h3>
              <ul className="text-slate-300 leading-relaxed space-y-3 font-medium">
                <li><strong className="text-white">1.</strong> Enter your name & theirs.</li>
                <li><strong className="text-white">2.</strong> Select a vibe / template.</li>
                <li><strong className="text-white">3.</strong> Customize your heartfelt message.</li>
                <li><strong className="text-white">4.</strong> Seal the envelope & share the link!</li>
              </ul>
            </div>

            {/* FAQ Box */}
            <div className="bg-black/20 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-xl hover:bg-black/30 transition-colors">
              <div className="text-3xl mb-4"></div>
              <h3 className={`font-bold mb-3 text-xl ${activeTheme.label}`}>FAQ</h3>
              <div className="space-y-4 text-slate-300 leading-relaxed font-medium">
                <p>
                  <strong className="text-white block mb-1">Are these letters private?</strong> 
                  Yes. Only the person with the exact unique link can read it.
                </p>
                <p>
                  <strong className="text-white block mb-1">Can I delete it?</strong> 
                  Absolutely. You have the power to "shred" your active letter directly from this device at any time.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}