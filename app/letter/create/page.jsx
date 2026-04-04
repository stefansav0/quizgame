"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// --- THE THEMES ---
const THEMES = [
  { id: "purple", name: "Midnight", emoji: "🌌", glow: "bg-purple-600/20", border: "focus:border-purple-500/50", button: "from-purple-500 to-indigo-500", text: "from-purple-300 via-indigo-200 to-purple-300", label: "text-purple-300" },
  { id: "rose", name: "Valentine", emoji: "🌹", glow: "bg-rose-600/20", border: "focus:border-rose-500/50", button: "from-rose-500 to-pink-500", text: "from-rose-300 via-pink-200 to-rose-300", label: "text-rose-300" },
  { id: "emerald", name: "Envy", emoji: "✨", glow: "bg-emerald-600/20", border: "focus:border-emerald-500/50", button: "from-emerald-500 to-teal-500", text: "from-emerald-300 via-teal-200 to-emerald-300", label: "text-emerald-300" },
  { id: "amber", name: "Warmth", emoji: "🌅", glow: "bg-amber-600/20", border: "focus:border-amber-500/50", button: "from-amber-500 to-orange-500", text: "from-amber-300 via-orange-200 to-amber-300", label: "text-amber-300" },
  { id: "cyan", name: "Ocean", emoji: "🌊", glow: "bg-cyan-600/20", border: "focus:border-cyan-500/50", button: "from-cyan-500 to-blue-500", text: "from-cyan-300 via-blue-200 to-cyan-300", label: "text-cyan-300" },
];

// --- THE LETTER TEMPLATES ---
const TEMPLATES = [
  { id: "romantic", icon: "💖", label: "Loved One" },
  { id: "bestie", icon: "👯‍♀️", label: "Bestie" },
  { id: "crush", icon: "🙈", label: "Secret Crush" },
  { id: "appreciation", icon: "🌟", label: "Appreciation" },
  { id: "missyou", icon: "🌙", label: "Miss You" },
  { id: "apology", icon: "🥺", label: "Apology" },
  { id: "birthday", icon: "🎂", label: "Birthday" },
  { id: "proud", icon: "💪", label: "Proud of You" },
];

const getTemplateText = (type, recipient, sender) => {
  const rName = recipient || "[Name]";
  const sName = sender || "[Your Name]";

  const templates = {
    romantic: `My dearest ${rName},\n\nI wanted to take a moment to put into words just how much you mean to me. In a world that constantly moves so fast, you are my quiet place, my greatest adventure, and my absolute favorite part of every single day.\n\nThank you for choosing me, for loving me so deeply, and for being the most beautiful part of my story. I promise to cherish you today, tomorrow, and for all the days to come.\n\nForever and always yours,\n\n${sName}`,
    bestie: `Hey ${rName},\n\nI was just sitting here thinking about everything, and I realized I don't tell you enough how incredibly grateful I am to have you in my life.\n\nThank you for never judging me, for always having my back, and for being the most fiercely loyal friend anyone could ever ask for. I will always be your biggest cheerleader. I love you endlessly!\n\nYours always,\n\n${sName}`,
    crush: `Dear ${rName},\n\nI’ve been wanting to tell you this for a while now, but I could never quite find the right words or the right moment. The truth is, I really like you.\n\nEvery time you're around, my day gets a little bit brighter. I love your laugh, the way you talk about things you care about, and just the energy you bring into a room. I didn't want to keep it a secret anymore.\n\nHope this makes you smile,\n\n${sName}`,
    appreciation: `Dear ${rName},\n\nI am writing this letter just to say a massive, heartfelt thank you.\n\nYour kindness, your energy, and the way you support the people around you is truly rare. Thank you for being exactly who you are. I am so glad that our paths crossed.\n\nWarmly,\n\n${sName}`,
    missyou: `Hey ${rName},\n\nIt’s been way too long, and I just wanted to reach out and let you know how much I miss you. Life gets so crazy and busy, but you’ve been on my mind lately.\n\nI miss our laughs, our deep talks, and just simply hanging out. Let’s please catch up soon. Sending you a big hug!\n\nMiss you tons,\n\n${sName}`,
    apology: `Dear ${rName},\n\nI'm writing this because I owe you a sincere apology. I know that I messed up, and I feel terrible about how my actions affected you.\n\nYou mean so much to me, and the last thing I ever want to do is hurt you. I hope you can find it in your heart to forgive me and give me a chance to make things right.\n\nTruly sorry,\n\n${sName}`,
    birthday: `Happy Birthday, ${rName}! 🎉\n\nI hope your day is filled with as much joy, laughter, and love as you bring to everyone around you. You deserve the absolute best today and always.\n\nHere’s to another year of making amazing memories together. Let’s celebrate soon!\n\nCheers,\n\n${sName}`,
    proud: `Hey ${rName},\n\nI just wanted to drop a quick note to remind you how incredibly proud I am of you. I see how hard you’ve been working and everything you’ve overcome lately.\n\nKeep pushing forward, keep believing in yourself, and know that I am always cheering you on from the sidelines. You've got this!\n\nWith so much pride,\n\n${sName}`
  };

  return templates[type];
};

export default function CreateLetter() {
  // --- STATE ---
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdLetterId, setCreatedLetterId] = useState(null);
  const [copied, setCopied] = useState(false);
  
  const [activeTemplate, setActiveTemplate] = useState("");
  const [activeTheme, setActiveTheme] = useState(THEMES[0]); // Default to purple

  const [letterData, setLetterData] = useState({
    recipientName: "",
    senderName: "",
    message: "",
  });

  // --- HANDLERS ---
  const handleChange = (e) => {
    setLetterData({ ...letterData, [e.target.name]: e.target.value });
  };

  const applyTemplate = (type) => {
    setActiveTemplate(type);
    const generatedText = getTemplateText(type, letterData.recipientName, letterData.senderName);
    setLetterData({ ...letterData, message: generatedText });
  };

  const handleSealEnvelope = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/letter/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // 🔥 NOTE: Make sure your backend API saves the 'theme' field!
        body: JSON.stringify({ ...letterData, theme: activeTheme.id }), 
      });
      const data = await res.json();
      setCreatedLetterId(data.letterId);
      setStep(1);
    } catch (error) {
      console.error("Failed to seal letter", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = () => {
    const url = `${window.location.origin}/letter/${createdLetterId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- ANIMATIONS ---
  const slideVariants = {
    enter: { y: 50, opacity: 0, scale: 0.95 },
    center: { zIndex: 1, y: 0, opacity: 1, scale: 1 },
    exit: { zIndex: 0, y: -50, opacity: 0, scale: 0.95 },
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <div className="min-h-screen bg-[#0f111a] flex items-center justify-center p-4 font-sans text-white overflow-hidden py-10">
      
      {/* --- DYNAMIC BACKGROUND GLOW --- */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] blur-[150px] rounded-full pointer-events-none transition-colors duration-1000 ${activeTheme.glow}`} />

      {/* Floating Elements */}
      <motion.div variants={floatingVariants} animate="animate" className="absolute top-20 left-[5%] lg:left-[15%] text-4xl opacity-30 select-none">💌</motion.div>
      <motion.div variants={floatingVariants} animate="animate" transition={{ delay: 1 }} className="absolute bottom-32 right-[5%] lg:right-[15%] text-4xl opacity-30 select-none">✨</motion.div>
      <motion.div variants={floatingVariants} animate="animate" transition={{ delay: 2 }} className="absolute top-[40%] right-[10%] text-2xl opacity-20 select-none hidden md:block">🕊️</motion.div>

      <div className="w-full max-w-3xl relative z-10">
        
        {step === 0 && (
          <Link href="/" className="inline-flex items-center text-slate-400 hover:text-white mb-6 font-medium transition-colors">
            ← Back Home
          </Link>
        )}

        <AnimatePresence mode="wait">
          
          {/* STEP 0: WRITE THE LETTER */}
          {step === 0 && (
            <motion.div
              key="step-0"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-[#13151f]/80 backdrop-blur-2xl rounded-[2.5rem] p-6 md:p-10 shadow-2xl border border-white/10 relative overflow-hidden"
            >
              <div className="text-center mb-10 relative z-10">
                <h1 className={`text-3xl md:text-5xl font-black mb-4 bg-gradient-to-r ${activeTheme.text} bg-clip-text text-transparent transition-all duration-700 tracking-tight`}>
                  Write a Secret Letter
                </h1>
                <p className="text-slate-400 font-medium">
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

                {/* --- THE THEME SELECTOR --- */}
                <div className="pt-2 border-t border-white/5">
                  <label className="text-xs font-bold text-slate-400 ml-2 uppercase tracking-widest flex items-center gap-2 mb-3">
                    <span>🎨 Choose a Vibe</span>
                  </label>
                  <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar snap-x">
                    {THEMES.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => setActiveTheme(theme)}
                        className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all border snap-center ${
                          activeTheme.id === theme.id 
                            ? `bg-white/10 border-white/30 text-white scale-[1.05] shadow-lg` 
                            : `bg-black/40 border-white/5 text-slate-500 hover:bg-white/5 hover:text-slate-300`
                        }`}
                      >
                        <span className="text-xl">{theme.emoji}</span>
                        <span className="text-sm">{theme.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* --- THE TEMPLATE SELECTOR --- */}
                <div className="pt-2 border-t border-white/5">
                  <label className="text-xs font-bold text-slate-400 ml-2 uppercase tracking-widest flex items-center gap-2 mb-3">
                    <span>✨ Writer's Block? Pick a Template</span>
                  </label>
                  <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar snap-x">
                    {TEMPLATES.map((template) => (
                      <button 
                        key={template.id}
                        onClick={() => applyTemplate(template.id)}
                        className={`flex-shrink-0 flex flex-col items-center justify-center min-w-[100px] h-[90px] rounded-2xl font-bold transition-all border snap-center ${
                          activeTemplate === template.id 
                            ? `bg-white/10 border-white/30 text-white scale-[1.02] shadow-lg` 
                            : `bg-black/40 border-white/5 text-slate-400 hover:bg-white/5 hover:text-white`
                        }`}
                      >
                        <span className="text-2xl mb-1">{template.icon}</span>
                        <span className="text-xs">{template.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* The Message Area */}
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <label className={`text-xs font-bold ${activeTheme.label} ml-2 uppercase tracking-widest transition-colors duration-500`}>Your Message</label>
                    <span className="text-xs font-medium text-slate-500 mr-2">{letterData.message.split(' ').filter(w => w.length > 0).length} words</span>
                  </div>
                  
                  <div className="relative group">
                    <div className={`absolute -inset-1 bg-gradient-to-r ${activeTheme.button} rounded-3xl blur opacity-10 group-focus-within:opacity-30 transition duration-500`}></div>
                    <textarea
                      name="message"
                      rows={8}
                      placeholder="I just wanted to tell you..."
                      value={letterData.message}
                      onChange={handleChange}
                      className={`relative w-full bg-black/40 border border-white/10 text-white px-6 py-5 rounded-[1.5rem] outline-none ${activeTheme.border} transition-all text-lg leading-relaxed placeholder:text-slate-600 resize-none shadow-inner custom-scrollbar font-medium`}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10 relative z-10">
                <button
                  onClick={handleSealEnvelope}
                  disabled={!letterData.recipientName || !letterData.senderName || !letterData.message || isSubmitting}
                  className={`w-full bg-gradient-to-r ${activeTheme.button} text-white font-black text-xl py-5 px-6 rounded-2xl hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 shadow-xl flex items-center justify-center gap-2`}
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    "Seal Envelope 💌"
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 1: SUCCESS & SHARE LINK */}
          {step === 1 && (
            <motion.div
              key="step-1"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className={`bg-[#13151f]/80 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white/10 text-center relative overflow-hidden`}
            >
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-40 ${activeTheme.glow} blur-[100px] pointer-events-none`} />
              
              <div className="text-7xl mb-6 relative z-10 animate-bounce drop-shadow-xl">💌</div>
              <h2 className="text-4xl font-black mb-3 text-white relative z-10">Envelope Sealed!</h2>
              <p className="text-slate-400 mb-10 relative z-10 font-medium text-lg">
                Your letter is locked and ready for <strong className="text-white">{letterData.recipientName}</strong>.
              </p>

              <div className="bg-black/40 p-6 rounded-3xl border border-white/10 mb-10 relative z-10 text-left shadow-inner">
                <p className={`text-xs font-bold ${activeTheme.label} mb-3 uppercase tracking-widest`}>
                  Share this link with them:
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    readOnly 
                    value={typeof window !== "undefined" ? `${window.location.origin}/letter/${createdLetterId}` : ""} 
                    className={`w-full bg-white/5 border border-white/10 text-white px-5 py-4 rounded-xl outline-none text-sm font-mono text-ellipsis ${activeTheme.border} transition-colors`}
                  />
                  <button 
                    onClick={copyToClipboard}
                    className={`bg-gradient-to-r ${activeTheme.button} text-white px-8 py-4 rounded-xl font-black transition-all whitespace-nowrap shadow-lg active:scale-95 hover:scale-[1.02]`}
                  >
                    {copied ? "Copied! ✔" : "Copy Link"}
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                <Link href="/" className="flex-1 text-center bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-xl transition-colors border border-white/10">
                  Back Home
                </Link>
                <button onClick={() => {
                  setStep(0);
                  setActiveTemplate("");
                  setLetterData({recipientName: "", senderName: "", message: ""});
                }} className="flex-1 bg-white text-black font-black py-4 rounded-xl hover:bg-slate-200 transition-colors shadow-xl">
                  Write Another
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}