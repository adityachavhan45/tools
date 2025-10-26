import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Text to XML Converter Online | Free, Fast & Secure XML Formatter & Validator",
  description:
    "Convert text to XML and XML to text instantly with our free online XML Converter. Format, encode, and validate XML data with accuracy and copy options. Ideal for developers, API testers, students, and data engineers working with structured data. 100% browser-based and secure.",
  slug: "/text-to-xml",
  keywords:
    "text to xml, xml to text, xml converter, text to xml code, convert text to xml, xml formatter, xml validator, xml encoder, xml decoder, xml parser online, xml string converter, xml generator, xml converter online, free xml converter, secure xml converter, instant xml tool, text to xml for developers, xml data converter, xml encoding tool, xml formatter online"
});

export default function Page() {
  return <ClientPage />;
}
