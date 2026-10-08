"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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

  // Close menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent page scrolling while mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Create Quiz", path: "/create" },
    { name: "Never Have I Ever", path: "/nhie" },
    { name: "Quiz & Game Ideas", path: "/ideas" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isLinkActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }

    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <>
      {/* =====================================================
          FIXED HEADER
      ====================================================== */}
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 border-b ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl border-slate-200 shadow-sm"
            : "bg-white/90 backdrop-blur-lg border-slate-100"
        }`}
      >
        {/* =====================================================
            MAIN NAVBAR
        ====================================================== */}
        <div className="relative z-[110] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* LOGO */}
          <Link
            href="/"
            className="shrink-0"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Image
              src="/favicon.ico"
              alt="GetKnowify"
              width={140}
              height={50}
              priority
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* =====================================================
              DESKTOP NAVIGATION
          ====================================================== */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = isLinkActive(link.path);

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

          {/* =====================================================
              DESKTOP CTA
          ====================================================== */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/create"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
            >
              Start Quiz
            </Link>
          </div>

          {/* =====================================================
              MOBILE MENU BUTTON
          ====================================================== */}
          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="lg:hidden relative z-[120] flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95"
          >
            {isMobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
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
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
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
      </header>

      {/* =====================================================
          HEADER SPACER
      ====================================================== */}
      <div
        className="h-20 w-full shrink-0"
        aria-hidden="true"
      />

      {/* =====================================================
          MOBILE SIDE DRAWER
          IMPORTANT: OUTSIDE HEADER
      ====================================================== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[9998] bg-slate-950/45 backdrop-blur-[2px] lg:hidden"
              aria-hidden="true"
            />

            {/* =================================================
                RIGHT SIDE DRAWER
            ================================================== */}
            <motion.aside
              id="mobile-navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "tween",
                duration: 0.28,
                ease: "easeOut",
              }}
              className="fixed right-0 top-0 bottom-0 z-[9999] flex w-[min(86vw,360px)] flex-col bg-white shadow-2xl lg:hidden"
            >
              {/* DRAWER HEADER */}
              <div className="flex h-20 shrink-0 items-center justify-between border-b border-slate-200 px-5">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="shrink-0"
                >
                  <Image
                    src="/favicon.ico"
                    alt="GetKnowify"
                    width={110}
                    height={40}
                    className="h-9 w-auto object-contain"
                  />
                </Link>

                <button
                  type="button"
                  aria-label="Close Menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:bg-slate-50 active:scale-95"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* DRAWER CONTENT */}
              <div className="flex flex-1 flex-col overflow-y-auto px-4 py-6">
                {/* SECTION TITLE */}
                <div className="mb-4 px-2">
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">
                    Navigation
                  </p>
                </div>

                {/* NAVIGATION LINKS */}
                <nav className="flex flex-col gap-1.5">
                  {navLinks.map((link) => {
                    const isActive = isLinkActive(link.path);

                    return (
                      <Link
                        key={link.name}
                        href={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`group flex min-h-[52px] items-center justify-between rounded-xl px-4 py-3 text-[15px] font-semibold transition-all ${
                          isActive
                            ? "bg-emerald-50 text-emerald-600"
                            : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <span>{link.name}</span>

                        <span
                          className={`text-lg transition-transform duration-200 group-hover:translate-x-1 ${
                            isActive
                              ? "text-emerald-500"
                              : "text-slate-300"
                          }`}
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </Link>
                    );
                  })}
                </nav>

                {/* CTA */}
                <div className="mt-6 border-t border-slate-100 pt-6">
                  <Link
                    href="/create"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center rounded-xl bg-emerald-500 px-5 py-3.5 text-base font-bold text-white shadow-sm transition-all hover:bg-emerald-600 active:scale-[0.98]"
                  >
                    Create Your Quiz →
                  </Link>
                </div>

                {/* DESCRIPTION */}
                <div className="mt-5 rounded-xl bg-slate-50 p-4">
                  <p className="text-xs leading-6 text-slate-500">
                    Create quizzes, play fun games, and connect with the
                    people you know.
                  </p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}