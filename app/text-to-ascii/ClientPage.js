"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function TextToAsciiPage() {
  const [text, setText] = useState("");
  const [ascii, setAscii] = useState("");
  const [message, setMessage] = useState("");

  function convertTextToAscii() {
    if (!text.trim()) {
      setMessage("⚠️ Please enter text to convert to ASCII code.");
      return;
    }

    try {
      // Create a simple ASCII structure from the text
      const lines = text.split('\n');
      const asciiContent = lines.map((line, index) => 
        `    "${line.split('').map(char => char.charCodeAt(0)).join(',')}"`
      ).join(',\n');

      const asciiString = `# Text to ASCII Conversion
# Generated on: ${new Date().toISOString()}

# ASCII Encoded Text Lines
${asciiContent}

# Statistics
# Total Lines: ${lines.length}
# Total Characters: ${text.length}
# Total Words: ${text.split(/\s+/).filter(word => word.length > 0).length}
# Average Line Length: ${Math.round(text.length / lines.length)}
# Longest Line: ${Math.max(...lines.map(line => line.length))}
# Shortest Line: ${Math.min(...lines.map(line => line.length))}

# Usage Examples
# Single line: ${lines[0]?.split('').map(char => char.charCodeAt(0)).join(',') || ''}
# All lines: ${text.split('').map(char => char.charCodeAt(0)).join(',')}`;

      setAscii(asciiString);
      setMessage("✅ Text converted to ASCII code successfully!");
    } catch (error) {
      setMessage("❌ Error converting text to ASCII code.");
    }
  }

  function convertAsciiToText() {
    if (!ascii.trim()) {
      setMessage("⚠️ Please enter ASCII code to convert to text.");
      return;
    }

    try {
      // Simple ASCII to text conversion
      let extractedText = ascii;
      
      // Extract text from ASCII encoded strings
      const asciiMatches = extractedText.match(/\d+/g);
      if (asciiMatches) {
        // Decode ASCII encoded characters
        extractedText = asciiMatches.map(code => String.fromCharCode(parseInt(code, 10))).join('');
      } else {
        // If no ASCII encoding, try to extract from comments and docstrings
        extractedText = extractedText.replace(/#.*$/gm, '');
        extractedText = extractedText.replace(/^\s*[a-zA-Z_][a-zA-Z0-9_]*\s*:/gm, '');
        extractedText = extractedText.replace(/^\s*-\s*/gm, '');
        extractedText = extractedText.replace(/\s+/g, ' ').trim();
      }

      setText(extractedText);
      setMessage("✅ ASCII code converted to text successfully!");
    } catch (error) {
      setMessage("❌ Error converting ASCII code to text. Please check your ASCII format.");
    }
  }

  function copyText() {
    navigator.clipboard.writeText(text);
    setMessage("📋 Text copied to clipboard!");
  }

  function copyAscii() {
    navigator.clipboard.writeText(ascii);
    setMessage("📋 ASCII code copied to clipboard!");
  }

  function reset() {
    setText("");
    setAscii("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Text to ASCII Converter"
      subtitle="Convert text to ASCII code and ASCII to text online. Free text to ASCII converter with formatting and validation support."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Text to ASCII Converter",
          description: "Convert text to ASCII code and ASCII to text online.",
          slug: "/text-to-ascii",
          category: "Utilities/Text",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Text to ASCII Converter", slug: "/text-to-ascii" },
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
            placeholder="Enter text to convert to ASCII code..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* ASCII Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter ASCII Code
          </label>
          <textarea
            value={ascii}
            onChange={(e) => setAscii(e.target.value)}
            placeholder="Enter ASCII code to convert to text..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter valid ASCII code
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={convertTextToAscii}
            disabled={!text.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🔤 Text to ASCII
          </button>

          <button
            onClick={convertAsciiToText}
            disabled={!ascii.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-green-600 text-white shadow 
                       hover:bg-green-700 disabled:opacity-60"
          >
            📡 ASCII to Text
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

          {ascii && (
            <button
              onClick={copyAscii}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                         bg-purple-600 text-white shadow 
                         hover:bg-purple-700"
            >
              📋 Copy ASCII
            </button>
          )}

          <button
            onClick={reset}
            disabled={!text.trim() && !ascii.trim()}
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

        {/* ASCII Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">About ASCII</h4>
          <div className="text-sm space-y-1">
            <div>• ASCII is a character encoding standard</div>
            <div>• Used for representing text in computers</div>
            <div>• Supports 128 characters (0-127)</div>
            <div>• Commonly used in programming and data processing</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About Text to ASCII Converter</h3>
        <p className="text-gray-700 mb-4">
          Convert text to ASCII code and ASCII to text. This tool helps you create 
          ASCII-encoded strings from plain text and decode ASCII-encoded strings back 
          to text, useful for programming and data analysis.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Convert text to ASCII code</li>
          <li>Decode ASCII-encoded strings</li>
          <li>Character analysis and statistics</li>
          <li>ASCII formatting and validation</li>
          <li>Easy copy to clipboard</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Enter text in the text field and click <strong>Text to ASCII</strong>.</li>
          <li>Or enter ASCII code in the ASCII field and click <strong>ASCII to Text</strong>.</li>
          <li>Use the copy buttons to copy results to clipboard.</li>
          <li>Review the character analysis for additional information.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Programming and debugging</li>
          <li>Data analysis and representation</li>
          <li>Character encoding and decoding</li>
          <li>Text to code conversion</li>
        </ul>
      </section>
    </ToolSection>
  );
}