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
            PDF is one of the most popular formats for sharing and storing documents
            because it preserves fonts, formatting, and layout across all platforms.
            But often a single PDF contains multiple sections, chapters, or scanned
            documents that you may not always need together. For example, a 200 page
            report might only require sharing a few chapters with colleagues, or a
            scanned contract might contain multiple agreements that need to be sent
            separately. In such cases, splitting the PDF into individual pages or
            smaller sections makes handling documents much easier. That is exactly
            what this PDF Split tool is designed to do.
          </p>

          <p className="text-gray-700 mb-4">
            This tool runs directly in your browser and never uploads your file to
            any server. That means you keep full control of your data and ensure
            privacy while working with sensitive content like legal agreements,
            financial records, or personal identification documents. It extracts
            each page of your PDF into a separate file and packages them neatly
            into a single ZIP download. This approach saves time, avoids confusion,
            and ensures your documents are organized exactly how you need them.
          </p>

          <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Split a PDF into separate single page files instantly</li>
            <li>Download all split pages in one ZIP package</li>
            <li>Works entirely offline inside your browser</li>
            <li>No server uploads — 100 percent private and secure</li>
            <li>Preserves text quality, images, and formatting</li>
            <li>Fast processing suitable for small or large PDFs</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            <li>Upload your PDF file using the input above.</li>
            <li>Wait for the tool to detect and show the total number of pages.</li>
            <li>Click <strong>Split & Download ZIP</strong> to begin processing.</li>
            <li>Once complete, download the ZIP containing individual PDFs.</li>
            <li>Use <strong>Reset</strong> if you want to clear and start over.</li>
          </ol>

          <h4 className="font-semibold mt-4 mb-1">📦 Practical Use Cases</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li><strong>Business:</strong> Send only relevant sections of reports, contracts, or invoices instead of large bulky PDFs.</li>
            <li><strong>Education:</strong> Share individual chapters of e books, research papers, or assignments with students and teachers.</li>
            <li><strong>Legal:</strong> Split long contracts into separate agreements for easier review and signing.</li>
            <li><strong>Personal:</strong> Organize scanned family records, certificates, or travel documents page by page.</li>
            <li><strong>Publishing:</strong> Break large manuscripts into smaller parts for editing or proofreading.</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-1">🔒 Why Splitting PDFs Helps</h4>
          <p className="text-gray-700 mb-4">
            Large PDFs can be hard to share by email, difficult to upload to websites
            with file size limits, and frustrating for recipients who only need a few
            pages. By splitting, you improve file organization, save time for others,
            and avoid unnecessary storage usage. You also get more flexibility — you
            can merge, rotate, or compress only the sections you actually need.
            This makes document workflows much more efficient.
          </p>

          <h4 className="font-semibold mt-4 mb-1">⚡ Benefits of a Browser Based Split Tool</h4>
          <p className="text-gray-700 mb-4">
            Many PDF splitting services require you to upload files to a server,
            which is not always secure. With this tool, everything happens locally.
            Your files never leave your computer, so you can safely split sensitive
            business reports, medical records, or confidential contracts without
            worrying about privacy. It also means the tool works faster and even
            functions offline once the page is loaded.
          </p>

          <h4 className="font-semibold mt-4 mb-1">🚫 Common Mistakes to Avoid</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Uploading PDFs with sensitive data to untrusted online services</li>
            <li>Forgetting to save the split files after processing</li>
            <li>Not keeping a backup of the original document</li>
            <li>Splitting when you actually need to extract only certain pages — use a page selection tool in that case</li>
            <li>Sending split files without proper names — rename files for clarity</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-1">📖 Best Practices</h4>
          <p className="text-gray-700 mb-4">
            Always keep an original copy of your full PDF before splitting, especially
            for legal, financial, or academic documents. When splitting for sharing,
            rename files meaningfully (for example, &quot;Invoice-Jan-2025.pdf&quot;) so the
            recipient knows exactly what each file contains. If you regularly split
            large documents, consider combining this workflow with PDF compression
            or merging tools to optimize your file management even further.
          </p>

          <h4 className="font-semibold mt-4 mb-1">🌍 Who Can Benefit</h4>
          <p className="text-gray-700 mb-4">
            Students, teachers, business professionals, lawyers, freelancers, and
            everyday users can all benefit from PDF splitting. For students, it
            simplifies study material distribution. For businesses, it ensures
            only necessary sections of large reports are shared. For legal teams,
            it makes reviewing long contracts more efficient. Even casual users
            who want to organize scanned personal documents will find this tool
            invaluable.
          </p>

          <h4 className="font-semibold mt-4 mb-1">⚡ Conclusion</h4>
          <p className="text-gray-700 leading-relaxed">
            Splitting PDFs may sound simple, but it solves one of the most common
            problems people face when working with digital documents. By separating
            large files into smaller, more manageable parts, you improve sharing,
            storage, and organization. This free PDF Split tool runs directly in
            your browser, ensuring speed, security, and complete privacy. Whether
            you are a student handling study material, a professional managing
            contracts, or someone archiving personal records, splitting PDFs
            helps streamline your workflow. With just a few clicks, you can take
            control of your documents and make them more accessible, organized,
            and useful.
          </p>
        </section>
      </div>
    </main>
  );
}
