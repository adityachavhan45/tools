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
          A random number generator is a simple yet powerful tool that produces numbers
          without any predictable pattern. In everyday life, randomness is essential
          in areas like research, gaming, cryptography, simulations, and statistical
          analysis. This free online random number generator lets you instantly generate
          numbers within a custom range, whether you need a single value or a batch of
          up to 1000 numbers. All calculations run locally in your browser, which makes
          the process private, secure, and lightning fast.
        </p>

        <p className="text-gray-700 mb-4">
          The tool is particularly helpful when you want to avoid bias. Human beings
          are terrible at choosing random numbers manually—our brains naturally lean
          towards patterns. That’s why computers, using reliable mathematical formulas
          and algorithms, are far more efficient in generating randomness. Whether you
          are a teacher creating quiz questions, a gamer developing dice mechanics, a
          researcher sampling survey data, or even a developer stress testing your app,
          this generator ensures you always have access to fair, unpredictable numbers.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Generate numbers in any range — from small integers to large datasets</li>
          <li>Batch generation: create up to 1000 random numbers at once</li>
          <li>Lightweight and fast — runs directly in your browser</li>
          <li>Completely private — no server uploads or storage</li>
          <li>Copy results with a single click</li>
          <li>Ideal for statistics, simulations, and fun activities</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Enter the minimum and maximum values you want.</li>
          <li>Choose how many random numbers to generate (between 1 and 1000).</li>
          <li>Click <strong>Generate Numbers</strong> to instantly see the results.</li>
          <li>Copy your generated numbers using the <strong>Copy Result</strong> button.</li>
          <li>Reset anytime to start fresh with new values.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Practical Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>Statistics & Research:</strong> Generate unbiased random samples for surveys, experiments, or academic studies.</li>
          <li><strong>Education:</strong> Teachers can use it to pick students randomly, assign topics, or create math exercises.</li>
          <li><strong>Gaming:</strong> Developers can simulate dice rolls, card shuffles, or lottery draws.</li>
          <li><strong>Simulations:</strong> Model real-world scenarios like population studies, queue simulations, or probability experiments.</li>
          <li><strong>Everyday Life:</strong> Decide who pays the bill, assign chores, or simply have fun with friends.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">💡 Why Randomness Matters</h4>
        <p className="text-gray-700 mb-4">
          Randomness is the foundation of fairness. Without randomness, outcomes can
          become predictable, biased, or even manipulated. In digital security, for
          example, strong cryptographic systems rely on truly random values to protect
          sensitive data. In gaming, randomness ensures fairness between players.
          In scientific research, it helps remove bias and produce reliable, unbiased
          results. Having an accessible random number generator means anyone can tap
          into this fundamental principle, whether for serious projects or casual fun.
        </p>

        <h4 className="font-semibold mt-4 mb-1">🙋 Frequently Asked Questions</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>Is this generator truly random?</strong> It uses JavaScript’s <code>Math.random()</code>, which is pseudo-random but reliable for most practical uses. For critical cryptographic tasks, specialized secure libraries are recommended.</li>
          <li><strong>Can I generate decimals?</strong> Currently, this tool focuses on whole numbers. You can, however, adjust the code to include decimals.</li>
          <li><strong>How many numbers can I generate at once?</strong> Up to 1000 numbers in a single batch.</li>
          <li><strong>Is it free?</strong> Yes, 100% free and always available without signup.</li>
          <li><strong>Are my results saved?</strong> No, everything happens locally. Your data stays on your device.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🚀 Final Thoughts</h4>
        <p className="text-gray-700">
          Random numbers may look simple, but they play a massive role in our
          technology-driven world. From cryptography to classroom activities, they
          enable fairness, unpredictability, and unbiased outcomes. With this Random
          Number Generator tool, you get the convenience of generating numbers anytime,
          anywhere — without installing apps or sharing your data. It’s lightweight,
          secure, and built for everyone, whether you’re a professional researcher,
          a student, or just someone looking for a fair way to make decisions. Try it
          now and experience the power of randomness in your browser.
        </p>
      </section>
    </ToolSection>
  );
}