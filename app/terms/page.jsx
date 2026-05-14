// ==============================
// TERMS OF SERVICE PAGE
// ==============================

import Link from "next/link";

export const metadata = {
  title: "Terms of Service | GetKnowify",
  description:
    "Read the terms and conditions for using the GetKnowify platform.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0f111a] text-slate-300 py-20 px-4 font-sans">

      <div className="max-w-3xl mx-auto bg-[#1a1c29] p-8 md:p-12 rounded-[2rem] shadow-2xl border border-white/5">

        <Link
          href="/"
          className="text-emerald-400 hover:text-emerald-300 font-bold mb-8 inline-block"
        >
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-black text-white mb-8">
          Terms of Service
        </h1>

        <p className="mb-8 text-sm text-slate-500">
          Last Updated: May 2026
        </p>

        <div className="space-y-8 leading-relaxed">

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              1. Acceptance of Terms
            </h2>

            <p>
              By accessing or using GetKnowify, you agree to follow these Terms
              of Service and comply with applicable laws and regulations. If
              you do not agree with these terms, please do not use the platform.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              2. Minimum Age Requirement
            </h2>

            <p>
              By using GetKnowify, you confirm that you are at least 13 years
              old or meet the minimum legal age requirement in your country
              to use online services and social platforms.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              3. About the Platform
            </h2>

            <p>
              GetKnowify is an entertainment and social interaction platform
              where users can create quizzes, share messages, participate in
              interactive games, and connect with friends or communities online.
            </p>

            <p className="mt-4">
              Features and functionality may change, improve, or be updated
              over time without prior notice.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              4. User Content & Conduct
            </h2>

            <p>
              Users are responsible for the content they create, post, or share
              through the platform, including quizzes, usernames, messages,
              letters, and other shared content.
            </p>

            <p className="mt-4">
              You agree not to use GetKnowify to:
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>
                Share unlawful, harmful, abusive, threatening, hateful,
                misleading, or inappropriate content.
              </li>

              <li>
                Harass, bully, impersonate, or intentionally mislead other
                users.
              </li>

              <li>
                Share sensitive personal, financial, or confidential
                information.
              </li>

              <li>
                Upload or distribute malicious software, spam, or harmful code.
              </li>

              <li>
                Attempt to interfere with the security, stability, or operation
                of the platform.
              </li>
            </ul>

            <p className="mt-4">
              We may remove content or restrict access to users who violate
              these terms or misuse the platform.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              5. Public Sharing & Links
            </h2>

            <p>
              Some quizzes, leaderboards, and shared content may be accessible
              through public or shareable links created by users.
            </p>

            <p className="mt-4">
              Users should avoid sharing private or highly sensitive
              information through publicly accessible content.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              6. Intellectual Property
            </h2>

            <p>
              The platform design, branding, logos, original content, and
              functionality provided by GetKnowify are protected by applicable
              intellectual property laws.
            </p>

            <p className="mt-4">
              Users retain ownership of the content they create but grant
              GetKnowify permission to display and process that content as
              necessary for platform functionality.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              7. Disclaimer
            </h2>

            <p>
              GetKnowify is provided on an “as available” basis for
              entertainment and social interaction purposes.
            </p>

            <p className="mt-4">
              We do not guarantee uninterrupted availability, complete
              accuracy, or error-free operation of the platform at all times.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              8. Limitation of Liability
            </h2>

            <p>
              To the maximum extent permitted by law, GetKnowify shall not be
              responsible for indirect, incidental, or consequential damages
              arising from the use of the platform or shared user-generated
              content.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              9. Updates to These Terms
            </h2>

            <p>
              These Terms of Service may be updated occasionally to reflect
              platform improvements, legal requirements, or operational
              changes.
            </p>

            <p className="mt-4">
              Continued use of the platform after updates means you accept the
              revised terms.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              10. Contact
            </h2>

            <p>
              If you have questions regarding these Terms of Service, you may
              contact us through our{" "}
              <Link
                href="/contact"
                className="text-emerald-400 underline underline-offset-4 hover:text-emerald-300 transition-colors"
              >
                Contact Us
              </Link>{" "}
              page
            </p>

            
          </section>

        </div>
      </div>
    </div>
  );
}