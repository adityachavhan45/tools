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
            Meta tags are small pieces of HTML code placed inside the &lt;head&gt; section of a webpage. 
            They provide metadata about the page, such as title, description, author, and preview images. 
            While meta tags are not visible directly to website visitors, they are extremely important for 
            search engines, social media platforms, and overall website SEO performance. A well-optimized 
            meta tag can significantly improve click-through rates, visibility in search results, and user 
            engagement on platforms like Facebook, Twitter, and LinkedIn.
          </p>

          <h4 className="font-semibold mt-4 mb-1">✨ Key Features of This Tool</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Generate SEO-friendly title, description, and keyword tags instantly</li>
            <li>Automatic Open Graph (OG) tags for Facebook, LinkedIn, and other platforms</li>
            <li>Twitter Card tags for rich previews when sharing on X (Twitter)</li>
            <li>Clean and copy-paste ready HTML output</li>
            <li>Download option for quick integration into projects</li>
            <li>Real-time social card preview to visualize how your link will appear</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            <li>Enter your page <strong>title</strong> (ideally 50–60 characters).</li>
            <li>Write a compelling <strong>meta description</strong> (150–160 characters).</li>
            <li>Add a list of <strong>keywords</strong> relevant to your content.</li>
            <li>Provide the canonical <strong>URL</strong> of your webpage.</li>
            <li>Include an <strong>image URL</strong> for social previews (recommended 1200×630px).</li>
            <li>Click <strong>Copy</strong> to copy the code or <strong>Download</strong> for offline use.</li>
            <li>Paste the generated code into your site’s &lt;head&gt; section.</li>
          </ol>

          <h4 className="font-semibold mt-4 mb-1">📦 Practical Use Cases</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li><strong>Bloggers & Content Writers:</strong> Improve SEO ranking with optimized titles and descriptions.</li>
            <li><strong>Digital Marketers:</strong> Generate shareable content previews that attract clicks on social platforms.</li>
            <li><strong>Web Developers:</strong> Quickly generate standard meta tags for new websites.</li>
            <li><strong>E-commerce Sites:</strong> Ensure product pages show correct images and descriptions on Google & Facebook.</li>
            <li><strong>Agencies & Freelancers:</strong> Save time creating meta tags for multiple client websites.</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-1">📖 Why Meta Tags Matter for SEO</h4>
          <p className="text-gray-700 mb-4 text-sm">
            Search engines like Google use meta tags to understand your webpage content. A strong 
            meta title and description can increase the chances of appearing in relevant searches. 
            For example, if your blog post is about &quot;Best Smartphones 2025&quot;, an optimized meta title 
            containing that phrase will help you rank higher. Meta descriptions act like ad copy in 
            search results—they don’t directly affect ranking, but they strongly influence whether 
            a user clicks your link.
          </p>

          <h4 className="font-semibold mt-4 mb-1">⚡ Benefits of Using a Meta Tag Generator</h4>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Saves time compared to writing meta tags manually</li>
            <li>Reduces human error with pre-formatted HTML</li>
            <li>Ensures compatibility with major social networks</li>
            <li>Improves click-through rate (CTR) from search results</li>
            <li>Makes your content more shareable and engaging</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-1">📊 Example Generated Meta Tags</h4>
          <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800 overflow-x-auto">
{`<title>Best Smartphones 2025 - Tech Review</title>
<meta name="description" content="Discover the top smartphones of 2025 with features, pricing, and expert reviews."/>
<meta name="keywords" content="smartphones 2025, mobile phones, best phones, tech reviews"/>

<meta property="og:type" content="website"/>
<meta property="og:url" content="https://example.com/smartphones-2025"/>
<meta property="og:title" content="Best Smartphones 2025 - Tech Review"/>
<meta property="og:description" content="Discover the top smartphones of 2025 with features, pricing, and expert reviews."/>
<meta property="og:image" content="https://example.com/phone.jpg"/>`}
          </pre>

          <h4 className="font-semibold mt-4 mb-1">❓ FAQs</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
            <li><strong>Q: Are keywords meta tags still useful?</strong><br/> 
            A: Google no longer uses them for ranking, but some smaller search engines may still consider them. It’s safe to include them.</li>
            <li><strong>Q: What is the ideal title length?</strong><br/> 
            A: Keep titles between 50–60 characters for best display in Google SERPs.</li>
            <li><strong>Q: What image size is best for Open Graph?</strong><br/> 
            A: 1200×630 pixels is recommended for rich previews across most social platforms.</li>
            <li><strong>Q: Can I use this tool for multiple pages?</strong><br/> 
            A: Yes, simply enter new details and generate fresh tags for each page.</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-1">🚀 Final Thoughts</h4>
          <p className="text-gray-700 text-sm">
            Meta tags may seem like small details, but they play a huge role in SEO and online marketing. 
            With this Meta Tag Generator, you can create optimized tags in seconds and ensure your content 
            looks perfect on Google, Facebook, LinkedIn, and Twitter. Whether you’re a blogger, a developer, 
            or a business owner, this tool simplifies the process and helps you maximize your online reach.
          </p>
        </section>
      </div>
    </main>
  );
}
