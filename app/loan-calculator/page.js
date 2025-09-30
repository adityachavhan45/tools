import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Loan Calculator Online — Free Tool to Calculate EMI, Interest & Payments",
  description:
    "Free Loan Calculator online. Instantly calculate loan payments, EMI, and interest with detailed amortization schedules. Easy-to-use financial calculator for personal loans, home loans, car loans, mortgages, and business financing.",
  slug: "/loan-calculator",
  keywords:
    "loan calculator, online loan calculator, emi calculator, mortgage calculator, payment calculator, interest calculator, loan amortization, car loan calculator, home loan calculator, personal loan calculator, business loan calculator, calculate loan payments, loan repayment calculator, loan interest calculator, loan emi calculator, bank loan calculator, loan payment schedule, finance calculator, debt calculator, student loan calculator, credit calculator, calculate mortgage payments, quick loan calculator, easy emi calculator, best loan calculator online"
});

export default function Page() {
  return <ClientPage />;
}