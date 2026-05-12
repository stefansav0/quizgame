import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | GetKnowify",
  description:
    "Learn how GetKnowify collects, uses, and protects information when you use our platform.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0f111a] text-slate-300 py-20 px-4 font-sans">

      <div className="max-w-3xl mx-auto bg-[#1a1c29] p-8 md:p-12 rounded-[2rem] shadow-2xl border border-white/5">

        <Link
          href="/"
          className="text-purple-400 hover:text-purple-300 font-bold mb-8 inline-block"
        >
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-black text-white mb-8">
          Privacy Policy
        </h1>

        <p className="mb-8 text-sm text-slate-500">
          Last Updated: May 2026
        </p>

        <div className="space-y-8 leading-relaxed">

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              1. Information We Collect
            </h2>

            <p>
              When you use GetKnowify, certain information may be collected to
              help the platform function properly and improve the user
              experience.
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>
                <strong>Information you provide:</strong> This may include quiz
                questions, quiz answers, nicknames, messages, or other content
                you voluntarily submit while using the platform.
              </li>

              <li>
                <strong>Automatically collected information:</strong> Basic
                technical information such as browser type, device information,
                pages visited, and general usage analytics may be collected
                automatically.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              2. How We Use Information
            </h2>

            <p>
              Information collected through GetKnowify is primarily used to:
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Provide quiz, leaderboard, and sharing features.</li>
              <li>Improve platform performance and user experience.</li>
              <li>Maintain platform safety, stability, and functionality.</li>
              <li>Understand general usage trends and engagement.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              3. Advertising & Third-Party Services
            </h2>

            <p>
              GetKnowify may use third-party services, including advertising
              providers such as Google AdSense, to display advertisements and
              support the platform.
            </p>

            <p className="mt-4">
              These third-party providers may use cookies or similar
              technologies to show ads based on previous visits to this website
              or other websites.
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>
                Google may use advertising cookies to personalize ads shown to
                users.
              </li>

              <li>
                Users can manage ad personalization preferences through Google’s{" "}
                <a
                  href="https://myadcenter.google.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 underline"
                >
                  Ads Settings
                </a>.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              4. Content & Shared Links
            </h2>

            <p>
              Some quizzes, scores, leaderboards, and shared content may be
              accessible through unique public links created by users.
            </p>

            <p className="mt-4">
              Please avoid sharing highly sensitive personal, financial, or
              confidential information through the platform.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              5. Data Management
            </h2>

            <p>
              Users may be able to edit or remove certain quizzes or shared
              content through available platform features. We may also retain
              limited technical or analytics information for operational,
              security, or legal purposes.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              6. External Links
            </h2>

            <p>
              Our platform may contain links to third-party websites or
              services. We are not responsible for the privacy practices,
              content, or policies of external websites.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              7. Updates to This Policy
            </h2>

            <p>
              This Privacy Policy may be updated occasionally to reflect
              platform changes, legal requirements, or service improvements.
              Continued use of the platform after updates means you accept the
              revised policy.
            </p>
          </section>

          {/* Section 8 */}
          <section>
  <h2 className="text-2xl font-bold text-white mb-4">
    8. Contact Us
  </h2>

  <p>
    If you have questions about this Privacy Policy or would like to
    contact us regarding your information, you can reach us through our{" "}
    <Link
      href="/contact"
      className="text-emerald-400 underline underline-offset-4 hover:text-emerald-300 transition-colors"
    >
      Contact Us
    </Link>{" "}
    page or email us at:
  </p>

  <p className="mt-4 text-emerald-400 font-medium">
    getknowify@gmail.com
  </p>
</section>

        </div>
      </div>
    </div>
  );
}