"use client";

import { useMemo, useState } from "react";
import ToolSection from "../components/ToolSection";

const sections = [
  {
    heading: "What Salary After Tax Calculator Does",
    paragraphs: [
      "Salary After Tax Calculator helps users estimate how much income remains after tax and other yearly deductions. It turns a rough gross salary number into a clearer planning figure.",
      "This matters because many people know their offered salary but still want a simple view of what they may actually keep after deductions.",
    ],
  },
  {
    heading: "Who Should Use This Tool",
    paragraphs: [
      "This tool is useful for job seekers, employees, freelancers comparing contracts, and anyone reviewing compensation offers.",
      "It is especially helpful when users want a quick estimate before going deeper into region-specific payroll rules.",
    ],
  },
  {
    heading: "How to Use Salary After Tax Calculator",
    paragraphs: [
      "Enter annual gross salary, estimated tax rate, and any extra annual deductions. The calculator instantly shows your estimated tax amount, total deductions, annual net salary, and monthly net salary.",
      "A simple workflow like this is useful for comparing two offers without opening spreadsheets or doing manual calculations.",
    ],
  },
  {
    heading: "Why Estimates Are Helpful",
    paragraphs: [
      "An estimate is often enough for first-level planning. It helps users think in realistic net income terms instead of relying only on gross salary numbers.",
      "This is practical during interviews, salary negotiations, budget planning, and offer comparison stages.",
    ],
  },
  {
    heading: "Common Mistakes to Avoid",
    paragraphs: [
      "A common mistake is assuming every salary after tax result is exact. Real payroll can include location-specific tax rules, exemptions, benefits, and employer policies.",
      "Another mistake is forgetting recurring deductions like insurance, retirement contributions, or professional tax equivalents.",
    ],
  },
  {
    heading: "Best Way to Use the Result",
    paragraphs: [
      "Use the result as a planning estimate, then refine it later with your exact payroll details if needed.",
      "This makes the calculator useful for quick decision-making while still leaving room for more detailed review later.",
    ],
  },
];

const faq = [
  {
    question: "What does a salary after tax calculator do?",
    answer:
      "It estimates net salary by subtracting tax and extra deductions from gross annual income. This gives users a more practical salary figure for planning.",
  },
  {
    question: "Is this result exact?",
    answer:
      "No, it is a planning estimate. Exact payroll outcomes can change based on tax rules, deduction structure, and employer settings.",
  },
  {
    question: "Can I include extra deductions?",
    answer:
      "Yes, you can add a yearly deductions value. That makes the estimate more useful when you already know part of your recurring deductions.",
  },
  {
    question: "Does it show monthly salary too?",
    answer:
      "Yes, the tool converts the estimated annual net salary into a monthly figure so users can think in take-home terms more easily.",
  },
  {
    question: "Is this free to use?",
    answer:
      "Yes, it is free to use online and works directly in the browser without sign-up.",
  },
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

export default function SalaryAfterTaxCalculatorPage() {
  const [grossSalary, setGrossSalary] = useState(1200000);
  const [taxRate, setTaxRate] = useState(15);
  const [otherDeductions, setOtherDeductions] = useState(50000);

  const result = useMemo(() => {
    const gross = Math.max(0, sanitizeNumber(grossSalary));
    const rate = Math.max(0, sanitizeNumber(taxRate));
    const deductions = Math.max(0, sanitizeNumber(otherDeductions));
    const taxAmount = (gross * rate) / 100;
    const totalDeductions = taxAmount + deductions;
    const netAnnual = Math.max(0, gross - totalDeductions);
    const netMonthly = netAnnual / 12;

    return {
      taxAmount,
      totalDeductions,
      netAnnual,
      netMonthly,
    };
  }, [grossSalary, otherDeductions, taxRate]);

  const validationMessage = useMemo(() => {
    if (sanitizeNumber(grossSalary) < 0) return "Gross salary cannot be negative.";
    if (sanitizeNumber(taxRate) < 0) return "Tax rate cannot be negative.";
    if (sanitizeNumber(taxRate) > 100) return "Tax rate cannot be more than 100%.";
    if (sanitizeNumber(otherDeductions) < 0) return "Other deductions cannot be negative.";
    return "";
  }, [grossSalary, otherDeductions, taxRate]);

  return (
    <ToolSection
      title="Salary After Tax Calculator"
      subtitle="Estimate annual and monthly net salary after tax and deductions with a simple in-browser calculator."
    >
      <div className="space-y-5">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Annual Gross Salary</label>
            <input type="number" value={grossSalary} onChange={(e) => setGrossSalary(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900" placeholder="Annual gross salary" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Estimated Tax Rate (%)</label>
            <input type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900" placeholder="Tax rate" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Other Annual Deductions</label>
            <input type="number" value={otherDeductions} onChange={(e) => setOtherDeductions(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900" placeholder="Other deductions" />
          </div>
        </div>

        {validationMessage ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {validationMessage}
          </div>
        ) : (
          <p className="text-sm text-gray-600">
            This calculator gives an estimate. Exact payroll treatment can differ by tax rules, exemptions, and employer deductions.
          </p>
        )}

        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-gray-200 bg-blue-50 p-5">
            <p className="text-sm font-medium text-blue-900">Estimated Tax</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{formatCurrency(result.taxAmount)}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-amber-50 p-5">
            <p className="text-sm font-medium text-amber-900">Total Deductions</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{formatCurrency(result.totalDeductions)}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-green-50 p-5">
            <p className="text-sm font-medium text-green-900">Net Annual Salary</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{formatCurrency(result.netAnnual)}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-purple-50 p-5">
            <p className="text-sm font-medium text-purple-900">Net Monthly Salary</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{formatCurrency(result.netMonthly)}</p>
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

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm text-justify">
          <h2 className="text-2xl font-bold text-gray-900">Detailed Guide to Salary After Tax Calculation</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-700 sm:text-base">
            <p>
              Salary After Tax Calculator is useful because gross salary rarely tells the full story. Many job offers look attractive at first, but the amount that actually reaches your account can be very different once tax and deductions are considered. A practical salary page should help users move from broad salary numbers to a more realistic estimate they can use for planning. That is exactly why this tool matters. It helps convert annual compensation into a net figure that feels more useful in real life.
            </p>
            <p>
              Most users come to a salary after tax page with one simple question: how much will I really keep? That question matters during job changes, budget planning, salary negotiations, and personal finance decisions. When people compare two offers, gross salary alone can be misleading. One job may offer a higher annual package but also carry bigger deductions. Another job may look smaller on paper but leave more usable income. A salary after tax estimate gives a better starting point for comparing those scenarios.
            </p>
            <p>
              This calculator is intentionally simple. Instead of locking users into a region-specific tax structure, it allows them to enter an estimated tax rate and any extra annual deductions. That makes the page flexible and easier to use across different salary situations. Some users may already know their rough effective tax rate, while others may use the tool for fast approximation before doing deeper payroll review. In both cases, the result is easy to read and immediately useful.
            </p>
            <p>
              A common mistake people make is treating gross salary like spendable income. In real life, taxes, retirement contributions, insurance, and other payroll deductions reduce the final amount. Another mistake is focusing only on annual salary without converting that number into monthly take-home terms. People usually pay rent, bills, and savings targets monthly, so a monthly net estimate is often more valuable than a single yearly figure. This tool shows both annual and monthly results to make planning easier.
            </p>
            <p>
              The best way to use this Salary After Tax Calculator is to test multiple scenarios. You can start with your expected tax rate and annual deductions, then compare the result against another possible job offer or compensation structure. This is especially useful when discussing salary revisions, switching jobs, or planning a move to a more expensive city. Even small changes in deductions can affect your monthly planning more than you expect, so comparing a few realistic cases often leads to better decisions.
            </p>
            <p>
              It is also important to understand the limitation of any after-tax estimate. Exact payroll outcomes depend on location, exemptions, tax regime, payroll setup, and employer-specific deductions. That is why this page is designed as a planning tool, not as official tax advice. The goal is speed and clarity. A user should be able to arrive on the page, enter a few values, and instantly understand whether a salary looks strong or weak after deductions.
            </p>
            <p>
              Over time, pages like this have strong long-term value because salary comparison is a repeated need. Users return when they get a new offer, receive an increment, change deduction assumptions, or simply want to review their finances more carefully. That repeat-use behavior makes a salary after tax calculator both practically helpful and SEO-friendly. It solves a real problem quickly, and that is exactly the kind of utility that keeps bringing people back.
            </p>
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
