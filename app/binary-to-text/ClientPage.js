"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function BinaryToTextPage() {
  const [binary, setBinary] = useState("");
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");
  const [hasResult, setHasResult] = useState(false);

  function convertToText() {
    if (!binary.trim()) {
      setMessage("Please enter binary data (0s and 1s) first.");
      return;
    }
    try {
      const cleanBinary = binary.replace(/[^01]/g, "");
      if (cleanBinary.length === 0) {
        setMessage("Please enter valid binary data. Only 0 and 1 are allowed.");
        return;
      }
      if (cleanBinary.length % 8 !== 0) {
        setMessage("Binary length must be a multiple of 8 (complete bytes). Remove extra bits or add padding.");
        return;
      }
      let text = "";
      for (let i = 0; i < cleanBinary.length; i += 8) {
        const byte = cleanBinary.slice(i, i + 8);
        const charCode = parseInt(byte, 2);
        if (charCode >= 32 && charCode <= 126) {
          text += String.fromCharCode(charCode);
        } else if (charCode <= 255) {
          text += String.fromCharCode(charCode);
        } else {
          text += "?";
        }
      }
      setResult(text);
      setHasResult(true);
      setMessage("");
    } catch {
      setMessage("Something went wrong. Please check your binary input and try again.");
    }
  }

  function copyResult() {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setMessage("Result copied to clipboard.");
  }

  function reset() {
    setBinary("");
    setResult("");
    setMessage("");
    setHasResult(false);
  }

  return (
    <ToolSection
      title="Binary to Text"
      subtitle="Decode binary code (0s and 1s) to readable text instantly. Free, browser-based converter for developers, students, and learners."
      plain
      whiteBackground
      hideSidebar
      centerHeader
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Binary to Text",
          description: "Convert binary code to readable text (ASCII) online.",
          slug: "/binary-to-text",
          category: "Utilities/Text",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Binary to Text", slug: "/binary-to-text" },
        ])}
      />

      <div className="space-y-6">
        {message && (
          <div
            role="alert"
            className="px-4 py-3 text-sm rounded-xl border border-amber-300 bg-amber-50 text-amber-800 text-justify"
          >
            {message}
          </div>
        )}

        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 sm:p-6 space-y-5">
          <h2 className="text-lg font-semibold text-gray-900">Enter binary data</h2>
          <div>
            <label htmlFor="binary-input" className="block text-sm font-medium text-gray-700 mb-1.5">
              Binary string (0s and 1s)
            </label>
            <textarea
              id="binary-input"
              value={binary}
              onChange={(e) => setBinary(e.target.value)}
              placeholder="e.g. 01001000 01100101 01101100 01101100 01101111"
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white font-mono text-sm"
            />
            <p className="mt-1 text-xs text-gray-500">Spaces and line breaks are removed automatically. Use groups of 8 bits per character.</p>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={convertToText}
              disabled={!binary.trim()}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-medium shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none transition-colors"
            >
              Convert to text
            </button>
            <button
              type="button"
              onClick={reset}
              className="px-5 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          <div className="md:col-span-3 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-5">
            <p className="font-semibold text-blue-900 mb-2">Format</p>
            <p className="text-blue-800 text-sm text-justify">
              Enter or paste a string of 0s and 1s. Spaces and newlines are ignored. Length must be a multiple of 8 (one byte per 8 bits).
            </p>
          </div>
          <div className="md:col-span-2 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5">
            <p className="font-semibold text-amber-900 mb-2">Tip</p>
            <p className="text-amber-800 text-sm text-justify">
              Example: <code className="bg-amber-100 px-1 rounded">01001000 01101001</code> decodes to &quot;Hi&quot; in ASCII.
            </p>
          </div>
        </div>

        {hasResult && result !== "" && (
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="px-5 py-4 bg-indigo-600 text-white">
              <h3 className="text-lg font-semibold">Decoded text</h3>
              <p className="text-indigo-100 text-sm mt-0.5">Output in readable form</p>
            </div>
            <div className="p-5">
              <pre className="whitespace-pre-wrap break-words font-mono text-gray-800 text-sm bg-gray-50 p-4 rounded-xl border border-gray-200 min-h-[4rem]">
                {result}
              </pre>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={copyResult}
                  className="px-4 py-2 rounded-lg bg-gray-700 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Copy result
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">How it works</h4>
          <ul className="text-sm text-gray-700 space-y-1 text-justify">
            <li><strong>Input:</strong> Any string of 0s and 1s (spaces/newlines are stripped).</li>
            <li><strong>Bytes:</strong> Input is split into 8-bit groups. Each group is one byte.</li>
            <li><strong>Output:</strong> Each byte is converted to a character using standard character codes (e.g. ASCII).</li>
          </ul>
        </div>
      </div>

     <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm text-justify">

  <h2
    id="about-binary-heading"
    className="text-2xl font-bold text-gray-900 mb-4"
  >
    About the Binary to Text Converter
  </h2>

  <p className="text-gray-700 leading-relaxed mb-4">
    The Binary to Text Converter helps users convert binary numbers made of 0s and 1s into readable text instantly.
    Computers store and process information in binary format, but humans understand readable characters and words.
    This tool bridges that gap by decoding binary data into understandable text within seconds.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Binary conversion tools are useful for students, programmers, cybersecurity learners, developers, networking
    professionals, and anyone interested in understanding how computers process information internally. Instead of
    manually decoding binary values byte by byte, users can instantly convert large binary strings into readable
    output without writing code or using complicated software.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Since everything in computing eventually becomes binary at the machine level, understanding binary conversion
    helps users learn how text, files, and digital communication actually work behind the scenes.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    What Is Binary?
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Binary is a numbering system that uses only two digits: 0 and 1. Unlike the decimal system used in everyday
    mathematics, binary works using powers of two. Computers rely entirely on binary because electronic circuits can
    easily represent two states such as ON and OFF or TRUE and FALSE.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Every letter, number, image, video, and file stored inside a computer eventually becomes binary data. Text
    characters are converted into binary values using encoding standards like ASCII or UTF-8. The Binary to Text
    Converter reverses this process by decoding binary values back into readable text.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Students learning programming concepts often experiment with binary encoding alongside the{" "}
    <a
      href="/text-to-binary"
      className="text-blue-600 underline font-medium"
    >
      Text to Binary Converter
    </a>{" "}
    to understand how readable text transforms into machine-readable data.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    How Binary Data Converts Into Text
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Computers group binary digits into sets called bytes. A single byte usually contains 8 bits. Each byte represents
    a specific character according to a character encoding system.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    For example, the binary value 01001000 represents the letter H in ASCII encoding. Similarly, multiple binary
    bytes combined together form words, sentences, and larger pieces of text.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Developers working with raw encoded data often clean and format structured outputs using the{" "}
    <a
      href="/json-formatter"
      className="text-blue-600 underline font-medium"
    >
      JSON Formatter
    </a>{" "}
    while debugging applications or inspecting encoded content.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Why Binary Conversion Matters
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Binary conversion is important because it helps users understand how computers represent information internally.
    While modern software hides most low-level operations, programmers, engineers, and cybersecurity professionals
    frequently work directly with binary or encoded data.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    During debugging, network analysis, or data recovery, developers sometimes inspect raw binary output to verify
    whether stored information is readable text, corrupted data, or encrypted content.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Developers analyzing encoded API responses or payload structures frequently transform encoded values back into
    readable information while debugging backend systems and structured application data.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Binary in Programming and Development
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Programming languages ultimately communicate with hardware using binary instructions. Although developers usually
    write code in human-readable syntax, compilers and interpreters convert those instructions into machine-level
    operations.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Backend systems, networking protocols, encryption systems, databases, and operating systems all rely heavily on
    binary representation internally. Understanding binary improves debugging skills and helps developers understand
    memory storage, data transmission, and low-level computing concepts more effectively.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Developers testing APIs and encoded query values also use the{" "}
    <a
      href="/url-encoder"
      className="text-blue-600 underline font-medium"
    >
      URL Encoder
    </a>{" "}
    to safely encode parameters before transmitting data through URLs or network requests.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Binary and Cybersecurity
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Cybersecurity professionals frequently analyze binary data while investigating malware, inspecting suspicious
    files, or reviewing network traffic. Encoded messages and binary payloads are common during penetration testing,
    digital forensics, and reverse engineering tasks.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Understanding binary representation also helps security learners recognize how data moves across systems and how
    attackers may attempt to hide information using encoding or obfuscation techniques.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Security-focused users often generate stronger credentials using the{" "}
    <a
      href="/password-generator"
      className="text-blue-600 underline font-medium"
    >
      Password Generator
    </a>{" "}
    and test password safety through the{" "}
    <a
      href="/password-strength-checker"
      className="text-blue-600 underline font-medium"
    >
      Password Strength Checker
    </a>{" "}
    before securing applications or online accounts.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Common Mistakes During Binary Conversion
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    One of the most common mistakes users make is entering incomplete binary groups. Since binary text conversion
    typically works using 8-bit bytes, missing or extra bits can generate incorrect output or unreadable characters.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Another common issue occurs when users mix unsupported characters inside binary input. Valid binary data should
    contain only 0s and 1s. Additional characters may break the conversion process or create invalid decoding
    results.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Developers handling large encoded datasets often compare outputs and validate changes using the{" "}
    <a
      href="/text-diff-checker"
      className="text-blue-600 underline font-medium"
    >
      Text Difference Checker
    </a>{" "}
    to identify formatting mismatches or incorrect conversions.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Binary Learning for Students
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Binary conversion is one of the most important beginner concepts in computer science education. Students studying
    programming, networking, operating systems, or cybersecurity often practice binary conversion exercises to
    understand how digital systems work internally.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Understanding binary improves logical thinking and builds a stronger foundation for learning data structures,
    computer architecture, memory systems, and low-level programming concepts.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Students practicing technical conversions also compare how information appears across different encoding formats
    while learning how computers represent text and digital information internally.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Why Online Conversion Tools Save Time
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Manual binary decoding becomes difficult when working with long binary sequences. Online conversion tools simplify
    the process by automatically grouping bits, decoding bytes, and generating readable output instantly.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Instead of writing scripts or performing manual calculations, users can quickly test encoded values directly in
    the browser. This improves productivity for students, developers, analysts, and technical professionals.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Developers preparing structured datasets and API-ready content frequently organize formatted information before
    integrating data into applications or backend workflows.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Privacy and Browser-Based Processing
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Privacy is important while working with encoded data. This Binary to Text Converter performs calculations directly
    inside the browser without storing uploaded information or requiring user accounts.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Browser-based processing improves both speed and security because users can convert data locally without sending
    sensitive content to external servers.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Final Thoughts
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    The Binary to Text Converter provides a fast and simple way to decode binary values into readable text. It helps
    students, programmers, cybersecurity learners, and technical users better understand how computers represent and
    process information internally.
  </p>

  <p className="text-gray-700 leading-relaxed">
    Instead of manually decoding binary bytes, users can instantly convert large binary strings into meaningful text
    while learning more about encoding systems, data structures, and digital communication. Understanding binary
    improves technical knowledge and creates a stronger foundation for programming and computer science concepts.
  </p>

</section>
    </ToolSection>
  );
}
