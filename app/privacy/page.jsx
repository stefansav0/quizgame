import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Bestiefy",
  description: "How we collect and use your data on Bestiefy.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0f111a] text-slate-300 py-20 px-4 font-sans">
      <div className="max-w-3xl mx-auto bg-[#1a1c29] p-8 md:p-12 rounded-[2rem] shadow-2xl border border-white/5">
        <Link href="/" className="text-purple-400 hover:text-purple-300 font-bold mb-8 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl font-black text-white mb-8">Privacy Policy</h1>
        <p className="mb-8 text-sm text-slate-500">Last Updated: March 2026</p>

        <div className="space-y-8 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
            <p>When you use Bestiefy, we collect certain information to make the app function:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Information you provide:</strong> Names, quiz questions, quiz answers, and letter contents that you voluntarily enter into our forms.</li>
              <li><strong>Automatically collected information:</strong> We may collect non-personally identifiable information such as your browser type, device type, and basic usage data.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect primarily to provide and maintain our service (e.g., displaying your name on a leaderboard or generating your custom quiz links). We do not sell your personal data to third parties.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Third-Party Services & Advertising (Google AdSense)</h2>
            <p>We use third-party advertising companies, including Google, to serve ads when you visit our website. These companies may use cookies to serve ads based on your prior visits to our website or other websites.</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>
              <li>Users may opt-out of personalized advertising by visiting Google's <a href="https://myadcenter.google.com/" target="_blank" rel="noreferrer" className="text-emerald-400 underline">Ads Settings</a>.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Data Storage</h2>
            <p>Your quizzes, scores, and letters are stored in our secure database. Because this is an entertainment app meant for sharing, quizzes and leaderboards are publicly accessible via their specific URLs. Please do not share highly sensitive or private information on our platform.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy or wish to have your data removed, please contact us at [Insert Your Email Here].</p>
          </section>
        </div>
      </div>
    </div>
  );
}