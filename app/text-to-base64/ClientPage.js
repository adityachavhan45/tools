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
          Convert text to Base64 code and Base64 to text. This tool helps you create 
          Base64-encoded strings from plain text and decode Base64-encoded strings back 
          to text, useful for data transmission and storage.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Convert text to Base64 code</li>
          <li>Decode Base64-encoded strings</li>
          <li>Character analysis and statistics</li>
          <li>Base64 formatting and validation</li>
          <li>Easy copy to clipboard</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Enter text in the text field and click <strong>Text to Base64</strong>.</li>
          <li>Or enter Base64 code in the Base64 field and click <strong>Base64 to Text</strong>.</li>
          <li>Use the copy buttons to copy results to clipboard.</li>
          <li>Review the character analysis for additional information.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Data transmission and storage</li>
          <li>Email attachments and MIME</li>
          <li>Web development and APIs</li>
          <li>Text to code conversion</li>
        </ul>
      </section>
    </ToolSection>
  );
}