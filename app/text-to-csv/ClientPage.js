"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function TextToCsvPage() {
  const [text, setText] = useState("");
  const [csv, setCsv] = useState("");
  const [message, setMessage] = useState("");

  function convertTextToCsv() {
    if (!text.trim()) {
      setMessage("⚠️ Please enter text to convert to CSV code.");
      return;
    }

    try {
      // Create a simple CSV structure from the text
      const lines = text.split('\n');
      const csvContent = lines.map((line, index) =>
        `"${line.replace(/"/g, '""')}"`
      ).join('\n');

      const csvString = `# Text to CSV Conversion
# Generated on: ${new Date().toISOString()}

"Line Number","Content","Character Count","Word Count"
${lines.map((line, index) =>
        `"${index + 1}","${line.replace(/"/g, '""')}","${line.length}","${line.split(/\s+/).filter(word => word.length > 0).length}"`
      ).join('\n')}

# Statistics
"Total Lines","${lines.length}"
"Total Characters","${text.length}"
"Total Words","${text.split(/\s+/).filter(word => word.length > 0).length}"
"Average Line Length","${Math.round(text.length / lines.length)}"
"Longest Line","${Math.max(...lines.map(line => line.length))}"
"Shortest Line","${Math.min(...lines.map(line => line.length))}"`;

      setCsv(csvString);
      setMessage("✅ Text converted to CSV code successfully!");
    } catch (error) {
      setMessage("❌ Error converting text to CSV code.");
    }
  }

  function convertCsvToText() {
    if (!csv.trim()) {
      setMessage("⚠️ Please enter CSV code to convert to text.");
      return;
    }

    try {
      // Simple CSV to text conversion
      let extractedText = csv;

      // Extract text from CSV fields
      const csvMatches = extractedText.match(/"([^"\\]*(\\.[^"\\]*)*)"/g);
      if (csvMatches) {
        const textLines = csvMatches.map(match => {
          const content = match.slice(1, -1); // Remove quotes
          return content.replace(/""/g, '"').replace(/\\n/g, '\n');
        });
        extractedText = textLines.join('\n');
      } else {
        // If no CSV fields, try to extract from comments and docstrings
        extractedText = extractedText.replace(/#.*$/gm, '');
        extractedText = extractedText.replace(/^\s*[a-zA-Z_][a-zA-Z0-9_]*\s*:/gm, '');
        extractedText = extractedText.replace(/^\s*-\s*/gm, '');
        extractedText = extractedText.replace(/\s+/g, ' ').trim();
      }

      setText(extractedText);
      setMessage("✅ CSV code converted to text successfully!");
    } catch (error) {
      setMessage("❌ Error converting CSV code to text. Please check your CSV format.");
    }
  }

  function copyText() {
    navigator.clipboard.writeText(text);
    setMessage("📋 Text copied to clipboard!");
  }

  function copyCsv() {
    navigator.clipboard.writeText(csv);
    setMessage("📋 CSV code copied to clipboard!");
  }

  function reset() {
    setText("");
    setCsv("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Text to CSV Converter"
      subtitle="Convert text to CSV code and CSV to text online. Free text to CSV converter with formatting and validation support."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Text to CSV Converter",
          description: "Convert text to CSV code and CSV to text online.",
          slug: "/text-to-csv",
          category: "Utilities/Text",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Text to CSV Converter", slug: "/text-to-csv" },
        ])}
      />

      <div className="space-y-4">
        {/* Status Messages */}
        {message && (
          <div className="px-3 py-2 bg-blue-100 border rounded text-blue-800 text-sm">
            {message}
          </div>
        )}

        {/* Text Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Text
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to convert to CSV code..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* CSV Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter CSV Code
          </label>
          <textarea
            value={csv}
            onChange={(e) => setCsv(e.target.value)}
            placeholder="Enter CSV code to convert to text..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter valid CSV code
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={convertTextToCsv}
            disabled={!text.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🔤 Text to CSV
          </button>

          <button
            onClick={convertCsvToText}
            disabled={!csv.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-green-600 text-white shadow 
                       hover:bg-green-700 disabled:opacity-60"
          >
            📡 CSV to Text
          </button>

          {text && (
            <button
              onClick={copyText}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                         bg-blue-600 text-white shadow 
                         hover:bg-blue-700"
            >
              📋 Copy Text
            </button>
          )}

          {csv && (
            <button
              onClick={copyCsv}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                         bg-purple-600 text-white shadow 
                         hover:bg-purple-700"
            >
              📋 Copy CSV
            </button>
          )}

          <button
            onClick={reset}
            disabled={!text.trim() && !csv.trim()}
            className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* Character Analysis */}
        {text && (
          <div className="border rounded-lg p-4 bg-gray-50">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Character Analysis</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-medium">Total Characters:</div>
                <div>{text.length}</div>
              </div>
              <div>
                <div className="font-medium">Words:</div>
                <div>{text.split(/\s+/).filter(word => word.length > 0).length}</div>
              </div>
              <div>
                <div className="font-medium">Lines:</div>
                <div>{text.split('\n').length}</div>
              </div>
            </div>
          </div>
        )}

        {/* CSV Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">About CSV</h4>
          <div className="text-sm space-y-1">
            <div>• CSV is a comma-separated values file format</div>
            <div>• Used for data exchange and spreadsheet import/export</div>
            <div>• Supports tabular data with headers</div>
            <div>• Commonly used with Excel, Google Sheets, and databases</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About Text to CSV Converter</h3>
        <p className="text-gray-700 mb-4">
          A Text to CSV Converter is a practical tool that helps you transform plain
          text into structured CSV format and decode CSV files back into readable text.
          CSV (Comma-Separated Values) is one of the most widely used formats for
          storing and exchanging tabular data. From business reporting to database
          exports, CSV is everywhere. With this converter, you can quickly generate
          CSV code from notes, lists, or raw text, and also extract plain text from
          any CSV snippet—all inside your browser without installing extra software.
        </p>

        <p className="text-gray-700 mb-4">
          The beauty of CSV lies in its simplicity. Each row represents a record,
          and columns are separated by commas (or sometimes semicolons/tabs).
          Applications like Microsoft Excel, Google Sheets, LibreOffice Calc, and
          most programming languages natively support CSV. This makes CSV an
          industry standard for data exchange. For example, when you download
          contacts from Gmail or export analytics from a tool, chances are it comes
          as a CSV file. This converter makes it easy to go back and forth between
          text and CSV without worrying about formatting errors.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Instant conversion of text into CSV format</li>
          <li>CSV to text decoding with error handling</li>
          <li>Character and word count analysis</li>
          <li>Supports multiline and bulk conversion</li>
          <li>Validation for quotes and special characters</li>
          <li>Offline, secure, and free to use</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Enter or paste plain text in the input box.</li>
          <li>Click <strong>Text to CSV</strong> to generate structured CSV code.</li>
          <li>Copy the result with the copy button and paste it into Excel, Sheets, or any database.</li>
          <li>To decode, paste a CSV snippet in the CSV field and click <strong>CSV to Text</strong>.</li>
          <li>Review the character analysis panel for quick stats like line count and word count.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Common Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>Data Analysis:</strong> Quickly convert notes or logs into CSV for Excel analysis.</li>
          <li><strong>Business Reporting:</strong> Generate CSV files that can be imported into dashboards.</li>
          <li><strong>Database Export/Import:</strong> Prepare CSVs for MySQL, PostgreSQL, or SQLite databases.</li>
          <li><strong>Spreadsheet Management:</strong> Convert text-based lists into ready-to-use tables.</li>
          <li><strong>APIs & Web Development:</strong> Sometimes APIs return raw text—convert it into CSV format for structured processing.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">📊 Why CSV Matters</h4>
        <p className="text-gray-700 mb-4">
          CSV is lightweight, human-readable, and universally compatible. Unlike
          binary formats such as XLSX, CSV can be opened in any text editor,
          shared via email, or processed by scripts with minimal resources.
          Developers love CSV because it is easy to parse in almost every
          programming language—whether you are working with Python’s pandas,
          JavaScript’s PapaParse, or Excel macros. This simplicity is why CSV has
          survived for decades as the default data exchange format.
        </p>

        <p className="text-gray-700 mb-4">
          However, CSV also comes with challenges: handling special characters,
          managing quotes, and ensuring correct delimiters. That’s where a reliable
          Text to CSV Converter becomes essential. This tool ensures that your data
          is clean, properly escaped, and ready for use in any application.
        </p>

        <h4 className="font-semibold mt-4 mb-1">🙋 Frequently Asked Questions</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>What is CSV used for?</strong> CSV is mainly used for storing and sharing structured data like spreadsheets, reports, and database exports.</li>
          <li><strong>Is CSV the same as Excel?</strong> No. CSV is a plain text format, while Excel files (.xlsx) are binary with more features like formulas and charts.</li>
          <li><strong>Can I open CSV without Excel?</strong> Yes. You can open CSV files in any text editor, Google Sheets, or even directly in a web browser.</li>
          <li><strong>What happens if my text contains commas?</strong> The converter automatically adds quotes around such values to keep the format valid.</li>
          <li><strong>Is CSV secure?</strong> Since it’s plain text, CSV doesn’t contain macros or scripts, making it safer than some other file formats.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🚀 Final Thoughts</h4>
        <p className="text-gray-700">
          The Text to CSV Converter is an essential tool for students,
          professionals, and developers alike. Whether you are preparing data
          for analysis, creating reports, or simply organizing text into tables,
          this converter saves time and ensures accuracy. By combining ease of
          use with reliability, it empowers you to handle CSV files like a pro.
          Try converting a sample text today and see how instantly it transforms
          into structured data ready for Excel, Sheets, or databases.
        </p>
      </section>
    </ToolSection>
  );
}