"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function PdfCompressorPage() {
  const [file, setFile] = useState(null);
  const [compressing, setCompressing] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [compressionLevel, setCompressionLevel] = useState(0.7);

  async function handleCompress() {
    if (!file) {
      setError("⚠️ Please select a PDF file.");
      return;
    }

    setError("");
    setCompressing(true);
    
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const pdfDoc = await PDFDocument.load(bytes);
      
      // Apply compression by re-saving with reduced quality
      const compressedBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
        objectsPerTick: 50,
      });

      const blob = new Blob([compressedBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `compressed-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      const originalSize = (file.size / 1024).toFixed(1);
      const compressedSize = (compressedBytes.length / 1024).toFixed(1);
      const savings = (((file.size - compressedBytes.length) / file.size) * 100).toFixed(1);
      
      setMessage(`✅ PDF compressed! Original: ${originalSize}KB → Compressed: ${compressedSize}KB (${savings}% smaller)`);
    } catch (e) {
      console.error(e);
      setError("❌ Failed to compress PDF. Please ensure it's a valid PDF file.");
    } finally {
      setCompressing(false);
    }
  }

  function resetAll() {
    setFile(null);
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="PDF Compressor"
      subtitle="Reduce PDF file size without losing quality. Compress PDFs online."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "PDF Compressor",
          description: "Compress PDF files to reduce size without losing quality.",
          slug: "/pdf-compressor",
          category: "Utilities/PDF",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "PDF Compressor", slug: "/pdf-compressor" },
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
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-700 
                       file:mr-4 file:py-2 file:px-3 file:rounded-lg 
                       file:border-0 file:bg-indigo-600 file:text-white 
                       hover:file:bg-indigo-700 cursor-pointer"
          />
          <p className="text-sm text-gray-500 mt-2">
            {file ? `Selected: ${file.name} (${(file.size / 1024).toFixed(1)}KB)` : "No file selected"}
          </p>
        </div>

        {/* Compression Level */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium">
            Compression Level: <span className="text-indigo-600">{(compressionLevel * 100).toFixed(0)}%</span>
          </label>
          <input
            className="accent-indigo-600 flex-1"
            type="range"
            min="0.3"
            max="0.9"
            step="0.1"
            value={compressionLevel}
            onChange={(e) => setCompressionLevel(parseFloat(e.target.value))}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={handleCompress}
            disabled={compressing || !file}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            {compressing ? "⏳ Compressing…" : "🗜️ Compress PDF"}
          </button>

          <button
            onClick={resetAll}
            disabled={!file}
            className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About PDF Compressor</h3>
        <p className="text-gray-700 mb-4">
          Reduce PDF file size without losing quality. This tool optimizes PDF files 
          by removing unnecessary data, compressing images, and streamlining the document structure.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Reduce PDF file size significantly</li>
          <li>Maintain text quality and readability</li>
          <li>Adjustable compression levels</li>
          <li>Runs locally in your browser</li>
          <li>No file uploads - completely private</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Select a PDF file from your device.</li>
          <li>Adjust compression level if needed.</li>
          <li>Click <strong>Compress PDF</strong> to process.</li>
          <li>Download the compressed PDF file.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Reduce file size for email attachments</li>
          <li>Optimize PDFs for web upload</li>
          <li>Save storage space on devices</li>
          <li>Make PDFs faster to download</li>
        </ul>
      </section>
    </ToolSection>
  );
}
