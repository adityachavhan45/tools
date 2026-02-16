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

  const sidebar = (
    <div className="space-y-4 text-sm text-gray-700 text-justify">
      <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
        <p className="font-semibold text-blue-900 mb-2">Formula</p>
        <p className="text-blue-800 text-justify">
          A = P(1 + r/n)<sup>nt</sup>. P = principal, r = annual rate (decimal), n = compounding frequency per year, t = time in years.
        </p>
      </div>
      <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
        <p className="font-semibold text-amber-900 mb-2">Tip</p>
        <p className="text-amber-800 text-justify">
          Results are estimates only. Real returns depend on taxes, fees, and inflation. For financial decisions, consult a qualified advisor.
        </p>
      </div>
    </div>
  );

  return (
    <ToolSection
      title="Compound Interest Calculator"
      subtitle="Estimate how your investment grows with compound interest. Enter principal, rate, time, and compounding frequency get final amount and interest earned. For planning only; not financial advice."
      plain
      plainSidebar
      whiteBackground
      sidebar={sidebar}
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

      <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm text-justify" aria-labelledby="about-compound-heading">
        <h2 id="about-compound-heading" className="text-xl font-semibold text-gray-900 mb-4">About the Compound Interest Calculator</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          This free Compound Interest Calculator estimates how a lump sum grows when interest is compounded at a fixed rate over time. You enter the principal (starting amount), annual interest rate, number of years, and how often interest is compounded (annually, monthly, daily, etc.). The tool uses the standard formula to compute the final amount and total interest earned. It is for education and planning only; real investments are affected by taxes, fees, inflation, and market risk. Always seek professional advice for important financial decisions.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">How to use</h3>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
          <li>Enter the <strong>principal</strong> (amount you invest or deposit) in dollars.</li>
          <li>Enter the <strong>annual interest rate</strong> as a percentage (e.g. 7 for 7%).</li>
          <li>Enter the <strong>time</strong> in years.</li>
          <li>Select <strong>compounding frequency</strong> (e.g. monthly for savings accounts).</li>
          <li>Click <strong>Calculate</strong> to see the final amount, interest earned, and growth percentage. Use <strong>Copy result</strong> to save the summary.</li>
        </ol>

        <h2 id="compound-guide" className="text-xl font-semibold text-gray-900 mt-10 mb-4">Compound Interest and Savings: A Complete Guide</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Compound interest is interest calculated on both the initial principal and the interest that has already been added in earlier periods. Over time, this leads to exponential growth: your balance grows faster as the base gets larger. Understanding compound interest helps you compare savings accounts, plan for retirement, and see why starting early and staying invested matters. This section explains the idea, the formula, and how to use the calculator sensibly.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Simple vs compound interest</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          With simple interest, you earn the same amount each period based only on the original principal. For example, $1,000 at 10% simple interest for 3 years gives $100 per year, so $1,300 total. With compound interest, the first year you earn 10% on $1,000 ($100); the second year you earn 10% on $1,100 ($110); the third year 10% on $1,210 ($121). So you end with $1,331 instead of $1,300. The difference grows as time and rate increase. Most savings accounts, fixed deposits, and many investments use compound interest, which is why the calculator is built around it.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">The compound interest formula</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          The standard formula is A = P(1 + r/n)^(nt). Here, A is the final amount, P is the principal, r is the annual interest rate as a decimal (e.g. 0.07 for 7%), n is the number of compounding periods per year (e.g. 12 for monthly), and t is the time in years. The term (1 + r/n) is the factor by which your balance grows in one compounding period; raising it to the power nt gives the total growth over all periods. This calculator uses that formula exactly, so the numbers are mathematically correct for the inputs you provide. In practice, banks and products may use slightly different conventions (e.g. day-count methods), but for planning and comparison the standard formula is widely used.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Compounding frequency</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          Interest can compound annually (once a year), semi-annually (twice), quarterly (four times), monthly (12 times), or daily (365 times). For the same nominal annual rate, more frequent compounding gives a slightly higher effective return. For example, 6% per year compounded annually gives exactly 6% growth in a year; 6% compounded monthly gives about 6.17% effective annual rate. The calculator shows the effective annual rate so you can compare products that quote different compounding frequencies. In many countries, savings accounts compound monthly or daily; fixed deposits may compound quarterly or at maturity. Choose the frequency that matches the product you have in mind.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Why time matters most</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          The power of compound interest shows up over long periods. A small difference in time can mean a large difference in the final amount. For instance, $10,000 at 7% compounded monthly grows to about $20,096 in 10 years, $40,317 in 20 years, and $81,136 in 30 years. Doubling the time more than doubles the result because growth is exponential. That is why financial advisers stress starting early: even with a modest rate, decades of compounding can build significant wealth. Conversely, if you are estimating loan costs, compound interest can make long-term debt expensive, so the same formula helps you understand both saving and borrowing.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Savings and deposits</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          Fixed deposits and many savings accounts pay compound interest. You can use this calculator to see how a one-time deposit might grow if you leave it and the rate stays constant. In reality, rates change, and you might add or withdraw money. The tool assumes no further deposits or withdrawals and a fixed rate; it is a simplified projection. For regular contributions (e.g. monthly savings), you would need a future value of annuity formula, which is different. This calculator is best for lump-sum scenarios: an inheritance, a bonus, or a single investment you want to project.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Investments and returns</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          People sometimes use a compound interest calculator to approximate investment growth. For example, if you assume a 7% average annual return, you can project how a lump sum might grow over 10 or 20 years. Keep in mind that investment returns are not guaranteed; they fluctuate from year to year. The calculator assumes a constant rate, which is not realistic for stocks or equity funds. It is better used for fixed-income products (bonds, deposits) or as a rough &quot;what if&quot; for long-term averages. Never treat the result as a promise of future performance.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Inflation and real returns</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          The calculator shows nominal growth: it does not subtract inflation. If your money grows at 6% per year but inflation is 4%, your real (inflation-adjusted) return is roughly 2%. Over long periods, inflation can significantly reduce purchasing power. When planning for goals like retirement, consider real returns or use inflation-adjusted projections elsewhere. This tool is still useful to see how nominal amounts grow; you can then adjust for inflation in your own planning or with an adviser.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Taxes and fees</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          Interest and investment gains are often taxable. The calculator does not deduct tax, so the result is before-tax growth. In some countries, certain accounts (e.g. retirement or tax-free savings) offer tax advantages that improve effective returns. Fees (management fees, account charges) also reduce what you actually keep. For a true picture, take the calculator&apos;s result and consider taxes and costs separately, or use a tool that allows after-tax projections. For quick comparisons between different rates or terms, the raw numbers are still helpful.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Limitations of the calculator</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          This calculator assumes a single principal, a constant annual rate, and no deposits or withdrawals. It does not model variable rates, regular contributions, or one-off withdrawals. Real-life products may have minimum balances, tiered rates, or promotional rates that change. Use it for understanding compound growth and for rough comparisons, not as the only basis for financial decisions. For retirement, education, or major investments, combine it with professional advice and tools that handle contributions and taxes.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Summary</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          The Compound Interest Calculator estimates the future value of a lump sum using the formula A = P(1 + r/n)^(nt). You input principal, annual rate, time in years, and compounding frequency, and get the final amount, interest earned, growth percentage, and effective annual rate. Use it for education and planning. Results are estimates only; they do not account for inflation, taxes, or fees. For important financial decisions, consult a qualified adviser.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Disclaimer</h3>
        <p className="text-gray-700 leading-relaxed">
          This tool is for informational and educational purposes only. It does not constitute financial, investment, or tax advice. Results are based on the inputs you provide and assume a fixed rate and no further deposits or withdrawals. Actual returns depend on real-world factors including inflation, taxes, fees, and market conditions. Always consult a qualified financial or tax professional before making significant financial decisions.
        </p>
      </section>
    </ToolSection>
  );
}
