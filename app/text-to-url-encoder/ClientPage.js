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
          The Text to URL Encoder is a free online tool that allows you to convert
          plain text into URL-encoded format and also decode URL-encoded strings
          back into readable text. URL encoding (also known as percent-encoding) is
          an essential process in web development and digital communication. It
          ensures that special characters such as spaces, symbols, or non-English
          letters can be safely transmitted through web addresses and APIs. For
          example, a space character is replaced with <code>%20</code> and symbols
          like <code>@</code>, <code>?</code>, and <code>&</code> are transformed into
          encoded values to prevent misinterpretation by browsers or servers.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Convert any plain text into URL-safe code instantly</li>
          <li>Decode encoded strings back into original human-readable text</li>
          <li>Character, word, and line count analysis included</li>
          <li>Preserves international characters and supports Unicode</li>
          <li>Easy one-click copy to clipboard for faster workflow</li>
          <li>Completely free and works directly in the browser</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Enter or paste your text into the input box.</li>
          <li>Click on <strong>Text to URL</strong> to encode your content.</li>
          <li>Alternatively, paste a URL-encoded string into the URL field and click <strong>URL to Text</strong> to decode it.</li>
          <li>Use the copy buttons to copy results for direct use in websites, APIs, or code.</li>
          <li>Check the character analysis section to quickly see total characters, words, and lines.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>Web development:</strong> Encode query parameters like names, emails, or IDs to avoid broken URLs.</li>
          <li><strong>APIs and data transmission:</strong> Ensure safe transfer of values when making GET or POST requests.</li>
          <li><strong>Security:</strong> Prevent injection attacks by encoding input before sending to servers.</li>
          <li><strong>Internationalization:</strong> Encode non-ASCII characters (e.g., Chinese, Arabic, Hindi) for global web compatibility.</li>
          <li><strong>Content sharing:</strong> Generate shareable and reliable links across platforms.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🌍 Why URL Encoding is Important</h4>
        <p className="text-gray-700 mb-4">
          URLs are meant to contain only a specific set of characters. Characters like
          spaces, quotes, or special symbols can break a URL if not encoded. For
          example, a link like
          <code>https://example.com/search?query=hello world</code> will fail because
          of the space. When encoded, it becomes
          <code>https://example.com/search?query=hello%20world</code>, which is valid.
          Similarly, encoding is vital when working with APIs, RESTful services, and
          even analytics tracking links. Without encoding, many systems may reject or
          misinterpret the request, leading to errors or security vulnerabilities.
        </p>

        <h4 className="font-semibold mt-4 mb-1">💡 Examples</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Text: <code>Hello World!</code> → Encoded: <code>Hello%20World%21</code></li>
          <li>Text: <code>email@example.com</code> → Encoded: <code>email%40example.com</code></li>
          <li>Text: <code>100% safe</code> → Encoded: <code>100%25%20safe</code></li>
          <li>Text: <code>https://site.com?name=John Doe&age=25</code> → Encoded: <code>https%3A%2F%2Fsite.com%3Fname%3DJohn%20Doe%26age%3D25</code></li>
        </ul>
        <h4 className="font-semibold mt-4 mb-1">🙋 Frequently Asked Questions</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>Is URL encoding the same as Base64 encoding?</strong> No, URL encoding replaces unsafe characters with percent-encoded values, while Base64 is used for binary-to-text encoding (like images or files).</li>
          <li><strong>Does this tool work offline?</strong> Yes, it works entirely in your browser without sending data to servers.</li>
          <li><strong>Can I decode already encoded URLs?</strong> Yes, just paste them into the decoder box and click &quot;URL to Text&quot;.</li>
          <li><strong>Which characters are encoded?</strong> Reserved characters such as <code>?</code>, <code>&amp;</code>, <code>=</code>, <code>/</code>, and spaces are always encoded for safety.</li>
          <li><strong>Does it support Unicode?</strong> Yes, it supports all languages including Hindi, Arabic, Chinese, and emojis.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🚀 Final Thoughts</h4>
        <p className="text-gray-700">
          The Text to URL Encoder is a must-have tool for developers, marketers, and
          everyday users who frequently share links or work with APIs. By encoding
          and decoding URLs properly, you can avoid broken links, improve web
          security, and ensure smooth data transfer across platforms. Whether you are
          building a website, integrating third-party services, or simply sharing a
          link on social media, this tool helps you keep everything clean, safe, and
          reliable. Try it now and make your links error-free.
        </p>
      </section>
    </ToolSection>
  );
}