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
            This Privacy Policy explains what information Convertixy and its
            service providers process, why it is used, and the choices available
            to visitors.
          </p>

          <p className="mt-3 text-sm text-gray-500">
            Effective Date: August 16, 2026
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
              productivity-related tasks. Some tools work entirely on your
              device, while features that require an online service send the
              submitted input to our servers or a service provider so the
              requested result can be produced.
            </p>

            <p className="mt-4 leading-relaxed text-gray-700">
              Convertixy is operated by the Convertixy editorial and product team.
              For privacy questions, policy requests, or data-related enquiries,
              contact <a href="mailto:contact@convertixy.com" className="font-medium text-indigo-700 hover:underline">contact@convertixy.com</a>.
            </p>
          </section>

          {/* Information Collection */}
          <section className="rounded-2xl bg-sky-50 p-6 sm:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-sky-700">
              Information We May Collect
            </h2>

            <div className="space-y-5 text-gray-700">
              <p>
                Many PDF, image, text, and calculator tools process the selected
                input directly in your browser. For those tools, the input is not
                intentionally uploaded to Convertixy servers.
              </p>

              <p>
                AI-assisted, account, subscription, contact, and other
                server-dependent features may transmit the information you
                submit. Do not submit confidential, regulated, or highly
                sensitive information unless the tool clearly supports that use.
              </p>

              <p>We and our service providers may process:</p>

              <ul className="list-inside list-disc space-y-2">
                <li>Browser, device, operating system, and language information</li>
                <li>IP address, approximate location, pages visited, and referral source</li>
                <li>Usage, performance, diagnostic, and error information</li>
                <li>Account details needed for login and subscription access</li>
                <li>Payment status and transaction references from payment providers</li>
                <li>Messages, email address, and details provided through support forms</li>
              </ul>

              <p>
                Payment card or banking details are handled by the payment
                provider and are not intentionally stored by Convertixy.
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
                Convertixy uses cookies and similar technologies for essential
                functionality, account access, analytics, preferences,
                advertising, fraud prevention, and performance measurement.
              </p>

              <p>
                Third-party vendors, including Google, use cookies to serve ads
                based on a visitor&apos;s prior visits to Convertixy or other
                websites. Google&apos;s use of advertising cookies enables Google
                and its partners to serve personalized ads based on visits to
                this site and other sites on the internet.
              </p>

              <p>
                Third parties may place or read cookies in a visitor&apos;s browser,
                or use web beacons, IP addresses, and similar identifiers as a
                result of ad serving and measurement on this website.
              </p>

              <p>
                You can opt out of personalized advertising through{" "}
                <a
                  href="https://adssettings.google.com/"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="font-medium text-emerald-700 transition hover:underline"
                >
                  Google Ads Settings
                </a>
                . You may also review industry opt-out choices at{" "}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="font-medium text-emerald-700 transition hover:underline"
                >
                  AboutAds
                </a>
                . Browser settings can be used to block or delete cookies, but
                doing so may affect site functionality.
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

              <li>To provide account, subscription, and payment-related access</li>

              <li>To display and measure advertising where permitted</li>
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
              possible. Information is retained only for as long as reasonably
              needed for the purpose described, legal obligations, dispute
              resolution, security, and fraud prevention.
            </p>
          </section>

          {/* Third Party */}
          <section className="rounded-2xl bg-rose-50 p-6 sm:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-rose-700">
              Third-Party Services
            </h2>

            <div className="space-y-4 leading-relaxed text-gray-700">
              <p>
                Convertixy uses third-party services for hosting, authentication,
                databases, analytics, advertising, payments, image delivery,
                email or support workflows, security, and AI-assisted features.
                These providers process information under their own terms and
                privacy policies.
              </p>

              <p>
                Google Analytics helps us understand site usage. Google AdSense
                may serve and measure advertising after approval. Learn how
                Google uses information from partner sites at{" "}
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="font-medium text-rose-700 transition hover:underline"
                >
                  How Google uses data when you use partners&apos; sites or apps
                </a>
                .
              </p>
            </div>
          </section>

          {/* User Rights */}
          <section className="rounded-2xl bg-cyan-50 p-6 sm:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-cyan-700">
              User Choices
            </h2>

            <ul className="list-inside list-disc space-y-3 text-gray-700">
              <li>Users can disable cookies through browser settings.</li>

              <li>Users can use the advertising opt-out links provided above.</li>

              <li>
                Users may avoid entering personal information into online tools.
              </li>

              <li>
                Subject to applicable law, users may request access, correction,
                or deletion of personal information associated with them.
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
              knowingly collect personal information from children. A parent or
              guardian who believes a child has provided personal information
              can contact us to request review and deletion.
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
