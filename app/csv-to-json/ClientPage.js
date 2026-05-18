"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

function parseCSVLine(line, delim) {
  const out = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (inQuotes) {
      current += c;
    } else if (c === delim) {
      out.push(current.trim());
      current = "";
    } else {
      current += c;
    }
  }
  out.push(current.trim());
  return out;
}

export default function CsvToJsonPage() {
  const [csv, setCsv] = useState("");
  const [delimiter, setDelimiter] = useState(",");
  const [message, setMessage] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const [rowCount, setRowCount] = useState(0);
  const [hasResult, setHasResult] = useState(false);

  function convertToJson() {
    if (!csv.trim()) {
      setMessage("Please enter or paste CSV data first.");
      return;
    }
    try {
      const lines = csv.trim().split(/\r?\n/).filter((l) => l.length > 0);
      if (lines.length < 2) {
        setMessage("CSV must have at least a header row and one data row.");
        return;
      }
      const headers = parseCSVLine(lines[0], delimiter);
      if (headers.length === 0 || headers.every((h) => !h)) {
        setMessage("Header row must contain at least one column name.");
        return;
      }
      const jsonData = [];
      for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i], delimiter);
        const row = {};
        headers.forEach((header, index) => {
          const key = header || `column_${index + 1}`;
          row[key] = values[index] !== undefined ? values[index] : "";
        });
        jsonData.push(row);
      }
      const formatted = JSON.stringify(jsonData, null, 2);
      setJsonOutput(formatted);
      setRowCount(jsonData.length);
      setHasResult(true);
      setMessage("");
    } catch {
      setMessage("Conversion failed. Check that your CSV has a header row and consistent columns. For commas inside cells, wrap the cell in double quotes.");
    }
  }

  function copyResult() {
    if (!jsonOutput) return;
    navigator.clipboard.writeText(jsonOutput);
    setMessage("JSON copied to clipboard.");
  }

  function reset() {
    setCsv("");
    setDelimiter(",");
    setJsonOutput("");
    setMessage("");
    setRowCount(0);
    setHasResult(false);
  }

  return (
    <ToolSection
      title="CSV to JSON"
      subtitle="Convert CSV data to JSON online. Paste your CSV, choose the delimiter, and get a JSON array of objects. For APIs, apps, and data workflows. All processing in your browser."
      plain
      whiteBackground
      hideSidebar
      centerHeader
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "CSV to JSON",
          description: "Convert CSV text to JSON array of objects online with configurable delimiter.",
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

      <div className="space-y-6">
        {message && (
          <div
            role="alert"
            className="px-4 py-3 text-sm rounded-xl border border-amber-300 bg-amber-50 text-amber-800 text-justify"
          >
            {message}
          </div>
        )}

        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 sm:p-6 space-y-5">
          <h2 className="text-lg font-semibold text-gray-900">CSV input</h2>
          <div>
            <label htmlFor="csv-input" className="block text-sm font-medium text-gray-700 mb-1.5">
              Paste or type CSV data
            </label>
            <textarea
              id="csv-input"
              value={csv}
              onChange={(e) => setCsv(e.target.value)}
              placeholder={'name,age,city\nAlice,30,NYC\nBob,25,LA'}
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white font-mono text-sm resize-y"
            />
            <p className="mt-1 text-xs text-gray-500">First row = headers. Use double quotes for cells that contain the delimiter.</p>
          </div>
          <div>
            <label htmlFor="delimiter" className="block text-sm font-medium text-gray-700 mb-1.5">Delimiter</label>
            <select
              id="delimiter"
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value)}
              className="w-full sm:max-w-xs px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            >
              <option value=",">Comma (,)</option>
              <option value=";">Semicolon (;)</option>
              <option value="\t">Tab</option>
              <option value="|">Pipe (|)</option>
              <option value=":">Colon (:)</option>
            </select>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={convertToJson}
              disabled={!csv.trim()}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-medium shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none transition-colors"
            >
              Convert to JSON
            </button>
            <button
              type="button"
              onClick={reset}
              className="px-5 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          <div className="md:col-span-3 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-5">
            <p className="font-semibold text-blue-900 mb-2">Format</p>
            <p className="text-blue-800 text-sm text-justify">
              First row = column headers (keys in JSON). Each following row = one object. Choose the delimiter that matches your CSV (comma, semicolon, tab, etc.).
            </p>
          </div>
          <div className="md:col-span-2 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5">
            <p className="font-semibold text-amber-900 mb-2">Tip</p>
            <p className="text-amber-800 text-sm text-justify">
              If a cell contains the delimiter (e.g. a comma), wrap the whole cell in double quotes, e.g. &quot;Smith, John&quot;.
            </p>
          </div>
        </div>

        {hasResult && jsonOutput && (
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="px-5 py-4 bg-indigo-600 text-white flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold">JSON output</h3>
                <p className="text-indigo-100 text-sm mt-0.5">{rowCount} row{rowCount !== 1 ? "s" : ""}</p>
              </div>
              <button
                type="button"
                onClick={copyResult}
                className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white text-sm font-medium transition-colors"
              >
                Copy JSON
              </button>
            </div>
            <div className="p-5 overflow-x-auto">
              <pre className="text-sm font-mono text-gray-800 bg-gray-50 p-4 rounded-xl border border-gray-200 overflow-x-auto max-h-[400px] overflow-y-auto">
                {jsonOutput}
              </pre>
            </div>
          </div>
        )}

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">How it works</h4>
          <ul className="text-sm text-gray-700 space-y-1 text-justify">
            <li><strong>Header row:</strong> First line becomes the keys for each JSON object.</li>
            <li><strong>Data rows:</strong> Each following line becomes one object; values are paired with header keys.</li>
            <li><strong>Delimiter:</strong> The character that separates columns (comma for standard CSV, semicolon in some regions, tab for TSV).</li>
            <li><strong>Quoted cells:</strong> Cells containing the delimiter should be wrapped in double quotes.</li>
          </ul>
        </div>
      </div>

    <section
  className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm text-justify"
  aria-labelledby="about-csv-heading"
>

  <h2
    id="about-csv-heading"
    className="text-2xl font-bold text-gray-900 mb-4"
  >
    About the CSV to JSON Converter
  </h2>

  <p className="text-gray-700 leading-relaxed mb-4">
    The CSV to JSON Converter helps users transform spreadsheet-style CSV data into
    structured JSON format instantly. CSV files are widely used for storing rows and
    columns of information, while JSON is commonly used in APIs, databases, frontend
    applications, and modern web development.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Developers, analysts, students, business teams, and data engineers frequently convert
    CSV data into JSON while working with APIs, dashboards, databases, automation systems,
    and JavaScript applications. Instead of manually rewriting spreadsheet data into JSON
    objects, this tool automates the conversion process within seconds.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    The converter supports multiple delimiters such as commas, semicolons, tabs, pipes,
    and colons, making it useful for different regional and software export formats.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Developers formatting and validating structured output often combine this tool with the{" "}
    <a
      href="/json-formatter"
      className="text-blue-600 underline font-medium"
    >
      JSON Formatter
    </a>{" "}
    to improve readability and verify generated JSON before using it inside applications.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    What CSV Actually Means
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    CSV stands for Comma-Separated Values. It is one of the simplest and most widely used
    file formats for storing tabular data. Each line usually represents a row, while
    commas or other delimiters separate individual columns.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Spreadsheet applications such as Excel and Google Sheets commonly export data into CSV
    format because it is lightweight, readable, and supported across many systems.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    However, CSV files are limited because they mainly represent flat table structures.
    They are not ideal for nested objects or complex application data structures.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    What JSON Means
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    JSON stands for JavaScript Object Notation. It is a structured data format based on
    key-value pairs and arrays. JSON is commonly used for APIs, configuration files,
    frontend applications, databases, and cloud-based systems.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Unlike CSV, JSON can represent nested objects, arrays, booleans, numbers, and more
    advanced structures. This flexibility makes JSON the preferred data exchange format
    for modern applications and web services.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Developers working with APIs and backend systems frequently inspect structured
    responses using the{" "}
    
      JSON Validator
   {" "}
    to identify syntax issues and ensure valid formatting.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Why Convert CSV to JSON
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Many business tools and spreadsheets export data as CSV, but modern applications often
    require JSON for integration. Converting CSV to JSON allows developers and analysts to
    move spreadsheet data directly into APIs, JavaScript applications, databases, and
    automation workflows.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    For example, a company may export customer records, product catalogs, employee lists,
    or analytics reports as CSV files and later convert them into JSON for backend
    processing or dashboard integration.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Developers handling frontend data structures often combine converted JSON with the{" "}
    <a
      href="/text-to-json"
      className="text-blue-600 underline font-medium"
    >
      Text to JSON Converter
    </a>{" "}
    while preparing mock data or API-ready objects for development environments.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Delimiters and Regional Formats
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    CSV files are not always separated by commas. Different regions and software systems
    use different delimiters depending on language and formatting standards.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    In some European countries, semicolons are commonly used because commas may already
    represent decimal values. Technical exports and database systems sometimes use tabs,
    pipes, or colons instead of commas.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    This converter allows users to select the correct delimiter so the tool can properly
    separate columns and generate accurate JSON objects.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    CSV and API Integration
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    APIs frequently accept JSON because it is easy for applications to parse and process.
    Converting CSV into JSON helps developers quickly upload spreadsheet data into cloud
    services, databases, dashboards, or backend systems.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Frontend applications built with frameworks like React, Vue, and Angular commonly use
    JSON objects for rendering dynamic content and managing application state.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Developers testing API payloads and encoded parameters also rely on the{" "}
    <a
      href="/url-encoder"
      className="text-blue-600 underline font-medium"
    >
      URL Encoder
    </a>{" "}
    while working with query strings and data transmission.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Data Validation and Cleanup
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Proper data formatting is important before converting CSV into JSON. Inconsistent
    rows, broken quotes, missing columns, or invalid delimiters may generate incorrect
    output.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    It is recommended to use clean header rows and consistent column structures before
    conversion. Spreadsheet exports from trusted tools usually work correctly, but manual
    edits may introduce formatting errors.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Analysts cleaning exported data sometimes compare modified datasets using the{" "}
    <a
      href="/text-diff-checker"
      className="text-blue-600 underline font-medium"
    >
      Text Difference Checker
    </a>{" "}
    to identify missing rows, formatting changes, or structural differences.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    CSV to JSON in Databases
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Many NoSQL databases such as MongoDB store data using JSON-like document structures.
    Converting CSV exports into JSON allows developers to import spreadsheet data more
    easily into document databases and cloud systems.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    JSON also simplifies programmatic processing because developers can directly loop
    through arrays and objects using programming languages like JavaScript, Python, and
    Node.js.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Backend developers often clean and optimize structured output alongside tools like the{" "}
    <a
      href="/html-formatter"
      className="text-blue-600 underline font-medium"
    >
      HTML Formatter
    </a>{" "}
    and the{" "}
    <a
      href="/regex-tester"
      className="text-blue-600 underline font-medium"
    >
      Regex Tester
    </a>{" "}
    while preparing dynamic applications and validation systems.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Why Browser-Based Conversion Tools Save Time
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Manual conversion from CSV to JSON becomes difficult when working with large datasets.
    Online conversion tools simplify the process by automatically generating structured
    output without requiring scripts or additional software.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Browser-based tools improve accessibility because users can quickly transform data from
    desktops, laptops, or mobile devices without installation.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Teams sharing structured reports and downloadable data files also organize exported
    documents using the{" "}
    <a
      href="/pdf-merge"
      className="text-blue-600 underline font-medium"
    >
      PDF Merge Tool
    </a>{" "}
    before distribution.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Privacy and Local Processing
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Privacy matters while working with exported business data and structured records. This
    CSV to JSON Converter performs processing directly inside the browser without requiring
    account creation or unnecessary uploads.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Developers and analysts managing cloud accounts and online systems also improve account
    protection using the{" "}
    <a
      href="/password-generator"
      className="text-blue-600 underline font-medium"
    >
      Password Generator
    </a>{" "}
    and verify stronger credentials through the{" "}
    <a
      href="/password-strength-checker"
      className="text-blue-600 underline font-medium"
    >
      Password Strength Checker
    </a>{" "}
    before storing sensitive data online.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Final Thoughts
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    The CSV to JSON Converter provides a fast and reliable way to transform spreadsheet
    data into structured JSON format for APIs, applications, databases, and development
    workflows.
  </p>

  <p className="text-gray-700 leading-relaxed">
    Instead of manually rewriting rows into JSON objects, users can instantly convert CSV
    exports into structured data while improving productivity and reducing formatting
    errors. Understanding both CSV and JSON formats also helps developers and analysts work
    more effectively with modern data systems and web technologies.
  </p>

</section>
    </ToolSection>
  );
}
