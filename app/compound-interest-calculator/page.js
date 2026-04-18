import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Compound Interest Calculator | Calculate Investment Growth Instantly",
  description:
    "Free Compound Interest Calculator to calculate your investment growth instantly. Check compound interest for daily, monthly or yearly periods and plan your savings, retirement and wealth growth easily.",
  slug: "/compound-interest-calculator",
  focusKeyword: "Compound Interest Calculator",
  keywords: [
    "compound interest calculator",
    "calculate compound interest",
    "investment calculator",
    "savings calculator",
    "compound growth calculator",
    "future value calculator",
    "interest calculator",
    "compound interest formula",
    "retirement calculator",
    "wealth calculator",
    "daily compound interest calculator",
    "monthly compound interest calculator",
    "yearly compound interest calculator",
    "investment growth calculator",
    "money growth calculator",
    "financial calculator",
    "compound savings calculator",
    "long term investment calculator",
    "finance planning calculator",
    "investment return calculator"
  ],
});

export default function Page() {
  return <ClientPage />;
}