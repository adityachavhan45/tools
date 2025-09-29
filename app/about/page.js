import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "About Us",
  description:
    "Learn about Convertixy, our mission, values, and how our free online tools make work simple, private, and fast.",
  slug: "/about",
  keywords: ["about", "company", "mission", "privacy", "tools"],
});

export default function AboutPage() {
  return (
    <section className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
            About Convertixy
          </h1>
          <p className="mt-4 text-gray-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Convertixy is built with a simple mission — to make online tools
            accessible, fast, private, and free for everyone. Whether you’re a
            student, a professional, or just someone solving everyday problems,
            our tools are designed to save your time without compromising your
            privacy.
          </p>
        </header>

        {/* Content */}
        <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-10 space-y-10 leading-relaxed text-gray-800">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Our Story
            </h2>
            <p>
              Convertixy started with a straightforward observation: too many
              online tools are slow, cluttered with ads, or require unnecessary
              sign-ups. We wanted to build something different — tools that are
              lightweight, privacy-first, and truly helpful. What began as a
              small project soon evolved into a full platform serving thousands
              of users daily across the globe.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Our Mission
            </h2>
            <p>
              Our mission is to provide professional-grade online utilities that
              anyone can use instantly, without downloading heavy software or
              creating accounts. We believe technology should simplify life, not
              add extra steps. That’s why most of our operations run directly
              inside your browser. Your files don’t leave your device, which
              means your data stays private and secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              What We Offer
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>PDF Tools:</strong> Merge, split, compress, rotate, and
                convert your PDF files in seconds.
              </li>
              <li>
                <strong>Image Tools:</strong> Compress images, resize,
                crop, and change formats effortlessly.
              </li>
              <li>
                <strong>Text & SEO Tools:</strong> Counters, converters, and
                SEO-friendly utilities for bloggers and digital marketers.
              </li>
              <li>
                <strong>Calculators & Converters:</strong> From BMI and age
                calculators to temperature and unit converters.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Why Choose Convertixy?
            </h2>
            <p>
              In a world where online tools often come with hidden catches,
              Convertixy is guided by three core values:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li>
                <strong>Simplicity:</strong> Tools that anyone can use, without
                a learning curve.
              </li>
              <li>
                <strong>Speed:</strong> Instant results without endless loading
                screens.
              </li>
              <li>
                <strong>Privacy:</strong> No forced sign-ups, no hidden data
                tracking — everything stays in your browser.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Commitment to Privacy
            </h2>
            <p>
              Privacy isn’t just a feature at Convertixy — it’s our foundation.
              For sensitive operations like PDF and image editing, most
              processes are handled locally on your device. This ensures that
              your files never leave your computer. Learn more in our{" "}
              <a href="/privacy" className="text-indigo-600 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Our Vision for the Future
            </h2>
            <p>
              We aim to expand our toolset with smarter, AI-assisted features
              and even more categories that bring value to students,
              professionals, and businesses alike. From productivity to daily
              tasks, Convertixy is evolving into a reliable digital companion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Get in Touch
            </h2>
            <p>
              We love hearing from our users. If you’d like to share feedback,
              suggest a new tool, or report a bug, please reach us at{" "}
              <a
                href="mailto:support@convertixy.com"
                className="text-indigo-600 hover:underline"
              >
                support@convertixy.com
              </a>
              . Your ideas help us improve and grow.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
