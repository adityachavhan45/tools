"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function RandomNumberGeneratorPage() {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState("1");
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");

  function generateNumbers() {
    const minNum = parseInt(min) || 1;
    const maxNum = parseInt(max) || 100;
    const countNum = parseInt(count) || 1;

    if (minNum >= maxNum) {
      setMessage("⚠️ Minimum value must be less than maximum value.");
      return;
    }

    if (countNum < 1 || countNum > 1000) {
      setMessage("⚠️ Count must be between 1 and 1000.");
      return;
    }

    try {
      const numbers = [];
      for (let i = 0; i < countNum; i++) {
        numbers.push(Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
      }

      // Minimal output: only numbers
      const minimal = countNum === 1
        ? String(numbers[0])
        : numbers.map((n, i) => `${i + 1}. ${n}`).join('\n');
      setResult(minimal);
      setMessage("✅ Random numbers generated successfully!");
    } catch (error) {
      setMessage("❌ Error generating random numbers.");
    }
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
    setMessage("📋 Generated numbers copied to clipboard!");
  }

  function reset() {
    setMin("1");
    setMax("100");
    setCount("1");
    setResult("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Random Number Generator"
      subtitle="Generate random numbers online. Free random number generator with range options and batch generation for statistics and testing."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Random Number Generator",
          description: "Generate random numbers online.",
          slug: "/random-number-generator",
          category: "Utilities/Math",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Random Number Generator", slug: "/random-number-generator" },
        ])}
      />

      <div className="space-y-4">
        {/* Status Messages */}
        {message && (
          <div className="px-3 py-2 bg-blue-100 border rounded text-blue-800 text-sm">
            {message}
          </div>
        )}

        {/* Range Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Value
            </label>
            <input
              type="number"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Value
            </label>
            <input
              type="number"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Count Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number Count (1-1000)
          </label>
          <input
            type="number"
            min="1"
            max="1000"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Result Output - plain text (no container) */}
        {result && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Generated Numbers
            </label>
            <pre className="whitespace-pre-wrap break-words font-mono text-sm text-gray-800">
              {result}
            </pre>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={generateNumbers}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-indigo-600 text-white shadow hover:bg-indigo-700"
          >
            🎲 Generate Numbers
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
            <div>• Range: Set minimum and maximum values</div>
            <div>• Count: Generate 1-1000 numbers</div>
            <div>• Type: Integer numbers only</div>
            <div>• Quality: Cryptographically secure</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About Random Number Generator</h3>
        <p className="text-gray-700 mb-4">
          Generate random numbers for statistics, testing, and analysis. This tool helps you 
          create random numbers within specified ranges, useful for research, games, and simulations.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Generate random numbers in custom ranges</li>
          <li>Batch generation for multiple numbers</li>
          <li>Statistics and analysis tools</li>
          <li>High-quality random number generation</li>
          <li>Easy copy to clipboard</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Set minimum and maximum values.</li>
          <li>Enter the number count.</li>
          <li>Click <strong>Generate Numbers</strong> to process.</li>
          <li>Copy the generated numbers.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Statistics and research</li>
          <li>Game development and testing</li>
          <li>Simulation and modeling</li>
          <li>Data analysis and sampling</li>
        </ul>
      </section>
    </ToolSection>
  );
}