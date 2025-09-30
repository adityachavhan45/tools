"use client";

import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import { useState } from "react";

export default function SvgToPngPage() {
  const [file, setFile] = useState(null);
  const [scale, setScale] = useState(2);
  const [out, setOut] = useState("");
  const [message, setMessage] = useState("");

  async function convert() {
    if (!file) return;
    try {
      const text = await file.text();
      const svg = new Blob([text], { type: "image/svg+xml" });
      const url = URL.createObjectURL(svg);
      const img = new Image();
      await new Promise((res, rej) => {
        img.onload = res;
        img.onerror = rej;
        img.src = url;
      });
      const width = img.width || 512;
      const height = img.height || 512;
      const canvas = document.createElement("canvas");
      canvas.width = Math.ceil(width * scale);
      canvas.height = Math.ceil(height * scale);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const png = canvas.toDataURL("image/png");
      setOut(png);
      setMessage("✅ Conversion successful!");
      URL.revokeObjectURL(url);
    } catch {
      setMessage("❌ Failed to convert SVG. Please try again.");
    }
  }

  function resetAll() {
    setFile(null);
    setOut("");
    setMessage("🧹 Cleared!");
    setTimeout(() => setMessage(""), 1500);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-8">
      <JsonLd
        data={buildToolJsonLd({
          name: "SVG to PNG",
          description: "Convert SVG vector images to PNG bitmaps instantly.",
          slug: "/svg-to-png",
          category: "Utilities/Images",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "SVG to PNG", slug: "/svg-to-png" },
        ])}
      />

      <div className="max-w-3xl mx-auto px-4">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">
            SVG to PNG Converter
          </h2>
          <p className="text-gray-600 mt-1">
            Convert scalable SVG files into PNG images with adjustable scaling.
          </p>

          {message && (
            <div className="mt-3 px-4 py-2 bg-gray-100 border rounded-lg text-gray-700 text-sm shadow-sm">
              {message}
            </div>
          )}

          {/* Upload Input */}
          <div className="mt-5 space-y-4">
            <label className="block">
              <input
                type="file"
                accept="image/svg+xml"
                onChange={(e) => setFile((e.target.files || [])[0] || null)}
                className="block w-full text-sm text-gray-600 
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-lg file:border-0
                           file:text-sm file:font-semibold
                           file:bg-slate-900 file:text-white
                           hover:file:bg-slate-800 cursor-pointer"
              />
            </label>
            {file && (
              <p className="text-sm text-gray-500">
                Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </p>
            )}

            {/* Scale Slider */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">
                Scale: {scale}x
              </label>
              <input
                type="range"
                min="1"
                max="8"
                step="1"
                value={scale}
                onChange={(e) => setScale(parseInt(e.target.value, 10))}
                className="flex-1 accent-slate-900"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                className={`flex-1 px-5 py-2.5 rounded-lg font-medium shadow transition
                ${!file
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-slate-900 text-white hover:bg-slate-800"}`}
                disabled={!file}
                onClick={convert}
              >
                Convert
              </button>
              <button
                onClick={resetAll}
                disabled={!file && !out}
                className={`flex-1 px-5 py-2.5 rounded-lg font-medium shadow transition
                ${!file && !out
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-red-500 text-white hover:bg-red-600"}`}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Output Preview */}
          {out && (
            <div className="mt-6 border rounded-xl p-4 bg-gray-50 shadow-sm">
              <img
                src={out}
                alt="PNG output"
                className="max-w-full h-auto border rounded"
              />
              <a
                className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition"
                href={out}
                download="output.png"
              >
                Download PNG
              </a>
            </div>
          )}
        </div>

        {/* Info Section */}
        <section className="mt-10 bg-white border rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            About SVG to PNG Converter
          </h3>
          <p className="text-gray-700 mb-4">
            The SVG to PNG converter is a simple but powerful tool that lets you
            transform scalable vector graphics into raster PNG images directly in
            your browser. SVG files are resolution-independent, meaning they can
            scale to any size without losing sharpness. PNG files, on the other hand,
            are raster-based and widely supported across websites, social media,
            apps, and design tools. This converter bridges the gap between these
            two formats, allowing you to prepare web-ready images in seconds without
            the need for heavy desktop software.
          </p>

          <p className="text-gray-700 mb-4">
            Why does this matter? Many platforms and applications do not support SVG
            natively, even though designers love the format for its scalability.
            When you upload a logo, icon, or illustration to social media or content
            management systems, they often require PNG or JPG files. With this tool,
            you can take any vector artwork and export it into a clean, sharp PNG
            with adjustable scaling factors. That means whether you need a small
            favicon or a large presentation image, the quality remains top-notch.
          </p>

          <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Convert SVG vector graphics into PNG instantly</li>
            <li>Adjust scaling from 1× to 8× to control resolution</li>
            <li>Preview output directly in your browser</li>
            <li>Download PNG images in one click</li>
            <li>Runs locally – no server uploads, 100% private</li>
            <li>Lightweight, fast, and mobile-friendly</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            <li>Select an SVG file from your device using the file picker.</li>
            <li>Adjust the scale slider to choose output size (from 1× to 8×).</li>
            <li>Click the <strong>Convert</strong> button to render the PNG image.</li>
            <li>Preview the result and download it instantly to your device.</li>
            <li>Use the <strong>Reset</strong> button anytime to start fresh.</li>
          </ol>

          <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li><strong>Logos & Branding:</strong> Convert scalable logos into PNG format for websites, apps, and business cards.</li>
            <li><strong>Social Media:</strong> Prepare graphics for Instagram, Twitter, Facebook, and LinkedIn posts.</li>
            <li><strong>UI/UX Design:</strong> Export icons from SVG to PNG for use in design systems or prototypes.</li>
            <li><strong>Presentations:</strong> Insert PNG versions of illustrations into PowerPoint or Google Slides.</li>
            <li><strong>Web Development:</strong> Generate raster fallbacks for browsers or apps that do not support SVG.</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-1">💡 Advantages of Using This Tool</h4>
          <p className="text-gray-700 mb-4">
            The biggest advantage is privacy and speed. Unlike online converters
            that upload your images to external servers, this SVG to PNG tool runs
            completely inside your browser using HTML5 canvas. That means your files
            never leave your computer, ensuring full data security. The conversion
            is also instant – no waiting for servers or downloads. It works even
            offline once the page is loaded, making it perfect for quick design
            tasks.
          </p>
          <p className="text-gray-700 mb-4">
            Another advantage is control over scaling. By adjusting the output
            multiplier, you can generate high-resolution PNGs for print or
            low-resolution versions optimized for web. This flexibility is extremely
            useful for designers who want to create multiple versions of the same
            graphic without opening heavyweight apps like Illustrator or Photoshop.
          </p>

          <h4 className="font-semibold mt-4 mb-1">🙋 Frequently Asked Questions</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Does it support transparency?</strong> Yes, PNG files preserve transparency by default.</li>
            <li><strong>Will the quality be reduced?</strong> No, scaling ensures sharp output, but keep in mind PNG is raster-based.</li>
            <li><strong>Can I batch convert multiple SVG files?</strong> Currently, one file at a time, but you can repeat as needed.</li>
            <li><strong>Is it free to use?</strong> Absolutely – no limits, no hidden costs.</li>
            <li><strong>Do I need to install software?</strong> No installation required; it runs directly in your browser.</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-1">🚀 Final Thoughts</h4>
          <p className="text-gray-700">
            SVG files are amazing for design and development, but not every platform
            supports them. PNG is a universal format that works everywhere. With this
            free SVG to PNG converter, you can instantly generate high-quality raster
            images, scale them to your needs, and keep full control of your files.
            Whether you are a designer preparing social media assets, a developer
            building websites, or a business owner creating marketing material, this
            tool saves time and makes your workflow smoother. Try it today and enjoy
            fast, private, and reliable conversions.
          </p>
        </section>
      </div>
    </main>
  );
}
