"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function TextToHtmlEncoderPage() {
  const [text, setText] = useState("");
  const [html, setHtml] = useState("");
  const [message, setMessage] = useState("");

  function convertTextToHtml() {
    if (!text.trim()) {
      setMessage("⚠️ Please enter text to convert to HTML code.");
      return;
    }

    try {
      // Create a simple HTML structure from the text
      const lines = text.split('\n');
      const htmlContent = lines.map((line, index) => 
        `    <p>${line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>`
      ).join('\n');

      const htmlString = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Text to HTML Conversion</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .content { max-width: 800px; margin: 0 auto; }
        .metadata { background: #f5f5f5; padding: 10px; border-radius: 5px; margin-bottom: 20px; }
    </style>
</head>
<body>
    <div class="content">
        <h1>Text to HTML Conversion</h1>
        <div class="metadata">
            <p><strong>Total Lines:</strong> ${lines.length}</p>
            <p><strong>Total Characters:</strong> ${text.length}</p>
            <p><strong>Total Words:</strong> ${text.split(/\s+/).filter(word => word.length > 0).length}</p>
            <p><strong>Generated:</strong> ${new Date().toISOString()}</p>
        </div>
        
        <div class="content">
${htmlContent}
        </div>
    </div>
</body>
</html>`;

      setHtml(htmlString);
      setMessage("✅ Text converted to HTML code successfully!");
    } catch (error) {
      setMessage("❌ Error converting text to HTML code.");
    }
  }

  function convertHtmlToText() {
    if (!html.trim()) {
      setMessage("⚠️ Please enter HTML code to convert to text.");
      return;
    }

    try {
      // Simple HTML to text conversion
      let extractedText = html;
      
      // Extract text from HTML elements
      const htmlMatches = extractedText.match(/<[^>]*>([^<]*)<\/[^>]*>/g);
      if (htmlMatches) {
        const textLines = htmlMatches.map(match => {
          const content = match.replace(/<[^>]*>/g, ''); // Remove HTML tags
          return content.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        });
        extractedText = textLines.join('\n');
      } else {
        // If no HTML elements, try to extract from comments and docstrings
        extractedText = extractedText.replace(/<!--.*?-->/gs, '');
        extractedText = extractedText.replace(/<[^>]*>/g, '');
        extractedText = extractedText.replace(/\s+/g, ' ').trim();
      }

      setText(extractedText);
      setMessage("✅ HTML code converted to text successfully!");
    } catch (error) {
      setMessage("❌ Error converting HTML code to text. Please check your HTML format.");
    }
  }

  function copyText() {
    navigator.clipboard.writeText(text);
    setMessage("📋 Text copied to clipboard!");
  }

  function copyHtml() {
    navigator.clipboard.writeText(html);
    setMessage("📋 HTML code copied to clipboard!");
  }

  function reset() {
    setText("");
    setHtml("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Text to HTML Encoder"
      subtitle="Convert text to HTML code and HTML to text online. Free text to HTML encoder with formatting and validation support."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Text to HTML Encoder",
          description: "Convert text to HTML code and HTML to text online.",
          slug: "/text-to-html-encoder",
          category: "Utilities/Text",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Text to HTML Encoder", slug: "/text-to-html-encoder" },
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
            placeholder="Enter text to convert to HTML code..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* HTML Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter HTML Code
          </label>
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            placeholder="Enter HTML code to convert to text..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter valid HTML code
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={convertTextToHtml}
            disabled={!text.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🔤 Text to HTML
          </button>

          <button
            onClick={convertHtmlToText}
            disabled={!html.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-green-600 text-white shadow 
                       hover:bg-green-700 disabled:opacity-60"
          >
            📡 HTML to Text
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

          {html && (
            <button
              onClick={copyHtml}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                         bg-purple-600 text-white shadow 
                         hover:bg-purple-700"
            >
              📋 Copy HTML
            </button>
          )}

          <button
            onClick={reset}
            disabled={!text.trim() && !html.trim()}
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

        {/* HTML Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">About HTML</h4>
          <div className="text-sm space-y-1">
            <div>• HTML is a markup language for web pages</div>
            <div>• Used for structuring and presenting content</div>
            <div>• Supports semantic elements and accessibility</div>
            <div>• Commonly used with CSS and JavaScript</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About Text to HTML Encoder</h3>
        <p className="text-gray-700 mb-4">
          Convert text to HTML code and HTML to text. This tool helps you create 
          structured HTML code from plain text and extract text content from HTML 
          files, useful for web development and content management.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Convert text to HTML code</li>
          <li>Extract text from HTML files</li>
          <li>Character analysis and statistics</li>
          <li>HTML formatting and validation</li>
          <li>Easy copy to clipboard</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Enter text in the text field and click <strong>Text to HTML</strong>.</li>
          <li>Or enter HTML code in the HTML field and click <strong>HTML to Text</strong>.</li>
          <li>Use the copy buttons to copy results to clipboard.</li>
          <li>Review the character analysis for additional information.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Web development and design</li>
          <li>Content management systems</li>
          <li>Email templates and newsletters</li>
          <li>Text to code conversion</li>
        </ul>
      </section>
    </ToolSection>
  );
}