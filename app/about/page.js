import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "About Us - Free Online Tools | Convertixy",
  description:
    "Discover Convertixy's mission to provide fast, secure, and free online tools. Learn about our commitment to privacy, our story, and how we help millions of users worldwide.",
  slug: "/about",
  keywords: [
    "about convertixy",
    "free online tools",
    "privacy-focused tools",
    "pdf tools",
    "image converter",
    "web utilities",
    "our mission",
    "company values",
  ],
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Welcome to Convertixy
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
              <span className="font-bold text-white">
                Your trusted platform for fast, secure, and completely free online
                tools. No sign-ups, no hidden fees, just simple solutions.
              </span>
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
        {/* Our Story */}
        <section className="max-w-5xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Our Story
              </h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Convertixy was born from a simple yet powerful idea: everyone
              deserves access to professional-grade online tools without the
              hassle of ads, sign-ups, or privacy concerns.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              What started as a small project in 2023 has grown into a
              comprehensive platform serving thousands of users daily across the
              globe. We noticed that most online tools were either too slow,
              cluttered with intrusive advertisements, or required unnecessary
              account creation. We set out to build something different—a
              platform that puts user experience and privacy first.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="max-w-5xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-8">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed">
                To provide professional-grade online utilities that anyone can
                use instantly, without downloading heavy software or creating
                accounts. We believe technology should simplify life, not add
                extra steps. That's why most of our operations run directly in
                your browser, keeping your data private and secure.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-8">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Our Vision
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We aim to become the world's most trusted platform for online
                utilities, expanding our toolset with AI-assisted features and
                innovative solutions. From students to professionals, we're
                building a reliable digital companion that makes everyday tasks
                effortless.
              </p>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="max-w-5xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What We Offer
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A comprehensive suite of tools designed to make your work faster
              and more efficient
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* PDF Tools */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                PDF Tools
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Merge, split, compress, rotate, and convert PDF files instantly
                with our powerful PDF utilities.
              </p>
            </div>

            {/* Image Tools */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Image Tools
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Compress, resize, crop, and convert images effortlessly in
                multiple formats with quality preservation.
              </p>
            </div>

            {/* Text & SEO Tools */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Text & SEO Tools
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Word counters, case converters, and SEO utilities for content
                creators and digital marketers.
              </p>
            </div>

            {/* Calculators */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Calculators & Converters
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                From BMI and age calculators to temperature and unit converters
                for everyday use.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="max-w-5xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
              Why Choose Convertixy?
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              In a digital landscape filled with compromises, we stand firm on
              three core principles that guide everything we do
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Simplicity */}
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Simplicity
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Intuitive interfaces that anyone can use, regardless of
                  technical expertise. No learning curve, just results.
                </p>
              </div>

              {/* Speed */}
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Speed</h3>
                <p className="text-gray-600 leading-relaxed">
                  Lightning-fast processing with instant results. No endless
                  loading screens or waiting time.
                </p>
              </div>

              {/* Privacy */}
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Privacy
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Your data stays on your device. No forced sign-ups, no hidden
                  tracking, complete privacy protection.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Commitment */}
        <section className="max-w-5xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-8 md:p-12 text-white">
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Our Commitment to Privacy
                </h2>
                <p className="text-lg text-blue-100 leading-relaxed mb-4">
                  <span className="font-bold text-white">
                    Privacy isn't just a feature at Convertixy it's the foundation
                    of everything we build. We understand that your files and data
                    are personal and sensitive.
                  </span>
                </p>

                <p className="text-lg text-blue-100 leading-relaxed mb-6">
                  <span className="font-bold text-white">
                    For operations like PDF editing, image processing, and file
                    conversions, most processes run entirely in your browser. This
                    means your files never leave your computer, ensuring complete
                    privacy and security. You maintain full control over your data
                    at all times.
                  </span>
                </p>

                <a
                  href="/privacy-policy"
                  className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200"
                >
                  Read Our Privacy Policy
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="max-w-5xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
              Trusted 
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  1K+
                </div>
                <p className="text-gray-600 font-medium">Monthly Users</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
                  60+
                </div>
                <p className="text-gray-600 font-medium">Free Tools</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">
                  100%
                </div>
                <p className="text-gray-600 font-medium">Privacy Focused</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">
                  24/7
                </div>
                <p className="text-gray-600 font-medium">Available</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
              We love hearing from our users! Whether you have feedback, want to
              suggest a new tool, or need to report an issue, we're here to
              listen and help.
            </p>
            <p className="text-gray-700 mb-8">
              Your ideas and suggestions help us improve and grow. Reach out to
              us at:
            </p>
            <a
              href="mailto:support@convertixy.com"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              support@convertixy.com
            </a>
          </div>
        </section>
      </div>

      {/* Footer Note */}
      <section className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600 text-sm max-w-3xl mx-auto">
            Convertixy is committed to providing free, accessible tools while
            maintaining the highest standards of privacy and security. We
            continuously update our platform with new features and improvements
            based on user feedback.
          </p>
        </div>
      </section>
    </div>
  );
}