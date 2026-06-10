"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { translateText } from "@/lib/translate";

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

const generateNHIEBank = () => {
  return [
    // --- 📱 SOCIAL MEDIA & TECHNOLOGY (20) ---
    "Never have I ever stalked an ex on social media from a fake account.",
    "Never have I ever sent a spicy text to the wrong person.",
    "Never have I ever accidentally liked a photo from 3 years ago while stalking someone.",
    "Never have I ever pretended my phone was dead to avoid talking to someone.",
    "Never have I ever ignored a phone call, then immediately texted 'What's up?'.",
    "Never have I ever used someone else's Netflix account without them knowing.",
    "Never have I ever deleted a social media post because it didn't get enough likes.",
    "Never have I ever read a message, left them on read, and claimed I never saw it.",
    "Never have I ever Facetuned or heavily edited a photo of myself before posting.",
    "Never have I ever slid into a stranger's DMs.",
    "Never have I ever checked my current partner's ex's social media.",
    "Never have I ever been blocked by someone I know in real life.",
    "Never have I ever used my phone while sitting on the toilet.",
    "Never have I ever Googled my own name to see what comes up.",
    "Never have I ever created a fake dating profile.",
    "Never have I ever Googled my blind date before meeting them.",
    "Never have I ever texted my ex while drunk.",
    "Never have I ever blocked a family member on social media.",
    "Never have I ever scrolled on TikTok or Reels for more than 5 hours straight.",
    "Never have I ever un-sent a message before the other person could read it.",

    // --- 💔 DATING, ROMANCE & CRUSHES (20) ---
    "Never have I ever had a crush on a friend's sibling.",
    "Never have I ever kissed someone on the very first date.",
    "Never have I ever ghosted someone after hanging out with them.",
    "Never have I ever been ghosted by someone I really liked.",
    "Never have I ever practiced kissing on my hand or a pillow.",
    "Never have I ever dated someone just because they had money or a car.",
    "Never have I ever gone on a date just for the free food.",
    "Never have I ever said 'I love you' first.",
    "Never have I ever completely forgotten my date's name while on the date.",
    "Never have I ever used a genuinely terrible pickup line in real life.",
    "Never have I ever lied about my relationship status to get out of an awkward situation.",
    "Never have I ever had a crush on a teacher or a boss.",
    "Never have I ever gotten back together with a toxic ex.",
    "Never have I ever snooped through my partner's phone.",
    "Never have I ever been caught completely staring at someone I found attractive.",
    "Never have I ever faked liking a band or movie just to impress a crush.",
    "Never have I ever flirted with someone to get out of a speeding ticket or trouble.",
    "Never have I ever cried over someone who didn't even know I existed.",
    "Never have I ever accidentally sent a romantic or risky text to my parents.",
    "Never have I ever swiped right on everyone on a dating app just to see who liked me.",

    // --- 🤢 SECRETS & GROSS HABITS (20) ---
    "Never have I ever eaten food off the floor (the 5-second rule).",
    "Never have I ever worn the exact same underwear two days in a row.",
    "Never have I ever peed in a swimming pool.",
    "Never have I ever farted in a crowded room and blamed it on someone else (or a dog).",
    "Never have I ever picked my nose in public thinking no one was looking.",
    "Never have I ever smelled my own armpits to see if I needed a shower.",
    "Never have I ever gone more than three days without showering.",
    "Never have I ever accidentally used someone else's toothbrush.",
    "Never have I ever drank milk straight out of the carton.",
    "Never have I ever eaten someone else's labeled food from the fridge and denied it.",
    "Never have I ever dropped a piece of food, picked it up, and put it back on the serving plate.",
    "Never have I ever bitten my toenails.",
    "Never have I ever fallen asleep on the toilet.",
    "Never have I ever left the house without brushing my teeth.",
    "Never have I ever pulled dirty clothes out of the laundry hamper to wear again.",
    "Never have I ever skipped washing my hands after using the bathroom at home.",
    "Never have I ever tasted pet food just to see what it tasted like.",
    "Never have I ever chewed on a pen that I borrowed from someone else.",
    "Never have I ever lied about my weight or height.",
    "Never have I ever eaten a spoonful of straight frosting out of the tub.",

    // --- 🏢 SCHOOL, WORK & RULE-BREAKING (20) ---
    "Never have I ever faked being sick to get out of school or work.",
    "Never have I ever fallen asleep during a meeting or a class.",
    "Never have I ever cheated on a major test or exam.",
    "Never have I ever stolen office supplies from my job.",
    "Never have I ever blatantly lied on my resume to get a job.",
    "Never have I ever blamed a mistake on a coworker.",
    "Never have I ever quit a job without giving any notice.",
    "Never have I ever cried at my workplace.",
    "Never have I ever shown up to work or school incredibly hungover.",
    "Never have I ever hit 'Reply All' to a company-wide email by mistake.",
    "Never have I ever muted myself on a Zoom call just so I could scream.",
    "Never have I ever pretended to be working while actually watching Netflix.",
    "Never have I ever forged my parent's signature on a permission slip.",
    "Never have I ever been sent to the principal's office.",
    "Never have I ever completely skipped a final exam.",
    "Never have I ever lied about traffic to excuse being late.",
    "Never have I ever taken credit for someone else's brilliant idea.",
    "Never have I ever lied to a teacher about reading the assigned book.",
    "Never have I ever read a Wikipedia summary instead of the actual assignment.",
    "Never have I ever sneakily eaten a full meal during a class where food was banned.",

    // --- 🤡 WILD, FUNNY & ABSURD (20) ---
    "Never have I ever broken a bone doing something incredibly stupid.",
    "Never have I ever tripped in public and tried to play it off like I was jogging.",
    "Never have I ever waved back at someone who was actually waving at the person behind me.",
    "Never have I ever confidently walked straight into a perfectly clean glass door.",
    "Never have I ever gotten a haircut so bad I cried.",
    "Never have I ever uncontrollably laughed during a serious moment or a funeral.",
    "Never have I ever snuck out of my house in the middle of the night.",
    "Never have I ever driven a car without having a license.",
    "Never have I ever stolen a street sign or traffic cone.",
    "Never have I ever snuck into a movie theater without paying.",
    "Never have I ever gotten completely lost in my own hometown.",
    "Never have I ever given a completely fake name to a barista at a coffee shop.",
    "Never have I ever accidentally completely ruined a surprise party.",
    "Never have I ever gotten a tattoo that I deeply regret.",
    "Never have I ever re-gifted a present that someone else gave me.",
    "Never have I ever cried while watching a children's animated movie.",
    "Never have I ever intensely stared at an object trying to move it with my mind.",
    "Never have I ever had a full, out-loud conversation with an animal.",
    "Never have I ever eaten an entire family-sized pizza by myself.",
    "Never have I ever secretly believed in a ridiculous conspiracy theory."
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

  const [questions, setQuestions] = useState([]);
  const [questionBank, setQuestionBank] = useState([]);
  const [showBankModal, setShowBankModal] = useState(false);

  // --- STRICT DEVICE MEMORY CHECK ON MOUNT ---
  useEffect(() => {
    const existingId = localStorage.getItem('nhie_challenge_id');
    
    if (existingId) {
      // If a quiz exists on this device, lock them directly to Step 11
      setCreatedChallengeId(existingId);
      setStep(11); 
    } else {
      // If no quiz exists, let them make one from Step 0
      setStep(0);
    }
    
    setIsLoading(false);
  }, []);

  // --- HANDLERS ---
  const handleCountryChange = (e) => setUserInfo({ ...userInfo, country: e.target.value, language: "" });
  const handleLanguageChange = (e) => setUserInfo({ ...userInfo, language: e.target.value });
  const handleNameChange = (e) => setUserInfo({ ...userInfo, name: e.target.value });

  const handleStartSetup = async () => {
    try {
      setIsGenerating(true);
      const baseBank = generateNHIEBank();

      const translatedBank = await Promise.all(
        baseBank.map(async (q) => {
          // Wrap in try-catch in case translateText fails or language is empty
          try {
            return userInfo.language ? await translateText(q, userInfo.language) : q;
          } catch (e) {
            return q; 
          }
        })
      );

      const shuffledBank = [...translatedBank].sort(() => 0.5 - Math.random());
      const selected10 = shuffledBank.slice(0, 10).map((q, index) => ({
        id: index + 1,
        statement: q, 
        creatorAnswer: null, 
        bgColor: BG_COLORS[index % BG_COLORS.length],
      }));

      setQuestionBank(translatedBank);
      setQuestions(selected10);
      setStep(1);

    } catch (error) {
      console.error(error);
      alert("Failed to generate questions. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const swapQuestion = (bankQuestionText) => {
    const newQuestions = [...questions];
    newQuestions[step - 1] = {
      ...newQuestions[step - 1],
      statement: bankQuestionText,
      creatorAnswer: null 
    };
    setQuestions(newQuestions);
    setShowBankModal(false);
  };

  const updateQuestionText = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].statement = value;
    setQuestions(newQuestions);
  };

  const setAnswer = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].creatorAnswer = value;
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
      quizTitle: `${userInfo.name}'s Never Have I Ever 👀`,
      questions: questions,
    };

    try {
      const res = await fetch("/api/nhie/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) throw new Error("Failed to create quiz");
      
      const data = await res.json();
      const finalId = data.quizId || data.challengeId;
      
      setCreatedChallengeId(finalId); 
      localStorage.setItem('nhie_challenge_id', finalId); // Lock device record
      
      setStep(11); 
    } catch (error) {
      console.error(error);
      alert("Something went wrong creating the challenge.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- STRICT DELETE ACTION (Clears MongoDB + LocalStorage Loop) ---
  const handleDeleteChallenge = async () => {
    if (!confirm("Are you sure? This will PERMANENTLY delete your quiz from the database and wipe your scoreboard.")) return;
    
    setIsDeleting(true);
    
    try {
      if (createdChallengeId) {
        // Send actual DELETE request to backend to completely wipe the record
        const res = await fetch(`/api/nhie/${createdChallengeId}`, { 
          method: "DELETE" 
        });
        
        if (!res.ok) {
          console.error("Failed to delete from MongoDB");
        }
      }
    } catch (error) {
      console.error("Error deleting remote record:", error);
    } finally {
      // Wipe everything locally to unlock creation step access again
      localStorage.removeItem('nhie_challenge_id');
      setCreatedChallengeId(null);
      setUserInfo({ country: "", language: "", name: "" });
      setQuestions([]);
      setStep(0); // Safely bounce back to creation start step layout
      setIsDeleting(false);
      alert("Your current quiz has been deleted. You can now build a brand new one!");
    }
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(type);
    setTimeout(() => setCopiedLink(""), 2000);
  };

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
  const shareText = `I just confessed my secrets! Can you guess what I've done? Take my Never Have I Ever quiz: ${baseUrl}/nhie/${createdChallengeId}`;

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
          
          {/* STEP 0: ONLY ACCESSIBLE IF LOCALSTORAGE IS EMPTY */}
          {step === 0 && (
            <motion.div
              key="step-0" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-[#13151f]/90 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_50px_rgba(16,185,129,0.1)] border border-emerald-500/20 relative overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-40 bg-emerald-500/20 blur-[100px] pointer-events-none" />
              <div className="text-center mb-10 relative z-10">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">Never Have I Ever</h1>
                <p className="text-slate-400 font-medium text-lg">Confess your secrets. <br className="hidden sm:block" /> Let's see if your friends can guess them. 👀</p>
              </div>

              <div className="space-y-6 relative z-10">
                <div className="space-y-2 group">
                  <label className="text-xs font-bold text-emerald-400 uppercase tracking-widest ml-2">Your Name / Nickname</label>
                  <input
                    type="text" placeholder="E.g. Alex..." value={userInfo.name} onChange={handleNameChange}
                    className="w-full bg-black/40 border border-white/10 text-white px-5 py-4 rounded-2xl outline-none focus:border-emerald-500/50 focus:bg-black/60 transition-all text-lg placeholder:text-slate-600 shadow-inner group-hover:border-white/20"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2 group">
                    <label className="text-xs font-bold text-emerald-400 uppercase tracking-widest ml-2">Country</label>
                    <select
                      value={userInfo.country} onChange={handleCountryChange}
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
                      value={userInfo.language} onChange={handleLanguageChange} disabled={!userInfo.country}
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
                  onClick={handleStartSetup} disabled={!userInfo.name || !userInfo.country || !userInfo.language || isGenerating}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-400 text-emerald-950 font-black text-xl py-5 px-6 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none shadow-[0_10px_30px_rgba(16,185,129,0.4)] flex justify-center items-center gap-2 h-[72px]"
                >
                  {isGenerating ? <div className="w-8 h-8 border-4 border-emerald-950 border-t-transparent rounded-full animate-spin"></div> : "Generate Questions 🔥"}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEPS 1-10: RUNNING THE CONFIGURATIONS */}
          {step > 0 && step <= 10 && (
            <motion.div
              key={`step-${step}`} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`${questions[step - 1].bgColor} rounded-[2.5rem] p-6 md:p-10 shadow-2xl transition-colors duration-700 border border-white/10 backdrop-blur-xl relative overflow-hidden`}
            >
              <div className="absolute top-0 left-0 h-1.5 bg-white/20 w-full">
                <motion.div initial={{ width: `${((step - 1) / 10) * 100}%` }} animate={{ width: `${(step / 10) * 100}%` }} className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
              </div>

              <div className="flex justify-between items-center mb-8 mt-2">
                <button onClick={handlePrev} className="w-12 h-12 flex items-center justify-center bg-black/20 hover:bg-black/40 rounded-full transition-colors text-white/70 text-xl font-bold">←</button>
                <div className="bg-black/20 px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase text-white/80 border border-white/5">Question {step} / 10</div>
              </div>

              <div className="space-y-6 relative z-10">
                <div className="flex justify-center mb-4">
                  <button onClick={() => setShowBankModal(true)} className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-2 px-5 rounded-full text-sm flex items-center gap-2 transition-all shadow-lg backdrop-blur-sm">🎲 Swap Question</button>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-1 bg-white/20 rounded-3xl blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
                  <textarea
                    rows={4} value={questions[step - 1].statement} onChange={(e) => updateQuestionText(step - 1, e.target.value)}
                    className="relative w-full bg-black/20 border border-white/10 text-white placeholder-white/30 px-6 py-5 text-2xl md:text-3xl font-black outline-none focus:border-white/50 focus:bg-black/40 transition-all rounded-3xl resize-none shadow-inner text-center leading-tight"
                  />
                </div>

                <p className="text-center text-xs font-bold uppercase tracking-widest text-white/50 mb-2 mt-4">Have you done this?</p>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setAnswer(step - 1, "I Have")}
                    className={`flex-1 py-5 rounded-2xl font-black text-xl transition-all duration-300 flex flex-col items-center gap-2 ${
                      questions[step - 1].creatorAnswer === "I Have" ? "bg-emerald-500 text-emerald-950 shadow-[0_0_25px_rgba(16,185,129,0.5)] scale-[1.02] border border-emerald-400" : "bg-black/40 text-white/60 border border-white/10 hover:bg-black/60 hover:text-white"
                    }`}
                  >
                    <span className="text-3xl">🙋‍♀️</span>I Have
                  </button>
                  <button
                    onClick={() => setAnswer(step - 1, "Never")}
                    className={`flex-1 py-5 rounded-2xl font-black text-xl transition-all duration-300 flex flex-col items-center gap-2 ${
                      questions[step - 1].creatorAnswer === "Never" ? "bg-rose-500 text-rose-950 shadow-[0_0_25px_rgba(244,63,94,0.5)] scale-[1.02] border border-rose-400" : "bg-black/40 text-white/60 border border-white/10 hover:bg-black/60 hover:text-white"
                    }`}
                  >
                    <span className="text-3xl">🙅‍♂️</span>Never
                  </button>
                </div>
              </div>

              <div className="mt-10 flex justify-end">
                {step < 10 ? (
                  <button 
                    onClick={handleNext} disabled={questions[step - 1].creatorAnswer === null}
                    className="bg-white text-slate-900 font-black text-lg py-4 px-8 rounded-2xl hover:bg-slate-200 hover:scale-[1.02] transition-all shadow-xl flex items-center gap-2 disabled:opacity-50"
                  >Next Question →</button>
                ) : (
                  <button
                    onClick={handleSaveAndShare} disabled={isSubmitting || questions[step - 1].creatorAnswer === null}
                    className="bg-emerald-400 text-emerald-950 font-black text-lg py-4 px-8 rounded-2xl hover:bg-emerald-300 hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(52,211,153,0.5)] disabled:opacity-50 h-16 min-w-[200px] justify-center flex items-center gap-2"
                  >
                    {isSubmitting ? <div className="w-6 h-6 border-4 border-emerald-950 border-t-transparent rounded-full animate-spin"></div> : "Finish & Share 🚀"}
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 11: USER IS LOCKED HERE IF CHALLLENGEID EXISTS */}
          {step === 11 && (
            <motion.div
              key="step-11" initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-[#13151f]/90 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_50px_rgba(16,185,129,0.1)] border border-emerald-500/30 text-center relative overflow-hidden flex flex-col items-center"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-60 bg-emerald-500/10 blur-[100px] pointer-events-none" />
              <div className="text-7xl mb-6 relative z-10 animate-bounce">🔥</div>
              <h2 className="text-4xl font-black mb-3 text-white relative z-10">Challenge is LIVE!</h2>
              <p className="text-slate-400 font-medium text-lg mb-10 relative z-10">You have an active quiz running on this device. <br /> Delete it below if you want to create a brand new one.</p>

              <div className="space-y-6 relative z-10 text-left w-full">
                <div className="bg-black/40 p-6 rounded-3xl border border-white/10 shadow-inner">
                  <p className="text-sm font-bold text-emerald-400 mb-3 uppercase tracking-wide flex items-center gap-2">
                    <span>Send to friends</span>
                    <span className="bg-emerald-500/20 px-2 py-0.5 rounded-md text-xs text-emerald-300">Active Link</span>
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input readOnly value={`${baseUrl}/nhie/${createdChallengeId}`} className="w-full bg-white/5 border border-white/10 text-white px-5 py-4 rounded-xl outline-none text-sm font-mono text-ellipsis focus:border-emerald-500/50 transition-colors" />
                    <button 
                      onClick={() => copyToClipboard(`${baseUrl}/nhie/${createdChallengeId}`, 'share')}
                      className="bg-emerald-500 text-emerald-950 px-6 py-4 rounded-xl font-black hover:bg-emerald-400 transition-all whitespace-nowrap active:scale-95 shadow-lg"
                    >
                      {copiedLink === 'share' ? 'Copied! ✔' : 'Copy Link'}
                    </button>
                  </div>
                  
                  <div className="flex gap-3 mt-4">
                    <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#25D366]/20 text-[#25D366] py-3 rounded-xl font-bold border border-[#25D366]/30 hover:bg-[#25D366]/30 transition-colors flex justify-center items-center">WhatsApp</a>
                    <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Can you guess my secrets? Take my Never Have I Ever quiz!")}&url=${baseUrl}/nhie/${createdChallengeId}`} target="_blank" rel="noopener noreferrer" className="flex-1 bg-white/10 text-white py-3 rounded-xl font-bold border border-white/20 hover:bg-white/20 transition-colors flex justify-center items-center">X (Twitter)</a>
                  </div>
                </div>

                <div className="bg-emerald-900/20 p-6 rounded-3xl border border-emerald-500/30 shadow-inner text-center">
                  <p className="text-sm font-bold text-amber-400 mb-2 uppercase tracking-wide flex items-center justify-center gap-2">
                    <span>Track Your Results</span>
                    <span className="bg-amber-500/20 px-2 py-0.5 rounded-md text-xs text-amber-300">Secret Scoreboard</span>
                  </p>
                  <button onClick={() => window.location.href = `/nhie/${createdChallengeId}/results`} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-500 text-amber-950 font-black px-8 py-4 rounded-xl hover:bg-amber-400 transition-all active:scale-95 text-lg">
                    Go to my Dashboard now →
                  </button>
                </div>
              </div>

              {/* STAYS PERMANENTLY VISIBLE UNTIL DELETED */}
              <div className="mt-10 pt-6 border-t border-white/10 w-full relative z-10">
                <button
                  onClick={handleDeleteChallenge} disabled={isDeleting}
                  className="text-xs font-bold text-rose-400/70 hover:text-rose-400 transition-colors uppercase tracking-widest flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
                >
                  {isDeleting ? <div className="w-4 h-4 border-2 border-rose-400 border-t-transparent rounded-full animate-spin"></div> : <span className="text-lg">🗑️</span>}
                  {isDeleting ? "Deleting..." : "Delete current quiz & start over"}
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* BANK MODAL */}
        <AnimatePresence>
          {showBankModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit" className="bg-[#1a1c29] border border-white/10 rounded-[2rem] w-full max-w-xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20">
                  <h3 className="text-xl font-black text-white">Question Bank 📚</h3>
                  <button onClick={() => setShowBankModal(false)} className="w-10 h-10 bg-white/5 hover:bg-rose-500/20 text-white hover:text-rose-400 rounded-full flex items-center justify-center transition-colors">✕</button>
                </div>
                <div className="p-4 overflow-y-auto custom-scrollbar flex-1 space-y-3">
                  {questionBank.map((bankQText, idx) => (
                    <button key={idx} onClick={() => swapQuestion(bankQText)} className="w-full text-left p-5 bg-white/5 hover:bg-emerald-500/20 border border-white/5 hover:border-emerald-500/50 rounded-2xl transition-all group">
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