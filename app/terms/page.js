import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Service | Convertixy",
  description:
    "Read Convertixy Terms of Service to understand platform usage rules, user responsibilities, website policies, and service guidelines.",
  slug: "/terms",
  keywords: [
    "convertixy terms of service",
    "website terms",
    "user agreement",
    "platform guidelines",
    "service terms",
    "online tools policy",
    "website usage rules",
    "convertixy policies",
  ],
  focusKeyword: "Convertixy Terms of Service",
});

export default function TermsPage() {
  return (
    <section className="bg-gradient-to-br from-indigo-50 via-sky-50 to-purple-50 py-14 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-16 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Terms of Service
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg">
            These Terms of Service explain how users can access and use
            Convertixy responsibly while maintaining a safe and user-friendly
            platform experience.
          </p>
        </header>

        {/* Main Content */}
        <div className="space-y-12 rounded-3xl border border-gray-200 bg-white/90 p-6 text-gray-800 shadow-xl backdrop-blur sm:p-10 md:p-12">
          {/* Section 1 */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              Acceptance of Terms
            </h2>

            <p className="leading-relaxed text-gray-700">
              By accessing or using Convertixy, users agree to follow these
              Terms of Service along with our{" "}
              <a
                href="/privacy"
                className="font-medium text-indigo-600 transition hover:text-indigo-700 hover:underline"
              >
                Privacy Policy
              </a>
              . These terms are intended to maintain transparency, fair usage,
              and a better experience for all users.
            </p>
          </section>

          {/* Section 2 */}
          <section className="rounded-2xl bg-sky-50 p-6 sm:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-sky-700">
              Platform Usage
            </h2>

            <p className="mb-4 leading-relaxed text-gray-700">
              Convertixy provides online tools and utilities for productivity,
              file management, text formatting, image processing, and related
              digital tasks.
            </p>

            <ul className="list-inside list-disc space-y-3 text-gray-700">
              <li>Use tools in a lawful and responsible manner.</li>

              <li>
                Avoid activities that may negatively impact platform stability
                or security.
              </li>

              <li>
                Do not misuse automated systems, scripts, or harmful software.
              </li>

              <li>
                Respect platform guidelines and community standards while using
                services.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="rounded-2xl bg-emerald-50 p-6 sm:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-700">
              User Responsibilities
            </h2>

            <p className="leading-relaxed text-gray-700">
              Users are responsible for the files, content, and information they
              upload or process using Convertixy tools. Users should ensure that
              uploaded files comply with applicable laws, regulations, and
              copyright requirements.
            </p>
          </section>

          {/* Section 4 */}
          <section className="rounded-2xl bg-purple-50 p-6 sm:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-purple-700">
              Intellectual Property
            </h2>

            <p className="leading-relaxed text-gray-700">
              Convertixy branding, website layout, logos, platform design, and
              original content are protected intellectual property assets.
              Users retain ownership of their own uploaded files and generated
              content.
            </p>
          </section>

          {/* Section 5 */}
          <section className="rounded-2xl bg-orange-50 p-6 sm:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-orange-700">
              Service Availability
            </h2>

            <p className="leading-relaxed text-gray-700">
              We continuously improve platform performance, usability, and tool
              quality. However, temporary interruptions, maintenance, feature
              updates, or technical limitations may occasionally affect service
              availability.
            </p>
          </section>

          {/* Section 6 */}
          <section className="rounded-2xl bg-amber-50 p-6 sm:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-amber-700">
              Policy Updates
            </h2>

            <p className="leading-relaxed text-gray-700">
              Convertixy may update these Terms of Service periodically to
              reflect platform improvements, feature changes, or updated legal
              requirements. The latest version will always remain available on
              this page.
            </p>
          </section>

          {/* Section 7 */}
          <section className="rounded-2xl bg-rose-50 p-6 sm:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-rose-700">
              Limitation of Responsibility
            </h2>

            <p className="leading-relaxed text-gray-700">
              While we aim to provide reliable and accurate tools, Convertixy
              cannot guarantee uninterrupted access, complete accuracy, or
              compatibility across all devices and environments. Users should
              independently verify important outputs when necessary.
            </p>
          </section>

          {/* Section 8 */}
          <section className="rounded-2xl bg-gray-50 p-6 sm:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              Contact Information
            </h2>

            <p className="leading-relaxed text-gray-700">
              If you have questions related to these Terms of Service or any
              platform policies, please contact us through our{" "}
              <a
                href="/contact"
                className="font-medium text-indigo-600 transition hover:text-indigo-700 hover:underline"
              >
                Contact Page
              </a>
              .
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-sm leading-relaxed text-gray-500">
            By continuing to use Convertixy, users acknowledge and agree to the
            terms and conditions outlined on this page.
          </p>
        </div>
      </div>
    </section>
  );
}