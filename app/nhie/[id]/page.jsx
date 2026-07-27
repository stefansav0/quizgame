"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

import FloatingLayout from "@/components/FloatingLayout";
import InfoSection from "@/components/nhie/InfoSection"; 

export default function PlayNhie() {
  const { id } = useParams();
  const router = useRouter();
  const [game, setGame] = useState(null);
  const [friendName, setFriendName] = useState("");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finalScore, setFinalScore] = useState(null);

  // --- STRICT ONE-ATTEMPT-PER-QUIZ DEVICE VERIFICATION ---
  useEffect(() => {
    if (!id || id === "undefined") return;

    // Check if this specific device has already attempted this exact quiz ID
    const pastAttempt = localStorage.getItem(`nhie_attempt_${id}`);

    if (pastAttempt) {
      try {
        const parsedScore = JSON.parse(pastAttempt);
        setFinalScore(parsedScore);
        setStep("results"); // Instantly lock them to the results scoreboard card
      } catch (e) {
        console.error("Failed to parse local device score cache", e);
      }
    }

    // Run remote database check to verify the quiz still exists live
    fetch(`/api/nhie/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Game not found");
        }
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          setGame({ error: true });
        } else {
          setGame(data);
        }
      })
      .catch((err) => {
        console.error(err);
        setGame({ error: true }); // Gracefully flags the UI to trigger the "Quiz Not Found" page
      });
  }, [id]);

  // --- DYNAMIC NAME & PRONOUN REPLACEMENT ALGORITHM ---
  const formatPersonalizedQuestion = (statement, name) => {
    if (!statement) return "";
    
    // If it's a standard English "Never have I ever" statement:
    if (statement.toLowerCase().startsWith("never have i ever")) {
      // 1. Swap the prefix for the creator's name
      let formatted = statement.replace(/^Never have I ever /i, `Has ${name} ever `);
      
      // 2. Intelligently swap pronouns to third-person
      formatted = formatted.replace(/\bmy\b/gi, "their")
                           .replace(/\bme\b/gi, "them")
                           .replace(/\bmyself\b/gi, "themselves")
                           .replace(/\bI\b/gi, "they");
                           
      // 3. Swap the period for a question mark
      if (formatted.endsWith(".")) {
        formatted = formatted.slice(0, -1) + "?";
      }
      
      return formatted;
    }
    
    // Fallback for translated/non-standard statements
    return `Has ${name} done this: "${statement}"`;
  };

  const handleGuess = (guess) => {
    const newAnswers = [...answers, { questionId: game.questions[step - 1].id, guess }];
    setAnswers(newAnswers);
    
    if (step < game.questions.length) {
      setStep(step + 1);
    } else {
      submitGuesses(newAnswers);
    }
  };

  const submitGuesses = async (finalAnswers) => {
    setStep("loading");
    try {
      const res = await fetch(`/api/nhie/${id}/attempt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ friendName, answers: finalAnswers }),
      });
      const data = await res.json();
      
      // Save attempt directly onto the friend's device configuration to lock them out forever
      localStorage.setItem(`nhie_attempt_${id}`, JSON.stringify(data));
      
      setFinalScore(data);
      setStep("results");
    } catch (error) {
      console.error("Failed to submit score", error);
      alert("Submission error. Please check network connection and try again.");
      setStep(game.questions.length); 
    }
  };

  // 1. Core Data Retrieval Wrapper
  if (!game) {
    return (
      <FloatingLayout activeTheme="light">
        <div className="relative z-10 flex items-center justify-center text-emerald-600 font-black text-xl mt-20">
          Loading Challenge Details... 🔦
        </div>
      </FloatingLayout>
    );
  }

  // 2. ERROR STATE: ACTIVE IF DATABASE RECORD FAILS OR CREATOR CLICKS DELETE
  if (game.error) {
    return (
      <FloatingLayout activeTheme="light">
        <div className="w-full max-w-md relative z-10 mt-10 md:mt-20">
          <div className="bg-white/80 backdrop-blur-xl border border-slate-200 p-10 rounded-[2.5rem] text-center shadow-xl">
            <div className="text-7xl mb-6 drop-shadow-md">👻</div>
            <h2 className="text-3xl font-black text-rose-500 mb-4 tracking-tight">Quiz Not Found</h2>
            <p className="text-slate-500 font-medium mb-8 leading-relaxed">
              This challenge layout does not exist. It might have been permanently deleted by the creator.
            </p>
            <button 
              onClick={() => {
                window.location.href = "/nhie/create";
              }} 
              className="w-full bg-emerald-500 text-white font-black py-4 px-8 rounded-2xl text-xl hover:bg-emerald-600 transition-all shadow-[0_10px_20px_rgba(16,185,129,0.2)] active:scale-95"
            >
              Create Your Own Quiz
            </button>
          </div>
        </div>
      </FloatingLayout>
    );
  }

  // 3. Normal Execution Views
  return (
    <FloatingLayout activeTheme="light">
      <div className="w-full max-w-xl relative z-10 font-sans text-slate-900 selection:bg-emerald-200 mt-4 md:mt-10">
        
        {/* RUNS ONLY IF ZERO DEVICE HISTORIES ARE LOGGED */}
        {step === 0 && (
          <div className="bg-white/90 backdrop-blur-xl p-10 rounded-[2.5rem] text-center border border-slate-200 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
            <h1 className="text-3xl font-black mb-4 text-emerald-600 drop-shadow-sm">Expose {game.creatorName} 🕵️‍♀️</h1>
            <p className="text-slate-500 font-medium mb-8">Can you guess which of these wild things {game.creatorName} has actually done?</p>
            <input 
              type="text" placeholder="Enter your name..." value={friendName} onChange={(e) => setFriendName(e.target.value)}
              className="w-full bg-slate-50/80 backdrop-blur-sm border border-slate-200 px-5 py-4 rounded-2xl mb-6 text-slate-900 placeholder:text-slate-400 text-center outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-inner text-lg"
            />
            <button 
              onClick={() => setStep(1)} disabled={!friendName}
              className="w-full bg-emerald-500 text-white font-black py-4 rounded-2xl hover:bg-emerald-600 disabled:opacity-50 text-xl transition-all shadow-[0_10px_20px_rgba(16,185,129,0.2)] active:scale-95"
            >
              Start Interrogation 🔦
            </button>
          </div>
        )}

        {/* ACTIVE RUNNING CHALLENGE STEPS */}
        {step > 0 && typeof step === "number" && game.questions && (
          <motion.div 
            key={step} 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            className={`${game.questions[step - 1]?.bgColor || 'bg-slate-50'} p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-slate-200/50 backdrop-blur-xl relative overflow-hidden`}
          >
            {/* Progress Bar top */}
            <div className="absolute top-0 left-0 h-1.5 bg-white/50 w-full">
              <motion.div initial={{ width: `${((step - 1) / 10) * 100}%` }} animate={{ width: `${(step / 10) * 100}%` }} className="h-full bg-emerald-500 shadow-sm" />
            </div>

            <div className="mt-2 mb-6 text-center">
              <p className="font-bold text-slate-500 uppercase tracking-widest text-sm bg-white/50 inline-block px-4 py-1.5 rounded-full border border-slate-200/50 mx-auto w-fit shadow-sm">
                Question {step} / {game.questions.length}
              </p>
            </div>
            
            {/* 🔥 INJECTS THE SMART PERSONALIZED QUESTION HERE */}
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 text-center leading-tight mb-10 min-h-[120px] flex items-center justify-center drop-shadow-sm">
              {formatPersonalizedQuestion(game.questions[step - 1]?.statement, game.creatorName)}
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleGuess("I Have")} 
                className="bg-white/80 hover:bg-white backdrop-blur-md border border-slate-200 hover:border-emerald-200 text-slate-800 hover:text-emerald-700 font-black py-6 rounded-2xl text-xl transition-all active:scale-95 shadow-sm flex flex-col items-center gap-2 group"
              >
                <span className="text-3xl drop-shadow-sm group-hover:scale-110 transition-transform">🙋‍♀️</span>
                Yep, they did.
              </button>
              <button 
                onClick={() => handleGuess("Never")} 
                className="bg-white/80 hover:bg-white backdrop-blur-md border border-slate-200 hover:border-rose-200 text-slate-800 hover:text-rose-700 font-black py-6 rounded-2xl text-xl transition-all active:scale-95 shadow-sm flex flex-col items-center gap-2 group"
              >
                <span className="text-3xl drop-shadow-sm group-hover:scale-110 transition-transform">🙅‍♂️</span>
                No way.
              </button>
            </div>
          </motion.div>
        )}

        {step === "loading" && (
           <div className="text-center bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] border border-slate-200 shadow-xl font-black text-emerald-500 text-2xl animate-pulse">
             Calculating results...
           </div>
        )}

        {/* COMPLETED ATTEMPT DISPLAY (LOCKED IF HISTORIES DETECTED ABOVE) */}
        {step === "results" && finalScore && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-xl p-10 rounded-[2.5rem] text-center border border-slate-200 shadow-[0_10px_40px_rgba(0,0,0,0.08)] relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-40 bg-emerald-500/10 blur-[50px] pointer-events-none" />
            
            <div className="text-6xl mb-4 animate-bounce drop-shadow-md relative z-10">🏆</div>
            <h2 className="text-3xl md:text-4xl font-black mb-3 text-slate-900 relative z-10">
              You scored {finalScore.score} / {finalScore.total}
            </h2>
            <p className="text-slate-500 font-medium mb-8 text-lg relative z-10">
              {finalScore.score > 7 ? "You know all their dark secrets! 💀" : "You have no idea what they do in their free time. 🤡"}
            </p>
            
            <div className="p-4 bg-amber-50/80 backdrop-blur-sm border border-amber-200 text-xs rounded-xl font-bold tracking-wide uppercase text-amber-700 mb-8 relative z-10">
              🔒 Quiz Completed (1 Attempt Max Per Device)
            </div>

            <button 
              onClick={() => {
                window.location.href = "/nhie/create";
              }} 
              className="w-full bg-emerald-500 text-white font-black py-4 px-8 rounded-2xl text-xl hover:bg-emerald-600 transition-all active:scale-95 shadow-[0_10px_20px_rgba(16,185,129,0.2)] relative z-10"
            >
              Create Your Own Game
            </button>
          </motion.div>
        )}
      </div>

      {/* Include the dynamic info section here */}
      <InfoSection activeTheme="light" />
      
    </FloatingLayout>
  );
}