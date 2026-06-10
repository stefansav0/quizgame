"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

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
      <div className="min-h-screen bg-[#050510] flex items-center justify-center text-fuchsia-500 font-black">
        Loading Challenge Details... 🔦
      </div>
    );
  }

  // 2. ERROR STATE: ACTIVE IF DATABASE RECORD FAILS OR CREATOR CLICKS DELETE
  if (game.error) {
    return (
      <div className="min-h-screen bg-[#050510] flex flex-col items-center justify-center p-4 font-sans text-white text-center">
        <div className="text-7xl mb-6">👻</div>
        <h2 className="text-3xl font-black text-rose-500 mb-4">Quiz Not Found</h2>
        <p className="text-slate-400 mb-8 max-w-md">
          This challenge layout does not exist. It might have been permanently deleted by the creator.
        </p>
        <button 
          onClick={() => {
            localStorage.removeItem('nhie_challenge_id'); // Clean active creation tokens if present
            window.location.href = "/nhie/create";
          }} 
          className="bg-fuchsia-500 text-fuchsia-950 font-black py-4 px-8 rounded-2xl text-xl hover:bg-fuchsia-400 transition-all shadow-[0_10px_30px_rgba(217,70,239,0.3)]"
        >
          Create Your Own Quiz
        </button>
      </div>
    );
  }

  // 3. Normal Execution Views
  return (
    <div className="min-h-screen bg-[#050510] flex items-center justify-center p-4 font-sans text-white">
      <div className="w-full max-w-xl">
        
        {/* RUNS ONLY IF ZERO DEVICE HISTORIES ARE LOGGED */}
        {step === 0 && (
          <div className="bg-[#110f1c] p-10 rounded-[2.5rem] text-center border border-fuchsia-500/20 shadow-2xl">
            <h1 className="text-3xl font-black mb-4 text-fuchsia-400">Expose {game.creatorName} 🕵️‍♀️</h1>
            <p className="text-slate-400 mb-8">Can you guess which of these wild things {game.creatorName} has actually done?</p>
            <input 
              type="text" placeholder="Enter your name..." value={friendName} onChange={(e) => setFriendName(e.target.value)}
              className="w-full bg-black/40 border border-white/10 px-5 py-4 rounded-2xl mb-6 text-white text-center outline-none focus:border-fuchsia-500 transition-all"
            />
            <button 
              onClick={() => setStep(1)} disabled={!friendName}
              className="w-full bg-fuchsia-500 text-fuchsia-950 font-black py-4 rounded-2xl hover:bg-fuchsia-400 disabled:opacity-50 text-xl transition-all"
            >
              Start Interrogation 🔦
            </button>
          </div>
        )}

        {/* ACTIVE RUNNING CHALLENGE STEPS */}
        {step > 0 && typeof step === "number" && game.questions && (
          <motion.div key={step} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className={`${game.questions[step - 1]?.bgColor || 'bg-fuchsia-950'} p-10 rounded-[2.5rem] shadow-2xl`}>
            <p className="text-center font-bold text-white/50 mb-6 uppercase">Question {step} / {game.questions.length}</p>
            
            {/* 🔥 INJECTS THE SMART PERSONALIZED QUESTION HERE */}
            <h2 className="text-3xl md:text-4xl font-black text-center leading-tight mb-12 min-h-[120px] flex items-center justify-center">
              {formatPersonalizedQuestion(game.questions[step - 1]?.statement, game.creatorName)}
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handleGuess("I Have")} className="bg-white/10 hover:bg-white/20 border border-white/20 font-black py-6 rounded-2xl text-xl backdrop-blur-sm transition-all active:scale-95">
                Yep, they did.
              </button>
              <button onClick={() => handleGuess("Never")} className="bg-black/20 hover:bg-black/30 border border-black/40 font-black py-6 rounded-2xl text-xl transition-all active:scale-95">
                No way.
              </button>
            </div>
          </motion.div>
        )}

        {step === "loading" && (
           <div className="text-center font-black text-fuchsia-500 text-2xl animate-pulse">
             Calculating results...
           </div>
        )}

        {/* COMPLETED ATTEMPT DISPLAY (LOCKED IF HISTORIES DETECTED ABOVE) */}
        {step === "results" && finalScore && (
          <div className="bg-[#110f1c] p-10 rounded-[2.5rem] text-center border border-amber-500/20 shadow-2xl">
            <div className="text-6xl mb-4 animate-bounce">🏆</div>
            <h2 className="text-3xl font-black mb-2">You scored {finalScore.score} / {finalScore.total}</h2>
            <p className="text-slate-400 mb-8">
              {finalScore.score > 7 ? "You know all their dark secrets! 💀" : "You have no idea what they do in their free time. 🤡"}
            </p>
            
            <div className="p-4 bg-fuchsia-950/20 border border-fuchsia-500/10 text-xs rounded-xl font-bold tracking-wide uppercase text-fuchsia-400 mb-6">
              🔒 Quiz Completed (1 Attempt Max Per Device)
            </div>

            <button 
              onClick={() => {
                localStorage.removeItem('nhie_challenge_id');
                window.location.href = "/nhie/create";
              }} 
              className="w-full bg-fuchsia-500 text-fuchsia-950 font-black py-4 px-8 rounded-2xl text-xl hover:bg-fuchsia-400 transition-all active:scale-95 shadow-[0_10px_25px_rgba(217,70,239,0.2)]"
            >
              Create Your Own Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
}