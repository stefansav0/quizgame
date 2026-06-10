"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050510] text-white font-sans selection:bg-fuchsia-500/30">
      
      {/* --- HEADER (Crucial for AdSense Navigation) --- */}
      <header className="fixed top-0 w-full bg-[#050510]/80 backdrop-blur-md z-50 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-black text-fuchsia-400 tracking-tighter">
            GetKnowify <span className="text-emerald-400 text-3xl leading-none">.</span>
          </div>
          <nav className="hidden md:flex gap-8 font-bold text-slate-300">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/nhie/create" className="hover:text-fuchsia-400 transition-colors">Create Game</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </nav>
          <Link 
            href="/nhie/create" 
            className="bg-fuchsia-500 text-fuchsia-950 font-black px-6 py-2 rounded-xl hover:bg-fuchsia-400 transition-transform active:scale-95"
          >
            Start Now
          </Link>
        </div>
      </header>

      <main className="pt-32 pb-20">
        {/* --- HERO SECTION --- */}
        <section className="max-w-6xl mx-auto px-6 text-center mb-24 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] md:w-[150%] h-64 bg-fuchsia-500/10 blur-[120px] pointer-events-none" />
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase text-emerald-400 mb-6 inline-block">
              The Viral Party Game
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Expose Your Secrets. <br />
              <span className="bg-gradient-to-r from-fuchsia-400 to-pink-500 bg-clip-text text-transparent">
                Test Your Friends.
              </span>
            </h1>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Play the ultimate online version of Never Have I Ever. Confess what you've done, send the link to your group chat, and see who can guess your deepest secrets.
            </p>
            
            <Link 
              href="/nhie/create" 
              className="inline-flex items-center gap-2 bg-fuchsia-500 text-fuchsia-950 font-black text-xl px-10 py-5 rounded-2xl hover:bg-fuchsia-400 transition-all hover:scale-[1.02] active:scale-95 shadow-[0_10px_40px_rgba(217,70,239,0.3)]"
            >
              Create Your Game Now 🚀
            </Link>
          </motion.div>
        </section>

        

        {/* --- HOW IT WORKS (App functionality context) --- */}
        <section className="max-w-6xl mx-auto px-6 mb-32">
          <h2 className="text-3xl font-black text-center mb-16 text-white">How The Online Game Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#110f1c] p-8 rounded-[2rem] border border-fuchsia-500/20 text-center hover:border-fuchsia-500/50 transition-colors">
              <div className="text-5xl mb-6">🤫</div>
              <h3 className="text-2xl font-black mb-4">1. Confess</h3>
              <p className="text-slate-400 leading-relaxed">Answer 10 wildly spicy "Never Have I Ever" statements truthfully on your device. Only you know the real answers.</p>
            </div>
            <div className="bg-[#110f1c] p-8 rounded-[2rem] border border-emerald-500/20 text-center hover:border-emerald-500/50 transition-colors">
              <div className="text-5xl mb-6">📱</div>
              <h3 className="text-2xl font-black mb-4">2. Share</h3>
              <p className="text-slate-400 leading-relaxed">We generate a highly secure, custom link for you. Drop it into your WhatsApp, Instagram, or group chats.</p>
            </div>
            <div className="bg-[#110f1c] p-8 rounded-[2rem] border border-amber-500/20 text-center hover:border-amber-500/50 transition-colors">
              <div className="text-5xl mb-6">🏆</div>
              <h3 className="text-2xl font-black mb-4">3. Track</h3>
              <p className="text-slate-400 leading-relaxed">Watch your live dashboard as friends try to guess your answers. Find out who actually pays attention to you!</p>
            </div>
          </div>
        </section>

        {/* --- DEEP EXPLANATION / SEO CONTENT (CRITICAL FOR ADSENSE) --- */}
        <section className="max-w-4xl mx-auto px-6 mb-24 prose prose-invert prose-lg prose-fuchsia">
          <div className="bg-white/[0.02] p-8 md:p-12 rounded-[3rem] border border-white/5">
            <h2 className="text-3xl font-black text-fuchsia-400 mb-6">What is "Never Have I Ever"?</h2>
            <p className="text-slate-300 mb-6 leading-loose">
              "Never Have I Ever" is one of the most famous icebreaker and party games in the world. Traditionally played in a circle with friends, one person makes a statement starting with "Never have I ever...", and anyone who has performed that action must take a drink, put a finger down, or confess.
            </p>
            <p className="text-slate-300 mb-10 leading-loose">
              However, coordinating a game night isn't always possible. <strong>GetKnowify</strong> brings this classic psychological challenge to the internet. Instead of playing in person, you answer questions privately. Your friends are then challenged to guess your answers, turning it into a hilarious test of friendship and awareness.
            </p>

            <h3 className="text-2xl font-black text-white mb-4">Why Play the Digital Version?</h3>
            <ul className="space-y-4 text-slate-300 mb-10 list-disc pl-5">
              <li><strong>Zero Awkwardness:</strong> Confess your wildest secrets without having to look people in the eye immediately.</li>
              <li><strong>Long-Distance Friendly:</strong> Play with friends in different countries via WhatsApp, X (Twitter), or Discord.</li>
              <li><strong>Automated Scoring:</strong> No more arguing about who won. Our algorithm calculates who knows you best instantly.</li>
              <li><strong>Privacy First:</strong> Your custom game link is entirely anonymous. If you delete the game from your device, the database completely wipes the record.</li>
            </ul>

           

            <h3 className="text-2xl font-black text-white mb-4">The Best Categories to Expose Your Friends</h3>
            <p className="text-slate-300 mb-6 leading-loose">
              When creating your game on our platform, you will be presented with a randomized question bank. Our algorithm pulls from several distinct behavioral categories to ensure a perfectly balanced psychological profile:
            </p>
            <ul className="space-y-4 text-slate-300 mb-6 list-none">
              <li className="bg-black/40 p-4 rounded-xl border border-white/5">💬 <strong>Social & Texting:</strong> Questions about ghosting, fake accounts, and social media stalking.</li>
              <li className="bg-black/40 p-4 rounded-xl border border-white/5">💔 <strong>Dating & Romance:</strong> Awkward first dates, terrible pickup lines, and relationship drama.</li>
              <li className="bg-black/40 p-4 rounded-xl border border-white/5">🍔 <strong>Habits & Gross Truths:</strong> The five-second rule, dropping phones in toilets, and bizarre food choices.</li>
              <li className="bg-black/40 p-4 rounded-xl border border-white/5">💼 <strong>Work & School:</strong> Faking sick days, falling asleep in meetings, and cheating on tests.</li>
            </ul>
          </div>
        </section>

        {/* --- BOTTOM CTA --- */}
        <section className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-8 text-white">Ready to expose yourself?</h2>
          <Link 
            href="/nhie/create" 
            className="inline-block bg-white text-black font-black text-xl px-12 py-5 rounded-2xl hover:bg-slate-200 transition-all hover:scale-[1.02] active:scale-95 shadow-xl"
          >
            Start Your Quiz Now
          </Link>
        </section>

      </main>

    </div>
  );
}