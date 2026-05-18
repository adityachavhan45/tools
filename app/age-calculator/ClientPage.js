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

  return (
    <ToolSection
      title="Age Calculator"
      subtitle="Calculate your exact age in years, months, weeks, and days from your date of birth. Free, fast, and accurate with optional next birthday info."
      plain
      whiteBackground
      hideSidebar
      centerHeader
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

        <div className="grid gap-4 md:grid-cols-5">
          <div className="md:col-span-3 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-5">
            <p className="font-semibold text-blue-900 mb-2">How it works</p>
            <p className="text-blue-800 text-sm text-justify">
              Enter your date of birth; the tool uses the current date (or your chosen date) to compute exact age in years, months, weeks, and days. Leave &quot;Current date&quot; empty to use today.
            </p>
          </div>
          <div className="md:col-span-2 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5">
            <p className="font-semibold text-amber-900 mb-2">Tip</p>
            <p className="text-amber-800 text-sm text-justify">
              Use this for forms, exams, or milestone tracking. Results can be copied for documents or records.
            </p>
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

      <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm text-justify">

  <h2 id="about-age-calc" className="text-2xl font-bold text-gray-900 mb-4">
    About the Age Calculator
  </h2>

  <p className="text-gray-700 leading-relaxed mb-4">
    The Age Calculator helps users calculate exact age using date of birth and a selected current date. Instead of
    manually counting years, months, weeks, or days, this tool instantly provides accurate results within seconds.
    Many people only think about age in years, but several real-life situations require precise age calculation in
    months, weeks, or even total days lived.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    This tool is useful for students, parents, professionals, healthcare workers, job applicants, and anyone who
    needs accurate age information for official or personal use. Whether someone wants to check eligibility for an
    exam, calculate retirement age, verify a child’s developmental stage, or simply know how many days they have
    lived, the calculator provides a quick and reliable solution.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Unlike manual age calculation, this tool reduces mistakes caused by leap years, month differences, and incorrect
    counting. Users can enter their birth date and optionally choose another date to calculate age for a past or
    future moment.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Why Exact Age Matters
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    In many situations, exact age matters more than approximate age. Government forms, entrance exams, passport
    applications, scholarships, retirement systems, and legal processes often require age on a specific date. Even a
    small difference of a few days can sometimes affect eligibility.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Students preparing for competitive exams frequently calculate age before submitting applications because many
    institutions define strict eligibility limits. Percentage requirements also matter during admission processes, and
    students often calculate academic scores using the{" "}
    <a
      href="/percentage-calculator"
      className="text-blue-600 underline font-medium"
    >
      Percentage Calculator
    </a>{" "}
    before applying for colleges or scholarships.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Parents also use age calculation tools regularly for tracking a child’s growth and development. Medical
    professionals sometimes evaluate growth milestones based on months instead of years, especially for infants and
    younger children.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Understanding Age in Different Units
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Most people think about age only in years, but age can also be measured in months, weeks, days, and even hours.
    This tool provides multiple formats because different situations require different types of calculations.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    For example, hospitals and healthcare centers often use age in months while tracking child development. Schools
    and examination systems generally use completed years. Some legal and retirement systems calculate age based on
    exact dates rather than approximate years.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Users who want to track health progress or maintain wellness goals also combine age information with body
    measurements while improving personal fitness awareness and long-term health tracking.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Why Date Accuracy Is Important
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Incorrect date calculation can create problems during official verification processes. A wrong birth date or
    incorrect age entry may lead to application rejection, eligibility issues, or processing delays.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    This becomes especially important during government recruitment, competitive examinations, visa applications,
    pension claims, and sports registrations where exact cutoff dates are used. Even a one-day error can sometimes
    change eligibility status.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Many candidates preparing documents for online applications also use tools like the{" "}
    <a
      href="/pdf-merge"
      className="text-blue-600 underline font-medium"
    >
      PDF Merge Tool
    </a>{" "}
    while organizing certificates, forms, and identity documents before submission.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    How Leap Years Affect Age Calculation
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Leap years make manual age calculation more difficult because not every year contains the same number of days.
    February sometimes has 29 days instead of 28, which changes long-term calculations slightly.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Many people make mistakes when manually counting total days or calculating future birthdays because they forget
    about leap year adjustments. This tool automatically handles leap years and calendar differences to provide more
    accurate results.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Users who frequently work with date formats and time calculations may also use the{" "}
    <a
      href="/unix-time"
      className="text-blue-600 underline font-medium"
    >
      Unix Time Converter
    </a>{" "}
    while working with timestamps and technical date systems.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Age Calculation in Education and Career
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Educational institutions and employers often use age-based rules for admissions, scholarships, placements, and job
    applications. Candidates preparing for entrance exams or recruitment drives regularly verify age eligibility before
    filling application forms.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Students and job seekers also prepare documents in different formats while applying online. Many users optimize
    and organize digital documents before submitting official applications and identity records.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Career planning also depends on age in many industries. Some recruitment programs, internships, and government
    opportunities have upper age limits, making accurate calculation extremely important.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Why People Use Age Calculators for Personal Reasons
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Many users simply enjoy checking personal milestones such as total days lived, total weeks completed, or days
    remaining until the next birthday. People often use this information for celebrations, goal tracking, social media
    posts, or personal curiosity.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Some users also compare life milestones, calculate relationship durations, or measure work experience duration
    using date calculations. Even though these calculations may appear simple, manually counting months and days often
    creates confusion.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Users sharing calculated results online sometimes generate quick sharing links or downloadable QR codes using the{" "}
    <a
      href="/qr-code"
      className="text-blue-600 underline font-medium"
    >
      QR Code Generator
    </a>{" "}
    for easier access across devices.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Why Online Calculators Save Time
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Manual calculations become difficult when users need precise answers quickly. Online calculators simplify complex
    date calculations instantly without requiring spreadsheets or manual formulas.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Many users rely on online tools daily because they reduce human error and improve convenience. Financial,
    educational, technical, and productivity tools continue to grow because users prefer quick solutions instead of
    lengthy manual processes.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    For example, users calculating financial planning based on age may also use the{" "}
    <a
      href="/compound-interest-calculator"
      className="text-blue-600 underline font-medium"
    >
      Compound Interest Calculator
    </a>{" "}
    while planning long-term savings and future financial goals.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Privacy and User Safety
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Privacy is important while using online tools. This calculator performs calculations directly in the browser
    without requiring account creation or unnecessary personal information. Users can quickly calculate age without
    uploading documents or sharing sensitive identity details.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Users concerned about online security often create stronger passwords and safer login credentials using the{" "}
    <a
      href="/password-generator"
      className="text-blue-600 underline font-medium"
    >
      Password Generator
    </a>{" "}
    and verify credential quality using the{" "}
    <a
      href="/password-strength-checker"
      className="text-blue-600 underline font-medium"
    >
      Password Strength Checker
    </a>{" "}
    before storing personal data online.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Final Thoughts
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    The Age Calculator provides a quick and accurate way to calculate age in years, months, weeks, and days using any
    selected date. It is useful for official forms, educational eligibility, healthcare tracking, retirement planning,
    milestones, and everyday curiosity.
  </p>

  <p className="text-gray-700 leading-relaxed">
    Instead of manually counting years and dates, users can instantly generate accurate results while avoiding common
    calculation mistakes caused by leap years, incorrect counting, or calendar confusion. Accurate age calculation
    saves time, improves reliability, and helps users make better decisions across many real-life situations.
  </p>

</section>
    </ToolSection>
  );
}
