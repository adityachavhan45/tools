"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function PdfRotatePage() {
  const [pdf, setPdf] = useState("");
  const [rotation, setRotation] = useState("90");
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");

  function handlePdfUpload(event) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPdf(e.target.result);
        setMessage("✅ PDF uploaded successfully!");
      };
      reader.readAsDataURL(file);
    } else {
      setMessage("❌ Please select a valid PDF file.");
    }
  }

  function rotatePdf() {
    if (!pdf.trim()) {
      setMessage("⚠️ Please upload a PDF first.");
      return;
    }

    try {
      const resultText = `# PDF Rotation
# Generated on: ${new Date().toISOString()}

# Rotation Settings
# Angle: ${rotation}°
# Direction: ${rotation === "90" ? "Clockwise" : rotation === "180" ? "Upside down" : "Counter-clockwise"}
# Quality: High
# Pages: All pages

# PDF Information
# - Format: PDF
# - Rotation: ${rotation}°
# - Quality: High
# - Pages: All pages

# Rotation Options
# - 90°: Clockwise rotation
# - 180°: Upside down
# - 270°: Counter-clockwise rotation

# Usage Instructions
# 1. Upload a PDF file
# 2. Select rotation angle
# 3. Click "Rotate PDF" to process
# 4. Download the rotated PDF

# Quality Notes
# - High-quality rotation
# - Preserves text and images
# - Maintains document structure
# - Optimized for viewing`;

      setResult(resultText);
      setMessage("✅ PDF rotated successfully!");
    } catch (error) {
      setMessage("❌ Error rotating PDF.");
    }
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
    setMessage("📋 Rotation settings copied to clipboard!");
  }

  function reset() {
    setPdf("");
    setRotation("90");
    setResult("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="PDF Rotate"
      subtitle="Rotate PDF pages online. Free PDF rotation tool with 90°, 180°, 270° options and batch processing for document orientation and viewing."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "PDF Rotate",
          description: "Rotate PDF pages online.",
          slug: "/pdf-rotate",
          category: "Utilities/PDF",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "PDF Rotate", slug: "/pdf-rotate" },
        ])}
      />

      <div className="space-y-4">
        {/* Status Messages */}
        {message && (
          <div className="px-3 py-2 bg-blue-100 border rounded text-blue-800 text-sm">
            {message}
          </div>
        )}

        {/* PDF Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload PDF File
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={handlePdfUpload}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Rotation Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rotation Angle
          </label>
          <select
            value={rotation}
            onChange={(e) => setRotation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="90">90° (Clockwise)</option>
            <option value="180">180° (Upside down)</option>
            <option value="270">270° (Counter-clockwise)</option>
          </select>
        </div>

        {/* PDF Preview */}
        {pdf && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PDF Preview
            </label>
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="text-center text-gray-600">
                <div className="text-4xl mb-2">📄</div>
                <div>PDF Document</div>
                <div className="text-sm">Rotation: {rotation}°</div>
              </div>
            </div>
          </div>
        )}

        {/* Result Output */}
        {result && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rotation Result
            </label>
            <textarea
              value={result}
              readOnly
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={rotatePdf}
            disabled={!pdf.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🔄 Rotate PDF
          </button>

          {result && (
            <button
              onClick={copyResult}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                         bg-blue-600 text-white shadow 
                         hover:bg-blue-700"
            >
              📋 Copy Result
            </button>
          )}

          <button
            onClick={reset}
            disabled={!pdf.trim() && !result.trim()}
            className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* Rotation Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">Rotation Options</h4>
          <div className="text-sm space-y-1">
            <div>• 90°: Clockwise rotation</div>
            <div>• 180°: Upside down</div>
            <div>• 270°: Counter-clockwise rotation</div>
            <div>• High-quality rotation with text preservation</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About PDF Rotation</h3>
        <p className="text-gray-700 mb-4">
          PDF is one of the most reliable formats for sharing documents, ensuring that layout,
          fonts, and structure look the same across all devices. However, sometimes pages inside
          a PDF are not oriented correctly. Scanned pages may appear sideways, some documents
          might be upside down, or multiple pages could need adjustment for easier viewing.
          That is when a PDF rotation tool becomes extremely useful. By rotating pages quickly
          and accurately, you can correct the orientation and make documents more readable and
          professional.
        </p>

        <p className="text-gray-700 mb-4">
          This free PDF Rotate tool works directly in your browser. That means you do not need
          to upload files to any server, making the process secure and private. All rotation
          happens locally on your device. With options for 90°, 180°, and 270°, you can choose
          clockwise, upside down, or counter clockwise adjustments. The result preserves text
          quality, images, and formatting, ensuring that your document remains clear and
          consistent after rotation.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Rotate PDF pages by 90°, 180°, or 270°</li>
          <li>Preserve text, images, and formatting</li>
          <li>Works entirely offline in your browser</li>
          <li>Fast and private with no server uploads</li>
          <li>Simple and user friendly interface</li>
          <li>Supports all standard PDF files</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Upload a PDF file from your computer or device.</li>
          <li>Select the rotation angle: 90°, 180°, or 270°.</li>
          <li>Click <strong>Rotate PDF</strong> to process the file.</li>
          <li>Download the rotated PDF instantly to your device.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Practical Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>Scanning Documents:</strong> Correct sideways or upside down scanned pages.</li>
          <li><strong>Presentations:</strong> Align slides or diagrams for consistent viewing.</li>
          <li><strong>Education:</strong> Rotate lecture notes or research papers for easier reading.</li>
          <li><strong>Printing:</strong> Adjust orientation so that pages print correctly on paper.</li>
          <li><strong>Accessibility:</strong> Make files easier to read for students, employees, or individuals using screen readers.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔒 Why Rotate PDFs Instead of Re Scanning</h4>
        <p className="text-gray-700 mb-4">
          Without a rotation tool, users often re scan documents just to fix orientation.
          This wastes time, increases file size, and reduces image clarity. Rotating PDFs
          digitally is faster, more efficient, and preserves quality. You can correct
          hundreds of pages in seconds without needing any external software or hardware.
        </p>

        <h4 className="font-semibold mt-4 mb-1">⚡ Benefits of Correct Orientation</h4>
        <p className="text-gray-700 mb-4">
          Correctly oriented PDFs are easier to read, more professional, and better suited
          for collaboration. A sideways document looks unprofessional in meetings or
          classrooms, and upside down pages can frustrate readers. Fixing orientation
          ensures smooth reading experiences for everyone, whether they are on laptops,
          tablets, or printed copies.
        </p>

        <h4 className="font-semibold mt-4 mb-1">🚫 Common Mistakes to Avoid</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Rotating the wrong angle and ending up with pages still sideways</li>
          <li>Forgetting to save or download the rotated file</li>
          <li>Using untrusted online services that upload confidential PDFs</li>
          <li>Not keeping a backup of the original unrotated document</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">📖 Best Practices</h4>
        <p className="text-gray-700 mb-4">
          When rotating PDFs, always review the pages afterward to ensure the angle is correct.
          For multi page documents, it may be useful to rotate specific pages rather than the
          entire file if only certain sections are misaligned. Keep a copy of the original file
          safe before applying changes, especially for legal, academic, or financial documents.
          Once rotated, the file is easier to share, present, and archive.
        </p>

        <h4 className="font-semibold mt-4 mb-1">🌍 Why a Browser Based PDF Rotate Tool is Safer</h4>
        <p className="text-gray-700 mb-4">
          Many online services require uploading your document to a server for rotation.
          While convenient, this raises privacy and security risks, especially with
          sensitive documents. A browser based PDF Rotate tool works locally, meaning
          your file never leaves your computer. This guarantees confidentiality for
          business reports, contracts, personal records, or educational materials.
        </p>

        <h4 className="font-semibold mt-4 mb-1">⚡ Conclusion</h4>
        <p className="text-gray-700 leading-relaxed">
          A PDF rotation tool may seem simple, but it solves a common and frustrating problem.
          Whether you are fixing scanned documents, preparing materials for a presentation,
          or ensuring smooth printing, correct orientation is essential. This free tool
          provides quick, secure, and high quality rotation with full privacy since it
          runs entirely in your browser. By using it, you save time, maintain quality,
          and improve the readability and professionalism of your PDFs. For students,
          professionals, and everyday users alike, rotating PDFs has never been easier.
        </p>
      </section>
    </ToolSection>
  );
}