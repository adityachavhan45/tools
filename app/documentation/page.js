import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Documentation | Convertixy Help Center & Tool Guides",
  description:
    "Explore Convertixy documentation with tool guides, usage instructions, FAQs, and helpful resources for using online tools effectively.",
  slug: "/documentation",
  keywords: [
    "convertixy documentation",
    "help center",
    "tool guides",
    "online tools help",
    "pdf tools guide",
    "image tools help",
    "seo tools documentation",
    "free online tools",
  ],
  focusKeyword: "Convertixy Documentation",
});

export default function DocumentationPage() {
  return (
    <section className="bg-gradient-to-br from-indigo-50 via-sky-50 to-purple-50 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-16 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Documentation
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Learn how to use Convertixy tools with helpful guides, usage tips,
            and frequently asked questions designed to improve your experience.
          </p>
        </header>

        {/* Main Content */}
        <div className="space-y-12 rounded-3xl border border-gray-200 bg-white/90 p-6 text-gray-800 shadow-xl backdrop-blur sm:p-10 md:p-12">
          {/* Intro */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              About Convertixy Tools
            </h2>

            <p className="leading-relaxed text-gray-700">
              Convertixy provides a collection of online tools designed to help
              users complete everyday digital tasks more efficiently. Our
              platform includes utilities for PDF processing, image conversion,
              text formatting, calculators, and many other productivity-related
              tasks.
            </p>
          </section>

          {/* Quick Start */}
          <section className="rounded-2xl bg-indigo-50 p-6 sm:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-indigo-700">
              Getting Started
            </h2>

            <ol className="list-inside list-decimal space-y-3 text-gray-700">
              <li>Open any tool directly from the homepage or category page.</li>

              <li>
                Follow the instructions displayed on the screen for the selected
                tool.
              </li>

              <li>
                Upload files, enter text, or provide the required input data.
              </li>

              <li>
                Generate, process, or convert your results using the tool.
              </li>

              <li>
                Download or copy the final output after processing is complete.
              </li>
            </ol>
          </section>

          {/* PDF Tools */}
          <section className="rounded-2xl bg-sky-50 p-6 sm:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-sky-700">
              PDF & File Tools
            </h2>

            <p className="leading-relaxed text-gray-700">
              Convertixy offers tools for merging, splitting, compressing,
              rotating, and converting PDF files. For better performance,
              ensure your browser is updated and avoid running too many heavy
              applications simultaneously while processing large files.
            </p>
          </section>

          {/* Image Tools */}
          <section className="rounded-2xl bg-emerald-50 p-6 sm:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-700">
              Image Tools
            </h2>

            <p className="leading-relaxed text-gray-700">
              Image tools allow users to resize, crop, compress, and convert
              files into different image formats. Modern formats like WebP can
              help reduce image size while maintaining visual quality for web
              usage.
            </p>
          </section>

          {/* Text Tools */}
          <section className="rounded-2xl bg-purple-50 p-6 sm:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-purple-700">
              Text & SEO Utilities
            </h2>

            <p className="leading-relaxed text-gray-700">
              Text-related tools can help with formatting, word counting, case
              conversion, and SEO-related tasks. Users should always review
              generated outputs carefully before publishing or sharing content.
            </p>
          </section>

          {/* Performance Tips */}
          <section className="rounded-2xl bg-orange-50 p-6 sm:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-orange-700">
              Performance Tips
            </h2>

            <ul className="list-inside list-disc space-y-3 text-gray-700">
              <li>Use updated browsers for better compatibility.</li>

              <li>
                Close unused tabs while working with large files or tools.
              </li>

              <li>
                Ensure stable internet connectivity for smoother experience.
              </li>

              <li>
                Avoid uploading unsupported or corrupted file formats.
              </li>
            </ul>
          </section>

          {/* FAQ */}
          <section className="rounded-2xl bg-amber-50 p-6 sm:p-8">
            <h2 className="mb-6 text-2xl font-semibold text-amber-700">
              Frequently Asked Questions
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <p className="mb-2 font-semibold text-gray-900">
                  Do I need an account to use Convertixy?
                </p>

                <p className="text-gray-700">
                  Most tools are available without requiring account
                  registration.
                </p>
              </div>

              <div className="rounded-xl bg-white p-5 shadow-sm">
                <p className="mb-2 font-semibold text-gray-900">
                  Can I use Convertixy on mobile devices?
                </p>

                <p className="text-gray-700">
                  Yes, the platform is designed to work across smartphones,
                  tablets, laptops, and desktops.
                </p>
              </div>

              <div className="rounded-xl bg-white p-5 shadow-sm">
                <p className="mb-2 font-semibold text-gray-900">
                  Are the tools free to use?
                </p>

                <p className="text-gray-700">
                  Many tools on Convertixy are available for free and can be
                  accessed directly through the website.
                </p>
              </div>

              <div className="rounded-xl bg-white p-5 shadow-sm">
                <p className="mb-2 font-semibold text-gray-900">
                  Why does processing speed vary?
                </p>

                <p className="text-gray-700">
                  Speed can depend on file size, browser performance, device
                  capability, and internet connection quality.
                </p>
              </div>
            </div>
          </section>

          {/* Support */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              Contact & Support
            </h2>

            <p className="leading-relaxed text-gray-700">
              If you need assistance, want to report issues, or have questions
              regarding any tool, you can contact our support team at{" "}
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

        {/* Footer Note */}
        <div className="mt-10 text-center">
          <p className="text-sm leading-relaxed text-gray-500">
            Convertixy continuously improves its tools and documentation to
            provide a better user experience across devices and platforms.
          </p>
        </div>
      </div>
    </section>
  );
}