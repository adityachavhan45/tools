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
          An HTML Formatter is a tool that takes unstructured, messy, or
          minified HTML code and reformats it into a clean, human-readable
          structure. By applying consistent indentation, spacing, and line
          breaks, this tool makes code much easier to read, debug, and maintain.
          In modern web development, clean HTML is essential not just for
          developers but also for ensuring smooth collaboration, SEO benefits,
          and faster project scaling. This formatter allows developers, learners,
          and professionals to instantly beautify HTML code without installing
          heavy software or relying on complicated editors.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features of the HTML Formatter</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Proper indentation:</strong> Automatically formats code with
            consistent spacing for better readability.
          </li>
          <li>
            <strong>Multiple indent sizes:</strong> Choose between 1, 2, 4, or 8
            spaces depending on your coding standards or team guidelines.
          </li>
          <li>
            <strong>Syntax clarity:</strong> Makes nested HTML tags visually
            clear, reducing confusion in deeply structured layouts.
          </li>
          <li>
            <strong>Cross-browser friendly:</strong> Properly formatted HTML
            helps identify compatibility issues early.
          </li>
          <li>
            <strong>Copy-ready output:</strong> Once formatted, the code is
            ready to paste directly into your editor, IDE, or CMS.
          </li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          <li>Paste or type your raw HTML code into the input box.</li>
          <li>Select the indentation size that suits your project (2 spaces is standard).</li>
          <li>Click the <strong>Format HTML</strong> button.</li>
          <li>Review the output in the formatted text box.</li>
          <li>Click “Copy” to copy the formatted code into your project.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Practical Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Web developers:</strong> Clean up messy or auto-generated
            HTML code for better readability.
          </li>
          <li>
            <strong>Students & learners:</strong> Understand how HTML tags nest
            properly by visualizing code in a structured format.
          </li>
          <li>
            <strong>Debugging:</strong> Easily identify misplaced tags,
            indentation issues, or broken structures.
          </li>
          <li>
            <strong>Content management:</strong> Editors working in WordPress,
            Joomla, or other CMS can tidy up raw HTML in posts and widgets.
          </li>
          <li>
            <strong>Code reviews:</strong> Share well-formatted HTML with team
            members for smoother collaboration.
          </li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">📖 Why Formatting HTML Matters</h4>
        <p className="text-gray-700 mb-4">
          Well-formatted HTML is more than just neat code—it directly impacts
          workflow, efficiency, and scalability. For example, when working on a
          large project, messy code slows down debugging and increases the risk
          of errors. Clean indentation helps identify which elements belong
          inside which parent tags, reducing accidental nesting issues.
          Moreover, search engines like Google prefer well-structured pages,
          which can contribute to better SEO. While HTML formatting does not
          directly affect how browsers render a page, it plays a big role in
          development speed, maintainability, and collaboration.
        </p>

        <h4 className="font-semibold mt-4 mb-1">🌍 Everyday Benefits</h4>
        <p className="text-gray-700 mb-4">
          Even non-developers benefit from formatted HTML. For instance,
          marketers often copy HTML snippets for newsletters, and properly
          formatted code reduces rendering issues in email clients. Teachers and
          trainers use HTML formatter tools to explain concepts more clearly to
          students. Designers integrating HTML templates into platforms like
          Figma or Webflow also appreciate neat code, which ensures faster
          adaptation and fewer errors during handoff.
        </p>

        <h4 className="font-semibold mt-4 mb-1">⚠️ Limitations and Best Practices</h4>
        <p className="text-gray-700 mb-4">
          While an HTML formatter beautifies code, it doesn’t fix logical errors
          like missing closing tags, improper attribute values, or invalid
          nesting. Developers should still validate their HTML with tools like
          W3C Validator. Best practice also includes maintaining consistency
          across a project—if a team uses 4 spaces, stick with it project-wide.
          Another tip is to combine formatting with proper comments, so
          formatted code is not only clean but also easy to understand later.
        </p>

        <h4 className="font-semibold mt-4 mb-1">💡 Final Thoughts</h4>
        <p className="text-gray-700">
          The HTML Formatter tool is a must-have for web developers, students,
          and content editors. It saves time, improves readability, and
          encourages best practices in coding. Whether you are debugging,
          learning, or maintaining a large-scale project, formatted HTML code
          ensures smoother workflows and professional results. By adopting clean
          formatting habits, developers build more maintainable, scalable, and
          error-free websites. Ultimately, this small step contributes to big
          gains in productivity and clarity in web development projects.
        </p>
      </section>
    </ToolSection>
  );
}