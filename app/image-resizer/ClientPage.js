"use client";

import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import { useState } from "react";

export default function ImageResizerPage() {
  const [file, setFile] = useState(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(0);
  const [keepAspect, setKeepAspect] = useState(true);
  const [format, setFormat] = useState("png");
  const [outUrl, setOutUrl] = useState("");
  const [message, setMessage] = useState("");

  async function resize() {
    if (!file) return;
    const img = new Image();
    const url = URL.createObjectURL(file);
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = url;
    });

    let targetW = width || img.width;
    let targetH = height || img.height;

    if (keepAspect && width && !height)
      targetH = Math.round((img.height / img.width) * targetW);
    if (keepAspect && height && !width)
      targetW = Math.round((img.width / img.height) * targetH);

    const canvas = document.createElement("canvas");
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, targetW, targetH);

    const mimeType =
      format === "jpg" ? "image/jpeg" : format === "webp" ? "image/webp" : "image/png";

    const out = canvas.toDataURL(mimeType, 0.95);
    setOutUrl(out);
    showMessage("✅ Image resized successfully!", "success");
    URL.revokeObjectURL(url);
  }

  function resetAll() {
    setFile(null);
    setWidth(800);
    setHeight(0);
    setOutUrl("");
    showMessage("🧹 Reset done!", "info");
  }

  function showMessage(msg, type) {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(""), 2000);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <JsonLd
        data={buildToolJsonLd({
          name: "Image Resizer",
          description: "Resize images by width and height proportionally.",
          slug: "/image-resizer",
          category: "Utilities/Images",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Image Resizer", slug: "/image-resizer" },
        ])}
      />

      {/* Toast Message */}
      {message.text && (
        <div
          className={`fixed top-5 right-5 px-4 py-2 rounded-lg shadow-lg text-white transition
          ${message.type === "success" ? "bg-green-500" : ""}
          ${message.type === "error" ? "bg-red-500" : ""}
          ${message.type === "info" ? "bg-blue-500" : ""}`}
        >
          {message.text}
        </div>
      )}

      <div className="max-w-5xl mx-auto py-10 px-5">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-slate-800">Image Resizer</h2>
          <p className="text-gray-600 mt-1">
            Resize images online with optional aspect ratio lock and format selection.
          </p>

          {/* File Upload */}
          <div className="mt-6 border-2 border-dashed rounded-xl p-6 text-center hover:bg-slate-50 transition">
            <p className="text-gray-700 mb-2">📂 Drag & drop image or click below</p>
            <input
              type="file"
              accept="image/*"
              className="file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border-0 
                         file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
              onChange={(e) => setFile((e.target.files || [])[0] || null)}
            />
          </div>

          {/* Controls */}
          <div className="mt-6 flex flex-wrap gap-4 items-end">
            <div>
              <label className="text-sm">Width (px)</label>
              <input
                className="block p-2 border rounded-lg w-28 font-mono"
                type="number"
                value={width}
                onChange={(e) => setWidth(parseInt(e.target.value || "0", 10))}
              />
            </div>
            <div>
              <label className="text-sm">Height (px)</label>
              <input
                className="block p-2 border rounded-lg w-28 font-mono"
                type="number"
                value={height}
                onChange={(e) => setHeight(parseInt(e.target.value || "0", 10))}
              />
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={keepAspect}
                onChange={(e) => setKeepAspect(e.target.checked)}
              />{" "}
              Keep aspect
            </label>

            <label className="flex items-center gap-2">
              Format:
              <select
                className="p-2 border rounded-lg"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
              >
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
                <option value="webp">WebP</option>
              </select>
            </label>

            <button
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 
                         text-white shadow-md hover:scale-105 transition disabled:opacity-60"
              onClick={resize}
              disabled={!file}
            >
              Resize
            </button>
            <button
              className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200 transition"
              onClick={resetAll}
            >
              Reset
            </button>
          </div>

          {/* Output Preview */}
          {outUrl && (
            <div className="mt-8 bg-slate-50 rounded-xl shadow-inner p-4">
              <h4 className="font-semibold text-slate-800 mb-3">Preview</h4>
              <img
                src={outUrl}
                alt="Resized"
                className="max-w-full h-auto border rounded-lg shadow"
              />
              <a
                className="mt-3 inline-block px-4 py-2 bg-gradient-to-r from-gray-800 to-black 
                           text-white rounded-lg hover:scale-105 transition"
                href={outUrl}
                download={`resized.${format}`}
              >
                Download {format.toUpperCase()}
              </a>
            </div>
          )}
        </div>

                {/* Info Section */}
        <section className="mt-10 bg-white shadow-md rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-2 text-slate-800">
            About Online Image Resizer
          </h3>
          <p className="text-gray-700 mb-4">
            Image resizing is one of the most common tasks in digital workflows. Whether you are 
            preparing photos for your website, optimizing images for social media, or simply reducing 
            file size before sending them via email, this free online image resizer makes the job quick, 
            simple, and reliable. Everything happens directly in your browser, so no images are uploaded 
            to external servers — ensuring both speed and privacy.
          </p>

          <h4 className="font-semibold mt-4 mb-2 text-slate-800">✨ Key Features</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Resize images with custom width and height inputs</li>
            <li>Option to keep or unlock aspect ratio for proportional scaling</li>
            <li>Support for PNG, JPG, and WebP formats</li>
            <li>High-quality rendering with browser-based processing</li>
            <li>Instant preview before downloading</li>
            <li>Completely free, secure, and works offline</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2 text-slate-800">🔧 How to Use</h4>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            <li>Upload your image using the file selector or drag &amp; drop area.</li>
            <li>Enter desired width and/or height in pixels.</li>
            <li>Enable <strong>Keep aspect</strong> if you want proportional resizing.</li>
            <li>Choose output format (PNG, JPG, or WebP) based on your needs.</li>
            <li>Click <strong>Resize</strong> to process and then download instantly.</li>
          </ol>

          <h4 className="font-semibold mt-4 mb-2 text-slate-800">📐 Common Dimensions Guide</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Instagram Post: 1080 × 1080 px (square)</li>
            <li>Instagram Story / Reel: 1080 × 1920 px (vertical)</li>
            <li>Facebook Cover: 820 × 312 px</li>
            <li>YouTube Thumbnail: 1280 × 720 px</li>
            <li>HD Wallpaper: 1920 × 1080 px</li>
            <li>E-commerce Product Image: 2000 × 2000 px (high resolution)</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2 text-slate-800">⚡ Why Image Resizing Matters</h4>
          <p className="text-gray-700 mb-4">
            Properly sized images not only look professional but also improve performance. Oversized 
            images slow down websites, increase bounce rates, and can negatively impact SEO rankings. 
            On the other hand, images that are too small may appear blurry or pixelated. By resizing 
            images smartly, you strike the perfect balance between quality and performance.
          </p>

          <h4 className="font-semibold mt-4 mb-2 text-slate-800">💡 Best Practices</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Avoid unnecessary upscaling — it may reduce sharpness.</li>
            <li>Use JPG for photos, PNG for graphics with transparency, and WebP for best balance of size and quality.</li>
            <li>Always keep aspect ratio enabled unless you need custom dimensions.</li>
            <li>Compress images further if preparing for web or mobile apps.</li>
            <li>Preview the result before downloading to ensure correct proportions.</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2 text-slate-800">📦 Practical Use Cases</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Preparing hero banners and blog images for websites</li>
            <li>Optimizing profile pictures and cover photos for social media</li>
            <li>Resizing product images for e-commerce stores</li>
            <li>Creating email-friendly attachments with smaller file sizes</li>
            <li>Generating lightweight images for presentations and documents</li>
            <li>Converting to WebP for improved page speed and SEO performance</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2 text-slate-800">🚀 Final Thoughts</h4>
          <p className="text-gray-700">
            Traditional image editing software can be bulky, expensive, and slow for quick tasks. 
            This online Image Resizer provides a simple alternative — no installation, no learning curve, 
            and no risk to your privacy. Whether you are a web designer, digital marketer, student, or 
            casual user, this tool saves time and ensures your images are always in the right size and 
            format. Resize, optimize, and share your visuals faster than ever!
          </p>
        </section>
      </div>
    </main>
  );
}
