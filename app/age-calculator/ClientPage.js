"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

function CalendarIcon({ className = "w-5 h-5 text-gray-400" }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function getNextBirthday(birthDate, currentDate) {
  const birth = new Date(birthDate);
  const current = new Date(currentDate);
  const thisYearBday = new Date(current.getFullYear(), birth.getMonth(), birth.getDate());
  if (thisYearBday > current) {
    return { date: thisYearBday, daysLeft: Math.ceil((thisYearBday - current) / (1000 * 60 * 60 * 24)) };
  }
  const nextBday = new Date(current.getFullYear() + 1, birth.getMonth(), birth.getDate());
  return { date: nextBday, daysLeft: Math.ceil((nextBday - current) / (1000 * 60 * 60 * 24)) };
}

export default function AgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [age, setAge] = useState({ years: 0, months: 0, weeks: 0, days: 0 });
  const [nextBirthday, setNextBirthday] = useState(null);
  const [hasResult, setHasResult] = useState(false);

  function calculateAge() {
    if (!birthDate.trim()) {
      setMessage("Please enter your date of birth.");
      return;
    }
    try {
      const birth = new Date(birthDate);
      const current = currentDate ? new Date(currentDate) : new Date();

      if (isNaN(birth.getTime())) {
        setMessage("Please enter a valid date of birth.");
        return;
      }
      if (isNaN(current.getTime())) {
        setMessage("Please enter a valid current date.");
        return;
      }
      if (birth > current) {
        setMessage("Date of birth cannot be in the future.");
        return;
      }

      const ageInMs = current - birth;
      const ageInDays = Math.floor(ageInMs / (1000 * 60 * 60 * 24));
      const ageInYears = Math.floor(ageInDays / 365.25);
      const ageInMonths = Math.floor(ageInDays / 30.44);
      const ageInWeeks = Math.floor(ageInDays / 7);

      setAge({ years: ageInYears, months: ageInMonths, weeks: ageInWeeks, days: ageInDays });
      setNextBirthday(getNextBirthday(birthDate, current));
      setHasResult(true);
      setMessage("");

      const resultText = `Age Calculator Result
Generated: ${new Date().toLocaleString()}

Date of birth: ${birthDate}
Current date: ${currentDate || "Today"}

Age: ${ageInYears} years, ${ageInMonths} months
Total: ${ageInWeeks} weeks, ${ageInDays} days
`;
      setResult(resultText);
    } catch {
      setMessage("Something went wrong. Please check your dates and try again.");
    }
  }

  function copyResult() {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setMessage("Result copied to clipboard.");
  }

  function reset() {
    setBirthDate("");
    setCurrentDate("");
    setResult("");
    setMessage("");
    setAge({ years: 0, months: 0, weeks: 0, days: 0 });
    setNextBirthday(null);
    setHasResult(false);
  }

  const sidebar = (
    <div className="space-y-4 text-sm text-gray-700 text-justify">
      <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
        <p className="font-semibold text-blue-900 mb-2">How it works</p>
        <p className="text-blue-800 text-justify">
          Enter your date of birth; the tool uses the current date (or your chosen date) to compute exact age in years, months, weeks, and days. Leave &quot;Current date&quot; empty to use today.
        </p>
      </div>
      <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
        <p className="font-semibold text-amber-900 mb-2">Tip</p>
        <p className="text-amber-800 text-justify">
          Use this for forms, exams, or milestone tracking. Results can be copied for documents or records.
        </p>
      </div>
    </div>
  );

  return (
    <ToolSection
      title="Age Calculator"
      subtitle="Calculate your exact age in years, months, weeks, and days from your date of birth. Free, fast, and accurate with optional next birthday info."
      plain
      plainSidebar
      whiteBackground
      sidebar={sidebar}
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Age Calculator",
          description: "Calculate exact age from date of birth in years, months, weeks, and days.",
          slug: "/age-calculator",
          category: "Utilities/Date",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Age Calculator", slug: "/age-calculator" },
        ])}
      />

      <div className="space-y-6">
        {message && (
          <div
            role="alert"
            className="px-4 py-3 text-sm rounded-xl border border-amber-300 bg-amber-50 text-amber-800 text-justify"
          >
            {message}
          </div>
        )}

        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 sm:p-6 space-y-5 age-calc-dates">
          <style dangerouslySetInnerHTML={{ __html: `
            .age-calc-dates input[type="date"]::-webkit-calendar-picker-indicator {
              opacity: 0;
              position: absolute;
              right: 0;
              width: 48px;
              height: 100%;
              cursor: pointer;
            }
            .age-calc-dates input[type="date"]::-webkit-date-and-time-value { text-align: left; }
          `}} />
          <h2 className="text-lg font-semibold text-gray-900">Enter dates</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="birth-date" className="block text-sm font-medium text-gray-700 mb-1.5">
                Date of birth
              </label>
              <div className="relative">
                <input
                  id="birth-date"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full pl-4 pr-11 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white [color-scheme:light]"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
                  <CalendarIcon />
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="current-date" className="block text-sm font-medium text-gray-700 mb-1.5">
                Current date (optional)
              </label>
              <div className="relative">
                <input
                  id="current-date"
                  type="date"
                  value={currentDate}
                  onChange={(e) => setCurrentDate(e.target.value)}
                  className="w-full pl-4 pr-11 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white [color-scheme:light]"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
                  <CalendarIcon />
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-500">Leave empty to use today&apos;s date</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={calculateAge}
              disabled={!birthDate.trim()}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-medium shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none transition-colors"
            >
              Calculate age
            </button>
            <button
              type="button"
              onClick={reset}
              className="px-5 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {hasResult && (
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="px-5 py-4 bg-indigo-600 text-white">
              <h3 className="text-lg font-semibold">Your age</h3>
              <p className="text-indigo-100 text-sm mt-0.5">Based on the dates you entered</p>
            </div>
            <div className="p-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center p-4 rounded-xl bg-indigo-50 border border-indigo-100">
                <p className="text-2xl font-bold text-indigo-700">{age.years}</p>
                <p className="text-sm text-gray-600 mt-1">Years</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-blue-50 border border-blue-100">
                <p className="text-2xl font-bold text-blue-700">{age.months}</p>
                <p className="text-sm text-gray-600 mt-1">Months</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-green-50 border border-green-100">
                <p className="text-2xl font-bold text-green-700">{age.weeks}</p>
                <p className="text-sm text-gray-600 mt-1">Weeks</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-amber-50 border border-amber-100">
                <p className="text-2xl font-bold text-amber-700">{age.days}</p>
                <p className="text-sm text-gray-600 mt-1">Days</p>
              </div>
            </div>
            {nextBirthday && (
              <div className="px-5 pb-5">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-center sm:text-left">
                  <p className="text-sm font-medium text-gray-700">
                    Next birthday: <strong>{nextBirthday.date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</strong>
                    {nextBirthday.daysLeft >= 0 && (
                      <span className="block sm:inline sm:ml-2 mt-1 sm:mt-0">({nextBirthday.daysLeft} days from {currentDate ? "selected date" : "today"})</span>
                    )}
                  </p>
                </div>
              </div>
            )}
            <div className="px-5 pb-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={copyResult}
                className="px-4 py-2 rounded-lg bg-gray-700 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Copy result
              </button>
            </div>
          </div>
        )}

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">How age is calculated</h4>
          <ul className="text-sm text-gray-700 space-y-1 text-justify">
            <li><strong>Years:</strong> Total full years from birth date to current date (using 365.25 days per year for leap years).</li>
            <li><strong>Months:</strong> Total months lived (approximate, using 30.44 days per month).</li>
            <li><strong>Weeks:</strong> Total days ÷ 7.</li>
            <li><strong>Days:</strong> Total number of days between the two dates.</li>
          </ul>
        </div>
      </div>

      <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm text-justify" aria-labelledby="about-age-calc">
        <h2 id="about-age-calc" className="text-xl font-semibold text-gray-900 mb-4">About the Age Calculator</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          This free Age Calculator gives you your exact age in years, months, weeks, and days from your date of birth.
          You can use today&apos;s date automatically or pick any current date to see how old you were (or will be) on
          that day. The result also shows your next birthday and how many days are left until it. No data is stored;
          everything runs in your browser. It is useful for forms, exams, milestones, and general curiosity.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">How to use this tool</h3>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
          <li>Enter your <strong>date of birth</strong> in the first field.</li>
          <li>Leave <strong>Current date</strong> empty to use today, or choose another date to see age on that day.</li>
          <li>Click <strong>Calculate age</strong> to see your age in years, months, weeks, and days plus next birthday.</li>
          <li>Use <strong>Copy result</strong> to paste the summary elsewhere.</li>
        </ol>

        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Why exact age matters</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Many official processes depend on exact age, not just the year. Eligibility for exams, scholarships, retirement,
          and benefits often uses the precise date. Even a few days can change whether you qualify. This calculator gives
          you a clear breakdown in years, months, weeks, and days so you can fill forms and make decisions with correct
          information. Parents and carers also use it to track a child&apos;s age in months and weeks for development
          milestones and health checks.
        </p>

        <h2 id="age-guide" className="text-xl font-semibold text-gray-900 mt-10 mb-4">Age Calculator: Uses and Context (Complete Guide)</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          An age calculator is one of the most commonly used online tools. It answers questions like &quot;How old am I?&quot;
          and &quot;How many days have I lived?&quot; in seconds. But its uses go far beyond curiosity. From government
          forms and job applications to education, healthcare, and personal milestones, knowing your exact age in
          different units is often required. This section explains where and why age calculation matters and how to get
          the most from this tool.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Official and legal use</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          Government forms, visa applications, and legal documents frequently ask for age as of a specific date, or in
          years and months. Some rules use &quot;completed years&quot; or &quot;age on the last birthday&quot;, which is exactly what
          this calculator provides. Pension and retirement eligibility in many countries is based on reaching a certain
          age; even one day can matter. Similarly, driving licences, voting eligibility, and age-restricted services
          depend on precise age. Using an accurate age calculator reduces errors and avoids delays in processing. Always
          confirm with the authority if they need age in a particular format (e.g. years and months only, or as of a
          specific cutoff date).
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Education and competitive exams</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          Many entrance exams and scholarships have strict age limits. Candidates must be within a defined age range as
          on a fixed date (e.g. 1 January or 1 August). A small mistake in calculating age can lead to disqualification
          or missed opportunities. Students and parents use age calculators to verify eligibility before applying. The
          same applies to sports categories, where age groups are defined by year or date of birth. By entering the
          relevant &quot;current date&quot; (e.g. the exam date or cutoff date), you get the exact age as required by the
          institution. Keep a copy of the result or screenshot for your records when submitting applications.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Healthcare and development</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          In medicine and childcare, age is often expressed in months or weeks, especially for young children. Vaccination
          schedules, growth charts, and developmental milestones are usually based on age in months. Parents and doctors
          need to know exactly how many months or weeks old a child is for correct dosing and assessment. This calculator
          gives total months and weeks from birth, which helps when filling health records or discussing progress with
          a paediatrician. For adults, age can influence screening recommendations and treatment options; having an
          accurate age (and next birthday) is useful for planning check-ups and understanding age-based guidelines.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Personal milestones and next birthday</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          People often want to know how many days they have lived or how long until their next birthday. This tool shows
          total days and weeks, and it also calculates the next birthday and the number of days remaining. That is
          helpful for planning celebrations, setting goals (e.g. &quot;by my next birthday I want to…&quot;), or simply
          satisfying curiosity. Anniversaries, work tenure, and relationship milestones are sometimes counted in years
          and months; you can use the optional current date to see your age (or someone else&apos;s) as of a past or
          future date, which is useful for retrospective or forward planning.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">International and cultural differences</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          In some cultures, age is counted differently. For example, &quot;Korean age&quot; adds one or two years depending
          on the system; &quot;East Asian age&quot; may count a newborn as one year old. This calculator uses the common
          Western system: age in completed years, months, weeks, and days from the birth date. If you need to comply
          with a specific cultural or legal definition, you may need to adjust the result accordingly. For most official
          and international forms, the standard &quot;age as of date&quot; in years and months is what is required, and that
          is what this tool provides. When in doubt, check the instructions on the form or with the organisation
          requesting the information.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Accuracy and leap years</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          This age calculator uses the calendar difference between two dates. Years are based on 365.25 days on average
          to account for leap years, so long-term age in years stays accurate. Months and weeks are derived from the
          total days; months are an approximation because calendar months have different lengths. For day-to-day and
          official use, the result is accurate. If you need age for legal or medical purposes, always use your official
          date of birth as recorded on your birth certificate or identity document. The tool is intended for
          convenience and planning; for any legal dispute, the authoritative source is your official records.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Using the optional current date</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          The &quot;Current date (optional)&quot; field is useful when you need age as of a date other than today. For
          example, if a form asks &quot;Age as on 1 April 2024&quot;, enter that date and your date of birth to get the
          correct age. You can also check how old someone was on a past date (e.g. at the time of an event) or how old
          they will be on a future date (e.g. at the start of a course). The next birthday shown will be relative to
          that chosen date. This flexibility makes the tool suitable for both current-age queries and historical or
          future-age scenarios.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Privacy and data</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          All calculations are performed in your browser. Your date of birth and any dates you enter are not sent to any
          server or stored by us. You can use the tool without creating an account or sharing personal data. If you
          copy the result, it stays on your device. For sensitive uses, we still recommend checking the privacy policy
          of the website you are on and avoiding entering information on shared or public computers if you are
          concerned about someone else seeing the result.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Summary</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          The Age Calculator helps you find your exact age in years, months, weeks, and days, with optional next
          birthday information. It is designed for forms, exams, healthcare, milestones, and general use. Enter your
          date of birth, optionally set a current date, and get an accurate result that you can copy. Use it whenever
          you need a quick, reliable answer to &quot;How old am I?&quot; or &quot;How many days have I lived?&quot; without
          manual counting or spreadsheets.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Disclaimer</h3>
        <p className="text-gray-700 leading-relaxed">
          This tool is for general and planning use only. Results are based on the dates you enter and standard
          calendar calculations. For legal, official, or medical purposes, always rely on your official documents
          and follow the instructions of the relevant authority. We are not responsible for any decisions made based
          on this calculator.
        </p>
      </section>
    </ToolSection>
  );
}
