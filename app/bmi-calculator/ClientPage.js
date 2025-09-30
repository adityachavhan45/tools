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
        <h3 className="text-lg font-semibold mb-2">About BMI Calculator</h3>
        <p className="text-gray-700 mb-4">
          Body Mass Index (BMI) is a simple yet powerful health indicator that
          helps individuals understand whether their body weight falls within a
          healthy range. Calculated using a person’s height and weight, BMI
          provides a quick snapshot of potential health risks associated with
          being underweight, overweight, or obese. While it is not a
          comprehensive measure of health, it serves as a widely accepted
          screening tool used by doctors, fitness experts, and health
          professionals across the world. Our BMI Calculator is designed to make
          this process simple, accurate, and accessible for everyone.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Dual unit system:</strong> Supports both metric (cm, kg) and
            imperial (inches, lbs) units, making it useful for users worldwide.
          </li>
          <li>
            <strong>Instant results:</strong> Enter height and weight, and get
            BMI results within seconds.
          </li>
          <li>
            <strong>Health categories:</strong> Automatically classifies results
            into underweight, normal weight, overweight, and obese categories.
          </li>
          <li>
            <strong>Recommendations:</strong> Provides basic suggestions based
            on BMI category to encourage healthier lifestyle choices.
          </li>
          <li>
            <strong>Clipboard copy:</strong> One-click copy of BMI results for
            quick sharing and record-keeping.
          </li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          <li>Choose your preferred unit system (metric or imperial).</li>
          <li>Enter your height and weight into the fields provided.</li>
          <li>
            Click on the <strong>Calculate BMI</strong> button to generate
            results.
          </li>
          <li>
            Review your BMI value, category, and suggested health
            recommendations.
          </li>
          <li>
            Use the copy button if you want to save or share your results.
          </li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Health assessment:</strong> Quickly determine whether your
            weight is within a healthy range.
          </li>
          <li>
            <strong>Fitness tracking:</strong> Monitor changes in BMI as you
            pursue workout or diet goals.
          </li>
          <li>
            <strong>Medical screening:</strong> Doctors and healthcare providers
            often use BMI as an initial indicator of health risks.
          </li>
          <li>
            <strong>Weight management:</strong> Keep track of your progress if
            you’re aiming to gain, lose, or maintain weight.
          </li>
          <li>
            <strong>Educational purposes:</strong> Useful for students and
            professionals studying nutrition and health sciences.
          </li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">📖 Understanding BMI Categories</h4>
        <p className="text-gray-700 mb-4">
          BMI is divided into categories that reflect general health status:
          underweight, normal, overweight, and obese. For example, a BMI below
          18.5 is considered underweight and may indicate malnutrition or other
          health issues. A BMI between 18.5 and 24.9 is regarded as normal and
          generally indicates balanced weight. A BMI between 25 and 29.9 falls
          under overweight, which may increase the risk of lifestyle-related
          diseases. A BMI of 30 or higher is considered obese and is associated
          with a significantly higher risk of conditions like diabetes, heart
          disease, and joint problems.
        </p>

        <h4 className="font-semibold mt-4 mb-1">🌍 Everyday Benefits</h4>
        <p className="text-gray-700 mb-4">
          Tracking BMI can serve as a motivational tool for personal health and
          fitness. People working on weight-loss or muscle-gain journeys often
          rely on BMI to measure progress. Employers and organizations may also
          use BMI assessments in wellness programs. Even though BMI has its
          limitations, such as not distinguishing between fat and muscle mass,
          it still remains a quick, reliable indicator for large-scale health
          monitoring. For everyday users, it’s a simple way to check whether
          lifestyle changes are moving them in the right direction.
        </p>

        <h4 className="font-semibold mt-4 mb-1">⚠️ Limitations of BMI</h4>
        <p className="text-gray-700 mb-4">
          While BMI is a useful tool, it does not tell the whole story. It does
          not measure body fat directly, nor does it account for muscle mass,
          bone density, or fat distribution. For example, athletes and bodybuilders
          may have a high BMI due to muscle, but they are not necessarily overweight.
          Similarly, two people with the same BMI may have very different health
          profiles. That is why BMI should be used alongside other measures like
          waist-to-hip ratio, body fat percentage, and lifestyle habits.
        </p>

        <h4 className="font-semibold mt-4 mb-1">💡 Final Thoughts</h4>
        <p className="text-gray-700">
          The BMI Calculator is a straightforward, easy-to-use tool that helps
          you keep track of your health by calculating your Body Mass Index
          quickly and accurately. While it should not replace professional
          medical advice, it provides a reliable first step in assessing weight
          categories and associated risks. Whether you are on a personal fitness
          journey, monitoring your family’s health, or simply curious about your
          numbers, this calculator empowers you with knowledge. Understanding
          your BMI can motivate positive lifestyle changes and encourage better
          health management for the future.
        </p>
      </section>

    </ToolSection>
  );
}