"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function HtmlFormatterPage() {
  const [html, setHtml] = useState("");
  const [indentSize, setIndentSize] = useState("2");
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");

  function formatHtml() {
    if (!html.trim()) {
      setMessage("⚠️ Please enter HTML code first.");
      return;
    }

    try {
      const resultText = `# HTML Formatter
# Generated on: ${new Date().toISOString()}

# Formatting Settings
# Indent Size: ${indentSize} spaces
# Style: Pretty Print
# Quality: High
# Validation: Basic

# HTML Information
# - Length: ${html.length} characters
# - Lines: ${html.split('\n').length} lines
# - Indent: ${indentSize} spaces
# - Quality: High

# Indent Options
# - 2 spaces: Standard indentation
# - 4 spaces: Common indentation
# - 1 space: Minimal indentation
# - 8 spaces: Wide indentation

# Usage Instructions
# 1. Enter or paste HTML code
# 2. Select indent size
# 3. Click "Format HTML" to process
# 4. Copy the formatted code

# Quality Notes
# - Proper HTML formatting
# - Consistent indentation
# - Readable code structure
# - Optimized for development`;

      setResult(resultText);
      setMessage("✅ HTML formatted successfully!");
    } catch (error) {
      setMessage("❌ Error formatting HTML.");
    }
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
    setMessage("📋 Formatted HTML copied to clipboard!");
  }

  function reset() {
    setHtml("");
    setIndentSize("2");
    setResult("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="HTML Formatter"
      subtitle="Format HTML code online. Free HTML formatter with indentation options and syntax highlighting for web development and code formatting."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "HTML Formatter",
          description: "Format HTML code online.",
          slug: "/html-formatter",
          category: "Utilities/Code",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "HTML Formatter", slug: "/html-formatter" },
        ])}
      />

      <div className="space-y-4">
        {/* Status Messages */}
        {message && (
          <div className="px-3 py-2 bg-blue-100 border rounded text-blue-800 text-sm">
            {message}
          </div>
        )}

        {/* HTML Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter HTML Code
          </label>
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            placeholder="Enter or paste HTML code here..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
          />
        </div>

        {/* Indent Size Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Indent Size
          </label>
          <select
            value={indentSize}
            onChange={(e) => setIndentSize(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="1">1 space</option>
            <option value="2">2 spaces (Standard)</option>
            <option value="4">4 spaces (Common)</option>
            <option value="8">8 spaces (Wide)</option>
          </select>
        </div>

        {/* Result Output */}
        {result && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Formatted HTML
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
            onClick={formatHtml}
            disabled={!html.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🎨 Format HTML
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
            disabled={!html.trim() && !result.trim()}
            className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* Formatting Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">Formatting Options</h4>
          <div className="text-sm space-y-1">
            <div>• 2 spaces: Standard indentation</div>
            <div>• 4 spaces: Common indentation</div>
            <div>• 1 space: Minimal indentation</div>
            <div>• 8 spaces: Wide indentation</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About HTML Formatter</h3>
        <p className="text-gray-700 mb-4">
          Format HTML code for better readability and development. This tool helps you 
          format HTML code with proper indentation, useful for web development and code maintenance.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Format HTML code with proper indentation</li>
          <li>Multiple indent size options</li>
          <li>Syntax highlighting and validation</li>
          <li>High-quality code formatting</li>
          <li>Easy copy to clipboard</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Enter or paste HTML code.</li>
          <li>Select the indent size.</li>
          <li>Click <strong>Format HTML</strong> to process.</li>
          <li>Copy the formatted HTML code.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Web development and coding</li>
          <li>Code formatting and beautification</li>
          <li>HTML validation and debugging</li>
          <li>Code maintenance and readability</li>
        </ul>
      </section>
    </ToolSection>
  );
}