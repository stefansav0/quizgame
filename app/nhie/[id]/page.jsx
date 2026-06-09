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

  useEffect(() => {
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
        setGame({ error: true }); // This prevents the white-screen crash!
      });
  }, [id]);

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
      setFinalScore(data);
      setStep("results");
    } catch (error) {
      console.error("Failed to submit", error);
      alert("Failed to submit your answers. Please try again.");
      setStep(game.questions.length); // fallback safely
    }
  };

  // 1. Loading State
  if (!game) {
    return (
      <div className="min-h-screen bg-[#050510] flex items-center justify-center text-fuchsia-500 font-black">
        Loading...
      </div>
    );
  }

  // 2. Error State (Triggers on 404 / Invalid ID)
  if (game.error) {
    return (
      <div className="min-h-screen bg-[#050510] flex flex-col items-center justify-center p-4 font-sans text-white text-center">
        <div className="text-7xl mb-6">👻</div>
        <h2 className="text-3xl font-black text-rose-500 mb-4">Game Not Found</h2>
        <p className="text-slate-400 mb-8 max-w-md">
          This link is invalid or the creator deleted their game.
        </p>
        <button 
          onClick={() => {
            // Wipes the cached ghost ID so your dashboard/creation steps refresh
            localStorage.removeItem('nhie_challenge_id'); 
            window.location.href = "/nhie/create";
          }} 
          className="bg-fuchsia-500 text-fuchsia-950 font-black py-4 px-8 rounded-2xl text-xl hover:bg-fuchsia-400 transition-colors"
        >
          Create Your Own Game
        </button>
      </div>
    );
  }

  // 3. Normal Gameplay State
  return (
    <div className="min-h-screen bg-[#050510] flex items-center justify-center p-4 font-sans text-white">
      <div className="w-full max-w-xl">
        
        {step === 0 && (
          <div className="bg-[#110f1c] p-10 rounded-[2.5rem] text-center border border-fuchsia-500/20 shadow-2xl">
            <h1 className="text-3xl font-black mb-4 text-fuchsia-400">Expose {game.creatorName} 🕵️‍♀️</h1>
            <p className="text-slate-400 mb-8">Can you guess which of these wild things {game.creatorName} has actually done?</p>
            <input 
              type="text" placeholder="Your Name..." value={friendName} onChange={(e) => setFriendName(e.target.value)}
              className="w-full bg-black/40 border border-white/10 px-5 py-4 rounded-2xl mb-6 text-white text-center outline-none focus:border-fuchsia-500 transition-all"
            />
            <button 
              onClick={() => setStep(1)} disabled={!friendName}
              className="w-full bg-fuchsia-500 text-fuchsia-950 font-black py-4 rounded-2xl hover:bg-fuchsia-400 disabled:opacity-50 text-xl transition-all active:scale-95"
            >
              Start Interrogation 🔦
            </button>
          </div>
        )}

        {step > 0 && typeof step === "number" && game.questions && (
          <motion.div key={step} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className={`${game.questions[step - 1]?.bgColor || 'bg-fuchsia-950'} p-10 rounded-[2.5rem] shadow-2xl`}>
            <p className="text-center font-bold text-white/50 mb-6 uppercase">Did they do this? ({step}/{game.questions.length})</p>
            <h2 className="text-3xl font-black text-center mb-12 min-h-[120px] flex items-center justify-center">
              "{game.questions[step - 1]?.statement}"
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

        {step === "results" && finalScore && (
          <div className="bg-[#110f1c] p-10 rounded-[2.5rem] text-center border border-amber-500/20 shadow-2xl">
            <div className="text-6xl mb-4 animate-bounce">🎭</div>
            <h2 className="text-3xl font-black mb-2">You scored {finalScore.score} / {finalScore.total}</h2>
            <p className="text-slate-400 mb-8">
              {finalScore.score > 7 ? "You know all their dark secrets! 💀" : "You have no idea what they do in their free time. 🤡"}
            </p>
            <button 
              onClick={() => {
                localStorage.removeItem('nhie_challenge_id');
                window.location.href = "/nhie/create";
              }} 
              className="bg-fuchsia-500 text-fuchsia-950 font-black py-4 px-8 rounded-2xl text-xl hover:bg-fuchsia-400 transition-all active:scale-95"
            >
              Create Your Own Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
}