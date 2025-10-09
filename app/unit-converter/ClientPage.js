"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function UnitConverterPage() {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("length");
  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("kilometer");
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");

  const units = {
    length: {
      meter: 1,
      kilometer: 1000,
      centimeter: 0.01,
      millimeter: 0.001,
      inch: 0.0254,
      foot: 0.3048,
      yard: 0.9144,
      mile: 1609.34
    },
    weight: {
      kilogram: 1,
      gram: 0.001,
      pound: 0.453592,
      ounce: 0.0283495,
      ton: 1000,
      stone: 6.35029
    },
    volume: {
      liter: 1,
      milliliter: 0.001,
      gallon: 3.78541,
      quart: 0.946353,
      pint: 0.473176,
      cup: 0.236588,
      fluid_ounce: 0.0295735
    },
    area: {
      square_meter: 1,
      square_kilometer: 1000000,
      square_centimeter: 0.0001,
      square_inch: 0.00064516,
      square_foot: 0.092903,
      square_yard: 0.836127,
      acre: 4046.86,
      hectare: 10000
    }
  };

  function convertUnits() {
    if (!value.trim()) {
      setMessage("⚠️ Please enter a value first.");
      return;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setMessage("⚠️ Please enter a valid number.");
      return;
    }

    if (numValue < 0 && category !== "temperature") {
      setMessage("⚠️ Value must be positive for this category.");
      return;
    }

    try {
      const categoryUnits = units[category];
      if (!categoryUnits[fromUnit] || !categoryUnits[toUnit]) {
        setMessage("⚠️ Invalid unit selection.");
        return;
      }

      // Convert to base unit first, then to target unit
      const baseValue = numValue * categoryUnits[fromUnit];
      const convertedValue = baseValue / categoryUnits[toUnit];

      const resultText = `# Unit Conversion
# Generated on: ${new Date().toISOString()}

# Conversion Settings
# Category: ${category.charAt(0).toUpperCase() + category.slice(1)}
# From: ${fromUnit.replace('_', ' ')}
# To: ${toUnit.replace('_', ' ')}
# Input: ${numValue} ${fromUnit.replace('_', ' ')}
# Quality: High

# Conversion Information
# - Input: ${numValue} ${fromUnit.replace('_', ' ')}
# - Output: ${convertedValue.toFixed(6)} ${toUnit.replace('_', ' ')}
# - Category: ${category.charAt(0).toUpperCase() + category.slice(1)}
# - Quality: High

# Conversion Result
${convertedValue.toFixed(6)} ${toUnit.replace('_', ' ')}`;

      setResult(resultText);
      setMessage("✅ Units converted successfully!");
    } catch (error) {
      setMessage("❌ Error converting units.");
    }
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
    setMessage("📋 Conversion result copied to clipboard!");
  }

  function reset() {
    setValue("");
    setCategory("length");
    setFromUnit("meter");
    setToUnit("kilometer");
    setResult("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Unit Converter"
      subtitle="Convert units online. Free unit converter with length, weight, volume, and area options for scientific calculations and measurements."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Unit Converter",
          description: "Convert units online.",
          slug: "/unit-converter",
          category: "Utilities/Conversion",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Unit Converter", slug: "/unit-converter" },
        ])}
      />

      <div className="space-y-4">
        {/* Status Messages */}
        {message && (
          <div className="px-3 py-2 bg-blue-100 border rounded text-blue-800 text-sm">
            {message}
          </div>
        )}

        {/* Value Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Value
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value to convert..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Category Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              const categoryUnits = units[e.target.value];
              const unitNames = Object.keys(categoryUnits);
              setFromUnit(unitNames[0]);
              setToUnit(unitNames[1] || unitNames[0]);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="length">Length</option>
            <option value="weight">Weight</option>
            <option value="volume">Volume</option>
            <option value="area">Area</option>
          </select>
        </div>

        {/* From Unit */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From Unit
          </label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {Object.keys(units[category]).map(unit => (
              <option key={unit} value={unit}>
                {unit.replace('_', ' ').charAt(0).toUpperCase() + unit.replace('_', ' ').slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* To Unit */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To Unit
          </label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {Object.keys(units[category]).map(unit => (
              <option key={unit} value={unit}>
                {unit.replace('_', ' ').charAt(0).toUpperCase() + unit.replace('_', ' ').slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Result Output */}
        {result && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Conversion Result
            </label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm whitespace-pre-wrap min-h-32">
              {result || "Conversion result will appear here..."}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={convertUnits}
            disabled={!value.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            📏 Convert Units
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
            disabled={!value.trim() && !result.trim()}
            className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Expanded Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm prose max-w-none">
        <h3 className="text-lg font-semibold mb-2">About Unit Conversion</h3>
        <p>
          Unit conversion is the process of changing a measurement from one unit into another. 
          It is used in science, engineering, education, cooking, and daily life. With so many 
          systems in use around the world, a unit converter ensures accuracy and saves time. 
          This online unit converter helps you handle conversions across length, weight, volume, 
          and area with high precision.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul>
          <li>Convert instantly between units of length, weight, volume, and area.</li>
          <li>Supports both metric and imperial systems.</li>
          <li>Accurate calculations with scientific precision.</li>
          <li>Easy copy-to-clipboard functionality for results.</li>
          <li>Beginner-friendly interface for students and professionals.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol>
          <li>Enter the numeric value you want to convert.</li>
          <li>Select the category (length, weight, volume, area).</li>
          <li>Choose the input unit and the target unit.</li>
          <li>Click <strong>Convert Units</strong> to view the result.</li>
          <li>Copy the result for your reports or tasks.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul>
          <li><strong>Science & Research:</strong> Lab experiments often need conversion between metric and imperial units.</li>
          <li><strong>Engineering:</strong> Structural and mechanical projects require precise measurements.</li>
          <li><strong>Cooking:</strong> Recipes from around the world often use different systems.</li>
          <li><strong>Travel:</strong> Converting kilometers to miles or liters to gallons while abroad.</li>
          <li><strong>Education:</strong> Students use converters to check their homework or understand real-world problems.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🌍 Metric vs. Imperial Systems</h4>
        <p>
          The metric system (meter, kilogram, liter) is based on powers of 10, making it easier 
          for calculations. The imperial system (mile, pound, gallon) is still commonly used in 
          the United States. A converter bridges the gap so users worldwide can understand 
          measurements quickly.
        </p>

        <h4 className="font-semibold mt-4 mb-1">💡 Example Conversions</h4>
        <ul>
          <li>1 kilometer = 1000 meters</li>
          <li>1 mile = 1609.34 meters</li>
          <li>1 pound = 0.453592 kilograms</li>
          <li>1 gallon = 3.785 liters</li>
          <li>1 acre = 4046.86 square meters</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">📘 Why Unit Conversion Matters</h4>
        <p>
          From international trade to personal fitness goals, unit conversion simplifies life. 
          Whether you are comparing car mileage, converting cooking measurements, or preparing 
          a scientific report, this tool ensures you always have reliable numbers.
        </p>
      </section>
    </ToolSection>
  );
}
