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
            A slug is the user-friendly and SEO-friendly part of a URL that
            describes the content of a page. This tool helps you generate clean,
            lowercase, and hyphen-separated slugs instantly.
          </p>

          {/* Features */}
          <div className="mt-6">
            <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-2">
              <span className="text-yellow-500 mr-2">✨</span> Features
            </h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1 pl-2">
              <li>Removes special characters and spaces</li>
              <li>Converts text to lowercase</li>
              <li>Replaces spaces with hyphens (-)</li>
              <li>Instant copy-to-clipboard option</li>
            </ul>
          </div>

          {/* Use Cases */}
          <div className="mt-6">
            <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-2">
              <span className="text-orange-500 mr-2">📦</span> Use Cases
            </h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1 pl-2">
              <li>Generate SEO-friendly blog URLs</li>
              <li>Create clean slugs for product pages</li>
              <li>Optimize news/article links</li>
              <li>Ensure consistency in URL structure</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
