"use client";

import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

import { useState } from "react";
import imageCompression from "browser-image-compression";
import ToolSection from "../components/ToolSection";

export default function ImageCompressorPage() {
  const [files, setFiles] = useState([]);
  const [quality, setQuality] = useState(0.7);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");

  async function handleCompress() {
    if (!files.length) return;
    setProcessing(true);
    setMessage("");
    const outputs = [];
    try {
      for (const file of files) {
        const compressed = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 2000,
          initialQuality: quality,
          useWebWorker: true,
        });
        const url = URL.createObjectURL(compressed);
        outputs.push({
          name: file.name,
          url,
          size: compressed.size,
          original: file.size,
        });
      }
      setResults(outputs);
      setMessage("✅ Compression completed!");
    } catch {
      setMessage("❌ Something went wrong!");
    } finally {
      setProcessing(false);
    }
  }

  function resetAll() {
    setFiles([]);
    setResults([]);
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Image Compressor"
      subtitle="Compress JPG/PNG/WebP images in your browser."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Image Compressor",
          description: "Compress images (JPG, PNG, WebP) without quality loss.",
          slug: "/image-compressor",
          category: "Utilities/Images",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Image Compressor", slug: "/image-compressor" },
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

      <div className="space-y-6">
        {/* File Upload */}
        <div className="border-2 border-dashed rounded-xl p-6 text-center hover:bg-slate-50 transition">
          <p className="text-gray-700 mb-2">📂 Drag & drop images or click below</p>
          <input
            className="file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border-0 
                       file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
          />
        </div>

        {/* Quality Slider */}
        <div className="flex items-center gap-3">
          <label className="text-sm">
            Quality: <span className="font-medium">{(quality * 100).toFixed(0)}%</span>
          </label>
          <input
            className="accent-indigo-600 w-56"
            type="range"
            min="0.2"
            max="0.95"
            step="0.05"
            value={quality}
            onChange={(e) => setQuality(parseFloat(e.target.value))}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={handleCompress}
            disabled={processing || !files.length}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 
                       text-white shadow-md hover:scale-105 transition disabled:opacity-60"
          >
            {processing ? "Compressing…" : "Compress"}
          </button>
          <button
            onClick={resetAll}
            className="px-5 py-2 rounded-lg border bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {results.map((r, idx) => (
              <div
                key={idx}
                className="border rounded-xl bg-white shadow hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={r.url}
                  alt={r.name}
                  className="w-full h-40 object-contain bg-slate-50"
                />
                <div className="p-3 text-sm">
                  <p className="truncate font-medium">{r.name}</p>
                  <p className="text-gray-500">
                    Original: {(r.original / 1024).toFixed(1)} KB → Compressed:{" "}
                    {(r.size / 1024).toFixed(1)} KB
                  </p>
                  <a
                    className="inline-block mt-2 px-4 py-1 bg-gradient-to-r from-gray-800 to-black 
                               text-white rounded hover:scale-105 transition"
                    href={r.url}
                    download={r.name}
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white shadow-md rounded-xl">
        <h3 className="text-lg font-semibold mb-2">About Online Image Compressor</h3>
        <p className="text-gray-700 mb-4">
          This free online tool lets you compress images (JPG, PNG, WebP) directly
          in your browser without uploading them to any server. It helps reduce
          file size while maintaining quality, making your images web-friendly and
          faster to load.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Compress images without losing much quality</li>
          <li>Adjust quality percentage with a slider</li>
          <li>Preview compressed results instantly</li>
          <li>Compare original vs compressed size</li>
          <li>Works fully offline in your browser</li>
          <li>Supports JPG, PNG, and WebP formats</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Select one or multiple images using the upload button.</li>
          <li>Adjust the quality slider to control compression level.</li>
          <li>Click <strong>Compress</strong> to process the images.</li>
          <li>Preview results and compare file sizes.</li>
          <li>Download compressed images directly to your device.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Practical Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Optimize website performance with smaller images</li>
          <li>Save storage space on devices</li>
          <li>Reduce image size before sharing on social media</li>
          <li>Email attachments that need smaller size</li>
          <li>Faster uploads to cloud storage</li>
        </ul>
      </section>
    </ToolSection>
  );
}
