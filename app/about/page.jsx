"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full bg-white px-4 py-8 sm:px-6 sm:py-14">
      <div className="mx-auto w-full max-w-3xl">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="
            rounded-2xl
            bg-[#f8f7ff]
            px-6
            py-8
            shadow-[0_6px_0_rgba(0,0,0,0.06)]
            sm:px-10
            sm:py-10
          "
        >

         

          {/* TITLE */}
          <h1
            className="
              mb-7
              text-center
              text-2xl
              font-medium
              uppercase
              tracking-wide
              text-[#c47b8c]
              sm:text-3xl
            "
          >
            About GetKnowify
          </h1>

          {/* CONTENT */}
          <div className="space-y-6 text-[15px] leading-7 text-gray-900 sm:text-[17px] sm:leading-8">

            <p>
              Everyone enjoys a good quiz, especially when it is about the
              people we know and care about. GetKnowify was created to make
              those moments more fun, personal, and interactive.
            </p>

            <p>
              GetKnowify is a fun social platform where friends, classmates,
              couples, and families can create quizzes and discover how well
              they really know each other.
            </p>

            <p>
              You can create your own questions, share your quiz with
              friends, answer quizzes made by others, and compare the
              results. Sometimes you may discover that your best friend
              knows you better than you expected — and sometimes you may be
              surprised!
            </p>

            <p>
              Our goal is simple: to create small moments of fun, laughter,
              conversation, and connection between people.
            </p>

          </div>

        </motion.div>

      </div>
    </main>
  );
}