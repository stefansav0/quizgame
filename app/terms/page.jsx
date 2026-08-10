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

            <div className="mb-4 text-6xl sm:text-7xl">
              📄
            </div>

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
              Terms of Service
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
                1. Acceptance of Terms
              </h2>

              <p>
                By accessing or using GetKnowify, you agree to follow these
                Terms of Service and comply with applicable laws and
                regulations. If you do not agree with these terms, please do
                not use the platform.
              </p>
            </section>


            {/* Section 2 */}
            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
                2. Minimum Age Requirement
              </h2>

              <p>
                By using GetKnowify, you confirm that you are at least 13
                years old or meet the minimum legal age requirement in your
                country to use online services and social platforms.
              </p>
            </section>


            {/* Section 3 */}
            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
                3. About the Platform
              </h2>

              <p>
                GetKnowify is an entertainment and social interaction platform
                where users can create quizzes, share messages, participate in
                interactive games, and connect with friends or communities
                online.
              </p>

              <p className="mt-4">
                Features and functionality may change, improve, or be updated
                over time without prior notice.
              </p>
            </section>


            {/* Section 4 */}
            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
                4. User Content & Conduct
              </h2>

              <p>
                Users are responsible for the content they create, post, or
                share through the platform, including quizzes, usernames,
                messages, letters, and other shared content.
              </p>

              <p className="mt-4">
                You agree not to use GetKnowify to:
              </p>

              <ul className="mt-3 list-disc space-y-2 pl-6">
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
                  Upload or distribute malicious software, spam, or harmful
                  code.
                </li>

                <li>
                  Attempt to interfere with the security, stability, or
                  operation of the platform.
                </li>
              </ul>

              <p className="mt-4">
                We may remove content or restrict access to users who violate
                these terms or misuse the platform.
              </p>
            </section>


            {/* Section 5 */}
            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
                5. Public Sharing & Links
              </h2>

              <p>
                Some quizzes, leaderboards, and shared content may be
                accessible through public or shareable links created by users.
              </p>

              <p className="mt-4">
                Users should avoid sharing private or highly sensitive
                information through publicly accessible content.
              </p>
            </section>


            {/* Section 6 */}
            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
                6. Intellectual Property
              </h2>

              <p>
                The platform design, branding, logos, original content, and
                functionality provided by GetKnowify are protected by
                applicable intellectual property laws.
              </p>

              <p className="mt-4">
                Users retain ownership of the content they create but grant
                GetKnowify permission to display and process that content as
                necessary for platform functionality.
              </p>
            </section>


            {/* Section 7 */}
            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
                7. Disclaimer
              </h2>

              <p>
                GetKnowify is provided on an “as available” basis for
                entertainment and social interaction purposes.
              </p>

              <p className="mt-4">
                We do not guarantee uninterrupted availability, complete
                accuracy, or error-free operation of the platform at all
                times.
              </p>
            </section>


            {/* Section 8 */}
            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
                8. Limitation of Liability
              </h2>

              <p>
                To the maximum extent permitted by law, GetKnowify shall not
                be responsible for indirect, incidental, or consequential
                damages arising from the use of the platform or shared
                user-generated content.
              </p>
            </section>


            {/* Section 9 */}
            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
                9. Updates to These Terms
              </h2>

              <p>
                These Terms of Service may be updated occasionally to reflect
                platform improvements, legal requirements, or operational
                changes.
              </p>

              <p className="mt-4">
                Continued use of the platform after updates means you accept
                the revised terms.
              </p>
            </section>


            {/* Section 10 */}
            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
                10. Contact
              </h2>

              <p>
                If you have questions regarding these Terms of Service, you
                may contact us through our{" "}
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

          {/* BOTTOM */}
          <div className="mt-10 border-t border-gray-200 pt-6 text-center">
            <p className="text-xs leading-5 text-gray-500 sm:text-sm">
              By using GetKnowify, you acknowledge that you have read and
              understood these Terms of Service.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}