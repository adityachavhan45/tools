"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function CompoundInterestCalculatorPage() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [frequency, setFrequency] = useState("12");
  const [message, setMessage] = useState("");
  const [resultText, setResultText] = useState("");
  const [amount, setAmount] = useState(0);
  const [interest, setInterest] = useState(0);
  const [growthPercent, setGrowthPercent] = useState(0);
  const [effectiveRate, setEffectiveRate] = useState(0);
  const [yearBreakdown, setYearBreakdown] = useState([]);
  const [hasResult, setHasResult] = useState(false);

  function calculateCompoundInterest() {
    if (!principal.trim() || !rate.trim() || !time.trim()) {
      setMessage("Please enter principal, rate, and time.");
      return;
    }
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(frequency);
    if (isNaN(p) || isNaN(r) || isNaN(t) || isNaN(n) || p <= 0 || t <= 0 || n <= 0) {
      setMessage("Please enter valid positive numbers.");
      return;
    }
    if (r < 0 || r > 1) {
      setMessage("Enter a reasonable annual rate (e.g. 1–20%).");
      return;
    }
    try {
      const A = p * Math.pow(1 + r / n, n * t);
      const interestEarned = A - p;
      const growth = ((A / p - 1) * 100);
      const ear = (Math.pow(1 + r / n, n) - 1) * 100;
      setAmount(A);
      setInterest(interestEarned);
      setGrowthPercent(growth);
      setEffectiveRate(ear);
      const breakdown = [];
      const maxYears = Math.min(Math.ceil(t), 15);
      for (let y = 1; y <= maxYears; y++) {
        const yearAmount = p * Math.pow(1 + r / n, n * y);
        breakdown.push({ year: y, value: yearAmount, interest: yearAmount - p });
      }
      setYearBreakdown(breakdown);
      setHasResult(true);
      setMessage("");
      setResultText(`Compound Interest Result\nPrincipal: $${p.toFixed(2)}\nRate: ${rate}% p.a.\nTime: ${t} years\nCompounding: ${n}x per year\n\nFinal amount: $${A.toFixed(2)}\nInterest earned: $${interestEarned.toFixed(2)}\nGrowth: ${growth.toFixed(2)}%\nEffective annual rate: ${ear.toFixed(2)}%`);
    } catch {
      setMessage("Something went wrong. Please check your inputs and try again.");
    }
  }

  function copyResult() {
    if (!resultText) return;
    navigator.clipboard.writeText(resultText);
    setMessage("Result copied to clipboard.");
  }

  function reset() {
    setPrincipal("");
    setRate("");
    setTime("");
    setFrequency("12");
    setResultText("");
    setMessage("");
    setAmount(0);
    setInterest(0);
    setGrowthPercent(0);
    setEffectiveRate(0);
    setYearBreakdown([]);
    setHasResult(false);
  }

  return (
    <ToolSection
      title="Compound Interest Calculator"
      subtitle="Estimate how your investment grows with compound interest. Enter principal, rate, time, and compounding frequency get final amount and interest earned. For planning only; not financial advice."
      plain
      whiteBackground
      hideSidebar
      centerHeader
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Compound Interest Calculator",
          description: "Calculate compound interest and future value from principal, rate, time, and compounding frequency.",
          slug: "/compound-interest-calculator",
          category: "Utilities/Finance",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Compound Interest Calculator", slug: "/compound-interest-calculator" },
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

        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 sm:p-6 space-y-5">
          <h2 className="text-lg font-semibold text-gray-900">Enter your values</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="principal" className="block text-sm font-medium text-gray-700 mb-1.5">Principal amount ($)</label>
              <input
                id="principal"
                type="number"
                step="0.01"
                min="0"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                placeholder="e.g. 10000"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              />
            </div>
            <div>
              <label htmlFor="rate" className="block text-sm font-medium text-gray-700 mb-1.5">Annual interest rate (%)</label>
              <input
                id="rate"
                type="number"
                step="0.01"
                min="0"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="e.g. 7"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1.5">Time (years)</label>
              <input
                id="time"
                type="number"
                step="0.5"
                min="0.1"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g. 10"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              />
            </div>
            <div>
              <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1.5">Compounding frequency</label>
              <select
                id="frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              >
                <option value="1">Annually</option>
                <option value="2">Semi-annually</option>
                <option value="4">Quarterly</option>
                <option value="12">Monthly</option>
                <option value="365">Daily</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={calculateCompoundInterest}
              disabled={!principal.trim() || !rate.trim() || !time.trim()}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-medium shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none transition-colors"
            >
              Calculate
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
            <p className="font-semibold text-blue-900 mb-2">Formula</p>
            <p className="text-blue-800 text-sm text-justify">
              A = P(1 + r/n)<sup>nt</sup>. P = principal, r = annual rate (decimal), n = compounding frequency per year, t = time in years.
            </p>
          </div>
          <div className="md:col-span-2 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5">
            <p className="font-semibold text-amber-900 mb-2">Tip</p>
            <p className="text-amber-800 text-sm text-justify">
              Results are estimates only. Real returns depend on taxes, fees, and inflation. For financial decisions, consult a qualified advisor.
            </p>
          </div>
        </div>

        {hasResult && (
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="px-5 py-4 bg-indigo-600 text-white">
              <h3 className="text-lg font-semibold">Your result</h3>
              <p className="text-indigo-100 text-sm mt-0.5">Compound interest projection</p>
            </div>
            <div className="p-5 grid gap-4 sm:grid-cols-2">
              <div className="text-center p-4 rounded-xl bg-green-50 border border-green-100">
                <p className="text-2xl font-bold text-green-700">${amount.toFixed(2)}</p>
                <p className="text-sm text-gray-600 mt-1">Final amount</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-blue-50 border border-blue-100">
                <p className="text-2xl font-bold text-blue-700">${interest.toFixed(2)}</p>
                <p className="text-sm text-gray-600 mt-1">Interest earned</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-amber-50 border border-amber-100">
                <p className="text-2xl font-bold text-amber-700">{growthPercent.toFixed(1)}%</p>
                <p className="text-sm text-gray-600 mt-1">Total growth</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-gray-50 border border-gray-200">
                <p className="text-xl font-bold text-gray-800">{effectiveRate.toFixed(2)}%</p>
                <p className="text-sm text-gray-600 mt-1">Effective annual rate</p>
              </div>
            </div>
            {yearBreakdown.length > 0 && (
              <div className="px-5 pb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Year-by-year (first {yearBreakdown.length} years)</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 border-b">Year</th>
                        <th className="px-3 py-2 border-b">Amount</th>
                        <th className="px-3 py-2 border-b">Interest</th>
                      </tr>
                    </thead>
                    <tbody>
                      {yearBreakdown.map(({ year, value, interest: yrInt }) => (
                        <tr key={year} className="border-b border-gray-100">
                          <td className="px-3 py-2">{year}</td>
                          <td className="px-3 py-2">${value.toFixed(2)}</td>
                          <td className="px-3 py-2">${yrInt.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            <div className="px-5 pb-5">
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
          <h4 className="text-sm font-semibold text-gray-800 mb-2">How it works</h4>
          <p className="text-sm text-gray-700 text-justify mb-2">
            Final amount A = P(1 + r/n)<sup>nt</sup>. Interest is added at each compounding period, so you earn interest on previous interest. More frequent compounding (e.g. monthly vs yearly) gives a slightly higher result for the same rate.
          </p>
          <ul className="text-sm text-gray-700 space-y-1 text-justify">
            <li><strong>Principal (P):</strong> Initial amount invested or deposited.</li>
            <li><strong>Rate (r):</strong> Annual interest rate as a percentage (e.g. 7 for 7%).</li>
            <li><strong>Frequency (n):</strong> How many times per year interest is compounded.</li>
          </ul>
        </div>
      </div>

     <section
  className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm text-justify"
  aria-labelledby="about-compound-heading"
>

  <h2
    id="about-compound-heading"
    className="text-2xl font-bold text-gray-900 mb-4"
  >
    About the Compound Interest Calculator
  </h2>

  <p className="text-gray-700 leading-relaxed mb-4">
    The Compound Interest Calculator helps users estimate how money grows over time when
    interest is added repeatedly to the original investment. Instead of earning interest
    only on the starting amount, compound interest allows users to earn additional returns
    on previously accumulated interest, creating long-term growth.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    This calculator is useful for students, investors, professionals, business owners, and
    anyone planning savings or future financial goals. Whether someone wants to estimate
    investment growth, retirement savings, fixed deposit returns, or long-term wealth
    accumulation, compound interest calculations provide a clearer understanding of how
    money may grow over time.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Many people underestimate the power of compounding because the growth appears slow
    during the early years. However, over longer periods, compound growth accelerates
    significantly because interest continues building on top of earlier gains.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Users planning long-term investment goals often compare savings growth alongside the{" "}
    <a
      href="/sip-calculator"
      className="text-blue-600 underline font-medium"
    >
      SIP Calculator
    </a>{" "}
    to estimate systematic investment returns and recurring monthly contributions.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    What Compound Interest Actually Means
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Compound interest means earning interest not only on the original principal amount but
    also on the interest accumulated during previous periods. This creates exponential
    growth instead of linear growth.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    For example, if an investment earns yearly returns, the second year’s interest applies
    to both the original investment and the interest earned during the first year. Over
    long periods, this repeated growth can create a substantial difference compared to
    simple interest calculations.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Investors comparing percentage-based growth often use the{" "}
    <a
      href="/percentage-calculator"
      className="text-blue-600 underline font-medium"
    >
      Percentage Calculator
    </a>{" "}
    to better understand profit growth, return rates, and financial changes across
    different investments.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Why Time Is the Most Important Factor
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    One of the biggest strengths of compound interest is time. Even moderate interest rates
    can create large growth when investments remain untouched for many years.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Many financial experts encourage early investing because starting sooner allows money
    to compound for longer durations. Small investments started early often outperform
    larger investments started much later.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Compound growth becomes especially powerful in retirement planning, education savings,
    emergency funds, and long-term wealth building strategies.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Users calculating age-related financial goals and retirement planning often combine
    investment projections with the{" "}
    <a
      href="/age-calculator"
      className="text-blue-600 underline font-medium"
    >
      Age Calculator
    </a>{" "}
    to estimate future timelines more accurately.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Compounding Frequency Explained
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Interest may compound annually, semi-annually, quarterly, monthly, or daily depending
    on the financial product. More frequent compounding generally produces slightly higher
    returns because interest gets added more often.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Savings accounts and fixed deposits commonly use monthly or quarterly compounding,
    while some investment products calculate returns differently depending on market
    performance and account structure.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Understanding compounding frequency helps users compare different financial products
    more realistically instead of focusing only on advertised interest rates.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Compound Interest in Real Life
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Compound interest affects many real-world financial products including savings
    accounts, fixed deposits, retirement funds, mutual funds, bonds, recurring deposits,
    and long-term investment portfolios.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Banks and financial institutions rely heavily on compounding systems while calculating
    investment returns and loan interest. Understanding these calculations helps users make
    smarter financial decisions and avoid unrealistic expectations.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Business owners preparing investment reports or downloadable financial summaries often
    organize documents using the{" "}
    <a
      href="/pdf-merge"
      className="text-blue-600 underline font-medium"
    >
      PDF Merge Tool
    </a>{" "}
    before sharing them with clients or teams.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Inflation and Real Purchasing Power
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Compound growth alone does not guarantee higher purchasing power because inflation also
    affects long-term financial value. If inflation rises faster than investment growth,
    the actual value of money may increase more slowly than expected.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    This is why many investors look for returns that exceed inflation over long periods.
    Understanding inflation-adjusted growth helps users create more realistic financial
    plans instead of focusing only on nominal returns.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Financial planners often estimate budgeting and savings goals using tools like the{" "}
   
      EMI Calculator
    {" "}
    while comparing investment returns against debt obligations and monthly expenses.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Difference Between Saving and Investing
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Saving generally focuses on protecting money with lower risk, while investing aims to
    grow money through higher long-term returns. Savings accounts usually provide stable
    but lower interest rates, whereas investments may generate larger returns with higher
    market risk.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Compound interest calculators help users compare possible long-term growth scenarios
    before making financial decisions. However, actual investment performance may vary
    depending on market conditions, taxes, fees, and economic factors.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Investors tracking yearly return differences and portfolio performance sometimes use
    the{" "}
    
      Profit and Loss Calculator
   {" "}
    to estimate gains and percentage changes more clearly.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Why Online Financial Calculators Save Time
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Manual compound interest calculations become difficult when users compare multiple
    rates, durations, and compounding frequencies. Online calculators simplify this
    process by instantly generating estimates without requiring spreadsheets or complex
    formulas.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Browser-based tools improve accessibility because users can quickly calculate financial
    estimates from mobile devices, desktops, or tablets without installing software.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Users organizing investment notes, retirement plans, or downloadable financial
    resources sometimes generate accessible links through the{" "}
    <a
      href="/qr-code"
      className="text-blue-600 underline font-medium"
    >
      QR Code Generator
    </a>{" "}
    for easier sharing across devices and presentations.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Limitations of Compound Interest Calculators
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Compound interest calculators provide estimates based on constant rates and fixed
    assumptions. Real-world investment performance rarely remains perfectly stable over
    long periods.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Market fluctuations, taxes, management fees, withdrawals, inflation, and economic
    changes all influence actual returns. Users should treat calculator results as
    educational estimates instead of guaranteed outcomes.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Important financial decisions should always involve proper research and, when
    necessary, professional financial guidance.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Privacy and Browser-Based Processing
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Privacy matters while working with financial planning tools. This Compound Interest
    Calculator performs calculations directly inside the browser without requiring account
    registration or unnecessary uploads.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Users managing investment platforms and online financial accounts also improve account
    security using the{" "}
    <a
      href="/password-generator"
      className="text-blue-600 underline font-medium"
    >
      Password Generator
    </a>{" "}
    and verify stronger credentials using the{" "}
    <a
      href="/password-strength-checker"
      className="text-blue-600 underline font-medium"
    >
      Password Strength Checker
    </a>{" "}
    before storing sensitive financial information online.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Final Thoughts
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    The Compound Interest Calculator provides a simple way to estimate long-term investment
    growth using principal amount, interest rate, time duration, and compounding
    frequency. It helps users better understand how compound growth works across savings,
    investments, and financial planning scenarios.
  </p>

  <p className="text-gray-700 leading-relaxed">
    Understanding compound interest encourages smarter financial habits, long-term
    thinking, and more realistic planning. Even small investments can grow significantly
    over time when consistency, patience, and compounding work together.
  </p>

</section>
    </ToolSection>
  );
}
