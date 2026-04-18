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
    </section>
  );
}
