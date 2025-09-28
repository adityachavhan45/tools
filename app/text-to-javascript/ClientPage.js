"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function TextToJavascriptPage() {
  const [text, setText] = useState("");
  const [javascript, setJavascript] = useState("");
  const [message, setMessage] = useState("");

  function convertTextToJavascript() {
    if (!text.trim()) {
      setMessage("⚠️ Please enter text to convert to JavaScript code.");
      return;
    }

    try {
      // Create a simple JavaScript structure from the text
      const lines = text.split('\n');
      const jsContent = lines.map((line, index) => 
        `    "${line.replace(/"/g, '\\"')}"`
      ).join(',\n');

      const jsString = `// Text to JavaScript Conversion
// Generated on: ${new Date().toISOString()}

function processText() {
    const textLines = [
${jsContent}
    ];
    
    // Text analysis
    const totalLines = textLines.length;
    const totalChars = textLines.reduce((sum, line) => sum + line.length, 0);
    const totalWords = textLines.reduce((sum, line) => {
        return sum + (line.trim().split(/\\s+/).filter(word => word.length > 0).length);
    }, 0);
    
    console.log(\`Total lines: \${totalLines}\`);
    console.log(\`Total characters: \${totalChars}\`);
    console.log(\`Total words: \${totalWords}\`);
    
    // Return the text lines
    return textLines;
}

function main() {
    const lines = processText();
    
    // Print each line
    lines.forEach((line, index) => {
        console.log(\`Line \${index + 1}: \${line}\`);
    });
}

// Run the main function
main();`;

      setJavascript(jsString);
      setMessage("✅ Text converted to JavaScript code successfully!");
    } catch (error) {
      setMessage("❌ Error converting text to JavaScript code.");
    }
  }

  function convertJavascriptToText() {
    if (!javascript.trim()) {
      setMessage("⚠️ Please enter JavaScript code to convert to text.");
      return;
    }

    try {
      // Simple JavaScript to text conversion
      let extractedText = javascript;
      
      // Extract text from string literals
      const stringMatches = extractedText.match(/"([^"\\]*(\\.[^"\\]*)*)"/g);
      if (stringMatches) {
        const textLines = stringMatches.map(match => {
          const content = match.slice(1, -1); // Remove quotes
          return content.replace(/\\"/g, '"').replace(/\\n/g, '\n');
        });
        extractedText = textLines.join('\n');
      } else {
        // If no string literals, try to extract from comments and docstrings
        extractedText = extractedText.replace(/\/\/.*$/gm, '');
        extractedText = extractedText.replace(/\/\*.*?\*\//gs, '');
        extractedText = extractedText.replace(/^\s*[a-zA-Z_$][a-zA-Z0-9_$]*\s*\(.*?\)\s*{/gm, '');
        extractedText = extractedText.replace(/^\s*[a-zA-Z_$][a-zA-Z0-9_$]*\s*=/gm, '');
        extractedText = extractedText.replace(/\s+/g, ' ').trim();
      }

      setText(extractedText);
      setMessage("✅ JavaScript code converted to text successfully!");
    } catch (error) {
      setMessage("❌ Error converting JavaScript code to text. Please check your JavaScript format.");
    }
  }

  function copyText() {
    navigator.clipboard.writeText(text);
    setMessage("📋 Text copied to clipboard!");
  }

  function copyJavascript() {
    navigator.clipboard.writeText(javascript);
    setMessage("📋 JavaScript code copied to clipboard!");
  }

  function reset() {
    setText("");
    setJavascript("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Text to JavaScript Converter"
      subtitle="Convert text to JavaScript code and JavaScript to text online. Free text to JS converter with formatting and validation support."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Text to JavaScript Converter",
          description: "Convert text to JavaScript code and JavaScript to text online.",
          slug: "/text-to-javascript",
          category: "Utilities/Text",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Text to JavaScript Converter", slug: "/text-to-javascript" },
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
            placeholder="Enter text to convert to JavaScript code..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* JavaScript Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter JavaScript Code
          </label>
          <textarea
            value={javascript}
            onChange={(e) => setJavascript(e.target.value)}
            placeholder="Enter JavaScript code to convert to text..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter valid JavaScript code
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={convertTextToJavascript}
            disabled={!text.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🔤 Text to JS
          </button>

          <button
            onClick={convertJavascriptToText}
            disabled={!javascript.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-green-600 text-white shadow 
                       hover:bg-green-700 disabled:opacity-60"
          >
            📡 JS to Text
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

          {javascript && (
            <button
              onClick={copyJavascript}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                         bg-purple-600 text-white shadow 
                         hover:bg-purple-700"
            >
              📋 Copy JS
            </button>
          )}

          <button
            onClick={reset}
            disabled={!text.trim() && !javascript.trim()}
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

        {/* JavaScript Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">About JavaScript</h4>
          <div className="text-sm space-y-1">
            <div>• JavaScript is a client-side scripting language</div>
            <div>• Used for web development and interactive features</div>
            <div>• Supports object-oriented and functional programming</div>
            <div>• Runs in browsers and Node.js environments</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About Text to JavaScript Converter</h3>
        <p className="text-gray-700 mb-4">
          Convert text to JavaScript code and JavaScript to text. This tool helps you create 
          structured JavaScript code from plain text and extract text content from JavaScript 
          scripts, useful for web development and client-side programming.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Convert text to JavaScript code</li>
          <li>Extract text from JavaScript scripts</li>
          <li>Character analysis and statistics</li>
          <li>JavaScript formatting and validation</li>
          <li>Easy copy to clipboard</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Enter text in the text field and click <strong>Text to JS</strong>.</li>
          <li>Or enter JavaScript code in the JS field and click <strong>JS to Text</strong>.</li>
          <li>Use the copy buttons to copy results to clipboard.</li>
          <li>Review the character analysis for additional information.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Web development and programming</li>
          <li>Client-side scripting</li>
          <li>Data processing and analysis</li>
          <li>Text to code conversion</li>
        </ul>
      </section>
    </ToolSection>
  );
}