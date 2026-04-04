"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// --- 🎨 DYNAMIC THEMES (VIBES) ---
const THEMES = {
  purple: { id: "purple", glow: "bg-purple-600/30", bg: "from-purple-950/40 to-[#0f111a]", border: "focus:border-purple-500/50", button: "from-purple-500 to-indigo-500", text: "from-purple-300 via-indigo-200 to-purple-300", label: "text-purple-300" },
  rose: { id: "rose", glow: "bg-rose-600/30", bg: "from-rose-950/40 to-[#0f111a]", border: "focus:border-rose-500/50", button: "from-rose-500 to-pink-500", text: "from-rose-300 via-pink-200 to-rose-300", label: "text-rose-300" },
  emerald: { id: "emerald", glow: "bg-emerald-600/30", bg: "from-emerald-950/40 to-[#0f111a]", border: "focus:border-emerald-500/50", button: "from-emerald-500 to-teal-500", text: "from-emerald-300 via-teal-200 to-emerald-300", label: "text-emerald-300" },
  amber: { id: "amber", glow: "bg-amber-600/30", bg: "from-amber-950/40 to-[#0f111a]", border: "focus:border-amber-500/50", button: "from-amber-500 to-orange-500", text: "from-amber-300 via-orange-200 to-amber-300", label: "text-amber-300" },
  cyan: { id: "cyan", glow: "bg-cyan-600/30", bg: "from-cyan-950/40 to-[#0f111a]", border: "focus:border-cyan-500/50", button: "from-cyan-500 to-blue-500", text: "from-cyan-300 via-blue-200 to-cyan-300", label: "text-cyan-300" },
  fuchsia: { id: "fuchsia", glow: "bg-fuchsia-600/30", bg: "from-fuchsia-950/40 to-[#0f111a]", border: "focus:border-fuchsia-500/50", button: "from-fuchsia-500 to-pink-600", text: "from-fuchsia-300 via-pink-200 to-fuchsia-300", label: "text-fuchsia-300" },
  red: { id: "red", glow: "bg-red-600/30", bg: "from-red-950/40 to-[#0f111a]", border: "focus:border-red-500/50", button: "from-red-500 to-rose-600", text: "from-red-300 via-rose-200 to-red-300", label: "text-red-300" },
};

// --- 💌 20 PREMIUM TEMPLATES ---
const TEMPLATES = [
  { id: "romantic", icon: "💖", label: "Soulmate", theme: "rose" },
  { id: "bestie", icon: "👯‍♀️", label: "Bestie", theme: "purple" },
  { id: "crush", icon: "🙈", label: "Secret Crush", theme: "fuchsia" },
  { id: "appreciation", icon: "🌟", label: "Appreciation", theme: "amber" },
  { id: "missyou", icon: "🌙", label: "Miss You", theme: "cyan" },
  { id: "apology", icon: "🥺", label: "Apology", theme: "emerald" },
  { id: "birthday", icon: "🎂", label: "Birthday", theme: "fuchsia" },
  { id: "proud", icon: "💪", label: "Proud of You", theme: "emerald" },
  { id: "peptalk", icon: "🔥", label: "Pep Talk", theme: "amber" },
  { id: "funny", icon: "🤡", label: "Roast", theme: "cyan" },
  { id: "farewell", icon: "✈️", label: "Farewell", theme: "purple" },
  { id: "anniversary", icon: "🥂", label: "Anniversary", theme: "red" },
  { id: "forgiveness", icon: "🕊️", label: "Forgive Me", theme: "cyan" },
  { id: "admiration", icon: "👑", label: "Admiration", theme: "amber" },
  { id: "nostalgia", icon: "🎞️", label: "Nostalgia", theme: "purple" },
  { id: "cheerup", icon: "🌻", label: "Cheer Up", theme: "amber" },
  { id: "thankyou", icon: "🙏", label: "Thank You", theme: "emerald" },
  { id: "anonymous", icon: "🎭", label: "Anonymous", theme: "purple" },
  { id: "random", icon: "🎈", label: "Just Because", theme: "rose" },
  { id: "late", icon: "⏰", label: "Late Reply", theme: "cyan" },
];

const getTemplateText = (type, recipient, sender) => {
  const rName = recipient || "[Name]";
  const sName = sender || "[Your Name]";

  const texts = {
    romantic: `My dearest ${rName},\n\nI wanted to take a moment to put into words just how much you mean to me. In a world that constantly moves so fast, you are my quiet place, my greatest adventure, and my absolute favorite part of every single day.\n\nThank you for choosing me. I promise to cherish you today, tomorrow, and for all the days to come.\n\nForever and always yours,\n\n${sName}`,
    bestie: `Hey ${rName},\n\nI was just sitting here thinking about everything, and I realized I don't tell you enough how incredibly grateful I am to have you in my life.\n\nThank you for never judging me, for always having my back, and for being the most fiercely loyal friend anyone could ever ask for. I will always be your biggest cheerleader!\n\nYours always,\n\n${sName}`,
    crush: `Dear ${rName},\n\nI’ve been wanting to tell you this for a while now, but I could never quite find the right words. The truth is, I really like you.\n\nEvery time you're around, my day gets a little bit brighter. I love your laugh, and just the energy you bring into a room. I didn't want to keep it a secret anymore.\n\nHope this makes you smile,\n\n${sName}`,
    appreciation: `Dear ${rName},\n\nI am writing this letter just to say a massive, heartfelt thank you.\n\nYour kindness, your energy, and the way you support the people around you is truly rare. Thank you for being exactly who you are. I am so glad that our paths crossed.\n\nWarmly,\n\n${sName}`,
    missyou: `Hey ${rName},\n\nIt’s been way too long, and I just wanted to reach out and let you know how much I miss you. Life gets so crazy, but you’ve been on my mind lately.\n\nI miss our laughs, our deep talks, and just simply hanging out. Let’s please catch up soon. Sending you a big hug!\n\nMiss you tons,\n\n${sName}`,
    apology: `Dear ${rName},\n\nI'm writing this because I owe you a sincere apology. I know that I messed up, and I feel terrible about how my actions affected you.\n\nYou mean so much to me, and the last thing I ever want to do is hurt you. I hope you can find it in your heart to forgive me.\n\nTruly sorry,\n\n${sName}`,
    birthday: `Happy Birthday, ${rName}! 🎉\n\nI hope your special day is filled with as much joy, laughter, and love as you bring to everyone around you. You deserve the absolute best today and always.\n\nHere’s to another year of making amazing memories together. Let’s celebrate soon!\n\nCheers,\n\n${sName}`,
    proud: `Hey ${rName},\n\nI just wanted to drop a quick note to remind you how incredibly proud I am of you. I see how hard you’ve been working and everything you’ve overcome lately.\n\nKeep pushing forward, keep believing in yourself, and know that I am always cheering you on from the sidelines. You've got this!\n\nWith so much pride,\n\n${sName}`,
    peptalk: `Hey ${rName},\n\nI know things feel really heavy right now, but I need you to remember how incredibly strong you are. You have survived 100% of your bad days.\n\nTake a deep breath. Take it one step at a time. I believe in you so much, and I am right here in your corner whenever you need me.\n\nYou've got this,\n\n${sName}`,
    funny: `Listen up ${rName},\n\nI just wanted to take a moment to tell you how incredibly lucky you are to have a friend as amazing, hilarious, and good-looking as me. \n\nHonestly, I don't know how you survived before we met. Anyway, just a daily reminder of your privilege. You're welcome.\n\nStay humble,\n\n${sName}`,
    farewell: `Dear ${rName},\n\nI can't believe it's actually time to say goodbye (for now). Things just won't be the same without you around here.\n\nThank you for all the incredible memories. I am so excited for this next chapter of your life, and I know you are going to do amazing things. Please stay in touch!\n\nSafe travels,\n\n${sName}`,
    anniversary: `Happy Anniversary, ${rName} 🥂\n\nLooking back at everything we have shared, I am just filled with so much love and gratitude. Every single day with you is a gift.\n\nThank you for putting up with me, for loving me, and for being my favorite person in the whole world. Here is to a million more memories together.\n\nAll my love,\n\n${sName}`,
    forgiveness: `Dear ${rName},\n\nI’ve been doing a lot of thinking, and I don't want whatever happened between us to ruin what we have. \n\nLife is too short to hold onto anger or misunderstandings. I value our relationship more than being right, and I would love it if we could put this behind us and move forward.\n\nBest,\n\n${sName}`,
    admiration: `Dear ${rName},\n\nI don't say this often enough, but I truly look up to you. The way you handle yourself, your dedication, and your kindness is something I deeply admire.\n\nYou inspire me to be a better version of myself just by being you. Thank you for being such a wonderful role model.\n\nWith admiration,\n\n${sName}`,
    nostalgia: `Hey ${rName},\n\nI was looking through some old photos today and it brought back a flood of amazing memories. Remember all the crazy stuff we used to do?\n\nIt made me smile so much. I just wanted to text and say I miss those days, but I'm also so glad we still have each other now.\n\nLove always,\n\n${sName}`,
    cheerup: `Hey ${rName} 🌻,\n\nI heard you were having a rough day, so I’m sending this little digital hug your way. \n\nWhatever is stressing you out right now is only temporary. You are amazing, capable, and so loved. If you want to talk about it, or if you just want me to send you funny memes, I'm here.\n\nSmile soon,\n\n${sName}`,
    thankyou: `Dear ${rName},\n\nI am writing this to say a massive THANK YOU. \n\nI am so incredibly grateful for your help and support recently. I really couldn't have done it without you. Your generosity means the world to me, and I won't forget it.\n\nWith deepest gratitude,\n\n${sName}`,
    anonymous: `Hey there,\n\nYou don't know who this is from, but I just wanted to leave a little note to say that you are doing great. Keep smiling, keep being yourself, because someone out there thinks you're pretty amazing.\n\nHave a beautiful day!\n\n- A Secret Admirer 🎭`,
    random: `Hey ${rName},\n\nThere is no special occasion and no real reason for this letter. I just saw this and thought of you!\n\nHope you're having an amazing week, drinking enough water, and taking care of yourself. Just wanted to pop in and say hi!\n\nTalk soon,\n\n${sName}`,
    late: `Hey ${rName},\n\nOkay, I admit it... I am the worst at replying to messages. I am so sorry for falling off the radar recently!\n\nPlease know I wasn't ignoring you, life just got incredibly chaotic. I miss you and I promise to be better. Let's catch up soon, my treat!\n\nSorry again,\n\n${sName}`
  };

  return texts[type] || texts["random"];
};

export default function CreateLetter() {
  // --- STATE ---
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCheckingDevice, setIsCheckingDevice] = useState(true);
  const [createdLetterId, setCreatedLetterId] = useState(null);
  const [recipientNameDisplay, setRecipientNameDisplay] = useState("");
  const [copied, setCopied] = useState(false);
  
  const [activeTemplate, setActiveTemplate] = useState("");
  const [activeTheme, setActiveTheme] = useState(THEMES["purple"]); // Default starting theme

  const [letterData, setLetterData] = useState({
    recipientName: "",
    senderName: "",
    message: "",
  });

  // --- 🔒 DEVICE CHECK ON MOUNT ---
  useEffect(() => {
    const activeLetterId = localStorage.getItem("active_letter_id");
    const activeLetterRecipient = localStorage.getItem("active_letter_recipient");

    if (activeLetterId) {
      setCreatedLetterId(activeLetterId);
      setRecipientNameDisplay(activeLetterRecipient || "your recipient");
      setStep(1); // Jump straight to the "Manage Letter" screen
    }
    setIsCheckingDevice(false);
  }, []);

  // --- HANDLERS ---
  const handleChange = (e) => {
    setLetterData({ ...letterData, [e.target.name]: e.target.value });
  };

  const applyTemplate = (templateId, themeKey) => {
    setActiveTemplate(templateId);
    setActiveTheme(THEMES[themeKey]); // Auto-switch theme based on vibe
    const generatedText = getTemplateText(templateId, letterData.recipientName, letterData.senderName);
    setLetterData({ ...letterData, message: generatedText });
  };

  const handleSealEnvelope = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/letter/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...letterData, theme: activeTheme.id }), 
      });
      const data = await res.json();
      
      // 🔒 LOCK THE DEVICE to this letter
      localStorage.setItem("active_letter_id", data.letterId);
      localStorage.setItem("active_letter_recipient", letterData.recipientName);
      
      setCreatedLetterId(data.letterId);
      setRecipientNameDisplay(letterData.recipientName);
      setStep(1);
    } catch (error) {
      console.error("Failed to seal letter", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🚨 CRITICAL BUGFIX: Strict Delete Handler
  const handleDeleteLetter = async () => {
    if (!confirm("Are you sure? This will delete the letter permanently and the link will stop working.")) return;
    
    setIsDeleting(true);
    try {
      // 1. Tell the backend to delete the letter
      const res = await fetch(`/api/letter/${createdLetterId}`, {
        method: "DELETE",
      });

      // 2. CHECK IF IT ACTUALLY WORKED ON THE SERVER
      if (!res.ok) {
        throw new Error("Failed to delete from database");
      }

      // 3. ONLY free up the device if the server confirmed the deletion
      localStorage.removeItem("active_letter_id");
      localStorage.removeItem("active_letter_recipient");
      
      // 4. Reset form and go back to step 0
      setCreatedLetterId(null);
      setLetterData({ recipientName: "", senderName: "", message: "" });
      setActiveTemplate("");
      setActiveTheme(THEMES["purple"]);
      setStep(0);
    } catch (error) {
      console.error("Server delete failed:", error);
      alert("⚠️ Failed to delete the letter from the server. Please try again. (Make sure your API route is deployed to Vercel!)");
    } finally {
      setIsDeleting(false);
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
      y: [0, -15, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
  };

  // Prevent UI flash while checking localStorage
  if (isCheckingDevice) {
    return (
      <div className="min-h-screen bg-[#0f111a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${activeTheme.bg} flex items-center justify-center p-4 font-sans text-white overflow-hidden py-10 transition-colors duration-1000`}>
      
      {/* --- DYNAMIC BACKGROUND GLOW --- */}
      <div className={`absolute top-[10%] left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] blur-[160px] rounded-full pointer-events-none transition-colors duration-1000 ${activeTheme.glow}`} />

      {/* Floating Elements */}
      <motion.div variants={floatingVariants} animate="animate" className="absolute top-20 left-[5%] lg:left-[15%] text-4xl opacity-40 select-none drop-shadow-xl">💌</motion.div>
      <motion.div variants={floatingVariants} animate="animate" transition={{ delay: 1 }} className="absolute bottom-32 right-[5%] lg:right-[15%] text-4xl opacity-40 select-none drop-shadow-xl">✨</motion.div>
      <motion.div variants={floatingVariants} animate="animate" transition={{ delay: 2 }} className="absolute top-[40%] right-[10%] text-3xl opacity-30 select-none hidden md:block drop-shadow-xl">🕊️</motion.div>
      <motion.div variants={floatingVariants} animate="animate" transition={{ delay: 1.5 }} className="absolute bottom-[20%] left-[10%] text-3xl opacity-30 select-none hidden md:block drop-shadow-xl">💭</motion.div>

      <div className="w-full max-w-3xl relative z-10">
        
        {step === 0 && (
          <Link href="/" className="inline-flex items-center text-slate-300 hover:text-white mb-6 font-bold transition-colors bg-black/20 px-4 py-2 rounded-full border border-white/5 backdrop-blur-md">
            ← Back Home
          </Link>
        )}

        <AnimatePresence mode="wait">
          
          {/* ==================================== */}
          {/* STEP 0: WRITE THE LETTER */}
          {/* ==================================== */}
          {step === 0 && (
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

                {/* --- 20 TEMPLATES SELECTOR --- */}
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

                {/* The Message Area */}
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
          )}

          {/* ==================================== */}
          {/* STEP 1: MANAGE ACTIVE LETTER / SUCCESS */}
          {/* ==================================== */}
          {step === 1 && (
            <motion.div
              key="step-1"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className={`bg-[#13151f]/80 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white/10 text-center relative overflow-hidden`}
            >
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-60 ${activeTheme.glow} blur-[120px] pointer-events-none`} />
              
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ type: "spring", bounce: 0.5 }}
                className="text-7xl mb-6 relative z-10 drop-shadow-2xl"
              >
                💌
              </motion.div>
              
              <h2 className={`text-4xl font-black mb-3 bg-gradient-to-r ${activeTheme.text} bg-clip-text text-transparent relative z-10`}>
                Your Active Letter
              </h2>
              <p className="text-slate-300 mb-8 relative z-10 font-medium text-lg">
                Your envelope is sealed and ready for <strong className="text-white border-b-2 border-white/20 pb-1">{recipientNameDisplay}</strong>.
              </p>

              {/* Warning Banner */}
              <div className="bg-amber-500/10 border border-amber-500/20 text-amber-200/80 text-sm font-medium p-4 rounded-2xl mb-8 relative z-10">
                ⚠️ You can only have <strong>one active letter</strong> at a time on this device. Delete this one if you want to write a new one.
              </div>

              <div className="bg-black/60 backdrop-blur-md p-6 rounded-3xl border border-white/10 mb-10 relative z-10 text-left shadow-inner">
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
                    className={`bg-gradient-to-r ${activeTheme.button} border border-white/20 text-white px-8 py-4 rounded-xl font-black transition-all whitespace-nowrap shadow-lg active:scale-95 hover:scale-[1.02]`}
                  >
                    {copied ? "Copied! ✔" : "Copy Link"}
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                <Link href="/" className="flex-1 text-center bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl transition-colors border border-white/10 shadow-inner">
                  Back Home
                </Link>
                <button 
                  onClick={handleDeleteLetter} 
                  disabled={isDeleting}
                  className="flex-1 bg-red-500/10 text-red-400 border border-red-500/20 font-black py-4 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-xl disabled:opacity-50 flex justify-center items-center gap-2"
                >
                  {isDeleting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    "🗑️ Delete Letter"
                  )}
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}