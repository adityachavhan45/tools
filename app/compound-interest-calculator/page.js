import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Compound Interest Calculator Online - Calculate Investment Growth Instantly (Free Tool)",
  description:
    "Use this free Compound Interest Calculator online to calculate your investment growth instantly. Find compound interest for daily, monthly, or yearly periods. Perfect for savings, retirement, and wealth management planning — fast, accurate, and easy to use.",
  slug: "/compound-interest-calculator",
  focusKeyword: "Compound Interest Calculator Online",
  keywords: [
    "compound interest calculator",
    "compound interest calculator online",
    "calculate compound interest",
    "investment calculator",
    "savings calculator",
    "interest calculator",
    "compound growth calculator",
    "compound interest formula",
    "future value calculator",
    "wealth calculator",
    "retirement calculator",
    "compounding calculator",
    "bank interest calculator",
    "financial calculator",
    "daily compound interest calculator",
    "monthly compound interest calculator",
    "yearly compound interest calculator",
    "investment growth calculator",
    "calculate savings growth",
    "money growth calculator",
    "personal finance calculator",
    "loan interest calculator",
    "wealth management calculator",
    "accurate interest calculator",
    "calculate future investment",
    "finance planning tool",
    "interest compounding calculator",
    "financial growth calculator",
    "investment return calculator",
    "roi calculator",
    "compound savings calculator",
    "long term investment calculator",
    "retirement savings growth tool"
  ],
});

export default function Page() {
  return <ClientPage />;
}
