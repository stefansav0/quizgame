"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HomeClient() {
  // --- ANIMATION VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90 } },
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <main className="min-h-screen bg-slate-50 flex justify-center w-full mx-auto px-4 py-12 relative overflow-hidden font-sans text-slate-900">
      
      {/* --- CLEAN AMBIENT BACKGROUND EFFECTS --- */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-300/20 blur-[120px] rounded-full pointer-events-none z-0" aria-hidden="true" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-violet-300/20 blur-[120px] rounded-full pointer-events-none z-0" aria-hidden="true" />

      {/* --- FLOATING EMOJIS (Subtle) --- */}
      <motion.div variants={floatingVariants} animate="animate" className="fixed top-[15%] left-[10%] text-4xl opacity-20 hidden md:block select-none pointer-events-none z-0" aria-hidden="true">💖</motion.div>
      <motion.div variants={floatingVariants} animate="animate" transition={{ delay: 1 }} className="fixed top-[20%] right-[10%] text-4xl opacity-20 hidden md:block select-none pointer-events-none z-0" aria-hidden="true">✨</motion.div>
      <motion.div variants={floatingVariants} animate="animate" transition={{ delay: 2 }} className="fixed bottom-[20%] left-[15%] text-4xl opacity-20 hidden md:block select-none pointer-events-none z-0" aria-hidden="true">🤔</motion.div>
      <motion.div variants={floatingVariants} animate="animate" transition={{ delay: 1.5 }} className="fixed bottom-[25%] right-[15%] text-4xl opacity-20 hidden md:block select-none pointer-events-none z-0" aria-hidden="true">🔥</motion.div>

      {/* Main Container */}
      <div className="w-full max-w-5xl relative z-10 flex flex-col items-center">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full flex flex-col items-center"
        >
          {/* --- HERO SECTION --- */}
          <header className="text-center mb-20 max-w-3xl pt-10">
            <motion.div variants={itemVariants} className="inline-flex items-center justify-center gap-2 bg-indigo-50 border border-indigo-100 px-5 py-2 rounded-full text-sm font-bold text-indigo-600 mb-8 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span>The #1 Social Testing Platform of 2026</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black text-center mb-6 tracking-tight text-slate-900 drop-shadow-sm leading-tight">
              How Well Do You <br className="hidden md:block" /> 
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Really Know Me?</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-center text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
              Create your custom friendship quiz in seconds. Dare your best friends, crush, or partner to take the ultimate test and prove their loyalty on our live, interactive leaderboards.
            </motion.p>
          </header>

          {/* --- CTA BUTTONS --- */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-24 w-full max-w-md sm:max-w-none sm:justify-center">
            <Link href="/create" className="group relative w-full sm:w-auto" aria-label="Create a Friendship Quiz">
              <div className="absolute -inset-1 bg-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg px-8 py-4 rounded-2xl text-center shadow-xl shadow-indigo-200 transition-all flex items-center justify-center gap-3 active:scale-95">
                <span>🎯 Create Your Quiz</span>
              </div>
            </Link>

            <Link href="/letter/create" className="group relative w-full sm:w-auto" aria-label="Send a Secret Letter">
              <div className="relative bg-white border-2 border-slate-200 hover:border-indigo-200 hover:bg-indigo-50 text-slate-700 font-bold text-lg px-8 py-4 rounded-2xl text-center shadow-sm transition-all flex items-center justify-center gap-3 active:scale-95">
                <span>💌 Send a Letter</span>
              </div>
            </Link>
          </motion.div>

          {/* --- FEATURES GRID --- */}
          <section className="w-full max-w-5xl mb-24">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900">How The Best Friend Quiz Works</h2>
              <p className="text-slate-600 mt-4 max-w-2xl mx-auto text-lg">Building stronger connections doesn't have to be complicated. Our platform makes it incredibly simple to challenge your social circle in three easy steps.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: "📝", title: "1. Create Instantly", desc: "Our smart quiz maker allows you to select hand-picked questions about your personality, likes, and dislikes. Customize it to reflect your unique life." },
                { icon: "🚀", title: "2. Share Anywhere", desc: "Once generated, copy your secure, unique link. Paste it directly onto your Instagram Story, Snapchat, TikTok bio, or a private WhatsApp group." },
                { icon: "🏆", title: "3. Track Results Live", desc: "Access your private dashboard to watch scores update in real-time. Find out exactly who your real best friends are based on their accuracy." }
              ].map((feature, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-lg shadow-slate-200/50 hover:shadow-xl hover:border-indigo-200 transition-all"
                >
                  <div className="text-3xl mb-6 bg-indigo-50 text-indigo-600 w-16 h-16 flex items-center justify-center rounded-2xl">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* --- TEXT CONTENT SECTION 1: WHY IT MATTERS (AdSense Optimization) --- */}
          <motion.article variants={itemVariants} className="w-full max-w-4xl mb-12 bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-14 shadow-sm text-left">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">The Psychology of Friendship Testing</h2>
            <div className="space-y-5 text-slate-600 leading-relaxed text-lg">
              <p>
                In the digital age, we have hundreds of online followers, but how many people truly know the real you? The <strong className="text-indigo-600">GetKnowify Friendship Quiz</strong> is designed to cut through the noise of superficial social media interactions and test the genuine bonds you share with your peers.
              </p>
              <p>
                Psychologists suggest that playful interactions, such as interactive quizzes, shared dares, and trivia games, significantly boost interpersonal relationships. By asking questions about your favorite foods, your biggest pet peeves, or your fondest memories, you are engaging in a form of active digital bonding. It is a fun, low-pressure way to see who pays attention when you speak.
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Perfect for Every Relationship:</h3>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong className="text-slate-800">Best Friends (BFFs):</strong> Settle the debate once and for all. Who holds the crown as your ultimate bestie?</li>
                <li><strong className="text-slate-800">Couples & Partners:</strong> Use it as an icebreaker or a fun date-night activity to test relationship compatibility and shared memories.</li>
                <li><strong className="text-slate-800">School & Coworkers:</strong> A lighthearted way to build camaraderie and learn interesting facts about the people you interact with daily.</li>
              </ul>
            </div>
          </motion.article>

          {/* --- TEXT CONTENT SECTION 2: TIPS GUIDE (Massive AdSense Boost) --- */}
          <motion.article variants={itemVariants} className="w-full max-w-4xl mb-24 bg-indigo-50 border border-indigo-100 rounded-[2.5rem] p-8 md:p-14 shadow-sm text-left">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">How to Make Your Quiz Go Viral</h2>
            <div className="space-y-5 text-slate-700 leading-relaxed text-lg">
              <p>
                Want to get maximum engagement from your followers? Creating a quiz is only half the battle; knowing how to structure it guarantees that your friends will actually take the time to complete it. Here are three expert tips for crafting the perfect social quiz:
              </p>
              <ul className="space-y-4 mt-6">
                <li className="flex flex-col">
                  <strong className="text-indigo-700 text-xl">1. Mix the Obvious with the Obscure</strong>
                  <span className="text-slate-600">Don't make every question impossible! Start with easy questions (like your favorite color) to build confidence, then hit them with a difficult question (like your childhood phobia) to test the real friends.</span>
                </li>
                <li className="flex flex-col">
                  <strong className="text-indigo-700 text-xl">2. Keep it Under 15 Questions</strong>
                  <span className="text-slate-600">Attention spans on social media are incredibly short. Data shows that quizzes with 10 to 15 questions have the highest completion rates. Anything longer, and users will abandon the page.</span>
                </li>
                <li className="flex flex-col">
                  <strong className="text-indigo-700 text-xl">3. Use a "Call Out" on your Story</strong>
                  <span className="text-slate-600">When posting your link to Instagram or Snapchat, add a caption like, <em>"I bet none of you will get 100% on this."</em> Friendly competition is the number one driver of link clicks!</span>
                </li>
              </ul>
            </div>
          </motion.article>

          {/* --- EXPANDED FAQ SECTION --- */}
          <section className="w-full max-w-4xl mb-24">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900">Frequently Asked Questions</h2>
              <p className="text-slate-600 mt-4 text-lg">Everything you need to know about our platform.</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Is the quiz completely free?</h3>
                <p className="text-slate-600 leading-relaxed">Yes! Generating a quiz, sharing it on your social platforms, and accessing your real-time leaderboard is 100% free. We believe fun social tools should be accessible to everyone without hidden fees.</p>
              </div>
              
              <div className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Can I create my own questions?</h3>
                <p className="text-slate-600 leading-relaxed">Absolutely. While we provide a bank of highly engaging, viral questions, you have the full creative freedom to type out your own custom questions and answers to make the test harder.</p>
              </div>

              <div className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Are my answers and data private?</h3>
                <p className="text-slate-600 leading-relaxed">Your privacy is our top priority. Your leaderboard is securely hidden behind your personal dashboard link. We do not sell your personal quiz data to third-party data brokers.</p>
              </div>

              <div className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-slate-900 mb-3">How many people can take my test?</h3>
                <p className="text-slate-600 leading-relaxed">There is no limit! Whether you have 10 close friends in a group chat or 100,000 followers on Instagram, our robust servers are built to handle massive viral traffic instantly.</p>
              </div>
            </motion.div>
          </section>

          {/* --- VIRAL BOTTOM BANNER --- */}
          <motion.div variants={itemVariants} className="w-full max-w-4xl relative group mb-10">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-[3rem] blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-slate-900 rounded-[2.5rem] p-10 md:p-14 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden">
              
              {/* Background accent inside the dark banner */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]"></div>

              <div className="text-center md:text-left relative z-10">
                <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">
                  Ready to test your friendships? 👀
                </h2>
                <p className="text-indigo-200 font-medium text-lg max-w-md">
                  Stop guessing. Start testing. Build your online quiz today and let the games begin.
                </p>
              </div>
              <Link 
                href="/create"
                className="relative z-10 bg-indigo-500 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-indigo-400 transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] whitespace-nowrap active:scale-95"
              >
                Start Now 🚀
              </Link>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </main>
  );
}