import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Text to Base64 Converter Online — Free Tool to Encode & Decode Base64",
  description:
    "Free Text to Base64 Converter online. Instantly convert text to Base64 code and Base64 back to text with formatting, validation, and copy options. Useful tool for developers, programmers, API testing, and data encoding tasks.",
  slug: "/text-to-base64",
  keywords:
    "text to base64, base64 to text, base64 converter, text to base64 code, base64 encoder, base64 decoder, online base64 tool, convert text to base64, decode base64 string, encode base64 online, base64 code generator, base64 text converter, free base64 converter, best base64 converter, base64 converter online, instant base64 encoder, secure base64 converter, base64 decode tool, base64 for developers, base64 encoding tool"
});

export default function Page() {
  return <ClientPage />;
}
