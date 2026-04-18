import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Age Calculator – Calculate Your Exact Age by Date of Birth Instantly",
  description:
    "Free Age Calculator to find your exact age in years, months, and days. Enter your date of birth to calculate age instantly, check your next birthday, and track upcoming anniversaries easily.",
  slug: "/age-calculator",
  focusKeyword: "Age Calculator",
  keywords: [
    "age calculator",
    "calculate age by date of birth",
    "age calculator online",
    "how old am I",
    "exact age calculator",
    "dob calculator",
    "date of birth calculator",
    "birthday calculator",
    "calculate age in years months days",
    "age from dob",
    "find my age",
    "current age calculator",
    "age counter",
    "online age calculator free",
    "calculate age instantly",
    "next birthday calculator",
    "age difference calculator",
    "date to age converter",
    "calculate age tool",
    "age calculator by dob"
  ],
});

export default function Page() {
  return <ClientPage />;
}