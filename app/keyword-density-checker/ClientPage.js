"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function KeywordDensityCheckerPage() {
  const [text, setText] = useState("");
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");

  function checkDensity() {
    if (!text.trim()) {
      setMessage("⚠️ Please enter text first.");
      return;
    }

    if (!keyword.trim()) {
      setMessage("⚠️ Please enter a keyword to check.");
      return;
    }

    try {
      const words = text.toLowerCase().split(/\s+/);
      const totalWords = words.length;
      const keywordLower = keyword.toLowerCase();
      const keywordCount = words.filter(word => word === keywordLower).length;
      const density = ((keywordCount / totalWords) * 100).toFixed(2);

      const resultText = `# Keyword Density Analysis
# Generated on: ${new Date().toISOString()}

# Analysis Settings
# Keyword: "${keyword}"
# Text Length: ${text.length} characters
# Total Words: ${totalWords} words
# Quality: High

# Keyword Statistics
# - Keyword: "${keyword}"
# - Count: ${keywordCount} occurrences
# - Density: ${density}%
# - Total Words: ${totalWords}

# SEO Recommendations
# - Optimal Density: 1-3%
# - Current Density: ${density}%
# - Status: ${density < 1 ? "Too Low" : density > 3 ? "Too High" : "Optimal"}
# - Suggestion: ${density < 1 ? "Increase keyword usage" : density > 3 ? "Reduce keyword usage" : "Good keyword density"}

# Usage Instructions
# 1. Enter or paste text content
# 2. Enter keyword to analyze
# 3. Click "Check Density" to process
# 4. Review the analysis results

# Quality Notes
# - Accurate keyword counting
# - SEO-optimized analysis
# - Professional recommendations
# - Optimized for content marketing`;

      setResult(resultText);
      setMessage("✅ Keyword density analysis completed!");
    } catch (error) {
      setMessage("❌ Error analyzing keyword density.");
    }
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
    setMessage("📋 Analysis results copied to clipboard!");
  }

  function reset() {
    setText("");
    setKeyword("");
    setResult("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Keyword Density Checker"
      subtitle="Check keyword density online. Free keyword density checker with analysis tools and SEO optimization for content marketing and search engine optimization."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Keyword Density Checker",
          description: "Check keyword density online.",
          slug: "/keyword-density-checker",
          category: "Utilities/SEO",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Keyword Density Checker", slug: "/keyword-density-checker" },
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
            Enter Text Content
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter or paste text content here..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Keyword Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Keyword
          </label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter keyword to analyze..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Result Output */}
        {result && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Analysis Results
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
            onClick={checkDensity}
            disabled={!text.trim() || !keyword.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🔍 Check Density
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
            disabled={!text.trim() && !keyword.trim() && !result.trim()}
            className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* Analysis Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">SEO Guidelines</h4>
          <div className="text-sm space-y-1">
            <div>• Optimal Density: 1-3%</div>
            <div>• Too Low: Less than 1%</div>
            <div>• Too High: More than 3%</div>
            <div>• Quality: Natural keyword usage</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About Keyword Density Analysis</h3>
        <p className="text-gray-700 mb-4">
          Analyze keyword density for SEO optimization and content marketing. This tool helps you 
          check keyword usage in content, useful for SEO, content marketing, and search engine optimization.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Analyze keyword density in content</li>
          <li>SEO recommendations and guidelines</li>
          <li>Content optimization suggestions</li>
          <li>Professional analysis tools</li>
          <li>Easy copy to clipboard</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Enter or paste text content.</li>
          <li>Enter the keyword to analyze.</li>
          <li>Click <strong>Check Density</strong> to process.</li>
          <li>Review the analysis results.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>SEO optimization and content marketing</li>
          <li>Search engine optimization</li>
          <li>Content analysis and improvement</li>
          <li>Keyword research and strategy</li>
        </ul>
      </section>
    </ToolSection>
  );
}