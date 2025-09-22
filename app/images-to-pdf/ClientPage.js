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
      setMessage("❌ Failed to create PDF");
    } finally {
      setProcessing(false);
    }
  }

  function resetAll() {
    setFiles([]);
    setMessage("🧹 Cleared!");
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
              className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200 transition"
              onClick={resetAll}
              disabled={!files.length}
            >
              Reset
            </button>
          </div>

          {/* Preview Uploaded Files */}
          {files.length > 0 && (
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {files.map((f, i) => (
                <div
                  key={i}
                  className="border rounded-xl overflow-hidden bg-white shadow hover:shadow-lg transition"
                >
                  <img
                    src={URL.createObjectURL(f)}
                    alt={f.name}
                    className="w-full h-32 object-cover"
                  />
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
            This free tool allows you to merge multiple images (JPG, PNG, WebP)
            into a single PDF file. Everything runs in your browser – no uploads,
            no privacy risks. Perfect for creating photo albums, reports, or
            sharing multiple images as one file.
          </p>

          <h4 className="font-semibold mt-4 mb-2 text-slate-800">✨ Key Features</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Merge multiple images into one PDF</li>
            <li>Supports JPG, PNG, and WebP</li>
            <li>Preview images before creating PDF</li>
            <li>Works fully offline in your browser</li>
            <li>Fast and secure (no server upload)</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2 text-slate-800">🔧 How to Use</h4>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            <li>Select multiple images using the file input.</li>
            <li>Preview the uploaded images below.</li>
            <li>Click <strong>Create PDF</strong> to generate the file.</li>
            <li>Download the generated PDF instantly.</li>
            <li>Use Reset to clear and start over.</li>
          </ol>

          <h4 className="font-semibold mt-4 mb-2 text-slate-800">📦 Practical Use Cases</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Create quick photo albums</li>
            <li>Combine receipts or bills into one file</li>
            <li>Send multiple images as one PDF in emails</li>
            <li>Make study notes or reports from screenshots</li>
            <li>Keep images organized in one document</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
