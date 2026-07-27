// app/bff-quiz/page.tsx

import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "BFF Quiz - Create a Best Friend Quiz",
  description:
    "Create your own BFF Quiz, share it with your friends, and discover who knows you best.",
};

export default function BFFQuizPage() {
  return (
    <main className="bg-white">
        {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        

        <h1 className="mt-6 text-5xl font-bold tracking-tight text-gray-900">
          BFF Quiz
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Want to know who your real Best Friend Forever is? A BFF Quiz is a
          fun way to test how well your friends know you. Create your own quiz,
          share it with friends, and compare their scores to find out who really
          deserves the title of your best friend.
        </p>

        <div className="flex justify-center mb-8">
          <Image
            src="/bff-q.png"
            alt="BFF Quiz"
            width={280}
            height={280}
            priority
            className="w-48 md:w-64 lg:w-72 h-auto object-contain drop-shadow-lg"
          />
        </div>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/create"
            className="rounded-xl bg-purple-600 px-6 py-3 font-medium text-white hover:bg-purple-700 transition"
          >
            Create Quiz
          </Link>

          <Link
            href="/"
            className="rounded-xl border border-gray-300 px-6 py-3 font-medium hover:bg-gray-50 transition"
          >
            Learn More
          </Link>
        </div>
      </section>
      <article className="max-w-4xl mx-auto px-6 py-20">

       

        {/* How It Works */}

        <h2 className="mt-16 text-3xl font-bold">
          How Does the BFF Quiz Work?
        </h2>

        <p className="mt-4 text-gray-700 leading-8">
          Creating a Best Friend Quiz only takes a few minutes.
        </p>

        <ol className="mt-6 list-decimal pl-6 space-y-3 text-gray-700 leading-8">
          <li>Create your own personalized quiz.</li>
          <li>Answer questions about yourself.</li>
          <li>Share your unique quiz link with friends.</li>
          <li>Your friends answer the questions.</li>
          <li>Compare scores and see who knows you best.</li>
        </ol>

        {/* Sample Questions */}

        <h2 className="mt-16 text-3xl font-bold">
          Sample BFF Quiz Questions
        </h2>

        <p className="mt-4 text-gray-700 leading-8">
          Here are some fun questions you can include in your Best Friend Quiz.
        </p>

        <ul className="mt-6 list-disc pl-6 space-y-2 text-gray-700 leading-8">
          <li>What's my favorite food?</li>
          <li>What's my favorite movie?</li>
          <li>Who is my favorite singer?</li>
          <li>What's my dream destination?</li>
          <li>When is my birthday?</li>
          <li>What's my favorite color?</li>
          <li>Do I prefer coffee or tea?</li>
          <li>Do I like cats or dogs?</li>
        </ul>

        {/* Why */}

        <h2 className="mt-16 text-3xl font-bold">
          Why Should You Create a BFF Quiz?
        </h2>

        <p className="mt-4 text-gray-700 leading-8">
          A BFF Quiz is a great way to have fun with your friends while learning
          who really knows you. Whether you're chatting online, celebrating a
          birthday, or just hanging out, it's an entertaining game that everyone
          can enjoy.
        </p>

        <p className="mt-6 text-gray-700 leading-8">
          You can easily share your quiz on WhatsApp, Instagram, Facebook,
          Snapchat, Telegram, Discord, or anywhere using your personal quiz
          link.
        </p>

        {/* FAQ */}

        <h2 className="mt-16 text-3xl font-bold">
          Frequently Asked Questions
        </h2>

        <div className="mt-8 space-y-8">

          <div>
            <h3 className="font-semibold text-xl">
              Is the BFF Quiz free?
            </h3>

            <p className="mt-2 text-gray-700">
              Yes. You can create and share unlimited quizzes for free.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-xl">
              Can I add my own questions?
            </h3>

            <p className="mt-2 text-gray-700">
              Yes. You can personalize your quiz with your own questions.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-xl">
              Can I see everyone's score?
            </h3>

            <p className="mt-2 text-gray-700">
              Yes. Once your friends complete the quiz, you'll be able to see
              and compare their scores.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-xl">
              Where can I share my quiz?
            </h3>

            <p className="mt-2 text-gray-700">
              You can share your quiz on WhatsApp, Instagram, Facebook,
              Snapchat, Telegram, X, or anywhere else.
            </p>
          </div>

        </div>

        {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">
            Ready to Find Out Who Knows You Best?
          </h2>

          <p className="mt-4 text-gray-600">
            Create your BFF Quiz today and challenge your friends. It only takes
            a minute to get started.
          </p>

          <Link
            href="/create"
            className="inline-block mt-8 rounded-xl bg-purple-600 px-8 py-3 text-white font-medium hover:bg-purple-700 transition"
          >
            Start Your BFF Quiz
          </Link>
        </div>
      </section>

       

      </article>
    </main>
  );
}