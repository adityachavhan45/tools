"use client";

import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import { useState } from "react";

export default function JpgToWebpPage() {
  const [files, setFiles] = useState([]);
  const [quality, setQuality] = useState(0.9);
  const [outputs, setOutputs] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");

  async function convert() {
    if (!files.length) return;
    setProcessing(true);
    setMessage("");
    const results = [];

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

      const webpUrl = canvas.toDataURL("image/webp", quality);
      const name = file.name.replace(/\.(jpe?g)$/i, "");
      results.push({
        name: `${name}.webp`,
        url: webpUrl,
        original: file.size,
        converted: Math.round((webpUrl.length * 3) / 4), // approx size
      });

      URL.revokeObjectURL(url);
    }

    setOutputs(results);
    setProcessing(false);
    setMessage("✅ Conversion completed!");
  }

  function resetAll() {
    setFiles([]);
    setOutputs([]);
    setMessage("🧹 Cleared!");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <JsonLd
        data={buildToolJsonLd({
          name: "JPG to WebP",
          description: "Convert JPG images to modern WebP format in your browser.",
          slug: "/jpg-to-webp",
          category: "Utilities/Images",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "JPG to WebP", slug: "/jpg-to-webp" },
        ])}
      />

      {/* Toast Message */}
      {message && (
        <div
          className={`fixed top-5 right-5 px-4 py-2 rounded-lg shadow-lg text-white transition
          ${message.includes("✅") ? "bg-green-500" : ""}
          ${message.includes("❌") ? "bg-red-500" : ""}
          ${message.includes("🧹") ? "bg-blue-500" : ""}`}
        >
          {message}
        </div>
      )}

      <div className="max-w-5xl mx-auto py-10 px-5">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-slate-800">JPG to WebP Converter</h2>
          <p className="text-gray-600 mt-1">
            Convert JPG/JPEG images to modern WebP format instantly in your browser.
          </p>

          {/* File Upload */}
          <div className="mt-6 border-2 border-dashed rounded-xl p-6 text-center hover:bg-slate-50 transition">
            <p className="text-gray-700 mb-2">📂 Drag & drop JPG images or click below</p>
            <input
              type="file"
              accept="image/jpeg,image/jpg"
              multiple
              className="file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border-0 
                         file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
            />
          </div>

          {/* Quality Slider */}
          <div className="mt-6 flex items-center gap-3">
            <label className="text-sm">
              Quality: <span className="font-medium">{(quality * 100).toFixed(0)}%</span>
            </label>
            <input
              className="accent-indigo-600 w-56"
              type="range"
              min="0.3"
              max="1"
              step="0.05"
              value={quality}
              onChange={(e) => setQuality(parseFloat(e.target.value))}
            />
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3 flex-wrap">
            <button
              onClick={convert}
              disabled={processing || !files.length}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 
                         text-white shadow-md hover:scale-105 transition disabled:opacity-60"
            >
              {processing ? "Converting…" : "Convert"}
            </button>
            <button
              onClick={resetAll}
              className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200 transition"
              disabled={!files.length && !outputs.length}
            >
              Reset
            </button>
          </div>

          {/* Converted Outputs */}
          {outputs.length > 0 && (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {outputs.map((o, idx) => (
                <div
                  key={idx}
                  className="border rounded-xl bg-white shadow hover:shadow-lg transition p-3"
                >
                  <img src={o.url} alt={o.name} className="w-full h-40 object-contain bg-slate-50" />
                  <p className="mt-3 text-sm font-medium">{o.name}</p>
                  <p className="text-gray-500 text-xs">
                    {(o.original / 1024).toFixed(1)} KB → {(o.converted / 1024).toFixed(1)} KB
                  </p>
                  <a
                    className="mt-3 inline-block px-4 py-1 bg-gradient-to-r from-gray-800 to-black 
                               text-white rounded-lg hover:scale-105 transition"
                    href={o.url}
                    download={o.name}
                  >
                    Download WebP
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Section */}
        <section className="mt-10 bg-white shadow-md rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-2 text-slate-800">
            About JPG to WebP Converter
          </h3>
          <p className="text-gray-700 mb-4">
            WebP is a modern image format developed by Google that provides
            superior compression compared to JPG and PNG. This free tool helps
            you convert JPG/JPEG images into WebP instantly, directly in your
            browser without uploading files to a server.
          </p>

          <h4 className="font-semibold mt-4 mb-2 text-slate-800">✨ Key Features</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Convert JPG/JPEG images to WebP instantly</li>
            <li>Adjust quality using a slider</li>
            <li>Preview and download converted images</li>
            <li>Shows original vs converted size</li>
            <li>Works fully offline in your browser</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2 text-slate-800">🔧 How to Use</h4>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            <li>Select one or more JPG/JPEG files to upload.</li>
            <li>Adjust the quality slider (default 90%).</li>
            <li>Click <strong>Convert</strong> to process the images.</li>
            <li>Preview results and compare file sizes.</li>
            <li>Download the converted WebP images.</li>
          </ol>

          <h4 className="font-semibold mt-4 mb-2 text-slate-800">📦 Practical Use Cases</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Optimize website speed with smaller images</li>
            <li>Convert old JPG photos into modern format</li>
            <li>Prepare images for blogs and online portfolios</li>
            <li>Reduce storage size without losing much quality</li>
            <li>Improve SEO with WebP for Google PageSpeed</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
