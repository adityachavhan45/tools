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

      <div className="space-y-6">
        {/* Status Messages */}
        {message && (
          <div className="message success">
            {message}
          </div>
        )}
        {error && (
          <div className="message error">
            {error}
          </div>
        )}

        {/* File Input */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Select PDF Files
          </label>
          <input
            type="file"
            accept="application/pdf"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
            className="block w-full text-sm text-gray-700 
                       file:mr-4 file:py-2 file:px-4 file:rounded-lg 
                       file:border-0 file:bg-gradient-to-r file:from-blue-600 file:to-indigo-600 file:text-white 
                       hover:file:from-blue-700 hover:file:to-indigo-700 cursor-pointer
                       border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors duration-200"
          />
          <p className="text-sm text-gray-500">
            Selected: <span className="font-medium text-blue-600">{files.length}</span> file(s)
          </p>
        </div>

        {/* Preview selected PDFs */}
        {files.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Selected Files</h3>
            <ul className="space-y-2">
              {files.map((f, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center gap-3 truncate">
                    <span className="text-blue-600 text-lg">📄</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate text-gray-900">{f.name}</p>
                      <p className="text-xs text-gray-500">
                        {(f.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    className="text-gray-400 hover:text-red-600 text-lg p-1 rounded-full hover:bg-red-50 transition-colors duration-200"
                    onClick={() => removeFile(i)}
                    title="Remove file"
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={handleMerge}
            disabled={merging || files.length < 2}
            className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-medium shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
          >
            {merging ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Merging...
              </>
            ) : (
              <>
                🔗 Merge & Download
              </>
            )}
          </button>

          <button
            onClick={resetAll}
            disabled={!files.length}
            className="px-6 py-3 border border-gray-300 rounded-xl bg-white text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
          >
            🧹 Reset
          </button>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-12 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-sm">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-blue-900">About PDF Merge Tool</h3>
        <p className="text-gray-700 mb-4 leading-relaxed">
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
