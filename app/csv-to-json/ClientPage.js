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

  const sidebar = (
    <div className="space-y-4 text-sm text-gray-700 text-justify">
      <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
        <p className="font-semibold text-blue-900 mb-2">Format</p>
        <p className="text-blue-800 text-justify">
          First row = column headers (keys in JSON). Each following row = one object. Choose the delimiter that matches your CSV (comma, semicolon, tab, etc.).
        </p>
      </div>
      <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
        <p className="font-semibold text-amber-900 mb-2">Tip</p>
        <p className="text-amber-800 text-justify">
          If a cell contains the delimiter (e.g. a comma), wrap the whole cell in double quotes, e.g. &quot;Smith, John&quot;.
        </p>
      </div>
    </div>
  );

  return (
    <ToolSection
      title="CSV to JSON"
      subtitle="Convert CSV data to JSON online. Paste your CSV, choose the delimiter, and get a JSON array of objects. For APIs, apps, and data workflows. All processing in your browser."
      plain
      plainSidebar
      whiteBackground
      sidebar={sidebar}
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

      <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm text-justify" aria-labelledby="about-csv-heading">
        <h2 id="about-csv-heading" className="text-xl font-semibold text-gray-900 mb-4">About the CSV to JSON Converter</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          This free CSV to JSON Converter turns comma-separated (or other delimited) text into a JSON array of objects. You paste your CSV, choose the column separator (comma, semicolon, tab, pipe, or colon), and the tool uses the first row as keys and each following row as one object. The result is valid JSON that you can copy into APIs, configs, or code. Processing runs in your browser; no data is sent to a server. Useful for developers, analysts, and anyone moving data from spreadsheets into structured formats.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">How to use</h3>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
          <li>Paste or type your CSV into the input box. The first line must be the header (column names).</li>
          <li>Select the <strong>delimiter</strong> that matches your data (comma for most CSV, semicolon for some European exports, tab for TSV).</li>
          <li>Click <strong>Convert to JSON</strong>. The output appears as a formatted JSON array.</li>
          <li>Use <strong>Copy JSON</strong> to copy the result into your project or editor.</li>
        </ol>

        <h2 id="csv-json-guide" className="text-xl font-semibold text-gray-900 mt-10 mb-4">CSV, JSON, and Data Conversion: A Complete Guide</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          CSV (Comma-Separated Values) and JSON (JavaScript Object Notation) are two of the most common formats for storing and moving data. CSV is flat and table-like: each line is a row, and columns are separated by a character (usually a comma). JSON is hierarchical and key-value based, which fits how many applications and APIs represent data. Converting CSV to JSON is a standard step when you need to feed spreadsheet or export data into web apps, APIs, or databases that expect JSON. This section explains both formats and when and how to use a converter.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">What is CSV?</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          CSV is a plain-text format where each line represents a row and columns are separated by a delimiter. The delimiter is often a comma, but semicolons and tabs are common too, especially when the data itself contains commas. The first row is frequently used as a header listing column names. CSV is easy to create in Excel, Google Sheets, or any text editor, and it is widely used for exports, backups, and data exchange. Its simplicity is a strength, but it has no standard way to represent nested or repeated structures, and handling special characters or newlines inside a cell requires conventions like quoting. Most CSV parsers (including this tool) support double-quoted cells so that delimiters and line breaks inside quotes are treated as part of the value.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">What is JSON?</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          JSON is a text format for representing data as objects and arrays. An object is a set of key-value pairs enclosed in curly braces; an array is an ordered list of values in square brackets. Values can be strings, numbers, booleans, null, or nested objects and arrays. JSON is the default format for many web APIs and configuration files, and it is natively supported in JavaScript and most programming languages. When you convert CSV to JSON, each CSV row typically becomes one object, with the header row providing the keys. The result is an array of such objects, which is easy to iterate over in code or send in an API request. JSON is more flexible than CSV for nested or repeated data, but for simple tables, a CSV-to-JSON conversion gives you the best of both: easy editing in a spreadsheet and structured consumption in an app.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Why convert CSV to JSON?</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          Many systems expect JSON: REST APIs often send and receive JSON; document databases like MongoDB store JSON-like documents; and front-end frameworks work with JavaScript objects. If your data starts in a spreadsheet or a CSV export, converting it to JSON is a direct way to make it usable in those contexts. For example, you might have a CSV of products, users, or locations that you want to load into a web app or use as mock data for development. Converting to JSON once (or on demand with a tool like this) avoids manual rewriting and reduces errors. Analysts and developers also use the conversion to move data from reporting tools into dashboards or scripts that consume JSON.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Delimiters and regional formats</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          CSV is not fully standardised: the delimiter varies by region and software. In North America and many English-speaking countries, the comma is standard. In parts of Europe, the decimal separator is a comma, so CSV files often use a semicolon to separate columns to avoid confusion. Tab-separated values (TSV) use a tab character and are common in data pipelines and some exports. Pipes and colons are used in custom or legacy formats. This converter lets you choose the delimiter so you can correctly parse your file. If the output looks wrong (e.g. everything in one column or keys merged), try another delimiter. The first row should always be the header; if your file has no header, add a dummy first line with column names so the JSON has meaningful keys.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Handling commas and special characters</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          When a cell contains the delimiter (e.g. a comma in a name or address), the cell should be wrapped in double quotes so that the parser treats the whole quoted string as one field. For example, &quot;Smith, John&quot; is one column value. If the cell contains a double quote, it is typically escaped by doubling it: &quot;&quot; becomes one quote in the value. This converter supports quoted fields so that commas and other delimiters inside quotes do not break the column structure. If your CSV was exported from Excel or Google Sheets, cells with commas are usually quoted automatically. If you type or edit CSV by hand, remember to add quotes around any cell that contains the delimiter.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">API and integration use</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          Web APIs often accept or return JSON. If you have data in CSV (e.g. from a survey, CRM export, or spreadsheet), converting it to JSON lets you POST it to an API, use it in serverless functions, or seed a database. Some APIs allow bulk uploads as a JSON array of objects, which is exactly what this tool produces. Front-end applications can also consume the JSON directly: for example, you might convert a CSV of menu items or events to JSON and load it into a React or Vue app. The converter runs in the browser, so you can paste sensitive or internal data without uploading it to a third-party server, which is useful for enterprise or confidential datasets.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Databases and NoSQL</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          Document-oriented databases (e.g. MongoDB, CouchDB) store records as JSON-like documents. Importing CSV data into such a database usually involves a conversion step: CSV to JSON, then insert each object as a document. This tool gives you the JSON array; you can then use a script or an import utility to insert the objects. For relational databases, CSV is often imported directly via LOAD DATA or COPY commands, but if you need to transform or validate data in code first, converting to JSON gives you a structure you can programmatically modify (e.g. rename keys, filter rows, or add computed fields) before writing to any backend.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Data quality and validation</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          The converter assumes that the first row is the header and that every data row has the same number of columns (or fewer; missing columns become empty strings). If some rows have extra columns, they may be ignored depending on implementation; if some have fewer, the missing keys get empty values. For production use, it is good practice to validate and clean your CSV before conversion: check for encoding (UTF-8 is standard), remove or fix broken rows, and ensure consistent quoting. Very large files (millions of rows) may be slow or run into memory limits in the browser; for bulk processing, consider a server-side or command-line tool. This converter is ideal for small to medium-sized data (up to thousands of rows) and for quick, one-off conversions.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Summary</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          The CSV to JSON Converter turns CSV text into a JSON array of objects using the first row as keys and supporting multiple delimiters and quoted fields. Paste your CSV, select the delimiter, and get valid JSON for use in APIs, apps, or databases. Processing is done in the browser. For best results, use a header row, quote cells that contain the delimiter, and choose the correct delimiter for your file. For very large or complex data, consider dedicated ETL or scripting tools.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Disclaimer</h3>
        <p className="text-gray-700 leading-relaxed">
          This tool is for general data conversion only. Validate your JSON in your own environment before using it in production. We are not responsible for data loss or misuse. Do not paste highly sensitive data into public or shared devices; processing is local but ensure you trust the environment.
        </p>
      </section>
    </ToolSection>
  );
}
