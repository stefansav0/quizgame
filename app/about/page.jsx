"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full bg-white px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto w-full max-w-4xl">

        {/* MAIN CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-6
            py-8
            shadow-sm
            sm:px-10
            sm:py-10
            md:px-12
            md:py-12
          "
        >

          {/* BACK LINK */}
          <Link
            href="/"
            className="
              mb-8
              inline-flex
              items-center
              text-sm
              font-semibold
              text-indigo-600
              transition-colors
              hover:text-indigo-800
            "
          >
            ← Back to Home
          </Link>


          {/* HEADER */}
          <div
            className="
              mb-12
              border-b
              border-slate-200
              pb-8
              text-center
            "
          >
            <h1
              className="
                text-3xl
                font-black
                tracking-tight
                text-slate-900
                sm:text-4xl
              "
            >
              About GetKnowify
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
              A simple place to create quizzes, play social games, share
              personal messages, and have more meaningful moments with the
              people you know.
            </p>
          </div>


          {/* ABOUT CONTENT */}
          <div
            className="
              space-y-6
              text-[15px]
              leading-7
              text-slate-700
              sm:text-base
              sm:leading-8
            "
          >

            <p>
              Everyone enjoys a good quiz, especially when it is about the
              people we know and care about. GetKnowify was created to make
              those moments more fun, personal, and interactive.
            </p>

            <p>
              GetKnowify is a social entertainment platform where friends,
              classmates, couples, and groups can create quizzes, play
              interactive games, share personal messages, and discover how
              well they really know each other.
            </p>

            <p>
              You can create your own questions, build a quiz, share it with
              friends, answer quizzes made by others, and compare the
              results. Whether you are testing your best friend, planning a
              party game, having a date night, or simply looking for a fun
              way to start a conversation, GetKnowify is designed to make
              those interactions more engaging.
            </p>

            <p>
              GetKnowify also provides ideas and inspiration for quizzes and
              social games. Our{" "}
              <Link
                href="/ideas"
                className="
                  font-semibold
                  text-indigo-600
                  underline
                  underline-offset-4
                  transition-colors
                  hover:text-indigo-800
                "
              >
                Quiz &amp; Game Ideas
              </Link>{" "}
              section includes questions, challenges, activities, and game
              ideas that you can use with friends, couples, classmates, and
              groups.
            </p>

            <p>
              We believe that online interactions can be more meaningful when
              they give people something to talk about, laugh about, and
              remember together. That is why GetKnowify focuses on simple,
              interactive experiences rather than complicated social features.
            </p>

            <p>
              Our goal is simple: to create small moments of fun, laughter,
              conversation, and connection between people.
            </p>

          </div>


          {/* WHAT YOU CAN DO */}
          <div className="mt-12 border-t border-slate-200 pt-10">

            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              What You Can Do on GetKnowify
            </h2>

            <div className="space-y-7 text-[15px] leading-7 text-slate-700 sm:text-base sm:leading-8">

              {/* Friendship Quizzes */}
              <div>
                <h3 className="font-bold text-slate-900">
                  Create Friendship Quizzes
                </h3>

                <p className="mt-1">
                  Create personalized questions and find out how well your
                  friends really know you.
                </p>
              </div>


              {/* Interactive Games */}
              <div>
                <h3 className="font-bold text-slate-900">
                  Play Interactive Games
                </h3>

                <p className="mt-1">
                  Try games such as Never Have I Ever and other simple
                  activities designed for friends, groups, and social
                  occasions.
                </p>
              </div>


              {/* Personal Messages */}
              <div>
                <h3 className="font-bold text-slate-900">
                  Share Personal Messages
                </h3>

                <p className="mt-1">
                  Create digital letters and personal messages to share
                  appreciation, memories, encouragement, or special moments.
                </p>
              </div>


              {/* Ideas */}
              <div>
                <h3 className="font-bold text-slate-900">
                  Find Quiz &amp; Game Ideas
                </h3>

                <p className="mt-1">
                  Explore practical questions, challenges, and activities to
                  help you create your own games and conversations.
                </p>
              </div>

            </div>
          </div>


          {/* EXPLORE GETKNOWIFY */}
          <div className="mt-12 border-t border-slate-200 pt-10">

            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              Explore GetKnowify
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">

              {/* CREATE QUIZ */}
              <Link
                href="/create"
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-6
                  transition-all
                  duration-200
                  hover:-translate-y-1
                  hover:border-indigo-300
                  hover:shadow-md
                "
              >
                <h3 className="font-bold text-slate-900">
                  Create a Quiz
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Create a personalized quiz and share it with your friends.
                </p>

                <span className="mt-4 inline-flex font-semibold text-indigo-600">
                  Start Creating →
                </span>
              </Link>


              {/* NEVER HAVE I EVER */}
              <Link
                href="/nhie"
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-6
                  transition-all
                  duration-200
                  hover:-translate-y-1
                  hover:border-indigo-300
                  hover:shadow-md
                "
              >
                <h3 className="font-bold text-slate-900">
                  Never Have I Ever
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Play a quick question game with friends and compare your
                  answers.
                </p>

                <span className="mt-4 inline-flex font-semibold text-indigo-600">
                  Play Now →
                </span>
              </Link>


              {/* QUIZ & GAME IDEAS */}
              <Link
                href="/ideas"
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-6
                  transition-all
                  duration-200
                  hover:-translate-y-1
                  hover:border-indigo-300
                  hover:shadow-md
                "
              >
                <h3 className="font-bold text-slate-900">
                  Quiz &amp; Game Ideas
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Find questions, challenges, activities, and ideas for your
                  next game.
                </p>

                <span className="mt-4 inline-flex font-semibold text-indigo-600">
                  Explore Ideas →
                </span>
              </Link>


              {/* DIGITAL LETTER */}
              <Link
                href="/letter/create"
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-6
                  transition-all
                  duration-200
                  hover:-translate-y-1
                  hover:border-indigo-300
                  hover:shadow-md
                "
              >
                <h3 className="font-bold text-slate-900">
                  Create a Digital Letter
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Create a personal digital message for someone special.
                </p>

                <span className="mt-4 inline-flex font-semibold text-indigo-600">
                  Create a Letter →
                </span>
              </Link>

            </div>
          </div>


          {/* FINAL CTA */}
          <div
            className="
              mt-12
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              p-6
              text-center
              sm:p-8
            "
          >
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Ready to Have Some Fun?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
              Create a quiz, challenge your friends, play a game, or explore
              ideas for your next conversation.
            </p>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">

              <Link
                href="/create"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-xl
                  bg-indigo-600
                  px-6
                  py-3
                  text-sm
                  font-bold
                  text-white
                  transition
                  hover:bg-indigo-700
                "
              >
                Create a Quiz →
              </Link>

              <Link
                href="/ideas"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-6
                  py-3
                  text-sm
                  font-bold
                  text-slate-900
                  transition
                  hover:border-indigo-300
                  hover:text-indigo-600
                "
              >
                Explore Ideas →
              </Link>

            </div>
          </div>

        </motion.div>

      </div>
    </main>
  );
}