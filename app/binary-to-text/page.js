import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Binary to Text Converter – Decode Binary Code to Text Instantly",
  description:
    "Use this free Binary to Text Converter to decode binary code into readable text or ASCII instantly. Fast, accurate, and easy tool for developers, students, and programmers.",
  slug: "/binary-to-text",
  focusKeyword: "Binary to Text Converter",
  keywords: [
    "binary to text converter",
    "binary to text",
    "convert binary to text",
    "binary decoder",
    "binary code to text",
    "binary to ascii converter",
    "decode binary online",
    "binary translator",
    "binary converter tool",
    "binary decoder online",
    "binary encoding and decoding",
    "free binary converter",
    "binary string to ascii",
    "binary data to text",
    "binary conversion tool",
    "binary message converter",
    "binary code translator",
    "binary to plain text",
    "binary decode tool",
    "ascii from binary"
  ],
});

export default function Page() {
  return <ClientPage />;
}