import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Privacy practices for Convertixy: how we handle data, use cookies, and protect your rights as a user.",
  slug: "/privacy",
  keywords: ["privacy", "policy", "data protection", "cookies", "user rights"],
});

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
            Privacy Policy
          </h1>
          <p className="mt-4 text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Your privacy matters to us. This policy explains what information we
            collect, how we process it, and the steps we take to keep your data
            safe.
          </p>
        </header>

        {/* Content */}
        <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-10 space-y-10 leading-relaxed text-gray-800">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Overview
            </h2>
            <p>
              Convertixy provides browser-based tools designed with
              privacy-first principles. Most processing happens locally in your
              device’s browser, meaning files and inputs never leave your
              computer unless explicitly required. We do not sell, trade, or
              rent your personal data to anyone.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Information We Process
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Tool inputs:</strong> The text, files, or images you
                upload are processed locally whenever possible. For example, PDF
                compression or image resizing is handled in your browser.
              </li>
              <li>
                <strong>Analytics:</strong> We may collect basic usage analytics
                such as page visits and tool popularity. These are aggregated
                and non-identifying, helping us improve performance and features
                without tracking individual users.
              </li>
              <li>
                <strong>Optional feedback:</strong> If you contact us via email,
                we may store your message to better respond to your request.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Cookies
            </h2>
            <p>
              Convertixy may use cookies to enhance usability and remember your
              preferences, such as language settings or recently used tools.
              Cookies are small text files stored on your device and can be
              managed or disabled through your browser’s settings. Disabling
              cookies may limit some functionality, but most tools will continue
              to work.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Data Retention
            </h2>
            <p>
              We minimize data retention. Files processed through browser-based
              tools are not uploaded to our servers. In cases where a tool
              requires temporary server-side processing (for example, converting
              very large files), files are deleted automatically after the task
              is complete. We do not keep permanent copies of user files.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Your Rights
            </h2>
            <p>
              Depending on your jurisdiction, you may have legal rights over
              your personal data, including the right to access, correct, or
              delete information we may hold. You may also have the right to
              object to processing or request data portability. We respect these
              rights and encourage you to contact us if you wish to exercise
              them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Third-Party Services
            </h2>
            <p>
              Some tools or pages may rely on third-party libraries or services,
              such as analytics providers or ad networks. While we carefully
              select partners, we are not responsible for their policies.
              Please review third-party privacy statements to understand how
              they handle your data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Updates to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or for compliance with regulations. Any
              updates will be posted on this page with a revised effective date.
              We encourage you to review this page periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy or our data
              practices, please contact us at{" "}
              <a
                href="mailto:privacy@convertixy.com"
                className="text-indigo-600 hover:underline"
              >
                privacy@convertixy.com
              </a>
              . We take privacy concerns seriously and will respond promptly to
              your queries.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
