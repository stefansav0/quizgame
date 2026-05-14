"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Create Quiz", path: "/create" },
    { name: "Blog", path: "/blog" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 border-b ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-slate-200 shadow-sm"
          : "bg-white/90 backdrop-blur-lg border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-3 shrink-0"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center shadow-md">
            <span className="text-white font-black text-lg">
              G
            </span>
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-xl sm:text-2xl font-black text-slate-900">
              Getknowify
            </span>

            <span className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide">
              Fun Quiz Platform
            </span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;

            return (
              <Link
                key={link.name}
                href={link.path}
                className={`relative text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "text-emerald-600"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {link.name}

                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute left-0 -bottom-2 w-full h-[2px] bg-emerald-500 rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex items-center gap-4">

          

          <Link
            href="/create"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
          >
            Start Quiz
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          aria-label="Toggle Menu"
          className="lg:hidden p-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-all"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 7h16M4 12h16M4 17h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden"
            />

            {/* MENU */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="relative lg:hidden bg-white border-t border-slate-200 border-b border-slate-200"
            >
              <div className="px-6 py-6 flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.path;

                  return (
                    <Link
                      key={link.name}
                      href={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between rounded-2xl px-4 py-4 text-base font-semibold transition-all ${
                        isActive
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {link.name}

                      <span className="text-lg">→</span>
                    </Link>
                  );
                })}

                {/* MOBILE CTA */}
                <div className="pt-4">
                  <Link
                    href="/create"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg shadow-sm active:scale-95 transition-transform"
                  >
                    Create Your Quiz
                  </Link>
                </div>

                {/* TRUST TEXT */}
                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Create friendship quizzes and fun personality tests to share
                    with friends and family.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}