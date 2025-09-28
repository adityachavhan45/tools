"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function TextToPythonPage() {
  const [text, setText] = useState("");
  const [python, setPython] = useState("");
  const [message, setMessage] = useState("");

  function convertTextToPython() {
    if (!text.trim()) {
      setMessage("⚠️ Please enter text to convert to Python code.");
      return;
    }

    try {
      // Create a simple Python structure from the text
      const lines = text.split('\n');
      const pythonContent = lines.map((line, index) => 
        `    "${line.replace(/"/g, '\\"')}"`
      ).join(',\n');

      const pythonString = `# Text to Python Conversion
# Generated on: ${new Date().toISOString()}

def process_text():
    text_lines = [
${pythonContent}
    ]
    
    # Text analysis
    total_lines = len(text_lines)
    total_chars = sum(len(line) for line in text_lines)
    total_words = sum(len(line.split()) for line in text_lines)
    
    print(f"Total lines: {total_lines}")
    print(f"Total characters: {total_chars}")
    print(f"Total words: {total_words}")
    
    # Return the text lines
    return text_lines

def main():
    lines = process_text()
    
    # Print each line
    for i, line in enumerate(lines, 1):
        print(f"Line {i}: {line}")

if __name__ == "__main__":
    main()`;

      setPython(pythonString);
      setMessage("✅ Text converted to Python code successfully!");
    } catch (error) {
      setMessage("❌ Error converting text to Python code.");
    }
  }

  function convertPythonToText() {
    if (!python.trim()) {
      setMessage("⚠️ Please enter Python code to convert to text.");
      return;
    }

    try {
      // Simple Python to text conversion
      let extractedText = python;
      
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
        extractedText = extractedText.replace(/#.*$/gm, '');
        extractedText = extractedText.replace(/""".*?"""/gs, '');
        extractedText = extractedText.replace(/'''.*?'''/gs, '');
        extractedText = extractedText.replace(/^\s*[a-zA-Z_][a-zA-Z0-9_]*\s*\(.*?\)\s*:/gm, '');
        extractedText = extractedText.replace(/^\s*[a-zA-Z_][a-zA-Z0-9_]*\s*=/gm, '');
        extractedText = extractedText.replace(/\s+/g, ' ').trim();
      }

      setText(extractedText);
      setMessage("✅ Python code converted to text successfully!");
    } catch (error) {
      setMessage("❌ Error converting Python code to text. Please check your Python format.");
    }
  }

  function copyText() {
    navigator.clipboard.writeText(text);
    setMessage("📋 Text copied to clipboard!");
  }

  function copyPython() {
    navigator.clipboard.writeText(python);
    setMessage("📋 Python code copied to clipboard!");
  }

  function reset() {
    setText("");
    setPython("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Text to Python Converter"
      subtitle="Convert text to Python code and Python to text online. Free text to Python converter with formatting and validation support."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Text to Python Converter",
          description: "Convert text to Python code and Python to text online.",
          slug: "/text-to-python",
          category: "Utilities/Text",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Text to Python Converter", slug: "/text-to-python" },
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
            placeholder="Enter text to convert to Python code..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Python Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Python Code
          </label>
          <textarea
            value={python}
            onChange={(e) => setPython(e.target.value)}
            placeholder="Enter Python code to convert to text..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter valid Python code
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={convertTextToPython}
            disabled={!text.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🔤 Text to Python
          </button>

          <button
            onClick={convertPythonToText}
            disabled={!python.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-green-600 text-white shadow 
                       hover:bg-green-700 disabled:opacity-60"
          >
            📡 Python to Text
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

          {python && (
            <button
              onClick={copyPython}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                         bg-purple-600 text-white shadow 
                         hover:bg-purple-700"
            >
              📋 Copy Python
            </button>
          )}

          <button
            onClick={reset}
            disabled={!text.trim() && !python.trim()}
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

        {/* Python Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">About Python</h4>
          <div className="text-sm space-y-1">
            <div>• Python is a high-level programming language</div>
            <div>• Used for web development, data science, and automation</div>
            <div>• Supports object-oriented and functional programming</div>
            <div>• Known for its simple and readable syntax</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About Text to Python Converter</h3>
        <p className="text-gray-700 mb-4">
          Convert text to Python code and Python to text. This tool helps you create 
          structured Python code from plain text and extract text content from Python 
          scripts, useful for programming and data analysis.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Convert text to Python code</li>
          <li>Extract text from Python scripts</li>
          <li>Character analysis and statistics</li>
          <li>Python formatting and validation</li>
          <li>Easy copy to clipboard</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Enter text in the text field and click <strong>Text to Python</strong>.</li>
          <li>Or enter Python code in the Python field and click <strong>Python to Text</strong>.</li>
          <li>Use the copy buttons to copy results to clipboard.</li>
          <li>Review the character analysis for additional information.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Programming and development</li>
          <li>Data science and analysis</li>
          <li>Automation and scripting</li>
          <li>Text to code conversion</li>
        </ul>
      </section>
    </ToolSection>
  );
}