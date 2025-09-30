import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Text to XML Converter Online — Free Tool to Format, Encode & Validate XML",
  description:
    "Free Text to XML Converter online. Instantly convert plain text to XML code and XML back to text with formatting, validation, and copy options. Useful tool for students, developers, API testers, and data engineers working with structured data.",
  slug: "/text-to-xml",
  keywords:
    "text to xml, xml to text, xml converter, text to xml code, convert text to xml, xml formatter, xml validator, xml encoder, xml decoder, xml parser online, xml string converter, xml generator, xml converter online, free xml converter, secure xml converter, instant xml tool, text to xml for developers, best xml converter, xml data converter, xml encoding tool"
});

export default function Page() {
  return <ClientPage />;
}
