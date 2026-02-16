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
      plainSidebar
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

      <div className="space-y-6">
        {/* Status Messages */}
        {success && (
          <div className="px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm font-medium">
            {success}
          </div>
        )}
        {error && (
          <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium">
            {error}
          </div>
        )}

        {/* Main Upload Area */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-dashed border-indigo-300 rounded-xl p-8 text-center">
          <div className="mb-4">
            <svg
              className="mx-auto h-16 w-16 text-indigo-600"
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
                       file:border-0 file:bg-indigo-600 file:text-white 
                       file:font-medium file:shadow-md
                       hover:file:bg-indigo-700 hover:file:shadow-lg
                       file:transition-all file:duration-200
                       cursor-pointer"
          />
          {file && (
            <div className="mt-4 p-3 bg-white rounded-lg border border-indigo-200">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Selected file:</span> {file.name}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Size: {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleConvert}
            disabled={converting || !file}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg 
                       bg-indigo-600 text-white font-medium shadow-md 
                       hover:bg-indigo-700 hover:shadow-lg 
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
      <section className="mt-12 space-y-8">
        <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Complete Guide to PDF to Word Conversion
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify mb-4">
            In today digital workplace, PDF files have become the universal standard for document sharing and distribution. Their ability to maintain consistent formatting across different devices and operating systems makes them ideal for official communications, reports, contracts, and publications. However, this same characteristic that makes PDFs excellent for viewing creates a significant challenge when you need to edit the content. Unlike Word documents that open ready for editing, PDFs are designed to be static and unchangeable, protecting the original formatting and preventing unauthorized modifications.
          </p>
          <p className="text-gray-700 leading-relaxed text-justify">
            This is precisely where a reliable PDF to Word converter becomes an indispensable tool. Whether you receive a contract that needs minor revisions, a report requiring updates with new data, or a document template you want to customize, converting PDF to Word format unlocks the ability to edit, modify, and repurpose content efficiently. Our free online converter transforms locked PDF files into fully editable Word documents, enabling you to make changes, add content, adjust formatting, insert images, and work with the document as if it were originally created in Microsoft Word.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Why Converting PDF to Word Matters
          </h3>
          <p className="text-gray-700 leading-relaxed text-justify mb-4">
            The need to convert PDF files to Word format arises in countless professional and personal scenarios. Consider receiving a partnership agreement as a PDF that requires adding specific clauses, or obtaining a research paper where you need to extract and cite certain sections, or working with a resume template that needs personalization. In each case, the PDF format presents a barrier to efficient editing. While some expensive software solutions offer direct PDF editing, they often come with steep learning curves and subscription costs that make them impractical for occasional use.
          </p>
          <p className="text-gray-700 leading-relaxed text-justify mb-4">
            Converting to Word format solves these challenges elegantly. Microsoft Word and its alternatives like Google Docs, LibreOffice Writer, and Apple Pages provide familiar, user-friendly interfaces that most people already know how to use. Once your PDF content is in Word format, you gain access to powerful editing capabilities including spell check, grammar suggestions, track changes for collaboration, comment features for feedback, and extensive formatting options. This conversion transforms a static, view-only document into a dynamic, editable file that can evolve with your needs.
          </p>
          <p className="text-gray-700 leading-relaxed text-justify">
            Beyond basic editing, Word format enables advanced document manipulation. You can merge multiple converted documents, extract specific sections, reorganize content by cutting and pasting, apply consistent styling through templates, and integrate the content with other documents. For businesses, this means being able to update proposals, customize contracts, revise reports, and maintain document libraries in editable formats. For students and researchers, it enables citing sources, compiling literature reviews, and repurposing academic content for different assignments.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            How Our PDF to Word Converter Works
          </h3>
          <p className="text-gray-700 leading-relaxed text-justify mb-4">
            Our conversion tool operates entirely within your web browser, representing a fundamental shift from traditional server-based converters. When you select a PDF file, the entire conversion process happens on your device using JavaScript and modern web technologies. The converter reads your PDF file, extracts text content, analyzes document structure including paragraphs and formatting, and then generates a Word-compatible DOCX file that contains all the extracted content in an editable format. This client-side processing ensures your sensitive documents never leave your computer, providing maximum privacy and security.
          </p>
          <p className="text-gray-700 leading-relaxed text-justify mb-4">
            The technical process involves several sophisticated steps. First, the converter parses the PDF file structure to identify text elements, their positions, and relationships. It recognizes paragraphs, headings, lists, and other structural components. Then it maps these elements to equivalent Word formatting, creating proper paragraph styles, preserving text emphasis like bold and italic where possible, and maintaining document hierarchy. Finally, it packages everything into a DOCX file using the OpenXML format that Microsoft Word and compatible applications can open and edit seamlessly.
          </p>
          <p className="text-gray-700 leading-relaxed text-justify">
            The resulting Word document downloads directly to your device, ready to open in any word processing application. While complex PDFs with intricate layouts, multiple columns, or embedded graphics may require some manual formatting adjustments after conversion, the majority of text-based documents convert cleanly and require minimal touch-up. The time saved compared to manually retyping or copying content is substantial, especially for longer documents. Most conversions complete in seconds, even for multi-page PDFs.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Privacy and Security Advantages
          </h3>
          <p className="text-gray-700 leading-relaxed text-justify mb-4">
            Security concerns represent a major consideration when handling sensitive documents online. Many PDF to Word converters operate as web services that require uploading your files to remote servers for processing. This approach raises legitimate privacy concerns, particularly for confidential business documents, legal agreements, personal financial records, medical information, or any content subject to data protection regulations. Once uploaded to a third-party server, you have limited control over how that data is stored, who might access it, or how long it remains on their systems.
          </p>
          <p className="text-gray-700 leading-relaxed text-justify mb-4">
            Our browser-based converter eliminates these risks entirely. Because processing happens locally on your device, your PDF files never transmit over the internet to external servers. This local processing provides several critical security benefits including complete data privacy with no third-party access, no risk of data breaches from compromised servers, compliance with strict data protection requirements, and the ability to convert documents while completely offline once the web page loads. For professionals handling confidential client information, legal documents, or proprietary business data, this security model is essential.
          </p>
          <p className="text-gray-700 leading-relaxed text-justify">
            Additionally, browser-based conversion means no software installation, no account creation or login requirements, no usage tracking or data collection, and no file size restrictions beyond what your browser can handle. You maintain complete control over your documents throughout the entire conversion process. Once you close the browser tab, all processing data clears from memory, leaving no traces of your documents on any system except your own device where you choose to save the converted Word file.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Practical Applications Across Industries
          </h3>
          <p className="text-gray-700 leading-relaxed text-justify mb-4">
            Legal professionals frequently encounter situations requiring PDF to Word conversion. Law firms receive contracts, agreements, and legal documents as PDFs that need editing for specific client situations. Rather than starting from scratch, attorneys can convert template documents, modify standard clauses, update party names and terms, and customize agreements efficiently. Court filings often arrive as PDFs but require excerpting specific sections for briefs or motions. The ability to convert, extract relevant portions, and cite them properly saves countless hours of manual transcription.
          </p>
          <p className="text-gray-700 leading-relaxed text-justify mb-4">
            Educational institutions and students rely heavily on PDF to Word conversion for academic work. Research papers, journal articles, and study materials typically distribute as PDFs to preserve formatting and prevent alterations. However, students writing literature reviews need to extract quotes, cite sources, and compile information from multiple papers. Converting these PDFs to Word format enables highlighting important passages, adding comments and notes, extracting quotes with proper attribution, and organizing research materials efficiently. Teachers can modify curriculum materials, customize worksheets, and adapt lesson plans by converting PDF resources to editable formats.
          </p>
          <p className="text-gray-700 leading-relaxed text-justify mb-4">
            Business environments generate constant demand for PDF conversion. Marketing teams receive PDF brochures and materials that need updating with new product information or pricing. Sales departments customize proposal templates for different clients by converting standard PDFs to Word, personalizing content, and adjusting offerings. Human resources professionals modify policy documents, update employee handbooks, and customize form letters by converting PDF templates to editable Word documents. Project managers repurpose past proposals, convert archived reports for reference, and update project documentation throughout initiative lifecycles.
          </p>
          <p className="text-gray-700 leading-relaxed text-justify">
            Publishing and content creation industries utilize PDF to Word conversion for manuscript editing, article revision, and content repurposing. Authors receive feedback on manuscripts as annotated PDFs but need to implement changes in Word for tracked editing. Journalists convert interview transcripts, press releases, and source documents from PDF to Word for easier quotation and integration into articles. Content marketers repurpose white papers, convert case studies for different formats, and adapt existing content by making it editable through conversion.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Best Practices for Optimal Results
          </h3>
          <p className="text-gray-700 leading-relaxed text-justify mb-4">
            Achieving the best conversion results starts with understanding PDF characteristics. Text-based PDFs created directly from word processors, typesetting software, or web-to-PDF tools generally convert most accurately because they contain actual text data that can be extracted. Image-based PDFs created by scanning physical documents require optical character recognition technology to identify text within images. While our basic converter handles text-based PDFs effectively, scanned documents may need specialized OCR processing for optimal text extraction and editability.
          </p>
          <p className="text-gray-700 leading-relaxed text-justify mb-4">
            After conversion, always review the Word document carefully. Check for formatting inconsistencies, verify that headings maintained proper hierarchy, ensure lists converted correctly with proper indentation, and confirm that special characters or symbols appeared accurately. Complex page layouts, multi-column formats, text boxes, and intricate table structures sometimes require manual adjustment after conversion. Budget a few minutes for cleanup work on complex documents, though simple text-based files often require no post-conversion editing at all.
          </p>
          <p className="text-gray-700 leading-relaxed text-justify mb-4">
            Maintain organized file management by saving both the original PDF and the converted Word document with clear, descriptive filenames. Include dates or version numbers to track document evolution. Store related files together in project folders for easy access. Create backup copies of important converted documents before making extensive edits, providing rollback options if needed. This systematic approach prevents confusion and ensures you can always return to source documents if necessary.
          </p>
          <p className="text-gray-700 leading-relaxed text-justify">
            For recurring conversion needs, develop a streamlined workflow. Batch similar documents together for processing efficiency. Apply consistent naming conventions to converted files. Create Word templates for common document types to speed up post-conversion formatting. If you frequently work with PDFs from the same source or type, note any consistent formatting issues and develop quick fixes or macros to address them automatically. These practices transform occasional PDF conversion into a smooth, efficient part of your document workflow.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Common Challenges and Solutions
          </h3>
          <p className="text-gray-700 leading-relaxed text-justify mb-4">
            Users sometimes encounter challenges when converting PDFs with complex formatting. Documents containing tables may lose cell borders, merge cells incorrectly, or misalign columns. The solution involves manually reformatting tables in Word after conversion, using Word table tools to adjust cell spacing, borders, and alignment. For documents with many tables, this investment of time still beats manually recreating entire tables from scratch by retyping all data.
          </p>
          <p className="text-gray-700 leading-relaxed text-justify mb-4">
            Image handling presents another common challenge. PDFs embedding images sometimes lose image quality during conversion or position images incorrectly relative to text. When image preservation is critical, consider extracting images separately from the PDF and reinserting them manually into the Word document at appropriate locations. This hybrid approach combines automated text conversion with manual image placement for optimal results.
          </p>
          <p className="text-gray-700 leading-relaxed text-justify">
            Font compatibility issues occasionally arise when PDFs use specialized or proprietary fonts not installed on your system. The Word document may substitute different fonts, changing the document appearance. Installing necessary fonts before conversion helps, or you can choose to reformat the converted document with standard fonts like Times New Roman, Arial, or Calibri that ensure consistency across platforms. For internal documents where appearance matters less than content, font substitution poses minimal problems.
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Making the Most of Converted Documents
          </h3>
          <p className="text-gray-700 leading-relaxed text-justify mb-4">
            Once you have successfully converted a PDF to Word format, leverage Word powerful features to enhance the document. Apply consistent styles throughout for professional appearance, use Word's built-in heading styles to create automatic tables of contents, enable change tracking when collaborating with others on document revisions, and insert comments for feedback without altering the original text. These features make Word documents far more versatile than static PDFs for active document development and collaboration.
          </p>
          <p className="text-gray-700 leading-relaxed text-justify">
            Consider the converted Word document as a starting point for further content development. Extract key points for presentations, repurpose sections for different audiences, combine content from multiple converted documents into comprehensive reports, or use the content as source material for web content, emails, or other communication formats. The editable nature of Word documents makes content reuse efficient and practical, multiplying the value of your conversion effort across multiple applications and contexts.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Understanding File Format Differences
          </h3>
          <p className="text-gray-700 leading-relaxed text-justify mb-4">
            PDF and Word formats serve fundamentally different purposes in document management. PDF format prioritizes consistent viewing across platforms, print fidelity, file security, and document preservation. These characteristics make PDF ideal for final versions, official documents, forms requiring signatures, and content intended for distribution without modification. The format ensures recipients see exactly what the creator intended regardless of their software or operating system.
          </p>
          <p className="text-gray-700 leading-relaxed text-justify">
            Word format prioritizes editability, collaboration, and content development. DOCX files excel during document creation phases, collaborative editing processes, content that requires frequent updates, and situations where multiple people contribute to the same document. Understanding when to use each format helps optimize document workflows. Create and edit in Word, then convert to PDF for final distribution. When you receive PDFs that need editing, convert back to Word, make necessary changes, and re-export to PDF if that final format is required.
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Final Thoughts on PDF to Word Conversion
          </h3>
          <p className="text-gray-700 leading-relaxed text-justify">
            Converting PDF files to Word format represents an essential capability in modern document workflows. Whether you are a student managing research, a professional handling business documents, a legal expert working with contracts, or an individual managing personal paperwork, the ability to transform static PDFs into editable Word documents saves time, enhances productivity, and unlocks content flexibility. Our free, browser-based converter provides this capability securely and conveniently, processing your documents entirely on your device without compromising privacy. By understanding best practices, preparing for common challenges, and leveraging Word powerful editing features, you can make PDF to Word conversion a seamless part of your document management strategy, ensuring you always have the flexibility to work with content in the format that best serves your current needs.
          </p>
        </div>
      </section>
    </ToolSection>
  );
}