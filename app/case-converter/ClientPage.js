"use client";

import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import { useState } from "react";

function toTitleCase(input) {
  return input
    .toLowerCase()
    .split(/\s+/)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ""))
    .join(" ");
}

function toSentenceCase(input) {
  return input
    .toLowerCase()
    .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
}

function toInvertedCase(input) {
  return input
    .split("")
    .map((ch) =>
      ch === ch.toUpperCase() ? ch.toLowerCase() : ch.toUpperCase()
    )
    .join("");
}

export default function CaseConverterPage() {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  function copyText() {
    if (text) {
      navigator.clipboard.writeText(text);
      showMessage("📋 Copied to clipboard!", "success");
    }
  }

  function clearText() {
    setText("");
    showMessage("🧹 Cleared!", "info");
  }

  function showMessage(msg, type) {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(""), 2000);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <JsonLd
        data={buildToolJsonLd({
          name: "Case Converter",
          description: "Convert text to uppercase, lowercase, title, and sentence case.",
          slug: "/case-converter",
          category: "Utilities/Text",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Case Converter", slug: "/case-converter" },
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
          <h2 className="text-2xl font-bold text-slate-800">Case Converter</h2>
          <p className="text-gray-600 mt-1">
            Convert your text into UPPERCASE, lowercase, Title Case, Sentence Case, and more instantly.
          </p>

          <textarea
            className="mt-4 w-full min-h-[220px] p-3 border rounded-lg font-mono text-slate-800 bg-slate-50 focus:ring-2 focus:ring-indigo-400"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste text here..."
          />

          {/* Buttons */}
          <div className="mt-3 flex flex-wrap gap-3">
            <button
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-md hover:scale-105 transition"
              onClick={() => setText(text.toUpperCase())}
            >
              UPPERCASE
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md hover:scale-105 transition"
              onClick={() => setText(text.toLowerCase())}
            >
              lowercase
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md hover:scale-105 transition"
              onClick={() => setText(toTitleCase(text))}
            >
              Title Case
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md hover:scale-105 transition"
              onClick={() =>
                setText(text.replace(/\b(\w)/g, (m) => m.toUpperCase()))
              }
            >
              Capitalize Words
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md hover:scale-105 transition"
              onClick={() => setText(toSentenceCase(text))}
            >
              Sentence Case
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow-md hover:scale-105 transition"
              onClick={() => setText(toInvertedCase(text))}
            >
              InVeRtEd CaSe
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-gray-500 to-gray-700 text-white shadow-md hover:scale-105 transition"
              onClick={() => setText(text.replace(/\s+/g, " ").trim())}
            >
              Trim Spaces
            </button>
            <button
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              onClick={clearText}
            >
              Clear
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-gray-800 to-black text-white shadow-md hover:scale-105 transition"
              onClick={copyText}
            >
              Copy
            </button>
          </div>
        </div>

        {/* Info Section */}
        <section className="mt-10 bg-white shadow-md rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-2 text-slate-800">About Case Converter Tool</h3>
          <p className="text-gray-700 mb-4">
            Case Converter is a free online tool that helps you change your text into different cases like UPPERCASE, lowercase, Title Case, Sentence Case, and more. 
            It’s perfect for writers, students, developers, and anyone who needs to reformat text quickly.
          </p>

          <h4 className="font-semibold mt-4 mb-2 text-slate-800">✨ Key Features</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Instantly convert text between multiple cases</li>
            <li>Copy or clear text with one click</li>
            <li>Mobile-friendly and responsive design</li>
            <li>Supports trimming and normalizing spaces</li>
            <li>Error-free and fast performance</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2 text-slate-800">🔧 How to Use</h4>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            <li>Type or paste your text into the input box above.</li>
            <li>Select the desired case (UPPERCASE, lowercase, Title Case, etc.) using the buttons.</li>
            <li>Copy the output to your clipboard or clear it for a fresh start.</li>
          </ol>

          <h4 className="font-semibold mt-4 mb-2 text-slate-800">📦 Practical Use Cases</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Students formatting assignments</li>
            <li>Writers editing articles or blogs</li>
            <li>Developers formatting code comments</li>
            <li>Social media posts with proper text styling</li>
            <li>Cleaning up messy copy-pasted text</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
