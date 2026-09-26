
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

import FloatingLayout from "@/components/FloatingLayout";

// --------------------------------------------------
// THEME STYLES
// --------------------------------------------------

const THEME_STYLES = {
  purple: {
    bg: "from-purple-950/40 to-[#0f111a]",
    glow: "bg-purple-600/30",
    text: "from-purple-300 via-indigo-200 to-purple-300",
    paper: "bg-[#1a1c29]/95",
    accent: "text-purple-300",
    button: "from-purple-600 to-indigo-600",
    border: "border-purple-400/20",
  },

  rose: {
    bg: "from-rose-950/40 to-[#0f111a]",
    glow: "bg-rose-600/30",
    text: "from-rose-300 via-pink-200 to-rose-300",
    paper: "bg-[#291a1e]/95",
    accent: "text-rose-300",
    button: "from-rose-600 to-pink-600",
    border: "border-rose-400/20",
  },

  emerald: {
    bg: "from-emerald-950/40 to-[#0f111a]",
    glow: "bg-emerald-600/30",
    text: "from-emerald-300 via-teal-200 to-emerald-300",
    paper: "bg-[#1a2922]/95",
    accent: "text-emerald-300",
    button: "from-emerald-600 to-teal-600",
    border: "border-emerald-400/20",
  },

  amber: {
    bg: "from-amber-950/40 to-[#0f111a]",
    glow: "bg-amber-600/30",
    text: "from-amber-300 via-orange-200 to-amber-300",
    paper: "bg-[#29221a]/95",
    accent: "text-amber-300",
    button: "from-amber-600 to-orange-600",
    border: "border-amber-400/20",
  },

  cyan: {
    bg: "from-cyan-950/40 to-[#0f111a]",
    glow: "bg-cyan-600/30",
    text: "from-cyan-300 via-blue-200 to-cyan-300",
    paper: "bg-[#1a2429]/95",
    accent: "text-cyan-300",
    button: "from-cyan-600 to-blue-600",
    border: "border-cyan-400/20",
  },

  fuchsia: {
    bg: "from-fuchsia-950/40 to-[#0f111a]",
    glow: "bg-fuchsia-600/30",
    text: "from-fuchsia-300 via-pink-200 to-fuchsia-300",
    paper: "bg-[#281a29]/95",
    accent: "text-fuchsia-300",
    button: "from-fuchsia-600 to-pink-600",
    border: "border-fuchsia-400/20",
  },

  red: {
    bg: "from-red-950/40 to-[#0f111a]",
    glow: "bg-red-600/30",
    text: "from-red-300 via-rose-200 to-red-300",
    paper: "bg-[#291a1a]/95",
    accent: "text-red-300",
    button: "from-red-600 to-rose-600",
    border: "border-red-400/20",
  },
};

// --------------------------------------------------
// ANIMATION SETTINGS
// --------------------------------------------------

const teaserVariants = {
  initial: {
    opacity: 0,
    scale: 0.94,
    y: 20,
  },

  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
  },

  exit: {
    opacity: 0,
    scale: 0.96,
    y: -20,
  },
};

const letterVariants = {
  initial: {
    opacity: 0,
    y: 35,
    scale: 0.97,
  },

  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },

  exit: {
    opacity: 0,
    y: -15,
  },
};

// --------------------------------------------------
// LETTER CLIENT
// --------------------------------------------------

export default function LetterClient({ letter }) {
  const [isOpened, setIsOpened] = useState(false);
  const [isAnimating, setIsAnimating] =
    useState(false);

  const openingTimer = useRef(null);
  const openingRef = useRef(false);

  const reduceMotion = useReducedMotion();

  const activeStyle =
    THEME_STYLES[letter?.theme] ||
    THEME_STYLES.purple;

  const recipientName =
    typeof letter?.recipientName === "string" &&
    letter.recipientName.trim()
      ? letter.recipientName.trim()
      : "Someone Special";

  const senderName =
    typeof letter?.senderName === "string" &&
    letter.senderName.trim()
      ? letter.senderName.trim()
      : "Someone Special";

  const message =
    typeof letter?.message === "string"
      ? letter.message
      : "";

  // Clear any pending opening animation if
  // the component unmounts.
  useEffect(() => {
    return () => {
      if (openingTimer.current !== null) {
        clearTimeout(openingTimer.current);
      }
    };
  }, []);

  // -----------------------------------------
  // OPEN ENVELOPE
  // -----------------------------------------

  const handleOpenLetter = () => {
    if (openingRef.current || isOpened) {
      return;
    }

    openingRef.current = true;
    setIsAnimating(true);

    if (reduceMotion) {
      setIsOpened(true);
      setIsAnimating(false);
      return;
    }

    openingTimer.current = setTimeout(() => {
      setIsOpened(true);
      setIsAnimating(false);
      openingTimer.current = null;
    }, 550);
  };

  // -----------------------------------------
  // REPLAY ENVELOPE
  // -----------------------------------------

  const handleCloseLetter = () => {
    if (openingTimer.current !== null) {
      clearTimeout(openingTimer.current);
      openingTimer.current = null;
    }

    openingRef.current = false;
    setIsAnimating(false);
    setIsOpened(false);

    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "instant" : "smooth",
    });
  };

  // -----------------------------------------
  // RENDER
  // -----------------------------------------

  return (
    <FloatingLayout activeTheme={activeStyle}>
      <div className="relative mx-auto w-full max-w-5xl">
        <AnimatePresence mode="wait">
          {/* ----------------------------------
              PHASE 1: SEALED ENVELOPE
          ---------------------------------- */}

          {!isOpened && (
            <motion.section
              key="sealed-envelope"
              variants={teaserVariants}
              initial={
                reduceMotion ? false : "initial"
              }
              animate="animate"
              exit={
                reduceMotion ? undefined : "exit"
              }
              transition={{
                duration: reduceMotion ? 0 : 0.45,
                ease: "easeInOut",
              }}
              aria-label="Your sealed secret letter"
              className="
                relative
                mx-auto
                flex
                min-h-[480px]
                w-full
                max-w-xl
                flex-col
                items-center
                justify-center
                overflow-hidden
                rounded-[2rem]
                border
                border-white/15
                bg-black/25
                px-5
                py-12
                text-center
                shadow-2xl
                backdrop-blur-xl
                sm:min-h-[540px]
                sm:rounded-[3rem]
                sm:px-10
              "
            >
              {/* Decorative glow */}
              <div
                aria-hidden="true"
                className={`
                  pointer-events-none
                  absolute
                  left-1/2
                  top-1/3
                  h-60
                  w-60
                  -translate-x-1/2
                  rounded-full
                  blur-[90px]
                  ${activeStyle.glow}
                `}
              />

              {/* Envelope button */}
              <motion.button
                type="button"
                onClick={handleOpenLetter}
                disabled={isAnimating}
                aria-label={`Open your letter from ${senderName}`}
                animate={
                  reduceMotion || isAnimating
                    ? undefined
                    : {
                        y: [0, -10, 0],
                      }
                }
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  relative
                  z-10
                  mb-7
                  rounded-3xl
                  p-3
                  text-7xl
                  drop-shadow-2xl
                  transition-transform
                  hover:scale-105
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-white
                  disabled:cursor-wait
                  sm:text-8xl
                "
              >
                <span aria-hidden="true">
                  {isAnimating ? "💌" : "💌"}
                </span>
              </motion.button>

              {/* Greeting */}
              <div className="relative z-10 w-full">
                <span
                  className={`
                    mb-4
                    inline-block
                    rounded-full
                    border
                    bg-white/5
                    px-4
                    py-2
                    text-xs
                    font-extrabold
                    uppercase
                    tracking-widest
                    ${activeStyle.border}
                    ${activeStyle.accent}
                  `}
                >
                  A special message for you
                </span>

                <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
                  Hi{" "}
                  <span
                    className={`
                      bg-gradient-to-r
                      bg-clip-text
                      text-transparent
                      ${activeStyle.text}
                    `}
                  >
                    {recipientName}
                  </span>
                  {" "}👋
                </h1>

                <p className="mx-auto mt-5 max-w-md text-base leading-8 text-slate-300 sm:text-lg">
                  <strong className="font-extrabold text-white">
                    {senderName}
                  </strong>{" "}
                  has written a secret letter just
                  for you.
                </p>

                <p className="mt-3 text-sm text-slate-400">
                  Your envelope is waiting to be opened.
                </p>
              </div>

              {/* Open button */}
              <button
                type="button"
                onClick={handleOpenLetter}
                disabled={isAnimating}
                className={`
                  relative
                  z-10
                  mt-9
                  inline-flex
                  min-h-14
                  items-center
                  justify-center
                  gap-3
                  overflow-hidden
                  rounded-2xl
                  bg-gradient-to-r
                  px-8
                  py-4
                  text-base
                  font-black
                  text-white
                  shadow-lg
                  transition
                  hover:brightness-110
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-white
                  disabled:cursor-wait
                  disabled:opacity-60
                  sm:text-lg
                  ${activeStyle.button}
                `}
              >
                {isAnimating ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="
                        h-5
                        w-5
                        animate-spin
                        rounded-full
                        border-2
                        border-white/30
                        border-t-white
                      "
                    />

                    Unsealing...
                  </>
                ) : (
                  <>Open Your Letter ✨</>
                )}
              </button>

              <p className="relative z-10 mt-5 text-xs text-slate-400">
                Tap the envelope or the button to read.
              </p>
            </motion.section>
          )}

          {/* ----------------------------------
              PHASE 2: OPENED LETTER
          ---------------------------------- */}

          {isOpened && (
            <motion.section
              key="opened-letter"
              variants={letterVariants}
              initial={
                reduceMotion ? false : "initial"
              }
              animate="animate"
              exit={
                reduceMotion ? undefined : "exit"
              }
              transition={{
                type: reduceMotion
                  ? "tween"
                  : "spring",
                duration: reduceMotion
                  ? 0
                  : undefined,
                damping: 22,
                stiffness: 110,
              }}
              aria-label={`Letter from ${senderName}`}
              className="mx-auto w-full max-w-3xl"
            >
              {/* Letter paper */}
              <article
                className={`
                  relative
                  w-full
                  min-w-0
                  overflow-hidden
                  rounded-[1.75rem]
                  border
                  border-white/10
                  p-6
                  shadow-[0_20px_60px_rgba(0,0,0,0.35)]
                  backdrop-blur-2xl
                  sm:rounded-[2.5rem]
                  sm:p-10
                  md:p-12
                  ${activeStyle.paper}
                `}
              >
                {/* Decorative envelope */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    right-5
                    top-5
                    select-none
                    text-6xl
                    opacity-10
                    sm:right-9
                    sm:top-9
                    sm:text-8xl
                  "
                >
                  💌
                </div>

                {/* Letter heading */}
                <div className="relative mb-10">
                  <span
                    className={`
                      inline-block
                      text-xs
                      font-extrabold
                      uppercase
                      tracking-[0.2em]
                      ${activeStyle.accent}
                    `}
                  >
                    A message from the heart
                  </span>

                  <h1
                    className={`
                      mt-4
                      bg-gradient-to-r
                      bg-clip-text
                      text-3xl
                      font-black
                      leading-tight
                      tracking-tight
                      text-transparent
                      sm:text-4xl
                      md:text-5xl
                      ${activeStyle.text}
                    `}
                  >
                    A Letter for You
                  </h1>
                </div>

                {/* From and To */}
                <div
                  className="
                    mb-9
                    grid
                    gap-5
                    rounded-2xl
                    border
                    border-white/10
                    bg-black/20
                    p-5
                    sm:grid-cols-2
                    sm:p-6
                  "
                >
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      From
                    </p>

                    <p
                      className={`
                        mt-2
                        break-words
                        text-xl
                        font-black
                        ${activeStyle.accent}
                      `}
                    >
                      {senderName}
                    </p>
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      To
                    </p>

                    <p className="mt-2 break-words text-xl font-black text-white">
                      {recipientName}
                    </p>
                  </div>
                </div>

                {/* Actual letter */}
                <div className="relative">
                  <div
                    className="
                      whitespace-pre-wrap
                      break-words
                      text-base
                      leading-8
                      text-slate-100
                      sm:text-lg
                      sm:leading-9
                    "
                  >
                    {message}
                  </div>
                </div>

                {/* Signature */}
                <div className="mt-12 border-t border-white/10 pt-7">
                  <p className="text-sm font-medium text-slate-400">
                    With love,
                  </p>

                  <p
                    className={`
                      mt-3
                      break-words
                      text-2xl
                      font-black
                      sm:text-3xl
                      ${activeStyle.accent}
                    `}
                  >
                    {senderName} ❤️
                  </p>
                </div>
              </article>

              {/* Actions */}
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleCloseLetter}
                  className="
                    inline-flex
                    min-h-12
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    border
                    border-white/20
                    bg-white/10
                    px-6
                    py-3
                    text-sm
                    font-bold
                    text-white
                    backdrop-blur-lg
                    transition
                    hover:bg-white/20
                    sm:w-auto
                  "
                >
                  ← View Envelope Again
                </button>

                <Link
                  href="/letter/create"
                  className={`
                    inline-flex
                    min-h-12
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    bg-gradient-to-r
                    px-6
                    py-3
                    text-center
                    text-sm
                    font-extrabold
                    text-white
                    shadow-lg
                    transition
                    hover:brightness-110
                    sm:w-auto
                    ${activeStyle.button}
                  `}
                >
                  💌 Create Your Own Letter
                </Link>
              </div>

              {/* Sharing reminder */}
              <p className="mx-auto mt-7 max-w-lg text-center text-xs leading-6 text-slate-300">
                Enjoyed receiving this letter? You
                can write a special message for
                someone you care about, too.
              </p>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </FloatingLayout>
  );
}