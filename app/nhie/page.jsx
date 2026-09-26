
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import NHIECreatorPage from "./NHIECreatorPage";

export const metadata = {
  title: "Never Have I Ever Online | GetKnowify",
  description:
    "Create a 10-question Never Have I Ever challenge, share it with your friends and discover who knows you best.",
  alternates: {
    canonical: "https://getknowify.com/nhie",
  },
};

const steps = [
  {
    number: "01",
    icon: "🤫",
    title: "Answer 10 questions",
    description:
      "Create a challenge by answering ten Never Have I Ever statements about your own experiences.",
  },
  {
    number: "02",
    icon: "🔗",
    title: "Share with friends",
    description:
      "Get a unique game link and send it to friends through WhatsApp or another messaging app.",
  },
  {
    number: "03",
    icon: "🏆",
    title: "Compare scores",
    description:
      "Your friends guess your answers and find out how well they know you.",
  },
];

const examples = [
  {
    icon: "😂",
    category: "Funny moments",
    question:
      "Never have I ever laughed so hard that I cried.",
  },
  {
    icon: "📱",
    category: "Social media",
    question:
      "Never have I ever accidentally liked an old social media post.",
  },
  {
    icon: "🍕",
    category: "Food",
    question:
      "Never have I ever eaten an entire pizza by myself.",
  },
  {
    icon: "🎤",
    category: "Embarrassing moments",
    question:
      "Never have I ever sung in public.",
  },
  {
    icon: "✈️",
    category: "Travel",
    question:
      "Never have I ever missed a train or flight.",
  },
  {
    icon: "💬",
    category: "Friendship",
    question:
      "Never have I ever sent a message to the wrong person.",
  },
];

const occasions = [
  {
    icon: "🎂",
    title: "Birthday parties",
    description:
      "Turn funny memories into a challenge for your birthday group.",
  },
  {
    icon: "💚",
    title: "Best friends",
    description:
      "Discover who remembers the most about your experiences.",
  },
  {
    icon: "📱",
    title: "Group chats",
    description:
      "Give your friends something entertaining to play and discuss.",
  },
  {
    icon: "🌍",
    title: "Long-distance friends",
    description:
      "Share your game with friends who live in different cities.",
  },
];

const faqs = [
  {
    question: "What is Never Have I Ever?",
    answer:
      "Never Have I Ever is a social game where people respond to statements about experiences they may or may not have had.",
  },
  {
    question: "How does the online version work?",
    answer:
      "You answer ten questions about yourself, create a game link and share it with friends. They try to guess your answers and earn points for correct guesses.",
  },
  {
    question: "Can I play with friends in another city?",
    answer:
      "Yes. You can share your game link through a messaging app so friends can participate from their own devices.",
  },
  {
    question: "Can I choose different questions?",
    answer:
      "The creator includes a question bank that lets you replace questions while setting up your challenge.",
  },
  {
    question: "Can I create another game?",
    answer:
      "You can create another game after deleting your current challenge using the option on your share screen.",
  },
  {
    question: "Are my answers private?",
    answer:
      "Only include information you're comfortable sharing. A game link may be forwarded to other people, so avoid sensitive personal information.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
}) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <span className="inline-block rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-emerald-700">
        {eyebrow}
      </span>

      <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="mt-4 leading-7 text-slate-600">
          {description}
        </p>
      )}
    </div>
  );
}

function CreateButton({
  children = "Create Your Game →",
  light = false,
}) {
  return (
    <Link
      href="/nhie?create=1"
      className={
        light
          ? "inline-flex min-h-14 items-center justify-center rounded-2xl bg-white px-8 py-4 font-extrabold text-emerald-800 shadow-lg transition hover:bg-emerald-50"
          : "inline-flex min-h-14 items-center justify-center rounded-2xl bg-emerald-600 px-8 py-4 font-extrabold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
      }
    >
      {children}
    </Link>
  );
}

function NHIELanding() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-slate-50">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-40 h-72 w-72 rounded-full bg-teal-200/40 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:py-20 lg:grid-cols-2 lg:py-24">
          <div className="text-center lg:text-left">
            <span className="inline-flex rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-bold text-emerald-700 shadow-sm sm:text-sm">
              🎉 A friendship challenge
            </span>

            <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Never Have I Ever
              <span className="mt-2 block text-emerald-600">
                Online
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg lg:mx-0">
              Think your friends know everything
              about you? Create a fun 10-question
              challenge, share it with your group,
              and discover who can guess your
              experiences correctly.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <CreateButton />

              <a
                href="#how-to-play"
                className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 py-4 font-bold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700"
              >
                How to Play
              </a>
            </div>

            <p className="mt-5 text-sm text-slate-500">
              Create • Share • Guess • Have fun
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div
              aria-hidden="true"
              className="absolute inset-8 rounded-full bg-emerald-200/40 blur-3xl"
            />

            <div className="relative rounded-[2rem] border border-emerald-100 bg-white/90 p-8 shadow-xl shadow-emerald-900/5 sm:p-12">
              <Image
                src="/never-removebg-preview.png"
                alt="Never Have I Ever game"
                width={420}
                height={420}
                priority
                className="mx-auto h-auto w-full max-w-[320px] object-contain"
              />

              <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-5 text-center">
                <p className="font-bold text-emerald-800">
                  🤔 Who knows you best?
                </p>

                <p className="mt-1 text-sm text-emerald-700">
                  Challenge your friends to find out.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW TO PLAY */}
      <section
        id="how-to-play"
        className="scroll-mt-24 px-5 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Three easy steps"
            title="How to Play"
            description="Create your game, share it, and see how well your friends know you."
          />

          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((item) => (
              <article
                key={item.number}
                className="relative rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <span className="absolute right-6 top-6 text-4xl font-black text-emerald-100">
                  {item.number}
                </span>

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-3xl">
                  {item.icon}
                </div>

                <h3 className="mb-3 text-xl font-black">
                  {item.title}
                </h3>

                <p className="text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* GAME EXPLANATION */}
      <section className="bg-white px-5 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-emerald-700">
              About the game
            </span>

            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
              What Is Never Have I Ever?
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Never Have I Ever is a classic social
              game where people respond to
              statements about experiences they
              may or may not have had. It often
              leads to funny stories, surprising
              discoveries, and memorable
              conversations.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              On GetKnowify, you create a challenge
              by answering ten questions about
              yourself. Your friends then try to
              guess your answers. Each correct
              guess earns them a point.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              You can use it to reconnect with old
              friends, entertain your group chat,
              or find out who remembers your
              funniest experiences.
            </p>
          </div>

          <div className="rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-7 sm:p-10">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
                Example question
              </p>

              <h3 className="mt-4 text-xl font-black leading-relaxed">
                Never have I ever fallen asleep
                during a movie.
              </h3>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
                  <span className="block text-2xl">
                    🙋
                  </span>
                  <span className="mt-2 block font-bold text-emerald-800">
                    I have
                  </span>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                  <span className="block text-2xl">
                    🙅
                  </span>
                  <span className="mt-2 block font-bold text-slate-700">
                    Never
                  </span>
                </div>
              </div>

              <p className="mt-5 text-center text-xs text-slate-500">
                Example only — create a game to play.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* QUESTION IDEAS */}
      <section className="px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Question ideas"
            title="Fun Questions to Inspire Your Game"
            description="Here are a few lighthearted Never Have I Ever statements to get you started."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {examples.map((item) => (
              <article
                key={item.question}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-3xl">
                  {item.icon}
                </div>

                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600">
                  {item.category}
                </span>

                <h3 className="mt-3 text-lg font-bold leading-relaxed">
                  {item.question}
                </h3>
              </article>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            These are examples. Your generated
            questions may be different.
          </p>

          <div className="mt-8 text-center">
            <CreateButton>
              Create My Game →
            </CreateButton>
          </div>
        </div>
      </section>

      {/* OCCASIONS */}
      <section className="bg-white px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Play together"
            title="A Fun Game for Any Occasion"
            description="Whether you're together or miles apart, give your friends a new challenge."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {occasions.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
              >
                <span
                  className="text-4xl"
                  aria-hidden="true"
                >
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

      {/* SAFETY */}
      <section className="px-5 py-14">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-emerald-200 bg-emerald-50 p-7 sm:p-10">
          <h2 className="text-2xl font-black">
            💚 Keep It Fun for Everyone
          </h2>

          <p className="mt-4 leading-8 text-slate-700">
            Choose questions that suit your group.
            Only share experiences you're
            comfortable discussing, and respect
            your friends' boundaries. Remember
            that a shared game link can be
            forwarded to other people.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="FAQs"
            title="Frequently Asked Questions"
            description="Everything you need to know before creating your challenge."
          />

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5 open:border-emerald-200 open:bg-emerald-50/40 sm:px-7"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>

                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-xl text-emerald-600 transition-transform group-open:rotate-45"
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

      {/* FINAL CTA */}
      <section className="px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-gradient-to-br from-emerald-600 to-teal-700 px-6 py-14 text-center text-white shadow-xl sm:px-12 sm:py-16">
          <span
            className="text-5xl"
            aria-hidden="true"
          >
            🎉
          </span>

          <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-black sm:text-4xl">
            Ready to Find Out Who Knows You Best?
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-8 text-emerald-50">
            Create your Never Have I Ever
            challenge and share it with your friends.
          </p>

          <div className="mt-8">
            <CreateButton light>
              Start Your Game →
            </CreateButton>
          </div>
        </div>
      </section>
    </main>
  );
}

export default async function NHIEPage({
  searchParams,
}) {
  const params = await searchParams;

  if (params?.create === "1") {
    return (
      <Suspense
        fallback={
          <main className="min-h-screen bg-slate-50 px-5 py-20 text-center text-slate-600">
            Loading game creator...
          </main>
        }
      >
        <NHIECreatorPage />
      </Suspense>
    );
  }

  return <NHIELanding />;
}