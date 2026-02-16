"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

function countPhraseOccurrences(text, phrase) {
  if (!phrase.trim()) return 0;
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(escaped.replace(/\s+/g, "\\s+"), "gi");
  const matches = text.match(regex);
  return matches ? matches.length : 0;
}

export default function KeywordDensityCheckerPage() {
  const [text, setText] = useState("");
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");

  function checkDensity() {
    if (!text.trim()) {
      setMessage("Please enter or paste text first.");
      return;
    }
    if (!keyword.trim()) {
      setMessage("Please enter a keyword or phrase to check.");
      return;
    }
    setMessage("");
    const totalWords = text.trim().split(/\s+/).filter(Boolean).length;
    const occurrences = countPhraseOccurrences(text, keyword.trim());
    const density = totalWords > 0 ? (occurrences / totalWords) * 100 : 0;
    const densityFixed = density.toFixed(2);
    const num = parseFloat(densityFixed);
    let status = "Optimal";
    let suggestion = "Keyword density is in a good range.";
    if (num < 1) {
      status = "Low";
      suggestion = "Consider using the keyword a bit more if it fits naturally.";
    } else if (num > 3) {
      status = "High";
      suggestion = "Consider reducing repetition to avoid keyword stuffing.";
    }
    setResult({
      totalWords,
      occurrences,
      density: densityFixed,
      status,
      suggestion,
      keyword: keyword.trim(),
    });
    setMessage("Analysis complete. Review the results below.");
  }

  function reset() {
    setText("");
    setKeyword("");
    setResult(null);
    setMessage("Cleared.");
  }

  return (
    <ToolSection
      title="Free Keyword Density Checker"
      subtitle="Check keyword density in your text. See count, percentage, and SEO guidance no upload, works in your browser."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Keyword Density Checker",
          description: "Check keyword or phrase density in text. Get count, percentage, and simple SEO guidance. In-browser, no sign-up.",
          slug: "/keyword-density-checker",
          category: "Utilities/SEO",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Keyword Density Checker", slug: "/keyword-density-checker" },
        ])}
      />

      {message && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-white text-sm sm:text-base transition-all duration-300
          ${message.includes("complete") ? "bg-emerald-600" : ""}
          ${message.includes("Please enter") ? "bg-amber-600" : ""}
          ${message.includes("Cleared") ? "bg-sky-600" : ""}`}
        >
          {message}
        </div>
      )}

      <div className="space-y-6">
        {/* Text input */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-700 mb-2">Paste or type your text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your article, paragraph, or any text here..."
            className="w-full min-h-[180px] p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-y"
          />
        </div>

        {/* Keyword input */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-700 mb-2">Keyword or phrase</label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='e.g. "digital marketing" or "SEO"'
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={checkDensity}
            disabled={!text.trim() || !keyword.trim()}
            className="px-6 py-3 rounded-xl bg-teal-600 text-white font-medium shadow-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Check density
          </button>
          <button
            onClick={reset}
            className="px-6 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-medium transition"
          >
            Clear all
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4">
            <p className="text-sm font-medium text-slate-800">Analysis results</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                <p className="text-xs uppercase tracking-wide text-slate-500">Total words</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">{result.totalWords}</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                <p className="text-xs uppercase tracking-wide text-slate-500">Occurrences</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">{result.occurrences}</p>
                <p className="text-xs text-slate-600 truncate" title={result.keyword}>{result.keyword}</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                <p className="text-xs uppercase tracking-wide text-slate-500">Density</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">{result.density}%</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
                <p className={`mt-1 text-lg font-semibold ${
                  result.status === "Optimal" ? "text-emerald-600" :
                  result.status === "Low" ? "text-amber-600" : "text-rose-600"
                }`}>
                  {result.status}
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-700 border-l-4 border-teal-500 pl-3">{result.suggestion}</p>
          </div>
        )}

        {/* SEO guidelines */}
        <div className="p-4 rounded-xl bg-teal-50 border border-teal-100 text-sm text-slate-700">
          <p className="font-semibold text-teal-900 mb-2">Rough guidelines</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Often cited range: about 1–3% density</li>
            <li>Below 1%: may be under-optimized for that term</li>
            <li>Above 3%: can look like keyword stuffing</li>
            <li>Focus on natural, readable content first</li>
          </ul>
        </div>
      </div>

      {/* Info section – 1000+ words, unique, text-justify */}
      <section className="mt-12 sm:mt-14 p-5 sm:p-6 md:p-8 bg-white shadow-md rounded-2xl border border-slate-100">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 border-b border-slate-200 pb-3">
          About Keyword Density and This Checker
        </h2>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Keyword density is the percentage of times a keyword or phrase appears in a piece of text relative to the total number of words. For example, if a 500-word article contains the phrase digital marketing five times, the density for that phrase is one percent. Writers and SEO practitioners sometimes use this metric to check whether a target keyword is used enough (or too much) in a page or article. This keyword density checker runs in your browser: you paste your text, enter the keyword or phrase you want to analyze, and click to see the word count, occurrence count, density percentage, and a simple status. No data is sent to a server, so your content stays private. The tool supports both single words and multi-word phrases. Whether you are optimizing a blog post, checking an ad, or learning how keyword usage works, this checker gives you a quick snapshot of density so you can balance readability with focus on your target term.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">What Is Keyword Density?</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Keyword density is usually expressed as a percentage: (number of times the keyword or phrase appears / total word count) × 100. It was more heavily used in earlier SEO when search engines relied more on exact keyword matches. Today, search algorithms use many other signals (intent, context, synonyms, and quality), but density still serves as a simple sanity check. If a key term never appears, the page may not be clearly about that topic; if it appears in almost every sentence, the text can feel stuffed and may be penalised or ignored. Many content guides suggest aiming for a density in the rough range of 1 to 3 percent for a primary keyword, meaning the keyword appears once or a few times per hundred words. This is only a rule of thumb; the right level depends on the length of the text, the topic, and readability.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">How This Tool Works</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          When you paste or type text into the input area and enter a keyword or phrase, the tool counts the total words in the text (by splitting on spaces and ignoring empty segments). It then counts how many times the exact phrase appears in the text, ignoring case. The density is the number of occurrences divided by the total word count, multiplied by 100. The result is shown as a percentage with two decimal places. The tool also assigns a simple status: low (below 1 percent), optimal (1 to 3 percent), or high (above 3 percent), and suggests whether to consider using the keyword more or less. All counting is done in your browser; no text is uploaded. You can run the check as many times as you like with different keywords or different text.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Why Density Is Only One Factor</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Search engines do not rank pages solely on keyword density. They look at relevance, user behaviour, links, and many other factors. A page with low density for one phrase might still rank well if it clearly satisfies the users intent and uses related terms. Conversely, a page with very high density might be seen as spammy or low quality. So density is best used as a quick check, not a target to hit at all costs. The main goal is readable, useful content that naturally includes the terms people search for. This checker helps you see where you stand so you can adjust if the number is far outside a reasonable range. It does not replace editing for clarity, structure, or topical depth.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Step-by-Step How to Use</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Open the tool in your browser. Paste or type your text into the first box (for example a blog post, product description, or paragraph). In the second box, enter the keyword or phrase you want to analyze. It can be a single word like shoes or a phrase like running shoes. Click the check density button. The results will show total words, how many times the keyword or phrase appears, the density as a percentage, and a status (low, optimal, or high) with a short suggestion. Use this to decide whether to add or reduce the keyword in your text. To analyze another keyword, change the keyword field and click again. To start over with new text, use the clear button. The tool does not store or send your content anywhere.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Single Words vs Phrases</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          This checker supports both single keywords and multi-word phrases. For a single word, it counts how many times that word appears as a whole (case-insensitive). For a phrase, it counts how many times the full phrase appears. So if you enter content marketing, it will count the exact phrase content marketing, not every instance of content or marketing separately. That gives you a more accurate density for the phrase you care about. When you optimise for long-tail or multi-word queries, checking phrase density can be more useful than checking only a single word. You can run the tool multiple times with different phrases on the same text to see how each one scores.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Use Cases</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Content writers and bloggers use keyword density checkers to see if a target term is under- or over-used before publishing. SEO specialists use them when auditing or optimising existing pages. Students and educators use them to teach how keyword usage and repetition work in copy. Marketers may check density in ad copy or landing pages. Anyone who wants a quick numeric view of how often a word or phrase appears in a block of text can use this tool. It is not a substitute for a full SEO or content strategy; it is a simple, private way to get a density figure and a basic recommendation so you can make informed edits.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Privacy and Data</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          This keyword density checker runs entirely in your browser. The text you paste and the keyword you enter are not sent to any server. All counting and calculation happen on your device. That means you can use it for confidential drafts, client content, or internal documents without worrying about uploads or storage. No account or login is required. The tool works offline once the page has loaded. If you are on a shared computer, clear the fields or close the tab when you are done so that your text is not left on screen.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Limitations</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          This tool counts exact phrase matches and total words. It does not analyse synonyms, semantic relevance, or where in the text the keyword appears (for example in the title or first paragraph). It does not account for search engine algorithms or competitiveness. The 1–3 percent guideline is a common rule of thumb, not a guarantee of ranking. Very long texts may take a moment to process in the browser; extremely long documents might be better analysed in chunks or with desktop software. For most articles, blog posts, and short to medium content, this checker is sufficient to get a quick density reading and a simple status.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Conclusion</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
          Keyword density is a simple metric that shows how often a word or phrase appears in your text relative to the total word count. This free checker runs in your browser, supports single words and phrases, and shows you the count, percentage, and a basic status (low, optimal, or high) with a short suggestion. Your content is not uploaded. Use it to quickly see if a target term is under- or over-used and to keep your writing natural and focused. Combine it with good structure and readability for better content and SEO.
        </p>
      </section>
    </ToolSection>
  );
}
