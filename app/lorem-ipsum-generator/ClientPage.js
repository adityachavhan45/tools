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
      hideSidebar
      centerHeader
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

      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div className="rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-5 sm:p-6 shadow-sm">
          <h1 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-700">
            Lorem Ipsum Generator Tool
          </h1>
          <p className="mt-2 text-center text-sm sm:text-base text-slate-600">
            Generate placeholder text with custom paragraphs and words instantly.
          </p>
        </div>

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
        <div className="flex gap-3 flex-wrap justify-center sm:justify-start">
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
      <section className="mx-auto mt-12 sm:mt-14 w-full max-w-5xl p-5 sm:p-6 md:p-8 bg-white shadow-md rounded-2xl border border-slate-200">
  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 border-b border-slate-200 pb-3">
    Why Placeholder Text Is Important During Website and UI Design
  </h2>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Designing a website or application layout becomes much easier when there is sample content available inside the design structure. Empty sections often make it difficult for developers, designers, and content creators to understand how the final interface will actually look after real content is added. This is why placeholder text plays an important role during design and development workflows.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Lorem Ipsum is one of the most commonly used placeholder text formats in the design industry. Designers use it while creating website layouts, mobile applications, wireframes, landing pages, blog templates, brochures, and UI components. Instead of manually writing temporary text every time, users can instantly generate structured placeholder content using a Lorem Ipsum Generator.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    A Lorem Ipsum Generator helps create random filler text quickly so designers and developers can focus on layout structure, typography, spacing, and visual hierarchy before final content becomes available. This saves time and helps projects move faster during the early development stages.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Understanding What Lorem Ipsum Actually Is
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Lorem Ipsum is placeholder text that resembles natural writing patterns without carrying meaningful readable information. The text originally evolved from classical Latin literature and later became widely adopted by printers, publishers, and designers as dummy content for layout testing.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Unlike repetitive placeholders such as “sample text here” or “content goes here,” Lorem Ipsum contains varying word lengths and realistic paragraph flow. This helps designers analyse typography, spacing, readability, and layout consistency much more effectively during development and presentation stages.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Today, Lorem Ipsum remains one of the most widely used placeholder formats across web design, graphic design, mobile app interfaces, content management systems, and design software templates worldwide.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Why Designers Prefer Placeholder Content During Layout Creation
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    During the early stages of a project, final content is often unavailable. However, developers and designers still need to test how sections, cards, headings, images, buttons, and typography will behave visually inside the interface. Placeholder text allows teams to continue working without waiting for actual written content.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Using realistic looking filler text helps designers judge line spacing, font size, paragraph flow, and responsive layout behaviour more accurately. It also prevents stakeholders from focusing too much on temporary wording instead of evaluating the actual design structure.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Designers working on website optimisation projects often combine layout testing with tools such as the <a href="https://convertixy.com/color-palette-generator" className="text-blue-600 hover:underline font-medium">Color Palette Generator</a> to create visually balanced interfaces alongside structured placeholder content.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    How This Lorem Ipsum Generator Works
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This browser based generator allows users to create custom placeholder text instantly by selecting paragraph count and word quantity. Once the generate option is clicked, the tool creates random Lorem Ipsum text based on the selected settings.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Users can generate short paragraphs for buttons and cards or larger blocks for blogs, articles, and landing pages. The flexibility helps developers and designers quickly test different layout scenarios without manually creating sample text repeatedly.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Since everything works directly inside the browser, the process feels lightweight, fast, and beginner friendly even for users with no technical design experience.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Why Typography Testing Matters in Modern UI Design
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Typography strongly affects readability and user experience across websites and applications. Even well designed interfaces can feel difficult to use if font sizes, spacing, line height, or text alignment are poorly managed.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Placeholder text allows designers to test how typography behaves inside various sections before final content arrives. This includes checking mobile responsiveness, spacing consistency, readability across devices, and visual balance between headings and paragraphs.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Designers who regularly optimise text presentation may also use the <a href="https://convertixy.com/text-diff-checker" className="text-blue-600 hover:underline font-medium">Text Diff Checker</a> when reviewing content changes or comparing design revisions across layouts and development stages.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Common Situations Where Lorem Ipsum Is Frequently Used
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Web developers commonly use Lorem Ipsum while creating templates, testing responsive layouts, and building reusable UI components. Graphic designers include placeholder text inside posters, banners, magazines, brochures, and marketing designs before receiving final copy from clients.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Application designers use placeholder text inside dashboards, onboarding screens, settings panels, and product previews during interface prototyping. Content management systems and website themes also rely heavily on placeholder content during demo setup.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Students learning web design or frontend development often use Lorem Ipsum while practicing HTML, CSS, React, and responsive design projects because it allows them to focus on layout structure instead of content writing initially.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Advantages of Browser Based Placeholder Generators
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Browser based tools provide instant accessibility across desktop and mobile devices without requiring software installation. Designers and developers can quickly generate placeholder content directly inside the browser whenever needed during projects.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This Lorem Ipsum Generator works locally and creates text instantly without depending on heavy processing systems or complicated setup steps. Users can repeatedly generate fresh content variations with different lengths depending on design requirements.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Developers handling content heavy layouts may also combine this generator with utilities like the <a href="https://convertixy.com/word-counter" className="text-blue-600 hover:underline font-medium">Word Counter</a> while testing content limits, spacing behaviour, and text overflow handling inside interfaces.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Why Placeholder Content Helps During Client Presentations
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    During presentations, stakeholders often focus heavily on wording if actual content appears inside unfinished layouts. Placeholder text reduces this distraction and allows teams to evaluate structure, navigation, colour balance, and overall user experience more objectively.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This makes feedback sessions more productive because discussions remain focused on design improvements rather than temporary content details. Designers can refine layouts faster before final copywriting begins.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Placeholder text also helps maintain consistency across incomplete pages during large scale website or application development projects.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Privacy and Simplicity Benefits of Local Generation
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Many users prefer lightweight tools that work directly inside the browser without requiring registration or cloud processing. Browser based generation improves convenience while reducing unnecessary complexity during design workflows.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Since this Lorem Ipsum Generator processes everything locally, generated text and selected settings remain on the user device itself during usage. No account setup or external data transfer is required, making the experience faster and more private.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This local approach also ensures quick generation even when users repeatedly create large amounts of placeholder content during active design sessions.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Helpful Tips While Using Placeholder Text in Projects
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Placeholder text should mainly be used during design, testing, and prototyping stages. Before launching websites or applications publicly, teams should replace Lorem Ipsum with meaningful, user focused content that matches the actual purpose of the project.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Designers should also test layouts using both short and long content variations because real world text lengths often vary significantly. Responsive testing becomes much more reliable when interfaces are evaluated using different paragraph sizes and heading structures.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Developers working with content formatting workflows sometimes additionally use the <a href="https://convertixy.com/markdown-to-html" className="text-blue-600 hover:underline font-medium">Markdown to HTML Converter</a> while preparing structured layouts and content previews for websites and applications.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Final Thoughts on Using a Lorem Ipsum Generator
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
    A Lorem Ipsum Generator is a practical tool for designers, developers, students, and content creators who need realistic looking placeholder text during layout creation and interface testing. It helps simplify workflow management while improving focus on design structure and visual presentation.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify mt-4">
    This browser based generator allows users to create customised placeholder content quickly without complicated setup or software installation. The process remains lightweight, fast, and beginner friendly across devices.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify mt-4">
    Whether you are building websites, testing responsive layouts, designing mobile applications, preparing client presentations, or practicing frontend development, placeholder text generation can help create cleaner and more efficient design workflows throughout the project lifecycle.
  </p>
</section>
    </ToolSection>
  );
}
