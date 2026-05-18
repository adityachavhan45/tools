"use client";

import { useMemo, useState } from "react";
import ToolSection from "../components/ToolSection";

const sections = [
  {
    heading: "What Regex Tester Does and Why It Matters",
    paragraphs: [
      "Regex Tester helps users test regular expressions quickly with live feedback. This matters because even a small pattern mistake can cause wrong matches or missed results.",
      "A browser tool gives instant testing without needing to open a separate coding environment.",
      "That speed matters because regex work is usually iterative. Users try a pattern, inspect the output, change a character or flag, then test again. A clean testing page supports that loop well and reduces the time spent jumping between editors and other tools.",
    ],
  },
  {
    heading: "Who Should Use Regex Tester",
    paragraphs: [
      "This tool is useful for developers, QA testers, automation engineers, students, and technical users who work with text patterns.",
      "It is especially helpful during debugging when a pattern needs fast testing on sample text.",
      "It is also useful for learning. Regex can feel abstract at first, so seeing matches and replacement output on the same page makes the pattern behavior easier to understand for newer users.",
    ],
  },
  {
    heading: "How to Use Regex Tester Step by Step",
    paragraphs: [
      "Enter your regex pattern, choose the flags you need, then paste sample text into the input area. The tool lists matches and replacement output immediately.",
      "That quick feedback loop makes pattern testing easier and reduces trial-and-error time.",
      "A smart way to use the page is to begin with a small example and then move to more realistic text. That approach makes debugging easier because the user can first confirm the basic logic before testing more complex cases.",
    ],
  },
  {
    heading: "Common Mistakes and How to Avoid Them",
    paragraphs: [
      "A common mistake is forgetting escape characters or using the wrong flags. Another issue is testing on unrealistic sample text that does not represent real use cases.",
      "It is better to test against real examples and review edge cases before using the pattern in production.",
      "Another mistake is writing a pattern that technically matches but is too broad. That can create silent bugs later. The best regex is not just valid syntax. It should also be specific enough for the actual input it is meant to handle.",
    ],
  },
  {
    heading: "Why This Tool Has Long-Term Value",
    paragraphs: [
      "Regex remains important across development, validation, parsing, and automation. That makes regex testing a repeat need for many technical users.",
      "A quick regex tester keeps its value because people come back to it whenever they need to verify a pattern.",
      "This kind of tool also remains useful because text-processing problems do not disappear. New projects, new forms, new imports, and new validation rules all create fresh regex needs, which keeps testing demand steady.",
    ],
  },
  {
    heading: "Best Practices for Better Results",
    paragraphs: [
      "Keep patterns readable when possible, enable only the flags you actually need, and test different edge cases before using the expression in a real project.",
      "If the output looks confusing, simplify the pattern and test again with smaller examples first.",
      "It is often better to build a pattern in small pieces rather than trying to write a large complicated regex in one attempt. Incremental testing usually leads to cleaner and safer results.",
    ],
  },
];

const faq = [
  { question: "What is a regex tester?", answer: "A regex tester helps you try a regular expression on sample text and inspect the results. It gives quick feedback so you can see what matches, what does not match, and how changes to the pattern affect the output." },
  { question: "Can I test flags like g, i, and m?", answer: "Yes, this tool supports common regex flags. That makes it easier to experiment with behavior like global matching, case-insensitive matching, and multiline handling in one place." },
  { question: "Does it show replacement output?", answer: "Yes, the tool previews replacement results too. This is useful when a regex is not only used for matching, but also for cleaning, masking, or transforming text." },
  { question: "Can I use it for debugging patterns?", answer: "Yes, it is useful for fast regex testing and debugging. Instead of guessing what a pattern will do in production code, you can test it on realistic sample input first." },
  { question: "Is this regex tester free?", answer: "Yes, it is free to use online. It is built for quick pattern checks without requiring setup or extra software." },
];

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("\\b\\w+@\\w+\\.\\w+\\b");
  const [flags, setFlags] = useState({ g: true, i: false, m: false });
  const [testText, setTestText] = useState("Email us at hello@example.com and sales@test.org.");
  const [replaceValue, setReplaceValue] = useState("[email]");

  const result = useMemo(() => {
    try {
      if (!pattern.trim()) {
        return {
          error: "Enter a regex pattern to start testing.",
          matches: [],
          replacement: "",
        };
      }

      const activeFlags = Object.entries(flags)
        .filter(([, enabled]) => enabled)
        .map(([flag]) => flag)
        .join("");
      const safeFlags = activeFlags.includes("g") ? activeFlags : `${activeFlags}g`;
      const displayRegex = new RegExp(pattern, activeFlags);
      const matchRegex = new RegExp(pattern, safeFlags);
      const matches = Array.from(testText.matchAll(matchRegex));
      const replacement = testText.replace(displayRegex, replaceValue);
      return {
        error: "",
        matches,
        replacement,
      };
    } catch (error) {
      return {
        error: error.message || "Invalid regular expression.",
        matches: [],
        replacement: "",
      };
    }
  }, [flags, pattern, replaceValue, testText]);

  return (
    <ToolSection
      title="Regex Tester"
      subtitle="Test patterns, flags, matches, groups, and replacements with instant regex feedback."
      plain
      hideSidebar
      centerHeader
      whiteBackground
    >
      <div className="max-w-5xl mx-auto">
        <div className="rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-5 sm:p-6 shadow-sm mb-8">
          <h1 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-700">
            Regex Tester
          </h1>
          <p className="mt-2 text-center text-sm sm:text-base text-slate-600">
            Test regex patterns, flags, matches, groups, and replacements instantly.
          </p>
        </div>

      <div className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">Regex Pattern</label>
          <input value={pattern} onChange={(e) => setPattern(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 font-mono text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600" placeholder="Regex pattern" />
        </div>
        <div className="flex flex-wrap gap-3">
          {["g", "i", "m"].map((flag) => (
            <label key={flag} className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50">
              <input className="accent-cyan-700" type="checkbox" checked={flags[flag]} onChange={(e) => setFlags((prev) => ({ ...prev, [flag]: e.target.checked }))} />
              {flag}
            </label>
          ))}
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">Test Text</label>
          <textarea value={testText} onChange={(e) => setTestText(e.target.value)} className="min-h-40 w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 font-mono text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600" placeholder="Test text" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">Replacement Value</label>
          <input value={replaceValue} onChange={(e) => setReplaceValue(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600" placeholder="Replacement value" />
        </div>

        {result.error ? <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">{result.error}</p> : null}

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-4">
            <h2 className="text-lg font-semibold text-gray-900">Matches</h2>
            <div className="mt-3 space-y-2 text-sm text-gray-700">
              {result.matches.length ? result.matches.map((match, index) => (
                <div key={`${match.index}-${index}`} className="rounded-xl border border-gray-200 bg-white p-3">
                  <p><span className="font-semibold">Match:</span> {match[0]}</p>
                  <p><span className="font-semibold">Index:</span> {match.index}</p>
                  {match.length > 1 ? <p><span className="font-semibold">Groups:</span> {match.slice(1).filter(Boolean).join(", ") || "None"}</p> : null}
                </div>
              )) : <p>No matches found.</p>}
            </div>
          </div>
          <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-4">
            <h2 className="text-lg font-semibold text-gray-900">Replace Preview</h2>
            <pre className="mt-3 whitespace-pre-wrap rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-800">{result.replacement || testText}</pre>
          </div>
        </div>
      </div>
      <div className="mt-8 space-y-8">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">About This Tool</h2>
          <div className="mt-6 space-y-8">
            {sections.map((section) => (
              <div key={section.heading}>
                <h3 className="text-xl font-semibold text-gray-900">{section.heading}</h3>
                <div className="mt-3 space-y-4 text-sm leading-7 text-gray-700 sm:text-base">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={`${section.heading}-${index}`} className="text-justify">{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <div className="mt-6 space-y-4">
            {faq.map((item) => (
              <details key={item.question} className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-4">
                <summary className="cursor-pointer text-base font-semibold text-gray-900">{item.question}</summary>
                <p className="mt-3 text-sm leading-7 text-gray-700 sm:text-base">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
      </div>
    </ToolSection>
  );
}
