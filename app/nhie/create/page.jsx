"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { translateText } from "@/lib/translate";
import { BG_COLORS, generateNHIEBank } from "@/lib/constants";

import SetupForm from "@/components/nhie/SetupForm";
import QuestionEditor from "@/components/nhie/QuestionEditor";
import ShareScreen from "@/components/nhie/ShareScreen";
import QuestionBankModal from "@/components/nhie/QuestionBankModal";
import InfoSection from "@/components/nhie/InfoSection"; // <-- Added import
import FloatingLayout from "@/components/FloatingLayout";

export default function CreateNHIEChallenge() {
  const [activeTheme, setActiveTheme] = useState("light");
  
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdChallengeId, setCreatedChallengeId] = useState(null);

  const [userInfo, setUserInfo] = useState({ country: "", language: "", name: "" });
  const [questions, setQuestions] = useState([]);
  const [questionBank, setQuestionBank] = useState([]);
  const [showBankModal, setShowBankModal] = useState(false);

  useEffect(() => {
    const existingId = localStorage.getItem("nhie_challenge_id");
    if (existingId) {
      setCreatedChallengeId(existingId);
      setStep(11);
    } else {
      setStep(0);
    }
    setIsLoading(false);
  }, []);

  const handleStartSetup = async () => {
    try {
      setIsGenerating(true);
      const baseBank = generateNHIEBank();

      const translatedBank = await Promise.all(
        baseBank.map(async (q) => {
          try {
            return userInfo.language ? await translateText(q, userInfo.language) : q;
          } catch (e) {
            return q;
          }
        })
      );

      const shuffledBank = [...translatedBank].sort(() => 0.5 - Math.random());
      const selected10 = shuffledBank.slice(0, 10).map((q, index) => ({
        id: index + 1,
        statement: q,
        creatorAnswer: null,
        bgColor: BG_COLORS[index % BG_COLORS.length],
      }));

      setQuestionBank(translatedBank);
      setQuestions(selected10);
      setStep(1);
    } catch (error) {
      console.error(error);
      alert("Failed to generate questions. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveAndShare = async () => {
    setIsSubmitting(true);
    const payload = {
      creatorName: userInfo.name,
      location: userInfo.country,
      language: userInfo.language,
      quizTitle: `${userInfo.name}'s Never Have I Ever 👀`,
      questions: questions,
    };

    try {
      const res = await fetch("/api/nhie/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create quiz");

      const data = await res.json();
      const finalId = data.quizId || data.challengeId;

      setCreatedChallengeId(finalId);
      localStorage.setItem("nhie_challenge_id", finalId);
      setStep(11);
    } catch (error) {
      console.error(error);
      alert("Something went wrong creating the challenge.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteChallenge = async () => {
    if (!confirm("Are you sure? This will PERMANENTLY delete your quiz from the database and wipe your scoreboard.")) return;

    setIsDeleting(true);
    try {
      if (createdChallengeId) {
        await fetch(`/api/nhie/${createdChallengeId}`, { method: "DELETE" });
      }
    } catch (error) {
      console.error("Error deleting remote record:", error);
    } finally {
      localStorage.removeItem("nhie_challenge_id");
      setCreatedChallengeId(null);
      setUserInfo({ country: "", language: "", name: "" });
      setQuestions([]);
      setStep(0);
      setIsDeleting(false);
      alert("Your current quiz has been deleted. You can now build a brand new one!");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <FloatingLayout activeTheme={activeTheme}>
      {/* 1. Main Quiz Container (Removed the blocking white background) */}
      <div className="w-full max-w-xl relative flex-shrink-0 font-sans text-slate-900 selection:bg-emerald-200 z-20">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <SetupForm
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              isGenerating={isGenerating}
              handleStartSetup={handleStartSetup}
            />
          )}

          {step > 0 && step <= 10 && (
            <QuestionEditor
              step={step}
              setStep={setStep}
              questions={questions}
              setQuestions={setQuestions}
              setShowBankModal={setShowBankModal}
              handleSaveAndShare={handleSaveAndShare}
              isSubmitting={isSubmitting}
            />
          )}

          {step === 11 && (
            <ShareScreen
              createdChallengeId={createdChallengeId}
              handleDeleteChallenge={handleDeleteChallenge}
              isDeleting={isDeleting}
            />
          )}
        </AnimatePresence>
      </div>

      {/* 2. Info Section added specifically for this game */}
      <InfoSection activeTheme={activeTheme} />

      {/* 3. Modals */}
      <QuestionBankModal
        showBankModal={showBankModal}
        setShowBankModal={setShowBankModal}
        questionBank={questionBank}
        step={step}
        questions={questions}
        setQuestions={setQuestions}
      />
    </FloatingLayout>
  );
}