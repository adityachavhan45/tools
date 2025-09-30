"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function TextToBinaryPage() {
  const [text, setText] = useState("");
  const [binary, setBinary] = useState("");
  const [message, setMessage] = useState("");

  function convertTextToBinary() {
    if (!text.trim()) {
      setMessage("⚠️ Please enter text to convert to Binary code.");
      return;
    }

    try {
      // Create a simple Binary structure from the text
      const lines = text.split('\n');
      const binaryContent = lines.map((line, index) =>
        `    "${line.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join('')}"`
      ).join(',\n');

      const binaryString = `# Text to Binary Conversion
# Generated on: ${new Date().toISOString()}

# Binary Encoded Text Lines
${binaryContent}

# Statistics
# Total Lines: ${lines.length}
# Total Characters: ${text.length}
# Total Words: ${text.split(/\s+/).filter(word => word.length > 0).length}
# Average Line Length: ${Math.round(text.length / lines.length)}
# Longest Line: ${Math.max(...lines.map(line => line.length))}
# Shortest Line: ${Math.min(...lines.map(line => line.length))}

# Usage Examples
# Single line: ${lines[0]?.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join('') || ''}
# All lines: ${text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join('')}`;

      setBinary(binaryString);
      setMessage("✅ Text converted to Binary code successfully!");
    } catch (error) {
      setMessage("❌ Error converting text to Binary code.");
    }
  }

  function convertBinaryToText() {
    if (!binary.trim()) {
      setMessage("⚠️ Please enter Binary code to convert to text.");
      return;
    }

    try {
      // Simple Binary to text conversion
      let extractedText = binary;

      // Extract text from Binary encoded strings
      const binaryMatches = extractedText.match(/[01]{8,}/g);
      if (binaryMatches) {
        // Decode Binary encoded characters
        extractedText = binaryMatches.map(match => {
          const chars = match.match(/.{8}/g) || [];
          return chars.map(binary => String.fromCharCode(parseInt(binary, 2))).join('');
        }).join('\n');
      } else {
        // If no Binary encoding, try to extract from comments and docstrings
        extractedText = extractedText.replace(/#.*$/gm, '');
        extractedText = extractedText.replace(/^\s*[a-zA-Z_][a-zA-Z0-9_]*\s*:/gm, '');
        extractedText = extractedText.replace(/^\s*-\s*/gm, '');
        extractedText = extractedText.replace(/\s+/g, ' ').trim();
      }

      setText(extractedText);
      setMessage("✅ Binary code converted to text successfully!");
    } catch (error) {
      setMessage("❌ Error converting Binary code to text. Please check your Binary format.");
    }
  }

  function copyText() {
    navigator.clipboard.writeText(text);
    setMessage("📋 Text copied to clipboard!");
  }

  function copyBinary() {
    navigator.clipboard.writeText(binary);
    setMessage("📋 Binary code copied to clipboard!");
  }

  function reset() {
    setText("");
    setBinary("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Text to Binary Converter"
      subtitle="Convert text to Binary code and Binary to text online. Free text to Binary converter with formatting and validation support."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Text to Binary Converter",
          description: "Convert text to Binary code and Binary to text online.",
          slug: "/text-to-binary",
          category: "Utilities/Text",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Text to Binary Converter", slug: "/text-to-binary" },
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
            placeholder="Enter text to convert to Binary code..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Binary Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Binary Code
          </label>
          <textarea
            value={binary}
            onChange={(e) => setBinary(e.target.value)}
            placeholder="Enter Binary code to convert to text..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter valid Binary code
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={convertTextToBinary}
            disabled={!text.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🔤 Text to Binary
          </button>

          <button
            onClick={convertBinaryToText}
            disabled={!binary.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-green-600 text-white shadow 
                       hover:bg-green-700 disabled:opacity-60"
          >
            📡 Binary to Text
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

          {binary && (
            <button
              onClick={copyBinary}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                         bg-purple-600 text-white shadow 
                         hover:bg-purple-700"
            >
              📋 Copy Binary
            </button>
          )}

          <button
            onClick={reset}
            disabled={!text.trim() && !binary.trim()}
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

        {/* Binary Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">About Binary</h4>
          <div className="text-sm space-y-1">
            <div>• Binary is a base-2 number system</div>
            <div>• Used for representing data in computers</div>
            <div>• Supports only 0 and 1 digits</div>
            <div>• Commonly used in programming and data processing</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About Text to Binary Converter</h3>
        <p className="text-gray-700 mb-4">
          A Text to Binary Converter is a handy tool that allows you to transform
          human-readable text into binary code and decode binary back into plain
          text. Binary is the language of computers, based on only two digits: 0
          and 1. Every letter, number, symbol, and even images or sounds in
          computing are ultimately represented in binary form. With this converter,
          you can quickly explore how your text looks in binary format and
          understand how machines process information.
        </p>

        <p className="text-gray-700 mb-4">
          Binary encoding is fundamental to programming, electronics, and
          data science. For example, the character &quot;A&quot; has an ASCII code of 65,
          which in binary becomes 01000001. This tool handles those conversions
          instantly in your browser. Similarly, if you paste a sequence of binary
          digits, it decodes it back to text so you can verify or reuse it.
          Everything happens locally in your browser, ensuring privacy and
          security.
        </p>
        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Instant conversion between text and binary code</li>
          <li>Copy results with a single click</li>
          <li>Character analysis and word statistics</li>
          <li>Supports multiline text and bulk conversion</li>
          <li>Offline, browser-based, secure and free</li>
          <li>Simple interface for both beginners and developers</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Type or paste text in the input field.</li>
          <li>Click <strong>Text to Binary</strong> to generate binary output.</li>
          <li>Copy the result using the copy button.</li>
          <li>To decode, paste binary digits into the binary field.</li>
          <li>Click <strong>Binary to Text</strong> to get the plain text back.</li>
          <li>Use reset to clear fields anytime.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>Programming:</strong> Understand how characters are stored in binary at low level.</li>
          <li><strong>Learning:</strong> Students learning computer fundamentals can visualize text encoding.</li>
          <li><strong>Data Analysis:</strong> Useful for debugging encoded strings in software projects.</li>
          <li><strong>Networking:</strong> Binary often appears in packet inspection and protocol analysis.</li>
          <li><strong>Cryptography & Security:</strong> Explore binary representation for encoding/decoding tasks.</li>
          <li><strong>Fun & Education:</strong> Convert names, quotes, or secret messages into binary code.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">📊 Why Binary Matters</h4>
        <p className="text-gray-700 mb-4">
          Binary is the foundation of all modern computing. Every operation,
          from storing a file to streaming a video, relies on binary logic.
          Transistors inside processors understand only on (1) and off (0) states,
          and these form the building blocks of machine language. Even higher-level
          programming languages like Python, Java, or C++ are eventually compiled
          into binary instructions that the processor executes.
        </p>

        <p className="text-gray-700 mb-4">
          Learning binary is not just academic—it helps programmers, engineers,
          and students appreciate how data is represented internally. A simple
          &quot;hello&quot; in text becomes a string of 0s and 1s in binary. This conversion
          is also essential in areas like embedded systems, hardware design, and
          cryptographic algorithms.
        </p>

        <h4 className="font-semibold mt-4 mb-1">🙋 Frequently Asked Questions</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>Is binary only used by computers?</strong> Yes, but binary logic also appears in electronics, digital signals, and logical circuits.</li>
          <li><strong>Why 8 bits for each character?</strong> Because one byte (8 bits) can represent 256 unique values, enough for the ASCII character set.</li>
          <li><strong>Is binary same as machine code?</strong> Machine code is made of binary instructions, but binary can represent any type of data, not just instructions.</li>
          <li><strong>Does binary increase data size?</strong> Representing text in binary often makes it longer visually, but internally it is efficient for computation.</li>
          <li><strong>Can I use binary for secret messages?</strong> Yes, many people use binary to hide or encode text for fun, though it’s not encryption.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🚀 Final Thoughts</h4>
        <p className="text-gray-700">
          The Text to Binary Converter is a fast and reliable tool for students,
          programmers, and anyone curious about how digital systems work. Whether
          you are studying computer basics, debugging encoded text, or just
          exploring binary for fun, this converter makes the process easy and
          interactive. Try converting your name, favorite quote, or even a
          paragraph, and see how it transforms into a stream of 0s and 1s—the
          true language of machines.
        </p>
      </section>
    </ToolSection>
  );
}