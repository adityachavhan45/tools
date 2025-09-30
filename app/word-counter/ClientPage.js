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
            About Word Counter Tool
          </h3>
          <p className="text-gray-700 mb-4 text-sm">
            The Word Counter tool is a simple yet powerful online utility designed for 
            writers, students, bloggers, marketers, and anyone who works with text on 
            a daily basis. It helps you instantly calculate the number of words, 
            characters, lines, and even estimate the reading time of your content. 
            Whether you are preparing an academic assignment, drafting a blog post, 
            optimizing content for SEO, or writing social media updates, knowing your 
            word count ensures that your writing is accurate, concise, and meets 
            specific guidelines.
          </p>

          <h4 className="text-lg font-semibold text-gray-800 mb-2">✨ Key Features</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1 pl-2 text-sm">
            <li>Counts words, characters (with & without spaces), and lines.</li>
            <li>Provides an estimated reading time based on average speed.</li>
            <li>Real-time updates as you type or paste text.</li>
            <li>Copy text instantly with one click.</li>
            <li>Reset button to clear the editor quickly.</li>
            <li>Completely free, lightweight, and works in your browser.</li>
          </ul>

          <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">🔧 How to Use</h4>
          <ol className="list-decimal list-inside text-gray-700 space-y-1 text-sm">
            <li>Paste or type your text into the editor.</li>
            <li>See instant stats: word count, character count, and line count.</li>
            <li>Check estimated reading time to gauge content length.</li>
            <li>Use <strong>Copy</strong> to duplicate text or <strong>Reset</strong> to start fresh.</li>
            <li>Perfect for blog posts, tweets, essays, or SEO content drafts.</li>
          </ol>

          <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">📐 Why Word Count Matters</h4>
          <p className="text-gray-700 mb-4 text-sm">
            Word count plays a crucial role across industries. Academic institutions 
            often require essays or reports within a fixed limit. Journalists and 
            content creators need to stick to specific lengths for clarity and engagement. 
            Social media platforms like Twitter (X) and LinkedIn have strict character 
            limits. In SEO, balancing content length and keyword density impacts ranking. 
            Knowing your exact word and character count prevents underwriting or overwriting 
            and ensures your message is both impactful and compliant with requirements.
          </p>

          <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">📦 Practical Use Cases</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1 pl-2 text-sm">
            <li><strong>Students:</strong> Meet assignment word limits without guesswork.</li>
            <li><strong>Writers:</strong> Ensure blog posts, articles, or novels stay within scope.</li>
            <li><strong>SEO Experts:</strong> Balance keyword density and optimize for search engines.</li>
            <li><strong>Social Media Managers:</strong> Craft posts within platform character restrictions.</li>
            <li><strong>Professionals:</strong> Create concise reports, emails, and presentations.</li>
          </ul>

          <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">⚡ Best Practices</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1 pl-2 text-sm">
            <li>Aim for 500–800 words in blogs for SEO, unless long-form is needed.</li>
            <li>Keep tweets/X posts under 280 characters with concise wording.</li>
            <li>For essays, stick to guidelines and don’t exceed limits.</li>
            <li>Check reading time to ensure user engagement and accessibility.</li>
            <li>Use character count for metadata, titles, and ad copy optimization.</li>
          </ul>

          <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">🚀 Final Thoughts</h4>
          <p className="text-gray-700 text-sm">
            The Word Counter tool is more than just a counter – it’s a productivity 
            companion for anyone who writes. By giving you instant insights into your 
            text length, it helps you stay efficient, professional, and on target. 
            Whether you are a student, a professional writer, a digital marketer, or 
            a casual blogger, this tool ensures your content is polished, concise, 
            and ready for publishing. Save time, improve accuracy, and make every 
            word count with this free online word and character counter.
          </p>
        </section>
      </div>
    </main>
  );
}
