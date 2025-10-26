import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Tip Calculator Online | Free, Fast & Accurate Tool to Calculate Tips & Split Bills",
  description:
    "Calculate tips instantly with our free Tip Calculator online. Adjust tip percentages, split bills, and round totals easily. Perfect for restaurants, travel, group dining, and hospitality. Fast, accurate, and 100% browser-based — no downloads required.",
  slug: "/tip-calculator",
  keywords:
    "tip calculator, gratuity calculator, bill calculator, restaurant tip, tip percentage, split bill calculator, dining tip tool, calculate tips online, free tip calculator, tip and tax calculator, group bill splitting, travel tip calculator, service gratuity calculator, instant tip calculator, accurate tip calculator, tip rounding tool, calculate restaurant tip, best online tip calculator, quick tip calculator, global tip calculator"
});

export default function Page() {
  return <ClientPage />;
}
