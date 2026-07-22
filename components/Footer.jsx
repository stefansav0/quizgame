import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-200 bg-white relative overflow-hidden">
      {/* Soft Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-24 bg-emerald-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-14 relative z-10">
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-slate-200">
          
          {/* BRAND & DESCRIPTION */}
          <div className="md:col-span-5 text-center md:text-left">
            <Link
              href="/"
              className="inline-flex items-center"
              aria-label="GetKnowify Home"
            >
              <Image
                src="/favicon.ico"
                alt="GetKnowify"
                width={180}
                height={60}
                priority
                className="h-14 md:h-16 w-auto object-contain"
              />
            </Link>

            {/* DESCRIPTION */}
            <p className="mt-5 text-sm leading-relaxed text-slate-600 max-w-sm mx-auto md:mx-0">
              Create friendship quizzes, personality tests, and interactive
              games to share with friends and family online.
            </p>
          </div>

          {/* LINKS */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-center sm:text-left">
            
            {/* FEATURES */}
            <div className="flex flex-col gap-3">
              <h3 className="text-slate-900 text-xs font-bold tracking-widest uppercase mb-2">
                Features
              </h3>

              <Link
                href="/create"
                className="text-sm text-slate-600 hover:text-emerald-600 transition-colors"
              >
                Create Quiz
              </Link>

              <Link
                href="/blog"
                className="text-sm text-slate-600 hover:text-emerald-600 transition-colors"
              >
                Blog
              </Link>

              <Link
                href="/feedback"
                className="text-sm text-slate-600 hover:text-emerald-600 transition-colors"
              >
                Feedback
              </Link>
            </div>

            {/* COMPANY */}
            <div className="flex flex-col gap-3">
              <h3 className="text-slate-900 text-xs font-bold tracking-widest uppercase mb-2">
                Company
              </h3>

              <Link
                href="/about"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                About Us
              </Link>

              <Link
                href="/contact"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                Contact
              </Link>
            </div>

            {/* LEGAL */}
            <div className="flex flex-col gap-3 col-span-2 sm:col-span-1">
              <h3 className="text-slate-900 text-xs font-bold tracking-widest uppercase mb-2">
                Legal
              </h3>

              <Link
                href="/privacy"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {currentYear} Getknowify. All rights reserved.
          </p>

          <p className="text-center">
            Built for fun, friendship, and sharing moments online.
          </p>
        </div>
      </div>
    </footer>
  );
}