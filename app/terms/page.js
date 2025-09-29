import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "Terms and conditions for using Convertixy: rules, responsibilities, and limitations.",
  slug: "/terms",
  keywords: ["terms", "service", "conditions", "agreement", "policy"],
});

export default function TermsPage() {
  return (
    <section className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
            Terms of Service
          </h1>
          <p className="mt-4 text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Please read these Terms of Service carefully before using Convertixy. 
            By accessing or using our site, you agree to comply with the terms below.
          </p>
        </header>

        {/* Content */}
        <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-10 space-y-10 leading-relaxed text-gray-800">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Acceptance of Terms
            </h2>
            <p>
              By using Convertixy, you acknowledge that you have read and agree to these 
              Terms of Service as well as our{" "}
              <a href="/privacy" className="text-indigo-600 hover:underline">
                Privacy Policy
              </a>
              . If you do not agree, please discontinue use of our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Use of the Service
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                You are responsible for how you use our tools and for any 
                content you upload, process, or share.
              </li>
              <li>
                You agree not to use our services for unlawful, harmful, 
                or malicious activities.
              </li>
              <li>
                You must not interfere with or disrupt the functionality 
                of the site or misuse resources.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Intellectual Property
            </h2>
            <p>
              The design, branding, and content of Convertixy are protected by 
              intellectual property rights. You retain ownership of your own 
              files and inputs, but you may not copy, reproduce, or distribute 
              our site’s design or code without permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Disclaimer
            </h2>
            <p>
              Convertixy tools are provided on an <em>"as is"</em> basis without 
              warranties of any kind. While we strive to provide accurate results, 
              we do not guarantee error-free operation, completeness, or suitability 
              for a particular purpose.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, Convertixy and its contributors 
              shall not be held liable for indirect, incidental, or consequential 
              damages resulting from your use of the service. You use the platform 
              at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Changes to Terms
            </h2>
            <p>
              We may update or revise these Terms of Service from time to time. 
              Any changes will be effective immediately once posted. Continued 
              use of Convertixy after updates constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Governing Law
            </h2>
            <p>
              These Terms shall be governed by and interpreted under the laws 
              applicable in your jurisdiction. Disputes arising from the use of 
              Convertixy will be subject to the jurisdiction of relevant courts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Contact Us
            </h2>
            <p>
              If you have any questions or concerns about these Terms of Service, 
              please contact us at{" "}
              <a
                href="mailto:legal@convertixy.com"
                className="text-indigo-600 hover:underline"
              >
                legal@convertixy.com
              </a>
              . We will respond to your inquiries as promptly as possible.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
