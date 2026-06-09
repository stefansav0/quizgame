"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function NhieDashboard() {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    fetch(`/api/nhie/${id}`)
      .then(res => res.json())
      .then(data => {
        data.attempts.sort((a, b) => b.score - a.score);
        setGame(data);
      });
  }, [id]);

  if (!game) return <div className="min-h-screen bg-[#050510] text-fuchsia-500 flex items-center justify-center font-black">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen bg-[#050510] p-4 text-white">
      <div className="max-w-2xl mx-auto pt-10">
        <h1 className="text-4xl md:text-5xl font-black mb-2 text-fuchsia-400 text-center">
          The Expose List 📜
        </h1>
        <p className="text-slate-400 mb-10 text-center text-lg">See who guessed {game.creatorName}'s secrets correctly.</p>

        <div className="bg-[#110f1c] rounded-[2rem] border border-fuchsia-500/20 overflow-hidden shadow-2xl">
          {game.attempts.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-4xl mb-4">👻</div>
              <div className="text-slate-400 font-bold text-lg">No one has taken your game yet. Share the link!</div>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {game.attempts.map((attempt, index) => (
                <div key={index} className="p-6 md:p-8 flex justify-between items-center hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center gap-5">
                    <span className="text-2xl font-black text-fuchsia-500/50">#{index + 1}</span>
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
      </div>
    </div>
  );
}