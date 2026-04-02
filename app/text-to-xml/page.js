import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Text to XML Converter Free Online | Instant XML Formatter and Validator",
  description:
    "Convert plain text to XML and XML to text instantly. Free, no login required. Format, encode, and validate XML data with ease. Supports copy options and structured output. Ideal for developers, API testers and data engineers. 100% browser-based and secure.",
  slug: "/text-to-xml",
  keywords:
    "text to xml, text to xml converter, xml converter online, convert text to xml, xml formatter online, xml validator online, xml encoder, xml decoder, xml parser online, free xml converter, instant xml converter, xml generator online, xml string converter, xml data converter, xml encoding tool, natural language to xml, xml formatter free, xml converter no login, best xml converter, xml tool for developers"
});

export default function Page() {
  return <ClientPage />;
}
