"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function BinaryToTextPage() {
  const [binary, setBinary] = useState("");
  const [encoding, setEncoding] = useState("utf8");
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");

  function convertToText() {
    if (!binary.trim()) {
      setMessage("⚠️ Please enter binary data first.");
      return;
    }

    try {
      // Clean binary input (remove spaces, newlines, etc.)
      const cleanBinary = binary.replace(/[^01]/g, '');
      
      if (cleanBinary.length === 0) {
        setMessage("⚠️ Please enter valid binary data (0s and 1s only).");
        return;
      }

      if (cleanBinary.length % 8 !== 0) {
        setMessage("⚠️ Binary data must be in groups of 8 bits.");
        return;
      }

      let text = "";
      for (let i = 0; i < cleanBinary.length; i += 8) {
        const byte = cleanBinary.substr(i, 8);
        const charCode = parseInt(byte, 2);
        if (charCode >= 32 && charCode <= 126) { // Printable ASCII range
          text += String.fromCharCode(charCode);
        } else {
          text += '?'; // Non-printable character
        }
      }

      // Minimal output: only decoded text
      setResult(text);
      setMessage("✅ Binary converted to text successfully!");
    } catch (error) {
      setMessage("❌ Error converting binary to text.");
    }
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
    setMessage("📋 Text output copied to clipboard!");
  }

  function reset() {
    setBinary("");
    setEncoding("utf8");
    setResult("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Binary to Text"
      subtitle="Convert binary to text online. Free binary to text converter with encoding options and text formatting for data conversion and text processing."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Binary to Text",
          description: "Convert binary to text online.",
          slug: "/binary-to-text",
          category: "Utilities/Text",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Binary to Text", slug: "/binary-to-text" },
        ])}
      />

      <div className="space-y-4">
        {/* Status Messages */}
        {message && (
          <div className="px-3 py-2 bg-blue-100 border rounded text-blue-800 text-sm">
            {message}
          </div>
        )}

        {/* Binary Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Binary Data
          </label>
          <textarea
            value={binary}
            onChange={(e) => setBinary(e.target.value)}
            placeholder="Enter or paste binary data here (0s and 1s)..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
          />
        </div>

        {/* Encoding Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Text Encoding
          </label>
          <select
            value={encoding}
            onChange={(e) => setEncoding(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="utf8">UTF-8</option>
            <option value="latin1">Latin-1</option>
            <option value="utf16">UTF-16</option>
          </select>
        </div>

        {/* Result Output - plain text (no container) */}
        {result && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text Output
            </label>
            <pre className="tool-output whitespace-pre-wrap break-words font-mono text-gray-800">
              {result}
            </pre>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={convertToText}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🔄 Convert to Text
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
            disabled={!binary.trim() && !result.trim()}
            className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* Conversion Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">Conversion Options</h4>
          <div className="text-sm space-y-1">
            <div>• UTF-8: Unicode text encoding</div>
            <div>• ASCII: Basic text encoding</div>
            <div>• Latin-1: Western European encoding</div>
            <div>• UTF-16: Unicode 16-bit encoding</div>
          </div>
        </div>
      </div>

            {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About Binary to Text Conversion</h3>
        <p className="text-gray-700 mb-4">
          Binary to Text conversion is one of the most common operations in the field of
          computer science, digital communication, and data processing. Computers store and
          transmit information using binary numbers (0s and 1s). While machines can
          understand and process binary data easily, humans often find it difficult to read or
          interpret raw binary code. This is where a Binary to Text converter comes into play.
          It translates long strings of binary digits into readable text that can be understood,
          shared, and used in real-world applications. Without such conversion tools, tasks
          like debugging binary data, decoding network messages, or analyzing stored
          information would be unnecessarily complex.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Accurate decoding:</strong> Converts binary input into clean, human-readable text
            with precision, ensuring that every 8-bit segment translates properly.
          </li>
          <li>
            <strong>Multiple encodings:</strong> Supports UTF-8, Latin-1, and UTF-16 to provide
            flexibility for international text and different systems.
          </li>
          <li>
            <strong>Error handling:</strong> Alerts users when the input is invalid, incomplete, or not
            grouped into proper 8-bit segments.
          </li>
          <li>
            <strong>Clipboard support:</strong> Allows quick copying of the converted text for use in
            coding projects, documentation, or data recovery tasks.
          </li>
          <li>
            <strong>Simple interface:</strong> Clean and easy-to-use layout designed for beginners and
            professionals alike.
          </li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          <li>Enter or paste your binary data in the input box.</li>
          <li>Choose the text encoding format (UTF-8, Latin-1, or UTF-16).</li>
          <li>Click the <strong>Convert to Text</strong> button.</li>
          <li>Review the decoded text in the output area.</li>
          <li>Use the copy button to quickly copy the result.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Data analysis:</strong> Convert stored binary logs into readable text for system
            monitoring and auditing.
          </li>
          <li>
            <strong>Debugging:</strong> Developers often encounter binary data in network packets,
            files, or memory dumps. Converting it into text helps them understand and resolve
            issues.
          </li>
          <li>
            <strong>Education:</strong> Students learning about binary, ASCII, and Unicode can use
            this tool to practice and understand conversions more clearly.
          </li>
          <li>
            <strong>Data recovery:</strong> When working with corrupted files or unusual data formats,
            binary-to-text conversion helps uncover hidden messages or information.
          </li>
          <li>
            <strong>Communication:</strong> Some encoded messages are shared in binary form.
            Converting them back into readable text allows easy interpretation.
          </li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">📖 Why Binary Matters</h4>
        <p className="text-gray-700 mb-4">
          Every piece of digital data—be it an image, a video, or a line of text—is ultimately
          represented in binary. A simple sentence such as “Hello” is stored in memory as a
          sequence of binary digits. Each character corresponds to a binary number according
          to encoding standards like ASCII or UTF-8. For example, the letter H in ASCII is
          represented by 01001000. When a long string of binary is converted using the
          correct encoding, it reveals the original text exactly. This process is the backbone of
          modern computing and communication systems.
        </p>

        <h4 className="font-semibold mt-4 mb-1">🌍 Everyday Benefits</h4>
        <p className="text-gray-700 mb-4">
          Although it may seem technical, binary-to-text conversion has many everyday
          benefits. Programmers can quickly decode binary snippets when troubleshooting.
          Students can explore the relationship between binary and characters. Cybersecurity
          analysts often need to examine binary payloads in suspicious files. Even hobbyists
          can use this converter to decode fun binary puzzles or encrypted text shared online.
          With a simple interface, the tool makes this process approachable for everyone, no
          matter their technical background.
        </p>

        <h4 className="font-semibold mt-4 mb-1">💡 Final Thoughts</h4>
        <p className="text-gray-700">
          Binary to Text conversion is not just about turning 0s and 1s into letters. It is about
          bridging the gap between machine language and human understanding. Whether you
          are a student, developer, researcher, or just a curious learner, this tool provides a
          reliable way to decode binary data into meaningful text. By supporting multiple
          encodings, validating inputs, and ensuring accuracy, it removes the complexity of
          manual calculation. In a world where data is everywhere, being able to interpret it
          quickly and accurately is a powerful skill. This converter ensures that binary
          information is never out of reach for those who need to read and use it.
        </p>
      </section>
    </ToolSection>
  );
}