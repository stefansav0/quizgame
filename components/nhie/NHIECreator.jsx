
"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { translateText } from "@/lib/translate";
import { BG_COLORS, generateNHIEBank } from "@/lib/constants";

import SetupForm from "@/components/nhie/SetupForm";
import QuestionEditor from "@/components/nhie/QuestionEditor";
import ShareScreen from "@/components/nhie/ShareScreen";
import QuestionBankModal from "@/components/nhie/QuestionBankModal";
import InfoSection from "@/components/nhie/InfoSection";
import FloatingLayout from "@/components/FloatingLayout";

const CHALLENGE_KEY = "nhie_challenge_id";
const DRAFT_KEY = "nhie_creator_draft_v1";
const TOTAL_QUESTIONS = 10;

// Fisher-Yates shuffle for more consistent randomization.
function shuffleQuestions(items) {
  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [
      shuffled[j],
      shuffled[i],
    ];
  }

  return shuffled;
}

function getErrorMessage(error, fallback) {
  return error instanceof Error && error.message
    ? error.message
    : fallback;
}

export default function CreateNHIEChallenge() {
  const activeTheme = "light";

  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [step, setStep] = useState(0);
  const [createdChallengeId, setCreatedChallengeId] =
    useState(null);

  const [userInfo, setUserInfo] = useState({
    country: "",
    language: "",
    name: "",
  });

  const [questions, setQuestions] = useState([]);
  const [questionBank, setQuestionBank] = useState([]);
  const [showBankModal, setShowBankModal] =
    useState(false);

  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  // Prevent repeated save/delete requests.
  const submittingRef = useRef(false);
  const deletingRef = useRef(false);
  const generatingRef = useRef(false);

  // ----------------------------------------
  // 1. RESTORE SAVED CHALLENGE OR DRAFT
  // ----------------------------------------

  useEffect(() => {
    try {
      const existingId =
        localStorage.getItem(CHALLENGE_KEY);

      if (existingId) {
        setCreatedChallengeId(existingId);
        setStep(11);
        return;
      }

      const savedDraft =
        localStorage.getItem(DRAFT_KEY);

      if (!savedDraft) {
        setStep(0);
        return;
      }

      const draft = JSON.parse(savedDraft);

      if (!draft || typeof draft !== "object") {
        throw new Error("Invalid draft");
      }

      const restoredInfo = {
        country:
          typeof draft.userInfo?.country === "string"
            ? draft.userInfo.country
            : "",
        language:
          typeof draft.userInfo?.language === "string"
            ? draft.userInfo.language
            : "",
        name:
          typeof draft.userInfo?.name === "string"
            ? draft.userInfo.name
            : "",
      };

      setUserInfo(restoredInfo);

      if (
        Array.isArray(draft.questions) &&
        draft.questions.length === TOTAL_QUESTIONS
      ) {
        setQuestions(draft.questions);

        setQuestionBank(
          Array.isArray(draft.questionBank)
            ? draft.questionBank
            : []
        );

        const restoredStep = Number(draft.step);

        setStep(
          Number.isInteger(restoredStep) &&
          restoredStep >= 1 &&
          restoredStep <= TOTAL_QUESTIONS
            ? restoredStep
            : 1
        );

        setNotice(
          "Your previous draft has been restored."
        );
      } else {
        setStep(0);
      }
    } catch (err) {
      console.error(
        "Failed to restore NHIE draft:",
        err
      );

      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {
        // Storage may be unavailable.
      }

      setStep(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ----------------------------------------
  // 2. AUTOMATICALLY SAVE DRAFT PROGRESS
  // ----------------------------------------

  useEffect(() => {
    if (
      isLoading ||
      createdChallengeId ||
      step === 11
    ) {
      return;
    }

    try {
      // Preserve the setup information as well.
      if (
        step === 0 &&
        !userInfo.name &&
        !userInfo.country &&
        !userInfo.language &&
        questions.length === 0
      ) {
        localStorage.removeItem(DRAFT_KEY);
        return;
      }

      localStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({
          userInfo,
          questions,
          questionBank,
          step,
        })
      );
    } catch (err) {
      console.warn(
        "Unable to save NHIE draft:",
        err
      );
    }
  }, [
    isLoading,
    createdChallengeId,
    step,
    userInfo,
    questions,
    questionBank,
  ]);

  // ----------------------------------------
  // 3. GENERATE AND TRANSLATE QUESTIONS
  // ----------------------------------------

  const handleStartSetup = async () => {
    if (generatingRef.current) return;

    setError("");
    setNotice("");

    const creatorName = userInfo.name.trim();

    if (!creatorName) {
      setError("Please enter your name to continue.");
      return;
    }

    generatingRef.current = true;
    setIsGenerating(true);

    try {
      const baseBank = generateNHIEBank();

      if (
        !Array.isArray(baseBank) ||
        baseBank.length < TOTAL_QUESTIONS
      ) {
        throw new Error(
          "Not enough questions are available. Please try again."
        );
      }

      const language = userInfo.language;

      const translatedBank = await Promise.all(
        baseBank.map(async (question) => {
          if (!language) {
            return question;
          }

          try {
            const translated =
              await translateText(
                question,
                language
              );

            return typeof translated === "string" &&
              translated.trim()
              ? translated
              : question;
          } catch (err) {
            console.warn(
              "Question translation failed:",
              err
            );

            return question;
          }
        })
      );

      const shuffledBank =
        shuffleQuestions(translatedBank);

      const selectedQuestions = shuffledBank
        .slice(0, TOTAL_QUESTIONS)
        .map((statement, index) => ({
          id: index + 1,
          statement,
          creatorAnswer: null,
          bgColor:
            BG_COLORS[index % BG_COLORS.length],
        }));

      setUserInfo((previous) => ({
        ...previous,
        name: creatorName,
      }));

      setQuestionBank(translatedBank);
      setQuestions(selectedQuestions);
      setStep(1);
    } catch (err) {
      console.error(
        "NHIE question generation error:",
        err
      );

      setError(
        getErrorMessage(
          err,
          "Failed to generate questions. Please try again."
        )
      );
    } finally {
      generatingRef.current = false;
      setIsGenerating(false);
    }
  };

  // ----------------------------------------
  // 4. SAVE CHALLENGE TO DATABASE
  // ----------------------------------------

  const handleSaveAndShare = async () => {
    if (submittingRef.current) return;

    setError("");
    setNotice("");

    const creatorName = userInfo.name.trim();

    if (!creatorName) {
      setError(
        "Please enter your name before creating the game."
      );
      setStep(0);
      return;
    }

    if (questions.length !== TOTAL_QUESTIONS) {
      setError(
        "Your game must contain exactly 10 questions."
      );
      return;
    }

    // false is a valid answer, so do not use
    // !question.creatorAnswer here.
    const hasUnansweredQuestion =
      questions.some(
        (question) =>
          question.creatorAnswer === null ||
          question.creatorAnswer === undefined
      );

    if (hasUnansweredQuestion) {
      setError(
        "Please answer all 10 questions before sharing."
      );
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);

    const payload = {
      creatorName,
      location: userInfo.country,
      language: userInfo.language,
      quizTitle:
        `${creatorName}'s Never Have I Ever 👀`,
      questions,
    };

    try {
      const response = await fetch(
        "/api/nhie/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
          "Failed to create your game."
        );
      }

      const finalId =
        data?.quizId ||
        data?.challengeId;

      if (
        typeof finalId !== "string" ||
        !finalId.trim()
      ) {
        throw new Error(
          "The server did not return a valid game ID."
        );
      }

      // Save the ID before switching screens.
      // If storage is unavailable, the current
      // session can still display the share screen.
      try {
        localStorage.setItem(
          CHALLENGE_KEY,
          finalId
        );

        localStorage.removeItem(DRAFT_KEY);
      } catch (storageError) {
        console.warn(
          "Unable to remember game on this device:",
          storageError
        );
      }

      setCreatedChallengeId(finalId);
      setShowBankModal(false);
      setStep(11);
    } catch (err) {
      console.error(
        "NHIE creation error:",
        err
      );

      setError(
        getErrorMessage(
          err,
          "Something went wrong while creating your game. Please try again."
        )
      );
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  // ----------------------------------------
  // 5. DELETE EXISTING CHALLENGE
  // ----------------------------------------

  const handleDeleteChallenge = async () => {
    if (deletingRef.current) return;

    if (!createdChallengeId) {
      setError(
        "No saved game was found to delete."
      );
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this game? Its saved results may also be deleted. This cannot be undone."
    );

    if (!confirmed) return;

    deletingRef.current = true;
    setIsDeleting(true);
    setError("");
    setNotice("");

    try {
      const response = await fetch(
        `/api/nhie/${encodeURIComponent(
          createdChallengeId
        )}`,
        {
          method: "DELETE",
        }
      );

      let data = {};

      try {
        data = await response.json();
      } catch {
        // Some APIs return no response body.
      }

      if (!response.ok) {
        throw new Error(
          data?.error ||
          "The game could not be deleted."
        );
      }

      // Clear local data ONLY after the
      // server confirms successful deletion.
      try {
        localStorage.removeItem(
          CHALLENGE_KEY
        );

        localStorage.removeItem(DRAFT_KEY);
      } catch (storageError) {
        console.warn(
          "Could not clear local storage:",
          storageError
        );
      }

      setCreatedChallengeId(null);

      setUserInfo({
        country: "",
        language: "",
        name: "",
      });

      setQuestions([]);
      setQuestionBank([]);
      setShowBankModal(false);
      setStep(0);

      setNotice(
        "Your game was deleted. You can now create a new one."
      );
    } catch (err) {
      console.error(
        "NHIE deletion error:",
        err
      );

      setError(
        getErrorMessage(
          err,
          "Unable to delete your game. Please try again."
        )
      );
    } finally {
      deletingRef.current = false;
      setIsDeleting(false);
    }
  };

  // ----------------------------------------
  // 6. LOADING SCREEN
  // ----------------------------------------

  if (isLoading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center bg-slate-50"
        role="status"
        aria-live="polite"
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-500"
            aria-hidden="true"
          />

          <p className="text-sm font-semibold text-slate-600">
            Loading your game...
          </p>
        </div>
      </div>
    );
  }

  // ----------------------------------------
  // 7. MAIN CREATOR INTERFACE
  // ----------------------------------------

  return (
    <FloatingLayout activeTheme={activeTheme}>
      <div className="relative z-20 w-full max-w-xl flex-shrink-0 font-sans text-slate-900 selection:bg-emerald-200">

        {/* Errors and success messages */}
        {error && (
          <div
            role="alert"
            className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm font-medium leading-6 text-rose-800 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <p>{error}</p>

              <button
                type="button"
                onClick={() => setError("")}
                aria-label="Dismiss error"
                className="shrink-0 text-lg leading-none text-rose-600 hover:text-rose-900"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {notice && (
          <div
            role="status"
            className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-medium leading-6 text-emerald-800 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <p>{notice}</p>

              <button
                type="button"
                onClick={() => setNotice("")}
                aria-label="Dismiss notification"
                className="shrink-0 text-lg leading-none text-emerald-700 hover:text-emerald-900"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* SETUP */}
          {step === 0 && (
            <SetupForm
              key="nhie-setup"
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              isGenerating={isGenerating}
              handleStartSetup={
                handleStartSetup
              }
            />
          )}

          {/* QUESTION EDITOR */}
          {step >= 1 &&
            step <= TOTAL_QUESTIONS && (
              <QuestionEditor
                key="nhie-editor"
                step={step}
                setStep={setStep}
                questions={questions}
                setQuestions={setQuestions}
                setShowBankModal={
                  setShowBankModal
                }
                handleSaveAndShare={
                  handleSaveAndShare
                }
                isSubmitting={isSubmitting}
              />
            )}

          {/* SHARE SCREEN */}
          {step === 11 &&
            createdChallengeId && (
              <ShareScreen
                key="nhie-share"
                createdChallengeId={
                  createdChallengeId
                }
                handleDeleteChallenge={
                  handleDeleteChallenge
                }
                isDeleting={isDeleting}
              />
            )}
        </AnimatePresence>
      </div>

      {/* Supporting information */}
      <InfoSection
        activeTheme={activeTheme}
      />

      {/* Question bank modal */}
      <QuestionBankModal
        showBankModal={showBankModal}
        setShowBankModal={
          setShowBankModal
        }
        questionBank={questionBank}
        step={step}
        questions={questions}
        setQuestions={setQuestions}
      />
    </FloatingLayout>
  );
}