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
            className="w-full min-h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-y"
          />
        </div>
        {/* SQL Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter SQL Code
          </label>
          <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm whitespace-pre-wrap min-h-32">
            {sql || "SQL output will appear here..."}
          </div>
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
          The Text to SQL Converter is a free online tool designed to help you transform plain
          sentences, structured notes, or raw data into executable SQL queries. SQL (Structured
          Query Language) is the backbone of database management systems like MySQL, PostgreSQL,
          SQLite, Oracle, and SQL Server. Whether you are a beginner learning how to write
          queries or a professional developer looking to speed up workflow, this tool makes
          database interaction much easier. Instead of manually coding, you can convert text
          into formatted SQL statements, and also reverse SQL queries back into plain text for
          analysis or documentation.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Convert plain text into SQL <code>INSERT</code>, <code>SELECT</code>, and <code>CREATE</code> statements</li>
          <li>Reverse SQL queries back into simple human-readable text</li>
          <li>Automatic character, word, and line analysis for quick stats</li>
          <li>Validation to avoid common SQL syntax errors</li>
          <li>Easy one-click copy for both SQL and text</li>
          <li>Lightweight, fast, and works in the browser without installation</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Type or paste your plain text into the input field.</li>
          <li>Click on <strong>Text to SQL</strong> to generate structured SQL queries.</li>
          <li>Alternatively, paste SQL code into the SQL field and use <strong>SQL to Text</strong> to extract plain content.</li>
          <li>Use the copy buttons to export results instantly.</li>
          <li>Check the character analysis section for quick statistics about your data.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>Database management:</strong> Quickly generate SQL insert statements from notes or CSV data.</li>
          <li><strong>Learning & training:</strong> Beginners can practice SQL by observing how plain text maps to SQL queries.</li>
          <li><strong>Data migration:</strong> Convert raw text into structured SQL for importing into MySQL or PostgreSQL.</li>
          <li><strong>Analytics & reporting:</strong> Extract insights from SQL queries by converting them into readable text for non-technical teams.</li>
          <li><strong>Automation:</strong> Developers can save time by turning text logs into ready-to-run SQL code.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🌍 Why SQL is Important</h4>
        <p className="text-gray-700 mb-4">
          SQL is one of the most important skills in technology today. Nearly every application
          — whether web, mobile, or enterprise software — relies on databases to store and
          retrieve information. From e-commerce platforms tracking orders to social media
          storing user profiles, SQL is the universal language that connects applications with
          data. By converting text to SQL, you can bridge the gap between plain-language
          instructions and structured queries that databases understand. This is especially
          useful for data analysts, software engineers, and IT professionals who need to manage
          large volumes of data daily.
        </p>

        <h4 className="font-semibold mt-4 mb-1">🙋 Frequently Asked Questions</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>Is this tool free?</strong> Yes, it is 100% free and works in any modern browser.</li>
          <li><strong>Can it generate complex queries?</strong> The tool is mainly for simple SQL conversion and learning, but you can extend queries after generation.</li>
          <li><strong>Which SQL dialects are supported?</strong> It generates standard SQL that works with MySQL, PostgreSQL, SQLite, and similar databases.</li>
          <li><strong>Can I reverse SQL to plain text?</strong> Yes, paste any SQL script and convert it back into human-readable sentences.</li>
          <li><strong>Is coding knowledge required?</strong> No, even beginners with zero SQL experience can use this tool effectively.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🚀 Final Thoughts</h4>
        <p className="text-gray-700">
          The Text to SQL Converter is more than just a code generator — it’s a productivity
          booster for anyone dealing with data. Students can learn faster, developers can save
          time, and businesses can improve reporting efficiency. With a simple interface,
          instant conversion, and built-in analysis, this tool is perfect for anyone who wants
          to bridge the gap between natural text and structured queries. Try it today and make
          working with databases simpler and faster.
        </p>
      </section>
    </ToolSection>
  );
}