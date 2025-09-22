"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function PdfSplitPage() {
  const [file, setFile] = useState(null);
  const [splitting, setSplitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [pageCount, setPageCount] = useState(null);

  async function handleFileChange(f) {
    setFile(f);
    setError("");
    setMessage("");
    if (f) {
      try {
        const bytes = new Uint8Array(await f.arrayBuffer());
        const pdf = await PDFDocument.load(bytes);
        setPageCount(pdf.getPageCount());
      } catch {
        setPageCount(null);
        setError("❌ Invalid PDF file.");
      }
    } else {
      setPageCount(null);
    }
  }

  async function handleSplit() {
    setError("");
    if (!file) {
      setError("⚠️ Please select a PDF file.");
      return;
    }
    try {
      setSplitting(true);
      const inputBytes = new Uint8Array(await file.arrayBuffer());
      const inputPdf = await PDFDocument.load(inputBytes);
      const count = inputPdf.getPageCount();

      const zip = new JSZip();

      for (let i = 0; i < count; i++) {
        const outPdf = await PDFDocument.create();
        const [copied] = await outPdf.copyPages(inputPdf, [i]);
        outPdf.addPage(copied);
        const bytes = await outPdf.save();
        zip.file(`page-${i + 1}.pdf`, bytes);
      }

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `split-pages-${Date.now()}.zip`;
      a.click();
      URL.revokeObjectURL(url);

      setMessage("✅ PDF split successfully!");
    } catch (e) {
      console.error(e);
      setError("❌ Failed to split PDF.");
    } finally {
      setSplitting(false);
    }
  }

  function resetAll() {
    setFile(null);
    setPageCount(null);
    setError("");
    setMessage("🧹 Cleared!");
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* SEO JSON-LD */}
      <JsonLd
        data={buildToolJsonLd({
          name: "PDF Split",
          description: "Split a PDF into separate pages in your browser.",
          slug: "/pdf-split",
          category: "Utilities/PDF",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "PDF Split", slug: "/pdf-split" },
        ])}
      />

      <div className="max-w-5xl mx-auto p-4">
        {/* Title */}
        <h2 className="text-xl font-semibold">PDF Split Tool</h2>
        <p className="text-gray-600 mt-1">
          Split each page into a separate PDF and download them as a ZIP file.
        </p>

        {/* Messages */}
        {message && (
          <div className="mt-3 px-3 py-2 bg-green-100 border rounded text-green-800 text-sm">
            {message}
          </div>
        )}
        {error && (
          <div className="mt-3 px-3 py-2 bg-red-100 border rounded text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* File Input */}
        <div className="mt-5">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => handleFileChange((e.target.files || [])[0] || null)}
            className="block w-full text-sm text-gray-700 
                       file:mr-4 file:py-2 file:px-3 file:rounded-lg 
                       file:border-0 file:bg-slate-900 file:text-white 
                       hover:file:bg-black cursor-pointer"
          />
        </div>

        {/* File Preview */}
        {file && (
          <div className="mt-4 p-3 border rounded-lg bg-white shadow-sm">
            <p className="font-medium truncate">{file.name}</p>
            {pageCount !== null && (
              <p className="text-gray-500 text-sm">
                Total Pages: {pageCount}
              </p>
            )}
            <p className="text-xs text-gray-400">
              Size: {(file.size / 1024).toFixed(1)} KB
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-5 flex gap-3 flex-wrap">
          <button
            onClick={handleSplit}
            disabled={splitting || !file}
            className="px-5 py-2 rounded-lg bg-slate-900 text-white shadow 
                       hover:bg-black disabled:opacity-60"
          >
            {splitting ? "Splitting…" : "Split & Download ZIP"}
          </button>
          <button
            onClick={resetAll}
            disabled={!file}
            className="px-5 py-2 rounded-lg border bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* Info Section */}
        <section className="mt-10 bg-white border rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-2">About PDF Split Tool</h3>
          <p className="text-gray-700 mb-4">
            This free PDF Split tool allows you to split every page of a PDF
            into a separate file and download them all together as a ZIP. The
            processing happens completely in your browser — safe, secure, and
            private.
          </p>

          <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Split PDF into single-page files</li>
            <li>Download all pages together in a ZIP</li>
            <li>Works fully offline in your browser</li>
            <li>No file uploads – 100% secure</li>
            <li>Fast and simple to use</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            <li>Upload your PDF file using the input above.</li>
            <li>Check the detected total page count.</li>
            <li>Click <strong>Split & Download ZIP</strong> to start.</li>
            <li>Save the downloaded ZIP file containing all split PDFs.</li>
          </ol>

          <h4 className="font-semibold mt-4 mb-1">📦 Practical Use Cases</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Extract specific pages from a report or contract</li>
            <li>Send only required sections of a PDF</li>
            <li>Separate scanned documents into individual files</li>
            <li>Organize pages of books or study material</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
