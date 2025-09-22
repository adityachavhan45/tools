"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function PdfMergePage() {
  const [files, setFiles] = useState([]);
  const [merging, setMerging] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleMerge() {
    setError("");
    if (!files || files.length < 2) {
      setError("⚠️ Please select at least 2 PDF files.");
      return;
    }
    try {
      setMerging(true);
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const bytes = new Uint8Array(await file.arrayBuffer());
        const pdf = await PDFDocument.load(bytes);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((p) => mergedPdf.addPage(p));
      }

      const mergedBytes = await mergedPdf.save();
      const blob = new Blob([mergedBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `merged-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setMessage("✅ PDF merged successfully!");
    } catch (e) {
      console.error(e);
      setError("❌ Failed to merge PDFs. Please ensure valid PDF files.");
    } finally {
      setMerging(false);
    }
  }

  function removeFile(index) {
    setFiles(files.filter((_, i) => i !== index));
  }

  function resetAll() {
    setFiles([]);
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="PDF Merge"
      subtitle="Combine multiple PDFs into a single file. Runs locally."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "PDF Merge",
          description:
            "Merge multiple PDF files into a single PDF securely in your browser.",
          slug: "/pdf-merge",
          category: "Utilities/PDF",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "PDF Merge", slug: "/pdf-merge" },
        ])}
      />

      <div className="space-y-4">
        {/* Status Messages */}
        {message && (
          <div className="px-3 py-2 bg-green-100 border rounded text-green-800 text-sm">
            {message}
          </div>
        )}
        {error && (
          <div className="px-3 py-2 bg-red-100 border rounded text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* File Input */}
        <div>
          <input
            type="file"
            accept="application/pdf"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
            className="block w-full text-sm text-gray-700 
                       file:mr-4 file:py-2 file:px-3 file:rounded-lg 
                       file:border-0 file:bg-indigo-600 file:text-white 
                       hover:file:bg-indigo-700 cursor-pointer"
          />
          <p className="text-sm text-gray-500 mt-2">
            Selected: {files.length} file(s)
          </p>
        </div>

        {/* Preview selected PDFs */}
        {files.length > 0 && (
          <ul className="divide-y divide-gray-200 border rounded-lg overflow-hidden bg-white shadow">
            {files.map((f, i) => (
              <li
                key={i}
                className="flex items-center justify-between px-4 py-2 hover:bg-gray-50"
              >
                <div className="flex items-center gap-3 truncate">
                  <span className="text-indigo-600">📄</span>
                  <div>
                    <p className="text-sm font-medium truncate">{f.name}</p>
                    <p className="text-xs text-gray-500">
                      {(f.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <button
                  className="text-gray-400 hover:text-red-600 text-lg"
                  onClick={() => removeFile(i)}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={handleMerge}
            disabled={merging || files.length < 2}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            {merging ? "⏳ Merging…" : "🔗 Merge & Download"}
          </button>

          <button
            onClick={resetAll}
            disabled={!files.length}
            className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About PDF Merge Tool</h3>
        <p className="text-gray-700 mb-4">
          This free PDF Merge tool allows you to combine multiple PDF files into
          one single document. Everything runs directly in your browser, so your
          files remain private and secure without uploading them to any server.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Merge multiple PDFs into one instantly</li>
          <li>Runs locally in your browser – no uploads</li>
          <li>Fast and secure with client-side processing</li>
          <li>Simple file input and one-click download</li>
          <li>Works offline once loaded</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Select two or more PDF files from your device.</li>
          <li>Click <strong>Merge & Download</strong> to combine them.</li>
          <li>Wait for processing and download the merged PDF.</li>
          <li>Use <strong>Reset</strong> to clear selection and start fresh.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Practical Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Combine reports, invoices, or bills into one file</li>
          <li>Merge lecture notes and study materials</li>
          <li>Keep scanned pages together in a single PDF</li>
          <li>Quickly join contracts or agreements</li>
        </ul>
      </section>
    </ToolSection>
  );
}
