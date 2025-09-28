"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function CompoundInterestCalculatorPage() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [frequency, setFrequency] = useState("12"); // Monthly
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");

  function calculateCompoundInterest() {
    if (!principal.trim() || !rate.trim() || !time.trim()) {
      setMessage("⚠️ Please enter all required values.");
      return;
    }

    try {
      const p = parseFloat(principal);
      const r = parseFloat(rate) / 100; // Convert percentage to decimal
      const t = parseFloat(time);
      const n = parseFloat(frequency);

      if (isNaN(p) || isNaN(r) || isNaN(t) || isNaN(n)) {
        setMessage("❌ Please enter valid numbers.");
        return;
      }

      // Compound Interest Formula: A = P(1 + r/n)^(nt)
      const amount = p * Math.pow(1 + r/n, n*t);
      const interest = amount - p;

      const resultText = `# Compound Interest Calculation
# Generated on: ${new Date().toISOString()}

# Input Values
# Principal Amount: $${p.toFixed(2)}
# Annual Interest Rate: ${rate}%
# Time Period: ${t} years
# Compounding Frequency: ${n} times per year

# Calculation Results
# Final Amount: $${amount.toFixed(2)}
# Interest Earned: $${interest.toFixed(2)}
# Total Growth: ${((amount/p - 1) * 100).toFixed(2)}%

# Year-by-Year Breakdown
${Array.from({length: Math.min(t, 10)}, (_, i) => {
  const year = i + 1;
  const yearAmount = p * Math.pow(1 + r/n, n*year);
  const yearInterest = yearAmount - p;
  return `# Year ${year}: $${yearAmount.toFixed(2)} (Interest: $${yearInterest.toFixed(2)})`;
}).join('\n')}

# Financial Insights
# - Your money will grow by $${interest.toFixed(2)} over ${t} years
# - Effective annual rate: ${((Math.pow(1 + r/n, n) - 1) * 100).toFixed(2)}%
# - Monthly contribution needed for $${(amount/12).toFixed(2)}: $${(amount/(12*t)).toFixed(2)}`;

      setResult(resultText);
      setMessage("✅ Compound interest calculation completed successfully!");
    } catch (error) {
      setMessage("❌ Error calculating compound interest.");
    }
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
    setMessage("📋 Calculation result copied to clipboard!");
  }

  function reset() {
    setPrincipal("");
    setRate("");
    setTime("");
    setFrequency("12");
    setResult("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Compound Interest Calculator"
      subtitle="Calculate compound interest and investment growth online. Free compound interest calculator with detailed analysis and projections support."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Compound Interest Calculator",
          description: "Calculate compound interest and investment growth online.",
          slug: "/compound-interest-calculator",
          category: "Utilities/Finance",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Compound Interest Calculator", slug: "/compound-interest-calculator" },
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Principal Amount ($)
            </label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="Enter principal amount..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              step="0.01"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="Enter interest rate..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Period (Years)
            </label>
            <input
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Enter time period..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compounding Frequency
            </label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="1">Annually</option>
              <option value="2">Semi-annually</option>
              <option value="4">Quarterly</option>
              <option value="12">Monthly</option>
              <option value="365">Daily</option>
            </select>
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
            onClick={calculateCompoundInterest}
            disabled={!principal.trim() || !rate.trim() || !time.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🧮 Calculate Interest
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
            disabled={!principal.trim() && !rate.trim() && !time.trim() && !result.trim()}
            className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* Calculator Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">About Compound Interest</h4>
          <div className="text-sm space-y-1">
            <div>• Compound interest grows your money exponentially</div>
            <div>• Interest is calculated on both principal and accumulated interest</div>
            <div>• Higher frequency compounding increases returns</div>
            <div>• Time is the most important factor in compound growth</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About Compound Interest Calculator</h3>
        <p className="text-gray-700 mb-4">
          Calculate compound interest and investment growth. This tool helps you 
          understand how your money can grow over time with compound interest, 
          useful for financial planning and investment decisions.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Calculate compound interest and growth</li>
          <li>Year-by-year breakdown and analysis</li>
          <li>Multiple compounding frequency options</li>
          <li>Financial insights and recommendations</li>
          <li>Easy copy to clipboard</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Enter the principal amount you want to invest.</li>
          <li>Set the annual interest rate you expect to earn.</li>
          <li>Choose the time period for your investment.</li>
          <li>Select how often interest is compounded.</li>
          <li>Click <strong>Calculate Interest</strong> to see the results.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Investment planning and analysis</li>
          <li>Retirement savings calculations</li>
          <li>Financial goal setting</li>
          <li>Educational and awareness purposes</li>
        </ul>
      </section>
    </ToolSection>
  );
}