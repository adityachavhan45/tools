import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Documentation | Convertixy – Guides, Tips & Help Center",
  description:
    "Explore Convertixy documentation with step-by-step guides, usage tips, FAQs, and best practices for using our free online tools efficiently.",
  slug: "/documentation",
  keywords: [
    "convertixy documentation",
    "online tools guide",
    "help center",
    "tool usage guide",
    "pdf tools guide",
    "image tools help",
    "seo tools documentation",
    "free tools manual",
  ],
  focusKeyword: "Convertixy Documentation",
});

export default function DocumentationPage() {
  return (
    <section className="bg-gradient-to-br from-indigo-50 via-sky-50 to-purple-50 py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Documentation
          </h1>

          <p className="mt-4 text-gray-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Everything you need to use Convertixy efficiently. Learn with
            step-by-step guides, smart tips, and helpful resources.
          </p>
        </header>

        {/* Main Card */}
        <div className="bg-white/90 backdrop-blur border border-gray-200 rounded-3xl shadow-xl p-6 sm:p-10 md:p-12 space-y-12 text-gray-800">

          {/* Quick Start */}
          <section className="bg-indigo-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
              🚀 Quick Start
            </h2>

            <ol className="list-decimal list-inside space-y-2">
              <li>Select any tool from the homepage or search bar.</li>
              <li>Follow the simple on-screen instructions.</li>
              <li>Download or copy your results instantly.</li>
            </ol>
          </section>

          {/* PDF Tools */}
          <section className="bg-sky-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-sky-700 mb-4">
              📄 File & PDF Tools
            </h2>

            <p>
              Manage PDFs with merge, split, compress, rotate, and convert
              options. For best performance, close unused browser tabs and
              choose compression levels that match your quality needs.
            </p>
          </section>

          {/* Image Tools */}
          <section className="bg-emerald-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-emerald-700 mb-4">
              🖼️ Image Tools
            </h2>

            <p>
              Compress, resize, crop, and convert images easily. Modern formats
              like <strong>WebP</strong> and <strong>AVIF</strong> help reduce
              file size while maintaining visual quality.
            </p>
          </section>

          {/* Text & SEO */}
          <section className="bg-purple-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-purple-700 mb-4">
              ✍️ Text & SEO Tools
            </h2>

            <p>
              Improve content with word counters, case converters, and meta tag
              generators. Review outputs carefully to maintain high-quality
              publishing standards.
            </p>
          </section>

          {/* FAQ */}
          <section className="bg-amber-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-amber-700 mb-6">
              ❓ Frequently Asked Questions
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="font-semibold text-gray-900 mb-1">
                  Do tools upload my files?
                </p>
                <p>
                  Most tools work directly in your browser, allowing you to
                  process files instantly.
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="font-semibold text-gray-900 mb-1">
                  Do I need an account?
                </p>
                <p>
                  No registration is required. All tools are available
                  immediately.
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="font-semibold text-gray-900 mb-1">
                  Can I use it on mobile?
                </p>
                <p>
                  Yes, Convertixy works smoothly on smartphones, tablets, and
                  desktops.
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="font-semibold text-gray-900 mb-1">
                  Are there any limits?
                </p>
                <p>
                  Most tools are flexible and adapt to your device’s
                  performance.
                </p>
              </div>

            </div>
          </section>

        </div>
      </div>
    </section>
  );
}
