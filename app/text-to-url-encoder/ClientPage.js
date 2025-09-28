"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function TextToUrlEncoderPage() {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  function convertTextToUrl() {
    if (!text.trim()) {
      setMessage("⚠️ Please enter text to convert to URL code.");
      return;
    }

    try {
      // Create a simple URL structure from the text
      const lines = text.split('\n');
      const urlContent = lines.map((line, index) => 
        `    "${encodeURIComponent(line)}"`
      ).join(',\n');

      const urlString = `# Text to URL Conversion
# Generated on: ${new Date().toISOString()}

# URL Encoded Text Lines
${urlContent}

# Statistics
# Total Lines: ${lines.length}
# Total Characters: ${text.length}
# Total Words: ${text.split(/\s+/).filter(word => word.length > 0).length}
# Average Line Length: ${Math.round(text.length / lines.length)}
# Longest Line: ${Math.max(...lines.map(line => line.length))}
# Shortest Line: ${Math.min(...lines.map(line => line.length))}

# Usage Examples
# Single line: ${encodeURIComponent(lines[0] || '')}
# All lines: ${lines.map(line => encodeURIComponent(line)).join('&')}`;

      setUrl(urlString);
      setMessage("✅ Text converted to URL code successfully!");
    } catch (error) {
      setMessage("❌ Error converting text to URL code.");
    }
  }

  function convertUrlToText() {
    if (!url.trim()) {
      setMessage("⚠️ Please enter URL code to convert to text.");
      return;
    }

    try {
      // Simple URL to text conversion
      let extractedText = url;
      
      // Extract text from URL encoded strings
      const urlMatches = extractedText.match(/%[0-9A-Fa-f]{2}/g);
      if (urlMatches) {
        // Decode URL encoded characters
        extractedText = decodeURIComponent(extractedText);
      } else {
        // If no URL encoding, try to extract from comments and docstrings
        extractedText = extractedText.replace(/#.*$/gm, '');
        extractedText = extractedText.replace(/^\s*[a-zA-Z_][a-zA-Z0-9_]*\s*:/gm, '');
        extractedText = extractedText.replace(/^\s*-\s*/gm, '');
        extractedText = extractedText.replace(/\s+/g, ' ').trim();
      }

      setText(extractedText);
      setMessage("✅ URL code converted to text successfully!");
    } catch (error) {
      setMessage("❌ Error converting URL code to text. Please check your URL format.");
    }
  }

  function copyText() {
    navigator.clipboard.writeText(text);
    setMessage("📋 Text copied to clipboard!");
  }

  function copyUrl() {
    navigator.clipboard.writeText(url);
    setMessage("📋 URL code copied to clipboard!");
  }

  function reset() {
    setText("");
    setUrl("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Text to URL Encoder"
      subtitle="Convert text to URL code and URL to text online. Free text to URL encoder with formatting and validation support."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Text to URL Encoder",
          description: "Convert text to URL code and URL to text online.",
          slug: "/text-to-url-encoder",
          category: "Utilities/Text",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Text to URL Encoder", slug: "/text-to-url-encoder" },
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
            placeholder="Enter text to convert to URL code..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* URL Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter URL Code
          </label>
          <textarea
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL code to convert to text..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter valid URL code
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={convertTextToUrl}
            disabled={!text.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🔤 Text to URL
          </button>

          <button
            onClick={convertUrlToText}
            disabled={!url.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-green-600 text-white shadow 
                       hover:bg-green-700 disabled:opacity-60"
          >
            📡 URL to Text
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

          {url && (
            <button
              onClick={copyUrl}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                         bg-purple-600 text-white shadow 
                         hover:bg-purple-700"
            >
              📋 Copy URL
            </button>
          )}

          <button
            onClick={reset}
            disabled={!text.trim() && !url.trim()}
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

        {/* URL Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">About URL Encoding</h4>
          <div className="text-sm space-y-1">
            <div>• URL encoding converts special characters to percent-encoded format</div>
            <div>• Used for safe transmission of data in URLs</div>
            <div>• Supports international characters and spaces</div>
            <div>• Commonly used in web applications and APIs</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About Text to URL Encoder</h3>
        <p className="text-gray-700 mb-4">
          Convert text to URL code and URL to text. This tool helps you create 
          URL-encoded strings from plain text and decode URL-encoded strings back 
          to text, useful for web development and data transmission.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Convert text to URL code</li>
          <li>Decode URL-encoded strings</li>
          <li>Character analysis and statistics</li>
          <li>URL formatting and validation</li>
          <li>Easy copy to clipboard</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Enter text in the text field and click <strong>Text to URL</strong>.</li>
          <li>Or enter URL code in the URL field and click <strong>URL to Text</strong>.</li>
          <li>Use the copy buttons to copy results to clipboard.</li>
          <li>Review the character analysis for additional information.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Web development and APIs</li>
          <li>Data transmission and storage</li>
          <li>URL parameter encoding</li>
          <li>Text to code conversion</li>
        </ul>
      </section>
    </ToolSection>
  );
}