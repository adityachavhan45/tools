import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Text to JavaScript Converter Online — Free Tool to Encode & Decode JS",
  description:
    "Free Text to JavaScript Converter online. Instantly convert text to JavaScript (JS) code and JavaScript back to text with formatting, validation, and copy options. Useful tool for developers, programmers, students, and web projects.",
  slug: "/text-to-javascript",
  keywords:
    "text to javascript, text to js, javascript converter, js converter, text to js code, convert text to javascript, javascript encoder, javascript decoder, js code generator, text to js online, javascript converter tool, free text to javascript converter, secure js converter, instant js encoder, decode javascript online, js string converter, text to js for developers, javascript encoding tool, javascript converter online, text to js formatter"
});

export default function Page() {
  return <ClientPage />;
}
