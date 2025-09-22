"use client";

import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import { useState } from "react";

function uuidv4() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // Version 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // Variant 10
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0"));
  return `${hex[0]}${hex[1]}${hex[2]}${hex[3]}-${hex[4]}${hex[5]}-${hex[6]}${hex[7]}-${hex[8]}${hex[9]}-${hex[10]}${hex[11]}${hex[12]}${hex[13]}${hex[14]}${hex[15]}`;
}

export default function UuidGeneratorPage() {
  const [list, setList] = useState([]);
  const [count, setCount] = useState(5);
  const [message, setMessage] = useState("");

  function generateMany(n) {
    const items = Array.from({ length: n }, () => uuidv4());
    setList(items);
    setMessage(`✅ Generated ${n} UUID(s)!`);
    setTimeout(() => setMessage(""), 2000);
  }

  function copyAll() {
    if (!list.length) return;
    navigator.clipboard.writeText(list.join("\n"));
    setMessage("📋 UUIDs copied to clipboard!");
    setTimeout(() => setMessage(""), 2000);
  }

  function resetAll() {
    setList([]);
    setMessage("🧹 Cleared!");
    setTimeout(() => setMessage(""), 1500);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-8">
      <JsonLd
        data={buildToolJsonLd({
          name: "UUID Generator",
          description: "Generate UUID v4 identifiers instantly in your browser.",
          slug: "/uuid-generator",
          category: "Utilities/Developers",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "UUID Generator", slug: "/uuid-generator" },
        ])}
      />

      <div className="max-w-4xl mx-auto px-4">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">UUID Generator</h2>
          <p className="text-gray-600 mt-1">
            Generate random UUID v4 identifiers instantly.
          </p>

          {message && (
            <div className="mt-3 px-4 py-2 bg-gray-100 border rounded-lg text-gray-700 text-sm shadow-sm">
              {message}
            </div>
          )}

          {/* Controls */}
          <div className="mt-5 flex flex-wrap gap-3 items-center">
            <label className="text-sm font-medium text-gray-700">Count:</label>
            <input
              type="number"
              min="1"
              max="1000"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value, 10) || 1)}
              className="w-28 p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-slate-900 
             outline-none text-gray-800 font-medium bg-white"
            />

            <button
              className="px-4 py-2 bg-slate-900 text-white rounded-lg shadow hover:bg-slate-800"
              onClick={() => generateMany(count)}
            >
              Generate
            </button>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 disabled:opacity-50"
              onClick={copyAll}
              disabled={!list.length}
            >
              Copy All
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 disabled:opacity-50"
              onClick={resetAll}
              disabled={!list.length}
            >
              Reset
            </button>
          </div>

          {/* Output */}
          <div className="mt-6">
            <label className="text-sm font-medium text-gray-700">
              Generated UUIDs:
            </label>
            <pre
              className="mt-2 p-4 border rounded-lg bg-white text-gray-800 font-mono text-sm 
                         whitespace-pre-wrap max-h-[300px] overflow-y-auto shadow-inner"
            >
              {list.join("\n") || "(no UUIDs generated yet)"}
            </pre>
          </div>
        </div>

        {/* Info Section */}
        <section className="mt-10 bg-white border rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            About UUID v4
          </h3>
          <p className="text-gray-700 mb-4">
            UUID (Universally Unique Identifier) is a 128-bit value used to
            uniquely identify objects or data. UUID v4 is generated using random
            numbers, making collisions extremely unlikely.
          </p>

          {/* Features */}
          <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-2">
            <span className="text-yellow-500 mr-2">✨</span> Features
          </h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1 pl-2">
            <li>Generate multiple UUID v4 identifiers</li>
            <li>Copy all results with one click</li>
            <li>Clear/reset easily</li>
            <li>Runs completely in your browser</li>
          </ul>

          {/* Use Cases */}
          <h4 className="flex items-center text-lg font-semibold text-gray-800 mt-6 mb-2">
            <span className="text-orange-500 mr-2">📦</span> Use Cases
          </h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1 pl-2">
            <li>Database primary keys</li>
            <li>Unique identifiers in distributed systems</li>
            <li>Session tokens or API keys</li>
            <li>Tracking objects in large datasets</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
