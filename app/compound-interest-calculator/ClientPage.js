"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function CompoundInterestCalculatorPage() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [frequency, setFrequency] = useState("12"); // Monthly
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");

  function calculateCompoundInterest() {
    if (!principal.trim() || !rate.trim() || !time.trim()) {
      setMessage("⚠️ Please enter all required values.");
      return;
    }

    try {
      const p = parseFloat(principal);
      const r = parseFloat(rate) / 100; // Convert percentage to decimal
      const t = parseFloat(time);
      const n = parseFloat(frequency);

      if (isNaN(p) || isNaN(r) || isNaN(t) || isNaN(n)) {
        setMessage("❌ Please enter valid numbers.");
        return;
      }

      // Compound Interest Formula: A = P(1 + r/n)^(nt)
      const amount = p * Math.pow(1 + r/n, n*t);
      const interest = amount - p;

      const resultText = `# Compound Interest Calculation
# Generated on: ${new Date().toISOString()}

# Input Values
# Principal Amount: $${p.toFixed(2)}
# Annual Interest Rate: ${rate}%
# Time Period: ${t} years
# Compounding Frequency: ${n} times per year

# Calculation Results
# Final Amount: $${amount.toFixed(2)}
# Interest Earned: $${interest.toFixed(2)}
# Total Growth: ${((amount/p - 1) * 100).toFixed(2)}%

# Year-by-Year Breakdown
${Array.from({length: Math.min(t, 10)}, (_, i) => {
  const year = i + 1;
  const yearAmount = p * Math.pow(1 + r/n, n*year);
  const yearInterest = yearAmount - p;
  return `# Year ${year}: $${yearAmount.toFixed(2)} (Interest: $${yearInterest.toFixed(2)})`;
}).join('\n')}

# Financial Insights
# - Your money will grow by $${interest.toFixed(2)} over ${t} years
# - Effective annual rate: ${((Math.pow(1 + r/n, n) - 1) * 100).toFixed(2)}%
# - Monthly contribution needed for $${(amount/12).toFixed(2)}: $${(amount/(12*t)).toFixed(2)}`;

      setResult(resultText);
      setMessage("✅ Compound interest calculation completed successfully!");
    } catch (error) {
      setMessage("❌ Error calculating compound interest.");
    }
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
    setMessage("📋 Calculation result copied to clipboard!");
  }

  function reset() {
    setPrincipal("");
    setRate("");
    setTime("");
    setFrequency("12");
    setResult("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Compound Interest Calculator"
      subtitle="Calculate compound interest and investment growth online. Free compound interest calculator with detailed analysis and projections support."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Compound Interest Calculator",
          description: "Calculate compound interest and investment growth online.",
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

      <div className="space-y-4">
        {/* Status Messages */}
        {message && (
          <div className="px-3 py-2 bg-blue-100 border rounded text-blue-800 text-sm">
            {message}
          </div>
        )}

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Principal Amount ($)
            </label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="Enter principal amount..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              step="0.01"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="Enter interest rate..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Period (Years)
            </label>
            <input
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Enter time period..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compounding Frequency
            </label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="1">Annually</option>
              <option value="2">Semi-annually</option>
              <option value="4">Quarterly</option>
              <option value="12">Monthly</option>
              <option value="365">Daily</option>
            </select>
          </div>
        </div>

        {/* Result Output */}
        {result && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Calculation Result
            </label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm whitespace-pre-wrap min-h-32">
              {result || "Calculation result will appear here..."}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={calculateCompoundInterest}
            disabled={!principal.trim() || !rate.trim() || !time.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🧮 Calculate Interest
          </button>

          {result && (
            <button
              onClick={copyResult}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                         bg-blue-600 text-white shadow 
                         hover:bg-blue-700"
            >
              📋 Copy Result
            </button>
          )}

          <button
            onClick={reset}
            disabled={!principal.trim() && !rate.trim() && !time.trim() && !result.trim()}
            className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* Calculator Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">About Compound Interest</h4>
          <div className="text-sm space-y-1">
            <div>• Compound interest grows your money exponentially</div>
            <div>• Interest is calculated on both principal and accumulated interest</div>
            <div>• Higher frequency compounding increases returns</div>
            <div>• Time is the most important factor in compound growth</div>
          </div>
        </div>
      </div>

            {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About Compound Interest Calculator</h3>
        <p className="text-gray-700 mb-4">
          Compound interest is one of the most powerful financial concepts that
          shows how money can grow over time. Unlike simple interest, which is
          calculated only on the principal amount, compound interest works by
          applying interest not just on the original principal but also on the
          accumulated interest from previous periods. This means your money can
          grow at an accelerating pace. Our Compound Interest Calculator makes
          it simple to estimate future investment value, track financial growth,
          and plan long-term financial goals effectively.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Accurate calculations:</strong> Uses the standard formula
            A = P(1 + r/n)<sup>nt</sup> to ensure precise results.
          </li>
          <li>
            <strong>Multiple frequencies:</strong> Choose from annual,
            semi-annual, quarterly, monthly, or daily compounding to reflect
            real-world financial products.
          </li>
          <li>
            <strong>Year-by-year breakdown:</strong> See how your investment
            grows each year and how much interest is earned cumulatively.
          </li>
          <li>
            <strong>Financial insights:</strong> Provides effective annual rate
            (EAR), growth percentage, and contribution insights.
          </li>
          <li>
            <strong>Easy export:</strong> One-click copy of the full results for
            your reports, study, or planning documents.
          </li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          <li>Enter your starting principal amount (the money you invest).</li>
          <li>Provide the annual interest rate as a percentage.</li>
          <li>Specify the total time period (in years) for the investment.</li>
          <li>
            Select how often interest should be compounded (annually, quarterly,
            monthly, etc.).
          </li>
          <li>
            Click the <strong>Calculate Interest</strong> button to see your
            results.
          </li>
          <li>
            Review the breakdown and copy results for your personal use or
            financial planning.
          </li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Retirement planning:</strong> Estimate how your savings
            might grow over decades and understand the power of starting early.
          </li>
          <li>
            <strong>Investment analysis:</strong> Compare how different
            compounding frequencies affect growth in stocks, bonds, or deposits.
          </li>
          <li>
            <strong>Loan insights:</strong> Understand how compound interest
            affects long-term loans and mortgages.
          </li>
          <li>
            <strong>Educational tool:</strong> Great for teaching students the
            difference between simple and compound interest.
          </li>
          <li>
            <strong>Goal tracking:</strong> Calculate how much you need to
            invest today to reach a specific financial milestone.
          </li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">📖 Why Compound Interest Matters</h4>
        <p className="text-gray-700 mb-4">
          Compound interest is often called the &quot;eighth wonder of the world&quot;
          because of how dramatically it can grow wealth over time. The longer
          you let your money compound, the larger the effect becomes. For
          example, an investment of $10,000 at 7% annual interest compounded
          monthly will nearly double in just 10 years, while the same investment
          at simple interest would grow much more slowly. This demonstrates why
          time and frequency are the two most important factors in financial
          growth.
        </p>

        <h4 className="font-semibold mt-4 mb-1">🌍 Everyday Benefits</h4>
        <p className="text-gray-700 mb-4">
          Anyone can benefit from understanding compound interest. Students
          saving for college, employees contributing to retirement accounts, or
          families building an emergency fund all rely on compounding. It
          encourages disciplined saving habits and highlights the importance of
          starting early. Even small amounts, when compounded over time, can
          grow into significant sums. For instance, saving just $100 per month
          in an account with compound interest can lead to impressive results
          after 20–30 years.
        </p>

        <h4 className="font-semibold mt-4 mb-1">⚠️ Limitations to Consider</h4>
        <p className="text-gray-700 mb-4">
          While compound interest calculators provide valuable projections, they
          are based on fixed assumptions. Real-life investments may vary due to
          inflation, market fluctuations, taxes, and fees. Additionally, the
          calculator does not account for irregular contributions or withdrawals
          unless customized. Therefore, results should be viewed as guidance,
          not guarantees. Consulting with a financial advisor is recommended for
          making major financial decisions.
        </p>

        <h4 className="font-semibold mt-4 mb-1">💡 Final Thoughts</h4>
        <p className="text-gray-700">
          The Compound Interest Calculator is more than just a math tool—it is a
          financial planning companion. It helps visualize how money grows and
          empowers users to make informed investment choices. Whether you are a
          student learning finance basics, a young professional starting to
          invest, or a retiree evaluating savings, this tool offers clarity and
          confidence. By understanding how interest compounds, you unlock the
          secret to building wealth over time and create a stronger foundation
          for your financial future.
        </p>
      </section>
    </ToolSection>
  );
}