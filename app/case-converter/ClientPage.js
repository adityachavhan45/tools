"use client";

import { useState } from "react";

function toTitleCase(text) {
  return text
    .toLowerCase()
    .split(/\s+/)
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : ""))
    .join(" ");
}

function toSentenceCase(text) {
  return text
    .toLowerCase()
    .replace(/(^\s*[a-z])|([.!?]\s*[a-z])/g, (char) => char.toUpperCase());
}

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <section className="min-h-[70vh] px-4 py-12 bg-white">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-semibold text-black mb-6">Case Converter</h1>

        <label className="block text-sm font-medium mb-2 text-black">Input Text</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full min-h-40 !bg-white !text-black"
          placeholder="Type or paste text"
        />

        <div className="flex flex-wrap gap-2 mt-4">
          <button type="button" onClick={() => setOutput(input.toUpperCase())} className="!bg-black !text-white !py-2 !px-4 !rounded-lg !shadow-none">UPPERCASE</button>
          <button type="button" onClick={() => setOutput(input.toLowerCase())} className="!bg-black !text-white !py-2 !px-4 !rounded-lg !shadow-none">lowercase</button>
          <button type="button" onClick={() => setOutput(toTitleCase(input))} className="!bg-black !text-white !py-2 !px-4 !rounded-lg !shadow-none">Title Case</button>
          <button type="button" onClick={() => setOutput(toSentenceCase(input))} className="!bg-black !text-white !py-2 !px-4 !rounded-lg !shadow-none">Sentence case</button>
          <button type="button" onClick={() => setOutput("")} className="!bg-gray-200 !text-black !py-2 !px-4 !rounded-lg !shadow-none">Clear Output</button>
        </div>

        <label className="block text-sm font-medium mb-2 mt-6 text-black">Output</label>
        <textarea
          value={output}
          readOnly
          className="w-full min-h-40 !bg-white !text-black"
          placeholder="Converted text"
        />
      </div>

      <div className="max-w-4xl mx-auto mt-8 space-y-6">
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">About This Case Converter</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-700 sm:text-base">
            <p>
              The Case Converter helps you quickly rewrite text into uppercase, lowercase,
              title case, or sentence case without manually editing every word. It is useful
              when you are cleaning headings, product names, social captions, email drafts,
              spreadsheet text, or copied content that has inconsistent capitalization.
            </p>
            <p>
              Each mode solves a different writing problem. Uppercase is helpful for short
              labels and emphasis, lowercase is useful for normalizing messy text, title case
              fits headings and article titles, and sentence case makes paragraphs easier to
              read by capitalizing the start of sentences while keeping the rest natural.
            </p>
            <p>
              This tool works directly in your browser. Your text is converted on the page and
              is not intentionally uploaded to a server, which makes it practical for everyday
              notes, draft copy, and formatting tasks.
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">How to Use the Case Converter</h2>
          <ol className="mt-4 list-decimal list-inside space-y-2 text-sm leading-7 text-gray-700 sm:text-base">
            <li>Paste or type your text into the input box.</li>
            <li>Choose uppercase, lowercase, title case, or sentence case.</li>
            <li>Review the converted result in the output box.</li>
            <li>Copy the final text and use it in your document, website, post, or email.</li>
          </ol>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">Common Use Cases</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-gray-50 p-4">
              <h3 className="font-semibold text-gray-900">Headings and Titles</h3>
              <p className="mt-2 text-sm leading-6 text-gray-700">
                Convert rough headings into title case before publishing blogs, landing pages,
                YouTube titles, or product listings.
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <h3 className="font-semibold text-gray-900">Data Cleanup</h3>
              <p className="mt-2 text-sm leading-6 text-gray-700">
                Normalize text copied from spreadsheets, forms, PDFs, or emails where the
                capitalization is inconsistent.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <div className="mt-4 space-y-3">
            <details className="rounded-lg bg-gray-50 px-4 py-3">
              <summary className="cursor-pointer font-semibold text-gray-900">Is this case converter free?</summary>
              <p className="mt-2 text-sm leading-6 text-gray-700">
                Yes, it is free to use and does not require registration.
              </p>
            </details>
            <details className="rounded-lg bg-gray-50 px-4 py-3">
              <summary className="cursor-pointer font-semibold text-gray-900">Does sentence case change every sentence?</summary>
              <p className="mt-2 text-sm leading-6 text-gray-700">
                It converts text to lowercase first, then capitalizes the beginning of the text
                and the first letter after common sentence-ending punctuation.
              </p>
            </details>
            <details className="rounded-lg bg-gray-50 px-4 py-3">
              <summary className="cursor-pointer font-semibold text-gray-900">Is my text stored?</summary>
              <p className="mt-2 text-sm leading-6 text-gray-700">
                No account is needed, and the conversion runs in your browser. Avoid entering
                highly sensitive information into any online tool unless you understand the risk.
              </p>
            </details>
          </div>
        </section>
      </div>
    </section>
  );
}
