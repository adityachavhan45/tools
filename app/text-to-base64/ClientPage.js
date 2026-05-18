"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function TextToBase64Page() {
  const [text, setText] = useState("");
  const [base64, setBase64] = useState("");
  const [message, setMessage] = useState("");

  function convertTextToBase64() {
    if (!text.trim()) {
      setMessage("⚠️ Please enter text to convert to Base64.");
      return;
    }

    try {
      const encoded = btoa(unescape(encodeURIComponent(text)));
      setBase64(encoded);
      setMessage("✅ Text successfully converted to Base64!");
    } catch (error) {
      setMessage("❌ Error converting text to Base64. Please check your input.");
    }
  }

  function convertBase64ToText() {
    if (!base64.trim()) {
      setMessage("⚠️ Please enter Base64 code to convert to text.");
      return;
    }

    try {
      const decoded = decodeURIComponent(escape(atob(base64.trim())));
      setText(decoded);
      setMessage("✅ Base64 successfully converted to text!");
    } catch (error) {
      setMessage("❌ Error converting Base64 to text. Please check the format.");
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

  function copyBase64() {
    if (!base64) {
      setMessage("⚠️ There is no Base64 output to copy.");
      return;
    }
    navigator.clipboard.writeText(base64);
    setMessage("📋 Base64 code copied to clipboard!");
  }

  function reset() {
    setText("");
    setBase64("");
    setMessage("🧹 All fields cleared!");
    setTimeout(() => setMessage(""), 2000);
  }

  const textStats = {
    chars: text.length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    lines: text ? text.split('\n').length : 0
  };

  const base64Stats = {
    chars: base64.length,
    sizeIncrease: text ? ((base64.length / text.length - 1) * 100).toFixed(1) : 0
  };

  return (
    <ToolSection
      title="Text to Base64 Converter - Free Online Tool"
      subtitle="Convert text to Base64 encoding and decode Base64 back to text instantly. Free online Base64 converter supporting UTF-8 with validation and statistics."
      plain
      hideSidebar
      centerHeader
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Text to Base64 Converter",
          description: "Convert text to Base64 encoding and decode Base64 to text with UTF-8 support.",
          slug: "/text-to-base64",
          category: "Utilities/Text",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Text to Base64 Converter", slug: "/text-to-base64" },
        ])}
      />

      <div className="max-w-5xl mx-auto mb-8">
        <div className="rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-5 sm:p-6 shadow-sm mb-8">
          <h1 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-700">
            Text to Base64 Converter
          </h1>
          <p className="mt-2 text-center text-sm sm:text-base text-slate-600">
            Encode text to Base64 and decode Base64 back to readable text instantly.
          </p>
        </div>

      {/* Main Tool Section */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6 md:p-8 mb-8">
        <div className="space-y-6">
          {/* Status Messages */}
          {message && (
            <div className={`px-4 py-3 rounded-xl shadow-sm border ${
              message.includes('✅') 
                ? 'bg-emerald-50 border-emerald-200' 
                : message.includes('⚠️')
                ? 'bg-amber-50 border-amber-200'
                : message.includes('📋')
                ? 'bg-cyan-50 border-cyan-200'
                : 'bg-red-50 border-red-200'
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
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                    {textStats.chars} chars
                  </span>
                )}
              </div>
              <textarea
                id="text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to convert to Base64..."
                className="w-full min-h-48 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 text-base resize-y"
              />
              <p className="mt-2 text-xs text-gray-500">
                Supports all characters including Unicode, emoji, and special symbols
              </p>
            </div>

            {/* Base64 Output */}
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-gray-700" htmlFor="base64-input">
                  🔐 Base64 Encoded
                </label>
                {base64 && (
                  <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full">
                    {base64Stats.chars} chars
                  </span>
                )}
              </div>
              <textarea
                id="base64-input"
                value={base64}
                onChange={(e) => setBase64(e.target.value)}
                placeholder="Paste Base64 code here to decode..."
                className="w-full min-h-48 px-4 py-3 border-2 border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 resize-y break-all"
              />
              <p className="mt-2 text-xs text-gray-500">
                Valid Base64 characters: A-Z, a-z, 0-9, +, /, =
              </p>
            </div>
          </div>

          {/* Statistics Display */}
          {text && base64 && (
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200">
              <h4 className="text-sm font-bold text-cyan-900 mb-3 flex items-center gap-2">
                <span className="text-xl">📊</span>
                Encoding Statistics
              </h4>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                  <div className="text-xs text-gray-600 mb-1">Original Size</div>
                  <div className="text-2xl font-bold text-emerald-600">{textStats.chars}</div>
                  <div className="text-xs text-gray-500">characters</div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                  <div className="text-xs text-gray-600 mb-1">Encoded Size</div>
                  <div className="text-2xl font-bold text-teal-600">{base64Stats.chars}</div>
                  <div className="text-xs text-gray-500">characters</div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                  <div className="text-xs text-gray-600 mb-1">Size Increase</div>
                  <div className="text-2xl font-bold text-orange-600">+{base64Stats.sizeIncrease}%</div>
                  <div className="text-xs text-gray-500">overhead</div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                  <div className="text-xs text-gray-600 mb-1">Text Stats</div>
                  <div className="text-sm font-semibold text-gray-700">
                    {textStats.words} words
                  </div>
                  <div className="text-xs text-gray-500">{textStats.lines} lines</div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={convertTextToBase64}
              disabled={!text.trim()}
              className={`flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-base shadow-lg transition-all duration-200
                ${!text.trim()
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-cyan-700 to-blue-700 text-white hover:from-cyan-800 hover:to-blue-800 transform hover:scale-105"}`}
            >
              🔒 Encode to Base64
            </button>

            <button
              onClick={convertBase64ToText}
              disabled={!base64.trim()}
              className={`flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-base shadow-lg transition-all duration-200
                ${!base64.trim()
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transform hover:scale-105"}`}
            >
              🔓 Decode from Base64
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
              onClick={copyBase64}
              disabled={!base64}
              className={`px-6 py-3 rounded-xl font-semibold text-base shadow-lg transition-all duration-200
                ${!base64
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-cyan-700 text-white hover:bg-cyan-800 transform hover:scale-105"}`}
            >
              📋 Copy Base64
            </button>

            <button
              onClick={reset}
              disabled={!text && !base64}
              className={`px-6 py-3 rounded-xl font-semibold text-base shadow-lg transition-all duration-200
                ${!text && !base64
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400"}`}
            >
              🔄 Reset All
            </button>
          </div>

          {/* Quick Reference Card */}
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200">
            <h4 className="text-base font-bold text-cyan-900 mb-3 flex items-center gap-2">
              <span className="text-xl">💡</span>
              Base64 Character Set
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
              <div className="bg-white rounded-lg p-3">
                <div className="font-semibold text-gray-900 mb-1">Uppercase</div>
                <div className="text-gray-600 text-xs font-mono">A-Z (26 chars)</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="font-semibold text-gray-900 mb-1">Lowercase</div>
                <div className="text-gray-600 text-xs font-mono">a-z (26 chars)</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="font-semibold text-gray-900 mb-1">Digits</div>
                <div className="text-gray-600 text-xs font-mono">0-9 (10 chars)</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="font-semibold text-gray-900 mb-1">Special</div>
                <div className="text-gray-600 text-xs font-mono">+ / = (3 chars)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Comprehensive Information Section */}
      <article className="space-y-8 max-w-5xl mx-auto">
  <section className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-10">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Why Base64 Encoding Exists in Modern Computing
    </h2>

    <div
      className="space-y-5 text-gray-700 leading-relaxed"
      style={{ textAlign: "justify" }}
    >
      <p>
        Computers regularly transfer binary information such as images,
        documents, authentication tokens, and multimedia content through systems
        originally designed to handle plain text only. This created a major
        challenge during the early growth of networking and digital
        communication.
      </p>

      <p>
        Base64 encoding solved this problem by converting binary data into a
        text-safe format using a limited set of readable ASCII characters.
        Instead of transmitting raw binary directly, systems could safely
        transfer encoded text through email protocols, APIs, HTTP headers, and
        communication channels that supported only standard characters.
      </p>

      <p>
        Even today, Base64 remains deeply integrated into web development, cloud
        services, APIs, email systems, authentication workflows, and browser
        technologies because it provides a simple and reliable method for text
        representation of binary content.
      </p>

      <p>
        Developers learning about encoding systems often combine workflows with{" "}
        <a
          href="https://convertixy.com/ascii-to-text"
          className="text-blue-600 font-medium hover:underline"
        >
          ASCII to Text
        </a>{" "}
        tools for understanding low-level data representation concepts.
      </p>
    </div>
  </section>

  <section className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-10">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Understanding How Base64 Encoding Works
    </h2>

    <div
      className="space-y-5 text-gray-700 leading-relaxed"
      style={{ textAlign: "justify" }}
    >
      <p>
        Base64 works by converting binary data into groups of printable
        characters selected from a predefined set of 64 symbols. These symbols
        include uppercase letters, lowercase letters, numbers, and a few special
        characters.
      </p>

      <p>
        During encoding, binary information gets reorganized into smaller bit
        groups which are then mapped to readable text characters. The result is
        a safe text-based representation that can travel through systems unable
        to handle raw binary safely.
      </p>

      <p>
        Because of this conversion process, Base64 output usually appears as a
        long string containing letters, numbers, slashes, plus symbols, and
        padding characters.
      </p>

      <p>
        Although the encoded result may look confusing to humans, decoding it
        restores the original information accurately without losing content.
      </p>
    </div>
  </section>

  <section className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-10">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Why Base64 Increases File Size
    </h2>

    <div
      className="space-y-5 text-gray-700 leading-relaxed"
      style={{ textAlign: "justify" }}
    >
      <p>
        One important thing to understand about Base64 encoding is that it makes
        data larger. Encoded content typically grows by around one-third compared
        to the original binary information.
      </p>

      <p>
        This increase happens because Base64 uses printable text characters to
        represent binary information, requiring more visible characters to store
        the same amount of data.
      </p>

      <p>
        Despite the size increase, Base64 remains extremely useful because
        compatibility and safe transmission are often more important than perfect
        storage efficiency.
      </p>

      <p>
        Developers usually accept this overhead when embedding images in HTML,
        transmitting API payloads, or sending attachments through email systems.
      </p>
    </div>
  </section>

  <section className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-10">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Common Uses of Base64 in Web Development
    </h2>

    <div
      className="space-y-5 text-gray-700 leading-relaxed"
      style={{ textAlign: "justify" }}
    >
      <p>
        Base64 plays a major role in frontend and backend web development.
        Developers often use it while embedding small images directly inside CSS
        or HTML using data URLs.
      </p>

      <p>
        APIs frequently return Base64-encoded files and images inside JSON
        responses because JSON itself is text-based and cannot safely store raw
        binary content directly.
      </p>

      <p>
        Authentication systems also rely heavily on Base64 for representing
        tokens, credentials, and encoded session data during communication
        between servers and applications.
      </p>

      <p>
        Developers managing API workflows and encoded payloads may additionally
        use{" "}
        <a
          href="https://convertixy.com/json-formatter"
          className="text-blue-600 font-medium hover:underline"
        >
          JSON Formatter
        </a>{" "}
        while debugging structured response data and request bodies.
      </p>
    </div>
  </section>

  <section className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-10">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Base64 Is Not Encryption
    </h2>

    <div
      className="space-y-5 text-gray-700 leading-relaxed"
      style={{ textAlign: "justify" }}
    >
      <p>
        One of the biggest misconceptions about Base64 is that people sometimes
        mistake it for encryption. In reality, Base64 does not provide security
        or confidentiality.
      </p>

      <p>
        Anyone can decode Base64 instantly using free tools or programming
        libraries because the process is completely reversible without passwords
        or secret keys.
      </p>

      <p>
        Encryption is designed to protect information using cryptographic
        algorithms, while Base64 simply changes how information is represented.
      </p>

      <p>
        Sensitive information should always be protected with proper encryption
        systems rather than relying on Base64 for security purposes.
      </p>

      <p>
        Security researchers and developers handling encoded transmissions may
        also benefit from{" "}
        <a
          href="https://convertixy.com/text-to-binary"
          className="text-blue-600 font-medium hover:underline"
        >
          Text to Binary
        </a>{" "}
        while exploring low-level encoding and communication concepts.
      </p>
    </div>
  </section>

  <section className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-10">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Why UTF-8 Support Matters During Encoding
    </h2>

    <div
      className="space-y-5 text-gray-700 leading-relaxed"
      style={{ textAlign: "justify" }}
    >
      <p>
        Modern applications handle far more than simple English text. Emoji,
        multilingual characters, international symbols, and Unicode content all
        require proper UTF-8 handling before Base64 conversion.
      </p>

      <p>
        Without UTF-8 support, encoded output may become corrupted or decode
        incorrectly when working with international languages or special
        characters.
      </p>

      <p>
        Modern Base64 converters first transform Unicode text into UTF-8 byte
        sequences before encoding them safely into Base64 representation.
      </p>

      <p>
        This ensures encoded content can later decode correctly back into its
        original readable form regardless of language or symbol complexity.
      </p>
    </div>
  </section>

  <section className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-10">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Advantages of Browser-Based Base64 Conversion
    </h2>

    <div
      className="space-y-5 text-gray-700 leading-relaxed"
      style={{ textAlign: "justify" }}
    >
      <p>
        Browser-based Base64 converters improve both privacy and convenience
        because all processing happens locally on the user’s device.
      </p>

      <p>
        Text, tokens, encoded credentials, and sensitive data do not need to be
        uploaded to external servers during conversion, reducing security risks
        significantly.
      </p>

      <p>
        Local browser processing also provides instant conversion speeds without
        requiring account creation, software installation, or server-side
        communication.
      </p>

      <p>
        This makes browser-based encoding tools especially useful for developers,
        businesses, and students working with confidential information or API
        credentials.
      </p>
    </div>
  </section>

  <section className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-10">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Common Problems While Working With Base64
    </h2>

    <div
      className="space-y-5 text-gray-700 leading-relaxed"
      style={{ textAlign: "justify" }}
    >
      <p>
        One common issue occurs when encoded strings become incomplete because of
        accidental truncation during copying or transmission. Even missing a few
        characters can make decoding fail entirely.
      </p>

      <p>
        Developers also sometimes confuse URL-safe Base64 with standard Base64.
        URL-safe variants replace certain symbols to avoid conflicts inside URLs
        and query parameters.
      </p>

      <p>
        Another frequent problem involves incorrectly handling Unicode characters
        without proper UTF-8 conversion, leading to corrupted decoded text.
      </p>

      <p>
        Understanding these limitations helps developers avoid debugging issues
        and compatibility problems while working with encoded content.
      </p>

      <p>
        Developers inspecting encoded network payloads may additionally use{" "}
        <a
          href="https://convertixy.com/url-decoder"
          className="text-blue-600 font-medium hover:underline"
        >
          URL Decoder
        </a>{" "}
        while debugging transmitted parameters and encoded request data.
      </p>
    </div>
  </section>

  <section className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-10">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Frequently Asked Questions
    </h2>

    <div className="space-y-6" style={{ textAlign: "justify" }}>
      <div className="border-l-4 border-emerald-500 pl-6 py-3 bg-emerald-50 rounded-r-xl">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Is Base64 secure?
        </h3>

        <p className="text-gray-700 leading-relaxed">
          No. Base64 is an encoding system, not an encryption method. Anyone can
          decode Base64 content easily.
        </p>
      </div>

      <div className="border-l-4 border-emerald-500 pl-6 py-3 bg-emerald-50 rounded-r-xl">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Why does Base64 output look random?
        </h3>

        <p className="text-gray-700 leading-relaxed">
          Base64 converts binary data into text-safe characters, creating encoded
          strings that do not resemble the original readable content visually.
        </p>
      </div>

      <div className="border-l-4 border-emerald-500 pl-6 py-3 bg-emerald-50 rounded-r-xl">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Why is Base64 larger than original data?
        </h3>

        <p className="text-gray-700 leading-relaxed">
          Base64 uses additional printable characters to represent binary data,
          which increases overall size by roughly 33 percent.
        </p>
      </div>

      <div className="border-l-4 border-emerald-500 pl-6 py-3 bg-emerald-50 rounded-r-xl">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Can Base64 handle emoji and Unicode text?
        </h3>

        <p className="text-gray-700 leading-relaxed">
          Yes. Modern converters use UTF-8 processing to support international
          characters, symbols, and emoji correctly.
        </p>
      </div>

      <div className="border-l-4 border-emerald-500 pl-6 py-3 bg-emerald-50 rounded-r-xl">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          What are the equals signs at the end of Base64 strings?
        </h3>

        <p className="text-gray-700 leading-relaxed">
          They are padding characters used to maintain proper encoding structure
          when input length is not evenly divisible during conversion.
        </p>
      </div>

      <div className="border-l-4 border-emerald-500 pl-6 py-3 bg-emerald-50 rounded-r-xl">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Is browser-based conversion private?
        </h3>

        <p className="text-gray-700 leading-relaxed">
          Yes. Browser-based tools usually process content locally on the device
          instead of uploading information externally.
        </p>
      </div>
    </div>
  </section>

  <section className="bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 rounded-2xl shadow-xl border border-cyan-200 p-6 md:p-10">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Final Thoughts
    </h2>

    <div
      className="space-y-5 text-gray-700 leading-relaxed"
      style={{ textAlign: "justify" }}
    >
      <p>
        Base64 encoding remains one of the most widely used data representation
        techniques in modern software systems because it solves the practical
        challenge of transmitting binary information safely through text-based
        environments.
      </p>

      <p>
        From APIs and authentication systems to email attachments and embedded
        web assets, Base64 continues playing a major role across development,
        networking, and digital communication workflows.
      </p>

      <p>
        Browser-based Base64 converters make encoding and decoding fast, secure,
        and accessible without requiring installations or complex technical
        setup.
      </p>

      <p>
        Whether you are debugging APIs, working with authentication tokens,
        learning encoding fundamentals, or embedding binary content inside web
        applications, understanding Base64 helps improve technical knowledge and
        modern development workflows significantly.
      </p>
    </div>
  </section>
</article>
    </ToolSection>
  );
}
