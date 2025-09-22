"use client";

import { useState } from "react";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

// Simple PNG->ICO (single image 256x256)
function pngToIcoDataURL(pngCanvas) {
  const pngData = atob(pngCanvas.toDataURL("image/png").split(",")[1]);
  const pngBytes = new Uint8Array(pngData.length);
  for (let i = 0; i < pngData.length; i++) pngBytes[i] = pngData.charCodeAt(i);

  const header = new Uint8Array(6);
  header[2] = 1; // ICO type
  header[4] = 1; // number of images

  const dir = new Uint8Array(16);
  dir[0] = 0; // width = 256
  dir[1] = 0; // height = 256
  dir[4] = 1;
  dir[6] = 32;

  const imageSize = pngBytes.length;
  const sizeBytes = new Uint8Array(4);
  new DataView(sizeBytes.buffer).setUint32(0, imageSize, true);

  const offBytes = new Uint8Array(4);
  const imageOffset = 6 + 16;
  new DataView(offBytes.buffer).setUint32(0, imageOffset, true);

  const ico = new Uint8Array(imageOffset + imageSize);
  ico.set(header, 0);
  ico.set(dir, 6);
  ico.set(sizeBytes, 14);
  ico.set(offBytes, 18);
  ico.set(pngBytes, imageOffset);

  const blob = new Blob([ico], { type: "image/x-icon" });
  return URL.createObjectURL(blob);
}

export default function PngToIcoPage() {
  const [file, setFile] = useState(null);
  const [outUrl, setOutUrl] = useState("");
  const [message, setMessage] = useState("");

  async function convert() {
    if (!file) return;
    const img = new Image();
    const url = URL.createObjectURL(file);
    await new Promise((res, rej) => {
      img.onload = res;
      img.onerror = rej;
      img.src = url;
    });

    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingQuality = "high";

    const scale = Math.min(size / img.width, size / img.height);
    const w = Math.round(img.width * scale);
    const h = Math.round(img.height * scale);
    const x = Math.floor((size - w) / 2);
    const y = Math.floor((size - h) / 2);

    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(img, x, y, w, h);

    const icoUrl = pngToIcoDataURL(canvas);
    setOutUrl(icoUrl);
    setMessage("✅ ICO created successfully!");
    URL.revokeObjectURL(url);
  }

  function resetAll() {
    setFile(null);
    setOutUrl("");
    setMessage("🧹 Cleared!");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <JsonLd
        data={buildToolJsonLd({
          name: "PNG to ICO",
          description: "Convert PNG images to ICO icon files suitable for favicons.",
          slug: "/png-to-ico",
          category: "Utilities/Images",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "PNG to ICO", slug: "/png-to-ico" },
        ])}
      />

      <div className="max-w-3xl mx-auto p-6">
        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-900">PNG to ICO Converter</h2>
        <p className="text-gray-600 mt-1">
          Create a 256×256 favicon (.ico) from a PNG or any image file.
        </p>

        {/* Messages */}
        {message && (
          <div className="mt-3 px-4 py-2 bg-green-50 border border-green-300 rounded-lg text-green-800 text-sm shadow">
            {message}
          </div>
        )}

        {/* File Upload */}
        <div className="mt-6">
          <label className="block w-full cursor-pointer">
            <span className="sr-only">Choose PNG</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile((e.target.files || [])[0] || null)}
              className="block w-full text-sm text-gray-700
                         file:mr-4 file:py-2 file:px-5 file:rounded-full 
                         file:border-0 file:bg-slate-900 file:text-white 
                         hover:file:bg-black cursor-pointer"
            />
          </label>
        </div>

        {/* File Info */}
        {file && (
          <div className="mt-5 p-4 border rounded-lg bg-white shadow-sm">
            <p className="font-medium text-gray-900">{file.name}</p>
            <p className="text-xs text-gray-500">
              Size: {(file.size / 1024).toFixed(1)} KB
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-5 flex gap-3 flex-wrap">
          <button
            className="px-6 py-2 bg-slate-900 text-white rounded-full shadow hover:bg-black disabled:opacity-60"
            disabled={!file}
            onClick={convert}
          >
            🚀 Convert
          </button>
          <button
            onClick={resetAll}
            disabled={!file && !outUrl}
            className="px-6 py-2 border rounded-full bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* Preview */}
        {outUrl && (
          <div className="mt-8 p-5 border rounded-lg bg-white shadow-sm w-fit">
            <h4 className="font-semibold text-gray-800 mb-2">Preview</h4>
            <img
              src={outUrl}
              alt="ICO preview"
              className="w-16 h-16 border rounded mx-auto"
            />
            <a
              className="mt-3 inline-block px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
              href={outUrl}
              download="favicon.ico"
            >
              ⬇️ Download ICO
            </a>
          </div>
        )}

        {/* Info Section */}
        <section className="mt-12 bg-white border rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">About PNG to ICO Tool</h3>
          <p className="text-gray-700 mb-4">
            This free PNG to ICO converter helps you create favicon files for
            your website or apps. Favicons are small icons that appear in browser
            tabs, bookmarks, and shortcuts. The tool processes your image
            directly in the browser, so your files stay private and secure.
          </p>

          <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Convert PNG or any image to ICO format</li>
            <li>Outputs 256×256 favicon.ico</li>
            <li>Works locally in your browser (no uploads)</li>
            <li>Preview before download</li>
            <li>Secure and private</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
