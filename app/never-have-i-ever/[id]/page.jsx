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
      .then(res => res.json())
      .then(data => setGame(data));
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
    const res = await fetch(`/api/nhie/${id}/attempt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ friendName, answers: finalAnswers }),
    });
    const data = await res.json();
    setFinalScore(data);
    setStep("results");
  };

  if (!game) return <div className="min-h-screen bg-[#050510] flex items-center justify-center text-fuchsia-500 font-black">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#050510] flex items-center justify-center p-4 font-sans text-white">
      <div className="w-full max-w-xl">
        
        {step === 0 && (
          <div className="bg-[#110f1c] p-10 rounded-[2.5rem] text-center border border-fuchsia-500/20">
            <h1 className="text-3xl font-black mb-4 text-fuchsia-400">Expose {game.creatorName} 🕵️‍♀️</h1>
            <p className="text-slate-400 mb-8">Can you guess which of these wild things {game.creatorName} has actually done?</p>
            <input 
              type="text" placeholder="Your Name..." value={friendName} onChange={(e) => setFriendName(e.target.value)}
              className="w-full bg-black/40 border border-white/10 px-5 py-4 rounded-2xl mb-6 text-white text-center outline-none focus:border-fuchsia-500"
            />
            <button 
              onClick={() => setStep(1)} disabled={!friendName}
              className="w-full bg-fuchsia-500 text-fuchsia-950 font-black py-4 rounded-2xl hover:bg-fuchsia-400 disabled:opacity-50 text-xl"
            >
              Start Interrogation 🔦
            </button>
          </div>
        )}

        {step > 0 && typeof step === "number" && (
          <motion.div key={step} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className={`${game.questions[step - 1].bgColor} p-10 rounded-[2.5rem] shadow-2xl`}>
            <p className="text-center font-bold text-white/50 mb-6 uppercase">Did they do this? ({step}/{game.questions.length})</p>
            <h2 className="text-3xl font-black text-center mb-12 min-h-[120px] flex items-center justify-center">
              "{game.questions[step - 1].statement}"
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handleGuess("I Have")} className="bg-white/10 hover:bg-white/20 border border-white/20 font-black py-6 rounded-2xl text-xl backdrop-blur-sm">
                Yep, they did.
              </button>
              <button onClick={() => handleGuess("Never")} className="bg-black/20 hover:bg-black/30 border border-black/40 font-black py-6 rounded-2xl text-xl">
                No way.
              </button>
            </div>
          </motion.div>
        )}

        {step === "results" && (
          <div className="bg-[#110f1c] p-10 rounded-[2.5rem] text-center border border-amber-500/20">
            <div className="text-6xl mb-4">🎭</div>
            <h2 className="text-3xl font-black mb-2">You scored {finalScore.score} / {finalScore.total}</h2>
            <p className="text-slate-400 mb-8">
              {finalScore.score > 7 ? "You know all their dark secrets! 💀" : "You have no idea what they do in their free time. 🤡"}
            </p>
            <button onClick={() => router.push("/nhie/create")} className="bg-fuchsia-500 text-fuchsia-950 font-black py-4 px-8 rounded-2xl text-xl">
              Create Your Own Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
}