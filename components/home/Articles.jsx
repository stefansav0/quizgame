import Link from "next/link";

export function PopularQuestions() {
  const questions = [
    "What is my favorite food?",
    "What is my biggest fear?",
    "Where would I love to travel?",
    "What is my favorite movie?",
    "What annoys me the most?",
    "What is my dream job?",
    "Who is my celebrity crush?",
    "What is something I cannot live without?",
  ];

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Popular Quiz Questions
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600 sm:text-lg">
            Not sure what to ask your friends? Try these fun questions for
            your friendship quiz and see how well they really know you.
          </p>
        </div>

        {/* Questions */}
        <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
          {questions.map((question, index) => (
            <div
              key={question}
              className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-pink-100 hover:shadow-md"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pink-50 text-sm font-bold text-pink-500">
                {index + 1}
              </span>

              <span className="font-medium text-gray-800">
                {question}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}