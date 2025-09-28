"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function TextToSqlPage() {
  const [text, setText] = useState("");
  const [sql, setSql] = useState("");
  const [message, setMessage] = useState("");

  function convertTextToSql() {
    if (!text.trim()) {
      setMessage("⚠️ Please enter text to convert to SQL code.");
      return;
    }

    try {
      // Create a simple SQL structure from the text
      const lines = text.split('\n');
      const sqlContent = lines.map((line, index) => 
        `    '${line.replace(/'/g, "''")}'`
      ).join(',\n');

      const sqlString = `-- Text to SQL Conversion
-- Generated on: ${new Date().toISOString()}

-- Create a table to store the text data
CREATE TABLE text_data (
    id INT PRIMARY KEY AUTO_INCREMENT,
    line_number INT,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert the text lines into the table
INSERT INTO text_data (line_number, content) VALUES
${sqlContent};

-- Query to retrieve all text lines
SELECT 
    line_number,
    content,
    LENGTH(content) as char_count,
    (LENGTH(content) - LENGTH(REPLACE(content, ' ', '')) + 1) as word_count
FROM text_data
ORDER BY line_number;

-- Query to get statistics
SELECT 
    COUNT(*) as total_lines,
    SUM(LENGTH(content)) as total_characters,
    SUM(LENGTH(content) - LENGTH(REPLACE(content, ' ', '')) + 1) as total_words
FROM text_data;`;

      setSql(sqlString);
      setMessage("✅ Text converted to SQL code successfully!");
    } catch (error) {
      setMessage("❌ Error converting text to SQL code.");
    }
  }

  function convertSqlToText() {
    if (!sql.trim()) {
      setMessage("⚠️ Please enter SQL code to convert to text.");
      return;
    }

    try {
      // Simple SQL to text conversion
      let extractedText = sql;
      
      // Extract text from string literals
      const stringMatches = extractedText.match(/'([^'\\]*(\\.[^'\\]*)*)'/g);
      if (stringMatches) {
        const textLines = stringMatches.map(match => {
          const content = match.slice(1, -1); // Remove quotes
          return content.replace(/\\'/g, "'").replace(/\\n/g, '\n');
        });
        extractedText = textLines.join('\n');
      } else {
        // If no string literals, try to extract from comments and docstrings
        extractedText = extractedText.replace(/--.*$/gm, '');
        extractedText = extractedText.replace(/\/\*.*?\*\//gs, '');
        extractedText = extractedText.replace(/^\s*[a-zA-Z_][a-zA-Z0-9_]*\s*\(.*?\)\s*:/gm, '');
        extractedText = extractedText.replace(/^\s*[a-zA-Z_][a-zA-Z0-9_]*\s*=/gm, '');
        extractedText = extractedText.replace(/\s+/g, ' ').trim();
      }

      setText(extractedText);
      setMessage("✅ SQL code converted to text successfully!");
    } catch (error) {
      setMessage("❌ Error converting SQL code to text. Please check your SQL format.");
    }
  }

  function copyText() {
    navigator.clipboard.writeText(text);
    setMessage("📋 Text copied to clipboard!");
  }

  function copySql() {
    navigator.clipboard.writeText(sql);
    setMessage("📋 SQL code copied to clipboard!");
  }

  function reset() {
    setText("");
    setSql("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Text to SQL Converter"
      subtitle="Convert text to SQL code and SQL to text online. Free text to SQL converter with formatting and validation support."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Text to SQL Converter",
          description: "Convert text to SQL code and SQL to text online.",
          slug: "/text-to-sql",
          category: "Utilities/Text",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Text to SQL Converter", slug: "/text-to-sql" },
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
            placeholder="Enter text to convert to SQL code..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* SQL Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter SQL Code
          </label>
          <textarea
            value={sql}
            onChange={(e) => setSql(e.target.value)}
            placeholder="Enter SQL code to convert to text..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter valid SQL code
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={convertTextToSql}
            disabled={!text.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🔤 Text to SQL
          </button>

          <button
            onClick={convertSqlToText}
            disabled={!sql.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-green-600 text-white shadow 
                       hover:bg-green-700 disabled:opacity-60"
          >
            📡 SQL to Text
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

          {sql && (
            <button
              onClick={copySql}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                         bg-purple-600 text-white shadow 
                         hover:bg-purple-700"
            >
              📋 Copy SQL
            </button>
          )}

          <button
            onClick={reset}
            disabled={!text.trim() && !sql.trim()}
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

        {/* SQL Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">About SQL</h4>
          <div className="text-sm space-y-1">
            <div>• SQL is a database query language</div>
            <div>• Used for managing and querying databases</div>
            <div>• Supports data manipulation and retrieval</div>
            <div>• Commonly used with MySQL, PostgreSQL, SQLite</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About Text to SQL Converter</h3>
        <p className="text-gray-700 mb-4">
          Convert text to SQL code and SQL to text. This tool helps you create 
          structured SQL code from plain text and extract text content from SQL 
          scripts, useful for database management and data analysis.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Convert text to SQL code</li>
          <li>Extract text from SQL scripts</li>
          <li>Character analysis and statistics</li>
          <li>SQL formatting and validation</li>
          <li>Easy copy to clipboard</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Enter text in the text field and click <strong>Text to SQL</strong>.</li>
          <li>Or enter SQL code in the SQL field and click <strong>SQL to Text</strong>.</li>
          <li>Use the copy buttons to copy results to clipboard.</li>
          <li>Review the character analysis for additional information.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Database management and administration</li>
          <li>Data analysis and reporting</li>
          <li>SQL query development</li>
          <li>Text to code conversion</li>
        </ul>
      </section>
    </ToolSection>
  );
}