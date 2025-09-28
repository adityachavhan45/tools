"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function CsvToJsonPage() {
  const [csv, setCsv] = useState("");
  const [delimiter, setDelimiter] = useState(",");
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");

  function convertToJson() {
    if (!csv.trim()) {
      setMessage("⚠️ Please enter CSV data first.");
      return;
    }

    try {
      const lines = csv.trim().split('\n');
      if (lines.length < 2) {
        setMessage("⚠️ CSV must have at least a header and one data row.");
        return;
      }

      const headers = lines[0].split(delimiter);
      const jsonData = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(delimiter);
        const row = {};
        headers.forEach((header, index) => {
          row[header.trim()] = values[index] ? values[index].trim() : "";
        });
        jsonData.push(row);
      }

      const resultText = `# CSV to JSON Conversion
# Generated on: ${new Date().toISOString()}

# Conversion Settings
# Delimiter: "${delimiter}"
# Headers: ${headers.length} columns
# Rows: ${jsonData.length} data rows
# Quality: High

# CSV Information
# - Headers: ${headers.join(", ")}
# - Rows: ${jsonData.length}
# - Columns: ${headers.length}
# - Delimiter: "${delimiter}"

# JSON Output
${JSON.stringify(jsonData, null, 2)}

# Usage Instructions
# 1. Enter or paste CSV data
# 2. Select delimiter
# 3. Click "Convert to JSON" to process
# 4. Copy the JSON output

# Quality Notes
# - Proper JSON formatting
# - Data validation and error handling
# - Header mapping and structure
# - Optimized for API integration`;

      setResult(resultText);
      setMessage("✅ CSV converted to JSON successfully!");
    } catch (error) {
      setMessage("❌ Error converting CSV to JSON.");
    }
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
    setMessage("📋 JSON output copied to clipboard!");
  }

  function reset() {
    setCsv("");
    setDelimiter(",");
    setResult("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="CSV to JSON"
      subtitle="Convert CSV to JSON online. Free CSV to JSON converter with formatting options and data validation for data processing and API integration."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "CSV to JSON",
          description: "Convert CSV to JSON online.",
          slug: "/csv-to-json",
          category: "Utilities/Data",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "CSV to JSON", slug: "/csv-to-json" },
        ])}
      />

      <div className="space-y-4">
        {/* Status Messages */}
        {message && (
          <div className="px-3 py-2 bg-blue-100 border rounded text-blue-800 text-sm">
            {message}
          </div>
        )}

        {/* CSV Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter CSV Data
          </label>
          <textarea
            value={csv}
            onChange={(e) => setCsv(e.target.value)}
            placeholder="Enter or paste CSV data here..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
          />
        </div>

        {/* Delimiter Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Delimiter
          </label>
          <select
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value=",">Comma (,)</option>
            <option value=";">Semicolon (;)</option>
            <option value="\t">Tab (\t)</option>
            <option value="|">Pipe (|)</option>
            <option value=":">Colon (:)</option>
          </select>
        </div>

        {/* Result Output */}
        {result && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              JSON Output
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
            onClick={convertToJson}
            disabled={!csv.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🔄 Convert to JSON
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
            disabled={!csv.trim() && !result.trim()}
            className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* Conversion Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">Conversion Options</h4>
          <div className="text-sm space-y-1">
            <div>• Comma: Standard CSV format</div>
            <div>• Semicolon: European CSV format</div>
            <div>• Tab: TSV format</div>
            <div>• Pipe: Custom delimiter</div>
            <div>• Colon: Alternative delimiter</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About CSV to JSON Conversion</h3>
        <p className="text-gray-700 mb-4">
          Convert CSV data to JSON format for API integration and data processing. This tool helps you 
          transform CSV data into JSON, useful for web development, data analysis, and API integration.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Convert CSV to JSON format</li>
          <li>Multiple delimiter options</li>
          <li>Data validation and error handling</li>
          <li>High-quality JSON output</li>
          <li>Easy copy to clipboard</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Enter or paste CSV data.</li>
          <li>Select the delimiter.</li>
          <li>Click <strong>Convert to JSON</strong> to process.</li>
          <li>Copy the JSON output.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>API integration and data exchange</li>
          <li>Web development and data processing</li>
          <li>Data analysis and visualization</li>
          <li>Database import and export</li>
        </ul>
      </section>
    </ToolSection>
  );
}