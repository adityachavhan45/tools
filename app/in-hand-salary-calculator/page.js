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
  title: "In Hand Salary Calculator Online Free | Calculate Take Home Salary",
  description:
    "Calculate your in hand salary instantly. Enter salary and deductions to get a clear monthly take home estimate with this free calculator.",
  slug: "/in-hand-salary-calculator",
  focusKeyword: "in hand salary calculator online",
  keywords: [
    "in hand salary calculator",
    "in hand salary calculator online",
    "take home salary calculator",
    "monthly in hand salary",
    "salary breakup calculator",
    "net salary calculator",
    "salary after deductions",
    "employee salary calculator",
    "take home pay calculator",
    "salary deduction calculator",
    "gross to net salary",
    "salary estimate tool",
    "monthly salary calculator",
    "income after tax calculator",
    "salary calculator india",
    "free salary calculator",
    "net pay calculator",
    "salary calculation tool"
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildToolJsonLd({
            name: "In-Hand Salary Calculator Online",
            description:
              "Free in-hand salary calculator to estimate monthly take-home salary after PF, tax, and other deductions.",
            slug: "/in-hand-salary-calculator",
            category: "Calculators",
          }),
          buildBreadcrumbJsonLd([
            { name: "Home", slug: "/" },
            { name: "In-Hand Salary Calculator", slug: "/in-hand-salary-calculator" },
          ]),
          buildHowToJsonLd({
            name: "How to Calculate In-Hand Salary Online",
            description:
              "Enter gross monthly salary and monthly deductions to estimate your take-home salary instantly.",
            steps: [
              { name: "Enter gross monthly salary", text: "Add your monthly gross salary amount." },
              { name: "Set basic and PF details", text: "Adjust the basic salary percentage and employee PF rate if needed." },
              { name: "Add tax and deductions", text: "Enter monthly tax, professional tax, and any other deductions." },
              { name: "Review take-home salary", text: "Check PF amount, total deductions, and final in-hand salary." },
            ],
          }),
          buildFaqJsonLd([
            {
              question: "What is in-hand salary?",
              answer:
                "In-hand salary is the amount you receive after subtracting deductions from your gross monthly salary.",
            },
            {
              question: "Does this calculator include PF deduction?",
              answer:
                "Yes, it can estimate employee PF based on your basic salary percentage and PF rate inputs.",
            },
            {
              question: "Can I include tax and other deductions?",
              answer:
                "Yes, you can include monthly tax, professional tax, and extra deductions for a more practical estimate.",
            },
            {
              question: "Is this tool useful for salary comparison?",
              answer:
                "Yes, it is useful for comparing offers or checking how deductions affect monthly take-home salary.",
            },
            {
              question: "Is this In-Hand Salary Calculator free?",
              answer: "Yes, this In-Hand Salary Calculator is free to use online.",
            },
          ]),
        ]}
      />
      <ClientPage />
    </>
  );
}