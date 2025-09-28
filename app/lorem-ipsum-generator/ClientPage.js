"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function LoremIpsumGeneratorPage() {
  const [paragraphs, setParagraphs] = useState("3");
  const [words, setWords] = useState("50");
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");

  function generateLoremIpsum() {
    const paragraphCount = parseInt(paragraphs) || 3;
    const wordCount = parseInt(words) || 50;

    if (paragraphCount < 1 || paragraphCount > 20) {
      setMessage("⚠️ Paragraph count must be between 1 and 20.");
      return;
    }

    if (wordCount < 10 || wordCount > 500) {
      setMessage("⚠️ Word count must be between 10 and 500.");
      return;
    }

    try {
      const loremWords = [
        "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
        "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
        "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
        "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
        "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
        "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
        "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
        "deserunt", "mollit", "anim", "id", "est", "laborum"
      ];

      const generateParagraph = () => {
        const paragraphWords = [];
        for (let i = 0; i < wordCount; i++) {
          paragraphWords.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
        }
        return paragraphWords.join(" ");
      };

      const generatedParagraphs = [];
      for (let i = 0; i < paragraphCount; i++) {
        generatedParagraphs.push(generateParagraph());
      }

      const resultText = `# Lorem Ipsum Generator
# Generated on: ${new Date().toISOString()}

# Generation Settings
# Paragraphs: ${paragraphCount}
# Words per Paragraph: ${wordCount}
# Style: Classic Lorem Ipsum
# Quality: High

# Generated Text
${generatedParagraphs.map((para, index) => `${index + 1}. ${para}`).join('\n\n')}

# Text Statistics
# - Paragraphs: ${paragraphCount}
# - Words per Paragraph: ${wordCount}
# - Total Words: ${paragraphCount * wordCount}
# - Characters: ${generatedParagraphs.join('\n\n').length}

# Usage Instructions
# 1. Set paragraph count and words per paragraph
# 2. Click "Generate Lorem Ipsum" to process
# 3. Copy the generated text

# Quality Notes
# - Classic Lorem Ipsum text
# - Professional placeholder content
# - Consistent formatting and structure
# - Optimized for web design`;

      setResult(resultText);
      setMessage("✅ Lorem Ipsum text generated successfully!");
    } catch (error) {
      setMessage("❌ Error generating Lorem Ipsum text.");
    }
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
    setMessage("📋 Generated text copied to clipboard!");
  }

  function reset() {
    setParagraphs("3");
    setWords("50");
    setResult("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Lorem Ipsum Generator"
      subtitle="Generate Lorem Ipsum text online. Free Lorem Ipsum generator with paragraph options and text formatting for web design and content placeholder."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Lorem Ipsum Generator",
          description: "Generate Lorem Ipsum text online.",
          slug: "/lorem-ipsum-generator",
          category: "Utilities/Text",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Lorem Ipsum Generator", slug: "/lorem-ipsum-generator" },
        ])}
      />

      <div className="space-y-4">
        {/* Status Messages */}
        {message && (
          <div className="px-3 py-2 bg-blue-100 border rounded text-blue-800 text-sm">
            {message}
          </div>
        )}

        {/* Paragraph Count */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Paragraphs (1-20)
          </label>
          <input
            type="number"
            min="1"
            max="20"
            value={paragraphs}
            onChange={(e) => setParagraphs(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Words per Paragraph */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Words per Paragraph (10-500)
          </label>
          <input
            type="number"
            min="10"
            max="500"
            value={words}
            onChange={(e) => setWords(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Result Output */}
        {result && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Generated Text
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
            onClick={generateLoremIpsum}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700"
          >
            📝 Generate Lorem Ipsum
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
            disabled={!result.trim()}
            className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* Generator Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">Generator Options</h4>
          <div className="text-sm space-y-1">
            <div>• Paragraphs: 1-20 paragraphs</div>
            <div>• Words: 10-500 words per paragraph</div>
            <div>• Style: Classic Lorem Ipsum</div>
            <div>• Quality: Professional placeholder text</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About Lorem Ipsum Generator</h3>
        <p className="text-gray-700 mb-4">
          Generate Lorem Ipsum placeholder text for web design and content development. This tool helps you 
          create dummy text, useful for design mockups, content placeholders, and development testing.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Generate Lorem Ipsum placeholder text</li>
          <li>Customizable paragraph and word counts</li>
          <li>Professional text formatting</li>
          <li>High-quality placeholder content</li>
          <li>Easy copy to clipboard</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Set the number of paragraphs.</li>
          <li>Set words per paragraph.</li>
          <li>Click <strong>Generate Lorem Ipsum</strong> to process.</li>
          <li>Copy the generated text.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Web design and mockups</li>
          <li>Content placeholder and testing</li>
          <li>Design development and prototyping</li>
          <li>Content management and editing</li>
        </ul>
      </section>
    </ToolSection>
  );
}