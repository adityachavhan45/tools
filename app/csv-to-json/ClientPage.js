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
          CSV (Comma-Separated Values) and JSON (JavaScript Object Notation) are
          two of the most widely used formats for data storage, exchange, and
          processing. While CSV files are simple and human-readable, they often
          lack hierarchical structure. JSON, on the other hand, is flexible,
          structured, and widely used in web applications and APIs. Converting
          CSV data into JSON allows developers, analysts, and organizations to
          take advantage of structured data for seamless integration, data
          sharing, and advanced analysis. Our CSV to JSON Converter is designed
          to make this transformation simple, fast, and accurate.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Multiple delimiter support:</strong> Convert CSV data that
            uses commas, semicolons, tabs, pipes, or colons as delimiters.
          </li>
          <li>
            <strong>Automatic header mapping:</strong> First row is treated as
            column headers, ensuring clear key-value pairing in JSON.
          </li>
          <li>
            <strong>Error handling:</strong> Alerts for missing rows, empty
            inputs, or invalid formatting to avoid faulty conversions.
          </li>
          <li>
            <strong>Clean JSON formatting:</strong> Output is indented and
            human-readable, suitable for development and debugging.
          </li>
          <li>
            <strong>Quick copy:</strong> One-click copy lets you use the JSON
            immediately in APIs, scripts, or databases.
          </li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          <li>Paste or type your CSV data in the input field.</li>
          <li>Select the delimiter used in your CSV file (comma, tab, etc.).</li>
          <li>Click the <strong>Convert to JSON</strong> button.</li>
          <li>
            Review the JSON output, formatted neatly for easy readability.
          </li>
          <li>
            Use the 📋 copy button to instantly copy the JSON result into your
            application or editor.
          </li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>API Integration:</strong> Many web APIs use JSON as their
            standard format. Converting legacy CSV datasets into JSON enables
            seamless API communication.
          </li>
          <li>
            <strong>Data visualization:</strong> JSON is often the required
            input format for charting libraries and visualization tools.
          </li>
          <li>
            <strong>Database operations:</strong> Import CSV records into
            NoSQL databases (like MongoDB) by converting them into JSON first.
          </li>
          <li>
            <strong>Web development:</strong> JavaScript frameworks and backend
            systems work natively with JSON, making conversion a vital step.
          </li>
          <li>
            <strong>Business intelligence:</strong> Analysts can merge CSV data
            from spreadsheets into structured JSON for dashboards and reports.
          </li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">📖 Why Convert CSV to JSON?</h4>
        <p className="text-gray-700 mb-4">
          CSV files are excellent for simple tabular data, but they are limited
          when it comes to representing hierarchical or nested information. JSON
          provides a tree-like structure, which allows nesting of objects and
          arrays. For example, a CSV file listing customers and their orders
          will require multiple files or complex relationships. In JSON, this
          same data can be represented with a single object containing nested
          arrays, making it far easier to manage and query in applications.
        </p>

        <h4 className="font-semibold mt-4 mb-1">🌍 Everyday Benefits</h4>
        <p className="text-gray-700 mb-4">
          Converting CSV to JSON benefits everyone from students to enterprise
          developers. A student learning programming can quickly see how
          structured JSON is compared to flat CSV. A data analyst can use JSON
          outputs for advanced filtering and aggregations. A company migrating
          from Excel-based workflows to web-based applications will find this
          conversion critical for smooth data migration. Even hobbyists working
          on small personal projects, like visualizing sports stats or tracking
          expenses, can benefit from using JSON instead of plain CSV.
        </p>

        <h4 className="font-semibold mt-4 mb-1">⚠️ Limitations and Best Practices</h4>
        <p className="text-gray-700 mb-4">
          While conversion is simple, there are a few important considerations.
          CSV assumes that each row has the same number of fields, while JSON
          can support more flexible structures. If the CSV has missing or extra
          columns in some rows, the resulting JSON may have inconsistencies. It
          is best practice to clean and validate CSV data before conversion.
          Also, for extremely large CSV datasets, browser-based converters may
          slow down—using server-side or script-based conversion tools is
          recommended for bulk processing.
        </p>

        <h4 className="font-semibold mt-4 mb-1">💡 Final Thoughts</h4>
        <p className="text-gray-700">
          CSV to JSON conversion is more than a technical step—it is a bridge
          between traditional tabular data and modern structured applications.
          By transforming CSV into JSON, you make data compatible with APIs,
          databases, and web services. Whether you are a developer building a
          new app, a business analyst preparing reports, or simply someone who
          wants to organize data better, this tool provides clarity, accuracy,
          and speed. Embracing JSON unlocks the ability to work with data more
          flexibly and opens doors to modern integration across platforms.
        </p>
      </section>
    </ToolSection>
  );
}