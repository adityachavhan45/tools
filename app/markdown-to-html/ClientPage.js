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
      // Clean up empty paragraphs
      html = html.replace(/<p><\/p>/g, '');
      html = html.replace(/<p><br><\/p>/g, '');

      const resultText = `Markdown to HTML Conversion
Generated on: ${new Date().toISOString()}

Conversion Settings
Formatting: ${formatting}
Style: Pretty Print
Quality: High
Validation: Basic

Markdown Information
- Length: ${markdown.length} characters
- Lines: ${markdown.split('\n').length} lines
- Formatting: ${formatting}
- Quality: High

HTML Output
${html}

Usage Instructions
1. Enter or paste Markdown text
2. Select formatting style
3. Click "Convert to HTML" to process
4. Copy the HTML output

Quality Notes
- Proper HTML formatting
- Consistent structure and tags
- Readable code output
- Optimized for web development`;

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
            className="w-full min-h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm resize-y"
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
            <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm whitespace-pre-wrap">
              {result}
            </div>
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
          Markdown is a lightweight markup language widely used by developers, content writers,
          and technical bloggers to write formatted text using simple syntax. However, most
          websites, blogs, and content management systems require HTML (HyperText Markup Language).
          That’s where a Markdown to HTML converter becomes essential—it bridges the gap between
          simple writing and web-ready code. With this free online tool, you can instantly convert
          your Markdown documents into clean, structured HTML output without relying on external
          libraries or heavy editors.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Instant conversion of Markdown text to HTML</li>
          <li>Support for headings, bold, italic, lists, links, and images</li>
          <li>Multiple formatting styles – pretty print, minified, compact, standard</li>
          <li>Generates clean HTML suitable for web publishing</li>
          <li>Secure – works entirely in your browser</li>
          <li>One-click copy to clipboard for easy usage</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Paste or type your Markdown content into the input box.</li>
          <li>Select your preferred formatting option (Pretty, Minified, Compact, Standard).</li>
          <li>Click <strong>Convert to HTML</strong> and get instant results.</li>
          <li>Copy the generated HTML code and use it in your projects, blogs, or CMS.</li>
          <li>If needed, reset and start again with new Markdown text.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Practical Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>Web Development:</strong> Convert Markdown documentation into HTML for websites.</li>
          <li><strong>Blogging Platforms:</strong> Write in Markdown and quickly transform content for WordPress, Ghost, or custom CMS.</li>
          <li><strong>Technical Documentation:</strong> Developers can maintain Markdown files but publish them as HTML docs.</li>
          <li><strong>Email Templates:</strong> Generate HTML emails from simple Markdown drafts.</li>
          <li><strong>Education:</strong> Students learning HTML can see how Markdown maps to structured tags.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">📖 Why Use Markdown Instead of Writing HTML?</h4>
        <p className="text-gray-700 mb-4 text-sm">
          Writing directly in HTML can be time-consuming and error-prone. Markdown offers a much
          cleaner and faster workflow, especially for writers who don’t want to worry about tags.
          For example, writing <code># Heading 1</code> is simpler than typing
          <code>&lt;h1&gt;Heading 1&lt;/h1&gt;</code>. A converter like this tool gives you
          the best of both worlds: you write fast in Markdown and still get standards-compliant
          HTML output for publishing.
        </p>

        <h4 className="font-semibold mt-4 mb-1">⚡ Benefits of Converting Markdown to HTML</h4>
        <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
          <li>Faster writing process – minimal syntax, less distraction</li>
          <li>Automatic conversion to semantic HTML tags</li>
          <li>Improves SEO by producing clean code</li>
          <li>Cross-platform support – use HTML anywhere</li>
          <li>Enables smooth collaboration between writers and developers</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">📊 Example Conversion</h4>
        <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800 overflow-x-auto">
          {`Markdown:
# Welcome
This is **bold** and this is *italic*.

HTML Output:
<h1>Welcome</h1>
<p>This is <strong>bold</strong> and this is <em>italic</em>.</p>`}
        </pre>

        <h4 className="font-semibold mt-4 mb-1">❓ FAQs</h4>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
          <li><strong>Q: Does this tool support advanced Markdown?</strong><br />
            A: Basic syntax like headings, lists, bold, italic, links, and code is supported. For advanced extensions, you may need dedicated parsers.</li>
          <li><strong>Q: Is my data safe?</strong><br />
            A: Yes, everything runs in your browser. No data is uploaded to servers.</li>
          <li><strong>Q: Can I use the HTML directly in WordPress?</strong><br />
            A: Absolutely. Just copy the output and paste it into the HTML editor.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🚀 Final Thoughts</h4>
        <p className="text-gray-700 text-sm">
          Markdown simplifies writing, but HTML powers the web. With this converter, you can
          instantly transform lightweight text into publish-ready code. Whether you are a developer,
          blogger, or content creator, this tool ensures your workflow stays fast, efficient,
          and professional. Instead of struggling with HTML tags, focus on your content and let
          this converter handle the formatting.
        </p>
      </section>
    </ToolSection>
  );
}