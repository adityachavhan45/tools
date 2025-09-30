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
          A Text to HTML Encoder is a lightweight yet powerful tool that allows you to
          convert plain text into structured HTML code, and also decode HTML code back
          into clean, readable text. HTML (HyperText Markup Language) is the standard
          markup language used for creating web pages, email templates, and digital
          documents. By using this encoder, you can quickly transform content into
          browser-ready HTML with proper formatting, semantic tags, and entity encoding.
          For example, symbols like <code>&lt;</code> or <code>&amp;</code> are automatically
          converted into safe HTML entities to ensure they display correctly on websites.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Convert plain text into structured HTML paragraphs and tags</li>
          <li>Decode HTML code back into clean, readable text instantly</li>
          <li>Automatic escaping of special characters (&, &lt;, &gt;)</li>
          <li>Character statistics: line count, word count, and character count</li>
          <li>Copy results with a single click for use in projects</li>
          <li>Works directly in your browser, no server needed</li>
          <li>Supports multi-line text, comments, and entity decoding</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Type or paste your text into the <strong>Text</strong> field.</li>
          <li>Click the <strong>Text to HTML</strong> button to generate HTML code.</li>
          <li>To reverse, paste HTML markup into the <strong>HTML</strong> field and
            click <strong>HTML to Text</strong>.</li>
          <li>Use the copy buttons to quickly copy your results.</li>
          <li>Review the character analysis section for insights about your input.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Common Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>Web Development:</strong> Generate clean HTML structure for web pages and apps.</li>
          <li><strong>Email Marketing:</strong> Encode newsletters and templates for consistent rendering.</li>
          <li><strong>Content Management:</strong> Safely paste raw text into CMS platforms without breaking formatting.</li>
          <li><strong>Programming & Debugging:</strong> Test how text and entities render in HTML.</li>
          <li><strong>Education:</strong> Learn how browsers interpret HTML entities and tags.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">📊 Why HTML Encoding Matters</h4>
        <p className="text-gray-700 mb-4">
          Raw text often contains characters that conflict with HTML syntax, such as
          <code>&lt;</code>, <code>&gt;</code>, and <code>&amp;</code>. Without proper encoding,
          these symbols may break layouts or create security risks (like XSS vulnerabilities).
          HTML encoding ensures that special characters are safely represented, allowing your
          content to display exactly as intended. This is especially important for blogs,
          forums, and dynamic content systems where user input must be sanitized.
        </p>

        <h4 className="font-semibold mt-4 mb-1">🙋 Frequently Asked Questions</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>What is HTML encoding?</strong> It is the process of replacing special
            characters with HTML entities so that they display correctly in browsers.</li>
          <li><strong>Can this tool decode HTML?</strong> Yes, it extracts readable text from
            encoded or structured HTML code.</li>
          <li><strong>Is this tool secure?</strong> Absolutely. All conversions happen in your
            browser locally, so no data is uploaded to any server.</li>
          <li><strong>Does it support large text files?</strong> Yes, but performance may depend
            on your browser and device memory.</li>
          <li><strong>Why do I need this tool?</strong> It saves time for developers, designers,
            students, and marketers who work with raw text and HTML regularly.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🚀 Final Thoughts</h4>
        <p className="text-gray-700">
          The Text to HTML Encoder is an essential utility for anyone working with web
          content. Whether you are a developer building websites, a marketer designing
          emails, or a student learning HTML basics, this tool makes encoding and decoding
          effortless. With instant conversions, character statistics, and copy features,
          you can streamline your workflow and ensure clean, valid HTML output every time.
          Try it with any string—like a paragraph, email template, or code snippet—and
          watch it transform into well-structured HTML instantly.
        </p>
      </section>
    </ToolSection>
  );
}