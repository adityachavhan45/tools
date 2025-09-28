import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Text to CSV Converter — Convert Text to CSV Code Online",
  description:
    "Convert text to CSV code and CSV to text online. Free text to CSV converter with formatting and validation support.",
  slug: "/text-to-csv",
  keywords: ["text to csv", "text to csv", "csv converter", "csv converter", "text to code"],
});

export default function Page() {
  return <ClientPage />;
}