import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Service | Convertixy – Platform Usage & Guidelines",
  description:
    "Read Convertixy’s Terms of Service to understand platform usage guidelines, user responsibilities, and service policies.",
  slug: "/terms",
  keywords: [
    "convertixy terms of service",
    "website terms",
    "user agreement",
    "platform guidelines",
    "service conditions",
    "online tools policy",
    "usage rules",
    "convertixy terms",
  ],
  focusKeyword: "Convertixy Terms of Service",
});

export default function TermsPage() {
  return (
    <section className="bg-gradient-to-br from-indigo-50 via-sky-50 to-purple-50 py-14 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Terms of Service
          </h1>

          <p className="mt-4 text-gray-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            These Terms of Service explain how to use Convertixy responsibly
            while enjoying a secure, transparent, and user-friendly experience.
          </p>
        </header>

        {/* Main Content */}
        <div className="bg-white/90 backdrop-blur border border-gray-200 rounded-3xl shadow-xl p-6 sm:p-10 md:p-12 space-y-12 text-gray-800">

          {/* Acceptance */}
          <section className="bg-indigo-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-3">
              Acceptance of Terms
            </h2>

            <p>
              By accessing and using Convertixy, you confirm that you understand
              and agree to follow these Terms of Service and our{" "}
              <a
                href="/privacy"
                className="font-medium text-indigo-600 hover:underline"
              >
                Privacy Policy
              </a>
              . These terms help ensure a positive experience for all users.
            </p>
          </section>

          {/* Usage */}
          <section className="bg-sky-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-sky-700 mb-3">
              Platform Usage
            </h2>

            <ul className="list-disc list-inside space-y-2">
              <li>Use tools responsibly and in good faith.</li>
              <li>Respect applicable laws and digital standards.</li>
              <li>Avoid activities that may disrupt platform performance.</li>
              <li>Maintain ethical and respectful online behavior.</li>
            </ul>
          </section>

          {/* IP */}
          <section className="bg-emerald-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-emerald-700 mb-3">
              Intellectual Property
            </h2>

            <p>
              Convertixy’s branding, interface, and platform design are protected
              assets. Users retain full ownership of their own files and content
              while using our tools.
            </p>
          </section>

          {/* Service Quality */}
          <section className="bg-purple-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-purple-700 mb-3">
              Service Quality
            </h2>

            <p>
              We continuously work to maintain reliable performance, usability,
              and accuracy across our tools through regular improvements and
              optimization.
            </p>
          </section>

          {/* Updates */}
          <section className="bg-amber-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-amber-700 mb-3">
              Policy Updates
            </h2>

            <p>
              These terms may be updated periodically to reflect platform
              enhancements and evolving standards. The latest version will
              always be available on this page.
            </p>
          </section>

          {/* Legal */}
          <section className="bg-rose-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-rose-700 mb-3">
              Legal Compliance
            </h2>

            <p>
              Convertixy operates in accordance with applicable legal and
              regulatory requirements to promote transparency and fairness.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gray-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Contact & Support
            </h2>

            <p>
              If you have questions regarding these Terms, please contact us Through 
              <a
                href="/contact"
                className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline transition"
              >
                  &nbsp;Contact page 
              </a>
              . Our team is here to support you.
            </p>
          </section>

        </div>
      </div>
    </section>
  );
}
