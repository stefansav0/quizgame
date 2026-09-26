
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "BFF Quiz – How Well Does Your Best Friend Know You?",
  description:
    "Create your own BFF Quiz on GetKnowify. Add personalized questions, share your quiz with your best friends, and compare scores to discover how well they know you.",
  keywords: [
    "BFF quiz",
    "best friend quiz",
    "best friend forever quiz",
    "how well do you know me",
    "friendship quiz",
    "best friend challenge",
  ],
  alternates: {
    canonical: "https://getknowify.com/bff-quiz",
  },
  openGraph: {
    title: "BFF Quiz | GetKnowify",
    description:
      "Create a personalized BFF Quiz, share it with your friends, and discover how well they know you.",
    url: "https://getknowify.com/bff-quiz",
    siteName: "GetKnowify",
    type: "website",
  },
};

const steps = [
  {
    number: "01",
    icon: "✍️",
    title: "Create your BFF Quiz",
    description:
      "Choose questions about your favorite things, everyday habits, and shared memories. Set the answers your friends will try to guess.",
  },
  {
    number: "02",
    icon: "💌",
    title: "Share with your friends",
    description:
      "Copy your quiz link and send it to your best friend, friendship group, or friends who live far away.",
  },
  {
    number: "03",
    icon: "🏆",
    title: "Compare your results",
    description:
      "See how your friends score and find out which details about you they remember.",
  },
];

const questions = [
  {
    icon: "🍕",
    category: "Favorite things",
    question: "What's my all-time favorite food?",
    description:
      "An easy opening question for friends who know your usual order.",
  },
  {
    icon: "🎬",
    category: "Entertainment",
    question: "Which movie could I watch again and again?",
    description:
      "Your best friend might know the movie you never get tired of.",
  },
  {
    icon: "🎵",
    category: "Music",
    question: "Who's my favorite singer?",
    description:
      "Think about the artist whose songs you play most often.",
  },
  {
    icon: "🌍",
    category: "Dreams",
    question: "Where would I love to travel?",
    description:
      "Choose a destination you've talked about visiting together.",
  },
  {
    icon: "🎂",
    category: "Special dates",
    question: "When is my birthday?",
    description:
      "A classic question for friends who remember important dates.",
  },
  {
    icon: "☕",
    category: "Everyday habits",
    question: "Would I choose coffee or tea?",
    description:
      "Sometimes the smallest details are the most fun to guess.",
  },
  {
    icon: "😂",
    category: "Shared memories",
    question: "What's the funniest thing we've done together?",
    description:
      "Turn a favorite shared memory into a personalized question.",
  },
  {
    icon: "💜",
    category: "Friendship",
    question: "What cheers me up when I'm having a bad day?",
    description:
      "A thoughtful question about the little things that make you smile.",
  },
];

const occasions = [
  {
    icon: "🎂",
    title: "Birthday celebrations",
    description:
      "Make a birthday quiz using your favorite things, funny memories, and moments from the past year.",
  },
  {
    icon: "👯",
    title: "Best friend challenges",
    description:
      "Challenge your closest friends with questions about the experiences you've shared.",
  },
  {
    icon: "📱",
    title: "Group chats",
    description:
      "Give everyone in your group a fun challenge and compare their results afterward.",
  },
  {
    icon: "🌎",
    title: "Long-distance friendships",
    description:
      "Reconnect with friends who live in another city or country by sharing your quiz link.",
  },
];

const tips = [
  {
    icon: "🌟",
    title: "Start with familiar questions",
    description:
      "Begin with your favorite food, music, or hobbies so everyone can enjoy the first few questions.",
  },
  {
    icon: "📸",
    title: "Include shared memories",
    description:
      "Add questions about a trip, an inside joke, or a memorable day you spent together.",
  },
  {
    icon: "🎯",
    title: "Make the answers clear",
    description:
      "Choose questions with one intended answer and avoid options that could be equally correct.",
  },
  {
    icon: "💖",
    title: "Enjoy the conversation",
    description:
      "Use the results to share stories and learn more about each other, rather than judging your friendships.",
  },
];

const faqs = [
  {
    question: "What is a BFF Quiz?",
    answer:
      "A BFF Quiz is a personalized friendship game. You create questions about yourself, share the quiz with friends, and see how many answers they can guess correctly.",
  },
  {
    question: "How do I create my own BFF Quiz?",
    answer:
      "Select Create Your BFF Quiz, add questions about yourself, choose the correct answers, and finish creating your quiz. You can then share the generated link.",
  },
  {
    question: "Can I add my own questions?",
    answer:
      "Yes. You can personalize your quiz with questions about your favorites, hobbies, memories, and everyday preferences.",
  },
  {
    question: "What are some good questions for my best friend?",
    answer:
      "Try asking about your favorite meal, dream destination, favorite movie, birthday, most memorable trip, or an inside joke you share.",
  },
  {
    question: "Can I share my BFF Quiz on WhatsApp?",
    answer:
      "Yes. Copy your quiz link and share it through WhatsApp or another messaging app. You can also send it through social platforms that support links.",
  },
  {
    question: "Can I compare my friends' scores?",
    answer:
      "Your quiz results allow you to compare how well friends answered your questions. The details shown depend on the results recorded for each attempt.",
  },
  {
    question: "Does the highest score mean someone is my best friend?",
    answer:
      "Not necessarily. A high score means someone remembered more answers in that quiz. Real friendships involve trust, kindness, support, and experiences that a short quiz cannot measure.",
  },
  {
    question: "Can I play with friends who live far away?",
    answer:
      "Yes. Share your quiz link so friends can participate from their own devices, wherever they live.",
  },
  {
    question: "Should I include private information?",
    answer:
      "Avoid including passwords, addresses, phone numbers, or sensitive personal details. Anyone who receives your quiz link may be able to forward it.",
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
      <span className="inline-flex rounded-full border border-pink-100 bg-pink-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-pink-700">
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
  children = "Create Your BFF Quiz",
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
          ? "inline-flex min-h-14 items-center justify-center rounded-2xl bg-white px-8 py-4 text-center font-extrabold text-purple-700 shadow-lg transition hover:bg-pink-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          : "inline-flex min-h-14 items-center justify-center rounded-2xl bg-purple-600 px-8 py-4 text-center font-extrabold text-white shadow-lg shadow-purple-600/20 transition hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-600"
      }
    >
      {children}
    </Link>
  );
}

export default function BFFQuizPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-pink-50 via-purple-50/40 to-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-28 top-16 h-80 w-80 rounded-full bg-pink-200/40 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 top-32 h-80 w-80 rounded-full bg-purple-200/40 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:py-20 lg:grid-cols-2 lg:py-24">
          <div className="text-center lg:text-left">
            <span className="inline-flex rounded-full border border-pink-200 bg-white px-4 py-2 text-xs font-bold text-pink-700 shadow-sm sm:text-sm">
              💖 A challenge for your besties
            </span>

            <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              BFF Quiz
              <span className="mt-2 block bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                How Well Do Your Friends Know You?
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg lg:mx-0">
              Your best friend knows your favorite
              snacks, funniest stories, and
              everyday habits — or do they?
              Create a personalized BFF Quiz,
              share it with your friends,
              and compare your results.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <CreateButton>
                Create Your BFF Quiz →
              </CreateButton>

              <a
                href="#how-it-works"
                className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 py-4 font-bold text-slate-700 transition hover:border-pink-300 hover:text-purple-700"
              >
                How It Works
              </a>
            </div>

            <p className="mt-5 text-sm text-slate-500">
              Create • Share • Guess • Celebrate
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div
              aria-hidden="true"
              className="absolute inset-8 rounded-full bg-pink-200/50 blur-3xl"
            />

            <div className="relative rounded-[2rem] border border-pink-100 bg-white/90 p-8 shadow-xl shadow-pink-900/10 sm:p-12">
              <Image
                src="/bff-q.png"
                alt="BFF Quiz friendship illustration"
                width={420}
                height={420}
                priority
                sizes="(max-width: 640px) 260px, 420px"
                className="mx-auto h-auto w-full max-w-[340px] object-contain drop-shadow-lg"
              />

              <div className="mt-6 rounded-2xl border border-pink-100 bg-pink-50 p-5 text-center">
                <p className="text-lg font-extrabold text-pink-800">
                  💕 Who knows you best?
                </p>

                <p className="mt-2 text-sm leading-6 text-pink-700">
                  Turn your favorite memories
                  into a friendship challenge.
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
              What Is a BFF Quiz?
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              BFF stands for Best Friends Forever.
              A BFF Quiz is a playful way to
              celebrate your friendship by
              challenging friends to answer
              questions about you.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Instead of answering general
              trivia questions, your friends
              guess your favorite things,
              personal preferences, and
              memorable experiences. You
              choose the answers when
              creating your quiz.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              After sharing your quiz, compare
              the results and discover which
              questions were easy, which were
              surprising, and which led to
              the funniest conversations.
            </p>
          </div>

          <div className="rounded-[2rem] border border-pink-100 bg-gradient-to-br from-pink-50 to-purple-50 p-7 sm:p-10">
            <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <span className="text-xs font-extrabold uppercase tracking-widest text-purple-600">
                Example BFF question
              </span>

              <h3 className="mt-5 text-xl font-black leading-relaxed">
                What would make my perfect
                birthday celebration?
              </h3>

              <div className="mt-6 space-y-3">
                {[
                  "🎉 A big party with friends",
                  "🍿 A movie night at home",
                  "🏖️ A weekend getaway",
                  "🍰 Dinner with my favorite people",
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
            title="How to Create Your BFF Quiz"
            description="Turn your favorite things and shared memories into a fun challenge."
          />

          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.number}
                className="relative rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <span
                  aria-hidden="true"
                  className="absolute right-6 top-5 text-5xl font-black text-pink-100"
                >
                  {step.number}
                </span>

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-50 text-3xl">
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

      {/* SAMPLE QUESTIONS */}
      <section className="px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Question ideas"
            title="8 Questions to Ask Your Best Friend"
            description="Mix easy favorites with thoughtful questions and memories that make your friendship unique."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {questions.map((item) => (
              <article
                key={item.question}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-50 text-3xl">
                  {item.icon}
                </div>

                <span className="text-xs font-extrabold uppercase tracking-wider text-purple-600">
                  {item.category}
                </span>

                <h3 className="mt-3 text-lg font-bold leading-relaxed">
                  {item.question}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {item.description}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-7 text-center text-sm text-slate-500">
            Use these examples as inspiration
            and personalize your own questions.
          </p>
        </div>
      </section>

      {/* OCCASIONS */}
      <section className="bg-slate-50 px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Play together"
            title="Perfect Moments for a BFF Quiz"
            description="Celebrate your friendship whether you're together or miles apart."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {occasions.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <span className="text-4xl" aria-hidden="true">
                  {item.icon}
                </span>

                <h3 className="mt-5 text-lg font-black">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TIPS */}
      <section className="px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Make it personal"
            title="Tips for Creating a Memorable BFF Quiz"
            description="A few thoughtful questions can make your challenge more entertaining."
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

      {/* FRIENDSHIP NOTE */}
      <section className="bg-slate-50 px-5 py-14">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-pink-200 bg-gradient-to-br from-pink-50 to-purple-50 p-7 sm:p-10">
          <h2 className="text-2xl font-black">
            💗 Friendship Is More Than a Quiz Score
          </h2>

          <p className="mt-4 leading-8 text-slate-700">
            A BFF Quiz is designed for fun.
            Someone who remembers every answer
            may score highly, while another
            close friend might forget a few
            details. Neither result can
            measure the value of a friendship.
          </p>

          <p className="mt-4 leading-8 text-slate-700">
            Make your questions enjoyable,
            respect your friends' boundaries,
            and avoid sharing sensitive
            personal information. Remember
            that a quiz link can be forwarded.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="Frequently asked questions"
            title="BFF Quiz FAQs"
            description="Everything you need to know before creating your friendship challenge."
          />

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-white px-5 py-5 open:border-pink-200 open:bg-pink-50/40 sm:px-7"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-900 [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>

                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pink-50 text-xl text-purple-600 transition-transform group-open:rotate-45"
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
        <div className="mx-auto max-w-5xl rounded-3xl border border-purple-100 bg-white p-7 shadow-sm sm:p-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-purple-700">
            More ways to have fun
          </span>

          <h2 className="mt-3 text-2xl font-black sm:text-3xl">
            Try Another Friendship Challenge
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Looking for a different game?
            Try our Fake Friend Quiz or
            create a Never Have I Ever
            challenge for your group.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/fake-friend-quiz"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-purple-600 px-6 py-3 font-bold text-white transition hover:bg-purple-700"
            >
              Fake Friend Quiz →
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
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-purple-600 via-fuchsia-600 to-pink-500 px-6 py-14 text-center text-white shadow-xl shadow-purple-600/10 sm:px-12 sm:py-16">
          <span className="text-5xl" aria-hidden="true">
            💖
          </span>

          <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-black sm:text-4xl">
            Ready to Find Out Who Knows You Best?
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-8 text-purple-50">
            Create a personalized BFF Quiz,
            send it to your favorite people,
            and make new memories together.
          </p>

          <div className="mt-8">
            <CreateButton light>
              Start Your BFF Quiz →
            </CreateButton>
          </div>

          <p className="mt-5 text-sm text-purple-100">
            Made for besties, memories, and a little friendly competition.
          </p>
        </div>
      </section>
    </main>
  );
}