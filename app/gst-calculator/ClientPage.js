"use client";

import { useMemo, useState } from "react";
import ToolSection from "../components/ToolSection";

const sections = [
  {
    heading: "What GST Calculator Does and Why It Matters",
    paragraphs: [
      "GST Calculator helps users add GST to a base amount or remove GST from an inclusive amount without manual percentage work. It gives a fast tax breakdown that is easy to read.",
      "This matters because tax-inclusive and tax-exclusive amounts often create confusion in daily business work.",
      "A simple calculator is useful because tax calculations are usually small but frequent tasks. People do not want to stop work every time and calculate percentages manually when a fast and clear online result can solve the problem in seconds.",
    ],
  },
  {
    heading: "Who Should Use GST Calculator",
    paragraphs: [
      "This tool is useful for shop owners, freelancers, accountants, buyers, sellers, and students who need quick GST calculations.",
      "It is especially useful for people who want a basic answer fast without opening spreadsheets or doing manual math.",
      "It can also help users who are checking invoices, quotes, or pricing ideas before sending them to someone else. In those moments, a quick tax breakdown is often more useful than a complex accounting workflow.",
    ],
  },
  {
    heading: "How to Use GST Calculator Step by Step",
    paragraphs: [
      "Enter the amount, choose whether to add GST or remove GST, then set the GST rate. The breakdown appears immediately.",
      "This simple flow helps users understand both the tax portion and the final amount right away.",
      "A smart approach is to first confirm whether the source amount already includes GST. Once that is clear, the calculator becomes much easier to use and the final numbers are more likely to be useful in real work.",
    ],
  },
  {
    heading: "Common Mistakes and How to Avoid Them",
    paragraphs: [
      "A common mistake is using the wrong mode, especially when the entered amount already includes GST. Another issue is applying the wrong tax rate.",
      "It is important to confirm whether the source amount is inclusive or exclusive before checking the result.",
      "Another common mistake is treating the result like a complete tax workflow when it is really a quick calculator. For complex business cases, the calculator is helpful for speed, but users should still apply proper invoice and accounting rules separately.",
    ],
  },
  {
    heading: "Why This Tool Has Long-Term Value",
    paragraphs: [
      "Tax calculations are a repeat need in business and personal transactions. That makes a GST calculator an evergreen and practical tool.",
      "Users often return to this kind of page because it solves a routine task quickly and clearly.",
      "This long-term value is strongest on utility websites because GST calculations are relevant to recurring buying, selling, billing, and record-checking work. The need is not tied to a short trend, so the tool stays useful over time.",
    ],
  },
  {
    heading: "Best Practices for Better Results",
    paragraphs: [
      "Always confirm whether the amount already includes GST, choose the correct rate, and review the breakdown before using the result on invoices or records.",
      "This calculator is a fast helper, but detailed accounting cases may still need professional review.",
      "It is also wise to keep your business workflow consistent. If one team uses inclusive prices and another uses exclusive prices, confusion grows quickly. A calculator helps most when the user is clear about the pricing method from the start.",
    ],
  },
];

const faq = [
  { question: "What does a GST calculator do?", answer: "It calculates GST by adding tax to a base amount or removing tax from an inclusive amount. The goal is to show the tax portion and total amount clearly so users can understand pricing faster." },
  { question: "Can I remove GST from a total amount?", answer: "Yes, this calculator supports both add and remove GST modes. That makes it useful for users working with tax-exclusive base values and also for users who already have a tax-inclusive total." },
  { question: "Can I use a custom GST rate?", answer: "Yes, you can enter your own rate. This flexibility helps because users may work across different categories, products, or billing situations where the percentage can vary." },
  { question: "Is this GST calculator free?", answer: "Yes, it is free to use online. It is built for quick day-to-day use without sign-up, installation, or any complex setup." },
  { question: "Does this replace professional tax advice?", answer: "No, it is a quick calculator for estimation and basic breakdowns. For official filing, accounting treatment, or complex edge cases, users should still rely on proper professional guidance where needed." },
];

function formatAmount(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value || 0);
}

function sanitizeNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function GstCalculatorPage() {
  const [mode, setMode] = useState("add");
  const [amount, setAmount] = useState(1000);
  const [rate, setRate] = useState(18);

  const result = useMemo(() => {
    const numericAmount = Math.max(0, sanitizeNumber(amount));
    const numericRate = Math.max(0, sanitizeNumber(rate));
    if (mode === "add") {
      const gstAmount = (numericAmount * numericRate) / 100;
      return {
        baseAmount: numericAmount,
        gstAmount,
        totalAmount: numericAmount + gstAmount,
      };
    }

    const baseAmount = numericAmount / (1 + numericRate / 100);
    const gstAmount = numericAmount - baseAmount;
    return {
      baseAmount,
      gstAmount,
      totalAmount: numericAmount,
    };
  }, [amount, mode, rate]);

  const validationMessage = useMemo(() => {
    if (sanitizeNumber(amount) < 0) return "Amount cannot be negative.";
    if (sanitizeNumber(rate) < 0) return "GST rate cannot be negative.";
    if (sanitizeNumber(rate) > 100) return "GST rate looks too high. Please check the value.";
    return "";
  }, [amount, rate]);

  return (
    <ToolSection title="GST Calculator" subtitle="Add or remove GST instantly using a simple calculator with rate selection and clear breakdown.">
      <div className="space-y-5">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Calculation Type</label>
            <select value={mode} onChange={(e) => setMode(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900">
              <option value="add">Add GST</option>
              <option value="remove">Remove GST</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Amount</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400" placeholder="Amount" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">GST Rate (%)</label>
            <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400" placeholder="GST rate" />
          </div>
        </div>
        {validationMessage ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {validationMessage}
          </div>
        ) : null}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-blue-50 p-5">
            <p className="text-sm font-medium text-blue-900">Base Amount</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{formatAmount(result.baseAmount)}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-green-50 p-5">
            <p className="text-sm font-medium text-green-900">GST Amount</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{formatAmount(result.gstAmount)}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-purple-50 p-5">
            <p className="text-sm font-medium text-purple-900">Total Amount</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{formatAmount(result.totalAmount)}</p>
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
