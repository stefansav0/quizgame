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
    type: "",
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
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({
          type: "success",
          message: "Message sent successfully 🚀",
        });

        setForm({
          name: "",
          email: "",
          message: "",
        });
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
    <main className="min-h-screen w-full bg-white px-4 py-8 sm:px-6 sm:py-14">
      <div className="mx-auto w-full max-w-2xl">

        {/* CONTACT CARD */}
        <div className="rounded-2xl bg-[#f8f7ff] px-6 py-8 shadow-[0_6px_0_rgba(0,0,0,0.06)] sm:px-10 sm:py-10">

          {/* EMOJI */}
          <div className="mb-4 flex justify-center">
            <div className="text-6xl sm:text-7xl">
              💬
            </div>
          </div>

          {/* HEADER */}
          <h1 className="mb-3 text-center text-2xl font-medium uppercase tracking-wide text-[#c47b8c] sm:text-3xl">
            Contact Us
          </h1>

          <p className="mx-auto mb-8 max-w-lg text-center text-sm leading-6 text-gray-600 sm:text-base">
            Have a question, suggestion, or feedback?
            <br />
            We would love to hear from you.
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* NAME */}
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-semibold text-gray-700"
              >
                Your Name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                required
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-4
                  py-3.5
                  text-gray-900
                  placeholder:text-gray-400
                  outline-none
                  transition
                  focus:border-emerald-400
                  focus:ring-2
                  focus:ring-emerald-100
                "
              />
            </div>

            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-semibold text-gray-700"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-4
                  py-3.5
                  text-gray-900
                  placeholder:text-gray-400
                  outline-none
                  transition
                  focus:border-emerald-400
                  focus:ring-2
                  focus:ring-emerald-100
                "
              />
            </div>

            {/* MESSAGE */}
            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-sm font-semibold text-gray-700"
              >
                Your Message
              </label>

              <textarea
                id="message"
                name="message"
                placeholder="Write your message here..."
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
                minLength={10}
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-4
                  py-3.5
                  text-gray-900
                  placeholder:text-gray-400
                  outline-none
                  transition
                  focus:border-emerald-400
                  focus:ring-2
                  focus:ring-emerald-100
                "
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="
                mt-2
                w-full
                rounded-xl
                bg-emerald-500
                px-6
                py-3.5
                font-bold
                text-white
                shadow-sm
                transition-all
                hover:-translate-y-0.5
                hover:bg-emerald-600
                hover:shadow-md
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading ? "Sending..." : "Send Message 🚀"}
            </button>

          </form>

          {/* STATUS MESSAGE */}
          {status.message && (
            <div
              className={`mt-5 rounded-xl px-4 py-3 text-center text-sm font-medium ${
                status.type === "success"
                  ? "border border-emerald-100 bg-emerald-50 text-emerald-600"
                  : "border border-red-100 bg-red-50 text-red-600"
              }`}
            >
              {status.message}
            </div>
          )}

        </div>

      </div>
    </main>
  );
}