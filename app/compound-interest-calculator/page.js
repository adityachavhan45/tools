import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Compound Interest Calculator — Calculate Compound Interest Online",
  description:
    "Calculate compound interest and investment growth online. Free compound interest calculator with detailed analysis and projections support.",
  slug: "/compound-interest-calculator",
  keywords: ["compound interest", "interest calculator", "investment calculator", "financial calculator", "compound growth"],
});

export default function Page() {
  return <ClientPage />;
}