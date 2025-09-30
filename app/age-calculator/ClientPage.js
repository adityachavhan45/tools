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
          An age calculator is a practical online tool that makes it easy to
          determine someone’s exact age using their date of birth. While it may
          sound simple at first glance, this type of tool has immense value in
          everyday life. From filling out government forms to applying for
          competitive exams or even just tracking milestones, knowing one’s
          exact age in years, months, weeks, and days is more important than we
          often realize. This tool eliminates the need for manual calculations
          and delivers quick, reliable results.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Accurate multi-unit output:</strong> Instantly see your age
            expressed in years, months, weeks, and days, rather than just a
            single number.
          </li>
          <li>
            <strong>Custom date range:</strong> You can calculate age not only
            for today but also for any given date, which is useful for planning
            events or understanding timelines.
          </li>
          <li>
            <strong>Error validation:</strong> If you accidentally input an
            invalid date or select a future date, the tool prevents mistakes by
            giving you clear alerts.
          </li>
          <li>
            <strong>One-click copy:</strong> The result can be copied instantly
            and used in documents, forms, or records without retyping.
          </li>
          <li>
            <strong>User-friendly design:</strong> The clean interface ensures
            smooth usage, even for people who are not tech-savvy.
          </li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          <li>Enter your date of birth into the input field.</li>
          <li>
            Optionally, set a custom current date to calculate your age at a
            specific moment in time.
          </li>
          <li>Click on the “Calculate Age” button.</li>
          <li>
            Review the output that shows years, months, weeks, and days lived.
          </li>
          <li>
            Copy the results to your clipboard if you need to paste them
            elsewhere.
          </li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Personal milestones:</strong> Track birthdays,
            anniversaries, and achievements with precision.
          </li>
          <li>
            <strong>Education and exams:</strong> Many competitive exams require
            candidates to be within a certain age bracket, making precise
            calculations essential.
          </li>
          <li>
            <strong>Official documentation:</strong> Government forms, job
            applications, and visa paperwork often demand accurate age details.
          </li>
          <li>
            <strong>Healthcare and fitness:</strong> Doctors and trainers often
            recommend routines based on age, and accurate numbers ensure
            tailored advice.
          </li>
          <li>
            <strong>Parenting and childcare:</strong> Parents can keep track of
            developmental stages in weeks or months for their young children.
          </li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">📖 Why Accuracy Matters</h4>
        <p className="text-gray-700 mb-4">
          Age may look like a rough estimate most of the time, but in reality,
          accuracy is critical. For example, a persons eligibility for
          retirement, pension, or certain benefits often depends on reaching an
          exact age threshold. Even a few days can make a difference in some
          official processes. By providing precise results down to days and
          weeks, this tool ensures that users always have reliable information.
        </p>

        <h4 className="font-semibold mt-4 mb-1">🌍 Everyday Benefits</h4>
        <p className="text-gray-700 mb-4">
          Beyond official use, age calculators are fun for curiosity too. Many
          people enjoy checking how many total days they ve lived or how many
          weeks theyve been on Earth. It can also be motivating for personal
          growth, reminding individuals how far theyve come and how they might
          want to plan their future years. For children, it can serve as a
          learning tool to understand time, calendars, and life stages.
        </p>

        <h4 className="font-semibold mt-4 mb-1">💡 Final Thoughts</h4>
        <p className="text-gray-700">
          An age calculator blends simplicity with utility. It may appear like a
          small tool, but it has applications across education, healthcare,
          personal life, and professional requirements. By making calculations
          effortless, error-free, and quick, it saves users valuable time while
          ensuring precision. Whether youre a student filling out an exam form,
          a parent monitoring your childs growth, or simply someone curious
          about your exact age in days and weeks, this tool is designed to help
          with clarity and ease. The next time you wonder “How old am I today?”
          or “How many days have I lived?”, you wont need pen and paper—this
          calculator will give you the answer instantly.
        </p>
      </section>
    </ToolSection>
  );
}
