import {
  buildMetadata,
  buildWebsiteJsonLd,
  buildOrganizationJsonLd,
  buildFaqJsonLd,
  buildSoftwareApplicationJsonLd,
  buildItemListJsonLd,
} from "../lib/seo";
import JsonLd from "./components/JsonLd";
import { sections as toolSections } from "./data/tools";

export const metadata = buildMetadata({
  title: "Convertixy - Free Online Tools for PDF, Images, Text and More",
  description:
    "Professional online tools for PDF processing, image optimization, text editing, calculators and converters. Free to use, works in your browser, no registration required. Secure and private file processing.",
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
      <section id="all-tools" className="max-w-7xl mx-auto py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              All Available Tools
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Browse our complete collection of 65+ professional tools
          </p>
        </div>

        <div className="space-y-12">
          {toolSections.map((section, idx) => (
            <div key={idx}>
              {/* <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-xl">
                  {section.icon }
                </span>
                {section.title}
              </h3> */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {section.links.map((tool) => {
                  // Icon mapping for different tools
                  const getToolIcon = (href) => {
                    const iconMap = {
                      // PDF Tools
                      '/pdf-merge': '📄',
                      '/pdf-split': '✂️',
                      '/pdf-compress': '🗜️',
                      '/pdf-rotate': '🔄',
                      '/pdf-to-word': '📝',
                      '/pdf-password-remover': '🔓',
                      
                      // Image Tools
                      '/image-compressor': '🖼️',
                      '/image-resizer': '📐',
                      '/image-cropper': '✂️',
                      '/png-to-jpg': '🔄',
                      '/jpg-to-png': '🔄',
                      '/jpg-to-webp': '🌐',
                      '/webp-to-png': '🌐',
                      '/svg-to-png': '🎨',
                      '/png-to-ico': '⭐',
                      '/images-to-pdf': '📑',
                      '/pdf-to-image': '🖼️',
                      
                      // Text Tools
                      '/word-counter': '📝',
                      '/character-counter': '🔤',
                      '/case-converter': '🔡',
                      '/text-to-speech': '🔊',
                      '/slug-generator': '🔗',
                      '/lorem-ipsum': '📄',
                      '/text-diff': '📊',
                      '/json-formatter': '{ }',
                      '/html-formatter': '< >',
                      '/markdown-to-html': '📝',
                      '/binary-to-text': '0️⃣1️⃣',
                      
                      // SEO Tools
                      '/meta-tag-generator': '🏷️',
                      '/url-encoder': '🔗',
                      '/password-generator': '🔐',
                      '/uuid-generator': '🆔',
                      '/qr-code-generator': '📱',
                      '/base64-encoder': '🔐',
                      '/hash-generator': '#️⃣',
                      '/keyword-density': '🔍',
                      '/password-strength': '💪',
                      
                      // Calculators
                      '/bmi-calculator': '⚖️',
                      '/age-calculator': '📅',
                      '/percentage-calculator': '💯',
                      '/loan-calculator': '💰',
                      '/tip-calculator': '🧾',
                      '/compound-interest': '📈',
                      
                      // Converters
                      '/temperature-converter': '🌡️',
                      '/unit-converter': '📏',
                      '/time-zone-converter': '🌍',
                      '/csv-to-json': '📊',
                      '/morse-code': '📡',
                      
                      // Color Tools
                      '/color-picker': '🎨',
                      '/color-palette': '🎨',
                      
                      // Other
                      '/unix-timestamp': '⏰',
                      '/random-number': '🎲',
                    };
                    return iconMap[href] || '🔧';
                  };

                  const icon = getToolIcon(tool.href);
                  
                  // Gradient mapping for variety
                  const gradients = [
                    'from-blue-500 to-cyan-500',
                    'from-purple-500 to-pink-500',
                    'from-green-500 to-emerald-500',
                    'from-orange-500 to-red-500',
                    'from-indigo-500 to-blue-500',
                    'from-pink-500 to-rose-500',
                    'from-yellow-500 to-orange-500',
                    'from-cyan-500 to-blue-500',
                  ];
                  const gradient = gradients[Math.floor(Math.random() * gradients.length)];

                  return (
                    <a
                      key={tool.href}
                      href={tool.href}
                      className="group relative block p-5 bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200"
                    >
                      {/* Gradient Background on Hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl`}></div>
                      
                      {/* Icon */}
                      <div className="relative mb-3">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} text-white text-xl shadow-md group-hover:scale-110 transition-transform`}>
                          {icon}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="relative">
                        <h4 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {tool.label}
                        </h4>
                        {tool.desc && (
                          <p className="text-gray-600 text-xs mt-2 leading-relaxed">
                            {tool.desc}
                          </p>
                        )}
                      </div>

                      {/* Arrow */}
                      <div className="relative mt-3 flex items-center text-blue-600 text-xs font-medium">
                        <span className="group-hover:mr-1 transition-all">Use Tool</span>
                        <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comprehensive Information Section */}
      <section id="about" className="bg-gradient-to-b from-white to-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                About Convertixy
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your Complete Online Toolkit for Professional Work
            </p>
          </div>
          
          <div className="space-y-8 text-gray-700 leading-relaxed mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
              <p className="text-base sm:text-lg text-justify">
                Convertixy is a comprehensive platform providing free access to over 65 professional-grade online tools designed to streamline your digital workflow. Whether you are a content creator, web developer, digital marketer, student, or business professional, our suite of utilities offers practical solutions for everyday tasks without the need for expensive software subscriptions or complicated installations.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
              <p className="text-base sm:text-lg text-justify">
                In todays digital landscape, efficiency and productivity are paramount. Our platform was created with the understanding that many professionals and individuals require quick access to reliable tools for file manipulation, data conversion, and content optimization. Rather than downloading multiple applications or paying for various software packages, Convertixy consolidates essential utilities into one accessible, browser-based platform that works seamlessly across all devices.
              </p>
            </div>
          </div>

          {/* Privacy Section with Icon */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
                🔒
              </div>
              <h3 className="text-3xl font-bold text-gray-900">
                Privacy and Data Security
              </h3>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
                <p className="text-base sm:text-lg text-justify text-gray-700">
                  Understanding user concerns about data privacy in the digital age, Convertixy implements a client-side processing architecture. This technical approach means that when you upload a PDF document to merge or an image to compress, the file processing occurs entirely within your web browser using JavaScript. The file data never travels across the internet to our servers or any third-party services.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Complete Control</h4>
                      <p className="text-sm text-gray-600 text-justify">Your files remain under your complete control at all times during processing.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      ⚡
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Faster Processing</h4>
                      <p className="text-sm text-gray-600 text-justify">No upload or download delays since everything happens locally.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                      🛡️
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Confidential Files Safe</h4>
                      <p className="text-sm text-gray-600 text-justify">Process sensitive documents without concern about data exposure.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                      🚫
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">No Tracking</h4>
                      <p className="text-sm text-gray-600 text-justify">We dont track, log, or monitor what files you process.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
                <p className="text-base sm:text-lg text-justify text-gray-700">
                  The platform does not implement any tracking cookies, analytics that monitor file contents, or logging systems that record what documents you process. Standard web server logs may record basic technical information like IP addresses and browser types for security purposes, but these logs do not capture or store any information about the files you work with or the content you process through our tools.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Implementation Section */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
                ⚙️
              </div>
              <h3 className="text-3xl font-bold text-gray-900">
                Technical Implementation
              </h3>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 mb-6">
              <p className="text-base sm:text-lg text-justify text-gray-700">
                Convertixy utilizes modern web technologies including HTML5, CSS3, and advanced JavaScript libraries to deliver functionality that previously required desktop software. The File API enables secure file handling, Canvas API powers image manipulation, and various specialized libraries handle format conversions and data processing. These technologies are supported by all contemporary web browsers, ensuring consistent functionality across different platforms.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { name: "Chrome", version: "90+", color: "yellow" },
                { name: "Firefox", version: "88+", color: "orange" },
                { name: "Safari", version: "14+", color: "blue" },
                { name: "Edge", version: "90+", color: "cyan" },
                { name: "Opera", version: "76+", color: "red" }
              ].map((browser) => (
                <div key={browser.name} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 text-center border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="font-semibold text-gray-900">{browser.name}</div>
                  <div className="text-sm text-gray-600 mt-1">{browser.version}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tool Categories Section */}
          <div className="mb-16">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-8 text-gray-900">
              Comprehensive Tool Categories
            </h3>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="text-xl font-semibold mb-3 text-gray-900">PDF Processing Tools</h4>
              <p className="text-base text-justify mb-3">
                Our PDF toolkit includes powerful utilities for merging multiple documents into single files, splitting large PDFs into separate pages, compressing file sizes without quality loss, rotating pages to correct orientation, removing password protection from secured documents, and converting PDFs to editable Word format. These tools are essential for anyone working with digital documents, from students organizing research materials to professionals preparing business presentations.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="text-xl font-semibold mb-3 text-gray-900">Image Optimization and Conversion</h4>
              <p className="text-base text-justify mb-3">
                The image processing suite offers comprehensive solutions for photographers, designers, and content creators. Compress images to reduce file sizes for faster website loading, resize photos to specific dimensions for social media platforms, crop images to focus on important elements, and convert between formats including PNG to JPG, JPG to WebP, SVG to PNG, WebP to PNG, and PNG to ICO. These tools maintain image quality while optimizing for web performance and storage efficiency.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="text-xl font-semibold mb-3 text-gray-900">Text Processing and Formatting</h4>
              <p className="text-base text-justify mb-3">
                Writers, editors, and developers benefit from our text utilities that include word and character counting with detailed statistics, case conversion for changing text between uppercase, lowercase, and title case, slug generation for creating URL-friendly strings, JSON formatting and validation for developers, HTML formatting for code readability, Markdown to HTML conversion, text-to-speech functionality, binary to text conversion, and text difference checking for comparing document versions.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="text-xl font-semibold mb-3 text-gray-900">SEO and Web Development Utilities</h4>
              <p className="text-base text-justify mb-3">
                Digital marketers and web developers can leverage our SEO tools for generating optimized meta tags with proper title, description, and keyword formatting, encoding and decoding URLs for proper web formatting, creating secure random passwords with customizable complexity, generating UUID identifiers for database records, encoding and decoding Base64 data, checking keyword density for content optimization, analyzing password strength, and generating QR codes for marketing campaigns and product information.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="text-xl font-semibold mb-3 text-gray-900">Calculators for Daily Use</h4>
              <p className="text-base text-justify mb-3">
                Our calculator collection provides practical solutions for health, finance, and everyday calculations. Calculate BMI (Body Mass Index) to track health metrics, determine exact age in years, months, and days, compute percentages for various applications, calculate loan payments with interest rates and terms, determine appropriate tip amounts for dining, calculate compound interest for investment planning, and perform unit conversions for temperature, length, weight, and volume across different measurement systems.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="text-xl font-semibold mb-3 text-gray-900">File Converters and Generators</h4>
              <p className="text-base text-justify mb-3">
                Convert data between formats effortlessly with tools for CSV to JSON conversion for data processing, Morse code translation for educational purposes, temperature conversion between Celsius, Fahrenheit, and Kelvin, time zone conversion for international scheduling, random number generation for statistical sampling, Lorem Ipsum text generation for design mockups, color palette generation for design projects, and hash generation for data verification and security applications.
              </p>
            </div>
          </div>

          {/* File Formats Section */}
          <div className="mb-16">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-900">
              Understanding File Formats and Optimization
            </h3>

            <p className="text-base sm:text-lg text-justify">
              Different file formats serve specific purposes in digital workflows. PDF (Portable Document Format) maintains consistent formatting across devices and platforms, making it ideal for official documents, forms, and publications. However, PDFs can become large when containing multiple pages or high-resolution images, which is where compression tools become valuable for reducing file sizes while preserving readability.
            </p>

            <p className="text-base sm:text-lg text-justify">
              Image formats each have distinct characteristics. JPEG files use lossy compression suitable for photographs with gradual color transitions. PNG files support transparency and use lossless compression, ideal for graphics, logos, and images requiring sharp edges. WebP is a modern format offering superior compression with quality comparable to JPEG while supporting transparency like PNG. SVG represents vector graphics that scale infinitely without quality loss, perfect for icons and illustrations.
            </p>

            <p className="text-base sm:text-lg text-justify">
              Understanding when to convert between formats helps optimize content for specific uses. Converting PNG to JPEG reduces file size for photographs where transparency is unnecessary. Converting images to WebP decreases page load times for websites. Converting PDFs to Word enables editing of document content. Each conversion serves a practical purpose in content creation and distribution workflows.
            </p>
          </div>

          {/* Best Practices Section */}
          <div className="mb-16">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-900">
              Best Practices for Using Online Tools
            </h3>

            <p className="text-base sm:text-lg text-justify">
              To achieve optimal results when using online tools, consider file size limitations based on your browsers processing capacity. While Convertixy handles most standard files efficiently, extremely large files (over 100MB) may cause slower processing or browser memory issues. For very large projects, consider breaking files into smaller segments or using tools iteratively.
            </p>

            <p className="text-base sm:text-lg text-justify">
              When compressing images or PDFs, preview results to ensure quality meets your requirements. Compression involves trade-offs between file size and quality. Higher compression produces smaller files but may introduce visible artifacts or reduce clarity. Finding the right balance depends on how the file will be used - web display typically allows more compression than print materials.
            </p>

            <p className="text-base sm:text-lg text-justify">
              For text processing tasks, save your work frequently by copying results to a document editor or text file. Browser-based tools do not automatically save your work, and closing the tab or refreshing the page will clear any unsaved content. This practice prevents data loss and allows you to maintain versions of your work throughout the editing process.
            </p>
          </div>

          {/* Why Choose Section */}
          <div className="mb-16">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-900">
              Why Choose Convertixy for Your Online Tool Needs
            </h3>

            <p className="text-base sm:text-lg text-justify">
              Convertixy operates on principles of accessibility and user convenience. The platform does not require user accounts, which eliminates concerns about password management, email spam, or data breaches associated with account databases. This approach respects user privacy and removes barriers to accessing tools when needed.
            </p>

            <p className="text-base sm:text-lg text-justify">
              The responsive design philosophy ensures that interface elements adapt appropriately to different screen sizes. Navigation menus collapse into mobile-friendly formats on smartphones. Form controls and buttons maintain adequate size for touch interaction. Text remains legible without requiring zoom gestures. These design considerations create consistent usability regardless of device type.
            </p>

            <p className="text-base sm:text-lg text-justify">
              Performance optimization focuses on efficient code execution and minimal resource usage. Tools load quickly even on slower internet connections. Processing algorithms are optimized to complete operations in reasonable timeframes. The interface provides visual feedback during processing so users understand when operations are in progress. These technical considerations contribute to positive user experience.
            </p>
          </div>

          {/* Use Cases Section */}
          <div className="mb-16">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-900">
              Common Use Cases and Applications
            </h3>

            <p className="text-base sm:text-lg text-justify">
              Educational institutions and students utilize document processing tools for various academic tasks. Combining multiple research sources into single PDF documents helps organize reference materials. Image compression enables sharing visual content within email attachment limits. Word counting ensures assignments meet specified length requirements. Text formatting tools help prepare citations and bibliographies according to style guidelines.
            </p>

            <p className="text-base sm:text-lg text-justify">
              Business environments benefit from efficient document handling capabilities. Contract documents often need splitting into individual sections for different departments. Presentation images require optimization for email distribution or web display. Financial calculations assist with budgeting, loan analysis, and percentage computations. Format conversions enable compatibility across different software systems and platforms.
            </p>

            <p className="text-base sm:text-lg text-justify">
              Web development and design professionals utilize various technical tools in their workflows. Image optimization reduces website loading times and bandwidth consumption. Code formatting improves readability of HTML, JSON, and other markup languages. Color tools assist with design consistency and palette creation. UUID generation provides unique identifiers for database records and API implementations.
            </p>

            <p className="text-base sm:text-lg text-justify">
              Content creation activities involve multiple tool types. Writers use word counters and text analyzers to meet publication requirements. Editors employ text comparison tools to track changes between document versions. Digital marketers optimize images for social media and generate meta tags for search engine optimization. Photographers convert and resize images for different distribution channels and display contexts.
            </p>
          </div>

          {/* Platform Development Section */}
          <div className="mb-16">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-900">
              Platform Development and Maintenance
            </h3>

            <p className="text-base sm:text-lg text-justify">
              Convertixy maintains code quality through regular testing and updates. Browser compatibility testing occurs across multiple platforms and versions. Security reviews examine code for potential vulnerabilities. Performance profiling identifies optimization opportunities. User feedback helps identify issues and feature requests that guide development priorities.
            </p>

            <p className="text-base sm:text-lg text-justify">
              The technical architecture utilizes established JavaScript libraries and frameworks that are actively maintained by their respective developer communities. These libraries undergo regular updates to address security issues, add functionality, and improve performance. Convertixy incorporates these updates to maintain current standards and capabilities.
            </p>

            <p className="text-base sm:text-lg text-justify">
              Tool accuracy and reliability receive ongoing attention. PDF processing tools handle various document structures and specifications. Image processors work with different color spaces and bit depths. Text tools accommodate various character encodings and formatting options. Calculator implementations use appropriate mathematical precision for their specific purposes.
            </p>

            <p className="text-base sm:text-lg text-justify">
              Documentation and user guidance help individuals understand tool capabilities and limitations. Tool descriptions explain what each utility does and what file formats it supports. Error messages provide specific information about problems when they occur. Interface design uses familiar patterns and conventions that align with user expectations from other web applications.
            </p>

            <p className="text-base sm:text-lg text-justify">
              The platform continues evolving based on technological advances and user requirements. New tools are evaluated for addition based on usefulness and feasibility. Existing tools receive improvements to expand capabilities or enhance usability. The goal remains providing practical utilities that serve genuine needs without unnecessary complexity or barriers to access.
            </p>
          </div>
        </div>
      </section>

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