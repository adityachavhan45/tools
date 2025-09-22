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
            About SVG to PNG Tool
          </h3>
          <p className="text-gray-700 mb-4">
            SVG (Scalable Vector Graphics) files are resolution-independent,
            meaning they can be scaled without losing quality. This tool helps
            you convert SVGs into PNG images for use on websites, apps, and
            documents where raster formats are required.
          </p>

          {/* Features */}
          <div className="mt-6">
            <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-2">
              <span className="text-yellow-500 mr-2">✨</span> Features
            </h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1 pl-2">
              <li>Instantly convert SVG to PNG</li>
              <li>Adjust scaling from 1x to 8x</li>
              <li>Preview and download PNG results</li>
              <li>Works directly in your browser</li>
            </ul>
          </div>

          {/* How to Use */}
          <div className="mt-6">
            <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-2">
              <span className="text-green-600 mr-2">🔧</span> How to Use
            </h4>
            <ol className="list-decimal list-inside text-gray-700 space-y-1 pl-2">
              <li>Select an SVG file from your device.</li>
              <li>Adjust the scaling factor with the slider.</li>
              <li>
                Click <strong>Convert</strong> to generate a PNG.
              </li>
              <li>Preview and download your PNG image.</li>
            </ol>
          </div>

          {/* Use Cases */}
          <div className="mt-6">
            <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-2">
              <span className="text-orange-500 mr-2">📦</span> Use Cases
            </h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1 pl-2">
              <li>Convert SVG logos into PNG for websites</li>
              <li>Prepare graphics for social media</li>
              <li>Export scalable designs into raster images</li>
              <li>Use PNG format in apps that don’t support SVG</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
