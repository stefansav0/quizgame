// app/fake-friend-quiz/page.tsx

import Link from "next/link";
import Image from "next/image";

export default function FakeFriendQuizPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        

        <h1 className="mt-6 text-5xl font-bold tracking-tight text-gray-900">
          Fake Friend Quiz
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Think your friends really know you? Create your own quiz, share the
          link, and find out who your real friends are.
        </p>

        <div className="flex justify-center mb-8">
                  <Image
                    src="/ffq.png"
                    alt="Fake Friend Quiz"
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

      {/* Example Questions */}
<section className="border-t border-gray-200 py-20">
  <div className="max-w-4xl mx-auto px-6">
    <h2 className="text-3xl font-bold text-center">
      Sample Questions
    </h2>

    <p className="mt-3 text-center text-gray-600">
      Create your own questions or use fun ideas like these.
    </p>

    <div className="mt-10 grid gap-4 md:grid-cols-2">
      {[
        "🍕 What's my favorite food?",
        "🎬 Which movie can I watch again and again?",
        "🌍 What's my dream travel destination?",
        "🎵 Who is my favorite singer?",
        "🎂 When is my birthday?",
        "🎮 What's my favorite game?",
        "🐶 Cats or Dogs?",
        "☕ Coffee or Tea?",
      ].map((question) => (
        <div
          key={question}
          className="rounded-xl border border-gray-200 p-4"
        >
          {question}
        </div>
      ))}
    </div>
  </div>
</section>



      {/* How It Works */}
      <section className="border-t border-gray-200 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">
            How it works
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl">📝</div>
              <h3 className="mt-4 font-semibold">Create</h3>
              <p className="mt-2 text-gray-600">
                Answer a few fun questions about yourself.
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl">📤</div>
              <h3 className="mt-4 font-semibold">Share</h3>
              <p className="mt-2 text-gray-600">
                Send your quiz link to your friends.
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl">🏆</div>
              <h3 className="mt-4 font-semibold">Results</h3>
              <p className="mt-2 text-gray-600">
                See who knows you the best.
              </p>
            </div>
          </div>
        </div>
      </section>

     

      {/* FAQ */}
<section className="py-20">
  <div className="max-w-3xl mx-auto px-6">
    <h2 className="text-3xl font-bold text-center">
      Frequently Asked Questions
    </h2>

    <div className="mt-10 space-y-6">
      <div>
        <h3 className="font-semibold">
          Is the Fake Friend Quiz free?
        </h3>
        <p className="mt-2 text-gray-600">
          Yes, creating and sharing your quiz is completely free.
        </p>
      </div>

      <div>
        <h3 className="font-semibold">
          How many questions can I add?
        </h3>
        <p className="mt-2 text-gray-600">
          Add as many questions as you like to make your quiz unique.
        </p>
      </div>

      <div>
        <h3 className="font-semibold">
          Where can I share my quiz?
        </h3>
        <p className="mt-2 text-gray-600">
          Share it on WhatsApp, Instagram, Facebook, Snapchat, X, or with a direct link.
        </p>
      </div>

      <div>
        <h3 className="font-semibold">
          Can I see everyone's score?
        </h3>
        <p className="mt-2 text-gray-600">
          Yes. You'll see who completed your quiz and how well they scored.
        </p>
      </div>
    </div>
  </div>
</section>



      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">
            Ready to challenge your friends?
          </h2>

          <p className="mt-4 text-gray-600">
            It only takes a minute to create your quiz.
          </p>

          <Link
            href="/create"
            className="inline-block mt-8 rounded-xl bg-purple-600 px-8 py-3 text-white font-medium hover:bg-purple-700 transition"
          >
            Start Now
          </Link>
        </div>
      </section>
    </main>
  );
}