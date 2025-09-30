import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Age Calculator Online — Calculate Age by Date of Birth Free",
  description:
    "Use the best free Age Calculator online to calculate your exact age in years, months, and days by date of birth. Quick, accurate, and simple age calculation tool to find how old you are, track birthdays, and calculate next anniversaries instantly.",
  slug: "/age-calculator",
  keywords:
    "age calculator, calculate age online, date of birth calculator, dob calculator, birthday calculator, exact age calculator, online age calculator, how old am I, calculate age from dob, birthdate calculator, free age calculator, age calculation tool, calculate age in years months days, days between dates calculator, life age calculator, date difference calculator, find my age, current age calculator, best age calculator, quick age calculator, online dob calculator, calculate birthday, calculate months and days, age counter, calculate age instantly, age tracker, calculate age worldwide, international age calculator, universal age calculator, year month day calculator, how old am I today, age calculator by date of birth online, date to age converter, age calculation app online, calculate future age, upcoming birthday calculator"
});

export default function Page() {
  return <ClientPage />;
}
