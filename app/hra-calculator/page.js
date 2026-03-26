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
  title: "HRA Calculator Online | Free House Rent Allowance Calculator",
  description:
    "Calculate HRA exemption online with basic salary, HRA received, rent paid, and metro status. Use this free HRA Calculator for a quick house rent allowance estimate.",
  slug: "/hra-calculator",
  keywords: [
    "hra calculator",
    "hra exemption calculator",
    "house rent allowance calculator",
    "salary hra calculator",
    "rent allowance calculator",
    "hra tax calculator",
    "hra deduction calculator",
    "free hra calculator",
    "metro non metro hra calculator",
    "rent exemption calculator",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildToolJsonLd({
            name: "HRA Calculator Online",
            description:
              "Free HRA calculator to estimate house rent allowance exemption using salary, rent, and metro status.",
            slug: "/hra-calculator",
            category: "Calculators",
          }),
          buildBreadcrumbJsonLd([
            { name: "Home", slug: "/" },
            { name: "HRA Calculator", slug: "/hra-calculator" },
          ]),
          buildHowToJsonLd({
            name: "How to Calculate HRA Online",
            description:
              "Enter basic salary, HRA received, annual rent paid, and metro status to estimate HRA exemption.",
            steps: [
              { name: "Enter salary details", text: "Add your annual basic salary and HRA received." },
              { name: "Enter rent paid", text: "Add your annual rent amount for the calculation." },
              { name: "Choose city type", text: "Select whether you live in a metro or non-metro city." },
              { name: "Review exemption", text: "Check exempt HRA, taxable HRA, and calculation basis instantly." },
            ],
          }),
          buildFaqJsonLd([
            {
              question: "What does an HRA calculator do?",
              answer:
                "It estimates HRA exemption by comparing salary, HRA received, rent paid, and metro status.",
            },
            {
              question: "Why does metro status matter in HRA calculation?",
              answer:
                "Metro and non-metro locations use different salary percentage limits in the exemption formula.",
            },
            {
              question: "Does this tool show taxable HRA too?",
              answer:
                "Yes, it shows both estimated exempt HRA and remaining taxable HRA based on your inputs.",
            },
            {
              question: "Is this HRA calculator an estimate?",
              answer:
                "Yes, it is a quick estimation tool. Actual tax treatment can depend on your salary structure and filing details.",
            },
            {
              question: "Is this HRA Calculator free?",
              answer: "Yes, this HRA Calculator is free to use online.",
            },
          ]),
        ]}
      />
      <ClientPage />
    </>
  );
}
