"use client";

import { useState, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function PdfSplitPage() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [splitting, setSplitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [pageCount, setPageCount] = useState(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  async function handleFileChange(f) {
    setFile(f);
    setFileName(f ? f.name : "");
    setError("");
    setMessage("");
    setProgress(0);
    
    if (f) {
      try {
        const bytes = new Uint8Array(await f.arrayBuffer());
        const pdf = await PDFDocument.load(bytes);
        const count = pdf.getPageCount();
        setPageCount(count);
        setMessage(`✅ PDF loaded successfully! ${count} pages detected.`);
      } catch (err) {
        console.error(err);
        setPageCount(null);
        setError("❌ Invalid PDF file. Please select a valid PDF document.");
      }
    } else {
      setPageCount(null);
    }
  }

  async function handleSplit() {
    setError("");
    setMessage("");
    
    if (!file) {
      setError("⚠️ Please select a PDF file first.");
      return;
    }

    try {
      setSplitting(true);
      setMessage("🔄 Splitting PDF into individual pages...");
      
      const inputBytes = new Uint8Array(await file.arrayBuffer());
      const inputPdf = await PDFDocument.load(inputBytes);
      const count = inputPdf.getPageCount();

      const zip = new JSZip();

      // Split each page
      for (let i = 0; i < count; i++) {
        const outPdf = await PDFDocument.create();
        const [copied] = await outPdf.copyPages(inputPdf, [i]);
        outPdf.addPage(copied);
        const bytes = await outPdf.save();
        zip.file(`page-${String(i + 1).padStart(3, '0')}.pdf`, bytes);
        
        // Update progress
        setProgress(Math.round(((i + 1) / count) * 100));
      }

      setMessage("📦 Creating ZIP file...");
      
      // Generate ZIP
      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `split-${fileName.replace('.pdf', '')}-${Date.now()}.zip`;
      a.click();
      URL.revokeObjectURL(url);

      setMessage(`✅ Successfully split ${count} pages! ZIP file downloaded.`);
      setProgress(100);
    } catch (e) {
      console.error(e);
      setError("❌ Failed to split PDF. Please try with a different file.");
    } finally {
      setSplitting(false);
    }
  }

  function resetAll() {
    setFile(null);
    setFileName("");
    setPageCount(null);
    setError("");
    setMessage("");
    setProgress(0);
    setSplitting(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      {/* SEO JSON-LD */}
      <JsonLd
        data={buildToolJsonLd({
          name: "PDF Split - Split PDF into Separate Pages",
          description: "Free online PDF splitter tool. Split PDF into individual pages and download as ZIP. Fast, secure, browser-based PDF splitting.",
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

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-5 sm:p-6 shadow-sm mb-10">
          <h1 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-700">
            PDF Split Tool
          </h1>
          <p className="mt-2 text-center text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Split PDF pages into individual files and download them in a ZIP.
          </p>
        </div>

        {/* Main Tool Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="space-y-6">
            {/* Status Messages */}
            {message && !error && (
              <div className={`px-4 py-3 rounded-xl border-2 ${
                message.includes('✅') 
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800' 
                  : 'bg-blue-50 border-blue-300 text-blue-800'
              } text-sm font-medium animate-[fadeIn_0.3s_ease-in]`}>
                {message}
              </div>
            )}
            
            {error && (
              <div className="px-4 py-3 rounded-xl border-2 bg-red-50 border-red-300 text-red-800 text-sm font-medium animate-[fadeIn_0.3s_ease-in]">
                {error}
              </div>
            )}

            {/* File Upload Section */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">📄</span>
                Upload PDF File
              </label>
              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={(e) => handleFileChange((e.target.files || [])[0] || null)}
                  className="w-full px-4 py-4 border-2 border-dashed border-gray-300 rounded-xl 
                           focus:ring-2 focus:ring-slate-500 focus:border-slate-500 
                           transition-all duration-200 cursor-pointer bg-gray-50
                           hover:border-slate-400 hover:bg-gray-100
                           file:mr-4 file:py-2 file:px-6 file:rounded-lg file:border-0
                           file:bg-slate-900 file:text-white file:font-semibold
                           file:cursor-pointer hover:file:bg-slate-800"
                />
              </div>
            </div>

            {/* File Preview Card */}
            {file && (
              <div className="bg-gradient-to-r from-slate-50 to-gray-50 border-2 border-slate-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="text-5xl">📑</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-2 break-all">
                      {fileName}
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      {pageCount !== null && (
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">📃</span>
                          <div>
                            <div className="text-gray-600 text-xs">Total Pages</div>
                            <div className="font-bold text-slate-900">{pageCount}</div>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">💾</span>
                        <div>
                          <div className="text-gray-600 text-xs">File Size</div>
                          <div className="font-bold text-slate-900">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                {splitting && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-2">
                      <span>Processing...</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-slate-600 to-slate-800 transition-all duration-300 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 flex-wrap justify-center pt-4">
              <button
                onClick={handleSplit}
                disabled={splitting || !file || !pageCount}
                className="px-8 py-4 rounded-xl font-bold text-white 
                         bg-gradient-to-r from-slate-900 to-slate-700
                         hover:from-slate-800 hover:to-slate-600
                         disabled:opacity-50 disabled:cursor-not-allowed
                         shadow-lg hover:shadow-xl transition-all duration-200
                         flex items-center gap-3 text-lg"
              >
                {splitting ? (
                  <>
                    <span className="inline-block animate-spin text-xl">⚙️</span>
                    Splitting Pages...
                  </>
                ) : (
                  <>
                    <span className="text-xl">✂️</span>
                    Split & Download ZIP
                  </>
                )}
              </button>

              {file && (
                <button
                  onClick={resetAll}
                  disabled={splitting}
                  className="px-8 py-4 rounded-xl font-bold text-gray-700 
                           bg-gray-100 hover:bg-gray-200 border-2 border-gray-300
                           transition-all duration-200 text-lg
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  🔄 Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
            <span className="text-2xl">⚡</span> How It Works
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { num: "1", icon: "📤", title: "Upload", desc: "Select your PDF file" },
              { num: "2", icon: "🔍", title: "Detect", desc: "Pages are counted" },
              { num: "3", icon: "✂️", title: "Split", desc: "Each page separated" },
              { num: "4", icon: "📦", title: "Download", desc: "Get ZIP file" }
            ].map((step) => (
              <div key={step.num} className="text-center p-4 bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">
                  {step.num}
                </div>
                <div className="text-3xl mb-2">{step.icon}</div>
                <h4 className="font-bold text-gray-900 mb-1">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {[
            { 
              icon: "🔒", 
              title: "100% Secure", 
              desc: " Your files never leave your device.",
              color: "emerald"
            },
            { 
              icon: "⚡", 
              title: "Lightning Fast", 
              desc: "Split hundreds of pages in seconds.",
              color: "blue"
            },
            { 
              icon: "100%", 
              title: "Completely Free", 
              desc: " no hidden fees. Unlimited usage forever.",
              color: "purple"
            },
          ].map((feature, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-3">{feature.icon}</div>
              <h4 className="font-bold text-gray-900 text-lg mb-2">{feature.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* SEO Content Section */}
        <section className="mx-auto mt-12 sm:mt-14 w-full max-w-5xl p-5 sm:p-6 md:p-8 bg-white shadow-md rounded-2xl border border-slate-200">
  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 border-b border-slate-200 pb-3">
    Why PDF Splitting Has Become Important for Modern Document Management
  </h2>

  <div className="space-y-4 text-sm sm:text-base leading-7 text-slate-700">
    <p className="text-justify">
      PDF files have become one of the most commonly used formats for business documents, educational resources, legal records, reports, contracts, and digital archives. PDFs help preserve formatting consistently across different devices and operating systems, which makes them highly reliable for professional communication and document sharing.
    </p>

    <p className="text-justify">
      However, large PDF files can sometimes become difficult to manage. Multi-page reports, scanned books, combined contracts, research papers, and presentation documents often contain sections that users need separately rather than as one complete file. In these situations, a PDF Splitter becomes extremely useful because it allows users to divide large PDFs into smaller and more manageable files.
    </p>

    <p className="text-justify">
      Instead of manually recreating documents or using complicated editing software, users can instantly separate pages into individual PDFs and organise content more efficiently according to their specific workflow needs.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Understanding Why PDF Splitting Is Useful
    </h3>

    <p className="text-justify">
      Many workflows involve large PDF files containing multiple unrelated sections. Businesses may store complete contracts, invoices, agreements, and reports inside a single document package. Students and researchers often download lengthy study material where only selected chapters or pages are needed for immediate use.
    </p>

    <p className="text-justify">
      Sharing an entire large PDF when only a few pages are required creates unnecessary confusion and increases file management complexity. Splitting helps users extract only the relevant pages needed for sharing, printing, storage, or collaboration.
    </p>

    <p className="text-justify">
      This improves organisation significantly while reducing the effort required to manage oversized document collections.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      How This PDF Splitter Works
    </h3>

    <p className="text-justify">
      This browser based PDF Splitter allows users to upload a PDF file and separate its pages into individual PDF documents automatically. Each extracted page becomes an independent file while preserving original formatting, images, text quality, and layout structure.
    </p>

    <p className="text-justify">
      After processing completes, all separated pages are packaged together for convenient downloading and organisation. This approach makes handling large documents significantly easier compared to manual editing methods.
    </p>

    <p className="text-justify">
      Since everything works directly inside the browser, users can split PDFs instantly without installing desktop software or relying on complicated document editing tools.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Common Situations Where PDF Splitting Helps
    </h3>

    <p className="text-justify">
      Businesses frequently split reports, invoices, contracts, employee records, and presentation documents before distributing pages to different teams or departments. Legal professionals regularly extract exhibits, agreements, and supporting pages from large case files.
    </p>

    <p className="text-justify">
      Students often separate textbook chapters, assignments, notes, and research material for easier study organisation. Teachers similarly split educational resources before distributing selected lessons to students.
    </p>

    <p className="text-justify">
      Users managing complete PDF workflows sometimes additionally use the <a href="https://convertixy.com/pdf-merger" className="text-blue-600 hover:underline font-medium">PDF Merger</a> later to reorganise selected pages into newly structured documents.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Why Smaller PDF Files Improve Workflow Efficiency
    </h3>

    <p className="text-justify">
      Smaller individual PDFs are easier to share, upload, store, and organise compared to large combined documents. Many online platforms and email systems have file size restrictions that make oversized PDFs difficult to distribute conveniently.
    </p>

    <p className="text-justify">
      Splitting also improves document navigation because users can access only the pages they need instead of searching through hundreds of unnecessary pages repeatedly.
    </p>

    <p className="text-justify">
      This becomes especially valuable for professional environments where teams regularly exchange specific reports, approvals, invoices, or records during daily workflows.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Why Browser Based PDF Tools Feel More Convenient
    </h3>

    <p className="text-justify">
      Browser based utilities simplify accessibility because users can process PDF files instantly without software installation or account registration. This makes document management easier across desktops, laptops, tablets, and smartphones.
    </p>

    <p className="text-justify">
      This PDF Splitter works directly inside the browser, providing a lightweight and beginner friendly experience. Users can upload a file, split pages, and download results quickly without technical expertise.
    </p>

    <p className="text-justify">
      Users handling editable document workflows sometimes additionally use the <a href="https://convertixy.com/pdf-to-word" className="text-blue-600 hover:underline font-medium">PDF to Word Converter</a> after extracting important pages that require further editing or content updates.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Privacy Advantages of Local Browser Processing
    </h3>

    <p className="text-justify">
      PDF documents often contain confidential business information, legal records, educational material, personal documents, and financial reports. Because of this, privacy protection during processing becomes extremely important.
    </p>

    <p className="text-justify">
      Many online tools require uploading files to external servers before processing, which may create unnecessary privacy concerns for sensitive documents.
    </p>

    <p className="text-justify">
      Since this PDF Splitter processes everything locally inside the browser, uploaded documents remain on the user device throughout the entire splitting process. Files do not need to be stored externally before extraction completes.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Why PDF Splitting Helps With Better Organisation
    </h3>

    <p className="text-justify">
      Organising separate PDF pages individually helps users create cleaner folder structures and more focused document collections. Instead of keeping large mixed files, users can group extracted pages according to projects, departments, subjects, or categories.
    </p>

    <p className="text-justify">
      This improves document retrieval speed later because users no longer need to search manually through long reports or combined files repeatedly.
    </p>

    <p className="text-justify">
      Businesses handling extensive archives especially benefit from splitting because it improves digital record management and simplifies internal document access.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Why Split PDFs Maintain Original Quality
    </h3>

    <p className="text-justify">
      PDF splitting is a lossless process because pages are extracted directly from the original file without reducing image clarity, text sharpness, or formatting quality.
    </p>

    <p className="text-justify">
      Fonts, graphics, layouts, hyperlinks, and page dimensions remain preserved exactly as they appeared inside the original PDF document.
    </p>

    <p className="text-justify">
      This allows users to confidently distribute split pages professionally without worrying about quality degradation or formatting inconsistencies.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Helpful Tips for Better PDF Splitting Workflows
    </h3>

    <p className="text-justify">
      Users should maintain backup copies of original PDF files before splitting important documents. This helps preserve original structure in case different page arrangements become necessary later.
    </p>

    <p className="text-justify">
      Renaming extracted pages using descriptive filenames also improves organisation significantly. Clear names make searching and sharing much easier compared to generic page numbering alone.
    </p>

    <p className="text-justify">
      Users handling scanned document workflows sometimes additionally use the <a href="https://convertixy.com/pdf-rotator" className="text-blue-600 hover:underline font-medium">PDF Rotator</a> before splitting files to correct page orientation for better readability and presentation.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Why PDF Splitting Is Valuable for Businesses and Students
    </h3>

    <p className="text-justify">
      Businesses benefit from PDF splitting because reports, contracts, invoices, and records become easier to distribute internally between departments and clients. Employees can access only the pages relevant to their responsibilities instead of handling oversized files unnecessarily.
    </p>

    <p className="text-justify">
      Students and teachers similarly improve educational workflow efficiency by separating notes, assignments, chapters, and study resources into manageable sections for easier learning and sharing.
    </p>

    <p className="text-justify">
      As digital document usage continues growing worldwide, flexible PDF management tools will remain increasingly important across professional, academic, and personal workflows.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Environmental and Productivity Benefits of Digital Document Splitting
    </h3>

    <p className="text-justify">
      Splitting PDFs digitally reduces unnecessary printing because users can share only the required pages instead of entire large documents. This lowers paper usage, printing costs, and physical storage requirements.
    </p>

    <p className="text-justify">
      Digital workflows also improve communication speed because separated files can be distributed instantly across email systems, cloud storage platforms, and collaborative work environments.
    </p>

    <p className="text-justify">
      Better organisation and reduced clutter ultimately help improve productivity while creating cleaner and more efficient document management systems overall.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Final Thoughts on Using a PDF Splitter
    </h3>

    <p className="text-justify">
      PDF splitting has become an essential part of modern document management because users regularly work with large files that require better organisation, sharing flexibility, and easier access to individual pages.
    </p>

    <p className="text-justify">
      This browser based PDF Splitter provides a fast and beginner friendly way to separate PDF pages instantly while maintaining original quality and formatting. Users can extract pages securely without complicated software or technical expertise.
    </p>

    <p className="text-justify">
      Whether you are organising business reports, managing legal documents, preparing educational resources, handling research material, or simplifying personal file collections, PDF splitting helps create cleaner, more flexible, and more efficient digital document workflows across all devices and platforms.
    </p>
  </div>
</section>
      </div>
    </main>
  );
}
