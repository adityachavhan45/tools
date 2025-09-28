"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function TemperatureConverterPage() {
  const [temperature, setTemperature] = useState("");
  const [fromUnit, setFromUnit] = useState("celsius");
  const [toUnit, setToUnit] = useState("fahrenheit");
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");

  function convertTemperature() {
    if (!temperature.trim()) {
      setMessage("⚠️ Please enter temperature first.");
      return;
    }

    const temp = parseFloat(temperature);
    if (isNaN(temp)) {
      setMessage("⚠️ Please enter a valid temperature number.");
      return;
    }

    try {
      let celsius = 0;
      
      // Convert to Celsius first
      switch (fromUnit) {
        case "celsius":
          celsius = temp;
          break;
        case "fahrenheit":
          celsius = (temp - 32) * 5 / 9;
          break;
        case "kelvin":
          celsius = temp - 273.15;
          break;
        case "rankine":
          celsius = (temp - 491.67) * 5 / 9;
          break;
        case "reaumur":
          celsius = temp * 5 / 4;
          break;
        default:
          celsius = temp;
      }

      // Convert from Celsius to target unit
      let converted = 0;
      switch (toUnit) {
        case "celsius":
          converted = celsius;
          break;
        case "fahrenheit":
          converted = (celsius * 9 / 5) + 32;
          break;
        case "kelvin":
          converted = celsius + 273.15;
          break;
        case "rankine":
          converted = (celsius * 9 / 5) + 491.67;
          break;
        case "reaumur":
          converted = celsius * 4 / 5;
          break;
        default:
          converted = celsius;
      }

      const resultText = `# Temperature Conversion
# Generated on: ${new Date().toISOString()}

# Conversion Settings
# From: ${fromUnit.charAt(0).toUpperCase() + fromUnit.slice(1)}
# To: ${toUnit.charAt(0).toUpperCase() + toUnit.slice(1)}
# Input: ${temp}° ${fromUnit.charAt(0).toUpperCase() + fromUnit.slice(1)}
# Quality: High

# Temperature Information
# - Input: ${temp}° ${fromUnit.charAt(0).toUpperCase() + fromUnit.slice(1)}
# - Output: ${converted.toFixed(2)}° ${toUnit.charAt(0).toUpperCase() + toUnit.slice(1)}
# - Conversion: ${fromUnit} → ${toUnit}
# - Quality: High

# Conversion Result
${converted.toFixed(2)}° ${toUnit.charAt(0).toUpperCase() + toUnit.slice(1)}

# Temperature Scale
# - Celsius: Water freezes at 0°C, boils at 100°C
# - Fahrenheit: Water freezes at 32°F, boils at 212°F
# - Kelvin: Absolute zero at 0K, no negative values
# - Rankine: Absolute zero at 0°R, no negative values
# - Réaumur: Water freezes at 0°Ré, boils at 80°Ré

# Usage Instructions
# 1. Enter temperature value
# 2. Select from and to units
# 3. Click "Convert Temperature" to process
# 4. Copy the converted result

# Quality Notes
# - Accurate temperature conversion
# - Multiple temperature scales
# - High-precision calculations
# - Optimized for scientific use`;

      setResult(resultText);
      setMessage("✅ Temperature converted successfully!");
    } catch (error) {
      setMessage("❌ Error converting temperature.");
    }
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
    setMessage("📋 Conversion result copied to clipboard!");
  }

  function reset() {
    setTemperature("");
    setFromUnit("celsius");
    setToUnit("fahrenheit");
    setResult("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Temperature Converter"
      subtitle="Convert temperature online. Free temperature converter with Celsius, Fahrenheit, and Kelvin options for scientific calculations and weather."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Temperature Converter",
          description: "Convert temperature online.",
          slug: "/temperature-converter",
          category: "Utilities/Conversion",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Temperature Converter", slug: "/temperature-converter" },
        ])}
      />

      <div className="space-y-4">
        {/* Status Messages */}
        {message && (
          <div className="px-3 py-2 bg-blue-100 border rounded text-blue-800 text-sm">
            {message}
          </div>
        )}

        {/* Temperature Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Temperature
          </label>
          <input
            type="number"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            placeholder="Enter temperature value..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
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
            <option value="celsius">Celsius (°C)</option>
            <option value="fahrenheit">Fahrenheit (°F)</option>
            <option value="kelvin">Kelvin (K)</option>
            <option value="rankine">Rankine (°R)</option>
            <option value="reaumur">Réaumur (°Ré)</option>
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
            <option value="celsius">Celsius (°C)</option>
            <option value="fahrenheit">Fahrenheit (°F)</option>
            <option value="kelvin">Kelvin (K)</option>
            <option value="rankine">Rankine (°R)</option>
            <option value="reaumur">Réaumur (°Ré)</option>
          </select>
        </div>

        {/* Result Output */}
        {result && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Conversion Result
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
            onClick={convertTemperature}
            disabled={!temperature.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🌡️ Convert Temperature
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
            disabled={!temperature.trim() && !result.trim()}
            className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* Conversion Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">Temperature Scales</h4>
          <div className="text-sm space-y-1">
            <div>• Celsius: Water freezes at 0°C, boils at 100°C</div>
            <div>• Fahrenheit: Water freezes at 32°F, boils at 212°F</div>
            <div>• Kelvin: Absolute zero at 0K, no negative values</div>
            <div>• Rankine: Absolute zero at 0°R, no negative values</div>
            <div>• Réaumur: Water freezes at 0°Ré, boils at 80°Ré</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About Temperature Conversion</h3>
        <p className="text-gray-700 mb-4">
          Convert temperature between different scales for scientific calculations and weather. This tool helps you 
          convert temperature values, useful for science, weather, cooking, and everyday calculations.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Convert between temperature scales</li>
          <li>Multiple temperature units</li>
          <li>High-precision calculations</li>
          <li>Scientific accuracy</li>
          <li>Easy copy to clipboard</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Enter the temperature value.</li>
          <li>Select from and to units.</li>
          <li>Click <strong>Convert Temperature</strong> to process.</li>
          <li>Copy the converted result.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Scientific calculations and research</li>
          <li>Weather and climate data</li>
          <li>Cooking and food preparation</li>
          <li>Engineering and technical work</li>
        </ul>
      </section>
    </ToolSection>
  );
}