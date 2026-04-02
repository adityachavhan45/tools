import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Text to JavaScript Converter Online Convert Text to JS Code and Decode Instantly Free 2026",
  description:
    "Convert text to JavaScript code and decode JS back to text instantly with our free online Text to JavaScript Converter. Includes formatting and copy options. Perfect for developers, programmers and students working on web projects. Fast, secure and no signup needed!",
  slug: "/text-to-javascript",
  focusKeyword: "Text to JavaScript Converter Online Free",
  keywords:
    "text to javascript, text to js, javascript converter, js converter, text to js code, convert text to javascript, javascript encoder, javascript decoder, js code generator, text to js online, javascript converter tool, free text to javascript converter, secure js converter, instant js encoder, decode javascript online, js string converter, text to js for developers, javascript encoding tool, javascript converter online, javascript decode tool"
});

export default function Page() {
  return <ClientPage />;
}
