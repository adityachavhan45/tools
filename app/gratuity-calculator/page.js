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
  title: "Gratuity Calculator Online | Free Gratuity Amount Estimator",
  description:
    "Calculate gratuity online with last drawn salary and years of service. Use this free Gratuity Calculator to estimate gratuity amount quickly for planning purposes.",
  slug: "/gratuity-calculator",
  keywords: [
    "gratuity calculator",
    "gratuity amount calculator",
    "salary gratuity calculator",
    "employee gratuity calculator",
    "retirement gratuity calculator",
    "service gratuity calculator",
    "gratuity estimate calculator",
    "last drawn salary gratuity calculator",
    "free gratuity calculator",
    "online gratuity calculator",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildToolJsonLd({
            name: "Gratuity Calculator Online",
            description:
              "Free gratuity calculator to estimate gratuity amount using last drawn salary and years of service.",
            slug: "/gratuity-calculator",
            category: "Calculators",
          }),
          buildBreadcrumbJsonLd([
            { name: "Home", slug: "/" },
            { name: "Gratuity Calculator", slug: "/gratuity-calculator" },
          ]),
          buildHowToJsonLd({
            name: "How to Calculate Gratuity Online",
            description:
              "Enter last drawn monthly salary and years of service to estimate gratuity amount instantly.",
            steps: [
              { name: "Enter salary", text: "Add your last drawn monthly basic plus dearness allowance amount." },
              { name: "Enter service period", text: "Add your completed years of service for the estimate." },
              { name: "Review eligibility", text: "Check whether the service period meets the common gratuity threshold." },
              { name: "See gratuity amount", text: "Review the estimated gratuity amount and service summary." },
            ],
          }),
          buildFaqJsonLd([
            {
              question: "What does a gratuity calculator do?",
              answer:
                "It estimates gratuity amount based on last drawn salary and years of service.",
            },
            {
              question: "Does years of service matter in gratuity?",
              answer:
                "Yes, gratuity calculations depend heavily on total completed service period.",
            },
            {
              question: "Can I use this for planning?",
              answer:
                "Yes, this tool is useful for quick gratuity planning and rough estimation.",
            },
            {
              question: "Is the gratuity amount guaranteed?",
              answer:
                "No, the final amount can depend on your employer policy and applicable legal rules.",
            },
            {
              question: "Is this Gratuity Calculator free?",
              answer: "Yes, this Gratuity Calculator is free to use online.",
            },
          ]),
        ]}
      />
      <ClientPage />
    </>
  );
}
