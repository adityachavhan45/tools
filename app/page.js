import {
  buildMetadata,
  buildWebsiteJsonLd,
  buildOrganizationJsonLd,
  buildFaqJsonLd,
} from "../lib/seo";
import JsonLd from "./components/JsonLd";
import { sections as toolSections } from "./data/tools";

export const metadata = buildMetadata({
  title: "Free Online Tools for PDF, Images, Text & SEO",
  description:
    "Use free online tools for PDF merge/split, image compression & conversion, word counter, JSON formatter, URL encoder, and more. Fast, private, no signup.",
  slug: "/",
  keywords: [
    "free online tools",
    "pdf merge",
    "image compressor",
    "png to jpg",
    "word counter",
    "json formatter",
    "seo tools",
  ],
});

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900">
      <JsonLd
        data={[
          buildWebsiteJsonLd(),
          buildOrganizationJsonLd(),
          buildFaqJsonLd([
            {
              question: "Are these tools free to use?",
              answer:
                "Yes, all tools are completely free and run in your browser.",
            },
            {
              question: "Do I need to install software?",
              answer:
                "No installation is needed. Everything runs directly in your browser.",
            },
            {
              question: "Is my data safe?",
              answer:
                "Yes. Processing happens locally in your browser. Files and text are not uploaded to any server.",
            },
            {
              question: "Can I use these tools on mobile?",
              answer: "Yes, all tools are responsive and mobile friendly.",
            },
          ]),
        ]}
      />

      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
          Free Online Tools for PDF, Images, Text & SEO
        </h1>
        <p className="mt-5 text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
          Fast, secure & works directly in your browser. No signup required.
        </p>
        <a
          href="#all-tools"
          className="inline-block mt-8 px-8 py-3 rounded-xl text-white bg-slate-900 shadow-md hover:shadow-xl hover:bg-black transition transform hover:-translate-y-1"
        >
          Browse All Tools
        </a>
      </section>

      {/* Featured Tools */}
      <section id="tools" className="max-w-6xl mx-auto py-14 px-6">
        <h2 className="text-3xl font-semibold mb-10 text-center">
          Popular Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
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
              className="block p-6 bg-white border rounded-2xl shadow-sm hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <h3 className="text-lg font-bold">{tool.name}</h3>
              <p className="text-gray-600 text-sm mt-2">{tool.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* All Tools */}
      <AllTools />

      {/* Why Use Us */}
      <section className="bg-white py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-10">Why Use Our Tools?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            "100% Free & Secure",
            "Works directly in your browser",
            "Fast & Mobile-Friendly",
            "No Signup Needed",
          ].map((point, i) => (
            <div
              key={i}
              className="p-5 bg-gray-50 rounded-xl shadow hover:shadow-md transition"
            >
              <p className="font-medium">{point}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-semibold mb-8 text-center">FAQ</h2>
        <div className="space-y-4">
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
              className="group border rounded-lg p-4 bg-white shadow-sm"
            >
              <summary className="font-bold cursor-pointer flex justify-between items-center">
                {item.q}
                <span className="transition group-open:rotate-180">⌄</span>
              </summary>
              <p className="text-gray-600 mt-2">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Global footer is in layout */}
    </main>
  );
}

function AllTools() {
  const tools = toolSections.flatMap((s) => s.links);
  return (
    <section id="all-tools" className="max-w-6xl mx-auto py-14 px-6">
      <h2 className="text-3xl font-semibold mb-10 text-center">All Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {tools.map((tool) => (
          <a
            key={tool.href}
            href={tool.href}
            className="block p-6 bg-white border rounded-2xl shadow-sm hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <h3 className="text-lg font-bold">{tool.label}</h3>
            {tool.desc && (
              <p className="text-gray-600 text-sm mt-2">{tool.desc}</p>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
