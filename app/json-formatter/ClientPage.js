"use client";

import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import { useState } from "react";
import ToolSection from "../components/ToolSection";

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function beautify() {
    try {
      setError("");
      const obj = JSON.parse(input);
      const pretty = JSON.stringify(obj, null, 2);
      setOutput(pretty);
      setMessage("Formatted. Copy or use the output below.");
    } catch (e) {
      setError("Invalid JSON. Check syntax (commas, brackets, quotes).");
      setOutput("");
    }
  }

  function minify() {
    try {
      setError("");
      const obj = JSON.parse(input);
      const mini = JSON.stringify(obj);
      setOutput(mini);
      setMessage("Minified. Copy or use the output below.");
    } catch (e) {
      setError("Invalid JSON. Check syntax (commas, brackets, quotes).");
      setOutput("");
    }
  }

  function clearAll() {
    setInput("");
    setOutput("");
    setError("");
    setMessage("Cleared.");
  }

  function copyOutput() {
    if (output) {
      navigator.clipboard.writeText(output);
      setMessage("Output copied to clipboard.");
    }
  }

  let livePreview = "Output preview";
  try {
    if (input.trim()) livePreview = JSON.stringify(JSON.parse(input), null, 2);
  } catch {
    livePreview = input.trim() || "Output preview";
  }

  return (
    <ToolSection
      title="Free JSON Formatter and Validator"
      subtitle="Beautify, minify, and validate JSON in your browser. Live preview, no upload works on all devices."
      plain
      plainSidebar
      whiteBackgrounds
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "JSON Formatter",
          description: "Format, minify, and validate JSON. Beautify with indentation or compress to one line. In-browser, no sign-up.",
          slug: "/json-formatter",
          category: "Utilities/Text",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "JSON Formatter", slug: "/json-formatter" },
        ])}
      />

      {message && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-white text-sm sm:text-base transition-all duration-300
          ${message.includes("Formatted") || message.includes("Minified") || message.includes("copied") ? "bg-emerald-600" : ""}
          ${message.includes("Cleared") ? "bg-sky-600" : ""}`}
        >
          {message}
        </div>
      )}

      <div className="space-y-6">
        {/* Input and preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700 mb-2">Paste or type JSON</label>
            <textarea
              className="w-full min-h-[280px] p-4 border border-slate-300 rounded-xl font-mono text-sm text-slate-800 bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-y"
              placeholder='{"name": "example", "count": 1}'
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError("");
              }}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700 mb-2">Live preview</label>
            <pre className="w-full min-h-[280px] p-4 border border-slate-200 rounded-xl font-mono text-sm text-slate-700 bg-slate-50 overflow-auto whitespace-pre-wrap break-words">
              {livePreview}
            </pre>
          </div>
        </div>

        {error && (
          <div className="px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={beautify}
            className="px-6 py-3 rounded-xl bg-teal-600 text-white font-medium shadow-md hover:bg-teal-700 transition"
          >
            Beautify
          </button>
          <button
            onClick={minify}
            className="px-6 py-3 rounded-xl bg-slate-700 text-white font-medium shadow-md hover:bg-slate-800 transition"
          >
            Minify
          </button>
          <button
            onClick={copyOutput}
            disabled={!output}
            className="px-6 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Copy output
          </button>
          <button
            onClick={clearAll}
            className="px-6 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-medium transition"
          >
            Clear all
          </button>
        </div>

        {/* Output (after beautify/minify) */}
        {output && (
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700 mb-2">Output</label>
            <pre className="w-full min-h-[200px] p-4 border border-slate-200 rounded-xl font-mono text-sm text-slate-800 bg-white overflow-auto whitespace-pre-wrap break-words">
              {output}
            </pre>
          </div>
        )}
      </div>

      {/* Info section – 1000+ words, unique, text-justify */}
      <section className="mt-12 sm:mt-14 p-5 sm:p-6 md:p-8 bg-white shadow-md rounded-2xl border border-slate-100">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 border-b border-slate-200 pb-3">
          About This JSON Formatter and Validator
        </h2>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          A JSON formatter is a tool that takes raw JSON text and either beautifies it (adds indentation and line breaks so it is easy to read) or minifies it (removes extra spaces and newlines so it fits in one compact line). JSON (JavaScript Object Notation) is a standard format for storing and exchanging data. It is used by APIs, config files, and many applications. When JSON is minified, it is hard for humans to read and debug. When it is beautified, the structure is clear. This formatter runs in your browser: you paste or type JSON, click beautify or minify, and get the result. No data is sent to a server, so the process is private and fast. The tool also validates JSON: if the input is not valid, it shows an error instead of producing output. Whether you are a developer debugging an API response, a student learning JSON, or someone preparing config or data, this tool helps you format and check JSON quickly.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">What Is JSON?</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          JSON is a text format for representing data. It uses objects (key–value pairs in curly braces), arrays (ordered lists in square brackets), strings (in double quotes), numbers, and the literals true, false, and null. It does not support comments, and keys must be double-quoted strings. JSON is both human-readable and easy for programs to parse. It is the default format for many web APIs: when you request data from a service, the response is often JSON. Configuration files like package.json or tsconfig.json are JSON. Databases and tools often export or import JSON. Because it is so common, being able to format, minify, and validate JSON is useful for anyone who works with data or code.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Why Format or Minify JSON?</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Formatted (beautified) JSON is easier to read and debug. Indentation and line breaks show the nesting of objects and arrays, so you can quickly spot structure and errors. Minified JSON uses less space: no unnecessary spaces or newlines. That is useful when you need to send JSON over a network, store it in a small space, or embed it in a web page. Many APIs return minified JSON to save bandwidth; developers often beautify it locally to inspect the response. Build tools and bundlers sometimes minify JSON before deployment. This formatter does both: you can paste minified JSON and beautify it to read it, or paste formatted JSON and minify it to reduce size.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">How This Tool Works</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          When you paste or type in the input area, the tool tries to parse the text as JSON. If the text is valid JSON, the live preview panel shows it formatted with indentation. If the text is invalid, the preview shows the raw input and the tool can show an error when you click beautify or minify. When you click beautify, the tool parses the input, then outputs the same data with indentation (two spaces per level) and line breaks. When you click minify, it parses the input and outputs the same data as a single line with no extra spaces. The output is shown in the output area and can be copied with one click. All parsing and formatting is done in your browser using JavaScript; no data is sent to a server. The tool also validates: invalid JSON produces an error message instead of output, so you know to fix the syntax before using the data.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Step-by-Step How to Use</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Open the tool in your browser. Paste your JSON into the left-hand input area (or type it). The live preview on the right will update: if the JSON is valid, you will see it formatted; if not, you will see the raw text. To get formatted output in the output area, click beautify. To get a single-line minified version, click minify. If the JSON is invalid, an error message will appear and you should fix the input (check for missing commas, extra commas, unclosed brackets, or unquoted keys). Once you have output, you can copy it with the copy button or use it elsewhere. Use clear all to reset the input and output and start over. There is no limit on how many times you format or minify; the tool works entirely in the browser.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Common JSON Errors</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Invalid JSON usually fails for a few recurring reasons. A trailing comma after the last element in an object or array is not allowed in standard JSON. Missing commas between elements will cause a parse error. Keys must be in double quotes; single quotes or unquoted keys are invalid. Strings must use double quotes for the outer quotes; escaped quotes inside are fine. Unclosed brackets or braces (missing closing brace or bracket) will cause an error. Sometimes the input is not JSON at all (for example JavaScript object literal with comments or single quotes); in that case you need to convert it to valid JSON first. This formatter does not fix errors automatically; it reports that the JSON is invalid so you can correct the source. Learning these rules helps you write and debug JSON quickly.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Use Cases</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Developers use JSON formatters to inspect API responses, debug payloads, and prepare request bodies. When a server returns minified JSON, pasting it into a formatter and clicking beautify makes it readable. When you need to send JSON in a header or store it in a small field, minifying reduces size. Students and educators use formatters to learn JSON structure and to check that exercises or examples are valid. Technical writers use them to format JSON snippets for documentation. System administrators and DevOps staff use them for config files and deployment data. Data analysts and scientists often work with JSON exports; formatting makes the structure clear. Anyone who receives or produces JSON in a minified or messy form can use this tool to make it readable or compact without leaving the browser.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Privacy and Security</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          This formatter runs entirely in your browser. The JSON you paste or type is not sent to any server. Parsing and formatting are done locally using JavaScript. Your data stays on your device. That is important when the JSON contains sensitive information: API keys, tokens, user data, or confidential configuration. You can use the tool on a shared or public computer with less worry about leaking data, as long as you clear the input and output when you are done. No account or login is required. The tool works offline once the page has loaded, so you can use it even on restricted or air-gapped networks.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Limitations</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          This tool uses standard JSON. It does not support comments, trailing commas, or single-quoted strings; those are JavaScript extensions, not valid JSON. Very large inputs (for example millions of characters) may slow down the browser or cause it to become unresponsive; for huge files, a desktop or command-line tool may be better. The tool does not modify the data or fix invalid JSON; it only formats valid JSON or reports an error. It does not syntax-highlight or fold long lines; it shows plain formatted or minified text. For most typical uses—API responses, config snippets, and small to medium data—these limitations do not affect the result. For advanced editing or huge files, consider a dedicated editor or script.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Conclusion</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
          A JSON formatter and validator helps you beautify, minify, and check JSON quickly. This free tool runs in your browser, supports live preview, and gives you beautify and minify with one click. Your data is not uploaded to any server. Use it to make API responses readable, to shrink JSON for storage or transfer, or to validate syntax before using data. Fix common errors like trailing commas and unquoted keys, then format or minify again. Whether you are a developer, student, or someone working with JSON data, this tool is a simple and private way to format and validate JSON.
        </p>
      </section>
    </ToolSection>
  );
}
