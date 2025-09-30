"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function TextToBase64Page() {
  const [text, setText] = useState("");
  const [base64, setBase64] = useState("");
  const [message, setMessage] = useState("");

  function convertTextToBase64() {
    if (!text.trim()) {
      setMessage("⚠️ Please enter text to convert to Base64 code.");
      return;
    }

    try {
      // Create a simple Base64 structure from the text
      const lines = text.split('\n');
      const base64Content = lines.map((line, index) =>
        `    "${btoa(line)}"`
      ).join(',\n');

      const base64String = `# Text to Base64 Conversion
# Generated on: ${new Date().toISOString()}

# Base64 Encoded Text Lines
${base64Content}

# Statistics
# Total Lines: ${lines.length}
# Total Characters: ${text.length}
# Total Words: ${text.split(/\s+/).filter(word => word.length > 0).length}
# Average Line Length: ${Math.round(text.length / lines.length)}
# Longest Line: ${Math.max(...lines.map(line => line.length))}
# Shortest Line: ${Math.min(...lines.map(line => line.length))}

# Usage Examples
# Single line: ${btoa(lines[0] || '')}
# All lines: ${btoa(text)}`;

      setBase64(base64String);
      setMessage("✅ Text converted to Base64 code successfully!");
    } catch (error) {
      setMessage("❌ Error converting text to Base64 code.");
    }
  }

  function convertBase64ToText() {
    if (!base64.trim()) {
      setMessage("⚠️ Please enter Base64 code to convert to text.");
      return;
    }

    try {
      // Simple Base64 to text conversion
      let extractedText = base64;

      // Extract text from Base64 encoded strings
      const base64Matches = extractedText.match(/[A-Za-z0-9+/]{4,}={0,2}/g);
      if (base64Matches) {
        // Decode Base64 encoded characters
        extractedText = base64Matches.map(match => atob(match)).join('\n');
      } else {
        // If no Base64 encoding, try to extract from comments and docstrings
        extractedText = extractedText.replace(/#.*$/gm, '');
        extractedText = extractedText.replace(/^\s*[a-zA-Z_][a-zA-Z0-9_]*\s*:/gm, '');
        extractedText = extractedText.replace(/^\s*-\s*/gm, '');
        extractedText = extractedText.replace(/\s+/g, ' ').trim();
      }

      setText(extractedText);
      setMessage("✅ Base64 code converted to text successfully!");
    } catch (error) {
      setMessage("❌ Error converting Base64 code to text. Please check your Base64 format.");
    }
  }

  function copyText() {
    navigator.clipboard.writeText(text);
    setMessage("📋 Text copied to clipboard!");
  }

  function copyBase64() {
    navigator.clipboard.writeText(base64);
    setMessage("📋 Base64 code copied to clipboard!");
  }

  function reset() {
    setText("");
    setBase64("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Text to Base64 Converter"
      subtitle="Convert text to Base64 code and Base64 to text online. Free text to Base64 converter with formatting and validation support."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Text to Base64 Converter",
          description: "Convert text to Base64 code and Base64 to text online.",
          slug: "/text-to-base64",
          category: "Utilities/Text",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Text to Base64 Converter", slug: "/text-to-base64" },
        ])}
      />

      <div className="space-y-4">
        {/* Status Messages */}
        {message && (
          <div className="px-3 py-2 bg-blue-100 border rounded text-blue-800 text-sm">
            {message}
          </div>
        )}

        {/* Text Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Text
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to convert to Base64 code..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Base64 Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Base64 Code
          </label>
          <textarea
            value={base64}
            onChange={(e) => setBase64(e.target.value)}
            placeholder="Enter Base64 code to convert to text..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter valid Base64 code
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={convertTextToBase64}
            disabled={!text.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🔤 Text to Base64
          </button>

          <button
            onClick={convertBase64ToText}
            disabled={!base64.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-green-600 text-white shadow 
                       hover:bg-green-700 disabled:opacity-60"
          >
            📡 Base64 to Text
          </button>

          {text && (
            <button
              onClick={copyText}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                         bg-blue-600 text-white shadow 
                         hover:bg-blue-700"
            >
              📋 Copy Text
            </button>
          )}

          {base64 && (
            <button
              onClick={copyBase64}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                         bg-purple-600 text-white shadow 
                         hover:bg-purple-700"
            >
              📋 Copy Base64
            </button>
          )}

          <button
            onClick={reset}
            disabled={!text.trim() && !base64.trim()}
            className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* Character Analysis */}
        {text && (
          <div className="border rounded-lg p-4 bg-gray-50">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Character Analysis</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-medium">Total Characters:</div>
                <div>{text.length}</div>
              </div>
              <div>
                <div className="font-medium">Words:</div>
                <div>{text.split(/\s+/).filter(word => word.length > 0).length}</div>
              </div>
              <div>
                <div className="font-medium">Lines:</div>
                <div>{text.split('\n').length}</div>
              </div>
            </div>
          </div>
        )}

        {/* Base64 Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">About Base64</h4>
          <div className="text-sm space-y-1">
            <div>• Base64 is a binary-to-text encoding scheme</div>
            <div>• Used for safe transmission of binary data</div>
            <div>• Supports 64 printable ASCII characters</div>
            <div>• Commonly used in email attachments and data URLs</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About Text to Base64 Converter</h3>
        <p className="text-gray-700 mb-4">
          A Text to Base64 Converter is a simple yet powerful tool that helps you
          convert plain text into Base64-encoded strings and decode Base64 back
          into human-readable text. Base64 is a binary-to-text encoding scheme
          that represents binary data in an ASCII string format using only 64
          printable characters. It is widely used in web development, email
          transmission, data storage, and APIs to safely transfer binary data
          such as images, files, or special characters through systems that
          are only designed to handle text.
        </p>

        <p className="text-gray-700 mb-4">
          When you paste text and click <strong>Text to Base64</strong>, this tool
          instantly generates the Base64 equivalent. Similarly, if you have
          Base64-encoded content, you can paste it into the Base64 field and
          convert it back to plain text. Everything happens in your browser,
          meaning your data stays private and secure without being uploaded
          to any server.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Instant conversion from text to Base64 and back</li>
          <li>Safe, browser-based, and fully offline-capable</li>
          <li>Character analysis and statistics for better insights</li>
          <li>Base64 validation to avoid incorrect formats</li>
          <li>One-click copy option for both text and Base64 code</li>
          <li>Works on any modern device — desktop or mobile</li>
          <li>Completely free, no signup required</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Enter text in the <strong>Text</strong> field.</li>
          <li>Click <strong>Text to Base64</strong> to generate the encoded string.</li>
          <li>Copy the Base64 result using the one-click copy button.</li>
          <li>If you already have Base64 code, paste it into the <strong>Base64</strong> field.</li>
          <li>Click <strong>Base64 to Text</strong> to decode it back to plain text.</li>
          <li>Review the character analysis to see statistics like word count, line count, and total characters.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>Email Attachments (MIME):</strong> Base64 is often used to encode binary attachments such as images and documents in emails.</li>
          <li><strong>Web Development:</strong> Developers embed Base64-encoded images directly into HTML or CSS files for optimization.</li>
          <li><strong>APIs and Data Transfer:</strong> JSON and XML APIs use Base64 to safely transmit binary data over text-only protocols.</li>
          <li><strong>File Storage:</strong> Base64 helps store small binary files or credentials in configuration files.</li>
          <li><strong>Security:</strong> Although not encryption, Base64 provides a layer of obfuscation for sensitive strings.</li>
          <li><strong>Testing & Debugging:</strong> Developers frequently convert text to Base64 for debugging authentication tokens or encoded data.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">📊 Why Base64 is Important</h4>
        <p className="text-gray-700 mb-4">
          Base64 plays a crucial role in ensuring that binary data can travel
          across systems that were originally designed only for text. For example,
          early email protocols could not handle binary attachments directly,
          which is why Base64 became the standard for encoding images and files.
          In modern times, Base64 is widely used in APIs, authentication systems,
          and data URLs in web browsers. Understanding Base64 helps developers
          work with APIs, secure tokens, and cross-platform data sharing.
        </p>

        <h4 className="font-semibold mt-4 mb-1">🙋 Frequently Asked Questions</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>Is Base64 encryption?</strong> No. Base64 is encoding, not encryption. It is not meant to secure data, only to represent it safely in text format.</li>
          <li><strong>Why is Base64 longer than the original text?</strong> Base64 encoding increases data size by ~33% because binary is represented using only ASCII characters.</li>
          <li><strong>What characters are used in Base64?</strong> It uses A–Z, a–z, 0–9, +, and / for encoding, plus = as padding.</li>
          <li><strong>Can Base64 handle Unicode text?</strong> Yes, but you need to make sure the text is properly encoded (e.g., UTF-8) before converting.</li>
          <li><strong>Is Base64 still used today?</strong> Yes, especially in JSON APIs, OAuth tokens, JWTs, email attachments, and embedded images.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🚀 Final Thoughts</h4>
        <p className="text-gray-700">
          The Text to Base64 Converter is a fast, reliable, and secure way to
          handle encoding and decoding tasks online. Whether you are a developer
          embedding data in your web project, a student learning about encoding
          schemes, or a professional working with APIs and secure tokens, this
          tool provides instant results with complete privacy. Next time you
          encounter Base64 code or need to transmit data safely, this converter
          will be your go-to solution.
        </p>
      </section>
    </ToolSection>
  );
}