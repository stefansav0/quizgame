"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function NhieDashboard() {
  const { id } = useParams();
  const router = useRouter();
  const [game, setGame] = useState(null);

  useEffect(() => {
    // 🔥 Guard clause to prevent fetching if ID is missing during Next.js hydration
    if (!id || id === "undefined") return;

    fetch(`/api/nhie/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        return res.json();
      })
      .then((data) => {
        if (data.error || !data.attempts) {
          setGame({ error: true });
        } else {
          // Safe copying and sorting
          const sortedAttempts = [...data.attempts].sort((a, b) => b.score - a.score);
          setGame({ ...data, attempts: sortedAttempts });
        }
      })
      .catch((err) => {
        console.error(err);
        setGame({ error: true });
      });
  }, [id]);

  if (!game) {
    return (
      <div className="min-h-screen bg-[#050510] text-fuchsia-500 flex items-center justify-center font-black">
        Loading Dashboard...
      </div>
    );
  }

  // Prevents the "sort" crash if someone accesses a dead dashboard link
  if (game.error) {
    return (
      <div className="min-h-screen bg-[#050510] flex flex-col items-center justify-center p-4 font-sans text-white text-center">
        <div className="text-7xl mb-6">📊</div>
        <h2 className="text-3xl font-black text-rose-500 mb-4">Dashboard Not Found</h2>
        <p className="text-slate-400 mb-8 max-w-md">
          We couldn't load the scoreboard for this game ID. It may have been deleted.
        </p>
        <button 
          onClick={() => {
            // Clear local storage so they aren't trapped trying to view a deleted game
            localStorage.removeItem('nhie_challenge_id');
            router.push("/nhie/create");
          }} 
          className="bg-fuchsia-500 text-fuchsia-950 font-black py-4 px-8 rounded-2xl text-xl hover:bg-fuchsia-400 transition-colors shadow-[0_10px_30px_rgba(217,70,239,0.3)]"
        >
          Create New Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050510] p-4 text-white font-sans py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-black mb-2 text-fuchsia-400 text-center">The Expose List 📜</h1>
        <p className="text-slate-400 mb-10 text-center text-lg">See who guessed {game.creatorName}'s secrets correctly.</p>

        <div className="bg-[#110f1c] rounded-[2rem] border border-fuchsia-500/20 overflow-hidden shadow-2xl mb-8">
          {game.attempts.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-4xl mb-4">👻</div>
              <div className="text-slate-400 font-bold text-lg">No one has taken your game yet.</div>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {game.attempts.map((attempt, index) => (
                <div key={index} className="p-6 flex justify-between items-center hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center gap-5">
                    <span className={`text-2xl font-black ${index === 0 ? "text-amber-400" : index === 1 ? "text-slate-300" : index === 2 ? "text-amber-700" : "text-fuchsia-500/50"}`}>#{index + 1}</span>
                    <span className="text-xl font-bold">{attempt.friendName}</span>
                  </div>
                  <div className="bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30 font-black px-5 py-2 rounded-xl text-lg">
                    {attempt.score} / {attempt.totalQuestions}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Helper button to return to creation screen safely */}
         <div className="text-center">
            <button 
              onClick={() => router.push("/nhie/create")} 
              className="text-fuchsia-400/70 hover:text-fuchsia-400 text-sm font-bold tracking-widest uppercase transition-colors"
            >
              ← Back to My Game
            </button>
        </div>
      </div>
    </div>
  );
}