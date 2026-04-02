import {
  buildMetadata,
  buildToolJsonLd,
  buildHowToJsonLd,
  buildFaqJsonLd,
  buildBreadcrumbJsonLd,
} from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import ClientPage from "./ClientPage";

export const metadata = buildMetadata({
  title:
    "Salary After Tax Calculator Online Calculate Annual and Monthly Net Income Free 2026",
  description:
    "Calculate your exact salary after tax instantly with our free online Salary After Tax Calculator. Enter gross salary, tax rate and deductions to get accurate annual and monthly net income estimates. Perfect for salaried employees and job seekers. No signup needed!",
  slug: "/salary-after-tax-calculator",
  focusKeyword: "Salary After Tax Calculator Online Free",
  keywords: [
    "salary after tax calculator",
    "net salary calculator",
    "after tax salary calculator",
    "salary tax calculator",
    "take home salary calculator",
    "salary after deductions calculator",
    "salary estimator after tax",
    "monthly net salary calculator",
    "annual net salary calculator",
    "free salary after tax calculator",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildToolJsonLd({
            name: "Salary After Tax Calculator Online",
            description:
              "Free salary after tax calculator to estimate annual and monthly net salary after tax and deductions.",
            slug: "/salary-after-tax-calculator",
            category: "Calculators",
          }),
          buildBreadcrumbJsonLd([
            { name: "Home", slug: "/" },
            { name: "Salary After Tax Calculator", slug: "/salary-after-tax-calculator" },
          ]),
          buildHowToJsonLd({
            name: "How to Calculate Salary After Tax Online",
            description:
              "Enter gross salary, tax rate, and annual deductions to estimate your annual and monthly net salary.",
            steps: [
              { name: "Enter gross salary", text: "Add your annual gross salary before tax." },
              { name: "Set tax rate", text: "Enter the estimated tax percentage you want to apply." },
              { name: "Add deductions", text: "Include any extra annual deductions if needed." },
              { name: "Review net salary", text: "Check annual tax, total deductions, and net monthly salary." },
            ],
          }),
          buildFaqJsonLd([
            {
              question: "What does a salary after tax calculator do?",
              answer:
                "It estimates how much salary remains after applying tax and extra deductions to gross income.",
            },
            {
              question: "Is this salary after tax result exact?",
              answer:
                "No, it is an estimate for planning. Exact tax treatment depends on your location, deductions, and payroll rules.",
            },
            {
              question: "Can I add other yearly deductions?",
              answer:
                "Yes, you can include an extra annual deduction amount to get a more practical estimate.",
            },
            {
              question: "Does this calculator show monthly net salary?",
              answer:
                "Yes, it shows both annual net salary and estimated monthly take-home amount.",
            },
            {
              question: "Is this Salary After Tax Calculator free?",
              answer: "Yes, this Salary After Tax Calculator is free to use online.",
            },
          ]),
        ]}
      />
      <ClientPage />
    </>
  );
}
