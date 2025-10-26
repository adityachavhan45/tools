import ClientPage from "./ClientPage";
import {
  buildMetadata,
  buildToolJsonLd,
  buildHowToJsonLd,
  buildFaqJsonLd,
} from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export const metadata = buildMetadata({
  title:
    "Loan Calculator Online - Free EMI, Interest & Payment Calculator Tool",
  description:
    "Use this free Loan Calculator online to instantly calculate loan payments, EMI, total interest, and amortization schedules. Simple and accurate financial tool for personal loans, home loans, car loans, business financing, and mortgages.",
  slug: "/loan-calculator",
  focusKeyword: "Loan Calculator Online",
  keywords: [
    "loan calculator",
    "loan calculator online",
    "emi calculator",
    "mortgage calculator",
    "payment calculator",
    "interest calculator",
    "loan amortization",
    "car loan calculator",
    "home loan calculator",
    "personal loan calculator",
    "business loan calculator",
    "calculate loan payments",
    "loan repayment calculator",
    "loan interest calculator",
    "loan emi calculator",
    "bank loan calculator",
    "loan payment schedule",
    "finance calculator",
    "debt calculator",
    "student loan calculator",
    "credit calculator",
    "calculate mortgage payments",
    "quick loan calculator",
    "easy emi calculator",
    "best loan calculator online",
    "loan amount calculator",
    "loan term calculator",
    "interest rate calculator",
    "monthly emi calculator",
    "loan balance calculator",
    "loan prepayment calculator",
    "loan comparison calculator",
    "loan affordability calculator",
    "loan breakdown calculator",
    "loan repayment planner",
    "mortgage interest calculator",
    "car finance calculator",
    "business finance calculator",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildToolJsonLd({
            name: "Loan Calculator Online",
            description:
              "Free online Loan Calculator to calculate EMI, interest, and payment schedules for personal, home, car, and business loans.",
            slug: "/loan-calculator",
            category: "Finance Tools",
          }),
          buildHowToJsonLd({
            name: "How to Calculate Loan EMI Online",
            description:
              "Step-by-step guide to calculate loan payments, EMI, and interest using the free loan calculator.",
            steps: [
              {
                name: "Enter Loan Amount",
                text: "Type your total loan amount in the calculator input field.",
              },
              {
                name: "Enter Interest Rate and Loan Tenure",
                text: "Input your annual interest rate and loan period (in months or years).",
              },
              {
                name: "Click Calculate EMI",
                text: "Press the 'Calculate EMI' button to instantly get your monthly payment, total interest, and repayment schedule.",
              },
              {
                name: "Review Loan Summary",
                text: "Check your detailed amortization chart, monthly installments, and total payment breakdown.",
              },
            ],
          }),
          buildFaqJsonLd([
            {
              question: "How is EMI calculated in this Loan Calculator?",
              answer:
                "EMI (Equated Monthly Installment) is calculated using the standard formula: EMI = [P × R × (1+R)^N] / [(1+R)^N - 1], where P = Principal, R = Monthly Interest Rate, and N = Number of Months.",
            },
            {
              question: "Can I use this Loan Calculator for different loan types?",
              answer:
                "Yes! You can use this tool for all loan types — home loans, car loans, business loans, mortgages, and personal loans.",
            },
            {
              question: "Does the Loan Calculator show amortization schedule?",
              answer:
                "Yes, it provides a detailed month-by-month amortization table showing principal, interest, and balance breakdown.",
            },
            {
              question: "Is this Loan Calculator free to use?",
              answer:
                "Yes! It’s 100% free, secure, and works directly in your browser — no sign-up or data sharing required.",
            },
            {
              question: "Can I change the interest rate or loan term?",
              answer:
                "Absolutely. You can modify the interest rate, tenure, or amount anytime to compare different loan scenarios instantly.",
            },
          ]),
        ]}
      />
      <ClientPage />
    </>
  );
}
