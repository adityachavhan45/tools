import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Text to Hex Converter Online — Free Tool to Encode & Decode Hexadecimal",
  description:
    "Free Text to Hex Converter online. Instantly convert text to hexadecimal code and hex back to text with formatting, validation, and copy support. Useful tool for students, developers, programmers, and data encoding tasks.",
  slug: "/text-to-hex",
  keywords:
    "text to hex, hex to text, hex converter, text to hex code, hex encoder, hex decoder, convert text to hex, online hex tool, hexadecimal converter, hex code generator, hex string converter, text to hex converter, free hex converter, instant hex encoder, secure hex converter, hex text converter, hex decoding tool, hex value converter, text to hex for developers, hexadecimal encoding tool"
});

export default function Page() {
  return <ClientPage />;
}
