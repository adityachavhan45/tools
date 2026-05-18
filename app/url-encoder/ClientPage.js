"use client";

import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import { useState } from "react";

export default function UrlEncoderPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode"); // 'encode' or 'decode'
  const [message, setMessage] = useState("");

  function encode() {
    if (!input.trim()) {
      setMessage("⚠️ Please enter text to encode.");
      return;
    }
    try {
      const encoded = encodeURIComponent(input);
      setOutput(encoded);
      setMode("encode");
      setMessage("✅ Encoded successfully!");
    } catch {
      setMessage("❌ Encoding failed. Please check your input.");
    }
  }

  function decode() {
    if (!input.trim()) {
      setMessage("⚠️ Please enter text to decode.");
      return;
    }
    try {
      const decoded = decodeURIComponent(input);
      setOutput(decoded);
      setMode("decode");
      setMessage("✅ Decoded successfully!");
    } catch {
      setMessage("❌ Invalid encoded string. Please check your input.");
    }
  }

  function copyOutput() {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setMessage("📋 Output copied to clipboard!");
    setTimeout(() => setMessage(""), 2000);
  }

  function resetAll() {
    setInput("");
    setOutput("");
    setMode("encode");
    setMessage("🔄 Reset successfully!");
    setTimeout(() => setMessage(""), 1500);
  }

  // Calculate encoding statistics
  const getStats = () => {
    if (!input || !output) return null;
    
    const inputLength = input.length;
    const outputLength = output.length;
    const difference = outputLength - inputLength;
    const percentChange = inputLength > 0 ? ((difference / inputLength) * 100).toFixed(1) : 0;
    
    return {
      inputLength,
      outputLength,
      difference,
      percentChange
    };
  };

  const stats = getStats();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 py-10">
      <JsonLd
        data={buildToolJsonLd({
          name: "URL Encoder/Decoder",
          description: "Free online URL encoder and decoder tool. Encode and decode URLs with percent-encoding for safe web transmission.",
          slug: "/url-encoder",
          category: "Utilities/Text",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "URL Encoder/Decoder", slug: "/url-encoder" },
        ])}
      />

      <div className="max-w-5xl mx-auto px-4 space-y-8">
        {/* Status Message */}
        {message && (
          <div className="px-5 py-3.5 bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 rounded-xl shadow-sm animate-fadeIn">
            <p className="text-sm font-semibold text-blue-800">{message}</p>
          </div>
        )}

        {/* Main Converter Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-800 via-gray-800 to-zinc-800 px-8 py-6">
            <h1 className="text-3xl font-bold text-white tracking-tight">URL Encoder & Decoder</h1>
            <p className="text-slate-200 text-sm mt-2">Convert URLs to percent-encoded format and back instantly</p>
          </div>

          <div className="p-8">
            {/* Input Section */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-800 mb-3">
                📝 Input Text or URL
              </label>
              <textarea
                className="w-full min-h-[140px] max-h-[180px] px-5 py-4 text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all bg-gray-50 focus:bg-white resize-none"
                placeholder="Enter text to encode or paste encoded URL to decode..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <button
                onClick={encode}
                disabled={!input.trim()}
                className="px-6 py-4 rounded-xl bg-gradient-to-r from-slate-800 to-gray-800 text-white font-bold shadow-lg hover:shadow-xl hover:from-slate-900 hover:to-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                🔒 Encode
              </button>

              <button
                onClick={decode}
                disabled={!input.trim()}
                className="px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-cyan-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                🔓 Decode
              </button>

              <button
                onClick={copyOutput}
                disabled={!output}
                className="px-6 py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold shadow-lg hover:shadow-xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                📋 Copy
              </button>

              <button
                onClick={resetAll}
                disabled={!input && !output}
                className="px-6 py-4 rounded-xl bg-gray-200 text-gray-800 font-bold hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                🔄 Reset
              </button>
            </div>

            {/* Output Section */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-800 mb-3">
                {mode === 'encode' ? '🔒 Encoded Output' : '🔓 Decoded Output'}
              </label>
              <div className="w-full min-h-[140px] max-h-[180px] overflow-y-auto px-5 py-4 border-2 border-gray-300 rounded-xl bg-gradient-to-br from-gray-50 to-slate-50 text-gray-800 text-base whitespace-pre-wrap break-all">
                {output || (
                  <span className="text-gray-400 italic">
                    {mode === 'encode' ? 'Encoded result will appear here...' : 'Decoded result will appear here...'}
                  </span>
                )}
              </div>
            </div>

            {/* Statistics */}
            {stats && (
              <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-5 border-2 border-slate-200">
                <h3 className="text-sm font-bold text-slate-800 mb-4">📊 Conversion Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center border border-slate-100">
                    <div className="text-xs font-bold text-gray-500 mb-1">INPUT LENGTH</div>
                    <div className="text-2xl font-bold text-slate-700">{stats.inputLength}</div>
                    <div className="text-xs text-gray-600 mt-1">characters</div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center border border-slate-100">
                    <div className="text-xs font-bold text-gray-500 mb-1">OUTPUT LENGTH</div>
                    <div className="text-2xl font-bold text-blue-600">{stats.outputLength}</div>
                    <div className="text-xs text-gray-600 mt-1">characters</div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center border border-slate-100">
                    <div className="text-xs font-bold text-gray-500 mb-1">DIFFERENCE</div>
                    <div className={`text-2xl font-bold ${stats.difference >= 0 ? 'text-orange-600' : 'text-green-600'}`}>
                      {stats.difference >= 0 ? '+' : ''}{stats.difference}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">characters</div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center border border-slate-100">
                    <div className="text-xs font-bold text-gray-500 mb-1">CHANGE</div>
                    <div className={`text-2xl font-bold ${stats.percentChange >= 0 ? 'text-orange-600' : 'text-green-600'}`}>
                      {stats.percentChange >= 0 ? '+' : ''}{stats.percentChange}%
                    </div>
                    <div className="text-xs text-gray-600 mt-1">size change</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Reference Guide */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-200 shadow-lg">
          <h3 className="text-xl font-bold text-indigo-900 mb-5 flex items-center gap-3">
            <span className="text-3xl">📚</span> Common URL Encoding Reference
          </h3>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-indigo-100">
              <div className="font-bold text-indigo-800 mb-3 text-base">Special Characters</div>
              <div className="space-y-2 text-sm text-gray-700 font-mono">
                <div className="flex justify-between border-b pb-1">
                  <span>Space</span>
                  <span className="text-indigo-600">%20</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span>!</span>
                  <span className="text-indigo-600">%21</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span>#</span>
                  <span className="text-indigo-600">%23</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span>$</span>
                  <span className="text-indigo-600">%24</span>
                </div>
                <div className="flex justify-between">
                  <span>%</span>
                  <span className="text-indigo-600">%25</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm border border-indigo-100">
              <div className="font-bold text-indigo-800 mb-3 text-base">URL Delimiters</div>
              <div className="space-y-2 text-sm text-gray-700 font-mono">
                <div className="flex justify-between border-b pb-1">
                  <span>&</span>
                  <span className="text-indigo-600">%26</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span>?</span>
                  <span className="text-indigo-600">%3F</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span>=</span>
                  <span className="text-indigo-600">%3D</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span>/</span>
                  <span className="text-indigo-600">%2F</span>
                </div>
                <div className="flex justify-between">
                  <span>:</span>
                  <span className="text-indigo-600">%3A</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm border border-indigo-100">
              <div className="font-bold text-indigo-800 mb-3 text-base">Common Symbols</div>
              <div className="space-y-2 text-sm text-gray-700 font-mono">
                <div className="flex justify-between border-b pb-1">
                  <span>@</span>
                  <span className="text-indigo-600">%40</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span>+</span>
                  <span className="text-indigo-600">%2B</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span>"</span>
                  <span className="text-indigo-600">%22</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span>&lt;</span>
                  <span className="text-indigo-600">%3C</span>
                </div>
                <div className="flex justify-between">
                  <span>&gt;</span>
                  <span className="text-indigo-600">%3E</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comprehensive Educational Content - 1000+ Words */}
        <article className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10">
          <header className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">The Complete Guide to URL Encoding and Decoding</h2>
            <div className="h-1.5 w-32 bg-gradient-to-r from-slate-800 to-gray-700 rounded-full"></div>
          </header>

          <div className="prose max-w-none space-y-8 text-gray-700 leading-relaxed" style={{ textAlign: 'justify' }}>
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Understanding URL Encoding: The Foundation of Web Communication</h3>
              <p className="mb-4">
                URL encoding, formally known as percent-encoding, represents a fundamental mechanism that enables reliable data transmission across the internet by converting characters into a universally safe format. This encoding process addresses a critical challenge inherent in web communication: URLs can only contain a limited set of characters from the ASCII character set, specifically alphanumeric characters and a few special symbols like hyphens, underscores, periods, and tildes. When URLs need to include other characters—spaces, punctuation marks, non-ASCII Unicode characters, or symbols with special meanings in URL syntax—these characters must be converted into a format that won't break URL parsing or cause transmission errors.
              </p>
              <p className="mb-4">
                The encoding mechanism works by replacing unsafe or reserved characters with a percent sign followed by two hexadecimal digits representing the character's byte value in UTF-8 encoding. For example, a space character becomes %20 (hexadecimal 20 represents decimal 32, the ASCII code for space), an exclamation mark becomes %21, and a pound sign becomes %23. This systematic transformation ensures that every character in a URL can be transmitted reliably across different systems, networks, and protocols without misinterpretation or corruption. The receiving system can then reverse this process through decoding, converting the percent-encoded sequences back into their original characters.
              </p>
              <p className="mb-4">
                Understanding URL encoding proves essential for web developers, digital marketers, SEO specialists, and anyone working with web technologies. Improperly encoded URLs can break links, cause form submissions to fail, create security vulnerabilities, or prevent search engines from properly indexing content. Conversely, correct URL encoding ensures that web applications function reliably, data transmits accurately, and users experience seamless navigation across websites and web services. Our URL encoder and decoder tool simplifies this process by providing instant, accurate encoding and decoding capabilities directly in your browser, eliminating the need for manual conversion or complex programming.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">The Technical Mechanics of Percent-Encoding</h3>
              <p className="mb-4">
                The percent-encoding standard, defined in RFC 3986 (Uniform Resource Identifier: Generic Syntax), establishes precise rules for which characters require encoding and how the encoding should be performed. The specification divides characters into three categories: unreserved characters, reserved characters, and unsafe characters. Unreserved characters—including uppercase and lowercase letters (A-Z, a-z), digits (0-9), and the symbols hyphen (-), underscore (_), period (.), and tilde (~)—can appear in URLs without encoding. These characters pose no risk of misinterpretation and maintain consistent meaning across all contexts.
              </p>
              <p className="mb-4">
                Reserved characters serve specific syntactic purposes within URL structure and include symbols like colon (:), slash (/), question mark (?), ampersand (&), equals sign (=), and hash (#). These characters define URL components: colons separate protocol from host, slashes separate path segments, question marks introduce query strings, ampersands separate query parameters, equals signs connect parameter names to values, and hashes indicate fragment identifiers. When these characters need to appear as literal data rather than syntactic elements, they must be percent-encoded. For example, if a search query contains an ampersand as part of the search term rather than as a parameter separator, it must be encoded as %26 to prevent URL parsing confusion.
              </p>
              <p className="mb-4">
                The encoding process for non-ASCII characters, such as international characters, emoji, or special symbols, follows UTF-8 encoding conventions. Each character gets converted to its UTF-8 byte representation, and each byte becomes a three-character sequence starting with a percent sign followed by two hexadecimal digits. For instance, the copyright symbol © (Unicode U+00A9) encodes as %C2%A9 because its UTF-8 representation uses two bytes (C2 and A9 in hexadecimal). This encoding scheme ensures that URLs can safely transmit text in any language or script while maintaining compatibility with systems that only understand ASCII characters. Understanding these technical details helps developers debug URL issues and implement proper encoding in their applications.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Common Use Cases and Practical Applications</h3>
              <p className="mb-4">
                Web forms represent one of the most common scenarios requiring URL encoding, particularly when submitting data via GET requests where form data appears in the URL query string. Consider a search form where users can enter arbitrary text: if someone searches for "cat & dog" without proper encoding, the ampersand would be interpreted as a query parameter separator rather than part of the search term, potentially breaking the search functionality or producing unexpected results. Properly encoding this query as "cat%20%26%20dog" ensures the search engine receives the complete, intended search phrase. Similarly, contact forms, survey submissions, and any user input transmitted via URL parameters require careful encoding to prevent data corruption or functional failures.
              </p>
              <p className="mb-4">
                API development heavily relies on URL encoding for transmitting parameters and data between client applications and server endpoints. RESTful APIs frequently encode resource identifiers, filter parameters, sort specifications, and other data within URL paths and query strings. For example, an API endpoint for retrieving user information might include a username parameter that could contain special characters, spaces, or international characters. Proper encoding ensures the API correctly receives and processes these parameters regardless of their content. OAuth authentication flows, which pass various tokens and state parameters through URLs, critically depend on correct encoding to maintain security and prevent authentication failures.
              </p>
              <p className="mb-4">
                Social media sharing, email marketing, and digital advertising campaigns all require URL encoding to create reliable, functional links. When sharing content on platforms like Facebook, Twitter, or LinkedIn, URLs often include parameters for tracking campaigns, identifying referral sources, or pre-populating share text. These parameters might contain spaces, special characters, or formatting that requires encoding. Email marketing campaigns use encoded URLs to track click-through rates, personalize destinations, or include user identifiers. Digital advertising platforms encode landing page URLs with campaign parameters to measure advertising effectiveness and attribute conversions correctly. In all these scenarios, proper encoding ensures links function correctly and tracking data remains accurate.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Security Implications and Best Practices</h3>
              <p className="mb-4">
                While URL encoding itself doesn't provide security through encryption or obfuscation, it plays an important role in preventing certain types of security vulnerabilities. Cross-site scripting (XSS) attacks often exploit improper handling of user input that gets reflected in URLs or inserted into web pages. When applications fail to properly encode user-supplied data before including it in URLs or HTML output, attackers can inject malicious scripts that execute in victims' browsers. Proper URL encoding converts potentially dangerous characters into their harmless encoded equivalents, helping prevent script injection attacks. However, encoding alone doesn't constitute comprehensive security—applications must also validate and sanitize input, use content security policies, and follow other security best practices.
              </p>
              <p className="mb-4">
                A critical security principle involves never transmitting sensitive information like passwords, credit card numbers, or personal identification data directly in URLs, even with encoding. URLs appear in browser history, server logs, referrer headers, and potentially in third-party analytics or advertising networks. This exposure creates multiple opportunities for sensitive data leakage. Instead, applications should transmit sensitive data through secure POST requests with HTTPS encryption, storing data in request bodies rather than URLs. Session identifiers and authentication tokens, while sometimes necessarily included in URLs for compatibility reasons, should use secure, randomly-generated values rather than predictable or personally-identifiable information.
              </p>
              <p className="mb-4">
                SQL injection prevention, while primarily addressed through parameterized queries and input validation, can benefit from understanding URL encoding. Attackers sometimes attempt to circumvent input filters by encoding malicious SQL commands in various ways. Applications must decode URL parameters before validation to prevent bypass attempts, but must also avoid double-decoding vulnerabilities where multiple decoding passes could reveal hidden attack payloads. Defense-in-depth security strategies combine proper URL encoding and decoding with comprehensive input validation, parameterized database queries, principle of least privilege, and security-focused code review to create robust protection against various attack vectors.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">URL Encoding in Different Programming Contexts</h3>
              <p className="mb-4">
                JavaScript provides built-in functions for URL encoding and decoding that match standard specifications while offering flexibility for different use cases. The encodeURIComponent() function provides the most comprehensive encoding, converting all characters except unreserved ones (A-Z, a-z, 0-9, hyphen, underscore, period, tilde) into percent-encoded format. This function suits encoding query parameter values, form data, or any text that needs to be safely embedded in URLs. The encodeURI() function offers less aggressive encoding, preserving characters that have special meaning in URL syntax like colons, slashes, and question marks, making it appropriate for encoding complete URLs while maintaining their structure. Understanding when to use each function prevents common encoding mistakes.
              </p>
              <p className="mb-4">
                Python's urllib.parse module offers comprehensive URL manipulation capabilities including quote() and quote_plus() functions for encoding and unquote() and unquote_plus() for decoding. The quote_plus() function converts spaces to plus signs rather than %20, following HTML form encoding conventions (application/x-www-form-urlencoded), while quote() uses %20 for spaces, following strict percent-encoding rules. This distinction matters when working with different web technologies that expect different space encoding conventions. Python's URL parsing capabilities also handle encoding internationalized domain names (IDN) using Punycode, enabling applications to work with domain names containing non-ASCII characters.
              </p>
              <p className="mb-4">
                PHP provides rawurlencode() and urlencode() functions with subtle but important differences: rawurlencode() follows RFC 3986 exactly, encoding spaces as %20, while urlencode() follows older HTML form encoding conventions, encoding spaces as plus signs. The http_build_query() function automatically handles encoding for arrays of parameters, making it convenient for constructing query strings. Server-side frameworks like Laravel, Symfony, and Express.js typically handle URL encoding automatically for route parameters and query strings, but developers must still understand encoding principles when manually constructing URLs or debugging issues. Understanding platform-specific encoding behavior prevents subtle bugs when applications interact across different technology stacks.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Debugging Common URL Encoding Issues</h3>
              <p className="mb-4">
                Double-encoding represents one of the most common and frustrating URL encoding problems, occurring when already-encoded URLs get encoded again, producing incorrect results. For example, a space character becomes %20 during initial encoding, but if this encoded URL gets encoded again, the percent sign itself becomes %25, producing %2520 instead of %20. When decoded once, this produces %20 instead of the expected space character. Double-encoding typically occurs when different layers of an application—client-side JavaScript, server-side frameworks, proxies, or load balancers—each attempt to encode URLs without checking whether encoding has already been applied. Preventing double-encoding requires careful coordination of encoding responsibilities and thorough testing of URL handling throughout the application stack.
              </p>
              <p className="mb-4">
                Inconsistent encoding of plus signs versus %20 for spaces creates compatibility problems between systems following different conventions. HTML forms traditionally use plus signs for spaces (application/x-www-form-urlencoded format) while strict percent-encoding uses %20. Some systems accept both formats interchangeably, while others strictly interpret plus signs as literal plus characters rather than spaces, causing searches for "hello+world" to fail when users intended "hello world". Applications must maintain consistent encoding conventions throughout their URL handling, documenting which format they expect and implementing appropriate decoding logic. Understanding whether your system follows form encoding or strict percent-encoding prevents confusion and interoperability problems.
              </p>
              <p className="mb-4">
                International character handling challenges arise when applications fail to properly encode non-ASCII characters or use incorrect character encodings. Modern applications should use UTF-8 encoding throughout, ensuring consistent handling of international characters in URLs, databases, and displayed content. However, legacy systems might use different character encodings (Latin-1, Windows-1252, or various Asian encodings), creating encoding mismatches that produce garbled text or broken functionality. Testing URL encoding with various international characters—European diacritics, Cyrillic scripts, Chinese characters, Arabic text, emoji—helps identify encoding issues before they affect users. Browser developer tools, network inspection utilities, and URL encoding validators assist in debugging these problems by showing exactly how URLs are being encoded and transmitted.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced Topics and Edge Cases</h3>
              <p className="mb-4">
                Internationalized Resource Identifiers (IRIs) extend URLs to support Unicode characters directly in domain names and paths, rather than requiring percent-encoding for all non-ASCII characters. While IRIs improve readability and usability for international content, browsers and applications typically convert IRIs to traditional URIs through percent-encoding before transmission. Domain names containing non-ASCII characters undergo additional Punycode encoding, converting them to ASCII-compatible representations prefixed with "xn--". For example, the domain "münchen.de" becomes "xn--mnchen-3ya.de". Understanding IRI-to-URI conversion ensures international content remains accessible while maintaining compatibility with existing internet infrastructure.
              </p>
              <p className="mb-4">
                Path segment encoding differs subtly from query parameter encoding, with some characters that require encoding in query strings being safe in path segments. For instance, slashes must be encoded as %2F in query parameters but serve as path separators in URL paths. Conversely, question marks and ampersands can appear unencoded in path segments without causing parsing issues, though encoding them provides consistency and avoids potential confusion. Applications serving user-generated content in URL paths must carefully encode special characters while preserving the path structure. File names, article titles, and other content appearing in URL paths require encoding that maintains readability when possible while ensuring technical correctness.
              </p>
              <p className="mb-4">
                Fragment identifier encoding follows special rules since fragments aren't transmitted to servers but are processed entirely by browsers. Characters like spaces, quotes, and less-than/greater-than symbols should be encoded in fragments for consistent behavior across browsers. However, fragment encoding historically received less attention than other URL components, leading to inconsistent browser implementations. Modern web applications using single-page architecture and client-side routing extensively use fragments (or the newer History API) for navigation, making proper fragment encoding increasingly important. Understanding these nuances helps developers build robust web applications that function correctly across different browsers and use cases.
              </p>
            </section>

            <section className="bg-gradient-to-r from-slate-50 to-gray-50 p-8 rounded-xl border-2 border-slate-200 mt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Conclusion: Mastering URL Encoding for Web Success</h3>
              <p className="mb-4">
                URL encoding and decoding represent fundamental skills for anyone working with web technologies, from developers building applications to marketers creating campaigns to content creators managing websites. Proper encoding ensures reliable data transmission, prevents security vulnerabilities, maintains link functionality, and enables seamless integration between different systems and platforms. While the technical details of percent-encoding can seem complex, understanding the core principles—which characters need encoding, when encoding should occur, and how to debug common issues—empowers professionals to build better web experiences.
              </p>
              <p>
                Our URL Encoder and Decoder tool provides instant, accurate encoding and decoding capabilities directly in your browser, eliminating manual conversion complexity and reducing errors. Whether you're debugging API calls, creating shareable links, optimizing SEO, or developing web applications, this tool offers a fast, reliable solution for all your URL encoding needs. The client-side processing ensures your data remains private and secure, while the intuitive interface makes encoding and decoding accessible to users of all skill levels. Start using our URL Encoder and Decoder today to simplify your web workflow and ensure your URLs always function correctly.
              </p>
            </section>
          </div>
        </article>

        {/* Pro Tips Section */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200 shadow-lg">
          <h3 className="text-xl font-bold text-orange-900 mb-6 flex items-center gap-2">
            <span className="text-2xl">💡</span> Expert URL Encoding Tips
          </h3>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-orange-100">
              <div className="font-bold text-orange-800 mb-2.5 text-base">✓ Encode Query Parameters Only</div>
              <p className="text-gray-700 text-sm leading-relaxed" style={{ textAlign: 'justify' }}>When building URLs programmatically, encode only the parameter values, not the entire URL. Encoding the protocol, domain, or path structure will break the URL completely.</p>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm border border-orange-100">
              <div className="font-bold text-orange-800 mb-2.5 text-base">✓ Test with Special Characters</div>
              <p className="text-gray-700 text-sm leading-relaxed" style={{ textAlign: 'justify' }}>Always test your URL handling with special characters like spaces, ampersands, plus signs, and international characters. These edge cases reveal encoding problems before users encounter them.</p>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm border border-orange-100">
              <div className="font-bold text-orange-800 mb-2.5 text-base">✓ Never Double-Encode</div>
              <p className="text-gray-700 text-sm leading-relaxed" style={{ textAlign: 'justify' }}>Before encoding a URL, check if it's already encoded. Double-encoding converts %20 to %2520, causing decoding failures. Use decoding followed by encoding to normalize URLs safely.</p>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm border border-orange-100">
              <div className="font-bold text-orange-800 mb-2.5 text-base">✓ Use HTTPS for Sensitive Data</div>
              <p className="text-gray-700 text-sm leading-relaxed" style={{ textAlign: 'justify' }}>URL encoding doesn't encrypt data. Never put passwords, credit cards, or personal information in URLs. Use HTTPS POST requests for sensitive data transmission.</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </main>
  );
}