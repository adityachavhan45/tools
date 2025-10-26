import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Text to JavaScript Converter Online | Free, Fast & Secure JS Encode/Decode Tool",
  description:
    "Convert text to JavaScript (JS) and JavaScript back to text instantly with our free online JS Converter. Encode or decode strings with accuracy, formatting, and copy options. Ideal for developers, programmers, and students working on web projects. 100% browser-based and secure.",
  slug: "/text-to-javascript",
  keywords:
    "text to javascript, text to js, javascript converter, js converter, text to js code, convert text to javascript, javascript encoder, javascript decoder, js code generator, text to js online, javascript converter tool, free text to javascript converter, secure js converter, instant js encoder, decode javascript online, js string converter, text to js for developers, javascript encoding tool, javascript converter online, javascript decode tool"
});

export default function Page() {
  return <ClientPage />;
}
