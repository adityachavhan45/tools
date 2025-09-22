"use client";

import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

// metadata is defined in server wrapper page.js

import { useState } from "react";

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
      showMessage("✅ Beautified successfully!");
    } catch (e) {
      setError("❌ Invalid JSON");
    }
  }

  function minify() {
    try {
      setError("");
      const obj = JSON.parse(input);
      const mini = JSON.stringify(obj);
      setOutput(mini);
      showMessage("✅ Minified successfully!");
    } catch (e) {
      setError("❌ Invalid JSON");
    }
  }

  function clearAll() {
    setInput("");
    setOutput("");
    setError("");
    showMessage("🧹 Cleared!");
  }

  function copyOutput() {
    if (output) {
      navigator.clipboard.writeText(output);
      showMessage("📋 Output copied!");
    }
  }

  function showMessage(msg) {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2000);
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <JsonLd
        data={buildToolJsonLd({
          name: "JSON Formatter & Validator",
          description:
            "Format, minify, and validate JSON with error highlighting and live preview.",
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

      <div className="max-w-5xl mx-auto p-4">
        <h2 className="text-xl font-semibold">JSON Formatter / Beautifier</h2>
        <p className="text-gray-600 mt-1">
          Beautify, minify, and validate JSON with live preview.
        </p>

        {message && (
          <div className="mt-2 px-3 py-2 bg-green-100 border rounded text-green-800 text-sm">
            {message}
          </div>
        )}

        {/* Input & Preview */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Input Box */}
          <textarea
            className="w-full min-h-[300px] p-3 border rounded-lg shadow-inner 
                       font-mono text-sm text-gray-800 bg-white 
                       whitespace-pre-wrap leading-5 focus:ring-2 focus:ring-indigo-400"
            placeholder="Paste JSON here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {/* Live Preview */}
          <pre
            className="w-full min-h-[300px] p-3 border rounded-lg shadow-inner 
                       font-mono text-sm text-slate-800 bg-gray-50 
                       whitespace-pre-wrap overflow-auto leading-5"
          >
            {(() => {
              try {
                return JSON.stringify(JSON.parse(input), null, 2);
              } catch {
                return input || "Output (auto preview)";
              }
            })()}
          </pre>
        </div>

        {error && (
          <div className="mt-3 px-3 py-2 bg-red-100 border border-red-300 rounded text-red-700 text-sm flex items-center gap-2">
            <span>❌</span> {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            className="px-4 py-2 border rounded bg-blue-600 text-white hover:bg-blue-700"
            onClick={beautify}
          >
            Beautify
          </button>
          <button
            className="px-4 py-2 border rounded bg-green-500 text-white hover:bg-green-600"
            onClick={minify}
          >
            Minify
          </button>
          <button
            className="px-4 py-2 border rounded bg-gray-800 text-white hover:bg-black disabled:opacity-50"
            onClick={copyOutput}
            disabled={!output}
          >
            Copy Output
          </button>
          <button
            className="px-4 py-2 border rounded hover:bg-gray-100"
            onClick={clearAll}
          >
            Clear
          </button>
        </div>

        {/* Info Section */}
        <section className="mt-10 bg-white border rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-2">
            About JSON Formatter / Beautifier
          </h3>
          <p className="text-gray-700 mb-4">
            JSON (JavaScript Object Notation) is a lightweight data format used
            widely in APIs and web applications. This free tool helps you format
            (beautify) or compress (minify) JSON instantly in your browser, with
            no data uploaded to servers.
          </p>

          <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Beautify JSON with proper indentation</li>
            <li>Minify JSON for compact storage</li>
            <li>Live auto-preview of JSON input</li>
            <li>Copy output to clipboard instantly</li>
            <li>Works offline in your browser</li>
            <li>Secure – no server uploads</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            <li>Paste your JSON into the left text area.</li>
            <li>See live preview in the right panel.</li>
            <li>Click <strong>Beautify</strong> for indented format.</li>
            <li>Click <strong>Minify</strong> for compact one-line JSON.</li>
            <li>Copy result or clear input easily.</li>
          </ol>

          <h4 className="font-semibold mt-4 mb-1">📦 Practical Use Cases</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Developers debugging API responses</li>
            <li>Students learning JSON structure</li>
            <li>Minify JSON config files for performance</li>
            <li>Beautify JSON before sharing or saving</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
