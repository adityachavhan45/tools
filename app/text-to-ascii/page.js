import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Text to ASCII Converter Online — Free Tool to Convert Text & ASCII Codes",
  description:
    "Free Text to ASCII Converter online. Instantly convert text to ASCII code and ASCII to text with formatting, validation, and copy options. Useful tool for students, developers, programmers, and data processing tasks.",
  slug: "/text-to-ascii",
  keywords:
    "text to ascii, ascii to text, ascii converter, text to ascii code, ascii encoder, ascii decoder, text converter, convert text to ascii, online ascii tool, ascii code generator, ascii character converter, ascii text converter, ascii table converter, best ascii converter, ascii code online, free text to ascii tool, ascii value converter, instant ascii converter, text to ascii for developers, text encoding tool"
});

export default function Page() {
  return <ClientPage />;
}
