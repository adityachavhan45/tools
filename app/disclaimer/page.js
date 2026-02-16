import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Disclaimer | Convertixy – Usage Terms & Information",
  description:
    "Read the official disclaimer of Convertixy. Learn about content usage, platform responsibility, and how our tools are designed to support users safely and transparently.",
  slug: "/disclaimer",
  keywords: [
    "convertixy disclaimer",
    "website disclaimer",
    "tool usage policy",
    "content disclaimer",
    "online tools disclaimer",
    "convertixy terms",
    "legal notice",
    "information policy",
  ],
  focusKeyword: "Convertixy Disclaimer",
});

export default function DisclaimerPage() {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-14 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <header className="text-center mb-14">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Disclaimer
          </h1>

          <p className="mt-4 text-gray-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            This disclaimer explains how information and tools on Convertixy are
            presented and how users can make the best use of our platform.
            Our goal is to maintain transparency, clarity, and user trust.
          </p>
        </header>

        {/* Content Box */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6 sm:p-10 md:p-12 space-y-12 text-gray-800 leading-relaxed">

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Platform Purpose
            </h2>

            <p>
              Convertixy provides online tools and informational resources
              designed to support productivity, digital workflows, and everyday
              tasks. All content is created with care to deliver helpful,
              practical, and user-focused solutions.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Information Usage
            </h2>

            <p>
              The information and results generated through our tools are
              intended to assist users in understanding, planning, and managing
              their digital activities. Users are encouraged to use the
              platform thoughtfully and in accordance with their specific
              requirements.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Responsible Use
            </h2>

            <p>
              Convertixy is designed for responsible and ethical use. Users are
              expected to comply with applicable laws, regulations, and
              community standards while accessing and using our services.
              We promote a safe and respectful online environment.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              External Resources
            </h2>

            <p>
              Some pages may include references or links to external resources
              for additional learning or convenience. These are shared to
              enhance user experience and knowledge.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Continuous Improvement
            </h2>

            <p>
              We regularly review and improve our tools, content, and
              documentation to ensure accuracy, usability, and performance.
              Feedback from users plays an important role in helping us
              maintain high standards.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Contact & Support
            </h2>

            <p>
              If you have questions, suggestions, or require clarification,
              feel free to contact our support team at{" "}
              <a
                href="mailto:legal@convertixy.com"
                className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline transition"
              >
                contact@convertixy.com
              </a>
              . We are always happy to assist and improve your experience.
            </p>
          </section>

        </div>
      </div>
    </section>
  );
}
