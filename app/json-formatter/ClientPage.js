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
        <section className="mt-10 bg-white border rounded-lg p-5 shadow">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            About JSON Formatter / Beautifier
          </h3>
          <p className="text-gray-700 mb-4">
            JSON (JavaScript Object Notation) is one of the most widely used 
            formats for exchanging and storing data across the web. It is 
            lightweight, human-readable, and easy to parse by machines, which 
            makes it the backbone of modern APIs, web services, configuration 
            files, and countless applications. However, raw JSON data can often 
            look cluttered, especially if it is minified into a single line. 
            That’s where a JSON formatter and beautifier tool becomes essential. 
            This free online tool helps you instantly beautify (format with 
            indentation) or minify (compress into one line) JSON directly in 
            your browser. No installations, no server uploads, and no privacy 
            risks – everything happens locally on your device.
          </p>

          <h4 className="font-semibold mt-4 mb-2">✨ Key Features</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Beautify JSON with indentation for better readability</li>
            <li>Minify JSON into a single line for compact storage</li>
            <li>Live auto-preview of JSON as you type</li>
            <li>Error detection with instant feedback</li>
            <li>Copy formatted or minified output to clipboard in one click</li>
            <li>Runs fully offline in your browser (no server processing)</li>
            <li>Free, fast, and secure – works on all devices</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2">🔧 How to Use</h4>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            <li>Paste or type your raw JSON code into the left input area.</li>
            <li>The live preview panel will automatically show formatted output.</li>
            <li>Click <strong>Beautify</strong> to format JSON with indentation.</li>
            <li>Click <strong>Minify</strong> to compress JSON into one line.</li>
            <li>Copy the output or clear input with a single button.</li>
          </ol>

          <h4 className="font-semibold mt-4 mb-2">📦 Practical Use Cases</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li><strong>Developers:</strong> Debugging API responses, ensuring JSON is valid before use.</li>
            <li><strong>Students:</strong> Learning and understanding JSON structure more easily.</li>
            <li><strong>Writers/Bloggers:</strong> Formatting JSON snippets for articles or tutorials.</li>
            <li><strong>Config Management:</strong> Minifying config files (e.g., package.json) for performance.</li>
            <li><strong>Data Analysis:</strong> Beautifying JSON exports from tools or databases for review.</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2">⚡ Benefits of Using JSON Formatter</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li><strong>Readability:</strong> Proper indentation makes it easier to spot nested objects and arrays.</li>
            <li><strong>Error Detection:</strong> Quickly identify misplaced commas, missing braces, or invalid syntax.</li>
            <li><strong>Performance:</strong> Minified JSON reduces size, improving storage and transfer speed.</li>
            <li><strong>Productivity:</strong> Saves time for developers by eliminating manual formatting.</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2">📖 Example</h4>
          <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800 overflow-x-auto">
{`Unformatted:
{"name":"John","age":30,"skills":["JavaScript","React","Node.js"]}

Beautified:
{
  "name": "John",
  "age": 30,
  "skills": [
    "JavaScript",
    "React",
    "Node.js"
  ]
}`}
          </pre>

          <h4 className="font-semibold mt-4 mb-2">🔒 Security & Privacy</h4>
          <p className="text-gray-700 mb-4 text-sm">
            Unlike online services that upload your data to a server, this 
            JSON formatter works 100% offline in your browser. That means your 
            sensitive JSON data, such as API responses, configuration files, 
            or user data, never leaves your device. You maintain complete 
            control and privacy.
          </p>

          <h4 className="font-semibold mt-4 mb-2">❓ FAQs</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
            <li><strong>Q: What happens if my JSON is invalid?</strong><br/> 
              A: The tool will display an error instantly, helping you debug quickly.</li>
            <li><strong>Q: Can I minify large JSON files?</strong><br/> 
              A: Yes, this tool can handle large JSON strings and compress them efficiently.</li>
            <li><strong>Q: Does it support comments in JSON?</strong><br/> 
              A: Standard JSON does not support comments, so they will cause errors.</li>
            <li><strong>Q: Do I need internet connection?</strong><br/> 
              A: No, it works offline once loaded in your browser.</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2">🚀 Final Thoughts</h4>
          <p className="text-gray-700 text-sm">
            JSON is the universal language of modern applications, APIs, and 
            web services. Keeping it clean and structured saves developers 
            countless hours. With this free JSON Formatter & Validator, you 
            can quickly beautify, minify, and validate JSON without worrying 
            about errors or privacy risks. Whether you are a beginner learning 
            JSON or an experienced developer debugging production APIs, this 
            tool will save you time, reduce frustration, and improve efficiency 
            in your daily workflow.
          </p>
        </section>
      </div>
    </main>
  );
}
