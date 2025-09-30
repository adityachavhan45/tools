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
          An image compressor is a digital tool that reduces the file size of
          images without making them look blurry or pixelated. Large image files
          often slow down websites, increase storage usage, and make sharing
          difficult on low-bandwidth networks. This tool allows you to compress
          images directly in your browser—no software installation, no server
          uploads, and no privacy risks. Everything happens locally on your
          device, which means your pictures never leave your computer. By using
          this compressor, you can create lighter, web-optimized images that load
          faster and perform better on all devices.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>High-quality compression:</strong> Reduce file sizes
            significantly while maintaining visual clarity.
          </li>
          <li>
            <strong>Multiple format support:</strong> Works with JPG, PNG, and
            WebP images, which are the most widely used formats online.
          </li>
          <li>
            <strong>Real-time preview:</strong> Instantly compare original vs.
            compressed size and quality before downloading.
          </li>
          <li>
            <strong>Customizable compression:</strong> Adjust quality using a
            slider to balance between file size and image sharpness.
          </li>
          <li>
            <strong>Privacy friendly:</strong> All compression runs in your
            browser without uploading files to external servers.
          </li>
          <li>
            <strong>Batch processing:</strong> Compress multiple images at once
            and download them individually.
          </li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          <li>Upload one or more images using the file picker or drag & drop option.</li>
          <li>Adjust the quality slider (default is 70%) to set your compression level.</li>
          <li>Click <strong>Compress</strong> and wait for the tool to process your files.</li>
          <li>Preview the output images and compare original vs. compressed size.</li>
          <li>Download compressed images with a single click.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Practical Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Website optimization:</strong> Smaller images improve page
            speed, which boosts SEO rankings and user experience.
          </li>
          <li>
            <strong>Social media sharing:</strong> Platforms like Instagram,
            Facebook, and Twitter compress uploads automatically—using your own
            compressor ensures better quality at smaller sizes.
          </li>
          <li>
            <strong>Email attachments:</strong> Many email providers have file
            size limits; compressing ensures images stay under the limit.
          </li>
          <li>
            <strong>Cloud storage:</strong> Reduce storage costs and upload
            times by keeping images lighter.
          </li>
          <li>
            <strong>Mobile usage:</strong> Save storage space and bandwidth on
            smartphones by compressing images before sharing.
          </li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">📖 Why Image Compression Matters</h4>
        <p className="text-gray-700 mb-4">
          Images make up a large portion of modern websites, sometimes more than
          60% of total page weight. Without compression, they can slow down
          websites dramatically, especially on slower networks. Google and other
          search engines use page load speed as a ranking factor, which means
          compressing images not only improves performance but also SEO. Beyond
          web performance, compression helps individuals save disk space,
          reduces data usage, and ensures faster sharing over chat apps and
          emails.
        </p>

        <h4 className="font-semibold mt-4 mb-1">🌍 Everyday Benefits</h4>
        <p className="text-gray-700 mb-4">
          Think of all the times you have tried to send photos over WhatsApp or
          Gmail only to see &ldquo;file size too large.&rdquo; An image compressor solves
          this instantly. Travelers can save precious storage space on phones,
          photographers can quickly share previews with clients, and students
          can upload projects faster to online portals. Even businesses benefit,
          as lighter images reduce hosting costs and bandwidth consumption.
        </p>

        <h4 className="font-semibold mt-4 mb-1">⚠️ Limitations and Best Practices</h4>
        <p className="text-gray-700 mb-4">
          While compression reduces file size, over-compression can make images
          blurry or pixelated. The trick is to balance quality with size. For
          photos, 60–80% quality works best; for graphics or UI elements, a
          slightly higher setting may be necessary. Another best practice is to
          choose modern formats like WebP, which offer better compression ratios
          than traditional JPG or PNG. Also, always keep a backup of original
          images before compressing, especially for professional or archival use.
        </p>

        <h4 className="font-semibold mt-4 mb-1">💡 Final Thoughts</h4>
        <p className="text-gray-700">
          Image compression may seem like a small step, but it creates a massive
          impact on performance, storage, and usability. From faster-loading
          websites to smoother sharing on social media, compressed images are
          essential in today’s digital world. This online image compressor
          provides a safe, quick, and reliable solution directly in your browser.
          Whether you are a developer, designer, student, or casual user, this
          tool ensures your images are always optimized, lightweight, and ready
          for any platform.
        </p>
      </section>
    </ToolSection>
  );
}
