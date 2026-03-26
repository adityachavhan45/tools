"use client";

import { useMemo, useState } from "react";
import ToolSection from "../components/ToolSection";

const sections = [
  {
    heading: "What Notice Period Buyout Calculator Does",
    paragraphs: [
      "Notice Period Buyout Calculator estimates the amount that may be payable when an employee does not serve the full notice period.",
      "It turns monthly salary and remaining notice days into a clearer estimate for exit planning and salary settlement discussions.",
    ],
  },
  {
    heading: "Who Should Use This Tool",
    paragraphs: [
      "This tool is useful for employees changing jobs, HR teams doing rough calculations, and anyone trying to understand notice pay exposure.",
      "It is especially useful when users want a quick estimate before reading detailed policy documents.",
    ],
  },
  {
    heading: "How to Use This Calculator",
    paragraphs: [
      "Enter monthly salary, total notice period, days already served, and any extra recovery. The calculator estimates daily salary, remaining notice days, and total buyout amount.",
      "This simple workflow helps users compare different exit timing scenarios quickly.",
    ],
  },
  {
    heading: "Why Notice Buyout Matters",
    paragraphs: [
      "Notice buyout can affect final settlement, cash planning, and joining timelines for the next role. A quick estimate helps reduce confusion during transitions.",
      "It also helps users think more clearly about whether serving more days can reduce the final recovery amount.",
    ],
  },
  {
    heading: "Important Assumptions",
    paragraphs: [
      "This calculator uses a simple daily salary estimate based on a 30-day month. Real company policies may use different salary components or settlement rules.",
      "That means the result should be used for planning and discussion, not as an official final settlement figure.",
    ],
  },
  {
    heading: "Best Practices for Better Estimates",
    paragraphs: [
      "Use the same salary basis that your company uses for notice recovery if you know it. Some employers use only certain salary components instead of full gross salary.",
      "The more accurate the salary basis and notice days are, the more useful the estimate becomes.",
    ],
  },
];

const faq = [
  {
    question: "What does a notice period buyout calculator do?",
    answer:
      "It estimates the amount linked to unserved notice days using monthly salary and notice period details. This helps users plan exits more confidently.",
  },
  {
    question: "Can I enter days already served?",
    answer:
      "Yes, the calculator subtracts served days from total notice days to estimate the remaining buyout amount.",
  },
  {
    question: "Can I add extra recovery?",
    answer:
      "Yes, you can include another fixed recovery amount if your company applies one in addition to notice pay.",
  },
  {
    question: "Is the result official?",
    answer:
      "No, it is only a planning estimate. Final settlement depends on company policy, contract terms, and payroll treatment.",
  },
  {
    question: "Is this free to use?",
    answer:
      "Yes, the Notice Period Buyout Calculator is free to use online.",
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

export default function NoticePeriodBuyoutCalculatorPage() {
  const [monthlySalary, setMonthlySalary] = useState(90000);
  const [noticeDays, setNoticeDays] = useState(60);
  const [servedDays, setServedDays] = useState(30);
  const [extraRecovery, setExtraRecovery] = useState(0);

  const result = useMemo(() => {
    const salary = Math.max(0, sanitizeNumber(monthlySalary));
    const totalDays = Math.max(0, sanitizeNumber(noticeDays));
    const completedDays = Math.max(0, sanitizeNumber(servedDays));
    const extra = Math.max(0, sanitizeNumber(extraRecovery));
    const perDaySalary = salary / 30;
    const remainingDays = Math.max(0, totalDays - completedDays);
    const buyoutAmount = perDaySalary * remainingDays + extra;

    return {
      perDaySalary,
      remainingDays,
      buyoutAmount,
    };
  }, [extraRecovery, monthlySalary, noticeDays, servedDays]);

  const validationMessage = useMemo(() => {
    if (sanitizeNumber(monthlySalary) < 0) return "Monthly salary cannot be negative.";
    if (sanitizeNumber(noticeDays) < 0) return "Notice period days cannot be negative.";
    if (sanitizeNumber(servedDays) < 0) return "Served days cannot be negative.";
    if (sanitizeNumber(servedDays) > sanitizeNumber(noticeDays)) return "Served days cannot be more than total notice days.";
    if (sanitizeNumber(extraRecovery) < 0) return "Extra recovery cannot be negative.";
    return "";
  }, [extraRecovery, monthlySalary, noticeDays, servedDays]);

  return (
    <ToolSection
      title="Notice Period Buyout Calculator"
      subtitle="Estimate notice pay using monthly salary, total notice days, served days, and any extra recovery amount."
    >
      <div className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Monthly Salary</label>
            <input type="number" value={monthlySalary} onChange={(e) => setMonthlySalary(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900" placeholder="Monthly salary" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Total Notice Period (Days)</label>
            <input type="number" value={noticeDays} onChange={(e) => setNoticeDays(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900" placeholder="Total notice period" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Days Already Served</label>
            <input type="number" value={servedDays} onChange={(e) => setServedDays(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900" placeholder="Served days" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Extra Recovery Amount</label>
            <input type="number" value={extraRecovery} onChange={(e) => setExtraRecovery(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900" placeholder="Extra recovery" />
          </div>
        </div>

        {validationMessage ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {validationMessage}
          </div>
        ) : (
          <p className="text-sm text-gray-600">
            This tool uses a simple 30-day salary basis for estimation. Actual company notice recovery may differ.
          </p>
        )}

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-blue-50 p-5">
            <p className="text-sm font-medium text-blue-900">Estimated Daily Salary</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{formatCurrency(result.perDaySalary)}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-amber-50 p-5">
            <p className="text-sm font-medium text-amber-900">Remaining Notice Days</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{result.remainingDays}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-green-50 p-5">
            <p className="text-sm font-medium text-green-900">Estimated Buyout Amount</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{formatCurrency(result.buyoutAmount)}</p>
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
          <h2 className="text-2xl font-bold text-gray-900">Detailed Guide to Notice Period Buyout</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-700 sm:text-base">
            <p>
              Notice Period Buyout Calculator helps users estimate the cost of leaving a company before completing the full notice period. This is one of the most practical salary-transition questions during a job change because timing, recovery amount, and final settlement can all depend on the number of notice days served. Many employees know the notice period mentioned in the offer or employment contract, but they do not always know how much it may cost if they leave early. That is why a fast calculator is useful.
            </p>
            <p>
              In a typical notice buyout situation, the key inputs are monthly salary, total notice period, and the number of days already served. Some cases may also include another fixed recovery component, which is why this page supports an extra recovery value as well. Once those inputs are clear, the calculator estimates daily salary, remaining notice days, and final buyout amount. This turns a confusing HR topic into a much simpler planning view.
            </p>
            <p>
              This page is especially useful for professionals who are switching jobs under time pressure. Sometimes a new employer wants an earlier joining date, while the current company expects the employee to complete a longer notice period. In that situation, the user usually wants a quick estimate before negotiating with HR or deciding whether an early exit is worth the cost. A practical notice period buyout page makes that decision easier because it puts the likely recovery amount in front of the user immediately.
            </p>
            <p>
              Another reason this tool matters is settlement planning. Employees often focus only on the next salary package and forget that notice recovery can affect final cash flow. If the person leaves early, the company may recover salary linked to unserved notice days. That can influence how much money the employee actually receives in the final month or final settlement. By using this tool, the user can estimate that effect in advance and plan more carefully.
            </p>
            <p>
              There are also common mistakes this page helps reduce. One is assuming notice recovery always uses full monthly gross salary, when some employers may use only selected salary components. Another mistake is forgetting to account for days already served, which can significantly reduce the final amount. Some users also underestimate how much a shortfall of even a few days can change the settlement. A dedicated calculator makes these moving parts easier to understand.
            </p>
            <p>
              It is important to keep expectations realistic. This tool uses a simple 30-day monthly salary basis and is designed for estimation. Different employers may have different policies, contractual language, salary components, and payroll treatment. That means the result should be treated as a planning number rather than an official final settlement amount. Even so, the page remains highly useful because most users first need a quick estimate, not a legal document.
            </p>
            <p>
              Notice period buyout is also a strong evergreen topic for utility sites because job transitions happen all the time. Professionals revisit this need whenever they switch companies, discuss early release, or compare joining dates. A page that clearly explains the idea and gives a fast estimate can become genuinely useful over time. That mix of immediate practicality and repeat relevance is exactly what makes a notice period buyout calculator worth adding to a salary and career tools collection.
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
