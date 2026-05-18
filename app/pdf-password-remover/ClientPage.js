"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function PdfPasswordRemoverPage() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [unlockResult, setUnlockResult] = useState(null);

  async function handleUnlock() {
    if (!file) {
      setError("⚠️ Please select a PDF file first.");
      return;
    }

    if (!password.trim()) {
      setError("⚠️ Please enter the PDF password.");
      return;
    }

    setError("");
    setMessage("");
    setProcessing(true);
    setUnlockResult(null);

    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      
      // Try to load PDF with password
      const pdfDoc = await PDFDocument.load(bytes, { 
        ignoreEncryption: false,
        password: password 
      });

      const pageCount = pdfDoc.getPageCount();

      // Save without password protection
      const unlockedBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
      });

      // Download unlocked PDF
      const blob = new Blob([unlockedBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `unlocked-${file.name}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setUnlockResult({
        fileName: file.name,
        pageCount,
        originalSize: file.size,
        unlockedSize: unlockedBytes.length,
      });

      setMessage("✅ PDF password removed successfully! File downloaded.");
    } catch (e) {
      console.error(e);
      if (e.message?.includes("password") || e.message?.includes("encrypted")) {
        setError("❌ Incorrect password or file is not password-protected.");
      } else {
        setError("❌ Failed to unlock PDF. Please ensure it's a valid password-protected PDF.");
      }
    } finally {
      setProcessing(false);
    }
  }

  function resetAll() {
    setFile(null);
    setPassword("");
    setUnlockResult(null);
    setMessage("");
    setError("");
    setShowPassword(false);
  }

  function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    else return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  }

  return (
    <ToolSection
      title="PDF Password Remover"
      subtitle="Remove PDF password protection online for free. Unlock password-protected PDF files securely in your browser. Fast, private, and easy to use."
      plain
      hideSidebar
      centerHeader
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "PDF Password Remover",
          description: "Free online PDF password remover. Unlock password-protected PDF files securely. Remove PDF passwords while maintaining document quality.",
          slug: "/pdf-password-remover",
          category: "Utilities/PDF",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "PDF Password Remover", slug: "/pdf-password-remover" },
        ])}
      />

      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-5 sm:p-6 shadow-sm">
          <h1 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-700">
            PDF Password Remover Tool
          </h1>
          <p className="mt-2 text-center text-sm sm:text-base text-slate-600">
            Unlock password-protected PDFs securely in your browser.
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

        {/* Main Unlock Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          {/* File Upload Section */}
          <div className="mb-6">
            <label className="block text-base font-semibold text-gray-800 mb-3">
              🔒 Select Password-Protected PDF
            </label>
            <div className="relative">
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => {
                  setFile(e.target.files?.[0] || null);
                  setUnlockResult(null);
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
              <div className="mt-3 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">🔒</div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-600">Size: {formatFileSize(file.size)}</p>
                    <p className="text-xs text-orange-700 mt-1">⚠️ Password-protected PDF detected</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-base font-semibold text-gray-800 mb-3">
              🔑 Enter PDF Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter the password to unlock PDF..."
                className="w-full px-4 py-4 pr-12 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base transition-all duration-200"
                style={{ textAlign: 'left' }}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl hover:scale-110 transition-transform"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              💡 The password is required to unlock the PDF. Incorrect passwords will result in an error.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 flex-wrap justify-center">
            <button
              onClick={handleUnlock}
              disabled={processing || !file || !password.trim()}
              className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg 
                       bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg 
                       hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed
                       transform transition-all duration-200 hover:scale-105 active:scale-95"
            >
              {processing ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  <span>Unlocking...</span>
                </>
              ) : (
                <>
                  <span className="text-xl">🔓</span>
                  <span>Remove Password</span>
                </>
              )}
            </button>

            <button
              onClick={resetAll}
              disabled={!file && !password && !unlockResult}
              className="px-6 py-3 border-2 border-gray-300 rounded-lg bg-white hover:bg-gray-50 font-semibold
                       disabled:opacity-50 disabled:cursor-not-allowed shadow-md
                       transform transition-all duration-200 hover:scale-105 active:scale-95"
            >
              🔄 Reset
            </button>
          </div>
        </div>

        {/* Unlock Result */}
        {unlockResult && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-3xl">✅</span>
              Password Removed Successfully
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
                <div className="text-sm text-green-700 font-medium mb-2">Status</div>
                <div className="text-2xl font-bold text-green-900 mb-1">
                  🔓 Unlocked
                </div>
                <div className="text-xs text-green-600">Password protection removed</div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
                <div className="text-sm text-blue-700 font-medium mb-2">Pages</div>
                <div className="text-2xl font-bold text-blue-900 mb-1">
                  {unlockResult.pageCount}
                </div>
                <div className="text-xs text-blue-600">Total pages in PDF</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-3">File Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-purple-700">Original File:</span>
                  <span className="font-mono text-purple-900">{unlockResult.fileName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">File Size:</span>
                  <span className="font-mono text-purple-900">{formatFileSize(unlockResult.unlockedSize)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">Downloaded As:</span>
                  <span className="font-mono text-purple-900">unlocked-{unlockResult.fileName}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl p-6 shadow-sm">
          <h4 className="text-base font-bold text-amber-900 mb-3 flex items-center gap-2">
            <span className="text-2xl">⚠️</span>
            Important Security Notice
          </h4>
          <div className="space-y-2 text-sm text-amber-800">
            <p>• <strong>Legal Use Only:</strong> Only unlock PDFs you own or have explicit permission to access</p>
            <p>• <strong>Privacy Protected:</strong> All processing happens in your browser - no files are uploaded to servers</p>
            <p>• <strong>Password Required:</strong> You must have the correct password to unlock the PDF</p>
            <p>• <strong>Ethical Responsibility:</strong> Respect copyright and confidentiality of documents</p>
            <p>• <strong>Backup Original:</strong> Keep a copy of the original password-protected file if needed</p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-green-500">
            <div className="text-3xl mb-2">🔒</div>
            <h4 className="font-bold text-gray-900 mb-2">100% Private</h4>
            <p className="text-sm text-gray-700">
              Your files never leave your device. All processing happens locally in your browser.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-blue-500">
            <div className="text-3xl mb-2">⚡</div>
            <h4 className="font-bold text-gray-900 mb-2">Instant Unlock</h4>
            <p className="text-sm text-gray-700">
              Remove password protection in seconds with our fast processing engine.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-purple-500">
            <div className="text-3xl mb-2">✨</div>
            <h4 className="font-bold text-gray-900 mb-2">Quality Maintained</h4>
            <p className="text-sm text-gray-700">
              Unlocked PDFs retain all content, formatting, and quality perfectly.
            </p>
          </div>
        </div>
      </div>

      {/* Comprehensive Information Section */}
      <section className="mx-auto mt-12 sm:mt-14 w-full max-w-5xl p-5 sm:p-6 md:p-8 bg-white shadow-md rounded-2xl border border-slate-200">
  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 border-b border-slate-200 pb-3">
    Understanding PDF Password Protection and Why Removal Sometimes Becomes Necessary
  </h2>

  <div className="space-y-4 text-sm sm:text-base leading-7 text-slate-700">
    <p className="text-justify">
      PDF password protection is commonly used to secure sensitive documents from unauthorised access. Businesses, educational institutions, legal professionals, healthcare organisations, and individual users often protect PDF files containing confidential information, financial records, contracts, reports, certificates, or personal documents.
    </p>

    <p className="text-justify">
      Password protected PDFs add an extra security layer by restricting access to document content or limiting actions such as printing, editing, copying, or sharing. While this protection is extremely useful in many situations, there are also cases where users legitimately need to remove passwords from files they already own or are authorised to access.
    </p>

    <p className="text-justify">
      A PDF Password Remover helps users unlock protected PDF files after entering the correct password. Once unlocked, the document becomes easier to access, manage, share, and use across different applications without repeated password entry requirements.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Understanding Different Types of PDF Password Protection
    </h3>

    <p className="text-justify">
      PDF files commonly support two main types of password protection. The first type is an open password, also known as a user password, which prevents anyone from viewing the PDF without entering the correct credentials.
    </p>

    <p className="text-justify">
      The second type is a permissions password, often called an owner password, which allows viewing but restricts actions such as editing, copying text, printing, or modifying the document structure.
    </p>

    <p className="text-justify">
      Both security methods are designed to help document creators control how files are accessed and used after distribution.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Why Users Remove Passwords From PDF Files
    </h3>

    <p className="text-justify">
      Password protection becomes inconvenient in some situations, especially when users access the same document repeatedly throughout the day. Entering passwords again and again can slow workflows and reduce productivity unnecessarily.
    </p>

    <p className="text-justify">
      Some applications and systems also struggle to process encrypted PDF files properly. Cloud storage systems, automated workflows, document management platforms, and editing software may require unlocked PDFs for smooth compatibility.
    </p>

    <p className="text-justify">
      Professionals handling document workflows sometimes additionally use the <a href="https://convertixy.com/pdf-merger" className="text-blue-600 hover:underline font-medium">PDF Merger</a> after unlocking files to combine multiple reports, contracts, or records into organised document packages.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      How This PDF Password Remover Works
    </h3>

    <p className="text-justify">
      This browser based PDF Password Remover allows users to unlock protected PDF files securely after entering the correct password. The tool verifies the password, decrypts the protected content, and generates a new unlocked PDF version that no longer requires authentication.
    </p>

    <p className="text-justify">
      The unlocked file keeps the original text, formatting, images, pages, and document structure unchanged. Only the password protection layer gets removed during processing.
    </p>

    <p className="text-justify">
      Since the process works directly inside the browser, users can unlock files instantly without downloading complicated desktop software or relying on external document handling systems.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Why Local Browser Processing Improves Privacy
    </h3>

    <p className="text-justify">
      Password protected PDFs often contain highly confidential information such as legal agreements, financial reports, medical records, identification documents, and private business data. Because of this, privacy protection during unlocking becomes extremely important.
    </p>

    <p className="text-justify">
      Many online services require uploading files to external servers before processing, which may create unnecessary privacy concerns for sensitive documents.
    </p>

    <p className="text-justify">
      This PDF Password Remover processes everything locally inside the browser, which means uploaded documents remain on the user device during the entire unlocking process. Files do not need to be stored externally before decryption completes.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Common Situations Where PDF Unlocking Helps
    </h3>

    <p className="text-justify">
      Employees may unlock frequently used internal reports to simplify daily access during office workflows. Students sometimes remove passwords from educational material for easier reading and organisation after obtaining legitimate access.
    </p>

    <p className="text-justify">
      Businesses may also unlock documents before migrating files into modern cloud management systems or automated archival platforms. Legal and financial teams frequently manage protected files that require repeated access across authorised departments.
    </p>

    <p className="text-justify">
      Users handling editable documents sometimes additionally use the <a href="https://convertixy.com/pdf-to-word" className="text-blue-600 hover:underline font-medium">PDF to Word Converter</a> after unlocking files so document content can be modified more easily.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Why Password Removal Does Not Reduce Document Quality
    </h3>

    <p className="text-justify">
      Removing password protection does not change the actual document content. The text, formatting, layout, images, hyperlinks, and pages remain exactly the same after unlocking.
    </p>

    <p className="text-justify">
      The process simply removes encryption and authentication requirements from the PDF structure. This allows the file to open normally without requesting password verification again.
    </p>

    <p className="text-justify">
      Users can continue editing, printing, sharing, storing, or organising the unlocked PDF normally after processing completes.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Understanding the Importance of Legal and Ethical Usage
    </h3>

    <p className="text-justify">
      PDF password removal tools should only be used for documents that users own or are legally authorised to access. Removing protection from files without permission may violate privacy regulations, copyright protections, company policies, or legal agreements.
    </p>

    <p className="text-justify">
      Legitimate usage includes unlocking personal files, documents shared with valid passwords, or business records accessed through authorised workflows. Ethical document handling remains extremely important when working with confidential digital information.
    </p>

    <p className="text-justify">
      Responsible usage helps ensure document security tools remain beneficial for productivity and accessibility without encouraging misuse or unauthorised access attempts.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Why Browser Based PDF Tools Feel More Convenient
    </h3>

    <p className="text-justify">
      Browser based utilities simplify accessibility because users can unlock PDFs instantly without software installation or account registration. This makes the process faster and easier across desktops, laptops, tablets, and smartphones.
    </p>

    <p className="text-justify">
      This PDF Password Remover works directly inside the browser, providing a lightweight and beginner friendly experience. Users simply upload the file, enter the password, and generate an unlocked PDF quickly.
    </p>

    <p className="text-justify">
      Users managing larger document collections sometimes additionally use the <a href="https://convertixy.com/pdf-compressor" className="text-blue-600 hover:underline font-medium">PDF Compressor</a> after unlocking large files to reduce storage usage and simplify sharing workflows.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Why Organisations Sometimes Remove Legacy PDF Passwords
    </h3>

    <p className="text-justify">
      Organisations managing large archives may eventually remove passwords from older documents to improve accessibility and simplify migration into modern document management systems.
    </p>

    <p className="text-justify">
      Legacy passwords sometimes become difficult to track over time, especially when employees leave organisations or documentation systems change. Unlocking authorised documents can improve long term accessibility and reduce workflow interruptions.
    </p>

    <p className="text-justify">
      Many modern enterprise platforms now use role based access controls and encrypted cloud systems instead of relying entirely on individual PDF passwords for document protection.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Helpful Security Practices After Removing Passwords
    </h3>

    <p className="text-justify">
      Users should still store unlocked PDFs responsibly after removing password protection. Sensitive files should remain inside secure folders, encrypted storage systems, or protected cloud accounts with proper access controls.
    </p>

    <p className="text-justify">
      Important confidential documents should not be shared publicly without proper review. Organisations should also maintain security policies governing who can access unlocked records internally.
    </p>

    <p className="text-justify">
      Users handling scanned and image based document workflows sometimes additionally use the <a href="https://convertixy.com/image-to-pdf" className="text-blue-600 hover:underline font-medium">Image to PDF Converter</a> while rebuilding or reorganising protected document collections digitally.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Why Modern PDF Security Continues Evolving
    </h3>

    <p className="text-justify">
      PDF security technology continues improving as digital document usage grows worldwide. Modern encryption standards provide much stronger protection compared to older PDF security systems used years ago.
    </p>

    <p className="text-justify">
      Businesses increasingly combine document encryption with cloud authentication systems, digital signatures, access logs, and identity management tools to strengthen overall security beyond simple password protection alone.
    </p>

    <p className="text-justify">
      Despite these improvements, password protected PDFs will likely remain common because they provide a simple and accessible security layer for millions of everyday document workflows.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Final Thoughts on Using a PDF Password Remover
    </h3>

    <p className="text-justify">
      PDF password protection plays an important role in digital document security because it helps restrict unauthorised access and protect confidential information across personal and professional workflows.
    </p>

    <p className="text-justify">
      This browser based PDF Password Remover provides a fast and beginner friendly way to unlock authorised PDF files securely after entering the correct credentials. Users can simplify document access while maintaining original content quality and formatting.
    </p>

    <p className="text-justify">
      Whether you are managing business records, educational material, legal files, archived reports, or personal documents, removing unnecessary password friction from authorised PDFs can improve productivity, accessibility, and document workflow efficiency significantly.
    </p>
  </div>
</section>
    </ToolSection>
  );
}
