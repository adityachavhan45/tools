"use client";

import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import { useState } from "react";

export default function UrlEncoderPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [message, setMessage] = useState("");

  function encode() {
    try {
      setOutput(encodeURIComponent(input));
      setMessage("Encoded successfully!");
    } catch {
      setMessage("Encoding failed.");
    }
  }

  function decode() {
    try {
      setOutput(decodeURIComponent(input));
      setMessage("Decoded successfully!");
    } catch {
      setMessage("Invalid encoded string.");
    }
  }

  function copyOutput() {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setMessage("Output copied to clipboard!");
    setTimeout(() => setMessage(""), 2000);
  }

  function resetAll() {
    setInput("");
    setOutput("");
    setMessage("Cleared!");
    setTimeout(() => setMessage(""), 1500);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-8">
      <JsonLd
        data={buildToolJsonLd({
          name: "URL Encoder/Decoder",
          description: "Encode or decode URLs (percent-encoding) in your browser.",
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

      <div className="max-w-4xl mx-auto px-4">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">URL Encoder / Decoder</h2>
          <p className="text-gray-600 mt-1">Encode or decode URL strings quickly and securely.</p>

          {message && (
            <div className="mt-3 px-4 py-2 bg-gray-100 border rounded-lg text-gray-700 text-sm shadow-sm">
              {message}
            </div>
          )}

          {/* Input */}
          <textarea
            className="mt-5 w-full min-h-[180px] p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-slate-900 outline-none text-gray-800 placeholder-gray-400"
            placeholder="Enter text or encoded URL"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {/* Buttons */}
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={encode}
              className="flex-1 min-w-[120px] px-4 py-2 bg-slate-900 text-white rounded-lg font-medium shadow hover:bg-slate-800 transition"
            >
              Encode
            </button>
            <button
              onClick={decode}
              className="flex-1 min-w-[120px] px-4 py-2 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-500 transition"
            >
              Decode
            </button>
            <button
              onClick={copyOutput}
              disabled={!output}
              className={`flex-1 min-w-[120px] px-4 py-2 rounded-lg font-medium shadow transition ${
                !output ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-500"
              }`}
            >
              Copy Output
            </button>
            <button
              onClick={resetAll}
              disabled={!input && !output}
              className={`flex-1 min-w-[120px] px-4 py-2 rounded-lg font-medium shadow transition ${
                !input && !output ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-red-500 text-white hover:bg-red-600"
              }`}
            >
              Reset
            </button>
          </div>

          {/* Output */}
          <textarea
            className="mt-4 w-full min-h-[180px] p-3 border rounded-lg shadow-sm bg-gray-50 text-gray-800"
            placeholder="Output"
            value={output}
            readOnly
          />
        </div>

                {/* Info Section */}
        <section className="mt-10 bg-white border rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            About URL Encoder & Decoder
          </h3>
          <p className="text-gray-700 mb-4 text-sm">
            URL encoding (also known as percent-encoding) is a process of
            converting characters into a format that can be transmitted safely
            over the internet. Since URLs can only contain a limited set of
            characters, unsafe characters like spaces, quotes, or symbols need
            to be replaced with a percent sign (%) followed by two hexadecimal
            digits. For example, a space becomes <code>%20</code>. The reverse
            process, decoding, translates these encoded values back to their
            readable form. This ensures data integrity when URLs carry text,
            parameters, or query strings.
          </p>

          <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">✨ Key Features</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>Instantly encode and decode text or URLs with one click.</li>
            <li>Supports all standard ASCII and Unicode characters.</li>
            <li>Error handling for invalid or broken strings.</li>
            <li>Secure — everything runs locally in your browser.</li>
            <li>Fast and lightweight — no server requests or delays.</li>
          </ul>

          <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2">🔧 How It Works</h4>
          <p className="text-gray-700 text-sm mb-4">
            When you type a URL or paste text with special characters (like
            spaces, ?, &, #), the encoding process converts them into safe
            hexadecimal codes. This prevents errors in transmission. For
            example:
          </p>
          <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800 overflow-x-auto">
            Input: https://example.com/search?q=hello world  
            Encoded: https://example.com/search?q=hello%20world
          </pre>
          <p className="text-gray-700 text-sm mt-2">
            Similarly, decoding takes <code>%20</code> and turns it back into a
            space, restoring the original URL or text.
          </p>

          <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2">📦 Practical Use Cases</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li><strong>Web Development:</strong> Encode query parameters so that URLs don’t break when special characters are used.</li>
            <li><strong>APIs:</strong> Ensure consistent data transfer when sending user input via GET requests.</li>
            <li><strong>Debugging:</strong> Decode URL strings from web logs or API calls to make them readable.</li>
            <li><strong>Email & Social Sharing:</strong> Safely include long links with special characters.</li>
            <li><strong>SEO:</strong> Properly encode URLs so that search engines crawl them correctly.</li>
          </ul>

          <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2">⚡ Benefits of URL Encoding</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li><strong>Data Integrity:</strong> Prevents data corruption during transmission.</li>
            <li><strong>Compatibility:</strong> Works across browsers, servers, and operating systems.</li>
            <li><strong>Security:</strong> Protects against accidental misinterpretation of special characters.</li>
            <li><strong>Standardization:</strong> Follows RFC 3986, ensuring universal support.</li>
          </ul>

          <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2">🔒 Security Considerations</h4>
          <p className="text-gray-700 text-sm mb-4">
            Encoding is not the same as encryption. URL encoding ensures safe
            transmission but does not secure data from attackers. Sensitive
            information such as passwords should never be sent directly in URLs.
            Instead, use HTTPS and POST methods. However, encoding helps
            prevent cross-site scripting (XSS) issues when special characters
            are misinterpreted by browsers.
          </p>

          <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2">📐 Best Practices</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>Always encode query parameters in dynamic URLs.</li>
            <li>Decode incoming URLs in APIs to process data correctly.</li>
            <li>Don’t double-encode — check if the string is already encoded.</li>
            <li>Use UTF-8 encoding to support international characters.</li>
            <li>Keep logs of encoded URLs for debugging but avoid storing sensitive data.</li>
          </ul>

          <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2">❓ Frequently Asked Questions</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
            <li><strong>Q: What’s the difference between encoding and encryption?</strong><br/>
            A: Encoding makes data safe for transmission, while encryption protects data from unauthorized access.</li>
            <li><strong>Q: Do all browsers support encoded URLs?</strong><br/>
            A: Yes, percent-encoding is a universal web standard.</li>
            <li><strong>Q: Can URL encoding increase string length?</strong><br/>
            A: Yes, encoded characters take up 3 characters (e.g., space → %20).</li>
            <li><strong>Q: Is it the same as Base64 encoding?</strong><br/>
            A: No, Base64 is used for binary data like images, while URL encoding is for text in links.</li>
          </ul>

          <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2">🚀 Final Thoughts</h4>
          <p className="text-gray-700 text-sm">
            URL encoding and decoding are essential skills for every web
            developer, SEO expert, or digital marketer. They ensure that links
            remain valid, data is preserved accurately, and web applications
            work as expected. This online tool helps you instantly encode and
            decode text safely, all inside your browser — no downloads, no
            privacy risks, just a fast and reliable solution. Whether you’re
            debugging an API, optimizing a blog link, or simply sharing a safe
            URL, this tool makes the process seamless and error-free.
          </p>
        </section>
      </div>
    </main>
  );
}

