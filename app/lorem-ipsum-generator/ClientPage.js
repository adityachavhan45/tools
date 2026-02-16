"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum",
];

export default function LoremIpsumGeneratorPage() {
  const [paragraphs, setParagraphs] = useState("3");
  const [words, setWords] = useState("50");
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");

  function generateLoremIpsum() {
    const paragraphCount = Math.max(1, Math.min(20, parseInt(paragraphs, 10) || 3));
    const wordCount = Math.max(10, Math.min(500, parseInt(words, 10) || 50));

    const generateParagraph = () => {
      const paragraphWords = [];
      for (let i = 0; i < wordCount; i++) {
        paragraphWords.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
      }
      return paragraphWords.join(" ");
    };

    const generatedParagraphs = [];
    for (let i = 0; i < paragraphCount; i++) {
      generatedParagraphs.push(generateParagraph());
    }

    setResult(generatedParagraphs.join("\n\n"));
    setMessage("Generated. Copy or use the text below.");
  }

  function copyResult() {
    if (result) {
      navigator.clipboard.writeText(result);
      setMessage("Text copied to clipboard.");
    }
  }

  function reset() {
    setParagraphs("3");
    setWords("50");
    setResult("");
    setMessage("Cleared.");
  }

  return (
    <ToolSection
      title="Free Lorem Ipsum Generator"
      subtitle="Generate placeholder text for design and layout. Choose paragraphs and words per paragraph no upload, works in your browser."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Lorem Ipsum Generator",
          description: "Generate Lorem Ipsum placeholder text with custom paragraphs and word count. In-browser, no sign-up.",
          slug: "/lorem-ipsum-generator",
          category: "Utilities/Text",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Lorem Ipsum Generator", slug: "/lorem-ipsum-generator" },
        ])}
      />

      {message && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-white text-sm sm:text-base transition-all duration-300
          ${message.includes("Generated") || message.includes("copied") ? "bg-emerald-600" : ""}
          ${message.includes("Cleared") ? "bg-sky-600" : ""}`}
        >
          {message}
        </div>
      )}

      <div className="space-y-6">
        {/* Options */}
        <div className="p-4 sm:p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-700 mb-4">Options</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-600 mb-1">Paragraphs (1–20)</label>
              <input
                type="number"
                min={1}
                max={20}
                value={paragraphs}
                onChange={(e) => setParagraphs(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Words per paragraph (10–500)</label>
              <input
                type="number"
                min={10}
                max={500}
                value={words}
                onChange={(e) => setWords(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={generateLoremIpsum}
            className="px-6 py-3 rounded-xl bg-teal-600 text-white font-medium shadow-md hover:bg-teal-700 transition"
          >
            Generate
          </button>
          {result && (
            <button
              onClick={copyResult}
              className="px-6 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-medium transition"
            >
              Copy text
            </button>
          )}
          <button
            onClick={reset}
            className="px-6 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-medium transition"
          >
            Clear all
          </button>
        </div>

        {/* Output */}
        {result && (
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700 mb-2">Generated text</label>
            <div className="relative">
              <pre className="w-full min-h-[200px] p-4 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 text-sm leading-relaxed whitespace-pre-wrap font-sans overflow-auto">
                {result}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* Info section – 1000+ words, unique, text-justify */}
      <section className="mt-12 sm:mt-14 p-5 sm:p-6 md:p-8 bg-white shadow-md rounded-2xl border border-slate-100">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 border-b border-slate-200 pb-3">
          About Lorem Ipsum and This Generator
        </h2>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Lorem Ipsum is placeholder text that designers and developers use when they need to show how a layout or type will look before the real content is ready. It looks like Latin and has a natural mix of word lengths and letter frequencies, so it behaves more like real prose than repeated phrases like content here. A Lorem Ipsum generator produces this placeholder text on demand: you choose how many paragraphs you want and how many words per paragraph, then click to generate. This generator runs in your browser and uses a classic set of Lorem Ipsum words, so the output is random but still in the same style. No text is sent to a server. Whether you are mocking up a website, testing typography, or filling a template, this tool gives you instant placeholder text that you can copy and paste wherever you need it.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">What Is Lorem Ipsum?</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Lorem Ipsum comes from a altered passage of the Latin work by Cicero called De Finibus Bonorum et Malorum (On the Ends of Good and Evil), written around 45 BC. The text was scrambled and adapted over time so that it no longer reads as meaningful Latin but keeps a realistic distribution of letters and words. Printers and typesetters have used it since at least the 1500s as dummy text. The phrase Lorem Ipsum it self often appears at the start of the passage. In design and publishing, it became the standard placeholder because it avoids distracting the viewer with readable content while still looking like a real block of text. Today it is used in design software, website templates, and wireframes all over the world.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Why Use Placeholder Text?</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          When you are designing a layout, you need something in the content area to see how lines wrap, how headings sit, and how much space the text takes. If you use real copy too early, clients or stakeholders may focus on the wording instead of the design. If you use a single repeated phrase like text here, the result looks artificial and does not test typography well. Placeholder text like Lorem Ipsum looks like a real paragraph: it has short and long words, normal spacing, and a natural rhythm. That makes it easier to judge font size, line height, and column width. Developers use it in prototypes and style guides. Content teams sometimes use it to reserve space before the final copy is written. Students use it in assignments and presentations. Having a generator that produces a custom amount of text (paragraphs and words) saves time compared to copying from a fixed sample.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">How This Generator Works</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          You set two values: the number of paragraphs (from 1 to 20) and the number of words per paragraph (from 10 to 500). When you click generate, the tool builds each paragraph by picking words at random from a fixed list of Lorem Ipsum words. The words are the same classic set used in many generators (lorem, ipsum, dolor, sit, amet, and so on). Each paragraph is a string of that many words, separated by spaces. Paragraphs are separated by a blank line so that when you paste the result into a document or design tool, you get distinct blocks. The text is generated in your browser; nothing is sent to a server. You can generate again to get a different random arrangement, or change the counts and generate again. The result is plain text that you can copy with one click.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Step-by-Step How to Use</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Open the generator in your browser. Enter the number of paragraphs you want (for example 3 or 5). Enter the number of words per paragraph (for example 50 or 100). Click the generate button. The placeholder text will appear in the output area. If you want different text, click generate again. To copy the text, click the copy button; the full output will be copied to your clipboard so you can paste it into your layout, document, or code. Use the clear button to reset the options and output. There is no limit on how many times you generate; the tool runs entirely in the browser and does not store or transmit your data.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Where Lorem Ipsum Is Used</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Web designers use Lorem Ipsum in wireframes and mockups to show how a page will look with body text. Graphic designers use it in posters, brochures, and magazines when the final copy is not yet approved. Developers use it in design systems and component libraries to demonstrate text styles and spacing. Content management systems and theme marketplaces often ship with Lorem Ipsum in sample pages. Educators use it in typography and design courses. Anyone who needs to fill a space with realistic-looking text without writing real content can use it. The generator here is aimed at that use: quick, custom-length placeholder text with no sign-up and no upload.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Limitations</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          This generator produces random sequences of words from a fixed list. The result is not grammatically correct Latin or English; it is nonsense that looks like text. It does not include punctuation or sentence structure; each paragraph is one long run of words. For some uses you may want to add periods or commas manually, or use a different tool that generates sentence-like structures. The word list is the classic Lorem Ipsum set, so the vocabulary is limited. For very long documents, you might need to generate in batches. The tool is intended for design and layout placeholder use, not for linguistic or academic purposes.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Privacy and Data</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          This Lorem Ipsum generator runs entirely in your browser. The options you choose (paragraph count and word count) and the generated text are not sent to any server. Nothing is stored or logged. You can use the tool without an account. It works offline once the page has loaded. Because the output is random placeholder text with no personal or sensitive content, there is no privacy risk in generating or copying it. If you are on a shared computer, clear the output when you are done if you do not want the text left on screen.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Conclusion</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
          Lorem Ipsum is the standard placeholder text for design and layout. This free generator lets you create custom-length placeholder text by choosing the number of paragraphs and words per paragraph. The text is generated in your browser and can be copied with one click. Use it for mockups, wireframes, typography testing, or any place where you need realistic-looking filler text. No data is uploaded or stored. For quick, private, and simple Lorem Ipsum generation, this tool is a practical option.
        </p>
      </section>
    </ToolSection>
  );
}
