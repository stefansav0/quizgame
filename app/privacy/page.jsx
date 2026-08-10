// ==============================
// PRIVACY POLICY PAGE
// ==============================

import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | GetKnowify",
  description:
    "Learn how GetKnowify collects, uses, and protects information when you use our platform.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen w-full bg-white px-4 py-8 sm:px-6 sm:py-14">
      <div className="mx-auto w-full max-w-3xl">

        {/* MAIN CARD */}
        <div
          className="
            rounded-2xl
            bg-[#f8f7ff]
            px-6
            py-8
            shadow-[0_6px_0_rgba(0,0,0,0.06)]
            sm:px-10
            sm:py-10
          "
        >

          {/* BACK LINK */}
          <Link
            href="/"
            className="
              mb-7
              inline-flex
              items-center
              text-sm
              font-semibold
              text-emerald-600
              transition-colors
              hover:text-emerald-700
            "
          >
            ← Back to Home
          </Link>

          {/* HEADER */}
          <div className="mb-10 text-center">

            

            <h1
              className="
                text-2xl
                font-medium
                uppercase
                tracking-wide
                text-[#c47b8c]
                sm:text-3xl
              "
            >
              Privacy Policy
            </h1>

            <p className="mt-3 text-sm text-gray-500">
              Last Updated: May 2026
            </p>

          </div>

          {/* CONTENT */}
          <div className="space-y-8 text-[15px] leading-7 text-gray-700 sm:text-base sm:leading-8">

            {/* Section 1 */}
            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
                1. Information We Collect
              </h2>

              <p>
                When you use GetKnowify, certain information may be collected
                to help the platform function properly and improve the user
                experience.
              </p>

              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-gray-900">
                    Information you provide:
                  </strong>{" "}
                  This may include quiz questions, quiz answers, nicknames,
                  messages, or other content voluntarily submitted by users.
                </li>

                <li>
                  <strong className="text-gray-900">
                    Automatically collected information:
                  </strong>{" "}
                  Browser type, device information, IP address, pages visited,
                  referral source, and usage analytics may be collected
                  automatically.
                </li>
              </ul>
            </section>


            {/* Section 2 */}
            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
                2. How We Use Information
              </h2>

              <p>
                Information collected through GetKnowify may be used to:
              </p>

              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  Provide quizzes, leaderboards, and sharing features.
                </li>
                <li>
                  Improve user experience and platform performance.
                </li>
                <li>
                  Maintain platform safety and security.
                </li>
                <li>
                  Understand engagement and traffic trends.
                </li>
                <li>
                  Prevent spam, abuse, and harmful activity.
                </li>
              </ul>
            </section>


            {/* Section 3 */}
            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
                3. Advertising & Third-Party Services
              </h2>

              <p>
                GetKnowify may use third-party services, including advertising
                providers such as Google AdSense, to display advertisements
                and support the platform.
              </p>

              <p className="mt-4">
                These third-party providers may use cookies or similar
                technologies to show ads based on previous visits to this
                website or other websites.
              </p>

              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  Google may use advertising cookies to personalize ads shown
                  to users.
                </li>

                <li>
                  Third-party vendors, including Google, may use cookies to
                  serve ads based on users’ previous visits to this website or
                  other websites.
                </li>

                <li>
                  Users can manage ad personalization preferences through
                  Google’s{" "}
                  <a
                    href="https://myadcenter.google.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="
                      font-semibold
                      text-emerald-600
                      underline
                      underline-offset-4
                      hover:text-emerald-700
                    "
                  >
                    Ads Settings
                  </a>
                  .
                </li>
              </ul>
            </section>


            {/* Section 4 */}
            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
                4. Cookies & Tracking Technologies
              </h2>

              <p>
                GetKnowify may use cookies and similar technologies to improve
                user experience, analyze traffic, remember preferences, and
                support advertising features.
              </p>

              <p className="mt-4">
                Third-party services such as Google AdSense and Google
                Analytics may also use cookies to personalize advertisements
                and measure engagement.
              </p>

              <p className="mt-4">
                Users can manage or disable cookies through their browser
                settings.
              </p>
            </section>


            {/* Section 5 */}
            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
                5. Content & Shared Links
              </h2>

              <p>
                Some quizzes, scores, leaderboards, and shared content may be
                accessible through public or shareable links created by users.
              </p>

              <p className="mt-4">
                Please avoid sharing highly sensitive personal, financial, or
                confidential information through the platform.
              </p>
            </section>


            {/* Section 6 */}
            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
                6. User Responsibility
              </h2>

              <p>
                Users are responsible for the content they create and share
                on GetKnowify.
              </p>

              <p className="mt-4">
                Harmful, abusive, hateful, illegal, misleading, or
                adult-oriented content is not permitted on the platform.
              </p>
            </section>


            {/* Section 7 */}
            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
                7. Data Management
              </h2>

              <p>
                Users may be able to edit or remove quizzes or shared content
                through available platform features.
              </p>

              <p className="mt-4">
                Limited technical or analytics information may be retained
                for operational, security, moderation, or legal purposes.
              </p>
            </section>


            {/* Section 8 */}
            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
                8. Children's Privacy
              </h2>

              <p>
                GetKnowify is not intended for children under 13 years of age.
              </p>

              <p className="mt-4">
                We do not knowingly collect personal information from children
                under 13.
              </p>
            </section>


            {/* Section 9 */}
            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
                9. External Links
              </h2>

              <p>
                Our platform may contain links to third-party websites or
                services. We are not responsible for the privacy practices,
                content, or policies of external websites.
              </p>
            </section>


            {/* Section 10 */}
            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
                10. Updates to This Policy
              </h2>

              <p>
                This Privacy Policy may be updated occasionally to reflect
                platform changes, legal requirements, or service improvements.
              </p>

              <p className="mt-4">
                Continued use of the platform after updates means you accept
                the revised policy.
              </p>
            </section>


            {/* Section 11 */}
            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
                11. Contact Us
              </h2>

              <p>
                If you have questions about this Privacy Policy or would like
                to contact us regarding your information, you can reach us
                through our{" "}
                <Link
                  href="/contact"
                  className="
                    font-semibold
                    text-emerald-600
                    underline
                    underline-offset-4
                    transition-colors
                    hover:text-emerald-700
                  "
                >
                  Contact Us
                </Link>{" "}
                page.
              </p>
            </section>

          </div>

          {/* BOTTOM NOTE */}
          <div className="mt-10 border-t border-gray-200 pt-6 text-center">
            <p className="text-xs leading-5 text-gray-500 sm:text-sm">
              Your privacy matters to us. We aim to keep GetKnowify simple,
              transparent, and respectful of your information.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}