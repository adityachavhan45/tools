"use client";

import { useState, useRef } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function PdfRotatePage() {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileName, setPdfFileName] = useState("");
  const [rotation, setRotation] = useState(90);
  const [isProcessing, setIsProcessing] = useState(false);
  const [rotatedPdfUrl, setRotatedPdfUrl] = useState("");
  const [message, setMessage] = useState("");
  const [previewRotation, setPreviewRotation] = useState(0);
  const fileInputRef = useRef(null);

  function handlePdfUpload(event) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      setPdfFileName(file.name);
      setRotatedPdfUrl("");
      setPreviewRotation(0);
      setMessage("✅ PDF uploaded successfully! Select rotation angle and click 'Rotate PDF'.");
    } else {
      setMessage("❌ Please select a valid PDF file.");
    }
  }

  async function rotatePdf() {
    if (!pdfFile) {
      setMessage("⚠️ Please upload a PDF file first.");
      return;
    }

    setIsProcessing(true);
    setMessage("🔄 Processing your PDF...");

    try {
      // Dynamically import pdf-lib
      const { PDFDocument, degrees } = await import('pdf-lib');
      
      // Read the PDF file
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      // Create a new PDF document
      const rotatedPdf = await PDFDocument.create();
      
      // Get all pages from the original PDF
      const pages = pdfDoc.getPages();
      
      // Rotate each page
      for (let i = 0; i < pages.length; i++) {
        const [copiedPage] = await rotatedPdf.copyPages(pdfDoc, [i]);
        copiedPage.setRotation(degrees(rotation));
        rotatedPdf.addPage(copiedPage);
      }
      
      // Save the rotated PDF
      const pdfBytes = await rotatedPdf.save();
      
      // Create a blob and URL for download
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      setRotatedPdfUrl(url);
      setPreviewRotation(rotation);
      setMessage(`✅ PDF rotated ${rotation}° successfully! Click 'Download Rotated PDF' to save.`);
      setIsProcessing(false);
    } catch (error) {
      console.error('Error rotating PDF:', error);
      setMessage("❌ Error processing PDF. Please try again with a different file.");
      setIsProcessing(false);
    }
  }

  function downloadRotatedPdf() {
    if (rotatedPdfUrl) {
      const link = document.createElement('a');
      link.href = rotatedPdfUrl;
      link.download = `rotated_${rotation}_${pdfFileName}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setMessage("📥 Download started! Check your downloads folder.");
    }
  }

  function reset() {
    setPdfFile(null);
    setPdfFileName("");
    setRotation(90);
    setRotatedPdfUrl("");
    setPreviewRotation(0);
    setMessage("");
    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <ToolSection
      title="PDF Rotate - Free Online PDF Rotation Tool"
      subtitle="Rotate PDF pages online for free. Quickly rotate PDFs by 90°, 180°, or 270° with our secure, browser-based tool. No registration required."
      plain
      hideSidebar
      centerHeader
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "PDF Rotate",
          description: "Free online tool to rotate PDF pages by 90, 180, or 270 degrees. Secure browser-based PDF rotation with no uploads required.",
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

      <div className="max-w-5xl mx-auto">
        <div className="rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-5 sm:p-6 shadow-sm mb-8">
          <h1 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-700">
            PDF Rotate Tool
          </h1>
          <p className="mt-2 text-center text-sm sm:text-base text-slate-600">
            Rotate PDF pages by 90°, 180°, or 270° instantly in your browser.
          </p>
        </div>

        {/* Main Tool Card */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl shadow-lg p-8 mb-8 border border-indigo-100">
          <div className="space-y-6">
            {/* Status Messages */}
            {message && (
              <div className={`px-4 py-3 rounded-lg border ${
                message.includes('❌') ? 'bg-red-50 border-red-200 text-red-800' :
                message.includes('⚠️') ? 'bg-yellow-50 border-yellow-200 text-yellow-800' :
                'bg-green-50 border-green-200 text-green-800'
              } text-sm font-medium animate-[fadeIn_0.3s_ease-in]`}>
                {message}
              </div>
            )}

            {/* PDF Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                📄 Upload PDF File
              </label>
              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handlePdfUpload}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl 
                           focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                           transition-all duration-200 cursor-pointer
                           file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
                           file:bg-indigo-600 file:text-white file:font-medium
                           file:cursor-pointer hover:file:bg-indigo-700"
                />
              </div>
              {pdfFileName && (
                <p className="mt-2 text-sm text-gray-600 flex items-center gap-2">
                  <span className="text-green-600">✓</span> {pdfFileName}
                </p>
              )}
            </div>

            {/* Rotation Options */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                🔄 Select Rotation Angle
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 90, label: '90°', desc: 'Clockwise' },
                  { value: 180, label: '180°', desc: 'Upside Down' },
                  { value: 270, label: '270°', desc: 'Counter-Clockwise' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setRotation(option.value)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      rotation === option.value
                        ? 'border-indigo-600 bg-indigo-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-indigo-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="text-2xl font-bold text-gray-900">{option.label}</div>
                    <div className="text-xs text-gray-600 mt-1">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Preview */}
            {pdfFile && (
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  👁️ Preview
                </label>
                <div className="bg-white border-2 border-gray-200 rounded-xl p-8 text-center">
                  <div 
                    className="inline-block transition-transform duration-500"
                    style={{ transform: `rotate(${previewRotation}deg)` }}
                  >
                    <div className="text-7xl mb-4">📄</div>
                    <div className="text-gray-700 font-medium">{pdfFileName}</div>
                    {previewRotation > 0 && (
                      <div className="text-sm text-indigo-600 mt-2 font-semibold">
                        Rotated {previewRotation}°
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 flex-wrap justify-center pt-4">
              <button
                onClick={rotatePdf}
                disabled={!pdfFile || isProcessing}
                className="px-8 py-3 rounded-xl font-semibold text-white 
                         bg-gradient-to-r from-indigo-600 to-blue-600 
                         hover:from-indigo-700 hover:to-blue-700
                         disabled:opacity-50 disabled:cursor-not-allowed
                         shadow-lg hover:shadow-xl transition-all duration-200
                         flex items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <span className="inline-block animate-spin">⚙️</span>
                    Processing...
                  </>
                ) : (
                  <>
                    🔄 Rotate PDF
                  </>
                )}
              </button>

              {rotatedPdfUrl && (
                <button
                  onClick={downloadRotatedPdf}
                  className="px-8 py-3 rounded-xl font-semibold text-white 
                           bg-gradient-to-r from-green-600 to-emerald-600 
                           hover:from-green-700 hover:to-emerald-700
                           shadow-lg hover:shadow-xl transition-all duration-200
                           flex items-center gap-2"
                >
                  📥 Download Rotated PDF
                </button>
              )}

              {(pdfFile || rotatedPdfUrl) && (
                <button
                  onClick={reset}
                  className="px-8 py-3 rounded-xl font-semibold text-gray-700 
                           bg-gray-100 hover:bg-gray-200 border-2 border-gray-300
                           transition-all duration-200"
                >
                  🔄 Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Quick Guide */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">⚡</span> Quick Guide
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex gap-3">
              <span className="text-2xl">1️⃣</span>
              <div>
                <strong className="text-gray-900">Upload PDF</strong>
                <p className="text-gray-600">Click Choose File and select your PDF document</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl">2️⃣</span>
              <div>
                <strong className="text-gray-900">Choose Angle</strong>
                <p className="text-gray-600">Select 90°, 180°, or 270° rotation</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl">3️⃣</span>
              <div>
                <strong className="text-gray-900">Rotate</strong>
                <p className="text-gray-600">Click Rotate PDF to process your document</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl">4️⃣</span>
              <div>
                <strong className="text-gray-900">Download</strong>
                <p className="text-gray-600">Save your rotated PDF to your device</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[
            { icon: '🔒', title: 'Secure & Private', desc: 'All processing happens in your browser' },
            { icon: '⚡', title: 'Fast Processing', desc: 'Instant rotation without server delays' },
            { icon: '💯', title: '100% Free', desc: 'No registration or payment required' },
          ].map((feature, idx) => (
            <div key={idx} className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 text-center">
              <div className="text-4xl mb-2">{feature.icon}</div>
              <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SEO Content Section */}
      <section className="mx-auto mt-12 sm:mt-14 w-full max-w-5xl p-5 sm:p-6 md:p-8 bg-white shadow-md rounded-2xl border border-slate-200">
  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 border-b border-slate-200 pb-3">
    Why PDF Rotation Is Important for Better Document Viewing and Organisation
  </h2>

  <div className="space-y-4 text-sm sm:text-base leading-7 text-slate-700">
    <p className="text-justify">
      PDF files are widely used for sharing reports, contracts, study materials, presentations, scanned documents, invoices, and many other types of digital content. One major reason PDFs remain popular is because they preserve formatting consistently across different devices and operating systems. However, users often face a very common issue while working with PDFs: incorrect page orientation.
    </p>

    <p className="text-justify">
      Scanned documents may appear sideways, presentation pages can become upside down, and some multi-page files contain mixed page orientations that make reading uncomfortable. These problems reduce readability and create an unprofessional viewing experience, especially during business communication or academic work.
    </p>

    <p className="text-justify">
      A PDF Rotator helps solve these issues quickly by adjusting page orientation digitally without affecting document quality. Instead of rescanning files or manually editing content, users can rotate PDFs instantly and restore proper readability within seconds.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Why Incorrect PDF Orientation Happens So Often
    </h3>

    <p className="text-justify">
      Incorrect page orientation usually happens during scanning, exporting, or document conversion processes. Physical papers scanned through office scanners or mobile scanning apps may accidentally be captured in landscape mode instead of portrait orientation.
    </p>

    <p className="text-justify">
      Some PDF creation tools and printer drivers also handle orientation inconsistently, especially when documents contain mixed layouts such as diagrams, charts, tables, or presentation slides. Multi-page reports assembled from different sources often end up with inconsistent page directions as well.
    </p>

    <p className="text-justify">
      These orientation issues become frustrating when users need to read long documents, review contracts, or present files professionally during meetings and submissions.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      How This PDF Rotator Works
    </h3>

    <p className="text-justify">
      This browser based PDF Rotator allows users to upload PDF files and rotate pages instantly using standard rotation angles such as ninety degrees, one hundred eighty degrees, and two hundred seventy degrees.
    </p>

    <p className="text-justify">
      During processing, the tool adjusts the page orientation metadata inside the PDF structure without modifying the actual text, images, or layout quality. This means the content remains completely unchanged while the viewing direction becomes corrected.
    </p>

    <p className="text-justify">
      Since the entire process works directly inside the browser, users can rotate documents quickly without downloading heavy desktop software or using complicated editing applications.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Why Digital Rotation Is Better Than Re-Scanning Documents
    </h3>

    <p className="text-justify">
      Many users unnecessarily rescan documents when they notice orientation problems. While rescanning may seem simple initially, it creates several practical issues. First, rescanning requires physical access to the original paper document, which may not always be available.
    </p>

    <p className="text-justify">
      Second, repeated scanning can reduce image clarity slightly, especially for documents containing detailed graphics or small text. Third, rescanning wastes time and increases workflow complexity unnecessarily.
    </p>

    <p className="text-justify">
      Digital PDF rotation solves these problems instantly without reducing quality because it only changes viewing orientation instead of recreating the document from scratch.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Understanding Common Rotation Angles
    </h3>

    <p className="text-justify">
      The most common rotation angle is ninety degrees clockwise, which helps correct pages scanned sideways toward the left. This option is frequently used for business documents, letters, and forms scanned incorrectly in landscape mode.
    </p>

    <p className="text-justify">
      A one hundred eighty degree rotation completely flips pages upside down and is useful when scanned documents appear reversed. Two hundred seventy degree rotation works as a counter clockwise adjustment and helps fix pages rotated toward the opposite direction.
    </p>

    <p className="text-justify">
      Choosing the correct angle allows users to restore proper readability quickly while maintaining clean document presentation.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Common Situations Where PDF Rotation Becomes Useful
    </h3>

    <p className="text-justify">
      Students frequently rotate lecture notes, assignments, and scanned study material before reading or submitting files online. Teachers also correct scanned worksheets and educational documents before distributing them digitally.
    </p>

    <p className="text-justify">
      Businesses commonly rotate invoices, contracts, presentations, reports, and scanned records received from different departments or clients. Legal professionals regularly handle large collections of scanned documents requiring orientation correction before review.
    </p>

    <p className="text-justify">
      Users managing multiple document workflows sometimes additionally use the <a href="https://convertixy.com/pdf-merger" className="text-blue-600 hover:underline font-medium">PDF Merger</a> after rotating pages to combine corrected files into organised document collections.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Why Browser Based PDF Tools Feel More Convenient
    </h3>

    <p className="text-justify">
      Browser based tools simplify accessibility because users can instantly rotate PDFs without software installation or account registration. This allows quick document correction directly from laptops, desktops, tablets, and smartphones.
    </p>

    <p className="text-justify">
      This PDF Rotator works directly inside the browser, creating a lightweight and beginner friendly experience. Users simply upload the file, select rotation direction, and generate the corrected PDF instantly.
    </p>

    <p className="text-justify">
      Users handling broader document management workflows sometimes additionally use the <a href="https://convertixy.com/pdf-compressor" className="text-blue-600 hover:underline font-medium">PDF Compressor</a> after rotation to reduce file size for easier uploading and sharing.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      How Proper Orientation Improves Readability
    </h3>

    <p className="text-justify">
      Correctly oriented documents improve readability significantly because users no longer need to tilt screens or rotate devices manually while reading. This becomes especially important during long study sessions, report reviews, or detailed document analysis.
    </p>

    <p className="text-justify">
      Proper orientation also improves professionalism during client presentations, official submissions, and business communication. Sideways or upside down pages can create a careless impression even when the document content itself is accurate.
    </p>

    <p className="text-justify">
      Mobile users benefit even more because incorrectly rotated pages become very difficult to read comfortably on smaller screens.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Why PDF Rotation Does Not Reduce Document Quality
    </h3>

    <p className="text-justify">
      PDF rotation is considered a lossless process because it changes only the display orientation information stored inside the PDF file. The actual text, images, vector graphics, and formatting remain unchanged.
    </p>

    <p className="text-justify">
      Unlike image editing processes that may recompress graphics or reduce clarity, PDF rotation simply updates viewing instructions without recreating the document content itself.
    </p>

    <p className="text-justify">
      This allows users to rotate documents multiple times if necessary without worrying about quality degradation or increased file corruption risks.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Privacy Advantages of Local Browser Processing
    </h3>

    <p className="text-justify">
      PDF files often contain confidential business records, legal documents, educational material, financial reports, and personal information. Because of this, protecting privacy during document processing becomes extremely important.
    </p>

    <p className="text-justify">
      Since this PDF Rotator processes everything locally inside the browser, uploaded documents remain on the user device throughout the rotation process. Files do not need to be stored externally before correction completes.
    </p>

    <p className="text-justify">
      Local browser processing improves both security and speed because the document never leaves the device during orientation correction workflows.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Helpful Tips for Better PDF Management
    </h3>

    <p className="text-justify">
      Users should review all pages carefully after rotation to confirm proper orientation before sharing or printing the document. Creating backup copies of important PDFs before editing also remains a good practice for professional workflows.
    </p>

    <p className="text-justify">
      Organising files using clear names after rotation can help avoid confusion when managing multiple document versions. For example, adding labels such as rotated or corrected makes file identification easier later.
    </p>

    <p className="text-justify">
      Users handling scanned image based workflows sometimes additionally use the <a href="https://convertixy.com/image-to-pdf" className="text-blue-600 hover:underline font-medium">Image to PDF Converter</a> while rebuilding corrected document collections digitally.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Why Proper PDF Orientation Matters for Accessibility
    </h3>

    <p className="text-justify">
      Correctly oriented documents improve accessibility for all users, including people using screen readers and assistive technologies. Many accessibility tools perform better when page layouts follow standard reading orientation naturally.
    </p>

    <p className="text-justify">
      Proper orientation also reduces eye strain and improves reading comfort during long sessions. Readers can focus fully on content instead of constantly adjusting screens or struggling with awkward page layouts.
    </p>

    <p className="text-justify">
      As digital documents continue becoming more important globally, maintaining clean and readable document orientation remains an essential part of professional file management.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Final Thoughts on Using a PDF Rotator
    </h3>

    <p className="text-justify">
      PDF rotation has become an important document management feature because incorrectly oriented pages reduce readability, professionalism, and accessibility across educational, personal, and business workflows.
    </p>

    <p className="text-justify">
      This browser based PDF Rotator provides a fast and beginner friendly way to correct document orientation instantly without affecting file quality or requiring complicated software installation. Users can rotate PDFs quickly while maintaining original formatting and visual clarity.
    </p>

    <p className="text-justify">
      Whether you are fixing scanned reports, adjusting presentation slides, correcting educational documents, or organising professional files, proper PDF rotation helps create cleaner, more readable, and more professional digital document experiences across all devices and platforms.
    </p>
  </div>
</section>
    </ToolSection>
  );
}
