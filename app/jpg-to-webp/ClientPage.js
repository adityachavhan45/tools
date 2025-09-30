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
            JPG (or JPEG) is one of the most popular image formats in the
            world, widely used for photos, digital art, and web content.
            However, as websites and apps have become more performance-focused,
            the need for modern formats like WebP has grown rapidly. WebP was
            developed by Google to provide both lossless and lossy compression
            in a way that balances image quality with smaller file sizes. 
            Converting JPG to WebP ensures faster loading, reduced storage,
            and better SEO scores for modern websites.
          </p>

          <h4 className="font-semibold mt-4 mb-2 text-slate-800">✨ Key Features</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Convert JPG/JPEG images into WebP instantly inside your browser</li>
            <li>Adjust quality percentage using a simple slider</li>
            <li>Preview the converted output before downloading</li>
            <li>Compare original size vs optimized WebP size</li>
            <li>No server uploads — works securely offline</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2 text-slate-800">🔧 How to Use</h4>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            <li>Upload one or more JPG/JPEG images using the file picker.</li>
            <li>Adjust the <strong>Quality Slider</strong> (default: 90%) to
            control compression strength.</li>
            <li>Click <strong>Convert</strong> and wait for processing.</li>
            <li>Preview converted images and check the file size reduction.</li>
            <li>Download your optimized WebP images directly to your device.</li>
          </ol>

          <h4 className="font-semibold mt-4 mb-2 text-slate-800">📦 Practical Use Cases</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li><strong>Website Optimization:</strong> Reduce load time and improve Core Web Vitals by serving lighter WebP images.</li>
            <li><strong>SEO Improvement:</strong> Faster pages = better rankings. Google PageSpeed highly recommends WebP.</li>
            <li><strong>Social Media:</strong> Compress high-resolution JPGs into smaller WebP for easier sharing.</li>
            <li><strong>Storage Saving:</strong> Save device or cloud storage by reducing image sizes without major quality loss.</li>
            <li><strong>E-commerce:</strong> Display high-quality product photos that load quickly on all devices.</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2 text-slate-800">⚡ Benefits of Converting to WebP</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li><strong>Smaller File Size:</strong> WebP can reduce size by 25–35% compared to JPG while keeping good quality.</li>
            <li><strong>Transparency Support:</strong> Like PNG, WebP supports alpha transparency with small file sizes.</li>
            <li><strong>Animation Support:</strong> WebP can also handle simple animations, unlike static JPG.</li>
            <li><strong>Cross-Browser Support:</strong> Supported by Chrome, Edge, Firefox, Safari, and most modern apps.</li>
            <li><strong>Better User Experience:</strong> Faster images = less bounce rate and higher conversions.</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2 text-slate-800">📖 Example</h4>
          <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800 overflow-x-auto">
            Original JPG: 1.2 MB  
            Converted WebP (90% quality): 320 KB  
            Savings: ~73% smaller
          </pre>

          <h4 className="font-semibold mt-4 mb-2 text-slate-800">🔒 Security & Privacy</h4>
          <p className="text-gray-700 mb-4 text-sm">
            This converter runs entirely inside your browser using JavaScript
            and Canvas API. That means your images are never uploaded to any
            external server. Everything stays local to your device, ensuring
            100% privacy. You can safely use it for personal photos, business
            assets, or sensitive images without worrying about leaks.
          </p>

          <h4 className="font-semibold mt-4 mb-2 text-slate-800">❓ FAQs</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
            <li><strong>Q: Does WebP lose quality?</strong><br/> 
              A: Not necessarily. At 85–90% quality, WebP retains almost identical visual quality to JPG but with smaller size.</li>
            <li><strong>Q: Can all browsers open WebP?</strong><br/> 
              A: Yes, all modern browsers and Android/iOS devices now support WebP.</li>
            <li><strong>Q: Is WebP better than PNG?</strong><br/> 
              A: For most cases, yes. WebP offers smaller size with transparency support, though PNG may still be useful for pixel art.</li>
            <li><strong>Q: Can I batch convert multiple JPGs?</strong><br/> 
              A: Yes, this tool supports multiple file uploads at once.</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2 text-slate-800">🚀 Final Thoughts</h4>
          <p className="text-gray-700 text-sm">
            Switching from JPG to WebP is one of the easiest performance
            upgrades for any modern website or application. With smaller image
            sizes, better compression, and wide browser support, WebP is a
            future-proof choice. This tool makes the process effortless —
            upload, adjust quality, convert, and download. No software, no
            plugins, just instant results. Whether you are a blogger, web
            developer, student, or business owner, this JPG to WebP converter
            ensures your images are optimized for today’s internet speed and
            tomorrow’s technology.
          </p>
        </section>
      </div>
    </main>
  );
}
