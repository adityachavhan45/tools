"use client";

import { useMemo, useState } from "react";
import ToolSection from "../components/ToolSection";

const sections = [
  {
    heading: "What In-Hand Salary Calculator Does",
    paragraphs: [
      "In-Hand Salary Calculator estimates the amount you may actually receive every month after deductions such as PF, tax, professional tax, and other recurring cuts.",
      "It is useful because gross salary alone does not always show the real monthly number that matters for budgeting.",
    ],
  },
  {
    heading: "Why Monthly Take-Home Matters",
    paragraphs: [
      "Most people plan rent, bills, savings, and lifestyle around monthly take-home pay, not only around CTC or gross salary.",
      "A take-home calculator helps convert a compensation figure into something more practical and easier to compare.",
    ],
  },
  {
    heading: "How to Use This Calculator",
    paragraphs: [
      "Enter gross monthly salary, choose the basic salary percentage, and add PF, tax, and other deductions. The calculator instantly estimates the deduction breakup and in-hand salary.",
      "That makes it easier to compare scenarios when deductions vary across companies or job offers.",
    ],
  },
  {
    heading: "Where This Tool Helps Most",
    paragraphs: [
      "This tool helps job seekers, employees reviewing increments, and professionals comparing two offers with different deduction structures.",
      "It also helps when a company shares only a rough salary breakup and the user wants a clearer take-home estimate.",
    ],
  },
  {
    heading: "Important Assumptions",
    paragraphs: [
      "This calculator is a planning tool and uses the values you enter. Real payroll may include benefits, reimbursements, allowances, and company-specific rules that are not reflected here.",
      "That is why the result should be treated as a strong estimate, not as an official payslip value.",
    ],
  },
  {
    heading: "Best Practices for Better Estimates",
    paragraphs: [
      "If possible, use real salary breakup values from the offer letter or payslip instead of guessing. The more accurate your deduction inputs are, the more useful the result becomes.",
      "Users also benefit from testing multiple scenarios to understand how changes in PF or tax affect monthly in-hand salary.",
    ],
  },
];

const faq = [
  {
    question: "What is in-hand salary?",
    answer:
      "In-hand salary is the amount you receive after subtracting payroll deductions from your gross monthly salary. It is the practical amount most users think of as take-home pay.",
  },
  {
    question: "Does this calculator include PF?",
    answer:
      "Yes, it can estimate employee PF based on the basic salary percentage and PF rate that you enter into the calculator.",
  },
  {
    question: "Can I add tax and other deductions?",
    answer:
      "Yes, you can include monthly tax, professional tax, and any other recurring deductions to get a more realistic estimate.",
  },
  {
    question: "Is the result exact?",
    answer:
      "No, this is an estimate for planning and comparison. Actual payroll figures depend on your employer and exact salary structure.",
  },
  {
    question: "Is it free to use?",
    answer:
      "Yes, the In-Hand Salary Calculator is free to use online without registration.",
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

export default function InHandSalaryCalculatorPage() {
  const [grossMonthlySalary, setGrossMonthlySalary] = useState(100000);
  const [basicPercent, setBasicPercent] = useState(40);
  const [pfRate, setPfRate] = useState(12);
  const [monthlyTax, setMonthlyTax] = useState(7000);
  const [professionalTax, setProfessionalTax] = useState(200);
  const [otherDeductions, setOtherDeductions] = useState(1500);

  const result = useMemo(() => {
    const gross = Math.max(0, sanitizeNumber(grossMonthlySalary));
    const basic = gross * (Math.max(0, sanitizeNumber(basicPercent)) / 100);
    const pf = basic * (Math.max(0, sanitizeNumber(pfRate)) / 100);
    const tax = Math.max(0, sanitizeNumber(monthlyTax));
    const pTax = Math.max(0, sanitizeNumber(professionalTax));
    const extra = Math.max(0, sanitizeNumber(otherDeductions));
    const totalDeductions = pf + tax + pTax + extra;
    const inHandSalary = Math.max(0, gross - totalDeductions);

    return {
      basic,
      pf,
      totalDeductions,
      inHandSalary,
    };
  }, [basicPercent, grossMonthlySalary, monthlyTax, otherDeductions, pfRate, professionalTax]);

  const validationMessage = useMemo(() => {
    if (sanitizeNumber(grossMonthlySalary) < 0) return "Gross monthly salary cannot be negative.";
    if (sanitizeNumber(basicPercent) < 0 || sanitizeNumber(basicPercent) > 100) return "Basic salary percentage must be between 0 and 100.";
    if (sanitizeNumber(pfRate) < 0 || sanitizeNumber(pfRate) > 100) return "PF rate must be between 0 and 100.";
    if (sanitizeNumber(monthlyTax) < 0) return "Monthly tax cannot be negative.";
    if (sanitizeNumber(professionalTax) < 0) return "Professional tax cannot be negative.";
    if (sanitizeNumber(otherDeductions) < 0) return "Other deductions cannot be negative.";
    return "";
  }, [basicPercent, grossMonthlySalary, monthlyTax, otherDeductions, pfRate, professionalTax]);

  return (
    <ToolSection
      title="In-Hand Salary Calculator"
      subtitle="Estimate your monthly take-home salary after PF, tax, and other deductions with a simple salary breakup view."
    >
      <div className="space-y-5">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Gross Monthly Salary</label>
            <input type="number" value={grossMonthlySalary} onChange={(e) => setGrossMonthlySalary(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900" placeholder="Gross monthly salary" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Basic Salary (%)</label>
            <input type="number" value={basicPercent} onChange={(e) => setBasicPercent(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900" placeholder="Basic salary percentage" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Employee PF Rate (%)</label>
            <input type="number" value={pfRate} onChange={(e) => setPfRate(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900" placeholder="PF rate" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Monthly Tax / TDS</label>
            <input type="number" value={monthlyTax} onChange={(e) => setMonthlyTax(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900" placeholder="Monthly tax" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Professional Tax</label>
            <input type="number" value={professionalTax} onChange={(e) => setProfessionalTax(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900" placeholder="Professional tax" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Other Deductions</label>
            <input type="number" value={otherDeductions} onChange={(e) => setOtherDeductions(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900" placeholder="Other deductions" />
          </div>
        </div>

        {validationMessage ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {validationMessage}
          </div>
        ) : (
          <p className="text-sm text-gray-600">
            This estimate is based on your custom deduction inputs. Actual salary slips can include additional company-specific items.
          </p>
        )}

        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-gray-200 bg-blue-50 p-5">
            <p className="text-sm font-medium text-blue-900">Basic Salary</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{formatCurrency(result.basic)}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-amber-50 p-5">
            <p className="text-sm font-medium text-amber-900">Employee PF</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{formatCurrency(result.pf)}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-rose-50 p-5">
            <p className="text-sm font-medium text-rose-900">Total Deductions</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{formatCurrency(result.totalDeductions)}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-green-50 p-5">
            <p className="text-sm font-medium text-green-900">In-Hand Salary</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{formatCurrency(result.inHandSalary)}</p>
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
          <h2 className="text-2xl font-bold text-gray-900">Detailed Guide to In-Hand Salary</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-700 sm:text-base">
            <p>
              In-Hand Salary Calculator helps answer one of the most common salary questions: how much money will actually come into my account every month? This question matters because gross salary, CTC, and employer cost figures do not always reflect the amount a person can really spend or save. For most employees, the useful number is the monthly take-home amount after payroll deductions have already been removed. That is why this kind of calculator has such strong practical value.
            </p>
            <p>
              The biggest difference between gross salary and in-hand salary is deductions. A company may quote a monthly or annual salary, but that number can still include items that never arrive as spendable cash. Employee PF, tax, professional tax, and other recurring deductions all reduce the final amount. In some cases, two jobs with similar gross salary can produce noticeably different in-hand income because of differences in the salary breakup. This is why take-home salary is often more useful than headline package numbers.
            </p>
            <p>
              This tool is designed to be easy to use. You enter gross monthly salary, define the basic salary percentage, and then add monthly deductions such as employee PF, tax, professional tax, and any other recurring amount. The calculator then estimates the breakdown and shows the final in-hand salary clearly. That makes it useful for salary comparison, budgeting, payroll understanding, and offer evaluation. Instead of relying on guesswork, users can test numbers and instantly see how deductions change the outcome.
            </p>
            <p>
              A practical reason this page matters is that many professionals receive confusing compensation documents. Sometimes offer letters highlight the package but do not make take-home salary obvious. In those situations, users need a quick calculator that helps them estimate the actual monthly figure they can use for rent, groceries, investments, and daily living. A good in-hand salary page removes that confusion and turns salary breakup into something understandable.
            </p>
            <p>
              Another important use case is salary negotiation. If someone is comparing two roles, one employer may offer a higher gross number but a weaker structure after deductions. Another employer may provide a cleaner salary structure that leaves better monthly take-home income. Looking at in-hand salary helps users compare jobs in a more practical way. This is especially useful for professionals moving cities, planning family budgets, or trying to decide whether an increment is truly meaningful.
            </p>
            <p>
              There are also some common mistakes users should avoid. One is assuming that every company uses the same salary breakup structure. Another is ignoring small recurring deductions, which can add up more than expected over a year. Some people also use guessed tax values that are too low, which creates unrealistically high take-home estimates. The better approach is to use real numbers from a payslip or offer letter whenever possible, then use this tool to compare scenarios calmly.
            </p>
            <p>
              This calculator is meant for estimation, not as a replacement for an official salary slip. Real payroll can include reimbursements, special allowances, benefits, bonuses, and company-specific treatment. Still, a quick in-hand estimate is extremely valuable because it solves the most important first-level question fast. That is why this page works so well as an everyday utility: it gives users a clear answer in seconds and helps them make more confident compensation decisions.
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
