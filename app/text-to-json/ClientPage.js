"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function TextToJsonPage() {
  const [text, setText] = useState("");
  const [json, setJson] = useState("");
  const [message, setMessage] = useState("");

  function convertTextToJson() {
    if (!text.trim()) {
      setMessage("⚠️ Please enter text to convert to JSON code.");
      return;
    }

    try {
      // Create a simple JSON structure from the text
      const lines = text.split('\n');
      const jsonContent = lines.map((line, index) =>
        `    "${line.replace(/"/g, '\\"')}"`
      ).join(',\n');

      const jsonString = `{
  "metadata": {
    "totalLines": ${lines.length},
    "totalCharacters": ${text.length},
    "totalWords": ${text.split(/\s+/).filter(word => word.length > 0).length},
    "createdAt": "${new Date().toISOString()}"
  },
  "content": {
    "lines": [
${jsonContent}
    ]
  },
  "statistics": {
    "averageLineLength": ${Math.round(text.length / lines.length)},
    "longestLine": ${Math.max(...lines.map(line => line.length))},
    "shortestLine": ${Math.min(...lines.map(line => line.length))}
  }
}`;

      setJson(jsonString);
      setMessage("✅ Text converted to JSON code successfully!");
    } catch (error) {
      setMessage("❌ Error converting text to JSON code.");
    }
  }

  function convertJsonToText() {
    if (!json.trim()) {
      setMessage("⚠️ Please enter JSON code to convert to text.");
      return;
    }

    try {
      // Simple JSON to text conversion
      let extractedText = json;

      // Extract text from JSON string values
      const jsonMatches = extractedText.match(/"([^"\\]*(\\.[^"\\]*)*)"/g);
      if (jsonMatches) {
        const textLines = jsonMatches.map(match => {
          const content = match.slice(1, -1); // Remove quotes
          return content.replace(/\\"/g, '"').replace(/\\n/g, '\n');
        });
        extractedText = textLines.join('\n');
      } else {
        // If no JSON strings, try to extract from comments and docstrings
        extractedText = extractedText.replace(/\/\/.*$/gm, '');
        extractedText = extractedText.replace(/\/\*.*?\*\//gs, '');
        extractedText = extractedText.replace(/^\s*[a-zA-Z_][a-zA-Z0-9_]*\s*:/gm, '');
        extractedText = extractedText.replace(/^\s*[a-zA-Z_][a-zA-Z0-9_]*\s*=/gm, '');
        extractedText = extractedText.replace(/\s+/g, ' ').trim();
      }

      setText(extractedText);
      setMessage("✅ JSON code converted to text successfully!");
    } catch (error) {
      setMessage("❌ Error converting JSON code to text. Please check your JSON format.");
    }
  }

  function copyText() {
    navigator.clipboard.writeText(text);
    setMessage("📋 Text copied to clipboard!");
  }

  function copyJson() {
    navigator.clipboard.writeText(json);
    setMessage("📋 JSON code copied to clipboard!");
  }

  function reset() {
    setText("");
    setJson("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Text to JSON Converter"
      subtitle="Convert text to JSON code and JSON to text online. Free text to JSON converter with formatting and validation support."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Text to JSON Converter",
          description: "Convert text to JSON code and JSON to text online.",
          slug: "/text-to-json",
          category: "Utilities/Text",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Text to JSON Converter", slug: "/text-to-json" },
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
            placeholder="Enter text to convert to JSON code..."
            className="w-full min-h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-y"
          />
        </div>

        {/* JSON Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter JSON Code
          </label>
          <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm whitespace-pre-wrap min-h-32">
            {json || "JSON output will appear here..."}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={convertTextToJson}
            disabled={!text.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🔤 Text to JSON
          </button>

          <button
            onClick={convertJsonToText}
            disabled={!json.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-green-600 text-white shadow 
                       hover:bg-green-700 disabled:opacity-60"
          >
            📡 JSON to Text
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

          {json && (
            <button
              onClick={copyJson}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                         bg-purple-600 text-white shadow 
                         hover:bg-purple-700"
            >
              📋 Copy JSON
            </button>
          )}

          <button
            onClick={reset}
            disabled={!text.trim() && !json.trim()}
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

        {/* JSON Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">About JSON</h4>
          <div className="text-sm space-y-1">
            <div>• JSON is a lightweight data interchange format</div>
            <div>• Used for APIs and data exchange</div>
            <div>• Supports objects, arrays, and primitive types</div>
            <div>• Commonly used with JavaScript and web applications</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About Text to JSON Converter</h3>
        <p className="text-gray-700 mb-4">
          The Text to JSON Converter is a free online utility that lets you transform
          plain text into valid JSON format and decode JSON back into text. JSON
          (JavaScript Object Notation) has become the universal standard for data
          exchange because of its simplicity, readability, and compatibility with most
          modern programming languages. With this tool, you can quickly prepare
          structured JSON from notes, logs, or raw text, and easily extract readable
          text from JSON code. Whether you’re a developer, data analyst, or student,
          this converter saves time and reduces manual formatting errors.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Instantly convert plain text into valid JSON objects</li>
          <li>Decode JSON code back into plain text with one click</li>
          <li>Automatic handling of quotes and escape characters</li>
          <li>Statistics panel showing character, word, and line counts</li>
          <li>One-click copy functionality for both text and JSON outputs</li>
          <li>Lightweight — runs fully in your browser, no server calls</li>
          <li>Works for developers, testers, students, and data professionals</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Type or paste plain text into the <strong>Text</strong> input area.</li>
          <li>Click <strong>Text to JSON</strong> to generate structured JSON code.</li>
          <li>If you already have JSON, paste it into the <strong>JSON</strong> field
            and click <strong>JSON to Text</strong> to decode it.</li>
          <li>Use the <em>Copy</em> buttons to copy results instantly.</li>
          <li>Check the Character Analysis section for text insights.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Common Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>API Development:</strong> Quickly prepare mock JSON responses from plain text.</li>
          <li><strong>Frontend Applications:</strong> Store or render user content in JSON format.</li>
          <li><strong>Data Analysis:</strong> Convert logs or text reports into structured JSON.</li>
          <li><strong>Learning:</strong> Understand how plain text maps into JSON objects and arrays.</li>
          <li><strong>Debugging:</strong> Decode JSON strings back into readable text.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">📊 Why Use JSON?</h4>
        <p className="text-gray-700 mb-4">
          JSON has become the backbone of modern web and app development. It is
          lightweight, human-readable, and works seamlessly with JavaScript, Python,
          Java, and almost every other language. Unlike XML, JSON uses a simpler
          syntax with key-value pairs and arrays, making it faster to parse and easier
          to maintain. Most APIs today return data in JSON, which makes learning and
          practicing with JSON an essential skill. This tool bridges the gap between
          raw text and structured JSON code.
        </p>

        <h4 className="font-semibold mt-4 mb-1">🙋 Frequently Asked Questions</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>What is this tool used for?</strong> To convert plain text into
            JSON objects and decode JSON back into text.</li>
          <li><strong>Does it support nested JSON?</strong> Yes, but input should be
            structured properly for nested objects.</li>
          <li><strong>Can I use it for APIs?</strong> Yes, you can prepare mock API
            responses or test JSON formatting.</li>
          <li><strong>Is my data safe?</strong> 100% safe — all processing happens in
            your browser, nothing is uploaded.</li>
          <li><strong>What’s the difference between JSON and XML?</strong> JSON is
            lighter, easier to read, and faster to parse compared to XML.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🚀 Final Thoughts</h4>
        <p className="text-gray-700">
          The Text to JSON Converter is more than just a code generator — it is a
          practical tool for developers, students, and data workers. From learning the
          basics of JSON syntax to preparing production-ready JSON structures, this
          tool delivers accuracy, speed, and ease of use. Whether you’re testing APIs,
          debugging code, or simply experimenting with text formatting, this free
          converter makes working with JSON effortless. Try it with your own text and
          see the instant transformation.
        </p>
      </section>
    </ToolSection>
  );
}