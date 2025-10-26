import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Text to Binary Converter Online | Free, Fast & Accurate Binary Encode/Decode Tool",
  description:
    "Convert text to binary and binary to text instantly with our free online Binary Converter. Perfect for developers, programmers, and students. Encode or decode text with accuracy, validation, and copy options — 100% browser-based and secure.",
  slug: "/text-to-binary",
  keywords:
    "text to binary, binary to text, binary converter, text to binary code, binary encoder, binary decoder, convert text to binary, online binary tool, binary code generator, binary string converter, binary decoder online, binary text converter, free binary converter, instant binary encoder, secure binary converter, binary encoding tool, text to binary for developers, code to binary, binary converter online, binary conversion tool"
});

export default function Page() {
  return <ClientPage />;
}
