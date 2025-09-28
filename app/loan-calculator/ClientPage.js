"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function LoanCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");

  function calculateLoan() {
    if (!loanAmount.trim() || !interestRate.trim() || !loanTerm.trim()) {
      setMessage("⚠️ Please enter all required values.");
      return;
    }

    try {
      const principal = parseFloat(loanAmount);
      const rate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
      const months = parseFloat(loanTerm) * 12; // Convert years to months

      if (isNaN(principal) || isNaN(rate) || isNaN(months)) {
        setMessage("❌ Please enter valid numbers.");
        return;
      }

      // Monthly payment calculation using PMT formula
      const monthlyPayment = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
      const totalPayment = monthlyPayment * months;
      const totalInterest = totalPayment - principal;

      const resultText = `# Loan Calculation
# Generated on: ${new Date().toISOString()}

# Input Values
# Loan Amount: $${principal.toFixed(2)}
# Annual Interest Rate: ${interestRate}%
# Loan Term: ${loanTerm} years

# Calculation Results
# Monthly Payment: $${monthlyPayment.toFixed(2)}
# Total Payment: $${totalPayment.toFixed(2)}
# Total Interest: $${totalInterest.toFixed(2)}
# Interest Percentage: ${((totalInterest / principal) * 100).toFixed(2)}%

# Payment Breakdown
# - Principal: $${principal.toFixed(2)}
# - Interest: $${totalInterest.toFixed(2)}
# - Total: $${totalPayment.toFixed(2)}

# Amortization Schedule (First 12 Months)
${Array.from({length: Math.min(12, months)}, (_, i) => {
  const month = i + 1;
  const remainingBalance = principal * (Math.pow(1 + rate, months) - Math.pow(1 + rate, month)) / (Math.pow(1 + rate, months) - 1);
  const interestPayment = remainingBalance * rate;
  const principalPayment = monthlyPayment - interestPayment;
  return `# Month ${month}: Payment $${monthlyPayment.toFixed(2)} (Principal: $${principalPayment.toFixed(2)}, Interest: $${interestPayment.toFixed(2)})`;
}).join('\n')}

# Financial Insights
# - You will pay $${totalInterest.toFixed(2)} in interest over ${loanTerm} years
# - Your monthly payment is $${monthlyPayment.toFixed(2)}
# - Consider making extra payments to reduce interest`;

      setResult(resultText);
      setMessage("✅ Loan calculation completed successfully!");
    } catch (error) {
      setMessage("❌ Error calculating loan.");
    }
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
    setMessage("📋 Calculation result copied to clipboard!");
  }

  function reset() {
    setLoanAmount("");
    setInterestRate("");
    setLoanTerm("");
    setResult("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Loan Calculator"
      subtitle="Calculate loan payments and interest online. Free loan calculator with amortization schedule and payment analysis support."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Loan Calculator",
          description: "Calculate loan payments and interest online.",
          slug: "/loan-calculator",
          category: "Utilities/Finance",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Loan Calculator", slug: "/loan-calculator" },
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Amount ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="Enter loan amount..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interest Rate (%)
            </label>
            <input
              type="number"
              step="0.01"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="Enter interest rate..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Term (Years)
            </label>
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              placeholder="Enter loan term..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Result Output */}
        {result && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Calculation Result
            </label>
            <textarea
              value={result}
              readOnly
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={calculateLoan}
            disabled={!loanAmount.trim() || !interestRate.trim() || !loanTerm.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🧮 Calculate Loan
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
            disabled={!loanAmount.trim() && !interestRate.trim() && !loanTerm.trim() && !result.trim()}
            className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* Calculator Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">About Loan Calculations</h4>
          <div className="text-sm space-y-1">
            <div>• Monthly payments include principal and interest</div>
            <div>• Early payments reduce total interest paid</div>
            <div>• Consider your budget when choosing loan terms</div>
            <div>• Shop around for the best interest rates</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About Loan Calculator</h3>
        <p className="text-gray-700 mb-4">
          Calculate loan payments and interest. This tool helps you understand 
          the financial impact of loans, including monthly payments, total interest, 
          and amortization schedules, useful for financial planning and decision-making.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Calculate monthly loan payments</li>
          <li>Show total interest and principal breakdown</li>
          <li>Generate amortization schedules</li>
          <li>Financial insights and recommendations</li>
          <li>Easy copy to clipboard</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Enter the loan amount you want to borrow.</li>
          <li>Set the annual interest rate for the loan.</li>
          <li>Choose the loan term in years.</li>
          <li>Click <strong>Calculate Loan</strong> to see the results.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Mortgage and home loan planning</li>
          <li>Personal and auto loan analysis</li>
          <li>Financial planning and budgeting</li>
          <li>Loan comparison and decision-making</li>
        </ul>
      </section>
    </ToolSection>
  );
}