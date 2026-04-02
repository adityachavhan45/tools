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
    "SIP Calculator Online Calculate Monthly Investment Returns and Maturity Value Free 2026",
  description:
    "Calculate SIP returns, invested amount and maturity value instantly with our free online SIP Calculator. Enter monthly investment, expected return rate and time period to get accurate estimates. Perfect for mutual fund investors and financial planners. No signup needed!",
  slug: "/sip-calculator",
  focusKeyword: "SIP Calculator Online Free",
  keywords: [
    "sip calculator",
    "sip calculator online",
    "mutual fund sip calculator",
    "monthly sip calculator",
    "sip return calculator",
    "investment calculator sip",
    "free sip calculator",
    "systematic investment plan calculator",
    "sip maturity calculator",
    "sip growth calculator",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildToolJsonLd({
            name: "SIP Calculator Online",
            description:
              "Free SIP Calculator to estimate monthly investment growth, expected returns, and maturity value over time.",
            slug: "/sip-calculator",
            category: "Calculators",
          }),
          buildBreadcrumbJsonLd([
            { name: "Home", slug: "/" },
            { name: "SIP Calculator", slug: "/sip-calculator" },
          ]),
          buildHowToJsonLd({
            name: "How to Calculate SIP Returns Online",
            description:
              "Enter monthly investment, expected annual return, and time period to estimate SIP maturity.",
            steps: [
              { name: "Enter monthly amount", text: "Add the amount you want to invest every month." },
              { name: "Set return and years", text: "Enter expected annual return and investment duration." },
              { name: "Check results", text: "Review invested amount, estimated returns, and maturity value." },
              { name: "Compare scenarios", text: "Adjust values to explore different SIP plans." },
            ],
          }),
          buildFaqJsonLd([
            { question: "What is a SIP calculator?", answer: "A SIP calculator estimates how a monthly investment may grow over time using projected returns." },
            { question: "Are SIP returns guaranteed?", answer: "No, SIP calculator results are estimates based on your inputs and are not guaranteed returns." },
            { question: "Why should I use a SIP calculator?", answer: "It helps compare monthly investment plans quickly and shows invested amount, expected returns, and maturity value." },
            { question: "Can I change return rate and duration?", answer: "Yes, you can adjust both expected return and duration to test multiple SIP scenarios." },
            { question: "Is this SIP calculator free?", answer: "Yes, this SIP Calculator is free to use online." },
          ]),
        ]}
      />
      <ClientPage />
    </>
  );
}
