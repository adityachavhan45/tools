"use client";

import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import { useState } from "react";
import { PDFDocument, StandardFonts } from "pdf-lib";

export default function ImagesToPdfPage() {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");

  async function handleCreatePdf() {
    if (!files.length) return;
    setProcessing(true);
    setMessage("");
    try {
      const pdfDoc = await PDFDocument.create();
      await pdfDoc.embedFont(StandardFonts.Helvetica);

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        let img;
        if (/\.png$/i.test(file.name)) {
          img = await pdfDoc.embedPng(arrayBuffer);
        } else {
          img = await pdfDoc.embedJpg(arrayBuffer);
        }
        const { width, height } = img.scale(1);
        const page = pdfDoc.addPage([width, height]);
        page.drawImage(img, { x: 0, y: 0, width, height });
      }

      const bytes = await pdfDoc.save();
      const blob = new Blob([bytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `images-${Date.now()}.pdf`;
      a.click();
      URL.revokeObjectURL(url);

      setMessage("✅ PDF created successfully!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to create PDF");
    } finally {
      setProcessing(false);
    }
  }

  function resetAll() {
    setFiles([]);
    setMessage("🧹 Cleared!");
  }

  function removeFile(index) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <JsonLd
        data={buildToolJsonLd({
          name: "Images to PDF",
          description: "Convert multiple images (JPG, PNG) into a single PDF.",
          slug: "/images-to-pdf",
          category: "Utilities/PDF",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Images to PDF", slug: "/images-to-pdf" },
        ])}
      />

      {/* Toast Message */}
      {message && (
        <div
          className={`fixed top-5 right-5 px-4 py-2 rounded-lg shadow-lg text-white transition
          ${message.includes("✅") ? "bg-green-500" : ""}
          ${message.includes("❌") ? "bg-red-500" : ""}
          ${message.includes("🧹") ? "bg-blue-500" : ""}`}
        >
          {message}
        </div>
      )}

      <div className="max-w-5xl mx-auto py-10 px-5">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-slate-800">Images to PDF</h2>
          <p className="text-gray-600 mt-1">
            Combine multiple images (JPG/PNG/WebP) into a single PDF.
          </p>

          {/* File Upload */}
          <div className="mt-6 border-2 border-dashed rounded-xl p-6 text-center hover:bg-slate-50 transition">
            <p className="text-gray-700 mb-2">📂 Drag & drop images or click below</p>
            <input
              type="file"
              accept="image/*"
              multiple
              className="file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border-0 
                         file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
            />
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3 flex-wrap">
            <button
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 
                         text-white shadow-md hover:scale-105 transition disabled:opacity-60"
              onClick={handleCreatePdf}
              disabled={!files.length || processing}
            >
              {processing ? "Creating…" : "Create PDF"}
            </button>
            <button
              className="px-5 py-2 rounded-lg bg-black text-white shadow-md 
             hover:bg-gray-800 transition disabled:opacity-60"
              onClick={resetAll}
              disabled={!files.length}
            >
              Reset All
            </button>
          </div>

          {/* Preview Uploaded Files */}
          {files.length > 0 && (
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {files.map((f, i) => (
                <div
                  key={i}
                  className="relative border rounded-xl overflow-hidden bg-white shadow hover:shadow-lg transition"
                >
                  <img
                    src={URL.createObjectURL(f)}
                    alt={f.name}
                    className="w-full h-32 object-cover"
                  />
                  {/* Remove button */}
                  <button
                    onClick={() => removeFile(i)}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full hover:bg-red-600"
                  >
                    ✕
                  </button>
                  <p className="p-2 text-xs truncate">{f.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

                {/* Info Section */}
        <section className="mt-10 bg-white shadow-md rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-2 text-slate-800">
            About Images to PDF Tool
          </h3>
          <p className="text-gray-700 mb-4">
            The Images to PDF converter is a free and simple tool that lets you combine multiple images 
            (JPG, PNG, WebP) into a single, shareable PDF file. It works entirely inside your browser, 
            meaning your files are never uploaded to any external server. This ensures privacy, speed, 
            and convenience. Whether you are a student, professional, or casual user, this tool saves 
            you the hassle of installing heavy apps or using online services that may compromise your data.
          </p>

          <h4 className="font-semibold mt-4 mb-2 text-slate-800">✨ Key Features</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Merge unlimited images into a single PDF file</li>
            <li>Supports common formats like JPG, PNG, and WebP</li>
            <li>Preview and reorder images before creating PDF</li>
            <li>One-click download of the generated PDF</li>
            <li>Fully offline processing for maximum privacy</li>
            <li>Lightweight and fast – no installation required</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2 text-slate-800">🔧 How to Use</h4>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            <li>Upload or drag &amp; drop multiple images into the tool.</li>
            <li>Preview the images and remove unwanted ones.</li>
            <li>Click <strong>Create PDF</strong> to process them instantly.</li>
            <li>Download the generated PDF with a single click.</li>
            <li>Use <strong>Reset All</strong> to clear and start again.</li>
          </ol>

          <h4 className="font-semibold mt-4 mb-2 text-slate-800">📐 Why Convert Images to PDF?</h4>
          <p className="text-gray-700 mb-4">
            Converting images into a PDF offers several advantages. A single PDF file is easier to share, 
            upload, and archive compared to multiple image files. PDF format preserves layout and quality, 
            ensuring the document looks consistent on all devices. It also saves storage space when sending 
            images via email or messaging apps. Businesses often use this method to combine scanned invoices, 
            bills, and documents, while students can merge notes and screenshots into one compact file.
          </p>

          <h4 className="font-semibold mt-4 mb-2 text-slate-800">📦 Practical Use Cases</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Create quick photo albums for sharing with friends or family</li>
            <li>Combine receipts, bills, or warranty documents into one file</li>
            <li>Send multiple screenshots in one professional PDF</li>
            <li>Organize lecture notes or study material for easy reference</li>
            <li>Prepare work reports and presentations with image sets</li>
            <li>Archive old scanned photos or documents safely</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2 text-slate-800">⚡ Best Practices</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Use JPG for photos, PNG for graphics, and WebP for compression</li>
            <li>Keep image resolution consistent for a clean PDF output</li>
            <li>Remove unnecessary or duplicate images before generating</li>
            <li>Reorder images logically (e.g., chronological order) for better readability</li>
            <li>For large files, compress images first to reduce final PDF size</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2 text-slate-800">🚀 Final Thoughts</h4>
          <p className="text-gray-700">
            Traditional desktop software like Photoshop or Acrobat can be bulky and slow for simple tasks. 
            This online Images to PDF tool provides a lightweight, instant, and secure alternative. Whether 
            you are merging personal photos, business documents, or academic notes, it ensures your workflow 
            is smooth and efficient. With offline processing, zero privacy risk, and a user-friendly interface, 
            this tool is the fastest way to turn scattered images into a polished PDF in seconds.
          </p>
        </section>
      </div>
    </main>
  );
}
