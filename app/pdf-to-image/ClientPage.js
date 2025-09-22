"use client";

import { useEffect, useState } from "react";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import JSZip from "jszip";

// Delay loading pdfjs to client to avoid DOMMatrix errors on SSR
let __pdfjs = null;

export default function PdfToImagePage() {
  const [file, setFile] = useState(null);
  const [rendering, setRendering] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [pageCount, setPageCount] = useState(null);
  const [pdfjs, setPdfjs] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (__pdfjs) {
        if (mounted) setPdfjs(__pdfjs);
        return;
      }
      try {
        const lib = await import("pdfjs-dist");
        lib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${lib.version}/pdf.worker.min.js`;
        __pdfjs = lib;
        if (mounted) setPdfjs(lib);
      } catch (e) {
        console.error("Failed to load pdfjs-dist", e);
        if (mounted) setError("⚠️ Failed to load PDF engine. Please refresh.");
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  async function handleFileChange(f) {
    setFile(f);
    setError("");
    setMessage("");
    setImages([]);
    if (f) {
      try {
        const bytes = await f.arrayBuffer();
        const pdf = await pdfjs.getDocument({ data: bytes }).promise;
        setPageCount(pdf.numPages);
      } catch {
        setPageCount(null);
        setError("❌ Invalid PDF file.");
      }
    } else {
      setPageCount(null);
    }
  }

  async function renderPdfToImages() {
    setError("");
    if (!file) {
      setError("⚠️ Please select a PDF file.");
      return;
    }
    try {
      setRendering(true);
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      const outputs = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: ctx, viewport }).promise;
        outputs.push({ url: canvas.toDataURL("image/png"), index: i });
      }
      setImages(outputs);
      setMessage("✅ Conversion complete!");
    } catch (e) {
      console.error(e);
      setError("❌ Failed to render PDF to images.");
    } finally {
      setRendering(false);
    }
  }

  async function downloadAllAsZip() {
    const zip = new JSZip();
    images.forEach((img, i) => {
      const base64 = img.url.split(",")[1];
      zip.file(`page-${i + 1}.png`, base64, { base64: true });
    });
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pdf-images-${Date.now()}.zip`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function resetAll() {
    setFile(null);
    setImages([]);
    setPageCount(null);
    setError("");
    setMessage("🧹 Cleared!");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* SEO JSON-LD */}
      <JsonLd
        data={buildToolJsonLd({
          name: "PDF to Image",
          description: "Convert PDF pages to images (PNG/JPG) instantly in your browser.",
          slug: "/pdf-to-image",
          category: "Utilities/PDF",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "PDF to Image", slug: "/pdf-to-image" },
        ])}
      />

      <div className="max-w-6xl mx-auto p-6">
        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-900">📄 PDF to Image Converter</h2>
        <p className="text-gray-600 mt-1">
          Convert each PDF page to a high-quality PNG image directly in your browser.
        </p>

        {/* Alerts */}
        {message && (
          <div className="mt-4 px-4 py-3 bg-green-50 border border-green-300 rounded-lg text-green-800 text-sm shadow">
            {message}
          </div>
        )}
        {error && (
          <div className="mt-4 px-4 py-3 bg-red-50 border border-red-300 rounded-lg text-red-700 text-sm shadow">
            {error}
          </div>
        )}

        {/* File Input */}
        <div className="mt-6">
          <label className="block w-full cursor-pointer">
            <span className="sr-only">Choose PDF</span>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => handleFileChange((e.target.files || [])[0] || null)}
              className="block w-full text-sm text-gray-700
                         file:mr-4 file:py-2 file:px-5 file:rounded-full 
                         file:border-0 file:bg-slate-900 file:text-white 
                         hover:file:bg-black cursor-pointer"
            />
          </label>
        </div>

        {/* File Card */}
        {file && (
          <div className="mt-5 flex items-center gap-4 p-4 border rounded-lg bg-white shadow-sm">
            <div className="flex-1">
              <p className="font-medium text-gray-900">{file.name}</p>
              {pageCount !== null && (
                <p className="text-gray-500 text-sm">Total Pages: {pageCount}</p>
              )}
              <p className="text-xs text-gray-400">
                Size: {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-6 flex gap-3 flex-wrap">
          <button
            onClick={renderPdfToImages}
            disabled={rendering || !file}
            className="px-6 py-2 rounded-full bg-slate-900 text-white shadow 
                       hover:bg-black disabled:opacity-50"
          >
            {rendering ? "⏳ Converting…" : "🚀 Convert"}
          </button>
          <button
            onClick={resetAll}
            disabled={!file && !images.length}
            className="px-6 py-2 rounded-full border bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
          {images.length > 0 && (
            <button
              onClick={downloadAllAsZip}
              className="px-6 py-2 rounded-full bg-green-600 text-white hover:bg-green-700"
            >
              ⬇️ Download All (ZIP)
            </button>
          )}
        </div>

        {/* Images */}
        {images.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="border rounded-lg bg-white shadow-sm overflow-hidden hover:shadow-md transition"
              >
                <img
                  src={img.url}
                  alt={`Page ${idx + 1}`}
                  className="w-full h-auto hover:scale-[1.02] transition"
                />
                <div className="p-3 flex justify-between items-center">
                  <span className="text-sm text-gray-600">Page {idx}</span>
                  <a
                    href={img.url}
                    download={`page-${idx + 1}.png`}
                    className="px-3 py-1 bg-gray-800 text-white text-xs rounded-full hover:bg-black"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Section */}
        <section className="mt-12 bg-white border rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">About PDF to Image Tool</h3>
          <p className="text-gray-700 mb-4">
            This free tool converts each page of your PDF into a PNG image. The
            entire process runs in your browser — fast, secure, and private.
          </p>

          <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Convert all PDF pages into PNG images</li>
            <li>Preview and download each page individually</li>
            <li>Download all pages together as a ZIP</li>
            <li>Works locally in your browser – no uploads</li>
            <li>Fast rendering with PDF.js</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
