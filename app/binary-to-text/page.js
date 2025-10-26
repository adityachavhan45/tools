import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Binary to Text Converter Online - Decode Binary Code to Text Instantly (Free Tool)",
  description:
    "Free Binary to Text Converter online. Instantly convert binary code to readable text or ASCII format. Fast, accurate, and easy tool for developers, students, and programmers. Supports binary decoding, encoding, and text formatting in one click.",
  slug: "/binary-to-text",
  focusKeyword: "Binary to Text Converter",
  keywords: [
    "binary to text converter",
    "binary to text",
    "convert binary to text",
    "binary decoder",
    "binary code to text",
    "online binary to text converter",
    "ascii from binary",
    "binary string converter",
    "decode binary online",
    "binary translator",
    "binary converter tool",
    "binary to english converter",
    "binary decoder online",
    "binary encoding and decoding",
    "free binary converter",
    "binary to word converter",
    "binary text generator",
    "binary data to text",
    "binary conversion online",
    "binary character decoder",
    "binary text reader",
    "binary converter ascii",
    "binary message converter",
    "binary code translator",
    "binary language converter",
    "binary to plain text converter",
    "binary text converter online",
    "binary code reader",
    "binary decode tool",
    "binary string to ascii converter"
  ],
});

export default function Page() {
  return <ClientPage />;
}
