
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Fake Friend Quiz – How Well Do Your Friends Know You?",
  description:
    "Create a personalized Fake Friend Quiz on GetKnowify. Add questions about yourself, share your quiz with friends, and compare their scores to discover how well they know you.",
  keywords: [
    "fake friend quiz",
    "friendship quiz",
    "how well do you know me",
    "best friend quiz",
    "friendship challenge",
    "online friendship quiz",
  ],
  alternates: {
    canonical: "https://getknowify.com/fake-friend-quiz",
  },
  openGraph: {
    title: "Fake Friend Quiz | GetKnowify",
    description:
      "Create your own friendship quiz, share it with friends, and see how well they know you.",
    url: "https://getknowify.com/fake-friend-quiz",
    siteName: "GetKnowify",
    type: "website",
  },
};

const sampleQuestions = [
  {
    icon: "🍕",
    category: "Favorites",
    question: "What's my favorite food?",
    tip: "Choose foods you genuinely enjoy so your friends have a fair chance.",
  },
  {
    icon: "🎬",
    category: "Entertainment",
    question: "Which movie can I watch again and again?",
    tip: "Include a movie you've mentioned or watched with your friends.",
  },
  {
    icon: "🌍",
    category: "Travel",
    question: "What's my dream travel destination?",
    tip: "Think about places you've talked about visiting.",
  },
  {
    icon: "🎵",
    category: "Music",
    question: "Who is my favorite singer?",
    tip: "Your playlists might give your closest friends a clue.",
  },
  {
    icon: "🎂",
    category: "Personal",
    question: "When is my birthday?",
    tip: "A classic friendship question that's easy to personalize.",
  },
  {
    icon: "🎮",
    category: "Hobbies",
    question: "What's my favorite game?",
    tip: "Use a game you've played with friends or often talk about.",
  },
  {
    icon: "🐶",
    category: "Preferences",
    question: "Do I prefer cats or dogs?",
    tip: "Simple either-or questions make a fun change of pace.",
  },
  {
    icon: "☕",
    category: "Everyday life",
    question: "Would I choose coffee or tea?",
    tip: "Small everyday details can be surprisingly memorable.",
  },
];

const steps = [
  {
    number: "01",
    icon: "📝",
    title: "Create your quiz",
    description:
      "Add questions about your favorites, hobbies, memories, and everyday preferences. Choose the answers your friends should try to guess.",
  },
  {
    number: "02",
    icon: "🔗",
    title: "Share your link",
    description:
      "Send your quiz to your best friend, school friends, college group, or anyone who wants to take the challenge.",
  },
  {
    number: "03",
    icon: "🏆",
    title: "Compare results",
    description:
      "See how your friends perform and use their answers to start funny conversations about what they remember.",
  },
];

const tips = [
  {
    icon: "💡",
    title: "Mix easy and difficult questions",
    description:
      "Start with your favorite food or color, then include questions about your hobbies, habits, or memorable moments.",
  },
  {
    icon: "😂",
    title: "Include shared memories",
    description:
      "Ask about your favorite trip, a funny moment, or a movie you watched together. These questions make the results more personal.",
  },
  {
    icon: "🎯",
    title: "Keep the answers clear",
    description:
      "Avoid confusing options or questions with several correct answers. A clear question makes the challenge more enjoyable.",
  },
  {
    icon: "💜",
    title: "Keep it friendly",
    description:
      "Treat scores as entertainment, not proof of someone's loyalty. Friends can care about you without remembering every detail.",
  },
];

const faqs = [
  {
    question: "What is a Fake Friend Quiz?",
    answer:
      "A Fake Friend Quiz is a playful friendship challenge. You create questions about yourself, share them with friends, and compare their answers with your own. Despite the name, it cannot determine whether a friendship is genuine.",
  },
  {
    question: "How do I create my own Fake Friend Quiz?",
    answer:
      "Select Create Your Quiz, add questions about yourself, choose the correct answers, and finish creating your challenge. You can then share your quiz link with friends.",
  },
  {
    question: "What questions should I include?",
    answer:
      "Try a mix of favorite foods, music, movies, hobbies, travel plans, everyday habits, and shared memories. Questions with clear answers are easier for friends to understand.",
  },
  {
    question: "Can I play with long-distance friends?",
    answer:
      "Yes. Share your quiz link through a messaging app or social platform so friends can participate from their own devices.",
  },
  {
    question: "Where can I share my quiz?",
    answer:
      "You can copy your quiz link and send it through WhatsApp, Instagram, Facebook, Snapchat, or any other service that supports sharing links.",
  },
  {
    question: "Can I see how well my friends scored?",
    answer:
      "The quiz results let you compare how well your friends answered your questions. Available result details depend on the information recorded for each attempt.",
  },
  {
    question: "Does a low score mean someone is a fake friend?",
    answer:
      "No. Quiz scores only reflect answers to a particular set of questions. People can have meaningful friendships even when they forget birthdays, favorites, or small personal details.",
  },
  {
    question: "Should I include private information?",
    answer:
      "Avoid sensitive details such as passwords, addresses, phone numbers, or information you would not want others to see. Shared quiz links may be forwarded.",
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
      <span className="inline-flex rounded-full border border-purple-100 bg-purple-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-purple-700">
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

function CreateQuizButton({
  children = "Create Your Quiz",
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
          ? "inline-flex min-h-14 items-center justify-center rounded-2xl bg-white px-8 py-4 text-center font-extrabold text-purple-700 shadow-lg transition hover:bg-purple-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          : "inline-flex min-h-14 items-center justify-center rounded-2xl bg-purple-600 px-8 py-4 text-center font-extrabold text-white shadow-lg shadow-purple-600/20 transition hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-600"
      }
    >
      {children}
    </Link>
  );
}

export default function FakeFriendQuizPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-purple-50 via-white to-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-purple-200/40 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-32 h-80 w-80 rounded-full bg-pink-200/40 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:py-20 lg:grid-cols-2 lg:py-24">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center rounded-full border border-purple-200 bg-white px-4 py-2 text-xs font-bold text-purple-700 shadow-sm sm:text-sm">
              💜 A fun friendship challenge
            </span>

            <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Fake Friend Quiz
              <span className="mt-2 block bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Who Knows You Best?
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg lg:mx-0">
              Think your friends know everything about
              you? Create your own friendship quiz,
              share it with your group, and discover
              who remembers your favorite things,
              funny habits, and unforgettable moments.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <CreateQuizButton>
                Create Your Quiz →
              </CreateQuizButton>

              <a
                href="#how-it-works"
                className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 py-4 font-bold text-slate-700 transition hover:border-purple-300 hover:text-purple-700"
              >
                How It Works
              </a>
            </div>

            <p className="mt-5 text-sm text-slate-500">
              Create • Share • Play • Compare
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div
              aria-hidden="true"
              className="absolute inset-8 rounded-full bg-purple-200/50 blur-3xl"
            />

            <div className="relative rounded-[2rem] border border-purple-100 bg-white/90 p-8 shadow-xl shadow-purple-900/10 sm:p-12">
              <Image
                src="/ffq.png"
                alt="Fake Friend Quiz illustration"
                width={420}
                height={420}
                priority
                sizes="(max-width: 640px) 260px, 420px"
                className="mx-auto h-auto w-full max-w-[340px] object-contain drop-shadow-lg"
              />

              <div className="mt-6 rounded-2xl border border-purple-100 bg-purple-50 p-5 text-center">
                <p className="text-lg font-extrabold text-purple-800">
                  🤔 How well do they know you?
                </p>

                <p className="mt-2 text-sm leading-6 text-purple-700">
                  Turn your favorite memories into
                  a challenge for your friends.
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
            <span className="inline-flex rounded-full bg-purple-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-purple-700">
              About the game
            </span>

            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
              What Is a Fake Friend Quiz?
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              A Fake Friend Quiz is an online
              friendship game where you create
              questions about yourself and ask
              your friends to guess the answers.
              It is a fun way to discover which
              details they remember about you.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              You might ask about your favorite
              food, your dream destination,
              a childhood memory, or a habit
              your closest friends know well.
              Each question adds a personal
              touch to your challenge.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Despite its playful name, the
              quiz is not a test of whether
              someone is a genuine friend.
              Use it to share memories,
              start conversations, and
              have fun together.
            </p>
          </div>

          <div className="rounded-[2rem] border border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50 p-7 sm:p-10">
            <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <span className="text-xs font-extrabold uppercase tracking-widest text-purple-600">
                Example question
              </span>

              <h3 className="mt-5 text-xl font-black leading-relaxed">
                What would I choose for
                a perfect weekend?
              </h3>

              <div className="mt-6 space-y-3">
                {[
                  "🎬 Watching movies",
                  "🏖️ Going on a trip",
                  "🎮 Playing games",
                  "😴 Sleeping all day",
                ].map((answer, index) => (
                  <div
                    key={answer}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-purple-200 bg-white text-sm font-bold text-purple-700">
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
            title="How to Create Your Friendship Quiz"
            description="Make a personalized challenge and share it with your friends in three simple steps."
          />

          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.number}
                className="relative rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <span
                  aria-hidden="true"
                  className="absolute right-6 top-5 text-5xl font-black text-purple-100"
                >
                  {step.number}
                </span>

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 text-3xl">
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
            <CreateQuizButton>
              Start Creating →
            </CreateQuizButton>
          </div>
        </div>
      </section>

      {/* SAMPLE QUESTIONS */}
      <section className="px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Question ideas"
            title="8 Fun Fake Friend Quiz Questions"
            description="Use these ideas as inspiration when building a challenge for your friends."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {sampleQuestions.map((item) => (
              <article
                key={item.question}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-3xl">
                  {item.icon}
                </div>

                <span className="text-xs font-extrabold uppercase tracking-wider text-purple-600">
                  {item.category}
                </span>

                <h3 className="mt-3 text-lg font-bold leading-relaxed">
                  {item.question}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {item.tip}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-7 text-center text-sm text-slate-500">
            Personalize your questions
            to make your challenge unique.
          </p>
        </div>
      </section>

      {/* TIPS */}
      <section className="bg-slate-50 px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Helpful tips"
            title="How to Make Your Quiz More Fun"
            description="A little creativity can turn a simple quiz into a memorable group activity."
          />

          <div className="grid gap-5 sm:grid-cols-2">
            {tips.map((tip) => (
              <article
                key={tip.title}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <div className="flex items-start gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-3xl">
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

      {/* OCCASIONS */}
      <section className="px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="Play together"
            title="When Can You Play?"
            description="You don't need a special occasion to challenge your friends."
          />

          <div className="grid gap-5 md:grid-cols-3">
            <article className="rounded-3xl border border-purple-100 bg-purple-50 p-7">
              <span className="text-4xl" aria-hidden="true">
                🎂
              </span>

              <h3 className="mt-5 text-xl font-black">
                Birthday parties
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Create a birthday-themed quiz
                and see which friends remember
                your favorite things and
                memorable moments.
              </p>
            </article>

            <article className="rounded-3xl border border-pink-100 bg-pink-50 p-7">
              <span className="text-4xl" aria-hidden="true">
                👯
              </span>

              <h3 className="mt-5 text-xl font-black">
                Best friend challenges
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Add inside jokes, shared memories,
                and everyday preferences to
                create a challenge that feels
                personal to your friendship.
              </p>
            </article>

            <article className="rounded-3xl border border-indigo-100 bg-indigo-50 p-7">
              <span className="text-4xl" aria-hidden="true">
                📱
              </span>

              <h3 className="mt-5 text-xl font-black">
                Group chats
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Share your quiz in a group chat
                and compare results with friends
                who live nearby or far away.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* PRIVACY */}
      <section className="bg-slate-50 px-5 py-14">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-purple-200 bg-purple-50 p-7 sm:p-10">
          <h2 className="text-2xl font-black">
            💜 Keep Your Friendship Quiz Fun and Safe
          </h2>

          <p className="mt-4 leading-8 text-slate-700">
            Choose questions that you're
            comfortable sharing. Avoid adding
            sensitive personal details, and
            remember that someone who receives
            your quiz link may forward it
            to other people.
          </p>

          <p className="mt-4 leading-8 text-slate-700">
            A low score doesn't make someone
            a bad friend. Use the results
            to laugh about forgotten details,
            share stories, and learn more
            about one another.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="Frequently asked questions"
            title="Fake Friend Quiz FAQs"
            description="Answers to common questions about creating and sharing your friendship challenge."
          />

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-white px-5 py-5 open:border-purple-200 open:bg-purple-50/40 sm:px-7"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-900 [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>

                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-50 text-xl text-purple-600 transition-transform group-open:rotate-45"
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

      {/* RELATED GAME */}
      <section className="bg-slate-50 px-5 py-14">
        <div className="mx-auto max-w-5xl rounded-3xl border border-emerald-100 bg-white p-7 shadow-sm sm:p-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700">
                Another game to try
              </span>

              <h2 className="mt-3 text-2xl font-black sm:text-3xl">
                Never Have I Ever
              </h2>

              <p className="mt-3 max-w-xl leading-7 text-slate-600">
                Want a different friendship
                challenge? Create a Never
                Have I Ever game and see
                who can guess your experiences.
              </p>
            </div>

            <Link
              href="/nhie"
              className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-emerald-600 px-7 py-4 font-bold text-white transition hover:bg-emerald-700"
            >
              Explore the Game →
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-purple-600 via-violet-600 to-pink-600 px-6 py-14 text-center text-white shadow-xl shadow-purple-600/10 sm:px-12 sm:py-16">
          <span
            className="text-5xl"
            aria-hidden="true"
          >
            🎉
          </span>

          <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-black sm:text-4xl">
            Ready to Challenge Your Friends?
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-8 text-purple-50">
            Create a personalized friendship
            quiz, share it with your group,
            and find out who knows your
            favorite things and memories.
          </p>

          <div className="mt-8">
            <CreateQuizButton light>
              Create My Quiz →
            </CreateQuizButton>
          </div>

          <p className="mt-5 text-sm text-purple-100">
            Make it personal. Keep it fun.
          </p>
        </div>
      </section>
    </main>
  );
}