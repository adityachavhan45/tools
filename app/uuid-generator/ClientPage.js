"use client";
import Script from "next/script";

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

        {/* ad script */}
<script async="async" data-cfasync="false" src="https://pl28411841.effectivegatecpm.com/f404cdb5fbadd90423ffc4a3b6333a6d/invoke.js"></script>
<div id="container-f404cdb5fbadd90423ffc4a3b6333a6d"></div>
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
            About UUID v4 Generator
          </h3>
          <p className="text-gray-700 mb-4 text-sm">
            A UUID (Universally Unique Identifier) is a 128-bit value used to
            uniquely identify information in computer systems. Unlike simple
            incremental IDs (1, 2, 3, …), a UUID is generated in such a way that
            it is almost impossible for two values to be the same. The version 4
            (v4) UUID is based entirely on random numbers, making it one of the
            most common and secure ways to generate unique identifiers. This UUID
            Generator allows you to create multiple UUID v4 values instantly,
            directly in your browser, without needing any server or database.
          </p>

          <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">✨ Key Features</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>Generates fully random UUID v4 identifiers.</li>
            <li>Supports bulk generation — create up to 1000 UUIDs at once.</li>
            <li>One-click copy for quick use in projects or documentation.</li>
            <li>No server dependency — works entirely inside your browser.</li>
            <li>Lightweight, fast, and privacy-friendly (no data leaves your system).</li>
          </ul>

          <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2">📦 Practical Use Cases</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li><strong>Databases:</strong> Use UUIDs as primary keys instead of sequential IDs to avoid collisions in distributed databases.</li>
            <li><strong>Web Development:</strong> Assign UUIDs to user sessions, API tokens, or authentication flows for security.</li>
            <li><strong>Software Engineering:</strong> Track objects, configurations, or logs with globally unique IDs.</li>
            <li><strong>Cloud & Distributed Systems:</strong> Ensure unique identifiers across servers without central coordination.</li>
            <li><strong>Testing & Debugging:</strong> Generate mock data with unique values for load testing or QA environments.</li>
          </ul>

          <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2">🔧 How Does UUID v4 Work?</h4>
          <p className="text-gray-700 text-sm mb-4">
            A UUID v4 is generated using 122 random bits. Certain bits are reserved
            to mark the version (4) and variant (RFC 4122 standard). The randomness
            ensures that the probability of two UUIDs being identical is close to
            zero — approximately 1 in 2<sup>122</sup>. This level of uniqueness
            makes UUID v4 suitable for high-scale systems where millions of IDs are
            created every second across different machines.
          </p>

          <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2">⚡ Benefits of Using UUID v4</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li><strong>Collision Resistance:</strong> Almost impossible to generate duplicates.</li>
            <li><strong>Scalability:</strong> Works across distributed systems without coordination.</li>
            <li><strong>Security:</strong> Harder to guess compared to incremental IDs, reducing attack vectors.</li>
            <li><strong>Flexibility:</strong> Can be used in databases, APIs, IoT, blockchain, and more.</li>
            <li><strong>Standardized:</strong> Universally recognized format supported by most programming languages.</li>
          </ul>

          <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2">🔒 Security Considerations</h4>
          <p className="text-gray-700 text-sm mb-4">
            While UUID v4 provides randomness and unpredictability, it should not
            be used as a replacement for cryptographic keys or passwords. UUIDs are
            designed for uniqueness, not encryption. For sensitive applications
            like authentication, always combine UUIDs with strong security
            practices such as hashing, salting, and SSL/TLS communication.
          </p>

          <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2">📐 Best Practices</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>Use UUIDs for distributed systems where central ID generation is not practical.</li>
            <li>Store UUIDs as <code>CHAR(36)</code> strings or as <code>BINARY(16)</code> for efficiency.</li>
            <li>Avoid using UUIDs as sequential primary keys in heavily indexed relational databases (consider UUID v1 or ULID if ordering matters).</li>
            <li>For front-end projects, generate UUIDs in the client to reduce server load.</li>
            <li>Keep logs of generated UUIDs only if necessary; otherwise, trust randomness.</li>
          </ul>

          <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2">❓ Frequently Asked Questions (FAQ)</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
            <li><strong>Q: What is the difference between UUID v1 and v4?</strong><br />
              A: UUID v1 is based on timestamp + MAC address, while UUID v4 is purely random.</li>
            <li><strong>Q: Can two UUID v4 values ever be the same?</strong><br />
              A: The probability is so low it’s practically impossible (1 in 5.3e36).</li>
            <li><strong>Q: Is UUID v4 safe for authentication?</strong><br />
              A: It’s safe for identifiers but not for passwords or secret keys.</li>
            <li><strong>Q: How long is a UUID?</strong><br />
              A: A UUID is 128 bits, typically represented as a 36-character string (with hyphens).</li>
            <li><strong>Q: Can I use UUIDs in URLs?</strong><br />
              A: Yes, UUIDs are URL-safe and widely used in REST APIs.</li>
          </ul>

          <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2">🚀 Final Thoughts</h4>
          <p className="text-gray-700 text-sm">
            UUID v4 is one of the simplest yet most powerful ways to ensure
            uniqueness in digital systems. From databases to cloud services, from
            APIs to IoT devices — UUIDs have become a universal standard. This
            browser-based UUID Generator helps you create as many identifiers as
            you need instantly, without any installation or backend dependency.
            Whether you are a developer, student, researcher, or just experimenting,
            UUIDs will give you reliable, unique, and scalable IDs every time. By
            using this tool, you eliminate duplication risks and future-proof your
            projects with globally unique identifiers.
          </p>
        </section>
      </div>
    </main>
  );
}
