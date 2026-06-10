"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function NhieDashboard() {
  const { id } = useParams();
  const router = useRouter();
  
  const [game, setGame] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("players"); // 'players' or 'questions'

  useEffect(() => {
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
          const sortedAttempts = [...data.attempts].sort((a, b) => b.score - a.score);
          setGame({ ...data, attempts: sortedAttempts });
        }
      })
      .catch((err) => {
        console.error(err);
        setGame({ error: true });
      });
  }, [id]);

  const toggleRow = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Helper function to calculate stats for a specific question
  const getQuestionStats = (statement) => {
    let correct = 0;
    let wrong = 0;
    
    game.attempts.forEach(attempt => {
      // Safely check if detailedResults exist (in case of old data)
      const guessData = attempt.detailedResults?.find(d => d.statement === statement);
      if (guessData) {
        if (guessData.isCorrect) correct++;
        else wrong++;
      }
    });

    const total = correct + wrong;
    const correctPercentage = total > 0 ? Math.round((correct / total) * 100) : 0;
    const wrongPercentage = total > 0 ? Math.round((wrong / total) * 100) : 0;

    return { correct, wrong, total, correctPercentage, wrongPercentage };
  };

  if (!game) {
    return (
      <div className="min-h-screen bg-[#050510] text-fuchsia-500 flex items-center justify-center font-black text-xl">
        Loading Analytics... 📊
      </div>
    );
  }

  if (game.error) {
    return (
      <div className="min-h-screen bg-[#050510] flex flex-col items-center justify-center p-4 font-sans text-white text-center">
        <div className="text-7xl mb-6">📊</div>
        <h2 className="text-3xl font-black text-rose-500 mb-4">Dashboard Not Found</h2>
        <p className="text-slate-400 mb-8 max-w-md">
          We couldn't load the scoreboard. The quiz may have been permanently deleted.
        </p>
        <button 
          onClick={() => {
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
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black mb-2 text-fuchsia-400 text-center tracking-tight">The Expose List 📜</h1>
        <p className="text-slate-400 mb-10 text-center text-lg">Detailed analytics for {game.creatorName}'s secrets.</p>

        {/* --- TABS NAVIGATION --- */}
        <div className="flex bg-white/5 p-1.5 rounded-2xl mb-8 max-w-sm mx-auto border border-white/10 shadow-lg">
          <button 
            onClick={() => setActiveTab("players")}
            className={`flex-1 py-3 font-bold text-sm uppercase tracking-widest rounded-xl transition-all ${activeTab === "players" ? "bg-fuchsia-500 text-fuchsia-950 shadow-md" : "text-slate-400 hover:text-white"}`}
          >
            Leaderboard
          </button>
          <button 
            onClick={() => setActiveTab("questions")}
            className={`flex-1 py-3 font-bold text-sm uppercase tracking-widest rounded-xl transition-all ${activeTab === "questions" ? "bg-amber-500 text-amber-950 shadow-md" : "text-slate-400 hover:text-white"}`}
          >
            Question Stats
          </button>
        </div>

        <div className="bg-[#110f1c] rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl mb-8 min-h-[400px]">
          
          {/* --- TAB 1: PLAYER LEADERBOARD --- */}
          {activeTab === "players" && (
            <div>
              {game.attempts.length === 0 ? (
                <div className="p-16 text-center">
                  <div className="text-5xl mb-4 animate-bounce">👻</div>
                  <div className="text-slate-400 font-bold text-lg">No one has taken your game yet.</div>
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {game.attempts.map((attempt, index) => (
                    <div key={index} className="flex flex-col">
                      {/* MAIN ROW */}
                      <div 
                        onClick={() => toggleRow(index)}
                        className="p-6 flex justify-between items-center hover:bg-white/[0.02] transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-5">
                          <span className={`text-2xl font-black ${index === 0 ? "text-amber-400" : index === 1 ? "text-slate-300" : index === 2 ? "text-amber-700" : "text-fuchsia-500/50"}`}>
                            #{index + 1}
                          </span>
                          <span className="text-xl font-bold group-hover:text-fuchsia-300 transition-colors">{attempt.friendName}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30 font-black px-5 py-2 rounded-xl text-lg">
                            {attempt.score} / {attempt.totalQuestions}
                          </div>
                          <span className={`text-slate-500 text-sm hidden sm:block transition-transform ${expandedIndex === index ? "rotate-180" : ""}`}>
                            ▼
                          </span>
                        </div>
                      </div>

                      {/* DROPDOWN - INDIVIDUAL DETAILS */}
                      <AnimatePresence>
                        {expandedIndex === index && attempt.detailedResults && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-black/40 border-t border-white/5"
                          >
                            <div className="p-6 space-y-4">
                              {attempt.detailedResults.map((detail, idx) => (
                                <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/5">
                                  <p className="text-sm text-slate-300 mb-3 font-medium">"{detail.statement}"</p>
                                  <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                                    <div className="flex items-center gap-2">
                                      <span className="text-slate-500 uppercase text-xs font-bold tracking-wider">Their Guess:</span>
                                      <span className={`font-bold px-3 py-1 rounded-md ${detail.guess === 'I Have' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-700/50 text-slate-300'}`}>
                                        {detail.guess}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2 font-black">
                                      {detail.isCorrect ? <span className="text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-md">✅ Correct</span> : <span className="text-rose-500 bg-rose-500/10 px-3 py-1 rounded-md">❌ Wrong</span>}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* --- TAB 2: QUESTION ANALYTICS --- */}
          {activeTab === "questions" && (
            <div className="p-6 space-y-6">
              {game.attempts.length === 0 ? (
                <div className="p-10 text-center text-slate-400 font-bold">
                  Wait for friends to play to see statistics!
                </div>
              ) : (
                game.questions.map((question, index) => {
                  const stats = getQuestionStats(question.statement);
                  
                  return (
                    <div key={index} className="bg-white/5 p-5 rounded-2xl border border-white/5">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <span className="text-amber-500/50 font-black text-xl">Q{index + 1}</span>
                        <p className="flex-1 font-bold text-white text-sm md:text-base leading-snug">"{question.statement}"</p>
                      </div>
                      
                      {stats.total === 0 ? (
                        <div className="text-xs text-slate-500 italic">No data recorded for this question yet.</div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                            <span className="text-emerald-400">{stats.correct} Correct ({stats.correctPercentage}%)</span>
                            <span className="text-rose-400">{stats.wrong} Wrong ({stats.wrongPercentage}%)</span>
                          </div>
                          
                          {/* Progress Bar Visualizer */}
                          <div className="w-full h-3 bg-rose-500/20 rounded-full overflow-hidden flex">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${stats.correctPercentage}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className="h-full bg-emerald-500"
                            />
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${stats.wrongPercentage}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className="h-full bg-rose-500"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
        
        <div className="text-center">
            <button 
              onClick={() => router.push("/nhie/create")} 
              className="text-fuchsia-400/70 hover:text-fuchsia-400 text-sm font-bold tracking-widest uppercase transition-colors"
            >
              ← Back to My Game Menu
            </button>
        </div>
      </div>
    </div>
  );
}