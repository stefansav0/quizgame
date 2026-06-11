"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import LatestBlogs from "@/components/LatestBlogs";

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
  <motion.div
    variants={itemVariants}
    className="inline-flex items-center justify-center gap-2 bg-indigo-50 border border-indigo-100 px-5 py-2 rounded-full text-sm font-bold text-indigo-600 mb-8 shadow-sm"
  >
    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />

    <span>Fun Friendship Quizzes & Social Games</span>
  </motion.div>

  <motion.h1
    variants={itemVariants}
    className="text-5xl md:text-7xl font-black text-center mb-6 tracking-tight text-slate-900 drop-shadow-sm leading-tight"
  >
    How Well Do You <br className="hidden md:block" />
    <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
      Really Know Me?
    </span>
  </motion.h1>

  <motion.p
    variants={itemVariants}
    className="text-center text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium"
  >
    Create your own friendship quiz in seconds and share it with friends, classmates, or your partner. Compare scores, have fun conversations, and see who knows you best.
  </motion.p>
</header>

          {/* --- CTA BUTTONS --- */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-24 w-full max-w-md sm:max-w-none sm:justify-center">
            <Link href="/create" className="group relative w-full sm:w-auto" aria-label="Create a Friendship Quiz">
              <div className="absolute -inset-1 bg-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg px-8 py-4 rounded-2xl text-center shadow-xl shadow-indigo-200 transition-all flex items-center justify-center gap-3 active:scale-95">
                <span>Create Your Quiz</span>
              </div>
            </Link>

            <Link
  href="/nhie"
  className="group relative w-full sm:w-auto"
  aria-label="Create a Never Have I Ever Game"
>
  <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-70 transition duration-500"></div>

  <div className="relative bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 hover:brightness-110 text-slate-900 font-black text-lg px-8 py-4 rounded-2xl shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 group-hover:-translate-y-1">
    Create Never Have I Ever
  </div>
</Link>

            <Link href="/letter/create" className="group relative w-full sm:w-auto" aria-label="Send a Secret Letter">
              <div className="relative bg-white border-2 border-slate-200 hover:border-indigo-200 hover:bg-indigo-50 text-slate-700 font-bold text-lg px-8 py-4 rounded-2xl text-center shadow-sm transition-all flex items-center justify-center gap-3 active:scale-95">
                <span>Send a Letter</span>
              </div>
            </Link>
          </motion.div>

          <motion.article
  variants={itemVariants}
  className="w-full max-w-4xl mb-20 bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-14 shadow-sm"
>
  <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
    What Is GetKnowify?
  </h2>

  <div className="space-y-5 text-slate-600 leading-relaxed text-lg">
    <p>
      GetKnowify is a free online friendship quiz platform that helps people
      create personalized quizzes and discover how well their friends,
      classmates, family members, and partners know them.
    </p>

    <p>
      Users can create custom quiz questions, share a unique quiz link, and
      compare scores in real time. Whether you want a best friend quiz,
      relationship challenge, or social media game, GetKnowify makes it simple
      and fun.
    </p>

    <p>
      Our mission is to help people create meaningful conversations and stronger
      relationships through interactive quizzes and social games.
    </p>
  </div>
</motion.article>

<LatestBlogs />

          {/* --- FEATURES GRID --- */}
          <section className="w-full max-w-5xl mb-24">
            <motion.div
  variants={itemVariants}
  className="text-center mb-12"
>
  <h2 className="text-3xl md:text-4xl font-black text-slate-900">
    How the Best Friend Quiz Works
  </h2>

  <p className="text-slate-600 mt-4 max-w-2xl mx-auto text-lg">
    Creating and sharing your friendship quiz is quick and easy. Answer a few fun questions, share your quiz link with friends, and see who knows you best.
  </p>
</motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {[
    { title: "1. Create Instantly", desc: "Our smart quiz maker allows you to select hand-picked questions about your personality, likes, and dislikes. Customize it to reflect your unique life." },
    { title: "2. Share Anywhere", desc: "Once generated, copy your secure, unique link. Paste it directly onto your Instagram Story, Snapchat, TikTok bio, or a private WhatsApp group." },
    { title: "3. Track Results Live", desc: "Access your private dashboard to watch scores update in real-time. Find out exactly who your real best friends are based on their accuracy." }
  ].map((feature, idx) => (
    <motion.div 
      key={idx}
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-lg shadow-slate-200/50 hover:shadow-xl hover:border-indigo-200 transition-all"
    >
      {/* Removed icon div here */}
      {/* <div className="text-3xl mb-6 bg-indigo-50 text-indigo-600 w-16 h-16 flex items-center justify-center rounded-2xl">
        {feature.icon}
      </div> */}
      <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
      <p className="text-slate-600 leading-relaxed font-medium">
        {feature.desc}
      </p>
    </motion.div>
  ))}
</div>


          </section>

         {/* --- TEXT CONTENT SECTION 1: WHY IT MATTERS --- */}
<motion.article
  variants={itemVariants}
  className="w-full max-w-4xl mb-12 bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-14 shadow-sm text-left"
>
  <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
    Why Friendship Quizzes Feel So Engaging
  </h2>

  <div className="space-y-5 text-slate-600 leading-relaxed text-lg">
    <p>
      In today’s digital world, many of us interact with hundreds of people online every week, but meaningful connections still matter the most. The{" "}
      <strong className="text-indigo-600">
        GetKnowify Friendship Quiz
      </strong>{" "}
      gives friends a fun and interactive way to learn more about each other beyond everyday social media conversations.
    </p>

    <p>
      Interactive games and quizzes naturally encourage conversation, shared memories, and lighthearted competition. Questions about favorite foods, funny habits, childhood memories, or personal preferences help people reconnect in a relaxed and entertaining way.
    </p>

    <p>
      Whether you are testing your best friend, playing with classmates, or sharing a quiz with your partner, these small interactions often create memorable moments and stronger connections.
    </p>

    <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">
      Great for Every Type of Relationship
    </h3>

    <ul className="list-disc pl-6 space-y-3">
      <li>
        <strong className="text-slate-800">
          Best Friends:
        </strong>{" "}
        Find out who really remembers the little details about your personality and interests.
      </li>

      <li>
        <strong className="text-slate-800">
          Couples & Partners:
        </strong>{" "}
        Use quizzes as a fun conversation starter or casual date-night activity.
      </li>

      <li>
        <strong className="text-slate-800">
          School Friends & Coworkers:
        </strong>{" "}
        A simple way to break the ice, share laughs, and learn interesting facts about each other.
      </li>
    </ul>
  </div>
</motion.article>

{/* --- TEXT CONTENT SECTION 2: QUIZ TIPS GUIDE --- */}
<motion.article
  variants={itemVariants}
  className="w-full max-w-4xl mb-24 bg-indigo-50 border border-indigo-100 rounded-[2.5rem] p-8 md:p-14 shadow-sm text-left"
>
  <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
    Tips for Creating a Fun Friendship Quiz
  </h2>

  <div className="space-y-5 text-slate-700 leading-relaxed text-lg">
    <p>
      Creating a great quiz is not about making questions impossible. The best quizzes feel personal, entertaining, and easy to complete. Here are a few simple tips to make your friendship quiz more engaging:
    </p>

    <ul className="space-y-4 mt-6">
      <li className="flex flex-col">
        <strong className="text-indigo-700 text-xl">
          1. Mix Easy and Difficult Questions
        </strong>

        <span className="text-slate-600">
          Start with a few simple questions to make the quiz feel fun and approachable, then include a couple of unique or unexpected questions that only close friends would know.
        </span>
      </li>

      <li className="flex flex-col">
        <strong className="text-indigo-700 text-xl">
          2. Keep the Quiz Short and Fun
        </strong>

        <span className="text-slate-600">
          Shorter quizzes are usually more enjoyable to complete. Around 10 to 15 questions is often the perfect balance between fun and engaging.
        </span>
      </li>

      <li className="flex flex-col">
        <strong className="text-indigo-700 text-xl">
          3. Share it Creatively
        </strong>

        <span className="text-slate-600">
          Posting your quiz on Instagram, Snapchat, or WhatsApp with a playful caption can encourage more friends to participate and compare scores.
        </span>
      </li>
    </ul>
  </div>
</motion.article>


<motion.article
  variants={itemVariants}
  className="w-full max-w-4xl mb-24 bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-14 shadow-sm"
>
  <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8">
    Popular Friendship Quiz Questions
  </h2>

  <div className="grid md:grid-cols-2 gap-6 text-slate-700">
    <ul className="space-y-3">
      <li> What is my favorite food?</li>
      <li> What is my favorite movie?</li>
      <li> What is my dream vacation?</li>
      <li> What is my biggest fear?</li>
      <li> What is my favorite hobby?</li>
    </ul>

    <ul className="space-y-3">
      <li> What is my favorite music genre?</li>
      <li> What is my dream job?</li>
      <li> What is my favorite color?</li>
      <li> Which city do I want to visit?</li>
      <li> Who is my favorite celebrity?</li>
    </ul>
  </div>
</motion.article>


          {/* --- EXPANDED FAQ SECTION --- */}
          <section className="w-full max-w-4xl mb-24">
  <motion.div variants={itemVariants} className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-black text-slate-900">
      Frequently Asked Questions
    </h2>

    <p className="text-slate-600 mt-4 text-lg">
      Answers to some common questions about the platform.
    </p>
  </motion.div>

  <motion.div
    variants={itemVariants}
    className="grid grid-cols-1 md:grid-cols-2 gap-6"
  >
    <div className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-xl font-bold text-slate-900 mb-3">
        Is the quiz free to use?
      </h3>

      <p className="text-slate-600 leading-relaxed">
        Yes. You can create quizzes, share them with friends, and view scores without paying any fees.
      </p>
    </div>

    <div className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-xl font-bold text-slate-900 mb-3">
        Can I create custom questions?
      </h3>

      <p className="text-slate-600 leading-relaxed">
        Yes. You can write your own questions and answers to personalize your friendship quiz and make it more unique.
      </p>
    </div>

    <div className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-xl font-bold text-slate-900 mb-3">
        Are my quiz results private?
      </h3>

      <p className="text-slate-600 leading-relaxed">
        Your quiz and leaderboard are only accessible through your shared quiz link or dashboard. For more details, please review our privacy policy.
      </p>
    </div>

    <div className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-xl font-bold text-slate-900 mb-3">
        How many people can join my quiz?
      </h3>

      <p className="text-slate-600 leading-relaxed">
        You can share your quiz with as many friends, classmates, or followers as you want.
      </p>
    </div>
  </motion.div>
</section>

          {/* --- VIRAL BOTTOM BANNER --- */}
          <motion.div
  variants={itemVariants}
  className="w-full max-w-4xl relative group mb-10"
>
  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-[3rem] blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

  <div className="relative bg-slate-900 rounded-[2.5rem] p-10 md:p-14 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden">

    {/* Background accent inside the dark banner */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]"></div>

    <div className="text-center md:text-left relative z-10">
      <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">
        Ready to create your friendship quiz? 👀
      </h2>

      <p className="text-indigo-200 font-medium text-lg max-w-md">
        Create a fun personalized quiz, share it with friends, and see who knows you best.
      </p>
    </div>

    <Link
      href="/create"
      className="relative z-10 bg-indigo-500 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-indigo-400 transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] whitespace-nowrap active:scale-95"
    >
      Create Quiz 
    </Link>
  </div>
</motion.div>

        </motion.div>
      </div>
    </main>
  );
}