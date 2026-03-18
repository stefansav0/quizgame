"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// --- THE LETTER TEMPLATES ---
const getTemplate = (type, recipient, sender) => {
  const rName = recipient || "[Name]";
  const sName = sender || "[Your Name]";

  const templates = {
    romantic: `My dearest ${rName},\n\nI wanted to take a moment to put into words just how much you mean to me. In a world that constantly moves so fast, you are my quiet place, my greatest adventure, and my absolute favorite part of every single day. \n\nBefore I met you, I didn't truly understand what it meant to have someone who completely sees me, understands my flaws, and loves me anyway. You have this incredible ability to light up any room you walk into, but more importantly, you light up my life in ways I never thought possible. Every laugh we share, every quiet moment we spend together, and every dream we talk about for the future feels like a piece of a puzzle falling perfectly into place.\n\nI love your smile, I love your kindness, and I love the way you constantly inspire me to be a better person. You are the first thing I think about when I wake up and my last thought before I fall asleep. No matter where life takes us, or what challenges we face, I want you to know that my heart is entirely yours. \n\nThank you for choosing me, for loving me so deeply, and for being the most beautiful part of my story. I promise to cherish you today, tomorrow, and for all the days to come.\n\nForever and always yours,\n\n${sName}`,
    
    bestie: `Hey ${rName},\n\nI was just sitting here thinking about everything, and I realized I don't tell you enough how incredibly grateful I am to have you in my life. Seriously, what would I even do without you?\n\nFrom our late-night talks that turn into early mornings, to the moments we literally cannot stop laughing over the dumbest things, you have given me some of the best memories of my entire life. You are the person I want to text first when something amazing happens, and the exact person I need to talk to when everything goes wrong. You just get it. You get me.\n\nThank you for never judging me, for always having my back, and for being the most fiercely loyal friend anyone could ever ask for. People search their whole lives for a soulmate, and I am so unbelievably lucky that I found mine in my best friend. We have so many more crazy memories to make, so many more inside jokes to create, and so much more life to live together.\n\nNever forget how amazing, beautiful, and capable you are. I will always be your biggest cheerleader. I love you endlessly!\n\nYours always,\n\n${sName}`,
    
    appreciation: `Dear ${rName},\n\nI am writing this letter just to say a massive, heartfelt thank you. We don't always take the time to appreciate the people who make our lives better, but today, I wanted to make sure you know your impact.\n\nYour kindness, your energy, and the way you support the people around you is truly rare. Whenever I am around you, I feel uplifted. You have this unique gift of making people feel seen, heard, and valued, and I want you to know that I see it, and I appreciate it more than words can say.\n\nThank you for being exactly who you are. Don't ever let the world change your wonderful spirit. I am so glad that our paths crossed, and I am sending so much love and positivity your way.\n\nWarmly,\n\n${sName}`
  };

  return templates[type];
};

export default function CreateLetter() {
  // --- STATE ---
  const [step, setStep] = useState(0); // 0 = Write, 1 = Success
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdLetterId, setCreatedLetterId] = useState(null);
  const [copied, setCopied] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState("");

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
    const generatedText = getTemplate(type, letterData.recipientName, letterData.senderName);
    setLetterData({ ...letterData, message: generatedText });
  };

  const handleSealEnvelope = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/letter/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(letterData),
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
    <div className="min-h-screen bg-[#0f111a] flex items-center justify-center p-4 font-sans text-white overflow-hidden py-10 selection:bg-purple-500/30">
      
      {/* --- BACKGROUND GLOW --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Floating Elements */}
      <motion.div variants={floatingVariants} animate="animate" className="absolute top-20 left-[10%] lg:left-[20%] text-3xl opacity-40 select-none">💌</motion.div>
      <motion.div variants={floatingVariants} animate="animate" transition={{ delay: 1 }} className="absolute bottom-32 right-[10%] lg:right-[20%] text-3xl opacity-40 select-none">✨</motion.div>

      <div className="w-full max-w-2xl relative z-10">
        
        {/* Navigation Back */}
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
              className="bg-[#1a1c29]/80 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-10 shadow-2xl border border-white/10 relative overflow-hidden"
            >
              <div className="text-center mb-8 relative z-10">
                <h1 className="text-3xl md:text-4xl font-black mb-3 bg-gradient-to-r from-purple-300 via-pink-200 to-rose-300 bg-clip-text text-transparent">
                  Write a Secret Letter
                </h1>
                <p className="text-slate-400 font-medium">
                  Pour your heart out. We'll seal it in a digital envelope.
                </p>
              </div>

              <div className="space-y-6 relative z-10">
                {/* To / From Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-purple-300 ml-2 uppercase tracking-wide">To (Recipient)</label>
                    <input
                      type="text"
                      name="recipientName"
                      placeholder="E.g. Sarah 💖"
                      value={letterData.recipientName}
                      onChange={handleChange}
                      className="w-full bg-black/40 border border-white/10 text-white px-5 py-4 rounded-2xl outline-none focus:border-purple-500/50 focus:bg-black/60 transition-all font-medium placeholder:text-slate-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-purple-300 ml-2 uppercase tracking-wide">From (You)</label>
                    <input
                      type="text"
                      name="senderName"
                      placeholder="E.g. Alex ✨"
                      value={letterData.senderName}
                      onChange={handleChange}
                      className="w-full bg-black/40 border border-white/10 text-white px-5 py-4 rounded-2xl outline-none focus:border-purple-500/50 focus:bg-black/60 transition-all font-medium placeholder:text-slate-600"
                    />
                  </div>
                </div>

                {/* --- THE TEMPLATE SELECTOR --- */}
                <div className="pt-4 border-t border-white/5">
                  <label className="text-sm font-bold text-slate-400 ml-2 uppercase tracking-wide flex items-center gap-2 mb-3">
                    <span>✨ Need Inspiration? Choose a template</span>
                  </label>
                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={() => applyTemplate("romantic")}
                      className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl font-bold transition-all border ${
                        activeTemplate === "romantic" 
                          ? "bg-rose-500/20 border-rose-500 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.3)] scale-[1.02]" 
                          : "bg-black/40 border-white/10 text-slate-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      💖 Loved One
                    </button>
                    <button 
                      onClick={() => applyTemplate("bestie")}
                      className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl font-bold transition-all border ${
                        activeTemplate === "bestie" 
                          ? "bg-purple-500/20 border-purple-500 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)] scale-[1.02]" 
                          : "bg-black/40 border-white/10 text-slate-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      👯‍♀️ Bestie
                    </button>
                    <button 
                      onClick={() => applyTemplate("appreciation")}
                      className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl font-bold transition-all border ${
                        activeTemplate === "appreciation" 
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)] scale-[1.02]" 
                          : "bg-black/40 border-white/10 text-slate-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      🌟 Appreciation
                    </button>
                  </div>
                </div>

                {/* The Message Area */}
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-bold text-purple-300 ml-2 uppercase tracking-wide">Your Message</label>
                    <span className="text-xs font-medium text-slate-500 mr-2">{letterData.message.split(' ').filter(w => w.length > 0).length} words</span>
                  </div>
                  
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
                    <textarea
                      name="message"
                      rows={10}
                      placeholder="I just wanted to tell you..."
                      value={letterData.message}
                      onChange={handleChange}
                      className="relative w-full bg-[#13151f] border border-white/10 text-white px-6 py-5 rounded-[1.5rem] outline-none focus:border-purple-500/50 transition-all text-lg leading-relaxed placeholder:text-slate-600 resize-none shadow-inner custom-scrollbar"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10 relative z-10">
                <button
                  onClick={handleSealEnvelope}
                  disabled={!letterData.recipientName || !letterData.senderName || !letterData.message || isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black text-lg py-4 px-6 rounded-2xl hover:opacity-90 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100 shadow-[0_0_30px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Waxing the seal..." : "Seal Envelope 💌"}
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
              className="bg-[#1a1c29]/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-purple-500/30 text-center relative overflow-hidden"
            >
              <div className="text-6xl mb-6 relative z-10 animate-bounce">💌</div>
              <h2 className="text-3xl font-black mb-2 text-white relative z-10">Envelope Sealed!</h2>
              <p className="text-slate-400 mb-8 relative z-10">
                Your letter is locked and ready for <strong>{letterData.recipientName}</strong>.
              </p>

              <div className="bg-black/40 p-5 rounded-2xl border border-white/10 mb-8 relative z-10 text-left">
                <p className="text-sm font-bold text-purple-400 mb-3 uppercase tracking-wide">
                  Share this link with them:
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    readOnly 
                    value={typeof window !== "undefined" ? `${window.location.origin}/letter/${createdLetterId}` : ""} 
                    className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl outline-none text-sm font-mono text-ellipsis"
                  />
                  <button 
                    onClick={copyToClipboard}
                    className="bg-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-400 transition-colors whitespace-nowrap shadow-lg active:scale-95"
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
                }} className="flex-1 bg-white text-black font-bold py-4 rounded-xl hover:bg-slate-200 transition-colors shadow-lg">
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