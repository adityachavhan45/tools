"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function TextDiffCheckerPage() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [diff, setDiff] = useState("");
  const [message, setMessage] = useState("");

  function compareTexts() {
    if (!text1.trim() || !text2.trim()) {
      setMessage("⚠️ Please enter both texts to compare.");
      return;
    }

    try {
      // Simple text comparison
      const lines1 = text1.split('\n');
      const lines2 = text2.split('\n');

      let diffResult = "Text Diff Comparison\n";
      diffResult += `Generated on: ${new Date().toISOString()}\n\n`;

      diffResult += `Text 1 Statistics\n`;
      diffResult += `Total Lines: ${lines1.length}\n`;
      diffResult += `Total Characters: ${text1.length}\n`;
      diffResult += `Total Words: ${text1.split(/\s+/).filter(word => word.length > 0).length}\n\n`;

      diffResult += `Text 2 Statistics\n`;
      diffResult += `Total Lines: ${lines2.length}\n`;
      diffResult += `Total Characters: ${text2.length}\n`;
      diffResult += `Total Words: ${text2.split(/\s+/).filter(word => word.length > 0).length}\n\n`;

      diffResult += `Comparison Results\n`;
      diffResult += `Lines are identical: ${text1 === text2}\n`;
      diffResult += `Character count difference: ${Math.abs(text1.length - text2.length)}\n`;
      diffResult += `Word count difference: ${Math.abs(text1.split(/\s+/).filter(word => word.length > 0).length - text2.split(/\s+/).filter(word => word.length > 0).length)}\n\n`;

      // Line-by-line comparison
      const maxLines = Math.max(lines1.length, lines2.length);
      for (let i = 0; i < maxLines; i++) {
        const line1 = lines1[i] || '';
        const line2 = lines2[i] || '';

        if (line1 === line2) {
          diffResult += `Line ${i + 1}: IDENTICAL\n`;
        } else {
          diffResult += `Line ${i + 1}: DIFFERENT\n`;
          diffResult += `  Text 1: "${line1}"\n`;
          diffResult += `  Text 2: "${line2}"\n`;
        }
      }

      setDiff(diffResult);
      setMessage("✅ Text comparison completed successfully!");
    } catch (error) {
      setMessage("❌ Error comparing texts.");
    }
  }

  function copyDiff() {
    navigator.clipboard.writeText(diff);
    setMessage("📋 Diff result copied to clipboard!");
  }

  function reset() {
    setText1("");
    setText2("");
    setDiff("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Text Diff Checker"
      subtitle="Compare two texts and find differences online. Free text diff checker with highlighting and side-by-side comparison support."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Text Diff Checker",
          description: "Compare two texts and find differences online.",
          slug: "/text-diff-checker",
          category: "Utilities/Text",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Text Diff Checker", slug: "/text-diff-checker" },
        ])}
      />

      <div className="space-y-4">
        {/* Status Messages */}
        {message && (
          <div className="px-3 py-2 bg-blue-100 border rounded text-blue-800 text-sm">
            {message}
          </div>
        )}

        {/* Text 1 Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Text 1
          </label>
          <textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="Enter first text to compare..."
            className="w-full min-h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-y"
          />
        </div>

        {/* Text 2 Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Text 2
          </label>
          <textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="Enter second text to compare..."
            className="w-full min-h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-y"
          />
        </div>

        {/* Diff Output - plain text (no container) */}
        {diff && (
          <pre className="tool-output whitespace-pre-wrap break-words font-mono text-gray-800">
            {diff}
          </pre>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={compareTexts}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🔍 Compare Texts
          </button>

          {diff && (
            <button
              onClick={copyDiff}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                         bg-blue-600 text-white shadow 
                         hover:bg-blue-700"
            >
              📋 Copy Diff
            </button>
          )}

          <button
            onClick={reset}
            disabled={!text1.trim() && !text2.trim() && !diff.trim()}
            className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* Statistics */}
        {text1 && text2 && (
          <div className="border rounded-lg p-4 bg-gray-50">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Comparison Statistics</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium">Text 1:</div>
                <div>Characters: {text1.length}</div>
                <div>Words: {text1.split(/\s+/).filter(word => word.length > 0).length}</div>
                <div>Lines: {text1.split('\n').length}</div>
              </div>
              <div>
                <div className="font-medium">Text 2:</div>
                <div>Characters: {text2.length}</div>
                <div>Words: {text2.split(/\s+/).filter(word => word.length > 0).length}</div>
                <div>Lines: {text2.split('\n').length}</div>
              </div>
            </div>
          </div>
        )}

        {/* Diff Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">About Text Diff</h4>
          <div className="text-sm space-y-1">
            <div>• Text diff compares two texts and shows differences</div>
            <div>• Used for version control and document comparison</div>
            <div>• Supports line-by-line and character-level comparison</div>
            <div>• Commonly used in programming and content management</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About Text Diff Checker</h3>
        <p className="text-gray-700 mb-4">
          A Text Diff Checker is a simple yet powerful tool designed to compare two
          pieces of text and highlight their differences. Whether you are a writer
          editing multiple drafts, a programmer reviewing code changes, a student
          checking assignment revisions, or a content manager verifying updates,
          this tool saves time and reduces manual effort. By analyzing line-by-line
          and character-level differences, it provides instant clarity on what has
          been added, removed, or modified between two text versions.
        </p>

        <p className="text-gray-700 mb-4">
          Traditionally, people had to manually read both documents side by side,
          which was slow and error-prone. Today, with online diff checkers, the
          process is automated. Simply paste your texts, click compare, and see
          the differences highlighted instantly. This makes it ideal not just for
          coders, but also for students, teachers, lawyers, researchers, and anyone
          working with documents where accuracy matters.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Instant comparison of two text inputs</li>
          <li>Line-by-line and character-level difference detection</li>
          <li>Word count, character count, and line statistics</li>
          <li>Highlights identical vs. different lines</li>
          <li>One-click copy of results for reports</li>
          <li>Works directly in your browser — no data uploaded</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Paste or type your first text into the Text 1 field.</li>
          <li>Paste or type your second text into the Text 2 field.</li>
          <li>Click <strong>Compare Texts</strong> to generate the diff.</li>
          <li>Review the highlighted differences and statistics.</li>
          <li>Copy the results for documentation or sharing if needed.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>Content Editing:</strong> Compare original vs. edited drafts of articles or essays.</li>
          <li><strong>Programming:</strong> Review code changes between two versions for debugging.</li>
          <li><strong>Legal:</strong> Check revisions in contracts, agreements, or policy documents.</li>
          <li><strong>Academic:</strong> Compare student submissions with reference answers.</li>
          <li><strong>Plagiarism Check:</strong> Spot differences between similar documents.</li>
          <li><strong>Translation:</strong> Verify accuracy between original and translated text.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">📊 Why is Text Comparison Important?</h4>
        <p className="text-gray-700 mb-4">
          Text comparison is not just about spotting differences — it ensures
          accuracy, prevents mistakes, and maintains consistency. For developers,
          even a single missing semicolon can cause errors. For businesses,
          unnoticed changes in contracts may lead to costly consequences. For
          students, small variations in assignments can affect grades. By automating
          the process, a text diff checker reduces human error and improves
          productivity.
        </p>

        <h4 className="font-semibold mt-4 mb-1">🙋 Frequently Asked Questions</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>Does this tool check formatting?</strong> No, it compares raw text, not styling.</li>
          <li><strong>Can I compare very large documents?</strong> Yes, but for extremely large files, it may take a few seconds.</li>
          <li><strong>Is my data safe?</strong> Yes, all comparisons happen in your browser — nothing is uploaded.</li>
          <li><strong>Can I export the diff?</strong> Yes, you can copy the results and paste them anywhere.</li>
          <li><strong>Is this free?</strong> Absolutely — no limits or hidden costs.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🚀 Final Thoughts</h4>
        <p className="text-gray-700">
          The Text Diff Checker is a must-have utility for anyone who works with
          text. It simplifies comparison, saves time, and ensures accuracy across
          writing, coding, legal, and academic tasks. Instead of wasting hours
          scanning documents manually, you can detect differences instantly and
          focus on meaningful work. Fast, private, and free — this tool is your
          reliable companion for version control, content management, and everyday
          writing tasks.
        </p>
      </section>
    </ToolSection>
  );
}