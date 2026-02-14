import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Get in touch with Convertixy. Contact form and support details.",
  slug: "/contact",
  keywords: ["contact", "support", "help"],
});

export default function ContactPage() {
  return (
    <div className="w-full bg-white">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
          Let Connect
        </h1>
        <p className="mt-3 text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
          Have a question, feedback, or partnership idea? We love to hear from you.
        </p>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <form
          className="border rounded-2xl p-6 sm:p-8 bg-white shadow-lg hover:shadow-xl transition"
          method="post"
          autoComplete="on"
        >
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-500 bg-white"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-500 bg-white"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                required
                className="w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-500 bg-white"
                placeholder="How can we help?"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-md hover:opacity-90 transition"
            >
              Send Message
            </button>
          </div>
        </form>

        {/* Support Info */}
        <aside className="border rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-white shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Support Details</h2>
          <ul className="text-sm text-gray-700 space-y-3">
            <li>
              📧 Email:{" "}
              <a
                className="text-indigo-600 hover:underline"
                href="mailto:support@convertixy.com"
              >
                support@convertixy.com
              </a>
            </li>
            <li>⏳ Response time: within 48 hours (business days)</li>
            <li>
              🐞 For bug reports, please include steps to reproduce and your
              browsers version.
            </li>
          </ul>

          <div className="mt-6 p-4 bg-indigo-50 rounded-lg text-indigo-700 text-sm">
            💡 Tip: Check our FAQ before sending a message — you might find your
            answer instantly.
          </div>
        </aside>
      </div>
      </section>
    </div>
  );
}