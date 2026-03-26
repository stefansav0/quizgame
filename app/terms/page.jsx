import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Bestiefy",
  description: "Terms and conditions for using getknowify.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0f111a] text-slate-300 py-20 px-4 font-sans">
      <div className="max-w-3xl mx-auto bg-[#1a1c29] p-8 md:p-12 rounded-[2rem] shadow-2xl border border-white/5">
        <Link href="/" className="text-emerald-400 hover:text-emerald-300 font-bold mb-8 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl font-black text-white mb-8">Terms of Service</h1>
        <p className="mb-8 text-sm text-slate-500">Last Updated: March 2026</p>

        <div className="space-y-8 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using getknowify ("we", "our", "the App"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
            <p>getknowify provides an entertainment platform where users can create customized quizzes and send digital letters to friends and family. The service is provided "as is" and is intended for entertainment purposes only.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. User Conduct and Content</h2>
            <p>You are solely responsible for the content (quizzes, names, and letters) you create and share using our platform. You agree NOT to use the App to:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Create or share content that is unlawful, harmful, threatening, abusive, harassing, defamatory, or invasive of another's privacy.</li>
              <li>Impersonate any person or entity.</li>
              <li>Share sensitive personal information (like addresses, phone numbers, or financial info) in your quizzes or letters.</li>
            </ul>
            <p className="mt-4">We reserve the right (but not the obligation) to remove any content or ban any user that violates these terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Intellectual Property</h2>
            <p>The app's original content, features, and functionality are owned by getknowify and are protected by international copyright, trademark, and other intellectual property laws.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Disclaimer of Warranties</h2>
            <p>Your use of the service is at your sole risk. The service is provided on an "AS IS" and "AS AVAILABLE" basis. We do not warrant that the service will be uninterrupted, timely, secure, or error-free.</p>
          </section>
        </div>
      </div>
    </div>
  );
}