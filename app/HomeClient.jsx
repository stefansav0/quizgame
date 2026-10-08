"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import LatestBlogs from "@/components/LatestBlogs";

const games = [
  {
    emoji: "🧠",
    title: "Friendship Quiz",
    description:
      "Create a personal 10-question quiz and see how well your friends really know you.",
    href: "/create",
    action: "Create your quiz",
    accent: "from-indigo-50 to-violet-50",
    border: "hover:border-indigo-300",
  },
  {
    emoji: "🎉",
    title: "Never Have I Ever",
    description:
      "Play a classic group game, discover new stories and start conversations with friends.",
    href: "/nhie",
    action: "Play the game",
    accent: "from-rose-50 to-orange-50",
    border: "hover:border-rose-300",
  },
  {
    emoji: "💌",
    title: "Secret Letters",
    description:
      "Write a personal digital message and share it privately with someone special.",
    href: "/letter/create",
    action: "Write a letter",
    accent: "from-emerald-50 to-teal-50",
    border: "hover:border-emerald-300",
  },
];

const steps = [
  {
    number: "01",
    title: "Create",
    description:
      "Enter your name and language. Generate 10 questions, then edit or replace any you like.",
  },
  {
    number: "02",
    title: "Choose answers",
    description:
      "Select the correct answer to each question so friends can test how well they know you.",
  },
  {
    number: "03",
    title: "Share",
    description:
      "Save your quiz and send its unique link to friends, family or classmates.",
  },
  {
    number: "04",
    title: "See results",
    description:
      "Visit your dashboard to see how participants scored on your quiz.",
  },
];

const examples = [
  "What food could I eat every day?",
  "Which place would I love to visit?",
  "What always makes me laugh?",
  "What is my ideal weekend?",
  "Which hobby do I enjoy most?",
  "What is a memory we share?",
];

const faqs = [
  {
    question: "What is GetKnowify?",
    answer:
      "GetKnowify is a social quiz and game platform where you can create friendship quizzes, play group games and share personal digital experiences with people you know.",
  },
  {
    question: "How many questions are in a friendship quiz?",
    answer:
      "Each GetKnowify friendship quiz contains 10 questions. You can edit or replace questions before saving and sharing your quiz.",
  },
  {
    question: "Can I change the generated questions?",
    answer:
      "Yes. Review the questions, edit their text or answer options, and replace questions using the available question bank.",
  },
  {
    question: "How do I share my quiz?",
    answer:
      "After saving your quiz, copy its unique link and send it to the people you want to challenge.",
  },
  {
    question: "Who can I play GetKnowify with?",
    answer:
      "You can use GetKnowify with best friends, friends, classmates, family members, partners or people who live far away.",
  },
  {
    question: "Do I need to share personal information?",
    answer:
      "No. Use fun topics such as favorites, hobbies and shared memories. Avoid passwords, private addresses and other sensitive information.",
  },
];

export default function HomeClient() {
  const reduceMotion = useReducedMotion();

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: {
          once: true,
          amount: 0.15,
        },
        transition: {
          duration: 0.45,
        },
      };

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-slate-50">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 -top-32 -z-10 h-80 w-80 rounded-full bg-indigo-200/60 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-16 -z-10 h-80 w-80 rounded-full bg-violet-200/50 blur-3xl"
        />

        <div className="mx-auto max-w-7xl px-4 pb-16 pt-14 text-center sm:px-6 md:pb-24 md:pt-20 lg:px-8">
          <motion.div {...reveal} className="mx-auto max-w-4xl">
            <span className="inline-flex rounded-full border border-indigo-200 bg-white px-4 py-2 text-sm font-bold text-indigo-700 shadow-sm">
              Fun quizzes &amp; games for people who know each other
            </span>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl md:text-7xl">
              How Well Do You{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Really Know Me?
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Create a personalized 10-question quiz, share it with friends
              and discover who remembers the little things about you.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/create"
                className="rounded-2xl bg-indigo-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
              >
                Create Your Quiz →
              </Link>

              <Link
                href="#explore-games"
                className="rounded-2xl border border-slate-300 bg-white px-8 py-4 text-base font-bold text-slate-800 transition hover:border-indigo-300 hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
              >
                Explore Games
              </Link>
            </div>

            <p className="mt-5 text-sm text-slate-500">
              Personalize questions · Share a link · Compare results
            </p>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          GAMES
      ========================================================= */}
      <section
        id="explore-games"
        aria-labelledby="games-heading"
        className="scroll-mt-20 border-y border-slate-200 bg-white"
      >
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <motion.div
            {...reveal}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="text-sm font-bold uppercase tracking-wider text-indigo-600">
              Choose your experience
            </span>

            <h2
              id="games-heading"
              className="mt-3 text-3xl font-black tracking-tight sm:text-4xl"
            >
              Quizzes, Games &amp; Personal Messages
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Create something personal, start a group conversation or send a
              meaningful message.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {games.map((game) => (
              <Link
                key={game.href}
                href={game.href}
                className={`group flex h-full flex-col rounded-3xl border border-slate-200 bg-gradient-to-br ${game.accent} p-7 shadow-sm transition hover:-translate-y-1 ${game.border} hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600`}
              >
                <span aria-hidden="true" className="text-4xl">
                  {game.emoji}
                </span>

                <h3 className="mt-5 text-2xl font-black">{game.title}</h3>

                <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 sm:text-base">
                  {game.description}
                </p>

                <span className="mt-6 inline-flex font-bold text-indigo-700 group-hover:underline">
                  {game.action} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}
      <section
        id="how-it-works"
        aria-labelledby="steps-heading"
        className="scroll-mt-20 mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8"
      >
        <motion.div {...reveal} className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-indigo-600">
            Four simple steps
          </span>

          <h2
            id="steps-heading"
            className="mt-3 text-3xl font-black sm:text-4xl"
          >
            How Your Friendship Quiz Works
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            You can personalize every question before sharing your quiz.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <article
              key={step.number}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <span className="text-sm font-black text-indigo-600">
                {step.number}
              </span>

              <h3 className="mt-4 text-xl font-bold">{step.title}</h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {step.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-9 text-center">
          <Link
            href="/create"
            className="inline-flex rounded-2xl bg-indigo-600 px-7 py-3.5 font-bold text-white transition hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
          >
            Start Creating
          </Link>
        </div>
      </section>

      {/* =========================================================
          ABOUT GETKNOWIFY
      ========================================================= */}
      <section
        aria-labelledby="about-heading"
        className="border-y border-slate-200 bg-white"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8">
          <motion.div {...reveal}>
            <span className="text-sm font-bold uppercase tracking-wider text-indigo-600">
              About GetKnowify
            </span>

            <h2
              id="about-heading"
              className="mt-3 text-3xl font-black sm:text-4xl"
            >
              A Small Quiz, a Big Conversation
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              GetKnowify is a social platform built around quizzes, games and
              simple ways to connect with people you know. Create your own
              questions, choose the answers and share your unique quiz link.
            </p>

            <p className="mt-4 text-base leading-8 text-slate-600">
              Use it with best friends, family, classmates, your partner or
              people who live far away. The goal is simple: have fun, compare
              answers and create better conversations.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 font-bold text-slate-800 transition hover:border-indigo-300 hover:bg-indigo-50"
              >
                Learn More About GetKnowify
              </Link>

              <Link
                href="/ideas"
                className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-6 py-3 font-bold text-white transition hover:bg-indigo-700"
              >
                Explore Quiz &amp; Game Ideas
              </Link>
            </div>
          </motion.div>

          <div className="rounded-3xl border border-indigo-100 bg-indigo-50 p-6 sm:p-8">
            <h3 className="text-xl font-black">What could you ask?</h3>

            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {examples.map((example) => (
                <li
                  key={example}
                  className="rounded-2xl border border-indigo-100 bg-white p-4 text-sm leading-6 text-slate-700"
                >
                  {example}
                </li>
              ))}
            </ul>

            <p className="mt-5 text-sm leading-6 text-slate-600">
              Tip: Mix easy favorites with a few shared memories. Avoid
              sensitive personal information.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          QUIZ & GAME IDEAS
          ONE CONTENT SECTION ONLY
      ========================================================= */}
      <section
        aria-labelledby="ideas-heading"
        className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8"
      >
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-indigo-600">
            Helpful resources
          </span>

          <h2
            id="ideas-heading"
            className="mt-3 text-3xl font-black sm:text-4xl"
          >
            Quiz &amp; Game Ideas
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Find practical questions, game ideas and activities you can use
            with friends, couples, classmates and groups.
          </p>
        </div>

        <LatestBlogs />

        <div className="mt-10 text-center">
          <Link
            href="/ideas"
            className="inline-flex rounded-2xl bg-indigo-600 px-7 py-3.5 font-bold text-white transition hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
          >
            View All Quiz &amp; Game Ideas →
          </Link>
        </div>
      </section>

      {/* =========================================================
          FAQ
      ========================================================= */}
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="scroll-mt-20 border-y border-slate-200 bg-slate-50"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-indigo-600">
              FAQ
            </span>

            <h2
              id="faq-heading"
              className="mt-3 text-3xl font-black sm:text-4xl"
            >
              Frequently Asked Questions
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              A few quick answers about creating quizzes and using GetKnowify.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold">{faq.question}</h3>

                <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-8 text-center text-sm leading-7 text-slate-600">
            For details about how information is handled, read our{" "}
            <Link
              href="/privacy"
              className="font-semibold text-indigo-700 underline underline-offset-4 hover:text-indigo-900"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-slate-950 px-6 py-12 text-center shadow-xl sm:px-12 md:py-16">
          <span className="text-sm font-bold uppercase tracking-wider text-indigo-300">
            Start with your own quiz
          </span>

          <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
            Ready to see who knows you best?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-300">
            Create 10 questions about yourself, share your quiz and see how
            your friends do.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/create"
              className="rounded-2xl bg-indigo-500 px-8 py-4 font-bold text-white transition hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Create Your Quiz
            </Link>

            <Link
              href="/ideas"
              className="rounded-2xl border border-slate-600 px-8 py-4 font-bold text-white transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Explore Quiz &amp; Game Ideas
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}