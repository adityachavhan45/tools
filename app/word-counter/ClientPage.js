"use client";

import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import { useMemo, useState } from "react";

export default function WordCounterPage() {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  const stats = useMemo(() => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s+/g, "").length;
    const words = (text.trim().match(/\S+/g) || []).length;
    const lines = text.split(/\n/).length;
    const readingTime = Math.ceil(words / 200); // avg 200 wpm
    return { characters, charactersNoSpaces, words, lines, readingTime };
  }, [text]);

  function reset() {
    setText("");
    setMessage("🧹 Cleared!");
    setTimeout(() => setMessage(""), 2000);
  }

  function copy() {
    navigator.clipboard.writeText(text);
    setMessage("📋 Text copied to clipboard!");
    setTimeout(() => setMessage(""), 2000);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-8">
      <JsonLd
        data={buildToolJsonLd({
          name: "Word Counter",
          description: "Count words, characters, and lines in text.",
          slug: "/word-counter",
          category: "Utilities/Text",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Word Counter", slug: "/word-counter" },
        ])}
      />

      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">
            Word & Character Counter
          </h2>
          <p className="text-gray-600 mt-1">
            Count words, characters, lines, and estimate reading time.
          </p>

          {message && (
            <div className="mt-3 px-4 py-2 bg-gray-100 border rounded-lg text-gray-700 text-sm shadow-sm">
              {message}
            </div>
          )}

          {/* Textarea */}
          <textarea
            className="mt-5 w-full min-h-[220px] p-4 border rounded-lg shadow-sm 
                       focus:ring-2 focus:ring-slate-900 outline-none text-gray-800 
                       placeholder-gray-400"
            placeholder="Paste or type your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Buttons */}
          <div className="mt-4 flex gap-3">
            <button
              className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition 
                ${!text
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-slate-900 text-white hover:bg-slate-800 shadow"}`}
              onClick={copy}
              disabled={!text}
            >
              Copy Text
            </button>
            <button
              className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition 
                ${!text
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-red-500 text-white hover:bg-red-600 shadow"}`}
              onClick={reset}
              disabled={!text}
            >
              Reset
            </button>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-4">
            <div className="p-4 rounded-xl border bg-gray-50 shadow-sm text-center">
              <div className="text-2xl font-bold text-slate-900">{stats.words}</div>
              <div className="text-sm text-gray-600">Words</div>
            </div>
            <div className="p-4 rounded-xl border bg-gray-50 shadow-sm text-center">
              <div className="text-2xl font-bold text-slate-900">{stats.characters}</div>
              <div className="text-sm text-gray-600">Characters</div>
            </div>
            <div className="p-4 rounded-xl border bg-gray-50 shadow-sm text-center">
              <div className="text-2xl font-bold text-slate-900">{stats.charactersNoSpaces}</div>
              <div className="text-sm text-gray-600">No Spaces</div>
            </div>
            <div className="p-4 rounded-xl border bg-gray-50 shadow-sm text-center">
              <div className="text-2xl font-bold text-slate-900">{stats.lines}</div>
              <div className="text-sm text-gray-600">Lines</div>
            </div>
            <div className="p-4 rounded-xl border bg-gray-50 shadow-sm text-center">
              <div className="text-2xl font-bold text-slate-900">{stats.readingTime} min</div>
              <div className="text-sm text-gray-600">Reading Time</div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <section className="mt-10 bg-white border rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            About Word Counter
          </h3>
          <p className="text-gray-700 mb-4 text-sm">
            A word and character counter helps writers, students, bloggers,
            and SEO professionals quickly check their content length. Whether
            you are preparing an article, tweet, or academic essay, knowing
            your word count ensures you meet requirements and maintain clarity.
          </p>

          <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-2">
            <span className="text-yellow-500 mr-2">✨</span> Why use this tool?
          </h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1 pl-2 text-sm">
            <li>Writers can track word limits for assignments or blogs.</li>
            <li>SEO experts can balance keyword density effectively.</li>
            <li>Social media managers can optimize character count.</li>
            <li>Students can ensure essays match guidelines.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
