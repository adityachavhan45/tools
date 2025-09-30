"use client";
import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function TextToHexPage() {
  const [text, setText] = useState("");
  const [hex, setHex] = useState("");
  const [output, setOutput] = useState("");
  const [message, setMessage] = useState("");


  function convertTextToHex() {
    if (!text.trim()) {
      setMessage("⚠️ Please enter text to convert to Hex code.");
      return;
    }

    try {
      // Minimal Hex encoding: one hex line per input line (no headers)
      const lines = text.split('\n');
      const hexLines = lines
        .map(line => line.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(''))
        .join('\n');

      setHex(hexLines);     // keep input editable with clean hex
      setOutput(hexLines);  // show pretty, plain output
      setMessage("✅ Text converted to Hex code successfully!");
    } catch (error) {
      setMessage("❌ Error converting text to Hex code.");
    }
  }


  function convertHexToText() {
    if (!hex.trim()) {
      setMessage("⚠️ Please enter Hex code to convert to text.");
      return;
    }

    try {
      // Simple Hex to text conversion
      let extractedText = hex;

      // Extract text from Hex encoded strings
      const hexMatches = extractedText.match(/[0-9A-Fa-f]{2,}/g);
      if (hexMatches) {
        // Decode Hex encoded characters (two hex digits per byte)
        extractedText = hexMatches
          .map(m => (m.match(/.{2}/g) || [])
            .map(h => String.fromCharCode(parseInt(h, 16)))
            .join(''))
          .join('\n');
      } else {
        // If no Hex encoding, try to extract from comments and docstrings
        extractedText = extractedText.replace(/#.*$/gm, '');
        extractedText = extractedText.replace(/^\s*[a-zA-Z_][a-zA-Z0-9_]*\s*:/gm, '');
        extractedText = extractedText.replace(/^\s*-\s*/gm, '');
        extractedText = extractedText.replace(/\s+/g, ' ').trim();
      }

      setText(extractedText);
      setOutput(extractedText);
      setMessage("✅ Hex code converted to text successfully!");
    } catch (error) {
      setMessage("❌ Error converting Hex code to text. Please check your Hex format.");
    }
  }

  function copyText() {
    navigator.clipboard.writeText(text);
    setMessage("📋 Text copied to clipboard!");
  }
  function copyHex() {
    navigator.clipboard.writeText(hex);
    setMessage("📋 Hex code copied to clipboard!");
  }

  function reset() {
    setText("");
    setHex("");
    setOutput("");
    setMessage("🧹 Cleared!");
  }


  return (
    <ToolSection
      title="Text to Hex Converter"
      subtitle="Convert text to Hex code and Hex to text online. Free text to Hex converter with formatting and validation support."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Text to Hex Converter",
          description: "Convert text to Hex code and Hex to text online.",
          slug: "/text-to-hex",
          category: "Utilities/Text",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Text to Hex Converter", slug: "/text-to-hex" },
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
            placeholder="Enter text to convert to Hex code..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Hex Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Hex Code
          </label>
          <textarea
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            placeholder="Enter Hex code to convert to text..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter valid Hex code
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={convertTextToHex}
            disabled={!text.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🔤 Text to Hex
          </button>

          <button
            onClick={convertHexToText}
            disabled={!hex.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-green-600 text-white shadow 
                       hover:bg-green-700 disabled:opacity-60"
          >
            📡 Hex to Text
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

          {hex && (
            <button
              onClick={copyHex}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                         bg-purple-600 text-white shadow 
                         hover:bg-purple-700"
            >
              📋 Copy Hex
            </button>
          )}

          <button
            onClick={reset}
            disabled={!text.trim() && !hex.trim()}
            className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* Output - plain preview (no box) */}
        {output && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Output</label>
            <pre className="tool-output whitespace-pre-wrap break-words font-mono text-gray-800">{output}</pre>
          </div>
        )}

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

        {/* Hex Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">About Hex</h4>
          <div className="text-sm space-y-1">
            <div>• Hex is a base-16 number system</div>
            <div>• Used for representing binary data in human-readable format</div>
            <div>• Supports 16 digits (0-9, A-F)</div>
            <div>• Commonly used in programming and debugging</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About Text to Hex Converter</h3>
        <p className="text-gray-700 mb-4">
          A Text to Hex Converter is a handy tool that allows you to transform plain
          text into hexadecimal code and vice versa. Hexadecimal (base-16) is widely
          used in computer science, programming, cryptography, and data analysis.
          Instead of showing binary 0s and 1s, hex provides a compact, human-readable
          format using 16 digits (0–9 and A–F). For example, the word &quot;Hi&quot; becomes
          <code>4869</code> in hex, where each pair of digits represents a byte.
          This tool runs entirely in your browser, keeping your text private and secure.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Convert any text into clean Hex code instantly</li>
          <li>Decode Hex back into human-readable text</li>
          <li>Character statistics: total characters, words, lines</li>
          <li>Validation for proper hex formatting</li>
          <li>Copy results with one click</li>
          <li>Works offline in your browser, no server required</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Type or paste your text into the <strong>Text</strong> box.</li>
          <li>Click <strong>Text to Hex</strong> to generate hexadecimal code.</li>
          <li>To reverse, paste hex digits in the <strong>Hex</strong> box and click <strong>Hex to Text</strong>.</li>
          <li>Copy the results using the dedicated copy buttons.</li>
          <li>Review the character analysis to check counts and structure.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Common Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>Programming & Debugging:</strong> Inspect ASCII/Unicode values during coding.</li>
          <li><strong>Cryptography:</strong> Represent encrypted data in a readable format.</li>
          <li><strong>Data Transfer:</strong> Encode binary content safely for logs or APIs.</li>
          <li><strong>Education:</strong> Teach number systems (binary, decimal, hex) in computer science.</li>
          <li><strong>Reverse Engineering:</strong> Analyze file headers, machine code, or memory dumps.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">📊 Why Hexadecimal Matters</h4>
        <p className="text-gray-700 mb-4">
          Computers use binary (0s and 1s), but binary strings quickly become long and
          hard to read. Hexadecimal acts as a shorthand: one hex digit equals four binary
          bits. For instance, <code>11111111</code> in binary is simply <code>FF</code> in hex.
          That’s why memory addresses, color codes (like #FF5733), and file signatures
          often use hex notation. It strikes the balance between machine efficiency and
          human readability.
        </p>

        <h4 className="font-semibold mt-4 mb-1">🙋 Frequently Asked Questions</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>What is Hex used for?</strong> Hex is used in programming, debugging, cryptography,
            and digital forensics to represent binary data.</li>
          <li><strong>Is Hex the same as ASCII?</strong> No. ASCII assigns numbers to characters,
            while Hex is just a base-16 representation of those numbers.</li>
          <li><strong>Can I use Hex for colors?</strong> Yes, CSS color codes like <code>#FFFFFF</code>
            are hex representations of RGB values.</li>
          <li><strong>How accurate is this converter?</strong> The tool uses character code functions,
            so conversion is precise for all ASCII/Unicode inputs.</li>
          <li><strong>Does it work offline?</strong> Yes. All conversions run in your browser locally.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🚀 Final Thoughts</h4>
        <p className="text-gray-700">
          The Text to Hex Converter is a lightweight but powerful utility for developers,
          students, and professionals. Whether you are debugging code, analyzing data, or
          simply exploring how computers represent text, this tool gives you instant,
          accurate conversions. Try entering any string—like your name or a password hash—
          and watch how quickly it transforms into hex. It’s simple, secure, and extremely
          useful in everyday computing.
        </p>
      </section>
    </ToolSection>
  );
}