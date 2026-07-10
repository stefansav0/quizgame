"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { translateText } from "@/lib/translate";

import { BG_COLORS, COUNTRY_LANGUAGE_MAP, generateQuestionBank } from "@/lib/quizData";
import SetupStep from "@/components/SetupStep";
import QuestionStep from "@/components/QuestionStep";
import SuccessStep from "@/components/SuccessStep";
import QuestionBankModal from "@/components/QuestionBankModal";

export default function CreateQuiz() {
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [step, setStep] = useState(0); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdQuizId, setCreatedQuizId] = useState(null);
  const [copiedLink, setCopiedLink] = useState("");

  const [userInfo, setUserInfo] = useState({ country: "", language: "", name: "" });
  const availableLanguages = userInfo.country ? COUNTRY_LANGUAGE_MAP[userInfo.country] : [];

  const [questions, setQuestions] = useState([]);
  const [questionBank, setQuestionBank] = useState([]);
  const [showBankModal, setShowBankModal] = useState(false);

  useEffect(() => {
    const existingQuizId = localStorage.getItem('spicy_quiz_id');
    if (existingQuizId) {
      setCreatedQuizId(existingQuizId);
      setStep(11); 
    }
    setIsLoading(false);
  }, []);

  const handleStartQuizSetup = async () => {
    try {
      setIsGenerating(true);
      const baseBank = generateQuestionBank(userInfo.name, userInfo.language);

      const translatedBank = await Promise.all(
        baseBank.map(async (q) => {
          const translatedQuestion = await translateText(q.question, userInfo.language);
          const translatedOptions = await Promise.all(
            q.options.map(opt => translateText(opt, userInfo.language))
          );
          return { question: translatedQuestion, options: translatedOptions };
        })
      );

      const shuffledBank = [...translatedBank].sort(() => 0.5 - Math.random());
      const selected10 = shuffledBank.slice(0, 10).map((q, index) => ({
        id: index + 1,
        question: q.question,
        options: q.options,
        correctAnswer: 0,
        bgColor: BG_COLORS[index % BG_COLORS.length],
      }));

      setQuestionBank(translatedBank);
      setQuestions(selected10);
      setStep(1);

    } catch (error) {
      console.error("Error generating quiz:", error);
      alert("Failed to generate questions. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const swapQuestion = (bankQuestion) => {
    const newQuestions = [...questions];
    newQuestions[step - 1] = {
      ...newQuestions[step - 1],
      question: bankQuestion.question,
      options: bankQuestion.options,
      correctAnswer: 0
    };
    setQuestions(newQuestions);
    setShowBankModal(false);
  };

  const updateQuestion = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const updateOption = (qIndex, optIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[optIndex] = value;
    setQuestions(newQuestions);
  };

  const handleSaveAndShare = async () => {
    setIsSubmitting(true);
    const quizPayload = {
      creatorName: userInfo.name,
      location: userInfo.country,
      language: userInfo.language,
      quizTitle: `The Ultimate ${userInfo.name} Test 👀`,
      questions: questions,
    };

    try {
      const res = await fetch("/api/quiz/create", {
        method: "POST",
        body: JSON.stringify(quizPayload),
      });
      const data = await res.json();
      
      setCreatedQuizId(data.quizId);
      localStorage.setItem('spicy_quiz_id', data.quizId);
      setStep(11); 
    } catch (error) {
      console.error("Failed to create quiz", error);
      alert("Something went wrong creating the quiz.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteQuiz = async () => {
    if(!confirm("Are you sure you want to delete this quiz and start over? This cannot be undone.")) return;
    setIsDeleting(true);
    try {
      if (createdQuizId) {
        await fetch(`/api/quiz/${createdQuizId}`, { method: "DELETE" });
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
    } finally {
      localStorage.removeItem('spicy_quiz_id');
      setCreatedQuizId(null);
      setUserInfo({ country: "", language: "", name: "" });
      setStep(0);
      setIsDeleting(false);
    }
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(type);
    setTimeout(() => setCopiedLink(""), 2000);
  };

  const slideVariants = {
    enter: { x: 50, opacity: 0, scale: 0.95 },
    center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
    exit: { zIndex: 0, x: -50, opacity: 0, scale: 0.95 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 25 } },
    exit: { opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }
  };

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center p-4 font-sans text-white overflow-hidden py-10 selection:bg-emerald-500/30">
      <div className="w-full max-w-xl relative">
        <AnimatePresence mode="wait">
          
          {step === 0 && (
            <motion.div
              key="step-0"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-[#13151f]/90 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_50px_rgba(16,185,129,0.1)] border border-emerald-500/20 relative overflow-hidden"
            >
              <SetupStep 
                userInfo={userInfo}
                handleNameChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                handleCountryChange={(e) => setUserInfo({ ...userInfo, country: e.target.value, language: "" })}
                handleLanguageChange={(e) => setUserInfo({ ...userInfo, language: e.target.value })}
                handleStartQuizSetup={handleStartQuizSetup}
                isGenerating={isGenerating}
                availableLanguages={availableLanguages}
                COUNTRY_LANGUAGE_MAP={COUNTRY_LANGUAGE_MAP}
              />
            </motion.div>
          )}

          {step > 0 && step <= 10 && (
            <motion.div
              key={`step-${step}`}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`${questions[step - 1].bgColor} rounded-[2.5rem] p-6 md:p-10 shadow-2xl transition-colors duration-700 border border-white/10 backdrop-blur-xl relative overflow-hidden`}
            >
              <QuestionStep 
                step={step}
                currentQuestion={questions[step - 1]}
                handlePrev={() => setStep((prev) => Math.max(prev - 1, 0))}
                handleNext={() => setStep((prev) => Math.min(prev + 1, 10))}
                updateQuestion={updateQuestion}
                updateOption={updateOption}
                setShowBankModal={setShowBankModal}
                handleSaveAndShare={handleSaveAndShare}
                isSubmitting={isSubmitting}
              />
            </motion.div>
          )}

          {step === 11 && (
            <motion.div
              key="step-11"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-[#13151f]/90 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_50px_rgba(16,185,129,0.1)] border border-emerald-500/30 text-center relative overflow-hidden flex flex-col items-center"
            >
              <SuccessStep 
                createdQuizId={createdQuizId}
                handleDeleteQuiz={handleDeleteQuiz}
                isDeleting={isDeleting}
                baseUrl={baseUrl}
                copyToClipboard={copyToClipboard}
                copiedLink={copiedLink}
              />
            </motion.div>
          )}

        </AnimatePresence>

        <AnimatePresence>
          {showBankModal && (
            <QuestionBankModal 
              questionBank={questionBank}
              swapQuestion={swapQuestion}
              setShowBankModal={setShowBankModal}
              modalVariants={modalVariants}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}