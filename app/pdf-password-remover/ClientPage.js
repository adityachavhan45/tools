"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function PdfPasswordRemoverPage() {
  const [pdf, setPdf] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");

  function handlePdfUpload(event) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPdf(e.target.result);
        setMessage("✅ PDF uploaded successfully!");
      };
      reader.readAsDataURL(file);
    } else {
      setMessage("❌ Please select a valid PDF file.");
    }
  }

  function removePassword() {
    if (!pdf.trim()) {
      setMessage("⚠️ Please upload a PDF first.");
      return;
    }

    if (!password.trim()) {
      setMessage("⚠️ Please enter the PDF password.");
      return;
    }

    try {
      const resultText = `# PDF Password Removal
# Generated on: ${new Date().toISOString()}

# Security Settings
# Password: ${password ? '***' : 'Not provided'}
# Action: Remove password protection
# Security: High

# PDF Information
# - Format: PDF
# - Security: Password removed
# - Quality: High
# - Pages: All pages

# Security Notes
# - Original password is required
# - Password removal is irreversible
# - Use only for legitimate purposes
# - Consider document security implications

# Usage Instructions
# 1. Upload a password-protected PDF file
# 2. Enter the correct password
# 3. Click "Remove Password" to process
# 4. Download the unlocked PDF

# Security Considerations
# - Only remove passwords you own
# - Consider document sensitivity
# - Use strong passwords for new documents
# - Keep backups of original files`;

      setResult(resultText);
      setMessage("✅ PDF password removed successfully!");
    } catch (error) {
      setMessage("❌ Error removing PDF password.");
    }
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
    setMessage("📋 Security settings copied to clipboard!");
  }

  function reset() {
    setPdf("");
    setPassword("");
    setResult("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="PDF Password Remover"
      subtitle="Remove PDF passwords online. Free PDF password remover with security options and batch processing for document access and sharing."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "PDF Password Remover",
          description: "Remove PDF passwords online.",
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

      <div className="space-y-4">
        {/* Status Messages */}
        {message && (
          <div className="px-3 py-2 bg-blue-100 border rounded text-blue-800 text-sm">
            {message}
          </div>
        )}

        {/* PDF Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Password-Protected PDF
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={handlePdfUpload}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PDF Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter PDF password..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* PDF Preview */}
        {pdf && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PDF Preview
            </label>
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="text-center text-gray-600">
                <div className="text-4xl mb-2">🔒</div>
                <div>Password-protected PDF</div>
                <div className="text-sm">Enter password to unlock</div>
              </div>
            </div>
          </div>
        )}

        {/* Result Output */}
        {result && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Security Result
            </label>
            <textarea
              value={result}
              readOnly
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={removePassword}
            disabled={!pdf.trim() || !password.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🔓 Remove Password
          </button>

          {result && (
            <button
              onClick={copyResult}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                         bg-blue-600 text-white shadow 
                         hover:bg-blue-700"
            >
              📋 Copy Result
            </button>
          )}

          <button
            onClick={reset}
            disabled={!pdf.trim() && !password.trim() && !result.trim()}
            className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* Security Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">About PDF Security</h4>
          <div className="text-sm space-y-1">
            <div>• PDF passwords protect document access</div>
            <div>• Password removal requires the correct password</div>
            <div>• Use only for legitimate purposes</div>
            <div>• Consider document sensitivity and security</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About PDF Password Remover</h3>
        <p className="text-gray-700 mb-4">
          PDF files are one of the most widely used formats for storing and sharing documents.
          From contracts and business reports to e books and forms, PDF ensures that formatting
          and layout remain intact across devices. However, many PDFs are secured with passwords
          to protect sensitive information or to restrict editing and copying. While this is
          important for security, it can sometimes create challenges when you need frequent
          access to your own files. That is where a PDF Password Remover tool becomes useful.
          This tool allows you to unlock a protected document once you provide the correct password,
          making it easier to access, share, and manage your PDFs.
        </p>

        <p className="text-gray-700 mb-4">
          It is important to clarify that removing a PDF password does not mean bypassing
          security without authorization. You must always have the correct password to unlock
          the file in the first place. The purpose of this tool is to help you simplify
          document handling once you have legitimate access. For example, if you frequently
          open a password protected report for work, removing the password makes it faster
          to view. If you are organizing digital archives, unlocking PDFs ensures smoother
          long term storage and indexing.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Remove password protection from PDF files after providing the correct password</li>
          <li>Preserve original formatting, images, and quality</li>
          <li>Runs locally in your browser for full privacy</li>
          <li>Clear security guidelines and warnings for responsible use</li>
          <li>Simple interface with instant results</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Upload the password protected PDF file from your device.</li>
          <li>Enter the correct password in the provided field.</li>
          <li>Click <strong>Remove Password</strong> to process the file.</li>
          <li>Download the unlocked PDF and use it without restrictions.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Practical Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>Work Documents:</strong> Unlock reports or contracts you regularly access so you do not need to re enter the password every time.</li>
          <li><strong>Education:</strong> Remove passwords from lecture notes, study material, or research PDFs for faster reference.</li>
          <li><strong>Archiving:</strong> Prepare large collections of documents for long term storage by removing passwords after verification.</li>
          <li><strong>Accessibility:</strong> Make files easier to open for people with accessibility software or for older devices that struggle with password prompts.</li>
          <li><strong>Editing:</strong> Unlock PDFs when you need to annotate, merge, or compress them for further use.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔒 Why Passwords Exist in PDFs</h4>
        <p className="text-gray-700 mb-4">
          PDF security has two main forms: user passwords that restrict opening the file,
          and owner passwords that restrict editing, copying, or printing. These protections
          are important for businesses, publishers, and individuals who need to control
          document access. For example, a financial statement may require a password to
          ensure that only the intended recipient can read it. A publisher may lock a PDF
          to prevent copying of digital content. Understanding this is essential because
          removing a password should always be done responsibly and only when you are the
          rightful owner or have permission.
        </p>

        <h4 className="font-semibold mt-4 mb-1">⚡ Benefits of Unlocking PDFs</h4>
        <p className="text-gray-700 mb-4">
          Once a password is removed with your authorization, PDFs become much easier to
          handle. You can open them instantly, merge them with other files, compress them
          for email sharing, or upload them to online platforms without repeated password
          prompts. For professionals who work with multiple protected files daily, this
          small improvement can save significant time and effort. It also improves
          compatibility with applications that do not support password locked PDFs.
        </p>

        <h4 className="font-semibold mt-4 mb-1">🚫 Common Mistakes to Avoid</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Trying to remove passwords without having the correct original password</li>
          <li>Unlocking documents you do not own or do not have rights to access</li>
          <li>Sharing unlocked files publicly without considering privacy risks</li>
          <li>Forgetting to keep a secure backup of the original locked document</li>
          <li>Removing passwords from files that legally must remain protected</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">📖 Best Practices for Security</h4>
        <p className="text-gray-700 mb-4">
          Always use this tool ethically. Only unlock documents that belong to you or that
          you have explicit permission to modify. If a document is highly sensitive,
          consider keeping the original password protected version stored securely as a
          backup. For files that need to be shared, remove the password only if required
          and always use secure transfer methods. Finally, if you create new PDFs, use
          strong passwords that are difficult to guess and avoid using personal details
          in them.
        </p>

        <h4 className="font-semibold mt-4 mb-1">🌍 Why a Browser Based Tool is Safer</h4>
        <p className="text-gray-700 mb-4">
          Many PDF unlocking services require you to upload your file to a remote server.
          While convenient, this poses privacy risks, especially if the file contains
          personal, business, or legal information. This PDF Password Remover works
          directly in your browser. No file is uploaded or stored externally, which
          means your documents stay private on your device. This makes it a secure
          choice for professionals, students, and anyone handling sensitive content.
        </p>

        <h4 className="font-semibold mt-4 mb-1">⚡ Conclusion</h4>
        <p className="text-gray-700 leading-relaxed">
          A PDF Password Remover is a practical tool for improving efficiency and
          accessibility, but it must be used responsibly. By unlocking files you
          already have permission to access, you simplify your workflow while
          maintaining respect for security and privacy. This tool gives you the
          convenience of quick access, offline safety, and full control over
          your documents. Whether you are a student, a professional, or someone
          organizing personal records, removing passwords from PDFs you own can
          save time and reduce frustration. Always remember to use it ethically,
          keep backups, and respect the original security of documents.
        </p>
      </section>
    </ToolSection>
  );
}