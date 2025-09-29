"use client";
import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function TextToHexPage() {
  const [text, setText] = useState("");
  const [hex, setHex] = useState("");
  const [output, setOutput] = useState("");
  const [message, setMessage] = useState("");


  function convertTextToHex() {
    if (!text.trim()) {
      setMessage("⚠️ Please enter text to convert to Hex code.");
      return;
    }

    try {
      // Minimal Hex encoding: one hex line per input line (no headers)
      const lines = text.split('\n');
      const hexLines = lines
        .map(line => line.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(''))
        .join('\n');

      setHex(hexLines);     // keep input editable with clean hex
      setOutput(hexLines);  // show pretty, plain output
      setMessage("✅ Text converted to Hex code successfully!");
    } catch (error) {
      setMessage("❌ Error converting text to Hex code.");
    }
  }


  function convertHexToText() {
    if (!hex.trim()) {
      setMessage("⚠️ Please enter Hex code to convert to text.");
      return;
    }

    try {
      // Simple Hex to text conversion
      let extractedText = hex;
      
      // Extract text from Hex encoded strings
      const hexMatches = extractedText.match(/[0-9A-Fa-f]{2,}/g);
      if (hexMatches) {
        // Decode Hex encoded characters (two hex digits per byte)
        extractedText = hexMatches
          .map(m => (m.match(/.{2}/g) || [])
            .map(h => String.fromCharCode(parseInt(h, 16)))
            .join(''))
          .join('\n');
      } else {
        // If no Hex encoding, try to extract from comments and docstrings
        extractedText = extractedText.replace(/#.*$/gm, '');
        extractedText = extractedText.replace(/^\s*[a-zA-Z_][a-zA-Z0-9_]*\s*:/gm, '');
        extractedText = extractedText.replace(/^\s*-\s*/gm, '');
        extractedText = extractedText.replace(/\s+/g, ' ').trim();
      }

      setText(extractedText);
      setOutput(extractedText);
      setMessage("✅ Hex code converted to text successfully!");
    } catch (error) {
      setMessage("❌ Error converting Hex code to text. Please check your Hex format.");
    }
  }

  function copyText() {
    navigator.clipboard.writeText(text);
    setMessage("📋 Text copied to clipboard!");
  }
  function copyHex() {
    navigator.clipboard.writeText(hex);
    setMessage("📋 Hex code copied to clipboard!");
  }

  function reset() {
    setText("");
    setHex("");
    setOutput("");
    setMessage("🧹 Cleared!");
  }


  return (
    <ToolSection
      title="Text to Hex Converter"
      subtitle="Convert text to Hex code and Hex to text online. Free text to Hex converter with formatting and validation support."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Text to Hex Converter",
          description: "Convert text to Hex code and Hex to text online.",
          slug: "/text-to-hex",
          category: "Utilities/Text",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Text to Hex Converter", slug: "/text-to-hex" },
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
            placeholder="Enter text to convert to Hex code..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Hex Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Hex Code
          </label>
          <textarea
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            placeholder="Enter Hex code to convert to text..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter valid Hex code
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={convertTextToHex}
            disabled={!text.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🔤 Text to Hex
          </button>

          <button
            onClick={convertHexToText}
            disabled={!hex.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-green-600 text-white shadow 
                       hover:bg-green-700 disabled:opacity-60"
          >
            📡 Hex to Text
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

          {hex && (
            <button
              onClick={copyHex}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                         bg-purple-600 text-white shadow 
                         hover:bg-purple-700"
            >
              📋 Copy Hex
            </button>
          )}

          <button
            onClick={reset}
            disabled={!text.trim() && !hex.trim()}
            className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* Output - plain preview (no box) */}
        {output && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Output</label>
            <pre className="tool-output whitespace-pre-wrap break-words font-mono text-gray-800">{output}</pre>
          </div>
        )}

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

        {/* Hex Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">About Hex</h4>
          <div className="text-sm space-y-1">
            <div>• Hex is a base-16 number system</div>
            <div>• Used for representing binary data in human-readable format</div>
            <div>• Supports 16 digits (0-9, A-F)</div>
            <div>• Commonly used in programming and debugging</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About Text to Hex Converter</h3>
        <p className="text-gray-700 mb-4">
          Convert text to Hex code and Hex to text. This tool helps you create 
          Hex-encoded strings from plain text and decode Hex-encoded strings back 
          to text, useful for programming and data analysis.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Convert text to Hex code</li>
          <li>Decode Hex-encoded strings</li>
          <li>Character analysis and statistics</li>
          <li>Hex formatting and validation</li>
          <li>Easy copy to clipboard</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Enter text in the text field and click <strong>Text to Hex</strong>.</li>
          <li>Or enter Hex code in the Hex field and click <strong>Hex to Text</strong>.</li>
          <li>Use the copy buttons to copy results to clipboard.</li>
          <li>Review the character analysis for additional information.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Programming and debugging</li>
          <li>Data analysis and representation</li>
          <li>Binary data handling</li>
          <li>Text to code conversion</li>
        </ul>
      </section>
    </ToolSection>
  );
}