"use client";

import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import { useState } from "react";
import ToolSection from "../components/ToolSection";

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function beautify() {
    try {
      setError("");
      const obj = JSON.parse(input);
      const pretty = JSON.stringify(obj, null, 2);
      setOutput(pretty);
      setMessage("Formatted. Copy or use the output below.");
    } catch (e) {
      setError("Invalid JSON. Check syntax (commas, brackets, quotes).");
      setOutput("");
    }
  }

  function minify() {
    try {
      setError("");
      const obj = JSON.parse(input);
      const mini = JSON.stringify(obj);
      setOutput(mini);
      setMessage("Minified. Copy or use the output below.");
    } catch (e) {
      setError("Invalid JSON. Check syntax (commas, brackets, quotes).");
      setOutput("");
    }
  }

  function clearAll() {
    setInput("");
    setOutput("");
    setError("");
    setMessage("Cleared.");
  }

  function copyOutput() {
    if (output) {
      navigator.clipboard.writeText(output);
      setMessage("Output copied to clipboard.");
    }
  }

  let livePreview = "Output preview";
  try {
    if (input.trim()) livePreview = JSON.stringify(JSON.parse(input), null, 2);
  } catch {
    livePreview = input.trim() || "Output preview";
  }

  return (
    <ToolSection
      title="Free JSON Formatter and Validator"
      subtitle="Beautify, minify, and validate JSON in your browser. Live preview, no upload works on all devices."
      plain
      hideSidebar
      centerHeader
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "JSON Formatter",
          description: "Format, minify, and validate JSON. Beautify with indentation or compress to one line. In-browser, no sign-up.",
          slug: "/json-formatter",
          category: "Utilities/Text",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "JSON Formatter", slug: "/json-formatter" },
        ])}
      />

      {message && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-white text-sm sm:text-base transition-all duration-300
          ${message.includes("Formatted") || message.includes("Minified") || message.includes("copied") ? "bg-emerald-600" : ""}
          ${message.includes("Cleared") ? "bg-sky-600" : ""}`}
        >
          {message}
        </div>
      )}

      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div className="rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-5 sm:p-6 shadow-sm">
          <h1 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-700">
            JSON Formatter Tool
          </h1>
          <p className="mt-2 text-center text-sm sm:text-base text-slate-600">
            Beautify, minify, and validate JSON instantly with live preview.
          </p>
        </div>

        {/* Input and preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700 mb-2">Paste or type JSON</label>
            <textarea
              className="w-full min-h-[280px] p-4 border border-slate-300 rounded-xl font-mono text-sm text-slate-800 bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-y"
              placeholder='{"name": "example", "count": 1}'
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError("");
              }}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700 mb-2">Live preview</label>
            <pre className="w-full min-h-[280px] p-4 border border-slate-200 rounded-xl font-mono text-sm text-slate-700 bg-slate-50 overflow-auto whitespace-pre-wrap break-words">
              {livePreview}
            </pre>
          </div>
        </div>

        {error && (
          <div className="px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          <button
            onClick={beautify}
            className="px-6 py-3 rounded-xl bg-teal-600 text-white font-medium shadow-md hover:bg-teal-700 transition"
          >
            Beautify
          </button>
          <button
            onClick={minify}
            className="px-6 py-3 rounded-xl bg-slate-700 text-white font-medium shadow-md hover:bg-slate-800 transition"
          >
            Minify
          </button>
          <button
            onClick={copyOutput}
            disabled={!output}
            className="px-6 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Copy output
          </button>
          <button
            onClick={clearAll}
            className="px-6 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-medium transition"
          >
            Clear all
          </button>
        </div>

        {/* Output (after beautify/minify) */}
        {output && (
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700 mb-2">Output</label>
            <pre className="w-full min-h-[200px] p-4 border border-slate-200 rounded-xl font-mono text-sm text-slate-800 bg-white overflow-auto whitespace-pre-wrap break-words">
              {output}
            </pre>
          </div>
        )}
      </div>

      {/* Info section – 1000+ words, unique, text-justify */}
      <section className="mx-auto mt-12 sm:mt-14 w-full max-w-5xl p-5 sm:p-6 md:p-8 bg-white shadow-md rounded-2xl border border-slate-200">
  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 border-b border-slate-200 pb-3">
    Why JSON Formatting Has Become Important for Modern Development
  </h2>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    JSON has become one of the most widely used formats for storing and transferring data across websites, applications, APIs, and software systems. Developers use JSON while building web applications, mobile apps, browser extensions, automation scripts, and backend services. Because of its lightweight structure and easy readability, JSON is now considered a standard format in modern development environments.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    The problem usually starts when JSON data becomes too large, compressed into a single line, or filled with deeply nested structures. Raw JSON often looks confusing and difficult to understand, especially when developers are debugging APIs or checking application responses. This is where a JSON Formatter and Validator becomes extremely useful. Instead of manually fixing spacing and structure, users can instantly beautify, organise, validate, and minify JSON within seconds.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This tool helps developers, students, software engineers, and learners work with JSON in a cleaner and more efficient way. Whether you are debugging API responses, checking configuration files, or validating data before deployment, a proper JSON formatter can save time and reduce mistakes during development.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Understanding JSON in Simple Terms
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    JSON stands for JavaScript Object Notation. It is a text based format used for representing structured data. Although the format originated from JavaScript concepts, JSON is now supported by almost every major programming language including Python, Java, PHP, Go, TypeScript, and many others.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    JSON mainly works using key value pairs. It can store strings, numbers, arrays, objects, booleans, and null values. APIs commonly return responses in JSON because the structure is lightweight and easy for systems to process. Configuration files, application settings, authentication data, and database exports also frequently use JSON formatting.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Developers often work with JSON alongside tools that manage data formatting and conversion. For example, users handling API responses may also use the <a href="https://convertixy.com/json-to-csv" className="text-blue-600 hover:underline font-medium">JSON to CSV Converter</a> when preparing structured reports or exporting data into spreadsheet friendly formats.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Why Raw JSON Becomes Difficult to Read
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Many APIs and systems send JSON in compressed form to reduce file size and improve network performance. While this approach helps applications load data faster, it becomes difficult for humans to read and debug the content. Large blocks of minified JSON can look messy and confusing because everything appears on a single line without spacing or indentation.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Beautifying JSON solves this issue by adding proper indentation, spacing, and line breaks. Once formatted properly, nested objects and arrays become much easier to understand. Developers can quickly inspect structures, identify missing values, and locate syntax issues more efficiently.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Structured formatting becomes especially important while debugging APIs, handling authentication systems, testing backend services, or reviewing application logs. Cleanly formatted data improves readability and reduces the chance of development mistakes.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    How This JSON Formatter and Validator Works
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This browser based tool allows users to paste raw JSON directly into the input section and instantly process it using formatting or validation options. When the beautify option is selected, the tool reorganises the JSON into a properly structured format using indentation and readable spacing.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    If users want to reduce unnecessary spaces and compress the structure into a smaller format, the minify option helps generate compact JSON instantly. This becomes useful when reducing payload size for production environments or improving transfer efficiency across systems.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    The validation feature checks whether the JSON follows correct syntax rules. If there is a missing comma, incorrect quotation mark, extra bracket, or invalid structure, the tool displays an error message so users can quickly identify the problem.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Benefits of Formatting JSON Before Using It
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Properly formatted JSON improves development workflow in multiple ways. Readable structures help developers understand application responses faster. Teams working together on projects can review data more comfortably without struggling through messy formatting. This becomes extremely helpful in collaborative environments where backend and frontend developers regularly exchange API responses.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Formatted JSON also makes debugging easier. Instead of searching through long compressed lines, developers can quickly identify nested objects, values, arrays, and missing syntax elements. This reduces debugging time and improves overall development productivity.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Developers who frequently work with structured content may also combine JSON formatting with tools such as the <a href="https://convertixy.com/text-to-json" className="text-blue-600 hover:underline font-medium">Text to JSON Converter</a> to transform plain content into valid JSON structures more efficiently.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Common JSON Errors Developers Face
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    One of the most common problems in JSON is missing commas between objects or values. Even a small syntax mistake can completely break the structure and cause parsing failures inside applications. Extra commas at the end of arrays or objects are another frequent issue developers encounter.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Incorrect quotation usage is also common. JSON requires double quotes around keys and string values. Using single quotes or leaving keys without quotes often makes the structure invalid. Missing brackets or braces can also create errors that prevent systems from processing the data correctly.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Validation tools help identify these mistakes instantly instead of forcing developers to manually inspect every character. This improves accuracy and reduces frustration during development tasks.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Why Browser Based Tools Feel Faster and More Convenient
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Browser based tools have become increasingly popular because users can access them instantly without downloading software or configuring complex environments. Everything works directly inside the browser, making the process simple even for beginners.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This JSON Formatter and Validator processes data locally within the browser itself. Users can paste JSON, format it, validate it, copy results, and continue working without waiting for uploads or server side processing. This approach feels lightweight and efficient for daily usage.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Developers working with APIs and structured responses often combine formatting tools with utilities like the <a href="https://convertixy.com/json-formatter" className="text-blue-600 hover:underline font-medium">JSON Formatter</a> and debugging workflows to speed up development and testing processes naturally.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Real World Use Cases of JSON Formatting
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Software developers frequently use JSON formatters while testing APIs, building web applications, or integrating third party services. Frontend developers use formatted JSON to inspect responses received from backend systems. Backend developers validate API payloads before sending responses to applications.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Students learning web development often use JSON formatting tools to understand nested structures more clearly. Technical writers and documentation creators also rely on formatted JSON while preparing tutorials and API examples.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    DevOps engineers and system administrators commonly work with JSON configuration files during deployment and automation tasks. Clean formatting helps reduce configuration mistakes that could otherwise affect production systems.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Privacy Advantages of Local JSON Processing
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    JSON data sometimes contains sensitive information such as authentication tokens, API keys, internal configuration settings, or application responses. Uploading this information to unknown servers can create privacy concerns for many users.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Since this formatter works locally inside the browser, user data stays on the device during processing. No JSON content needs to be uploaded externally before formatting or validation occurs. This local approach improves privacy and also helps reduce waiting times because processing begins instantly.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Users handling development projects, confidential application settings, or private API responses often prefer local processing tools because they provide a more secure working experience.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Helpful Practices While Working With JSON Data
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Developers should regularly validate JSON before deploying applications or sharing API responses. Small syntax mistakes can create unexpected issues during execution. Maintaining clean formatting also improves readability and simplifies debugging later.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Consistent indentation and organised structures help teams collaborate more effectively. Developers working with large data sets may also benefit from tools like the <a href="https://convertixy.com/csv-to-json" className="text-blue-600 hover:underline font-medium">CSV to JSON Converter</a> when transforming spreadsheet data into structured JSON responses for applications or APIs.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Using proper formatting habits early during development can reduce long term maintenance problems and improve overall project quality significantly.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Final Thoughts on Using a JSON Formatter and Validator
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
    A JSON Formatter and Validator is one of the most useful utilities for developers, students, engineers, and anyone working with structured data. Proper formatting improves readability, validation helps identify syntax errors quickly, and minification reduces unnecessary file size for production use.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify mt-4">
    This browser based tool keeps the process simple, fast, and beginner friendly. Users can beautify messy JSON, validate structures, and generate compact versions without installing software or creating accounts. Because the processing happens locally, the experience also feels safer and more private.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify mt-4">
    Whether you are learning development, debugging APIs, managing application settings, or preparing structured data for projects, using a reliable JSON formatter can make development work cleaner, faster, and easier to manage in everyday workflows.
  </p>
</section>
    </ToolSection>
  );
}
