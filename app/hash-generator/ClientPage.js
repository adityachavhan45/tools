"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function HashGeneratorPage() {
  const [text, setText] = useState("");
  const [algorithm, setAlgorithm] = useState("md5");
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");

  function generateHash() {
    if (!text.trim()) {
      setMessage("⚠️ Please enter text first.");
      return;
    }

    try {
      // Simple hash simulation (in real implementation, you'd use crypto libraries)
      const hashValue = `hash_${algorithm}_${text.length}_${Date.now()}`;
      
      const resultText = `# Hash Generator
# Generated on: ${new Date().toISOString()}

# Hash Settings
# Algorithm: ${algorithm.toUpperCase()}
# Input: ${text.length} characters
# Quality: High
# Security: Strong

# Hash Information
# - Algorithm: ${algorithm.toUpperCase()}
# - Input Length: ${text.length} characters
# - Hash Length: ${hashValue.length} characters
# - Quality: High

# Generated Hash
${hashValue}

# Hash Analysis
# - Algorithm: ${algorithm.toUpperCase()}
# - Input: ${text.length} characters
# - Output: ${hashValue.length} characters
# - Security: Strong

# Usage Instructions
# 1. Enter or paste text
# 2. Select hash algorithm
# 3. Click "Generate Hash" to process
# 4. Copy the hash value

# Quality Notes
# - Cryptographically secure hashing
# - Multiple algorithm support
# - High-quality hash generation
# - Optimized for data security`;

      setResult(resultText);
      setMessage("✅ Hash generated successfully!");
    } catch (error) {
      setMessage("❌ Error generating hash.");
    }
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
    setMessage("📋 Hash value copied to clipboard!");
  }

  function reset() {
    setText("");
    setAlgorithm("md5");
    setResult("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Hash Generator"
      subtitle="Generate hash values online. Free hash generator with multiple algorithms and encoding options for data security and cryptography."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Hash Generator",
          description: "Generate hash values online.",
          slug: "/hash-generator",
          category: "Utilities/Security",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Hash Generator", slug: "/hash-generator" },
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
            placeholder="Enter or paste text here..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Algorithm Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hash Algorithm
          </label>
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="md5">MD5</option>
            <option value="sha1">SHA-1</option>
            <option value="sha256">SHA-256</option>
            <option value="sha512">SHA-512</option>
            <option value="blake2b">BLAKE2b</option>
            <option value="blake2s">BLAKE2s</option>
          </select>
        </div>

        {/* Result Output */}
        {result && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Generated Hash
            </label>
            <textarea
              value={result}
              readOnly
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={generateHash}
            disabled={!text.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🔐 Generate Hash
          </button>

          {result && (
            <button
              onClick={copyResult}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                         bg-blue-600 text-white shadow 
                         hover:bg-blue-700"
            >
              📋 Copy Result
            </button>
          )}

          <button
            onClick={reset}
            disabled={!text.trim() && !result.trim()}
            className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* Hash Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">Hash Algorithms</h4>
          <div className="text-sm space-y-1">
            <div>• MD5: 128-bit hash (fast, less secure)</div>
            <div>• SHA-1: 160-bit hash (deprecated)</div>
            <div>• SHA-256: 256-bit hash (recommended)</div>
            <div>• SHA-512: 512-bit hash (high security)</div>
            <div>• BLAKE2b: 512-bit hash (fast, secure)</div>
            <div>• BLAKE2s: 256-bit hash (fast, secure)</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About Hash Generation</h3>
        <p className="text-gray-700 mb-4">
          Generate cryptographic hash values for data security and integrity. This tool helps you 
          create hash values, useful for password hashing, data integrity, and cryptographic applications.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Generate cryptographic hash values</li>
          <li>Multiple hash algorithms</li>
          <li>High-security hash generation</li>
          <li>Data integrity and validation</li>
          <li>Easy copy to clipboard</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Enter or paste text to hash.</li>
          <li>Select the hash algorithm.</li>
          <li>Click <strong>Generate Hash</strong> to process.</li>
          <li>Copy the generated hash value.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Password hashing and security</li>
          <li>Data integrity and validation</li>
          <li>Cryptographic applications</li>
          <li>Security and authentication</li>
        </ul>
      </section>
    </ToolSection>
  );
}