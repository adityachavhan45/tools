"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function TextToYamlPage() {
  const [text, setText] = useState("");
  const [yaml, setYaml] = useState("");
  const [message, setMessage] = useState("");

  function convertTextToYaml() {
    if (!text.trim()) {
      setMessage("⚠️ Please enter text to convert to YAML code.");
      return;
    }

    try {
      // Create a simple YAML structure from the text
      const lines = text.split('\n');
      const yamlContent = lines.map((line, index) =>
        `  - "${line.replace(/"/g, '\\"')}"`
      ).join('\n');

      const yamlString = `# Text to YAML Conversion
# Generated on: ${new Date().toISOString()}

text_data:
  metadata:
    total_lines: ${lines.length}
    total_characters: ${text.length}
    total_words: ${text.split(/\s+/).filter(word => word.length > 0).length}
    created_at: "${new Date().toISOString()}"
  
  lines:
${yamlContent}
  
  statistics:
    average_line_length: ${Math.round(text.length / lines.length)}
    longest_line: ${Math.max(...lines.map(line => line.length))}
    shortest_line: ${Math.min(...lines.map(line => line.length))}`;

      setYaml(yamlString);
      setMessage("✅ Text converted to YAML code successfully!");
    } catch (error) {
      setMessage("❌ Error converting text to YAML code.");
    }
  }

  function convertYamlToText() {
    if (!yaml.trim()) {
      setMessage("⚠️ Please enter YAML code to convert to text.");
      return;
    }

    try {
      // Simple YAML to text conversion
      let extractedText = yaml;

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
        extractedText = extractedText.replace(/^\s*[a-zA-Z_][a-zA-Z0-9_]*\s*:/gm, '');
        extractedText = extractedText.replace(/^\s*-\s*/gm, '');
        extractedText = extractedText.replace(/\s+/g, ' ').trim();
      }

      setText(extractedText);
      setMessage("✅ YAML code converted to text successfully!");
    } catch (error) {
      setMessage("❌ Error converting YAML code to text. Please check your YAML format.");
    }
  }

  function copyText() {
    navigator.clipboard.writeText(text);
    setMessage("📋 Text copied to clipboard!");
  }

  function copyYaml() {
    navigator.clipboard.writeText(yaml);
    setMessage("📋 YAML code copied to clipboard!");
  }

  function reset() {
    setText("");
    setYaml("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Text to YAML Converter"
      subtitle="Convert text to YAML code and YAML to text online. Free text to YAML converter with formatting and validation support."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Text to YAML Converter",
          description: "Convert text to YAML code and YAML to text online.",
          slug: "/text-to-yaml",
          category: "Utilities/Text",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Text to YAML Converter", slug: "/text-to-yaml" },
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
            placeholder="Enter text to convert to YAML code..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* YAML Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter YAML Code
          </label>
          <textarea
            value={yaml}
            onChange={(e) => setYaml(e.target.value)}
            placeholder="Enter YAML code to convert to text..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter valid YAML code
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={convertTextToYaml}
            disabled={!text.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🔤 Text to YAML
          </button>

          <button
            onClick={convertYamlToText}
            disabled={!yaml.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-green-600 text-white shadow 
                       hover:bg-green-700 disabled:opacity-60"
          >
            📡 YAML to Text
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

          {yaml && (
            <button
              onClick={copyYaml}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                         bg-purple-600 text-white shadow 
                         hover:bg-purple-700"
            >
              📋 Copy YAML
            </button>
          )}

          <button
            onClick={reset}
            disabled={!text.trim() && !yaml.trim()}
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

        {/* YAML Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">About YAML</h4>
          <div className="text-sm space-y-1">
            <div>• YAML is a human-readable data serialization language</div>
            <div>• Used for configuration files and data exchange</div>
            <div>• Supports complex data structures</div>
            <div>• Commonly used with Docker, Kubernetes, and CI/CD</div>
          </div>
        </div>
      </div>

      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About Text to YAML Converter</h3>
        <p className="text-gray-700 mb-4">
          The Text to YAML Converter is a free online tool designed to transform plain
          text into YAML code and decode YAML back into readable text. YAML
          (short for “YAML Ain’t Markup Language”) is one of the most popular
          data serialization languages, known for its simplicity and human-friendly
          syntax. With this tool, developers, DevOps engineers, students, and
          content creators can quickly generate YAML structures, validate formatting,
          and seamlessly switch between raw text and YAML code.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Instant conversion of text into structured YAML format</li>
          <li>Reverse conversion from YAML back to plain text</li>
          <li>Character, word, and line count statistics</li>
          <li>Proper handling of quotes and special characters</li>
          <li>Well-indented and clean YAML output</li>
          <li>Copy-to-clipboard functionality for easy usage</li>
          <li>Works directly in the browser without uploads</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Enter or paste your text into the input field.</li>
          <li>Click on <strong>Text to YAML</strong> to generate YAML code.</li>
          <li>To decode, paste YAML in the YAML box and click <strong>YAML to Text</strong>.</li>
          <li>Copy results instantly to use in projects or configuration files.</li>
          <li>Review character analysis for quick stats on your text.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>Configuration Files:</strong> YAML is widely used in Docker Compose, Kubernetes manifests, and CI/CD pipelines.</li>
          <li><strong>Data Serialization:</strong> Share structured data between applications and services.</li>
          <li><strong>Infrastructure as Code:</strong> Tools like Ansible and Helm charts rely on YAML for automation scripts.</li>
          <li><strong>Education:</strong> Learn YAML basics by converting simple text into valid YAML documents.</li>
          <li><strong>Web Development:</strong> Create environment variables or structured config for frameworks.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🌍 Why YAML Matters</h4>
        <p className="text-gray-700 mb-4">
          YAML has become the go-to format in DevOps and cloud-native ecosystems.
          Its indentation-based structure makes it easy for humans to read and write,
          while still being machine-parsable. Unlike JSON or XML, YAML is concise
          and removes unnecessary brackets or tags, making it more approachable for
          beginners. From Docker Compose to GitHub Actions and Kubernetes, YAML
          powers much of today’s modern infrastructure.
        </p>

        <h4 className="font-semibold mt-4 mb-1">💡 Examples</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Text: <code>Hello World</code> → YAML: <code>- &quot;Hello World&quot;</code></li>
          <li>Text with multiple lines becomes a YAML array of strings.</li>
          <li>Statistics such as total lines and longest line are automatically included in the YAML output.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🙋 Frequently Asked Questions</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>Is YAML the same as JSON?</strong> No. YAML is more human-readable but can be converted to JSON easily.</li>
          <li><strong>Where is YAML used?</strong> In DevOps (Kubernetes, Docker), APIs, software configs, and CI/CD pipelines.</li>
          <li><strong>Does this tool validate YAML?</strong> It generates properly indented YAML, but full validation may require a linter.</li>
          <li><strong>Can YAML handle nested data?</strong> Yes, YAML supports lists, maps, and nested structures.</li>
          <li><strong>Does it support Unicode?</strong> Yes, it works with all languages including Hindi, Arabic, Chinese, and emojis.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🚀 Final Thoughts</h4>
        <p className="text-gray-700">
          The Text to YAML Converter is a powerful yet lightweight tool that simplifies
          the process of creating clean YAML from plain text and vice versa. Whether
          you are writing Docker Compose files, setting up Kubernetes clusters,
          managing CI/CD pipelines, or just learning YAML basics, this tool saves time,
          reduces formatting errors, and improves productivity. Try it today to
          experience hassle-free text-to-YAML conversion!
        </p>
      </section>
    </ToolSection>
  );
}