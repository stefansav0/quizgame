import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/10 bg-[#0a0c10]/80 backdrop-blur-xl mt-auto relative z-50">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-12">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Brand & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="text-2xl font-black bg-gradient-to-r from-emerald-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 inline-block hover:scale-105 transition-transform">
              Bestiefy ✨
            </Link>
            <p className="text-slate-500 text-sm font-medium">
              Test your friendships. Share the love. 100% Free.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4 text-sm font-bold text-slate-400">
            <Link href="/create" className="hover:text-emerald-400 transition-colors">
              Make a Quiz
            </Link>
            <Link href="/letter/create" className="hover:text-pink-400 transition-colors">
              Send a Letter
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            {/* Replace with your actual email */}
            <a href="mailto:hello@yourdomain.com" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>

        {/* Copyright & Made With Love */}
        <div className="mt-10 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600 font-medium">
          <p>© {currentYear} Bestiefy. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <span className="text-pink-500 animate-pulse text-sm">💖</span> for besties everywhere.
          </p>
        </div>

      </div>
    </footer>
  );
}