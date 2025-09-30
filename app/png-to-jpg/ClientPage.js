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
            The PNG to JPG converter is a free, browser-based tool that helps you
            quickly transform images from PNG format into JPG format. This conversion
            is often required because JPG files are lighter, faster to share, and
            widely supported across almost every device, browser, and platform. With
            this tool, you don’t need to install heavy software like Photoshop or GIMP.
            Everything runs locally on your browser, which means your files stay
            private and secure.
          </p>

          <p className="text-gray-700 mb-4">
            PNG (Portable Network Graphics) images are known for their ability to
            support transparency and high-quality visuals, but they often result in
            larger file sizes. JPG (or JPEG) images, on the other hand, use compression
            to reduce file size while keeping the visual quality acceptable for most
            uses. By converting PNG to JPG, you make your images easier to upload to
            websites, faster to send via email, and more suitable for social media or
            mobile storage.
          </p>

          <h4 className="font-semibold mt-4 mb-2">✨ Key Features</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Convert PNG to JPG instantly without software installation</li>
            <li>Adjustable quality slider to balance size and clarity</li>
            <li>White background applied where transparency existed</li>
            <li>Supports multiple file uploads and batch conversion</li>
            <li>Preview your images before downloading</li>
            <li>Secure and private — no files are uploaded to servers</li>
          </ul>

          <h4 className="font-semibold mt-5 mb-2">🔧 How to Use</h4>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            <li>Drag & drop PNG files into the converter or use the browse option.</li>
            <li>Preview the selected images in the gallery grid.</li>
            <li>Adjust the quality slider (from 30% to 100%) to control output size.</li>
            <li>Click <strong>Convert</strong> and wait a few seconds.</li>
            <li>Download the generated JPG files individually or save them directly.</li>
          </ol>

          <h4 className="font-semibold mt-5 mb-2">📦 Practical Use Cases</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>
              <strong>Web Optimization:</strong> Use JPG images on websites to make
              them load faster and improve SEO performance.
            </li>
            <li>
              <strong>Email Attachments:</strong> Convert PNGs to smaller JPGs before
              sending via email to reduce attachment size.
            </li>
            <li>
              <strong>Social Media Uploads:</strong> Platforms like Facebook,
              Instagram, and Twitter prefer compressed JPGs for faster sharing.
            </li>
            <li>
              <strong>Mobile Storage:</strong> Save space on smartphones by converting
              heavy PNGs into compact JPG files.
            </li>
            <li>
              <strong>Photography:</strong> Share high-quality but lightweight JPGs
              instead of bulky PNGs for quick transfers.
            </li>
          </ul>

          <h4 className="font-semibold mt-5 mb-2">💡 Why Convert PNG to JPG?</h4>
          <p className="text-gray-700 mb-4">
            Many users wonder why they should convert PNG files to JPG. The main reason
            is efficiency. PNG files preserve every pixel and are excellent for logos,
            transparent images, and editing workflows. But once editing is complete,
            converting to JPG makes sharing and hosting more practical. JPG files can
            be compressed up to 90% smaller than PNGs, while still looking visually
            good on most screens. This reduces bandwidth usage and improves page
            loading speed.
          </p>

          <h4 className="font-semibold mt-5 mb-2">🙋 Frequently Asked Questions</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <strong>Will transparency be preserved?</strong> No. JPG format doesn’t
              support transparency. Transparent areas will be filled with a white
              background.
            </li>
            <li>
              <strong>Is this tool free?</strong> Yes, it’s completely free to use with
              no hidden charges.
            </li>
            <li>
              <strong>Can I convert multiple PNG files at once?</strong> Yes, batch
              conversion is supported. Just select multiple files.
            </li>
            <li>
              <strong>Does it work offline?</strong> Once loaded, yes. Since the tool
              runs in your browser, it works without internet for the session.
            </li>
            <li>
              <strong>Is my data safe?</strong> 100%. All processing is local, so your
              files never leave your device.
            </li>
          </ul>

          <h4 className="font-semibold mt-5 mb-2">🚀 Final Thoughts</h4>
          <p className="text-gray-700">
            This PNG to JPG converter is a handy utility for anyone working with
            images. Whether you’re a designer, a blogger, a student, or a business
            professional, there will always be times when you need to reduce image size
            without compromising too much on quality. Instead of downloading heavy
            software or paying for online services, you can use this free, secure, and
            instant tool directly in your browser. Converting images has never been
            simpler. Try it today and experience the convenience of lightweight, fast,
            and user-friendly image conversion.
          </p>
        </section>
      </div>
    </main>
  );
}
