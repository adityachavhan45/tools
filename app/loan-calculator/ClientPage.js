"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

function getMonthlyPayment(principal, annualRatePercent, years) {
  const p = Math.max(0, principal);
  const months = Math.max(1, Math.round(years * 12));
  const rate = annualRatePercent / 100 / 12;
  if (rate <= 0) return p / months;
  return (p * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
}

export default function LoanCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");

  function calculateLoan() {
    if (!loanAmount.trim() || !interestRate.trim() || !loanTerm.trim()) {
      setMessage("Please enter loan amount, interest rate, and term.");
      return;
    }
    const principal = parseFloat(loanAmount);
    const ratePercent = parseFloat(interestRate);
    const years = parseFloat(loanTerm);
    if (isNaN(principal) || principal <= 0 || isNaN(ratePercent) || ratePercent < 0 || isNaN(years) || years <= 0) {
      setMessage("Please enter valid positive numbers.");
      return;
    }
    setMessage("");
    const months = Math.round(years * 12);
    const monthlyRate = ratePercent / 100 / 12;
    const monthlyPayment = getMonthlyPayment(principal, ratePercent, years);
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - principal;
    const schedule = [];
    let balance = principal;
    for (let i = 0; i < Math.min(12, months); i++) {
      const interest = balance * monthlyRate;
      const principalPart = monthlyPayment - interest;
      balance = Math.max(0, balance - principalPart);
      schedule.push({
        month: i + 1,
        principal: principalPart,
        interest,
        balance,
      });
    }
    setResult({
      principal,
      monthlyPayment,
      totalPayment,
      totalInterest,
      months,
      schedule,
    });
    setMessage("Calculation complete. Review the results below.");
  }

  function reset() {
    setLoanAmount("");
    setInterestRate("");
    setLoanTerm("");
    setResult(null);
    setMessage("Cleared.");
  }

  const formatCurrency = (n) => isFinite(n) ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n) : "—";

  return (
    <ToolSection
      title="Free Loan Calculator"
      subtitle="Estimate monthly payment, total interest, and see a short amortization view. For planning only no upload, works in your browser."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Loan Calculator",
          description: "Calculate monthly loan payment and total interest. Free, in-browser, for planning only.",
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

      {message && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-white text-sm sm:text-base transition-all duration-300
          ${message.includes("complete") ? "bg-emerald-600" : ""}
          ${message.includes("Please enter") ? "bg-amber-600" : ""}
          ${message.includes("Cleared") ? "bg-sky-600" : ""}`}
        >
          {message}
        </div>
      )}

      <div className="space-y-6">
        {/* Inputs */}
        <div className="p-4 sm:p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-700 mb-4">Loan details</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-slate-600 mb-1">Loan amount ($)</label>
              <input
                type="number"
                min="1"
                step="1"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="e.g. 100000"
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Annual interest rate (%)</label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="e.g. 6.5"
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Term (years)</label>
              <input
                type="number"
                min="1"
                step="1"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                placeholder="e.g. 15"
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={calculateLoan}
            disabled={!loanAmount.trim() || !interestRate.trim() || !loanTerm.trim()}
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
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-slate-500">Monthly payment</p>
                <p className="mt-2 text-2xl font-bold text-teal-700">{formatCurrency(result.monthlyPayment)}</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-slate-500">Total payment</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{formatCurrency(result.totalPayment)}</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-slate-500">Total interest</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{formatCurrency(result.totalInterest)}</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-slate-500">Term</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{result.months} months</p>
              </div>
            </div>

            {result.schedule.length > 0 && (
              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                <p className="p-4 text-sm font-medium text-slate-800 border-b border-slate-100">First 12 months (sample)</p>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 text-left">
                      <th className="px-4 py-2 font-medium">Month</th>
                      <th className="px-4 py-2 font-medium">Principal</th>
                      <th className="px-4 py-2 font-medium">Interest</th>
                      <th className="px-4 py-2 font-medium">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.schedule.map((row) => (
                      <tr key={row.month} className="border-t border-slate-100">
                        <td className="px-4 py-2">{row.month}</td>
                        <td className="px-4 py-2">{formatCurrency(row.principal)}</td>
                        <td className="px-4 py-2">{formatCurrency(row.interest)}</td>
                        <td className="px-4 py-2">{formatCurrency(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <p className="text-xs text-slate-500">
              This is an estimate for planning only. Actual terms depend on your lender. Taxes, fees, and insurance are not included.
            </p>
          </div>
        )}

        {/* Tips */}
        <div className="p-4 rounded-xl bg-teal-50 border border-teal-100 text-sm text-slate-700">
          <p className="font-semibold text-teal-900 mb-2">Tips</p>
          <ul className="space-y-1 list-disc list-inside text-justify">
            <li>Monthly payment includes principal and interest only.</li>
            <li>Lower rate or shorter term usually means less total interest.</li>
            <li>Extra principal payments can reduce total interest; check with your lender.</li>
          </ul>
        </div>
      </div>

      {/* Info section – 1000+ words, unique, text-justify */}
      <section className="mt-12 sm:mt-14 p-5 sm:p-6 md:p-8 bg-white shadow-md rounded-2xl border border-slate-100">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 border-b border-slate-200 pb-3">
          About This Loan Calculator
        </h2>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          A loan calculator is a tool that estimates your monthly payment and total interest for a fixed-rate loan. You enter the loan amount (principal), the annual interest rate, and the term in years. The calculator uses the standard amortisation formula to compute a fixed monthly payment that pays off the loan over the term, with part of each payment going to interest and part to principal. This calculator runs in your browser: no data is sent to a server, so your numbers stay private. It is intended for planning and comparison only; actual loan terms, fees, and conditions are set by lenders. Whether you are considering a mortgage, a car loan, or a personal loan, this tool helps you see roughly what you would pay each month and how much interest you would pay over the life of the loan.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">How the Monthly Payment Is Calculated</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          For a fixed-rate loan with monthly payments, the amount you pay each month is constant. The formula used here is the standard present-value annuity formula, often called the PMT formula. It accounts for the principal, the monthly interest rate (annual rate divided by 12), and the number of months. Early in the loan, most of the payment goes toward interest and a smaller part toward principal. Over time, the interest portion decreases and the principal portion increases, until the loan is paid off. When the interest rate is zero, the monthly payment is simply the principal divided by the number of months. This calculator assumes that payments are made every month on time and that the rate does not change; it does not include fees, taxes, or insurance.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">What the Results Mean</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          The monthly payment is the amount you would pay each month under the assumptions you entered. The total payment is the monthly payment multiplied by the number of months; it is the full amount you would pay back. The total interest is the total payment minus the principal; it is the cost of borrowing. The amortisation table (first 12 months) shows how each payment is split between principal and interest and what the remaining balance is after each payment. This helps you see how much of your early payments go to interest and how the balance decreases over time. Lenders may use slightly different rounding or methods, so your actual statement might differ by a few cents; this tool is for estimation only.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Why Use a Loan Calculator</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Before you borrow, it is useful to know how much you will pay each month and how much interest you will pay in total. A small change in the interest rate or term can make a large difference. For example, a longer term lowers the monthly payment but usually increases total interest. A lower rate reduces both the monthly payment and the total interest. By trying different amounts, rates, and terms, you can compare scenarios and see what fits your budget. You can also use the calculator to check rough figures that a lender gives you. Many people use loan calculators for home loans, car loans, personal loans, and education loans. The goal is to be informed, not to get an exact contract; the final terms always come from the lender.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Step-by-Step How to Use</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Open the calculator in your browser. Enter the loan amount in dollars (the sum you want to borrow). Enter the annual interest rate as a percentage (for example 6 for 6%). Enter the term in years (for example 15 for a 15-year loan). Click the calculate button. The results will show the estimated monthly payment, total payment, total interest, and a table of the first 12 months. Use the clear button to reset and try different numbers. You can run as many scenarios as you like; nothing is saved or sent to a server. Remember that the result does not include fees, taxes, or insurance, and that your actual loan may have different terms or rounding.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Limitations of This Calculator</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          This tool assumes a fixed interest rate and equal monthly payments. It does not handle variable rates, balloon payments, or interest-only periods. It does not include origination fees, closing costs, or insurance. For mortgages, property taxes and home insurance are often paid separately or through an escrow account; they are not in this calculation. Different countries and lenders use different conventions (for example payment in arrears vs advance, or different day-count methods). The calculator is designed for a simple, standard loan so that you can get a quick estimate. For exact figures, use the lenders calculator or ask for a formal quote. For tax or legal advice, consult a professional.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Use Cases</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Home buyers use loan calculators to estimate mortgage payments before house hunting or applying. Car buyers use them to compare financing options and see how term and rate affect the monthly payment. People considering personal loans use them to check affordability. Students and families use them for education loans. Small businesses use them to rough out the cost of a business loan. Anyone who is comparing offers from different lenders can plug in the same principal with different rates and terms to see the difference in monthly payment and total interest. The calculator is a planning tool; it does not approve or offer loans.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Privacy and Data</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          This loan calculator runs entirely in your browser. The numbers you enter are not sent to any server or stored by us. All calculations are done on your device. You can use it for personal planning without worrying about your loan amount or rate being recorded. No account or login is required. The tool works offline once the page has loaded. If you are on a shared device, clear the fields or close the tab when you are done.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Conclusion</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
          A loan calculator helps you estimate monthly payments and total interest for a fixed-rate loan. This free tool runs in your browser: enter the loan amount, annual rate, and term, and get the monthly payment, total payment, total interest, and a sample of the first 12 months. Your data is not uploaded. Use it to compare scenarios and to plan before you borrow. For actual terms and conditions, always rely on your lender. This calculator is for planning only and does not replace professional financial or legal advice.
        </p>
      </section>
    </ToolSection>
  );
}
