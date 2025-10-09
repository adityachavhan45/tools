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
            <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm whitespace-pre-wrap min-h-32">
              {result || "Generated text will appear here..."}
            </div>
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
          A Lorem Ipsum generator is a handy tool used by designers, developers, 
          content creators, and students to produce placeholder text quickly. 
          The term &quot;Lorem Ipsum&quot; refers to a scrambled version of a passage from 
          Cicero’s writings, commonly used since the 1500s in printing and typesetting. 
          It provides a realistic distribution of letters and words, giving design layouts 
          a natural appearance without relying on meaningful content.  
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Generate Lorem Ipsum text instantly in your browser</li>
          <li>Choose paragraph count (1–20) and words per paragraph (10–500)</li>
          <li>Consistent structure for design and content testing</li>
          <li>Copy generated text with one click</li>
          <li>No server upload – fully private and secure</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">📖 History of Lorem Ipsum</h4>
        <p className="text-gray-700 mb-4 text-sm">
          The phrase &quot;Lorem Ipsum&quot; originates from a scrambled passage of Cicero’s 
          <em> De Finibus Bonorum et Malorum </em> (The Extremes of Good and Evil), 
          written in 45 BC. Typesetters in the 1500s began using sections of this Latin 
          text as filler because it had a natural letter distribution, unlike repeated 
          phrases such as &quot;Content here, content here.&quot; In the digital era, Lorem Ipsum 
          remains the most popular placeholder text in design software, websites, and 
          templates worldwide.
        </p>

        <h4 className="font-semibold mt-4 mb-1">⚡ Benefits of Using Lorem Ipsum</h4>
        <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
          <li>Avoids distraction – reviewers focus on design, not content.</li>
          <li>Provides natural-looking text flow for better typography testing.</li>
          <li>Speeds up prototyping when final content is not ready.</li>
          <li>Works universally in all languages and design systems.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🚀 Final Thoughts</h4>
        <p className="text-gray-700 text-sm">
          Lorem Ipsum is more than just random Latin—it’s a centuries-old standard 
          that helps designers and developers present clean, professional layouts 
          without waiting for final copy. With this generator, you can create 
          customizable paragraphs of placeholder text instantly, ensuring your 
          projects look polished and client-ready from the start.
        </p>
      </section>
    </ToolSection>
  );
}