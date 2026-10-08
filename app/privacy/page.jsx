import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | GetKnowify",
  description:
    "Learn how GetKnowify collects, uses, and protects information when you use our quizzes, games, and social features.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen w-full bg-slate-50 px-4 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto w-full max-w-4xl">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-10 md:p-12">
          {/* BACK LINK */}
          <Link
            href="/"
            className="mb-8 inline-flex items-center text-sm font-bold text-indigo-600 transition-colors hover:text-indigo-800"
          >
            ← Back to Home
          </Link>

          {/* HEADER */}
          <div className="mb-12 border-b border-slate-100 pb-8 text-center">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Privacy Policy
            </h1>

            <p className="mt-3 text-sm font-medium text-slate-500">
              Last Updated: October 2026
            </p>
          </div>

          {/* CONTENT */}
          <div className="space-y-10 text-base leading-7 text-slate-600">
            {/* 1. INFORMATION WE COLLECT */}
            <section>
              <h2 className="mb-4 text-xl font-bold text-slate-900">
                1. Information We Collect
              </h2>

              <p>
                When you use GetKnowify, certain information may be collected
                to help our quizzes, games, sharing features, and other
                platform features work properly and to improve the user
                experience.
              </p>

              <ul className="mt-4 list-disc space-y-3 pl-6 text-slate-600">
                <li>
                  <strong className="font-bold text-slate-900">
                    Information you provide:
                  </strong>{" "}
                  This may include quiz questions, quiz answers, nicknames,
                  messages, and other content that you voluntarily submit
                  through GetKnowify.
                </li>

                <li>
                  <strong className="font-bold text-slate-900">
                    Automatically collected information:
                  </strong>{" "}
                  Browser type, device information, IP address, pages visited,
                  referral source, and usage analytics may be collected
                  automatically when you use the platform.
                </li>
              </ul>
            </section>

            {/* 2. HOW WE USE INFORMATION */}
            <section>
              <h2 className="mb-4 text-xl font-bold text-slate-900">
                2. How We Use Information
              </h2>

              <p>
                Information collected through GetKnowify may be used to:
              </p>

              <ul className="mt-4 list-disc space-y-3 pl-6 text-slate-600">
                <li>
                  Provide quizzes, games, results, leaderboards, and sharing
                  features.
                </li>

                <li>
                  Improve the functionality, usability, and performance of the
                  platform.
                </li>

                <li>
                  Maintain platform safety, security, and reliability.
                </li>

                <li>
                  Understand general engagement and traffic trends.
                </li>

                <li>
                  Detect and help prevent spam, abuse, fraud, and harmful
                  activity.
                </li>
              </ul>
            </section>

            {/* 3. ADVERTISING & THIRD-PARTY SERVICES */}
            <section>
              <h2 className="mb-4 text-xl font-bold text-slate-900">
                3. Advertising &amp; Third-Party Services
              </h2>

              <p>
                GetKnowify may use third-party services, including advertising
                providers such as Google AdSense, to display advertisements
                and support the operation of the platform.
              </p>

              <p className="mt-4">
                These third-party providers may use cookies or similar
                technologies to help display advertisements, measure
                advertising performance, or provide relevant advertising based
                on applicable settings and permissions.
              </p>

              <ul className="mt-4 list-disc space-y-3 pl-6 text-slate-600">
                <li>
                  Google may use advertising cookies to support advertising
                  personalization where applicable.
                </li>

                <li>
                  Third-party vendors, including Google, may use cookies or
                  similar technologies in connection with advertisements
                  displayed on GetKnowify.
                </li>

                <li>
                  Users may manage available advertising personalization
                  preferences through Google&apos;s{" "}
                  <a
                    href="https://myadcenter.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-indigo-600 underline underline-offset-4 hover:text-indigo-800"
                  >
                    Ads Settings
                  </a>
                  .
                </li>
              </ul>
            </section>

            {/* 4. COOKIES */}
            <section>
              <h2 className="mb-4 text-xl font-bold text-slate-900">
                4. Cookies &amp; Tracking Technologies
              </h2>

              <p>
                GetKnowify may use cookies and similar technologies to improve
                the user experience, analyze traffic, remember preferences,
                maintain functionality, and support advertising features.
              </p>

              <p className="mt-4">
                Third-party services such as Google AdSense and Google
                Analytics may also use cookies or similar technologies to
                measure engagement, understand traffic, and support
                advertising functionality.
              </p>

              <p className="mt-4">
                Users can manage or disable cookies through their browser
                settings. Disabling certain cookies may affect some features
                or functionality of the platform.
              </p>
            </section>

            {/* 5. CONTENT & SHARED LINKS */}
            <section>
              <h2 className="mb-4 text-xl font-bold text-slate-900">
                5. Content &amp; Shared Links
              </h2>

              <p>
                Some quizzes, scores, results, leaderboards, messages, and
                other content may be accessible through public or shareable
                links created by users.
              </p>

              <p className="mt-4">
                Before sharing a quiz or other content, consider who may be
                able to access the shared link. Please avoid entering or
                sharing highly sensitive personal, financial, confidential, or
                security-related information through the platform.
              </p>
            </section>

            {/* 6. USER RESPONSIBILITY */}
            <section>
              <h2 className="mb-4 text-xl font-bold text-slate-900">
                6. User Responsibility
              </h2>

              <p>
                Users are responsible for the content they create, submit, and
                share through GetKnowify.
              </p>

              <p className="mt-4">
                Harmful, abusive, hateful, illegal, misleading, or
                inappropriate content is not permitted on the platform.
              </p>
            </section>

            {/* 7. DATA MANAGEMENT */}
            <section>
              <h2 className="mb-4 text-xl font-bold text-slate-900">
                7. Data Management
              </h2>

              <p>
                Users may be able to edit or remove quizzes or other shared
                content through available platform features.
              </p>

              <p className="mt-4">
                Limited technical, operational, analytics, security,
                moderation, or legal information may be retained where
                reasonably necessary to operate, protect, or improve the
                platform.
              </p>
            </section>

            {/* 8. AGE REQUIREMENT */}
<section>
  <h2 className="mb-4 text-xl font-bold text-slate-900">
    8. Age Requirement
  </h2>

  <p>
    GetKnowify is intended for users who are 13 years of age or older.
    Users under 18 must have permission from a parent or legal guardian
    before using the platform.
  </p>

  <p className="mt-4">
    By using GetKnowify, you represent that you are at least 13 years old.
    If you are under 18, you confirm that you have permission from your
    parent or legal guardian to use the platform.
  </p>

  <p className="mt-4">
    If we become aware that a user under 13 has provided personal information
    through GetKnowify, we may take reasonable steps to remove the
    information and restrict access to the service.
  </p>

  <p className="mt-4">
    If you believe that a person under 13 has provided personal information
    through GetKnowify, please contact us through our{" "}
    <Link
      href="/contact"
      className="font-bold text-indigo-600 underline underline-offset-4 hover:text-indigo-800"
    >
      Contact Us
    </Link>{" "}
    page.
  </p>
</section>

            {/* 9. EXTERNAL LINKS */}
            <section>
              <h2 className="mb-4 text-xl font-bold text-slate-900">
                9. External Links
              </h2>

              <p>
                GetKnowify may contain links to third-party websites or
                services. These websites operate independently from GetKnowify,
                and we are not responsible for their privacy practices,
                content, security, or policies.
              </p>

              <p className="mt-4">
                We recommend reviewing the privacy policy of any third-party
                website before providing information or using its services.
              </p>
            </section>

            {/* 10. POLICY UPDATES */}
            <section>
              <h2 className="mb-4 text-xl font-bold text-slate-900">
                10. Updates to This Policy
              </h2>

              <p>
                This Privacy Policy may be updated occasionally to reflect
                changes to GetKnowify, new features, service improvements,
                legal requirements, or changes to how information is handled.
              </p>

              <p className="mt-4">
                When changes are made, the updated version will be published
                on this page with a revised &quot;Last Updated&quot; date.
              </p>

              <p className="mt-4">
                Continued use of GetKnowify after an updated policy is
                published means that you acknowledge the revised policy.
              </p>
            </section>

            {/* 11. CONTACT */}
            <section>
              <h2 className="mb-4 text-xl font-bold text-slate-900">
                11. Contact Us
              </h2>

              <p>
                If you have questions about this Privacy Policy or would like
                to contact us regarding your information, you can reach us
                through our{" "}
                <Link
                  href="/contact"
                  className="font-bold text-indigo-600 underline underline-offset-4 transition-colors hover:text-indigo-800"
                >
                  Contact Us
                </Link>{" "}
                page.
              </p>
            </section>
          </div>

          {/* BOTTOM NOTE */}
          <div className="mt-12 border-t border-slate-100 pt-8 text-center">
            <p className="text-sm leading-6 text-slate-500">
              Your privacy matters to us. The GetKnowify Team aims to keep the
              platform simple, transparent, and respectful of your information.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}