
"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { TEMPLATES } from "@/constants/letterData";

const TOTAL_STEPS = 4;

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 35 : -35,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 35 : -35,
    opacity: 0,
  }),
};

const infoCards = [
  {
    icon: "💌",
    title: "About Secret Letters",
    description:
      "Sometimes it's easier to put your feelings into words. Write a heartfelt message, an apology, a thank-you note, or a little reminder that someone matters to you.",
  },
  {
    icon: "✨",
    title: "How It Works",
    steps: [
      "Enter your name and the recipient's name.",
      "Choose a theme or message template.",
      "Personalize your message.",
      "Seal your letter and share its link.",
    ],
  },
  {
    icon: "🔒",
    title: "Before You Share",
    description:
      "Anyone who receives your letter link may be able to open it or forward it. Only include information you're comfortable sharing. You can delete your active letter using the option on its management screen.",
  },
];

export default function LetterWizard({
  letterData,
  handleChange,
  activeTheme,
  activeTemplate,
  applyTemplate,
  handleSealEnvelope,
  isSubmitting,
}) {
  const [wizardStep, setWizardStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const reduceMotion = useReducedMotion();

  const theme = {
    text: activeTheme?.text || "from-purple-300 to-pink-300",
    button:
      activeTheme?.button ||
      "from-purple-600 to-pink-600",
    label: activeTheme?.label || "text-purple-300",
    border:
      activeTheme?.border ||
      "focus:border-purple-400",
  };

  const senderName =
    typeof letterData?.senderName === "string"
      ? letterData.senderName
      : "";

  const recipientName =
    typeof letterData?.recipientName === "string"
      ? letterData.recipientName
      : "";

  const message =
    typeof letterData?.message === "string"
      ? letterData.message
      : "";

  const canProceed = () => {
    switch (wizardStep) {
      case 0:
        return senderName.trim().length > 0;
      case 1:
        return recipientName.trim().length > 0;
      case 2:
        return Boolean(activeTemplate);
      case 3:
        return message.trim().length > 0;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (!canProceed() || wizardStep >= TOTAL_STEPS - 1) {
      return;
    }

    setDirection(1);
    setWizardStep((previous) => previous + 1);
  };

  const prevStep = () => {
    if (wizardStep <= 0 || isSubmitting) return;

    setDirection(-1);
    setWizardStep((previous) => previous - 1);
  };

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent?.isComposing &&
      canProceed()
    ) {
      event.preventDefault();
      nextStep();
    }
  };

  const handleSubmit = () => {
    if (!canProceed() || isSubmitting) return;

    handleSealEnvelope();
  };

  const animationProps = {
    custom: direction,
    variants: slideVariants,
    initial: reduceMotion ? false : "enter",
    animate: "center",
    exit: reduceMotion ? undefined : "exit",
    transition: {
      duration: reduceMotion ? 0 : 0.3,
      ease: "easeOut",
    },
  };

  return (
    <div className="flex w-full min-w-0 flex-col items-center">
      {/* MAIN WIZARD */}
      <section
        aria-label="Create your secret letter"
        className="
          relative
          mx-auto
          flex
          min-h-[420px]
          w-full
          max-w-4xl
          flex-col
          overflow-hidden
          rounded-[1.75rem]
          border
          border-white/10
          bg-[#13151f]/90
          shadow-2xl
          backdrop-blur-xl
          sm:rounded-[2.5rem]
        "
      >
        {/* Progress bar */}
        {wizardStep > 0 && (
          <div
            className="absolute left-0 top-0 z-20 h-1 w-full bg-white/10"
            role="progressbar"
            aria-label="Letter creation progress"
            aria-valuemin={0}
            aria-valuemax={3}
            aria-valuenow={wizardStep}
          >
            <div
              className={`
                h-full
                bg-gradient-to-r
                transition-all
                duration-300
                ${theme.button}
              `}
              style={{
                width: `${(wizardStep / 3) * 100}%`,
              }}
            />
          </div>
        )}

        {/* Step content */}
        <div className="relative flex min-h-[420px] flex-1 flex-col">
          <AnimatePresence mode="wait" custom={direction}>
            {/* STEP 0: INTRODUCTION */}
            {wizardStep === 0 && (
              <motion.div
                key="letter-step-0"
                {...animationProps}
                className="
                  flex
                  min-h-[420px]
                  flex-col
                  justify-center
                  gap-9
                  p-6
                  sm:p-10
                  md:p-12
                "
              >
                <div className="text-center">
                  <span
                    className="mb-5 block text-6xl"
                    aria-hidden="true"
                  >
                    💌
                  </span>

                  <h1
                    className={`
                      bg-gradient-to-r
                      bg-clip-text
                      text-4xl
                      font-black
                      tracking-tight
                      text-transparent
                      sm:text-5xl
                      md:text-6xl
                      ${theme.text}
                    `}
                  >
                    Secret Letters
                  </h1>

                  <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                    Some feelings deserve more than a
                    quick message. Create a thoughtful
                    digital letter for someone special.
                  </p>
                </div>

                <div className="mx-auto w-full max-w-md">
                  <label
                    htmlFor="letter-sender-name"
                    className={`
                      mb-3
                      block
                      text-center
                      text-xs
                      font-extrabold
                      uppercase
                      tracking-widest
                      ${theme.label}
                    `}
                  >
                    First, what's your name?
                  </label>

                  <div className="flex flex-col gap-3 sm:relative">
                    <input
                      id="letter-sender-name"
                      type="text"
                      name="senderName"
                      value={senderName}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      placeholder="E.g. Alex"
                      autoComplete="name"
                      maxLength={100}
                      className={`
                        min-h-14
                        w-full
                        rounded-2xl
                        border
                        border-white/15
                        bg-black/40
                        px-5
                        py-4
                        text-base
                        font-medium
                        text-white
                        outline-none
                        transition
                        placeholder:text-slate-500
                        focus:bg-black/60
                        sm:pr-32
                        ${theme.border}
                      `}
                    />

                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!canProceed()}
                      className={`
                        min-h-12
                        rounded-xl
                        bg-gradient-to-r
                        px-6
                        font-extrabold
                        text-white
                        transition
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                        sm:absolute
                        sm:bottom-1
                        sm:right-1
                        sm:top-1
                        ${theme.button}
                      `}
                    >
                      Start →
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 1: RECIPIENT */}
            {wizardStep === 1 && (
              <motion.div
                key="letter-step-1"
                {...animationProps}
                className="
                  flex
                  min-h-[440px]
                  flex-col
                  items-center
                  justify-center
                  gap-8
                  p-6
                  text-center
                  sm:p-10
                "
              >
                <div>
                  <span
                    className="mb-4 block text-6xl"
                    aria-hidden="true"
                  >
                    💖
                  </span>

                  <h2 className="text-3xl font-black text-white sm:text-4xl">
                    Who is this letter for?
                  </h2>

                  <p className="mt-4 text-base leading-7 text-slate-400">
                    Enter the name of the person
                    receiving your letter.
                  </p>
                </div>

                <div className="w-full max-w-md text-left">
                  <label
                    htmlFor="letter-recipient-name"
                    className={`
                      mb-3
                      block
                      text-xs
                      font-extrabold
                      uppercase
                      tracking-widest
                      ${theme.label}
                    `}
                  >
                    Recipient's name
                  </label>

                  <input
                    id="letter-recipient-name"
                    type="text"
                    name="recipientName"
                    value={recipientName}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="E.g. Sarah"
                    autoComplete="off"
                    maxLength={100}
                    className={`
                      min-h-14
                      w-full
                      rounded-2xl
                      border
                      border-white/15
                      bg-black/40
                      px-5
                      py-4
                      text-base
                      font-medium
                      text-white
                      outline-none
                      transition
                      placeholder:text-slate-500
                      focus:bg-black/60
                      ${theme.border}
                    `}
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 2: TEMPLATE */}
            {wizardStep === 2 && (
              <motion.div
                key="letter-step-2"
                {...animationProps}
                className="
                  flex
                  min-h-[440px]
                  flex-col
                  p-6
                  sm:p-10
                "
              >
                <div className="mb-8 text-center">
                  <span
                    className="mb-4 block text-5xl"
                    aria-hidden="true"
                  >
                    ✨
                  </span>

                  <h2 className="text-3xl font-black text-white sm:text-4xl">
                    Pick a Vibe
                  </h2>

                  <p className="mt-4 text-base leading-7 text-slate-400">
                    Choose a template to set the
                    tone of your letter.
                  </p>
                </div>

                <div
                  className="
                    mx-auto
                    grid
                    w-full
                    max-w-3xl
                    grid-cols-2
                    gap-3
                    sm:grid-cols-3
                    lg:grid-cols-4
                  "
                  aria-label="Letter templates"
                >
                  {TEMPLATES.map((template) => {
                    const selected =
                      activeTemplate === template.id;

                    return (
                      <button
                        key={template.id}
                        type="button"
                        onClick={() =>
                          applyTemplate(
                            template.id,
                            template.theme
                          )
                        }
                        aria-pressed={selected}
                        className={`
                          flex
                          min-h-32
                          min-w-0
                          flex-col
                          items-center
                          justify-center
                          gap-3
                          rounded-2xl
                          border
                          p-4
                          text-center
                          font-bold
                          transition-all
                          focus-visible:outline
                          focus-visible:outline-2
                          focus-visible:outline-offset-2
                          focus-visible:outline-purple-400
                          ${
                            selected
                              ? `border-transparent bg-gradient-to-br text-white shadow-lg ${theme.button}`
                              : "border-white/10 bg-black/30 text-slate-300 hover:border-white/30 hover:bg-white/10"
                          }
                        `}
                      >
                        <span
                          className="text-4xl"
                          aria-hidden="true"
                        >
                          {template.icon}
                        </span>

                        <span className="break-words text-xs uppercase tracking-wide sm:text-sm">
                          {template.label}
                        </span>

                        {selected && (
                          <span className="text-xs font-semibold text-white/90">
                            Selected ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 3: COMPOSE */}
            {wizardStep === 3 && (
              <motion.div
                key="letter-step-3"
                {...animationProps}
                className="
                  flex
                  min-h-[490px]
                  flex-col
                  p-6
                  sm:p-10
                "
              >
                <div className="mb-7 text-center">
                  <h2
                    className={`
                      bg-gradient-to-r
                      bg-clip-text
                      text-3xl
                      font-black
                      text-transparent
                      sm:text-4xl
                      ${theme.text}
                    `}
                  >
                    Write Your Heart Out
                  </h2>

                  <p className="mt-3 text-base leading-7 text-slate-400">
                    Personalize your template or
                    write something entirely your own.
                  </p>
                </div>

                <div className="relative mx-auto flex w-full max-w-3xl flex-1 flex-col">
                  <label
                    htmlFor="letter-message"
                    className={`
                      mb-3
                      text-xs
                      font-extrabold
                      uppercase
                      tracking-widest
                      ${theme.label}
                    `}
                  >
                    Your message
                  </label>

                  <div
                    aria-hidden="true"
                    className={`
                      pointer-events-none
                      absolute
                      inset-0
                      rounded-3xl
                      bg-gradient-to-r
                      opacity-10
                      blur-xl
                      ${theme.button}
                    `}
                  />

                  <textarea
                    id="letter-message"
                    name="message"
                    value={message}
                    onChange={handleChange}
                    placeholder="Dear someone special..."
                    rows={10}
                    className={`
                      relative
                      min-h-[300px]
                      w-full
                      flex-1
                      resize-y
                      rounded-3xl
                      border
                      border-white/15
                      bg-[#0a0b10]/95
                      px-5
                      py-5
                      text-base
                      font-medium
                      leading-8
                      text-white
                      outline-none
                      transition
                      placeholder:text-slate-500
                      sm:px-7
                      sm:py-7
                      ${theme.border}
                    `}
                  />

                  <p className="relative mt-3 text-right text-xs text-slate-400">
                    {message.length} characters
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* PERSISTENT NAVIGATION */}
        {wizardStep > 0 && (
          <div
            className="
              flex
              flex-wrap
              items-center
              justify-between
              gap-3
              border-t
              border-white/10
              bg-black/30
              p-4
              backdrop-blur-lg
              sm:p-6
            "
          >
            <button
              type="button"
              onClick={prevStep}
              disabled={isSubmitting}
              className="
                min-h-12
                rounded-xl
                border
                border-white/10
                bg-white/5
                px-5
                py-3
                font-bold
                text-slate-300
                transition
                hover:bg-white/10
                hover:text-white
                disabled:opacity-50
              "
            >
              ← Back
            </button>

            <span className="order-3 w-full text-center text-xs font-semibold text-slate-400 sm:order-none sm:w-auto">
              Step {wizardStep + 1} of {TOTAL_STEPS}
            </span>

            {wizardStep < TOTAL_STEPS - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={!canProceed()}
                className={`
                  min-h-12
                  rounded-xl
                  bg-gradient-to-r
                  px-6
                  py-3
                  font-bold
                  text-white
                  transition
                  hover:brightness-110
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  ${theme.button}
                `}
              >
                Continue →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
                className={`
                  min-h-12
                  rounded-xl
                  bg-gradient-to-r
                  px-5
                  py-3
                  font-black
                  text-white
                  transition
                  hover:brightness-110
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  sm:px-7
                  ${theme.button}
                `}
              >
                {isSubmitting
                  ? "Sealing..."
                  : "Seal Envelope 💌"}
              </button>
            )}
          </div>
        )}
      </section>

      {/* INFORMATION CARDS
          Visible on the introductory step.
          Outside the wizard's max-w-4xl container.
      */}
      <AnimatePresence>
        {wizardStep === 0 && (
          <motion.section
            key="letter-information"
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 20 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={
              reduceMotion
                ? undefined
                : { opacity: 0, y: -10 }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.35,
            }}
            aria-label="About Secret Letters"
            className="
              mx-auto
              mt-10
              w-full
              min-w-0
              max-w-6xl
              pb-8
              sm:mt-14
            "
          >
            <div
              className="
                grid
                w-full
                grid-cols-1
                gap-5
                md:grid-cols-3
                md:gap-6
              "
            >
              {infoCards.map((card) => (
                <article
                  key={card.title}
                  className="
                    min-w-0
                    rounded-3xl
                    border
                    border-white/10
                    bg-black/20
                    p-6
                    shadow-xl
                    backdrop-blur-md
                    transition-colors
                    hover:bg-black/30
                    sm:p-7
                  "
                >
                  <span
                    className="mb-4 block text-3xl"
                    aria-hidden="true"
                  >
                    {card.icon}
                  </span>

                  <h2
                    className={`
                      mb-4
                      break-words
                      text-xl
                      font-black
                      sm:text-2xl
                      ${theme.label}
                    `}
                  >
                    {card.title}
                  </h2>

                  {card.description && (
                    <p className="break-words text-sm leading-7 text-slate-200 sm:text-base">
                      {card.description}
                    </p>
                  )}

                  {card.steps && (
                    <ol className="space-y-3">
                      {card.steps.map((item, index) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm leading-7 text-slate-200 sm:text-base"
                        >
                          <span
                            className={`
                              flex
                              h-7
                              w-7
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              bg-white/10
                              text-xs
                              font-black
                              ${theme.label}
                            `}
                          >
                            {index + 1}
                          </span>

                          <span className="min-w-0 break-words">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ol>
                  )}
                </article>
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}