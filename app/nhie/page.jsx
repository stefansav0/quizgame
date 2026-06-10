"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-200">
      
      {/* --- HEADER (Crucial for AdSense Navigation) --- */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-black text-emerald-600 tracking-tighter">
            GetKnowify <span className="text-teal-500 text-3xl leading-none">.</span>
          </div>
          <nav className="hidden md:flex gap-8 font-bold text-slate-500">
            <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
            <Link href="/nhie/create" className="hover:text-emerald-600 transition-colors">Create Game</Link>
            <Link href="/blog" className="hover:text-emerald-600 transition-colors">Blog</Link>
            <Link href="/contact" className="hover:text-emerald-600 transition-colors">Contact</Link>
          </nav>
          <Link 
            href="/nhie/create" 
            className="bg-emerald-500 text-white font-black px-6 py-2 rounded-xl hover:bg-emerald-600 transition-transform active:scale-95 shadow-md"
          >
            Start Now
          </Link>
        </div>
      </header>

      <main className="pt-32 pb-20">
        {/* --- HERO SECTION --- */}
        <section className="max-w-6xl mx-auto px-6 text-center mb-24 relative">
          {/* Soft background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] md:w-[150%] h-64 bg-emerald-500/10 blur-[120px] pointer-events-none" />
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10">
            <span className="bg-emerald-50 border border-emerald-200 px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase text-emerald-700 mb-6 inline-block shadow-sm">
              The Viral Party Game
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-slate-900">
              Expose Your Secrets. <br />
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                Test Your Friends.
              </span>
            </h1>
            <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
              Play the ultimate online version of Never Have I Ever. Confess what you've done, send the link to your group chat, and see who can guess your deepest secrets.
            </p>
            
            <Link 
              href="/nhie/create" 
              className="inline-flex items-center gap-2 bg-emerald-500 text-white font-black text-xl px-10 py-5 rounded-2xl hover:bg-emerald-600 transition-all hover:scale-[1.02] active:scale-95 shadow-[0_10px_30px_rgba(16,185,129,0.3)]"
            >
              Create Your Game Now 🚀
            </Link>
          </motion.div>
        </section>

        {/* --- HOW IT WORKS (App functionality context) --- */}
        <section className="max-w-6xl mx-auto px-6 mb-32">
          <h2 className="text-3xl font-black text-center mb-16 text-slate-900">How The Online Game Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 text-center hover:border-emerald-300 transition-colors shadow-lg">
              <div className="text-5xl mb-6 drop-shadow-sm">🤫</div>
              <h3 className="text-2xl font-black mb-4 text-slate-800">1. Confess</h3>
              <p className="text-slate-500 leading-relaxed font-medium">Answer 10 wildly spicy "Never Have I Ever" statements truthfully on your device. Only you know the real answers.</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 text-center hover:border-teal-300 transition-colors shadow-lg">
              <div className="text-5xl mb-6 drop-shadow-sm">📱</div>
              <h3 className="text-2xl font-black mb-4 text-slate-800">2. Share</h3>
              <p className="text-slate-500 leading-relaxed font-medium">We generate a highly secure, custom link for you. Drop it into your WhatsApp, Instagram, or group chats.</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 text-center hover:border-amber-300 transition-colors shadow-lg">
              <div className="text-5xl mb-6 drop-shadow-sm">🏆</div>
              <h3 className="text-2xl font-black mb-4 text-slate-800">3. Track</h3>
              <p className="text-slate-500 leading-relaxed font-medium">Watch your live dashboard as friends try to guess your answers. Find out who actually pays attention to you!</p>
            </div>
          </div>
        </section>

        {/* --- DEEP EXPLANATION / SEO CONTENT (CRITICAL FOR ADSENSE) --- */}
        <section className="max-w-4xl mx-auto px-6 mb-24 prose prose-lg prose-emerald">
          <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-200 shadow-xl">
            <h2 className="text-3xl font-black text-emerald-600 mb-6">What is "Never Have I Ever"?</h2>
            <p className="text-slate-600 mb-6 leading-loose font-medium">
              "Never Have I Ever" is one of the most famous icebreaker and party games in the world. Traditionally played in a circle with friends, one person makes a statement starting with "Never have I ever...", and anyone who has performed that action must take a drink, put a finger down, or confess.
            </p>
            <p className="text-slate-600 mb-10 leading-loose font-medium">
              However, coordinating a game night isn't always possible. <strong>GetKnowify</strong> brings this classic psychological challenge to the internet. Instead of playing in person, you answer questions privately. Your friends are then challenged to guess your answers, turning it into a hilarious test of friendship and awareness.
            </p>

            <h3 className="text-2xl font-black text-slate-900 mb-4">Why Play the Digital Version?</h3>
            <ul className="space-y-4 text-slate-600 mb-10 list-disc pl-5 font-medium">
              <li><strong>Zero Awkwardness:</strong> Confess your wildest secrets without having to look people in the eye immediately.</li>
              <li><strong>Long-Distance Friendly:</strong> Play with friends in different countries via WhatsApp, X (Twitter), or Discord.</li>
              <li><strong>Automated Scoring:</strong> No more arguing about who won. Our algorithm calculates who knows you best instantly.</li>
              <li><strong>Privacy First:</strong> Your custom game link is entirely anonymous. If you delete the game from your device, the database completely wipes the record.</li>
            </ul>

            <h3 className="text-2xl font-black text-slate-900 mb-4">The Best Categories to Expose Your Friends</h3>
            <p className="text-slate-600 mb-6 leading-loose font-medium">
              When creating your game on our platform, you will be presented with a randomized question bank. Our algorithm pulls from several distinct behavioral categories to ensure a perfectly balanced psychological profile:
            </p>
            <ul className="space-y-4 text-slate-700 mb-6 list-none font-medium">
              <li className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm">💬 <strong>Social & Texting:</strong> Questions about ghosting, fake accounts, and social media stalking.</li>
              <li className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm">💔 <strong>Dating & Romance:</strong> Awkward first dates, terrible pickup lines, and relationship drama.</li>
              <li className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm">🍔 <strong>Habits & Gross Truths:</strong> The five-second rule, dropping phones in toilets, and bizarre food choices.</li>
              <li className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm">💼 <strong>Work & School:</strong> Faking sick days, falling asleep in meetings, and cheating on tests.</li>
            </ul>
          </div>
        </section>

        {/* --- BOTTOM CTA --- */}
        <section className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-8 text-slate-900">Ready to expose yourself?</h2>
          <Link 
            href="/nhie/create" 
            className="inline-block bg-slate-900 text-white font-black text-xl px-12 py-5 rounded-2xl hover:bg-slate-800 transition-all hover:scale-[1.02] active:scale-95 shadow-xl"
          >
            Start Your Quiz Now
          </Link>
        </section>

      </main>

    </div>
  );
}