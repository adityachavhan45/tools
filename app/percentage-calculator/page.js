import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Percentage Calculator Online | Free, Fast & Accurate Percent Calculation Tool",
  description:
    "Use our free Percentage Calculator online to quickly calculate percentages, percent increase, percent decrease, and percentage change with clear steps. Accurate, fast, and secure tool for students, finance professionals, and everyday use — works directly in your browser.",
  slug: "/percentage-calculator",
  keywords:
    "percentage calculator, percent calculator, percentage change, percent increase, percent decrease, calculate percentage online, free percentage calculator, percentage difference calculator, percentage finder, percentage tool, business percentage calculator, finance percentage calculator, percentage calculator for students, quick percent calculator, best online percentage calculator, percentage formula calculator, instant percentage tool, calculate percent fast, accurate percentage calculator"
});

export default function Page() {
  return <ClientPage />;
}
