import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Text to Base64 Converter Online Encode and Decode Base64 Strings Instantly Free 2026",
  description:
    "Convert text to Base64 and decode Base64 to text instantly with our free online Base64 Converter. Includes formatting and copy options. Perfect for developers, programmers and API testing. Fast, secure and no signup needed!",
  slug: "/text-to-base64",
  focusKeyword: "Text to Base64 Converter Online Free",
  keywords:
    "text to base64, base64 to text, base64 converter, text to base64 code, base64 encoder, base64 decoder, convert text to base64, decode base64 string, encode base64 online, online base64 tool, base64 code generator, base64 text converter, base64 converter online, free base64 converter, instant base64 encoder, secure base64 converter, base64 decode tool, base64 for developers, base64 encoding tool, api base64 converter"
});

export default function Page() {
  return <ClientPage />;
}
