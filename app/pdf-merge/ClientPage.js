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
          PDFs have become the standard format for sharing digital documents because they
          preserve formatting, fonts, and design across all devices. Whether you are sending
          reports, contracts, scanned pages, or study materials, PDF ensures consistency and
          reliability. However, managing multiple PDFs can often become messy. Imagine having
          a report split into separate files, or lecture notes scattered across multiple PDFs.
          In such cases, combining them into one file makes everything more organized and
          easier to share. That is exactly what this PDF Merge tool is built for.
        </p>

        <p className="text-gray-700 mb-4 leading-relaxed">
          Unlike many online services that require you to upload files to a server,
          this tool runs entirely inside your browser. That means no document ever leaves
          your device. Your PDFs remain private and secure, which is especially important
          for sensitive information like business contracts, financial statements, or
          personal documents. The merging process happens quickly and efficiently using
          client side technology, so you can combine your files instantly without waiting
          for long uploads or downloads.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Merge multiple PDF files into one single document instantly</li>
          <li>Runs locally in your browser with no uploads to any server</li>
          <li>Fast and secure client side processing</li>
          <li>Simple drag and drop file input with one click download</li>
          <li>Works even when offline once the page is loaded</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Select two or more PDF files from your device.</li>
          <li>Review the file list to confirm the order.</li>
          <li>Click <strong>Merge and Download</strong> to process the files.</li>
          <li>Wait for the merge to finish and download your new single PDF.</li>
          <li>Use <strong>Reset</strong> if you want to clear and start again.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Practical Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>Business Documents:</strong> Combine invoices, receipts, or contracts into one file for easy sharing.</li>
          <li><strong>Education:</strong> Merge lecture notes, e books, or scanned assignments into a single PDF.</li>
          <li><strong>Legal and Government:</strong> Keep official forms and agreements together for proper record keeping.</li>
          <li><strong>Personal Use:</strong> Combine scanned family documents, certificates, or travel records into one organized file.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔒 Why Merge PDFs Locally</h4>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Many free PDF merge websites exist, but they usually require uploading your
          documents to a server. This is not ideal when dealing with private or
          sensitive information. By merging PDFs directly in your browser, your files
          never leave your computer. This ensures that confidential data such as
          business contracts, identification documents, or financial reports stay safe.
        </p>

        <h4 className="font-semibold mt-4 mb-1">⚡ Benefits of a Single PDF</h4>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Merging PDFs brings multiple benefits. A single file is easier to share by
          email or upload to websites that limit the number of attachments. It also
          reduces confusion for readers, since they only need to open one file instead
          of multiple. For students, merging notes makes revision faster. For businesses,
          it ensures professionalism when sending proposals or reports to clients.
        </p>

        <h4 className="font-semibold mt-4 mb-1">🚫 Common Problems Without Merging</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Sending multiple files separately increases the chance of missed pages.</li>
          <li>Large projects get disorganized if spread across too many PDFs.</li>
          <li>Clients or teachers may find it inconvenient to download and open several files.</li>
          <li>Long term storage becomes harder when related documents are split.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">📖 Best Practices</h4>
        <p className="text-gray-700 mb-4 leading-relaxed">
          When merging PDFs, always check the order of your files. Rename them
          appropriately before selecting so they appear in the right sequence.
          Keep an unmerged backup of your original files, in case you need them
          later. After merging, consider compressing the resulting PDF if the file
          size becomes too large. This makes sharing and storage even easier.
        </p>

        <h4 className="font-semibold mt-4 mb-1">🌍 Who Can Benefit</h4>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Students, teachers, business professionals, lawyers, freelancers,
          researchers, and even casual users can benefit from a PDF merge tool.
          Anyone who works with documents regularly will find it useful to
          consolidate multiple files into one. It saves time, reduces clutter,
          and makes communication more efficient.
        </p>

        <h4 className="font-semibold mt-4 mb-1">⚡ Conclusion</h4>
        <p className="text-gray-700 leading-relaxed">
          A reliable PDF Merge tool is a must have for anyone handling digital
          documents. It simplifies sharing, improves organization, and enhances
          professionalism. Since this tool runs locally in your browser, it
          ensures privacy and security while being incredibly fast and easy to use.
          Whether you are a student preparing notes, a professional sending reports,
          or an individual organizing personal records, merging PDFs will make your
          workflow smoother and more efficient. Try it once, and you will see how
          much simpler document management becomes.
        </p>
      </section>
    </ToolSection>
  );
}
