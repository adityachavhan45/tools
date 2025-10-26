import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Age Calculator Online - Calculate Your Exact Age by Date of Birth (Free Tool)",
  description:
    "Use this free Age Calculator online to instantly calculate your exact age in years, months, and days using your date of birth. Fast, accurate, and easy tool to find how old you are, check next birthday, and calculate upcoming anniversaries.",
  slug: "/age-calculator",
  focusKeyword: "Age Calculator Online",
  keywords: [
    "age calculator",
    "age calculator online",
    "calculate age by date of birth",
    "date of birth calculator",
    "dob calculator",
    "birthday calculator",
    "exact age calculator",
    "online age calculator",
    "how old am I",
    "calculate age from dob",
    "birthdate calculator",
    "free age calculator",
    "age calculation tool",
    "calculate age in years months days",
    "life age calculator",
    "date difference calculator",
    "find my age",
    "current age calculator",
    "best age calculator",
    "quick age calculator",
    "online dob calculator",
    "calculate birthday",
    "calculate months and days",
    "age counter",
    "calculate age instantly",
    "age tracker",
    "calculate age worldwide",
    "international age calculator",
    "universal age calculator",
    "year month day calculator",
    "how old am I today",
    "date to age converter",
    "age calculation app online",
    "calculate future age",
    "upcoming birthday calculator"
  ],
});

export default function Page() {
  return <ClientPage />;
}
