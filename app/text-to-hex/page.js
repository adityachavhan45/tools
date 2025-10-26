import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Text to Hex Converter Online | Free, Fast & Accurate Hex Encode/Decode Tool",
  description:
    "Convert text to hexadecimal and hex to text instantly with our free online Hex Converter. Encode or decode strings with accuracy, formatting, and copy options. Ideal for developers, programmers, students, and data encoding tasks. 100% browser-based and secure.",
  slug: "/text-to-hex",
  keywords:
    "text to hex, hex to text, hex converter, text to hex code, hex encoder, hex decoder, convert text to hex, online hex tool, hexadecimal converter, hex code generator, hex string converter, free hex converter, instant hex encoder, secure hex converter, hex text converter, hex decoding tool, hex value converter, text to hex for developers, hexadecimal encoding tool, online hex converter"
});

export default function Page() {
  return <ClientPage />;
}
