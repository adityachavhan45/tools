import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Text to Binary Converter Online Convert Text to Binary Code and Binary to Text Free 2026",
  description:
    "Convert text to binary code and binary to text instantly with our free online Text to Binary Converter. Includes validation and copy options. Perfect for developers, programmers and students. Fast, secure and no signup needed!",
  slug: "/text-to-binary",
  focusKeyword: "Text to Binary Converter Online Free",
  keywords:
    "text to binary, binary to text, binary converter, text to binary code, binary encoder, binary decoder, convert text to binary, online binary tool, binary code generator, binary string converter, binary decoder online, binary text converter, free binary converter, instant binary encoder, secure binary converter, binary encoding tool, text to binary for developers, code to binary, binary converter online, binary conversion tool"
});

export default function Page() {
  return <ClientPage />;
}
