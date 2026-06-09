"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BG_COLORS = ["bg-fuchsia-950", "bg-purple-950", "bg-violet-950", "bg-indigo-950", "bg-blue-950", "bg-rose-950"];

const NHIE_BANK = [
  "Never have I ever stalked an ex from a fake account. 🕵️",
  "Never have I ever sent a spicy text to the wrong person. 📱",
  "Never have I ever ghosted someone after a first date. 👻",
  "Never have I ever snooped through someone else's phone. 📱",
  "Never have I ever lied about my age to get into somewhere. 🎂",
  "Never have I ever used a dating app just for free food/drinks. 🍷",
  "Never have I ever dropped food on the floor and still eaten it. 🍕",
  "Never have I ever regretted a late-night haircut. ✂️",
  "Never have I ever had a crush on a friend's sibling. 👀",
  "Never have I ever practiced an argument in the shower. 🚿"
];

export default function CreateNhie() {
  const [step, setStep] = useState(0); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdId, setCreatedId] = useState(null);
  const [creatorName, setCreatorName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [copiedLink, setCopiedLink] = useState(false);
  
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

  const handleStart = () => {
    // Generate 10 randomized statements
    const shuffled = [...NHIE_BANK].sort(() => 0.5 - Math.random()).slice(0, 10);
    const setupQuestions = shuffled.map((statement, idx) => ({
      id: idx + 1,
      statement,
      creatorAnswer: null, 
      bgColor: BG_COLORS[idx % BG_COLORS.length],
    }));
    setQuestions(setupQuestions);
    setStep(1);
  };

  const handleAnswer = (answer) => {
    const updated = [...questions];
    updated[step - 1].creatorAnswer = answer;
    setQuestions(updated);
    
    if (step < 10) {
      setStep(step + 1);
    } else {
      handleSave(updated);
    }
  };

  const handleSave = async (finalQuestions) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/nhie/create", {
        method: "POST",
        body: JSON.stringify({
          creatorName,
          quizTitle: `${creatorName}'s Exposed Game 🤫`,
          questions: finalQuestions,
        }),
      });
      const data = await res.json();
      setCreatedId(data.quizId);
      setStep(11); // Move to Share Screen
    } catch (error) {
      alert("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyLink = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const shareText = `I just confessed my secrets! Can you guess what I've done? Take my Never Have I Ever quiz: ${baseUrl}/nhie/${createdId}`;

  return (
    <div className="min-h-screen bg-[#050510] flex items-center justify-center p-4 font-sans text-white">
      <div className="w-full max-w-xl relative">
        <AnimatePresence mode="wait">
          
          {/* STEP 0: NAME SETUP */}
          {step === 0 && (
            <motion.div key="intro" className="bg-[#110f1c]/90 backdrop-blur-xl rounded-[2.5rem] p-10 border border-fuchsia-500/20 text-center">
              <div className="text-6xl mb-4">🤫</div>
              <h1 className="text-4xl font-black mb-4 text-fuchsia-400">Never Have I Ever</h1>
              <p className="text-slate-400 mb-8">Confess your truths. Then, let's see which of your friends can guess your deepest secrets.</p>
              
              <input
                type="text"
                placeholder="Enter your name..."
                value={creatorName}
                onChange={(e) => setCreatorName(e.target.value)}
                className="w-full bg-black/40 border border-white/10 px-6 py-5 rounded-2xl mb-6 text-white text-lg outline-none focus:border-fuchsia-500 text-center"
              />
              <button
                onClick={handleStart}
                disabled={!creatorName}
                className="w-full bg-fuchsia-500 text-fuchsia-950 font-black text-xl py-5 rounded-2xl hover:bg-fuchsia-400 transition-all disabled:opacity-50"
              >
                Confess My Secrets 😈
              </button>
            </motion.div>
          )}

          {/* STEPS 1-10: CREATOR ANSWERS THE QUESTIONS */}
          {step > 0 && step <= 10 && (
            <motion.div key={step} className={`${questions[step - 1].bgColor} rounded-[2.5rem] p-10 shadow-2xl border border-white/10 relative`}>
              <p className="text-center text-white/50 font-bold uppercase mb-6">Confession {step} / 10</p>
              <h2 className="text-3xl font-black text-center mb-12 min-h-[120px] flex items-center justify-center">
                "{questions[step - 1].statement}"
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => handleAnswer("I Have")}
                  className="bg-emerald-500 text-emerald-950 font-black py-6 rounded-2xl text-xl hover:scale-105 transition-transform"
                >
                  Yes, I Have 🙋‍♀️
                </button>
                <button 
                  onClick={() => handleAnswer("Never")}
                  className="bg-rose-500 text-rose-950 font-black py-6 rounded-2xl text-xl hover:scale-105 transition-transform"
                >
                  No, Never 🙅‍♀️
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 11: SUCCESS & SOCIAL SHARE SCREEN */}
          {step === 11 && (
            <motion.div key="success" className="bg-[#110f1c]/90 rounded-[2.5rem] p-10 border border-fuchsia-500/30 text-center">
              <div className="text-7xl mb-4 animate-bounce">🔥</div>
              <h2 className="text-4xl font-black mb-2 text-white">Secrets Locked!</h2>
              <p className="text-slate-400 mb-8">Share this link to see who can guess what you've done.</p>

              <div className="bg-black/40 p-4 rounded-3xl border border-white/10 mb-6 flex flex-col gap-3">
                <input readOnly value={`${baseUrl}/nhie/${createdId}`} className="w-full bg-white/5 text-white px-4 py-3 rounded-xl outline-none text-center text-sm" />
                <button onClick={() => copyLink(`${baseUrl}/nhie/${createdId}`)} className="bg-fuchsia-500 text-fuchsia-950 py-3 rounded-xl font-black hover:bg-fuchsia-400">
                  {copiedLink ? 'Copied! ✔' : 'Copy Link 🔗'}
                </button>
              </div>

              {/* SOCIAL BUTTONS */}
              <div className="flex gap-3 mb-8">
                <a 
                  href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} 
                  target="_blank" rel="noopener noreferrer" 
                  className="flex-1 bg-[#25D366]/20 text-[#25D366] py-4 rounded-xl font-bold border border-[#25D366]/30 hover:bg-[#25D366]/30 transition-colors"
                >
                  WhatsApp
                </a>
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Can you guess my secrets? Take my Never Have I Ever quiz!")}&url=${baseUrl}/nhie/${createdId}`} 
                  target="_blank" rel="noopener noreferrer" 
                  className="flex-1 bg-white/10 text-white py-4 rounded-xl font-bold border border-white/20 hover:bg-white/20 transition-colors"
                >
                  X (Twitter)
                </a>
              </div>

              <button onClick={() => window.location.href = `/nhie/${createdId}/results`} className="w-full bg-amber-500 text-amber-950 font-black py-4 rounded-xl hover:bg-amber-400 text-lg">
                Go to my Scoreboard 🏆
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}