"use client";

import { useState } from "react";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function WebpToPngPage() {
  const [files, setFiles] = useState([]);
  const [outputs, setOutputs] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");

  async function convert() {
    if (!files.length) return;
    setProcessing(true);
    const results = [];
    try {
      for (const file of files) {
        const img = new Image();
        const url = URL.createObjectURL(file);
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = url;
        });
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const out = canvas.toDataURL("image/png");
        const name = file.name.replace(/\.webp$/i, "");
        results.push({ name: `${name}.png`, url: out });
        URL.revokeObjectURL(url);
      }
      setOutputs(results);
      setMessage(`✅ Converted ${results.length} file(s) successfully!`);
    } catch {
      setMessage("❌ Conversion failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  }

  function reset() {
    setFiles([]);
    setOutputs([]);
    setMessage("🧹 Cleared!");
    setTimeout(() => setMessage(""), 2000);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-8">
      {/* ✅ Tool Schema */}
      <JsonLd
        data={buildToolJsonLd({
          name: "WebP to PNG Converter Online",
          description:
            "Convert WebP images to PNG instantly with our free, fast, and secure browser-based image converter.",
          slug: "/webp-to-png",
          category: "Utilities/Images",
        })}
      />

      {/* ✅ Breadcrumb Schema */}
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "WebP to PNG Converter", slug: "/webp-to-png" },
        ])}
      />

      {/* ✅ FAQ Schema for Google Rich Results */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Is this WebP to PNG converter safe to use?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, all conversions happen locally in your browser. Your images are never uploaded or stored on any server.",
              },
            },
            {
              "@type": "Question",
              name: "Does this converter preserve transparency?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, transparency from WebP images is fully preserved when converting to PNG format.",
              },
            },
            {
              "@type": "Question",
              name: "Can I convert multiple WebP images at once?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, you can upload and batch-convert multiple WebP files instantly with one click.",
              },
            },
          ],
        }}
      />

      <div className="max-w-5xl mx-auto px-4">
        {/* Invisible H1 for SEO */}
        <h1 className="sr-only">Free WebP to PNG Converter Online</h1>

        {/* Main Card */}
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">
            WebP to PNG Converter
          </h2>
          <p className="text-gray-600 mt-1">
            Convert WebP images to PNG easily, right in your browser.
          </p>

          {message && (
            <div
              className="mt-3 px-4 py-2 rounded-lg text-sm shadow-sm 
                            border bg-gray-50 text-gray-800"
            >
              {message}
            </div>
          )}

          {/* Upload */}
          <div
            className="mt-6 p-6 border-2 border-dashed border-gray-300 rounded-xl 
                       bg-gray-50 hover:bg-gray-100 cursor-pointer text-center"
          >
            <input
              type="file"
              accept="image/webp"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
              className="hidden"
              id="webp-upload"
            />
            <label htmlFor="webp-upload" className="cursor-pointer text-gray-600">
              Drag & Drop WebP files here or{" "}
              <span className="text-slate-900 font-semibold">browse</span>
            </label>
            {files.length > 0 && (
              <p className="mt-2 text-sm text-gray-500">
                {files.length} file(s) selected
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="mt-5 flex gap-3">
            <button
              onClick={convert}
              disabled={processing || !files.length}
              className={`flex-1 px-5 py-2.5 rounded-lg font-medium transition 
                ${
                  !files.length || processing
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-slate-900 text-white hover:bg-slate-800 shadow"
                }`}
            >
              {processing ? "Converting…" : "Convert"}
            </button>
            <button
              onClick={reset}
              disabled={!files.length && !outputs.length}
              className={`flex-1 px-5 py-2.5 rounded-lg font-medium transition 
                ${
                  !files.length && !outputs.length
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-red-500 text-white hover:bg-red-600 shadow"
                }`}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Results */}
        {outputs.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {outputs.map((o, idx) => (
              <div key={idx} className="bg-white border rounded-xl shadow p-4">
                <img src={o.url} alt={o.name} className="w-full h-auto rounded" />
                <p className="mt-2 text-sm text-gray-600">{o.name}</p>
                <a
                  className="mt-3 inline-block w-full text-center px-4 py-2 
                             bg-slate-900 text-white rounded-lg hover:bg-slate-800"
                  href={o.url}
                  download={o.name}
                >
                  Download PNG
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Info Section */}
        <section className="mt-12 bg-white border rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            About WebP to PNG
          </h3>
          <p className="text-gray-700 mb-4 text-sm">
            WebP is a modern image format developed by Google that provides
            superior compression for images on the web. However, not all
            platforms, apps, or editing tools support WebP yet. Converting WebP
            to PNG ensures wider compatibility while maintaining high quality.
          </p>

          <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-2">
            <span className="text-yellow-500 mr-2">✨</span> Features
          </h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1 pl-2 text-sm">
            <li>Instantly convert WebP images to PNG</li>
            <li>Preview results before download</li>
            <li>Batch processing (multiple files)</li>
            <li>Works completely in your browser</li>
          </ul>

          <h4 className="flex items-center text-lg font-semibold text-gray-800 mt-6 mb-2">
            <span className="text-orange-500 mr-2">📦</span> Use Cases
          </h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1 pl-2 text-sm">
            <li>When your CMS doesnt support WebP</li>
            <li>Preserve transparency in lossless PNG</li>
            <li>Prepare assets for Photoshop & other editors</li>
            <li>Export files for apps that dont support WebP</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
