import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Percentage Calculator Online Calculate Percent Increase Decrease and Change Free 2026",
  description:
    "Calculate percentages, percent increase, percent decrease and percentage change instantly with our free online Percentage Calculator. Get clear steps for every calculation. Perfect for students, finance professionals and everyday use. Fast and no signup needed!",
  slug: "/percentage-calculator",
  focusKeyword: "Percentage Calculator Online Free",
  keywords:
    "percentage calculator, percent calculator, percentage change, percent increase, percent decrease, calculate percentage online, free percentage calculator, percentage difference calculator, percentage finder, percentage tool, business percentage calculator, finance percentage calculator, percentage calculator for students, quick percent calculator, best online percentage calculator, percentage formula calculator, instant percentage tool, calculate percent fast, accurate percentage calculator"
});

export default function Page() {
  return <ClientPage />;
}
