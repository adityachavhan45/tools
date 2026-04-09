import {
  buildMetadata,
  buildWebsiteJsonLd,
  buildOrganizationJsonLd,
  buildFaqJsonLd,
  buildSoftwareApplicationJsonLd,
  buildItemListJsonLd,
} from "../lib/seo";
import JsonLd from "./components/JsonLd";
import HomeAllToolsSection from "./components/HomeAllToolsSection";
import HomeLatestBlogsSection from "./components/HomeLatestBlogsSection";
import { sections as toolSections } from "./data/tools";

export const metadata = buildMetadata({
  title: "Free tools use in daily life | Convertixy",
  description:
    "Free tools use in daily life 100% free tools for everyone. Fast, secure and mobile-friendly online tools for all your file processing needs.",
  slug: "/",
  keywords: [
    "free online tools",
    "pdf merge",
    "pdf split", 
    "pdf compressor",
    "image compressor",
    "png to jpg",
    "jpg to webp",
    "word counter",
    "json formatter",
    "seo tools",
    "url encoder",
    "qr code generator",
    "password generator",
    "uuid generator",
    "base64 encoder",
    "case converter",
    "slug generator",
    "meta tag generator",
    "color picker",
    "unix timestamp",
    "convertixy",
    "online converter",
    "free tools",
    "browser tools",
    "no registration",
    "secure tools",
    "fast tools",
    "mobile friendly tools",
    "image resizer",
    "svg to png",
    "webp to png",
    "png to ico",
    "images to pdf",
    "pdf to image",
    "bmi calculator",
    "age calculator",
    "temperature converter",
    "unit converter",
    "time zone converter",
    "random number generator",
    "lorem ipsum generator",
    "color palette generator",
    "hash generator",
    "text to speech",
    "html formatter",
    "markdown to html",
    "binary to text",
    "text diff checker",
    "keyword density checker",
    "password strength checker",
    "percentage calculator",
    "loan calculator",
    "tip calculator",
    "compound interest calculator",
    "csv to json",
    "morse code translator",
    "pdf password remover",
    "pdf rotate",
    "pdf to word",
    "image cropper",
    "jpg to png"
  ],
});

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">

      <JsonLd
        data={[
          buildWebsiteJsonLd(),
          buildOrganizationJsonLd(),
          buildSoftwareApplicationJsonLd(),
          buildItemListJsonLd(toolSections.flatMap(section => 
            section.links.map(tool => ({
              name: tool.label,
              slug: tool.href,
              description: tool.desc || `${tool.label} - Free online tool`
            }))
          )),
          buildFaqJsonLd([
            {
              question: "Are these tools completely free to use?",
              answer:
                "Yes, all 65+ tools on Convertixy are completely free with no hidden charges. You can use them unlimited times without any payment or subscription requirement.",
            },
            {
              question: "Do I need to install any software to use these tools?",
              answer:
                "No installation is required. All tools run directly in your web browser using modern technologies. Simply visit the tool page and start using it immediately.",
            },
            {
              question: "How secure are my files and data?",
              answer:
                "Your data is completely secure. All file processing happens locally in your browser. We do not upload, store, or access your files on any server, ensuring 100% privacy and security.",
            },
            {
              question: "Can I use these tools on mobile devices?",
              answer: "Yes, all tools are fully responsive and optimized for mobile devices. They work seamlessly on smartphones, tablets, laptops, and desktop computers across all operating systems.",
            },
            {
              question: "What types of tools are available on Convertixy?",
              answer: "Convertixy offers 65+ professional tools including PDF manipulation (merge, split, compress), image processing (compression, conversion, resizing), text utilities (word counter, formatters), SEO tools (meta tags, URL encoding), calculators (BMI, loan, percentage), and file converters.",
            },
            {
              question: "Do I need to create an account or register?",
              answer: "No registration is required. All tools are accessible immediately without creating an account, providing your email, or going through any signup process.",
            },
            {
              question: "Are there any file size limitations?",
              answer: "While our tools can handle most standard files, very large files may be limited by your browsers processing capacity. For optimal performance, we recommend files under 50MB for most operations.",
            },
            {
              question: "Can I use these tools for commercial projects?",
              answer: "Yes, you can use all tools for both personal and commercial projects without any restrictions or attribution requirements.",
            },
          ]),
        ]}
      />

      {/* Hero Section */}
      <section className="relative text-center py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Gradient Background Decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full mb-6 shadow-sm">
          <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ✨ 65+ Professional Tools Available
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
          <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            Free Online Tools
          </span>
          <br />
          <span className="text-gray-700">for Your Daily Tasks</span>
        </h1>

        {/* Latest Blogs Section */}
        <div className="max-w-6xl mx-auto mt-8 sm:mt-10 text-left">
          <HomeLatestBlogsSection />
        </div>
        
        <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Convertixy provides a comprehensive collection of online utilities to help you work more efficiently. Our tools cover PDF processing, image optimization, text editing, calculations, and file conversions.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Free to Use
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            No Registration
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Secure & Private
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
            </svg>
            Mobile Friendly
          </span>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#tools"
            className="group relative inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>Browse All Tools</span>
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Learn More
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">65+</div>
            <div className="text-sm text-gray-600 mt-1">Tools Available</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">100%</div>
            <div className="text-sm text-gray-600 mt-1">Free Forever</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">0</div>
            <div className="text-sm text-gray-600 mt-1">Signup Required</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Fast</div>
            <div className="text-sm text-gray-600 mt-1">Processing</div>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section id="tools" className="max-w-7xl mx-auto py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Most Popular Tools
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Start with our most used tools for quick and efficient file processing
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "PDF Merge",
              link: "/pdf-merge",
              desc: "Combine multiple PDF files into a single document efficiently.",
              icon: "📄",
              gradient: "from-blue-500 to-cyan-500"
            },
            {
              name: "PDF Split",
              link: "/pdf-split",
              desc: "Extract and separate individual pages from PDF files.",
              icon: "✂️",
              gradient: "from-purple-500 to-pink-500"
            },
            {
              name: "Image Compressor",
              link: "/image-compressor",
              desc: "Reduce image file sizes while maintaining visual quality.",
              icon: "🖼️",
              gradient: "from-green-500 to-emerald-500"
            },
            {
              name: "PNG to JPG Converter",
              link: "/png-to-jpg",
              desc: "Convert PNG images to JPG format for better compatibility.",
              icon: "🔄",
              gradient: "from-orange-500 to-red-500"
            },
            {
              name: "Word Counter",
              link: "/word-counter",
              desc: "Count words, characters, sentences, and paragraphs in text.",
              icon: "📝",
              gradient: "from-indigo-500 to-blue-500"
            },
            {
              name: "Meta Tag Generator",
              link: "/meta-tag-generator",
              desc: "Create optimized meta tags for better search engine visibility.",
              icon: "🏷️",
              gradient: "from-pink-500 to-rose-500"
            },
          ].map((tool) => (
            <a
              key={tool.name}
              href={tool.link}
              className="group relative block p-6 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              {/* Icon */}
              <div className="relative mb-4">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${tool.gradient} text-white text-2xl shadow-lg`}>
                  {tool.icon}
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {tool.desc}
                </p>
              </div>

              {/* Arrow Icon */}
              <div className="relative mt-4 flex items-center text-blue-600 font-semibold text-sm">
                <span className="group-hover:mr-2 transition-all">Try Now</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* All Tools */}
      <HomeAllToolsSection toolSections={toolSections} />

      {/* Benefits Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                How Convertixy Works
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need, all in one place
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "No Cost Required",
                desc: "All tools are available at no charge. There are no subscription fees, hidden costs, or premium tiers to access features.",
                icon: "💰",
                gradient: "from-green-400 to-emerald-500"
              },
              {
                title: "Browser-Based",
                desc: "Tools operate entirely within your web browser using modern JavaScript technology. No software downloads or installations needed.",
                icon: "🌐",
                gradient: "from-blue-400 to-cyan-500"
              },
              {
                title: "Local Processing",
                desc: "Files are processed on your own device. Data does not get uploaded to external servers, maintaining privacy and security.",
                icon: "🔒",
                gradient: "from-purple-400 to-pink-500"
              },
              {
                title: "Instant Access",
                desc: "Begin using any tool immediately. No account creation, email verification, or personal information required.",
                icon: "⚡",
                gradient: "from-orange-400 to-red-500"
              },
              {
                title: "Responsive Design",
                desc: "Interface adapts to different screen sizes. Works on desktop computers, laptops, tablets, and mobile phones.",
                icon: "📱",
                gradient: "from-indigo-400 to-blue-500"
              },
              {
                title: "Optimized Performance",
                desc: "Efficient code ensures quick processing. Most operations complete within seconds depending on file size.",
                icon: "🚀",
                gradient: "from-cyan-400 to-blue-500"
              },
              {
                title: "Cross-Platform",
                desc: "Compatible with all major operating systems including Windows, macOS, Linux, iOS, and Android devices.",
                icon: "💻",
                gradient: "from-pink-400 to-rose-500"
              },
              {
                title: "Regularly Maintained",
                desc: "Tools are updated periodically to fix issues, improve functionality, and add new features based on user needs.",
                icon: "🔄",
                gradient: "from-yellow-400 to-orange-500"
              },
            ].map((benefit, i) => (
              <div
                key={i}
                className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                {/* Icon with Gradient Background */}
                <div className="mb-4">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.gradient} text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {benefit.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-bold text-lg mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed text-justify">
                  {benefit.desc}
                </p>

                {/* Hover Effect Border */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-5xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about Convertixy
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "Are these tools completely free to use?",
              a: "Yes, all 65+ tools on Convertixy are completely free with no hidden charges. You can use them unlimited times without any payment or subscription requirement.",
              icon: "💰"
            },
            {
              q: "Do I need to install any software to use these tools?",
              a: "No installation is required. All tools run directly in your web browser using modern technologies. Simply visit the tool page and start using it immediately.",
              icon: "🌐"
            },
            {
              q: "How secure are my files and data?",
              a: "Your data is completely secure. All file processing happens locally in your browser. We do not upload, store, or access your files on any server, ensuring 100% privacy and security.",
              icon: "🔒"
            },
            {
              q: "Can I use these tools on mobile devices?",
              a: "Yes, all tools are fully responsive and optimized for mobile devices. They work seamlessly on smartphones, tablets, laptops, and desktop computers across all operating systems.",
              icon: "📱"
            },
            {
              q: "What types of tools are available on Convertixy?",
              a: "Convertixy offers 65+ professional tools including PDF manipulation (merge, split, compress), image processing (compression, conversion, resizing), text utilities (word counter, formatters), SEO tools (meta tags, URL encoding), calculators (BMI, loan, percentage), and file converters.",
              icon: "🛠️"
            },
            {
              q: "Do I need to create an account or register?",
              a: "No registration is required. All tools are accessible immediately without creating an account, providing your email, or going through any signup process.",
              icon: "✅"
            },
            {
              q: "Are there any file size limitations?",
              a: "While our tools can handle most standard files, very large files may be limited by your browsers processing capacity. For optimal performance, we recommend files under 50MB for most operations.",
              icon: "📊"
            },
            {
              q: "Can I use these tools for commercial projects?",
              a: "Yes, you can use all tools for both personal and commercial projects without any restrictions or attribution requirements.",
              icon: "💼"
            },
          ].map((item, i) => (
            <details
              key={i}
              className="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <summary className="font-semibold cursor-pointer flex justify-between items-center p-6 text-base sm:text-lg text-gray-900 hover:text-blue-600 transition-colors">
                <span className="flex items-center gap-4">
                  <span className="flex-shrink-0 text-2xl">{item.icon}</span>
                  <span>{item.q}</span>
                </span>
                <svg 
                  className="flex-shrink-0 w-6 h-6 text-blue-600 transition-transform duration-300 group-open:rotate-180" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-6 pt-2">
                <div className="pl-12">
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-justify bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border-l-4 border-blue-500">
                    {item.a}
                  </p>
                </div>
              </div>
            </details>
          ))}
        </div>

        {/* CTA at bottom of FAQ */}
        <div className="mt-16 text-center p-8 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Ready to Get Started?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Start using our free tools now and experience the convenience of browser-based file processing.
          </p>
          <a
            href="#tools"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          >
            <span>Browse All Tools</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>

    </main>
  );
}                                                            