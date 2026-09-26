"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const extractScores = (data) => {
  const list = Array.isArray(data) ? data : Array.isArray(data?.scores) ? data.scores : Array.isArray(data?.data) ? data.data : [];
  return [...list]
    .filter((entry) => entry && typeof entry.playerName === "string" && Number.isFinite(Number(entry.score)))
    .sort((a, b) => Number(b.score) - Number(a.score) || new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
};

const getResultMessage = (percentage) => {
  if (percentage === 100) return "Wait, 100%?! You know me better than I know myself! 😊🤗";
  if (percentage >= 80) return "You really pay attention! We're definitely close. 🔥";
  if (percentage >= 60) return "Not bad! You know me pretty well. ✨";
  if (percentage >= 40) return "Nice effort! There are still a few things to discover. 🌼";
  return "Looks like we have plenty more to learn about each other! 💚";
};

export default function PlayQuizClient({ quiz }) {
  const reduceMotion = useReducedMotion();
  const questions = Array.isArray(quiz?.questions) ? quiz.questions : [];
  const quizId = quiz?._id ? String(quiz._id) : "";
  const creatorName = typeof quiz?.creatorName === "string" ? quiz.creatorName : "Your friend";
  const storageKey = `played_quiz_${quizId}`;

  const [playerName, setPlayerName] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isCheckingDevice, setIsCheckingDevice] = useState(true);
  const [userSelections, setUserSelections] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [leaderboardError, setLeaderboardError] = useState("");
  const [saveStatus, setSaveStatus] = useState("idle"); // idle | saving | saved | failed
  const [saveError, setSaveError] = useState("");
  const answerLocked = useRef(false);
  const submissionLocked = useRef(false);

  const loadLeaderboard = useCallback(async () => {
    if (!quizId) return;
    try {
      const response = await fetch(`/api/quiz/${encodeURIComponent(quizId)}/score`, { cache: "no-store" });
      if (!response.ok) throw new Error("Unable to load leaderboard");
      const data = await response.json();
      setLeaderboard(extractScores(data));
      setLeaderboardError("");
    } catch (error) {
      console.error("Leaderboard error:", error);
      setLeaderboardError("Leaderboard unavailable right now. Your saved score is unaffected.");
    }
  }, [quizId]);

  useEffect(() => {
    let active = true;
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        const attempt = JSON.parse(stored);
        if (
          typeof attempt?.playerName === "string" &&
          Number.isInteger(attempt?.score) &&
          attempt.score >= 0 &&
          attempt.score <= questions.length
        ) {
          setPlayerName(attempt.playerName);
          setScore(attempt.score);
          setHasStarted(true);
          setIsFinished(true);
          setSaveStatus("saved");
          loadLeaderboard();
        } else {
          window.localStorage.removeItem(storageKey);
        }
      }
    } catch (error) {
      console.warn("Could not restore saved attempt:", error);
      try { window.localStorage.removeItem(storageKey); } catch { /* storage may be disabled */ }
    } finally {
      if (active) setIsCheckingDevice(false);
    }
    return () => { active = false; };
  }, [storageKey, questions.length, loadLeaderboard]);

  const saveAttempt = async (finalSelections, finalScore) => {
    if (submissionLocked.current) return;
    submissionLocked.current = true;
    setSaveStatus("saving");
    setSaveError("");
    try {
      const response = await fetch(`/api/quiz/${encodeURIComponent(quizId)}/score`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerName: playerName.trim(),
          selectedAnswers: finalSelections,
          // Backward-compatible fields. The updated API must calculate its own score.
          score: finalScore,
          totalQuestions: questions.length,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.success !== true || !Number.isInteger(data.score)) {
        throw new Error(data.error || "Your score could not be saved. Please try again.");
      }
      setScore(data.score); // Trust the server's verified score, not the browser's estimate.
      setSaveStatus("saved");
      try {
        window.localStorage.setItem(storageKey, JSON.stringify({
          playerName: playerName.trim(),
          score: data.score,
          scoreId: data.scoreId || null,
        }));
      } catch (error) {
        console.warn("Score saved, but this browser could not remember the attempt:", error);
      }
      await loadLeaderboard();
    } catch (error) {
      console.error("Score submission error:", error);
      setSaveError(error.message || "Unable to save your score. Please try again.");
      setSaveStatus("failed");
    } finally {
      submissionLocked.current = false;
    }
  };

  const handleAnswer = (optionIndex) => {
    if (answerLocked.current || isFinished || currentStep >= questions.length) return;
    answerLocked.current = true; // Synchronous lock prevents rapid double-clicks.
    const question = questions[currentStep];
    const selectedIndex = Number(optionIndex);
    const nextSelections = [...userSelections, selectedIndex];
    const nextScore = score + (selectedIndex === Number(question.correctAnswer) ? 1 : 0);
    setUserSelections(nextSelections);
    setScore(nextScore);
    if (currentStep < questions.length - 1) {
      setCurrentStep((previous) => previous + 1);
      // Unlock after the next question is rendered, not while this question is active.
    } else {
      setIsFinished(true);
      // The server recalculates the score from selectedAnswers.
      void saveAttempt(nextSelections, nextScore);
    }
  };

  useEffect(() => {
    if (!isFinished) answerLocked.current = false;
  }, [currentStep, isFinished]);

  const percentage = questions.length ? Math.round((score / questions.length) * 100) : 0;
  const animation = reduceMotion ? { duration: 0 } : { duration: 0.3 };
  const slideVariants = {
    enter: reduceMotion ? { opacity: 1 } : { x: 35, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: reduceMotion ? { opacity: 1 } : { x: -35, opacity: 0 },
  };

  if (!quizId || questions.length === 0) {
    return <main className="min-h-screen bg-slate-50 p-6 flex items-center justify-center"><div className="max-w-md rounded-3xl border bg-white p-8 text-center"><h1 className="text-2xl font-black text-slate-900">Quiz unavailable</h1><p className="mt-3 text-slate-600">This quiz has no questions or could not be loaded.</p><Link className="mt-6 inline-block text-emerald-700 font-bold" href="/">Return home</Link></div></main>;
  }

  if (isCheckingDevice) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center" role="status" aria-label="Loading quiz"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500" /></div>;
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-10 font-sans text-slate-800 selection:bg-emerald-200">
      <div className="w-full max-w-md relative">
        <AnimatePresence mode="wait">
          {!hasStarted && !isFinished && (
            <motion.section key="welcome" initial={reduceMotion ? false : { opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={animation} className="bg-white rounded-[2rem] p-7 sm:p-9 shadow-xl border border-slate-200 text-center">
              <div className="w-16 h-16 mx-auto bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center text-3xl mb-6">🕵️‍♂️</div>
              <h1 className="text-3xl font-black mb-4 leading-tight">{quiz.quizTitle || `How well do you know ${creatorName}?`}</h1>
              <p className="text-slate-600 mb-8"><strong className="text-emerald-700">{creatorName}</strong> created this quiz. Can you get {questions.length}/{questions.length}?</p>
              <form onSubmit={(event) => { event.preventDefault(); if (playerName.trim() && playerName.trim().length <= 40) setHasStarted(true); }}>
                <label htmlFor="player-name" className="text-sm text-emerald-700 font-bold mb-2 block text-left">Your name</label>
                <input id="player-name" type="text" autoComplete="nickname" maxLength={40} required placeholder="E.g. Alex" value={playerName} onChange={(event) => setPlayerName(event.target.value)} className="w-full bg-slate-50 border border-slate-300 text-slate-900 p-4 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 text-lg" />
                <button type="submit" disabled={!playerName.trim()} className="mt-5 w-full bg-emerald-600 text-white font-black py-4 px-6 rounded-2xl hover:bg-emerald-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-600 disabled:opacity-50">Start Quiz 🚀</button>
              </form>
            </motion.section>
          )}

          {hasStarted && !isFinished && (
            <motion.section key={`question-${currentStep}`} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={animation} className="bg-white rounded-[2rem] p-6 sm:p-9 shadow-xl min-h-[420px] flex flex-col border border-slate-200 overflow-hidden">
              <div className="h-1.5 bg-slate-100 rounded-full mb-7 overflow-hidden" role="progressbar" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={currentStep + 1} aria-label="Quiz progress"><div className="h-full bg-emerald-500 transition-all" style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }} /></div>
              <p className="self-start font-bold text-slate-600 bg-slate-100 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest">Question {currentStep + 1} of {questions.length}</p>
              <h2 className="text-2xl sm:text-3xl font-black my-8 flex-grow leading-snug">{questions[currentStep].question}</h2>
              <div className="space-y-3">
                {questions[currentStep].options.map((option, index) => (
                  <button key={index} type="button" onClick={() => handleAnswer(index)} className="w-full text-left bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-400 text-slate-800 px-5 py-4 rounded-2xl transition-colors font-bold text-lg focus-visible:ring-2 focus-visible:ring-emerald-500">{option}</button>
                ))}
              </div>
            </motion.section>
          )}

          {isFinished && (
            <motion.section key="results" initial={reduceMotion ? false : { opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={animation} className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-xl border border-slate-200">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="w-11 h-11 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xl font-black uppercase">{creatorName.charAt(0)}</div>
                <div><h1 className="text-lg font-black">{creatorName}</h1><p className="text-xs text-slate-500">Quiz creator</p></div>
              </div>
              <div className="flex flex-col gap-4" aria-live="polite">
                <div className="self-start max-w-[85%] bg-slate-100 px-5 py-3 rounded-2xl rounded-tl-sm text-sm sm:text-base">Let's see your score, {playerName}... 👀</div>
                <div className="self-start max-w-[85%] bg-slate-100 px-5 py-3 rounded-2xl rounded-tl-sm text-sm sm:text-base">How well do you know me? 🤔</div>
                <div className="self-end max-w-[85%] bg-gradient-to-br from-emerald-600 to-teal-600 text-white px-6 py-5 rounded-3xl rounded-tr-sm shadow-lg">
                  <p className="text-sm font-bold opacity-90 mb-1 uppercase tracking-wider">{saveStatus === "saved" ? "Verified final score" : "Your score"}</p>
                  <p className="text-4xl font-black">{score} <span className="text-xl opacity-80">/ {questions.length}</span> ✨</p>
                </div>
                <div className="self-start max-w-[85%] bg-emerald-50 text-emerald-900 border border-emerald-100 px-5 py-3 rounded-2xl rounded-tl-sm font-bold">{getResultMessage(percentage)}</div>

                {saveStatus === "saving" && <p role="status" className="text-center text-emerald-700 font-semibold text-sm">Saving your score securely…</p>}
                {saveStatus === "failed" && (
                  <div role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-900">
                    <p className="font-semibold">Your score hasn't been saved yet.</p>
                    <p className="mt-1 text-sm">{saveError}</p>
                    <button type="button" onClick={() => saveAttempt(userSelections, score)} className="mt-3 rounded-xl bg-rose-700 px-5 py-2.5 text-white font-bold hover:bg-rose-800 focus-visible:ring-2 focus-visible:ring-rose-500">Retry saving</button>
                  </div>
                )}
                {saveStatus === "saved" && <p role="status" className="text-center text-emerald-700 font-semibold text-sm">✓ Score saved successfully</p>}

                <div className="w-full mt-2 bg-slate-50 border border-slate-200 rounded-3xl p-5">
                  <div className="flex items-center justify-between gap-2 mb-4"><h2 className="text-sm font-bold text-slate-600 uppercase tracking-wider">🏆 Leaderboard</h2><button type="button" onClick={loadLeaderboard} className="text-xs font-bold text-emerald-700 hover:underline focus-visible:ring-2 focus-visible:ring-emerald-500">Refresh</button></div>
                  {leaderboardError && <p className="text-sm text-amber-800 mb-3" role="status">{leaderboardError}</p>}
                  {saveStatus === "saving" ? <p className="text-center text-slate-500 text-sm py-5">Updating leaderboard…</p> : (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {leaderboard.map((entry, index) => (
                        <div key={entry._id || entry.id || `${entry.playerName}-${index}`} className="flex items-center justify-between gap-3 rounded-xl p-3 bg-white border border-slate-100">
                          <div className="flex items-center gap-3 min-w-0"><span className="font-black text-emerald-700 shrink-0">{index === 0 ? "👑" : `${index + 1}.`}</span><span className="font-semibold text-slate-800 truncate">{entry.playerName}</span></div>
                          <span className="font-black text-emerald-700 shrink-0">{entry.score} pts</span>
                        </div>
                      ))}
                      {leaderboard.length === 0 && <p className="text-center text-slate-500 text-sm py-4">No recorded scores to display yet.</p>}
                    </div>
                  )}
                </div>
                <Link href="/create" className="block w-full bg-slate-900 text-white font-black py-4 px-6 rounded-2xl text-center hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900">Create Your Own Quiz 🚀</Link>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
