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
  title: "Notice Period Buyout Calculator Online | Free Notice Pay Estimator",
  description:
    "Calculate notice period buyout online with monthly salary, total notice days, served days, and extra recovery. Use this free Notice Period Buyout Calculator for a quick estimate.",
  slug: "/notice-period-buyout-calculator",
  keywords: [
    "notice period buyout calculator",
    "notice pay calculator",
    "notice salary calculator",
    "buyout calculator notice period",
    "notice recovery calculator",
    "employee notice pay calculator",
    "salary notice period calculator",
    "free notice period calculator",
    "notice settlement calculator",
    "notice period amount calculator",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildToolJsonLd({
            name: "Notice Period Buyout Calculator Online",
            description:
              "Free notice period buyout calculator to estimate notice pay using monthly salary and unserved notice days.",
            slug: "/notice-period-buyout-calculator",
            category: "Calculators",
          }),
          buildBreadcrumbJsonLd([
            { name: "Home", slug: "/" },
            { name: "Notice Period Buyout Calculator", slug: "/notice-period-buyout-calculator" },
          ]),
          buildHowToJsonLd({
            name: "How to Calculate Notice Period Buyout Online",
            description:
              "Enter monthly salary, total notice days, served days, and any extra recovery to estimate notice buyout amount.",
            steps: [
              { name: "Enter monthly salary", text: "Add the monthly salary amount you want to use for notice pay calculation." },
              { name: "Add notice details", text: "Enter total notice period days and the days already served." },
              { name: "Add extra recovery if needed", text: "Include any additional recovery amount if applicable." },
              { name: "Review buyout amount", text: "Check unserved days, daily salary estimate, and final notice buyout amount." },
            ],
          }),
          buildFaqJsonLd([
            {
              question: "What does a notice period buyout calculator do?",
              answer:
                "It estimates notice pay based on salary and the number of unserved notice period days.",
            },
            {
              question: "Can I enter days already served?",
              answer:
                "Yes, the tool subtracts served days from total notice days to estimate the remaining buyout amount.",
            },
            {
              question: "Does this tool include extra recovery?",
              answer:
                "Yes, you can add an extra recovery amount if your case includes another fixed recovery component.",
            },
            {
              question: "Is the result official?",
              answer:
                "No, it is an estimate for planning. Actual settlement can depend on company policy and employment terms.",
            },
            {
              question: "Is this Notice Period Buyout Calculator free?",
              answer: "Yes, this Notice Period Buyout Calculator is free to use online.",
            },
          ]),
        ]}
      />
      <ClientPage />
    </>
  );
}
