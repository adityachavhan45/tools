import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Text to XML Converter — Convert Text to XML Code Online",
  description:
    "Convert text to XML code and XML to text online. Free text to XML converter with formatting and validation support.",
  slug: "/text-to-xml",
  keywords: ["text to xml", "text to xml", "xml converter", "xml converter", "text to code"],
});

export default function Page() {
  return <ClientPage />;
}