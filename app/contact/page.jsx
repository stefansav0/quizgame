"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    type: "", // success | error
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // 🔥 FIX
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({
          type: "success",
          message: "Message sent successfully 🚀",
        });
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: data.error || "Something went wrong",
        });
      }
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: "Server error. Try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white flex items-center justify-center p-6">

      <div className="w-full max-w-xl bg-[#13151f]/80 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">

        {/* HEADER */}
        <h1 className="text-4xl font-black text-center mb-4 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
          Contact Us
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Have questions, feedback, or issues? <br />
          We’d love to hear from you 💬
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full bg-black/40 border border-white/10 px-5 py-4 rounded-xl outline-none focus:border-emerald-500 transition"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full bg-black/40 border border-white/10 px-5 py-4 rounded-xl outline-none focus:border-emerald-500 transition"
          />

          <textarea
            name="message"
            placeholder="Your Message (min 10 characters)..."
            rows={5}
            value={form.message}
            onChange={handleChange}
            required
            className="w-full bg-black/40 border border-white/10 px-5 py-4 rounded-xl outline-none focus:border-emerald-500 transition resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-400 text-black font-bold py-4 rounded-xl hover:scale-[1.02] transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message 🚀"}
          </button>

        </form>

        {/* STATUS MESSAGE */}
        {status.message && (
          <p
            className={`text-center mt-4 ${
              status.type === "success"
                ? "text-emerald-400"
                : "text-red-400"
            }`}
          >
            {status.message}
          </p>
        )}

      </div>
    </div>
  );
}