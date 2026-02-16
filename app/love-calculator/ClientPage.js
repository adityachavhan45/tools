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
      plainSidebar
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

      <div className="space-y-6">
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
        <div className="flex gap-3 flex-wrap">
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
      <section className="mt-12 sm:mt-14 p-5 sm:p-6 md:p-8 bg-white shadow-md rounded-2xl border border-slate-100">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 border-b border-slate-200 pb-3">
          About This Love Calculator
        </h2>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          A love calculator is a fun tool that takes two names (and sometimes birth dates) and shows a compatibility score, usually as a percentage. It is not scientific and does not predict real relationships. The result is produced by a simple formula based on the letters in the names (and optionally date differences), so it is meant for entertainment only. This calculator runs in your browser: you enter two names, optionally two birth dates, and click to see a score and a short label. No data is sent to a server. Many people use it as a light-hearted game at parties, as a conversation starter, or to share a silly result with a friend or partner. It is important to remember that real compatibility depends on communication, respect, and shared values, not on a number generated from names or dates.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">What Is a Love Calculator?</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          A love calculator is a novelty or entertainment tool that outputs a compatibility percentage between two people based on inputs like their names or birth dates. The idea has been around for a long time in magazines, websites, and apps. The calculation is usually a mix of simple rules: for example adding up the numeric values of letters in the names, or comparing birth dates, and then turning that into a number between 1 and 100. Because the method is arbitrary and not based on psychology or relationship research, the result has no predictive value. It is best enjoyed as a bit of fun, similar to a fortune cookie or a personality quiz in a magazine. This tool is designed in that spirit: quick, harmless, and clearly labelled as for entertainment only.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">How This Calculator Works</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          You enter two names (required) and optionally two birth dates. The tool combines the letters of both names into a single string, converts each letter to a number (using character codes), and sums them. That sum is then reduced to a value between 0 and 99 and used as the base of the score. If you enter both birth dates, the calculator adds small bonuses for same day, same month, or close birth years. The length of the names also influences the score slightly. The final number is clamped between 1 and 100 and shown as a percentage. A short label (for example Good compatibility or Opposites attract) is chosen from ranges (e.g. 60–69% gets one message, 70–79% another). All of this runs in your browser; nothing is sent to a server. Changing the spelling of a name or the dates will change the result, which shows that the outcome is just a function of the input, not a real assessment.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Entertainment Only</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          This love calculator is not a psychological test, a relationship counsellor, or a predictor of romantic success. Real compatibility depends on many factors that cannot be captured by names or birth dates: communication style, values, life goals, trust, conflict resolution, and shared experiences. Serious relationship decisions should not be based on the score shown here. The tool is intended for light entertainment: a laugh with friends, a silly screenshot to share, or a conversation starter. If you or someone you know is going through a difficult relationship, it is better to talk to a trusted person or a professional than to rely on any online calculator. Keeping this in mind helps you use the tool in the right spirit and avoid misunderstanding its purpose.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Step-by-Step How to Use</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Open the calculator in your browser. Type the first persons name in the Your name field and the second persons name in the Partner name field. You can use first names only or full names; the tool uses the letters you type. If you want the result to take birth dates into account, fill in both date fields. If you leave the dates blank, the calculation uses only the names. Click the calculate button. The result will show a percentage and a short label, plus a bar to visualise the score. You can try different spellings or names to see how the number changes. Use the clear button to reset and try again. There is no limit on how many times you can run it; everything happens in your browser and no data is stored or sent.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Why People Use Love Calculators</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          People use love calculators for fun, curiosity, or as a social activity. Couples sometimes try it together for a laugh. Friends use it to joke about crushes or celebrity names. It can break the ice in a group or give something silly to share on social media. In some cultures, name or date compatibility is a traditional concept; a calculator like this might be used in a light-hearted way alongside that, without being taken as truth. As long as everyone understands that the result is not scientific, it can be a harmless pastime. The key is to treat it as a game, not as guidance for real-life decisions.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Privacy and Data</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          This love calculator runs entirely in your browser. The names and dates you enter are not sent to any server. No results are stored or logged. You do not need an account. The tool works offline once the page has loaded. If you are on a shared or public computer, you may still want to clear the fields or close the tab when you are done, so that the names you entered are not left on screen. Because the calculation is local and no data is transmitted, there is no risk of your inputs being saved or used elsewhere by this tool.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Limitations</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          The calculator does not use psychology, astrology, or relationship research. It does not know anything about personality, values, or behaviour. The same two names will always produce the same result unless you change the input or the optional birth dates. Different tools may use different formulas, so the same names might give different percentages elsewhere. The labels (e.g. Good compatibility) are fixed for each percentage range and are not personalised. The tool is not intended for children in a way that could confuse them about real relationships; it is aimed at casual, fun use by people who understand it is not serious.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Conclusion</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
          A love calculator is a fun way to get a fake compatibility score from two names and optional birth dates. This free tool runs in your browser, does not send or store your data, and shows a percentage and a short label. Use it for entertainment only: as a game, an ice breaker, or a silly thing to share. Real relationships are built on communication, respect, and commitment, not on a number from a website. Enjoy the calculator in that spirit, and do not use it to make serious decisions about love or compatibility.
        </p>
      </section>
    </ToolSection>
  );
}
