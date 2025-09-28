import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Loan Calculator — Calculate Loan Payments and Interest Online",
  description:
    "Calculate loan payments and interest online. Free loan calculator with amortization schedule and payment analysis support.",
  slug: "/loan-calculator",
  keywords: ["loan calculator", "mortgage calculator", "payment calculator", "interest calculator", "loan amortization"],
});

export default function Page() {
  return <ClientPage />;
}