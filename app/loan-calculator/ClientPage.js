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
          A loan calculator is an essential financial tool that helps individuals 
          and businesses understand the real cost of borrowing. Whether you are 
          taking a personal loan, home loan, car loan, or business loan, it is 
          crucial to calculate monthly payments, total interest payable, and the 
          long-term impact on your budget. This tool uses the standard amortization 
          formula (PMT) to break down monthly payments into principal and interest 
          components, giving you complete transparency before you commit to a loan.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Instant calculation of monthly loan payments</li>
          <li>Clear breakdown of principal and interest</li>
          <li>Automatic generation of amortization schedule</li>
          <li>Shows total payment and total interest</li>
          <li>Financial insights for smarter decision-making</li>
          <li>Runs 100% in your browser — private & secure</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Enter the loan amount (principal) you want to borrow.</li>
          <li>Input the annual interest rate offered by your lender.</li>
          <li>Enter the loan term in years.</li>
          <li>Click <strong>Calculate Loan</strong> to generate results.</li>
          <li>Review monthly payment, total interest, and amortization schedule.</li>
          <li>Copy the results for planning or financial discussions.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Common Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>Home Loans:</strong> Estimate monthly mortgage payments and total cost of home ownership.</li>
          <li><strong>Car Loans:</strong> Compare financing options for new or used vehicles.</li>
          <li><strong>Personal Loans:</strong> Understand repayment burden before consolidating debt or funding expenses.</li>
          <li><strong>Business Loans:</strong> Calculate borrowing costs for expansion, equipment, or working capital.</li>
          <li><strong>Loan Comparisons:</strong> Quickly analyze multiple offers from banks or lenders.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">⚡ Why Loan Calculations Matter</h4>
        <p className="text-gray-700 mb-4 text-sm">
          Many borrowers focus only on the loan amount and interest rate, 
          but the real impact comes from the monthly installment (EMI) and 
          the total interest over the loan’s lifetime. For example, a small 
          difference of 0.5% in interest rate can save you thousands of dollars 
          over 20 years. Similarly, choosing a longer loan term reduces monthly 
          payments but significantly increases the total interest you pay. A loan 
          calculator helps you strike the right balance between affordability and 
          minimizing interest costs.
        </p>

        <h4 className="font-semibold mt-4 mb-1">📖 Example Calculation</h4>
        <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800 overflow-x-auto">
{`Loan Amount: $50,000
Interest Rate: 6% annually
Loan Term: 5 years (60 months)

Monthly Payment: $966.64
Total Payment: $57,998.40
Total Interest: $7,998.40

Amortization (First 2 months):
Month 1 → Principal: $716.64, Interest: $250.00
Month 2 → Principal: $720.22, Interest: $246.42`}
        </pre>

        <h4 className="font-semibold mt-4 mb-1">🔒 Security & Privacy</h4>
        <p className="text-gray-700 mb-4 text-sm">
          Unlike online loan portals that may save or share your financial 
          inputs, this calculator works entirely in your browser. No loan 
          amounts, interest rates, or terms are uploaded to any server. 
          You can experiment freely with different scenarios without any 
          risk to your privacy.
        </p>

        <h4 className="font-semibold mt-4 mb-1">❓ FAQs</h4>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
          <li><strong>Q: Can I use this for mortgages?</strong><br/> 
          A: Yes, it works for all types of loans including mortgages, auto loans, and personal loans.</li>
          <li><strong>Q: Does it include taxes or insurance?</strong><br/> 
          A: No, it only calculates principal and interest. Taxes and insurance vary by region.</li>
          <li><strong>Q: Can I adjust payment frequency?</strong><br/> 
          A: This version calculates monthly payments, but advanced versions may include bi-weekly or annual options.</li>
          <li><strong>Q: How accurate are the results?</strong><br/> 
          A: The results use the standard PMT amortization formula, which is the same method used by banks.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🚀 Final Thoughts</h4>
        <p className="text-gray-700 text-sm">
          Loans are powerful financial tools, but they come with long-term 
          responsibilities. Understanding how much you will pay every month, 
          and how much of it goes toward interest, is key to making smart 
          borrowing decisions. With this loan calculator, you can compare 
          different loan options, negotiate better terms with lenders, and 
          avoid financial surprises. Whether you are buying a home, funding 
          education, or growing a business, this tool ensures you stay in 
          control of your financial journey.
        </p>
      </section>
    </ToolSection>
  );
}