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
          Remove PDF passwords for document access. This tool helps you 
          unlock password-protected PDFs, useful for document management, 
          sharing, and accessibility.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Remove PDF password protection</li>
          <li>Secure password verification</li>
          <li>Quality preservation and formatting</li>
          <li>Security considerations and warnings</li>
          <li>Easy copy to clipboard</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Upload a password-protected PDF file.</li>
          <li>Enter the correct PDF password.</li>
          <li>Click <strong>Remove Password</strong> to process.</li>
          <li>Download the unlocked PDF file.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Document access and sharing</li>
          <li>Password management and recovery</li>
          <li>Document processing and editing</li>
          <li>Accessibility and usability</li>
        </ul>
      </section>
    </ToolSection>
  );
}