"use client";

import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

// metadata is defined in server wrapper page.js

import { useState } from "react";

export default function WebpToPngPage() {
  const [files, setFiles] = useState([]);
  const [outputs, setOutputs] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");

  async function convert() {
    if (!files.length) return;
    setProcessing(true);
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
      const out = canvas.toDataURL("image/png");
      const name = file.name.replace(/\.webp$/i, "");
      results.push({ name: `${name}.png`, url: out });
      URL.revokeObjectURL(url);
    }
    setOutputs(results);
    setMessage(`✅ Converted ${results.length} file(s) successfully!`);
    setProcessing(false);
  }

  function reset() {
    setFiles([]);
    setOutputs([]);
    setMessage("");
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <JsonLd
        data={buildToolJsonLd({
          name: "WebP to PNG",
          description: "Convert WebP images to PNG quickly in your browser.",
          slug: "/webp-to-png",
          category: "Utilities/Images",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "WebP to PNG", slug: "/webp-to-png" },
        ])}
      />
      <div className="max-w-5xl mx-auto p-4">
        <h2 className="text-xl font-semibold">WebP to PNG</h2>
        <p className="text-gray-600 mt-1">
          Convert WebP images to PNG easily, all inside your browser.
        </p>

        <div className="mt-4 space-y-3">
          <input
            type="file"
            accept="image/webp"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
          />
          <p className="text-sm text-gray-500">
            Selected: {files.length} file(s)
          </p>
          {message && <p className="text-green-600 text-sm">{message}</p>}

          <div className="flex gap-2">
            <button
              onClick={convert}
              disabled={processing || !files.length}
              className="px-5 py-2 bg-slate-900 text-white rounded disabled:opacity-60"
            >
              {processing ? "Converting…" : "Convert"}
            </button>
            <button
              onClick={reset}
              className="px-5 py-2 border rounded disabled:opacity-60"
              disabled={!files.length && !outputs.length}
            >
              Reset
            </button>
          </div>
        </div>

        {outputs.length > 0 && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {outputs.map((o, idx) => (
              <div key={idx} className="border rounded p-3">
                <img src={o.url} alt={o.name} className="w-full h-auto" />
                <a
                  className="mt-2 inline-block px-3 py-1 bg-gray-800 text-white rounded"
                  href={o.url}
                  download={o.name}
                >
                  Download PNG
                </a>
              </div>
            ))}
          </div>
        )}

                {/* SEO Info Section */}
        <div className="mt-10 p-4 border rounded bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-2">About WebP to PNG Converter</h3>
          <p className="text-gray-700 text-sm mb-4">
            WebP is a modern image format introduced by Google that offers superior
            compression and smaller file sizes without compromising much on quality.
            It is widely used across websites to improve loading speed and reduce
            bandwidth usage. However, WebP is not universally supported — many
            older software, design tools, and certain apps cannot open or edit WebP
            images. This is where a WebP to PNG converter becomes essential. By
            converting your WebP files into PNG format, you ensure maximum
            compatibility across platforms, editing software, and publishing tools.
          </p>

          <h4 className="font-medium mt-4 mb-2">✨ Key Features</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>Fast, browser-based conversion (no server upload needed).</li>
            <li>Retains transparency and image quality during conversion.</li>
            <li>Supports multiple WebP files in one go.</li>
            <li>Instant preview before downloading converted PNGs.</li>
            <li>Lightweight, secure, and completely free to use.</li>
          </ul>

          <h4 className="font-medium mt-4 mb-2">🔧 How to Use</h4>
          <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
            <li>Click the upload button or drag & drop your WebP files.</li>
            <li>Wait for the tool to process and preview the images.</li>
            <li>Click <strong>Convert</strong> and download PNG versions instantly.</li>
            <li>Use the Reset button to clear and start fresh with new files.</li>
          </ol>

          <h4 className="font-medium mt-4 mb-2">📦 Practical Use Cases</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li><strong>Designers:</strong> Import PNG into Photoshop, Illustrator, or Figma.</li>
            <li><strong>Developers:</strong> Use PNG for apps or CMSs that don’t support WebP.</li>
            <li><strong>Marketers:</strong> Ensure brand assets are usable across all platforms.</li>
            <li><strong>Students:</strong> Convert WebP screenshots for reports or presentations.</li>
            <li><strong>General Users:</strong> Share universally supported PNG files via email or social media.</li>
          </ul>

          <h4 className="font-medium mt-4 mb-2">📐 Why Convert WebP to PNG?</h4>
          <p className="text-gray-700 text-sm mb-4">
            Although WebP is great for web performance, PNG is still the preferred
            format for design and editing due to its lossless quality and transparency
            support. Converting ensures you can open images on any device or software
            without compatibility issues. If you frequently work with image editing
            tools or need alpha channel transparency, PNG is often the best choice.
          </p>

          <h4 className="font-medium mt-4 mb-2">⚡ Best Practices</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>Use WebP for website speed optimization but keep PNG for editing.</li>
            <li>Always keep a backup of original files before conversion.</li>
            <li>For logos, graphics, or transparent images — PNG works best.</li>
            <li>Batch convert when dealing with multiple assets for projects.</li>
          </ul>

          <h4 className="font-medium mt-4 mb-2">🚀 Final Thoughts</h4>
          <p className="text-gray-700 text-sm">
            This WebP to PNG converter is a simple yet powerful tool for anyone
            working with images. It removes the barrier of format incompatibility
            and ensures your files can be edited, shared, and published anywhere
            without restrictions. Whether you are a designer, developer, student,
            or casual user, this converter saves time, ensures quality, and makes
            your workflow smoother. Use it anytime you need quick, reliable, and
            free WebP to PNG conversion directly in your browser.
          </p>
        </div>
      </div>
    </main>
  );
}
