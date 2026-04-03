"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Helper function for the circular score color
const getScoreColor = (percentage) => {
  if (percentage >= 80) return "text-emerald-400";
  if (percentage >= 50) return "text-amber-400";
  return "text-rose-400";
};

// Helper for the final message
const getResultMessage = (percentage) => {
  if (percentage === 100) return "Flawless! You are certified besties. 🏆";
  if (percentage >= 80) return "Amazing! You know them so well. 🔥";
  if (percentage >= 60) return "Not bad! A solid friend. ✨";
  if (percentage >= 40) return "Could be better. Acquaintance level. 👍";
  return "Yikes... do you even talk? 😬";
};

// --- SAFE PARSER FOR API RESPONSES ---
const extractScores = (data) => {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.scores)) return data.scores;
  if (data && Array.isArray(data.data)) return data.data;
  return [];
};

export default function PlayQuizClient({ quiz }) {
  // --- STATE ---
  const [playerName, setPlayerName] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); 
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isCheckingDevice, setIsCheckingDevice] = useState(true); 
  
  const [userSelections, setUserSelections] = useState([]); 
  const [leaderboard, setLeaderboard] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  // --- 1. CHECK IF USER ALREADY TOOK THIS QUIZ ---
  useEffect(() => {
    const checkPreviousAttempt = async () => {
      const savedQuizData = localStorage.getItem(`played_quiz_${quiz._id}`);
      
      if (savedQuizData) {
        const parsedData = JSON.parse(savedQuizData);
        setPlayerName(parsedData.playerName);
        setScore(parsedData.score);
        setHasStarted(true);
        setIsFinished(true);

        try {
          // 🚨 FIX: Updated to fetch from the correct score route!
          const res = await fetch(`/api/quiz/${quiz._id}/score`);
          const data = await res.json();
          setLeaderboard(extractScores(data)); 
        } catch (error) {
          console.error("Failed to fetch leaderboard", error);
        }
      }
      setIsCheckingDevice(false);
    };

    checkPreviousAttempt();
  }, [quiz._id]);

  // --- HANDLERS ---
  const finishQuizAndSaveScore = async (finalScore, finalSelections) => {
    setIsFinished(true);
    setIsSaving(true);

    // 🔒 LOCK THE DEVICE
    localStorage.setItem(`played_quiz_${quiz._id}`, JSON.stringify({
      score: finalScore,
      playerName: playerName
    }));
    
    try {
      // 1. Post the score to the DB
      await fetch(`/api/quiz/${quiz._id}/score`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerName,
          score: finalScore,
          totalQuestions: quiz.questions.length,
          selectedAnswers: finalSelections
        })
      });

      // ⏱️ Add a tiny delay to let MongoDB finish writing the score
      await new Promise((resolve) => setTimeout(resolve, 500));

      // 2. Fetch the updated leaderboard
      // 🚨 FIX: Updated to fetch from the correct score route!
      const res = await fetch(`/api/quiz/${quiz._id}/score`);
      const data = await res.json();
      
      let fetchedLeaderboard = extractScores(data);

      // 🛡️ ULTIMATE FALLBACK: If MongoDB lagged and missed the new score, inject it locally instantly!
      if (!fetchedLeaderboard.find(entry => entry.playerName === playerName)) {
        fetchedLeaderboard.push({ playerName, score: finalScore });
        // Sort it so the highest scores are at the top
        fetchedLeaderboard.sort((a, b) => b.score - a.score);
      }

      setLeaderboard(fetchedLeaderboard);

    } catch (error) {
      console.error("Failed to update leaderboard", error);
      // Fallback if API completely fails
      setLeaderboard([{ playerName, score: finalScore }]);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAnswer = (selectedOptionIndex) => {
    let currentScore = score;
    
    const dbCorrectAnswer = quiz.questions[currentStep].correctAnswer;
    const correctIndex = dbCorrectAnswer !== undefined ? Number(dbCorrectAnswer) : 0;
    const selectedIndex = Number(selectedOptionIndex);

    const updatedSelections = [...userSelections, selectedIndex];
    setUserSelections(updatedSelections);

    if (selectedIndex === correctIndex) {
      currentScore += 1;
      setScore(currentScore);
    }

    if (currentStep < quiz.questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      finishQuizAndSaveScore(currentScore, updatedSelections);
    }
  };

  // --- ANIMATIONS ---
  const slideVariants = {
    enter: { x: 50, opacity: 0, scale: 0.95 },
    center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
    exit: { zIndex: 0, x: -50, opacity: 0, scale: 0.95 },
  };

  if (isCheckingDevice) {
    return (
      <div className="min-h-screen bg-[#0f111a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  const percentage = Math.round((score / quiz.questions.length) * 100);
  const scoreColor = getScoreColor(percentage);
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="min-h-screen bg-[#0f111a] flex items-center justify-center p-4 font-sans text-white overflow-hidden py-10 selection:bg-emerald-500/30">
      
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-emerald-500/5 blur-[120px] pointer-events-none z-0" />

      <div className="w-full max-w-md relative z-10">
        <AnimatePresence mode="wait">
          
          {/* WELCOME SCREEN */}
          {!hasStarted && !isFinished && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="bg-[#13151f]/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-white/10 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-32 bg-emerald-500/10 blur-[80px] pointer-events-none" />

              <div className="w-16 h-16 mx-auto bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner">
                🕵️‍♂️
              </div>

              <h1 className="text-3xl font-black mb-4 leading-tight bg-gradient-to-r from-white via-emerald-100 to-emerald-300 bg-clip-text text-transparent">
                {quiz.quizTitle || `How well do you know ${quiz.creatorName}?`}
              </h1>
              
              <p className="text-slate-400 mb-8 font-medium">
                <span className="text-emerald-400 font-bold">{quiz.creatorName}</span> created this quiz. Let's see if you can get 10/10!
              </p>
              
              <div className="mb-8 relative group">
                <label className="text-xs text-emerald-400 uppercase tracking-widest font-bold mb-2 block text-left ml-2">
                  Enter your name to play
                </label>
                <div className="absolute -inset-1 bg-emerald-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
                <input
                  type="text"
                  placeholder="E.g. Alex..."
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && playerName.trim() && setHasStarted(true)}
                  className="relative w-full bg-black/40 border border-white/10 text-white p-4 rounded-2xl outline-none focus:border-emerald-500/50 transition-colors text-lg shadow-inner placeholder:text-slate-600"
                />
              </div>

              <button
                onClick={() => setHasStarted(true)}
                disabled={!playerName.trim()}
                className="w-full bg-emerald-500 text-emerald-950 font-black py-4 px-6 rounded-2xl hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] text-lg disabled:opacity-50 disabled:scale-100 disabled:shadow-none"
              >
                Start Quiz 🚀
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
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`${quiz.questions[currentStep].bgColor || 'bg-slate-900'} rounded-[2.5rem] p-6 md:p-10 shadow-2xl min-h-[450px] flex flex-col border border-white/10 backdrop-blur-xl relative overflow-hidden`}
            >
              <div className="absolute top-0 left-0 h-1.5 bg-white/20 w-full">
                <motion.div 
                  initial={{ width: `${((currentStep) / quiz.questions.length) * 100}%` }}
                  animate={{ width: `${((currentStep + 1) / quiz.questions.length) * 100}%` }}
                  className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]" 
                />
              </div>

              <div className="flex justify-between items-center mb-6 mt-2">
                <span className="font-bold text-white/80 bg-black/20 border border-white/5 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest">
                  Question {currentStep + 1} of {quiz.questions.length}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-black mb-8 flex-grow text-white leading-snug">
                {quiz.questions[currentStep].question}
              </h2>

              <div className="space-y-3 relative z-10">
                {quiz.questions[currentStep].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="w-full text-left bg-black/30 hover:bg-white/10 border border-transparent hover:border-white/30 text-white px-6 py-4 rounded-2xl transition-all duration-200 font-bold text-lg active:scale-[0.98] group flex items-center justify-between"
                  >
                    <span>{option}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xl">👈</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* RESULTS & LEADERBOARD SCREEN */}
          {isFinished && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-[#13151f]/80 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-10 shadow-2xl border border-white/10 flex flex-col items-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-40 bg-emerald-500/10 blur-[100px] pointer-events-none" />

              <h2 className="text-3xl font-black mb-6 text-center text-white relative z-10">Quiz Complete!</h2>
              
              <div className="relative w-40 h-40 flex items-center justify-center mb-6 z-10">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute text-2xl z-0"
                    initial={{ opacity: 0, scale: 0.5, x: "-50%", y: "-50%" }}
                    animate={{ 
                      opacity: [0, 1, 0], 
                      scale: [0.5, 1.5, 1],
                      x: `calc(-50% + ${Math.cos((i * 45) * (Math.PI / 180)) * 100}px)`,
                      y: `calc(-50% + ${Math.sin((i * 45) * (Math.PI / 180)) * 100}px)`
                    }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                    style={{ top: "50%", left: "50%" }}
                  >
                    ✨
                  </motion.div>
                ))}

                <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 140 140">
                  <circle cx="70" cy="70" r={radius} stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                  <motion.circle 
                    cx="70" cy="70" r={radius} 
                    stroke="currentColor" 
                    strokeWidth="12" 
                    fill="transparent" 
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                    className={scoreColor}
                  />
                </svg>

                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", delay: 1 }}
                  className="absolute inset-0 flex items-center justify-center flex-col z-20"
                >
                  <p className={`text-4xl font-black ${scoreColor} drop-shadow-md tracking-tighter`}>
                    {score} <span className={`text-2xl ${scoreColor} opacity-50`}>/ {quiz.questions.length}</span>
                  </p>
                </motion.div>
              </div>

              <p className="text-lg font-bold text-white mb-6 text-center relative z-10">
                {getResultMessage(percentage)}
              </p>

              {/* LEADERBOARD UI */}
              <div className="w-full mt-2 mb-8 border-t border-white/10 pt-6 relative z-10">
                <h3 className="text-lg font-bold mb-4 text-center text-slate-300 uppercase tracking-widest text-xs">
                  🏆 Live Leaderboard
                </h3>
                
                {isSaving ? (
                  <div className="flex flex-col items-center justify-center py-6 gap-3">
                    <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-widest animate-pulse">Calculating...</div>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                    {leaderboard.map((entry, idx) => (
                      <div 
                        key={idx} 
                        className={`flex justify-between items-center p-3 rounded-2xl border ${
                          entry.playerName === playerName 
                            ? "bg-emerald-900/30 border-emerald-500/50 shadow-inner" 
                            : "bg-black/30 border-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`font-black text-sm ${idx === 0 ? 'text-amber-400' : 'text-slate-500'}`}>
                            {idx + 1}.
                          </span>
                          <span className={`font-bold ${entry.playerName === playerName ? "text-emerald-50" : "text-white"}`}>
                            {entry.playerName}
                          </span>
                        </div>
                        <span className={`font-black ${entry.playerName === playerName ? "text-emerald-400" : "text-emerald-400/70"}`}>
                          {entry.score} pts
                        </span>
                      </div>
                    ))}
                    {leaderboard.length === 0 && <p className="text-center text-slate-500 text-sm">No scores recorded yet!</p>}
                  </div>
                )}
              </div>

              <Link
                href="/create"
                className="w-full bg-white text-black font-black text-lg py-4 px-6 rounded-2xl text-center hover:bg-slate-200 hover:scale-[1.02] transition-all shadow-xl mt-auto relative z-10 active:scale-95"
              >
                Create Your Own Quiz 🚀
              </Link>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}