import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Tip Calculator — Calculate Tips and Gratuity Online",
  description:
    "Calculate tips and gratuity online. Free tip calculator with percentage options and bill splitting support.",
  slug: "/tip-calculator",
  keywords: ["tip calculator", "gratuity calculator", "bill calculator", "tip percentage", "restaurant tip"],
});

export default function Page() {
  return <ClientPage />;
}