import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Text to Base64 Converter Online | Free, Fast & Secure Encode/Decode Tool",
  description:
    "Convert text to Base64 and Base64 to text instantly with our free online Base64 Converter. Encode or decode strings with accuracy, formatting, and copy options. Ideal for developers, programmers, API testing, and data encoding. 100% browser-based and secure.",
  slug: "/text-to-base64",
  keywords:
    "text to base64, base64 to text, base64 converter, text to base64 code, base64 encoder, base64 decoder, convert text to base64, decode base64 string, encode base64 online, online base64 tool, base64 code generator, base64 text converter, base64 converter online, free base64 converter, instant base64 encoder, secure base64 converter, base64 decode tool, base64 for developers, base64 encoding tool, api base64 converter"
});

export default function Page() {
  return <ClientPage />;
}
