"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function TextToUrlEncoderPage() {
  const [text, setText] = useState("");
  const [encoded, setEncoded] = useState("");
  const [message, setMessage] = useState("");
  const [encodeType, setEncodeType] = useState("standard"); // standard, component, full

  function encodeText() {
    if (!text.trim()) {
      setMessage("⚠️ Please enter text to encode.");
      return;
    }

    try {
      let result = "";
      
      if (encodeType === "standard") {
        result = encodeURIComponent(text);
      } else if (encodeType === "component") {
        result = encodeURIComponent(text);
      } else if (encodeType === "full") {
        result = encodeURI(text);
      }

      setEncoded(result);
      setMessage("✅ Text successfully encoded to URL format!");
    } catch (error) {
      setMessage("❌ Error encoding text. Please try again.");
    }
  }

  function decodeText() {
    if (!encoded.trim()) {
      setMessage("⚠️ Please enter encoded text to decode.");
      return;
    }

    try {
      const result = decodeURIComponent(encoded);
      setText(result);
      setMessage("✅ Successfully decoded URL to text!");
    } catch (error) {
      setMessage("❌ Error decoding. Please check your encoded text.");
    }
  }

  function copyToClipboard(content, type) {
    navigator.clipboard.writeText(content);
    setMessage(`📋 ${type} copied to clipboard!`);
  }

  function downloadEncoded() {
    const blob = new Blob([encoded], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `url-encoded_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage("📥 Encoded text downloaded successfully!");
  }

  function reset() {
    setText("");
    setEncoded("");
    setEncodeType("standard");
    setMessage("🧹 All fields cleared!");
  }

  const stats = {
    original: text.length,
    encoded: encoded.length,
    increase: encoded ? ((encoded.length - text.length) / text.length * 100).toFixed(1) : 0,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    specialChars: (text.match(/[^a-zA-Z0-9\s]/g) || []).length
  };

  return (
    <ToolSection
      title="Text to URL Encoder & Decoder - Free Online Tool"
      subtitle="Encode text to URL format and decode URL strings instantly. Perfect for web development, APIs, and safe data transmission."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Text to URL Encoder",
          description: "Free online tool to encode text to URL format and decode URL strings. Perfect for web development and APIs.",
          slug: "/text-to-url-encoder",
          category: "Utilities/Text",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Text to URL Encoder", slug: "/text-to-url-encoder" },
        ])}
      />

      <div className="max-w-5xl mx-auto space-y-6">
        {/* Status Message */}
        {message && (
          <div className="px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-green-800">{message}</p>
          </div>
        )}

        {/* Main Tool Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-teal-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white">URL Encoder & Decoder</h2>
            <p className="text-green-100 text-sm mt-1">Convert text to URL-safe format and back instantly</p>
          </div>

          <div className="p-6 space-y-5">
            {/* Encoding Type Selector */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🔧 Encoding Type
              </label>
              <div className="flex flex-wrap gap-3">
                <label className="flex items-center gap-2 px-4 py-2 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-all">
                  <input
                    type="radio"
                    name="encodeType"
                    value="standard"
                    checked={encodeType === "standard"}
                    onChange={(e) => setEncodeType(e.target.value)}
                    className="w-4 h-4 text-green-600"
                  />
                  <span className="text-sm font-medium">Standard (Recommended)</span>
                </label>
                <label className="flex items-center gap-2 px-4 py-2 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-all">
                  <input
                    type="radio"
                    name="encodeType"
                    value="component"
                    checked={encodeType === "component"}
                    onChange={(e) => setEncodeType(e.target.value)}
                    className="w-4 h-4 text-green-600"
                  />
                  <span className="text-sm font-medium">Component</span>
                </label>
                <label className="flex items-center gap-2 px-4 py-2 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-all">
                  <input
                    type="radio"
                    name="encodeType"
                    value="full"
                    checked={encodeType === "full"}
                    onChange={(e) => setEncodeType(e.target.value)}
                    className="w-4 h-4 text-green-600"
                  />
                  <span className="text-sm font-medium">Full URL</span>
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-1.5">Standard encoding works for most use cases</p>
            </div>

            {/* Text Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📝 Your Text
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your text here to encode...&#10;Example: Hello World! This is a test.&#10;Special characters like @, #, %, & will be encoded."
                className="w-full h-40 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 font-mono text-sm resize-none transition-all"
              />
              {text && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-lg text-green-600">{stats.original}</div>
                      <div className="text-gray-600 text-xs">Characters</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-teal-600">{stats.words}</div>
                      <div className="text-gray-600 text-xs">Words</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-blue-600">{stats.specialChars}</div>
                      <div className="text-gray-600 text-xs">Special Chars</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-purple-600">{stats.encoded}</div>
                      <div className="text-gray-600 text-xs">Encoded Size</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-orange-600">{stats.increase > 0 ? '+' : ''}{stats.increase}%</div>
                      <div className="text-gray-600 text-xs">Size Change</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={encodeText}
                disabled={!text.trim()}
                className="flex-1 min-w-[200px] px-6 py-3 rounded-lg bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold shadow-md hover:shadow-lg hover:from-green-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
              >
                🔒 Encode to URL
              </button>

              <button
                onClick={decodeText}
                disabled={!encoded.trim()}
                className="flex-1 min-w-[200px] px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
              >
                🔓 Decode from URL
              </button>

              <button
                onClick={reset}
                disabled={!text.trim() && !encoded.trim()}
                className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                🔄 Reset
              </button>
            </div>

            {/* Encoded Output */}
            {encoded && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🔐 URL Encoded Result
                </label>
                <div className="relative">
                  <div className="w-full px-4 py-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg font-mono text-sm break-all border-2 border-gray-300">
                    {encoded}
                  </div>
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => copyToClipboard(encoded, "Encoded text")}
                      className="px-3 py-1.5 bg-green-600 text-white text-xs rounded-md hover:bg-green-700 shadow transition-all"
                      title="Copy Encoded"
                    >
                      📋 Copy
                    </button>
                    <button
                      onClick={downloadEncoded}
                      className="px-3 py-1.5 bg-teal-600 text-white text-xs rounded-md hover:bg-teal-700 shadow transition-all"
                      title="Download"
                    >
                      📥 Download
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  ✓ URL-encoded text is safe to use in web addresses and API requests
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Examples */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200 shadow-sm">
          <h3 className="text-lg font-bold text-orange-900 mb-3 flex items-center gap-2">
            <span className="text-2xl">📚</span> Quick Examples
          </h3>
          <div className="space-y-3 text-sm">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="font-semibold text-gray-700 mb-1">Example 1: Simple Text</div>
              <div className="text-gray-600 mb-1">Original: <code className="bg-gray-100 px-2 py-1 rounded">Hello World!</code></div>
              <div className="text-gray-600">Encoded: <code className="bg-gray-100 px-2 py-1 rounded">Hello%20World%21</code></div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="font-semibold text-gray-700 mb-1">Example 2: Email Address</div>
              <div className="text-gray-600 mb-1">Original: <code className="bg-gray-100 px-2 py-1 rounded">user@example.com</code></div>
              <div className="text-gray-600">Encoded: <code className="bg-gray-100 px-2 py-1 rounded">user%40example.com</code></div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="font-semibold text-gray-700 mb-1">Example 3: Special Characters</div>
              <div className="text-gray-600 mb-1">Original: <code className="bg-gray-100 px-2 py-1 rounded">Price: $100 & Tax: 5%</code></div>
              <div className="text-gray-600">Encoded: <code className="bg-gray-100 px-2 py-1 rounded">Price%3A%20%24100%20%26%20Tax%3A%205%25</code></div>
            </div>
          </div>
        </div>

        {/* Comprehensive Information Section */}
        <article className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 md:p-10">
          <header className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Complete Guide to URL Encoding and Decoding</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-green-600 to-teal-600 rounded"></div>
          </header>

          <div className="prose max-w-none space-y-6 text-gray-700" style={{ textAlign: 'justify' }}>
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">What is URL Encoding and Why is it Essential?</h3>
              <p className="leading-relaxed mb-4">
                URL encoding, also known as percent-encoding, is a fundamental mechanism used in web technology to represent special characters in Uniform Resource Locators (URLs) in a safe and standardized manner. The World Wide Web operates on the principle that URLs should contain only a specific set of unreserved characters, which include letters (A-Z, a-z), digits (0-9), and a limited number of special characters like hyphens, underscores, periods, and tildes. Any character outside this safe set must be encoded to prevent misinterpretation by web browsers, servers, and network infrastructure.
              </p>
              <p className="leading-relaxed mb-4">
                When you enter a URL in your browser's address bar or when an application sends an HTTP request to a server, the URL acts as a precise instruction for locating and retrieving specific resources. However, URLs can break or malfunction if they contain spaces, non-ASCII characters, or reserved symbols that have special meaning in URL syntax. For instance, the ampersand symbol (&) is used to separate query parameters, the question mark (?) denotes the beginning of a query string, and the forward slash (/) separates different parts of a URL path. If these characters appear in actual data values rather than as structural elements, they must be encoded to distinguish them from their syntactical usage.
              </p>
              <p className="leading-relaxed mb-4">
                URL encoding replaces unsafe characters with a percent sign (%) followed by two hexadecimal digits representing the character's ASCII or UTF-8 code. For example, a space character is encoded as %20, an exclamation mark becomes %21, and the at symbol (@) is converted to %40. This encoding ensures that the URL remains valid and interpretable across different systems, operating systems, and network protocols. Without proper URL encoding, web applications would fail to transmit data correctly, leading to broken links, failed API calls, database errors, and security vulnerabilities.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Understanding Different Types of URL Encoding</h3>
              <p className="leading-relaxed mb-4">
                There are several methods of URL encoding, each serving different purposes in web development. The most common method is component encoding, implemented through the encodeURIComponent() function in JavaScript. This method encodes all characters except unreserved ones (A-Z, a-z, 0-9, hyphen, underscore, period, and tilde), making it ideal for encoding individual URL components such as query parameter values, form data, or user-generated content that will be embedded in URLs. Component encoding is the most aggressive form of encoding and ensures maximum safety when transmitting data through URLs.
              </p>
              <p className="leading-relaxed mb-4">
                Full URI encoding, implemented through the encodeURI() function, takes a more lenient approach. It preserves characters that have special meaning in URL syntax, such as colons, slashes, question marks, and ampersands, only encoding characters that would make the URL invalid. This method is useful when you want to encode an entire URL while maintaining its structural integrity. For example, if you need to pass a complete URL as a parameter to another URL, you would use full URI encoding to ensure the embedded URL remains functional while being safely transmitted.
              </p>
              <p className="leading-relaxed mb-4">
                Understanding the distinction between these encoding methods is crucial for web developers. Using component encoding when full URI encoding is needed can break URLs by encoding necessary structural characters. Conversely, using full URI encoding when component encoding is required can leave unsafe characters unencoded, potentially causing security issues or data corruption. The choice of encoding method depends on the specific use case and the nature of the data being transmitted. For most practical applications involving user input or data values, component encoding is the safer and recommended choice.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Real-World Applications and Use Cases</h3>
              <p className="leading-relaxed mb-4">
                URL encoding plays a critical role in modern web development across numerous scenarios. In web forms and search functionality, when users submit queries containing spaces or special characters, these inputs must be properly encoded before being appended to URLs. For example, when a user searches for "coffee & tea" on an e-commerce website, the search term must be encoded as "coffee%20%26%20tea" to create a valid URL like "example.com/search?q=coffee%20%26%20tea". Without encoding, the ampersand would be interpreted as a parameter separator, breaking the search functionality.
              </p>
              <p className="leading-relaxed mb-4">
                API integration and RESTful web services heavily depend on URL encoding for transmitting data between different systems. When making API calls that include user-generated content, email addresses, file paths, or complex data structures in URL parameters, proper encoding prevents errors and ensures data integrity. For instance, when authenticating users through OAuth or passing redirect URLs as parameters, encoding is essential to maintain the structure and validity of nested URLs. Social media sharing buttons, analytics tracking pixels, and third-party integrations all rely on URL encoding to function correctly.
              </p>
              <p className="leading-relaxed mb-4">
                Internationalization and multilingual web applications present unique challenges that URL encoding addresses effectively. When users input text in languages using non-Latin alphabets such as Chinese, Arabic, Hebrew, Korean, or Hindi, these characters must be encoded to ensure they can be transmitted through URLs that fundamentally operate on ASCII-based protocols. URL encoding converts these Unicode characters into percent-encoded sequences that can travel safely through the internet infrastructure. This capability is essential for global websites and applications serving diverse international audiences.
              </p>
              <p className="leading-relaxed mb-4">
                Security applications benefit significantly from URL encoding as well. When building web applications, developers must encode user input before including it in URLs to prevent various types of injection attacks. Cross-Site Scripting (XSS) attacks often exploit improperly encoded URLs to inject malicious scripts into web pages. By encoding all user-generated content before placing it in URLs, developers create a crucial defense layer against such vulnerabilities. Similarly, SQL injection attacks can be mitigated when URL parameters are properly encoded before being processed by backend systems.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">How Our URL Encoder Tool Works</h3>
              <p className="leading-relaxed mb-4">
                Our Text to URL Encoder provides a user-friendly interface for quickly and accurately encoding text into URL-safe format and decoding encoded URLs back to readable text. The tool operates entirely within your web browser using client-side JavaScript, ensuring your data never leaves your computer and maintaining complete privacy and security. When you enter text and click the encode button, the tool applies the appropriate encoding algorithm based on your selected encoding type, instantly transforming your text into percent-encoded format.
              </p>
              <p className="leading-relaxed mb-4">
                The tool offers three encoding modes to suit different requirements. Standard encoding provides the most comprehensive encoding suitable for general purposes and query parameters. Component encoding ensures all special characters are properly encoded for maximum safety when embedding data in URLs. Full URL encoding preserves URL structure while encoding only truly unsafe characters, making it ideal for encoding complete URLs that need to be passed as parameters. This flexibility allows you to choose the appropriate encoding method for your specific use case.
              </p>
              <p className="leading-relaxed mb-4">
                Beyond basic encoding and decoding, the tool provides valuable analytics about your text. It displays character counts for both original and encoded text, showing you exactly how much the encoding process expands your data. The percentage increase metric helps you understand the overhead introduced by encoding, which can be important when working with length-limited systems like SMS messages or database fields with size constraints. The special character counter identifies how many characters in your text require encoding, giving you insight into the complexity of your input data.
              </p>
              <p className="leading-relaxed mb-4">
                The decoding functionality works seamlessly to reverse the encoding process. When you paste encoded text and click the decode button, the tool intelligently processes percent-encoded sequences and converts them back to their original characters. This bidirectional capability makes the tool invaluable for debugging URL-related issues, analyzing encoded URLs you encounter in the wild, and verifying that your encoding process works correctly. The one-click copy and download features streamline your workflow, allowing you to quickly integrate the results into your projects.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Common Characters and Their Encoded Equivalents</h3>
              <p className="leading-relaxed mb-4">
                Understanding how specific characters are encoded helps developers anticipate and troubleshoot URL-related issues. The space character, being the most common character requiring encoding, becomes %20 in encoded form. While some older systems use the plus sign (+) to represent spaces in query strings, modern standards prefer %20 for consistency and reliability. The exclamation mark (!) encodes to %21, quotation marks (") become %22, hash symbols (#) convert to %23, dollar signs ($) transform into %24, percent signs (%) double-encode to %25, and ampersands (&) become %26.
              </p>
              <p className="leading-relaxed mb-4">
                Parentheses are encoded as %28 for opening and %29 for closing parentheses. The asterisk (*) becomes %2A, plus signs (+) encode to %2B, commas (,) convert to %2C, forward slashes (/) become %2F, colons (:) transform into %3A, semicolons (;) encode to %3B, less-than symbols (&lt;) become %3C, equal signs (=) convert to %3D, greater-than symbols (&gt;) encode to %3E, question marks (?) transform into %3F, and at symbols (@) become %40. Square brackets encode as %5B and %5D, while curly braces use %7B and %7D.
              </p>
              <p className="leading-relaxed mb-4">
                Non-ASCII characters use UTF-8 encoding, which may result in multiple percent-encoded bytes for a single character. For example, the copyright symbol (©) encodes to %C2%A9, representing its two-byte UTF-8 encoding. Emoji characters, being even more complex Unicode sequences, generate longer encoded strings. The smiling face emoji (😊) encodes to %F0%9F%98%8A, using four bytes. This multi-byte encoding demonstrates why international text can significantly increase URL length when encoded, a consideration important for systems with URL length limitations.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Best Practices for URL Encoding</h3>
              <p className="leading-relaxed mb-4">
                Following best practices for URL encoding ensures your web applications function reliably and securely. Always encode user input before incorporating it into URLs, regardless of whether you expect special characters. Users can input unexpected characters, and automated systems or malicious actors might deliberately send specially crafted input to exploit vulnerabilities. Defensive programming dictates that all external input should be treated as potentially unsafe and properly encoded before use in URLs.
              </p>
              <p className="leading-relaxed mb-4">
                Choose the appropriate encoding method for your specific use case. Use component encoding (encodeURIComponent) for individual URL parameters, query string values, and form data. Use full URI encoding (encodeURI) only when encoding complete URLs that must maintain their structure. Never attempt to manually implement URL encoding by replacing characters with their encoded equivalents; always use built-in encoding functions provided by your programming language or framework. Manual encoding often misses edge cases and can introduce subtle bugs that are difficult to diagnose.
              </p>
              <p className="leading-relaxed mb-4">
                Be aware of double-encoding issues, which occur when already-encoded text is encoded again. This creates strings like %2520 instead of %20, causing decoding to fail or produce incorrect results. To prevent double encoding, check whether your data is already encoded before applying encoding functions. Similarly, avoid partial encoding where some characters are encoded while others are not, as this creates inconsistent and potentially broken URLs. Consistency in encoding practices across your application prevents subtle bugs and improves maintainability.
              </p>
              <p className="leading-relaxed mb-4">
                Consider URL length limitations when working with encoded text. Different browsers, servers, and proxies impose various maximum URL length restrictions, typically ranging from 2,000 to 8,000 characters. Encoded text is always longer than the original, sometimes significantly so for non-ASCII text. If you anticipate long URLs, consider using POST requests instead of GET requests, or implement URL shortening strategies. For APIs and web services, document the maximum accepted URL length to help client developers avoid truncation issues.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Troubleshooting Common URL Encoding Issues</h3>
              <p className="leading-relaxed mb-4">
                When URLs don't work as expected, encoding issues are often the culprit. If a URL containing encoded text produces errors or unexpected results, first verify that encoding was applied correctly. Copy the URL into a decoder tool (like ours) to see what the decoded values are. Common mistakes include forgetting to encode certain parameters, using the wrong encoding type, or encoding the same data multiple times. Systematic decoding and inspection of each URL component helps identify where the encoding process went wrong.
              </p>
              <p className="leading-relaxed mb-4">
                Mixed encoding can cause subtle problems that are difficult to diagnose. Some systems or legacy code might use different encoding standards or character sets, leading to incompatible encoded strings. When integrating with third-party APIs or working with URLs from external sources, verify the encoding standard they expect. UTF-8 is the modern standard, but some older systems might still use ISO-8859-1 or other legacy encodings. Mismatched character encoding can cause corrupted text, especially for non-ASCII characters.
              </p>
              <p className="leading-relaxed mb-4">
                Plus signs (+) in URLs deserve special attention because they have dual meaning in URL encoding. In query strings, plus signs traditionally represent spaces, but in modern URL encoding standards, %20 is preferred. Some systems still interpret plus signs as spaces, while others treat them as literal plus characters. This inconsistency can cause confusion and bugs. When encoding data that might contain plus signs, ensure your encoding and decoding processes handle them consistently according to the standards your system follows.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Security Considerations and Privacy</h3>
              <p className="leading-relaxed mb-4">
                Our URL encoder tool prioritizes your privacy and security by operating entirely within your web browser. Unlike server-based encoding tools that transmit your data to remote servers for processing, our client-side implementation ensures that your text never leaves your computer. This local processing approach makes the tool safe for encoding sensitive information, confidential data, or any content you prefer to keep private. No data is logged, stored, or transmitted to any third party, providing complete privacy and peace of mind.
              </p>
              <p className="leading-relaxed mb-4">
                However, remember that URL-encoded data is not encrypted and provides no security against eavesdropping or interception. Encoding makes text URL-safe but does not obscure its meaning from anyone who can decode it. If you're transmitting sensitive information through URLs, always use HTTPS (SSL/TLS encryption) to protect the data in transit. Never include passwords, credit card numbers, social security numbers, or other highly sensitive information in URLs, even if encoded, as URLs are often logged by servers, proxies, and browser history.
              </p>
              <p className="leading-relaxed mb-4">
                Be cautious when clicking links containing encoded text from untrusted sources. Malicious actors can use URL encoding to obscure harmful URLs or inject malicious code. Before following a link with extensive encoding, decode it first to verify its destination and contents. Our decoding feature can help you inspect suspicious URLs safely. This practice is especially important for links received in emails, messages, or social media, where phishing attacks and malware distribution commonly occur.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">What is the difference between URL encoding and Base64 encoding?</p>
                  <p className="leading-relaxed">URL encoding (percent-encoding) is specifically designed for making text safe to include in URLs by replacing special characters with percent-encoded equivalents. Base64 encoding converts binary data into ASCII text using a 64-character alphabet, primarily used for encoding images, files, or binary data for transmission. They serve different purposes and are not interchangeable.</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">Can URL encoding compress or reduce file size?</p>
                  <p className="leading-relaxed">No, URL encoding actually increases the size of your text because each encoded character requires three characters (%, and two hexadecimal digits). Text containing many special characters or non-ASCII characters will become significantly larger when encoded. If you need compression, use dedicated compression algorithms like gzip or brotli instead.</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">Is it safe to encode passwords or sensitive data?</p>
                  <p className="leading-relaxed">While our tool is safe to use (all processing happens locally in your browser), you should never include passwords or sensitive information in URLs even when encoded. URLs are logged by browsers, servers, and proxies, making them unsuitable for transmitting confidential data. Use POST requests with encrypted HTTPS connections for sensitive information instead.</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">Why does my encoded URL sometimes get double-encoded?</p>
                  <p className="leading-relaxed">Double-encoding occurs when encoded text is encoded again, often due to multiple layers of URL handling in your application. For example, if your code encodes a parameter and then a framework or library encodes it again, you get double-encoded results. To prevent this, check if data is already encoded before applying encoding, and be aware of automatic encoding performed by frameworks.</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">Can I use this tool offline?</p>
                  <p className="leading-relaxed">Yes! Since the tool runs entirely in your browser without requiring server communication, you can save the webpage locally and use it offline. This makes it perfect for air-gapped environments or situations where internet access is restricted. Your data never leaves your computer regardless of online or offline use.</p>
                </div>
              </div>
            </section>

            <section className="mt-8 p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-green-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Conclusion and Final Recommendations</h3>
              <p className="leading-relaxed mb-4">
                URL encoding is an indispensable skill and tool for anyone working with web technologies. Whether you're a professional web developer building complex applications, a digital marketer managing campaign tracking links, a data analyst working with APIs, or a student learning web development fundamentals, understanding URL encoding empowers you to work more effectively and avoid common pitfalls. Our Text to URL Encoder simplifies this process by providing instant, accurate encoding and decoding capabilities without the need for programming knowledge or technical expertise.
              </p>
              <p className="leading-relaxed">
                The importance of proper URL encoding extends beyond mere functionality; it impacts security, data integrity, user experience, and international accessibility. By using our free tool, you gain immediate access to professional-grade encoding capabilities that help you create robust, reliable web applications and integrations. The tool's privacy-focused design, comprehensive features, and intuitive interface make it an essential addition to your web development toolkit. Start using the Text to URL Encoder today to ensure your URLs are always properly formatted, safe, and functional across all platforms and use cases.
              </p>
            </section>
          </div>
        </article>

        {/* Pro Tips Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 shadow-sm">
          <h3 className="text-lg font-bold text-indigo-900 mb-4">💡 Expert Tips for URL Encoding</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm" style={{ textAlign: 'justify' }}>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="font-semibold text-indigo-700 mb-2">✓ Always Encode User Input</div>
              <p className="text-gray-700 leading-relaxed">Never trust user input to be URL-safe. Always encode before including in URLs to prevent errors and security vulnerabilities.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="font-semibold text-indigo-700 mb-2">✓ Use HTTPS for Sensitive Data</div>
              <p className="text-gray-700 leading-relaxed">URL encoding does not encrypt data. Always use HTTPS to protect encoded information during transmission.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="font-semibold text-indigo-700 mb-2">✓ Test Encoded URLs</div>
              <p className="text-gray-700 leading-relaxed">Always test encoded URLs in your target environment to ensure they work correctly across different systems and browsers.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="font-semibold text-indigo-700 mb-2">✓ Watch for Double Encoding</div>
              <p className="text-gray-700 leading-relaxed">Check if data is already encoded before applying encoding again to avoid double-encoding issues that break URLs.</p>
            </div>
          </div>
        </div>
      </div>
    </ToolSection>
  );
}