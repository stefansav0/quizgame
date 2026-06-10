"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header with Navigation */}
      <header className="fixed top-0 w-full bg-white border-b border-slate-200 shadow-sm z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          
          {/* Call to action button in header */}
          <Link
            href="/nhie/create"
            className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-600 transition"
          >
            Start Now
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-10">
        {/* Hero Banner Section */}
        <section className="max-w-4xl mx-auto px-4 text-center mb-16 mt-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            The Ultimate Online Party Game for Friends and Family
          </h1>
          <p className="text-slate-600 mb-6">
            Looking for a fun way to connect with friends, whether near or far? Our platform allows you to host a virtual version of the classic "Never Have I Ever" game, where everyone can answer spicy, funny, or revealing questions privately. Share your unique game link with friends via chat apps like WhatsApp, Instagram, or Discord, and watch the fun unfold as they try to guess your secrets!
          </p>
          <Link
            href="/nhie/create"
            className="inline-block bg-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition"
          >
            Create Your Game Today
          </Link>
        </section>

        {/* How It Works Section */}
        <section className="max-w-4xl mx-auto px-4 mb-16">
          <h2 className="text-3xl font-semibold text-center mb-8">How Does It Work?</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
              <div className="text-4xl mb-4">🤫</div>
              <h3 className="text-xl font-semibold mb-2">Confess</h3>
              <p className="text-slate-600 text-sm">
                Start by answering a series of fun, spicy, or embarrassing questions privately on your device. These questions can range from light-hearted jokes to revealing secrets, depending on your mood and comfort level. Your answers are kept confidential and only visible to you, ensuring complete privacy.
              </p>
              <p className="mt-2 text-slate-600 text-sm">
                No need to worry about judgment or embarrassment; you can be honest and playful without any pressure.
              </p>
            </div>
            {/* Step 2 */}
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">Share</h3>
              <p className="text-slate-600 text-sm">
                Once you've completed your answers, the platform generates a custom, secure link that you can share with your friends or group chat. This link allows your friends to participate anonymously and view their guesses. You can send it via WhatsApp, Instagram, Snapchat, or any chat platform you prefer.
              </p>
              <p className="mt-2 text-slate-600 text-sm">
                The link is unique and private, so only your friends will see it, making the game safe and confidential.
              </p>
            </div>
            {/* Step 3 */}
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold mb-2">Guess & Track</h3>
              <p className="text-slate-600 text-sm">
                As your friends submit their guesses, you can watch a live dashboard to see their responses in real-time. The platform tracks who guessed correctly, who knows you best, and displays live results in an engaging way.
              </p>
              <p className="mt-2 text-slate-600 text-sm">
                This creates a fun, competitive atmosphere and helps everyone learn more about each other, sparking laughter and interesting conversations.
              </p>
            </div>
          </div>
        </section>

        {/* Detailed Explanation / Benefits Section */}
        <section className="max-w-4xl mx-auto px-4 mb-16 prose prose-lg">
          <h2 className="text-2xl font-semibold mb-4">What is "Never Have I Ever" and Why Play It?</h2>
          <p>
            "Never Have I Ever" is a well-known party game that has been around for decades. It involves players sharing secrets or experiences, often revealing unexpected or hilarious truths. Traditionally played in person, it usually involves players taking turns making statements, and others responding by drinking, putting fingers down, or confessing. The game has become a staple at social gatherings for its simplicity and ability to generate laughs.
          </p>
          <p>
            Our platform adapts this classic game into the digital age, allowing you to enjoy it virtually with friends, family, or colleagues. Whether you're celebrating a birthday, hosting a casual get-together, or just looking for a way to spice up your chat, our online version makes it easy and fun to play from anywhere.
          </p>
          <h3 className="text-xl font-semibold mb-2 mt-6">Why Choose the Digital Version?</h3>
          <ul className="list-disc list-inside mb-4">
            <li><strong>Privacy First:</strong> Your answers stay confidential, and the game ensures anonymity for honest and open participation.</li>
            <li><strong>Connect Remotely:</strong> Play with friends across different cities or countries without hassle. No need to gather in person!</li>
            <li><strong>Instant Results:</strong> Our platform calculates and displays who knows you best, creating an engaging and competitive experience.</li>
            <li><strong>Easy Sharing:</strong> Sending your game link is quick and secure, making it simple to start a game anytime.</li>
            <li><strong>Customizable Questions:</strong> You can select categories or allow random questions to keep the game fresh and exciting.</li>
          </ul>
          <h3 className="text-xl font-semibold mb-2 mt-6">Categories to Expose Your Friends’ Secrets</h3>
          <p>
            When setting up your game, you'll have access to a diverse bank of questions categorized to keep the game interesting:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li><strong>Social & Messaging:</strong> Questions about social media habits, ghosting, or online stalking.</li>
            <li><strong>Dating & Romance:</strong> First dates, crushes, relationships, and awkward moments.</li>
            <li><strong>Habits & Bizarre Truths:</strong> Bizarre food choices, secret habits, or embarrassing stories.</li>
            <li><strong>Work & School:</strong> Faking sick, embarrassing moments at work or school, or cheating stories.</li>
          </ul>
        </section>

        {/* Call to Action */}
        <section className="max-w-4xl mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl font-semibold mb-4">Are You Ready to Reveal Your Secrets?</h2>
          <p className="mb-4 text-slate-600">
            Whether you're hosting a virtual party or just having fun with friends, our platform makes it easy to set up and start playing in minutes. Gather your friends, create your game, and enjoy hours of laughter and surprises.
          </p>
          <Link
            href="/nhie/create"
            className="inline-block bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition"
          >
            Start Your Game Now
          </Link>
        </section>
      </main>
    </div>
  );
}