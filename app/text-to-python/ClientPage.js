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
          The Text to Python Converter is a free online utility designed to help you
          transform plain text into Python code and decode Python scripts back into
          human-readable text. Python is one of the most popular programming languages
          in the world, widely used for web development, data science, automation,
          machine learning, and scripting. With this converter, you can quickly generate
          Python arrays or code snippets from raw text, or extract simple text from
          existing Python files for review, learning, or debugging. Whether you are a
          beginner experimenting with code or a professional developer, this tool saves
          you time and ensures cleaner, more structured outputs.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Convert plain text into Python arrays or functions instantly</li>
          <li>Decode Python code back into text for readability</li>
          <li>Automatically escape special characters and line breaks</li>
          <li>Show character, word, and line statistics for analysis</li>
          <li>One-click copy buttons for both text and Python outputs</li>
          <li>Lightweight and fast — works directly in your browser</li>
          <li>Ideal for developers, students, data analysts, and coders</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Enter your text in the <strong>Text</strong> field.</li>
          <li>Click <strong>Text to Python</strong> to generate Python code instantly.</li>
          <li>Paste Python code into the <strong>Python</strong> field and click
            <strong> Python to Text</strong> to decode it.</li>
          <li>Use the copy buttons to copy results directly to your clipboard.</li>
          <li>Check the character analysis section for word and line statistics.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Common Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>Learning Python:</strong> Beginners can understand how text is represented in code.</li>
          <li><strong>Debugging:</strong> Developers can extract raw strings from Python scripts.</li>
          <li><strong>Data Processing:</strong> Convert logs or notes into structured Python lists.</li>
          <li><strong>Automation:</strong> Generate Python snippets quickly for repeated tasks.</li>
          <li><strong>Content Management:</strong> Extract text content from Python scripts for documentation.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">📊 Why Python?</h4>
        <p className="text-gray-700 mb-4">
          Python has become the go-to language for developers because of its simplicity
          and versatility. It is beginner-friendly yet powerful enough for advanced
          machine learning and artificial intelligence projects. Companies like Google,
          Netflix, and NASA rely on Python for automation, data processing, and
          high-performance applications. By converting text into Python, you can
          generate code snippets for educational projects, backend systems, or data
          pipelines. Similarly, decoding Python into plain text is helpful for reviewing
          large scripts, extracting useful information, or preparing documentation.
        </p>

        <h4 className="font-semibold mt-4 mb-1">🙋 Frequently Asked Questions</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>What is this tool used for?</strong> It converts plain text into
            Python code snippets and also decodes Python code back into text.</li>
          <li><strong>Is it safe?</strong> Yes, 100% safe — all conversions are processed
            locally in your browser.</li>
          <li><strong>Can I use this output in real projects?</strong> Yes, but you should
            customize the generated code for production use.</li>
          <li><strong>Does it support complex Python functions?</strong> The converter focuses
            on arrays and text processing. More complex logic should be added manually.</li>
          <li><strong>Is Python better than PHP or JavaScript?</strong> Each language has
            its strengths — Python is best for data science and automation, PHP for
            server-side web apps, and JavaScript for interactive frontends.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🚀 Final Thoughts</h4>
        <p className="text-gray-700">
          The Text to Python Converter is a simple yet powerful assistant for anyone
          working with code. From classroom practice to professional projects, this
          tool helps transform raw text into Python structures in seconds. Instead of
          manually typing arrays or extracting strings, you can save time and improve
          accuracy by using this free converter. Whether you’re learning Python for the
          first time or handling complex data-driven workflows, this tool ensures a
          smooth experience. Try it today and make your text instantly Python-ready!
        </p>
      </section>
    </ToolSection>
  );
}