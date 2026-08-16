import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "About Convertixy - Free Online Tools Platform",
  description:
    "Learn about Convertixy, our mission, privacy-first approach, and how we provide free online tools for PDF, image, text, and conversion tasks.",
  slug: "/about",
  keywords: [
    "about convertixy",
    "free online tools platform",
    "pdf tools",
    "image tools",
    "online converters",
    "privacy focused tools",
    "web utilities",
    "convertixy tools",
  ],
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/10"></div>

        <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              About Convertixy
            </h1>

            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-blue-100 md:text-2xl">
              Convertixy is a free online tools platform designed to help users
              complete everyday digital tasks quickly and easily.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* About */}
        <section className="mx-auto mb-16 max-w-5xl">
          <div className="rounded-2xl bg-white p-8 shadow-lg md:p-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-800 md:text-4xl">
              Who We Are
            </h2>

            <p className="mb-5 text-lg leading-relaxed text-gray-700">
              Convertixy was created to make useful online tools accessible to
              everyone. Many users struggle with websites that are overloaded
              with distractions, confusing layouts, or unnecessary downloads.
              Our goal is to provide a cleaner and more user-friendly
              experience.
            </p>

            <p className="mb-5 text-lg leading-relaxed text-gray-700">
              The platform includes tools for PDF processing, image conversion,
              calculators, text utilities, and many other everyday tasks.
              Whether you are a student, creator, freelancer, or professional,
              Convertixy is designed to save time and simplify online work.
            </p>

            <p className="text-lg leading-relaxed text-gray-700">
              We continue improving our tools, expanding features, and enhancing
              performance to create a better experience for users across
              different devices.
            </p>
          </div>
        </section>

        {/* Transparency */}
        <section className="mx-auto mb-16 max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-blue-100 bg-white p-8 shadow-lg">
              <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl">
                How We Review Tools
              </h2>

              <p className="leading-relaxed text-gray-700">
                Convertixy tools are maintained by the Convertixy team. We review
                core workflows, input validation, mobile usability, and output
                behavior when features are added or updated. Important results
                should still be independently verified before professional,
                financial, health, or legal use.
              </p>
            </div>

            <div className="rounded-2xl border border-purple-100 bg-white p-8 shadow-lg">
              <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl">
                How Convertixy Is Supported
              </h2>

              <p className="leading-relaxed text-gray-700">
                Most tools are available without payment. Optional premium plans
                support advanced AI features, hosting, maintenance, and continued
                development. Advertising may also support free access after the
                site is approved by an advertising partner.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mx-auto mb-16 max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Mission */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 shadow-lg">
              <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl">
                Our Mission
              </h2>

              <p className="leading-relaxed text-gray-700">
                Our mission is to provide reliable and easy-to-use online tools
                that help users complete digital tasks efficiently. We focus on
                simplicity, accessibility, and better usability.
              </p>
            </div>

            {/* Vision */}
            <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-8 shadow-lg">
              <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl">
                Our Vision
              </h2>

              <p className="leading-relaxed text-gray-700">
                We aim to build a trusted online tools platform that provides
                practical utilities for everyday needs while maintaining a clean
                and user-friendly experience.
              </p>
            </div>
          </div>
        </section>

        {/* Tools */}
        <section className="mx-auto mb-16 max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
              What We Offer
            </h2>

            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Convertixy offers a growing collection of useful online tools for
              productivity and daily use.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-xl">
              <h3 className="mb-3 text-xl font-semibold text-gray-800">
                PDF Tools
              </h3>

              <p className="text-sm leading-relaxed text-gray-600">
                Merge, split, compress, rotate, and convert PDF files online.
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-xl">
              <h3 className="mb-3 text-xl font-semibold text-gray-800">
                Image Tools
              </h3>

              <p className="text-sm leading-relaxed text-gray-600">
                Resize, crop, compress, and convert images into different
                formats.
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-xl">
              <h3 className="mb-3 text-xl font-semibold text-gray-800">
                Text Utilities
              </h3>

              <p className="text-sm leading-relaxed text-gray-600">
                Access text formatting tools, counters, generators, and SEO
                utilities.
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-xl">
              <h3 className="mb-3 text-xl font-semibold text-gray-800">
                Calculators
              </h3>

              <p className="text-sm leading-relaxed text-gray-600">
                Use calculators and converters designed for everyday digital
                tasks.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mx-auto mb-16 max-w-5xl">
          <div className="rounded-2xl bg-white p-8 shadow-lg md:p-12">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-800 md:text-4xl">
              Why Users Choose Convertixy
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <h3 className="mb-3 text-xl font-bold text-gray-800">
                  Simplicity
                </h3>

                <p className="leading-relaxed text-gray-600">
                  Tools are designed with clean layouts and easy navigation for
                  better usability.
                </p>
              </div>

              <div className="text-center">
                <h3 className="mb-3 text-xl font-bold text-gray-800">
                  Performance
                </h3>

                <p className="leading-relaxed text-gray-600">
                  We continuously improve tool speed and overall platform
                  performance.
                </p>
              </div>

              <div className="text-center">
                <h3 className="mb-3 text-xl font-bold text-gray-800">
                  Accessibility
                </h3>

                <p className="leading-relaxed text-gray-600">
                  Convertixy is designed to work smoothly across desktop and
                  mobile devices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section className="mx-auto mb-16 max-w-5xl">
          <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white shadow-2xl md:p-12">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              User Privacy and Trust
            </h2>

            <p className="mb-5 text-lg leading-relaxed text-blue-100">
              We understand the importance of user trust and platform
              reliability. Our focus is on creating tools that are simple,
              practical, and user-friendly.
            </p>

            <p className="mb-8 text-lg leading-relaxed text-blue-100">
              We continue improving our platform experience, adding useful
              features, and maintaining a clean browsing environment for users.
            </p>

            <a
              href="/privacy"
              className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-semibold text-indigo-600 transition-colors duration-200 hover:bg-blue-50"
            >
              Read Privacy Policy
            </a>
          </div>
        </section>

        {/* Stats */}
        <section className="mx-auto mb-16 max-w-5xl">
          <div className="rounded-2xl bg-white p-8 shadow-lg md:p-12">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-800 md:text-4xl">
              Platform Highlights
            </h2>

            <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="mb-2 text-4xl font-bold text-blue-600 md:text-5xl">
                  60+
                </div>

                <p className="font-medium text-gray-600">Online Tools</p>
              </div>

              <div>
                <div className="mb-2 text-4xl font-bold text-green-600 md:text-5xl">
                  Fast
                </div>

                <p className="font-medium text-gray-600">
                  User Experience
                </p>
              </div>

              <div>
                <div className="mb-2 text-4xl font-bold text-purple-600 md:text-5xl">
                  Free
                </div>

                <p className="font-medium text-gray-600">
                  Access to Tools
                </p>
              </div>

              <div>
                <div className="mb-2 text-4xl font-bold text-orange-600 md:text-5xl">
                  24/7
                </div>

                <p className="font-medium text-gray-600">
                  Platform Availability
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mx-auto max-w-5xl">
          <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 p-8 text-center shadow-lg md:p-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
              Contact Us
            </h2>

            <p className="mx-auto mb-6 max-w-2xl text-lg leading-relaxed text-gray-700">
              If you have suggestions, feedback, or questions related to
              Convertixy, feel free to contact us.
            </p>

            <a
              href="mailto:contact@convertixy.com"
              className="inline-flex items-center rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
            >
              contact@convertixy.com
            </a>
          </div>
        </section>
      </div>

      {/* Footer */}
      <section className="border-t border-gray-200 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <p className="mx-auto max-w-3xl text-center text-sm text-gray-600">
            Convertixy continues to improve its platform by adding useful tools,
            enhancing usability, and maintaining a better browsing experience
            for users.
          </p>
        </div>
      </section>
    </div>
  );
}
