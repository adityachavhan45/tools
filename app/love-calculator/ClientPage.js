"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

function CalendarIcon({ className = "w-5 h-5 text-slate-400" }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function getStatus(percentage) {
  if (percentage >= 90) return { text: "Perfect match", color: "text-rose-600", bar: "bg-rose-500" };
  if (percentage >= 80) return { text: "Excellent compatibility", color: "text-rose-500", bar: "bg-rose-400" };
  if (percentage >= 70) return { text: "Great match", color: "text-pink-500", bar: "bg-pink-500" };
  if (percentage >= 60) return { text: "Good compatibility", color: "text-pink-600", bar: "bg-pink-400" };
  if (percentage >= 50) return { text: "Moderate match", color: "text-purple-600", bar: "bg-purple-500" };
  if (percentage >= 40) return { text: "Fair compatibility", color: "text-indigo-600", bar: "bg-indigo-400" };
  if (percentage >= 30) return { text: "Room to grow", color: "text-sky-600", bar: "bg-sky-400" };
  return { text: "Opposites attract", color: "text-teal-600", bar: "bg-teal-400" };
}

export default function LoveCalculatorPage() {
  const [yourName, setYourName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [yourBirthDate, setYourBirthDate] = useState("");
  const [partnerBirthDate, setPartnerBirthDate] = useState("");
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");

  function calculateLove() {
    if (!yourName.trim() || !partnerName.trim()) {
      setMessage("Please enter both names.");
      return;
    }
    setMessage("");
    const name1 = yourName.toLowerCase().replace(/\s/g, "");
    const name2 = partnerName.toLowerCase().replace(/\s/g, "");
    let score = 0;
    const combined = name1 + name2;
    for (let i = 0; i < combined.length; i++) score += combined.charCodeAt(i);
    score = score % 100;
    if (yourBirthDate && partnerBirthDate) {
      const d1 = new Date(yourBirthDate);
      const d2 = new Date(partnerBirthDate);
      const dayDiff = Math.abs(d1.getDate() - d2.getDate());
      const monthDiff = Math.abs(d1.getMonth() - d2.getMonth());
      const yearDiff = Math.abs(d1.getFullYear() - d2.getFullYear());
      if (dayDiff === 0) score += 10;
      if (monthDiff === 0) score += 15;
      if (yearDiff <= 3) score += 5;
    }
    const lengthFactor = (name1.length + name2.length) % 20;
    score += lengthFactor;
    const percentage = Math.max(1, Math.min(100, score));
    const status = getStatus(percentage);
    setResult({
      percentage,
      status: status.text,
      statusColor: status.color,
      barClass: status.bar,
      name1: yourName.trim(),
      name2: partnerName.trim(),
    });
    setMessage("Result ready. For fun only.");
  }

  function reset() {
    setYourName("");
    setPartnerName("");
    setYourBirthDate("");
    setPartnerBirthDate("");
    setResult(null);
    setMessage("Cleared.");
  }

  return (
    <ToolSection
      title="Free Love Calculator"
      subtitle="Fun compatibility based on two names (and optional birth dates). For entertainment only no science, no upload."
      plain
      hideSidebar
      centerHeader
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Love Calculator",
          description: "Fun love compatibility from two names. Entertainment only, in-browser.",
          slug: "/love-calculator",
          category: "Utilities/Entertainment",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Love Calculator", slug: "/love-calculator" },
        ])}
      />

      {message && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-white text-sm sm:text-base transition-all duration-300
          ${message.includes("Result") ? "bg-emerald-600" : ""}
          ${message.includes("Please enter") ? "bg-amber-600" : ""}
          ${message.includes("Cleared") ? "bg-sky-600" : ""}`}
        >
          {message}
        </div>
      )}

      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div className="rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-5 sm:p-6 shadow-sm">
          <h1 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-700">
            Love Calculator Tool
          </h1>
          <p className="mt-2 text-center text-sm sm:text-base text-slate-600">
            Fun compatibility score based on two names and optional birth dates.
          </p>
        </div>

        {/* Inputs */}
        <div className="p-4 sm:p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4">
          <p className="text-sm font-medium text-slate-700">Enter names (birth dates optional)</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-600 mb-1">Your name</label>
              <input
                type="text"
                value={yourName}
                onChange={(e) => setYourName(e.target.value)}
                placeholder="First name or full name"
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Partner name</label>
              <input
                type="text"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                placeholder="First name or full name"
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 love-calc-dates">
            <style dangerouslySetInnerHTML={{ __html: `
              .love-calc-dates input[type="date"] {
                color-scheme: light;
                min-height: 2.75rem;
              }
              .love-calc-dates input[type="date"]::-webkit-calendar-picker-indicator {
                opacity: 0;
                position: absolute;
                right: 0;
                width: 2.5rem;
                height: 100%;
                cursor: pointer;
              }
              .love-calc-dates input[type="date"]::-webkit-date-and-time-value {
                text-align: left;
              }
            `}} />
            <div>
              <label className="block text-sm text-slate-600 mb-1">Your birth date (optional)</label>
              <div className="relative">
                <input
                  type="date"
                  value={yourBirthDate}
                  onChange={(e) => setYourBirthDate(e.target.value)}
                  className="w-full pl-3 pr-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
                  <CalendarIcon />
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Partner birth date (optional)</label>
              <div className="relative">
                <input
                  type="date"
                  value={partnerBirthDate}
                  onChange={(e) => setPartnerBirthDate(e.target.value)}
                  className="w-full pl-3 pr-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
                  <CalendarIcon />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 flex-wrap justify-center sm:justify-start">
          <button
            onClick={calculateLove}
            disabled={!yourName.trim() || !partnerName.trim()}
            className="px-6 py-3 rounded-xl bg-teal-600 text-white font-medium shadow-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Calculate
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
          <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm text-center">
            <p className="text-slate-600 text-sm mb-2">
              {result.name1} and {result.name2}
            </p>
            <p className="text-4xl sm:text-5xl font-bold text-slate-900 mb-1">{result.percentage}%</p>
            <p className={`text-lg font-medium ${result.statusColor}`}>{result.status}</p>
            <div className="mt-4 w-full h-3 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${result.barClass}`}
                style={{ width: `${result.percentage}%` }}
              />
            </div>
            <p className="mt-4 text-xs text-slate-500">For entertainment only. Not a real compatibility test.</p>
          </div>
        )}

        {/* Scale */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700">
          <p className="font-semibold text-slate-800 mb-2">Rough scale (for fun)</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-justify">
            <li>90–100%: Perfect match</li>
            <li>80–89%: Excellent</li>
            <li>70–79%: Great match</li>
            <li>60–69%: Good</li>
            <li>50–59%: Moderate</li>
            <li>40–49%: Fair</li>
            <li>30–39%: Room to grow</li>
            <li>1–29%: Opposites attract</li>
          </ul>
        </div>
      </div>

      {/* Info section – 1000+ words, unique, text-justify */}
      <section className="mx-auto mt-12 sm:mt-14 w-full max-w-5xl p-5 sm:p-6 md:p-8 bg-white shadow-md rounded-2xl border border-slate-200">
  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 border-b border-slate-200 pb-3">
    Why Fun Interactive Tools Remain Popular Online
  </h2>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Interactive entertainment tools have always attracted internet users because they create quick engagement and curiosity. People enjoy trying simple online experiences that generate personalised results instantly. From quizzes and random generators to compatibility checkers and fun calculators, these tools continue to remain popular across websites and social media platforms.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    A Love Calculator is one such entertainment based tool that allows users to enter two names and receive a compatibility style percentage score. While the result is meant purely for fun and should never be treated as scientific or emotionally accurate, many users enjoy it as a light hearted activity with friends, partners, or family members.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Online fun tools remain successful because they create instant interaction without requiring complicated steps. Users simply enter information, click a button, and receive a playful result within seconds. This simplicity is one of the main reasons why entertainment calculators continue to attract attention across all age groups.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Understanding What a Love Calculator Actually Does
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    A Love Calculator is a novelty style tool that generates a compatibility percentage based on user inputs such as names or optional birth dates. The generated result is created using a predefined formula rather than any real psychological, emotional, or scientific relationship analysis.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Different calculators may use different logic internally. Some use letter matching systems, others include date calculations, while some generate randomised percentages with fixed ranges and labels. The purpose is entertainment and engagement rather than relationship prediction.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Most users understand that the score is simply a playful output created for fun. The entertainment aspect is what makes the experience enjoyable and shareable across social conversations and online platforms.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Why People Enjoy Compatibility Style Tools
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Curiosity is one of the biggest reasons people use entertainment calculators online. Users naturally enjoy personalised experiences where results appear connected to their names or choices. Even though the output is not real relationship guidance, the process itself feels engaging and entertaining.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Friends often use love calculators jokingly during conversations or social gatherings. Couples may try them for fun screenshots and reactions. Some users simply enjoy experimenting with celebrity names, fictional characters, or random combinations to see amusing results.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Entertainment based engagement tools work especially well when combined with simple interactive design elements and lightweight user interfaces. Developers creating engaging experiences may also use the <a href="https://convertixy.com/color-palette-generator" className="text-blue-600 hover:underline font-medium">Color Palette Generator</a> while designing attractive visual themes for fun web applications.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    How This Love Calculator Generates Results
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This browser based Love Calculator takes the entered names and optional birth dates to generate a compatibility percentage using predefined internal logic. The system analyses input characters and creates a result based on calculation patterns programmed inside the tool.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    The result is then displayed visually using percentage scores and compatibility style labels. Since the outcome depends entirely on entered values and internal formulas, changing spellings or names may create different results instantly.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Everything runs directly inside the browser, making the experience quick and responsive without requiring external processing systems or complicated setup steps.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Entertainment Tools and User Engagement
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Interactive tools are often used to increase engagement on websites because users enjoy participating rather than simply reading static content. Fun calculators encourage repeat interaction since users tend to test multiple names and combinations repeatedly.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Websites offering lightweight entertainment tools often see stronger user activity because visitors spend more time interacting with dynamic elements. This type of engagement can improve overall browsing experience when implemented responsibly and clearly labelled as entertainment.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Developers who create interactive browser utilities sometimes also use the <a href="https://convertixy.com/random-number-generator" className="text-blue-600 hover:underline font-medium">Random Number Generator</a> during playful application experiments, game logic testing, or entertainment style feature development.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Why Real Relationships Cannot Be Measured by Online Scores
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Real relationships depend on communication, trust, respect, emotional understanding, patience, and shared values. These factors cannot be accurately measured using names, birth dates, or percentage calculations generated through entertainment tools.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Compatibility between people develops through real experiences, conversations, mutual support, and long term understanding rather than online scores. This is why Love Calculators should always be treated as casual entertainment instead of serious emotional guidance.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Maintaining this understanding helps users enjoy the experience responsibly without confusing playful results with actual relationship decisions.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Benefits of Browser Based Fun Calculators
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Browser based tools provide instant accessibility without requiring downloads, registration, or complex setup. Users can open the tool directly on desktop or mobile devices and start interacting immediately.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This Love Calculator works directly inside the browser, making the experience fast and lightweight. Users can repeatedly test names and combinations without delays or account creation requirements.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Interactive entertainment pages are also commonly used while testing user interface concepts. Developers and designers may additionally use the <a href="https://convertixy.com/lorem-ipsum-generator" className="text-blue-600 hover:underline font-medium">Lorem Ipsum Generator</a> when preparing placeholder layouts for playful or experimental web projects.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Social Sharing and Casual Online Entertainment
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Fun tools naturally encourage social sharing because users enjoy showing humorous or unexpected results to others. Compatibility scores, playful labels, and percentage based outputs create lightweight entertainment that feels easy to discuss and share online.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This type of interaction often helps websites create memorable user experiences without requiring complex functionality. Simple entertainment tools can sometimes become surprisingly engaging when combined with attractive design and smooth user interaction.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Casual engagement tools work best when they remain transparent about their entertainment purpose and avoid presenting results as factual or scientific analysis.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Privacy Advantages of Local Browser Processing
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Users often prefer browser based tools because they avoid unnecessary account creation and external data sharing. Lightweight processing improves convenience while also maintaining better privacy during usage.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Since this Love Calculator processes everything locally inside the browser, entered names and optional dates remain on the user device during calculations. No information needs to be uploaded externally before results appear.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This local approach also improves performance because calculations happen instantly without depending on server side processing systems.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Responsible Use of Entertainment Based Calculators
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Entertainment tools should always be used responsibly and understood within the correct context. Love Calculators are intended for fun interaction only and should never influence important emotional or relationship related decisions.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Users should avoid treating generated percentages as real compatibility analysis. Instead, the tool works best as a light hearted experience for casual entertainment and social interaction.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Developers creating engaging entertainment websites may also combine interactive features with utilities such as the <a href="https://convertixy.com/qr-code" className="text-blue-600 hover:underline font-medium">QR Code Generator</a> for playful sharing experiences and creative web interactions.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Final Thoughts on Using a Love Calculator
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
    A Love Calculator is a simple entertainment tool designed to create playful compatibility style results using names and optional birth dates. It provides quick interaction, casual engagement, and light hearted fun without requiring technical knowledge or complicated setup.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify mt-4">
    This browser based calculator allows users to generate results instantly while keeping the experience private and lightweight through local processing. The tool works best when treated purely as entertainment rather than real relationship analysis.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify mt-4">
    Whether you are trying it with friends, testing random names for fun, or simply exploring interactive online experiences, Love Calculators continue to remain popular because they combine curiosity, simplicity, and instant engagement in an enjoyable way.
  </p>
</section>
    </ToolSection>
  );
}
