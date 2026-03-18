"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PlayQuizClient({ quiz }) {
  // --- STATE ---
  const [playerName, setPlayerName] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); 
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  // Leaderboard state
  const [leaderboard, setLeaderboard] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  // --- HANDLERS ---
  const finishQuizAndSaveScore = async (finalScore) => {
    setIsFinished(true);
    setIsSaving(true);
    
    try {
      await fetch(`/api/quiz/${quiz._id}/score`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerName,
          score: finalScore,
          totalQuestions: quiz.questions.length
        })
      });

      const res = await fetch(`/api/quiz/${quiz._id}/score`);
      const data = await res.json();
      if (data.success) {
        setLeaderboard(data.scores);
      }
    } catch (error) {
      console.error("Failed to update leaderboard", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAnswer = (selectedOptionIndex) => {
    let currentScore = score;
    
    // FIX: Safely grab the correct answer from the DB and force both to be Numbers.
    // This prevents the bug where ("1" === 1) evaluates to false.
    const dbCorrectAnswer = quiz.questions[currentStep].correctAnswer;
    const correctIndex = dbCorrectAnswer !== undefined ? Number(dbCorrectAnswer) : 0;
    const selectedIndex = Number(selectedOptionIndex);

    // If they match, increase the score!
    if (selectedIndex === correctIndex) {
      currentScore += 1;
      setScore(currentScore);
    }

    // Move to next question or finish quiz
    if (currentStep < quiz.questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      finishQuizAndSaveScore(currentScore);
    }
  };

  const slideVariants = {
    enter: { x: 100, opacity: 0 },
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: { zIndex: 0, x: -100, opacity: 0 },
  };

  return (
    <div className="min-h-screen bg-[#1a1b26] flex items-center justify-center p-4 font-sans text-white overflow-hidden py-10">
      <div className="w-full max-w-md relative">
        <AnimatePresence mode="wait">
          
          {/* WELCOME SCREEN */}
          {!hasStarted && !isFinished && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -50 }}
              className="bg-[#232433] rounded-3xl p-8 shadow-2xl border border-slate-700/50 text-center"
            >
              <h1 className="text-3xl font-black mb-4 leading-tight">
                {quiz.quizTitle || `How well do you know ${quiz.creatorName}?`}
              </h1>
              <p className="text-slate-400 mb-6">
                {quiz.creatorName} created this quiz from {quiz.location || "somewhere awesome"}. Let's see if you can get 10/10!
              </p>
              
              <div className="mb-8">
                <label className="text-sm text-slate-400 mb-2 block font-medium">
                  Enter your name to play:
                </label>
                <input
                  type="text"
                  placeholder="Your Name..."
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full bg-[#1a1b26] border border-slate-700 text-center text-white p-4 rounded-xl outline-none focus:border-emerald-400 transition-colors text-lg"
                />
              </div>

              <button
                onClick={() => setHasStarted(true)}
                disabled={!playerName.trim()}
                className="w-full bg-emerald-400 text-emerald-950 font-bold py-4 px-6 rounded-full hover:bg-emerald-300 transition-all shadow-[0_0_20px_rgba(52,211,153,0.4)] text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Start Quiz
              </button>
            </motion.div>
          )}

          {/* QUESTION SCREEN */}
          {hasStarted && !isFinished && (
            <motion.div
              key={`question-${currentStep}`}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className={`${quiz.questions[currentStep].bgColor} rounded-3xl p-6 shadow-2xl min-h-[400px] flex flex-col`}
            >
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-white/90 bg-black/20 px-3 py-1 rounded-full text-sm">
                  Question {currentStep + 1} of {quiz.questions.length}
                </span>
              </div>

              <h2 className="text-2xl font-bold mb-8 flex-grow">
                {quiz.questions[currentStep].question}
              </h2>

              <div className="space-y-3">
                {quiz.questions[currentStep].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="w-full text-left bg-black/20 hover:bg-black/40 border border-white/10 hover:border-white/50 text-white px-6 py-4 rounded-2xl transition-all font-medium text-lg"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* RESULTS & LEADERBOARD SCREEN */}
          {isFinished && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#232433] rounded-3xl p-8 shadow-2xl border border-slate-700/50 flex flex-col items-center"
            >
              <h2 className="text-3xl font-black mb-2 text-center">Quiz Complete!</h2>
              
              <div className="text-5xl font-black text-emerald-400 my-6 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]">
                {score} / {quiz.questions.length}
              </div>

              <p className="text-lg font-medium text-white mb-4 text-center">
                {score === quiz.questions.length ? "Flawless! You are certified besties. 🏆" : 
                 score >= (quiz.questions.length * 0.7) ? "Great job! You know them pretty well. 👏" : 
                 "Oof... you might need to text them more often. 😬"}
              </p>

              {/* LEADERBOARD UI */}
              <div className="w-full mt-4 mb-8 border-t border-slate-700 pt-6">
                <h3 className="text-xl font-bold mb-4 text-center text-slate-200">🏆 Leaderboard</h3>
                
                {isSaving ? (
                  <div className="text-center text-slate-400 animate-pulse">Calculating scores...</div>
                ) : (
                  <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                    {leaderboard.map((entry, idx) => (
                      <div 
                        key={idx} 
                        className={`flex justify-between items-center p-3 rounded-xl ${
                          entry.playerName === playerName ? "bg-emerald-500/20 border border-emerald-500/50" : "bg-slate-800"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-slate-400 font-bold w-4">{idx + 1}.</span>
                          <span className="font-medium text-white">{entry.playerName}</span>
                        </div>
                        <span className="font-bold text-emerald-400">{entry.score} pts</span>
                      </div>
                    ))}
                    {leaderboard.length === 0 && <p className="text-center text-slate-400">No scores yet!</p>}
                  </div>
                )}
              </div>

              <button
                onClick={() => window.location.href = "/"}
                className="w-full bg-white text-black font-bold py-4 px-6 rounded-full hover:bg-slate-200 transition-colors shadow-lg mt-auto"
              >
                Create Your Own Quiz
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}