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
            <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm whitespace-pre-wrap min-h-32">
              {result || "Conversion result will appear here..."}
            </div>
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
          A temperature converter is one of the most useful everyday scientific
          tools. Temperature is a fundamental physical quantity that tells us how
          hot or cold something is. But across the world, different units are used
          to measure temperature — Celsius is common in most countries, Fahrenheit
          is used in the United States, Kelvin is essential in science, Rankine is
          used in some engineering fields, and Réaumur has historical importance.
          This free tool makes it easy to convert between all major temperature
          scales instantly and with high precision.
        </p>

        <p className="text-gray-700 mb-4">
          Whether you are a student solving physics problems, a scientist working
          with laboratory data, a traveler reading weather forecasts in another
          country, or even a cook following recipes, temperature conversion is
          something that comes up surprisingly often. Instead of remembering
          complex formulas like (°F − 32) × 5/9 or K − 273.15, you can simply
          enter your value, choose the units, and get an accurate result in
          milliseconds.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Convert between Celsius, Fahrenheit, Kelvin, Rankine, and Réaumur</li>
          <li>High-precision calculations for scientific use</li>
          <li>Instant results directly in your browser</li>
          <li>Copy-to-clipboard option for quick sharing</li>
          <li>Works on desktop and mobile without installation</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Enter the temperature value you want to convert.</li>
          <li>Select the <strong>From</strong> unit (Celsius, Fahrenheit, Kelvin, etc.).</li>
          <li>Select the <strong>To</strong> unit.</li>
          <li>Click <strong>Convert Temperature</strong> and view the result instantly.</li>
          <li>Copy the result with one click for reports or sharing.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Common Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>Scientific Research:</strong> Convert lab measurements between Celsius and Kelvin.</li>
          <li><strong>Weather Forecasts:</strong> Understand temperatures in foreign countries (°C ↔ °F).</li>
          <li><strong>Cooking:</strong> Convert oven settings or recipe temperatures between units.</li>
          <li><strong>Engineering:</strong> Use Rankine for thermodynamics and mechanical work.</li>
          <li><strong>Education:</strong> Help students practice conversions without memorizing formulas.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🌡️ Temperature Scales Explained</h4>
        <p className="text-gray-700 mb-2">
          <strong>Celsius (°C):</strong> Based on water’s freezing (0°C) and boiling
          point (100°C) at standard pressure. Used worldwide in daily life and
          science.
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Fahrenheit (°F):</strong> Used mainly in the United States.
          Water freezes at 32°F and boils at 212°F.
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Kelvin (K):</strong> The SI unit of temperature. Starts from
          absolute zero (0K), the lowest possible temperature. No negative values.
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Rankine (°R):</strong> Similar to Kelvin but measured in
          Fahrenheit increments. Often used in engineering fields in the US.
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Réaumur (°Ré):</strong> Historical scale where water freezes at
          0°Ré and boils at 80°Ré. Rarely used today but important for history of
          science.
        </p>

        <h4 className="font-semibold mt-4 mb-1">💡 Why Use an Online Converter?</h4>
        <p className="text-gray-700 mb-4">
          Manual conversion requires remembering formulas and doing arithmetic.
          Mistakes are easy, especially in scientific or engineering contexts where
          precision is critical. With an online converter, you get error-free
          results instantly. It saves time, improves accuracy, and works across all
          modern browsers without installing extra software.
        </p>

        <h4 className="font-semibold mt-4 mb-1">🙋 Frequently Asked Questions</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>Can this tool handle decimals?</strong> Yes, you can enter both integers and decimal values.</li>
          <li><strong>Is Kelvin ever negative?</strong> No, Kelvin starts from absolute zero (0K) and has no negative values.</li>
          <li><strong>What is absolute zero?</strong> It’s the theoretical lowest temperature possible: −273.15°C or 0K.</li>
          <li><strong>Do I need internet?</strong> No, once the page loads, the tool works even offline in your browser.</li>
          <li><strong>Is this free?</strong> Yes, completely free and unlimited to use.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🚀 Final Thoughts</h4>
        <p className="text-gray-700">
          Temperature conversion is more than a classroom exercise — it is a daily
          necessity in science, engineering, cooking, weather forecasting, and
          travel. This free online tool simplifies the process by offering instant,
          accurate conversions between all major scales. Whether you’re calculating
          for experiments, adjusting oven settings, or checking today’s weather,
          this converter ensures you always have the right numbers. Fast, reliable,
          and easy to use — try it today and make temperature conversion effortless.
        </p>
      </section>
    </ToolSection>
  );
}