import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy | Convertixy",
  description:
    "Read the Convertixy Privacy Policy to learn how we handle cookies, analytics, advertising, user data, and website privacy practices.",
  slug: "/privacy",
  keywords: [
    "convertixy privacy policy",
    "website privacy policy",
    "cookie policy",
    "google adsense privacy",
    "user privacy",
    "online tools privacy",
    "website data policy",
    "privacy protection",
  ],
  focusKeyword: "Convertixy Privacy Policy",
});

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-gradient-to-br from-indigo-50 via-sky-50 to-purple-50 py-14 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-16 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Privacy Policy
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg">
            This Privacy Policy explains how Convertixy may collect, use, and
            protect information when users access our website and online tools.
          </p>

          <p className="mt-3 text-sm text-gray-500">
            Effective Date: April 24, 2026
          </p>
        </header>

        {/* Main Content */}
        <div className="space-y-12 rounded-3xl border border-gray-200 bg-white/90 p-6 text-gray-800 shadow-xl backdrop-blur sm:p-10 md:p-12">
          {/* Overview */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              Overview
            </h2>

            <p className="leading-relaxed text-gray-700">
              Convertixy provides online tools and utilities for file
              processing, image conversion, text formatting, calculators, and
              productivity-related tasks. This Privacy Policy explains how
              information may be handled while using the platform.
            </p>
          </section>

          {/* Information Collection */}
          <section className="rounded-2xl bg-sky-50 p-6 sm:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-sky-700">
              Information We May Collect
            </h2>

            <div className="space-y-5 text-gray-700">
              <p>
                Some tools may process files, text, or images directly within
                the browser depending on the tool functionality and user input.
              </p>

              <p>
                We may also collect limited technical information such as:
              </p>

              <ul className="list-inside list-disc space-y-2">
                <li>Browser type and device information</li>
                <li>Pages visited on the website</li>
                <li>General analytics and usage statistics</li>
                <li>Approximate location based on IP information</li>
                <li>Performance and error-related data</li>
              </ul>

              <p>
                If users contact us directly, we may receive the information
                provided in the message, including email address and support
                details.
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section className="rounded-2xl bg-emerald-50 p-6 sm:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-700">
              Cookies & Advertising
            </h2>

            <div className="space-y-5 text-gray-700">
              <p>
                Convertixy may use cookies and similar technologies to improve
                website functionality, analyze traffic, remember preferences,
                and improve overall user experience.
              </p>

              <p>
                We may display advertisements through third-party advertising
                partners such as Google AdSense. Advertising providers may use
                cookies to display relevant ads and measure advertising
                performance.
              </p>

              <p>
                Users can manage or disable cookies through their browser
                settings if preferred.
              </p>

              <p>
                Learn more about Google advertising policies at{" "}
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="font-medium text-emerald-700 transition hover:underline"
                >
                  Google Advertising Policies
                </a>
                .
              </p>
            </div>
          </section>

          {/* Data Usage */}
          <section className="rounded-2xl bg-purple-50 p-6 sm:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-purple-700">
              How Information May Be Used
            </h2>

            <ul className="list-inside list-disc space-y-3 text-gray-700">
              <li>To operate and improve website functionality</li>

              <li>To monitor performance and maintain stability</li>

              <li>To improve user experience and tool usability</li>

              <li>To analyze website traffic and visitor interactions</li>

              <li>To respond to user feedback or support requests</li>

              <li>To improve security and prevent misuse</li>
            </ul>
          </section>

          {/* Security */}
          <section className="rounded-2xl bg-amber-50 p-6 sm:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-amber-700">
              Data Security
            </h2>

            <p className="leading-relaxed text-gray-700">
              We take reasonable measures to help protect website systems and
              user information. However, no internet-based service can guarantee
              complete security. Users should avoid submitting highly sensitive
              personal or confidential information through online tools whenever
              possible.
            </p>
          </section>

          {/* Third Party */}
          <section className="rounded-2xl bg-rose-50 p-6 sm:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-rose-700">
              Third-Party Services
            </h2>

            <p className="leading-relaxed text-gray-700">
              Convertixy may use third-party services for analytics, hosting,
              advertising, performance monitoring, and related website
              functionality. These services may process information according to
              their own privacy policies and terms.
            </p>
          </section>

          {/* User Rights */}
          <section className="rounded-2xl bg-cyan-50 p-6 sm:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-cyan-700">
              User Choices
            </h2>

            <ul className="list-inside list-disc space-y-3 text-gray-700">
              <li>Users can disable cookies through browser settings.</li>

              <li>
                Users may avoid entering personal information into online tools.
              </li>

              <li>
                Users may contact us regarding questions related to privacy or
                data handling.
              </li>
            </ul>
          </section>

          {/* Children */}
          <section className="rounded-2xl bg-orange-50 p-6 sm:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-orange-700">
              Children's Privacy
            </h2>

            <p className="leading-relaxed text-gray-700">
              Convertixy is intended for a general audience and is not directed
              specifically toward children under the age of 13. We do not
              knowingly collect personal information from children.
            </p>
          </section>

          {/* Updates */}
          <section className="rounded-2xl bg-lime-50 p-6 sm:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-lime-700">
              Policy Updates
            </h2>

            <p className="leading-relaxed text-gray-700">
              This Privacy Policy may be updated periodically to reflect
              platform improvements, legal requirements, advertising updates, or
              operational changes. The latest version will always remain
              available on this page.
            </p>
          </section>

          {/* Contact */}
          <section className="rounded-2xl bg-gray-50 p-6 sm:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              Contact Information
            </h2>

            <p className="leading-relaxed text-gray-700">
              For questions related to this Privacy Policy or website privacy
              practices, please contact us at{" "}
              <a
                href="mailto:contact@convertixy.com"
                className="font-medium text-indigo-600 transition hover:text-indigo-700 hover:underline"
              >
                contact@convertixy.com
              </a>
              .
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-sm leading-relaxed text-gray-500">
            By using Convertixy, users acknowledge the privacy practices
            described in this policy.
          </p>
        </div>
      </div>
    </section>
  );
}