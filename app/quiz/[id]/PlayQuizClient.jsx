"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Helper function for the chat score color
const getScoreColor = (percentage) => {
  if (percentage >= 80) return "text-emerald-600";
  if (percentage >= 50) return "text-amber-500";
  return "text-rose-500";
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
    localStorage.setItem(
      `played_quiz_${quiz._id}`,
      JSON.stringify({
        score: finalScore,
        playerName: playerName,
      })
    );

    try {
      // 1. Post the score to the DB
      await fetch(`/api/quiz/${quiz._id}/score`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerName,
          score: finalScore,
          totalQuestions: quiz.questions.length,
          selectedAnswers: finalSelections,
        }),
      });

      // ⏱️ Add a tiny delay to let MongoDB finish writing the score
      await new Promise((resolve) => setTimeout(resolve, 500));

      // 2. Fetch the updated leaderboard
      const res = await fetch(`/api/quiz/${quiz._id}/score`);
      const data = await res.json();

      let fetchedLeaderboard = extractScores(data);

      // 🛡️ ULTIMATE FALLBACK: If MongoDB lagged and missed the new score, inject it locally instantly!
      if (!fetchedLeaderboard.find((entry) => entry.playerName === playerName)) {
        fetchedLeaderboard.push({ playerName, score: finalScore });
        // Sort it so the highest scores are at the top
        fetchedLeaderboard.sort((a, b) => b.score - a.score);
      }

      setLeaderboard(fetchedLeaderboard);
    } catch (error) {
      console.error("Failed to update leaderboard", error);
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

  // Chat sequence animations
  const chatContainer = {
    hidden: { opacity: 1 },
    visible: {
      transition: {
        staggerChildren: 1.2, // Time between each chat bubble popping up
      },
    },
  };

  const chatBubble = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { type: "spring", bounce: 0.4 } 
    },
  };

  if (isCheckingDevice) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  const percentage = Math.round((score / quiz.questions.length) * 100);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-800 overflow-hidden py-10 selection:bg-emerald-200">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-emerald-500/10 blur-[120px] pointer-events-none z-0" />

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
              className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-slate-200 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-32 bg-emerald-500/10 blur-[80px] pointer-events-none" />

              <div className="w-16 h-16 mx-auto bg-slate-100 border border-slate-200 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm">
                🕵️‍♂️
              </div>

              <h1 className="text-3xl font-black mb-4 leading-tight text-slate-800">
                {quiz.quizTitle || `How well do you know ${quiz.creatorName}?`}
              </h1>

              <p className="text-slate-500 mb-8 font-medium">
                <span className="text-emerald-600 font-bold">{quiz.creatorName}</span>{" "}
                created this quiz. Let's see if you can get 10/10!
              </p>

              <div className="mb-8 relative group">
                <label className="text-xs text-emerald-600 uppercase tracking-widest font-bold mb-2 block text-left ml-2">
                  Enter your name to play
                </label>
                <input
                  type="text"
                  placeholder="E.g. Alex..."
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && playerName.trim() && setHasStarted(true)
                  }
                  className="relative w-full bg-slate-100 border border-slate-200 text-slate-800 p-4 rounded-2xl outline-none focus:border-emerald-500 transition-colors text-lg shadow-inner placeholder:text-slate-400"
                />
              </div>

              <button
                onClick={() => setHasStarted(true)}
                disabled={!playerName.trim()}
                className="w-full bg-emerald-500 text-white font-black py-4 px-6 rounded-2xl hover:bg-emerald-600 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_20px_rgba(16,185,129,0.2)] text-lg disabled:opacity-50 disabled:scale-100 disabled:shadow-none"
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
              className={`bg-white rounded-[2.5rem] p-6 md:p-10 shadow-2xl min-h-[450px] flex flex-col border border-slate-200 relative overflow-hidden`}
            >
              <div className="absolute top-0 left-0 h-1.5 bg-slate-100 w-full">
                <motion.div
                  initial={{ width: `${(currentStep / quiz.questions.length) * 100}%` }}
                  animate={{
                    width: `${((currentStep + 1) / quiz.questions.length) * 100}%`,
                  }}
                  className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                />
              </div>

              <div className="flex justify-between items-center mb-6 mt-2">
                <span className="font-bold text-slate-500 bg-slate-100 border border-slate-200 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest">
                  Question {currentStep + 1} of {quiz.questions.length}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-black mb-8 flex-grow text-slate-800 leading-snug">
                {quiz.questions[currentStep].question}
              </h2>

              <div className="space-y-3 relative z-10">
                {quiz.questions[currentStep].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="w-full text-left bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-800 px-6 py-4 rounded-2xl transition-all duration-200 font-bold text-lg active:scale-[0.98] group flex items-center justify-between"
                  >
                    <span>{option}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xl">
                      👈
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* CHAT RESULTS & LEADERBOARD SCREEN */}
          {isFinished && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-8 shadow-2xl border border-slate-200 flex flex-col relative overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xl shadow-sm">
                  🤖
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-800">Quiz Master</h2>
                  <p className="text-xs text-emerald-500 font-bold">Online</p>
                </div>
              </div>

              {/* CHAT SEQUENCE */}
              <motion.div
                variants={chatContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-4 w-full mb-6"
              >
                {/* System Message 1 */}
                <motion.div variants={chatBubble} className="self-start max-w-[85%] bg-slate-100 text-slate-700 px-5 py-3 rounded-2xl rounded-tl-sm shadow-sm text-sm md:text-base font-medium">
                  Analyzing your answers... 🧐
                </motion.div>

                {/* System Message 2 */}
                <motion.div variants={chatBubble} className="self-start max-w-[85%] bg-slate-100 text-slate-700 px-5 py-3 rounded-2xl rounded-tl-sm shadow-sm text-sm md:text-base font-medium">
                  Calculating friendship levels with {quiz.creatorName}... 🧮
                </motion.div>

                {/* Score Message (Outgoing/Right Side) */}
                <motion.div variants={chatBubble} className="self-end max-w-[85%] bg-emerald-500 text-white px-5 py-4 rounded-2xl rounded-tr-sm shadow-md">
                  <p className="text-sm opacity-90 mb-1">Final Score:</p>
                  <p className="text-3xl font-black">
                    {score} <span className="text-lg opacity-75">/ {quiz.questions.length}</span> ✨
                  </p>
                </motion.div>

                {/* Verdict Message */}
                <motion.div variants={chatBubble} className="self-start max-w-[85%] bg-emerald-50 text-emerald-800 border border-emerald-100 px-5 py-3 rounded-2xl rounded-tl-sm shadow-sm font-bold">
                  {getResultMessage(percentage)}
                </motion.div>

                {/* Leaderboard Reveal */}
                <motion.div variants={chatBubble} className="w-full mt-4 bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-sm">
                  <h3 className="text-sm font-bold mb-3 text-center text-slate-500 uppercase tracking-widest">
                    🏆 Live Leaderboard
                  </h3>
                  
                  {isSaving ? (
                    <div className="flex flex-col items-center justify-center py-4 gap-2">
                      <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                      <div className="text-xs text-slate-400 font-bold uppercase tracking-widest animate-pulse">Syncing...</div>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                      {leaderboard.map((entry, idx) => (
                        <div
                          key={idx}
                          className={`flex justify-between items-center p-3 rounded-xl border ${
                            entry.playerName === playerName
                              ? "bg-emerald-50 border-emerald-200 shadow-sm"
                              : "bg-white border-slate-100"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`font-black text-sm ${idx === 0 ? "text-amber-500" : "text-slate-400"}`}>
                              {idx + 1}.
                            </span>
                            <span className={`font-bold ${entry.playerName === playerName ? "text-emerald-700" : "text-slate-700"}`}>
                              {entry.playerName}
                            </span>
                          </div>
                          <span className={`font-black text-sm ${entry.playerName === playerName ? "text-emerald-600" : "text-slate-500"}`}>
                            {entry.score} pts
                          </span>
                        </div>
                      ))}
                      {leaderboard.length === 0 && (
                        <p className="text-center text-slate-500 text-sm py-2">No scores recorded yet!</p>
                      )}
                    </div>
                  )}
                </motion.div>

                <motion.div variants={chatBubble} className="w-full pt-2">
                  <Link
                    href="/create"
                    className="block w-full bg-slate-800 text-white font-black text-base py-4 px-6 rounded-2xl text-center hover:bg-slate-700 hover:scale-[1.02] transition-all shadow-lg active:scale-95"
                  >
                    Create Your Own Quiz 🚀
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}