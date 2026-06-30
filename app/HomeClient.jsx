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

{/* ================= WHY FRIENDSHIP QUIZZES ================= */}

<motion.article
  variants={itemVariants}
  className="w-full max-w-5xl mb-24 bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-14 shadow-sm"
>
  <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 text-center">
    Why Friendship Quizzes Are More Popular Than Ever
  </h2>

  <div className="space-y-6 text-lg leading-8 text-slate-600">

    <p>
      Friendship has always been one of the most important parts of life.
      Whether you met someone at school, college, work, or online, strong
      friendships are built through conversations, shared experiences, and
      memorable moments. Today, people communicate through social media,
      messaging apps, and video calls more than ever before, making interactive
      online activities a fun way to stay connected.
    </p>

    <p>
      A friendship quiz is more than just a game. It allows friends to discover
      how well they truly know one another through personalized questions about
      hobbies, favorite foods, childhood memories, dreams, personality traits,
      and everyday preferences. The experience often leads to laughter,
      surprising discoveries, and meaningful conversations that strengthen
      relationships.
    </p>

    <p>
      At GetKnowify, we believe quizzes should feel personal rather than random.
      Instead of answering generic questions, you create a quiz based on your
      own life and interests. Friends then try to answer correctly, and their
      scores reveal who knows you the best. Every quiz becomes unique because it
      reflects your own personality.
    </p>

    <p>
      These quizzes have become especially popular on platforms like WhatsApp,
      Instagram Stories, Snapchat, Facebook, and other social networks because
      they are simple to share and fun to play. Many users enjoy comparing
      scores, challenging classmates, testing family members, or simply seeing
      who remembers the little details that make friendships special.
    </p>

  </div>
</motion.article>

{/* ================= BENEFITS ================= */}

<section className="w-full max-w-6xl mb-24">

  <motion.div
    variants={itemVariants}
    className="text-center mb-12"
  >
    <h2 className="text-3xl md:text-5xl font-black text-slate-900">
      Why People Love Friendship Quizzes
    </h2>

    <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
      Friendship quizzes are entertaining, interactive, and designed to create
      memorable conversations. Here are some of the biggest reasons people enjoy
      sharing them.
    </p>
  </motion.div>

  <div className="grid md:grid-cols-2 gap-8">

    {[
      {
        title: "Build Stronger Friendships",
        desc:
          "Answering personal questions helps friends learn new things about each other and often starts conversations that would never happen otherwise.",
      },
      {
        title: "Create Fun Challenges",
        desc:
          "Everyone enjoys friendly competition. Comparing scores makes quizzes exciting without feeling too serious.",
      },
      {
        title: "Perfect for Social Media",
        desc:
          "Share your quiz link on Instagram, WhatsApp, Snapchat, Facebook, or any messaging app in just a few seconds.",
      },
      {
        title: "Learn Surprising Facts",
        desc:
          "Even your closest friends may not know your favorite movie, dream destination, or funniest childhood memory.",
      },
      {
        title: "Great Conversation Starter",
        desc:
          "Friendship quizzes naturally encourage discussions and help break the ice with classmates, coworkers, and new friends.",
      },
      {
        title: "Fun for Every Age",
        desc:
          "Students, families, couples, and long-distance friends can all enjoy creating and sharing personalized quizzes together.",
      },
    ].map((item, index) => (
      <motion.div
        key={index}
        variants={itemVariants}
        whileHover={{ y: -5 }}
        className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:border-indigo-300 hover:shadow-lg transition-all"
      >
        <h3 className="text-2xl font-bold text-slate-900 mb-4">
          {item.title}
        </h3>

        <p className="text-slate-600 leading-7">
          {item.desc}
        </p>
      </motion.div>
    ))}

  </div>

</section>

{/* ================= WHO CAN PLAY ================= */}

<motion.article
  variants={itemVariants}
  className="w-full max-w-5xl mb-24 bg-indigo-50 border border-indigo-100 rounded-[2.5rem] p-8 md:p-14 shadow-sm"
>

  <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8">
    Who Can Use GetKnowify?
  </h2>

  <div className="space-y-6 text-lg leading-8 text-slate-700">

    <p>
      GetKnowify is designed for anyone who enjoys interactive games and wants
      to create meaningful moments with friends, family, classmates, or
      colleagues. Since every quiz is personalized, no two quizzes are exactly
      the same.
    </p>

    <p>
      Students often use friendship quizzes during school or college events to
      discover who knows each other best. Couples enjoy creating quizzes for
      date nights and relationship challenges, while families use them during
      birthdays, holidays, and reunions to create fun memories together.
    </p>

    <p>
      Online creators and influencers also enjoy sharing quizzes with their
      followers because they increase engagement while allowing audiences to
      learn more about them. Whether your community is large or small, quizzes
      create natural interaction that feels enjoyable instead of promotional.
    </p>

    <p>
      No matter where your friends live, sharing a quiz link takes only a few
      seconds. People can participate from anywhere using a phone, tablet, or
      desktop browser, making GetKnowify an easy activity for both local and
      long-distance friendships.
    </p>

  </div>

</motion.article>

{/* ================= WHY CHOOSE GETKNOWIFY ================= */}

<section className="w-full max-w-6xl mb-24">

  <motion.div
    variants={itemVariants}
    className="text-center mb-12"
  >
    <h2 className="text-3xl md:text-5xl font-black text-slate-900">
      Why Choose GetKnowify?
    </h2>

    <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
      We built GetKnowify to make creating friendship quizzes simple, enjoyable,
      and accessible for everyone. Whether you want to challenge your best
      friend, entertain your classmates, or create a fun activity for family
      members, our platform makes it easy.
    </p>
  </motion.div>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

    {[
      {
        title: "100% Free",
        desc: "Create and share friendship quizzes without paying any subscription fees."
      },
      {
        title: "Works Everywhere",
        desc: "Use GetKnowify on desktop, tablet, or mobile without downloading an app."
      },
      {
        title: "Easy Sharing",
        desc: "Share your quiz link instantly through WhatsApp, Instagram, Snapchat, Facebook, or email."
      },
      {
        title: "Custom Questions",
        desc: "Personalize every quiz with questions that reflect your own personality and experiences."
      },
      {
        title: "Quick Setup",
        desc: "Create a quiz within minutes and start collecting responses immediately."
      },
      {
        title: "Fun Experience",
        desc: "Turn ordinary conversations into exciting challenges that everyone enjoys."
      },
      {
        title: "Regular Updates",
        desc: "We continuously improve the platform with new features, quizzes, and blog content."
      },
      {
        title: "Designed for Everyone",
        desc: "Perfect for students, friends, couples, families, coworkers, and online communities."
      }
    ].map((item, index) => (

      <motion.div
        key={index}
        variants={itemVariants}
        whileHover={{ y: -5 }}
        className="bg-white border border-slate-200 rounded-3xl p-7 hover:border-indigo-300 hover:shadow-xl transition-all"
      >
        <h3 className="text-xl font-bold text-slate-900 mb-3">
          {item.title}
        </h3>

        <p className="text-slate-600 leading-7">
          {item.desc}
        </p>
      </motion.div>

    ))}

  </div>

</section>

{/* ================= POPULAR OCCASIONS ================= */}

<motion.article
  variants={itemVariants}
  className="w-full max-w-5xl mb-24 bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-14 shadow-sm"
>

<h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8">
Popular Ways People Use Friendship Quizzes
</h2>

<div className="space-y-6 text-lg leading-8 text-slate-600">

<p>
Friendship quizzes are suitable for many different occasions. Some people
create them simply for fun, while others use them to celebrate birthdays,
strengthen friendships, or make online conversations more interactive.
Because every quiz is unique, it can easily match your own personality and
the people you share it with.
</p>

<p>
Students often share quizzes during school events, college festivals,
farewell parties, and classroom activities. They create light-hearted
competition while helping classmates learn more about one another in a
relaxed and enjoyable way.
</p>

<p>
Couples also enjoy personalized quizzes as part of date nights or
relationship challenges. Asking questions about favorite memories, hobbies,
future goals, or daily habits creates meaningful conversations and helps
partners understand each other better.
</p>

<p>
Families can use quizzes during birthdays, reunions, holidays, or weekend
gatherings. Children, parents, siblings, and relatives often enjoy friendly
competitions that create laughter and lasting memories.
</p>

<p>
Even remote teams and online communities use quizzes as icebreakers during
virtual meetings or community events. They provide a simple way to encourage
participation and make conversations feel more personal.
</p>

</div>

</motion.article>

{/* ================= ONLINE FRIENDSHIP ================= */}

<motion.article
variants={itemVariants}
className="w-full max-w-5xl mb-24 bg-indigo-50 border border-indigo-100 rounded-[2.5rem] p-8 md:p-14 shadow-sm"
>

<h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8">
Friendship in the Digital Age
</h2>

<div className="space-y-6 text-lg leading-8 text-slate-700">

<p>
Technology has changed the way people build and maintain friendships.
Messaging apps, social media platforms, and online communities allow people
to stay connected regardless of distance. While digital communication makes
it easier to keep in touch, interactive experiences often make those
connections feel more meaningful.
</p>

<p>
Friendship quizzes encourage people to pause, think, and learn more about
one another. Instead of sending ordinary text messages, friends answer
questions, compare scores, and discover surprising facts that often become
the beginning of longer conversations.
</p>

<p>
Many people enjoy sharing quizzes through WhatsApp groups, Instagram
Stories, Snapchat, Facebook, Discord communities, and other online
platforms. Because quizzes are interactive, they naturally encourage more
engagement than ordinary social posts.
</p>

<p>
At GetKnowify, our goal is to make those interactions enjoyable, simple,
and accessible. Every quiz is designed to help people create memorable
experiences while celebrating the friendships that matter most.
</p>

</div>

</motion.article>

{/* ================= PRIVACY ================= */}

<motion.article
variants={itemVariants}
className="w-full max-w-5xl mb-24 bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-14 shadow-sm"
>

<h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8">
Your Privacy Matters
</h2>

<div className="space-y-6 text-lg leading-8 text-slate-600">

<p>
We believe online games should be enjoyable while respecting user privacy.
When creating friendship quizzes, users should avoid including sensitive
personal information such as passwords, financial details, identification
numbers, or other confidential data.
</p>

<p>
The best quizzes focus on fun topics like favorite foods, hobbies,
childhood memories, dream destinations, movies, music, sports, and
personality traits. These questions create entertaining conversations
without requiring private information.
</p>

<p>
We encourage users to share quiz links responsibly and only with the people
they want to invite. Creating a positive, respectful, and enjoyable
environment helps everyone have a better experience.
</p>

</div>

</motion.article>

{/* ================= TRUST SECTION ================= */}

<section className="w-full max-w-6xl mb-24">

  <motion.div
    variants={itemVariants}
    className="text-center mb-12"
  >
    <h2 className="text-3xl md:text-5xl font-black text-slate-900">
      Why Thousands of People Enjoy GetKnowify
    </h2>

    <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
      A great friendship quiz should be simple to create, enjoyable to play,
      and easy to share. We designed GetKnowify around those principles so
      anyone can create meaningful experiences in just a few minutes.
    </p>
  </motion.div>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

    {[
      {
        title: "Simple Experience",
        desc: "Create quizzes quickly without complicated steps or technical knowledge."
      },
      {
        title: "Mobile Friendly",
        desc: "Enjoy a smooth experience on phones, tablets, laptops, and desktop computers."
      },
      {
        title: "Share Anywhere",
        desc: "Copy your quiz link and share it through WhatsApp, Instagram, Snapchat, Facebook, or email."
      },
      {
        title: "Interactive Fun",
        desc: "Turn everyday conversations into memorable challenges that encourage participation."
      },
      {
        title: "Fresh Content",
        desc: "We regularly publish new blog articles, friendship ideas, quiz inspiration, and helpful tips."
      },
      {
        title: "Always Improving",
        desc: "Our platform continues to evolve with new features designed to create better user experiences."
      }
    ].map((item, index) => (

      <motion.div
        key={index}
        variants={itemVariants}
        whileHover={{ y: -5 }}
        className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all"
      >
        <h3 className="text-2xl font-bold text-slate-900 mb-4">
          {item.title}
        </h3>

        <p className="text-slate-600 leading-7">
          {item.desc}
        </p>

      </motion.div>

    ))}

  </div>

</section>

{/* ================= QUIZ IDEAS ================= */}

<motion.article
  variants={itemVariants}
  className="w-full max-w-5xl mb-24 bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-14 shadow-sm"
>

<h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8">
Friendship Quiz Ideas You'll Love
</h2>

<div className="space-y-6 text-lg leading-8 text-slate-600">

<p>
One of the best things about personalized quizzes is that there are endless
ways to make them unique. Instead of asking generic questions, think about
the experiences that define your friendships. Favorite memories, travel
stories, hobbies, school moments, funny incidents, and shared adventures all
make excellent quiz topics.
</p>

<p>
Many people create quizzes around birthdays, vacations, favorite movies,
music, sports, gaming, books, pets, or future goals. Questions about dreams,
bucket lists, or childhood memories often lead to interesting conversations
that continue long after the quiz has finished.
</p>

<p>
If you're creating a quiz for your best friend, include a combination of easy
questions and a few surprising ones. This keeps the challenge entertaining
without becoming frustrating. A balanced quiz encourages more people to
finish and compare scores.
</p>

<p>
Remember that the best quizzes are personal, respectful, and enjoyable.
Instead of trying to trick people, focus on creating questions that celebrate
your friendship and create positive memories together.
</p>

</div>

</motion.article>

{/* ================= CONTENT PROMISE ================= */}

<motion.article
  variants={itemVariants}
  className="w-full max-w-5xl mb-24 bg-indigo-50 border border-indigo-100 rounded-[2.5rem] p-8 md:p-14 shadow-sm"
>

<h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8">
Our Commitment to Helpful Content
</h2>

<div className="space-y-6 text-lg leading-8 text-slate-700">

<p>
At GetKnowify, our goal is not only to provide fun quizzes but also to
publish useful articles that help people build stronger friendships,
discover creative conversation starters, and enjoy meaningful social
activities.
</p>

<p>
Our blog is regularly updated with new ideas, friendship games, quiz
inspiration, online trends, and practical tips that anyone can use.
Whether you're looking for icebreakers, relationship activities, or fun
questions to ask your best friend, we aim to create content that is helpful,
easy to understand, and enjoyable to read.
</p>

<p>
We continuously review and improve our content so it remains relevant,
accurate, and useful. As new trends emerge and users share feedback, we
update our articles to provide a better experience for everyone visiting our
website.
</p>

</div>

</motion.article>

{/* ================= QUICK FACTS ================= */}

<section className="w-full max-w-6xl mb-24">

<motion.div
variants={itemVariants}
className="text-center mb-12"
>

<h2 className="text-3xl md:text-5xl font-black text-slate-900">
Quick Facts About Friendship Quizzes
</h2>

</motion.div>

<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

{[
{
title:"Easy to Create",
desc:"Most personalized quizzes can be created within just a few minutes."
},
{
title:"Great Icebreaker",
desc:"Perfect for starting conversations during school, college, or online events."
},
{
title:"Share Instantly",
desc:"Quiz links can easily be shared through popular messaging and social apps."
},
{
title:"Fun for Everyone",
desc:"Suitable for friends, couples, classmates, families, and communities."
}
].map((item,index)=>(

<div
key={index}
className="bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-sm hover:shadow-lg transition-all"
>

<h3 className="text-xl font-bold text-slate-900 mb-3">
{item.title}
</h3>

<p className="text-slate-600 leading-7">
{item.desc}
</p>

</div>

))}

</div>

</section>

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
  className="w-full max-w-4xl mb-24 bg-slate-100 border border-slate-200 rounded-[2.5rem] p-8 md:p-14 shadow-sm"
>
  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-8">
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
    <div className="bg-gradient-to-br from-indigo-50 via-white to-violet-50 border border-indigo-100 rounded-[2.5rem] shadow-sm p-8 hover:shadow-md transition-shadow">
      <h3 className="text-xl font-bold text-slate-900 mb-3">
        Is the quiz free to use?
      </h3>

      <p className="text-slate-600 leading-relaxed">
        Yes. You can create quizzes, share them with friends, and view scores without paying any fees.
      </p>
    </div>

    <div className="bg-slate-100 border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
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