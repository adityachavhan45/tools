import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Percentage Calculator Online — Free Tool to Calculate Percent, Increase & Decrease",
  description:
    "Free Percentage Calculator online. Instantly calculate percentages, percent increase, percent decrease, and percentage change with step-by-step accuracy. Easy-to-use tool for students, finance, business, and daily life calculations.",
  slug: "/percentage-calculator",
  keywords:
    "percentage calculator, percent calculator, percentage change, percent increase, percent decrease, calculate percentage online, free percentage calculator, percentage finder, percentage tool, percentage difference calculator, simple percentage calculator, advanced percentage calculator, percentage formula calculator, percent change tool, business percentage calculator, finance percentage calculator, percentage calculator for students, quick percent calculator, best online percentage calculator"
});

export default function Page() {
  return <ClientPage />;
}