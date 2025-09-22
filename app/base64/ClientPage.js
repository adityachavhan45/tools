"use client";

import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import { useState, useEffect } from "react";

export default function Base64ToolPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [message, setMessage] = useState("");

  // Load from localStorage
  useEffect(() => {
    const savedInput = localStorage.getItem("base64_input");
    const savedOutput = localStorage.getItem("base64_output");
    if (savedInput) setInput(savedInput);
    if (savedOutput) setOutput(savedOutput);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("base64_input", input);
    localStorage.setItem("base64_output", output);
  }, [input, output]);

  function encode() {
    try {
      const result = btoa(unescape(encodeURIComponent(input.trim())));
      setOutput(result);
      showMessage("✅ Encoded successfully!", "success");
    } catch {
      setOutput("Encoding error");
      showMessage("❌ Encoding failed!", "error");
    }
  }

  function decode() {
    try {
      const result = decodeURIComponent(escape(atob(input.trim())));
      setOutput(result);
      showMessage("✅ Decoded successfully!", "success");
    } catch {
      setOutput("Decoding error");
      showMessage("❌ Decoding failed!", "error");
    }
  }

  function clearAll() {
    setInput("");
    setOutput("");
    localStorage.removeItem("base64_input");
    localStorage.removeItem("base64_output");
    showMessage("🧹 Cleared!", "info");
  }

  function copyOutput() {
    if (output) {
      navigator.clipboard.writeText(output);
      showMessage("📋 Copied to clipboard!", "success");
    }
  }

  function showMessage(msg, type) {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(""), 2000);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <JsonLd
        data={buildToolJsonLd({
          name: "Base64 Encoder/Decoder",
          description: "Encode or decode Base64 text and files.",
          slug: "/base64",
          category: "Utilities/Text",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Base64 Encoder/Decoder", slug: "/base64" },
        ])}
      />

      {/* Toast Message */}
      {message.text && (
        <div
          className={`fixed top-5 right-5 px-4 py-2 rounded-lg shadow-lg text-white transition 
          ${message.type === "success" ? "bg-green-500" : ""}
          ${message.type === "error" ? "bg-red-500" : ""}
          ${message.type === "info" ? "bg-blue-500" : ""}`}
        >
          {message.text}
        </div>
      )}

      <div className="max-w-4xl mx-auto py-10 px-5">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-slate-800">
            Base64 Encode / Decode
          </h2>
          <p className="text-gray-600 mt-1">
            Convert text to/from Base64 instantly.
          </p>

          <textarea
            className="mt-4 w-full min-h-[160px] p-3 border rounded-lg font-mono text-slate-800 bg-slate-50 focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter text or Base64"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {/* Buttons */}
          <div className="mt-3 flex flex-wrap gap-3">
            <button
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-md hover:scale-105 transition"
              onClick={encode}
            >
              Encode
            </button>
            <button
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md hover:scale-105 transition"
              onClick={decode}
            >
              Decode
            </button>
            <button
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              onClick={clearAll}
            >
              Clear
            </button>
            <button
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-gray-700 to-black text-white shadow-md hover:scale-105 transition"
              onClick={copyOutput}
            >
              Copy Output
            </button>
          </div>

          {/* Output */}
          <textarea
            className="mt-4 w-full min-h-[160px] p-3 border rounded-lg font-mono bg-slate-100 text-slate-900"
            placeholder="Output"
            value={output}
            readOnly
          />
        </div>

        {/* Info Section */}
        <section className="mt-10 bg-white shadow-md rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-3 text-slate-800">
            About Base64 Encode / Decode Tool
          </h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Base64 is a widely used encoding scheme that allows you to convert
            text or binary data into a text format. It uses 64 characters (A–Z,
            a–z, 0–9, +, /) and = for padding. This makes it safe for
            transferring data over the web, emails, or APIs where only text is
            supported.
          </p>

          <h4 className="font-semibold mt-5 mb-2 text-slate-800">✨ Key Features</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Instant Base64 encoding and decoding</li>
            <li>Copy output to clipboard with one click</li>
            <li>Clear input/output easily</li>
            <li>Mobile-friendly and responsive design</li>
            <li>Auto-saves your last input/output (local storage)</li>
            <li>Error handling with success/error alerts</li>
          </ul>

          <h4 className="font-semibold mt-5 mb-2 text-slate-800">🔧 How to Use</h4>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            <li>Enter your text or Base64 string in the input box.</li>
            <li>
              Click <strong>Encode</strong> to convert normal text to Base64.
            </li>
            <li>
              Click <strong>Decode</strong> to convert Base64 back to readable
              text.
            </li>
            <li>Use the Clear button to reset input and output.</li>
            <li>Click Copy Output to save the result to your clipboard.</li>
          </ol>

          <h4 className="font-semibold mt-5 mb-2 text-slate-800">📦 Practical Use Cases</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Web development (API payloads, JWT tokens, config files)</li>
            <li>Cybersecurity (data obfuscation, malware analysis)</li>
            <li>File handling (images or binary files as text)</li>
            <li>Email/Chat apps (safe attachments and inline content)</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
