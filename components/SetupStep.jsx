import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SetupStep({ 
  userInfo, 
  handleNameChange, 
  handleCountryChange, 
  handleLanguageChange, 
  handleStartQuizSetup, 
  isGenerating, 
  availableLanguages,
  COUNTRY_LANGUAGE_MAP
}) {
  const [messages, setMessages] = useState([]);
  const [inputMode, setInputMode] = useState("none"); 
  const [localName, setLocalName] = useState("");
  
  // Refs to fix the double rendering and scroll jumping
  const hasInitialized = useRef(false);
  const chatContainerRef = useRef(null);

  // Auto-scroll ONLY the chat container, preventing the whole page from jumping
  useEffect(() => {
    if (chatContainerRef.current) {
      // Small timeout to allow DOM updates
      setTimeout(() => {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: "smooth"
        });
      }, 50);
    }
  }, [messages, inputMode]);

  // Initial chat sequence on component mount
  useEffect(() => {
    // Prevent React StrictMode from running this twice
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const sequence = async () => {
      await new Promise(r => setTimeout(r, 600));
      setMessages(prev => [...prev, { type: "bot", text: "Hi, welcome to GetKnowify! 😊" }]);
      
      await new Promise(r => setTimeout(r, 1200));
      setMessages(prev => [...prev, { type: "bot", text: "Let's create a quiz. Let's see which of your friends actually pays attention to you. 😜" }]);
      
      await new Promise(r => setTimeout(r, 1500));
      setMessages(prev => [...prev, { type: "bot", text: "Tell me your Name or nickname." }]);
      setInputMode("name");
    };
    
    sequence();
  }, []);

  const submitName = (e) => {
    e.preventDefault();
    if (!localName.trim()) return;
    
    handleNameChange({ target: { value: localName.trim() } });
    
    setMessages(prev => [...prev, { type: "user", text: localName.trim() }]);
    setInputMode("none");
    
    setTimeout(() => {
      setMessages(prev => [...prev, { type: "bot", text: `Awesome, ${localName.trim()}! Please select your country.` }]);
      setInputMode("country");
    }, 800);
  };

  const selectCountry = (e) => {
    const country = e.target.value;
    handleCountryChange(e);
    
    setMessages(prev => [...prev, { type: "user", text: country }]);
    setInputMode("none");

    setTimeout(() => {
      setMessages(prev => [...prev, { type: "bot", text: "Got it! And your language?" }]);
      setInputMode("language");
    }, 800);
  };

  const selectLanguage = (e) => {
    const language = e.target.value;
    handleLanguageChange(e);
    
    setMessages(prev => [...prev, { type: "user", text: language }]);
    setInputMode("none");

    setTimeout(() => {
      setMessages(prev => [...prev, { type: "bot", text: "Are we ready for the quiz? Let's go! 😊" }]);
      setInputMode("ready");
    }, 800);
  };

  const bubbleVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    // ADJUSTED: Dynamic height and responsive border-radius for mobile optimization
    <div className="flex flex-col w-full h-[80vh] min-h-[550px] md:h-[600px] max-h-[850px] bg-slate-50 rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 relative">
      
      {/* Chat Header */}
      {/* ADJUSTED: Tighter padding and scaled elements on mobile */}
      <div className="bg-white px-4 md:px-6 py-3 md:py-4 border-b border-slate-100 flex items-center gap-3 shadow-sm z-10 shrink-0">
        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-emerald-100 flex items-center justify-center text-lg md:text-xl shadow-inner shrink-0">
          👋
        </div>
        <div>
          <h2 className="text-slate-800 font-black text-base md:text-lg leading-tight">GetKnowify</h2>
          <p className="text-emerald-500 text-[10px] md:text-xs font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Online
          </p>
        </div>
      </div>

      {/* Chat Messages Area */}
      {/* ADJUSTED: Less padding on mobile (p-3 vs p-6) */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-3 md:p-6 space-y-4 custom-scrollbar bg-slate-50/50 pb-8"
      >
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              variants={bubbleVariants}
              initial="hidden"
              animate="visible"
              className={`flex w-full ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`max-w-[90%] md:max-w-[85%] px-4 py-3 md:px-5 md:py-3.5 shadow-sm text-sm md:text-[15px] leading-relaxed ${
                  msg.type === "user" 
                    ? "bg-emerald-500 text-white rounded-2xl rounded-tr-sm font-medium" 
                    : "bg-white text-slate-700 rounded-2xl rounded-tl-sm border border-slate-100"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Typing indicator */}
        {inputMode === "none" && messages.length > 0 && messages[messages.length - 1].type === "user" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="bg-white px-4 py-3 md:py-3.5 rounded-2xl rounded-tl-sm border border-slate-100 flex gap-1">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Interactive Input Area */}
      {/* ADJUSTED: Tighter padding on mobile */}
      <div className="bg-white p-3 md:p-4 border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] z-10 min-h-[80px] md:min-h-[90px] flex flex-col justify-center shrink-0">
        <AnimatePresence mode="wait">
          
          {inputMode === "name" && (
            <motion.form 
              key="name-input"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={submitName}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                autoFocus
                placeholder="Type your name..."
                value={localName}
                onChange={(e) => setLocalName(e.target.value)}
                className="flex-1 bg-slate-100 border-none text-slate-800 px-4 py-3.5 md:px-5 md:py-4 rounded-xl md:rounded-2xl outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all placeholder:text-slate-400 text-sm md:text-base"
              />
              <button 
                type="submit"
                disabled={!localName.trim()}
                className="w-12 h-12 md:w-14 md:h-14 bg-emerald-500 text-white rounded-xl md:rounded-2xl flex items-center justify-center hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shrink-0"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
              </button>
            </motion.form>
          )}

          {inputMode === "country" && (
            <motion.div
              key="country-input"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="relative"
            >
              <select
                value={userInfo.country || ""}
                onChange={selectCountry}
                className="w-full bg-slate-100 text-slate-800 px-4 py-3.5 md:px-5 md:py-4 rounded-xl md:rounded-2xl outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all appearance-none cursor-pointer font-medium text-sm md:text-base"
              >
                <option value="" disabled>Select your country...</option>
                {Object.keys(COUNTRY_LANGUAGE_MAP).sort().map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              <div className="absolute right-4 md:right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </motion.div>
          )}

          {inputMode === "language" && (
            <motion.div
              key="language-input"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="relative"
            >
              <select
                value={userInfo.language || ""}
                onChange={selectLanguage}
                className="w-full bg-slate-100 text-slate-800 px-4 py-3.5 md:px-5 md:py-4 rounded-xl md:rounded-2xl outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all appearance-none cursor-pointer font-medium text-sm md:text-base"
              >
                <option value="" disabled>Select your language...</option>
                {availableLanguages?.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
              <div className="absolute right-4 md:right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </motion.div>
          )}

          {inputMode === "ready" && (
            <motion.div
              key="ready-input"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center"
            >
              <button
                onClick={handleStartQuizSetup}
                disabled={isGenerating}
                className="w-full bg-emerald-500 text-white font-black text-base md:text-lg py-3.5 md:py-4 px-6 rounded-xl md:rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:pointer-events-none shadow-lg shadow-emerald-500/30 flex justify-center items-center gap-2"
              >
                {isGenerating ? (
                  <div className="w-5 h-5 md:w-6 md:h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  "Let's Go! 🔥"
                )}
              </button>
            </motion.div>
          )}
          
        </AnimatePresence>
      </div>
    </div>
  );
}