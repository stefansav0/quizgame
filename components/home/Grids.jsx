"use client";

import { motion } from "framer-motion";
import { itemVariants } from "@/lib/animations";

export function BenefitsGrid() {
  const items = [
    { title: "Build Stronger Friendships", desc: "Answering personal questions helps friends learn new things about each other and often starts conversations that would never happen otherwise." },
    { title: "Create Fun Challenges", desc: "Everyone enjoys friendly competition. Comparing scores makes quizzes exciting without feeling too serious." },
    { title: "Perfect for Social Media", desc: "Share your quiz link on Instagram, WhatsApp, Snapchat, Facebook, or any messaging app in just a few seconds." },
    { title: "Learn Surprising Facts", desc: "Even your closest friends may not know your favorite movie, dream destination, or funniest childhood memory." },
    { title: "Great Conversation Starter", desc: "Friendship quizzes naturally encourage discussions and help break the ice with classmates, coworkers, and new friends." },
    { title: "Fun for Every Age", desc: "Students, families, couples, and long-distance friends can all enjoy creating and sharing personalized quizzes together." },
  ];

  return (
    <section className="w-full max-w-6xl mb-24">
      <motion.div variants={itemVariants} className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900">Why People Love Friendship Quizzes</h2>
        <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">Friendship quizzes are entertaining, interactive, and designed to create memorable conversations. Here are some of the biggest reasons people enjoy sharing them.</p>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-8">
        {items.map((item, index) => (
          <motion.div key={index} variants={itemVariants} whileHover={{ y: -5 }} className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:border-indigo-300 hover:shadow-lg transition-all">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
            <p className="text-slate-600 leading-7">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function WhyChooseGrid() {
  const items = [
    { title: "100% Free", desc: "Create and share friendship quizzes without paying any subscription fees." },
    { title: "Works Everywhere", desc: "Use GetKnowify on desktop, tablet, or mobile without downloading an app." },
    { title: "Easy Sharing", desc: "Share your quiz link instantly through WhatsApp, Instagram, Snapchat, Facebook, or email." },
    { title: "Custom Questions", desc: "Personalize every quiz with questions that reflect your own personality and experiences." },
    { title: "Quick Setup", desc: "Create a quiz within minutes and start collecting responses immediately." },
    { title: "Fun Experience", desc: "Turn ordinary conversations into exciting challenges that everyone enjoys." },
    { title: "Regular Updates", desc: "We continuously improve the platform with new features, quizzes, and blog content." },
    { title: "Designed for Everyone", desc: "Perfect for students, friends, couples, families, coworkers, and online communities." }
  ];

  return (
    <section className="w-full max-w-6xl mb-24">
      <motion.div variants={itemVariants} className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900">Why Choose GetKnowify?</h2>
        <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">We built GetKnowify to make creating friendship quizzes simple, enjoyable, and accessible for everyone. Whether you want to challenge your best friend, entertain your classmates, or create a fun activity for family members, our platform makes it easy.</p>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <motion.div key={index} variants={itemVariants} whileHover={{ y: -5 }} className="bg-white border border-slate-200 rounded-3xl p-7 hover:border-indigo-300 hover:shadow-xl transition-all">
            <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
            <p className="text-slate-600 leading-7">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function TrustGrid() {
  const items = [
    { title: "Simple Experience", desc: "Create quizzes quickly without complicated steps or technical knowledge." },
    { title: "Mobile Friendly", desc: "Enjoy a smooth experience on phones, tablets, laptops, and desktop computers." },
    { title: "Share Anywhere", desc: "Copy your quiz link and share it through WhatsApp, Instagram, Snapchat, Facebook, or email." },
    { title: "Interactive Fun", desc: "Turn everyday conversations into memorable challenges that encourage participation." },
    { title: "Fresh Content", desc: "We regularly publish new blog articles, friendship ideas, quiz inspiration, and helpful tips." },
    { title: "Always Improving", desc: "Our platform continues to evolve with new features designed to create better user experiences." }
  ];

  return (
    <section className="w-full max-w-6xl mb-24">
      <motion.div variants={itemVariants} className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900">Why Thousands of People Enjoy GetKnowify</h2>
        <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">A great friendship quiz should be simple to create, enjoyable to play, and easy to share. We designed GetKnowify around those principles so anyone can create meaningful experiences in just a few minutes.</p>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <motion.div key={index} variants={itemVariants} whileHover={{ y: -5 }} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
            <p className="text-slate-600 leading-7">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function QuickFactsGrid() {
  const items = [
    { title: "Easy to Create", desc: "Most personalized quizzes can be created within just a few minutes." },
    { title: "Great Icebreaker", desc: "Perfect for starting conversations during school, college, or online events." },
    { title: "Share Instantly", desc: "Quiz links can easily be shared through popular messaging and social apps." },
    { title: "Fun for Everyone", desc: "Suitable for friends, couples, classmates, families, and communities." }
  ];

  return (
    <section className="w-full max-w-6xl mb-24">
      <motion.div variants={itemVariants} className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900">Quick Facts About Friendship Quizzes</h2>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <div key={index} className="bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-sm hover:shadow-lg transition-all">
            <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
            <p className="text-slate-600 leading-7">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HowItWorksGrid() {
  const items = [
    { title: "1. Create Instantly", desc: "Our smart quiz maker allows you to select hand-picked questions about your personality, likes, and dislikes. Customize it to reflect your unique life." },
    { title: "2. Share Anywhere", desc: "Once generated, copy your secure, unique link. Paste it directly onto your Instagram Story, Snapchat, TikTok bio, or a private WhatsApp group." },
    { title: "3. Track Results Live", desc: "Access your private dashboard to watch scores update in real-time. Find out exactly who your real best friends are based on their accuracy." }
  ];

  return (
    <section className="w-full max-w-5xl mb-24">
      <motion.div variants={itemVariants} className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900">How the Best Friend Quiz Works</h2>
        <p className="text-slate-600 mt-4 max-w-2xl mx-auto text-lg">Creating and sharing your friendship quiz is quick and easy. Answer a few fun questions, share your quiz link with friends, and see who knows you best.</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((feature, idx) => (
          <motion.div key={idx} variants={itemVariants} whileHover={{ y: -5 }} className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-lg shadow-slate-200/50 hover:shadow-xl hover:border-indigo-200 transition-all">
            <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
            <p className="text-slate-600 leading-relaxed font-medium">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}