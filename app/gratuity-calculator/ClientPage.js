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
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Last Drawn Monthly Salary</label>
              <input type="number" value={lastDrawnSalary} onChange={(e) => setLastDrawnSalary(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900" placeholder="Monthly salary" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Completed Years of Service</label>
              <input type="number" value={yearsOfService} onChange={(e) => setYearsOfService(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900" placeholder="Years of service" />
            </div>
          </div>

          {validationMessage ? (
            <div className="px-4 py-3 text-sm rounded-xl border border-red-200 bg-red-50 text-red-700 text-justify">
              {validationMessage}
            </div>
          ) : (
            <p className="text-sm text-gray-600">
              This calculator is for estimation. Final gratuity amount can depend on payroll records, policy, and applicable rules.
            </p>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          <div className="md:col-span-3 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-5">
            <p className="font-semibold text-blue-900 mb-2">Formula</p>
            <p className="text-blue-800 text-sm text-justify">
              Estimated Gratuity = (Last Drawn Monthly Salary × 15 × Completed Years of Service) ÷ 26
            </p>
          </div>
          <div className="md:col-span-2 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5">
            <p className="font-semibold text-amber-900 mb-2">Tip</p>
            <p className="text-amber-800 text-sm text-justify">
              Use accurate salary and completed service years for a better estimate. Final amount should be verified with payroll or HR.
            </p>
          </div>
        </div>

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

          <h2 className="text-2xl font-bold text-gray-900">
            Detailed Guide to Gratuity Calculation
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-700 sm:text-base">

            <p>
              The Gratuity Calculator helps employees estimate gratuity benefits based on salary
              and years of service. Gratuity is one of the most important long-term employment
              benefits because it rewards employees for continuous service within an organization.
              Many employees only start thinking seriously about gratuity during career changes,
              retirement planning, resignations, or financial preparation for the future.
            </p>

            <p>
              Even though gratuity formulas are publicly available, many people still prefer using
              a calculator because manual calculations can feel confusing, especially when salary
              structures and service durations vary. A calculator simplifies the process and
              instantly provides an estimated gratuity amount using the entered values.
            </p>

            <p>
              Long-term financial planning often involves multiple salary and investment factors.
              Employees planning future savings and retirement goals frequently compare gratuity
              estimates alongside the{" "}
              <a
                href="/compound-interest-calculator"
                className="text-blue-600 underline font-medium"
              >
                Compound Interest Calculator
              </a>{" "}
              to understand how savings and benefits may grow over time.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
              What Gratuity Actually Means
            </h3>

            <p>
              Gratuity is generally considered a financial benefit paid by an employer to an
              employee for long-term service. It acts as a reward for loyalty and continued
              employment within the organization.
            </p>

            <p>
              In many workplaces, gratuity becomes part of broader retirement and financial
              planning discussions because employees often depend on accumulated employment
              benefits while transitioning between jobs or preparing for retirement.
            </p>

            <p>
              Since gratuity depends heavily on completed service duration, employees often verify
              exact work timelines and age-related planning using the{" "}
              <a
                href="/age-calculator"
                className="text-blue-600 underline font-medium"
              >
                Age Calculator
              </a>{" "}
              while preparing financial estimates and long-term plans.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
              Why Employees Use Gratuity Calculators
            </h3>

            <p>
              Most users visit gratuity calculators because they want clarity before making
              financial or career decisions. Someone considering a job change may want to estimate
              whether leaving immediately or completing another year of service could affect
              gratuity value significantly.
            </p>

            <p>
              Others may simply want to estimate future benefits while planning investments,
              emergency funds, education expenses, or retirement savings. A quick estimate helps
              users make more informed decisions instead of relying on assumptions.
            </p>

            <p>
              Employees reviewing salary growth and financial planning often calculate monthly
              obligations alongside the{" "}
              
                EMI Calculator
             {" "}
              to compare liabilities against expected long-term employment benefits.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
              Importance of Accurate Inputs
            </h3>

            <p>
              The quality of the gratuity estimate depends heavily on correct inputs. Entering the
              wrong salary figure or incorrect service duration may generate inaccurate results.
              Even small mistakes can noticeably affect final estimates.
            </p>

            <p>
              Users should ideally verify official salary records and completed service periods
              before relying on the estimated amount. Proper records improve reliability and reduce
              confusion during financial discussions or HR-related planning.
            </p>

            <p>
              Employees organizing salary documents and downloadable employment reports often
              combine records using the{" "}
              <a
                href="/pdf-merge"
                className="text-blue-600 underline font-medium"
              >
                PDF Merge Tool
              </a>{" "}
              before sharing files digitally.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
              Gratuity and Financial Planning
            </h3>

            <p>
              Gratuity often becomes part of broader financial planning because employees may use
              the money for investments, retirement savings, debt repayment, home expenses, or
              emergency reserves.
            </p>

            <p>
              Long-term employees sometimes underestimate the financial value accumulated through
              gratuity until they calculate it directly. Seeing a projected amount helps users
              understand the practical value of continued service and structured employment
              benefits.
            </p>

            <p>
              Investors comparing future savings growth frequently use the{" "}
              <a
                href="/sip-calculator"
                className="text-blue-600 underline font-medium"
              >
                SIP Calculator
              </a>{" "}
              to estimate recurring investment growth alongside gratuity planning and retirement
              preparation.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
              Why Gratuity Remains an Evergreen Topic
            </h3>

            <p>
              Gratuity remains relevant because employment benefits are a permanent part of career
              and retirement discussions. Unlike trend-based financial topics, gratuity continues
              to matter across generations because employees regularly switch jobs, retire, or plan
              future finances.
            </p>

            <p>
              This makes gratuity calculators valuable long-term utility tools for salary planning
              and employment-related decision-making. Employees revisit these tools repeatedly
              during promotions, career transitions, salary negotiations, and retirement planning.
            </p>

            <p>
              Financial analysts and employees comparing salary increases sometimes calculate
              percentage growth and compensation changes using the{" "}
              <a
                href="/percentage-calculator"
                className="text-blue-600 underline font-medium"
              >
                Percentage Calculator
              </a>{" "}
              while evaluating long-term financial improvement.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
              Limitations of Gratuity Estimates
            </h3>

            <p>
              A gratuity calculator provides an estimate, not a final settlement statement. Actual
              gratuity payouts may depend on company policies, employment agreements, salary
              structure, legal interpretation, and official HR calculations.
            </p>

            <p>
              The purpose of the calculator is to provide users with a fast and understandable
              estimate so they can think more clearly about future financial decisions before
              formal review.
            </p>

            <p>
              Users should always confirm final settlement details with their employer or HR
              department before making major financial commitments based entirely on estimated
              results.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
              Why Online Salary Tools Save Time
            </h3>

            <p>
              Manual salary-related calculations can become repetitive and confusing, especially
              when users compare multiple financial scenarios. Online calculators simplify the
              process by generating quick estimates without requiring spreadsheets or complicated
              formulas.
            </p>

            <p>
              Browser-based financial tools improve convenience because users can instantly access
              them from mobile devices, desktops, or tablets without installing additional
              software.
            </p>

            <p>
              Employees sharing financial summaries, HR reports, or downloadable salary documents
              also generate accessible links using the{" "}
              <a
                href="/qr-code"
                className="text-blue-600 underline font-medium"
              >
                QR Code Generator
              </a>{" "}
              for easier cross-device access and document sharing.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
              Privacy and Browser-Based Processing
            </h3>

            <p>
              Privacy matters while working with salary and employment-related information. This
              Gratuity Calculator performs calculations directly inside the browser without
              requiring account registration or unnecessary uploads.
            </p>

            <p>
              Employees managing online payroll systems and financial accounts also improve account
              safety using the{" "}
              <a
                href="/password-generator"
                className="text-blue-600 underline font-medium"
              >
                Password Generator
              </a>{" "}
              and verify stronger credentials through the{" "}
              <a
                href="/password-strength-checker"
                className="text-blue-600 underline font-medium"
              >
                Password Strength Checker
              </a>{" "}
              before storing sensitive employment information online.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
              Final Thoughts
            </h3>

            <p>
              The Gratuity Calculator provides a simple and reliable way to estimate gratuity based
              on salary and years of service. It helps employees better understand long-term
              employment benefits and supports broader financial planning decisions.
            </p>

            <p>
              Instead of manually calculating service-based benefits, users can instantly estimate
              gratuity values while improving clarity around retirement planning, salary review,
              and future financial preparation. Long-term employment benefits may feel abstract
              until users see a practical number, and that is exactly where a gratuity calculator
              becomes genuinely useful.
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
