"use client";

import { useMemo, useState } from "react";
import ToolSection from "../components/ToolSection";

const sections = [
  {
    heading: "What Gratuity Calculator Does",
    paragraphs: [
      "Gratuity Calculator estimates a gratuity amount using last drawn monthly salary and total years of service. It helps users get a quick planning number without manual formula work.",
      "This is useful because gratuity is often discussed during job changes, long-term planning, and retirement conversations.",
    ],
  },
  {
    heading: "Who Should Use This Tool",
    paragraphs: [
      "This tool is useful for employees checking gratuity expectations, HR discussions, and general compensation planning.",
      "It is also helpful for people who want a rough gratuity idea before making a formal request or verifying with payroll.",
    ],
  },
  {
    heading: "How to Use Gratuity Calculator",
    paragraphs: [
      "Enter your last drawn monthly salary and the number of completed years of service. The calculator estimates the gratuity amount and shows whether the input meets the common service threshold.",
      "A simple calculator like this is practical because users usually want a fast answer first before going into detailed payroll verification.",
    ],
  },
  {
    heading: "Why Service Period Matters",
    paragraphs: [
      "Years of service play a major role in gratuity estimation. Even a good salary figure will not produce a meaningful estimate unless the service period is entered correctly.",
      "That is why users should always confirm completed service length carefully before relying on the result.",
    ],
  },
  {
    heading: "Important Limitations",
    paragraphs: [
      "This calculator is for estimation and planning. Final gratuity treatment can depend on employment terms, employer policy, and applicable legal interpretation.",
      "Users should treat the result as a practical estimate and confirm the final amount through official payroll or HR channels.",
    ],
  },
  {
    heading: "Best Practices for Better Estimates",
    paragraphs: [
      "Use the correct salary component and completed service duration instead of rough guesses. Small changes in these inputs can change the estimated gratuity amount meaningfully.",
      "The best approach is to use this tool for quick planning and then verify with exact salary records later.",
    ],
  },
];

const faq = [
  {
    question: "What does a gratuity calculator do?",
    answer:
      "It estimates gratuity based on last drawn salary and years of service. This helps users get a quick planning number without manual calculation.",
  },
  {
    question: "Does service period matter?",
    answer:
      "Yes, service period is one of the most important parts of gratuity estimation. The result changes based on completed years of service.",
  },
  {
    question: "Is this result exact?",
    answer:
      "No, it is an estimate for planning. Actual gratuity treatment may depend on employer policy and official payroll rules.",
  },
  {
    question: "Can I use it before leaving a job?",
    answer:
      "Yes, many users check gratuity estimates before job changes or long-term financial planning decisions.",
  },
  {
    question: "Is this free to use?",
    answer:
      "Yes, the Gratuity Calculator is free to use online.",
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

export default function GratuityCalculatorPage() {
  const [lastDrawnSalary, setLastDrawnSalary] = useState(50000);
  const [yearsOfService, setYearsOfService] = useState(7);

  const result = useMemo(() => {
    const salary = Math.max(0, sanitizeNumber(lastDrawnSalary));
    const years = Math.max(0, sanitizeNumber(yearsOfService));
    const gratuityAmount = (salary * 15 * years) / 26;
    const isEligible = years >= 5;

    return {
      gratuityAmount,
      isEligible,
    };
  }, [lastDrawnSalary, yearsOfService]);

  const validationMessage = useMemo(() => {
    if (sanitizeNumber(lastDrawnSalary) < 0) return "Last drawn salary cannot be negative.";
    if (sanitizeNumber(yearsOfService) < 0) return "Years of service cannot be negative.";
    return "";
  }, [lastDrawnSalary, yearsOfService]);

  return (
    <ToolSection
      title="Gratuity Calculator"
      subtitle="Estimate gratuity amount using last drawn salary and completed years of service with a quick in-browser calculator."
    >
      <div className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Last Drawn Monthly Salary</label>
            <input type="number" value={lastDrawnSalary} onChange={(e) => setLastDrawnSalary(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900" placeholder="Monthly salary" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Completed Years of Service</label>
            <input type="number" value={yearsOfService} onChange={(e) => setYearsOfService(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900" placeholder="Years of service" />
          </div>
        </div>

        {validationMessage ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {validationMessage}
          </div>
        ) : (
          <p className="text-sm text-gray-600">
            This calculator is for estimation. Final gratuity amount can depend on payroll records, policy, and applicable rules.
          </p>
        )}

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-blue-50 p-5">
            <p className="text-sm font-medium text-blue-900">Last Drawn Salary</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{formatCurrency(sanitizeNumber(lastDrawnSalary))}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-amber-50 p-5">
            <p className="text-sm font-medium text-amber-900">Eligibility Status</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{result.isEligible ? "Eligible" : "Check Policy"}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-green-50 p-5">
            <p className="text-sm font-medium text-green-900">Estimated Gratuity</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{formatCurrency(result.gratuityAmount)}</p>
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
          <h2 className="text-2xl font-bold text-gray-900">Detailed Guide to Gratuity Calculation</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-700 sm:text-base">
            <p>
              Gratuity Calculator is useful because gratuity is one of those salary-related topics that many employees hear about but do not always calculate confidently on their own. People usually start thinking about gratuity when they plan a long-term career move, discuss retirement benefits, or prepare to leave a company after years of service. In those moments, a quick and clear estimate is more useful than a complicated manual formula. This page is designed to provide that estimate instantly.
            </p>
            <p>
              The basic idea behind gratuity estimation is simple: the result depends on salary and completed years of service. Even though the formula itself is not very long, many users still prefer a calculator because they want speed, accuracy, and a cleaner presentation. Instead of working it out manually every time, they can enter their values and immediately see an estimated amount. That makes the tool practical for both personal use and basic HR-related review.
            </p>
            <p>
              A gratuity page matters because long-term employment benefits are often emotionally and financially important. Someone who has worked for several years may want to understand what kind of gratuity figure could be involved before making a job-switch decision. Another person may simply want to estimate future value as part of broader financial planning. In both situations, a straightforward calculator helps users move from uncertainty to a usable number much faster.
            </p>
            <p>
              The best way to use this tool is to enter the correct last drawn salary component and completed years of service. This helps generate a more useful estimate and reduces confusion. One common mistake is using the wrong salary figure or guessing service duration too loosely. Small input mistakes can create a noticeably different gratuity result. A clean calculator reduces manual errors, but the user still benefits from checking records before relying on the number.
            </p>
            <p>
              Another important point is expectation-setting. A gratuity calculator is helpful for planning, but it should not be treated like the final settlement statement from an employer. Official gratuity outcomes can depend on salary structure, employment records, company policy, and applicable legal interpretation. That does not reduce the value of the page. In fact, the main job of the tool is to give users a fast first estimate so they can think more clearly before formal review.
            </p>
            <p>
              This page also has long-term utility because gratuity remains an evergreen employment topic. Users revisit it during promotions, job changes, retirement planning, and financial review. Unlike trend-driven tools that lose value quickly, gratuity calculators solve a stable and repeated need. That makes them strong utility pages for a tools website. They answer a real question with minimal friction and help users get clarity without installing anything or opening a spreadsheet.
            </p>
            <p>
              In practical terms, the biggest strength of a gratuity tool is trust through simplicity. The user enters a few details, sees a quick estimate, and understands the result in a more tangible way. That experience matters because compensation planning often feels abstract until a number is made visible. A good calculator page turns that abstract question into something concrete, and that is exactly why a gratuity calculator earns a place among useful long-term finance and salary tools.
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
