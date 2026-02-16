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
      plainSidebar
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

      <div className="max-w-4xl mx-auto">
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
      <section className="mt-12 max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Complete Guide to PDF Rotation: Everything You Need to Know
        </h2>
        
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6" style={{textAlign: 'justify'}}>
          <p>
            PDF documents have become the universal standard for sharing professional files across different platforms and devices. Whether you are working with contracts, presentations, reports, or educational materials, PDFs ensure that your content looks identical regardless of where it is opened. However, one common challenge that many users face is dealing with incorrectly oriented pages. Scanned documents often appear sideways, presentation slides may be upside down, and multi-page reports can have mixed orientations that make reading difficult and unprofessional. This is where a reliable PDF rotation tool becomes essential for anyone who regularly works with digital documents.
          </p>

          <p>
            The need to rotate PDF pages arises in numerous everyday situations. When scanning physical documents using office scanners or mobile apps, pages frequently end up in landscape mode when they should be portrait, or vice versa. Students downloading lecture notes might find that some pages are rotated incorrectly. Business professionals preparing presentations discover that certain slides need to be adjusted for proper viewing. Architects and engineers working with technical drawings often need to rotate blueprints and diagrams to match standard viewing orientations. In all these cases, having quick access to a free, easy-to-use PDF rotation tool can save significant time and frustration.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Why You Should Rotate PDFs Instead of Re-Scanning Documents
          </h3>

          <p>
            Many people make the mistake of re-scanning documents when they notice orientation issues. This approach is not only time-consuming but also problematic for several important reasons. First, re-scanning requires physical access to the original document, which may not always be available, especially if you received the file digitally or the original has been discarded. Second, each scan cycle degrades the image quality slightly, particularly for documents that contain fine text or detailed graphics. Third, re-scanning wastes valuable time that could be spent on more productive tasks. A digital PDF rotation tool solves all these problems instantly by manipulating the existing file without any quality loss.
          </p>

          <p>
            Digital rotation preserves the original quality of your PDF because it simply changes the viewing orientation metadata without re-encoding the content. This means that text remains crisp, images stay sharp, and vector graphics maintain their precision. The process takes only seconds, even for large multi-page documents with hundreds of pages. You can rotate individual pages or entire documents with just a few clicks, making it far more efficient than any alternative method. Additionally, digital rotation maintains the file size, whereas re-scanning often produces larger files that consume more storage space and take longer to share via email or cloud services.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Understanding Different Rotation Angles and Their Applications
          </h3>

          <p>
            PDF rotation tools typically offer three main rotation angles: 90 degrees, 180 degrees, and 270 degrees. Understanding when to use each option helps you correct orientation issues efficiently. A 90-degree clockwise rotation is perfect for landscape documents that need to be converted to portrait orientation or for pages that are turned one quarter to the right. This is the most common rotation needed for scanned business letters, reports, and standard documents that were accidentally scanned in landscape mode.
          </p>

          <p>
            The 180-degree rotation flips the document completely upside down, which is useful when a page has been scanned or saved in reverse. This situation often occurs with documents that were placed face-down on a scanner or when PDF pages are imported from certain software applications that handle orientation differently. The 270-degree rotation, also known as counter-clockwise rotation, is effectively a 90-degree rotation in the opposite direction. This option is particularly useful for correcting landscape-oriented documents that need to be turned the other way or for undoing a previous incorrect 90-degree rotation.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            The Advantages of Browser-Based PDF Rotation Tools
          </h3>

          <p>
            Browser-based PDF rotation tools offer significant advantages over traditional desktop software and online services that require file uploads to remote servers. The most important benefit is privacy and security. When you use a browser-based tool like this one, all processing happens locally on your device. Your PDF never leaves your computer, which means there is zero risk of sensitive information being intercepted, stored on third-party servers, or accessed by unauthorized individuals. This is crucial when working with confidential business documents, personal financial records, medical files, legal contracts, or any other sensitive material.
          </p>

          <p>
            Another major advantage is accessibility and convenience. Browser-based tools require no installation, no software downloads, and no system updates. You can access the tool from any device with a modern web browser, whether you are using Windows, Mac, Linux, Android, or iOS. This cross-platform compatibility ensures that you can rotate PDFs whenever and wherever you need to, without being tied to a specific computer or operating system. Additionally, browser-based tools are typically free to use with no subscription fees, registration requirements, or hidden costs, making them accessible to everyone regardless of budget.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Common Scenarios Where PDF Rotation is Essential
          </h3>

          <p>
            PDF rotation proves invaluable in numerous professional and personal situations. In educational settings, teachers often scan worksheets, assignments, and study materials that need orientation correction before distribution to students. Students downloading research papers and academic articles from online databases frequently encounter pages that require rotation for comfortable reading. The ability to quickly fix these orientation issues improves the learning experience and saves time that would otherwise be wasted struggling with sideways text.
          </p>

          <p>
            In business environments, professionals regularly need to rotate PDF invoices, receipts, contracts, and reports. Scanned documents from multi-function office printers often require rotation adjustment, especially when different pages were scanned at different times or from different sources. Marketing teams working with brochures, flyers, and promotional materials need to ensure that all pages are correctly oriented before sending files to clients or printing services. Legal professionals handling court documents, depositions, and case files must maintain proper page orientation to ensure documents are presentable and professional.
          </p>

          <p>
            For creative professionals such as graphic designers, photographers, and architects, PDF rotation is frequently necessary when working with portfolios, project presentations, and technical drawings. Landscape-oriented images and diagrams often need to be rotated to fit within portrait-oriented document templates or vice versa. The ability to quickly rotate pages without losing image quality or file integrity is essential for maintaining professional standards and meeting client expectations.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Best Practices for PDF Rotation and Document Management
          </h3>

          <p>
            When rotating PDFs, following certain best practices ensures optimal results and prevents common mistakes. First, always create a backup copy of your original PDF before applying any rotations, especially when working with important legal documents, financial records, or irreplaceable files. While PDF rotation is a non-destructive process when done correctly, having a backup provides peace of mind and allows you to revert to the original if needed.
          </p>

          <p>
            Second, carefully review the rotated document before sharing or printing it. Open the rotated PDF and scroll through all pages to verify that the rotation was applied correctly and that all content is properly oriented. This simple quality check prevents embarrassing situations where you send a client or colleague a document with pages still sideways or upside down. Taking an extra minute for verification can save significant time and maintain your professional reputation.
          </p>

          <p>
            Third, use descriptive file names that indicate the document has been rotated. For example, instead of keeping the original filename, add a suffix like rotated or include the rotation angle in the name. This naming convention helps you quickly identify processed files and prevents confusion when you have multiple versions of the same document. Good file management practices like this become increasingly important as you work with more documents over time.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            How PDF Rotation Improves Document Accessibility and Readability
          </h3>

          <p>
            Properly oriented documents significantly enhance accessibility for all readers, including those using assistive technologies. Screen readers and text-to-speech software work best with correctly oriented text, as they rely on proper page structure to navigate and read content sequentially. When pages are sideways or upside down, these accessibility tools may struggle to interpret the content correctly, creating barriers for users with visual impairments or reading disabilities.
          </p>

          <p>
            Correct orientation also improves the overall reading experience for everyone. Documents that require constant screen rotation or head tilting cause eye strain and fatigue, particularly during extended reading sessions. Students reviewing lecture notes, professionals analyzing reports, and researchers reading academic papers all benefit from having documents in the correct orientation from the start. This seemingly small detail can significantly impact productivity and comprehension, especially when working with lengthy documents.
          </p>

          <p>
            For mobile device users, proper PDF orientation is even more critical. Reading a sideways document on a smartphone or tablet is extremely uncomfortable and often impractical. Many mobile PDF readers do not offer built-in rotation features, meaning users must rely on pre-rotated files for comfortable viewing. By ensuring your PDFs are correctly oriented before distribution, you make your content accessible and user-friendly across all devices and platforms.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            The Technical Process Behind PDF Rotation
          </h3>

          <p>
            Understanding how PDF rotation works technically can help you appreciate the efficiency and reliability of modern rotation tools. PDF files contain metadata that defines how each page should be displayed, including its rotation angle. When you rotate a PDF page, the tool modifies this rotation metadata without altering the actual content of the page. This means that the text, images, and other elements remain unchanged at the file level; only the viewing orientation is adjusted.
          </p>

          <p>
            This approach differs fundamentally from image rotation, where pixels are literally moved and recalculated, potentially causing quality degradation. PDF rotation is completely lossless because it only changes display instructions rather than manipulating the underlying content. The file size remains virtually identical before and after rotation, and there is absolutely no reduction in text clarity, image sharpness, or color accuracy. This technical advantage makes PDF rotation a reliable solution that can be applied repeatedly without any cumulative quality loss.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Conclusion: Making PDF Rotation Part of Your Workflow
          </h3>

          <p>
            PDF rotation may seem like a simple task, but it is an essential skill in today digital document workflow. Whether you are a student, business professional, educator, or creative worker, the ability to quickly and reliably rotate PDF pages saves time, improves document quality, and enhances professional presentation. By using a free, browser-based PDF rotation tool, you gain the convenience of instant access without sacrificing security or privacy.
          </p>

          <p>
            The tool described in this guide provides everything you need for efficient PDF rotation: support for all standard rotation angles, instant processing, complete privacy with no file uploads, and a user-friendly interface that requires no technical expertise. By incorporating PDF rotation into your regular document workflow, you eliminate one of the most common frustrations in digital file management and ensure that all your documents are always presented in the best possible way. Whether you need to fix a single scanned page or rotate an entire multi-page document, this tool delivers fast, reliable results every time.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
          
          <div className="space-y-6">
            {[
              {
                q: "Is this PDF rotation tool completely free?",
                a: "Yes, this tool is 100% free to use with no hidden costs, registration requirements, or limitations on the number of files you can rotate."
              },
              {
                q: "Does rotating a PDF reduce its quality?",
                a: "No, PDF rotation is a lossless process that only changes the viewing orientation without affecting the actual content quality. Your text, images, and formatting remain exactly as they were."
              },
              {
                q: "Is my PDF secure when using this tool?",
                a: "Absolutely. All processing happens locally in your browser, meaning your PDF never leaves your device. No files are uploaded to any server, ensuring complete privacy and security."
              },
              {
                q: "Can I rotate specific pages or only the entire document?",
                a: "This tool rotates all pages in the PDF by the selected angle. For page-specific rotation, you may need specialized PDF editing software."
              },
              {
                q: "What file size limit does this tool have?",
                a: "The tool can handle PDFs of various sizes, though very large files (over 100MB) may take longer to process depending on your device's capabilities."
              },
              {
                q: "Will the rotated PDF work on all devices?",
                a: "Yes, the rotated PDF maintains full compatibility with all PDF readers and devices, including Windows, Mac, Linux, Android, and iOS."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-5">
                <h4 className="font-semibold text-gray-900 mb-2">{faq.q}</h4>
                <p className="text-gray-700" style={{textAlign: 'justify'}}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ToolSection>
  );
}