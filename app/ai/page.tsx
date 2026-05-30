"use client";

import { useState } from "react";

export default function AIPage() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const sendMessage = async () => {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  const data = await res.json();

  setReply(data.text);
};

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">
        AI Chat
      </h1>

      <textarea
        className="border p-3 w-full"
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask anything..."
      />

      <button
        onClick={sendMessage}
        className="bg-black text-white px-4 py-2 mt-4"
      >
        Send
      </button>

      <div className="mt-6 border p-4 whitespace-pre-wrap">
        {reply}
      </div>
    </div>
  );
}