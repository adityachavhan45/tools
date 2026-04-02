import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Text to Hex Converter Online Convert Text to Hexadecimal and Hex to Text Free 2026",
  description:
    "Convert text to hexadecimal and hex to text instantly with our free online Text to Hex Converter. Includes formatting and copy options. Perfect for developers, programmers and students. Fast, secure and no signup needed!",
  slug: "/text-to-hex",
  focusKeyword: "Text to Hex Converter Online Free",
  keywords:
    "text to hex, hex to text, hex converter, text to hex code, hex encoder, hex decoder, convert text to hex, online hex tool, hexadecimal converter, hex code generator, hex string converter, free hex converter, instant hex encoder, secure hex converter, hex text converter, hex decoding tool, hex value converter, text to hex for developers, hexadecimal encoding tool, online hex converter"
});

export default function Page() {
  return <ClientPage />;
}
