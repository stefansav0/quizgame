"use client";

import { useState } from "react";

export default function FAQSection() {
  const faqs = [
    {
      q: "Is the friendship quiz free?",
      a: "Yes. You can create and share your quiz without creating an account.",
    },
    {
      q: "How do I create my own quiz?",
      a: "Enter your name, choose questions, select your correct answers and create your personal quiz link.",
    },
    {
      q: "Do my friends need an account?",
      a: "No. Your friends can open your quiz link and answer the questions without creating an account.",
    },
    {
      q: "Can I share my quiz on WhatsApp?",
      a: "Yes. You can share your personal quiz link with friends through WhatsApp or any other messaging platform.",
    },
    {
      q: "How do I know who knows me best?",
      a: "Each friend receives a score based on how many of your answers they guessed correctly. The highest score wins.",
    },
  ];

  const [open, setOpen] = useState(null);

  return (
    <section className="w-full py-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-pink-500">
            FAQ
          </span>

          <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = open === index;

            return (
              <div
                key={faq.q}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-gray-900">
                    {faq.q}
                  </span>

                  <span className="ml-4 text-xl text-pink-500">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm leading-6 text-gray-600">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}