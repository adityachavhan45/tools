"use client";

import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import { useState } from "react";

export default function UrlEncoderPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [message, setMessage] = useState("");

  function encode() {
    try {
      setOutput(encodeURIComponent(input));
      setMessage("✅ Encoded successfully!");
    } catch {
      setMessage("❌ Encoding failed.");
    }
  }

  function decode() {
    try {
      setOutput(decodeURIComponent(input));
      setMessage("✅ Decoded successfully!");
    } catch {
      setMessage("❌ Invalid encoded string.");
    }
  }

  function copyOutput() {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setMessage("📋 Output copied to clipboard!");
    setTimeout(() => setMessage(""), 2000);
  }

  function resetAll() {
    setInput("");
    setOutput("");
    setMessage("🧹 Cleared!");
    setTimeout(() => setMessage(""), 1500);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-8">
      <JsonLd
        data={buildToolJsonLd({
          name: "URL Encoder/Decoder",
          description: "Encode or decode URLs (percent-encoding) in your browser.",
          slug: "/url-encoder",
          category: "Utilities/Text",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "URL Encoder/Decoder", slug: "/url-encoder" },
        ])}
      />

      <div className="max-w-4xl mx-auto px-4">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">
            URL Encoder / Decoder
          </h2>
          <p className="text-gray-600 mt-1">
            Encode or decode URL strings quickly and securely.
          </p>

          {message && (
            <div className="mt-3 px-4 py-2 bg-gray-100 border rounded-lg text-gray-700 text-sm shadow-sm">
              {message}
            </div>
          )}

          {/* Input */}
          <textarea
            className="mt-5 w-full min-h-[180px] p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-slate-900 outline-none text-gray-800 placeholder-gray-400"
            placeholder="Enter text or encoded URL"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {/* Buttons */}
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={encode}
              className="flex-1 min-w-[120px] px-4 py-2 bg-slate-900 text-white rounded-lg font-medium shadow hover:bg-slate-800 transition"
            >
              Encode
            </button>
            <button
              onClick={decode}
              className="flex-1 min-w-[120px] px-4 py-2 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-500 transition"
            >
              Decode
            </button>
            <button
              onClick={copyOutput}
              disabled={!output}
              className={`flex-1 min-w-[120px] px-4 py-2 rounded-lg font-medium shadow transition
                ${!output
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-500"}`}
            >
              Copy Output
            </button>
            <button
              onClick={resetAll}
              disabled={!input && !output}
              className={`flex-1 min-w-[120px] px-4 py-2 rounded-lg font-medium shadow transition
                ${!input && !output
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-red-500 text-white hover:bg-red-600"}`}
            >
              Reset
            </button>
          </div>

          {/* Output */}
          <textarea
            className="mt-4 w-full min-h-[180px] p-3 border rounded-lg shadow-sm bg-gray-50 text-gray-800"
            placeholder="Output"
            value={output}
            readOnly
          />
        </div>

        {/* Info Section */}
        <section className="mt-10 bg-white border rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            About URL Encoder/Decoder
          </h3>
          <p className="text-gray-700 mb-4">
            URL encoding replaces unsafe ASCII characters with a "%" followed by
            two hexadecimal digits. It is commonly used in web development to
            ensure URLs are transmitted correctly. Decoding reverses this process
            back to normal text.
          </p>

          {/* Features */}
          <div className="mt-6">
            <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-2">
              <span className="text-yellow-500 mr-2">✨</span> Features
            </h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1 pl-2">
              <li>Instant URL encoding & decoding</li>
              <li>Copy results with one click</li>
              <li>Error handling for invalid strings</li>
              <li>Reset input/output easily</li>
              <li>Runs fully in your browser</li>
            </ul>
          </div>

          {/* How to Use */}
          <div className="mt-6">
            <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-2">
              <span className="text-green-600 mr-2">🔧</span> How to Use
            </h4>
            <ol className="list-decimal list-inside text-gray-700 space-y-1 pl-2">
              <li>Enter a text or encoded URL in the input box.</li>
              <li>
                Click <strong>Encode</strong> to generate a safe URL string.
              </li>
              <li>
                Click <strong>Decode</strong> to convert back to normal text.
              </li>
              <li>Copy or reset results as needed.</li>
            </ol>
          </div>

          {/* Use Cases */}
          <div className="mt-6">
            <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-2">
              <span className="text-orange-500 mr-2">📦</span> Use Cases
            </h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1 pl-2">
              <li>Encode query parameters for URLs</li>
              <li>Decode URL strings from web requests</li>
              <li>Debugging web apps and APIs</li>
              <li>Securely share special characters in links</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
