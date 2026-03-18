"use client";

import { useEffect, useState } from "react";

export default function ResultPage({ params }) {

  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(`/api/leaderboard/${params.id}`)
      .then(res => res.json())
      .then(data => setResults(data));
  }, []);

  return (
    <div className="p-4">

      <h1 className="text-xl font-bold mb-4">
        Leaderboard 🏆
      </h1>

      {results.map((r, i) => (
        <div key={i} className="border p-2 mb-2">
          {i + 1}. {r.playerName} - {r.score}
        </div>
      ))}

    </div>
  );
}