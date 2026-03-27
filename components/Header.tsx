"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Navigation Links
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Create Quiz", path: "/create" },
    
    { name: "Blog", path: "/blog" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[100] bg-[#0a0c10]/80 backdrop-blur-xl border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link 
          href="/" 
          className="text-2xl font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 flex items-center gap-2"
        >
          Getknowify ✨
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link 
                key={link.name} 
                href={link.path}
                className={`text-sm font-bold transition-colors ${
                  isActive ? "text-emerald-400" : "text-slate-300 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* DESKTOP CTA BUTTON */}
        <div className="hidden md:block">
          <Link 
            href="/create"
            className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 px-6 py-2.5 rounded-xl font-black text-sm transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] active:scale-95"
          >
            Start Now 
          </Link>
        </div>

        {/* MOBILE MENU BUTTON (HAMBURGER) */}
        <button 
          className="md:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* MOBILE NAVIGATION DROPDOWN */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0f111a] border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link 
                    key={link.name} 
                    href={link.path}
                    onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                    className={`text-lg font-bold py-2 border-b border-white/5 ${
                      isActive ? "text-emerald-400" : "text-slate-300"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 pb-2">
                <Link 
                  href="/create"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center bg-emerald-500 text-emerald-950 w-full py-3 rounded-xl font-black text-lg shadow-lg active:scale-95 transition-transform"
                >
                  Start Now 
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}