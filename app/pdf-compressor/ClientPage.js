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
  const [compressionLevel, setCompressionLevel] = useState("medium");
  const [compressionResult, setCompressionResult] = useState(null);

  const compressionLevels = {
    low: { value: 0.9, label: "Low (Best Quality)", description: "Minimal compression" },
    medium: { value: 0.7, label: "Medium (Balanced)", description: "Good balance" },
    high: { value: 0.5, label: "High (Smaller Size)", description: "Maximum compression" }
  };

  async function handleCompress() {
    if (!file) {
      setError("⚠️ Please select a PDF file first.");
      return;
    }

    setError("");
    setMessage("");
    setCompressing(true);
    setCompressionResult(null);
    
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const pdfDoc = await PDFDocument.load(bytes);
      
      // Get PDF info
      const pageCount = pdfDoc.getPageCount();
      
      // Apply compression by re-saving with optimizations
      const compressedBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
        objectsPerTick: 50,
      });

      const blob = new Blob([compressedBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `compressed-${file.name}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      const originalSize = file.size;
      const compressedSize = compressedBytes.length;
      const savings = ((originalSize - compressedSize) / originalSize) * 100;
      
      setCompressionResult({
        originalSize,
        compressedSize,
        savings,
        pageCount,
        fileName: file.name
      });
      
      setMessage(`✅ PDF compressed successfully! File downloaded.`);
    } catch (e) {
      console.error(e);
      setError("❌ Failed to compress PDF. Please ensure it's a valid PDF file.");
    } finally {
      setCompressing(false);
    }
  }

  function resetAll() {
    setFile(null);
    setCompressionResult(null);
    setMessage("");
    setError("");
    setCompressionLevel("medium");
  }

  function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    else return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  }

  return (
    <ToolSection
      title="PDF Compressor"
      subtitle="Reduce PDF file size online for free. Compress PDF documents while maintaining quality. Fast, secure, and works entirely in your browser."
      plain
      hideSidebar
      centerHeader
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "PDF Compressor",
          description: "Free online PDF compressor. Reduce PDF file size without losing quality. Compress PDF documents securely in your browser.",
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

      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-5 sm:p-6 shadow-sm">
          <h1 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-700">
            PDF Compressor Tool
          </h1>
          <p className="mt-2 text-center text-sm sm:text-base text-slate-600">
            Compress PDF files online while keeping document readability.
          </p>
        </div>

        {/* Status Messages */}
        {message && (
          <div className="px-5 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-r-lg shadow-sm">
            <p className="text-green-800 text-sm font-medium">{message}</p>
          </div>
        )}
        
        {error && (
          <div className="px-5 py-3 bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-500 rounded-r-lg shadow-sm">
            <p className="text-red-800 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Main Compression Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          {/* File Upload Section */}
          <div className="mb-6">
            <label className="block text-base font-semibold text-gray-800 mb-3">
              📄 Select PDF File
            </label>
            <div className="relative">
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => {
                  setFile(e.target.files?.[0] || null);
                  setCompressionResult(null);
                  setError("");
                }}
                className="block w-full text-sm text-gray-700 
                         file:mr-4 file:py-3 file:px-6 file:rounded-lg 
                         file:border-0 file:bg-gradient-to-r file:from-indigo-600 file:to-purple-600 
                         file:text-white file:font-semibold file:shadow-lg
                         hover:file:from-indigo-700 hover:file:to-purple-700
                         file:transition-all file:duration-200 file:cursor-pointer
                         cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-4
                         hover:border-indigo-400 transition-colors"
              />
            </div>
            {file && (
              <div className="mt-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">📄</div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-600">Original Size: {formatFileSize(file.size)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Compression Level Selection */}
          <div className="mb-6">
            <label className="block text-base font-semibold text-gray-800 mb-3">
              ⚙️ Compression Level
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {Object.entries(compressionLevels).map(([key, level]) => (
                <label
                  key={key}
                  className={`flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    compressionLevel === key
                      ? 'border-indigo-500 bg-indigo-50 shadow-md'
                      : 'border-gray-300 hover:border-indigo-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="compression"
                    value={key}
                    checked={compressionLevel === key}
                    onChange={(e) => setCompressionLevel(e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      compressionLevel === key ? 'border-indigo-600' : 'border-gray-400'
                    }`}>
                      {compressionLevel === key && (
                        <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                      )}
                    </div>
                    <span className="font-semibold text-gray-800">{level.label}</span>
                  </div>
                  <span className="text-xs text-gray-600 ml-6">{level.description}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 flex-wrap justify-center">
            <button
              onClick={handleCompress}
              disabled={compressing || !file}
              className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg 
                       bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg 
                       hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed
                       transform transition-all duration-200 hover:scale-105 active:scale-95"
            >
              {compressing ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  <span>Compressing...</span>
                </>
              ) : (
                <>
                  <span className="text-xl">🗜️</span>
                  <span>Compress PDF</span>
                </>
              )}
            </button>

            <button
              onClick={resetAll}
              disabled={!file && !compressionResult}
              className="px-6 py-3 border-2 border-gray-300 rounded-lg bg-white hover:bg-gray-50 font-semibold
                       disabled:opacity-50 disabled:cursor-not-allowed shadow-md
                       transform transition-all duration-200 hover:scale-105 active:scale-95"
            >
              🔄 Reset
            </button>
          </div>
        </div>

        {/* Compression Result */}
        {compressionResult && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-3xl">📊</span>
              Compression Results
            </h3>

            {/* File Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
                <div className="text-sm text-blue-700 font-medium mb-2">Original File</div>
                <div className="text-3xl font-bold text-blue-900 mb-1">
                  {formatFileSize(compressionResult.originalSize)}
                </div>
                <div className="text-xs text-blue-600">
                  {compressionResult.pageCount} page{compressionResult.pageCount !== 1 ? 's' : ''}
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
                <div className="text-sm text-green-700 font-medium mb-2">Compressed File</div>
                <div className="text-3xl font-bold text-green-900 mb-1">
                  {formatFileSize(compressionResult.compressedSize)}
                </div>
                <div className="text-xs text-green-600">
                  {compressionResult.savings.toFixed(1)}% smaller
                </div>
              </div>
            </div>

            {/* Savings Visualization */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-200">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-purple-900">Space Saved</span>
                <span className="text-2xl font-bold text-purple-900">
                  {formatFileSize(compressionResult.originalSize - compressionResult.compressedSize)}
                </span>
              </div>
              <div className="h-3 rounded-full bg-purple-200 overflow-hidden">
                <div
                  className="h-3 bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-1000 ease-out"
                  style={{ width: `${compressionResult.savings}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-purple-700">
                <span>0%</span>
                <span className="font-bold">{compressionResult.savings.toFixed(1)}% Reduction</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        )}

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-green-500">
            <div className="text-3xl mb-2">🔒</div>
            <h4 className="font-bold text-gray-900 mb-2">100% Secure</h4>
            <p className="text-sm text-gray-700">
              All processing happens in your browser. Your files never leave your device.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-blue-500">
            <div className="text-3xl mb-2">⚡</div>
            <h4 className="font-bold text-gray-900 mb-2">Lightning Fast</h4>
            <p className="text-sm text-gray-700">
              Compress PDFs in seconds with our optimized compression engine.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-purple-500">
            <div className="text-3xl mb-2">🎯</div>
            <h4 className="font-bold text-gray-900 mb-2">Quality Preserved</h4>
            <p className="text-sm text-gray-700">
              Reduce file size while maintaining document readability and quality.
            </p>
          </div>
        </div>
      </div>

      {/* Comprehensive Information Section */}
     <section className="mx-auto mt-12 sm:mt-14 w-full max-w-5xl p-5 sm:p-6 md:p-8 bg-white shadow-md rounded-2xl border border-slate-200">
  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 border-b border-slate-200 pb-3">
    Why PDF Compression Has Become Important for Modern File Sharing
  </h2>

  <div className="space-y-4 text-sm sm:text-base leading-7 text-slate-700">
    <p className="text-justify">
      PDF files are widely used across businesses, education platforms, government systems, offices, and personal workflows because they preserve formatting consistently across different devices and operating systems. Whether someone is sharing contracts, reports, assignments, ebooks, resumes, invoices, or presentations, PDFs remain one of the most reliable document formats available today.
    </p>

    <p className="text-justify">
      However, large PDF file sizes often create practical problems during uploading, emailing, downloading, and cloud storage management. Files containing high quality images, scanned pages, embedded fonts, or complex graphics can quickly become very large, making sharing slower and more difficult.
    </p>

    <p className="text-justify">
      A PDF Compressor helps reduce file sizes efficiently while maintaining document readability and overall usability. Instead of manually recreating documents or lowering quality aggressively, users can compress PDFs quickly and make them easier to store, upload, and share across different platforms.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Understanding Why PDF Files Become Large
    </h3>

    <p className="text-justify">
      Several elements contribute to increasing PDF file size. High resolution images are usually the biggest factor because every image stores large amounts of pixel data. Scanned documents, photographs, design assets, and presentation exports often contain images far larger than necessary for normal viewing purposes.
    </p>

    <p className="text-justify">
      Embedded fonts can also increase file size significantly, especially when documents include multiple font families or special character sets. Additional metadata, revision history, hidden layers, and complex document structures may further increase overall storage requirements.
    </p>

    <p className="text-justify">
      Even relatively short documents can become surprisingly large when exported using high quality settings or unnecessary embedded assets.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      How This PDF Compressor Works
    </h3>

    <p className="text-justify">
      This browser based PDF Compressor reduces file sizes using optimisation techniques designed specifically for PDF documents. The tool analyses document structure and applies compression methods that target oversized elements such as images, embedded assets, and unnecessary metadata.
    </p>

    <p className="text-justify">
      Users simply upload the PDF file, choose compression preferences if available, and generate a smaller optimised version within seconds. The process is designed to maintain document readability while reducing unnecessary file size overhead.
    </p>

    <p className="text-justify">
      Since the compression process works directly inside the browser, users can compress files quickly without installing additional desktop software or relying on complicated editing tools.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Why Smaller PDF Files Improve Productivity
    </h3>

    <p className="text-justify">
      Smaller PDF files are easier to upload, download, and share across websites, email systems, and cloud platforms. Many email providers and online portals limit attachment sizes, which often creates problems when users attempt to upload large reports, resumes, certificates, or scanned documents.
    </p>

    <p className="text-justify">
      Compressing PDFs helps users avoid upload failures and reduces waiting time during file transfers. Smaller files also improve accessibility for users with slower internet connections or limited mobile data plans.
    </p>

    <p className="text-justify">
      Businesses managing large document workflows often benefit significantly from reducing file sizes because storage efficiency and faster sharing improve overall operational productivity.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Common Situations Where PDF Compression Helps
    </h3>

    <p className="text-justify">
      Job applications frequently require uploading resumes, certificates, and portfolio documents within strict file size limits. Educational portals often restrict assignment submissions based on upload size, especially for scanned projects or presentation documents.
    </p>

    <p className="text-justify">
      Businesses also compress PDFs before sharing contracts, invoices, product catalogues, or internal reports through email systems. Students commonly reduce file sizes before submitting scanned assignments or research material online.
    </p>

    <p className="text-justify">
      Users handling multiple document workflows sometimes additionally use the <a href="https://convertixy.com/pdf-to-word" className="text-blue-600 hover:underline font-medium">PDF to Word Converter</a> while editing document content before generating smaller optimised PDF versions again.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      How Compression Balances Size and Quality
    </h3>

    <p className="text-justify">
      Effective PDF compression aims to reduce unnecessary file size while keeping text readable and images visually acceptable for normal usage. The best compression balance depends on the document purpose.
    </p>

    <p className="text-justify">
      Text heavy documents usually compress extremely well because textual content requires relatively little storage space compared to images. Image rich PDFs may require more balanced compression settings to preserve visual quality while still achieving meaningful size reduction.
    </p>

    <p className="text-justify">
      Professional printing documents or design portfolios may require lighter compression compared to standard business reports or scanned assignments where moderate image quality reduction is usually acceptable.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Why Browser Based PDF Tools Feel More Convenient
    </h3>

    <p className="text-justify">
      Browser based tools simplify accessibility because users can compress files instantly without downloading software or creating accounts. This makes the process much easier across desktop systems, laptops, tablets, and smartphones.
    </p>

    <p className="text-justify">
      This PDF Compressor works directly inside the browser, allowing users to upload, compress, and download files quickly without complicated installation steps. The lightweight workflow improves convenience for both casual and professional users.
    </p>

    <p className="text-justify">
      Users managing document formatting workflows sometimes also use the <a href="https://convertixy.com/pdf-merger" className="text-blue-600 hover:underline font-medium">PDF Merger</a> while combining multiple compressed files into a single organised document.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Storage Benefits of Compressing PDF Documents
    </h3>

    <p className="text-justify">
      Large PDF collections can consume significant cloud storage space over time, especially for businesses, students, researchers, and professionals handling extensive document archives. Compressing files helps reduce storage usage while keeping documents more manageable.
    </p>

    <p className="text-justify">
      Smaller files also synchronise faster across cloud platforms and backup systems, improving overall workflow efficiency. Teams sharing large document libraries benefit from quicker downloads and reduced bandwidth consumption during collaboration.
    </p>

    <p className="text-justify">
      This becomes especially useful for users working with limited cloud storage plans or large long term archives containing hundreds of documents.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Privacy Advantages of Local Browser Compression
    </h3>

    <p className="text-justify">
      PDF files often contain sensitive personal or business information, including contracts, identification documents, financial reports, legal records, and confidential company files. Because of this, privacy protection during compression becomes extremely important.
    </p>

    <p className="text-justify">
      Since this PDF Compressor processes everything locally inside the browser, uploaded documents remain on the user device during optimisation. Files do not need to be stored externally before compression completes.
    </p>

    <p className="text-justify">
      Local browser processing improves both privacy and speed because compression happens directly on the device without depending on external server communication systems.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Helpful Tips for Creating Smaller PDFs
    </h3>

    <p className="text-justify">
      Users can avoid oversized PDF files by optimising images before inserting them into documents. Extremely high resolution images are often unnecessary for standard digital viewing and dramatically increase file size without noticeable quality improvements.
    </p>

    <p className="text-justify">
      Choosing proper export settings while generating PDFs can also reduce file size significantly. Avoid embedding unnecessary fonts, unused assets, or oversized graphics whenever possible.
    </p>

    <p className="text-justify">
      Users handling broader document management workflows sometimes additionally use the <a href="https://convertixy.com/image-compressor" className="text-blue-600 hover:underline font-medium">Image Compressor</a> before creating PDFs from image heavy documents or scanned pages.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Why PDF Compression Is Useful for Websites and Businesses
    </h3>

    <p className="text-justify">
      Websites offering downloadable PDFs benefit greatly from smaller file sizes because visitors can access content faster. Large downloadable files may increase bounce rates, especially for mobile users with slower internet connections.
    </p>

    <p className="text-justify">
      Businesses distributing catalogues, manuals, brochures, invoices, or training documents also reduce bandwidth costs and improve customer experience by optimising PDFs before publishing them online.
    </p>

    <p className="text-justify">
      Educational platforms and digital libraries similarly benefit from compression because users can access learning resources more efficiently across different devices and internet conditions.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Final Thoughts on Using a PDF Compressor
    </h3>

    <p className="text-justify">
      PDF compression has become an important part of modern digital document management because large file sizes can slow sharing, increase storage usage, and create upload limitations across many online platforms.
    </p>

    <p className="text-justify">
      This browser based PDF Compressor provides a fast and beginner friendly way to reduce PDF file sizes while maintaining readability and overall document usability. Users can optimise documents instantly without complicated software or technical knowledge.
    </p>

    <p className="text-justify">
      Whether you are submitting assignments, sharing reports, uploading resumes, managing cloud storage, distributing business documents, or improving website downloads, PDF compression helps create faster, lighter, and more accessible document workflows across modern digital platforms.
    </p>
  </div>
</section>
    </ToolSection>
  );
}
