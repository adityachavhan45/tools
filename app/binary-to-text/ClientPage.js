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

  const sidebar = (
    <div className="space-y-4 text-sm text-gray-700 text-justify">
      <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
        <p className="font-semibold text-blue-900 mb-2">Format</p>
        <p className="text-blue-800 text-justify">
          Enter or paste a string of 0s and 1s. Spaces and newlines are ignored. Length must be a multiple of 8 (one byte per 8 bits).
        </p>
      </div>
      <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
        <p className="font-semibold text-amber-900 mb-2">Tip</p>
        <p className="text-amber-800 text-justify">
          Example: <code className="bg-amber-100 px-1 rounded">01001000 01101001</code> decodes to &quot;Hi&quot; in ASCII.
        </p>
      </div>
    </div>
  );

  return (
    <ToolSection
      title="Binary to Text"
      subtitle="Decode binary code (0s and 1s) to readable text instantly. Free, browser-based converter for developers, students, and learners."
      plain
      plainSidebar
      whiteBackground
      sidebar={sidebar}
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

      <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm text-justify" aria-labelledby="about-binary-heading">
        <h2 id="about-binary-heading" className="text-xl font-semibold text-gray-900 mb-4">About the Binary to Text Converter</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          This free Binary to Text tool converts a string of binary digits (0s and 1s) into readable text. You paste or type binary, and the tool splits it into 8-bit bytes and maps each byte to the corresponding character. It is useful for learning how binary and text relate, for decoding binary messages, and for quick checks when working with raw data. All processing runs in your browser; nothing is sent to a server.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">How to use</h3>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
          <li>Paste or type your binary data (only 0 and 1) into the input box. Spaces and newlines are ignored.</li>
          <li>Ensure the total number of bits is a multiple of 8 (e.g. 8, 16, 24). Remove or pad extra bits if needed.</li>
          <li>Click <strong>Convert to text</strong> to see the decoded result.</li>
          <li>Use <strong>Copy result</strong> to copy the output.</li>
        </ol>

        <h2 id="binary-guide" className="text-xl font-semibold text-gray-900 mt-10 mb-4">Binary and Text: A Complete Guide</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Computers store and transmit all data as binary: sequences of 0s and 1s. Text on screens and in files is no exception. Each character is represented by a pattern of bits according to an encoding scheme. The most familiar is ASCII, which uses 7 or 8 bits per character for basic letters, digits, and symbols. Understanding how binary maps to text helps with programming, debugging, data recovery, and security. This section explains the basics and where a binary-to-text converter fits in.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">What is binary?</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          Binary is a number system with only two digits: 0 and 1. Each digit is a &quot;bit.&quot; Eight bits form one &quot;byte,&quot; which can represent 256 different values (0–255). In text encoding, each byte (or sequence of bytes) is assigned to a character. For example, in ASCII the byte value 72 (binary 01001000) is the letter &quot;H,&quot; and 105 (01101001) is &quot;i,&quot; so the binary for &quot;Hi&quot; is 01001000 01101001. A binary-to-text converter does the reverse: given a stream of bits, it groups them into bytes and looks up the corresponding characters so you see readable text instead of raw 0s and 1s.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">ASCII and extended character sets</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          ASCII (American Standard Code for Information Interchange) was one of the first widely used character encodings. It uses 7 bits (0–127) for basic English letters, numbers, punctuation, and control characters. Extended ASCII and other 8-bit encodings use the full byte (0–255) to add more symbols and accented characters. This converter interprets each 8-bit group as a single byte and outputs the corresponding character. For standard English text and many symbols, the result matches what you expect. For other languages or special characters, encodings like UTF-8 use multiple bytes per character; this tool still works on the byte level, so UTF-8 encoded text that was turned into binary will decode correctly if the binary is in the same byte order.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Why convert binary to text?</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          In programming and IT, data often appears as binary or hex dumps. Logs, network packets, and file contents may be shown in raw form. Converting binary to text lets you see whether the data is actually a message, a configuration string, or part of a file format. Students use it to verify their encoding and decoding exercises. Developers use it to inspect payloads or debug why a string looks wrong. In digital forensics or data recovery, binary-to-text conversion is a first step to see if a chunk of data is readable text. Even in casual use, people sometimes receive or create binary-encoded messages (e.g. in puzzles or tutorials); this tool gives an instant way to decode them without writing code.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Bits, bytes, and alignment</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          For the conversion to work, the binary string must represent complete bytes. That means the number of bits must be divisible by 8. If you have 9 bits, the tool cannot cleanly form bytes; you will get an error asking you to add or remove bits. In practice, valid text encoded in ASCII or UTF-8 will always use whole bytes. If your binary comes from another source (e.g. a hardware dump or a custom format), you may need to trim or pad to a multiple of 8. Some systems show binary in groups of 4 (nibbles) or 8 (bytes) with spaces; this converter ignores spaces and newlines, so you can paste formatted binary as-is as long as the total bit count is a multiple of 8.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Encoding and character sets</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          The same byte value can mean different characters in different encodings. For instance, byte 196 might be a special character in Latin-1 and something else in another encoding. This tool uses a standard mapping so that common ASCII printable characters (space through tilde) appear correctly. Bytes outside that range may still produce a character or a placeholder depending on the implementation. For most learning and decoding tasks, the default behaviour is sufficient. If you are working with non-English or legacy data, you may need to interpret the output with the correct character set in mind or use a more specialised tool that lets you choose the encoding explicitly.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Security and obfuscation</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          Binary by itself is not encryption. Converting binary to text only reveals the data if that data was originally text (or text-like) encoded in a known way. Encrypted or compressed data, when viewed as binary and then &quot;decoded&quot; as text, will usually produce unreadable or random-looking output. So this converter is for decoding plain binary representation of text, not for breaking encryption. It is still useful in security education: understanding how data is represented helps when analysing malware, network traffic, or stored data. Always ensure you have the right to decode and use the data you are converting.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">History and context</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          Binary representation of text has been used since the early days of computing. Telegraph codes, early computers, and modern Unicode all rely on the idea of mapping numbers (and thus bit patterns) to characters. ASCII was standardised in the 1960s and is still the basis for many encodings. UTF-8, which is dominant on the web, is a variable-length encoding that stays compatible with ASCII for the first 128 characters and uses multiple bytes for the rest. A binary-to-text converter that handles 8-bit bytes can decode ASCII and the byte sequences of UTF-8 text that has been converted to binary, as long as the binary is provided in the correct order (usually most significant byte first or as the machine would store it).
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Practical examples</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          Suppose you have the binary string 01001000 01100101 01101100 01101100 01101111. After removing spaces you have 40 bits, which is 5 bytes. The bytes are 72, 101, 108, 108, 111. In ASCII those are H, e, l, l, o—so the decoded text is &quot;Hello.&quot; Another example: 00100000 (space) and 01010111 01101111 01110010 01101100 01100100 give &quot; World&quot; (space followed by &quot;World&quot;). You can try such strings in this tool to see how binary and text correspond. Many programming courses and tutorials use similar examples to teach encoding. Once you are comfortable with 8-bit groups, you can decode longer binary strings or verify output from your own encoding scripts.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Limitations and tips</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          This converter expects input that is purely 0 and 1. Any other character (letters, punctuation, digits other than 0 and 1) is stripped before conversion. If your &quot;binary&quot; is in another format—for example hexadecimal (0–9, A–F)—you need a hex-to-text or hex-to-binary converter first. Similarly, Base64 is a different encoding (binary-to-text in the encoding sense) and requires a Base64 decoder, not a raw binary decoder. For best results, paste binary that you know represents text in ASCII or a compatible encoding, and ensure the bit count is a multiple of 8. If the output looks wrong, check that the source binary is correct and that you have not accidentally included extra or fewer bits.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Summary</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          A Binary to Text converter turns a sequence of 0s and 1s into readable characters by grouping bits into 8-bit bytes and mapping each byte to a character. It is useful for education, debugging, data inspection, and decoding binary messages. Input must be only 0 and 1, and the length must be a multiple of 8. The tool runs in your browser and does not send data to any server. Use it whenever you need to quickly see what a binary string says in plain text.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Disclaimer</h3>
        <p className="text-gray-700 leading-relaxed">
          This tool is for educational and general decoding purposes. Output is based on standard character mappings (e.g. ASCII). We are not responsible for misuse of decoded content. Ensure you have the right to view and use any data you convert.
        </p>
      </section>
    </ToolSection>
  );
}
