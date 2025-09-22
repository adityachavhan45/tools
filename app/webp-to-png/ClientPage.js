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
          <h3 className="text-lg font-semibold mb-2">About WebP to PNG</h3>
          <p className="text-gray-700 text-sm mb-2">
            WebP is a modern image format developed by Google that provides
            superior compression for images on the web. However, not all
            platforms, apps, or editing tools support WebP yet. Converting WebP
            to PNG ensures wider compatibility while maintaining high quality.
          </p>
          <h4 className="font-medium">When should you convert?</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>When your software or CMS does not support WebP.</li>
            <li>If you need lossless quality with alpha transparency.</li>
            <li>When preparing assets for editing in tools like Photoshop.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
