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
      hideSidebar
      centerHeader
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

      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div className="rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-5 sm:p-6 shadow-sm">
          <h1 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-700">
            Keyword Density Checker Tool
          </h1>
          <p className="mt-2 text-center text-sm sm:text-base text-slate-600">
            Check keyword frequency, density percentage, and quick SEO guidance instantly.
          </p>
        </div>

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
        <div className="flex gap-3 flex-wrap justify-center sm:justify-start">
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
     <section className="mx-auto mt-12 sm:mt-14 w-full max-w-5xl p-5 sm:p-6 md:p-8 bg-white shadow-md rounded-2xl border border-slate-200">
  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 border-b border-slate-200 pb-3">
    Why Keyword Usage Still Matters in SEO Content Writing
  </h2>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Search engine optimisation has changed significantly over the years, but keywords still remain an important part of content strategy. Search engines now understand topics, user intent, and contextual meaning much better than before, yet they still rely on keywords to identify what a webpage is mainly about. When keywords are used naturally inside content, headings, and descriptions, they help search engines connect pages with relevant user searches.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    The challenge begins when writers either overuse keywords or completely ignore them. Too many repeated keywords can make content feel robotic and unnatural, while too little keyword usage may reduce topic clarity. This is why many writers, bloggers, marketers, and SEO professionals use keyword density checkers to maintain balance while writing content for websites, blogs, landing pages, and online stores.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    A Keyword Density Checker helps users understand how frequently a keyword or phrase appears inside content compared to the total number of words. Instead of manually counting repetitions, users can instantly analyse keyword usage and make improvements based on readability and optimisation needs.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Understanding Keyword Density in Simple Language
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Keyword density refers to the percentage of times a specific keyword appears within a piece of content relative to the overall word count. For example, if a keyword appears five times inside a five hundred word article, the keyword density would be around one percent.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Earlier SEO practices focused heavily on exact keyword repetition. Many websites used to stuff keywords aggressively in hopes of ranking higher on search engines. Over time, search algorithms became more advanced and started prioritising content quality, readability, user satisfaction, and natural language patterns instead of excessive repetition.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Today, keyword density works more like a guideline instead of a strict ranking formula. Writers use it to ensure content remains focused on the intended topic without sounding spammy or repetitive.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Why Balanced Keyword Usage Improves Content Quality
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Natural keyword placement helps search engines understand page relevance while keeping content comfortable for readers. When keywords are added thoughtfully inside headings, introductions, paragraphs, and conclusions, the article feels more organised and topic focused.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Overusing keywords creates poor readability and often makes sentences feel forced. Readers quickly notice unnatural repetition, especially when the same phrase appears repeatedly without meaningful context. Search engines may also treat heavily stuffed content as low quality because it reduces user experience.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Balanced optimisation creates better results in the long term. Many website owners combine keyword analysis with tools like the <a href="https://convertixy.com/seo-audit-checker" className="text-blue-600 hover:underline font-medium">SEO Audit Checker</a> to improve overall content quality, readability, and page optimisation together.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    How This Keyword Density Checker Works
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This tool allows users to paste content directly into the browser and analyse how often a particular keyword or phrase appears. Users can enter single words or complete phrases depending on what they want to track inside the text.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    The tool first calculates the total number of words inside the content. After that, it checks how many times the selected keyword or phrase appears. Using these values, it generates the keyword density percentage automatically. The result gives users a quick understanding of whether the keyword usage feels too low, balanced, or excessively repeated.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Since everything works directly inside the browser, the process remains fast and simple even for beginners who have little technical experience with SEO tools.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Why Keyword Density Alone Is Not Enough for SEO
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Modern search engines analyse much more than simple keyword repetition. Factors such as user intent, content usefulness, page structure, loading speed, mobile friendliness, backlinks, and engagement signals all contribute to search visibility.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    A page with perfect keyword density may still perform poorly if the content lacks depth or fails to answer user questions properly. Similarly, pages with lower keyword density can rank well if they provide detailed, valuable, and relevant information.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This is why writers should focus on creating natural, human friendly content first. Keyword density should only be used as a supporting metric instead of becoming the main goal during writing.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Benefits of Using a Keyword Density Checker
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    One of the biggest benefits of using a keyword density checker is improved content awareness. Writers can quickly identify whether they are overusing certain terms without manually reviewing the entire article line by line.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    The tool also helps maintain better readability. Instead of stuffing the same phrase repeatedly, writers can adjust their wording naturally and introduce related terms where necessary. This creates smoother reading experiences for visitors while still maintaining topic relevance.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    SEO professionals often use density analysis while auditing older articles. Combined with tools like the <a href="https://convertixy.com/meta-tag-generator" className="text-blue-600 hover:underline font-medium">Meta Tag Generator</a>, they can improve content optimisation and metadata consistency across webpages more effectively.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Single Keywords Versus Multi Word Phrases
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Keyword analysis is not limited to single words. Many websites now target long tail phrases because they match search intent more accurately. For example, instead of targeting only “shoes,” websites may focus on phrases such as “best running shoes for beginners” or “lightweight gym shoes for men.”
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Multi word keyword analysis helps writers understand how naturally complete search phrases appear inside the content. Long tail phrases often bring more targeted traffic because they match specific user searches more closely.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Writers handling structured optimisation tasks frequently use supporting utilities like the <a href="https://convertixy.com/keyword-density-checker" className="text-blue-600 hover:underline font-medium">Keyword Density Checker</a> alongside content planning workflows to improve topical relevance naturally.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Common Mistakes Writers Make During SEO Optimisation
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    One of the most common mistakes is forcing keywords into every sentence without considering readability. This usually creates awkward wording that negatively affects user experience. Search engines now recognise unnatural optimisation patterns much more effectively than before.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Another mistake is focusing only on one keyword repeatedly while ignoring related terms and topic depth. High quality content usually contains natural variations, contextual wording, and useful explanations instead of constant repetition.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Some writers also ignore structure completely. Even well optimised keywords cannot compensate for poorly organised paragraphs, weak headings, or thin informational content. Strong SEO content should feel informative, natural, and useful from beginning to end.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Practical Use Cases for Keyword Density Analysis
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Bloggers use keyword density tools before publishing articles to ensure optimisation feels balanced. SEO specialists analyse density while auditing existing pages for performance improvements. Ecommerce businesses review product descriptions to avoid repetitive optimisation patterns.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Students and beginners learning SEO also use density tools to understand how keyword repetition works inside digital content. Marketing agencies frequently analyse client content to maintain consistency across landing pages, blogs, and promotional materials.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Content creators who prepare articles regularly may also use the <a href="https://convertixy.com/word-counter" className="text-blue-600 hover:underline font-medium">Word Counter</a> together with density analysis tools to balance both content length and optimisation quality while writing.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Privacy Advantages of Browser Based SEO Tools
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Many writers work with confidential drafts, unpublished content, business documents, or client material. Uploading such content to unknown platforms may create privacy concerns. Browser based tools solve this problem by processing data locally on the user device itself.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This keyword density checker runs entirely inside the browser, meaning content does not need to be uploaded externally during analysis. Users can review keyword usage privately without worrying about server side storage or unnecessary data exposure.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Local processing also improves speed because results appear instantly without waiting for uploads or remote server responses.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Final Thoughts on Maintaining Natural SEO Content
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
    Keyword density remains a useful metric for understanding how often important terms appear inside content, but it should always support readability instead of controlling it completely. The best performing content usually feels natural, informative, and genuinely useful for readers.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify mt-4">
    This Keyword Density Checker provides a simple and efficient way to analyse keyword usage while maintaining better writing balance. Users can quickly review density percentages, identify excessive repetition, and improve optimisation without making content feel artificial.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify mt-4">
    Whether you are managing blogs, business websites, ecommerce pages, educational content, or SEO campaigns, maintaining balanced keyword usage can help create cleaner and more user friendly content experiences in the long run.
  </p>
</section>
    </ToolSection>
  );
}
