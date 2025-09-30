"use client";

import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import { useMemo, useState } from "react";

function slugify(input) {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

export default function SlugGeneratorPage() {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const slug = useMemo(() => slugify(text), [text]);

  function copySlug() {
    if (!slug) return;
    navigator.clipboard.writeText(slug);
    setMessage("✅ Slug copied to clipboard!");
    setTimeout(() => setMessage(""), 2000);
  }

  function resetAll() {
    setText("");
    setMessage("🧹 Cleared!");
    setTimeout(() => setMessage(""), 1500);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-8">
      <JsonLd
        data={buildToolJsonLd({
          name: "Slug Generator",
          description: "Generate clean, URL-friendly slugs from any text.",
          slug: "/slug-generator",
          category: "Utilities/SEO",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Slug Generator", slug: "/slug-generator" },
        ])}
      />

      <div className="max-w-4xl mx-auto px-4">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">Slug Generator</h2>
          <p className="text-gray-600 mt-1">
            Create SEO-friendly slugs from your titles instantly.
          </p>

          {message && (
            <div className="mt-3 px-4 py-2 bg-gray-100 border rounded-lg text-gray-700 text-sm shadow-sm">
              {message}
            </div>
          )}

          {/* Input */}
          <input
            className="mt-5 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-slate-900 outline-none 
                       text-gray-800 placeholder-gray-400"
            placeholder="Enter title..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Slug Output */}
          <div className="mt-4 p-4 border rounded-lg bg-gray-50">
            <span className="text-sm text-gray-600">Slug:</span>
            <div className="mt-1 font-mono break-all text-gray-800">
              {slug || "(empty)"}
            </div>
            {slug && (
              <p className="text-xs text-gray-500 mt-1">
                Example URL:{" "}
                <span className="text-blue-600">
                  https://yourwebsite.com/{slug}
                </span>
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="mt-5 flex gap-3">
            <button
              onClick={copySlug}
              disabled={!slug}
              className={`flex-1 px-5 py-2.5 rounded-lg font-medium transition 
                ${!slug
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-slate-900 text-white hover:bg-slate-800 shadow"}`}
            >
              Copy
            </button>
            <button
              onClick={resetAll}
              disabled={!text}
              className={`flex-1 px-5 py-2.5 rounded-lg font-medium transition 
                ${!text
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-red-500 text-white hover:bg-red-600 shadow"}`}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Info Section */}
        <section className="mt-10 bg-white border rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            About Slug Generator
          </h3>
          <p className="text-gray-700 mb-4">
            A slug is the user-friendly, SEO-friendly part of a URL that explains
            the content of a page in a clear and readable format. For example,
            instead of a long and messy link like
            <code>https://yourwebsite.com/post?id=1234</code>,
            a proper slug would make the URL look like
            <code>https://yourwebsite.com/slug-generator-tool</code>.
            Clean URLs are not just better for users, but also for search engines,
            as they improve ranking, click-through rate, and overall site trust.
            This free slug generator tool instantly converts any title or text
            into a lowercase, hyphen-separated format that you can copy and use
            directly in your website.
            Creating consistent slugs across your website is important for SEO and
            branding. Search engines like Google often use the words in a URL slug
            as ranking signals, while visitors find descriptive URLs more trustworthy.
            For example, a blog post about &quot;Top 10 TravelDestinations in 2025&quot; will
            perform better with a slug like
             <code>/top-10-travel-destinations-2025</code>
            compared to something random or confusing. This tool helps you save time
            and effort by automatically cleaning your text, removing unnecessary
            symbols, converting everything to lowercase, and replacing spaces with
            hyphens.
          </p>
          <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Instantly generate SEO-friendly slugs from any text</li>
            <li>Removes accents, special characters, and punctuation</li>
            <li>Converts all text into lowercase for consistency</li>
            <li>Replaces spaces and underscores with clean hyphens</li>
            <li>Copy-to-clipboard option for one-click usage</li>
            <li>Fast and lightweight — works directly in your browser</li>
            <li>Completely free, secure, and private (no data upload)</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            <li>Enter your text, blog title, or product name in the input field.</li>
            <li>Watch the tool instantly convert it into a clean slug format.</li>
            <li>Preview the example URL to see how it would look on your site.</li>
            <li>Click the <strong>Copy</strong> button to save the slug to your clipboard.</li>
            <li>Use the slug in your CMS, blog, or product page URL field.</li>
            <li>Click <strong>Reset</strong> to clear and start fresh anytime.</li>
          </ol>

          <h4 className="font-semibold mt-4 mb-1">📦 Practical Use Cases</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li><strong>Blogging:</strong> Create clean, descriptive slugs for your blog posts to boost search visibility.</li>
            <li><strong>E-commerce:</strong> Optimize product page URLs with simple, keyword-rich slugs.</li>
            <li><strong>News websites:</strong> Standardize article links for better indexing and sharing.</li>
            <li><strong>Portfolio sites:</strong> Maintain professional-looking project URLs.</li>
            <li><strong>Developers:</strong> Ensure URL consistency across web apps and APIs.</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-1">💡 Why Slugs Matter in SEO</h4>
          <p className="text-gray-700 mb-4">
            Search engines evaluate many factors when ranking a website, and URL
            structure is one of them. A descriptive slug provides context about a
            page’s content, making it easier for search engines to match it with
            relevant queries. For instance, a page with the slug
            <code>/best-laptops-under-500</code>
            is more likely to rank for searches related to budget laptops.
            Additionally, slugs improve user trust because they can immediately see
            what the page is about before clicking.
          </p>
          <p className="text-gray-700 mb-4">
            Bad slugs, on the other hand, can harm SEO and user experience. URLs
            filled with random numbers, special symbols, or capital letters look
            unprofessional and discourage clicks. A clean slug ensures that your
            links are short, memorable, and shareable. This tool eliminates all the
            manual work of editing slugs, especially if you manage large websites
            with hundreds of posts or products.
          </p>

          <h4 className="font-semibold mt-4 mb-1">🙋 Frequently Asked Questions</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>What characters are allowed in slugs?</strong> Slugs only contain lowercase letters, numbers, and hyphens.</li>
            <li><strong>Does this tool support non-English text?</strong> Yes, it normalizes text by removing accents and diacritical marks.</li>
            <li><strong>Can I use underscores instead of hyphens?</strong> Hyphens are preferred for SEO, and this tool always uses them.</li>
            <li><strong>Is it safe to use?</strong> Yes, everything runs locally in your browser. No data is uploaded or stored.</li>
            <li><strong>How many slugs can I generate?</strong> Unlimited. Use it for as many titles, products, or pages as you want.</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-1">🚀 Final Thoughts</h4>
          <p className="text-gray-700">
            A slug might seem like a small detail, but it plays a big role in SEO,
            usability, and branding. Clean, keyword-rich slugs can improve search
            engine rankings, increase click-through rates, and make your website
            look more professional. Whether you are a blogger, developer, marketer,
            or business owner, this slug generator saves time and ensures that your
            links are always optimized. Try it now and start creating perfect URLs
            for your website with just one click.
          </p>
        </section>
      </div>
    </main>
  );
}
