"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COUNTRY_LANGUAGE_MAP } from "@/lib/constants";

// Reusable component for the Bot's chat bubbles
const BotBubble = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.95, originX: 0 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.4, ease: "easeOut" }}
    className="flex items-start gap-3 w-full"
  >
    <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-xl shadow-sm flex-shrink-0">
      🤖
    </div>
    <div className="bg-white border border-slate-200 shadow-sm text-slate-800 rounded-2xl rounded-tl-sm p-4 text-sm md:text-base max-w-[85%] leading-relaxed">
      {children}
    </div>
  </motion.div>
);

// Reusable component for the User's chat bubbles
const UserBubble = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.95, originX: 1 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="flex items-end justify-end w-full mt-2"
  >
    <div className="bg-emerald-500 text-white rounded-2xl rounded-tr-sm p-4 text-sm md:text-base max-w-[85%] shadow-md break-words font-medium">
      {children}
    </div>
  </motion.div>
);

const slideVariants = {
  enter: { x: 50, opacity: 0, scale: 0.95 },
  center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
  exit: { zIndex: 0, x: -50, opacity: 0, scale: 0.95 },
};

export default function SetupForm({ userInfo, setUserInfo, isGenerating, handleStartSetup }) {
  // Chat flow state: 0 = Name, 1 = Country, 2 = Language, 3 = Ready to generate
  const [step, setStep] = useState(0);
  
  // Temporary state for inputs before the user hits "Send"
  const [tempName, setTempName] = useState("");
  const [tempCountry, setTempCountry] = useState("");
  const [tempLang, setTempLang] = useState("");

  // Ref attached to the chat window to scroll internally, preventing the whole page from jumping
  const chatContainerRef = useRef(null);

  // Auto-scroll inside the container when the step changes
  useEffect(() => {
    // We use a slight timeout to allow Framer Motion to render the new bubble first
    const timer = setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [step]);

  // Handlers for the chat steps
  const submitName = (e) => {
    e.preventDefault();
    if (tempName.trim()) {
      setUserInfo({ ...userInfo, name: tempName.trim() });
      setStep(1);
    }
  };

  const submitCountry = (e) => {
    e.preventDefault();
    if (tempCountry) {
      setUserInfo({ ...userInfo, country: tempCountry });
      setStep(2);
    }
  };

  const submitLanguage = (e) => {
    e.preventDefault();
    if (tempLang) {
      setUserInfo({ ...userInfo, language: tempLang });
      setStep(3);
    }
  };

  return (
    <motion.div
      key="step-0"
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-slate-50 md:bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col h-[75vh] min-h-[500px] max-h-[700px] relative w-full"
    >
      {/* Chat Header */}
      <div className="bg-white px-6 py-4 border-b border-slate-100 flex items-center gap-4 shadow-sm z-10 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-full bg-emerald-50/50 blur-[50px] pointer-events-none" />
        <div className="relative w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-2xl shadow-inner border border-emerald-200">
          🤖
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
        </div>
        <div className="relative">
          <h2 className="font-black text-slate-800 text-lg md:text-xl">GetKnowify Bot</h2>
          <p className="text-xs text-emerald-600 font-bold uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online
          </p>
        </div>
      </div>

      {/* Chat History Area - Added ref here for internal scrolling */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5 custom-scrollbar bg-slate-50/50"
      >
        {/* Step 0: Greet & Ask Name */}
        <BotBubble>
          Hi! Welcome to <strong>GetKnowify</strong> 👋 <br/><br/>
          To start the <em>Never Have I Ever</em> challenge, I just need to know your name!
        </BotBubble>

        {/* Step 1: Show Name & Ask Country */}
        <AnimatePresence>
          {step > 0 && (
            <>
              <UserBubble>{userInfo.name}</UserBubble>
              <BotBubble delay={0.2}>
                Nice to meet you, <strong>{userInfo.name}</strong>! Which country are you from? 🌍
              </BotBubble>
            </>
          )}
        </AnimatePresence>

        {/* Step 2: Show Country & Ask Language */}
        <AnimatePresence>
          {step > 1 && (
            <>
              <UserBubble>{userInfo.country}</UserBubble>
              <BotBubble delay={0.2}>
                Awesome! What language do you prefer? 🗣️
              </BotBubble>
            </>
          )}
        </AnimatePresence>

        {/* Step 3: Show Language & Ready */}
        <AnimatePresence>
          {step > 2 && (
            <>
              <UserBubble>{userInfo.language}</UserBubble>
              <BotBubble delay={0.2}>
                Perfect! Here we go, let's create your challenge! 🔥
              </BotBubble>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Input Area */}
      <div className="bg-white p-4 md:p-6 border-t border-slate-100 z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
        
        {step === 0 && (
          <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={submitName} className="flex gap-2">
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Type your name..."
              className="flex-1 bg-slate-50 border border-slate-200 text-slate-900 rounded-full px-6 py-4 outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-inner text-base"
              autoFocus
            />
            <button
              type="submit"
              disabled={!tempName.trim()}
              className="w-14 h-14 shrink-0 bg-emerald-500 text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-600 transition-colors shadow-md active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 -mt-0.5">
                <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
              </svg>
            </button>
          </motion.form>
        )}

        {step === 1 && (
          <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={submitCountry} className="flex gap-2">
            <select
              value={tempCountry}
              onChange={(e) => setTempCountry(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 text-slate-900 rounded-full px-6 py-4 outline-none focus:border-emerald-500 focus:bg-white transition-all appearance-none cursor-pointer shadow-inner text-base"
            >
              <option value="" disabled>Select your country...</option>
              {Object.keys(COUNTRY_LANGUAGE_MAP).sort().map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            <button
              type="submit"
              disabled={!tempCountry}
              className="w-14 h-14 shrink-0 bg-emerald-500 text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-600 transition-colors shadow-md active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 -mt-0.5">
                <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
              </svg>
            </button>
          </motion.form>
        )}

        {step === 2 && (
          <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={submitLanguage} className="flex gap-2">
            <select
              value={tempLang}
              onChange={(e) => setTempLang(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 text-slate-900 rounded-full px-6 py-4 outline-none focus:border-emerald-500 focus:bg-white transition-all appearance-none cursor-pointer shadow-inner text-base"
            >
              <option value="" disabled>Select language...</option>
              {COUNTRY_LANGUAGE_MAP[userInfo.country]?.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
            <button
              type="submit"
              disabled={!tempLang}
              className="w-14 h-14 shrink-0 bg-emerald-500 text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-600 transition-colors shadow-md active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 -mt-0.5">
                <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
              </svg>
            </button>
          </motion.form>
        )}

        {step === 3 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }}
            onClick={handleStartSetup}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-xl py-4 px-6 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none shadow-[0_10px_30px_rgba(16,185,129,0.3)] flex justify-center items-center gap-2 h-16"
          >
            {isGenerating ? (
              <div className="w-7 h-7 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Let's Create! 🚀"
            )}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}