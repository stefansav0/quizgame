"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { translateText } from "@/lib/translate";

import {
  BG_COLORS,
  COUNTRY_LANGUAGE_MAP,
  generateQuestionBank,
} from "@/lib/quizData";

import SetupStep from "@/components/SetupStep";
import QuestionStep from "@/components/QuestionStep";
import SuccessStep from "@/components/SuccessStep";
import QuestionBankModal from "@/components/QuestionBankModal";

import FloatingLayout from "@/components/FloatingLayout";
import InfoSection from "@/components/InfoSection";

/* ============================================================
   FALLING EMOJIS
   Reduced from 35 to 10 so they don't cover your content
   on mobile.
============================================================ */

const EMOJIS = [
  "💖",
  "✨",
  "😂",
  "🔥",
  "👀",
  "🎉",
  "🥰",
  "✌️",
  "🤪",
  "😜",
];

const FallingEmojis = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const drops = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    emoji:
      EMOJIS[
        Math.floor(
          Math.random() * EMOJIS.length
        )
      ],
    left: `${Math.random() * 100}%`,
    duration: Math.random() * 6 + 8,
    delay: -Math.random() * 10,
    size: `${Math.random() * 0.8 + 0.9}rem`,
  }));

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
      aria-hidden="true"
    >
      {drops.map((drop) => (
        <motion.div
          key={drop.id}
          initial={{
            y: "-10vh",
            opacity: 0,
            rotate: -20,
          }}
          animate={{
            y: "110vh",
            opacity: [0, 0.35, 0.35, 0],
            rotate: 20,
          }}
          transition={{
            duration: drop.duration,
            repeat: Infinity,
            delay: drop.delay,
            ease: "linear",
          }}
          className="absolute select-none"
          style={{
            left: drop.left,
            fontSize: drop.size,
          }}
        >
          {drop.emoji}
        </motion.div>
      ))}
    </div>
  );
};

/* ============================================================
   MAIN PAGE
============================================================ */

export default function CreateQuiz() {
  const [activeTheme] = useState("light");

  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] =
    useState(false);
  const [isDeleting, setIsDeleting] =
    useState(false);

  const [step, setStep] = useState(0);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [createdQuizId, setCreatedQuizId] =
    useState(null);

  const [copiedLink, setCopiedLink] =
    useState("");

  const [userInfo, setUserInfo] = useState({
    country: "",
    language: "",
    name: "",
  });

  const availableLanguages = userInfo.country
    ? COUNTRY_LANGUAGE_MAP[userInfo.country]
    : [];

  const [questions, setQuestions] =
    useState([]);

  const [questionBank, setQuestionBank] =
    useState([]);

  const [showBankModal, setShowBankModal] =
    useState(false);

  /* ==========================================================
     RESTORE EXISTING QUIZ
  ========================================================== */

  useEffect(() => {
    const existingQuizId =
      localStorage.getItem(
        "spicy_quiz_id"
      );

    if (existingQuizId) {
      setCreatedQuizId(existingQuizId);
      setStep(11);
    }

    setIsLoading(false);
  }, []);

  /* ==========================================================
     GENERATE QUIZ QUESTIONS
  ========================================================== */

  const handleStartQuizSetup = async () => {
    try {
      setIsGenerating(true);

      const baseBank =
        generateQuestionBank(
          userInfo.name,
          userInfo.language
        );

      const translatedBank =
        await Promise.all(
          baseBank.map(async (q) => {
            const translatedQuestion =
              await translateText(
                q.question,
                userInfo.language
              );

            const translatedOptions =
              await Promise.all(
                q.options.map((opt) =>
                  translateText(
                    opt,
                    userInfo.language
                  )
                )
              );

            return {
              question:
                translatedQuestion,
              options:
                translatedOptions,
            };
          })
        );

      const shuffledBank = [
        ...translatedBank,
      ].sort(
        () => 0.5 - Math.random()
      );

      const selected10 =
        shuffledBank
          .slice(0, 10)
          .map((q, index) => ({
            id: index + 1,
            question: q.question,
            options: q.options,
            correctAnswer: 0,
            bgColor:
              BG_COLORS[
                index %
                  BG_COLORS.length
              ],
          }));

      setQuestionBank(
        translatedBank
      );

      setQuestions(selected10);

      setStep(1);
    } catch (error) {
      console.error(
        "Error generating quiz:",
        error
      );

      alert(
        "Failed to generate questions. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  /* ==========================================================
     REPLACE CURRENT QUESTION
  ========================================================== */

  const swapQuestion = (
    bankQuestion
  ) => {
    const newQuestions = [
      ...questions,
    ];

    newQuestions[step - 1] = {
      ...newQuestions[step - 1],
      question:
        bankQuestion.question,
      options:
        bankQuestion.options,
      correctAnswer: 0,
    };

    setQuestions(newQuestions);

    setShowBankModal(false);
  };

  /* ==========================================================
     UPDATE QUESTION
  ========================================================== */

  const updateQuestion = (
    index,
    field,
    value
  ) => {
    const newQuestions = [
      ...questions,
    ];

    newQuestions[index][field] =
      value;

    setQuestions(newQuestions);
  };

  /* ==========================================================
     UPDATE OPTION
  ========================================================== */

  const updateOption = (
    qIndex,
    optIndex,
    value
  ) => {
    const newQuestions = [
      ...questions,
    ];

    newQuestions[qIndex].options[
      optIndex
    ] = value;

    setQuestions(newQuestions);
  };

  /* ==========================================================
     SAVE AND SHARE
  ========================================================== */

  const handleSaveAndShare =
    async () => {
      setIsSubmitting(true);

      const quizPayload = {
        creatorName:
          userInfo.name,

        location:
          userInfo.country,

        language:
          userInfo.language,

        quizTitle: `The Ultimate ${userInfo.name} Test 👀`,

        questions:
          questions,
      };

      try {
        const res = await fetch(
          "/api/quiz/create",
          {
            method: "POST",
            body: JSON.stringify(
              quizPayload
            ),
          }
        );

        const data =
          await res.json();

        setCreatedQuizId(
          data.quizId
        );

        localStorage.setItem(
          "spicy_quiz_id",
          data.quizId
        );

        setStep(11);
      } catch (error) {
        console.error(
          "Failed to create quiz",
          error
        );

        alert(
          "Something went wrong creating the quiz."
        );
      } finally {
        setIsSubmitting(false);
      }
    };

  /* ==========================================================
     DELETE QUIZ / START AGAIN
  ========================================================== */

  const handleDeleteQuiz =
    async () => {
      const confirmed =
        confirm(
          "Are you sure you want to delete this quiz and start over? This cannot be undone."
        );

      if (!confirmed) return;

      setIsDeleting(true);

      try {
        if (createdQuizId) {
          await fetch(
            `/api/quiz/${createdQuizId}`,
            {
              method: "DELETE",
            }
          );
        }
      } catch (error) {
        console.error(
          "Error deleting quiz:",
          error
        );
      } finally {
        localStorage.removeItem(
          "spicy_quiz_id"
        );

        setCreatedQuizId(null);

        setUserInfo({
          country: "",
          language: "",
          name: "",
        });

        setQuestions([]);
        setQuestionBank([]);

        setStep(0);

        setIsDeleting(false);
      }
    };

  /* ==========================================================
     COPY LINK
  ========================================================== */

  const copyToClipboard = (
    text,
    type
  ) => {
    navigator.clipboard.writeText(
      text
    );

    setCopiedLink(type);

    setTimeout(() => {
      setCopiedLink("");
    }, 2000);
  };

  /* ==========================================================
     SLIDE ANIMATION
  ========================================================== */

  const slideVariants = {
    enter: {
      x: 50,
      opacity: 0,
      scale: 0.95,
    },

    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },

    exit: {
      zIndex: 0,
      x: -50,
      opacity: 0,
      scale: 0.95,
    },
  };

  /* ==========================================================
     MODAL ANIMATION
  ========================================================== */

  const modalVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },

    visible: {
      opacity: 1,
      y: 0,
      scale: 1,

      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },

    exit: {
      opacity: 0,
      y: 20,
      scale: 0.95,

      transition: {
        duration: 0.2,
      },
    },
  };

  /* ==========================================================
     BASE URL
  ========================================================== */

  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "";

  /* ==========================================================
     LOADING
  ========================================================== */

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"
          aria-label="Loading"
        />
      </div>
    );
  }

  /* ==========================================================
     PAGE
  ========================================================== */

  return (
    <FloatingLayout
      activeTheme={activeTheme}
    >
      {/* Decorative emoji animation */}
      <FallingEmojis />

      <main className="relative z-[10] min-h-screen w-full overflow-x-hidden bg-slate-50 font-sans text-slate-900">

        {/* ====================================================
            HERO
        ===================================================== */}

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-4xl px-4 pb-8 pt-10 text-center sm:px-6 md:pb-10 md:pt-14">

            <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-bold text-indigo-700 sm:text-sm">
              💡 Personalized Friendship Quiz
            </div>

            <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
              Create a Quiz About You
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Create a personalized quiz about your
              favorites, personality, memories,
              hobbies, and experiences. Then share
              it with friends and see how well they
              know you.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs text-slate-500 sm:text-sm">

              <span className="rounded-full bg-slate-100 px-3 py-1.5">
                ✍️ Personal questions
              </span>

              <span className="rounded-full bg-slate-100 px-3 py-1.5">
                🌎 Multiple languages
              </span>

              <span className="rounded-full bg-slate-100 px-3 py-1.5">
                🔗 Shareable link
              </span>

              <span className="rounded-full bg-slate-100 px-3 py-1.5">
                🏆 Compare answers
              </span>

            </div>
          </div>
        </section>

        {/* ====================================================
            QUIZ CREATOR
        ===================================================== */}

        <section
          id="quiz-creator"
          className="relative mx-auto flex w-full max-w-7xl justify-center px-3 py-8 sm:px-6 md:py-12 lg:px-8"
        >
          <div className="relative z-[20] w-full max-w-xl flex-shrink-0">

            <AnimatePresence mode="wait">

              {/* ==============================================
                  STEP 0
              =============================================== */}

              {step === 0 && (
                <motion.div
                  key="step-0"
                  variants={
                    slideVariants
                  }
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                  className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:p-8 md:rounded-[2.5rem] md:p-12"
                >

                  <div className="mb-6 text-center">

                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-2xl">
                      🧠
                    </div>

                    <h2 className="text-2xl font-black text-slate-900">
                      Start Your Quiz
                    </h2>

                    <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                      Add a few details and
                      we'll prepare your
                      starting questions.
                    </p>

                  </div>

                  <SetupStep
                    userInfo={
                      userInfo
                    }
                    handleNameChange={(
                      e
                    ) =>
                      setUserInfo({
                        ...userInfo,
                        name: e.target
                          .value,
                      })
                    }
                    handleCountryChange={(
                      e
                    ) =>
                      setUserInfo({
                        ...userInfo,
                        country:
                          e.target
                            .value,
                        language: "",
                      })
                    }
                    handleLanguageChange={(
                      e
                    ) =>
                      setUserInfo({
                        ...userInfo,
                        language:
                          e.target
                            .value,
                      })
                    }
                    handleStartQuizSetup={
                      handleStartQuizSetup
                    }
                    isGenerating={
                      isGenerating
                    }
                    availableLanguages={
                      availableLanguages
                    }
                    COUNTRY_LANGUAGE_MAP={
                      COUNTRY_LANGUAGE_MAP
                    }
                  />

                </motion.div>
              )}

              {/* ==============================================
                  QUESTIONS
              =============================================== */}

              {step > 0 &&
                step <= 10 &&
                questions[
                  step - 1
                ] && (
                  <motion.div
                    key={`step-${step}`}
                    variants={
                      slideVariants
                    }
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                    }}
                    className={`${questions[step - 1].bgColor} relative overflow-hidden rounded-[2rem] border border-slate-200/50 p-5 text-slate-900 shadow-xl backdrop-blur-xl transition-colors duration-700 sm:p-7 md:rounded-[2.5rem] md:p-10`}
                  >

                    <QuestionStep
                      step={step}
                      currentQuestion={
                        questions[
                          step - 1
                        ]
                      }
                      handlePrev={() =>
                        setStep(
                          (
                            prev
                          ) =>
                            Math.max(
                              prev -
                                1,
                              0
                            )
                        )
                      }
                      handleNext={() =>
                        setStep(
                          (
                            prev
                          ) =>
                            Math.min(
                              prev +
                                1,
                              10
                            )
                        )
                      }
                      updateQuestion={
                        updateQuestion
                      }
                      updateOption={
                        updateOption
                      }
                      setShowBankModal={
                        setShowBankModal
                      }
                      handleSaveAndShare={
                        handleSaveAndShare
                      }
                      isSubmitting={
                        isSubmitting
                      }
                    />

                  </motion.div>
                )}

              {/* ==============================================
                  SUCCESS
              =============================================== */}

              {step === 11 && (
                <motion.div
                  key="step-11"
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                  className="relative flex flex-col items-center overflow-hidden rounded-[2rem] border border-emerald-200 bg-white/95 p-6 text-center shadow-[0_10px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:p-8 md:rounded-[2.5rem] md:p-12"
                >

                  <SuccessStep
                    createdQuizId={
                      createdQuizId
                    }
                    handleDeleteQuiz={
                      handleDeleteQuiz
                    }
                    isDeleting={
                      isDeleting
                    }
                    baseUrl={
                      baseUrl
                    }
                    copyToClipboard={
                      copyToClipboard
                    }
                    copiedLink={
                      copiedLink
                    }
                  />

                </motion.div>
              )}

            </AnimatePresence>

          </div>
        </section>

        {/* ====================================================
            HOW IT WORKS
        ===================================================== */}

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16 lg:px-8">

            <div className="mx-auto max-w-3xl text-center">

              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 sm:text-sm">
                How it works
              </span>

              <h2 className="mt-2 text-2xl font-black sm:text-3xl md:text-4xl">
                Create, Share and Compare
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
                Turn things your friends know about
                you into a simple personalized
                challenge.
              </p>

            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">

              <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6">

                <div className="text-2xl">
                  ✍️
                </div>

                <h3 className="mt-4 text-lg font-bold">
                  1. Create
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Start with questions about your
                  favorites, personality, memories,
                  hobbies, and experiences.
                </p>

              </article>

              <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6">

                <div className="text-2xl">
                  🔗
                </div>

                <h3 className="mt-4 text-lg font-bold">
                  2. Share
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Share your quiz link with friends,
                  family, classmates, or your partner.
                </p>

              </article>

              <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6">

                <div className="text-2xl">
                  🏆
                </div>

                <h3 className="mt-4 text-lg font-bold">
                  3. Compare
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  See how participants answer your
                  questions and discover who knows you
                  best.
                </p>

              </article>

            </div>
          </div>
        </section>

        {/* ====================================================
            QUIZ TIPS
        ===================================================== */}

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">

          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">

            <div>

              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 sm:text-sm">
                Quiz tips
              </span>

              <h2 className="mt-2 text-2xl font-black sm:text-3xl md:text-4xl">
                What Makes a Good Friendship Quiz?
              </h2>

              <div className="mt-5 space-y-4 text-base leading-7 text-slate-600 sm:text-lg">

                <p>
                  A good quiz should contain questions
                  that are personal enough to be
                  interesting but familiar enough that
                  your friends have a reasonable chance
                  of answering them.
                </p>

                <p>
                  Mix easy questions about favorites
                  with questions about memories,
                  habits, hobbies, experiences, and
                  preferences.
                </p>

                <p>
                  Avoid putting sensitive information
                  into a quiz. Keep questions focused
                  on fun and appropriate topics.
                </p>

              </div>
            </div>

            <div className="rounded-3xl border border-indigo-100 bg-indigo-50 p-6 sm:p-8">

              <h3 className="text-xl font-bold">
                Four simple tips
              </h3>

              <div className="mt-5 space-y-5">

                <div>
                  <h4 className="font-bold">
                    Start with easy questions
                  </h4>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Use favorite foods, movies,
                    music, colors, hobbies, or
                    other familiar details.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold">
                    Add shared memories
                  </h4>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Include experiences that you
                    and your friends have actually
                    shared.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold">
                    Mix difficulty levels
                  </h4>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Combine obvious answers with
                    details that close friends may
                    remember.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold">
                    Keep it comfortable
                  </h4>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Don't ask for passwords,
                    financial information,
                    identification numbers, or
                    other sensitive details.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ====================================================
            QUESTION IDEAS
        ===================================================== */}

        <section className="bg-indigo-50">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">

            <div className="mx-auto max-w-3xl text-center">

              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 sm:text-sm">
                Inspiration
              </span>

              <h2 className="mt-2 text-2xl font-black sm:text-3xl md:text-4xl">
                Friendship Quiz Question Ideas
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
                Not sure what to ask? These examples
                can help you create questions that feel
                personal without being complicated.
              </p>

            </div>

            <div className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">

              {[
                "What is my favorite food?",
                "What movie do I enjoy watching?",
                "Where would I love to travel?",
                "What hobby do I enjoy?",
                "What type of music do I like?",
                "What is my favorite color?",
                "What was a memorable childhood experience?",
                "What always makes me laugh?",
                "What would my ideal weekend look like?",
                "Which place would I like to visit?",
                "What is something I would like to learn?",
                "What habit do my close friends know about?",
              ].map(
                (
                  question,
                  index
                ) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-indigo-100 bg-white p-4 shadow-sm"
                  >
                    <p className="text-sm font-medium leading-6 text-slate-700">
                      {question}
                    </p>
                  </div>
                )
              )}

            </div>

            <div className="mt-8 text-center">

              <a
                href="#quiz-creator"
                className="inline-flex rounded-2xl bg-indigo-600 px-6 py-3 font-bold text-white transition hover:bg-indigo-700"
              >
                Create Your Quiz
              </a>

            </div>

          </div>
        </section>

        {/* ====================================================
            WHO CAN USE IT
        ===================================================== */}

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">

            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 sm:text-sm">
              Different ways to use it
            </span>

            <h2 className="mt-2 text-2xl font-black sm:text-3xl md:text-4xl">
              Who Can Create a Friendship Quiz?
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              Because the questions are personalized,
              the same quiz format can work for
              different groups.
            </p>

          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {[
              {
                icon: "👯",
                title: "Best Friends",
                description:
                  "Test how well your closest friends remember your preferences, habits, memories, and shared experiences.",
              },
              {
                icon: "❤️",
                title: "Couples",
                description:
                  "Create questions about favorite memories, interests, habits, and things you have learned about each other.",
              },
              {
                icon: "🏠",
                title: "Family",
                description:
                  "Use a personalized quiz for birthdays, reunions, holidays, or casual family gatherings.",
              },
              {
                icon: "🎓",
                title: "Classmates",
                description:
                  "Create a light-hearted quiz for classmates, college groups, farewell events, or student activities.",
              },
              {
                icon: "🌎",
                title: "Long-Distance Friends",
                description:
                  "Share your quiz online with friends who live in different cities or countries.",
              },
              {
                icon: "💬",
                title: "Online Groups",
                description:
                  "Create a personalized challenge for a community or group that already knows you.",
              },
            ].map(
              (item) => (
                <article
                  key={item.title}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >

                  <div className="text-3xl">
                    {item.icon}
                  </div>

                  <h3 className="mt-4 text-lg font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>

                </article>
              )
            )}

          </div>
        </section>

        {/* ====================================================
            YOUR EXISTING INFO SECTION
        ===================================================== */}

        
{/* Personalization tips */}
<div className="border-y border-slate-200 bg-white">
  <InfoSection activeTheme={activeTheme} />
</div>

        {/* ====================================================
            RESPONSIBLE USE
        ===================================================== */}

        <section className="bg-slate-100">

          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 sm:text-sm">
                Responsible use
              </span>

              <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                Keep Your Quiz Fun and Private
              </h2>

              <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600 sm:text-base">

                <p>
                  Personalized quizzes work best
                  when questions focus on everyday
                  interests, memories, preferences,
                  hobbies, and experiences.
                </p>

                <p>
                  Do not use quiz questions to collect
                  passwords, payment information,
                  government identification numbers,
                  private addresses, or other sensitive
                  information.
                </p>

                <p>
                  If a question includes information
                  about another person, consider whether
                  it is appropriate to share that
                  information with the people taking
                  your quiz.
                </p>

                <p>
                  Read our{" "}
                  <a
                    href="/privacy"
                    className="font-semibold text-indigo-600 hover:underline"
                  >
                    Privacy Policy
                  </a>{" "}
                  for more information about how
                  GetKnowify handles information.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* ====================================================
            FAQ
        ===================================================== */}

        <section
          id="faq"
          className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8"
        >

          <div className="mx-auto max-w-3xl text-center">

            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 sm:text-sm">
              Frequently asked questions
            </span>

            <h2 className="mt-2 text-2xl font-black sm:text-3xl md:text-4xl">
              Questions About Creating a Quiz
            </h2>

          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">

            {[
              {
                question:
                  "What is a friendship quiz?",
                answer:
                  "A friendship quiz is a personalized set of questions about a person. Friends or other participants answer the questions to see how well they know that person.",
              },

              {
                question:
                  "Can I change the questions?",
                answer:
                  "Yes. Your quiz creator allows you to review and personalize the generated questions before saving your quiz.",
              },

              {
                question:
                  "How many questions does the quiz start with?",
                answer:
                  "The current quiz creator starts with 10 questions selected from the generated question bank.",
              },

              {
                question:
                  "Can I replace a question?",
                answer:
                  "Yes. The question bank allows you to replace a question with another available question.",
              },

              {
                question:
                  "Can I choose a language?",
                answer:
                  "Yes. The creator includes country and language selection and translates the generated questions according to the selected language.",
              },

              {
                question:
                  "Who can I share the quiz with?",
                answer:
                  "You can share the quiz with friends, family members, classmates, partners, or other people you want to challenge.",
              },

              {
                question:
                  "What information should I avoid sharing?",
                answer:
                  "Avoid passwords, financial information, identification numbers, private addresses, or other sensitive information.",
              },

              {
                question:
                  "Can I start over?",
                answer:
                  "Yes. The creator includes a delete and restart option after a quiz has been created.",
              },
            ].map(
              (faq) => (
                <article
                  key={
                    faq.question
                  }
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >

                  <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                    {faq.question}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                    {faq.answer}
                  </p>

                </article>
              )
            )}

          </div>
        </section>

        {/* ====================================================
            OTHER FEATURES
        ===================================================== */}

        <section className="border-t border-slate-200 bg-white">

          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">

            <div className="mx-auto max-w-3xl text-center">

              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 sm:text-sm">
                Explore more
              </span>

              <h2 className="mt-2 text-2xl font-black sm:text-3xl md:text-4xl">
                More Social Games
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
                Explore other GetKnowify experiences
                for conversations, groups, and friends.
              </p>

            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">

              <a
                href="/nhie"
                className="group rounded-3xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md"
              >

                <div className="text-3xl">
                  🎉
                </div>

                <h3 className="mt-4 text-xl font-bold">
                  Never Have I Ever
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Explore a classic social game
                  with questions designed for
                  conversations with friends and
                  groups.
                </p>

                <span className="mt-4 inline-block text-sm font-bold text-indigo-600 group-hover:underline">
                  Explore the game →
                </span>

              </a>

              <a
                href="/letter/create"
                className="group rounded-3xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md"
              >

                <div className="text-3xl">
                  💌
                </div>

                <h3 className="mt-4 text-xl font-bold">
                  Secret Letters
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Create a personal secret letter
                  and share a message through
                  another GetKnowify experience.
                </p>

                <span className="mt-4 inline-block text-sm font-bold text-indigo-600 group-hover:underline">
                  Create a letter →
                </span>

              </a>

            </div>

          </div>
        </section>

        {/* ====================================================
            FINAL CTA
        ===================================================== */}

        <section className="px-4 py-12 sm:px-6 md:py-16 lg:px-8">

          <div className="mx-auto max-w-5xl rounded-[2rem] bg-slate-950 px-6 py-12 text-center shadow-2xl sm:px-10 md:rounded-[2.5rem] md:py-16">

            <div className="text-3xl">
              🧠✨
            </div>

            <h2 className="mt-4 text-2xl font-black text-white sm:text-3xl md:text-4xl">
              Ready to see who knows you best?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Create your questions, personalize
              your quiz, share the link, and
              compare the answers.
            </p>

            <a
              href="#quiz-creator"
              className="mt-7 inline-flex rounded-2xl bg-indigo-500 px-7 py-3.5 font-bold text-white transition hover:bg-indigo-400"
            >
              Create My Quiz
            </a>

          </div>

        </section>

        {/* ====================================================
            QUESTION BANK MODAL
        ===================================================== */}

        <AnimatePresence>
          {showBankModal && (
            <QuestionBankModal
              questionBank={
                questionBank
              }
              swapQuestion={
                swapQuestion
              }
              setShowBankModal={
                setShowBankModal
              }
              modalVariants={
                modalVariants
              }
            />
          )}
        </AnimatePresence>

      </main>
    </FloatingLayout>
  );
}