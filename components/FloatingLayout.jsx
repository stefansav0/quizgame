"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const floatAnimation = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Gallery items
const gallery = [
  {
    image: "/favicon.ico",
    title: "How Well Do You Know Me?",
    subtitle: "Tap to begin →",
    href: "/",
  },
  {
    image: "/bff.png",
    title: "Create BFF Quiz",
    subtitle: "Tap to create →",
    href: "/bff-quiz",
  },
  {
    image: "/never-removebg-preview.png",
    title: "Never Have I Ever",
    subtitle: "Tap to play →",
    href: "/nhie",
  },
  {
    image: "/frind-removebg-preview.png",
    title: "Quiz Ideas",
    subtitle: "Tap to explore →",
    href: "/blog/trending-quiz-ideas",
  },
  {
    image: "/ms.png",
    title: "Secret Message",
    subtitle: "Tap to send →",
    href: "/letter/create",
  },
  {
    image: "/tips.png",
    title: "Quiz Tips",
    subtitle: "Tap to learn →",
    href: "/blog/funny-best-friend-challenge-ideas",
  },
];

export default function FloatingLayout({
  activeTheme = "light",
  children,
}) {
  // Safely determine if the theme is light or dark
  const isStringTheme = typeof activeTheme === "string";

  const isLight = isStringTheme
    ? activeTheme === "light"
    : !activeTheme?.bg ||
      activeTheme.bg.includes("50") ||
      activeTheme.bg.includes("white") ||
      activeTheme.bg.includes("100");

  // Background
  const bgClass = isStringTheme
    ? isLight
      ? "from-slate-50 to-slate-100"
      : "from-slate-900 to-slate-800"
    : activeTheme?.bg || "from-slate-50 to-slate-100";

  // Glow
  const glowClass = isStringTheme
    ? isLight
      ? "bg-emerald-500/10"
      : "bg-blue-500/20"
    : activeTheme?.glow || "bg-emerald-500/10";

  // Theme colors
  const textClass = isLight
    ? "text-slate-900"
    : "text-white";

  const cardBgClass = isLight
    ? "bg-white border-slate-200 shadow-xl"
    : "bg-white/10 border-white/20 shadow-2xl";

  const cardTitleClass = isLight
    ? "text-slate-800"
    : "text-white";

  const cardSubtitleClass = isLight
    ? "text-slate-500"
    : "text-white/70";

  const dividerTextClass = isLight
    ? "text-slate-400"
    : "text-slate-400";

  const dividerLineClass = isLight
    ? "bg-slate-300"
    : "bg-white/20";

  return (
    <div
      className={`
        min-h-screen
        bg-gradient-to-br
        ${bgClass}
        flex
        flex-col
        items-center
        px-4
        pb-10
        pt-10
        font-sans
        ${textClass}
        overflow-x-hidden
        transition-colors
        duration-1000
        relative
      `}
    >
      {/* Background Glow */}
      <div
        className={`
          absolute
          top-[10%]
          left-1/2
          -translate-x-1/2
          w-full
          max-w-4xl
          h-[600px]
          blur-[160px]
          rounded-full
          pointer-events-none
          ${glowClass}
        `}
      />

      {/* Main Content */}
      <div
        className="
          w-full
          max-w-4xl
          relative
          z-10
          flex
          flex-col
          items-center
          mt-6
          md:mt-16
        "
      >
        {children}

        {/* Bottom Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.8,
          }}
          className="w-full mt-14 mb-6 sm:mt-20"
        >
          {/* Divider */}
          <div className="flex items-center justify-center gap-3 mb-7 sm:gap-4 sm:mb-8">
            <div
              className={`h-px w-10 sm:w-16 ${dividerLineClass}`}
            />

            <p
              className={`
                text-xs
                sm:text-sm
                font-bold
                uppercase
                tracking-widest
                ${dividerTextClass}
                whitespace-nowrap
              `}
            >
              More Fun Games ❤️
            </p>

            <div
              className={`h-px w-10 sm:w-16 ${dividerLineClass}`}
            />
          </div>

          {/* Gallery */}
          <div
            className="
              grid
              grid-cols-2
              gap-4
              px-1
              sm:gap-5
              sm:px-4
              md:grid-cols-3
              lg:grid-cols-4
            "
          >
            {gallery.map((item, index) => (
              <motion.div
                key={item.href + index}
                variants={floatAnimation}
                animate="animate"
                transition={{
                  delay: index * 0.3,
                }}
                whileHover={{
                  scale: 1.04,
                  rotate: 0,
                }}
                className={`
                  group
                  ${
                    index % 2 === 0
                      ? "rotate-[-2deg]"
                      : "rotate-[2deg] mt-3 md:mt-5"
                  }
                `}
              >
                <Link href={item.href}>
                  <div
                    className={`
                      cursor-pointer
                      overflow-hidden
                      rounded-2xl
                      sm:rounded-3xl
                      ${cardBgClass}
                      backdrop-blur-xl
                      border
                      transition-all
                      duration-300
                      hover:shadow-pink-500/30
                    `}
                  >
                    {/* Image */}
                    <div
                      className="
                        flex
                        aspect-square
                        w-full
                        items-center
                        justify-center
                        overflow-hidden
                        bg-white/50
                      "
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={500}
                        height={500}
                        className="
                          h-full
                          w-full
                          object-contain
                          p-2
                          sm:p-3
                          transition-transform
                          duration-500
                          group-hover:scale-110
                        "
                      />
                    </div>

                    {/* Text */}
                    <div className="p-2.5 text-center sm:p-4">
                      <h3
                        className={`
                          font-semibold
                          text-sm
                          sm:text-lg
                          leading-tight
                          ${cardTitleClass}
                        `}
                      >
                        {item.title}
                      </h3>

                      <p
                        className={`
                          text-xs
                          sm:text-sm
                          mt-1
                          sm:mt-1.5
                          ${cardSubtitleClass}
                        `}
                      >
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}