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
      if (v2 === 0) {
        setMessage("❌ Cannot divide by zero.");
        return;
      }

      const percent = (v1 / v2) * 100;
      const change = v2 - v1;
      const percentChange = v1 !== 0 ? (change / v1) * 100 : 0;

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
# - ${v2} is ${((v2 / v1) * 100).toFixed(2)}% of ${v1}
# - If ${v1} increases by 10%: ${(v1 * 1.10).toFixed(2)}
# - If ${v1} decreases by 10%: ${(v1 * 0.90).toFixed(2)}`;

      setResult(resultText);
      setMessage("✅ Percentage calculation completed successfully!");
    } catch {
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
    } catch {
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
            disabled={
              !value1.trim() &&
              !value2.trim() &&
              !percentage.trim() &&
              !result.trim()
            }
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
          A percentage calculator is one of the simplest yet most powerful tools used
          in everyday life, education, finance, and business. Whether you are a
          student calculating your exam scores, a shopper figuring out discounts, a
          business owner analyzing profit margins, or simply someone comparing data
          sets, percentages make numbers easier to understand. Instead of saying “out
          of 200 marks I got 150,” you can instantly say “I scored 75%.” That simple
          clarity is what makes percentages universally popular.
        </p>

        <p className="text-gray-700 mb-4">
          Our online percentage calculator helps you quickly perform several
          operations: finding what percent one number is of another, calculating
          percent increase or decrease, working out discounts, and checking reverse
          percentages. All of this happens directly in your browser, without the need
          for manual formulas or complex math. You just type your numbers, click a
          button, and the tool generates detailed results instantly.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Why Percentages Matter</h4>
        <p className="text-gray-700 mb-4">
          Percentages are not just about school math problems. They are essential in
          financial markets, government statistics, medical reports, and even sports
          analytics. When companies announce quarterly growth, it is expressed in
          percent terms. When banks advertise interest rates, that too is a
          percentage. When your doctor explains body fat or sugar levels, again it is
          a percentage. Without percentages, comparing values across different scales
          would be confusing and almost meaningless.
        </p>

        <h4 className="font-semibold mt-4 mb-1">🔧 How This Calculator Works</h4>
        <p className="text-gray-700 mb-4">
          The calculator uses simple arithmetic formulas but wraps them in an
          easy-to-use interface. For example:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>To find “What percent is A of B?” it uses (A ÷ B) × 100.</li>
          <li>To calculate percent change, it compares the difference between
            two values relative to the original.</li>
          <li>To compute “X% of Y,” it multiplies Y by (X ÷ 100).</li>
          <li>Reverse calculations help you see how one value relates to another in
            percentage form.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">📦 Practical Use Cases</h4>
        <p className="text-gray-700 mb-4">
          Let’s go beyond theory and see how you might actually use this tool:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>Shopping Discounts:</strong> Imagine a ₹2000 product is on a
            25% sale. Entering 25% of 2000 quickly shows that the discount is
            ₹500, and the final price is ₹1500.</li>
          <li><strong>Exam Scores:</strong> If a student scores 420 out of 500,
            the calculator instantly shows it is 84%.</li>
          <li><strong>Salary Hike:</strong> If your salary increased from ₹40,000 to
            ₹46,000, the tool calculates a 15% increment.</li>
          <li><strong>Business Profit:</strong> When revenue grows from ₹1,00,000 to
            ₹1,25,000, the calculator confirms a 25% growth.</li>
          <li><strong>Fitness & Health:</strong> Body fat percentage, BMI targets, or
            sugar levels can be better understood in percent format.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">📊 Benefits of Using This Tool</h4>
        <p className="text-gray-700 mb-4">
          Instead of manually applying formulas, this calculator saves time and avoids
          mistakes. Students can double-check their homework, accountants can speed up
          reporting, marketers can instantly compute growth metrics, and everyday
          users can manage budgets better. Everything runs locally in your browser,
          which means no data is uploaded — completely private and secure.
        </p>

        <h4 className="font-semibold mt-4 mb-1">🙋 Frequently Asked Questions</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>Is this calculator accurate?</strong> Yes, it uses the same
            formulas taught in schools and used in business reports.</li>
          <li><strong>Can I use decimals?</strong> Absolutely. You can enter
            fractional values like 12.5% or 99.75.</li>
          <li><strong>Does it work offline?</strong> Yes, once loaded in your
            browser, it continues to work without internet.</li>
          <li><strong>Is my data safe?</strong> 100%. All calculations happen on
            your device only.</li>
          <li><strong>Can I copy results?</strong> Yes, with one click you can copy
            the full analysis and paste it anywhere.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🚀 Final Thoughts</h4>
        <p className="text-gray-700">
          Percentages simplify complex comparisons into clear numbers. They are
          universal, intuitive, and essential for decision-making in daily life as
          well as in professional fields. With this percentage calculator, you can
          quickly analyze, compare, and interpret values without errors. From exam
          results to market growth, from shopping discounts to fitness goals — this
          one tool can handle it all. Save time, reduce mistakes, and get instant
          clarity with just a few clicks.
        </p>
      </section>
    </ToolSection>
  );
}
