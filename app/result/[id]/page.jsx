"use client";

import { useEffect, useState } from "react";

export default function ResultPage({ params }) {
  const [results, setResults] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/leaderboard/${params.id}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to load");

        setResults(data);
      } catch (err) {
        console.error(err);
        setError("Something went wrong 😢");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [params.id]);

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white p-6">

      {/* HEADER */}
      <h1 className="text-3xl md:text-4xl font-black text-center mb-8 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
        🏆 Leaderboard
      </h1>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-gray-400">Loading results...</p>
      )}

      {/* ERROR */}
      {error && (
        <p className="text-center text-red-400">{error}</p>
      )}

      {/* EMPTY STATE */}
      {!loading && results.length === 0 && (
        <p className="text-center text-gray-500">
          No one has attempted yet 👀
        </p>
      )}

      {/* RESULTS */}
      <div className="space-y-4 max-w-2xl mx-auto">
        {results.map((r, i) => {
          const percentage = r.percentage || 0;

          return (
            <div
              key={i}
              className="bg-[#13151f]/80 border border-white/10 rounded-2xl p-5 backdrop-blur-xl"
            >
              {/* HEADER */}
              <div
                onClick={() =>
                  setExpandedIndex(expandedIndex === i ? null : i)
                }
                className="flex justify-between items-center cursor-pointer"
              >
                <div>
                  <p className="font-bold text-lg">
                    🥇 #{i + 1} {r.playerName}
                  </p>

                  <p className="text-sm text-gray-400">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-emerald-400 font-bold text-lg">
                    {r.score} pts
                  </p>
                  <p className="text-xs text-gray-400">
                    {percentage}% Accuracy
                  </p>
                </div>
              </div>

              {/* EXPANDED ANSWERS */}
              {expandedIndex === i && (
                <div className="mt-5 space-y-3 border-t border-white/10 pt-4">

                  {r.answers?.length > 0 ? (
                    r.answers.map((ans, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-black/40 border border-white/10"
                      >
                        <p className="font-semibold mb-2">
                          Q{idx + 1}. {ans.question}
                        </p>

                        <p className="text-sm">
                          👉 Selected:{" "}
                          <span className="text-yellow-400">
                            {ans.selected || "Not answered"}
                          </span>
                        </p>

                        <p className="text-sm">
                          ✅ Correct:{" "}
                          <span className="text-green-400">
                            {ans.correct}
                          </span>
                        </p>

                        <p
                          className={`text-sm font-bold mt-1 ${
                            ans.isCorrect
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {ans.isCorrect ? "✔ Correct" : "✖ Wrong"}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">
                      No answer data available
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}