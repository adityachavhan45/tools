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
            This free tool lets you resize images instantly in your browser. You
            can set custom width and height, lock aspect ratio, and download the
            result in PNG, JPG, or WebP format. No server upload required.
          </p>

          <h4 className="font-semibold mt-4 mb-2 text-slate-800">✨ Key Features</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Resize images with custom width and height</li>
            <li>Keep or unlock aspect ratio</li>
            <li>Choose output format: PNG, JPG, or WebP</li>
            <li>Fast processing inside your browser (secure & offline)</li>
            <li>Download resized image instantly</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2 text-slate-800">🔧 How to Use</h4>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            <li>Upload your image using the file input.</li>
            <li>Enter desired width and/or height.</li>
            <li>Enable <strong>Keep aspect</strong> if you want proportional resize.</li>
            <li>Select output format (PNG, JPG, WebP).</li>
            <li>Click Resize and download the result.</li>
          </ol>

          <h4 className="font-semibold mt-4 mb-2 text-slate-800">📦 Practical Use Cases</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Prepare images for websites or blogs</li>
            <li>Optimize profile pictures for social media</li>
            <li>Resize photos before emailing</li>
            <li>Convert to WebP for faster web performance</li>
            <li>Create thumbnails for projects</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
