"use client";

import { useMemo, useState } from "react";
import ToolSection from "../components/ToolSection";

const sections = [
  {
    heading: "What SIP Calculator Does and Why It Matters",
    paragraphs: [
      "SIP Calculator helps users estimate how monthly investing may grow over time. Instead of manually doing compounding calculations, the tool shows invested amount, estimated returns, and maturity value quickly.",
      "This matters because long-term planning is easier when numbers are visible and easy to compare.",
      "A practical calculator is useful because many people understand the idea of monthly investing but still want a simple way to visualize outcomes. When values are shown clearly, planning becomes less abstract and easier to discuss or compare.",
    ],
  },
  {
    heading: "Who Should Use SIP Calculator",
    paragraphs: [
      "This tool is useful for investors, beginners, salaried users, students, and anyone who wants a quick estimate for monthly investing plans.",
      "It works well for people comparing different monthly amounts, return assumptions, and investment durations.",
      "It is especially useful for users who want to build planning discipline. Instead of asking vague questions about future returns, they can test realistic monthly scenarios and see how time changes the outcome.",
    ],
  },
  {
    heading: "How to Use SIP Calculator Step by Step",
    paragraphs: [
      "Enter your monthly investment amount, expected annual return, and total duration. The calculator updates the projected numbers immediately.",
      "That makes it easy to compare scenarios and understand how time affects long-term results.",
      "A good way to use the tool is to try several combinations rather than only one. Users often learn more by comparing a five-year plan with a ten-year plan or by testing how a small increase in monthly investing changes the maturity value over time.",
    ],
  },
  {
    heading: "Common Mistakes and How to Avoid Them",
    paragraphs: [
      "A common mistake is treating estimated returns like guaranteed returns. Another issue is using unrealistic expectations for long-term growth.",
      "It is better to use reasonable assumptions and compare multiple scenarios instead of relying on one high estimate.",
      "Another issue is focusing only on the final number without noticing the invested amount behind it. A proper review should always consider both total contribution and estimated gain so the projection is understood clearly.",
    ],
  },
  {
    heading: "Why This Tool Has Long-Term Value",
    paragraphs: [
      "SIP planning is an evergreen topic because monthly investing remains a repeated goal for many users. People return to SIP calculators whenever they revise savings plans.",
      "That makes this type of calculator stable and useful over time.",
      "The page also keeps value because financial planning is rarely done once and forgotten. Users revisit their plans when salary changes, goals change, family needs change, or market expectations shift. That repeating need makes the tool practical for long-term traffic.",
    ],
  },
  {
    heading: "Best Practices for Better Results",
    paragraphs: [
      "Use realistic return assumptions, compare different durations, and look at both invested amount and estimated gains before making decisions.",
      "The tool is best used as a planning helper, not as a guarantee of future performance.",
      "It also helps to review the result calmly instead of chasing only the highest possible projection. Better financial planning usually comes from consistency, discipline, and realistic expectations rather than optimistic numbers alone.",
    ],
  },
];

const faq = [
  { question: "What is a SIP calculator?", answer: "A SIP calculator estimates how a monthly investment may grow over time. It helps users see invested amount, expected returns, and maturity value with a much simpler workflow than doing manual compound calculations." },
  { question: "Are SIP returns guaranteed?", answer: "No, the output is only an estimate based on the values you enter. Real investment performance can vary, so this tool should be used for planning and comparison, not as a guaranteed final outcome." },
  { question: "Why should I use a SIP calculator?", answer: "It helps you compare monthly investing plans quickly and clearly. Instead of relying on guesswork, users can explore different contributions, timelines, and return assumptions in a more structured way." },
  { question: "Can I change return rate and duration?", answer: "Yes, both can be adjusted easily. That flexibility is important because SIP planning usually works best when users compare multiple realistic scenarios instead of relying on only one projection." },
  { question: "Is this SIP calculator free?", answer: "Yes, it is free to use online. It is designed for quick planning in the browser without requiring registration or any financial app setup." },
];

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function sanitizeNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function SipCalculatorPage() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [annualReturn, setAnnualReturn] = useState(12);
  const [years, setYears] = useState(10);

  const result = useMemo(() => {
    const investment = Math.max(0, sanitizeNumber(monthlyInvestment));
    const yearsValue = Math.max(0, sanitizeNumber(years));
    const annualRate = Math.max(0, sanitizeNumber(annualReturn));
    const months = yearsValue * 12;
    const rate = annualRate / 12 / 100;
    const maturity =
      rate === 0
        ? investment * months
        : investment * (((Math.pow(1 + rate, months) - 1) / rate) * (1 + rate));
    const invested = investment * months;
    const returns = maturity - invested;
    return { invested, returns, maturity };
  }, [annualReturn, monthlyInvestment, years]);

  const validationMessage = useMemo(() => {
    if (sanitizeNumber(monthlyInvestment) < 0) return "Monthly investment cannot be negative.";
    if (sanitizeNumber(annualReturn) < 0) return "Expected return cannot be negative.";
    if (sanitizeNumber(years) < 0) return "Investment duration cannot be negative.";
    return "";
  }, [annualReturn, monthlyInvestment, years]);

  return (
    <ToolSection title="SIP Calculator" subtitle="Estimate your monthly SIP growth with invested amount, expected return, and maturity value.">
      <div className="space-y-5">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Monthly Investment</label>
            <input type="number" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400" placeholder="Monthly amount" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Expected Annual Return (%)</label>
            <input type="number" value={annualReturn} onChange={(e) => setAnnualReturn(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400" placeholder="Expected return %" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Investment Duration (Years)</label>
            <input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400" placeholder="Years" />
          </div>
        </div>
        {validationMessage ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {validationMessage}
          </div>
        ) : (
          <p className="text-sm text-gray-600">This estimate assumes a fixed monthly SIP amount and a constant annual return rate.</p>
        )}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-blue-50 p-5">
            <p className="text-sm font-medium text-blue-900">Invested Amount</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{formatCurrency(result.invested)}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-green-50 p-5">
            <p className="text-sm font-medium text-green-900">Estimated Returns</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{formatCurrency(result.returns)}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-purple-50 p-5">
            <p className="text-sm font-medium text-purple-900">Maturity Value</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{formatCurrency(result.maturity)}</p>
          </div>
        </div>
      </div>
      <div className="mt-8 space-y-8">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">About This Tool</h2>
          <div className="mt-6 space-y-8">
            {sections.map((section) => (
              <div key={section.heading}>
                <h3 className="text-xl font-semibold text-gray-900">{section.heading}</h3>
                <div className="mt-3 space-y-4 text-sm leading-7 text-gray-700 sm:text-base">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={`${section.heading}-${index}`} className="text-justify">{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <div className="mt-6 space-y-4">
            {faq.map((item) => (
              <details key={item.question} className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-4">
                <summary className="cursor-pointer text-base font-semibold text-gray-900">{item.question}</summary>
                <p className="mt-3 text-sm leading-7 text-gray-700 sm:text-base">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </ToolSection>
  );
}
