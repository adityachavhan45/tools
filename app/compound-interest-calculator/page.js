import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Compound Interest Calculator Online — Calculate Investment Growth Instantly",
  description:
    "Free Compound Interest Calculator online. Instantly calculate compound interest, savings, and investment growth with yearly, monthly, and daily compounding. Simple, accurate tool for financial planning, retirement, and wealth management.",
  slug: "/compound-interest-calculator",
  keywords:
    "compound interest calculator, calculate compound interest online, investment calculator, savings calculator, interest calculator, compound growth, compound interest formula, wealth calculator, retirement calculator, compounding calculator, bank interest calculator, financial calculator, future value calculator, daily compound interest, monthly compound interest, yearly compound interest, investment growth calculator, calculate savings growth, money growth calculator, online finance calculator, personal finance tool, loan interest calculator, wealth management calculator, accurate interest calculator, calculate future investment, best compound interest calculator"
});

export default function Page() {
  return <ClientPage />;
}