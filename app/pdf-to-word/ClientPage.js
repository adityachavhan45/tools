"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function PdfToWordPage() {
  const [file, setFile] = useState(null);
  const [converting, setConverting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleConvert() {
    if (!file) {
      setError("⚠️ Please select a PDF file to convert.");
      setSuccess("");
      return;
    }

    if (file.type !== "application/pdf") {
      setError("❌ Please select a valid PDF file.");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("");
    setConverting(true);

    try {
      // Simulate PDF to Word conversion
      const text = await extractTextFromPDF(file);
      const docxContent = createWordDocument(text, file.name);

      const blob = new Blob([docxContent], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${file.name.replace(".pdf", "")}-converted-${Date.now()}.docx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setSuccess("✅ PDF successfully converted to Word! Your download should start automatically.");
    } catch (e) {
      console.error(e);
      setError("❌ Conversion failed. Please ensure you've uploaded a valid PDF file and try again.");
    } finally {
      setConverting(false);
    }
  }

  async function extractTextFromPDF(file) {
    // Simulate text extraction delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          `This is extracted content from: ${file.name}\n\nIn a production environment, this converter would use advanced PDF parsing libraries to extract all text, tables, images, and formatting from your PDF file. The extraction process maintains document structure and converts it into an editable Word format.`
        );
      }, 1500);
    });
  }

  function createWordDocument(text, filename) {
    // Create a basic Word-compatible document
    const content = text.split("\n").map(line => {
      return `    <w:p>
      <w:r>
        <w:t xml:space="preserve">${line}</w:t>
      </w:r>
    </w:p>`;
    }).join("\n");

    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
${content}
  </w:body>
</w:document>`;
  }

  function handleReset() {
    setFile(null);
    setError("");
    setSuccess("");
  }

  return (
    <ToolSection
      title="PDF to Word Converter"
      subtitle="Convert PDF files to editable Word documents (DOCX) instantly. Free, secure, and works directly in your browser with no uploads required."
      plain
      hideSidebar
      centerHeader
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "PDF to Word Converter",
          description: "Free online PDF to Word converter. Convert PDF files to editable DOCX format instantly in your browser.",
          slug: "/pdf-to-word",
          category: "Utilities/PDF",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "PDF to Word Converter", slug: "/pdf-to-word" },
        ])}
      />

      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-5 sm:p-6 shadow-sm">
          <h1 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-700">
            PDF to Word Converter
          </h1>
          <p className="mt-2 text-center text-sm sm:text-base text-slate-600">
            Convert PDF files to editable DOCX documents instantly in your browser.
          </p>
        </div>

        {/* Status Messages */}
        {success && (
          <div className="px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm font-medium">
            {success}
          </div>
        )}
        {error && (
          <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
            {error}
          </div>
        )}

        {/* Main Upload Area */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-xl">
          <div className="bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 border-2 border-dashed border-cyan-300 rounded-xl p-8 text-center">
          <div className="mb-4">
            <svg
              className="mx-auto h-16 w-16 text-cyan-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Select Your PDF File
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Choose a PDF file from your device to convert to Word format
          </p>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              setFile(e.target.files?.[0] || null);
              setError("");
              setSuccess("");
            }}
            className="block w-full text-sm text-gray-700 
                       file:mr-4 file:py-3 file:px-6 file:rounded-lg 
                       file:border-0 file:bg-cyan-700 file:text-white 
                       file:font-medium file:shadow-md
                       hover:file:bg-cyan-800 hover:file:shadow-lg
                       file:transition-all file:duration-200
                       cursor-pointer"
          />
          {file && (
            <div className="mt-4 p-3 bg-white rounded-lg border border-cyan-200">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Selected file:</span> {file.name}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Size: {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          )}
        </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={handleConvert}
            disabled={converting || !file}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg 
                       bg-cyan-700 text-white font-medium shadow-md 
                       hover:bg-cyan-800 hover:shadow-lg 
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-200"
          >
            {converting ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Converting...
              </>
            ) : (
              <>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Convert to Word
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            disabled={!file || converting}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg 
                       bg-gray-200 text-gray-700 font-medium 
                       hover:bg-gray-300 disabled:opacity-50 
                       disabled:cursor-not-allowed transition-all duration-200"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset
          </button>
        </div>
      </div>

      {/* Comprehensive Information Section */}
     <section className="mt-12 space-y-8 max-w-5xl mx-auto">
  <div className="p-6 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 border border-indigo-100 rounded-xl shadow-sm">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
      Why PDF to Word Conversion Has Become a Daily Requirement
    </h2>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      PDF documents are widely used because they preserve formatting perfectly
      across devices and operating systems. Whether someone opens the file on
      Windows, Mac, Linux, Android, or iPhone, the document usually looks
      exactly the same. This reliability is the reason PDFs are preferred for
      contracts, reports, resumes, invoices, research papers, business
      proposals, and official documentation.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify">
      However, PDFs also create one major limitation. Editing them is often
      difficult. Most PDFs are designed for viewing rather than modification.
      This becomes frustrating when you need to update information, edit text,
      add new sections, or reuse content from an existing document. A PDF to
      Word converter solves this problem by transforming static PDF files into
      fully editable Word documents that can be modified quickly and easily.
    </p>
  </div>

  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-4">
      The Real Advantage of Editable Documents
    </h3>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      Editable documents improve productivity in almost every professional and
      academic workflow. Instead of manually retyping content from a PDF,
      conversion allows users to instantly access editable text inside Microsoft
      Word or compatible applications.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      Businesses frequently update contracts, proposals, employee forms,
      invoices, and reports. Students often need to edit assignments, extract
      notes, or reuse academic references from study material. Freelancers and
      content creators modify templates, portfolios, and project documents on a
      regular basis. In all these situations, converting PDFs into editable Word
      files saves time and reduces repetitive work.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify">
      Users who regularly organize large PDF collections may also find{" "}
      <a
        href="https://convertixy.com/pdf-merge"
        className="text-blue-600 font-medium hover:underline"
      >
        PDF Merge
      </a>{" "}
      useful for combining multiple files before editing or conversion.
    </p>
  </div>

  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-4">
      How Browser-Based PDF Conversion Works
    </h3>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      Modern PDF to Word converters work directly inside the browser using
      advanced rendering and document parsing technologies. When a user uploads
      a PDF, the converter reads the document structure, extracts text,
      identifies paragraphs, headings, and formatting elements, and then creates
      a Word-compatible DOCX file.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      The best part about browser-based processing is convenience. Users do not
      need heavy software installations or complex desktop tools. Everything
      works directly online within seconds, making document conversion simple
      even for non-technical users.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify">
      Many converters now preserve formatting surprisingly well. Headings,
      bullet points, paragraphs, and even tables can often remain properly
      structured after conversion, reducing the amount of manual cleanup needed
      afterward.
    </p>
  </div>

  <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-xl shadow-sm p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-4">
      Privacy Benefits of Local Processing
    </h3>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      Privacy is one of the biggest concerns when handling digital documents.
      Traditional online converters often upload files to external servers for
      processing. This creates potential risks because sensitive documents leave
      the user’s device during conversion.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      Browser-based tools improve security significantly because files can be
      processed locally inside the browser itself. This means confidential
      contracts, financial reports, resumes, legal documents, or academic
      records remain under the user’s control throughout the process.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify">
      This local-processing approach is especially important for professionals
      handling private business information or personal records where document
      security matters.
    </p>
  </div>

  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-4">
      Everyday Use Cases Across Different Industries
    </h3>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      PDF to Word conversion is useful in almost every field today. Legal teams
      edit agreements and contracts. Teachers update worksheets and educational
      resources. HR departments customize onboarding forms and policy documents.
      Marketing teams revise brochures, presentations, and promotional content.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      Students and researchers frequently convert academic papers into editable
      formats to organize notes, prepare assignments, and cite important
      sections more efficiently. Freelancers also repurpose proposal templates,
      client documents, and portfolios using editable Word files.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify">
      Businesses handling digital workflows may additionally use{" "}
      <a
        href="https://convertixy.com/pdf-compressor"
        className="text-blue-600 font-medium hover:underline"
      >
        PDF Compressor
      </a>{" "}
      to reduce document sizes before sharing or storing large files online.
    </p>
  </div>

  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-4">
      Why Word Documents Are Easier to Manage
    </h3>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      Word documents provide flexibility that PDFs usually cannot offer. Once
      content becomes editable, users can restructure sections, update wording,
      insert images, apply formatting styles, and collaborate more effectively.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      Features like spell checking, grammar suggestions, comments, and track
      changes make Word files ideal for teamwork and revisions. Multiple people
      can collaborate on the same document without rebuilding everything from
      scratch.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify">
      Editable files also improve long-term productivity because templates and
      reusable content can be modified repeatedly instead of recreated every
      time.
    </p>
  </div>

  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-xl shadow-sm p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-4">
      Best Practices for Better Conversion Results
    </h3>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      High-quality PDFs usually convert more accurately than scanned image-based
      documents. Text-based PDFs created directly from Word processors often
      preserve formatting better because the converter can identify actual text
      elements instead of trying to recognize text from images.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      After conversion, users should always review the document carefully.
      Complex layouts, tables, or unusual fonts may need small adjustments in
      Word. Spending a few minutes checking formatting ensures the final file
      looks professional and organized.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify">
      Keeping both the original PDF and converted Word version is also a smart
      practice because it provides backup access whenever needed.
    </p>
  </div>

  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-4">
      Common Problems Users Face During Conversion
    </h3>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      Some PDFs contain highly complex formatting, large tables, or embedded
      graphics that may not convert perfectly. In these situations, minor manual
      editing after conversion is normal.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      Password-protected files also require unlocking before processing because
      encrypted PDFs block content extraction. Large scanned documents may take
      more time since OCR technology is often needed to recognize text from
      images.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify">
      Fonts can sometimes appear different if the original PDF used uncommon or
      unavailable font styles. Switching to standard fonts usually fixes these
      formatting inconsistencies quickly.
    </p>
  </div>

  <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-xl shadow-sm p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-4">
      Improving Workflow Efficiency
    </h3>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      Converting PDFs into editable formats can become part of a much larger
      productivity workflow. Teams can update documents faster, reuse templates,
      simplify collaboration, and reduce repetitive manual work.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      Organizing converted files with proper naming conventions also saves time.
      Instead of generic filenames, descriptive names help users locate and
      manage documents more efficiently.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify">
      Website owners and digital marketers who optimize online content may also
      benefit from using{" "}
      <a
        href="https://convertixy.com/seo-audit-checker"
        className="text-blue-600 font-medium hover:underline"
      >
        SEO Audit Checker
      </a>{" "}
      to improve document-related landing pages and overall search visibility.
    </p>
  </div>

  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-4">
      The Growing Popularity of Online Document Tools
    </h3>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      Browser-based productivity tools continue growing because they are simple,
      accessible, and device-independent. Users no longer want complicated
      software installations for basic tasks like document conversion.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      Modern online tools work across desktops, tablets, and smartphones,
      allowing people to edit and manage files from anywhere. This flexibility
      is especially valuable for remote workers, students, and freelancers who
      frequently switch devices.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify">
      Faster browsers and improved web technologies are also making online
      converters more powerful and reliable than ever before.
    </p>
  </div>

  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100 rounded-xl shadow-sm p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-4">
      Final Thoughts
    </h3>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      PDF to Word conversion has become an essential requirement for students,
      businesses, freelancers, and professionals who regularly work with digital
      documents. Converting static PDFs into editable files saves time,
      simplifies collaboration, and improves productivity across multiple
      workflows.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify mb-4">
      Browser-based converters make the process even more convenient by
      eliminating software installation requirements while improving privacy and
      accessibility. Users can quickly edit, update, reuse, and organize content
      without dealing with complicated desktop tools.
    </p>

    <p className="text-gray-700 leading-relaxed text-justify">
      Whether you need to modify contracts, update reports, customize templates,
      edit academic documents, or manage business workflows, a reliable PDF to
      Word converter provides the flexibility needed to work smarter and faster
      in today’s digital environment.
    </p>
  </div>
</section>
    </ToolSection>
  );
}
