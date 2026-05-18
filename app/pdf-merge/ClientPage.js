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
  const [mergeResult, setMergeResult] = useState(null);

  async function handleMerge() {
    setError("");
    setMessage("");
    
    if (!files || files.length < 2) {
      setError("⚠️ Please select at least 2 PDF files to merge.");
      return;
    }
    
    try {
      setMerging(true);
      setMergeResult(null);
      
      const mergedPdf = await PDFDocument.create();
      let totalPages = 0;

      for (const file of files) {
        const bytes = new Uint8Array(await file.arrayBuffer());
        const pdf = await PDFDocument.load(bytes);
        const pageCount = pdf.getPageCount();
        totalPages += pageCount;
        
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((p) => mergedPdf.addPage(p));
      }

      const mergedBytes = await mergedPdf.save();
      const blob = new Blob([mergedBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `merged-document-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      const totalSize = files.reduce((sum, f) => sum + f.size, 0);
      
      setMergeResult({
        fileCount: files.length,
        totalPages,
        totalSize,
        mergedSize: mergedBytes.length,
        fileName: `merged-document-${Date.now()}.pdf`
      });
      
      setMessage("✅ PDFs merged successfully! File downloaded.");
    } catch (e) {
      console.error(e);
      setError("❌ Failed to merge PDFs. Please ensure all files are valid PDF documents.");
    } finally {
      setMerging(false);
    }
  }

  function handleFileSelect(e) {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(prev => [...prev, ...selectedFiles]);
    setMergeResult(null);
    setError("");
  }

  function removeFile(index) {
    setFiles(files.filter((_, i) => i !== index));
    setMergeResult(null);
  }

  function moveFileUp(index) {
    if (index === 0) return;
    const newFiles = [...files];
    [newFiles[index - 1], newFiles[index]] = [newFiles[index], newFiles[index - 1]];
    setFiles(newFiles);
  }

  function moveFileDown(index) {
    if (index === files.length - 1) return;
    const newFiles = [...files];
    [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]];
    setFiles(newFiles);
  }

  function resetAll() {
    setFiles([]);
    setMergeResult(null);
    setMessage("");
    setError("");
  }

  function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    else return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  }

  return (
    <ToolSection
      title="PDF Merge Tool"
      subtitle="Combine multiple PDF files into one document for free. Merge PDFs online securely with our browser-based tool. No upload required - works offline."
      plain
      hideSidebar
      centerHeader
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "PDF Merge Tool",
          description: "Free online PDF merge tool. Combine multiple PDF files into a single document securely in your browser. Fast, private, and easy to use.",
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

      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-5 sm:p-6 shadow-sm">
          <h1 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-700">
            PDF Merge Tool
          </h1>
          <p className="mt-2 text-center text-sm sm:text-base text-slate-600">
            Merge multiple PDF files into one organized document instantly.
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

        {/* Main Upload Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <label className="block text-base font-semibold text-gray-800 mb-3">
            📄 Select PDF Files to Merge
          </label>
          
          <div className="relative">
            <input
              type="file"
              accept="application/pdf"
              multiple
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-700 
                       file:mr-4 file:py-3 file:px-6 file:rounded-lg 
                       file:border-0 file:bg-gradient-to-r file:from-blue-600 file:to-indigo-600 
                       file:text-white file:font-semibold file:shadow-lg
                       hover:file:from-blue-700 hover:file:to-indigo-700
                       file:transition-all file:duration-200 file:cursor-pointer
                       cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-6
                       hover:border-blue-400 transition-colors bg-gray-50 hover:bg-blue-50"
            />
          </div>
          
          <div className="mt-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
            </svg>
            <p className="text-xs text-blue-700 font-medium">
              100% Private - Files are processed locally in your browser
            </p>
          </div>

          {files.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900">
                {files.length} file{files.length !== 1 ? 's' : ''} selected
                <span className="text-blue-600 ml-2">
                  ({formatFileSize(files.reduce((sum, f) => sum + f.size, 0))} total)
                </span>
              </p>
            </div>
          )}
        </div>

        {/* File List with Reordering */}
        {files.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Selected Files</h3>
              <span className="text-sm text-gray-600">
                Files will be merged in this order
              </span>
            </div>
            
            <div className="space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200"
                >
                  {/* Order Number */}
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>

                  {/* File Icon */}
                  <div className="text-3xl">📄</div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {formatFileSize(file.size)}
                    </p>
                  </div>

                  {/* Reorder Buttons */}
                  <div className="flex gap-1">
                    <button
                      onClick={() => moveFileUp(index)}
                      disabled={index === 0}
                      className="p-2 hover:bg-blue-100 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move up"
                    >
                      <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => moveFileDown(index)}
                      disabled={index === files.length - 1}
                      className="p-2 hover:bg-blue-100 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move down"
                    >
                      <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFile(index)}
                    className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                    title="Remove file"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Merge Result */}
        {mergeResult && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-3xl">✅</span>
              Merge Successful
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
                <div className="text-sm text-blue-700 font-medium mb-2">Files Merged</div>
                <div className="text-3xl font-bold text-blue-900">
                  {mergeResult.fileCount}
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-200">
                <div className="text-sm text-purple-700 font-medium mb-2">Total Pages</div>
                <div className="text-3xl font-bold text-purple-900">
                  {mergeResult.totalPages}
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
                <div className="text-sm text-green-700 font-medium mb-2">Output Size</div>
                <div className="text-3xl font-bold text-green-900">
                  {formatFileSize(mergeResult.mergedSize)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap justify-center">
          <button
            onClick={handleMerge}
            disabled={merging || files.length < 2}
            className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg 
                     bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg 
                     hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed
                     transform transition-all duration-200 hover:scale-105 active:scale-95"
          >
            {merging ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                <span>Merging PDFs...</span>
              </>
            ) : (
              <>
                <span className="text-xl">🔗</span>
                <span>Merge & Download</span>
              </>
            )}
          </button>

          <button
            onClick={resetAll}
            disabled={!files.length && !mergeResult}
            className="px-6 py-3 border-2 border-gray-300 rounded-lg bg-white hover:bg-gray-50 font-semibold
                     disabled:opacity-50 disabled:cursor-not-allowed shadow-md
                     transform transition-all duration-200 hover:scale-105 active:scale-95"
          >
            🔄 Reset
          </button>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-green-500">
            <div className="text-3xl mb-2">🔒</div>
            <h4 className="font-bold text-gray-900 mb-2">100% Private</h4>
            <p className="text-sm text-gray-700">
              All merging happens in your browser. Files never leave your device.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-blue-500">
            <div className="text-3xl mb-2">⚡</div>
            <h4 className="font-bold text-gray-900 mb-2">Super Fast</h4>
            <p className="text-sm text-gray-700">
              Merge multiple PDFs in seconds with our optimized engine.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-purple-500">
            <div className="text-3xl mb-2">📋</div>
            <h4 className="font-bold text-gray-900 mb-2">Easy Reordering</h4>
            <p className="text-sm text-gray-700">
              Arrange files in any order before merging with simple controls.
            </p>
          </div>
        </div>
      </div>

      {/* Comprehensive Information Section */}
      <section className="mx-auto mt-12 sm:mt-14 w-full max-w-5xl p-5 sm:p-6 md:p-8 bg-white shadow-md rounded-2xl border border-slate-200">
  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 border-b border-slate-200 pb-3">
    Why PDF Merging Has Become Important for Modern Document Management
  </h2>

  <div className="space-y-4 text-sm sm:text-base leading-7 text-slate-700">
    <p className="text-justify">
      Digital documents are now part of almost every professional, academic, and personal workflow. Businesses manage contracts, invoices, reports, and presentations digitally, while students and professionals regularly handle assignments, resumes, certificates, and project files in PDF format. Although PDFs provide excellent compatibility and consistent formatting across devices, managing many separate files can quickly become confusing and inefficient.
    </p>

    <p className="text-justify">
      A PDF Merger helps solve this problem by combining multiple PDF files into a single organised document. Instead of sharing or storing separate files individually, users can merge related documents together to simplify file management, sharing, and archiving workflows.
    </p>

    <p className="text-justify">
      Combining PDFs into a single file also improves presentation quality because recipients can access all related pages in one organised document instead of downloading multiple disconnected files separately.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Understanding Why PDF Merging Is Useful
    </h3>

    <p className="text-justify">
      Many workflows naturally involve multiple related documents. A business proposal may include separate PDFs for pricing, technical specifications, contracts, and supporting reports. Students often handle assignments, notes, certificates, and project pages stored as different files.
    </p>

    <p className="text-justify">
      Managing these files individually increases the chances of missing pages, incorrect uploads, or incomplete document sharing. Merging solves this issue by creating one combined PDF that contains everything in proper sequence.
    </p>

    <p className="text-justify">
      This approach improves organisation while making storage, sharing, and downloading significantly more convenient for both senders and recipients.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      How This PDF Merger Works
    </h3>

    <p className="text-justify">
      This browser based PDF Merger allows users to upload multiple PDF files and combine them into a single unified document within seconds. Users can arrange files in the preferred order before starting the merging process.
    </p>

    <p className="text-justify">
      During merging, the tool copies pages from each source file while preserving original formatting, text, images, and layout structure. Once processing finishes, users can instantly download the final merged PDF.
    </p>

    <p className="text-justify">
      Since the entire process works directly inside the browser, users can merge files quickly without installing desktop software or relying on complicated document editing systems.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Common Situations Where PDF Merging Helps
    </h3>

    <p className="text-justify">
      Job seekers often combine resumes, certificates, portfolios, and recommendation letters into one PDF before uploading applications online. Students merge assignments, scanned notes, and supporting documents for educational submissions.
    </p>

    <p className="text-justify">
      Businesses regularly merge invoices, agreements, financial reports, and presentation files before sharing them with clients or internal teams. Legal and administrative workflows also depend heavily on combining multiple records into organised document packages.
    </p>

    <p className="text-justify">
      Users managing broader PDF workflows sometimes additionally use the <a href="https://convertixy.com/pdf-compressor" className="text-blue-600 hover:underline font-medium">PDF Compressor</a> after merging large files to reduce final document size for easier uploading and sharing.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Why File Ordering Matters in Merged PDFs
    </h3>

    <p className="text-justify">
      Proper file ordering is extremely important because merged documents should follow a logical reading sequence. Incorrect arrangement can confuse readers and reduce professionalism, especially for business reports, applications, or educational material.
    </p>

    <p className="text-justify">
      Most users prefer placing summaries, cover pages, or introductory documents first, followed by supporting pages and appendices. Organising files before merging creates cleaner document flow and improves readability significantly.
    </p>

    <p className="text-justify">
      Using clear file names and arranging pages carefully before merging can prevent unnecessary corrections later.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Benefits of Combining Multiple PDFs Into One File
    </h3>

    <p className="text-justify">
      A single merged document is easier to store, upload, and distribute compared to many separate files. Recipients also prefer downloading one organised PDF rather than managing multiple attachments individually.
    </p>

    <p className="text-justify">
      Merging can reduce confusion during collaboration because everyone works with the same combined document instead of different disconnected files. It also simplifies cloud storage organisation and document archiving.
    </p>

    <p className="text-justify">
      For presentations, reports, and client submissions, merged PDFs create a cleaner and more professional appearance overall.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Why Browser Based PDF Tools Feel More Convenient
    </h3>

    <p className="text-justify">
      Browser based tools simplify accessibility because users can merge PDFs instantly without downloading software or creating accounts. This makes the process much easier across laptops, desktops, tablets, and smartphones.
    </p>

    <p className="text-justify">
      This PDF Merger works directly inside the browser, creating a lightweight and beginner friendly experience. Users can upload files, arrange order, merge documents, and download results quickly without technical complexity.
    </p>

    <p className="text-justify">
      Users handling editable document workflows sometimes additionally use the <a href="https://convertixy.com/pdf-to-word" className="text-blue-600 hover:underline font-medium">PDF to Word Converter</a> while modifying content before combining multiple PDFs together again.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Storage and Sharing Advantages of Merged Documents
    </h3>

    <p className="text-justify">
      Organised merged files improve storage efficiency because related pages stay together in one structured document instead of scattered across multiple folders. This makes searching and retrieval much easier later.
    </p>

    <p className="text-justify">
      Sharing one merged PDF also reduces upload confusion during email communication, cloud storage collaboration, and online submissions. Many platforms prefer single document uploads because they simplify verification and management processes.
    </p>

    <p className="text-justify">
      Businesses and educational institutions especially benefit from organised PDF packages because they improve workflow consistency and reduce document handling mistakes.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Privacy Benefits of Local Browser Processing
    </h3>

    <p className="text-justify">
      PDF files often contain confidential business information, legal agreements, financial reports, certificates, and personal records. Because of this, privacy protection during merging becomes extremely important.
    </p>

    <p className="text-justify">
      Since this PDF Merger processes files locally inside the browser, uploaded documents remain on the user device during merging operations. Files do not need external server storage before processing completes.
    </p>

    <p className="text-justify">
      Local processing improves both security and speed because merging happens directly on the device without relying on cloud based document handling systems.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Common Problems Users Face While Managing PDFs
    </h3>

    <p className="text-justify">
      Many users struggle with sending incomplete files, uploading pages in the wrong order, or accidentally forgetting important supporting documents during submissions. Large document collections can also become difficult to organise over time.
    </p>

    <p className="text-justify">
      Merging PDFs reduces these problems because all related pages remain together inside a single structured file. This lowers the chances of missing attachments or document confusion during important workflows.
    </p>

    <p className="text-justify">
      Users handling scanned pages and image heavy documents sometimes additionally use the <a href="https://convertixy.com/image-to-pdf" className="text-blue-600 hover:underline font-medium">Image to PDF Converter</a> before merging multiple generated PDF files together.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Helpful Tips for Better PDF Organisation
    </h3>

    <p className="text-justify">
      Users should organise source files clearly before merging and use descriptive file names whenever possible. Keeping consistent naming conventions improves document management significantly, especially for professional workflows.
    </p>

    <p className="text-justify">
      It is also useful to review merged PDFs before sharing them publicly to ensure correct page order and complete document inclusion. Compressing oversized merged files can further improve upload speed and sharing convenience.
    </p>

    <p className="text-justify">
      Maintaining backup copies of original source documents is recommended in case future edits or reorganisations become necessary later.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Why PDF Merging Is Useful for Businesses and Students
    </h3>

    <p className="text-justify">
      Students benefit from merged PDFs because assignments, notes, certificates, and project submissions become easier to organise and submit online. Businesses similarly improve workflow efficiency by combining reports, presentations, agreements, and invoices into structured client ready files.
    </p>

    <p className="text-justify">
      Professional presentation quality also improves because recipients receive one organised document rather than many scattered attachments. This creates cleaner communication and better overall document management experiences.
    </p>

    <p className="text-justify">
      As digital documentation continues growing worldwide, efficient PDF management tools will remain increasingly valuable across education, business, and personal productivity workflows.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Final Thoughts on Using a PDF Merger
    </h3>

    <p className="text-justify">
      PDF merging has become an important part of modern document handling because users regularly work with multiple related files that need better organisation, sharing convenience, and storage efficiency.
    </p>

    <p className="text-justify">
      This browser based PDF Merger provides a fast and beginner friendly way to combine multiple PDF files into one organised document without complicated software or technical knowledge. Users can merge files instantly while preserving original formatting and document quality.
    </p>

    <p className="text-justify">
      Whether you are preparing job applications, managing business reports, submitting assignments, organising archives, or sharing client documents, PDF merging helps create cleaner, simpler, and more efficient document workflows across modern digital environments.
    </p>
  </div>
</section>
    </ToolSection>
  );
}
