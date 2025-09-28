"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function TimeZoneConverterPage() {
  const [time, setTime] = useState("");
  const [fromZone, setFromZone] = useState("UTC");
  const [toZone, setToZone] = useState("EST");
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");

  const timeZones = {
    "UTC": 0,
    "EST": -5,
    "EDT": -4,
    "CST": -6,
    "CDT": -5,
    "MST": -7,
    "MDT": -6,
    "PST": -8,
    "PDT": -7,
    "GMT": 0,
    "CET": 1,
    "CEST": 2,
    "EET": 2,
    "EEST": 3,
    "JST": 9,
    "KST": 9,
    "IST": 5.5,
    "AEST": 10,
    "AEDT": 11,
    "NZST": 12,
    "NZDT": 13
  };

  function convertTimeZone() {
    if (!time.trim()) {
      setMessage("⚠️ Please enter time first.");
      return;
    }

    try {
      const timeValue = new Date(`2000-01-01T${time}:00Z`);
      if (isNaN(timeValue.getTime())) {
        setMessage("⚠️ Please enter a valid time format (HH:MM).");
        return;
      }

      const fromOffset = timeZones[fromZone] || 0;
      const toOffset = timeZones[toZone] || 0;
      
      // Convert to UTC first
      const utcTime = new Date(timeValue.getTime() - (fromOffset * 60 * 60 * 1000));
      
      // Convert to target timezone
      const targetTime = new Date(utcTime.getTime() + (toOffset * 60 * 60 * 1000));
      
      const resultTime = targetTime.toTimeString().slice(0, 5);

      const resultText = `# Time Zone Conversion
# Generated on: ${new Date().toISOString()}

# Conversion Settings
# From: ${fromZone} (UTC${fromOffset >= 0 ? '+' : ''}${fromOffset})
# To: ${toZone} (UTC${toOffset >= 0 ? '+' : ''}${toOffset})
# Input: ${time} ${fromZone}
# Quality: High

# Time Information
# - Input: ${time} ${fromZone}
# - Output: ${resultTime} ${toZone}
# - Conversion: ${fromZone} → ${toZone}
# - Quality: High

# Conversion Result
${resultTime} ${toZone}

# Time Zone Information
# - From: ${fromZone} (UTC${fromOffset >= 0 ? '+' : ''}${fromOffset})
# - To: ${toZone} (UTC${toOffset >= 0 ? '+' : ''}${toOffset})
# - Difference: ${toOffset - fromOffset} hours
# - Quality: High

# Usage Instructions
# 1. Enter time in HH:MM format
# 2. Select from and to time zones
# 3. Click "Convert Time Zone" to process
# 4. Copy the converted time

# Quality Notes
# - Accurate time zone conversion
# - Multiple time zone support
# - High-precision calculations
# - Optimized for international use`;

      setResult(resultText);
      setMessage("✅ Time zone converted successfully!");
    } catch (error) {
      setMessage("❌ Error converting time zone.");
    }
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
    setMessage("📋 Conversion result copied to clipboard!");
  }

  function reset() {
    setTime("");
    setFromZone("UTC");
    setToZone("EST");
    setResult("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Time Zone Converter"
      subtitle="Convert time zones online. Free time zone converter with world clock and time zone options for international communication and scheduling."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Time Zone Converter",
          description: "Convert time zones online.",
          slug: "/time-zone-converter",
          category: "Utilities/Time",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Time Zone Converter", slug: "/time-zone-converter" },
        ])}
      />

      <div className="space-y-4">
        {/* Status Messages */}
        {message && (
          <div className="px-3 py-2 bg-blue-100 border rounded text-blue-800 text-sm">
            {message}
          </div>
        )}

        {/* Time Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Time (HH:MM)
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* From Time Zone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From Time Zone
          </label>
          <select
            value={fromZone}
            onChange={(e) => setFromZone(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {Object.keys(timeZones).map(zone => (
              <option key={zone} value={zone}>
                {zone} (UTC{timeZones[zone] >= 0 ? '+' : ''}{timeZones[zone]})
              </option>
            ))}
          </select>
        </div>

        {/* To Time Zone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To Time Zone
          </label>
          <select
            value={toZone}
            onChange={(e) => setToZone(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {Object.keys(timeZones).map(zone => (
              <option key={zone} value={zone}>
                {zone} (UTC{timeZones[zone] >= 0 ? '+' : ''}{timeZones[zone]})
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
            onClick={convertTimeZone}
            disabled={!time.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🌍 Convert Time Zone
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
            disabled={!time.trim() && !result.trim()}
            className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* Time Zone Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">Time Zone Information</h4>
          <div className="text-sm space-y-1">
            <div>• UTC: Coordinated Universal Time</div>
            <div>• EST/EDT: Eastern Time (US)</div>
            <div>• CST/CDT: Central Time (US)</div>
            <div>• MST/MDT: Mountain Time (US)</div>
            <div>• PST/PDT: Pacific Time (US)</div>
            <div>• GMT: Greenwich Mean Time</div>
            <div>• CET/CEST: Central European Time</div>
            <div>• JST: Japan Standard Time</div>
            <div>• IST: India Standard Time</div>
            <div>• AEST/AEDT: Australian Eastern Time</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About Time Zone Conversion</h3>
        <p className="text-gray-700 mb-4">
          Convert time between different time zones for international communication and scheduling. This tool helps you 
          convert time zones, useful for business, travel, and global communication.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Convert between time zones</li>
          <li>Multiple time zone support</li>
          <li>High-precision calculations</li>
          <li>International time zones</li>
          <li>Easy copy to clipboard</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Enter the time in HH:MM format.</li>
          <li>Select from and to time zones.</li>
          <li>Click <strong>Convert Time Zone</strong> to process.</li>
          <li>Copy the converted time.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>International business and communication</li>
          <li>Travel and scheduling</li>
          <li>Global meetings and events</li>
          <li>Time zone coordination</li>
        </ul>
      </section>
    </ToolSection>
  );
}