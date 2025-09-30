import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Binary to Text Converter Online — Decode Binary Code Instantly",
  description:
    "Free Binary to Text Converter online. Instantly convert binary code into readable text or ASCII format. Fast, accurate, and easy-to-use tool for developers, students, and data processing. Supports encoding, decoding, and text formatting.",
  slug: "/binary-to-text",
  keywords:
    "binary to text, convert binary, text converter, binary decoder, binary code to text, online binary to text converter, ascii text from binary, binary string converter, decode binary online, binary translator, binary converter tool, binary to english converter, binary decoder online, binary encoding and decoding, free binary converter, binary to word converter, binary text generator, binary data to text, binary conversion online, binary character decoder, binary text reader, binary converter ascii, binary message converter, binary code translator, binary language converter"
});

export default function Page() {
  return <ClientPage />;
}