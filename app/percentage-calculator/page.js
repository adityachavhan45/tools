import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Percentage Calculator — Calculate Percentages and Percent Changes Online",
  description:
    "Calculate percentages and percent changes online. Free percentage calculator with multiple calculation types and analysis support.",
  slug: "/percentage-calculator",
  keywords: ["percentage calculator", "percent calculator", "percentage change", "percent increase", "percent decrease"],
});

export default function Page() {
  return <ClientPage />;
}