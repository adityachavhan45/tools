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
      plain
      hideSidebar
      centerHeader
      whiteBackground
    >
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div className="rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-5 sm:p-6 shadow-sm">
          <h1 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-700">
            Notice Period Buyout Calculator Tool
          </h1>
          <p className="mt-2 text-center text-sm sm:text-base text-slate-600">
            Estimate buyout amount using salary, notice days, served days, and extra recovery.
          </p>
        </div>

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

        <section className="mx-auto mt-12 sm:mt-14 w-full max-w-5xl p-5 sm:p-6 md:p-8 bg-white shadow-md rounded-2xl border border-slate-200">
  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 border-b border-slate-200 pb-3">
    Understanding Notice Period Buyout During a Job Change
  </h2>

  <div className="space-y-4 text-sm sm:text-base leading-7 text-slate-700">
    <p className="text-justify">
      Changing jobs is one of the biggest career decisions for working professionals, and notice period management becomes an important part of that transition. Many employees focus mainly on salary hikes, joining bonuses, or better opportunities, but they often overlook how notice period recovery can affect their final settlement. When a person leaves an organisation before completing the required notice duration, the company may recover salary for the remaining unserved days. This process is commonly known as notice period buyout.
    </p>

    <p className="text-justify">
      A Notice Period Buyout Calculator helps users estimate how much money may be recovered if they leave earlier than the officially required notice timeline. Instead of manually calculating daily salary and remaining notice days, the tool simplifies the process instantly. This becomes extremely useful during job switching because professionals often need quick estimates before negotiating early release with HR teams or planning joining dates with new employers.
    </p>

    <p className="text-justify">
      In most cases, users only need a few important details to estimate the buyout amount. These commonly include monthly salary, total notice period duration, and the number of days already served. Some companies may additionally recover fixed charges or special recovery components depending on employment contracts, which is why many employees prefer calculators that support extra recovery values as part of the estimation process.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Why Notice Period Policies Matter So Much
    </h3>

    <p className="text-justify">
      Notice periods exist mainly to help companies manage employee exits smoothly without sudden workflow disruptions. Organisations often require employees to continue working for a fixed duration after resignation so teams can complete knowledge transfer, recruitment replacement planning, project handovers, and transition activities properly.
    </p>

    <p className="text-justify">
      However, real job market situations are not always flexible. A new employer may request immediate joining, while the current organisation may insist on serving the complete notice period. This creates pressure for employees who are trying to balance career growth opportunities with company exit policies.
    </p>

    <p className="text-justify">
      In such situations, notice period buyout becomes an alternative solution where the employee compensates the organisation financially for the unserved portion of the notice duration. Understanding this cost in advance helps professionals make more informed decisions during negotiations.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      How This Notice Period Buyout Calculator Works
    </h3>

    <p className="text-justify">
      This calculator estimates the financial impact of leaving before completing the full notice duration. The tool first calculates approximate daily salary using a simplified monthly salary basis. It then checks how many notice days remain after subtracting already served days from the total required notice period.
    </p>

    <p className="text-justify">
      Once the remaining notice duration becomes clear, the calculator estimates the amount that may be recovered based on the unserved days. If additional recovery charges exist, they can also be included to generate a more realistic estimate.
    </p>

    <p className="text-justify">
      Since everything works directly inside the browser, users can instantly test different scenarios without complicated spreadsheets or manual calculations. This makes the experience simple even for professionals with limited payroll or HR knowledge.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Why Early Exit Planning Is Financially Important
    </h3>

    <p className="text-justify">
      Employees often focus only on the salary offered by the new company while ignoring the financial effect of an early resignation. Notice period recovery can significantly reduce final settlement amounts, especially for employees with longer notice periods or higher salaries.
    </p>

    <p className="text-justify">
      Proper planning becomes important because final month cash flow may change after salary recovery adjustments. Some users discover much later that their expected settlement amount was lower due to notice buyout deductions they had not estimated earlier.
    </p>

    <p className="text-justify">
      Professionals planning salary transitions often combine settlement estimation with the <a href="https://convertixy.com/in-hand-salary-calculator" className="text-blue-600 hover:underline font-medium">In Hand Salary Calculator</a> to understand how monthly income and deductions may affect their financial planning during a job switch.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Common Factors That Influence Buyout Amounts
    </h3>

    <p className="text-justify">
      Notice period buyout calculations are not always identical across companies because organisations may follow different payroll structures and HR policies. Some employers calculate recovery using gross salary, while others may consider only basic salary or selected salary components.
    </p>

    <p className="text-justify">
      Certain companies may also include allowances, variable pay structures, or contractual clauses while estimating final recovery amounts. The number of notice days already completed can also significantly reduce the total buyout amount.
    </p>

    <p className="text-justify">
      These variations are exactly why estimation tools are useful. Even though final payroll processing may differ between organisations, a quick estimate helps employees understand approximate recovery impact before discussing release terms with HR departments.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Why Employees Negotiate Early Release
    </h3>

    <p className="text-justify">
      Early release requests are common in competitive industries where companies want faster onboarding for selected candidates. New employers sometimes prefer immediate availability because projects, client requirements, or urgent team expansion plans require quicker joining dates.
    </p>

    <p className="text-justify">
      Employees may also request shorter notice durations because of relocation needs, higher salary opportunities, career growth plans, educational goals, or personal situations. In many cases, companies partially waive notice periods after negotiation if transition activities are completed efficiently.
    </p>

    <p className="text-justify">
      Understanding estimated buyout costs beforehand gives employees stronger confidence during such negotiations because they can evaluate whether paying recovery charges feels financially reasonable compared to waiting longer before joining the new company.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Important Things Employees Should Check Before Resigning
    </h3>

    <p className="text-justify">
      Before submitting resignation, employees should carefully review employment contracts, HR policy documents, and appointment letters to understand notice period rules properly. It is important to check whether the organisation allows buyout options or mandatory full notice completion.
    </p>

    <p className="text-justify">
      Employees should also confirm how salary recovery is calculated because different companies may use different payroll structures. Some organisations may permit leave adjustment against notice periods, while others may not.
    </p>

    <p className="text-justify">
      Professionals comparing compensation changes during job transitions may additionally use the <a href="https://convertixy.com/salary-after-tax-calculator" className="text-blue-600 hover:underline font-medium">Salary After Tax Calculator</a> to estimate how overall monthly income changes after joining a new organisation.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Why Browser Based Financial Tools Feel More Convenient
    </h3>

    <p className="text-justify">
      Browser based calculators have become popular because they provide instant accessibility without requiring software installation or registration. Users can quickly open the tool on desktop or mobile devices and test different notice scenarios within seconds.
    </p>

    <p className="text-justify">
      This Notice Period Buyout Calculator works directly inside the browser, making calculations fast and lightweight. Users can repeatedly modify salary values, notice durations, and served days to compare multiple outcomes easily.
    </p>

    <p className="text-justify">
      Financial planning workflows often involve several calculations together. Some users also use the <a href="https://convertixy.com/percentage-calculator" className="text-blue-600 hover:underline font-medium">Percentage Calculator</a> while analysing salary hikes, joining bonuses, or compensation differences during career transitions.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Privacy Benefits of Local Browser Calculations
    </h3>

    <p className="text-justify">
      Salary information and resignation planning are sensitive topics for many professionals. Browser based tools help improve privacy because users can estimate calculations without uploading confidential financial details to external systems unnecessarily.
    </p>

    <p className="text-justify">
      Since this calculator processes everything locally inside the browser, entered salary values and notice details remain on the user device during usage. No external processing is required before generating results.
    </p>

    <p className="text-justify">
      This local calculation approach also improves speed because results appear instantly without depending on server communication or cloud processing systems.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Practical Benefits of Estimating Buyout Costs Early
    </h3>

    <p className="text-justify">
      Employees who estimate notice buyout costs early often make better financial decisions during career changes. Instead of reacting emotionally to urgent joining requests, they can compare actual recovery amounts against expected salary gains from the new role.
    </p>

    <p className="text-justify">
      Early estimation also helps avoid misunderstandings during final settlement discussions because employees already have approximate expectations before payroll calculations are completed officially.
    </p>

    <p className="text-justify">
      Users planning broader financial goals alongside career transitions sometimes additionally use the <a href="https://convertixy.com/sip-calculator" className="text-blue-600 hover:underline font-medium">SIP Calculator</a> while balancing salary growth, savings planning, and long term financial management together.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Final Thoughts on Using a Notice Period Buyout Calculator
    </h3>

    <p className="text-justify">
      Notice period buyout estimation has become an important part of modern job transition planning because many professionals now switch companies more frequently for better opportunities, salary growth, and career advancement.
    </p>

    <p className="text-justify">
      This browser based Notice Period Buyout Calculator helps simplify what often feels like a confusing HR and payroll topic by providing quick estimation support for unserved notice recovery amounts. Users can compare scenarios instantly without manual calculations or spreadsheet complexity.
    </p>

    <p className="text-justify">
      Whether you are negotiating an early release, planning your next joining date, estimating final settlement impact, or simply understanding your employment obligations more clearly, a practical notice period buyout calculator can help create more informed and financially aware career decisions.
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
      </div>
    </ToolSection>
  );
}
