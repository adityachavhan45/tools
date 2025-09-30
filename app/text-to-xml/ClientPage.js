"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function TextToXmlPage() {
  const [text, setText] = useState("");
  const [xml, setXml] = useState("");
  const [message, setMessage] = useState("");

  function convertTextToXml() {
    if (!text.trim()) {
      setMessage("⚠️ Please enter text to convert to XML code.");
      return;
    }

    try {
      // Create a simple XML structure from the text
      const lines = text.split('\n');
      const xmlContent = lines.map((line, index) =>
        `    <line number="${index + 1}">${line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</line>`
      ).join('\n');

      const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Text to XML Conversion -->
<!-- Generated on: ${new Date().toISOString()} -->

<textData>
  <metadata>
    <totalLines>${lines.length}</totalLines>
    <totalCharacters>${text.length}</totalCharacters>
    <totalWords>${text.split(/\s+/).filter(word => word.length > 0).length}</totalWords>
    <createdAt>${new Date().toISOString()}</createdAt>
  </metadata>
  
  <content>
${xmlContent}
  </content>
  
  <statistics>
    <averageLineLength>${Math.round(text.length / lines.length)}</averageLineLength>
    <longestLine>${Math.max(...lines.map(line => line.length))}</longestLine>
    <shortestLine>${Math.min(...lines.map(line => line.length))}</shortestLine>
  </statistics>
</textData>`;

      setXml(xmlString);
      setMessage("✅ Text converted to XML code successfully!");
    } catch (error) {
      setMessage("❌ Error converting text to XML code.");
    }
  }

  function convertXmlToText() {
    if (!xml.trim()) {
      setMessage("⚠️ Please enter XML code to convert to text.");
      return;
    }

    try {
      // Simple XML to text conversion
      let extractedText = xml;

      // Extract text from XML elements
      const xmlMatches = extractedText.match(/<[^>]*>([^<]*)<\/[^>]*>/g);
      if (xmlMatches) {
        const textLines = xmlMatches.map(match => {
          const content = match.replace(/<[^>]*>/g, ''); // Remove XML tags
          return content.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        });
        extractedText = textLines.join('\n');
      } else {
        // If no XML elements, try to extract from comments and docstrings
        extractedText = extractedText.replace(/<!--.*?-->/gs, '');
        extractedText = extractedText.replace(/<[^>]*>/g, '');
        extractedText = extractedText.replace(/\s+/g, ' ').trim();
      }

      setText(extractedText);
      setMessage("✅ XML code converted to text successfully!");
    } catch (error) {
      setMessage("❌ Error converting XML code to text. Please check your XML format.");
    }
  }

  function copyText() {
    navigator.clipboard.writeText(text);
    setMessage("📋 Text copied to clipboard!");
  }

  function copyXml() {
    navigator.clipboard.writeText(xml);
    setMessage("📋 XML code copied to clipboard!");
  }

  function reset() {
    setText("");
    setXml("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Text to XML Converter"
      subtitle="Convert text to XML code and XML to text online. Free text to XML converter with formatting and validation support."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Text to XML Converter",
          description: "Convert text to XML code and XML to text online.",
          slug: "/text-to-xml",
          category: "Utilities/Text",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Text to XML Converter", slug: "/text-to-xml" },
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
            placeholder="Enter text to convert to XML code..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* XML Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter XML Code
          </label>
          <textarea
            value={xml}
            onChange={(e) => setXml(e.target.value)}
            placeholder="Enter XML code to convert to text..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter valid XML code
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={convertTextToXml}
            disabled={!text.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🔤 Text to XML
          </button>

          <button
            onClick={convertXmlToText}
            disabled={!xml.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-green-600 text-white shadow 
                       hover:bg-green-700 disabled:opacity-60"
          >
            📡 XML to Text
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

          {xml && (
            <button
              onClick={copyXml}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                         bg-purple-600 text-white shadow 
                         hover:bg-purple-700"
            >
              📋 Copy XML
            </button>
          )}

          <button
            onClick={reset}
            disabled={!text.trim() && !xml.trim()}
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

        {/* XML Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">About XML</h4>
          <div className="text-sm space-y-1">
            <div>• XML is a markup language for data storage and transport</div>
            <div>• Used for configuration files and data exchange</div>
            <div>• Supports hierarchical data structures</div>
            <div>• Commonly used with web services and APIs</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About Text to XML Converter</h3>
        <p className="text-gray-700 mb-4">
          The Text to XML Converter is a free online tool that allows you to transform plain text
          into well-structured XML code and also decode XML back into human-readable text. XML
          (Extensible Markup Language) is widely used across industries for configuration,
          communication, and structured data storage. With this tool, developers, students, and
          content creators can quickly build XML snippets, check formatting, and easily switch
          between raw text and markup code.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Instant conversion of text into XML format</li>
          <li>Decodes XML tags back to plain text</li>
          <li>Shows character, word, and line statistics</li>
          <li>Proper escaping of special characters (&lt;, &gt;, &amp;)</li>
          <li>Well-indented and readable XML output</li>
          <li>Easy copy-to-clipboard functionality</li>
          <li>Works directly in the browser without server uploads</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Enter or paste text into the input box.</li>
          <li>Click on <strong>Text to XML</strong> to generate a structured XML snippet.</li>
          <li>Alternatively, paste XML code in the XML box and click <strong>XML to Text</strong> to decode.</li>
          <li>Copy results with one click to use in your projects, APIs, or apps.</li>
          <li>Check the character analysis section for quick stats on your text.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>Data Exchange:</strong> Share structured data between different systems and platforms.</li>
          <li><strong>APIs:</strong> Work with SOAP-based web services that rely heavily on XML.</li>
          <li><strong>Configuration Files:</strong> Store application settings in XML format for flexibility.</li>
          <li><strong>Education:</strong> Learn XML basics through simple text-to-XML experiments.</li>
          <li><strong>Web Development:</strong> Create sitemaps, feeds, or config files.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🌍 Why XML Matters</h4>
        <p className="text-gray-700 mb-4">
          XML is one of the most versatile markup languages. Unlike JSON, which is popular today,
          XML remains crucial in enterprise environments, legacy systems, and industries like
          finance, healthcare, and telecom. It is self-descriptive, meaning tags can define data
          in a way that is both human- and machine-readable. From RSS feeds to Android app
          configurations, XML continues to play a key role in digital ecosystems.
        </p>

        <h4 className="font-semibold mt-4 mb-1">💡 Examples</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Text: <code>Hello World</code> → XML: <code>&lt;line number=&quot;1&quot;&gt;Hello World&lt;/line&gt;</code></li>
          <li>Text: <code>5 &lt; 10</code> → XML: <code>&lt;line number=&quot;1&quot;&gt;5 &amp;lt; 10&lt;/line&gt;</code></li>
          <li>Multiple lines become sequential XML elements with line numbers.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🙋 Frequently Asked Questions</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>Can I use this tool offline?</strong> Yes, it works completely in your browser without internet once loaded.</li>
          <li><strong>Does it validate XML?</strong> The tool ensures basic structure and escaping, but for full validation, you may use an XML schema (XSD).</li>
          <li><strong>Which industries use XML?</strong> Finance (SWIFT messages), publishing (EPUB format), mobile apps (Android layouts), and web feeds (RSS/Atom).</li>
          <li><strong>Does it support Unicode?</strong> Yes, it supports all languages including Hindi, Chinese, Arabic, and emojis.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🚀 Final Thoughts</h4>
        <p className="text-gray-700">
          This Text to XML Converter is a must-have utility for developers, students,
          and professionals who deal with structured data. It simplifies the process
          of generating clean XML code from raw text, while also making it easy to
          extract text from existing XML files. Whether you are building an API,
          configuring software, or learning markup languages, this tool saves time,
          reduces errors, and improves productivity. Try it now and experience hassle-free
          text-to-XML conversion!
        </p>
      </section>
    </ToolSection>
  );
}