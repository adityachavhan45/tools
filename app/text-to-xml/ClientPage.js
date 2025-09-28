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
          Convert text to XML code and XML to text. This tool helps you create 
          structured XML code from plain text and extract text content from XML 
          files, useful for data exchange and configuration management.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Convert text to XML code</li>
          <li>Extract text from XML files</li>
          <li>Character analysis and statistics</li>
          <li>XML formatting and validation</li>
          <li>Easy copy to clipboard</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Enter text in the text field and click <strong>Text to XML</strong>.</li>
          <li>Or enter XML code in the XML field and click <strong>XML to Text</strong>.</li>
          <li>Use the copy buttons to copy results to clipboard.</li>
          <li>Review the character analysis for additional information.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Data exchange and APIs</li>
          <li>Configuration management</li>
          <li>Web services and SOAP</li>
          <li>Text to code conversion</li>
        </ul>
      </section>
    </ToolSection>
  );
}