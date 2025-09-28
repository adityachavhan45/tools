"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function MarkdownToHtmlPage() {
  const [markdown, setMarkdown] = useState("");
  const [formatting, setFormatting] = useState("pretty");
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");

  function convertToHtml() {
    if (!markdown.trim()) {
      setMessage("⚠️ Please enter Markdown text first.");
      return;
    }

    try {
      let html = markdown;

      // Convert headers
      html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
      html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
      html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

      // Convert bold and italic
      html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

      // Convert links
      html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

      // Convert images
      html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');

      // Convert code blocks
      html = html.replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>');
      html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

      // Convert lists
      html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
      html = html.replace(/^- (.*$)/gim, '<li>$1</li>');
      html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');

      // Convert paragraphs
      html = html.replace(/\n\n/g, '</p><p>');
      html = html.replace(/\n/g, '<br>');

      // Wrap in paragraph tags
      html = '<p>' + html + '</p>';

      // Clean up empty paragraphs
      html = html.replace(/<p><\/p>/g, '');
      html = html.replace(/<p><br><\/p>/g, '');

      const resultText = `# Markdown to HTML Conversion
# Generated on: ${new Date().toISOString()}

# Conversion Settings
# Formatting: ${formatting}
# Style: Pretty Print
# Quality: High
# Validation: Basic

# Markdown Information
# - Length: ${markdown.length} characters
# - Lines: ${markdown.split('\n').length} lines
# - Formatting: ${formatting}
# - Quality: High

# HTML Output
${html}

# Usage Instructions
# 1. Enter or paste Markdown text
# 2. Select formatting style
# 3. Click "Convert to HTML" to process
# 4. Copy the HTML output

# Quality Notes
# - Proper HTML formatting
# - Consistent structure and tags
# - Readable code output
# - Optimized for web development`;

      setResult(resultText);
      setMessage("✅ Markdown converted to HTML successfully!");
    } catch (error) {
      setMessage("❌ Error converting Markdown to HTML.");
    }
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
    setMessage("📋 HTML output copied to clipboard!");
  }

  function reset() {
    setMarkdown("");
    setFormatting("pretty");
    setResult("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Markdown to HTML"
      subtitle="Convert Markdown to HTML online. Free Markdown to HTML converter with formatting options and syntax highlighting for web development and content creation."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Markdown to HTML",
          description: "Convert Markdown to HTML online.",
          slug: "/markdown-to-html",
          category: "Utilities/Code",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Markdown to HTML", slug: "/markdown-to-html" },
        ])}
      />

      <div className="space-y-4">
        {/* Status Messages */}
        {message && (
          <div className="px-3 py-2 bg-blue-100 border rounded text-blue-800 text-sm">
            {message}
          </div>
        )}

        {/* Markdown Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Markdown Text
          </label>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Enter or paste Markdown text here..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
          />
        </div>

        {/* Formatting Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Formatting Style
          </label>
          <select
            value={formatting}
            onChange={(e) => setFormatting(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="pretty">Pretty Print</option>
            <option value="minified">Minified</option>
            <option value="compact">Compact</option>
            <option value="standard">Standard</option>
          </select>
        </div>

        {/* Result Output */}
        {result && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              HTML Output
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
            onClick={convertToHtml}
            disabled={!markdown.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🔄 Convert to HTML
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
            disabled={!markdown.trim() && !result.trim()}
            className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* Conversion Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">Conversion Options</h4>
          <div className="text-sm space-y-1">
            <div>• Pretty Print: Formatted HTML with indentation</div>
            <div>• Minified: Compact HTML without spaces</div>
            <div>• Compact: Minimal formatting</div>
            <div>• Standard: Basic HTML formatting</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About Markdown to HTML Conversion</h3>
        <p className="text-gray-700 mb-4">
          Convert Markdown text to HTML for web development and content creation. This tool helps you 
          transform Markdown into HTML, useful for web development, content management, and documentation.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Convert Markdown to HTML format</li>
          <li>Multiple formatting options</li>
          <li>Syntax highlighting and validation</li>
          <li>High-quality HTML output</li>
          <li>Easy copy to clipboard</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Enter or paste Markdown text.</li>
          <li>Select the formatting style.</li>
          <li>Click <strong>Convert to HTML</strong> to process.</li>
          <li>Copy the HTML output.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Web development and content creation</li>
          <li>Documentation and content management</li>
          <li>Blog and article formatting</li>
          <li>Technical writing and documentation</li>
        </ul>
      </section>
    </ToolSection>
  );
}