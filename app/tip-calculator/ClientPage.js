"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function TipCalculatorPage() {
  const [billAmount, setBillAmount] = useState("");
  const [tipPercentage, setTipPercentage] = useState("15");
  const [numberOfPeople, setNumberOfPeople] = useState("1");
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");

  function calculateTip() {
    if (!billAmount.trim()) {
      setMessage("⚠️ Please enter the bill amount.");
      return;
    }

    try {
      const bill = parseFloat(billAmount);
      const tip = parseFloat(tipPercentage);
      const people = parseFloat(numberOfPeople);

      if (isNaN(bill) || isNaN(tip) || isNaN(people)) {
        setMessage("❌ Please enter valid numbers.");
        return;
      }

      const tipAmount = (bill * tip) / 100;
      const totalAmount = bill + tipAmount;
      const amountPerPerson = totalAmount / people;

      const resultText = `# Tip Calculation
# Generated on: ${new Date().toISOString()}

# Input Values
# Bill Amount: $${bill.toFixed(2)}
# Tip Percentage: ${tip}%
# Number of People: ${people}

# Calculation Results
# Tip Amount: $${tipAmount.toFixed(2)}
# Total Amount: $${totalAmount.toFixed(2)}
# Amount per Person: $${amountPerPerson.toFixed(2)}

# Tip Breakdown
# - 10% tip: $${(bill * 0.10).toFixed(2)}
# - 15% tip: $${(bill * 0.15).toFixed(2)}
# - 18% tip: $${(bill * 0.18).toFixed(2)}
# - 20% tip: $${(bill * 0.20).toFixed(2)}
# - 25% tip: $${(bill * 0.25).toFixed(2)}

# Bill Splitting
# - 2 people: $${(totalAmount / 2).toFixed(2)} each
# - 3 people: $${(totalAmount / 3).toFixed(2)} each
# - 4 people: $${(totalAmount / 4).toFixed(2)} each
# - 5 people: $${(totalAmount / 5).toFixed(2)} each`;

      setResult(resultText);
      setMessage("✅ Tip calculation completed successfully!");
    } catch (error) {
      setMessage("❌ Error calculating tip.");
    }
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
    setMessage("📋 Calculation result copied to clipboard!");
  }

  function reset() {
    setBillAmount("");
    setTipPercentage("15");
    setNumberOfPeople("1");
    setResult("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Tip Calculator"
      subtitle="Calculate tips and gratuity online. Free tip calculator with percentage options and bill splitting support."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Tip Calculator",
          description: "Calculate tips and gratuity online.",
          slug: "/tip-calculator",
          category: "Utilities/Finance",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Tip Calculator", slug: "/tip-calculator" },
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
              Bill Amount ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              placeholder="Enter bill amount..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tip Percentage (%)
            </label>
            <select
              value={tipPercentage}
              onChange={(e) => setTipPercentage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="10">10%</option>
              <option value="15">15%</option>
              <option value="18">18%</option>
              <option value="20">20%</option>
              <option value="25">25%</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of People
            </label>
            <input
              type="number"
              min="1"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(e.target.value)}
              placeholder="Enter number of people..."
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
            onClick={calculateTip}
            disabled={!billAmount.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🧮 Calculate Tip
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
            disabled={!billAmount.trim() && !result.trim()}
            className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* Calculator Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">About Tipping</h4>
          <div className="text-sm space-y-1">
            <div>• 15-20% is standard for good service</div>
            <div>• 18% is common for parties of 6 or more</div>
            <div>• Consider service quality when tipping</div>
            <div>• Some restaurants include gratuity automatically</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About Tip Calculator</h3>
        <p className="text-gray-700 mb-4">
          Calculate tips and gratuity for restaurant bills. This tool helps you 
          determine appropriate tip amounts and split bills among multiple people, 
          useful for dining out and service payments.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Calculate tip amounts and percentages</li>
          <li>Split bills among multiple people</li>
          <li>Multiple tip percentage options</li>
          <li>Bill splitting and sharing calculations</li>
          <li>Easy copy to clipboard</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Enter the total bill amount.</li>
          <li>Select the tip percentage you want to give.</li>
          <li>Choose the number of people to split the bill.</li>
          <li>Click <strong>Calculate Tip</strong> to see the results.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Restaurant dining and service</li>
          <li>Bill splitting and sharing</li>
          <li>Service industry payments</li>
          <li>Financial planning and budgeting</li>
        </ul>
      </section>
    </ToolSection>
  );
}