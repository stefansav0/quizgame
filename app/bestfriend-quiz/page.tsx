
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Best Friend Quiz – Create Your Friendship Challenge",
  description:
    "Create a personalized Best Friend Quiz on GetKnowify. Ask questions about shared memories, habits and favorite things, then share your quiz and compare your friends' scores.",
  keywords: [
    "best friend quiz",
    "best friend test",
    "friendship challenge",
    "best friend questions",
    "how well do you know me quiz",
    "friendship quiz online",
  ],
  alternates: {
    canonical: "https://getknowify.com/best-friend-quiz",
  },
  openGraph: {
    title: "Best Friend Quiz | GetKnowify",
    description:
      "Turn your favorite memories and everyday habits into a personalized quiz for your friends.",
    url: "https://getknowify.com/best-friend-quiz",
    siteName: "GetKnowify",
    type: "website",
  },
};

const steps = [
  {
    number: "01",
    icon: "✍️",
    title: "Create your questions",
    description:
      "Choose questions about your personality, habits, favorite things and memories. Set the answers your friends will try to guess.",
  },
  {
    number: "02",
    icon: "🔗",
    title: "Share your quiz",
    description:
      "Send your unique quiz link to your best friend, your friendship group or friends who live far away.",
  },
  {
    number: "03",
    icon: "🏆",
    title: "Explore the results",
    description:
      "Compare your friends' scores and discover which details they remembered and which answers surprised them.",
  },
];

const questionCategories = [
  {
    icon: "🍕",
    title: "My favorite things",
    description:
      "Start with familiar questions about the things you enjoy.",
    questions: [
      "What is my favorite snack?",
      "Which movie genre do I enjoy most?",
      "What is my dream vacation destination?",
    ],
  },
  {
    icon: "😂",
    title: "Our shared memories",
    description:
      "Make the quiz personal with moments you experienced together.",
    questions: [
      "Where did we first meet?",
      "Which trip together was my favorite?",
      "What is our funniest shared memory?",
    ],
  },
  {
    icon: "☕",
    title: "My everyday habits",
    description:
      "See who notices the little details about your daily life.",
    questions: [
      "Am I an early bird or a night owl?",
      "How do I usually spend a free Sunday?",
      "Do I prefer coffee or tea?",
    ],
  },
  {
    icon: "💜",
    title: "My personality",
    description:
      "Include questions about your preferences and how you approach life.",
    questions: [
      "Would I rather plan ahead or be spontaneous?",
      "What cheers me up after a difficult day?",
      "Do I prefer a big party or a quiet evening?",
    ],
  },
];

const tips = [
  {
    icon: "🎯",
    title: "Use clear answers",
    description:
      "Choose questions with one intended answer. Avoid options that are so similar that several could reasonably be correct.",
  },
  {
    icon: "📸",
    title: "Include real memories",
    description:
      "A question about a trip, an inside joke or a memorable celebration can make your quiz feel more personal.",
  },
  {
    icon: "⚖️",
    title: "Balance easy and tricky questions",
    description:
      "Mix everyday favorites with less obvious details so both old and new friends can enjoy the challenge.",
  },
  {
    icon: "💗",
    title: "Make it about connection",
    description:
      "Treat the results as a starting point for conversation, not a way to decide who deserves to be your friend.",
  },
];

const faqs = [
  {
    question: "What is a Best Friend Quiz?",
    answer:
      "A Best Friend Quiz is a personalized game where you create questions about yourself and invite friends to guess your answers. It is a playful way to share memories and learn more about each other.",
  },
  {
    question: "How do I create a Best Friend Quiz?",
    answer:
      "Select Create Your Quiz, choose or write questions about yourself, set your answers and finish creating your challenge. You can then copy the generated link and share it.",
  },
  {
    question: "What should I ask in my Best Friend Quiz?",
    answer:
      "Start with favorite foods, movies and hobbies. Then add questions about your everyday habits, dream destinations, shared memories or inside jokes.",
  },
  {
    question: "Can I personalize the questions?",
    answer:
      "You can use the question options available in the quiz creator to build a challenge that reflects your personality and interests.",
  },
  {
    question: "How do my friends participate?",
    answer:
      "Send your friends the quiz link. They open it, enter their answers and submit their guesses to see how well they know you.",
  },
  {
    question: "How are quiz scores calculated?",
    answer:
      "Your friends' selected answers are compared with the answers you set when creating the quiz. Their score reflects how many questions they answered correctly.",
  },
  {
    question: "Can I compare my friends' results?",
    answer:
      "You can use your quiz results to compare scores from recorded attempts. The information available for each attempt may vary.",
  },
  {
    question: "Can I share the quiz on WhatsApp or Instagram?",
    answer:
      "Yes. Copy your quiz link and send it through WhatsApp, Instagram or another platform that supports sharing links.",
  },
  {
    question: "Does the highest score mean someone is my best friend?",
    answer:
      "No. The score only measures correct answers to your chosen questions. A meaningful friendship involves much more than remembering someone's favorite things.",
  },
  {
    question: "Are my quiz questions and results private?",
    answer:
      "Avoid including sensitive personal information. Anyone who receives your quiz link may be able to open or forward it, so only share questions and answers you're comfortable making accessible.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <span className="inline-flex rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-indigo-700">
        {eyebrow}
      </span>

      <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-base leading-8 text-slate-600">
          {description}
        </p>
      )}
    </div>
  );
}

function CreateButton({
  children = "Create Your Best Friend Quiz",
  light = false,
}: {
  children?: React.ReactNode;
  light?: boolean;
}) {
  return (
    <Link
      href="/create"
      className={
        light
          ? "inline-flex min-h-14 items-center justify-center rounded-2xl bg-white px-8 py-4 text-center font-extrabold text-indigo-700 shadow-lg transition hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          : "inline-flex min-h-14 items-center justify-center rounded-2xl bg-indigo-600 px-8 py-4 text-center font-extrabold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
      }
    >
      {children}
    </Link>
  );
}

export default function BestfriendQuizPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-violet-50/50 to-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-28 top-12 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 top-36 h-80 w-80 rounded-full bg-pink-200/40 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:py-20 lg:grid-cols-2 lg:py-24">
          <div className="text-center lg:text-left">
            <span className="inline-flex rounded-full border border-indigo-200 bg-white px-4 py-2 text-xs font-bold text-indigo-700 shadow-sm sm:text-sm">
              💜 Celebrate your friendship
            </span>

            <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Best Friend Quiz
              <span className="mt-2 block bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500 bg-clip-text text-transparent">
                How Well Do They Know You?
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg lg:mx-0">
              From your favorite snack to your
              funniest shared memory, how much
              do your friends remember?
              Create a personalized Best Friend
              Quiz, share it with your favorite
              people and compare their answers.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <CreateButton>
                Create Your Quiz →
              </CreateButton>

              <a
                href="#how-it-works"
                className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 py-4 font-bold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700"
              >
                How It Works
              </a>
            </div>

            <p className="mt-5 text-sm text-slate-500">
              Create • Share • Guess • Reconnect
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div
              aria-hidden="true"
              className="absolute inset-8 rounded-full bg-indigo-200/50 blur-3xl"
            />

            <div className="relative rounded-[2rem] border border-indigo-100 bg-white/90 p-8 shadow-xl shadow-indigo-900/10 sm:p-12">
              <Image
                src="/best.png"
                alt="Best Friend Quiz illustration"
                width={420}
                height={420}
                priority
                sizes="(max-width: 640px) 260px, 420px"
                className="mx-auto h-auto w-full max-w-[340px] object-contain drop-shadow-lg"
              />

              <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50 p-5 text-center">
                <p className="text-lg font-extrabold text-indigo-800">
                  👯 Every friendship has a story
                </p>

                <p className="mt-2 text-sm leading-6 text-indigo-700">
                  Turn yours into a challenge
                  worth sharing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="border-t border-slate-100 px-5 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-flex rounded-full bg-indigo-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-indigo-700">
              About the game
            </span>

            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
              What Is a Best Friend Quiz?
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              A Best Friend Quiz is a
              personalized game made by you,
              about you. Instead of answering
              general trivia questions,
              your friends try to guess
              your preferences, habits
              and personal experiences.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              You choose the questions and
              set your answers before sharing
              the quiz. Your friends then
              complete the challenge and
              receive scores based on
              their correct guesses.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              The most enjoyable questions
              often come from real experiences:
              a memorable trip, an inside
              joke, a favorite restaurant
              or something you always do
              when you're together.
            </p>
          </div>

          <div className="rounded-[2rem] border border-indigo-100 bg-gradient-to-br from-indigo-50 to-violet-50 p-7 sm:p-10">
            <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">
                Example question
              </span>

              <h3 className="mt-5 text-xl font-black leading-relaxed">
                What's my ideal way to spend
                a weekend with friends?
              </h3>

              <div className="mt-6 space-y-3">
                {[
                  "🎬 Watching movies together",
                  "🏕️ Going on an adventure",
                  "🍕 Trying new restaurants",
                  "🎮 Playing games at home",
                ].map((answer, index) => (
                  <div
                    key={answer}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-indigo-200 bg-white text-sm font-bold text-indigo-700">
                      {String.fromCharCode(65 + index)}
                    </span>

                    <span className="font-medium text-slate-700">
                      {answer}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-center text-xs text-slate-500">
                Example only — create your
                own quiz to play.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="scroll-mt-24 bg-slate-50 px-5 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Three easy steps"
            title="How the Best Friend Quiz Works"
            description="Create your challenge, share it with friends and enjoy comparing your results."
          />

          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.number}
                className="relative rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <span
                  aria-hidden="true"
                  className="absolute right-6 top-5 text-5xl font-black text-indigo-100"
                >
                  {step.number}
                </span>

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-3xl">
                  {step.icon}
                </div>

                <h3 className="text-xl font-black">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <CreateButton>
              Start Your Quiz →
            </CreateButton>
          </div>
        </div>
      </section>

      {/* QUESTION CATEGORIES */}
      <section className="px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Question inspiration"
            title="12 Best Friend Quiz Question Ideas"
            description="Use these ideas to create a challenge based on your personality and friendship memories."
          />

          <div className="grid gap-6 md:grid-cols-2">
            {questionCategories.map((category) => (
              <article
                key={category.title}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-3xl">
                    {category.icon}
                  </div>

                  <div>
                    <h3 className="text-xl font-black">
                      {category.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {category.description}
                    </p>
                  </div>
                </div>

                <ul className="mt-6 space-y-3">
                  {category.questions.map((question) => (
                    <li
                      key={question}
                      className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 text-sm font-medium leading-6 text-slate-700"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-0.5 text-indigo-600"
                      >
                        ✓
                      </span>
                      <span>{question}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="mt-7 text-center text-sm text-slate-500">
            These are examples. Choose
            questions that reflect your
            own experiences and interests.
          </p>
        </div>
      </section>

      {/* PERSONALIZATION */}
      <section className="bg-slate-50 px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Make it memorable"
            title="How to Create a More Personal Quiz"
            description="The most entertaining questions are often about moments that matter to your friendship."
          />

          <div className="grid gap-5 sm:grid-cols-2">
            {tips.map((tip) => (
              <article
                key={tip.title}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <div className="flex items-start gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-3xl">
                    {tip.icon}
                  </div>

                  <div>
                    <h3 className="text-lg font-black">
                      {tip.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {tip.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* UNDERSTANDING SCORES */}
      <section className="px-5 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-flex rounded-full bg-indigo-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-indigo-700">
              Understanding your results
            </span>

            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
              What Do Best Friend Quiz Scores Mean?
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Your friends earn points by
              choosing the answers you set
              when creating your quiz.
              More correct answers lead
              to a higher score.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              A high score can be a fun
              reminder of how many details
              someone remembers. A lower
              score might reveal a surprising
              preference or start a
              funny conversation.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Scores are not a measurement
              of trust, loyalty or the
              importance of a friendship.
              Enjoy the challenge without
              taking the results too seriously.
            </p>
          </div>

          <div className="rounded-[2rem] border border-indigo-100 bg-gradient-to-br from-indigo-50 to-pink-50 p-7 sm:p-10">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-black">
                Example score
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Illustration only — not live results.
              </p>

              <div className="mt-7 text-center">
                <span className="text-6xl font-black text-indigo-600">
                  8/10
                </span>

                <p className="mt-3 font-bold text-slate-800">
                  8 correct answers
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Your friend correctly guessed
                  eight of your ten answers.
                </p>
              </div>

              <div className="mt-7 h-3 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-4/5 rounded-full bg-indigo-500" />
              </div>

              <p className="mt-5 text-center text-sm text-slate-600">
                The fun part is discussing
                the answers afterward!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRIVACY */}
      <section className="bg-slate-50 px-5 py-14">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-indigo-200 bg-indigo-50 p-7 sm:p-10">
          <h2 className="text-2xl font-black">
            🔒 Share Thoughtfully
          </h2>

          <p className="mt-4 leading-8 text-slate-700">
            Only include questions and answers
            you're comfortable sharing.
            Avoid sensitive information
            such as passwords, addresses
            and private contact details.
          </p>

          <p className="mt-4 leading-8 text-slate-700">
            A friend may forward your quiz
            link to someone else. Treat
            shared links as accessible
            to anyone who receives them,
            unless additional access
            controls are provided.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="Frequently asked questions"
            title="Best Friend Quiz FAQs"
            description="Answers to common questions about creating, sharing and playing your friendship quiz."
          />

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-white px-5 py-5 open:border-indigo-200 open:bg-indigo-50/40 sm:px-7"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-900 [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>

                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xl text-indigo-600 transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>

                <p className="mt-4 border-t border-slate-200 pt-4 text-sm leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED GAMES */}
      <section className="bg-slate-50 px-5 py-14">
        <div className="mx-auto max-w-5xl rounded-3xl border border-indigo-100 bg-white p-7 shadow-sm sm:p-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-700">
            Explore more games
          </span>

          <h2 className="mt-3 text-2xl font-black sm:text-3xl">
            More Ways to Challenge Your Friends
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Looking for a different type
            of challenge? Try our BFF Quiz
            or create a Never Have I Ever
            game for your friendship group.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/bff-quiz"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white transition hover:bg-indigo-700"
            >
              Explore BFF Quiz →
            </Link>

            <Link
              href="/nhie"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 font-bold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700"
            >
              Never Have I Ever →
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-600 via-violet-600 to-pink-500 px-6 py-14 text-center text-white shadow-xl shadow-indigo-600/10 sm:px-12 sm:py-16">
          <span className="text-5xl" aria-hidden="true">
            👯
          </span>

          <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-black sm:text-4xl">
            Ready to Create Your Best Friend Quiz?
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-8 text-indigo-50">
            Turn your favorite memories
            and everyday habits into a
            personalized challenge
            for your friends.
          </p>

          <div className="mt-8">
            <CreateButton light>
              Create My Quiz →
            </CreateButton>
          </div>

          <p className="mt-5 text-sm text-indigo-100">
            Share memories. Discover surprises. Celebrate friendship.
          </p>
        </div>
      </section>
    </main>
  );
}