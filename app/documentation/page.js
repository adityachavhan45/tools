import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Documentation",
  description:
    "Convertixy documentation: quick start guides, usage tips, FAQs, and best practices for using our free tools.",
  slug: "/documentation",
  keywords: ["docs", "documentation", "help", "guide", "faq"],
});

export default function DocumentationPage() {
  return (
    <section className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
            Documentation
          </h1>
          <p className="mt-4 text-gray-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Learn how to use our tools effectively. Explore quick start guides,
            usage tips, and answers to the most common questions.
          </p>
        </header>

        {/* Content */}
        <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-10 space-y-10 leading-relaxed text-gray-800">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Quick Start
            </h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Choose any tool from the homepage or use the search bar.</li>
              <li>
                Follow the on-screen instructions. Most tools run directly in
                your browser, so files stay private.
              </li>
              <li>
                Use the download or copy buttons to save results instantly.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              File & PDF Tools
            </h2>
            <p>
              Our PDF tools include merge, split, compress, rotate, and convert
              options. For large PDFs, close unused browser tabs to free memory.
              Keep in mind that higher compression can reduce quality, so choose
              the right balance based on your needs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Image Tools
            </h2>
            <p>
              Image utilities allow you to compress, resize, crop, and convert
              between formats. For web use, we recommend modern formats like{" "}
              <strong>WebP</strong> or <strong>AVIF</strong> for smaller file
              sizes. Always keep an original copy of your image if you need
              lossless quality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Text & SEO Tools
            </h2>
            <p>
              Our text and SEO tools include word counters, case converters,
              meta tag generators, and more. Use AI-generated or automated text
              responsibly, and always review before publishing to ensure
              accuracy and quality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-900">
                  Do tools upload my files?
                </p>
                <p>
                  No, most of our tools run locally in your browser. This means
                  your files stay private and never leave your device.
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  Do I need an account to use Convertixy?
                </p>
                <p>
                  No, all tools are completely free and require no registration.
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  Can I use Convertixy on mobile?
                </p>
                <p>
                  Yes, our platform is fully mobile-friendly, so you can access
                  and use tools from any device.
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  Are there any limits?
                </p>
                <p>
                  Most tools are unlimited, but some heavy operations may depend
                  on your device’s memory and processing power.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
