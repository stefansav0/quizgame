"use client";

import { useEffect, useState } from "react";

export default function ChallengePlayer({ slug }) {
  const [challenge, setChallenge] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/never-have-i-ever/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setChallenge(data.challenge);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  const handleAnswer = (didIt) => {
    if (didIt) {
      setScore((prev) => prev + 1);
    }

    if (
      current === challenge.questions.length - 1
    ) {
      setFinished(true);
    } else {
      setCurrent((prev) => prev + 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-semibold">
          Loading Challenge...
        </h2>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-semibold">
          Challenge Not Found
        </h2>
      </div>
    );
  }

  const progress =
    ((current + 1) / challenge.questions.length) *
    100;

  let badge = "😇 Innocent Soul";

  if (score >= 5) {
    badge = "🔥 Adventurer";
  }

  if (score >= 10) {
    badge = "🚀 Legend";
  }

  if (finished) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl p-8 text-center">

          <h1 className="text-4xl font-bold mb-4">
            🎉 Challenge Complete
          </h1>

          <p className="text-xl mb-4">
            You have done{" "}
            <span className="font-bold">
              {score}
            </span>{" "}
            out of{" "}
            <span className="font-bold">
              {challenge.questions.length}
            </span>{" "}
            things.
          </p>

          <div className="text-5xl mb-4">
            {badge}
          </div>

          <button
            onClick={() =>
              window.location.reload()
            }
            className="bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            Play Again
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">

      <div className="max-w-2xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h1 className="text-4xl font-bold text-center mb-2">
            {challenge.title}
          </h1>

          <p className="text-center text-gray-500 mb-8">
            Created by {challenge.createdBy}
          </p>

          <div className="w-full bg-gray-200 h-3 rounded-full mb-6">

            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          <p className="text-center text-sm text-gray-500 mb-8">
            Question {current + 1} of{" "}
            {challenge.questions.length}
          </p>

          <div className="bg-gray-100 rounded-2xl p-8 mb-8">

            <h2 className="text-2xl md:text-3xl font-bold text-center">
              {challenge.questions[current]}
            </h2>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <button
              onClick={() =>
                handleAnswer(true)
              }
              className="bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-semibold transition"
            >
              ✅ I Have
            </button>

            <button
              onClick={() =>
                handleAnswer(false)
              }
              className="bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-semibold transition"
            >
              ❌ I Haven't
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}