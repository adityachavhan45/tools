import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Tip Calculator Free Online | Calculate Tips and Split Bills Instantly",
  description:
    "Calculate tips instantly. Free, no login required. Adjust tip percentages, split bills among multiple people and round totals with ease. Perfect for restaurants, group dining and travel. Fast, accurate and 100% browser-based. No downloads required.",
  slug: "/tip-calculator",
  keywords:
    "tip calculator, tip calculator online, calculate tips online, bill split calculator, restaurant tip calculator, tip percentage calculator, split bill calculator, free tip calculator, instant tip calculator, gratuity calculator, group bill splitter, dining tip calculator, tip and tax calculator, travel tip calculator, tip rounding tool, calculate restaurant tip, best tip calculator, tip calculator no login, quick tip calculator, how to calculate tip"
});
export default function Page() {
  return <ClientPage />;
}
