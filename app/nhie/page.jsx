"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { translateText } from "@/lib/translate";

// Preset background colors for the amazing UI
const BG_COLORS = [
  "bg-slate-900",
  "bg-indigo-950",
  "bg-purple-950",
  "bg-fuchsia-950",
  "bg-rose-950",
  "bg-orange-950",
  "bg-emerald-950",
  "bg-cyan-950",
];

const COUNTRY_LANGUAGE_MAP = {
  "India": ["English", "Hindi", "Bengali", "Tamil", "Telugu", "Marathi"],
  "United States": ["English", "Spanish"],
  "United Kingdom": ["English"],
  "Canada": ["English", "French"],
  "Australia": ["English"],
  "Spain": ["Spanish", "Catalan"],
  "Mexico": ["Spanish"],
  "France": ["French"],
  "Brazil": ["Portuguese"],
  "Portugal": ["Portuguese"],
  "Germany": ["German"],
  "Japan": ["Japanese"],
};

// --- MASSIVE "NEVER HAVE I EVER" QUESTION BANK ---
const generateNHIEBank = () => {
  return [
    // --- HABITS & DAILY LIFE ---
    "Never have I ever faked being sick to get out of school or work.",
    "Never have I ever fallen asleep in a public place.",
    "Never have I ever eaten food that fell on the floor (5-second rule).",
    "Never have I ever worn the same underwear two days in a row.",
    "Never have I ever dropped my phone in the toilet.",
    "Never have I ever snooped through someone else's phone.",
    "Never have I ever practiced an argument in the mirror.",
    "Never have I ever forgotten a close friend's birthday.",
    "Never have I ever cut my own hair and deeply regretted it.",
    "Never have I ever laughed so hard I peed a little.",
    "Never have I ever worn pajamas to a grocery store.",
    "Never have I ever tripped and acted like I meant to do it.",
    "Never have I ever googled my own name.",
    "Never have I ever stayed up all night binge-watching a show.",
    "Never have I ever lied about my age.",

    // --- FOOD & DRINK ---
    "Never have I ever eaten a whole pizza by myself.",
    "Never have I ever drank straight from the milk carton.",
    "Never have I ever stolen food from a roommate or family member.",
    "Never have I ever eaten something past its expiration date.",
    "Never have I ever lied about being a vegetarian/vegan.",
    "Never have I ever secretly thrown away food someone cooked for me.",
    "Never have I ever burned a meal so badly it set off the smoke alarm.",
    "Never have I ever eaten a spoonful of straight icing.",
    "Never have I ever pretended to like a drink just to look cool.",
    "Never have I ever sneaked snacks into a movie theater.",

    // --- SOCIAL & TEXTING ---
    "Never have I ever sent a screenshot of a text to the person who sent it.",
    "Never have I ever ghosted someone.",
    "Never have I ever accidentally liked an old photo while stalking someone.",
    "Never have I ever given a fake phone number.",
    "Never have I ever left someone on read on purpose.",
    "Never have I ever created a fake social media account.",
    "Never have I ever blamed a fart on a pet.",
    "Never have I ever made an excuse to get off a phone call.",
    "Never have I ever lied about having plans to avoid hanging out.",
    "Never have I ever unfollowed someone because they posted too much.",

    // --- DATING & ROMANCE ---
    "Never have I ever gone on a blind date.",
    "Never have I ever kissed someone on the first date.",
    "Never have I ever used a cheesy pickup line unironically.",
    "Never have I ever cried over an ex.",
    "Never have I ever dated a friend's ex.",
    "Never have I ever forgotten the name of someone I was hooking up with.",
    "Never have I ever flirted to get out of trouble.",
    "Never have I ever practiced kissing on my hand or a pillow.",
    "Never have I ever stayed in a relationship longer than I should have.",
    "Never have I ever swiped right on everyone just to see who liked me.",

    // --- TRAVEL & OUTDOORS ---
    "Never have I ever gotten completely lost in a foreign country.",
    "Never have I ever missed a flight.",
    "Never have I ever packed my bags the morning of a trip.",
    "Never have I ever stolen hotel toiletries.",
    "Never have I ever gone skinny dipping.",
    "Never have I ever lied to customs or border control.",
    "Never have I ever sneaked into a pool after hours.",
    "Never have I ever gone camping and hated every second of it.",
    "Never have I ever rode a motorcycle.",
    "Never have I ever thrown up on a rollercoaster.",

    // --- WORK & SCHOOL ---
    "Never have I ever cheated on a test.",
    "Never have I ever fallen asleep during a meeting or class.",
    "Never have I ever stolen office supplies.",
    "Never have I ever lied on my resume.",
    "Never have I ever had a crush on a teacher or boss.",
    "Never have I ever claimed credit for someone else's work.",
    "Never have I ever muted myself on a Zoom call to scream.",
    "Never have I ever shown up to work hungover.",
    "Never have I ever hidden in the bathroom to avoid working.",
    "Never have I ever quit a job without notice.",

    // --- MISC & ABSURD ---
    "Never have I ever tried to guess someone's password and gotten in.",
    "Never have I ever cried during a Pixar movie.",
    "Never have I ever talked to myself out loud in public.",
    "Never have I ever broken a bone.",
    "Never have I ever been pulled over by the police.",
    "Never have I ever believed a ridiculous conspiracy theory.",
    "Never have I ever accidentally worn my clothes inside out.",
    "Never have I ever re-gifted a present.",
    "Never have I ever peed in a pool.",
    "Never have I ever tried to move an object with my mind."
  ];
};

export default function CreateNHIEChallenge() {
  // --- STATE ---
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [step, setStep] = useState(0); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdChallengeId, setCreatedChallengeId] = useState(null);
  const [copiedLink, setCopiedLink] = useState("");

  const [userInfo, setUserInfo] = useState({ country: "", language: "", name: "" });
  
  const availableLanguages = userInfo.country ? COUNTRY_LANGUAGE_MAP[userInfo.country] : [];

  // Challenge Data States
  const [questions, setQuestions] = useState([]);
  const [questionBank, setQuestionBank] = useState([]);
  const [showBankModal, setShowBankModal] = useState(false);

  // --- LOCAL STORAGE CHECK ON MOUNT ---
  useEffect(() => {
    const existingId = localStorage.getItem('nhie_challenge_id');
    
    if (existingId) {
      setCreatedChallengeId(existingId);
      setStep(11); 
    }
    
    setIsLoading(false);
  }, []);

  // --- HANDLERS ---
  const handleCountryChange = (e) => {
    setUserInfo({ ...userInfo, country: e.target.value, language: "" });
  };

  const handleLanguageChange = (e) => {
    setUserInfo({ ...userInfo, language: e.target.value });
  };

  const handleNameChange = (e) => {
    setUserInfo({ ...userInfo, name: e.target.value });
  };

  const handleStartSetup = async () => {
    try {
      setIsGenerating(true);
      const baseBank = generateNHIEBank();

      // 🔥 Translate all statements
      const translatedBank = await Promise.all(
        baseBank.map(async (q) => {
          const translatedQuestion = await translateText(q, userInfo.language);
          return translatedQuestion;
        })
      );

      // Shuffle + pick 10
      const shuffledBank = [...translatedBank].sort(() => 0.5 - Math.random());

      const selected10 = shuffledBank.slice(0, 10).map((q, index) => ({
        id: index + 1,
        question: q,
        answer: null, // "have" or "never"
        bgColor: BG_COLORS[index % BG_COLORS.length],
      }));

      setQuestionBank(translatedBank);
      setQuestions(selected10);
      setStep(1);

    } catch (error) {
      console.error("Error generating challenge:", error);
      alert("Failed to generate questions. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Replace current question with one from the bank
  const swapQuestion = (bankQuestionText) => {
    const newQuestions = [...questions];
    newQuestions[step - 1] = {
      ...newQuestions[step - 1], // keep id, bgColor, and reset answer
      question: bankQuestionText,
      answer: null 
    };
    setQuestions(newQuestions);
    setShowBankModal(false);
  };

  const updateQuestionText = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const setAnswer = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].answer = value;
    setQuestions(newQuestions);
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 10));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSaveAndShare = async () => {
    setIsSubmitting(true);
    const payload = {
      creatorName: userInfo.name,
      location: userInfo.country,
      language: userInfo.language,
      title: `${userInfo.name}'s Never Have I Ever 👀`,
      questions: questions,
    };

    try {
      const res = await fetch("/api/never-have-i-ever/create", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      
      setCreatedChallengeId(data.challengeId);
      localStorage.setItem('nhie_challenge_id', data.challengeId);
      
      setStep(11); 
    } catch (error) {
      console.error("Failed to create challenge", error);
      alert("Something went wrong creating the challenge.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- DELETE CHALLENGE HANDLER ---
  const handleDeleteChallenge = async () => {
    if(!confirm("Are you sure you want to delete this challenge and start over? This cannot be undone.")) return;
    
    setIsDeleting(true);
    
    try {
      if (createdChallengeId) {
        const res = await fetch(`/api/never-have-i-ever/${createdChallengeId}`, { 
          method: "DELETE" 
        });
        
        if (!res.ok) {
          console.error("Failed to delete challenge from server.");
        }
      }
    } catch (error) {
      console.error("Error deleting challenge:", error);
    } finally {
      localStorage.removeItem('nhie_challenge_id');
      setCreatedChallengeId(null);
      setUserInfo({ country: "", language: "", name: "" });
      setStep(0);
      setIsDeleting(false);
      alert("Challenge successfully deleted. You can now create a new one!");
    }
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(type);
    setTimeout(() => setCopiedLink(""), 2000);
  };

  // --- ANIMATIONS ---
  const slideVariants = {
    enter: { x: 50, opacity: 0, scale: 0.95 },
    center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
    exit: { zIndex: 0, x: -50, opacity: 0, scale: 0.95 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 25 } },
    exit: { opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }
  };

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center p-4 font-sans text-white overflow-hidden py-10 selection:bg-emerald-500/30">
      <div className="w-full max-w-xl relative">
        <AnimatePresence mode="wait">
          
          {/* ========================================= */}
          {/* STEP 0: INITIAL SETUP */}
          {/* ========================================= */}
          {step === 0 && (
            <motion.div
              key="step-0"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-[#13151f]/90 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_50px_rgba(16,185,129,0.1)] border border-emerald-500/20 relative overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-40 bg-emerald-500/20 blur-[100px] pointer-events-none" />

              <div className="text-center mb-10 relative z-10">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
                  Never Have I Ever
                </h1>
                <p className="text-slate-400 font-medium text-lg">
                  Confess your secrets. <br className="hidden sm:block" /> Let's see if your friends can guess them. 👀
                </p>
              </div>

              <div className="space-y-6 relative z-10">
                <div className="space-y-2 group">
                  <label className="text-xs font-bold text-emerald-400 uppercase tracking-widest ml-2">Your Name / Nickname</label>
                  <input
                    type="text"
                    placeholder="E.g. Alex..."
                    value={userInfo.name}
                    onChange={handleNameChange}
                    className="w-full bg-black/40 border border-white/10 text-white px-5 py-4 rounded-2xl outline-none focus:border-emerald-500/50 focus:bg-black/60 transition-all text-lg placeholder:text-slate-600 shadow-inner group-hover:border-white/20"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2 group">
                    <label className="text-xs font-bold text-emerald-400 uppercase tracking-widest ml-2">Country</label>
                    <select
                      value={userInfo.country}
                      onChange={handleCountryChange}
                      className="w-full bg-black/40 border border-white/10 text-white px-5 py-4 rounded-2xl outline-none focus:border-emerald-500/50 transition-all appearance-none cursor-pointer group-hover:border-white/20"
                    >
                      <option value="" disabled>Select...</option>
                      {Object.keys(COUNTRY_LANGUAGE_MAP).sort().map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2 group">
                    <label className="text-xs font-bold text-emerald-400 uppercase tracking-widest ml-2">Language</label>
                    <select
                      value={userInfo.language}
                      onChange={handleLanguageChange}
                      disabled={!userInfo.country}
                      className="w-full bg-black/40 border border-white/10 text-white px-5 py-4 rounded-2xl outline-none focus:border-emerald-500/50 transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group-hover:border-white/20"
                    >
                      <option value="" disabled>{userInfo.country ? "Select..." : "Pick country first"}</option>
                      {availableLanguages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-12 relative z-10">
                <button
                  onClick={handleStartSetup}
                  disabled={!userInfo.name || !userInfo.country || !userInfo.language || isGenerating}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-400 text-emerald-950 font-black text-xl py-5 px-6 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none shadow-[0_10px_30px_rgba(16,185,129,0.4)] flex justify-center items-center gap-2 h-[72px]"
                >
                  {isGenerating ? (
                    <div className="w-8 h-8 border-4 border-emerald-950 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Generate Questions 🔥"
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* ========================================= */}
          {/* STEPS 1-10: QUESTIONS */}
          {/* ========================================= */}
          {step > 0 && step <= 10 && (
            <motion.div
              key={`step-${step}`}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`${questions[step - 1].bgColor} rounded-[2.5rem] p-6 md:p-10 shadow-2xl transition-colors duration-700 border border-white/10 backdrop-blur-xl relative overflow-hidden`}
            >
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
                    🎲 Swap Question
                  </button>
                </div>

                {/* Question Text Area */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-white/20 rounded-3xl blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
                  <textarea
                    rows={4}
                    value={questions[step - 1].question}
                    onChange={(e) => updateQuestionText(step - 1, e.target.value)}
                    className="relative w-full bg-black/20 border border-white/10 text-white placeholder-white/30 px-6 py-5 text-2xl md:text-3xl font-black outline-none focus:border-white/50 focus:bg-black/40 transition-all rounded-3xl resize-none shadow-inner text-center leading-tight"
                  />
                </div>

                <p className="text-center text-xs font-bold uppercase tracking-widest text-white/50 mb-2 mt-4">Have you done this?</p>

                {/* I Have / Never Buttons */}
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setAnswer(step - 1, "have")}
                    className={`flex-1 py-5 rounded-2xl font-black text-xl transition-all duration-300 flex flex-col items-center gap-2 ${
                      questions[step - 1].answer === "have" 
                        ? "bg-emerald-500 text-emerald-950 shadow-[0_0_25px_rgba(16,185,129,0.5)] scale-[1.02] border border-emerald-400" 
                        : "bg-black/40 text-white/60 border border-white/10 hover:bg-black/60 hover:text-white"
                    }`}
                  >
                    <span className="text-3xl">🙋‍♀️</span>
                    I Have
                  </button>
                  <button
                    onClick={() => setAnswer(step - 1, "never")}
                    className={`flex-1 py-5 rounded-2xl font-black text-xl transition-all duration-300 flex flex-col items-center gap-2 ${
                      questions[step - 1].answer === "never" 
                        ? "bg-rose-500 text-rose-950 shadow-[0_0_25px_rgba(244,63,94,0.5)] scale-[1.02] border border-rose-400" 
                        : "bg-black/40 text-white/60 border border-white/10 hover:bg-black/60 hover:text-white"
                    }`}
                  >
                    <span className="text-3xl">🙅‍♂️</span>
                    Never
                  </button>
                </div>
              </div>

              <div className="mt-10 flex justify-end">
                {step < 10 ? (
                  <button 
                    onClick={handleNext} 
                    disabled={questions[step - 1].answer === null}
                    className="bg-white text-slate-900 font-black text-lg py-4 px-8 rounded-2xl hover:bg-slate-200 hover:scale-[1.02] transition-all shadow-xl flex items-center gap-2 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
                  >
                    Next Question →
                  </button>
                ) : (
                  <button
                    onClick={handleSaveAndShare}
                    disabled={isSubmitting || questions[step - 1].answer === null}
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
            </motion.div>
          )}

          {/* ========================================= */}
          {/* STEP 11: SUCCESS & LINKS SCREEN */}
          {/* ========================================= */}
          {step === 11 && (
            <motion.div
              key="step-11"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-[#13151f]/90 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_50px_rgba(16,185,129,0.1)] border border-emerald-500/30 text-center relative overflow-hidden flex flex-col items-center"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-60 bg-emerald-500/10 blur-[100px] pointer-events-none" />
              
              <div className="text-7xl mb-6 relative z-10 animate-bounce">🔥</div>
              <h2 className="text-4xl font-black mb-3 text-white relative z-10">Challenge is LIVE!</h2>
              <p className="text-slate-400 font-medium text-lg mb-10 relative z-10">Time to expose your secrets. <br className="hidden sm:block" /> Let's see who can guess your answers.</p>

              <div className="space-y-6 relative z-10 text-left w-full">
                
                {/* 1. Public Share Link */}
                <div className="bg-black/40 p-6 rounded-3xl border border-white/10 shadow-inner">
                  <p className="text-sm font-bold text-emerald-400 mb-3 uppercase tracking-wide flex items-center gap-2">
                    <span>Send to friends</span>
                    <span className="bg-emerald-500/20 px-2 py-0.5 rounded-md text-xs text-emerald-300">Public Link</span>
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input 
                      readOnly 
                      value={`${baseUrl}/never-have-i-ever/${createdChallengeId}`} 
                      className="w-full bg-white/5 border border-white/10 text-white px-5 py-4 rounded-xl outline-none text-sm font-mono text-ellipsis focus:border-emerald-500/50 transition-colors"
                    />
                    <button 
                      onClick={() => copyToClipboard(`${baseUrl}/never-have-i-ever/${createdChallengeId}`, 'share')}
                      className="bg-emerald-500 text-emerald-950 px-6 py-4 rounded-xl font-black hover:bg-emerald-400 transition-colors whitespace-nowrap active:scale-95 shadow-lg"
                    >
                      {copiedLink === 'share' ? 'Copied! ✔' : 'Copy Link'}
                    </button>
                  </div>
                </div>

                {/* 2. Simplified Dashboard Button */}
                <div className="bg-emerald-900/20 p-6 rounded-3xl border border-emerald-500/30 shadow-inner text-center">
                  <p className="text-sm font-bold text-amber-400 mb-2 uppercase tracking-wide flex items-center justify-center gap-2">
                    <span>Track Your Results</span>
                    <span className="bg-amber-500/20 px-2 py-0.5 rounded-md text-xs text-amber-300">Secret</span>
                  </p>
                  <p className="text-xs font-medium text-slate-400 mb-6">This is your personal dashboard to see who guessed your answers correctly.</p>
                  
                  <button
                    onClick={() => window.location.href = `/never-have-i-ever/${createdChallengeId}/results`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-500 text-amber-950 font-black px-8 py-4 rounded-xl hover:bg-amber-400 transition-all active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.3)] text-lg"
                  >
                    Go to my Dashboard now →
                  </button>
                </div>

              </div>

              {/* DELETE CHALLENGE BUTTON */}
              <div className="mt-10 pt-6 border-t border-white/10 w-full relative z-10">
                <button
                  onClick={handleDeleteChallenge}
                  disabled={isDeleting}
                  className="text-xs font-bold text-rose-400/70 hover:text-rose-400 transition-colors uppercase tracking-widest flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
                >
                  {isDeleting ? (
                    <div className="w-4 h-4 border-2 border-rose-400 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <span className="text-lg">🗑️</span>
                  )}
                  {isDeleting ? "Deleting..." : "Delete current challenge & start over"}
                </button>
              </div>

            </motion.div>
          )}

        </AnimatePresence>

        {/* ========================================= */}
        {/* THE QUESTION BANK MODAL */}
        {/* ========================================= */}
        <AnimatePresence>
          {showBankModal && (
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
                {/* Modal Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20">
                  <h3 className="text-xl font-black text-white">Question Bank 📚</h3>
                  <button 
                    onClick={() => setShowBankModal(false)}
                    className="w-10 h-10 bg-white/5 hover:bg-rose-500/20 text-white hover:text-rose-400 rounded-full flex items-center justify-center transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* Scrollable Question List */}
                <div className="p-4 overflow-y-auto custom-scrollbar flex-1 space-y-3">
                  {questionBank.map((bankQText, idx) => (
                    <button
                      key={idx}
                      onClick={() => swapQuestion(bankQText)}
                      className="w-full text-left p-5 bg-white/5 hover:bg-emerald-500/20 border border-white/5 hover:border-emerald-500/50 rounded-2xl transition-all group"
                    >
                      <p className="font-bold text-white group-hover:text-emerald-300">{bankQText}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}