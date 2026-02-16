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
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            PDF Split Tool
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Split any PDF into separate pages instantly. Fast, secure, and completely free. 
            Download all pages as a convenient ZIP file.
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
        <section className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            The Complete Guide to PDF Splitting: Master Document Organization
          </h2>
          
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6" style={{textAlign: 'justify'}}>
            <p>
              In the digital age, PDF documents have become the backbone of professional communication, educational resources, and personal record-keeping. From multi-hundred-page reports and comprehensive manuals to scanned documents and compiled research papers, PDFs efficiently package diverse content into a single file. However, this convenience can sometimes become a limitation. When you need to share only specific sections, organize content differently, or extract individual pages for separate use, having a reliable PDF splitting tool becomes essential. Whether you are a business professional distributing specific contract pages, a student organizing study materials, or an individual managing personal documents, the ability to split PDFs into separate pages transforms how you handle digital files.
            </p>

            <p>
              PDF splitting addresses numerous practical challenges that arise in everyday document management. Consider a business scenario where a comprehensive annual report needs to be distributed to different departments, with each team requiring only their relevant sections. Or imagine a teacher who has a compiled textbook PDF but needs to distribute individual chapters to students throughout the semester. Researchers often work with lengthy academic papers where specific pages contain crucial data that needs separate citation or sharing. Legal professionals frequently handle contracts that bundle multiple agreements requiring individual processing. In all these situations, manually extracting pages using complex software or online services that compromise privacy creates unnecessary friction in your workflow.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Understanding PDF Structure and Why Splitting Matters
            </h3>

            <p>
              PDFs are fundamentally different from word processing documents or images because they preserve exact formatting, fonts, and layout regardless of the viewing device or operating system. This consistency makes PDFs ideal for official documents, publications, and archival purposes. However, this same characteristic means that editing or reorganizing PDF content requires specialized tools that understand the PDF format's internal structure. When you split a PDF, you are not simply cutting an image file; you are creating new PDF documents with proper metadata, page dimensions, and embedded resources like fonts and images.
            </p>

            <p>
              The technical process of splitting involves reading the original PDF's page structure, extracting each page with all its associated elements, and packaging each page as a standalone PDF document. Modern browser-based tools accomplish this entirely through JavaScript libraries that can parse and manipulate PDF files without requiring server-side processing. This approach offers significant advantages in terms of speed, privacy, and accessibility compared to traditional desktop software or online services that upload your files to remote servers.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              The Critical Importance of Privacy in PDF Processing
            </h3>

            <p>
              When working with sensitive documents such as financial statements, medical records, legal contracts, personal identification, or confidential business information, privacy concerns become paramount. Many online PDF tools require uploading your files to their servers for processing, creating several serious risks. First, you have no guarantee about how long your files remain on their servers or who might access them. Second, data transmission over the internet, even with encryption, creates potential interception points. Third, terms of service agreements often grant these services broad rights to your uploaded content. Fourth, server-based processing means your documents exist outside your direct control during the critical processing window.
            </p>

            <p>
              Browser-based PDF splitting eliminates all these privacy concerns by processing everything locally on your device. Your PDF never leaves your computer's memory, no network transmission occurs except for initially loading the tool's code, and no third party ever gains access to your content. For organizations subject to compliance regulations like HIPAA, GDPR, or SOC 2, this local processing approach ensures that sensitive documents never enter potentially non-compliant third-party systems. Even for personal use, the peace of mind that comes from knowing your private documents remain completely private makes browser-based tools the superior choice.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Practical Applications Across Different Professions and Industries
            </h3>

            <p>
              Business professionals encounter numerous situations requiring PDF splitting. Sales teams often receive product catalogs where they need individual product sheets for client presentations. Human resources departments split employee handbooks to distribute specific sections during onboarding. Marketing teams separate multi-page campaign reports to share relevant metrics with different stakeholders. Financial analysts extract specific pages from comprehensive reports for focused discussions. Project managers split project documentation to assign specific components to team members. In each case, distributing entire documents would be inefficient and potentially confusing, while split pages enable precise, targeted communication.
            </p>

            <p>
              Educational institutions and students benefit enormously from PDF splitting capabilities. Teachers compile semester materials but need to distribute content progressively throughout the course period. Students working on group projects split research papers to divide reading assignments among team members. Librarians manage digital collections where patrons request specific chapters rather than entire books. Academic researchers extract methodology sections from papers for reference in their own work. Tutors prepare customized study materials by combining specific pages from various educational resources. The flexibility to work with individual pages rather than monolithic documents dramatically improves educational resource management.
            </p>

            <p>
              Legal and healthcare professionals handle highly sensitive documents that absolutely require secure processing. Attorneys split multi-party contracts to provide each party with their relevant agreements. Paralegals extract specific exhibits from court filings for evidence presentation. Medical administrators separate patient records to share only necessary information with authorized personnel. Insurance processors split claim documentation to route pages to appropriate departments. Compliance officers extract policy sections for targeted training materials. In these regulated industries, the combination of functionality and privacy protection that browser-based splitting provides is not just convenient but often necessary for regulatory compliance.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Technical Advantages of Modern PDF Splitting Tools
            </h3>

            <p>
              Contemporary PDF splitting technology leverages powerful JavaScript libraries that can perform complex document manipulation entirely within web browsers. These libraries handle the intricate details of PDF structure, including content streams, font embedding, image compression, metadata preservation, and page dimension management. When you split a PDF, the tool reads the original document's binary structure, identifies page boundaries and associated resources, creates new PDF document structures for each page, copies all necessary data including embedded fonts and images, and saves each page as a properly formatted PDF file.
            </p>

            <p>
              The ZIP file creation process adds another layer of convenience by packaging all split pages into a single downloadable archive. This approach offers multiple benefits: it simplifies the download process by requiring only one action regardless of page count, reduces browser overhead compared to triggering hundreds of individual downloads, maintains organizational structure by keeping all pages together, and enables easy sharing since recipients receive all pages in one file. The ZIP format's universal support across all operating systems ensures that recipients can extract and use the split pages regardless of their platform or available software.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Best Practices for Effective PDF Splitting Workflows
            </h3>

            <p>
              Developing efficient PDF splitting workflows requires understanding several key practices that maximize effectiveness while minimizing errors. First, always maintain a backup of your original PDF file before splitting, especially for irreplaceable documents like signed contracts or official records. This precaution protects against accidental data loss and provides a reference point if you later need different page combinations. Store original files in a dedicated archive folder with clear naming conventions that indicate processing status.
            </p>

            <p>
              Second, implement a systematic naming convention for split pages that makes subsequent organization intuitive. Generic filenames like "page-001.pdf" work well during the splitting process, but consider renaming important pages with descriptive titles that indicate content. For example, instead of keeping "page-015.pdf," rename it to "Q2-Financial-Summary.pdf" or "Contract-Section-B.pdf." This investment of a few minutes in descriptive naming saves substantial time later when searching for specific content or sharing files with others who need immediate context about page contents.
            </p>

            <p>
              Third, consider your intended use for split pages before processing. If you plan to later recombine certain pages, note their original sequence numbers. If pages will be distributed to different recipients, prepare a distribution list matching pages to recipients before splitting. If split pages need compression, rotation, or other modifications, plan that workflow in advance. Strategic planning prevents redundant work and ensures that split pages serve their intended purpose efficiently without requiring additional processing steps.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Common Challenges and Troubleshooting Solutions
            </h3>

            <p>
              Users occasionally encounter challenges when splitting PDFs, most of which have straightforward solutions. Large PDFs with hundreds of pages might process slowly on older computers with limited RAM; in these cases, closing unnecessary browser tabs and applications frees memory for PDF processing. Password-protected or encrypted PDFs cannot be split until you remove protection using the original password; many PDF tools offer password removal features for authorized users. PDFs created from scans might have quality issues or large file sizes; consider optimizing these files before splitting to improve processing speed and reduce output file sizes.
            </p>

            <p>
              Some PDFs contain form fields, annotations, or interactive elements that might not transfer correctly to split pages; if you need these features preserved, use specialized tools that specifically handle interactive PDF elements. Corrupted PDF files might fail to split or produce errors; try opening the file in a PDF reader first to verify its integrity, and consider using PDF repair tools if necessary. Browser limitations on file size might prevent very large PDFs from loading; in such cases, first split the large PDF into smaller sections using desktop software, then use browser-based tools for finer-grained splitting.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Integrating PDF Splitting Into Broader Document Management Strategies
            </h3>

            <p>
              PDF splitting becomes even more powerful when integrated into comprehensive document management workflows. Combine splitting with other PDF operations like merging to reorganize content from multiple sources, compression to reduce file sizes for easier sharing and storage, rotation to correct page orientation before distribution, and conversion to create different format versions for various use cases. Modern document workflows often involve multiple tools working in sequence: split a large report, compress individual pages, merge selected pages into topic-specific documents, and convert final outputs to formats appropriate for different recipients.
            </p>

            <p>
              Cloud storage services like Google Drive, Dropbox, and OneDrive complement PDF splitting by providing centralized locations for storing both original and split files. Create folder structures that separate originals from processed files, organize split pages by project or category, and use shared folders to distribute split pages to team members efficiently. Version control becomes important when working with legal or business-critical documents; maintain clear records of which pages came from which original documents and when splitting occurred.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Environmental and Efficiency Benefits of Digital Document Splitting
            </h3>

            <p>
              Beyond immediate productivity benefits, PDF splitting contributes to broader environmental and efficiency goals. By enabling precise distribution of only necessary pages, splitting reduces wasteful printing of entire documents when recipients need only specific sections. This paper reduction translates to lower costs, reduced environmental impact, and less physical storage space required. Digital distribution of split pages eliminates shipping costs and delays associated with physical document delivery, enabling instant access regardless of geographic location.
            </p>

            <p>
              Organizations implementing digital-first workflows often find that PDF splitting capabilities accelerate their transition away from paper-based processes. When team members can instantly receive exactly the document pages they need in digital format, resistance to paperless operations decreases. The combination of splitting tools with digital signature platforms, cloud storage, and collaborative editing tools creates comprehensive digital workflows that rival or exceed the functionality of traditional paper-based systems while offering superior searchability, backup protection, and sharing capabilities.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Future Trends in PDF Manipulation Technology
            </h3>

            <p>
              PDF manipulation technology continues evolving with increasingly sophisticated browser-based capabilities. Future developments likely include AI-powered page classification that automatically categorizes and names split pages based on content, smart splitting that identifies natural document sections rather than just separating by page numbers, quality enhancement that improves scanned document clarity during the splitting process, and integrated optical character recognition that makes split pages fully searchable and text-selectable. These advancements will make PDF splitting even more powerful and accessible to users without technical expertise.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Conclusion: Empowering Document Management Through PDF Splitting
            </h3>

            <p>
              PDF splitting represents a fundamental capability in modern document management that transforms how individuals and organizations handle digital content. By enabling precise extraction and distribution of specific pages, splitting tools eliminate the inefficiency and confusion associated with unwieldy multi-page documents. The browser-based approach to PDF splitting delivers the perfect combination of functionality, privacy, and accessibility—processing happens instantly on your device, your sensitive documents remain completely private, and the tool works on any modern computer or mobile device without installation requirements.
            </p>

            <p>
              Whether you are managing business documents, organizing educational materials, handling legal files, or simply trying to better organize personal records, PDF splitting capabilities streamline your workflow and improve productivity. The free, secure, and user-friendly tool described in this guide demonstrates how modern web technology can deliver professional-grade document manipulation without compromising on privacy or requiring expensive software subscriptions. By incorporating PDF splitting into your regular document management practices, you gain greater control over your digital files, improve collaboration efficiency, and create more organized, accessible document collections that serve your needs precisely.
            </p>
          </div>

          {/* FAQ Section */}
          <div className="mt-12 pt-8 border-t-2 border-gray-200">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h3>
            
            <div className="space-y-5">
              {[
                {
                  q: "Is this PDF splitting tool completely free to use?",
                  a: "Yes, this tool is 100% free with absolutely no hidden costs, subscriptions, or usage limits. You can split unlimited PDFs with any number of pages, and all features are available to everyone at no charge."
                },
                {
                  q: "How secure is my PDF when using this splitting tool?",
                  a: "Your PDF is completely secure because all processing happens locally in your web browser. Your file never gets uploaded to any server, transmitted over the internet, or accessed by any third party. It remains on your device throughout the entire process."
                },
                {
                  q: "What happens to the quality of my PDF pages after splitting?",
                  a: "The quality remains identical to the original. PDF splitting is a lossless process that preserves all text clarity, image quality, fonts, formatting, and embedded resources exactly as they appear in the source document."
                },
                {
                  q: "Can I split password-protected PDFs?",
                  a: "No, password-protected or encrypted PDFs must be unlocked before splitting. You need to remove the password protection using the original password first, then the splitting process will work normally."
                },
                {
                  q: "Why do I receive a ZIP file instead of individual PDFs?",
                  a: "Packaging split pages into a ZIP file provides several benefits: it requires only one download action regardless of page count, keeps all pages organized together, simplifies sharing with others, and works reliably across all browsers and operating systems."
                },
                {
                  q: "Is there a file size limit for PDFs I can split?",
                  a: "The tool can handle PDFs of various sizes, though very large files (over 100MB or with hundreds of pages) may take longer to process depending on your device's processing power and available memory. For best performance, close unnecessary browser tabs when splitting large files."
                },
                {
                  q: "Can I select specific pages to split instead of splitting all pages?",
                  a: "This tool splits all pages into individual files. If you need to extract only specific pages, consider using a PDF page extraction tool, or after splitting, simply keep the pages you need and delete the others."
                },
                {
                  q: "Will the split PDFs work on mobile devices and all operating systems?",
                  a: "Yes, the split PDF files maintain full compatibility with all PDF readers and work perfectly on Windows, Mac, Linux, Android, iOS, and any other platform that supports PDF viewing."
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="font-bold text-gray-900 text-lg mb-3">{faq.q}</h4>
                  <p className="text-gray-700 leading-relaxed" style={{textAlign: 'justify'}}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Tips */}
          <div className="mt-10 pt-8 border-t-2 border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-5">
              💡 Pro Tips for PDF Splitting
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: "Keep Original Files",
                  tip: "Always maintain a backup of your original PDF before splitting, especially for important documents."
                },
                {
                  title: "Rename Meaningfully",
                  tip: "After splitting, rename important pages with descriptive names that reflect their content."
                },
                {
                  title: "Organize Systematically",
                  tip: "Create dedicated folders for original PDFs and split pages to maintain clear organization."
                },
                {
                  title: "Check Page Count",
                  tip: "Verify the page count before splitting to ensure all pages are included in the output."
                },
                {
                  title: "Combine with Other Tools",
                  tip: "Use PDF splitting alongside merging, compression, and rotation tools for complete document management."
                },
                {
                  title: "Close Unused Tabs",
                  tip: "For large PDFs, close unnecessary browser tabs to free up memory and speed up processing."
                }
              ].map((tip, idx) => (
                <div key={idx} className="flex gap-3 p-4 bg-white rounded-lg border border-gray-200">
                  <span className="text-2xl flex-shrink-0">✓</span>
                  <div>
                    <h5 className="font-bold text-gray-900 mb-1">{tip.title}</h5>
                    <p className="text-sm text-gray-600">{tip.tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}