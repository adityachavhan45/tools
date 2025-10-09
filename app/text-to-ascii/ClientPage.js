"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function TextToAsciiPage() {
  const [text, setText] = useState("");
  const [ascii, setAscii] = useState("");
  const [message, setMessage] = useState("");

  function convertTextToAscii() {
    if (!text.trim()) {
      setMessage("Please enter text to convert to ASCII codes.");
      return;
    }

    const asciiLines = text.split(/\r?\n/).map((line) => {
      if (!line) {
        return "";
      }

      return line
        .split("")
        .map((char) => char.charCodeAt(0))
        .join(" ");
    });

    setAscii(asciiLines.join("\n"));
    setMessage("Text converted to ASCII codes.");
  }

  function convertAsciiToText() {
    if (!ascii.trim()) {
      setMessage("Please enter ASCII codes to convert to text.");
      return;
    }

    try {
      const textLines = ascii.split(/\r?\n/).map((line) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return "";
        }

        const characters = trimmed.split(/[\s,]+/).map((code) => {
          const numericCode = Number(code);

          if (!Number.isFinite(numericCode) || numericCode < 0 || numericCode > 255) {
            throw new Error(`Invalid ASCII code: ${code}`);
          }

          return String.fromCharCode(numericCode);
        });

        return characters.join("");
      });

      setText(textLines.join("\n"));
      setMessage("ASCII codes converted to text.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to convert ASCII codes. Please check the format.",
      );
    }
  }

  async function copyText() {
    if (!text) {
      setMessage("There is no text to copy.");
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setMessage("Text copied to clipboard.");
    } catch {
      setMessage("Unable to copy text. Please copy it manually.");
    }
  }

  async function copyAscii() {
    if (!ascii) {
      setMessage("There is no ASCII output to copy.");
      return;
    }

    try {
      await navigator.clipboard.writeText(ascii);
      setMessage("ASCII codes copied to clipboard.");
    } catch {
      setMessage("Unable to copy ASCII codes. Please copy them manually.");
    }
  }

  function reset() {
    setText("");
    setAscii("");
    setMessage("Cleared.");
  }

  const textLines = text ? text.split(/\r?\n/) : [];
  const asciiValues = ascii
    ? ascii
        .split(/[\s,]+/)
        .map((entry) => entry.trim())
        .filter(Boolean)
    : [];

  const characterCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lineCount = textLines.length || 0;

  return (
    <ToolSection
      title="Text to ASCII Converter"
      subtitle="Convert text to ASCII code and ASCII code back to text instantly in your browser."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Text to ASCII Converter",
          description: "Convert text to ASCII code and ASCII code back to text online.",
          slug: "/text-to-ascii",
          category: "Utilities/Text",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Text to ASCII Converter", slug: "/text-to-ascii" },
        ])}
      />

      <div className="space-y-5">
        {message && (
          <div className="px-3 py-2 bg-blue-100 border border-blue-200 rounded text-sm text-blue-800">
            {message}
          </div>
        )}

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="text-input">
              Text
            </label>
            <textarea
              id="text-input"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Enter text to convert to ASCII codes..."
              className="w-full min-h-40 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="ascii-input">
              ASCII Codes
            </label>
            <textarea
              id="ascii-input"
              value={ascii}
              onChange={(event) => setAscii(event.target.value)}
              placeholder="Example: 72 101 108 108 111"
              className="w-full min-h-40 px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={convertTextToAscii}
            disabled={!text.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-indigo-600 text-white shadow hover:bg-indigo-700 disabled:opacity-60"
          >
            Text to ASCII
          </button>
          <button
            onClick={convertAsciiToText}
            disabled={!ascii.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-green-600 text-white shadow hover:bg-green-700 disabled:opacity-60"
          >
            ASCII to Text
          </button>
          <button
            onClick={copyText}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 text-white shadow hover:bg-blue-700"
          >
            Copy Text
          </button>
          <button
            onClick={copyAscii}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-purple-600 text-white shadow hover:bg-purple-700"
          >
            Copy ASCII
          </button>
          <button
            onClick={reset}
            disabled={!text && !ascii}
            className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-60"
          >
            Reset
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4 text-sm">
            <div className="font-semibold text-gray-800">Lines</div>
            <div className="text-gray-600">{lineCount}</div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 text-sm">
            <div className="font-semibold text-gray-800">Words</div>
            <div className="text-gray-600">{wordCount}</div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 text-sm">
            <div className="font-semibold text-gray-800">Characters</div>
            <div className="text-gray-600">{characterCount}</div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 text-sm">
            <div className="font-semibold text-gray-800">ASCII Values</div>
            <div className="text-gray-600">{asciiValues.length}</div>
          </div>
        </div>

        <section className="mt-8 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">About the Text to ASCII Converter</h3>
          <p className="mt-3 text-gray-700">
            ASCII (American Standard Code for Information Interchange) assigns a number between 0 and 127 to
            letters, digits, punctuation marks, and control characters. This tool helps you explore that mapping
            by converting any text you provide into a list of ASCII values and decoding ASCII values back into
            readable text. Everything runs in your browser, so nothing is uploaded or stored on a server.
          </p>
          <p className="mt-3 text-gray-700">
            Developers use ASCII conversions when debugging encoding problems, inspecting payloads, or working
            with legacy systems. Educators and students can also rely on it to demonstrate how computers
            represent characters internally. Paste text, convert it, and review the statistics to understand the
            makeup of the input at a glance.
          </p>
          <h4 className="mt-5 text-base font-semibold text-gray-900">Key Features</h4>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700">
            <li>Bidirectional conversion between text and ASCII values.</li>
            <li>Supports multi-line input and preserves line breaks.</li>
            <li>Quick statistics for lines, words, characters, and ASCII values.</li>
            <li>One-click copy buttons for both text and ASCII output.</li>
            <li>Runs entirely in the browser for privacy and speed.</li>
          </ul>
          <h4 className="mt-5 text-base font-semibold text-gray-900">How to Use</h4>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-gray-700">
            <li>Enter or paste text in the left input and select Text to ASCII.</li>
            <li>Review the generated ASCII values in the right input.</li>
            <li>To decode, paste ASCII numbers (separated by spaces or commas) and select ASCII to Text.</li>
            <li>Use the copy buttons to copy either representation.</li>
            <li>Select Reset anytime to clear both inputs.</li>
          </ol>
          <h4 className="mt-5 text-base font-semibold text-gray-900">Frequently Asked Questions</h4>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700">
            <li>What range should ASCII codes fall into? Standard ASCII uses values from 0 to 127.</li>
            <li>Can I enter comma separated codes? Yes, separators can be spaces, new lines, or commas.</li>
            <li>Does the converter support extended ASCII? Values up to 255 are accepted for convenience.</li>
            <li>Is the conversion secure? All processing happens locally in your browser.</li>
          </ul>
        </section>
      </div>
    </ToolSection>
  );
}
