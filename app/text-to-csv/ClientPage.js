"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function TextToCsvPage() {
  const [text, setText] = useState("");
  const [csv, setCsv] = useState("");
  const [message, setMessage] = useState("");
  const [delimiter, setDelimiter] = useState("comma");
  const [includeHeaders, setIncludeHeaders] = useState(true);

  function convertTextToCsv() {
    if (!text.trim()) {
      setMessage("⚠️ Please enter text to convert to CSV.");
      return;
    }

    try {
      const lines = text.split('\n').filter(line => line.trim());
      const delimiterChar = delimiter === 'comma' ? ',' : delimiter === 'semicolon' ? ';' : '\t';
      
      let csvContent = '';
      
      if (includeHeaders) {
        csvContent = `"Line Number"${delimiterChar}"Content"${delimiterChar}"Character Count"${delimiterChar}"Word Count"\n`;
      }
      
      csvContent += lines.map((line, index) => {
        const escapedLine = `"${line.replace(/"/g, '""')}"`;
        const charCount = line.length;
        const wordCount = line.split(/\s+/).filter(word => word.length > 0).length;
        return `"${index + 1}"${delimiterChar}${escapedLine}${delimiterChar}"${charCount}"${delimiterChar}"${wordCount}"`;
      }).join('\n');

      setCsv(csvContent);
      setMessage("✅ Text successfully converted to CSV!");
    } catch (error) {
      setMessage("❌ Error converting text to CSV. Please try again.");
    }
  }

  function convertCsvToText() {
    if (!csv.trim()) {
      setMessage("⚠️ Please enter CSV code to convert to text.");
      return;
    }

    try {
      const lines = csv.split('\n').filter(line => line.trim());
      const extractedLines = [];
      
      for (const line of lines) {
        if (line.toLowerCase().includes('line number') || 
            line.toLowerCase().includes('content') || 
            line.toLowerCase().includes('character count')) {
          continue;
        }
        
        const matches = line.match(/"([^"\\]*(\\.[^"\\]*)*)"/g);
        if (matches && matches.length >= 2) {
          const content = matches[1].slice(1, -1).replace(/""/g, '"');
          if (content && !content.match(/^\d+$/)) {
            extractedLines.push(content);
          }
        }
      }

      if (extractedLines.length === 0) {
        throw new Error("No valid CSV content found");
      }

      setText(extractedLines.join('\n'));
      setMessage("✅ CSV successfully converted to text!");
    } catch (error) {
      setMessage("❌ Error converting CSV to text. Please check the format.");
    }
  }

  function copyText() {
    if (!text) {
      setMessage("⚠️ There is no text to copy.");
      return;
    }
    navigator.clipboard.writeText(text);
    setMessage("📋 Text copied to clipboard!");
  }

  function copyCsv() {
    if (!csv) {
      setMessage("⚠️ There is no CSV output to copy.");
      return;
    }
    navigator.clipboard.writeText(csv);
    setMessage("📋 CSV code copied to clipboard!");
  }

  function downloadCsv() {
    if (!csv) {
      setMessage("⚠️ There is no CSV to download.");
      return;
    }
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'converted-data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setMessage("📥 CSV file downloaded successfully!");
  }

  function reset() {
    setText("");
    setCsv("");
    setMessage("🧹 All fields cleared!");
    setTimeout(() => setMessage(""), 2000);
  }

  const textStats = {
    chars: text.length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    lines: text ? text.split('\n').filter(l => l.trim()).length : 0
  };

  const csvStats = {
    rows: csv ? csv.split('\n').filter(l => l.trim()).length : 0,
    hasHeaders: includeHeaders
  };

  return (
    <ToolSection
      title="Text to CSV Converter - Free Online Tool"
      subtitle="Convert text to CSV format and decode CSV back to text instantly. Free online CSV converter with custom delimiters, headers, and download options."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Text to CSV Converter",
          description: "Convert text to CSV format and CSV to text with custom delimiter support and download options.",
          slug: "/text-to-csv",
          category: "Utilities/Text",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Text to CSV Converter", slug: "/text-to-csv" },
        ])}
      />

      {/* Main Tool Section */}
      <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl shadow-lg p-6 md:p-8 mb-8">
        <div className="space-y-6">
          {/* Status Messages */}
          {message && (
            <div className={`px-4 py-3 rounded-xl shadow-sm border-l-4 ${
              message.includes('✅') 
                ? 'bg-green-50 border-green-500' 
                : message.includes('⚠️')
                ? 'bg-yellow-50 border-yellow-500'
                : message.includes('📋') || message.includes('📥')
                ? 'bg-blue-50 border-blue-500'
                : 'bg-red-50 border-red-500'
            }`}>
              <p className="text-sm font-medium text-gray-800">{message}</p>
            </div>
          )}

          {/* Conversion Areas Grid */}
          <div className="grid gap-5 lg:grid-cols-2">
            {/* Text Input */}
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-gray-700" htmlFor="text-input">
                  📝 Plain Text
                </label>
                {text && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    {textStats.lines} lines
                  </span>
                )}
              </div>
              <textarea
                id="text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to convert to CSV... Each line will become a row."
                className="w-full min-h-48 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base resize-y"
              />
              <p className="mt-2 text-xs text-gray-500">
                Each line of text will be converted into a CSV row with metadata
              </p>
            </div>

            {/* CSV Output */}
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-gray-700" htmlFor="csv-input">
                  📊 CSV Format
                </label>
                {csv && (
                  <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full">
                    {csvStats.rows} rows
                  </span>
                )}
              </div>
              <textarea
                id="csv-input"
                value={csv}
                onChange={(e) => setCsv(e.target.value)}
                placeholder="CSV output will appear here or paste CSV to decode..."
                className="w-full min-h-48 px-4 py-3 border-2 border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-y"
              />
              <p className="mt-2 text-xs text-gray-500">
                Standard CSV format with proper escaping and delimiters
              </p>
            </div>
          </div>

          {/* CSV Options */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-200">
            <h4 className="text-sm font-bold text-purple-900 mb-3 flex items-center gap-2">
              <span className="text-xl">⚙️</span>
              CSV Options
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  Column Delimiter
                </label>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="delimiter"
                      value="comma"
                      checked={delimiter === 'comma'}
                      onChange={(e) => setDelimiter(e.target.value)}
                      className="w-4 h-4 text-green-600"
                    />
                    <span className="text-sm text-gray-700">
                      Comma <span className="text-xs text-gray-500">(,) - Standard</span>
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="delimiter"
                      value="semicolon"
                      checked={delimiter === 'semicolon'}
                      onChange={(e) => setDelimiter(e.target.value)}
                      className="w-4 h-4 text-green-600"
                    />
                    <span className="text-sm text-gray-700">
                      Semicolon <span className="text-xs text-gray-500">(;) - European</span>
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="delimiter"
                      value="tab"
                      checked={delimiter === 'tab'}
                      onChange={(e) => setDelimiter(e.target.value)}
                      className="w-4 h-4 text-green-600"
                    />
                    <span className="text-sm text-gray-700">
                      Tab <span className="text-xs text-gray-500">(TSV format)</span>
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  Additional Options
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeHeaders}
                    onChange={(e) => setIncludeHeaders(e.target.checked)}
                    className="w-4 h-4 text-green-600 rounded"
                  />
                  <span className="text-sm text-gray-700">
                    Include header row
                  </span>
                </label>
                <p className="text-xs text-gray-500 mt-2 ml-6">
                  Adds column names as the first row
                </p>
              </div>
            </div>
          </div>

          {/* Statistics Display */}
          {text && (
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-200">
              <h4 className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
                <span className="text-xl">📊</span>
                Text Statistics
              </h4>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                  <div className="text-xs text-gray-600 mb-1">Total Lines</div>
                  <div className="text-2xl font-bold text-green-600">{textStats.lines}</div>
                  <div className="text-xs text-gray-500">will be rows</div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                  <div className="text-xs text-gray-600 mb-1">Characters</div>
                  <div className="text-2xl font-bold text-teal-600">{textStats.chars}</div>
                  <div className="text-xs text-gray-500">total chars</div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                  <div className="text-xs text-gray-600 mb-1">Words</div>
                  <div className="text-2xl font-bold text-blue-600">{textStats.words}</div>
                  <div className="text-xs text-gray-500">word count</div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                  <div className="text-xs text-gray-600 mb-1">CSV Rows</div>
                  <div className="text-2xl font-bold text-purple-600">{csvStats.rows}</div>
                  <div className="text-xs text-gray-500">
                    {csvStats.hasHeaders ? 'with header' : 'no header'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={convertTextToCsv}
              disabled={!text.trim()}
              className={`flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-base shadow-lg transition-all duration-200
                ${!text.trim()
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-600 to-teal-600 text-white hover:from-green-700 hover:to-teal-700 transform hover:scale-105"}`}
            >
              ➡️ Text to CSV
            </button>

            <button
              onClick={convertCsvToText}
              disabled={!csv.trim()}
              className={`flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-base shadow-lg transition-all duration-200
                ${!csv.trim()
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700 transform hover:scale-105"}`}
            >
              ⬅️ CSV to Text
            </button>

            <button
              onClick={copyText}
              disabled={!text}
              className={`px-6 py-3 rounded-xl font-semibold text-base shadow-lg transition-all duration-200
                ${!text
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105"}`}
            >
              📋 Copy Text
            </button>

            <button
              onClick={copyCsv}
              disabled={!csv}
              className={`px-6 py-3 rounded-xl font-semibold text-base shadow-lg transition-all duration-200
                ${!csv
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-purple-600 text-white hover:bg-purple-700 transform hover:scale-105"}`}
            >
              📋 Copy CSV
            </button>

            <button
              onClick={downloadCsv}
              disabled={!csv}
              className={`px-6 py-3 rounded-xl font-semibold text-base shadow-lg transition-all duration-200
                ${!csv
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 transform hover:scale-105"}`}
            >
              📥 Download CSV
            </button>

            <button
              onClick={reset}
              disabled={!text && !csv}
              className={`px-6 py-3 rounded-xl font-semibold text-base shadow-lg transition-all duration-200
                ${!text && !csv
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400"}`}
            >
              🔄 Reset All
            </button>
          </div>

          {/* Quick Reference Card */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-5 border border-orange-200">
            <h4 className="text-base font-bold text-orange-900 mb-3 flex items-center gap-2">
              <span className="text-xl">💡</span>
              CSV Format Examples
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="bg-white rounded-lg p-3">
                <div className="font-semibold text-gray-900 mb-1">Simple Text</div>
                <div className="text-gray-600 text-xs">Hello World → "Hello World"</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="font-semibold text-gray-900 mb-1">With Comma</div>
                <div className="text-gray-600 text-xs">A, B, C → "A, B, C"</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="font-semibold text-gray-900 mb-1">With Quotes</div>
                <div className="text-gray-600 text-xs">Say "Hi" → "Say ""Hi"""</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="font-semibold text-gray-900 mb-1">Numbers</div>
                <div className="text-gray-600 text-xs">123 → "123"</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Information Section */}
      <article className="prose prose-lg max-w-none">
        <section className="bg-white rounded-2xl shadow-md p-6 md:p-10 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Understanding CSV: The Universal Data Exchange Format
          </h2>
          
          <div className="text-gray-700 leading-relaxed space-y-5" style={{ textAlign: 'justify' }}>
            <p>
              CSV (Comma-Separated Values) represents one of the oldest and most widely adopted file formats for storing and exchanging tabular data between different applications, platforms, and programming languages. Despite its simplicity—or perhaps because of it—CSV has remained the de facto standard for data interchange since its introduction in the early days of personal computing. The format organizes information into rows and columns using plain text, with commas (or other delimiters) separating individual field values and line breaks delineating separate records. This straightforward structure enables virtually any software application to read, write, and process CSV files without requiring complex parsers or proprietary libraries, making CSV an essential tool for data professionals, developers, analysts, and business users worldwide.
            </p>

            <p>
              The historical development of CSV traces back to early database management systems and spreadsheet applications that needed portable methods for exporting and importing data across different computing environments. Before standardized file formats existed, each database or spreadsheet program used proprietary binary formats that other applications couldn't read, severely limiting data portability and collaboration. CSV emerged as a pragmatic solution allowing data export from one application and import into another regardless of vendor, operating system, or underlying technology. This interoperability proved so valuable that CSV quickly became ubiquitous across business computing, scientific research, government data publishing, and countless other domains requiring reliable data exchange mechanisms.
            </p>

            <p>
              Modern applications of CSV extend far beyond simple data transfer to encompass critical roles in big data processing, machine learning workflows, web application development, and business intelligence systems. Data scientists regularly work with CSV files containing millions of rows when preparing datasets for analysis, using programming languages like Python, R, or Julia that provide powerful CSV parsing libraries. Web developers export database query results to CSV for download features in administrative interfaces or reporting dashboards. Business analysts extract CSV data from enterprise systems for spreadsheet analysis, visualization, or presentation to stakeholders. Government agencies publish public datasets in CSV format to ensure maximum accessibility across diverse user communities with varying technical capabilities and tool preferences.
            </p>

            <p>
              Understanding CSV formatting conventions and best practices proves essential for anyone working with data, as seemingly minor formatting issues can cause import failures, data corruption, or misinterpretation. Special characters like commas within field values require proper escaping through quotation marks to prevent parsers from incorrectly splitting single fields into multiple columns. Quotation marks themselves must be escaped by doubling them when they appear within quoted fields. Line breaks within fields need careful handling to maintain data integrity. Different applications sometimes use varying delimiters—semicolons in European locales where commas serve as decimal separators, tabs for TSV (Tab-Separated Values) format—requiring awareness of these variations when exchanging data internationally or across different software ecosystems.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-md p-6 md:p-10 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Professional Applications of CSV Conversion
          </h2>
          
          <div className="text-gray-700 leading-relaxed space-y-5" style={{ textAlign: 'justify' }}>
            <p>
              Business intelligence and analytics workflows depend heavily on CSV files for moving data between analysis tools, visualization platforms, and reporting systems. Analysts extract data from databases, APIs, or enterprise applications into CSV format for manipulation in spreadsheet software like Microsoft Excel or Google Sheets where they can apply formulas, create pivot tables, and generate charts. Business intelligence platforms import CSV files to populate dashboards displaying key performance indicators, sales metrics, or operational statistics. Marketing teams export campaign performance data as CSV for analysis across multiple tools, combining metrics from advertising platforms, web analytics, and customer relationship management systems into unified datasets enabling comprehensive performance evaluation and strategic planning.
            </p>

            <p>
              Database administration and data migration projects utilize CSV as an intermediary format when transferring information between different database management systems. DBAs export table contents to CSV from source databases, then import those files into target systems, enabling migrations between MySQL and PostgreSQL, Oracle and SQL Server, or on-premises databases and cloud platforms. This approach works regardless of underlying database architectures since CSV provides a neutral format all database systems can produce and consume. Data warehouse ETL (Extract, Transform, Load) processes frequently incorporate CSV files as temporary storage during complex transformation operations, writing intermediate results to CSV files between processing stages before loading final data into analytical databases.
            </p>

            <p>
              Scientific research and academic studies employ CSV extensively for sharing experimental data, survey results, and research findings with colleagues, collaborators, and the broader research community. Researchers export data from laboratory information management systems, statistical analysis software, or custom data collection tools into CSV files that accompany published papers, enabling independent verification of results and facilitating meta-analyses combining data across multiple studies. Open science initiatives mandate sharing research data in accessible formats, with CSV ranking among the most widely accepted due to its simplicity and longevity. Citizen science projects collect volunteer contributions through web forms or mobile applications, aggregating submitted data into CSV files for analysis by professional researchers.
            </p>

            <p>
              Software development and web application projects incorporate CSV functionality for data import/export features, configuration file management, and testing data generation. Developers implement CSV export options allowing users to download data from web applications for offline analysis or record keeping. Configuration management sometimes uses CSV files for storing application settings, user preferences, or system parameters in human-readable formats that administrators can edit with text editors or spreadsheets. Automated testing frameworks generate test data as CSV files that test runners import to verify application behavior across diverse input scenarios. API development includes CSV response formats alongside JSON and XML, accommodating clients preferring tabular data representations suitable for direct spreadsheet import.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-md p-6 md:p-10 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions About CSV Conversion
          </h2>
          
          <div className="space-y-6" style={{ textAlign: 'justify' }}>
            <div className="border-l-4 border-green-500 pl-6 py-3 bg-green-50 rounded-r-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What is the difference between CSV and Excel files?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                CSV and Excel files serve similar purposes for storing tabular data but differ fundamentally in format and capabilities. CSV files use plain text format storing only raw data values separated by delimiters, while Excel files (.xlsx or .xls) use complex binary formats supporting advanced features like formulas, formatting, charts, multiple worksheets, and cell styling. CSV's simplicity enables universal compatibility across virtually all applications and programming languages, while Excel files require specific libraries or Excel software for processing. CSV files typically consume less storage space and transfer faster over networks, but Excel's rich features make it more suitable for complex spreadsheet work. For data exchange between different systems, CSV generally provides better interoperability.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-6 py-3 bg-green-50 rounded-r-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                How do I handle commas within my data when converting to CSV?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                This CSV converter automatically handles commas and other special characters within your text by enclosing all field values in quotation marks, following standard CSV escaping conventions. When your text contains commas, the converter wraps that content in double quotes, preventing CSV parsers from incorrectly interpreting those commas as field separators. For example, the text "apples, oranges, and bananas" converts to the CSV field "apples, oranges, and bananas" with quotes preserved in the output. If your text already contains quotation marks, the converter doubles them (replacing " with "") to escape properly.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-6 py-3 bg-green-50 rounded-r-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Which delimiter should I choose for my CSV file?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Delimiter selection depends primarily on your target application, regional preferences, and data content characteristics. Use standard comma delimiters for North American and English-language contexts where most software expects comma-separated format. Choose semicolon delimiters for European applications or locales using commas as decimal separators, ensuring compatibility with regional Excel and spreadsheet software preferences. Select tab delimiters when your data naturally contains both commas and semicolons, avoiding delimiter conflicts that complicate parsing.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-6 py-3 bg-green-50 rounded-r-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Is this CSV converter free without usage restrictions?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Yes, this CSV converter is completely free with absolutely no usage limitations, registration requirements, or hidden costs. Convert unlimited text to CSV and decode unlimited CSV files as frequently as needed for any purpose including personal, educational, or commercial applications. The converter operates entirely in your browser without backend infrastructure costs. Access the converter anytime from any device with a modern web browser, enjoying full functionality including multiple delimiter options and download capabilities without restrictions.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl shadow-md p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Start Converting Text to CSV Today
          </h2>
          
          <div className="text-gray-700 leading-relaxed space-y-5" style={{ textAlign: 'justify' }}>
            <p>
              CSV format serves as the universal language of data exchange, enabling seamless information transfer between spreadsheets, databases, programming languages, and business applications across all industries and technical domains. Understanding CSV conversion empowers data professionals, business analysts, researchers, developers, and everyday users to move information efficiently between tools while maintaining data integrity and format compatibility.
            </p>

            <p>
              Try the CSV converter now and experience how effortless data structuring can be. Enter your text, configure delimiter preferences, generate professional CSV output, and download or copy results for immediate use in your projects. Start converting today and unlock the power of CSV for organizing, sharing, and analyzing information across the digital landscape.
            </p>
          </div>
        </section>
      </article>
    </ToolSection>
  );
}