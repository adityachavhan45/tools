import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Text to Binary Converter Online — Free Tool to Encode & Decode Binary",
  description:
    "Free Text to Binary Converter online. Instantly convert text to binary code and binary back to text with formatting, validation, and copy options. Useful tool for students, developers, programmers, and data encoding tasks.",
  slug: "/text-to-binary",
  keywords:
    "text to binary, binary to text, binary converter, text to binary code, binary encoder, binary decoder, convert text to binary, online binary tool, binary code generator, text to binary converter, binary string converter, free binary converter, instant binary encoder, secure binary converter, binary decoder online, binary text converter, text to binary for developers, binary encoding tool, code to binary, binary converter online"
});

export default function Page() {
  return <ClientPage />;
}
