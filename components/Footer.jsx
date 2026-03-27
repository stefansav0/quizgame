import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/10 bg-[#0a0c10] mt-auto relative z-50 overflow-hidden">
      
      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100%] h-24 bg-emerald-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 relative z-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          
          {/* Brand & Tagline (Takes up more space on desktop) */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="text-3xl font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent mb-4 inline-block hover:scale-105 transition-transform duration-300">
              Getknowify ✨
            </Link>
            <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-sm mb-6">
              The ultimate platform to test your friendships, discover who knows you best, and share the love. 100% Free forever.
            </p>
            {/* Optional: Social Media Placeholders (Great for AdSense E-E-A-T) */}
            
          </div>

          {/* Navigation Links Grid */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-center sm:text-left">
            
            {/* Column 1: Product */}
            <div className="flex flex-col gap-4">
              <h3 className="text-white font-bold tracking-widest uppercase text-xs mb-2">Features</h3>
              <Link href="/create" className="text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors">
                Make a Quiz
              </Link>
              <Link href="/letter/create" className="text-sm font-medium text-slate-400 hover:text-pink-400 transition-colors">
                Send a Letter
              </Link>
             
            </div>

            {/* Column 2: Company */}
            <div className="flex flex-col gap-4">
              <h3 className="text-white font-bold tracking-widest uppercase text-xs mb-2">Company</h3>
              <Link href="/about" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="/blog" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                Our Blog
              </Link>
              <Link href="/contact" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>

            {/* Column 3: Legal */}
            <div className="flex flex-col gap-4 col-span-2 sm:col-span-1">
              <h3 className="text-white font-bold tracking-widest uppercase text-xs mb-2">Legal</h3>
              <Link href="/privacy" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              
            </div>

          </div>
        </div>

        {/* Copyright & Made With Love */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© {currentYear} Findmeway. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with <span className="text-pink-500 animate-pulse text-sm">💖</span> for besties everywhere.
          </p>
        </div>

      </div>
    </footer>
  );
}