"use client";

import { useState } from "react";
import Link from "next/link";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
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

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus({
          type: "success",
          message: "Message sent successfully 🚀",
        });

        setForm(initialForm);
      } else {
        setStatus({
          type: "error",
          message: data.error || "Something went wrong. Please try again.",
        });
      }
    } catch (err) {
      console.error("Contact form error:", err);

      setStatus({
        type: "error",
        message: "Server error. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-white px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto w-full max-w-3xl">

        {/* MAIN CARD */}
        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-6
            py-8
            shadow-sm
            sm:px-10
            sm:py-10
            md:px-12
            md:py-12
          "
        >

          {/* BACK LINK */}
          <Link
            href="/"
            className="
              mb-8
              inline-flex
              items-center
              text-sm
              font-semibold
              text-indigo-600
              transition-colors
              hover:text-indigo-800
            "
          >
            ← Back to Home
          </Link>


          {/* HEADER */}
          <div
            className="
              mb-10
              border-b
              border-slate-200
              pb-8
              text-center
            "
          >
            <h1
              className="
                text-3xl
                font-black
                tracking-tight
                text-slate-900
                sm:text-4xl
              "
            >
              Contact Us
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
              Have a question, suggestion, or feedback? We would love to hear
              from you.
            </p>
          </div>


          {/* CONTACT INFORMATION */}
          <div
            className="
              mb-8
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              p-5
              sm:p-6
            "
          >
            <h2 className="text-lg font-bold text-slate-900">
              Get in Touch
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Whether you have found an issue, have an idea for a new feature,
              or simply want to share your feedback, you can use the form
              below to contact the GetKnowify Team.
            </p>
          </div>


          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* NAME */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-slate-800"
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
                autoComplete="name"
                required
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-3.5
                  text-slate-900
                  placeholder:text-slate-400
                  outline-none
                  transition
                  focus:border-indigo-400
                  focus:ring-4
                  focus:ring-indigo-50
                "
              />
            </div>


            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-800"
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
                autoComplete="email"
                required
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-3.5
                  text-slate-900
                  placeholder:text-slate-400
                  outline-none
                  transition
                  focus:border-indigo-400
                  focus:ring-4
                  focus:ring-indigo-50
                "
              />
            </div>


            {/* MESSAGE */}
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Your Message
              </label>

              <textarea
                id="message"
                name="message"
                placeholder="Write your message here..."
                rows={6}
                value={form.message}
                onChange={handleChange}
                required
                minLength={10}
                className="
                  w-full
                  resize-y
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-3.5
                  text-slate-900
                  placeholder:text-slate-400
                  outline-none
                  transition
                  focus:border-indigo-400
                  focus:ring-4
                  focus:ring-indigo-50
                "
              />

              <p className="mt-2 text-xs text-slate-500">
                Please provide at least 10 characters.
              </p>
            </div>


            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="
                w-full
                rounded-xl
                bg-indigo-600
                px-6
                py-3.5
                font-bold
                text-white
                shadow-sm
                transition-all
                hover:-translate-y-0.5
                hover:bg-indigo-700
                hover:shadow-md
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-60
                disabled:hover:translate-y-0
                disabled:hover:shadow-sm
              "
            >
              {loading ? "Sending..." : "Send Message 🚀"}
            </button>

          </form>


          {/* STATUS MESSAGE */}
          {status.message && (
            <div
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className={`mt-6 rounded-xl px-4 py-3 text-center text-sm font-semibold ${
                status.type === "success"
                  ? "border border-emerald-100 bg-emerald-50 text-emerald-700"
                  : "border border-red-100 bg-red-50 text-red-700"
              }`}
            >
              {status.message}
            </div>
          )}


          {/* FOOTER NOTE */}
          <div className="mt-10 border-t border-slate-200 pt-6 text-center">
            <p className="text-sm leading-6 text-slate-500">
              We appreciate your feedback and will do our best to respond to
              genuine questions and suggestions.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}