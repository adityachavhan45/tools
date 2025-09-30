import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Tip Calculator Online — Free Tool to Calculate Tips & Split Bills",
  description:
    "Free Tip Calculator online. Instantly calculate tips and gratuity with custom percentage options, bill splitting, and rounding features. Perfect for restaurants, travel, group dining, and hospitality use. Fast, accurate, and works in your browser.",
  slug: "/tip-calculator",
  keywords:
    "tip calculator, gratuity calculator, bill calculator, tip percentage, restaurant tip, split bill calculator, dining tip tool, calculate tips online, free tip calculator, tip and tax calculator, group bill splitting, travel tip calculator, service gratuity calculator, instant tip calculator, accurate tip calculator, tip rounding tool, calculate restaurant tip, quick tip calculator, best online tip calculator, global tip calculator"
});

export default function Page() {
  return <ClientPage />;
}
