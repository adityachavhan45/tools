import Script from "next/script";

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
import AllToolsGrid from "./components/AllToolsGrid";

export const metadata = buildMetadata({
  title: "🚀 65+ FREE Online Tools That Save You Hours Daily - No Signup Required!",
  description:
    "⚡ Stop paying for expensive software! Get 65+ professional-grade FREE tools: PDF merge/split, image compression, SEO optimization, calculators & more. Used by 100,000+ professionals. Works instantly in your browser - no downloads, no registration! ✅ 100% Free ✅ Secure ✅ Fast",
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
    "love calculator",
    "love compatibility",
    "relationship calculator",
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
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900">
            {/* ✅ Adsterra Script – Home Page Only */}
      <Script
        src="https://pl28412045.effectivegatecpm.com/66/18/7c/66187c7798d910a5dc5f689e377e6e4f.js"
        strategy="afterInteractive"
      />

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
              question: "Are these tools free to use?",
              answer:
                "Yes, all tools are completely free and run in your browser. No registration or payment required.",
            },
            {
              question: "Do I need to install software?",
              answer:
                "No installation is needed. Everything runs directly in your browser using modern web technologies.",
            },
            {
              question: "Is my data safe and private?",
              answer:
                "Yes. All processing happens locally in your browser. Files and text are not uploaded to any server, ensuring complete privacy.",
            },
            {
              question: "Can I use these tools on mobile devices?",
              answer: "Yes, all tools are fully responsive and mobile-friendly. They work on smartphones, tablets, and desktop computers.",
            },
            {
              question: "What types of tools are available?",
              answer: "We offer 50+ tools including PDF merge/split/compress, image compression/conversion/cropping, text processing, SEO tools, calculators, converters, generators, QR code generation, and more.",
            },
            {
              question: "Do I need to create an account?",
              answer: "No account creation is required. All tools work immediately without any registration or login process.",
            },
          ]),
        ]}
      />

      {/* Hero Section */}
      <section className="text-center py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-4 sm:mb-6">
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Stop Paying for Software - Get 65+ FREE Professional Tools!
        </h1>
        <p className="mt-4 sm:mt-5 md:mt-6 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed">
          ⚡ <strong>Save hours daily</strong> with our professional-grade tools! PDF processing, image optimization, SEO tools, calculators & more. Works instantly in your browser - no downloads, no registration required!
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs sm:text-sm mb-6 sm:mb-8">
          <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
            ✅ 100% Free Forever
          </span>
          <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
            ✅ No Registration
          </span>
          <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full">
            ✅ Works Instantly
          </span>
        </div>
        <a
          href="#all-tools"
          className="inline-flex justify-center w-full sm:w-auto mt-6 sm:mt-8 md:mt-10 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg rounded-xl text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 font-bold"
        >
          🚀 Start Using FREE Tools Now!
        </a>
      </section>

      {/* Featured Tools */}
      <section id="tools" className="max-w-7xl mx-auto pyFile ke top imports me ye line add karo 👇

js
￼Copy code
-8 sm:py-12 md:py-14 lg:py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-center">
          Most Popular Free Online Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {[
            {
              name: "PDF Merge",
              link: "/pdf-merge",
              desc: "Combine multiple PDFs into one file.",
            },
            {
              name: "PDF Split",
              link: "/pdf-split",
              desc: "Split PDF pages into separate files.",
            },
            {
              name: "Image Compressor",
              link: "/image-compressor",
              desc: "Reduce image size without losing quality.",
            },
            {
              name: "PNG to JPG",
              link: "/png-to-jpg",
              desc: "Convert PNG images to JPG format.",
            },
            {
              name: "Word Counter",
              link: "/word-counter",
              desc: "Count words & characters in text.",
            },
            {
              name: "Meta Tag Generator",
              link: "/meta-tag-generator",
              desc: "Generate SEO-friendly meta tags.",
            },
          ].map((tool) => (
            <a
              key={tool.name}
              href={tool.link}
              className="block p-4 sm:p-5 md:p-6 bg-white border rounded-xl sm:rounded-2xl shadow-sm hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <h3 className="text-base sm:text-lg md:text-xl font-bold leading-tight">{tool.name}</h3>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base mt-2 leading-relaxed">{tool.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* All Tools */}
      <AllToolsGrid tools={toolSections.flatMap((s) => s.links)} />

      {/* Why Use Us */}
      <section className="bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-8 sm:mb-10 md:mb-12">Why Choose Convertixy Free Online Tools?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {[
            "100% Free & Secure",
            "Works directly in your browser",
            "Fast & Mobile-Friendly",
            "No Signup Needed",
          ].map((point, i) => (
            <div
              key={i}
              className="p-4 sm:p-5 md:p-6 bg-gray-50 rounded-lg sm:rounded-xl shadow hover:shadow-md transition"
            >
              <p className="font-medium text-sm sm:text-base md:text-lg">{point}</p>
            </div>
          ))}
        </div>
        
        {/* Additional SEO Content */}
        <div className="mt-12 sm:mt-16 md:mt-20 max-w-5xl mx-auto text-left px-4 sm:px-6">
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-4 sm:mb-6 md:mb-8 text-center">About Convertixy - Your Ultimate Free Online Tools Platform</h3>
          <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
            <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base md:text-lg leading-relaxed">
              Convertixy is the leading platform for free online tools, offering over 65 powerful utilities for PDF manipulation, image processing, text editing, SEO optimization, calculators, converters, and generators. Our tools are designed to work seamlessly in your browser without requiring any software installation or registration.
            </p>
            <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base md:text-lg leading-relaxed">
              Whether you need to merge PDF files, compress images, convert file formats, count words, generate QR codes, calculate BMI, convert temperatures, or optimize your website&#39;s SEO, Convertixy provides professional-grade tools that are completely free to use. All processing happens locally in your browser, ensuring your data remains private and secure.
            </p>
            <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base md:text-lg leading-relaxed">
              Our comprehensive suite includes PDF tools (merge, split, compress, rotate, password removal), image tools (compression, resizing, cropping, format conversion), text processing tools (word counter, case converter, slug generator, text to speech), SEO utilities (meta tag generator, URL encoder, password generator, keyword density checker), calculators (BMI, age, percentage, loan, tip), and converters (temperature, unit, time zone, CSV to JSON). Each tool is optimized for speed and accuracy.
            </p>
            
            <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3">Popular Tool Categories:</h4>
            <ul className="list-disc list-inside text-gray-700 mb-3 sm:mb-4 space-y-1 text-xs sm:text-sm md:text-base">
              <li><strong>PDF Tools:</strong> Merge multiple PDFs, split PDF pages, compress PDFs, rotate pages, remove passwords, convert to Word</li>
              <li><strong>Image Tools:</strong> Compress images, resize photos, crop images, convert PNG to JPG, JPG to WebP, SVG to PNG</li>
              <li><strong>Text Tools:</strong> Word counter, case converter, slug generator, JSON formatter, text to speech, HTML formatter</li>
              <li><strong>SEO Tools:</strong> Meta tag generator, URL encoder, password generator, UUID generator, keyword density checker</li>
              <li><strong>Calculators:</strong> BMI calculator, age calculator, percentage calculator, loan calculator, tip calculator</li>
              <li><strong>Converters:</strong> Temperature converter, unit converter, time zone converter, CSV to JSON, Morse code translator</li>
              <li><strong>Generators:</strong> Random number generator, Lorem Ipsum generator, color palette generator, hash generator</li>
              <li><strong>Utility Tools:</strong> QR code generator, color picker, Unix timestamp converter, binary to text</li>
            </ul>
            
            <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base md:text-lg leading-relaxed">
              All tools are completely free, require no registration, and work directly in your browser. Perfect for developers, designers, content creators, and anyone who needs quick file processing or text manipulation tools.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-5xl mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 sm:mb-8 md:mb-10 text-center">Frequently Asked Questions About Our Free Online Tools</h2>
        <div className="space-y-3 sm:space-y-4">
          {[
            {
              q: "Are these tools free to use?",
              a: "Yes, all tools are completely free.",
            },
            {
              q: "Do I need to install software?",
              a: "No, everything runs directly in your browser.",
            },
            {
              q: "Is my data safe?",
              a: "Yes, all processing happens locally in your browser. Nothing is uploaded.",
            },
            {
              q: "Can I use these tools on mobile?",
              a: "Absolutely! All tools are mobile-friendly.",
            },
          ].map((item, i) => (
            <details
              key={i}
              className="group border rounded-lg p-3 sm:p-4 md:p-5 bg-white shadow-sm"
            >
              <summary className="font-bold cursor-pointer flex justify-between items-center text-sm sm:text-base md:text-lg">
                {item.q}
                <span className="transition group-open:rotate-180 text-lg sm:text-xl">⌄</span>
              </summary>
              <p className="text-gray-600 mt-2 text-xs sm:text-sm md:text-base">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Global footer is in layout */}
    </main>
  );
}

// All tools grid moved to client component: app/components/AllToolsGrid.js
