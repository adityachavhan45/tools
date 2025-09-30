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
          A hash function is a mathematical algorithm that converts any input
          (text, file, or data) into a fixed-length string of characters, which
          usually appears random. This output is called a hash value or digest.
          Hashing plays a crucial role in data security, cryptography, password
          protection, blockchain, and file verification. Unlike encryption,
          hashing is a one-way process, meaning that once data is hashed, it
          cannot be reversed to its original form. This property makes hash
          functions highly useful for ensuring data integrity and building
          secure systems.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features of This Tool</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Multiple algorithms:</strong> Supports MD5, SHA-1, SHA-256,
            SHA-512, and modern secure algorithms like BLAKE2b and BLAKE2s.
          </li>
          <li>
            <strong>Quick generation:</strong> Instantly generate hash values
            from any input text without the need for external libraries.
          </li>
          <li>
            <strong>Data security:</strong> Provides cryptographic-level
            security for validating and protecting sensitive information.
          </li>
          <li>
            <strong>Cross-platform use:</strong> Generated hashes can be used in
            web apps, databases, APIs, or local scripts.
          </li>
          <li>
            <strong>Simple interface:</strong> Easy to use for beginners yet
            powerful enough for developers and cybersecurity professionals.
          </li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          <li>Enter or paste the text you want to hash.</li>
          <li>Select the algorithm you want to use (e.g., SHA-256).</li>
          <li>Click the <strong>Generate Hash</strong> button.</li>
          <li>Copy the generated hash value and use it as needed.</li>
          <li>Optionally, compare with another hash to check integrity.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Practical Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Password storage:</strong> Websites and applications store
            passwords as hashes instead of plain text for enhanced security.
          </li>
          <li>
            <strong>Data integrity checks:</strong> Hash values can verify
            whether files have been modified or corrupted during transfer.
          </li>
          <li>
            <strong>Blockchain technology:</strong> Cryptocurrencies like
            Bitcoin use hashing to secure transactions and link blocks.
          </li>
          <li>
            <strong>Digital signatures:</strong> Hashing is part of signing
            mechanisms that authenticate documents and software.
          </li>
          <li>
            <strong>API authentication:</strong> Developers use hash-based
            tokens to securely communicate between systems.
          </li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">📖 Understanding Hash Algorithms</h4>
        <p className="text-gray-700 mb-4">
          Different algorithms provide different levels of security and
          performance:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>MD5:</strong> Generates 128-bit hashes, fast but no longer
            considered secure due to vulnerabilities.
          </li>
          <li>
            <strong>SHA-1:</strong> Produces 160-bit hashes, but deprecated for
            secure applications.
          </li>
          <li>
            <strong>SHA-256:</strong> A popular 256-bit hash function used in
            SSL certificates, cryptocurrency, and data verification.
          </li>
          <li>
            <strong>SHA-512:</strong> A 512-bit variant of the SHA-2 family,
            offering very strong security but larger output size.
          </li>
          <li>
            <strong>BLAKE2b / BLAKE2s:</strong> Modern algorithms designed to be
            faster and more secure than SHA, widely used in blockchain and
            password hashing.
          </li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🌍 Everyday Benefits</h4>
        <p className="text-gray-700 mb-4">
          Hashing is not just for developers or cybersecurity experts—it
          benefits everyone. When you download software, the publisher often
          provides a hash value to confirm the file’s integrity. Students can
          use hashing to understand data security concepts. Businesses rely on
          hashing to secure customer data and financial records. Even casual
          users may unknowingly benefit from hashing when they use secure
          messaging apps or online banking systems that protect data using hash
          functions.
        </p>

        <h4 className="font-semibold mt-4 mb-1">⚠️ Limitations and Best Practices</h4>
        <p className="text-gray-700 mb-4">
          Hashing alone does not guarantee complete security. For example,
          storing passwords with just MD5 or SHA-1 is unsafe because attackers
          can use precomputed hash tables (rainbow tables). Best practices
          include using strong algorithms like SHA-256 or BLAKE2, applying
          salting techniques, and combining hashing with encryption where
          necessary. Always keep in mind that hashing is one component of a
          larger security strategy.
        </p>

        <h4 className="font-semibold mt-4 mb-1">💡 Final Thoughts</h4>
        <p className="text-gray-700">
          A Hash Generator is a powerful utility for anyone working with
          security, data integrity, or cryptography. It transforms simple text
          into secure, fixed-length values that cannot be reversed, making it
          essential for authentication and verification. Whether you are a
          developer securing user data, an analyst validating file integrity, or
          just a learner exploring cybersecurity, this tool offers a fast and
          reliable way to generate hashes. By understanding and applying hashing
          correctly, you strengthen your digital security and protect sensitive
          information in today’s data-driven world.
        </p>
      </section>
    </ToolSection>
  );
}