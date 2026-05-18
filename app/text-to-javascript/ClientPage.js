"use client";

import { useEffect, useRef, useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function TextToJavascriptPage() {
  const [text, setText] = useState("");
  const [javascript, setJavascript] = useState("");
  const [message, setMessage] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);
  const inputRef = useRef(null);
  const outputSectionRef = useRef(null);

  const autoResize = (element) => {
    if (!element) return;
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  };

  useEffect(() => {
    autoResize(inputRef.current);
  }, [text]);

  useEffect(() => {
    if (javascript.trim()) {
      outputSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [javascript]);

  async function convertTextToJavascript() {
    if (!text.trim()) {
      setMessage("⚠️ Please enter text to convert to JavaScript code.");
      return;
    }

    try {
      setMessage("");
      setIsGenerated(false);

      const response = await fetch("/api/text-to-javascript", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
        }),
      });

      if (!response.ok) {
        setMessage("❌ Unable to convert right now. Please try again.");
        setIsGenerated(false);
        return;
      }

      const data = await response.json();
      if (!data?.code) {
        setMessage("❌ Unable to convert right now. Please try again.");
        setIsGenerated(false);
        return;
      }
      setJavascript(data.code);
      setIsGenerated(true);
      setMessage("");
    } catch (error) {
      setMessage("❌ Unable to convert right now. Please try again.");
      setIsGenerated(false);
      console.error(error);
    }
  }

  function copyJavascript() {
    navigator.clipboard.writeText(javascript);
    setMessage("📋 JavaScript code copied to clipboard!");
  }

  function downloadJavascript() {
    const blob = new Blob([javascript], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted-text.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setMessage("💾 JavaScript file downloaded!");
  }

  function reset() {
    setText("");
    setJavascript("");
    setMessage("🧹 All fields cleared!");
    setIsGenerated(false);
  }

  return (
    <ToolSection
      title="Text to JavaScript Converter - Free Online Tool"
      subtitle="Convert plain text to JavaScript code instantly. Transform text into JS arrays, objects, or functions with proper escaping and formatting."
      plain
      hideSidebar
      centerHeader
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Text to JavaScript Converter",
          description: "Free online tool to convert text to JavaScript code and JavaScript to text. Supports arrays, objects, and functions with automatic character escaping.",
          slug: "/text-to-javascript",
          category: "Utilities/Text",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Text to JavaScript Converter", slug: "/text-to-javascript" },
        ])}
      />

      <div className="space-y-6 max-w-5xl mx-auto w-full">
        <div className="rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-5 sm:p-6 shadow-sm mb-8">
          <h1 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-700">
            Text to JavaScript Converter
          </h1>
          <p className="mt-2 text-center text-sm sm:text-base text-slate-600">
            Convert plain text into valid JavaScript code with proper escaping and formatting.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-5 md:p-6">
        {/* Status Messages */}
        {message && (
          <div className="px-4 py-3 bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl text-gray-800 text-sm shadow-sm">
            {message}
          </div>
        )}

        {/* Text Input */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <label className="block text-base md:text-lg font-semibold text-gray-800 mb-3">
            📝 Input Text
          </label>
          <textarea
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onInput={(e) => autoResize(e.currentTarget)}
            placeholder="Enter or paste your text here... Multiple lines are supported. Special characters will be automatically escaped."
            className="w-full min-h-32 md:min-h-36 px-4 md:px-5 py-3 md:py-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none overflow-hidden font-mono text-lg md:text-xl transition-all duration-200"
            style={{ textAlign: 'justify' }}
          />
          <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
            <span>💡 Tip: Paste multi-line text for batch conversion</span>
            {text && <span className="font-medium">{text.length} characters</span>}
          </div>
          <div className="flex gap-3 flex-wrap mt-4">
            <button
              onClick={convertTextToJavascript}
              disabled={!text.trim()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold
                         bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg 
                         hover:from-cyan-800 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed
                         transform transition-all duration-200 hover:scale-105"
            >
              🔄 Convert to JavaScript
            </button>
            {javascript && (
              <>
                <button
                  onClick={copyJavascript}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold
                             bg-cyan-700 text-white shadow-lg hover:bg-cyan-800
                             transform transition-all duration-200 hover:scale-105"
                >
                  📋 Copy Code
                </button>

                <button
                  onClick={downloadJavascript}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold
                             bg-orange-600 text-white shadow-lg hover:bg-orange-700
                             transform transition-all duration-200 hover:scale-105"
                >
                  💾 Download JS
                </button>
              </>
            )}

            <button
              onClick={reset}
              disabled={!text.trim() && !javascript.trim()}
              className="px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 bg-white 
                         hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed
                         transform transition-all duration-200 hover:scale-105"
            >
              🗑️ Clear All
            </button>
          </div>
        </div>

        {isGenerated && (
          <div className="text-green-600 font-semibold text-lg">
            Code generated successfully
          </div>
        )}

        {/* JavaScript Output */}
        <div ref={outputSectionRef}>
          <label className="block text-base md:text-lg font-semibold text-gray-800 mb-3">
            💻 JavaScript Output
          </label>
          <pre className="w-full min-h-48 md:min-h-52 px-4 md:px-5 py-3 md:py-4 border-2 border-gray-200 rounded-lg bg-gray-900 text-gray-100 font-mono text-lg md:text-xl whitespace-pre-wrap break-words">
            <code>
              {javascript || "// JavaScript output will appear here...\n// Click 'Convert to JavaScript'"}
            </code>
          </pre>
          <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
            <span>✨ Ready-to-use JavaScript code with proper formatting</span>
            {javascript && <span className="font-medium">{javascript.length} characters</span>}
          </div>
        </div>

        {/* Text Statistics */}
        {text && (
          <div className="border-2 rounded-xl p-5 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm">
            <h4 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
              📊 Text Analysis & Statistics
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-xs font-medium text-gray-600 mb-1">Characters</div>
                <div className="text-2xl font-bold text-indigo-600">{text.length}</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-xs font-medium text-gray-600 mb-1">Words</div>
                <div className="text-2xl font-bold text-green-600">
                  {text.split(/\s+/).filter(word => word.length > 0).length}
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-xs font-medium text-gray-600 mb-1">Lines</div>
                <div className="text-2xl font-bold text-purple-600">{text.split('\n').length}</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-xs font-medium text-gray-600 mb-1">Paragraphs</div>
                <div className="text-2xl font-bold text-orange-600">
                  {text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border-2 rounded-xl p-5 bg-gradient-to-br from-blue-50 to-blue-100 shadow-sm">
            <h4 className="text-sm font-bold text-blue-800 mb-2 flex items-center gap-2">
              ⚡ Fast Conversion
            </h4>
            <p className="text-xs text-gray-700" style={{ textAlign: 'justify' }}>
              Convert your text to JavaScript instantly with a single click. No delays, no waiting.
            </p>
          </div>
          
          <div className="border-2 rounded-xl p-5 bg-gradient-to-br from-green-50 to-green-100 shadow-sm">
            <h4 className="text-sm font-bold text-green-800 mb-2 flex items-center gap-2">
              🔒 100% Secure
            </h4>
            <p className="text-xs text-gray-700" style={{ textAlign: 'justify' }}>
              All conversions happen in your browser. Your data never leaves your device.
            </p>
          </div>
          
          <div className="border-2 rounded-xl p-5 bg-gradient-to-br from-purple-50 to-purple-100 shadow-sm">
            <h4 className="text-sm font-bold text-purple-800 mb-2 flex items-center gap-2">
              🆓 Completely Free
            </h4>
            <p className="text-xs text-gray-700" style={{ textAlign: 'justify' }}>
              No registration, no limits, no hidden fees. Use it as much as you need.
            </p>
          </div>
        </div>
        </div>
      </div>

      {/* Comprehensive Information Section */}
      <section className="space-y-8 max-w-5xl mx-auto">
  <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-10">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Why Developers Convert Plain Text Into JavaScript
    </h2>

    <div
      className="space-y-5 text-gray-700 leading-relaxed"
      style={{ textAlign: "justify" }}
    >
      <p>
        Modern JavaScript applications handle huge amounts of text every day.
        User messages, configuration values, documentation, notifications,
        product descriptions, templates, API responses, and UI labels are often
        stored directly inside JavaScript code.
      </p>

      <p>
        Manually formatting large text blocks into valid JavaScript syntax can be
        frustrating and time-consuming. Developers usually need to escape quotes,
        preserve line breaks, handle special characters, and structure data
        properly before it becomes usable inside applications.
      </p>

      <p>
        A Text to JavaScript converter automates this process instantly. Instead
        of manually editing every line, users can transform plain text into clean
        JavaScript-ready structures within seconds.
      </p>

      <p>
        Developers organizing formatted code structures may also use{" "}
        <a
          href="https://convertixy.com/json-formatter"
          className="text-blue-600 font-medium hover:underline"
        >
          JSON Formatter
        </a>{" "}
        while working with APIs, configuration files, and structured datasets.
      </p>
    </div>
  </div>

  <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl shadow-xl border border-cyan-100 p-6 md:p-10">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      What a Text to JavaScript Converter Actually Does
    </h2>

    <div
      className="space-y-5 text-gray-700 leading-relaxed"
      style={{ textAlign: "justify" }}
    >
      <p>
        A Text to JavaScript converter transforms normal readable text into valid
        JavaScript syntax that developers can directly place inside their
        projects.
      </p>

      <p>
        During conversion, the tool automatically handles quotes, backslashes,
        line breaks, tabs, and other special characters which could otherwise
        break JavaScript code if entered incorrectly.
      </p>

      <p>
        Instead of producing raw text only, advanced converters may generate
        arrays, objects, reusable functions, or structured variables depending
        on the selected output format.
      </p>

      <p>
        This automation reduces syntax mistakes significantly and helps
        developers save time during frontend, backend, and scripting workflows.
      </p>
    </div>
  </div>

  <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-10">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Different Output Formats and Their Benefits
    </h2>

    <div
      className="space-y-5 text-gray-700 leading-relaxed"
      style={{ textAlign: "justify" }}
    >
      <p>
        Array-based output formats work extremely well for line-by-line content
        processing. Each line becomes a separate array element, making iteration
        and manipulation much easier inside loops and data-processing logic.
      </p>

      <p>
        Object-based structures provide organized access to text content through
        named properties. This approach becomes useful when developers need
        structured references instead of simple sequential lists.
      </p>

      <p>
        Function-based output formats are more advanced because they wrap content
        inside reusable JavaScript logic with helper methods and additional
        utilities.
      </p>

      <p>
        Choosing the correct format depends on how the text will be processed
        inside the application workflow.
      </p>

      <p>
        Developers handling encoded or structured data may additionally benefit
        from{" "}
        <a
          href="https://convertixy.com/base64-encoder"
          className="text-blue-600 font-medium hover:underline"
        >
          Base64 Encoder
        </a>{" "}
        while transmitting or storing text content safely.
      </p>
    </div>
  </div>

  <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl shadow-xl border border-emerald-100 p-6 md:p-10">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Why Character Escaping Is So Important
    </h2>

    <div
      className="space-y-5 text-gray-700 leading-relaxed"
      style={{ textAlign: "justify" }}
    >
      <p>
        JavaScript interprets certain symbols differently during execution. If
        special characters are not escaped correctly, applications may produce
        syntax errors or unexpected behavior.
      </p>

      <p>
        Quotes inside text strings are one of the most common causes of broken
        JavaScript code. Backslashes, tabs, and newlines can also create
        formatting issues when inserted manually.
      </p>

      <p>
        A converter automatically escapes these characters properly using valid
        JavaScript syntax rules, reducing the risk of debugging problems later.
      </p>

      <p>
        This becomes especially useful when handling large text blocks, dynamic
        templates, imported content, or multilingual datasets.
      </p>
    </div>
  </div>

  <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-10">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Real-World Uses Across Development Workflows
    </h2>

    <div
      className="space-y-5 text-gray-700 leading-relaxed"
      style={{ textAlign: "justify" }}
    >
      <p>
        Frontend developers use text conversion while creating UI labels,
        notifications, translations, onboarding messages, and reusable
        components.
      </p>

      <p>
        Backend developers working with Node.js often convert templates,
        configuration values, logging data, and email content into JavaScript
        structures for easier application integration.
      </p>

      <p>
        Students learning JavaScript also benefit because the conversion process
        helps demonstrate how strings, arrays, objects, and functions work
        internally.
      </p>

      <p>
        QA teams and testers frequently generate mock datasets and reusable test
        content using automated text-to-code conversion tools.
      </p>

      <p>
        Developers managing text formatting and editing workflows may also use{" "}
        <a
          href="https://convertixy.com/text-case-converter"
          className="text-blue-600 font-medium hover:underline"
        >
          Text Case Converter
        </a>{" "}
        for improving consistency across large datasets and application content.
      </p>
    </div>
  </div>

  <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl shadow-xl border border-cyan-100 p-6 md:p-10">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Advantages of Browser-Based Conversion Tools
    </h2>

    <div
      className="space-y-5 text-gray-700 leading-relaxed"
      style={{ textAlign: "justify" }}
    >
      <p>
        Browser-based converters improve both accessibility and privacy because
        all processing happens directly inside the browser instead of external
        servers.
      </p>

      <p>
        Sensitive text, application templates, internal documentation, and
        confidential content remain on the user’s device during conversion.
      </p>

      <p>
        Local browser processing also improves speed because there is no need for
        server-side uploads or network communication before generating output.
      </p>

      <p>
        Since these tools work directly online without installation, developers
        can access them instantly across Windows, Linux, macOS, Android, and iOS
        devices.
      </p>
    </div>
  </div>

  <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-10">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Common Mistakes Developers Make During Conversion
    </h2>

    <div
      className="space-y-5 text-gray-700 leading-relaxed"
      style={{ textAlign: "justify" }}
    >
      <p>
        One common mistake is manually copying large text blocks into JavaScript
        without escaping quotes or backslashes correctly.
      </p>

      <p>
        Developers also sometimes mix single quotes, double quotes, and template
        literals inconsistently, creating confusing formatting problems inside
        projects.
      </p>

      <p>
        Another issue appears when multiline text loses formatting during manual
        editing, especially inside configuration files or templates.
      </p>

      <p>
        Automated converters help eliminate these problems by generating
        syntactically valid output consistently every time.
      </p>

      <p>
        Developers debugging text-processing workflows may additionally use{" "}
        <a
          href="https://convertixy.com/text-diff-checker"
          className="text-blue-600 font-medium hover:underline"
        >
          Text Diff Checker
        </a>{" "}
        while comparing modified code blocks and generated output versions.
      </p>
    </div>
  </div>

  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl shadow-xl border border-yellow-100 p-6 md:p-10">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Frequently Asked Questions
    </h2>

    <div className="space-y-6" style={{ textAlign: "justify" }}>
      <div className="border-l-4 border-yellow-500 pl-6 py-3 bg-white rounded-r-xl">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          What does this tool do?
        </h3>

        <p className="text-gray-700 leading-relaxed">
          It converts plain text into valid JavaScript code structures such as
          strings, arrays, objects, and reusable functions.
        </p>
      </div>

      <div className="border-l-4 border-yellow-500 pl-6 py-3 bg-white rounded-r-xl">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Does it handle special characters automatically?
        </h3>

        <p className="text-gray-700 leading-relaxed">
          Yes. Quotes, line breaks, tabs, backslashes, and other special
          characters are escaped automatically using proper JavaScript syntax.
        </p>
      </div>

      <div className="border-l-4 border-yellow-500 pl-6 py-3 bg-white rounded-r-xl">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Can I convert multiline text?
        </h3>

        <p className="text-gray-700 leading-relaxed">
          Yes. The converter supports multiline content and preserves formatting
          correctly during conversion.
        </p>
      </div>

      <div className="border-l-4 border-yellow-500 pl-6 py-3 bg-white rounded-r-xl">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Is browser-based conversion secure?
        </h3>

        <p className="text-gray-700 leading-relaxed">
          Yes. Browser-based tools process content locally, helping keep private
          data on the user’s device instead of external servers.
        </p>
      </div>

      <div className="border-l-4 border-yellow-500 pl-6 py-3 bg-white rounded-r-xl">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Which format should I choose?
        </h3>

        <p className="text-gray-700 leading-relaxed">
          Arrays are useful for lists, objects work well for structured data, and
          function formats provide reusable logic with advanced flexibility.
        </p>
      </div>

      <div className="border-l-4 border-yellow-500 pl-6 py-3 bg-white rounded-r-xl">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Does the tool work on mobile devices?
        </h3>

        <p className="text-gray-700 leading-relaxed">
          Yes. Modern browser-based converters work across desktops, tablets, and
          smartphones without installation requirements.
        </p>
      </div>
    </div>
  </div>

  <div className="bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 rounded-2xl shadow-xl border border-cyan-100 p-6 md:p-10">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Final Thoughts
    </h2>

    <div
      className="space-y-5 text-gray-700 leading-relaxed"
      style={{ textAlign: "justify" }}
    >
      <p>
        Text to JavaScript conversion has become an essential part of modern web
        development, application design, testing workflows, and content
        management systems.
      </p>

      <p>
        Automated conversion tools remove repetitive formatting work while
        helping developers generate cleaner and more reliable JavaScript code
        quickly.
      </p>

      <p>
        Browser-based solutions further improve convenience through fast local
        processing, privacy protection, and installation-free accessibility
        across all major platforms.
      </p>

      <p>
        Whether you are creating frontend interfaces, backend services,
        configuration systems, educational projects, or reusable application
        modules, a reliable Text to JavaScript converter can simplify development
        workflows significantly while reducing syntax-related mistakes.
      </p>
    </div>
  </div>
</section>
    </ToolSection>
  );
}
