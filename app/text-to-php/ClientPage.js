"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function TextToPhpPage() {
  const [text, setText] = useState("");
  const [php, setPhp] = useState("");
  const [message, setMessage] = useState("");

  function convertTextToPhp() {
    if (!text.trim()) {
      setMessage("⚠️ Please enter text to convert to PHP code.");
      return;
    }

    try {
      // Create a simple PHP structure from the text
      const lines = text.split('\n');
      const phpContent = lines.map((line, index) =>
        `    "${line.replace(/"/g, '\\"')}"`
      ).join(',\n');

      const phpString = `<?php
// Text to PHP Conversion
// Generated on: ${new Date().toISOString()}

function processText() {
    $textLines = [
${phpContent}
    ];
    
    // Text analysis
    $totalLines = count($textLines);
    $totalChars = array_sum(array_map('strlen', $textLines));
    $totalWords = array_sum(array_map(function($line) { 
        return str_word_count($line); 
    }, $textLines));
    
    echo "Total lines: " . $totalLines . "\\n";
    echo "Total characters: " . $totalChars . "\\n";
    echo "Total words: " . $totalWords . "\\n";
    
    // Return the text lines
    return $textLines;
}

function main() {
    $lines = processText();
    
    // Print each line
    foreach ($lines as $index => $line) {
        echo "Line " . ($index + 1) . ": " . $line . "\\n";
    }
}

// Run the main function
main();
?>`;

      setPhp(phpString);
      setMessage("✅ Text converted to PHP code successfully!");
    } catch (error) {
      setMessage("❌ Error converting text to PHP code.");
    }
  }

  function convertPhpToText() {
    if (!php.trim()) {
      setMessage("⚠️ Please enter PHP code to convert to text.");
      return;
    }

    try {
      // Simple PHP to text conversion
      let extractedText = php;

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
      setMessage("✅ PHP code converted to text successfully!");
    } catch (error) {
      setMessage("❌ Error converting PHP code to text. Please check your PHP format.");
    }
  }

  function copyText() {
    navigator.clipboard.writeText(text);
    setMessage("📋 Text copied to clipboard!");
  }

  function copyPhp() {
    navigator.clipboard.writeText(php);
    setMessage("📋 PHP code copied to clipboard!");
  }

  function reset() {
    setText("");
    setPhp("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Text to PHP Converter"
      subtitle="Convert text to PHP code and PHP to text online. Free text to PHP converter with formatting and validation support."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Text to PHP Converter",
          description: "Convert text to PHP code and PHP to text online.",
          slug: "/text-to-php",
          category: "Utilities/Text",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Text to PHP Converter", slug: "/text-to-php" },
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
            placeholder="Enter text to convert to PHP code..."
            className="w-full min-h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-y"
          />
        </div>

        {/* PHP Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter PHP Code
          </label>
          <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm whitespace-pre-wrap min-h-32">
            {php || "PHP output will appear here..."}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Enter valid PHP code
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={convertTextToPhp}
            disabled={!text.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🔤 Text to PHP
          </button>

          <button
            onClick={convertPhpToText}
            disabled={!php.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-green-600 text-white shadow 
                       hover:bg-green-700 disabled:opacity-60"
          >
            📡 PHP to Text
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

          {php && (
            <button
              onClick={copyPhp}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                         bg-purple-600 text-white shadow 
                         hover:bg-purple-700"
            >
              📋 Copy PHP
            </button>
          )}

          <button
            onClick={reset}
            disabled={!text.trim() && !php.trim()}
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

        {/* PHP Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">About PHP</h4>
          <div className="text-sm space-y-1">
            <div>• PHP is a server-side scripting language</div>
            <div>• Used for web development and dynamic content</div>
            <div>• Supports object-oriented and procedural programming</div>
            <div>• Commonly used with MySQL databases</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About Text to PHP Converter</h3>
        <p className="text-gray-700 mb-4">
          The Text to PHP Converter is a free online tool that allows you to transform
          plain text into structured PHP code and decode PHP scripts back into human-readable
          text. PHP (Hypertext Preprocessor) is one of the most widely used server-side scripting
          languages, powering millions of websites and applications across the globe.
          With this converter, you can quickly prepare PHP code snippets from raw text,
          or extract text from PHP for debugging, learning, or analysis. Whether you are a
          beginner experimenting with code or an experienced developer handling production
          scripts, this tool saves valuable time by reducing manual effort.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Instantly convert plain text into valid PHP arrays and scripts</li>
          <li>Decode PHP code back into simple text for easy readability</li>
          <li>Automatic handling of escape characters and line breaks</li>
          <li>Character, word, and line statistics for better text analysis</li>
          <li>One-click copy buttons for both text and PHP outputs</li>
          <li>Lightweight and fast — works entirely in your browser</li>
          <li>Useful for developers, students, content managers, and analysts</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Enter your text into the <strong>Text</strong> input field.</li>
          <li>Click <strong>Text to PHP</strong> to generate a PHP script.</li>
          <li>Paste PHP code into the <strong>PHP</strong> field and click
            <strong> PHP to Text</strong> to decode it.</li>
          <li>Use the copy buttons to copy results to your clipboard instantly.</li>
          <li>Review the character analysis section for detailed metrics.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Common Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>Learning PHP:</strong> Beginners can see how text converts into arrays and functions.</li>
          <li><strong>Debugging:</strong> Extract text strings from PHP scripts for quick testing.</li>
          <li><strong>Data Processing:</strong> Prepare structured arrays from plain notes or logs.</li>
          <li><strong>Web Development:</strong> Quickly generate PHP snippets for dynamic content.</li>
          <li><strong>Server-Side Applications:</strong> Handle user input or stored text in PHP format.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">📊 Why Use PHP?</h4>
        <p className="text-gray-700 mb-4">
          PHP has been the backbone of server-side web development for over two decades.
          It is open-source, easy to learn, and integrates seamlessly with HTML, CSS,
          and databases like MySQL. Popular content management systems such as WordPress,
          Drupal, and Joomla are built with PHP. By converting text into PHP code, you
          can create dynamic pages, store data in arrays, or prepare scripts for backend
          processing. Similarly, decoding PHP into text helps with understanding scripts,
          documentation, and debugging complex codebases.
        </p>

        <h4 className="font-semibold mt-4 mb-1">🙋 Frequently Asked Questions</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>What is this tool used for?</strong> To convert plain text into PHP
            code snippets and decode PHP back into text.</li>
          <li><strong>Is it safe?</strong> Yes, 100% safe — all processing happens in your browser,
            no data is uploaded to servers.</li>
          <li><strong>Can I use the output in real projects?</strong> Yes, but you should
            review and customize the code for production environments.</li>
          <li><strong>Does it support PHP functions?</strong> The converter generates arrays and
            echo statements; complex logic must be added manually.</li>
          <li><strong>What’s the difference between PHP and JavaScript?</strong> PHP runs
            on the server, while JavaScript usually runs in the browser.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🚀 Final Thoughts</h4>
        <p className="text-gray-700">
          The Text to PHP Converter is more than just a code generator — it is a
          time-saving assistant for web developers, students, and analysts. Instead of
          manually writing boilerplate PHP code or extracting strings, you can achieve
          the same results instantly with this tool. From classroom practice to
          production projects, it enhances productivity and accuracy. Try converting
          your own text today and see how easily it becomes structured PHP code ready
          for real-world applications.
        </p>
      </section>
    </ToolSection>
  );
}
