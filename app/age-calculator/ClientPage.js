"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function AgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");

  function calculateAge() {
    if (!birthDate.trim()) {
      setMessage("⚠️ Please enter birth date first.");
      return;
    }

    try {
      const birth = new Date(birthDate);
      const current = currentDate ? new Date(currentDate) : new Date();
      
      if (isNaN(birth.getTime())) {
        setMessage("⚠️ Please enter a valid birth date.");
        return;
      }

      if (isNaN(current.getTime())) {
        setMessage("⚠️ Please enter a valid current date.");
        return;
      }

      if (birth > current) {
        setMessage("⚠️ Birth date cannot be in the future.");
        return;
      }

      const ageInMs = current - birth;
      const ageInDays = Math.floor(ageInMs / (1000 * 60 * 60 * 24));
      const ageInYears = Math.floor(ageInDays / 365.25);
      const ageInMonths = Math.floor(ageInDays / 30.44);
      const ageInWeeks = Math.floor(ageInDays / 7);

      const resultText = `# Age Calculator
# Generated on: ${new Date().toISOString()}

# Age Calculation
# Birth Date: ${birthDate}
# Current Date: ${currentDate || "Today"}
# Quality: High
# Accuracy: High

# Age Information
# - Age in Years: ${ageInYears} years
# - Age in Months: ${ageInMonths} months
# - Age in Weeks: ${ageInWeeks} weeks
# - Age in Days: ${ageInDays} days

# Age Breakdown
# - Years: ${ageInYears}
# - Months: ${ageInMonths}
# - Weeks: ${ageInWeeks}
# - Days: ${ageInDays}

# Date Information
# - Birth Date: ${birthDate}
# - Current Date: ${currentDate || "Today"}
# - Total Days: ${ageInDays}
# - Quality: High

# Usage Instructions
# 1. Enter birth date
# 2. Enter current date (optional)
# 3. Click "Calculate Age" to process
# 4. Review the age result

# Quality Notes
# - Accurate age calculation
# - Multiple time units
# - High-precision calculations
# - Optimized for date tracking`;

      setResult(resultText);
      setMessage("✅ Age calculated successfully!");
    } catch (error) {
      setMessage("❌ Error calculating age.");
    }
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
    setMessage("📋 Age result copied to clipboard!");
  }

  function reset() {
    setBirthDate("");
    setCurrentDate("");
    setResult("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Age Calculator"
      subtitle="Calculate age online. Free age calculator with birth date options for age calculation and date tracking."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Age Calculator",
          description: "Calculate age online.",
          slug: "/age-calculator",
          category: "Utilities/Date",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Age Calculator", slug: "/age-calculator" },
        ])}
      />

      <div className="space-y-4">
        {/* Status Messages */}
        {message && (
          <div className="px-3 py-2 bg-blue-100 border rounded text-blue-800 text-sm">
            {message}
          </div>
        )}

        {/* Birth Date Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Birth Date
          </label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Current Date Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Date (Optional)
          </label>
          <input
            type="date"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <p className="text-xs text-gray-500 mt-1">Leave empty to use today&#39;s date</p>
        </div>

        {/* Result Output */}
        {result && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age Result
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
            onClick={calculateAge}
            disabled={!birthDate.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🎂 Calculate Age
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
            disabled={!birthDate.trim() && !currentDate.trim() && !result.trim()}
            className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* Age Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">Age Calculation</h4>
          <div className="text-sm space-y-1">
            <div>• Years: Complete years lived</div>
            <div>• Months: Total months lived</div>
            <div>• Weeks: Total weeks lived</div>
            <div>• Days: Total days lived</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About Age Calculator</h3>
        <p className="text-gray-700 mb-4">
          Calculate age from birth date for personal tracking and date management. This tool helps you 
          determine your age, useful for personal records, milestone tracking, and date calculations.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Calculate age from birth date</li>
          <li>Multiple time units (years, months, weeks, days)</li>
          <li>High-precision calculations</li>
          <li>Date validation and error handling</li>
          <li>Easy copy to clipboard</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Enter your birth date.</li>
          <li>Enter current date (optional).</li>
          <li>Click <strong>Calculate Age</strong> to process.</li>
          <li>Review the age result.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Personal age tracking</li>
          <li>Milestone and birthday calculations</li>
          <li>Date and time management</li>
          <li>Personal records and documentation</li>
        </ul>
      </section>
    </ToolSection>
  );
}