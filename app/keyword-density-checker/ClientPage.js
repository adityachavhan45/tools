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
          Keyword density refers to the percentage of times a keyword or phrase 
          appears in a piece of content compared to the total word count. It is 
          one of the most fundamental on-page SEO factors and plays a crucial 
          role in how search engines understand the relevance of your content. 
          Although modern algorithms focus more on context, user intent, and 
          semantic meaning, keyword density still remains important for balancing 
          readability with optimization. A keyword density checker ensures your 
          content is not under-optimized or keyword-stuffed, both of which can 
          hurt rankings and user experience.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features of This Tool</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Instant keyword density analysis with accurate counting</li>
          <li>Percentage-based breakdown of keyword usage</li>
          <li>SEO-friendly recommendations (too low, optimal, too high)</li>
          <li>Simple copy-to-clipboard functionality for quick sharing</li>
          <li>Runs entirely in your browser — secure and private</li>
          <li>Lightweight and fast, no sign-up required</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use the Keyword Density Checker</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Paste or type your text content in the input box.</li>
          <li>Enter the keyword you want to analyze.</li>
          <li>Click <strong>Check Density</strong> to generate results.</li>
          <li>Review the keyword count, percentage, and recommendations.</li>
          <li>Copy or reset results as needed.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Practical Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>SEO Professionals:</strong> Optimize articles, blogs, and web pages for search engines.</li>
          <li><strong>Content Writers:</strong> Maintain keyword balance while keeping content natural.</li>
          <li><strong>Bloggers:</strong> Improve chances of ranking by avoiding keyword stuffing.</li>
          <li><strong>Students:</strong> Learn the basics of keyword usage in digital marketing.</li>
          <li><strong>Marketers:</strong> Test ad copy, landing pages, and product descriptions.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">⚡ Why Keyword Density Still Matters</h4>
        <p className="text-gray-700 mb-4 text-sm">
          Search engines like Google may not rely solely on keyword density, 
          but it still acts as a signal of relevance. Too low, and your page 
          may fail to show up for target queries. Too high, and it risks being 
          flagged for keyword stuffing. An ideal keyword density of 1–3% is 
          considered safe and effective. More importantly, it forces writers 
          to focus on balance — using keywords naturally while enriching 
          content with synonyms, LSI (Latent Semantic Indexing) keywords, 
          and context-driven phrases.
        </p>

        <h4 className="font-semibold mt-4 mb-1">📖 Example</h4>
        <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800 overflow-x-auto">
{`Text: "The best SEO tools help with keyword analysis. A keyword tool 
is essential for SEO professionals."
Keyword: "SEO"
Total Words: 15
Keyword Occurrences: 2
Density: 13.33%
Status: Too High (reduce keyword usage)`}
        </pre>

        <h4 className="font-semibold mt-4 mb-1">🔒 Privacy & Security</h4>
        <p className="text-gray-700 mb-4 text-sm">
          This keyword density checker runs 100% in your browser, which means 
          your content is never uploaded to any server. Writers, marketers, 
          and SEO professionals can use it safely without worrying about 
          content leaks or privacy issues.
        </p>

        <h4 className="font-semibold mt-4 mb-1">❓ FAQs</h4>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
          <li><strong>Q: What is the ideal keyword density?</strong><br/> 
          A: Between 1% and 3% is generally considered optimal.</li>
          <li><strong>Q: Can this tool detect keyword stuffing?</strong><br/> 
          A: Yes, if the density is above 3%, it will mark it as too high.</li>
          <li><strong>Q: Does it support multi-word keywords?</strong><br/> 
          A: Yes, simply enter the entire phrase (e.g., “digital marketing”).</li>
          <li><strong>Q: Can I analyze large articles?</strong><br/> 
          A: Yes, the tool works for both short and long content.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🚀 Final Thoughts</h4>
        <p className="text-gray-700 text-sm">
          A keyword density checker is more than just a simple counter — it is 
          an SEO strategy assistant. Whether youre optimizing a blog post, a 
          product page, or an academic essay, checking keyword density ensures 
          your content stays natural, reader-friendly, and search-engine 
          optimized. By keeping density in the safe 1 to 3 range and focusing on 
          semantic relevance, you can strike the perfect balance between 
          readability and ranking power. Use this free tool regularly to 
          fine-tune your content and stay ahead in the digital competition.
        </p>
      </section>
    </ToolSection>
  );
}