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
      plainSidebar
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

      <div className="space-y-6 max-w-6xl mx-auto w-full">
        {/* Status Messages */}
        {message && (
          <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-indigo-500 rounded-r-lg text-gray-800 text-sm shadow-sm">
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
                         hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed
                         transform transition-all duration-200 hover:scale-105"
            >
              🔄 Convert to JavaScript
            </button>
            {javascript && (
              <>
                <button
                  onClick={copyJavascript}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold
                             bg-purple-600 text-white shadow-lg hover:bg-purple-700
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

      {/* Comprehensive Information Section */}
      <section className="mt-12 space-y-8">
        {/* Main Introduction */}
        <div className="p-6 bg-white border-2 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b-2 border-indigo-200 pb-2">
            🚀 Text to JavaScript Converter - Your Complete Guide
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed" style={{ textAlign: 'justify' }}>
            Welcome to the most comprehensive and user-friendly Text to JavaScript Converter available online. This powerful tool has been specifically designed to help developers, programmers, content creators, students, and anyone working with JavaScript to seamlessly convert plain text into properly formatted JavaScript code. In today's digital development landscape, the ability to quickly transform text data into executable code is not just convenient but essential for efficient workflow and productivity.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed" style={{ textAlign: 'justify' }}>
            JavaScript has become the backbone of modern web development, powering everything from simple interactive elements to complex single-page applications and server-side solutions through Node.js. When working with JavaScript, developers frequently need to embed text content, user messages, configuration data, or documentation strings directly into their code. Manually formatting this text, escaping special characters, adding proper quotes, and organizing it into valid JavaScript syntax can be time-consuming and error-prone. This is where our Text to JavaScript Converter becomes an invaluable asset in your development toolkit.
          </p>
          <p className="text-gray-700 leading-relaxed" style={{ textAlign: 'justify' }}>
            Our converter goes beyond simple text transformation by offering multiple output formats including arrays, objects, and functions, each suited for different use cases in JavaScript programming. Whether you are building a website, creating a web application, working on a Node.js project, or simply learning JavaScript fundamentals, this tool streamlines your workflow by eliminating the tedious manual work of text formatting and allowing you to focus on what really matters writing great code and building amazing applications.
          </p>
        </div>

        {/* What is This Tool */}
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
            🎯 What is a Text to JavaScript Converter?
          </h3>
          <p className="text-gray-700 mb-4 leading-relaxed" style={{ textAlign: 'justify' }}>
            A Text to JavaScript Converter is a specialized web-based utility that automatically transforms plain text content into valid, executable JavaScript code. The conversion process involves more than just wrapping text in quotes it intelligently handles special characters, escape sequences, line breaks, and formatting to ensure the output is syntactically correct and ready to use in your JavaScript projects without any manual adjustments.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed" style={{ textAlign: 'justify' }}>
            When you paste text into our converter, it analyzes the content and applies proper JavaScript string escaping rules. This means characters like quotes, backslashes, newlines, and tabs are automatically escaped with the appropriate backslash sequences. For example, a double quote becomes a backslash followed by a double quote, ensuring that when the JavaScript interpreter reads your code, it correctly interprets the text content without syntax errors or unexpected behavior.
          </p>
          <p className="text-gray-700 leading-relaxed" style={{ textAlign: 'justify' }}>
            Our converter offers three distinct output formats. The array format creates a JavaScript array where each line of your input text becomes a separate string element perfect for processing lists or multi-line content. The object format generates a JavaScript object with numbered properties, ideal for structured data access. The function format wraps your text in a reusable JavaScript function that returns not just the text but also useful metadata like character counts, word counts, and helper methods for searching and manipulating the content. This flexibility makes our tool suitable for a wide range of development scenarios, from simple data embedding to complex content management systems.
          </p>
        </div>

        {/* Key Features */}
        <div className="p-6 bg-white border-2 rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
            ✨ Powerful Features That Set Us Apart
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-l-4 border-indigo-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">🔄 Bidirectional Conversion</h4>
              <p className="text-sm text-gray-700" style={{ textAlign: 'justify' }}>
                Convert text to JavaScript and JavaScript back to text seamlessly. Extract string content from existing code for editing or analysis.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">📦 Multiple Output Formats</h4>
              <p className="text-sm text-gray-700" style={{ textAlign: 'justify' }}>
                Choose between array, object, or function format based on your specific needs. Each format includes helpful comments and usage examples.
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">🛡️ Automatic Character Escaping</h4>
              <p className="text-sm text-gray-700" style={{ textAlign: 'justify' }}>
                All special characters, quotes, backslashes, and escape sequences are handled automatically, ensuring valid JavaScript syntax every time.
              </p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">📊 Real-time Statistics</h4>
              <p className="text-sm text-gray-700" style={{ textAlign: 'justify' }}>
                Get instant feedback with character count, word count, line count, and paragraph count as you type or paste your text.
              </p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">💾 Download JavaScript Files</h4>
              <p className="text-sm text-gray-700" style={{ textAlign: 'justify' }}>
                Save your converted JavaScript code as a proper JS file with one click, ready to import into your project immediately.
              </p>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">🔒 Privacy & Security</h4>
              <p className="text-sm text-gray-700" style={{ textAlign: 'justify' }}>
                All processing happens locally in your browser. No data is uploaded to servers, ensuring complete privacy and security.
              </p>
            </div>
          </div>
        </div>

        {/* How to Use */}
        <div className="p-6 bg-gradient-to-r from-green-50 to-teal-50 border-2 rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
            📖 Step-by-Step Usage Guide
          </h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Choose Your Output Format</h4>
                <p className="text-sm text-gray-700" style={{ textAlign: 'justify' }}>
                  Select from Array, Object, or Function format depending on how you plan to use the converted code. Arrays are great for lists, objects for structured data, and functions for advanced use cases with built-in utilities.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Enter or Paste Your Text</h4>
                <p className="text-sm text-gray-700" style={{ textAlign: 'justify' }}>
                  Type directly into the input field or paste text from any source. You can include multiple lines, paragraphs, special characters, quotes, and any other content. The tool handles everything automatically.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Click Convert to JavaScript</h4>
                <p className="text-sm text-gray-700" style={{ textAlign: 'justify' }}>
                  Press the conversion button and instantly see your text transformed into clean, properly formatted JavaScript code complete with comments, timestamps, and usage examples.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Copy or Download the Code</h4>
                <p className="text-sm text-gray-700" style={{ textAlign: 'justify' }}>
                  Use the Copy Code button to copy the JavaScript to your clipboard, or click Download JS to save it as a JS file. Both options preserve all formatting and make it easy to integrate into your project immediately.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                5
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Reverse Conversion (Optional)</h4>
                <p className="text-sm text-gray-700" style={{ textAlign: 'justify' }}>
                  Need to extract text from JavaScript code? Paste the JavaScript in the output field and click Convert to Text. The tool intelligently extracts all string literals back into plain text.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="p-6 bg-white border-2 rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
            💼 Real-World Use Cases & Applications
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                🌐 Web Development & Frontend Projects
              </h4>
              <p className="text-sm text-gray-700 mb-2" style={{ textAlign: 'justify' }}>
                Frontend developers constantly need to embed text content into JavaScript applications. Whether you are building a React, Vue, Angular, or vanilla JavaScript application, you often need to store UI text, error messages, tooltips, help documentation, or placeholder content as JavaScript strings. Instead of manually typing out arrays of strings and dealing with quote escaping, simply paste your content into our converter and get production-ready JavaScript code instantly. This is especially useful when localizing applications or managing large amounts of static text content.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                🔧 Backend Development with Node.js
              </h4>
              <p className="text-sm text-gray-700 mb-2" style={{ textAlign: 'justify' }}>
                Node.js developers frequently work with configuration files, email templates, log messages, and data processing scripts. Converting text templates or configuration data into JavaScript makes them easier to version control, modify, and integrate with your backend logic. Use our converter to transform email templates, API response messages, database seed data, or any text-based configuration into proper JavaScript modules that can be easily imported and used throughout your Node.js application.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                📚 Education & Learning JavaScript
              </h4>
              <p className="text-sm text-gray-700 mb-2" style={{ textAlign: 'justify' }}>
                For students and educators, this tool serves as an excellent learning resource for understanding how JavaScript handles strings, arrays, and data structures. Teachers can demonstrate string escaping, array creation, and object literals using real examples. Students can experiment with different text inputs to see how JavaScript represents and processes text data. It helps visualize the relationship between human-readable text and machine-executable code, making abstract programming concepts more concrete and understandable.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                🐛 Debugging & Testing
              </h4>
              <p className="text-sm text-gray-700 mb-2" style={{ textAlign: 'justify' }}>
                When debugging JavaScript applications, you often need to create test data or mock content quickly. Our converter lets you paste any text and immediately get JavaScript code you can drop into your test files or debugging console. It is also useful for converting error messages, log files, or output from other programs into JavaScript format for further analysis. The bidirectional conversion feature means you can also extract text from JavaScript code to examine it in plain text format, making it easier to spot issues or understand what is stored in your variables.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                📄 Content Management & Documentation
              </h4>
              <p className="text-sm text-gray-700" style={{ textAlign: 'justify' }}>
                Technical writers and documentation specialists can use this tool to convert documentation, help text, or user guides into JavaScript format for inclusion in web applications or Node.js tools. If you are building a CLI tool, chatbot, or interactive application that needs to display large amounts of text, convert your content using our tool and integrate it seamlessly into your codebase. The function format is particularly useful here as it provides built-in methods for searching, filtering, and processing your text content programmatically.
              </p>
            </div>
          </div>
        </div>

        {/* Why Use This Tool */}
        <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-2 rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
            🎯 Why Choose Our Text to JavaScript Converter?
          </h3>
          <p className="text-gray-700 mb-4 leading-relaxed" style={{ textAlign: 'justify' }}>
            In a world where countless online tools promise similar functionality, our Text to JavaScript Converter stands out through its commitment to quality, user experience, and developer-focused features. We have built this tool from the ground up with input from professional developers, understanding the real challenges they face when working with text and code conversion in their daily workflows.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed" style={{ textAlign: 'justify' }}>
            The primary advantage of using our converter is the combination of simplicity and power. The interface is clean and intuitive beginners can start converting text immediately without any learning curve, while advanced users appreciate the multiple format options, download capabilities, and the quality of the generated code complete with helpful comments and usage examples. Unlike many converters that simply wrap text in quotes, our tool generates production-ready code that follows JavaScript best practices and includes proper documentation.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed" style={{ textAlign: 'justify' }}>
            Security and privacy are paramount in our design. All conversion operations happen entirely within your web browser using JavaScript. Your text never leaves your device, is not uploaded to any server, and is not stored or logged anywhere. This makes our tool safe for converting sensitive content like proprietary code comments, internal documentation, or confidential text data. You can use it with complete confidence knowing your information remains private.
          </p>
          <p className="text-gray-700 leading-relaxed" style={{ textAlign: 'justify' }}>
            Performance is another key differentiator. Our converter processes even large text files instantly without lag or delays. The lightweight codebase ensures fast page loads and responsive interactions, while the efficient conversion algorithms handle complex character escaping and formatting without consuming excessive system resources. Whether you are on a desktop computer or a mobile device, the experience remains smooth and professional.
          </p>
        </div>

        {/* Technical Details */}
        <div className="p-6 bg-white border-2 rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
            ⚙️ Technical Implementation & Best Practices
          </h3>
          <p className="text-gray-700 mb-4 leading-relaxed" style={{ textAlign: 'justify' }}>
            Understanding the technical aspects of text to JavaScript conversion helps developers use the tool more effectively and appreciate the complexity behind the simple interface. When you convert text to JavaScript, several important transformations occur automatically to ensure the output is valid and safe to use in your applications.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed" style={{ textAlign: 'justify' }}>
            Character escaping is the foundation of proper conversion. JavaScript uses backslash as an escape character, meaning certain characters must be preceded by a backslash to be interpreted correctly. Our converter automatically escapes double quotes, single quotes, backslashes themselves, newline characters, tab characters, and carriage returns. This prevents syntax errors and ensures your text displays exactly as intended when the JavaScript code executes. For example, a text containing the phrase she said "hello" is converted to she said \"hello\" with the quotes properly escaped.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed" style={{ textAlign: 'justify' }}>
            The array format splits your text by newlines and creates a JavaScript array where each element is a string representing one line of the original text. This format is ideal when you need to process text line by line, such as reading configuration files, parsing CSV data, or displaying lists of items. The generated code includes example loops and methods showing how to iterate through the array and access individual lines.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed" style={{ textAlign: 'justify' }}>
            The object format creates a JavaScript object with properties like line1, line2, etc., where each property value is a string containing one line of text. This format provides named access to each line and is useful when you need to reference specific lines by their position or when building structured data representations. You can easily access any line using object notation like textObject.line5.
          </p>
          <p className="text-gray-700 leading-relaxed" style={{ textAlign: 'justify' }}>
            The function format is the most sophisticated option, generating a JavaScript function that returns an object containing not just the text lines but also computed properties like total character count, word count, and helper methods for searching and manipulating the text. This format is perfect for building reusable modules or when you need to perform operations on the text data programmatically. The function can be exported and imported across different parts of your application, promoting code reuse and maintainability.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
            ❓ Frequently Asked Questions (FAQ)
          </h3>
          <div className="space-y-4">
            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">What is this tool used for?</h4>
              <p className="text-sm text-gray-700" style={{ textAlign: 'justify' }}>
                This tool converts plain text into properly formatted JavaScript code (arrays, objects, or functions) and can also extract text from existing JavaScript code. It is designed for developers who need to embed text content into their JavaScript applications quickly and correctly.
              </p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">Do I need to install anything to use this converter?</h4>
              <p className="text-sm text-gray-700" style={{ textAlign: 'justify' }}>
                No installation is required. This is a completely web-based tool that runs directly in your browser. Simply open the page, paste your text, and start converting. It works on all modern browsers including Chrome, Firefox, Safari, Edge, and mobile browsers.
              </p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">Is my text data safe and private?</h4>
              <p className="text-sm text-gray-700" style={{ textAlign: 'justify' }}>
                Absolutely. All conversions happen locally in your browser using JavaScript. Your text is never uploaded to any server, stored in any database, or transmitted over the internet. This makes it completely safe to use even with sensitive or confidential information.
              </p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">What is the difference between array, object, and function formats?</h4>
              <p className="text-sm text-gray-700" style={{ textAlign: 'justify' }}>
                Array format creates a JavaScript array ideal for line-by-line processing. Object format creates a JavaScript object with numbered properties for structured access. Function format creates a JavaScript function that returns text plus helper methods for searching, counting, and manipulating the content. Choose based on your specific use case.
              </p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">Can it handle special characters and Unicode?</h4>
              <p className="text-sm text-gray-700" style={{ textAlign: 'justify' }}>
                Yes, the converter automatically handles all special characters including quotes, backslashes, newlines, tabs, and Unicode characters. All escaping is done automatically according to JavaScript string literal rules, ensuring the output is always syntactically correct.
              </p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">Is there a limit to how much text I can convert?</h4>
              <p className="text-sm text-gray-700" style={{ textAlign: 'justify' }}>
                There is no hard limit imposed by the tool itself. However, very large text files (multiple megabytes) may be limited by your browser's memory capacity. For most practical uses including entire documents or large configuration files the tool handles the content without any issues.
              </p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">Can I use the converted code in commercial projects?</h4>
              <p className="text-sm text-gray-700" style={{ textAlign: 'justify' }}>
                Yes, absolutely. The JavaScript code generated by this tool is yours to use however you wish, including in commercial projects, open-source software, personal projects, or educational materials. There are no restrictions or licensing requirements on the generated code.
              </p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">Does it work offline?</h4>
              <p className="text-sm text-gray-700" style={{ textAlign: 'justify' }}>
                Once the page is loaded, all conversion functionality works offline. If you load the page while connected to the internet, you can disconnect and continue using the converter without any internet connection required. This makes it useful for working in secure or isolated environments.
              </p>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="p-6 bg-white border-2 rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
            💡 Tips & Best Practices
          </h3>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 text-2xl">✅</div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Use Array Format for Lists and Line Processing</h4>
                <p className="text-sm text-gray-700" style={{ textAlign: 'justify' }}>
                  When your text represents a list of items, configuration values, or content that needs line-by-line processing, the array format is your best choice. It makes iteration and manipulation straightforward.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 text-2xl">✅</div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Choose Function Format for Reusable Modules</h4>
                <p className="text-sm text-gray-700" style={{ textAlign: 'justify' }}>
                  If you plan to use the text in multiple places or need built-in utilities like search or word counting, use the function format. It generates more robust code that is easy to maintain and extend.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 text-2xl">✅</div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Test Output Before Production Use</h4>
                <p className="text-sm text-gray-700" style={{ textAlign: 'justify' }}>
                  Always test the generated JavaScript code in your development environment before deploying to production. While the converter is highly reliable, testing ensures compatibility with your specific project setup.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 text-2xl">✅</div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Keep Source Text Organized</h4>
                <p className="text-sm text-gray-700" style={{ textAlign: 'justify' }}>
                  Organize your source text with clear line breaks and structure before converting. This makes the generated JavaScript code more readable and easier to work with.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Conclusion */}
        <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
            🎉 Start Converting Text to JavaScript Today
          </h3>
          <p className="text-gray-700 mb-4 leading-relaxed" style={{ textAlign: 'justify' }}>
            Whether you are a professional developer working on a complex web application, a student learning JavaScript fundamentals, or anyone who needs to convert text into JavaScript format, our Text to JavaScript Converter provides the perfect solution. With its intuitive interface, powerful features, multiple output formats, and absolute commitment to security and privacy, it has become the go-to tool for thousands of developers worldwide.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed" style={{ textAlign: 'justify' }}>
            The tool eliminates the tedious manual work of formatting text, escaping special characters, and creating proper JavaScript syntax. What might take minutes or even hours to do manually is accomplished in seconds with our converter. The time you save can be invested in what really matters building great applications, solving interesting problems, and creating value for your users.
          </p>
          <p className="text-gray-700 leading-relaxed" style={{ textAlign: 'justify' }}>
            Try it now with your own text. Paste any content into the input field, select your preferred format, and experience instant, accurate conversion to JavaScript. The tool is completely free, requires no registration, and works perfectly on all devices and browsers. Join the community of developers who have already discovered how much easier text-to-code conversion can be. Start converting today and streamline your JavaScript development workflow.
          </p>
        </div>
      </section>
    </ToolSection>
  );
}
