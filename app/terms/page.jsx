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
    <main className="min-h-screen w-full bg-white px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto w-full max-w-4xl">

        {/* MAIN CARD */}
        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-6
            py-8
            shadow-sm
            sm:px-10
            sm:py-10
            md:px-12
            md:py-12
          "
        >

          {/* BACK LINK */}
          <Link
            href="/"
            className="
              mb-8
              inline-flex
              items-center
              text-sm
              font-semibold
              text-indigo-600
              transition-colors
              hover:text-indigo-800
            "
          >
            ← Back to Home
          </Link>


          {/* HEADER */}
          <div
            className="
              mb-12
              border-b
              border-slate-200
              pb-8
              text-center
            "
          >
            <h1
              className="
                text-3xl
                font-black
                tracking-tight
                text-slate-900
                sm:text-4xl
              "
            >
              Terms of Service
            </h1>

            <p className="mt-3 text-sm font-medium text-slate-500">
              Last Updated: October 2026
            </p>
          </div>


          {/* CONTENT */}
          <div
            className="
              space-y-10
              text-[15px]
              leading-7
              text-slate-700
              sm:text-base
              sm:leading-8
            "
          >

            {/* Section 1 */}
            <section>
              <h2 className="mb-4 text-xl font-bold text-slate-900 sm:text-2xl">
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
              <h2 className="mb-4 text-xl font-bold text-slate-900 sm:text-2xl">
                2. Eligibility
              </h2>

              <p>
                You must be at least 13 years of age to use the Service. By
                using the Service, you represent and warrant that you are at
                least 13 years old.
              </p>

              <p className="mt-4">
                If you are under 18, you must have permission from a parent or
                legal guardian to use the Service. By using the Service, you
                represent that you have obtained the required permission from
                your parent or legal guardian.
              </p>

              <p className="mt-4">
                If you are under 13 years of age, you may not use GetKnowify.
              </p>
            </section>


            {/* Section 3 */}
            <section>
              <h2 className="mb-4 text-xl font-bold text-slate-900 sm:text-2xl">
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
              <h2 className="mb-4 text-xl font-bold text-slate-900 sm:text-2xl">
                4. User Content &amp; Conduct
              </h2>

              <p>
                Users are responsible for the content they create, post, or
                share through the platform, including quizzes, usernames,
                messages, letters, and other shared content.
              </p>

              <p className="mt-4">
                You agree not to use GetKnowify to:
              </p>

              <ul className="mt-4 list-disc space-y-3 pl-6">
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
              <h2 className="mb-4 text-xl font-bold text-slate-900 sm:text-2xl">
                5. Public Sharing &amp; Links
              </h2>

              <p>
                Some quizzes, leaderboards, and shared content may be
                accessible through public or shareable links created by users.
              </p>

              <p className="mt-4">
                Users should avoid sharing private or highly sensitive
                information through publicly accessible content.
              </p>

              <p className="mt-4">
                Users are responsible for deciding what information they
                include in content that they choose to share publicly or with
                other people.
              </p>
            </section>


            {/* Section 6 */}
            <section>
              <h2 className="mb-4 text-xl font-bold text-slate-900 sm:text-2xl">
                6. Intellectual Property
              </h2>

              <p>
                The platform design, branding, logos, original content, and
                functionality provided by GetKnowify are protected by
                applicable intellectual property laws.
              </p>

              <p className="mt-4">
                Users retain ownership of the content they create but grant
                GetKnowify permission to display, store, process, and transmit
                that content as necessary to provide and operate the platform
                and its features.
              </p>
            </section>


            {/* Section 7 */}
            <section>
              <h2 className="mb-4 text-xl font-bold text-slate-900 sm:text-2xl">
                7. Disclaimer
              </h2>

              <p>
                GetKnowify is provided on an &ldquo;as available&rdquo; basis
                for entertainment and social interaction purposes.
              </p>

              <p className="mt-4">
                We do not guarantee uninterrupted availability, complete
                accuracy, or error-free operation of the platform at all
                times.
              </p>
            </section>


            {/* Section 8 */}
            <section>
              <h2 className="mb-4 text-xl font-bold text-slate-900 sm:text-2xl">
                8. Limitation of Liability
              </h2>

              <p>
                To the maximum extent permitted by applicable law, GetKnowify
                shall not be responsible for indirect, incidental, special, or
                consequential damages arising from the use of the platform or
                shared user-generated content.
              </p>
            </section>


            {/* Section 9 */}
            <section>
              <h2 className="mb-4 text-xl font-bold text-slate-900 sm:text-2xl">
                9. Suspension or Termination
              </h2>

              <p>
                We may suspend, restrict, or terminate access to GetKnowify if
                we reasonably believe that a user has violated these Terms of
                Service, misused the platform, created a security risk, or
                engaged in unlawful or harmful activity.
              </p>

              <p className="mt-4">
                We may also restrict access to content or features when
                reasonably necessary to protect users, the platform, or the
                operation of the Service.
              </p>
            </section>


            {/* Section 10 */}
            <section>
              <h2 className="mb-4 text-xl font-bold text-slate-900 sm:text-2xl">
                10. Updates to These Terms
              </h2>

              <p>
                These Terms of Service may be updated occasionally to reflect
                platform improvements, legal requirements, or operational
                changes.
              </p>

              <p className="mt-4">
                When updates are made, the revised version will be published
                on this page with an updated &ldquo;Last Updated&rdquo; date.
              </p>

              <p className="mt-4">
                Continued use of the platform after updated terms are
                published means that you acknowledge and accept the revised
                terms, to the extent permitted by applicable law.
              </p>
            </section>


            {/* Section 11 */}
            <section>
              <h2 className="mb-4 text-xl font-bold text-slate-900 sm:text-2xl">
                11. Contact
              </h2>

              <p>
                If you have questions regarding these Terms of Service, you
                may contact us through our{" "}
                <Link
                  href="/contact"
                  className="
                    font-semibold
                    text-indigo-600
                    underline
                    underline-offset-4
                    transition-colors
                    hover:text-indigo-800
                  "
                >
                  Contact Us
                </Link>{" "}
                page.
              </p>
            </section>

          </div>


          {/* BOTTOM NOTE */}
          <div className="mt-12 border-t border-slate-200 pt-8 text-center">
            <p className="text-sm leading-6 text-slate-500">
              By using GetKnowify, you acknowledge that you have read and
              understood these Terms of Service.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}