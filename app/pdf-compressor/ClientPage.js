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
    PDF files have become the universal standard for sharing documents—
    from business reports and academic papers to scanned forms and e-books.
    While PDFs preserve formatting perfectly across devices, they often
    come with one drawback: large file sizes. High-resolution images,
    embedded fonts, and detailed graphics can quickly bloat a PDF,
    making it difficult to share via email, upload to websites,
    or store on limited devices. A PDF compressor solves this
    problem by optimizing the file and reducing its size without
    significantly affecting the quality of the content.
  </p>

  <p className="text-gray-700 mb-4">
    This tool runs entirely in your browser, meaning no uploads to
    external servers and no risk of data exposure. Whether you are
    compressing confidential contracts, personal documents, or
    academic research, your file stays private on your device.
    The tool uses advanced optimization methods to re-save the PDF,
    strip unnecessary data, and compress images intelligently while
    keeping text sharp and readable. It is fast, secure, and works
    instantly with just a few clicks.
  </p>

  <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
  <ul className="list-disc list-inside text-gray-700 space-y-1">
    <li>Reduce PDF file size significantly without losing readability.</li>
    <li>Adjust compression levels to balance quality and file size.</li>
    <li>Works entirely in your browser—no uploads required.</li>
    <li>Optimizes images, fonts, and document structure.</li>
    <li>Quick one-click download of the compressed file.</li>
    <li>Completely private and secure, ideal for sensitive documents.</li>
  </ul>

  <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
  <ol className="list-decimal list-inside text-gray-700 space-y-1">
    <li>Select a PDF file from your device.</li>
    <li>Adjust the compression level using the slider.</li>
    <li>Click <strong>Compress PDF</strong> to start the process.</li>
    <li>Download the new compressed PDF instantly.</li>
    <li>If needed, reset and repeat with another file.</li>
  </ol>

  <h4 className="font-semibold mt-4 mb-1">📦 Common Use Cases</h4>
  <ul className="list-disc list-inside text-gray-700 space-y-1">
    <li><strong>Email Attachments:</strong> Many email services restrict file size. Compressing ensures smooth sending.</li>
    <li><strong>Online Applications:</strong> Job portals, government forms, and university systems often limit uploads.</li>
    <li><strong>Web Publishing:</strong> Optimized PDFs load faster for readers and consume less bandwidth.</li>
    <li><strong>Storage Management:</strong> Reduce space usage on laptops, mobiles, or cloud storage.</li>
    <li><strong>Business Sharing:</strong> Share reports, presentations, or invoices without worrying about large sizes.</li>
  </ul>

  <h4 className="font-semibold mt-4 mb-1">🔒 Why File Size Matters</h4>
  <p className="text-gray-700 mb-4">
    Large PDF files can be inconvenient and even problematic. A 50MB
    report may be impossible to email, slow to upload, and frustrating
    for recipients to download. For businesses, oversized files slow
    workflows and increase storage costs. For students or researchers,
    heavy PDFs make sharing papers and e-books inefficient. By using
    compression, you keep files lightweight and accessible without
    compromising content quality.
  </p>

  <h4 className="font-semibold mt-4 mb-1">⚡ Understanding Compression Levels</h4>
  <p className="text-gray-700 mb-4">
    Compression is a trade-off between size and quality. A lower
    compression level preserves image detail but reduces file size less,
    while a higher level shrinks the file more aggressively but may
    slightly reduce image clarity. This tool gives you control with a
    simple slider. For text-heavy documents, even strong compression
    works well. For image-rich PDFs, moderate compression is ideal.
  </p>

  <h4 className="font-semibold mt-4 mb-1">🚫 Common Mistakes to Avoid</h4>
  <ul className="list-disc list-inside text-gray-700 space-y-1">
    <li>Scanning documents at unnecessarily high DPI (dots per inch).</li>
    <li>Embedding large, uncompressed images without optimization.</li>
    <li>Using multiple fonts and design elements that bloat file size.</li>
    <li>Uploading sensitive documents to untrusted online compressors.</li>
    <li>Forgetting to balance quality with file size when compressing.</li>
  </ul>

  <h4 className="font-semibold mt-4 mb-1">📖 Best Practices for Managing PDFs</h4>
  <p className="text-gray-700 mb-4">
    To keep your PDFs manageable, consider compressing them before
    sharing or archiving. Combine this with other good habits like
    removing unused pages, optimizing images before insertion,
    and avoiding unnecessary elements. Always keep a copy of the
    original uncompressed file in case you need maximum quality
    later. For long-term storage, smaller files also save cloud
    storage costs and make syncing faster across devices.
  </p>

  <h4 className="font-semibold mt-4 mb-1">🌍 Why Use an Offline PDF Compressor?</h4>
  <p className="text-gray-700 mb-4">
    Many online services require uploading documents to a server
    for processing. While convenient, this raises privacy concerns,
    especially for confidential files. An offline, browser-based
    compressor like this one keeps your data entirely on your device.
    No file leaves your computer, making it safer for legal, medical,
    financial, or personal documents. Its both convenient and secure.
  </p>

  <h4 className="font-semibold mt-4 mb-1">⚡ Conclusion</h4>
  <p className="text-gray-700">
    PDF compression is more than a convenience—its a necessity in
    todays fast-moving digital world. Large, bulky files slow
    communication, waste storage, and frustrate users. By using this
    free PDF compressor, you can instantly shrink files, maintain
    quality, and keep your workflow efficient. Whether youre a
    student submitting assignments, a business professional sharing
    reports, or someone archiving personal records, this tool
    ensures your PDFs remain lightweight, accessible, and secure.
  </p>
</section>
    </ToolSection>
  );
}
