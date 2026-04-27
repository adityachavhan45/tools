import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy | Convertixy - Cookies, Ads & Data Protection",
  description:
    "Read Convertixy's Privacy Policy to learn how we handle tool data, cookies, Google AdSense advertising, analytics, and user privacy choices.",
  slug: "/privacy",
  keywords: [
    "convertixy privacy policy",
    "google ads privacy",
    "adsense privacy policy",
    "data protection policy",
    "user privacy",
    "online tools privacy",
    "secure file processing",
    "privacy safe tools",
    "cookie policy",
    "information security",
  ],
  focusKeyword: "Convertixy Privacy Policy",
});

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-gradient-to-br from-indigo-50 via-sky-50 to-purple-50 py-14 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Privacy Policy
          </h1>

          <p className="mt-4 text-gray-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            At Convertixy, we respect your privacy and explain clearly how our
            tools, cookies, analytics, and advertising partners may handle
            information when you use this website.
          </p>

          <p className="mt-3 text-sm text-gray-500">
            Effective date: April 24, 2026
          </p>
        </header>

        {/* Main Content */}
        <div className="bg-white/90 backdrop-blur border border-gray-200 rounded-3xl shadow-xl p-6 sm:p-10 md:p-12 space-y-12 text-gray-800">

          {/* Overview */}
          <section className="bg-indigo-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-3">
              Overview
            </h2>

            <p>
              Convertixy provides free browser-based tools for file conversion,
              PDF utilities, image processing, text formatting, SEO tasks, and
              calculators. This Privacy Policy explains what information we may
              collect, how we use it, how third-party services such as Google may
              process data, and the choices available to you.
            </p>
          </section>

          {/* Information Processing */}
          <section className="bg-sky-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-sky-700 mb-4">
              Information We Process
            </h2>

            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Tool inputs:</strong> Many files, images, and text values
                are processed directly in your browser. For these tools, your
                input is not intentionally uploaded to our servers.
              </li>

              <li>
                <strong>Usage data:</strong> We may collect basic usage
                information such as pages visited, device type, browser type,
                approximate location, referring pages, and interactions with site
                features to improve reliability and user experience.
              </li>

              <li>
                <strong>Contact details:</strong> If you contact us, we may
                receive your name, email address, message content, and any other
                information you choose to provide so we can respond to your
                request.
              </li>
            </ul>
          </section>

          {/* Cookies */}
          <section className="bg-emerald-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-emerald-700 mb-3">
              Cookies, Advertising & Google AdSense
            </h2>

            <div className="space-y-4">
              <p>
                Convertixy may use cookies and similar technologies to keep the
                website functional, understand site performance, remember basic
                preferences, and show advertisements.
              </p>

              <p>
                We may display ads through Google AdSense or other Google
                advertising services. Google and its partners may use cookies,
                including the DoubleClick cookie, to serve ads based on your
                visits to this and other websites. These cookies help personalize
                ads, limit repeated ads, measure ad performance, and detect
                invalid activity.
              </p>

              <p>
                You can control or disable cookies in your browser settings. You
                can also manage Google ad personalization at{" "}
                <a
                  href="https://adssettings.google.com/"
                  className="font-medium text-emerald-700 hover:underline"
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                >
                  Google Ads Settings
                </a>{" "}
                and learn more about how Google uses information from sites that
                use its services at{" "}
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  className="font-medium text-emerald-700 hover:underline"
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                >
                  Google's partner sites policy
                </a>
                .
              </p>
            </div>
          </section>

          {/* Data Handling */}
          <section className="bg-purple-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-purple-700 mb-3">
              How We Use Information
            </h2>

            <ul className="list-disc list-inside space-y-2">
              <li>To operate, maintain, and improve Convertixy tools.</li>
              <li>To monitor performance, fix errors, and prevent abuse.</li>
              <li>To respond to support, feedback, and contact requests.</li>
              <li>To understand which tools and pages are useful to visitors.</li>
              <li>To display, measure, and improve advertising where applicable.</li>
            </ul>
          </section>

          {/* User Rights */}
          <section className="bg-amber-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-amber-700 mb-3">
              Data Storage & Security
            </h2>

            <p>
              We use reasonable technical and organizational measures to protect
              information handled through the website. Browser-based tools are
              designed to reduce unnecessary server-side processing. However, no
              internet service can guarantee complete security, so avoid entering
              highly sensitive personal, financial, medical, or confidential
              information into online tools unless you understand the risk.
            </p>
          </section>

          {/* Third Parties */}
          <section className="bg-rose-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-rose-700 mb-3">
              Third-Party Services
            </h2>

            <div className="space-y-4">
              <p>
                We may use third-party services for hosting, analytics,
                advertising, contact handling, and website functionality. These
                services may process information according to their own privacy
                policies.
              </p>

              <p>
                Third-party services may include Google AdSense, Google
                Analytics, Google Tag Manager, Firebase, hosting providers, and
                other tools used to operate and improve Convertixy.
              </p>
            </div>
          </section>

          {/* User Rights */}
          <section className="bg-amber-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-amber-700 mb-3">
              Your Privacy Choices
            </h2>

            <ul className="list-disc list-inside space-y-2">
              <li>You can block or delete cookies through your browser settings.</li>
              <li>You can manage Google ad personalization from Google Ads Settings.</li>
              <li>You can contact us to ask privacy-related questions or request clarification.</li>
              <li>You can avoid submitting personal data in tool inputs whenever possible.</li>
            </ul>
          </section>

          {/* Refund Policy */}
          <section className="bg-lime-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-lime-700 mb-3">
              Refund Policy
            </h2>

            <div className="space-y-3">
              <p>
                If a payment is eligible for refund based on our internal
                verification and support review, the refunded amount will be
                processed and credited within <strong>24-48 hours</strong>.
              </p>
              <p>
                Actual credit timing may also depend on your bank, card issuer,
                or payment provider processing timeline.
              </p>
            </div>
          </section>

          {/* Children */}
          <section className="bg-orange-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-orange-700 mb-3">
              Children's Privacy
            </h2>

            <p>
              Convertixy is intended for a general audience and is not directed
              to children under 13. We do not knowingly collect personal
              information from children under 13. If you believe a child has
              provided personal information through our website, please contact
              us so we can review and take appropriate action.
            </p>
          </section>

          {/* Updates */}
          <section className="bg-cyan-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-cyan-700 mb-3">
              Policy Updates
            </h2>

            <p>
              We may update this Privacy Policy from time to time to reflect
              changes in our tools, advertising setup, analytics, legal
              requirements, or data practices. The latest version will always be
              available on this page with an updated effective date.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gray-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Contact & Support
            </h2>

            <p>
              For privacy-related questions, ad/cookie concerns, or data
              requests, please contact us at{" "}
              <a
                href="mailto:contact@convertixy.com"
                className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline transition"
              >
                contact@convertixy.com
              </a>
              . We aim to respond to genuine requests within a reasonable time.
            </p>
          </section>

        </div>
      </div>
    </section>
  );
}
