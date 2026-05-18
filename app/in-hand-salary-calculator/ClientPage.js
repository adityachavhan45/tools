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
      plain
      whiteBackground
      hideSidebar
      centerHeader
    >
      <div className="mx-auto w-full max-w-5xl space-y-5">
        <div className="rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-5 sm:p-6 shadow-sm">
          <h1 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-700">
            In-Hand Salary Calculator Tool
          </h1>
          <p className="mt-2 text-center text-sm sm:text-base text-slate-600">
            Get a quick monthly take-home estimate with PF, tax, and deduction breakup.
          </p>
        </div>

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

      <div className="mx-auto mt-8 w-full max-w-5xl space-y-8">
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
    Understanding Real Monthly Salary After Deductions
  </h2>

  <div className="mt-4 space-y-4 text-sm leading-7 text-gray-700 sm:text-base">
    <p>
      Salary discussions often focus on big annual package numbers, but most employees care about something much simpler: how much money actually reaches their bank account every month. That real usable amount is known as in-hand salary or take-home salary. It is the amount left after deductions like employee provident fund, taxes, professional tax, insurance, and other payroll-related cuts are removed from the gross salary. Understanding this number properly helps employees make smarter financial decisions and avoid confusion during job changes or salary negotiations.
    </p>

    <p>
      Many people become excited after receiving an offer letter because the total package looks attractive at first glance. However, the actual monthly amount available for spending may feel lower than expected once deductions begin. This happens because companies often structure salaries using different components such as allowances, bonuses, retirement contributions, and benefits. Some parts improve the overall package value but do not directly increase monthly spendable income. That is why understanding take-home salary is more practical than focusing only on yearly CTC numbers.
    </p>

    <p>
      This calculator is designed to simplify salary understanding for everyday users. Instead of manually calculating deductions using spreadsheets or complicated formulas, users can quickly enter salary details and estimate monthly in-hand income within seconds. This makes the tool useful for freshers, experienced professionals, freelancers comparing offers, and employees planning monthly budgets.
    </p>

    <p>
      One of the biggest advantages of calculating in-hand salary properly is financial planning. People often create budgets based on expected income, but incorrect assumptions can lead to overspending or poor savings management. Rent, transportation, investments, EMI payments, groceries, subscriptions, and emergency savings all depend on realistic monthly income. When users know their actual take-home salary, they can plan expenses more responsibly and avoid financial stress later.
    </p>

    <p>
      Salary structure also affects long-term savings and tax planning. Two companies may offer similar salary packages, but their payroll structures can create completely different monthly outcomes. One company may include higher allowances and lower deductions, while another may place a larger percentage into retirement-related components. This is why comparing only annual salary figures can sometimes be misleading.
    </p>

    <p>
      Professionals switching jobs often use salary calculators before accepting offers. A slightly lower package with better monthly take-home income can sometimes provide more immediate financial comfort than a higher package filled with complex deductions. This becomes especially important for employees relocating to expensive cities where monthly living costs are significantly higher.
    </p>

    <p>
      People also use salary estimation tools while preparing for career growth decisions. Before requesting increments or changing companies, employees often want to understand how much salary increase is actually meaningful after deductions. A large-looking increment may create only a small difference in monthly usable income once taxes and payroll cuts are applied. Calculating take-home salary helps users view salary growth more realistically.
    </p>

    <p>
      Another common reason users check in-hand salary is tax awareness. Many employees only notice deductions after receiving their first payslip. Understanding how deductions affect monthly income helps users become more financially informed. Instead of being surprised every month, they can understand why specific amounts are being reduced and how payroll systems work.
    </p>

    <p>
      Some employees also compare salary structures while planning investments or loans. Banks usually evaluate repayment capacity using monthly in-hand income instead of total package value. Whether someone wants to buy a house, apply for a car loan, or manage monthly SIP investments, understanding real take-home salary becomes extremely important for safe financial planning.
    </p>

    <p>
      Users who manage budgets regularly often combine salary estimation with tools like{" "}
      <a
        href="https://convertixy.com/loan-calculator"
        className="text-blue-600 hover:underline font-medium"
      >
        Loan Calculator
      </a>{" "}
      to estimate monthly repayment affordability before taking financial commitments.
    </p>

    <p>
      Fresh graduates entering the workforce sometimes misunderstand the difference between gross salary and monthly credited salary. Since campus placement discussions usually focus on annual packages, many students assume the full amount gets divided equally every month. In reality, deductions and salary structures change the actual credited amount significantly. Tools like this help freshers understand salary structures more clearly before joining companies.
    </p>

    <p>
      Another practical use case appears during relocation planning. Employees moving to metropolitan cities often need to calculate whether their salary will comfortably cover higher living costs. Rent, transportation, food, utilities, and personal expenses vary greatly between locations. Knowing the exact monthly take-home amount allows users to decide whether relocation financially makes sense.
    </p>

    <p>
      Many professionals also calculate salary after tax to estimate yearly savings potential. Even a moderate difference in deductions can impact annual savings by a noticeable amount. Employees who actively track income and expenses generally make stronger financial decisions compared to people who only focus on headline salary numbers.
    </p>

    <p>
      People interested in deeper salary breakdowns sometimes use{" "}
      <a
        href="https://convertixy.com/salary-after-tax-calculator"
        className="text-blue-600 hover:underline font-medium"
      >
        Salary After Tax Calculator
      </a>{" "}
      to understand how taxation impacts overall monthly income.
    </p>

    <p>
      It is also important to understand that payroll structures are not identical across companies. Some organizations provide flexible benefits, while others include fixed salary structures with limited customization. Certain employers may include performance bonuses or variable pay components that are not guaranteed every month. Because of these differences, employees should always review salary structures carefully instead of relying only on package announcements.
    </p>

    <p>
      Small recurring deductions are another area people often ignore. Individually, professional tax, PF contributions, insurance cuts, and miscellaneous deductions may seem minor. However, together they can significantly reduce final monthly salary. Over an entire year, these deductions can add up to a surprisingly large amount.
    </p>

    <p>
      Budget-conscious users often calculate future savings alongside monthly income. Many combine salary planning with tools such as{" "}
      <a
        href="https://convertixy.com/sip-calculator"
        className="text-blue-600 hover:underline font-medium"
      >
        SIP Calculator
      </a>{" "}
      to estimate how regular investments may grow over time using monthly surplus income.
    </p>

    <p>
      Another mistake people make is depending on rough guesses instead of accurate calculations. Friends, online discussions, and unofficial salary comparisons may provide misleading expectations because deductions vary depending on salary structure, company policies, tax regimes, and payroll systems. Using a calculator provides a more realistic estimate and reduces confusion.
    </p>

    <p>
      Professionals working in different industries may also notice differences in salary handling. Some sectors provide higher variable pay, while others offer stronger fixed salary structures. Employees comparing industries should focus not only on annual compensation but also on monthly financial comfort and long-term savings opportunities.
    </p>

    <p>
      Users trying to manage yearly tax planning sometimes combine take-home salary analysis with{" "}
      <a
        href="https://convertixy.com/hra-calculator"
        className="text-blue-600 hover:underline font-medium"
      >
        HRA Calculator
      </a>{" "}
      to better understand housing-related salary components and tax benefits.
    </p>

    <p>
      One important thing to remember is that this calculator provides estimation-based results. Actual salary slips may include company-specific benefits, reimbursements, joining bonuses, retention payouts, incentives, or other adjustments. Still, quick salary estimation remains extremely useful because it answers the most important question employees usually have: how much usable money will actually arrive every month?
    </p>

    <p>
      Modern salary planning is not only about earning more money. It is also about understanding deductions, managing expenses wisely, building savings habits, and making smarter financial decisions over time. A clear understanding of take-home salary helps users approach compensation discussions with greater confidence and practical awareness.
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
