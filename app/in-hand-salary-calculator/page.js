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
  title: "In-Hand Salary Calculator Online | Free Monthly Take Home Estimator",
  description:
    "Calculate in-hand salary online with gross monthly salary, PF, tax, professional tax, and other deductions. Use this free In-Hand Salary Calculator for a quick take-home estimate.",
  slug: "/in-hand-salary-calculator",
  keywords: [
    "in hand salary calculator",
    "take home salary calculator",
    "monthly in hand salary calculator",
    "salary breakup calculator",
    "salary take home calculator",
    "net pay calculator",
    "in hand income calculator",
    "salary after deductions calculator",
    "employee salary calculator",
    "free in hand salary calculator",
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
