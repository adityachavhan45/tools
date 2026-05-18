"use client";

import { useMemo, useState } from "react";
import ToolSection from "../components/ToolSection";

const sections = [
  {
    heading: "What HRA Calculator Does",
    paragraphs: [
      "HRA Calculator estimates the house rent allowance exemption based on salary, HRA received, rent paid, and whether the city is metro or non-metro.",
      "It is useful because HRA calculations often involve multiple conditions and users want a quick result without manual comparison.",
    ],
  },
  {
    heading: "How the HRA Estimate Works",
    paragraphs: [
      "The calculator compares the common HRA calculation components and uses the lowest eligible value as the estimated exemption amount.",
      "This gives users a fast way to understand how much HRA may be exempt and how much may remain taxable.",
    ],
  },
  {
    heading: "Who Should Use This Tool",
    paragraphs: [
      "This tool is useful for salaried employees paying rent and trying to understand how HRA may affect salary planning.",
      "It also helps during offer review, salary structuring discussions, and simple tax planning exercises.",
    ],
  },
  {
    heading: "How to Use HRA Calculator",
    paragraphs: [
      "Enter annual basic salary, annual HRA received, annual rent paid, and choose metro or non-metro city status. The calculator instantly shows exempt and taxable HRA values.",
      "This quick flow saves time and reduces the chance of using the wrong formula manually.",
    ],
  },
  {
    heading: "Important Notes",
    paragraphs: [
      "This calculator is built for practical estimation. Final tax treatment can depend on your payslip structure, applicable rules, and document support such as rent receipts.",
      "That is why the result should be treated as a useful estimate rather than formal tax advice.",
    ],
  },
  {
    heading: "Best Practices for Better Results",
    paragraphs: [
      "Use annual numbers consistently for salary, HRA, and rent. Mixing monthly and annual values is one of the most common reasons for wrong HRA estimates.",
      "It is also wise to verify your exact salary components before using the result for planning.",
    ],
  },
];

const faq = [
  {
    question: "What does an HRA calculator do?",
    answer:
      "It estimates how much house rent allowance may qualify as exempt and how much may remain taxable based on your salary and rent inputs.",
  },
  {
    question: "Why does metro status matter?",
    answer:
      "Metro status affects the salary percentage used in the calculation. That is why the result can change depending on whether the city is metro or non-metro.",
  },
  {
    question: "Does it show taxable HRA too?",
    answer:
      "Yes, the calculator shows both estimated exempt HRA and the remaining taxable portion so users get a clearer picture.",
  },
  {
    question: "Should I treat the result as final tax advice?",
    answer:
      "No, this tool is for estimation and planning. Exact tax outcomes can depend on filing details and salary structure.",
  },
  {
    question: "Is the HRA Calculator free?",
    answer:
      "Yes, it is free to use online and works directly in the browser.",
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

export default function HraCalculatorPage() {
  const [basicSalary, setBasicSalary] = useState(480000);
  const [hraReceived, setHraReceived] = useState(240000);
  const [rentPaid, setRentPaid] = useState(300000);
  const [isMetro, setIsMetro] = useState("yes");

  const result = useMemo(() => {
    const basic = Math.max(0, sanitizeNumber(basicSalary));
    const hra = Math.max(0, sanitizeNumber(hraReceived));
    const rent = Math.max(0, sanitizeNumber(rentPaid));
    const rentMinusTenPercent = Math.max(0, rent - basic * 0.1);
    const salaryPercentLimit = basic * (isMetro === "yes" ? 0.5 : 0.4);
    const exemptHra = Math.min(hra, rentMinusTenPercent, salaryPercentLimit);
    const taxableHra = Math.max(0, hra - exemptHra);

    return {
      rentMinusTenPercent,
      salaryPercentLimit,
      exemptHra,
      taxableHra,
    };
  }, [basicSalary, hraReceived, isMetro, rentPaid]);

  const validationMessage = useMemo(() => {
    if (sanitizeNumber(basicSalary) < 0) return "Basic salary cannot be negative.";
    if (sanitizeNumber(hraReceived) < 0) return "HRA received cannot be negative.";
    if (sanitizeNumber(rentPaid) < 0) return "Rent paid cannot be negative.";
    return "";
  }, [basicSalary, hraReceived, rentPaid]);

  return (
    <ToolSection
      title="HRA Calculator"
      subtitle="Estimate HRA exemption using salary, rent paid, HRA received, and metro or non-metro city status."
      plain
      whiteBackground
      hideSidebar
      centerHeader
    >
      <div className="space-y-6">
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 sm:p-6 space-y-5">
          <h2 className="text-lg font-semibold text-gray-900">Enter your details</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Annual Basic Salary</label>
              <input type="number" value={basicSalary} onChange={(e) => setBasicSalary(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900" placeholder="Annual basic salary" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Annual HRA Received</label>
              <input type="number" value={hraReceived} onChange={(e) => setHraReceived(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900" placeholder="Annual HRA received" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Annual Rent Paid</label>
              <input type="number" value={rentPaid} onChange={(e) => setRentPaid(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900" placeholder="Annual rent paid" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">City Type</label>
              <select value={isMetro} onChange={(e) => setIsMetro(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900">
                <option value="yes">Metro City</option>
                <option value="no">Non-Metro City</option>
              </select>
            </div>
          </div>

          {validationMessage ? (
            <div className="px-4 py-3 text-sm rounded-xl border border-red-200 bg-red-50 text-red-700 text-justify">
              {validationMessage}
            </div>
          ) : (
            <p className="text-sm text-gray-600">
              This estimate follows a common HRA comparison method and is meant for planning. Exact treatment can vary by salary structure and tax filing details.
            </p>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          <div className="md:col-span-3 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-5">
            <p className="font-semibold text-blue-900 mb-2">Formula</p>
            <p className="text-blue-800 text-sm text-justify">
              Estimated exempt HRA is calculated as the lowest of: HRA received, rent paid minus 10% of basic salary, and 50% (metro) or 40% (non-metro) of basic salary.
            </p>
          </div>
          <div className="md:col-span-2 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5">
            <p className="font-semibold text-amber-900 mb-2">Tip</p>
            <p className="text-amber-800 text-sm text-justify">
              Use annual values consistently for salary, HRA, and rent to avoid incorrect estimates.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-gray-200 bg-blue-50 p-5">
            <p className="text-sm font-medium text-blue-900">Rent Minus 10% of Basic</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{formatCurrency(result.rentMinusTenPercent)}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-amber-50 p-5">
            <p className="text-sm font-medium text-amber-900">Salary Percentage Limit</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{formatCurrency(result.salaryPercentLimit)}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-green-50 p-5">
            <p className="text-sm font-medium text-green-900">Estimated Exempt HRA</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{formatCurrency(result.exemptHra)}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-rose-50 p-5">
            <p className="text-sm font-medium text-rose-900">Estimated Taxable HRA</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{formatCurrency(result.taxableHra)}</p>
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
          <h2 className="text-2xl font-bold text-gray-900">Detailed Guide to HRA Calculation</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-700 sm:text-base">
            <p>
              HRA Calculator is useful because house rent allowance calculations are usually more confusing than they look. Many salaried employees know that HRA can reduce taxable income, but the exact estimate depends on multiple inputs rather than a single salary number. That is why people often search for a quick HRA page instead of trying to remember the formula every time. A good HRA calculator removes friction and gives a clearer estimate in seconds.
            </p>
            <p>
              In a practical HRA estimate, the user usually needs to compare several values at once. These include basic salary, HRA received, annual rent paid, and whether the city is treated as metro or non-metro. The lowest qualifying value often becomes the estimated exemption. That comparison is simple in concept but easy to get wrong when done manually. One wrong number or one monthly value mixed with annual values can completely change the output. This is why a structured HRA tool is helpful.
            </p>
            <p>
              The strongest benefit of this page is clarity. Users can enter their salary and rent details and immediately see estimated exempt HRA and taxable HRA. That makes salary planning easier, especially for people who are reviewing an offer, adjusting compensation expectations, or trying to understand how rent affects the final outcome. Instead of reading a long tax explanation first, the user gets a practical estimate instantly and can then think about the details with more confidence.
            </p>
            <p>
              This tool is especially useful for salaried employees living on rent. In many cases, HRA is one of the first salary components people want to understand because it affects tax planning and overall salary efficiency. It is also helpful during discussions with HR or while reviewing salary structure documents. If someone is moving to a different city, comparing rent levels, or checking whether a compensation structure is efficient, HRA estimation can become an important part of decision-making.
            </p>
            <p>
              A very common mistake is mixing monthly and annual numbers in the same calculation. For example, if rent is entered monthly while salary is entered annually, the result becomes misleading. Another common issue is choosing the wrong city type or misunderstanding the effect of metro and non-metro status. This page helps reduce those mistakes by keeping the inputs clear and by showing the calculated components in a simple format. Users can then review the result more calmly.
            </p>
            <p>
              It is important to remember that this HRA calculator is meant for planning and estimation. Exact tax outcomes can depend on salary structure, documentation, filing choices, and detailed payroll treatment. The purpose of the page is not to replace professional tax advice. Instead, it gives the user a practical first-level estimate that is easier to understand than raw formula work. For many users, that first level of clarity is exactly what they need.
            </p>
            <p>
              From a utility and SEO point of view, HRA pages have long-term value because salary planning is evergreen. Employees revisit these calculations when rents change, jobs change, cities change, or salary structures are updated. That repeat use makes the page useful over time. A calculator that turns a confusing rule into a fast, readable estimate becomes a page people can actually return to, and that is the kind of usefulness that gives it lasting value.
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
