"use client";

import { useState } from "react";
import Link from "next/link";

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: "",
    rating: 0,
    message: "",
  });

  const [hoveredStar, setHoveredStar] = useState(0);

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({
      loading: true,
      success: false,
      error: "",
    });

    if (formData.rating === 0) {
      setStatus({
        loading: false,
        success: false,
        error: "Please select a star rating.",
      });

      return;
    }

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (data.success) {
        setStatus({
          loading: false,
          success: true,
          error: "",
        });

        setFormData({
          name: "",
          rating: 0,
          message: "",
        });

        setHoveredStar(0);
      } else {
        setStatus({
          loading: false,
          success: false,
          error: data.error || "Something went wrong.",
        });
      }
    } catch (error) {
      console.error("Feedback submission error:", error);

      setStatus({
        loading: false,
        success: false,
        error: "Failed to connect to the server. Please try again later.",
      });
    }
  };

  return (
    <main className="min-h-screen w-full bg-white px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto w-full max-w-3xl">

        {/* MAIN CARD */}
        <div
          className="
            overflow-hidden
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
              Share Your Experience
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
              We are always looking to improve. Tell us what you think about
              GetKnowify and how we can make your experience better.
            </p>
          </div>


          {/* SUCCESS STATE */}
          {status.success ? (
            <div className="py-8 text-center sm:py-12">

              {/* SUCCESS ICON */}
              <div
                className="
                  mx-auto
                  mb-6
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-full
                  bg-emerald-50
                  text-4xl
                "
              >
                ✓
              </div>

              <h2 className="mb-3 text-2xl font-bold text-slate-900 sm:text-3xl">
                Thank You!
              </h2>

              <p className="mx-auto mb-7 max-w-md text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                Your feedback has been successfully submitted. We really
                appreciate your time and insights.
              </p>

              <Link
                href="/"
                className="
                  inline-flex
                  items-center
                  rounded-xl
                  bg-indigo-600
                  px-6
                  py-3
                  font-bold
                  text-white
                  shadow-sm
                  transition-all
                  hover:-translate-y-0.5
                  hover:bg-indigo-700
                  hover:shadow-md
                  active:scale-95
                "
              >
                ← Return to Home
              </Link>

            </div>
          ) : (

            /* FEEDBACK FORM */
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* RATING */}
              <div className="flex flex-col items-center">

                <label
                  htmlFor="rating"
                  className="
                    mb-3
                    text-sm
                    font-bold
                    uppercase
                    tracking-wider
                    text-slate-700
                  "
                >
                  Rate Your Experience
                </label>

                <div
                  id="rating"
                  className="flex gap-1.5 sm:gap-2"
                  role="radiogroup"
                  aria-label="Rate your experience from 1 to 5 stars"
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      role="radio"
                      aria-checked={formData.rating === star}
                      aria-label={`Rate ${star} out of 5`}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      onFocus={() => setHoveredStar(star)}
                      onBlur={() => setHoveredStar(0)}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          rating: star,
                        }))
                      }
                      className="
                        rounded-lg
                        p-1
                        transition-transform
                        hover:scale-110
                        focus:outline-none
                        focus:ring-2
                        focus:ring-indigo-200
                      "
                    >
                      <svg
                        className={`h-9 w-9 transition-colors duration-200 sm:h-10 sm:w-10 ${
                          star <= (hoveredStar || formData.rating)
                            ? "text-yellow-400"
                            : "text-slate-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>

                {formData.rating > 0 && (
                  <p className="mt-2 text-xs font-medium text-slate-500">
                    {formData.rating} out of 5
                  </p>
                )}
              </div>


              {/* ERROR MESSAGE */}
              {status.error && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="
                    rounded-xl
                    border
                    border-red-100
                    bg-red-50
                    px-4
                    py-3
                    text-center
                    text-sm
                    font-medium
                    text-red-700
                  "
                >
                  {status.error}
                </div>
              )}


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
                  value={formData.name}
                  onChange={handleInputChange}
                  autoComplete="name"
                  required
                  placeholder="Enter your name"
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


              {/* EXPERIENCE */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Your Experience
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  minLength={10}
                  rows={6}
                  placeholder="Tell us what you loved or what we can improve..."
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


              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={status.loading}
                aria-busy={status.loading}
                className="
                  mt-2
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
                {status.loading
                  ? "Submitting..."
                  : "Share Your Experience →"}
              </button>

            </form>
          )}


          {/* FOOTER NOTE */}
          <div className="mt-10 border-t border-slate-200 pt-6 text-center">
            <p className="text-sm leading-6 text-slate-500">
              Your feedback helps us improve GetKnowify and create better
              experiences for everyone.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}