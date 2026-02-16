import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy | Convertixy – Data Protection & User Privacy",
  description:
    "Read Convertixy’s Privacy Policy to understand how we protect user privacy, handle information responsibly, and maintain transparency across our platform.",
  slug: "/privacy",
  keywords: [
    "convertixy privacy policy",
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
            At Convertixy, we value your privacy and are committed to maintaining
            transparency, security, and responsible data practices.
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
              Convertixy provides browser-based tools designed to support
              productivity and efficiency. Our platform emphasizes privacy,
              clarity, and user-focused design across all services.
            </p>
          </section>

          {/* Information Processing */}
          <section className="bg-sky-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-sky-700 mb-4">
              Information Processing
            </h2>

            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Tool Inputs:</strong> Files, text, and images are
                processed primarily within your browser for fast and efficient
                performance.
              </li>

              <li>
                <strong>Usage Insights:</strong> Aggregated usage information
                helps us understand how tools are used and improve features and
                reliability.
              </li>

              <li>
                <strong>User Communication:</strong> Messages sent to our
                support team are handled carefully to provide assistance.
              </li>
            </ul>
          </section>

          {/* Cookies */}
          <section className="bg-emerald-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-emerald-700 mb-3">
              Cookies & Preferences
            </h2>

            <p>
              Cookies are used to enhance navigation, save preferences, and
              improve overall usability. You can manage cookie settings through
              your browser at any time.
            </p>
          </section>

          {/* Data Handling */}
          <section className="bg-purple-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-purple-700 mb-3">
              Data Handling
            </h2>

            <p>
              We follow minimal data-handling practices and focus on processing
              information only when necessary to deliver our services
              efficiently.
            </p>
          </section>

          {/* User Rights */}
          <section className="bg-amber-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-amber-700 mb-3">
              Your Rights
            </h2>

            <p>
              Users may request information, updates, or clarification related
              to their interactions with our platform. We aim to address all
              inquiries promptly and transparently.
            </p>
          </section>

          {/* Third Parties */}
          <section className="bg-rose-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-rose-700 mb-3">
              Third-Party Services
            </h2>

            <p>
              Some features may use trusted third-party technologies to enhance
              performance and reliability. These partners follow industry
              standards for privacy and security.
            </p>
          </section>

          {/* Updates */}
          <section className="bg-cyan-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-cyan-700 mb-3">
              Policy Updates
            </h2>

            <p>
              This policy may be updated periodically to reflect platform
              improvements and regulatory standards. The latest version will
              always be available on this page.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gray-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Contact & Support
            </h2>

            <p>
              For privacy-related questions or assistance, please contact us at{" "}
              <a
                href="mailto:privacy@convertixy.com"
                className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline transition"
              >
                contact@convertixy.com
              </a>
              . Our team is dedicated to maintaining your trust and confidence.
            </p>
          </section>

        </div>
      </div>
    </section>
  );
}
