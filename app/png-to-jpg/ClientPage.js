"use client";

import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import { useState, useCallback } from "react";

export default function PngToJpgPage() {
  const [files, setFiles] = useState([]);
  const [quality, setQuality] = useState(0.9);
  const [outputs, setOutputs] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");

  const onDrop = useCallback((e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.includes("png")
    );
    setFiles((prev) => [...prev, ...droppedFiles]);
  }, []);

  async function convert() {
    if (!files.length) return;
    setProcessing(true);
    setMessage("");
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
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const jpgUrl = canvas.toDataURL("image/jpeg", quality);
        results.push({
          name: file.name.replace(/\.png$/i, "") + ".jpg",
          url: jpgUrl,
          size: Math.round((jpgUrl.length * 3) / 4 / 1024),
        });
        URL.revokeObjectURL(url);
      }
      setOutputs(results);
      setMessage("✅ Conversion successful!");
    } catch {
      setMessage("❌ Conversion failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  }

  function resetAll() {
    setFiles([]);
    setOutputs([]);
    setMessage("🧹 Cleared!");
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <JsonLd
        data={buildToolJsonLd({
          name: "PNG to JPG",
          description: "Convert PNG images to JPG online in your browser.",
          slug: "/png-to-jpg",
          category: "Utilities/Images",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "PNG to JPG", slug: "/png-to-jpg" },
        ])}
      />

      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-6 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800">
            PNG to JPG Converter
          </h2>
          <p className="text-gray-600 mt-2">
            Convert PNG images to JPG format with adjustable quality.
          </p>

          {message && (
            <div className="mt-3 px-4 py-2 bg-gray-100 border rounded-lg text-gray-700 text-sm">
              {message}
            </div>
          )}

          {/* Drag & Drop Zone */}
          <div
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            className="mt-5 border-2 border-dashed border-gray-400 rounded-xl p-8 text-center cursor-pointer hover:bg-gray-50 transition"
          >
            <p className="text-gray-600">
              Drag & Drop PNG files here or{" "}
              <label className="text-blue-600 cursor-pointer">
                <input
                  type="file"
                  accept="image/png"
                  multiple
                  className="hidden"
                  onChange={(e) =>
                    setFiles(Array.from(e.target.files || []))
                  }
                />
                <span className="underline">browse</span>
              </label>
            </p>
          </div>

          {/* File Preview */}
          {files.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {files.map((file, idx) => (
                <div
                  key={idx}
                  className="rounded-lg overflow-hidden shadow-md border bg-white"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-full h-28 object-cover"
                  />
                  <p className="px-2 py-1 text-xs text-gray-600 truncate">
                    {file.name}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Quality Slider */}
          <div className="flex items-center gap-3 mt-5">
            <label className="text-sm font-medium">
              Quality: {(quality * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min="0.3"
              max="1"
              step="0.05"
              value={quality}
              className="accent-slate-900 flex-1"
              onChange={(e) => setQuality(parseFloat(e.target.value))}
            />
          </div>

          {/* ✅ Fixed Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={convert}
              disabled={processing || !files.length}
              className={`flex-1 px-6 py-3 font-semibold rounded-xl transition-all 
                ${processing || !files.length
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-lg"}`}
            >
              {processing ? "Converting…" : "Convert"}
            </button>

            <button
              onClick={resetAll}
              disabled={!files.length && !outputs.length}
              className={`flex-1 px-6 py-3 font-semibold rounded-xl transition-all 
                ${!files.length && !outputs.length
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg"}`}
            >
              Reset
            </button>
          </div>

          {/* Progress Bar */}
          {processing && (
            <div className="mt-5 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className="bg-slate-900 h-2 rounded-full animate-pulse w-3/4"></div>
            </div>
          )}

          {/* Output */}
          {outputs.length > 0 && (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {outputs.map((o, idx) => (
                <div
                  key={idx}
                  className="border rounded-xl shadow bg-white p-4 flex flex-col items-center"
                >
                  <img
                    src={o.url}
                    alt={o.name}
                    className="w-full h-40 object-cover rounded"
                  />
                  <p className="text-sm text-gray-600 mt-2 font-medium">
                    {o.name} ({o.size} KB)
                  </p>
                  <a
                    className="mt-3 px-4 py-1.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
                    href={o.url}
                    download={o.name}
                  >
                    Download JPG
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ℹ️ Info Section */}
        <section className="mt-10 bg-white border rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            About PNG to JPG Tool
          </h3>
          <p className="text-gray-700 mb-4">
            This free online tool converts PNG images into JPG format directly
            in your browser. JPG images are smaller in size and widely supported
            across devices and platforms. Your images are processed locally,
            keeping them private and secure.
          </p>

          <h4 className="font-semibold mt-4 mb-2">✨ Key Features</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Convert PNG to JPG in seconds</li>
            <li>Adjust output quality with slider</li>
            <li>Preserve transparency with white background</li>
            <li>Preview before conversion</li>
            <li>Instant download option</li>
          </ul>

          <h4 className="font-semibold mt-5 mb-2">🔧 How to Use</h4>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            <li>Select one or more PNG files from your device</li>
            <li>Adjust quality using the slider</li>
            <li>Click <strong>Convert</strong> to generate JPG images</li>
            <li>Preview and download your converted JPG files</li>
          </ol>
        </section>
      </div>
    </main>
  );
}
