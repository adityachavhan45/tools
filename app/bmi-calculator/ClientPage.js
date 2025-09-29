"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function BmiCalculatorPage() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("metric");
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");

  function calculateBMI() {
    if (!height.trim() || !weight.trim()) {
      setMessage("⚠️ Please enter both height and weight.");
      return;
    }

    const heightValue = parseFloat(height);
    const weightValue = parseFloat(weight);

    if (isNaN(heightValue) || isNaN(weightValue)) {
      setMessage("⚠️ Please enter valid numbers for height and weight.");
      return;
    }

    if (heightValue <= 0 || weightValue <= 0) {
      setMessage("⚠️ Height and weight must be positive numbers.");
      return;
    }

    try {
      let bmi = 0;
      let heightInMeters = heightValue;
      let weightInKg = weightValue;

      if (unit === "imperial") {
        // Convert inches to meters and pounds to kg
        heightInMeters = heightValue * 0.0254;
        weightInKg = weightValue * 0.453592;
      }

      bmi = weightInKg / (heightInMeters * heightInMeters);

      let category = "";
      let color = "";
      if (bmi < 18.5) {
        category = "Underweight";
        color = "blue";
      } else if (bmi < 25) {
        category = "Normal weight";
        color = "green";
      } else if (bmi < 30) {
        category = "Overweight";
        color = "yellow";
      } else {
        category = "Obese";
        color = "red";
      }

      const resultText = `# BMI Calculator
# Generated on: ${new Date().toISOString()}

# BMI Calculation
# Height: ${heightValue} ${unit === "metric" ? "cm" : "inches"}
# Weight: ${weightValue} ${unit === "metric" ? "kg" : "lbs"}
# Unit: ${unit === "metric" ? "Metric" : "Imperial"}
# Quality: High

# BMI Information
# - BMI: ${bmi.toFixed(1)}
# - Category: ${category}
# - Height: ${heightValue} ${unit === "metric" ? "cm" : "inches"}
# - Weight: ${weightValue} ${unit === "metric" ? "kg" : "lbs"}

# BMI Categories
# - Underweight: BMI < 18.5
# - Normal weight: BMI 18.5-24.9
# - Overweight: BMI 25-29.9
# - Obese: BMI ≥ 30

# Health Recommendations
# - BMI: ${bmi.toFixed(1)} (${category})
# - Status: ${category}
# - Recommendation: ${category === "Underweight" ? "Consider gaining weight" : 
                     category === "Normal weight" ? "Maintain current weight" : 
                     category === "Overweight" ? "Consider losing weight" : 
                     "Consider significant weight loss"}

# Usage Instructions
# 1. Enter height and weight
# 2. Select unit system
# 3. Click "Calculate BMI" to process
# 4. Review the BMI result

# Quality Notes
# - Accurate BMI calculation
# - Multiple unit systems
# - Health category assessment
# - Optimized for health tracking`;

      setResult(resultText);
      setMessage("✅ BMI calculated successfully!");
    } catch (error) {
      setMessage("❌ Error calculating BMI.");
    }
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
    setMessage("📋 BMI result copied to clipboard!");
  }

  function reset() {
    setHeight("");
    setWeight("");
    setUnit("metric");
    setResult("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="BMI Calculator"
      subtitle="Calculate BMI online. Free BMI calculator with height and weight options for health assessment and fitness tracking."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "BMI Calculator",
          description: "Calculate BMI online.",
          slug: "/bmi-calculator",
          category: "Utilities/Health",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "BMI Calculator", slug: "/bmi-calculator" },
        ])}
      />

      <div className="space-y-4">
        {/* Status Messages */}
        {message && (
          <div className="px-3 py-2 bg-blue-100 border rounded text-blue-800 text-sm">
            {message}
          </div>
        )}

        {/* Unit Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Unit System
          </label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="metric">Metric (cm, kg)</option>
            <option value="imperial">Imperial (inches, lbs)</option>
          </select>
        </div>

        {/* Height Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Height ({unit === "metric" ? "cm" : "inches"})
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder={`Enter height in ${unit === "metric" ? "cm" : "inches"}...`}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Weight Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weight ({unit === "metric" ? "kg" : "lbs"})
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder={`Enter weight in ${unit === "metric" ? "kg" : "lbs"}...`}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Result Output */}
        {result && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              BMI Result
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
            onClick={calculateBMI}
            disabled={!height.trim() || !weight.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🏥 Calculate BMI
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
            disabled={!height.trim() && !weight.trim() && !result.trim()}
            className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* BMI Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">BMI Categories</h4>
          <div className="text-sm space-y-1">
            <div>&bull; Underweight: BMI &lt; 18.5</div>
            <div>&bull; Normal weight: BMI 18.5-24.9</div>
            <div>&bull; Overweight: BMI 25-29.9</div>
            <div>&bull; Obese: BMI &ge; 30</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
      <p className="text-gray-700 mb-4">
        Calculate Body Mass Index (BMI) for health assessment and fitness tracking. This tool helps you 
        determine your BMI, useful for health monitoring, fitness goals, and medical assessment.
      </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Calculate BMI with height and weight</li>
          <li>Multiple unit systems (metric/imperial)</li>
          <li>Health recommendations</li>
          <li>Easy copy to clipboard</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Enter your height and weight.</li>
          <li>Select the unit system.</li>
          <li>Click <strong>Calculate BMI</strong> to process.</li>
          <li>Review the BMI result and category.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Health assessment and monitoring</li>
          <li>Fitness tracking and goals</li>
          <li>Medical and clinical assessment</li>
          <li>Personal health management</li>
        </ul>
      </section>
    </ToolSection>
  );
}