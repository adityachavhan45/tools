"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function BinaryToTextPage() {
  const [binary, setBinary] = useState("");
  const [encoding, setEncoding] = useState("utf8");
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");

  function convertToText() {
    if (!binary.trim()) {
      setMessage("⚠️ Please enter binary data first.");
      return;
    }

    try {
      // Clean binary input (remove spaces, newlines, etc.)
      const cleanBinary = binary.replace(/[^01]/g, '');
      
      if (cleanBinary.length === 0) {
        setMessage("⚠️ Please enter valid binary data (0s and 1s only).");
        return;
      }

      if (cleanBinary.length % 8 !== 0) {
        setMessage("⚠️ Binary data must be in groups of 8 bits.");
        return;
      }

      let text = "";
      for (let i = 0; i < cleanBinary.length; i += 8) {
        const byte = cleanBinary.substr(i, 8);
        const charCode = parseInt(byte, 2);
        if (charCode >= 32 && charCode <= 126) { // Printable ASCII range
          text += String.fromCharCode(charCode);
        } else {
          text += '?'; // Non-printable character
        }
      }

      // Minimal output: only decoded text
      setResult(text);
      setMessage("✅ Binary converted to text successfully!");
    } catch (error) {
      setMessage("❌ Error converting binary to text.");
    }
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
    setMessage("📋 Text output copied to clipboard!");
  }

  function reset() {
    setBinary("");
    setEncoding("utf8");
    setResult("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Binary to Text"
      subtitle="Convert binary to text online. Free binary to text converter with encoding options and text formatting for data conversion and text processing."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Binary to Text",
          description: "Convert binary to text online.",
          slug: "/binary-to-text",
          category: "Utilities/Text",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Binary to Text", slug: "/binary-to-text" },
        ])}
      />

      <div className="space-y-4">
        {/* Status Messages */}
        {message && (
          <div className="px-3 py-2 bg-blue-100 border rounded text-blue-800 text-sm">
            {message}
          </div>
        )}

        {/* Binary Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Binary Data
          </label>
          <textarea
            value={binary}
            onChange={(e) => setBinary(e.target.value)}
            placeholder="Enter or paste binary data here (0s and 1s)..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
          />
        </div>

        {/* Encoding Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Text Encoding
          </label>
          <select
            value={encoding}
            onChange={(e) => setEncoding(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="utf8">UTF-8</option>
            <option value="latin1">Latin-1</option>
            <option value="utf16">UTF-16</option>
          </select>
        </div>

        {/* Result Output - plain text (no container) */}
        {result && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text Output
            </label>
            <pre className="tool-output whitespace-pre-wrap break-words font-mono text-gray-800">
              {result}
            </pre>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={convertToText}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🔄 Convert to Text
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
            disabled={!binary.trim() && !result.trim()}
            className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* Conversion Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">Conversion Options</h4>
          <div className="text-sm space-y-1">
            <div>• UTF-8: Unicode text encoding</div>
            <div>• ASCII: Basic text encoding</div>
            <div>• Latin-1: Western European encoding</div>
            <div>• UTF-16: Unicode 16-bit encoding</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About Binary to Text Conversion</h3>
        <p className="text-gray-700 mb-4">
          Convert binary data to readable text for data processing and analysis. This tool helps you 
          transform binary data into text, useful for data analysis, debugging, and text processing.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Convert binary data to text</li>
          <li>Multiple encoding options</li>
          <li>Data validation and error handling</li>
          <li>High-quality text conversion</li>
          <li>Easy copy to clipboard</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Enter or paste binary data.</li>
          <li>Select the text encoding.</li>
          <li>Click <strong>Convert to Text</strong> to process.</li>
          <li>Copy the text output.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Data analysis and processing</li>
          <li>Debugging and troubleshooting</li>
          <li>Text processing and conversion</li>
          <li>Data recovery and analysis</li>
        </ul>
      </section>
    </ToolSection>
  );
}