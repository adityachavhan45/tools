"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function PercentageCalculatorPage() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [percentage, setPercentage] = useState("");
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");

  function calculatePercentage() {
    if (!value1.trim() || !value2.trim()) {
      setMessage("⚠️ Please enter both values.");
      return;
    }

    try {
      const v1 = parseFloat(value1);
      const v2 = parseFloat(value2);

      if (isNaN(v1) || isNaN(v2)) {
        setMessage("❌ Please enter valid numbers.");
        return;
      }

      const percent = (v1 / v2) * 100;
      const change = v2 - v1;
      const percentChange = (change / v1) * 100;

      const resultText = `# Percentage Calculation
# Generated on: ${new Date().toISOString()}

# Input Values
# Value 1: ${v1}
# Value 2: ${v2}

# Calculation Results
# Percentage: ${percent.toFixed(2)}%
# Change: ${change.toFixed(2)}
# Percent Change: ${percentChange.toFixed(2)}%

# Additional Calculations
# - 10% of ${v1}: ${(v1 * 0.10).toFixed(2)}
# - 25% of ${v1}: ${(v1 * 0.25).toFixed(2)}
# - 50% of ${v1}: ${(v1 * 0.50).toFixed(2)}
# - 75% of ${v1}: ${(v1 * 0.75).toFixed(2)}
# - 100% of ${v1}: ${(v1 * 1.00).toFixed(2)}

# Reverse Calculations
# - ${v1} is ${percent.toFixed(2)}% of ${v2}
# - ${v2} is ${(100 - percent).toFixed(2)}% of ${v1}
# - If ${v1} increases by 10%: ${(v1 * 1.10).toFixed(2)}
# - If ${v1} decreases by 10%: ${(v1 * 0.90).toFixed(2)}`;

      setResult(resultText);
      setMessage("✅ Percentage calculation completed successfully!");
    } catch (error) {
      setMessage("❌ Error calculating percentage.");
    }
  }

  function calculatePercentageOf() {
    if (!value1.trim() || !percentage.trim()) {
      setMessage("⚠️ Please enter both value and percentage.");
      return;
    }

    try {
      const v1 = parseFloat(value1);
      const p = parseFloat(percentage);

      if (isNaN(v1) || isNaN(p)) {
        setMessage("❌ Please enter valid numbers.");
        return;
      }

      const resultValue = (v1 * p) / 100;

      const resultText = `# Percentage Of Calculation
# Generated on: ${new Date().toISOString()}

# Input Values
# Value: ${v1}
# Percentage: ${p}%

# Calculation Results
# ${p}% of ${v1} = ${resultValue.toFixed(2)}

# Additional Calculations
# - 5% of ${v1}: ${(v1 * 0.05).toFixed(2)}
# - 10% of ${v1}: ${(v1 * 0.10).toFixed(2)}
# - 20% of ${v1}: ${(v1 * 0.20).toFixed(2)}
# - 50% of ${v1}: ${(v1 * 0.50).toFixed(2)}
# - 100% of ${v1}: ${(v1 * 1.00).toFixed(2)}`;

      setResult(resultText);
      setMessage("✅ Percentage of calculation completed successfully!");
    } catch (error) {
      setMessage("❌ Error calculating percentage of.");
    }
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
    setMessage("📋 Calculation result copied to clipboard!");
  }

  function reset() {
    setValue1("");
    setValue2("");
    setPercentage("");
    setResult("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Percentage Calculator"
      subtitle="Calculate percentages and percent changes online. Free percentage calculator with multiple calculation types and analysis support."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Percentage Calculator",
          description: "Calculate percentages and percent changes online.",
          slug: "/percentage-calculator",
          category: "Utilities/Math",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Percentage Calculator", slug: "/percentage-calculator" },
        ])}
      />

      <div className="space-y-4">
        {/* Status Messages */}
        {message && (
          <div className="px-3 py-2 bg-blue-100 border rounded text-blue-800 text-sm">
            {message}
          </div>
        )}

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Value 1
            </label>
            <input
              type="number"
              step="0.01"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              placeholder="Enter first value..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Value 2
            </label>
            <input
              type="number"
              step="0.01"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              placeholder="Enter second value..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Percentage (%)
            </label>
            <input
              type="number"
              step="0.01"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              placeholder="Enter percentage..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Result Output */}
        {result && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Calculation Result
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
            onClick={calculatePercentage}
            disabled={!value1.trim() || !value2.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🧮 Calculate Percentage
          </button>

          <button
            onClick={calculatePercentageOf}
            disabled={!value1.trim() || !percentage.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-green-600 text-white shadow 
                       hover:bg-green-700 disabled:opacity-60"
          >
            📊 Calculate Percentage Of
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
            disabled={!value1.trim() && !value2.trim() && !percentage.trim() && !result.trim()}
            className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* Calculator Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">About Percentages</h4>
          <div className="text-sm space-y-1">
            <div>• Percentages represent parts per hundred</div>
            <div>• Useful for comparing values and changes</div>
            <div>• Common in finance, statistics, and analysis</div>
            <div>• Can be calculated in multiple ways</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About Percentage Calculator</h3>
        <p className="text-gray-700 mb-4">
          Calculate percentages and percent changes. This tool helps you perform 
          various percentage calculations, including finding percentages of values, 
          calculating percent changes, and comparing values, useful for analysis and decision-making.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Calculate percentages and percent changes</li>
          <li>Find percentages of values</li>
          <li>Compare values and changes</li>
          <li>Multiple calculation types</li>
          <li>Easy copy to clipboard</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Enter the values you want to calculate.</li>
          <li>Choose the calculation type you need.</li>
          <li>Click the appropriate calculate button.</li>
          <li>Review the results and additional calculations.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Financial analysis and planning</li>
          <li>Statistical analysis and reporting</li>
          <li>Business and marketing metrics</li>
          <li>Educational and learning purposes</li>
        </ul>
      </section>
    </ToolSection>
  );
}