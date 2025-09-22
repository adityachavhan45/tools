"use client";

import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

// metadata is defined in server wrapper page.js

import { useMemo, useState } from "react";

export default function MetaTagGeneratorPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  const html = useMemo(() => {
    const safe = (s) => s.replace(/["<>]/g, "");
    return `<!-- Primary Meta Tags -->
<title>${safe(title)}</title>
<meta name="title" content="${safe(title)}"/>
<meta name="description" content="${safe(description)}"/>
<meta name="keywords" content="${safe(keywords)}"/>

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website"/>
<meta property="og:url" content="${safe(url)}"/>
<meta property="og:title" content="${safe(title)}"/>
<meta property="og:description" content="${safe(description)}"/>
<meta property="og:image" content="${safe(image)}"/>

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image"/>
<meta property="twitter:url" content="${safe(url)}"/>
<meta property="twitter:title" content="${safe(title)}"/>
<meta property="twitter:description" content="${safe(description)}"/>
<meta property="twitter:image" content="${safe(image)}"/>`;
  }, [title, description, keywords, url, image]);

  function copy() {
    navigator.clipboard.writeText(html);
    showMessage("📋 Meta tags copied!");
  }

  function download() {
    const blob = new Blob([html], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "meta-tags.html";
    a.click();
    URL.revokeObjectURL(a.href);
    showMessage("⬇️ Meta tags downloaded!");
  }

  function clearAll() {
    setTitle("");
    setDescription("");
    setKeywords("");
    setUrl("");
    setImage("");
    showMessage("🧹 Cleared!");
  }

  function showMessage(msg) {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2500);
  }

  return (
    <main className="min-h-screen bg-gray-50 py-6">
      <JsonLd
        data={buildToolJsonLd({
          name: "Meta Tag Generator",
          description:
            "Generate SEO meta tags, Open Graph, and Twitter cards with preview.",
          slug: "/meta-tag-generator",
          category: "Utilities/SEO",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Meta Tag Generator", slug: "/meta-tag-generator" },
        ])}
      />

      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold">Meta Tag Generator</h2>
        <p className="text-gray-600 mt-1">
          Generate SEO, Open Graph, and Twitter meta tags for your website.
        </p>

        {message && (
          <div className="mt-3 px-4 py-2 bg-green-100 border rounded text-green-800 text-sm">
            {message}
          </div>
        )}

        {/* Main Editor */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Inputs */}
          <div className="space-y-3">
            <input
              className="w-full p-3 border rounded-lg shadow-sm 
                         text-gray-800 bg-white placeholder-gray-400
                         focus:ring-2 focus:ring-indigo-400"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="w-full p-3 border rounded-lg shadow-sm min-h-[80px]
                         text-gray-800 bg-white placeholder-gray-400
                         focus:ring-2 focus:ring-indigo-400"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              className="w-full p-3 border rounded-lg shadow-sm 
                         text-gray-800 bg-white placeholder-gray-400
                         focus:ring-2 focus:ring-indigo-400"
              placeholder="Keywords (comma separated)"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
            <input
              className="w-full p-3 border rounded-lg shadow-sm 
                         text-gray-800 bg-white placeholder-gray-400
                         focus:ring-2 focus:ring-indigo-400"
              placeholder="URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <input
              className="w-full p-3 border rounded-lg shadow-sm 
                         text-gray-800 bg-white placeholder-gray-400
                         focus:ring-2 focus:ring-indigo-400"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />

            <div className="flex flex-wrap gap-3 mt-4">
              <button
                className="px-5 py-2 rounded-lg bg-slate-900 text-white shadow hover:bg-black"
                onClick={copy}
              >
                Copy
              </button>
              <button
                className="px-5 py-2 rounded-lg bg-green-600 text-white shadow hover:bg-green-700"
                onClick={download}
              >
                Download
              </button>
              <button
                className="px-5 py-2 rounded-lg border bg-gray-100 hover:bg-gray-200"
                onClick={clearAll}
              >
                Clear
              </button>
            </div>
          </div>

          {/* Right Preview Code */}
          <pre
            className="p-4 border rounded-lg bg-gray-50 font-mono text-sm text-gray-800 
                       whitespace-pre-wrap overflow-auto leading-5 shadow-inner"
          >
            {html}
          </pre>
        </div>

        {/* Social Card Preview */}
        {(title || description || image) && (
          <div className="mt-8 border rounded-lg bg-white shadow-md p-5">
            <h4 className="font-semibold mb-3">Preview (Social Card)</h4>
            <div className="flex gap-4">
              {image && (
                <img
                  src={image}
                  alt="Preview"
                  className="w-36 h-24 object-cover border rounded"
                />
              )}
              <div className="flex-1">
                <p className="font-semibold text-lg">{title || "Page Title"}</p>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {description || "Page description will appear here."}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {url || "yourwebsite.com"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Info Section */}
        <section className="mt-12 bg-white border rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">About Meta Tag Generator</h3>
          <p className="text-gray-700 mb-4">
            Meta tags are snippets of text that describe a page’s content. They
            don’t appear on the page itself but in the page’s code. This tool
            helps you generate SEO-friendly meta tags along with Open Graph and
            Twitter cards, improving how your website appears in search engines
            and social media previews.
          </p>

          <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Generate SEO title, description, and keywords tags</li>
            <li>Open Graph tags for Facebook and LinkedIn</li>
            <li>Twitter Card tags for rich previews</li>
            <li>Copy or download meta tags instantly</li>
            <li>Preview how your content will look on social media</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            <li>Enter your page title, description, and keywords.</li>
            <li>Add your website URL and an image URL for rich previews.</li>
            <li>
              Click <strong>Copy</strong> to copy the code or{" "}
              <strong>Download</strong> to save it.
            </li>
            <li>
              Paste the generated tags inside the <code>&lt;head&gt;</code> of
              your webpage.
            </li>
          </ol>

          <h4 className="font-semibold mt-4 mb-1">📦 Practical Use Cases</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Improve SEO for blogs and websites</li>
            <li>Create rich previews for social media sharing</li>
            <li>Optimize click-through rate from search engines</li>
            <li>Generate meta tags for client websites quickly</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
