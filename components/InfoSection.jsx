
"use client";

import { motion, useReducedMotion } from "framer-motion";

const cards = [
  {
    icon: "✏️",
    label: "01",
    title: "Make It Personal",
    description:
      "Your quiz is about you. Review the generated questions and make them reflect your own interests, memories and personality.",
    tips: [
      "Choose the correct answer for each question.",
      "Edit questions that don't feel personal.",
      "Replace questions using the question bank.",
    ],
  },
  {
    icon: "🔍",
    label: "02",
    title: "Review Before Sharing",
    description:
      "A quick review helps make your quiz more enjoyable for the people who receive it.",
    tips: [
      "Check your spelling and answer options.",
      "Include a mix of easy and challenging questions.",
      "Avoid sharing sensitive personal information.",
    ],
  },
  {
    icon: "💌",
    label: "03",
    title: "Make Sharing Fun",
    description:
      "Once your quiz is ready, send the link to people who know you and invite them to take the challenge.",
    tips: [
      "Share it with close friends or family.",
      "Invite everyone to answer independently.",
      "Check your dashboard for their results.",
    ],
  },
];

export default function InfoSection({
  activeTheme = "light",
}) {
  const reduceMotion = useReducedMotion();

  const isLight =
    typeof activeTheme === "string"
      ? activeTheme === "light"
      : !activeTheme?.bg ||
        activeTheme.bg.includes("50") ||
        activeTheme.bg.includes("100") ||
        activeTheme.bg.includes("white");

  const cardStyle = isLight
    ? "border-slate-200 bg-white text-slate-900 shadow-sm hover:shadow-lg"
    : "border-white/15 bg-white/10 text-white shadow-lg hover:bg-white/15";

  const bodyStyle = isLight
    ? "text-slate-600"
    : "text-slate-300";

  const accentStyle = isLight
    ? "text-emerald-700"
    : "text-emerald-400";

  const tipStyle = isLight
    ? "border-slate-100 text-slate-600"
    : "border-white/10 text-slate-300";

  return (
    <section
      aria-labelledby="quiz-personalization-heading"
      className="relative mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 md:py-20"
    >
      {/* Section heading */}

      <motion.div
        initial={
          reduceMotion
            ? false
            : { opacity: 0, y: 20 }
        }
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45 }}
        className="mx-auto mb-10 max-w-3xl text-center"
      >
        <span
          className={`inline-flex rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider ${
            isLight
              ? "bg-emerald-50 text-emerald-700"
              : "bg-emerald-400/10 text-emerald-300"
          }`}
        >
          A little inspiration
        </span>

        <h2
          id="quiz-personalization-heading"
          className={`mt-4 text-2xl font-black tracking-tight sm:text-3xl md:text-4xl ${
            isLight ? "text-slate-950" : "text-white"
          }`}
        >
          Make Your Quiz Uniquely Yours
        </h2>

        <p
          className={`mx-auto mt-4 max-w-2xl text-sm leading-7 sm:text-base ${bodyStyle}`}
        >
          The most memorable friendship quizzes are
          personal. Here are a few things to consider
          before sending yours to your friends.
        </p>
      </motion.div>

      {/* Three useful cards */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
        {cards.map((card, index) => (
          <motion.article
            key={card.title}
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 24 }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.4,
              delay: reduceMotion ? 0 : index * 0.08,
            }}
            className={`flex h-full flex-col rounded-3xl border p-6 transition-shadow sm:p-7 ${cardStyle}`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${
                  isLight
                    ? "bg-emerald-50"
                    : "bg-white/10"
                }`}
                aria-hidden="true"
              >
                {card.icon}
              </span>

              <span
                className={`text-sm font-black ${accentStyle}`}
              >
                {card.label}
              </span>
            </div>

            <h3 className="mt-6 text-xl font-black sm:text-2xl">
              {card.title}
            </h3>

            <p
              className={`mt-3 text-sm leading-7 ${bodyStyle}`}
            >
              {card.description}
            </p>

            <ul className="mt-6 space-y-0">
              {card.tips.map((tip) => (
                <li
                  key={tip}
                  className={`flex items-start gap-3 border-t py-3 text-sm leading-6 ${tipStyle}`}
                >
                  <span
                    className={`mt-0.5 shrink-0 font-bold ${accentStyle}`}
                    aria-hidden="true"
                  >
                    ✓
                  </span>

                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>

      {/* Closing note */}

      <div
        className={`mx-auto mt-10 max-w-3xl rounded-2xl border px-5 py-5 text-center sm:px-8 ${
          isLight
            ? "border-emerald-100 bg-emerald-50"
            : "border-emerald-400/20 bg-emerald-400/10"
        }`}
      >
        <p
          className={`text-sm leading-7 sm:text-base ${
            isLight
              ? "text-slate-700"
              : "text-slate-200"
          }`}
        >
          <strong className={accentStyle}>
            Remember:
          </strong>{" "}
          It's not about getting a perfect score.
          It's about discovering the little things
          your friends remember about you.
        </p>
      </div>
    </section>
  );
}