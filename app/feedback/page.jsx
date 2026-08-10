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

      const data = await res.json();

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
      } else {
        setStatus({
          loading: false,
          success: false,
          error: data.error || "Something went wrong.",
        });
      }
    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        error: "Failed to connect to the server.",
      });
    }
  };

  return (
    <main className="min-h-screen w-full bg-white px-4 py-8 sm:px-6 sm:py-14">
      <div className="mx-auto w-full max-w-2xl">

        {/* HEADER */}
        <header className="mb-8 text-center sm:mb-10">

          
          <h1
            className="
              text-2xl
              font-medium
              uppercase
              tracking-wide
              text-[#c47b8c]
              sm:text-3xl
            "
          >
            Share Your Experience
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-600 sm:text-base">
            We are always looking to improve.
            <br />
            Let us know how we did!
          </p>

        </header>


        {/* FEEDBACK CARD */}
        <div
          className="
            overflow-hidden
            rounded-2xl
            bg-[#f8f7ff]
            px-6
            py-8
            shadow-[0_6px_0_rgba(0,0,0,0.06)]
            sm:px-10
            sm:py-10
          "
        >

          {status.success ? (

            /* SUCCESS MESSAGE */
            <div className="py-8 text-center sm:py-12">

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
                
              </div>

              <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">
                Thank You!
              </h2>

              <p className="mx-auto mb-7 max-w-md text-sm leading-6 text-gray-600 sm:text-base">
                Your feedback has been successfully submitted.
                We really appreciate your time and insights.
              </p>

              <Link
                href="/"
                className="
                  inline-flex
                  items-center
                  rounded-xl
                  bg-emerald-500
                  px-6
                  py-3
                  font-bold
                  text-white
                  shadow-sm
                  transition-all
                  hover:-translate-y-0.5
                  hover:bg-emerald-600
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
              className="space-y-5"
            >

              {/* RATING */}
              <div className="mb-7 flex flex-col items-center">

                <label className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-700">
                  Rate Your Experience
                </label>

                <div className="flex gap-1.5 sm:gap-2">

                  {[1, 2, 3, 4, 5].map((star) => (

                    <button
                      key={star}
                      type="button"
                      aria-label={`Rate ${star} out of 5`}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          rating: star,
                        })
                      }
                      className="
                        rounded-lg
                        p-1
                        transition-transform
                        hover:scale-110
                        focus:outline-none
                        focus:ring-2
                        focus:ring-emerald-200
                      "
                    >
                      <svg
                        className={`h-9 w-9 transition-colors duration-200 sm:h-10 sm:w-10 ${
                          star <= (hoveredStar || formData.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>

                  ))}

                </div>

                {formData.rating > 0 && (
                  <p className="mt-2 text-xs font-medium text-gray-500">
                    {formData.rating} out of 5
                  </p>
                )}

              </div>


              {/* ERROR MESSAGE */}
              {status.error && (
                <div
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
                    text-red-600
                  "
                >
                  {status.error}
                </div>
              )}


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
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your name"
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


              {/* EXPERIENCE */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-semibold text-gray-700"
                >
                  Your Experience
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  placeholder="Tell us what you loved or what we can improve..."
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


              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={status.loading}
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
                {status.loading
                  ? "Submitting..."
                  : "Share Your Experience "}
              </button>

            </form>
          )}

        </div>
      </div>
    </main>
  );
}