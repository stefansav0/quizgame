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
  const [status, setStatus] = useState({ loading: false, success: false, error: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: "" });

    if (formData.rating === 0) {
      setStatus({ loading: false, success: false, error: "Please select a star rating." });
      return;
    }

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus({ loading: false, success: true, error: "" });
        setFormData({ name: "", rating: 0, message: "" }); // Reset form
      } else {
        setStatus({ loading: false, success: false, error: data.error || "Something went wrong." });
      }
    } catch (error) {
      setStatus({ loading: false, success: false, error: "Failed to connect to the server." });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white font-sans selection:bg-emerald-500/30 py-24 px-6 relative">
      
      {/* BACKGROUND GLOW */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[150%] h-80 bg-emerald-500/10 blur-[120px] pointer-events-none z-0" />

      <main className="max-w-2xl mx-auto relative z-10">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight bg-gradient-to-r from-white via-emerald-100 to-emerald-400 bg-clip-text text-transparent">
            Share Your Experience
          </h1>
          <p className="text-slate-400 text-lg">
            We are always looking to improve. Let us know how we did!
          </p>
        </header>

        <div className="bg-[#13151f] border border-white/5 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle top border gradient */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-300"></div>

          {status.success ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                ✨
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
              <p className="text-slate-400 mb-8">Your feedback has been successfully submitted. We appreciate your insights.</p>
              <Link href="/" className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors">
                ← Return to Home
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* RATING STARS */}
              <div className="flex flex-col items-center justify-center mb-8">
                <label className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-3">
                  Rate your experience
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="transition-transform hover:scale-110 focus:outline-none"
                    >
                      <svg
                        className={`w-10 h-10 transition-colors duration-200 ${
                          star <= (hoveredStar || formData.rating)
                            ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]"
                            : "text-slate-700"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              {/* ERROR MESSAGE */}
              {status.error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl text-sm font-medium">
                  {status.error}
                </div>
              )}

              {/* INPUT FIELDS */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#0a0c10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-600"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Your Experience</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  className="w-full bg-[#0a0c10] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-600 resize-none"
                  placeholder="Tell us what you loved or what we can improve..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="w-full bg-emerald-500 text-emerald-950 font-black py-4 rounded-xl hover:bg-emerald-400 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg"
              >
                {status.loading ? "Submitting..." : "Share Your Experience 🚀"}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}