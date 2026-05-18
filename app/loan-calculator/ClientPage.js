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
      hideSidebar
      centerHeader
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

      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div className="rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-5 sm:p-6 shadow-sm">
          <h1 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-700">
            Loan Calculator Tool
          </h1>
          <p className="mt-2 text-center text-sm sm:text-base text-slate-600">
            Estimate monthly payment, total interest, and short amortization preview.
          </p>
        </div>

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
        <div className="flex gap-3 flex-wrap justify-center sm:justify-start">
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
      <section className="mx-auto mt-12 sm:mt-14 w-full max-w-5xl p-5 sm:p-6 md:p-8 bg-white shadow-md rounded-2xl border border-slate-200">
  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 border-b border-slate-200 pb-3">
    Understanding Loan Planning Before Borrowing Money
  </h2>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Loans have become an important part of modern financial planning. People borrow money for many different reasons including buying homes, purchasing vehicles, paying educational expenses, managing emergencies, expanding businesses, or handling personal financial needs. While loans can provide financial support during important situations, borrowing without proper planning can sometimes create long term repayment pressure.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    One of the biggest mistakes borrowers make is focusing only on the approved loan amount without understanding the total repayment cost. Interest rates, repayment duration, and monthly instalments can significantly affect overall financial stability. This is why loan calculators have become extremely useful tools for financial planning.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    A Loan Calculator helps users estimate monthly payments, total repayment amount, and interest costs before applying for a loan. Instead of depending entirely on lender discussions, users can compare multiple scenarios independently and understand how different loan structures may affect their budget over time.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Why Monthly Loan Planning Matters So Much
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Every loan comes with repayment responsibility. Monthly instalments continue for months or sometimes even years depending on the chosen repayment period. If borrowers select loan amounts or repayment terms without proper planning, monthly expenses may become difficult to manage later.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    A loan calculator helps users estimate affordability before committing to financial obligations. By adjusting loan amount, interest rate, and repayment duration, users can compare different repayment structures and identify options that fit their monthly income more comfortably.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Financial planning tools often work best when used together. For example, users analysing salary expenses may also use the <a href="https://convertixy.com/in-hand-salary-calculator" className="text-blue-600 hover:underline font-medium">In Hand Salary Calculator</a> to understand how much monthly income remains available after deductions and taxes.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    How Loan Calculators Estimate Monthly Payments
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Loan calculators use mathematical formulas to estimate repayment values based on the entered information. Users generally provide three important details including the loan amount, annual interest rate, and repayment duration. Using these inputs, the calculator estimates how much the borrower may need to pay every month throughout the repayment period.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Fixed rate loans usually maintain the same monthly payment amount across the repayment period. However, the balance between principal repayment and interest payment changes gradually over time. In the early months, a larger portion of the payment typically goes toward interest. As the balance decreases, more of the payment starts reducing the principal amount.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Understanding this repayment structure helps borrowers make smarter financial decisions before taking loans from banks or financial institutions.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Why Interest Rates Affect Total Repayment Cost
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Interest rates directly affect how expensive a loan becomes over time. Even a small increase in interest percentage can significantly increase total repayment costs, especially for long term loans such as home financing.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Lower interest rates generally reduce both monthly payments and overall repayment burden. Higher rates increase borrowing costs and may make long term repayment more difficult for some users. This is why borrowers often compare offers from multiple lenders before making final decisions.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    People who regularly compare financial calculations sometimes also use the <a href="https://convertixy.com/percentage-calculator" className="text-blue-600 hover:underline font-medium">Percentage Calculator</a> to better understand interest changes, repayment differences, and budget calculations while planning loans.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Long Term Loans Versus Short Term Loans
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Loan duration plays an important role in determining both monthly instalments and total repayment amount. Longer repayment periods usually reduce monthly payments because the balance gets distributed across more months. However, long durations often increase total interest paid over time.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Shorter loan terms usually result in higher monthly instalments, but they often reduce total interest costs because the loan gets cleared faster. Borrowers should choose repayment durations based on income stability, financial comfort, and long term goals instead of selecting the longest available option automatically.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Comparing multiple repayment structures before borrowing helps users avoid unnecessary financial pressure later.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Different Types of Loans People Commonly Calculate
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Loan calculators are useful for many different borrowing situations. Home buyers use them to estimate mortgage affordability before purchasing property. Car buyers compare monthly instalments while selecting financing options for vehicles. Students and families use calculators to understand educational loan repayments before taking admission related financing.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Personal loan applicants often estimate monthly repayment obligations before applying for emergency funding or debt consolidation. Small business owners also use loan calculators while evaluating equipment financing, expansion funding, or operational borrowing.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Many users planning broader financial growth also combine loan analysis with investment planning tools such as the <a href="https://convertixy.com/sip-calculator" className="text-blue-600 hover:underline font-medium">SIP Calculator</a> to balance borrowing and long term savings goals together.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    How Loan Calculators Improve Financial Decision Making
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Financial decisions become safer when users understand repayment obligations clearly before borrowing. Loan calculators provide quick estimates that help borrowers avoid unrealistic commitments. Instead of guessing affordability, users can see actual estimated instalments instantly.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Comparing different scenarios also helps users negotiate better loan structures. Borrowers may decide to increase down payments, shorten repayment periods, or choose lower loan amounts after reviewing repayment calculations carefully.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Financial awareness reduces the risk of repayment stress and supports more responsible borrowing behaviour over time.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Why Browser Based Financial Tools Feel More Convenient
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Browser based tools provide instant accessibility without requiring installations or account creation. Users can open the calculator directly on desktop or mobile devices and test multiple repayment combinations quickly.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This loan calculator processes values directly inside the browser itself, making the experience lightweight and fast. Users can repeatedly test different amounts, rates, and durations without delays or unnecessary complexity.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Many people also prefer browser based tools because they allow quick planning before approaching lenders or discussing financing with banks and financial advisors.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Privacy Advantages of Local Loan Calculations
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Financial information is personal, and many users prefer not to share salary details, loan amounts, or repayment plans with unknown platforms unnecessarily. Browser based processing helps maintain better privacy while calculating financial estimates.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Since this calculator runs locally inside the browser, entered values remain on the user device during calculations. Users can estimate repayment scenarios privately without needing to upload sensitive financial information externally.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This local processing approach also improves speed because calculations happen instantly without depending on remote servers.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Helpful Financial Habits Before Taking Any Loan
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Borrowers should always review monthly income, emergency savings, ongoing expenses, and future financial goals before taking loans. It is important to avoid selecting loan amounts purely based on maximum eligibility offered by lenders.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Comparing interest rates carefully, understanding repayment schedules, checking hidden charges, and reading lender conditions properly can prevent unexpected financial problems later. Users should also maintain repayment discipline to avoid penalties and credit related issues.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    People handling multiple financial calculations may additionally use the <a href="https://convertixy.com/salary-after-tax-calculator" className="text-blue-600 hover:underline font-medium">Salary After Tax Calculator</a> while planning monthly budgets alongside loan repayments and living expenses.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Final Thoughts on Using a Loan Calculator
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
    A Loan Calculator is one of the most practical financial planning tools for estimating repayment costs before borrowing money. It helps users understand monthly instalments, total repayment amount, and interest expenses more clearly while comparing different borrowing scenarios.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify mt-4">
    This browser based calculator keeps the process simple, beginner friendly, and accessible across devices. Users can quickly test loan combinations without creating accounts or sharing personal financial information externally.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify mt-4">
    Whether you are planning a home loan, vehicle financing, educational borrowing, business funding, or personal financial support, understanding repayment obligations in advance can help create smarter and more confident financial decisions over the long term.
  </p>
</section>
    </ToolSection>
  );
}
