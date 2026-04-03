"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardList({ scores, totalQuestions }) {
  const [expandedId, setExpandedId] = useState(null);

  if (scores.length === 0) {
    return (
      <div className="text-center p-8 border-2 border-dashed border-slate-700 rounded-2xl">
        <p className="text-slate-400 mb-2 text-4xl">👻</p>
        <p className="text-slate-300 font-medium">No one has played yet!</p>
        <p className="text-sm text-slate-500 mt-1">Share your link to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
      {scores.map((entry, idx) => (
        <div 
          key={entry._id} 
          className="flex flex-col p-4 rounded-xl bg-[#1a1b26] border border-slate-700 hover:border-emerald-500/50 transition-colors"
        >
          {/* --- TOP ROW (Always Visible) --- */}
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${
                idx === 0 ? "bg-yellow-400 text-yellow-900 shadow-[0_0_15px_rgba(250,204,21,0.5)]" :
                idx === 1 ? "bg-slate-300 text-slate-800" :
                idx === 2 ? "bg-amber-600 text-amber-100" :
                "bg-slate-800 text-slate-400"
              }`}>
                {idx + 1}
              </div>
              <div>
                <span className="font-bold text-white block text-lg">{entry.playerName}</span>
                <span className="text-xs text-slate-500">
                  {new Date(entry.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <div className="text-right flex flex-col items-end gap-1">
              <span className="font-black text-xl text-emerald-400 block">
                {entry.score} <span className="text-sm text-emerald-600">pts</span>
              </span>
              
              {/* EXPLICIT VIEW ANSWERS BUTTON */}
              <button 
                onClick={() => setExpandedId(expandedId === entry._id ? null : entry._id)}
                className="text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors mt-1 border border-slate-600"
              >
                {expandedId === entry._id ? "Hide Answers ▲" : "View Answers ▼"}
              </button>
            </div>
          </div>

          {/* --- EXPANDED ROW (Only Visible When Clicked) --- */}
          <AnimatePresence>
            {expandedId === entry._id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden w-full"
              >
                <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-3">
                  {entry.answers && entry.answers.length > 0 ? (
                    entry.answers.map((ans, aIdx) => (
                      <div key={aIdx} className="bg-black/30 p-4 rounded-xl border border-white/5">
                        <p className="text-sm font-semibold text-white/90 mb-3 leading-snug">
                          {aIdx + 1}. {ans.question}
                        </p>
                        <div className="flex flex-col gap-2 text-sm">
                          
                          {/* What the player picked */}
                          <div className="flex items-start gap-2">
                            <span className="mt-0.5">{ans.isCorrect ? "✅" : "❌"}</span>
                            <span className={ans.isCorrect ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                              <span className="text-slate-500 font-normal mr-1">They picked:</span> 
                              {ans.selectedText}
                            </span>
                          </div>
                          
                          {/* If wrong, show correct answer */}
                          {!ans.isCorrect && (
                            <div className="flex items-start gap-2 ml-6">
                              <span className="text-emerald-400 font-bold">
                                <span className="text-slate-500 font-normal mr-1">Correct answer:</span> 
                                {ans.correctText}
                              </span>
                            </div>
                          )}
                          
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 bg-black/20 rounded-xl">
                      <p className="text-sm text-slate-400 italic">
                        Detailed answers were not recorded for this attempt.
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        (Only new quiz attempts will show detailed answers)
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}